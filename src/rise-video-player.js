/* global videojs */
/* eslint-disable no-console, one-var */

import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { getAspectRatio, getVideoFileType } from "./utils";

export default class RiseVideoPlayer extends RiseElement {
  static get template() {
    return html`
      <video id="video" class="vjs-nofull"></video>
    `;
  }

  static get properties() {
    return {
      files: {
        type: Array,
        value: []
      },
      width: {
        type: Number,
        value: 320
      },
      height: {
        type: Number,
        value: 200
      },
      scaleToFit: {
        type: Boolean,
        value: false
      },
      pause: {
        type: Number,
        value: 0
      },
      controls: {
        type: Boolean,
        value: false
      },
      autoplay: {
        type: Boolean,
        value: true
      }
    }
  }

  constructor() {
    super();

    this._autoPlay = false,
    this._playerInstance = null,
    this._decodeRetryCount = 0,
    this._updateWaiting = false,
    this._isPaused = false,
    this._pauseTimer = null;

    this._onPlayerInstanceReady = this._onPlayerInstanceReady.bind(this);

    console.log( "constructor" );
  }

  ready() {
    super.ready();
    console.log( "ready", this.$.video );

    this._autoPlay = ( !this.controls ) ? true : this.autoplay;

    // TODO: Make sure fullscreen is disabled by adding classname to video element
    
    this._playerInstance = videojs( this.$.video, {
      controls: this.controls,
      fluid: !this.scaleToFit,
      height: this.height,
      width: this.width
    }, this._onPlayerInstanceReady );

    this._removeLoadingSpinner();
  }

  _onPlayerInstanceReady() {
    if ( this.files && this.files.length && this.files.length > 0 ) {
      this._initPlaylist();
    }

    this._configureHandlers();
  }

  _configureHandlers() {
    if ( this.controls && this.pause > 1 ) {
      this._playerInstance.on( "pause", this._onPause );
    }

    this._playerInstance.on( "ended", this._onEnded );
    this._playerInstance.on( "error", this._onError );
    this._playerInstance.on( "play", this._onPlay );
    this._playerInstance.on( "loadedmetadata", this._onLoadedMetaData );
  }

  _removeLoadingSpinner() {
    const loadingSpinnerComponent = this._playerInstance.getChild( "loadingSpinner" );

    this._playerInstance.removeChild( loadingSpinnerComponent );
  }

  _onPause() {
    if ( !this._isPaused ) {
      clearTimeout( this._pauseTimer );

      this._pauseTimer = setTimeout( function restart() {
        if ( this._playerInstance.paused() ) {
          this._playerInstance.play();
        }
      }, this._pause * 1000 );
    }
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
      if ( this._decodeRetryCount <= 5 ) {
        this._decodeRetryCount += 1;
        this._updateWaiting = true;

        // delay 1 second and then force a play()
        setTimeout( function() {
          if ( !this._isPaused ) {
            console.log( "DECODE error, not paused, retry play()" );
            this._play();
          }
        }, 1000 );

        return;
      }
    }

    // TODO: Log error
    // _playerInstance.error(), _playerInstance.currentSrc(), _getFilePathFromSrc( _playerInstance.currentSrc() )
  }

  _onPlay() {
    // reset count since this event is evidence of successful play
    this._decodeRetryCount = 0;
  }

  _onLoadedMetaData() {
    const data = {
      event: "aspect",
      event_details: JSON.stringify( {
        placeholderWidth: this.width,
        placeholderHeight: this.height,
        placeholderAspect: getAspectRatio( this.width, this.height ),
        videoWidth: this._playerInstance.videoWidth(),
        videoHeight: this._playerInstance.videoHeight(),
        videoAspect: getAspectRatio( this._playerInstance.videoWidth(), this._playerInstance.videoHeight() ),
        scaleToFit: this.scaleToFit,
        fileUrl: this.fileUrl,
      } )
    };
    
    // TODO: Log aspect event
    console.log( "aspect event", data );
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
        type: getVideoFileType( ( file.fileUrl ) )
      };

      sources.push( source );
      playlistItem = { sources: sources };
      playlist.push( playlistItem );
    } );

    if ( !this._playerInstance.playlist ) {
      // TODO: Log event
      // _videoUtils.logEvent( {
      //   "event": "error",
      //   "event_details": "Playlist plugin did not load"
      // } );
    }

    this._playerInstance.playlist( playlist );
  }
}

customElements.define( "rise-video-player", RiseVideoPlayer );