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

// If running in Viewer, detect whether the template has been initially hidden
// or not so we can prevent playback.

let initiallyHidden = false;

try {
  if ( window.frameElement ) {
    if (window.frameElement.parentElement.style.visibility === "hidden" ) {
      initiallyHidden = true;
    }
  }
} catch(e) {
  console.log( "There was a problem accessing the parent document" );
}

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
      </style>
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
    this._startPresentation = this._startPresentation.bind( this );
    this._stopPresentation = this._stopPresentation.bind( this );
  }

  ready() {
    super.ready();

    this.addEventListener( "rise-presentation-play", this._startPresentation );
    this.addEventListener( "rise-presentation-stop", this._stopPresentation );

    this.$.videoPlayer.addEventListener( "log", this._childLog );
    this.$.videoPlayer.addEventListener( "set-uptime", this._childSetUptime );
    this.$.videoPlayer.addEventListener( "playlist-done", () => this._done() );
  }

  _stopPresentation() {
    this._presentationStarted = false;
    this._stop();
  }

  _startPresentation() {
    this._presentationStarted = true;
    this._reset();
  }

  _handleStartForPreview() {
    // TODO: continue progress here
    console.log("_handleStartForPreview()", this._validFiles);
  }

  _handleStart() {
    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_START, { files: this.files });

      this._start();
    }
  }

  _start() {
    let filesList;

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

      if ( this._isPreview ) {
        return this._handleStartForPreview();
      }

      this.startWatch( validFiles );

      if ( !this.managedFiles.length ) {
        this._waitForFirstDownload();
      }
    } else {
      this._validFiles = [];
      this._handleNoFiles();
      this._configureShowingVideos();
    }
  }

  _stop() {
    this._validFiles = [];
    this._filesToRenderList = [];
    this.stopWatch();
    this._clearFirstDownloadTimer();
    this._clearHandleNoFilesTimer();
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

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_RESET, { files: filesToLog });
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
    return RisePlayerConfiguration.isPreview();
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
