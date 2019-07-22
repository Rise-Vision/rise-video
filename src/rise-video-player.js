/* global videojs */
/* eslint-disable no-console, one-var */

import { html } from "@polymer/polymer";
import canAutoPlay from "can-autoplay";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { LoggerMixin } from "rise-common-component/src/logger-mixin";
import { getVideoFileType, getAspectRatio } from "./utils";
import {} from "./videojs/videojs-css";

const MAX_DECODE_RETRIES = 5;

export default class RiseVideoPlayer extends LoggerMixin( RiseElement ) {
  static get template() {
    return html`
      <style include="videojs-css"></style>
      <style>
        :host {
          display: inline-block;
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
        }

        div.video-js {
          width: 100%;
          height: 100%;
        }
      </style>
      <video id="video" class="video-js"></video>
    `;
  }

  static get properties() {
    return {
      files: {
        type: Array,
        value: [],
        observer: "_filesChanged"
      },
      controls: {
        type: Boolean,
        value: false
      }
    }
  }

  constructor() {
    super();

    this._autoPlay = true,
    this._playerInstance = null,
    this._decodeRetryCount = 0,

    // Preserve bindings to this in external callbacks
    this._onPlayerInstanceReady = this._onPlayerInstanceReady.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onError = this._onError.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onLoadedMetaData = this._onLoadedMetaData.bind(this);
  }

  ready() {
    super.ready();

    this._autoPlay = !this.controls;
    
    this._playerInstance = videojs( this.$.video, {
      controls: this.controls,
      fluid: false,
    }, this._onPlayerInstanceReady );

    this._playerInstance.exitFullscreen();
    this._removeLoadingSpinner();
  }

  _onPlayerInstanceReady() {
    if ( this.files && this.files.length && this.files.length > 0 ) {
      this._initPlaylist();
    }

    this._configureHandlers();
  }

  _configureHandlers() {
    this._playerInstance.on( "ended", this._onEnded );
    this._playerInstance.on( "error", this._onError );
    this._playerInstance.on( "play", this._onPlay );
    this._playerInstance.on( "loadedmetadata", this._onLoadedMetaData );
  }

  _removeLoadingSpinner() {
    const loadingSpinnerComponent = this._playerInstance.getChild( "loadingSpinner" );

    this._playerInstance.removeChild( loadingSpinnerComponent );
  }

  _onEnded() {
    if ( this._playerInstance.playlist.currentItem() >= ( this._playerInstance.playlist().length - 1 ) ) {
      this._playerInstance.playlist.currentItem( 0 );
    } else {
      this._playerInstance.playlist.next();
    }
  }

  _onError() {
    const error = this._playerInstance.error();

    if ( error && error.code === 3 ) {
      console.log( "DECODE error retry count", this._decodeRetryCount );
      if ( this._decodeRetryCount <= MAX_DECODE_RETRIES ) {
        this._decodeRetryCount += 1;

        // delay 1 second and then force a play()
        setTimeout( () => {
          console.log( "DECODE error retry play()" );
          this.play();
        }, 1000 );

        return;
      }
    }

    // TODO: Log player instance error event
    console.log( "Player instance error", {
      error: this._playerInstance.error,
      currentSrc: this._playerInstance.currentSrc(),
      filePath:  this._getFilePathFromSrc( this._playerInstance.currentSrc() )
    });
  }

  _onPlay() {
    // reset count since this event is evidence of successful play
    this._decodeRetryCount = 0;
  }

  _onLoadedMetaData() {
    const placeholderBounds = this.getBoundingClientRect();
    const data = {
      event: "aspect",
      eventDetails: {
        placeholderWidth: placeholderBounds.width,
        placeholderHeight: placeholderBounds.height,
        placeholderAspect: getAspectRatio( placeholderBounds.width, placeholderBounds.height ),
        videoWidth: this._playerInstance.videoWidth(),
        videoHeight: this._playerInstance.videoHeight(),
        videoAspect: getAspectRatio( this._playerInstance.videoWidth(), this._playerInstance.videoHeight() ),
        fileUrl: this._playerInstance.currentSrc()
      }
    };
    
    // TODO: Log aspect event
    console.log( "Aspect event", data );
  }

  _initPlaylist() {
    let playlist = [],
        playlistItem,
        sources,
        source;

    this.files.forEach( file => {
      sources = [];
      source = {
        src: file.fileUrl,
        type: getVideoFileType( ( file.filePath ) )
      };

      sources.push( source );
      playlistItem = { sources: sources };
      playlist.push( playlistItem );
    } );

    if ( !this._playerInstance.playlist ) {
      // TODO: Log playlist plugin load error event
      console.error( "Playlist plugin did not load");
    }

    this._playerInstance.playlist( playlist );
  }

  play() {
    if (!this._playerInstance) {
      return;
    }
    
    // set a new source
    if ( this.files && this.files.length && this.files.length > 0 ) {
      this._initPlaylist();
    }

    if (this._autoPlay) {
      canAutoPlay.video().then( ({ result }) => {
        if ( result ) {
          this._playerInstance.play();
        } else {
          // TODO: What to do when we can't autoplay?
          console.log( "Can't auto-play video, trying muted" );

          canAutoPlay.video({ muted: true }).then( ({ result }) => {
            if (result) {
              this._playerInstance.muted( true );
              this._playerInstance.play();
            } else {
              console.log( "Can't auto-play muted videos" );
              // TODO: What to do when we can't autoplay even muted videos?
            }
          });

        }
      } );
    }
  }

  _getFilePathFromSrc( src ) {
    if ( this.files && this.files.length && this.files.length > 0) {
      const file = this.files.find(f => f.fileUrl === src);

      return file ? file.filePath : undefined;
    }
  }

  _filesChanged() {
    this.play();
  }
}

customElements.define( "rise-video-player", RiseVideoPlayer );