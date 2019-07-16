/* eslint-disable no-console, one-var */

import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { WatchFilesMixin } from "rise-common-component/src/watch-files-mixin"
import { ValidFilesMixin } from "rise-common-component/src/valid-files-mixin";
import { version } from "./rise-video-version.js";

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
      <h1>VIDEO</h1>
    `;
  }

  static get properties() {
    return {
      files: {
        type: Array,
        value: () => {
          return [];
        }
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
    this._validFileTypes = [ "mp4", "webm" ];
    this._validFiles = [];
  }

  ready() {
    super.ready();

    this.addEventListener( "watched-file-error", details => this._handleWatchedFileError( details ));
    this.addEventListener( "watched-file-added", details => this._handleWatchedFileAdded( details ));
    this.addEventListener( "watched-file-deleted", details => this._handleWatchedFileDeleted( details ));
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

  _handleWatchedFileError( details ) {
    console.log ( "_handleWatchedFileError", details );
  }

  _handleWatchedFileAdded( details ) {
    console.log ( "_handleWatchedFileAdded", details );
  }

  _handleWatchedFileDeleted( details ) {
    console.log ( "_handleWatchedFileDeleted", details );
  }
}

customElements.define( "rise-video", RiseVideo );
