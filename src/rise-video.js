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
        
        #previewPlaceholder {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzA3cHgiIGhlaWdodD0iMTg2cHgiIHZpZXdCb3g9IjAgMCAzMDcgMTg2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MC4yICg1NTA0NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2NyZWVueS1pbWFnZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJoZi1kZXNrdG9wXzEtMl9pbWFnZS1kZWZhdWx0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzkuMDAwMDAwLCAtMzI2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0ic2NyZWVueS1pbWFnZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCAzMjYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNCI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9InNjcmVlbnkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBzdHJva2Utd2lkdGg9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuMDAwMDAwLCA1My4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHN0cm9rZT0iI0U2RTZFNiIgc3Ryb2tlLXdpZHRoPSIxMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIyMiIgaGVpZ2h0PSIxMjgiIHJ4PSI0Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUsMTQgTDE1LDMxIiBpZD0iTGluZSIgc3Ryb2tlPSIjRTZFNkU2IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTM4LDE3IEwyMyw0MyIgaWQ9IkxpbmUiIHN0cm9rZT0iI0U2RTZFNiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNjAsNDkuODg4MjM5IEMxNTkuOTk3MDU4LDQwLjAwNjg2NTYgMTUxLjk0MzExLDMyLjAwMjkyNDIgMTQyLDMyIEMxMzIuMDU2ODksMzIuMDAyOTI0MiAxMjQuMDAyOTQyLDQwLjAwNjg2NTYgMTI0LDQ5Ljg4ODIzOSBDMTI0LDUyLjcxMDIzNSAxMjYuMzA0MDcsNTUgMTI5LjE0MzY5OCw1NSBDMTMxLjk4MzMyNSw1NSAxMzQuMjg3Mzk2LDUyLjcxMDIzNSAxMzQuMjg3Mzk2LDQ5Ljg4ODIzOSBDMTM0LjI5MzI4MSw0NS42NTY3MDY3IDEzNy43NDIwMyw0Mi4yMjkzNzAzIDE0Miw0Mi4yMjA1OTc5IEMxNDYuMjU3OTcsNDIuMjI5MzcwMyAxNDkuNzA2NzE5LDQ1LjY1NjcwNjcgMTQ5LjcxMjYwNCw0OS44ODgyMzkgQzE0OS43MTI2MDQsNTIuNzEwMjM1IDE1Mi4wMTY2NzUsNTUgMTU0Ljg1NjMwMiw1NSBDMTU3LjY5NTkzLDU1IDE2MCw1Mi43MTAyMzUgMTYwLDQ5Ljg4ODIzOSBaIiBpZD0iU2hhcGUiIGZpbGw9IiNFNkU2RTYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTk4LDQ5Ljg4ODIzOSBDOTcuOTk3MDU3Myw0MC4wMDY4NjU2IDg5Ljk0NTM5MzgsMzIuMDAyOTI0MiA3OS45OTg1Mjg3LDMyIEM3MC4wNTQ2MDYyLDMyLjAwMjkyNDIgNjIuMDAyOTQyNyw0MC4wMDY4NjU2IDYyLDQ5Ljg4ODIzOSBDNjIsNTIuNzEwMjM1IDY0LjMwMTMxNjUsNTUgNjcuMTQxMTc1Nyw1NSBDNjkuOTgzOTc3Niw1NSA3Mi4yODUyOTQxLDUyLjcxMDIzNSA3Mi4yODUyOTQxLDQ5Ljg4ODIzOSBDNzIuMjk0MTIyMSw0NS42NTY3MDY3IDc1Ljc0MDIxMDgsNDIuMjI5MzcwMyA3OS45OTg1Mjg3LDQyLjIyMDU5NzkgQzg0LjI1OTc4OTIsNDIuMjI5MzcwMyA4Ny43MDU4Nzc5LDQ1LjY1NjcwNjcgODcuNzE0NzA1OSw0OS44ODgyMzkgQzg3LjcxNDcwNTksNTIuNzEwMjM1IDkwLjAxNjAyMjQsNTUgOTIuODU4ODI1LDU1IEM5NS42OTg2ODQzLDU1IDk4LDUyLjcxMDIzNSA5OCw0OS44ODgyMzkgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjRTZFNkU2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNGRkZGRkYiIGN4PSIyMDYuNSIgY3k9IjEyOC41IiByPSIyLjUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNDUuOTk5OTc3LDUgQzIwNC41ODQ3ODIsNSAxNzEsMjcuMzU5Njc5NCAxNzEsNTQuOTI0NTQ3MyBDMTcxLDc0LjM0MjE2MzUgMTg3LjY1NjYwMyw5MS4xMzQ1NTQzIDIxMS45MTczMDgsOTkuMzcyMzMwOSBDMjExLjY5MDk5NSwxMTIuODYwNTU5IDE5OC44ODE3MDUsMTIzLjM2MTQ2MSAxOTguODgxNzA1LDEyMy4zNjE0NjEgTDIzOS4zNDYzODgsMTA0LjYyMjc4MiBDMjQxLjUxODk4OSwxMDQuNzU4NTY5IDI0My43MzY4NTIsMTA0LjgwMzgzMiAyNDUuOTk5OTc3LDEwNC44MDM4MzIgQzI4Ny40MTUxNzMsMTA0LjgwMzgzMiAzMjAuOTk5OTU0LDgyLjQ0NDE1MjYgMzIwLjk5OTk1NCw1NC45MjQ1NDczIEMzMjEuMDQ1MjE3LDI3LjM1OTY3OTQgMjg3LjQ2MDQzNSw1IDI0NS45OTk5NzcsNSBaIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxMCIgZmlsbD0iI0U2RTZFNiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05MS41NjY2ODA1LDE0Mi4xNDY4NDUgQzk2LjQyOTQxOTYsMTQ2Ljg0NDI5OSAxMDIuOTMwNzU0LDE1MC40OTQ5MjYgMTEwLjQ4NDIwOCwxNTMuMDQyNjk3IEMxMTguMDQwNjA5LDE1NS41ODE2MjMgMTI2LjY3MjcwNywxNTcgMTM1Ljg1Mjk2OCwxNTcgQzE0NS4xNDIyNzMsMTU3IDE1My44NzE2MjUsMTU1LjU0OTE4NiAxNjEuNDkyODYzLDE1Mi45NDgzMzYgQzE2OS4xMTExNTQsMTUwLjM0MTU4NyAxNzUuNjQ0OTA2LDE0Ni42MTEzNDMgMTgwLjQ4NDA2OCwxNDEuODAxODMzIEMxODIuNDk5ODk1LDEzOS43OTM2OTQgMTgyLjUwNTc4OCwxMzYuNTI5MzYyIDE4MC40OTg4MDQsMTM0LjUxNTMyNSBDMTc4LjQ4ODg3MSwxMzIuNDk4MzM5IDE3NS4yMjkzNjMsMTMyLjQ5NTM5IDE3My4yMTM1MzcsMTM0LjUwMzUyOSBDMTY5LjgzNjE0NCwxMzcuODgyODY1IDE2NC42MjI2OTgsMTQwLjk5OTc1NyAxNTguMTY4NTE4LDE0My4xOTM2NzIgQzE1MS43MjAyMzIsMTQ1LjM5NjQzMyAxNDQuMDYwNjgyLDE0Ni42OTY4NTkgMTM1Ljg1Mjk2OCwxNDYuNjk2ODU5IEMxMjcuNzQyNTEsMTQ2LjY5Njg1OSAxMjAuMTY4NDI1LDE0NS40Mjg4NyAxMTMuNzY3MjkzLDE0My4yNzMyOSBDMTA3LjM2NjE2LDE0MS4xMjY1NTYgMTAyLjE1ODYxLDEzOC4wNzQ1MzggOTguNzM0MDYyNywxMzQuNzQyMzgzIEM5Ni42OTE3MTI2LDEzMi43NjA3ODMgOTMuNDI5MjU2OCwxMzIuODEzODYxIDkxLjQ1MTc0MjksMTM0Ljg2MDMzNSBDODkuNDcxMjgyLDEzNi45MDM4NiA4OS41MjQzMzA0LDE0MC4xNjgxOTMgOTEuNTY2NjgwNSwxNDIuMTQ2ODQ1IFoiIGlkPSJTaGFwZSIgZmlsbD0iI0U2RTZFNiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTcuMDAwMDAwLCAyNS4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImltYWdlcy1zb2xpZCIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01NywzNS41NTMwMzAzIEw1Nyw1LjYxMzYzNjM2IEM1NywyLjUxMzI3MTc4IDU0LjQ4NzE0ODEsMCA1MS4zODczMDE2LDAgTDYuNDg1NzE0MjksMCBDMy4zODU4Njc3MiwwIDAuODczMDE1ODczLDIuNTEzMjcxNzggMC44NzMwMTU4NzMsNS42MTM2MzYzNiBMMC44NzMwMTU4NzMsMzUuNTUzMDMwMyBDMC44NzMwMTU4NzMsMzguNjUzMzk0OSAzLjM4NTg2NzcyLDQxLjE2NjY2NjcgNi40ODU3MTQyOSw0MS4xNjY2NjY3IEw1MS4zODczMDE2LDQxLjE2NjY2NjcgQzU0LjQ4NzE0ODEsNDEuMTY2NjY2NyA1NywzOC42NTMzOTQ5IDU3LDM1LjU1MzAzMDMgWiBNMjAuMzAxNTg3MywxMi40NTgzMzMzIEMyMC4zMDE1ODczLDE1Ljc0OTA3MTIgMTcuNjQzNzYzMiwxOC40MTY2NjY3IDE0LjM2NTA3OTQsMTguNDE2NjY2NyBDMTEuMDg2Mzk1NSwxOC40MTY2NjY3IDguNDI4NTcxNDMsMTUuNzQ5MDcxMiA4LjQyODU3MTQzLDEyLjQ1ODMzMzMgQzguNDI4NTcxNDMsOS4xNjc1OTU0OSAxMS4wODYzOTU1LDYuNSAxNC4zNjUwNzk0LDYuNSBDMTcuNjQzNzYzMiw2LjUgMjAuMzAxNTg3Myw5LjE2NzU5NTQ5IDIwLjMwMTU4NzMsMTIuNDU4MzMzMyBaIE04LjQyODU3MTQzLDI5Ljg1OTIzMDQgTDE1LjA2NzU0MDYsMjMuMDQ2MTg3MyBDMTUuNjI3OTMzNCwyMi40NzExMDA5IDE2LjUzNjU2ODcsMjIuNDcxMTAwOSAxNy4wOTcwODEyLDIzLjA0NjE4NzMgTDIxLjgyMjUxMDgsMjcuODk1NjQwNiBMMzguMDI4NTc5NSwxMS4yNjQ2NDgxIEMzOC41ODg5NzI0LDEwLjY4OTU2MTcgMzkuNDk3NjA3NywxMC42ODk1NjE3IDQwLjA1ODEyMDEsMTEuMjY0NjQ4MSBMNTAuNTIzODA5NSwyMi4wMDQ4NzEgTDUwLjUyMzgwOTUsMzUuNzUgTDguNDI4NTcxNDMsMzUuNzUgTDguNDI4NTcxNDMsMjkuODU5MjMwNCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzguODMyMDIyNiw1Ny40MjkyNDEgTDMyLjk5Nzc5NzcsNTcuNDI5MjQxIEwzMi45OTc3OTc3LDY0LjU3MTU0MDIgQzMyLjk5Nzc5NzcsNjUuMzYwNzY0MiAzMi4zNTY5MTAyLDY2IDMxLjU2NTY0NjgsNjYgTDI4LjcwMTM0NDksNjYgQzI3LjkxMDA4MTUsNjYgMjcuMjY5MTk0LDY1LjM2MDc2NDIgMjcuMjY5MTk0LDY0LjU3MTU0MDIgTDI3LjI2OTE5NCw1Ny40MjkyNDEgTDIxLjQzNDk2OTEsNTcuNDI5MjQxIEMyMC4xNTY3NzQ0LDU3LjQyOTI0MSAxOS41MTg1NzIxLDU1Ljg4NTYxMTYgMjAuNDI2MTk3Nyw1NC45ODY1NzQ3IEwyOS4wNTY2OTc0LDQ2LjQ0MjU5OTQgQzI5LjY1MTkzNTEsNDUuODUyNDY2OSAzMC42MTMyNjY0LDQ1Ljg1MjQ2NjkgMzEuMjA4NTA0MSw0Ni40NDI1OTk0IEwzOS44MzkwMDM3LDU0Ljk4NjU3NDcgQzQwLjc0NzUyNDUsNTUuODg1NjExNiA0MC4xMTAyMTczLDU3LjQyOTI0MSAzOC44MzIwMjI2LDU3LjQyOTI0MSBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
          background-position: center;
          background-repeat: no-repeat;
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

  _handleStart() {
    if ( this._initialStart ) {
      this._initialStart = false;

      this.log( RiseVideo.LOG_TYPE_INFO, RiseVideo.EVENT_VIDEO_START, { files: this.files });

      this._start();
    }
  }

  _start() {
    const isPreview = this._isPreview;
    let filesList;

    this.$.previewPlaceholder.style.display = isPreview ? "block" : "";

    if ( this._isPreview ) {
      return;
    }
    
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

  get _isPreview() {
    return RisePlayerConfiguration.isPreview();
  }
}

customElements.define( "rise-video", RiseVideo );
