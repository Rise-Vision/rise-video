import { html } from "@polymer/polymer";
import {} from "@polymer/polymer/lib/elements/dom-repeat.js";
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
          color: #fff;
        }
      </style>
      <h1>VIDEO</h1>
      <ul>
        <template is="dom-repeat" items="[[_validFiles]]">
          <li>[[item]]</li>
        </template>
      </ul>
    `;
  }

  static get properties() {
    return {
      files: {
        type: String,
        value: ""
      },

      _validFiles: {
        type: Array,
        value: [],
        notify: true
      }
    }
  }

  constructor() {
    super();

    this._setVersion( version );

    this._initialStart = true;
    this._filesList = [];
  }

  _handleStart() {
    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_START, { files: this.files });

      this._start();
    }
  }

  _start() {
    const { validFiles } = this.validateFiles( this.files, ["mp4"] );

    // TODO: Log errors when all or some of the files are invalid, as per rise-image.
    //       Need to discuss whether this should happen as part of ValidFilesMixin
    //       or on a per-component basis.

    if ( validFiles && validFiles.length > 0 ) {
      this._validFiles = validFiles;
    }
  }
}

customElements.define( "rise-video", RiseVideo );
