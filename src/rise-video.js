import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-video-version.js";

export default class RiseVideo extends RiseElement {

  static get template() {
    return html`
      <h1>VIDEO</h1>
    `;
  }

  static get properties() {
    return {
      files: {
        type: String,
        value: ""
      }
    }
  }

  constructor() {
    super();

    this._setVersion( version );

    this._initialStart = true;
  }


  _handleStart() {
    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_START, { files: this.files });

      this._start();
    }
  }

  _start() {
  }
}

customElements.define( "rise-video", RiseVideo );
