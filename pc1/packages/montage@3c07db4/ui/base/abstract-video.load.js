montageDefine("3c07db4","ui/base/abstract-video",{dependencies:["../../core/core","../component","../../core/media-controller"],factory:function(e,t){var r=e("../../core/core").Montage,n=e("../component").Component,i=e("../../core/media-controller").MediaController,a=t.AbstractVideo=n.specialize({constructor:{value:function a(){if(this.constructor===a)throw Error("AbstractVideo cannot be instantiated.");n.constructor.call(this)}},_mediaElement:{value:null},mediaElement:{get:function(){return this._mediaElement},set:function(e){this._mediaElement&&(this._mediaElement.controller=null),this._mediaElement=e,this.videoController&&(this._mediaElement.controller=this.videoController.mediaController)}},_videoController:{value:null},videoController:{get:function(){return this._videoController},set:function(e){e&&(this._videoController=e,this.mediaElement&&(this.mediaElement.controller=e.mediaController))}},_src:{value:null},src:{get:function(){return this._src},set:function(e){this._src=e}},_sources:{value:[]},sources:{get:function(){return this._sources},set:function(e){if(e&&e.length){for(var t=this.element.ownerDocument.createElement("video"),r=0;e.length>r;r++){var n=e[r].src,i=e[r].type;if(i&&t.canPlayType(i)){this.src=n;break}}this._sources=e}}},loadMedia:{value:function(){this.mediaElement.src=this.src,this.mediaElement.load()}},_repeat:{value:!1},repeat:{get:function(){return this._repeat},set:function(e){e!==this._repeat&&(this._repeat=e,e?this.mediaElement.setAttribute("loop","true"):this.mediaElement.removeAttribute("loop"),this.needsDraw=!0)}},toggleRepeat:{value:function(){this.repeat=!this.repeat}},_posterSrc:{value:null},posterSrc:{get:function(){return this._posterSrc},set:function(e){this._posterSrc=e}},showPoster:{value:function(){this.posterSrc&&this.mediaElement&&(this.mediaElement.poster=this.posterSrc)}},supportsFullScreen:{value:!0},_isFullScreen:{value:!1},isFullScreen:{get:function(){return this._isFullScreen}},toggleFullScreen:{value:function(){this.supportsFullScreen&&(this._isFullScreen=!this._isFullScreen,this._isFullScreen?this.element.webkitEnterFullScreen?this.element.webkitEnterFullScreen():this.element.webkitRequestFullScreen&&this.element.webkitRequestFullScreen():this.element.webkitExitFullscreen?this.element.webkitExitFullscreen():this.element.webkitCancelFullScreen?this.element.webkitCancelFullScreen():this.element.ownerDocument.webkitCancelFullScreen&&this.element.ownerDocument.webkitCurrentFullScreenElement===this.element&&this.element.ownerDocument.webkitCancelFullScreen(),this.needsDraw=!0)}},handleControllerStatusChange:{value:function(){this.needsDraw=!0}},handleControllerVolumeChange:{value:function(){this.needsDraw=!0}},enterDocument:{value:function(e){if(e){if(this.originalElement.hasAttribute("src")&&this.originalElement.getAttribute("src"))this.src=this.originalElement.getAttribute("src");else for(var t,n,a=this.originalElement.getElementsByTagName("source"),s=0;a.length>s;s++)if(t=a[s].getAttribute("src"),n=a[s].getAttribute("type"),!n||this.mediaElement.canPlayType(n)){this.src=t;break}for(var o=this.originalElement.getElementsByTagName("track"),s=0;o.length>s;s++){var l=o[s].getAttribute("kind");if("captions"==l||"subtitles"==l){var u=document.createElement("track");u.kind=l,u.label=o[s].getAttribute("label"),u.src=o[s].getAttribute("src"),u.srclang=o[s].getAttribute("srclang"),u.default=o[s].hasAttribute("default"),this.mediaElement.appendChild(u),this.mediaElement.textTracks[this.mediaElement.textTracks.length-1].mode="showing"}}this.addPathChangeListener("videoController.status",this,"handleControllerStatusChange"),this.addPathChangeListener("videoController.volume",this,"handleControllerVolumeChange"),this.videoController||(this.videoController=r.create(i)),this.mediaElement.controller=this.videoController.mediaController}}}})}});