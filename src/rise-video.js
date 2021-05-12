/* eslint-disable no-console, one-var */

import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { WatchFilesMixin } from "rise-common-component/src/watch-files-mixin";
import { ValidFilesMixin } from "rise-common-component/src/valid-files-mixin";
import { version } from "./rise-video-version.js";
import {} from "./rise-video-player";

export const VALID_FILE_TYPES = [ "mp4", "webm" ];
export const MAXIMUM_TIME_FOR_FIRST_DOWNLOAD = 15 * 1000;
export const NO_FILES_DONE_DELAY = 10 * 1000;
export const DONE_PREVIEW_DELAY = 10 * 1000;

let initiallyHidden = RisePlayerConfiguration.Helpers.isInViewer() && !RisePlayerConfiguration.Helpers.isTestEnvironment();

export default class RiseVideo extends WatchFilesMixin( ValidFilesMixin( RiseElement ) ) {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
        }
        #previewPlaceholder {
          display: none;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #F2F2F2;
        }
        #previewPlaceholder svg {
          height: 120px;
          width: 100%;
        }
        #previewPlaceholder h1 {
          color: #020620;
          font-size: 48px;
          text-transform: initial;
          font-family: Helvetica, Arial, sans-serif;
        }
      </style>
      <div id="previewPlaceholder">
        <svg viewBox="0 0 64 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="1.-Atoms" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Desktop/Icons" transform="translate(-423.000000, -1232.000000)" fill="#020620" fill-rule="nonzero">
                  <g id="icon-rise-video" transform="translate(423.000000, 1232.000000)">
                    <path d="M64,19.7727273 C64,19.0196117 63.4030463,18.4090909 62.6666667,18.4090909 L1.33333333,18.4090909 C0.596953667,18.4090909 9.01805001e-17,19.0196117 0,19.7727273 L0,52.5 C4.50902501e-16,56.2655778 2.98476833,59.3181818 6.66666667,59.3181818 L57.3333333,59.3181818 C59.1014433,59.3181818 60.797136,58.5998397 62.0473785,57.3211826 C63.2976211,56.0425255 64,54.3082942 64,52.5 L64,19.7727273 Z M43.2933333,35.7763636 C44.5236453,36.2850319 45.3290106,37.5064348 45.3290106,38.8636364 C45.3290106,40.2208379 44.5236453,41.4422408 43.2933333,41.9509091 L25.624,49.5218182 C24.6842732,49.9373961 23.603872,49.8468676 22.7428158,49.2803992 C21.8817596,48.7139309 21.3532247,47.7459787 21.3333333,46.6990909 L21.3333333,31.0281818 C21.3519076,29.9807367 21.8801734,29.0118031 22.741667,28.445047 C23.6031606,27.8782909 24.6843234,27.7884198 25.624,28.2054545 L43.2933333,35.7763636 Z" id="Shape"></path>
                    <path d="M52.168,1.84636364 C52.3588259,1.65169491 52.4162661,1.35866279 52.3135557,1.10380982 C52.2108452,0.848956855 51.9681931,0.68242737 51.6986667,0.681818182 L41.6,0.681818182 C41.5272325,0.682447068 41.4575055,0.711753263 41.4053333,0.763636364 L29.2986667,13.1536364 C29.1074975,13.3486557 29.0502265,13.6423492 29.1536209,13.8974499 C29.2570154,14.1525506 29.5006548,14.3186759 29.7706667,14.3181818 L39.8586667,14.3181818 C39.9323031,14.3179727 40.0030094,14.2886565 40.056,14.2363636 L52.168,1.84636364 Z" id="Path"></path>
                    <path d="M58.8666667,0.867272727 C58.8233477,0.856411955 58.777649,0.86991386 58.7466667,0.902727273 L46.768,13.1536364 C46.5768309,13.3486557 46.5195598,13.6423492 46.6229543,13.8974499 C46.7263487,14.1525506 46.9699882,14.3186759 47.24,14.3181818 L62.6666667,14.3181818 C63.4030463,14.3181818 64,13.707661 64,12.9545455 L64,7.5 C63.9987928,4.33952254 61.8740641,1.59418236 58.8666667,0.867272727 Z" id="Path"></path>
                    <path d="M34.7013333,1.84636364 C34.8925025,1.65134428 34.9497735,1.35765076 34.8463791,1.10255007 C34.7429846,0.847449373 34.4993452,0.681324104 34.2293333,0.681818182 L24.2666667,0.681818182 C24.1938992,0.682447068 24.1241722,0.711753263 24.072,0.763636364 L11.9653333,13.1536364 C11.7741642,13.3486557 11.7168931,13.6423492 11.8202876,13.8974499 C11.923682,14.1525506 12.1673215,14.3186759 12.4373333,14.3181818 L22.4,14.3181818 C22.4727675,14.3175529 22.5424945,14.2882467 22.5946667,14.2363636 L34.7013333,1.84636364 Z" id="Path"></path>
                    <path d="M17.368,1.84636364 C17.5591691,1.65134428 17.6164402,1.35765076 17.5130457,1.10255007 C17.4096513,0.847449373 17.1660118,0.681324104 16.896,0.681818182 L6.66666667,0.681818182 C2.98476833,0.681818182 4.50902501e-16,3.73442216 0,7.5 L0,12.9545455 C9.01805001e-17,13.707661 0.596953667,14.3181818 1.33333333,14.3181818 L5.06666667,14.3181818 C5.13943413,14.3175529 5.20916117,14.2882467 5.26133333,14.2363636 L17.368,1.84636364 Z" id="Path"></path>
                  </g>
              </g>
          </g>
        </svg>
        <h1>Video</h1>
      </div>
      <rise-video-player id="videoPlayer" files="{{_filesToRenderList}}" volume="[[volume]]"></rise-video-player>
    `;
  }

  static get properties() {
    return {
      files: {
        type: String,
        value: ""
      },
      metadata: {
        type: Array,
        value: null
      },
      volume: {
        type: Number,
        value: () => 0
      },
      playUntilDone: {
        type: Boolean,
        value: () => false
      }
    }
  }

  static get observers() {
    return [
      "_reset(files, metadata)"
    ]
  }

  static get EVENT_VIDEO_RESET() {
    return "video-reset";
  }

  static get EVENT_VIDEO_START() {
    return "video-start";
  }

  constructor() {
    super();

    this._setVersion( version );

    this._initialStart = true;
    this._filesToRenderList = [];
    this._validFiles = [];
    this._noFilesDoneTimer = null
    this._firstDownloadTimer = null;
    this._maximumTimeForFirstDownload = MAXIMUM_TIME_FOR_FIRST_DOWNLOAD;
    this._noFilesDoneDelay = NO_FILES_DONE_DELAY;
    this._presentationStarted = initiallyHidden ? false : true;

    // Preserve bindings to this in external callbacks
    this._handleFirstDownloadTimer = this._handleFirstDownloadTimer.bind( this );
    this._handleNoFilesTimer = this._handleNoFilesTimer.bind( this );
    this._childLog = this._childLog.bind( this );
    this._childSetUptime = this._childSetUptime.bind( this );
    this._done = this._done.bind( this );
  }

  ready() {
    super.ready();

    this.$.videoPlayer.addEventListener( "log", this._childLog );
    this.$.videoPlayer.addEventListener( "set-uptime", this._childSetUptime );
    this.$.videoPlayer.addEventListener( "playlist-done", () => this._done() );
  }

  _handleRisePresentationPlay() {
    this._presentationStarted = true;
    this._reset();
  }

  _handleRisePresentationStop() {
    this._presentationStarted = false;
    this._stop();
  }

  _handleStart( event ) {
    super._handleStart( event );

    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_START, null, { files: this.files });

      this._start();
    }
  }

  _start() {
    const isPreview = this._isPreview;
    let filesList;

    this.$.previewPlaceholder.style.display = isPreview ? "flex" : "";

    if ( this._isPreview ) {
      if ( this.playUntilDone ) {
        this._startDonePreviewTimer();
      }
      return;
    }

    this.stopWatch();
    this._clearFirstDownloadTimer();
    this._clearHandleNoFilesTimer();

    if ( this._hasMetadata() ) {
      filesList = this._getFilesFromMetadata();
    } else {
      filesList = this._getDefaultFiles();
    }

    const { validFiles } = this.validateFiles( filesList, VALID_FILE_TYPES );

    if ( filesList && filesList.length && ( !validFiles || !validFiles.length ) ) {
      // there are some files, but all formats are invalid
      this._setUptimeError( true );
    }

    if ( validFiles && validFiles.length > 0 ) {
      this._validFiles = validFiles;

      this.startWatch( validFiles ).then(() => {
        if ( !this.managedFiles.length ) {
          this._waitForFirstDownload();
        }
      }).catch(() => this._startWithoutValidFiles());
    } else {
      this._startWithoutValidFiles();
    }
  }

  _stop() {
    this._validFiles = [];
    this._filesToRenderList = [];
    this.stopWatch();
    this._clearFirstDownloadTimer();
    this._clearHandleNoFilesTimer();
  }

  _startWithoutValidFiles() {
    this._validFiles = [];
    this._handleNoFiles();
    this._configureShowingVideos();
  }

  _configureShowingVideos() {
    if ( !this._presentationStarted ) {
      return;
    }

    this._filesToRenderList = this.managedFiles
      .slice( 0 )
      .filter( f => this._validFiles.includes( f.filePath ) );
  }

  watchedFileErrorCallback() {
    this._configureShowingVideos();

    if ( !this._filesToRenderList.length ) {
      this._done();
    }
  }

  watchedFileAddedCallback() {
    this._configureShowingVideos();

    if ( this._filesToRenderList.length) {
      this._clearHandleNoFilesTimer();
      this._clearFirstDownloadTimer();
    }
  }

  watchedFileDeletedCallback( details ) {
    const { filePath } = details;

    if ( this._filesToRenderList.length === 1 && this._filePathIsRendered( filePath) ) {
      this._filesToRenderList = [];
    } else {
      this._configureShowingVideos();
    }
  }

  _filePathIsRendered( filePath ) {
    return this._filesToRenderList.find( file => file.filePath === filePath );
  }

  _reset() {
    if ( !this._initialStart ) {
      const filesToLog = !this._hasMetadata() ? this.files : this._getFilesFromMetadata();

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_RESET, null, { files: filesToLog });
    }

    this._setUptimeError( false );
    this._start();
  }

  _getFilesFromMetadata() {
    return !this.metadata ? [] : this.metadata.map(( entry ) => {
      return entry.file;
    });
  }

  _getDefaultFiles() {
    return this.files.split( "|" )
      .map( f => f.trim() )
      .filter( f => f.length > 0 );
  }

   _hasMetadata() {
    return !!this.metadata;
  }

  _childLog( e ) {
    const { type, event, details, additionalFields } = e.detail;

    this.log( type, event, details, additionalFields );
  }

  _childSetUptime( e ) {
    const { enabled } = e.detail;

    this._setUptimeError ( enabled );
  }

  get _isPreview() {
    // account for the component running in editor preview OR running locally in browser
    return RisePlayerConfiguration.Helpers.isEditorPreview() || !RisePlayerConfiguration.Helpers.isInViewer();
  }

  _done() {
    if ( this.playUntilDone ) {
      this._sendDoneEvent( true );
    }
  }

  _clearHandleNoFilesTimer() {
    if ( this._noFilesDoneTimer ) {
      clearTimeout( this._noFilesDoneTimer );
      this._noFilesDoneTimer = null;
    }
  }

  _handleNoFiles() {
    this._clearHandleNoFilesTimer();

    this._noFilesDoneTimer = setTimeout( this._handleNoFilesTimer, this._noFilesDoneDelay );
  }

  _handleNoFilesTimer() {
    this._done();
  }

  _clearFirstDownloadTimer() {
    if ( this._firstDownloadTimer ) {
      clearTimeout( this._firstDownloadTimer );
      this._firstDownloadTimer = null;
    }
  }

  _startDonePreviewTimer() {
    if (this._donePreviewTimer) {
      clearTimeout(this._donePreviewTimer);
    }
    this._donePreviewTimer = setTimeout( () => this._done(), DONE_PREVIEW_DELAY );      
  }

  _waitForFirstDownload() {
    this._clearFirstDownloadTimer();

    this._firstDownloadTimer = setTimeout( this._handleFirstDownloadTimer, this._maximumTimeForFirstDownload );
  }

  _handleFirstDownloadTimer() {
    if ( !this.managedFiles.length ) {
      this._done();
    }
  }
}

customElements.define( "rise-video", RiseVideo );
