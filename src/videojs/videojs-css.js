/* eslint-disable quotes */
const videojsCss = document.createElement("dom-module");

// This is a copy of node_modules/videojs/dist/video.min.css
videojsCss.innerHTML = `<template>
  <style>
    @charset "UTF-8";
    .vjs-modal-dialog .vjs-modal-dialog-content, .video-js .vjs-modal-dialog, .vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
      text-align: center;
    }
    
    @font-face {
      font-family: VideoJS;
      src: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-play, .video-js .vjs-play-control .vjs-icon-placeholder, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-play:before, .video-js .vjs-play-control .vjs-icon-placeholder:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
      content: "\f101";
    }
    
    .vjs-icon-play-circle {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-play-circle:before {
      content: "\f102";
    }
    
    .vjs-icon-pause, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-pause:before, .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
      content: "\f103";
    }
    
    .vjs-icon-volume-mute, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before {
      content: "\f104";
    }
    
    .vjs-icon-volume-low, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-volume-low:before, .video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder:before {
      content: "\f105";
    }
    
    .vjs-icon-volume-mid, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-volume-mid:before, .video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder:before {
      content: "\f106";
    }
    
    .vjs-icon-volume-high, .video-js .vjs-mute-control .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
      content: "\f107";
    }
    
    .vjs-icon-fullscreen-enter, .video-js .vjs-fullscreen-control .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
      content: "\f108";
    }
    
    .vjs-icon-fullscreen-exit, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-fullscreen-exit:before, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
      content: "\f109";
    }
    
    .vjs-icon-square {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-square:before {
      content: "\f10a";
    }
    
    .vjs-icon-spinner {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-spinner:before {
      content: "\f10b";
    }
    
    .vjs-icon-subtitles, .video-js .vjs-subs-caps-button .vjs-icon-placeholder,
    .video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder,
    .video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder,
    .video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder,
    .video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-subtitles-button .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-subtitles:before, .video-js .vjs-subs-caps-button .vjs-icon-placeholder:before,
    .video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder:before,
    .video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder:before,
    .video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder:before,
    .video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-subtitles-button .vjs-icon-placeholder:before {
      content: "\f10c";
    }
    
    .vjs-icon-captions, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder,
    .video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder, .video-js .vjs-captions-button .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-captions:before, .video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder:before,
    .video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder:before, .video-js .vjs-captions-button .vjs-icon-placeholder:before {
      content: "\f10d";
    }
    
    .vjs-icon-chapters, .video-js .vjs-chapters-button .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-chapters:before, .video-js .vjs-chapters-button .vjs-icon-placeholder:before {
      content: "\f10e";
    }
    
    .vjs-icon-share {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-share:before {
      content: "\f10f";
    }
    
    .vjs-icon-cog {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-cog:before {
      content: "\f110";
    }
    
    .vjs-icon-circle, .vjs-seek-to-live-control .vjs-icon-placeholder, .video-js .vjs-volume-level, .video-js .vjs-play-progress {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-circle:before, .vjs-seek-to-live-control .vjs-icon-placeholder:before, .video-js .vjs-volume-level:before, .video-js .vjs-play-progress:before {
      content: "\f111";
    }
    
    .vjs-icon-circle-outline {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-circle-outline:before {
      content: "\f112";
    }
    
    .vjs-icon-circle-inner-circle {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-circle-inner-circle:before {
      content: "\f113";
    }
    
    .vjs-icon-hd {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-hd:before {
      content: "\f114";
    }
    
    .vjs-icon-cancel, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-cancel:before, .video-js .vjs-control.vjs-close-button .vjs-icon-placeholder:before {
      content: "\f115";
    }
    
    .vjs-icon-replay, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-replay:before, .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
      content: "\f116";
    }
    
    .vjs-icon-facebook {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-facebook:before {
      content: "\f117";
    }
    
    .vjs-icon-gplus {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-gplus:before {
      content: "\f118";
    }
    
    .vjs-icon-linkedin {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-linkedin:before {
      content: "\f119";
    }
    
    .vjs-icon-twitter {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-twitter:before {
      content: "\f11a";
    }
    
    .vjs-icon-tumblr {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-tumblr:before {
      content: "\f11b";
    }
    
    .vjs-icon-pinterest {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-pinterest:before {
      content: "\f11c";
    }
    
    .vjs-icon-audio-description, .video-js .vjs-descriptions-button .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-audio-description:before, .video-js .vjs-descriptions-button .vjs-icon-placeholder:before {
      content: "\f11d";
    }
    
    .vjs-icon-audio, .video-js .vjs-audio-button .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-audio:before, .video-js .vjs-audio-button .vjs-icon-placeholder:before {
      content: "\f11e";
    }
    
    .vjs-icon-next-item {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-next-item:before {
      content: "\f11f";
    }
    
    .vjs-icon-previous-item {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-previous-item:before {
      content: "\f120";
    }
    
    .vjs-icon-picture-in-picture-enter, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-picture-in-picture-enter:before, .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
      content: "\f121";
    }
    
    .vjs-icon-picture-in-picture-exit, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-picture-in-picture-exit:before, .video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
      content: "\f122";
    }
    
    .video-js {
      display: block;
      vertical-align: top;
      box-sizing: border-box;
      color: #fff;
      background-color: #000;
      position: relative;
      padding: 0;
      font-size: 10px;
      line-height: 1;
      font-weight: normal;
      font-style: normal;
      font-family: Arial, Helvetica, sans-serif;
      word-break: initial;
    }
    .video-js:-moz-full-screen {
      position: absolute;
    }
    .video-js:-webkit-full-screen {
      width: 100% !important;
      height: 100% !important;
    }
    
    .video-js[tabindex="-1"] {
      outline: none;
    }
    
    .video-js *,
    .video-js *:before,
    .video-js *:after {
      box-sizing: inherit;
    }
    
    .video-js ul {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      list-style-position: outside;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
    
    .video-js.vjs-fluid,
    .video-js.vjs-16-9,
    .video-js.vjs-4-3 {
      width: 100%;
      max-width: 100%;
      height: 0;
    }
    
    .video-js.vjs-16-9 {
      padding-top: 56.25%;
    }
    
    .video-js.vjs-4-3 {
      padding-top: 75%;
    }
    
    .video-js.vjs-fill {
      width: 100%;
      height: 100%;
    }
    
    .video-js .vjs-tech {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    body.vjs-full-window {
      padding: 0;
      margin: 0;
      height: 100%;
    }
    
    .vjs-full-window .video-js.vjs-fullscreen {
      position: fixed;
      overflow: hidden;
      z-index: 1000;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
    
    .video-js.vjs-fullscreen {
      width: 100% !important;
      height: 100% !important;
      padding-top: 0 !important;
    }
    
    .video-js.vjs-fullscreen.vjs-user-inactive {
      cursor: none;
    }
    
    .vjs-hidden {
      display: none !important;
    }
    
    .vjs-disabled {
      opacity: 0.5;
      cursor: default;
    }
    
    .video-js .vjs-offscreen {
      height: 1px;
      left: -9999px;
      position: absolute;
      top: 0;
      width: 1px;
    }
    
    .vjs-lock-showing {
      display: block !important;
      opacity: 1;
      visibility: visible;
    }
    
    .vjs-no-js {
      padding: 20px;
      color: #fff;
      background-color: #000;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
      width: 300px;
      height: 150px;
      margin: 0px auto;
    }
    
    .vjs-no-js a,
    .vjs-no-js a:visited {
      color: #66A8CC;
    }
    
    .video-js .vjs-big-play-button {
      font-size: 3em;
      line-height: 1.5em;
      height: 1.63332em;
      width: 3em;
      display: block;
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 0;
      cursor: pointer;
      opacity: 1;
      border: 0.06666em solid #fff;
      background-color: #2B333F;
      background-color: rgba(43, 51, 63, 0.7);
      border-radius: 0.3em;
      transition: all 0.4s;
    }
    .vjs-big-play-centered .vjs-big-play-button {
      top: 50%;
      left: 50%;
      margin-top: -0.81666em;
      margin-left: -1.5em;
    }
    
    .video-js:hover .vjs-big-play-button,
    .video-js .vjs-big-play-button:focus {
      border-color: #fff;
      background-color: #73859f;
      background-color: rgba(115, 133, 159, 0.5);
      transition: all 0s;
    }
    
    .vjs-controls-disabled .vjs-big-play-button,
    .vjs-has-started .vjs-big-play-button,
    .vjs-using-native-controls .vjs-big-play-button,
    .vjs-error .vjs-big-play-button {
      display: none;
    }
    
    .vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause .vjs-big-play-button {
      display: block;
    }
    
    .video-js button {
      background: none;
      border: none;
      color: inherit;
      display: inline-block;
      font-size: inherit;
      line-height: inherit;
      text-transform: none;
      text-decoration: none;
      transition: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    
    .vjs-control .vjs-button {
      width: 100%;
      height: 100%;
    }
    
    .video-js .vjs-control.vjs-close-button {
      cursor: pointer;
      height: 3em;
      position: absolute;
      right: 0;
      top: 0.5em;
      z-index: 2;
    }
    .video-js .vjs-modal-dialog {
      background: rgba(0, 0, 0, 0.8);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0));
      overflow: auto;
    }
    
    .video-js .vjs-modal-dialog > * {
      box-sizing: border-box;
    }
    
    .vjs-modal-dialog .vjs-modal-dialog-content {
      font-size: 1.2em;
      line-height: 1.5;
      padding: 20px 24px;
      z-index: 1;
    }
    
    .vjs-menu-button {
      cursor: pointer;
    }
    
    .vjs-menu-button.vjs-disabled {
      cursor: default;
    }
    
    .vjs-workinghover .vjs-menu-button.vjs-disabled:hover .vjs-menu {
      display: none;
    }
    
    .vjs-menu .vjs-menu-content {
      display: block;
      padding: 0;
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      overflow: auto;
    }
    
    .vjs-menu .vjs-menu-content > * {
      box-sizing: border-box;
    }
    
    .vjs-scrubbing .vjs-control.vjs-menu-button:hover .vjs-menu {
      display: none;
    }
    
    .vjs-menu li {
      list-style: none;
      margin: 0;
      padding: 0.2em 0;
      line-height: 1.4em;
      font-size: 1.2em;
      text-align: center;
      text-transform: lowercase;
    }
    
    .vjs-menu li.vjs-menu-item:focus,
    .vjs-menu li.vjs-menu-item:hover,
    .js-focus-visible .vjs-menu li.vjs-menu-item:hover {
      background-color: #73859f;
      background-color: rgba(115, 133, 159, 0.5);
    }
    
    .vjs-menu li.vjs-selected,
    .vjs-menu li.vjs-selected:focus,
    .vjs-menu li.vjs-selected:hover,
    .js-focus-visible .vjs-menu li.vjs-selected:hover {
      background-color: #fff;
      color: #2B333F;
    }
    
    .vjs-menu li.vjs-menu-title {
      text-align: center;
      text-transform: uppercase;
      font-size: 1em;
      line-height: 2em;
      padding: 0;
      margin: 0 0 0.3em 0;
      font-weight: bold;
      cursor: default;
    }
    
    .vjs-menu-button-popup .vjs-menu {
      display: none;
      position: absolute;
      bottom: 0;
      width: 10em;
      left: -3em;
      height: 0em;
      margin-bottom: 1.5em;
      border-top-color: rgba(43, 51, 63, 0.7);
    }
    
    .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      background-color: #2B333F;
      background-color: rgba(43, 51, 63, 0.7);
      position: absolute;
      width: 100%;
      bottom: 1.5em;
      max-height: 15em;
    }
    
    .vjs-layout-tiny .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
    .vjs-layout-x-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      max-height: 5em;
    }
    
    .vjs-layout-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      max-height: 10em;
    }
    
    .vjs-layout-medium .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      max-height: 14em;
    }
    
    .vjs-layout-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
    .vjs-layout-x-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,
    .vjs-layout-huge .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      max-height: 25em;
    }
    
    .vjs-workinghover .vjs-menu-button-popup:hover .vjs-menu,
    .vjs-menu-button-popup .vjs-menu.vjs-lock-showing {
      display: block;
    }
    
    .video-js .vjs-menu-button-inline {
      transition: all 0.4s;
      overflow: hidden;
    }
    
    .video-js .vjs-menu-button-inline:before {
      width: 2.222222222em;
    }
    
    .video-js .vjs-menu-button-inline:hover,
    .video-js .vjs-menu-button-inline:focus,
    .video-js .vjs-menu-button-inline.vjs-slider-active,
    .video-js.vjs-no-flex .vjs-menu-button-inline {
      width: 12em;
    }
    
    .vjs-menu-button-inline .vjs-menu {
      opacity: 0;
      height: 100%;
      width: auto;
      position: absolute;
      left: 4em;
      top: 0;
      padding: 0;
      margin: 0;
      transition: all 0.4s;
    }
    
    .vjs-menu-button-inline:hover .vjs-menu,
    .vjs-menu-button-inline:focus .vjs-menu,
    .vjs-menu-button-inline.vjs-slider-active .vjs-menu {
      display: block;
      opacity: 1;
    }
    
    .vjs-no-flex .vjs-menu-button-inline .vjs-menu {
      display: block;
      opacity: 1;
      position: relative;
      width: auto;
    }
    
    .vjs-no-flex .vjs-menu-button-inline:hover .vjs-menu,
    .vjs-no-flex .vjs-menu-button-inline:focus .vjs-menu,
    .vjs-no-flex .vjs-menu-button-inline.vjs-slider-active .vjs-menu {
      width: auto;
    }
    
    .vjs-menu-button-inline .vjs-menu-content {
      width: auto;
      height: 100%;
      margin: 0;
      overflow: hidden;
    }
    
    .video-js .vjs-control-bar {
      display: none;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3em;
      background-color: #2B333F;
      background-color: rgba(43, 51, 63, 0.7);
    }
    
    .vjs-has-started .vjs-control-bar {
      display: flex;
      visibility: visible;
      opacity: 1;
      transition: visibility 0.1s, opacity 0.1s;
    }
    
    .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
      visibility: visible;
      opacity: 0;
      transition: visibility 1s, opacity 1s;
    }
    
    .vjs-controls-disabled .vjs-control-bar,
    .vjs-using-native-controls .vjs-control-bar,
    .vjs-error .vjs-control-bar {
      display: none !important;
    }
    
    .vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
      opacity: 1;
      visibility: visible;
    }
    
    .vjs-has-started.vjs-no-flex .vjs-control-bar {
      display: table;
    }
    
    .video-js .vjs-control {
      position: relative;
      text-align: center;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 4em;
      flex: none;
    }
    
    .vjs-button > .vjs-icon-placeholder:before {
      font-size: 1.8em;
      line-height: 1.67;
    }
    
    .video-js .vjs-control:focus:before,
    .video-js .vjs-control:hover:before,
    .video-js .vjs-control:focus {
      text-shadow: 0em 0em 1em white;
    }
    
    .video-js .vjs-control-text {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    
    .vjs-no-flex .vjs-control {
      display: table-cell;
      vertical-align: middle;
    }
    
    .video-js .vjs-custom-control-spacer {
      display: none;
    }
    
    .video-js .vjs-progress-control {
      cursor: pointer;
      flex: auto;
      display: flex;
      align-items: center;
      min-width: 4em;
      touch-action: none;
    }
    
    .video-js .vjs-progress-control.disabled {
      cursor: default;
    }
    
    .vjs-live .vjs-progress-control {
      display: none;
    }
    
    .vjs-liveui .vjs-progress-control {
      display: flex;
      align-items: center;
    }
    
    .vjs-no-flex .vjs-progress-control {
      width: auto;
    }
    
    .video-js .vjs-progress-holder {
      flex: auto;
      transition: all 0.2s;
      height: 0.3em;
    }
    
    .video-js .vjs-progress-control .vjs-progress-holder {
      margin: 0 10px;
    }
    
    .video-js .vjs-progress-control:hover .vjs-progress-holder {
      font-size: 1.6666666667em;
    }
    
    .video-js .vjs-progress-control:hover .vjs-progress-holder.disabled {
      font-size: 1em;
    }
    
    .video-js .vjs-progress-holder .vjs-play-progress,
    .video-js .vjs-progress-holder .vjs-load-progress,
    .video-js .vjs-progress-holder .vjs-load-progress div {
      position: absolute;
      display: block;
      height: 100%;
      margin: 0;
      padding: 0;
      width: 0;
    }
    
    .video-js .vjs-play-progress {
      background-color: #fff;
    }
    .video-js .vjs-play-progress:before {
      font-size: 0.9em;
      position: absolute;
      right: -0.5em;
      top: -0.3333333333em;
      z-index: 1;
    }
    
    .video-js .vjs-load-progress {
      background: rgba(115, 133, 159, 0.5);
    }
    
    .video-js .vjs-load-progress div {
      background: rgba(115, 133, 159, 0.75);
    }
    
    .video-js .vjs-time-tooltip {
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 0.3em;
      color: #000;
      float: right;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1em;
      padding: 6px 8px 8px 8px;
      pointer-events: none;
      position: absolute;
      top: -3.4em;
      visibility: hidden;
      z-index: 1;
    }
    
    .video-js .vjs-progress-holder:focus .vjs-time-tooltip {
      display: none;
    }
    
    .video-js .vjs-progress-control:hover .vjs-time-tooltip,
    .video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip {
      display: block;
      font-size: 0.6em;
      visibility: visible;
    }
    
    .video-js .vjs-progress-control.disabled:hover .vjs-time-tooltip {
      font-size: 1em;
    }
    
    .video-js .vjs-progress-control .vjs-mouse-display {
      display: none;
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: #000;
      z-index: 1;
    }
    
    .vjs-no-flex .vjs-progress-control .vjs-mouse-display {
      z-index: 0;
    }
    
    .video-js .vjs-progress-control:hover .vjs-mouse-display {
      display: block;
    }
    
    .video-js.vjs-user-inactive .vjs-progress-control .vjs-mouse-display {
      visibility: hidden;
      opacity: 0;
      transition: visibility 1s, opacity 1s;
    }
    
    .video-js.vjs-user-inactive.vjs-no-flex .vjs-progress-control .vjs-mouse-display {
      display: none;
    }
    
    .vjs-mouse-display .vjs-time-tooltip {
      color: #fff;
      background-color: #000;
      background-color: rgba(0, 0, 0, 0.8);
    }
    
    .video-js .vjs-slider {
      position: relative;
      cursor: pointer;
      padding: 0;
      margin: 0 0.45em 0 0.45em;
      /* iOS Safari */
      -webkit-touch-callout: none;
      /* Safari */
      -webkit-user-select: none;
      /* Konqueror HTML */
      /* Firefox */
      -moz-user-select: none;
      /* Internet Explorer/Edge */
      -ms-user-select: none;
      /* Non-prefixed version, currently supported by Chrome and Opera */
      user-select: none;
      background-color: #73859f;
      background-color: rgba(115, 133, 159, 0.5);
    }
    
    .video-js .vjs-slider.disabled {
      cursor: default;
    }
    
    .video-js .vjs-slider:focus {
      text-shadow: 0em 0em 1em white;
      box-shadow: 0 0 1em #fff;
    }
    
    .video-js .vjs-mute-control {
      cursor: pointer;
      flex: none;
    }
    .video-js .vjs-volume-control {
      cursor: pointer;
      margin-right: 1em;
      display: flex;
    }
    
    .video-js .vjs-volume-control.vjs-volume-horizontal {
      width: 5em;
    }
    
    .video-js .vjs-volume-panel .vjs-volume-control {
      visibility: visible;
      opacity: 0;
      width: 1px;
      height: 1px;
      margin-left: -1px;
    }
    
    .video-js .vjs-volume-panel {
      transition: width 1s;
    }
    .video-js .vjs-volume-panel:hover .vjs-volume-control, .video-js .vjs-volume-panel:active .vjs-volume-control, .video-js .vjs-volume-panel:focus .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control:hover, .video-js .vjs-volume-panel .vjs-volume-control:active, .video-js .vjs-volume-panel .vjs-mute-control:hover ~ .vjs-volume-control, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active {
      visibility: visible;
      opacity: 1;
      position: relative;
      transition: visibility 0.1s, opacity 0.1s, height 0.1s, width 0.1s, left 0s, top 0s;
    }
    .video-js .vjs-volume-panel:hover .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control:hover.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-mute-control:hover ~ .vjs-volume-control.vjs-volume-horizontal, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-horizontal {
      width: 5em;
      height: 3em;
    }
    .video-js .vjs-volume-panel:hover .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control:hover.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-mute-control:hover ~ .vjs-volume-control.vjs-volume-vertical, .video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-vertical {
      left: -3.5em;
    }
    .video-js .vjs-volume-panel.vjs-volume-panel-horizontal:hover, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal:active, .video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active {
      width: 9em;
      transition: width 0.1s;
    }
    .video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-mute-toggle-only {
      width: 4em;
    }
    
    .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
      height: 8em;
      width: 3em;
      left: -3000em;
      transition: visibility 1s, opacity 1s, height 1s 1s, width 1s 1s, left 1s 1s, top 1s 1s;
    }
    
    .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
      transition: visibility 1s, opacity 1s, height 1s 1s, width 1s, left 1s 1s, top 1s 1s;
    }
    
    .video-js.vjs-no-flex .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
      width: 5em;
      height: 3em;
      visibility: visible;
      opacity: 1;
      position: relative;
      transition: none;
    }
    
    .video-js.vjs-no-flex .vjs-volume-control.vjs-volume-vertical,
    .video-js.vjs-no-flex .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
      position: absolute;
      bottom: 3em;
      left: 0.5em;
    }
    
    .video-js .vjs-volume-panel {
      display: flex;
    }
    
    .video-js .vjs-volume-bar {
      margin: 1.35em 0.45em;
    }
    
    .vjs-volume-bar.vjs-slider-horizontal {
      width: 5em;
      height: 0.3em;
    }
    
    .vjs-volume-bar.vjs-slider-vertical {
      width: 0.3em;
      height: 5em;
      margin: 1.35em auto;
    }
    
    .video-js .vjs-volume-level {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fff;
    }
    .video-js .vjs-volume-level:before {
      position: absolute;
      font-size: 0.9em;
    }
    
    .vjs-slider-vertical .vjs-volume-level {
      width: 0.3em;
    }
    .vjs-slider-vertical .vjs-volume-level:before {
      top: -0.5em;
      left: -0.3em;
    }
    
    .vjs-slider-horizontal .vjs-volume-level {
      height: 0.3em;
    }
    .vjs-slider-horizontal .vjs-volume-level:before {
      top: -0.3em;
      right: -0.5em;
    }
    
    .video-js .vjs-volume-panel.vjs-volume-panel-vertical {
      width: 4em;
    }
    
    .vjs-volume-bar.vjs-slider-vertical .vjs-volume-level {
      height: 100%;
    }
    
    .vjs-volume-bar.vjs-slider-horizontal .vjs-volume-level {
      width: 100%;
    }
    
    .video-js .vjs-volume-vertical {
      width: 3em;
      height: 8em;
      bottom: 8em;
      background-color: #2B333F;
      background-color: rgba(43, 51, 63, 0.7);
    }
    
    .video-js .vjs-volume-horizontal .vjs-menu {
      left: -2em;
    }
    
    .vjs-poster {
      display: inline-block;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: contain;
      background-color: #000000;
      cursor: pointer;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
    }
    
    .vjs-has-started .vjs-poster {
      display: none;
    }
    
    .vjs-audio.vjs-has-started .vjs-poster {
      display: block;
    }
    
    .vjs-using-native-controls .vjs-poster {
      display: none;
    }
    
    .video-js .vjs-live-control {
      display: flex;
      align-items: flex-start;
      flex: auto;
      font-size: 1em;
      line-height: 3em;
    }
    
    .vjs-no-flex .vjs-live-control {
      display: table-cell;
      width: auto;
      text-align: left;
    }
    
    .video-js:not(.vjs-live) .vjs-live-control,
    .video-js.vjs-liveui .vjs-live-control {
      display: none;
    }
    
    .video-js .vjs-seek-to-live-control {
      cursor: pointer;
      flex: none;
      display: inline-flex;
      height: 100%;
      padding-left: 0.5em;
      padding-right: 0.5em;
      font-size: 1em;
      line-height: 3em;
      width: auto;
      min-width: 4em;
    }
    
    .vjs-no-flex .vjs-seek-to-live-control {
      display: table-cell;
      width: auto;
      text-align: left;
    }
    
    .video-js.vjs-live:not(.vjs-liveui) .vjs-seek-to-live-control,
    .video-js:not(.vjs-live) .vjs-seek-to-live-control {
      display: none;
    }
    
    .vjs-seek-to-live-control.vjs-control.vjs-at-live-edge {
      cursor: auto;
    }
    
    .vjs-seek-to-live-control .vjs-icon-placeholder {
      margin-right: 0.5em;
      color: #888;
    }
    
    .vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-icon-placeholder {
      color: red;
    }
    
    .video-js .vjs-time-control {
      flex: none;
      font-size: 1em;
      line-height: 3em;
      min-width: 2em;
      width: auto;
      padding-left: 1em;
      padding-right: 1em;
    }
    
    .vjs-live .vjs-time-control {
      display: none;
    }
    
    .video-js .vjs-current-time,
    .vjs-no-flex .vjs-current-time {
      display: none;
    }
    
    .video-js .vjs-duration,
    .vjs-no-flex .vjs-duration {
      display: none;
    }
    
    .vjs-time-divider {
      display: none;
      line-height: 3em;
    }
    
    .vjs-live .vjs-time-divider {
      display: none;
    }
    
    .video-js .vjs-play-control {
      cursor: pointer;
    }
    
    .video-js .vjs-play-control .vjs-icon-placeholder {
      flex: none;
    }
    
    .vjs-text-track-display {
      position: absolute;
      bottom: 3em;
      left: 0;
      right: 0;
      top: 0;
      pointer-events: none;
    }
    
    .video-js.vjs-user-inactive.vjs-playing .vjs-text-track-display {
      bottom: 1em;
    }
    
    .video-js .vjs-text-track {
      font-size: 1.4em;
      text-align: center;
      margin-bottom: 0.1em;
    }
    
    .vjs-subtitles {
      color: #fff;
    }
    
    .vjs-captions {
      color: #fc6;
    }
    
    .vjs-tt-cue {
      display: block;
    }
    
    video::-webkit-media-text-track-display {
      transform: translateY(-3em);
    }
    
    .video-js.vjs-user-inactive.vjs-playing video::-webkit-media-text-track-display {
      transform: translateY(-1.5em);
    }
    
    .video-js .vjs-picture-in-picture-control {
      cursor: pointer;
      flex: none;
    }
    .video-js .vjs-fullscreen-control {
      cursor: pointer;
      flex: none;
    }
    .vjs-playback-rate > .vjs-menu-button,
    .vjs-playback-rate .vjs-playback-rate-value {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .vjs-playback-rate .vjs-playback-rate-value {
      pointer-events: none;
      font-size: 1.5em;
      line-height: 2;
      text-align: center;
    }
    
    .vjs-playback-rate .vjs-menu {
      width: 4em;
      left: 0em;
    }
    
    .vjs-error .vjs-error-display .vjs-modal-dialog-content {
      font-size: 1.4em;
      text-align: center;
    }
    
    .vjs-error .vjs-error-display:before {
      color: #fff;
      content: "X";
      font-family: Arial, Helvetica, sans-serif;
      font-size: 4em;
      left: 0;
      line-height: 1;
      margin-top: -0.5em;
      position: absolute;
      text-shadow: 0.05em 0.05em 0.1em #000;
      text-align: center;
      top: 50%;
      vertical-align: middle;
      width: 100%;
    }
    
    .vjs-loading-spinner {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -25px 0 0 -25px;
      opacity: 0.85;
      text-align: left;
      border: 6px solid rgba(43, 51, 63, 0.7);
      box-sizing: border-box;
      background-clip: padding-box;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      visibility: hidden;
    }
    
    .vjs-seeking .vjs-loading-spinner,
    .vjs-waiting .vjs-loading-spinner {
      display: block;
      -webkit-animation: vjs-spinner-show 0s linear 0.3s forwards;
              animation: vjs-spinner-show 0s linear 0.3s forwards;
    }
    
    .vjs-loading-spinner:before,
    .vjs-loading-spinner:after {
      content: "";
      position: absolute;
      margin: -6px;
      box-sizing: inherit;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      opacity: 1;
      border: inherit;
      border-color: transparent;
      border-top-color: white;
    }
    
    .vjs-seeking .vjs-loading-spinner:before,
    .vjs-seeking .vjs-loading-spinner:after,
    .vjs-waiting .vjs-loading-spinner:before,
    .vjs-waiting .vjs-loading-spinner:after {
      -webkit-animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
      animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
    }
    
    .vjs-seeking .vjs-loading-spinner:before,
    .vjs-waiting .vjs-loading-spinner:before {
      border-top-color: white;
    }
    
    .vjs-seeking .vjs-loading-spinner:after,
    .vjs-waiting .vjs-loading-spinner:after {
      border-top-color: white;
      -webkit-animation-delay: 0.44s;
      animation-delay: 0.44s;
    }
    
    @keyframes vjs-spinner-show {
      to {
        visibility: visible;
      }
    }
    @-webkit-keyframes vjs-spinner-show {
      to {
        visibility: visible;
      }
    }
    @keyframes vjs-spinner-spin {
      100% {
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes vjs-spinner-spin {
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes vjs-spinner-fade {
      0% {
        border-top-color: #73859f;
      }
      20% {
        border-top-color: #73859f;
      }
      35% {
        border-top-color: white;
      }
      60% {
        border-top-color: #73859f;
      }
      100% {
        border-top-color: #73859f;
      }
    }
    @-webkit-keyframes vjs-spinner-fade {
      0% {
        border-top-color: #73859f;
      }
      20% {
        border-top-color: #73859f;
      }
      35% {
        border-top-color: white;
      }
      60% {
        border-top-color: #73859f;
      }
      100% {
        border-top-color: #73859f;
      }
    }
    .vjs-chapters-button .vjs-menu ul {
      width: 24em;
    }
    
    .video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
      vertical-align: middle;
      display: inline-block;
      margin-bottom: -0.1em;
    }
    
    .video-js .vjs-subs-caps-button + .vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
      font-family: VideoJS;
      content: "";
      font-size: 1.5em;
      line-height: inherit;
    }
    
    .video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder {
      vertical-align: middle;
      display: inline-block;
      margin-bottom: -0.1em;
    }
    
    .video-js .vjs-audio-button + .vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before {
      font-family: VideoJS;
      content: " ";
      font-size: 1.5em;
      line-height: inherit;
    }
    
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-current-time,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-time-divider,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-duration,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-remaining-time,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-playback-rate,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-chapters-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-descriptions-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-captions-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-subtitles-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-audio-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-control, .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-current-time,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-time-divider,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-duration,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-remaining-time,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-playback-rate,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-chapters-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-descriptions-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-captions-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-subtitles-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-audio-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-control, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-current-time,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-time-divider,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-duration,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-remaining-time,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-playback-rate,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-chapters-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-descriptions-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-captions-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-subtitles-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-audio-button,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-control {
      display: none;
    }
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:active,
    .video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:active,
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:active,
    .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active {
      width: auto;
      width: initial;
    }
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small:not(.vjs-liveui) .vjs-subs-caps-button, .video-js:not(.vjs-fullscreen).vjs-layout-x-small:not(.vjs-live) .vjs-subs-caps-button, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-subs-caps-button {
      display: none;
    }
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui .vjs-custom-control-spacer, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-custom-control-spacer {
      flex: auto;
      display: block;
    }
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui.vjs-no-flex .vjs-custom-control-spacer, .video-js:not(.vjs-fullscreen).vjs-layout-tiny.vjs-no-flex .vjs-custom-control-spacer {
      width: auto;
    }
    .video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui .vjs-progress-control, .video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-progress-control {
      display: none;
    }
    
    .vjs-modal-dialog.vjs-text-track-settings {
      background-color: #2B333F;
      background-color: rgba(43, 51, 63, 0.75);
      color: #fff;
      height: 70%;
    }
    
    .vjs-text-track-settings .vjs-modal-dialog-content {
      display: table;
    }
    
    .vjs-text-track-settings .vjs-track-settings-colors,
    .vjs-text-track-settings .vjs-track-settings-font,
    .vjs-text-track-settings .vjs-track-settings-controls {
      display: table-cell;
    }
    
    .vjs-text-track-settings .vjs-track-settings-controls {
      text-align: right;
      vertical-align: bottom;
    }
    
    @supports (display: grid) {
      .vjs-text-track-settings .vjs-modal-dialog-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        padding: 20px 24px 0px 24px;
      }
    
      .vjs-track-settings-controls .vjs-default-button {
        margin-bottom: 20px;
      }
    
      .vjs-text-track-settings .vjs-track-settings-controls {
        grid-column: 1/-1;
      }
    
      .vjs-layout-small .vjs-text-track-settings .vjs-modal-dialog-content,
    .vjs-layout-x-small .vjs-text-track-settings .vjs-modal-dialog-content,
    .vjs-layout-tiny .vjs-text-track-settings .vjs-modal-dialog-content {
        grid-template-columns: 1fr;
      }
    }
    .vjs-track-setting > select {
      margin-right: 1em;
      margin-bottom: 0.5em;
    }
    
    .vjs-text-track-settings fieldset {
      margin: 5px;
      padding: 3px;
      border: none;
    }
    
    .vjs-text-track-settings fieldset span {
      display: inline-block;
    }
    
    .vjs-text-track-settings fieldset span > select {
      max-width: 7.3em;
    }
    
    .vjs-text-track-settings legend {
      color: #fff;
      margin: 0 0 5px 0;
    }
    
    .vjs-text-track-settings .vjs-label {
      position: absolute;
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      display: block;
      margin: 0 0 5px 0;
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
    
    .vjs-track-settings-controls button:focus,
    .vjs-track-settings-controls button:active {
      outline-style: solid;
      outline-width: medium;
      background-image: linear-gradient(0deg, #fff 88%, #73859f 100%);
    }
    
    .vjs-track-settings-controls button:hover {
      color: rgba(43, 51, 63, 0.75);
    }
    
    .vjs-track-settings-controls button {
      background-color: #fff;
      background-image: linear-gradient(-180deg, #fff 88%, #73859f 100%);
      color: #2B333F;
      cursor: pointer;
      border-radius: 2px;
    }
    
    .vjs-track-settings-controls .vjs-default-button {
      margin-right: 1em;
    }
    
    @media print {
      .video-js > *:not(.vjs-tech):not(.vjs-poster) {
        visibility: hidden;
      }
    }
    .vjs-resize-manager {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      z-index: -1000;
    }
    
    .js-focus-visible .video-js *:focus:not(.focus-visible) {
      outline: none;
      background: none;
    }
    
    .video-js *:focus:not(:focus-visible),
    .video-js .vjs-menu *:focus:not(:focus-visible) {
      outline: none;
      background: none;
    }
  </style>
</template>`;

videojsCss.register('videojs-css');