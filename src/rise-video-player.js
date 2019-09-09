/* global videojs */
/* eslint-disable no-console, one-var */

import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { LoggerMixin } from "rise-common-component/src/logger-mixin";
import { clampNumber, getVideoFileType, getAspectRatio } from "./utils";
import {} from "../dependencies/videojs-css";

const MAX_DECODE_RETRIES = 5;
const DECODE_RETRY_DELAY = 1000;
const MAX_UNSTICK_ATTEMPTS = 5;
const WATCHDOG_TIMER_DELAY = 60000;

export default class RiseVideoPlayer extends LoggerMixin( RiseElement ) {
  static get template() {
    return html`
      <style include="videojs-css"></style>
      <style>
        :host {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        div.video-js {
          width: 100%;
          height: 100%;
        }

        .video-js {
          background: transparent !important;
        }

        .vjs-modal-dialog,
        .vjs-poster {
          display: none !important;
        }
      </style>
      <video id="video" class="video-js"></video>
    `;
  }

  static get properties() {
    return {
      files: {
        type: Array,
        value: () => [],
        observer: "_filesChanged"
      },
      controls: {
        type: Boolean,
        value: false
      },
      volume: {
        type: Number,
        value: 0,
      },
      // Used during testing to allow player initialization to be
      // deferred until stubs, etc.. are in place
      skipPlayerInit: {
        type: Boolean,
        value: false
      }
    }
  }

  static get observers() {
    return [
      "_setVolume(volume)"
    ]
  }

  // Event name constants
  static get EVENT_PLAYER_ERROR() {
    return "player-error";
  }
  static get EVENT_ASPECT() {
    return "aspect";
  }
  static get EVENT_PLAYLIST_PLUGIN_LOAD_ERROR() {
    return "playlist-plugin-load-error";
  }

  static get EVENT_VIDEO_STUCK() {
    return "video-stuck";
  }

  constructor() {
    super();

    this._autoPlay = true,
    this._playerInstance = null,
    this._decodeRetryCount = 0,
    this._maxDecodeRetries = MAX_DECODE_RETRIES;
    this._decodeRetryDelay = DECODE_RETRY_DELAY;
    this._watchdogTimer;
    this._watchdogTimerDelay = WATCHDOG_TIMER_DELAY;
    this._unstickAttempts = 0;
    this._maxUnstickAttempts = MAX_UNSTICK_ATTEMPTS;
    this._lastCurrentTime;

    // Preserve bindings to this in external callbacks
    this._onPlayerInstanceReady = this._onPlayerInstanceReady.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onError = this._onError.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onLoadedMetaData = this._onLoadedMetaData.bind(this);
    this._watchdog = this._watchdog.bind(this);
  }

  disconnectedCallback() {
    clearInterval( this._watchdogTimer );
  }

  ready() {
    super.ready();

    this._autoPlay = !this.controls;

    if (!this.skipPlayerInit) {
      this._initPlayer();
    }
  }

  _onPlayerInstanceReady() {
    this._configureHandlers();
    this._configureWatchdog();
    this._setVolume( this.volume );
    this._play();
  }

  _configureHandlers() {
    this._playerInstance.on( "ended", this._onEnded );
    this._playerInstance.on( "error", this._onError );
    this._playerInstance.on( "play", this._onPlay );
    this._playerInstance.on( "loadedmetadata", this._onLoadedMetaData );
  }

  _configureWatchdog() {
    clearInterval( this._watchdogTimer );
    this._watchdogTimer = setInterval( this._watchdog, this._watchdogTimerDelay );
  }

  _watchdog() {
    if ( !this._playerInstance.currentSrc() ) {
      return;
    }

    const currentTime = this._playerInstance.currentTime();

    if ( currentTime === this._lastCurrentTime ) {
      console.warn( "watchdog: video stuck" );

      if ( this._unstickAttempts < this._maxUnstickAttempts ) {
        console.info( "watchdog: attempting to unstick" );
        this._playerInstance.pause();
        this._playerInstance.play();
        this._unstickAttempts ++;
      } else {
        this._onEnded();
        console.warn( "watchdog: max unstick attempts exceeded" );
        this._log( RiseVideoPlayer.LOG_TYPE_WARNING, RiseVideoPlayer.EVENT_VIDEO_STUCK, { fileUrl: this._playerInstance.currentSrc() } );
      }
    } else if ( this._unstickAttempts > 0 ) {
      console.info( "watchdog: reset unstick attempts" );
      // Reset count, since currentTime has changed since we last checked
      this._unstickAttempts = 0;
    }

    this._lastCurrentTime = currentTime;
  }

  _removeLoadingSpinner() {
    const loadingSpinnerComponent = this._playerInstance.getChild( "loadingSpinner" );

    this._playerInstance.removeChild( loadingSpinnerComponent );
  }

  _onEnded() {
    // reset watchdog
    this._lastCurrentTime = null;
    this._unstickAttempts = 0;

    if ( this._isDone() ) {
      this.dispatchEvent( new CustomEvent( "playlist-done" ) );
      this._playFirst();
    } else {
      this._playerInstance.playlist.next();
    }
  }

  _isDone() {
    return this._playerInstance.playlist.currentItem() >= ( this._playerInstance.playlist().length - 1 );
  }

  _onError() {
    const error = this._playerInstance.error();

    if ( error && error.code === 3 ) {
      console.log( "DECODE error retry count", this._decodeRetryCount );
      if ( this._decodeRetryCount < this._maxDecodeRetries ) {
        this._decodeRetryCount += 1;

        // delay and then force a play()
        setTimeout( () => {
          console.log( "DECODE error retry play()" );
          this._playerInstance.play();
        }, this._decodeRetryDelay );

        return;
      }
    }

    if  ( error ) {
      const errorTypes = [
        "MEDIA_ERR_CUSTOM",
        "MEDIA_ERR_ABORTED",
        "MEDIA_ERR_NETWORK",
        "MEDIA_ERR_DECODE",
        "MEDIA_ERR_SRC_NOT_SUPPORTED",
        "MEDIA_ERR_ENCRYPTED"
      ];
      const data = {
        type: errorTypes[ error.code ] || "MEDIA_ERR_UNKNOWN",
        errorMessage: error.message || "Sorry, there was a problem playing the video.",
        currentSrc: this._playerInstance.currentSrc(),
        filePath: this._getFilePathFromSrc( this._playerInstance.currentSrc() )
      };

      this._log( RiseVideoPlayer.LOG_TYPE_ERROR, RiseVideoPlayer.EVENT_PLAYER_ERROR, data );
      this._onEnded(); // skip to the next video
      this._setUptimeError( true );
    }
  }

  _onPlay() {
    // reset count and uptime since this event is evidence of successful play
    this._decodeRetryCount = 0;
    this._setUptimeError( false );

    // playlist has been cleared since we started trying to play a video,
    // so we need to reset the player
    if ( !this.files.length ) {
      this._resetPlayer();
    }
  }

  _onLoadedMetaData() {
    const placeholderBounds = this.getBoundingClientRect();
    const data = {
      placeholderWidth: placeholderBounds.width,
      placeholderHeight: placeholderBounds.height,
      placeholderAspect: getAspectRatio( placeholderBounds.width, placeholderBounds.height ),
      videoWidth: this._playerInstance.videoWidth(),
      videoHeight: this._playerInstance.videoHeight(),
      videoAspect: getAspectRatio( this._playerInstance.videoWidth(), this._playerInstance.videoHeight() ),
      fileUrl: this._playerInstance.currentSrc()
    };

    this._log( RiseVideoPlayer.LOG_TYPE_INFO, RiseVideoPlayer.EVENT_ASPECT, data );
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
      this._log( RiseVideoPlayer.LOG_TYPE_ERROR, RiseVideoPlayer.EVENT_PLAYLIST_PLUGIN_LOAD_ERROR, { message: "Playlist plugin did not load" } );
      this._setUptimeError( true );
      return;
    }

    this._playerInstance.playlist( playlist );

    // simply setting an empty playlist will not stop the player from playing
    // the current video, so we need to reset the player.
    if ( playlist.length === 0) {
      this._resetPlayer();
    }
  }

  _initPlayer() {
    this._playerInstance = videojs( this.$.video, {
      controls: this.controls,
      fluid: false,
    }, this._onPlayerInstanceReady );

    this._playerInstance.exitFullscreen();
    this._removeLoadingSpinner();
  }

  _play() {
    if (!this._playerInstance) {
      return;
    }

    this._setVolume( this.volume );

    // set a new source
    if ( this.files ) {
      this._initPlaylist();
    }

    if (this._autoPlay) {
      this._playFirst();
    }
  }

  _playFirst() {
    if (this._playerInstance.playlist.first) {
      this._playerInstance.playlist.first();
    }

    this._playerInstance.play().catch( () => {
      this._playerInstance.muted( true );
      this._playerInstance.play();
    });
  }

  _getFilePathFromSrc( src ) {
    if ( this.files && this.files.length && this.files.length > 0) {
      const file = this.files.find(f => f.fileUrl === src);

      return file ? file.filePath : undefined;
    }
  }

  _filesChanged() {
    this._play();
  }

  _muteVideo () {
    if ( !this._playerInstance ) {
      return;
    }

    this._playerInstance.volume( 0 );
    this._playerInstance.muted ( true );
  }

  _setVolume( volume ) {
    if ( !this._playerInstance ) {
      return;
    }

    const normalizedVolume = clampNumber( volume, 0, 100 );

    this.volume = normalizedVolume;

    if ( normalizedVolume === 0 ) {
      this._muteVideo();
    } else {
      this._playerInstance.volume( normalizedVolume / 100 );
      this._playerInstance.muted ( false );
    }
  }

  _log( type, event, details = null, additionalFields ) {
    this.dispatchEvent( new CustomEvent( "log", { detail: { type, event, details, additionalFields } } ) );
  }

  _setUptimeError( enabled ) { // overrides method in RiseElement
    this.dispatchEvent( new CustomEvent( "set-uptime", { detail: { enabled } } ) );
  }

  _resetPlayer() {
    this._playerInstance.reset();
  }
}

customElements.define( "rise-video-player", RiseVideoPlayer );