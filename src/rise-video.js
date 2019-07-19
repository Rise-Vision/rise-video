import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { WatchFilesMixin } from "rise-common-component/src/watch-files-mixin";
import { ValidFilesMixin } from "rise-common-component/src/valid-files-mixin";
import { version } from "./rise-video-version.js";
import {} from "./rise-video-player";

export default class RiseVideo extends WatchFilesMixin( ValidFilesMixin( RiseElement ) ) {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          overflow: hidden;
          position: relative;
        }
      </style>
      <rise-video-player file="{{_currentFile.fileUrl}}"></rise-video-player>
    `;
  }

  static get properties() {
    return {
      files: {
        type: Array,
        value: () => {
          return [];
        }
      },

      _currentFile: {
        type: String,
        value: ""
      }
    }
  }

  static get STORAGE_PREFIX() {
    return "https://storage.googleapis.com/";
  }

  constructor() {
    super();

    this._setVersion( version );

    this._initialStart = true;
    this._filesList = [];
    this._filesToRenderList = [];
    this._validFileTypes = [ "mp4", "webm" ];
    this._validFiles = [];
  }

  _handleStart() {
    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_START, { files: this.files });

      this._start();
    }
  }

  _start() {
    const { validFiles } = this.validateFiles( this.files, this._validFileTypes );

    if ( validFiles && validFiles.length > 0 ) {
      this._validFiles = validFiles;
      this.startWatch( validFiles );
    }
  }

  _configureShowingVideos() {
    this._filesToRenderList = this.managedFiles.slice( 0 );

    if( this._filesToRenderList.length ) {
      this._currentFile = this._filesToRenderList[0];
    }
  }

  watchedFileErrorCallback() {
    if ( this.managedFiles.length === 0 ) {
      this._filesToRenderList = [];
    }
  }

  watchedFileAddedCallback() {
    if ( this._filesToRenderList.length < 2 ) {
      this._configureShowingVideos();
    }
  }

  watchedFileDeletedCallback( details ) {
    const { filePath } = details;

    if ( this._filesToRenderList.length === 1 && this._filesToRenderList.find( file => file.filePath === filePath )) {
      this._filesToRenderList = [];
    } else {
      this._configureShowingVideos();
    }
  }
}

customElements.define( "rise-video", RiseVideo );
