import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { ValidFilesMixin } from "rise-common-component/src/valid-files-mixin";
import { version } from "./rise-video-version.js";

export default class RiseVideo extends ValidFilesMixin( RiseElement ) {
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
    this._validFileTypes = [ "mp4" ];
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
    }
  }
}

customElements.define( "rise-video", RiseVideo );
