import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { WatchFilesMixin } from "rise-common-component/src/watch-files-mixin";
import { ValidFilesMixin } from "rise-common-component/src/valid-files-mixin";
import { version } from "./rise-video-version.js";
import {} from "./rise-video-player";

export const VALID_FILE_TYPES = [ "mp4", "webm" ];

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
      }
    }
  }

  static get observers() {
    return [
      "_reset(files, metadata)"
    ]
  }

  static get STORAGE_PREFIX() {
    return "https://storage.googleapis.com/";
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
  }

  ready() {
    super.ready();

    this.$.videoPlayer.addEventListener( "log", this._childLog.bind(this) );
  }

  testLog() {
    console.log( "LOG:", arguments ); //eslint-disable-line
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
    
    if ( this._hasMetadata() ) {
      filesList = this._getFilesFromMetadata();
    } else {
      filesList = this.files.split( "|" );
    }
      
    const { validFiles } = this.validateFiles( filesList, VALID_FILE_TYPES );

    if ( validFiles && validFiles.length > 0 ) {
      this._validFiles = validFiles;
      this.stopWatch();
      this.startWatch( validFiles );
    }
  }

  _configureShowingVideos() {
    this._filesToRenderList = this.managedFiles.slice( 0 );
  }

  watchedFileErrorCallback() {
    if ( this.managedFiles.length === 0 ) {
      this._filesToRenderList = [];
    }
  }

  watchedFileAddedCallback() {
    this._configureShowingVideos();
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
    const filesToLog = !this.metadata ? this.files : this._getFilesFromMetadata();
    
    this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_RESET, { files: filesToLog });
    this._start();
  }

  _getFilesFromMetadata() {
    return !this.metadata ? [] : this.metadata.map(( entry ) => {
      return entry.file;
    });
  }

   _hasMetadata() {
    return !!this.metadata && this.metadata.length > 0;
  }

  _childLog( e ) {
    const { type, event, details, additionalFields } = e.detail;
    
    this.log( type, event, details, additionalFields );
  }
}

customElements.define( "rise-video", RiseVideo );
