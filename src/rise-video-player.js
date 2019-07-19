import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";

export default class RiseVideoPlayer extends RiseElement {
  static get template() {
    return html`
      <video id="video" src="[[file]]"></video>
    `;
  }

  static get properties() {
    return {
      file: {
        type: String,
        value: ""
      }
    }
  }
}

customElements.define( "rise-video-player", RiseVideoPlayer );