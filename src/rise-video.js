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
  }

}

customElements.define( "rise-video", RiseVideo );
