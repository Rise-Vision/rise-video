/* eslint-disable no-console, one-var */

import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { WatchFilesMixin } from "rise-common-component/src/watch-files-mixin";
import { ValidFilesMixin } from "rise-common-component/src/valid-files-mixin";
import { StoreFilesMixin } from "rise-common-component/src/store-files-mixin";
import { version } from "./rise-video-version.js";
import {} from "./rise-video-player";

export const VALID_FILE_TYPES = [ "mp4", "webm" ];
export const MAXIMUM_TIME_FOR_FIRST_DOWNLOAD = 15 * 1000;
export const NO_FILES_DONE_DELAY = 10 * 1000;
export const RETRY_LOADING_VIDEOS_DELAY = 500;

const base = StoreFilesMixin(RiseElement);

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

export default class RiseVideo extends WatchFilesMixin( ValidFilesMixin( base ) ) {
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
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-image: url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjQgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPGcgaWQ9IjEuLUF0b21zIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IkRlc2t0b3AvSWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTcuMDAwMDAwLCAtODUyLjAwMDAwMCkiIGZpbGw9IiMwMjA2MjAiIGZpbGwtcnVsZT0ibm9uemVybyI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODAuMDAwMDAwLCA4NTIuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPGcgaWQ9InNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzcuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNjQsMTkuNzcyNzI3MyBDNjQsMTkuMDE5NjExNyA2My40MDMwNDYzLDE4LjQwOTA5MDkgNjIuNjY2NjY2NywxOC40MDkwOTA5IEwxLjMzMzMzMzMzLDE4LjQwOTA5MDkgQzAuNTk2OTUzNjY3LDE4LjQwOTA5MDkgOS4wMTgwNTAwMWUtMTcsMTkuMDE5NjExNyAwLDE5Ljc3MjcyNzMgTDAsNTIuNSBDNC41MDkwMjUwMWUtMTYsNTYuMjY1NTc3OCAyLjk4NDc2ODMzLDU5LjMxODE4MTggNi42NjY2NjY2Nyw1OS4zMTgxODE4IEw1Ny4zMzMzMzMzLDU5LjMxODE4MTggQzU5LjEwMTQ0MzMsNTkuMzE4MTgxOCA2MC43OTcxMzYsNTguNTk5ODM5NyA2Mi4wNDczNzg1LDU3LjMyMTE4MjYgQzYzLjI5NzYyMTEsNTYuMDQyNTI1NSA2NCw1NC4zMDgyOTQyIDY0LDUyLjUgTDY0LDE5Ljc3MjcyNzMgWiBNNDMuMjkzMzMzMywzNS43NzYzNjM2IEM0NC41MjM2NDUzLDM2LjI4NTAzMTkgNDUuMzI5MDEwNiwzNy41MDY0MzQ4IDQ1LjMyOTAxMDYsMzguODYzNjM2NCBDNDUuMzI5MDEwNiw0MC4yMjA4Mzc5IDQ0LjUyMzY0NTMsNDEuNDQyMjQwOCA0My4yOTMzMzMzLDQxLjk1MDkwOTEgTDI1LjYyNCw0OS41MjE4MTgyIEMyNC42ODQyNzMyLDQ5LjkzNzM5NjEgMjMuNjAzODcyLDQ5Ljg0Njg2NzYgMjIuNzQyODE1OCw0OS4yODAzOTkyIEMyMS44ODE3NTk2LDQ4LjcxMzkzMDkgMjEuMzUzMjI0Nyw0Ny43NDU5Nzg3IDIxLjMzMzMzMzMsNDYuNjk5MDkwOSBMMjEuMzMzMzMzMywzMS4wMjgxODE4IEMyMS4zNTE5MDc2LDI5Ljk4MDczNjcgMjEuODgwMTczNCwyOS4wMTE4MDMxIDIyLjc0MTY2NywyOC40NDUwNDcgQzIzLjYwMzE2MDYsMjcuODc4MjkwOSAyNC42ODQzMjM0LDI3Ljc4ODQxOTggMjUuNjI0LDI4LjIwNTQ1NDUgTDQzLjI5MzMzMzMsMzUuNzc2MzYzNiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUyLjE2OCwxLjg0NjM2MzY0IEM1Mi4zNTg4MjU5LDEuNjUxNjk0OTEgNTIuNDE2MjY2MSwxLjM1ODY2Mjc5IDUyLjMxMzU1NTcsMS4xMDM4MDk4MiBDNTIuMjEwODQ1MiwwLjg0ODk1Njg1NSA1MS45NjgxOTMxLDAuNjgyNDI3MzcgNTEuNjk4NjY2NywwLjY4MTgxODE4MiBMNDEuNiwwLjY4MTgxODE4MiBDNDEuNTI3MjMyNSwwLjY4MjQ0NzA2OCA0MS40NTc1MDU1LDAuNzExNzUzMjYzIDQxLjQwNTMzMzMsMC43NjM2MzYzNjQgTDI5LjI5ODY2NjcsMTMuMTUzNjM2NCBDMjkuMTA3NDk3NSwxMy4zNDg2NTU3IDI5LjA1MDIyNjUsMTMuNjQyMzQ5MiAyOS4xNTM2MjA5LDEzLjg5NzQ0OTkgQzI5LjI1NzAxNTQsMTQuMTUyNTUwNiAyOS41MDA2NTQ4LDE0LjMxODY3NTkgMjkuNzcwNjY2NywxNC4zMTgxODE4IEwzOS44NTg2NjY3LDE0LjMxODE4MTggQzM5LjkzMjMwMzEsMTQuMzE3OTcyNyA0MC4wMDMwMDk0LDE0LjI4ODY1NjUgNDAuMDU2LDE0LjIzNjM2MzYgTDUyLjE2OCwxLjg0NjM2MzY0IFoiIGlkPSJQYXRoIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01OC44NjY2NjY3LDAuODY3MjcyNzI3IEM1OC44MjMzNDc3LDAuODU2NDExOTU1IDU4Ljc3NzY0OSwwLjg2OTkxMzg2IDU4Ljc0NjY2NjcsMC45MDI3MjcyNzMgTDQ2Ljc2OCwxMy4xNTM2MzY0IEM0Ni41NzY4MzA5LDEzLjM0ODY1NTcgNDYuNTE5NTU5OCwxMy42NDIzNDkyIDQ2LjYyMjk1NDMsMTMuODk3NDQ5OSBDNDYuNzI2MzQ4NywxNC4xNTI1NTA2IDQ2Ljk2OTk4ODIsMTQuMzE4Njc1OSA0Ny4yNCwxNC4zMTgxODE4IEw2Mi42NjY2NjY3LDE0LjMxODE4MTggQzYzLjQwMzA0NjMsMTQuMzE4MTgxOCA2NCwxMy43MDc2NjEgNjQsMTIuOTU0NTQ1NSBMNjQsNy41IEM2My45OTg3OTI4LDQuMzM5NTIyNTQgNjEuODc0MDY0MSwxLjU5NDE4MjM2IDU4Ljg2NjY2NjcsMC44NjcyNzI3MjcgWiIgaWQ9IlBhdGgiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTM0LjcwMTMzMzMsMS44NDYzNjM2NCBDMzQuODkyNTAyNSwxLjY1MTM0NDI4IDM0Ljk0OTc3MzUsMS4zNTc2NTA3NiAzNC44NDYzNzkxLDEuMTAyNTUwMDcgQzM0Ljc0Mjk4NDYsMC44NDc0NDkzNzMgMzQuNDk5MzQ1MiwwLjY4MTMyNDEwNCAzNC4yMjkzMzMzLDAuNjgxODE4MTgyIEwyNC4yNjY2NjY3LDAuNjgxODE4MTgyIEMyNC4xOTM4OTkyLDAuNjgyNDQ3MDY4IDI0LjEyNDE3MjIsMC43MTE3NTMyNjMgMjQuMDcyLDAuNzYzNjM2MzY0IEwxMS45NjUzMzMzLDEzLjE1MzYzNjQgQzExLjc3NDE2NDIsMTMuMzQ4NjU1NyAxMS43MTY4OTMxLDEzLjY0MjM0OTIgMTEuODIwMjg3NiwxMy44OTc0NDk5IEMxMS45MjM2ODIsMTQuMTUyNTUwNiAxMi4xNjczMjE1LDE0LjMxODY3NTkgMTIuNDM3MzMzMywxNC4zMTgxODE4IEwyMi40LDE0LjMxODE4MTggQzIyLjQ3Mjc2NzUsMTQuMzE3NTUyOSAyMi41NDI0OTQ1LDE0LjI4ODI0NjcgMjIuNTk0NjY2NywxNC4yMzYzNjM2IEwzNC43MDEzMzMzLDEuODQ2MzYzNjQgWiIgaWQ9IlBhdGgiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3LjM2OCwxLjg0NjM2MzY0IEMxNy41NTkxNjkxLDEuNjUxMzQ0MjggMTcuNjE2NDQwMiwxLjM1NzY1MDc2IDE3LjUxMzA0NTcsMS4xMDI1NTAwNyBDMTcuNDA5NjUxMywwLjg0NzQ0OTM3MyAxNy4xNjYwMTE4LDAuNjgxMzI0MTA0IDE2Ljg5NiwwLjY4MTgxODE4MiBMNi42NjY2NjY2NywwLjY4MTgxODE4MiBDMi45ODQ3NjgzMywwLjY4MTgxODE4MiA0LjUwOTAyNTAxZS0xNiwzLjczNDQyMjE2IDAsNy41IEwwLDEyLjk1NDU0NTUgQzkuMDE4MDUwMDFlLTE3LDEzLjcwNzY2MSAwLjU5Njk1MzY2NywxNC4zMTgxODE4IDEuMzMzMzMzMzMsMTQuMzE4MTgxOCBMNS4wNjY2NjY2NywxNC4zMTgxODE4IEM1LjEzOTQzNDEzLDE0LjMxNzU1MjkgNS4yMDkxNjExNywxNC4yODgyNDY3IDUuMjYxMzMzMzMsMTQuMjM2MzYzNiBMMTcuMzY4LDEuODQ2MzYzNjQgWiIgaWQ9IlBhdGgiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4=");
          background-position: center;
          background-repeat: no-repeat;
          background-size: auto 80px;
        }
      </style>
      <div id="previewPlaceholder"></div>
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
    this._loadingVideosForPreview = false;
    this._abortLoadingVideosForPreview = false;
    this._retryLoadingVideosTimer = null;
    this._filesToRenderLoaded = [];
    this._validFiles = [];
    this._noFilesDoneTimer = null
    this._firstDownloadTimer = null;
    this._maximumTimeForFirstDownload = MAXIMUM_TIME_FOR_FIRST_DOWNLOAD;
    this._noFilesDoneDelay = NO_FILES_DONE_DELAY;
    this._presentationStarted = initiallyHidden ? false : true;

    // Preserve bindings to this in external callbacks
    this._handleFirstDownloadTimer = this._handleFirstDownloadTimer.bind( this );
    this._handleNoFilesTimer = this._handleNoFilesTimer.bind( this );
    this._configureShowingVideosForPreview = this._configureShowingVideosForPreview.bind( this );
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
    this._validFiles.forEach( file => this.handleFileStatusUpdated({
      filePath: file,
      fileUrl: this._getFileUrl( file ),
      status: this._previewStatusFor( file )
    }));
  }

  _handleStart() {
    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_START, { files: this.files });

      this._start();
    }
  }

  _getFileUrl( file ) {
    return RiseVideo.STORAGE_PREFIX + this._encodePath( file );
  }

  _encodePath( filePath ) {
    // encode each element of the path separately

    let encodedPath = filePath.split("/")
      .map( pathElement => encodeURIComponent( pathElement ))
      .join("/");

    return encodedPath;
  }

  _start() {
    const isEditorPreview = RisePlayerConfiguration.Helpers.isEditorPreview();

    let filesList;

    this.$.previewPlaceholder.style.display = isEditorPreview ? "block" : "";

    if ( isEditorPreview ) {
      return;
    }

    this.stopWatch();
    this._abortLoadingForPreview();
    this._clearFirstDownloadTimer();
    this._clearHandleNoFilesTimer();
    this._clearRetryLoadingVideosTimer();

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
    this._filesToRenderLoaded = [];
    this._abortLoadingForPreview();
    this.stopWatch();
    this._clearFirstDownloadTimer();
    this._clearHandleNoFilesTimer();
    this._clearRetryLoadingVideosTimer();
  }

  _metadataEntryFor( file ) {
    return this.metadata.find( current => current.file === file );
  }

  _previewStatusFor( file ) {
    if ( !this._hasMetadata()) {
      return "current";
    }

    const entry = this._metadataEntryFor( file );

    return entry && entry.exists ? "current" : "deleted";
  }

  _configureShowingVideos() {
    if ( !this._presentationStarted ) {
      return;
    }

    this._filesToRenderList = this.managedFiles
      .slice( 0 )
      .filter( f => this._validFiles.includes( f.filePath ) );
  }

  _getFileForPreview( file ) {
    // TODO: Use StoreFilesMixin to fetch and cache files. Waiting until StoreFilesMixin is in a reliable stable state

    // temporarily emulating downloading/caching with a timeout as well as return the direct storage url instead of object url for now
    return new Promise(( resolve ) => {
      setTimeout(() => {
        resolve( file.fileUrl );
      }, 1000);
    });
  }

  _abortLoadingForPreview() {
    // in case sequential loading is in process, make sure to set abort flag
    if ( this._isPreview && this._loadingVideosForPreview ) {
      this._abortLoadingVideosForPreview = true;
    }
  }

  _loadVideosForPreview( files ) {
    this._loadingVideosForPreview = true;

    return files.reduce( (promise, file) => {
      return promise.then(() => {
        if ( this._abortLoadingVideosForPreview ) {
          // don't process this file if an abort is flagged
          return;
        }

        return this._getFileForPreview( file ).then( (objectUrl) => {
          // don't add this to render list if an abort is flagged
          if ( this._abortLoadingVideosForPreview ) {
            return;
          }

          /*
          in order for data binding to work for _filesToRenderList and have rise-video-player observe changes, we need to explictly set a value, we can't just push an item to it, hence the use of _filesToRenderLoaded array
           */
          this._filesToRenderLoaded.push( Object.assign( file, {fileUrl: objectUrl} ) );
          this._filesToRenderList = this._filesToRenderLoaded.slice(0);
          //TODO: clear timers
        } )
          .catch( err => {
            console.log("could not get file", JSON.stringify(file), err);
            // TODO: may need to log or handle something here
          } );
      });
    }, Promise.resolve());
  }

  _configureShowingVideosForPreview() {
    if ( !this._presentationStarted ) {
      return;
    }

    if ( this._loadingVideosForPreview ) {
      this._clearRetryLoadingVideosTimer();

      // keep trying until previous loading sequence is complete
      this._retryLoadingVideosTimer = setTimeout( this._configureShowingVideosForPreview, RETRY_LOADING_VIDEOS_DELAY );
      return;
    }

    this._filesToRenderList = [];
    this._filesToRenderLoaded = [];

    // TODO: set timer to wait for first download, the _handleFirstDownloadTimer function needs modifying

    return this._loadVideosForPreview( this.managedFiles.slice( 0 ) )
      .then( () => {
        this._loadingVideosForPreview = false;
        this._abortLoadingVideosForPreview = false;

        console.log( "loading videos for preview complete" );
      });
  }

  watchedFileErrorCallback() {
    this._configureShowingVideos();

    if ( !this._filesToRenderList.length ) {
      this._done();
    }
  }

  watchedFileAddedCallback() {
    if ( this._isPreview ) {
      if ( this.managedFiles.length !== this._validFiles.length ) {
        // For preview we wait until watchFilesMixin is managing full list of valid files
        return;
      }

      return this._configureShowingVideosForPreview();
    }

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

      this._setUptimeError( false );
      this._start();
    }
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

  _clearRetryLoadingVideosTimer() {
    if ( this._retryLoadingVideosTimer ) {
      clearTimeout( this._retryLoadingVideosTimer );
      this._retryLoadingVideosTimer = null;
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
