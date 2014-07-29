montageDefine("3c07db4","composer/swipe-composer",{dependencies:["../core/core","./composer"],factory:function(e,t){var i=(e("../core/core").Montage,e("./composer").Composer);t.SwipeComposer=i.specialize({load:{value:function(){document.addEventListener("touchstart",this,!0)}},unload:{value:function(){document.removeEventListener("touchstart",this,!0)}},_startX:{enumerable:!1,value:0},_startY:{enumerable:!1,value:0},_deltaX:{enumerable:!1,value:0},_deltaY:{enumerable:!1,value:0},_threshold:{enumerable:!1,value:50},_thresholdSwipeAngle:{enumerable:!1,value:20},_startTimestamp:{enumerable:!1,value:0},captureTouchstart:{value:function(e){this._reset();var t=e.touches,i=t[0];this._startX=i.clientX,this._startY=i.clientY,this._startTimestamp=e.timeStamp,document.addEventListener("touchmove",this,!0),document.addEventListener("touchend",this,!0),document.addEventListener("touchcancel",this,!0)}},_reset:{enumerable:!1,value:function(){this._startX=0,this._startY=0,this._deltaX=0,this._deltaY=0,this._startSwipeAngle=null}},_startSwipeAngle:{enumerable:!1,value:null},captureTouchcancel:{value:function(){document.removeEventListener("touchmove",this,!0),document.removeEventListener("touchend",this,!0),document.removeEventListener("touchcancel",this,!0)}},captureTouchmove:{value:function(e){e.preventDefault();var t,i,s=e.changedTouches[0];this._deltaX=s.clientX-this._startX,this._deltaY=s.clientY-this._startY;var r=this._deltaX,a=this._deltaY,n=this._threshold,c=this._findSwipeAngle(r,a);null!=this._startSwipeAngle&&Math.abs(this._startSwipeAngle-c)>this._thresholdSwipeAngle&&(this._startSwipeAngle=null),null==this._startSwipeAngle&&(this._startSwipeAngle=c,this._startX=s.clientX,this._startY=s.clientY,this._deltaX=0,this._deltaY=0),r>n&&a>n?i="DIAGONAL":r>n&&n>a?i=this._deltaX>0?"RIGHT":"LEFT":n>r&&a>n&&(i=this._deltaY>0?"DOWN":"UP"),(0!=r||0!=a)&&(t=document.createEvent("CustomEvent"),t.initCustomEvent("swipemove",!0,!1,null),t.direction=i,t.angle=this._startSwipeAngle,t.velocity=this._findVelocity(e.timeStamp-this._startTimestamp),t.startX=this._startX,t.startY=this._startY,t.dX=this._deltaX,t.dY=this._deltaY,this.dispatchEvent(t))}},_findSwipeAngle:{enumerable:!1,value:function(e,t){var i=-1*(180*Math.atan2(t,e)/3.14);return i.toFixed(2)}},captureTouchend:{value:function(e){if(null!=e){var t,i,s=Math.abs(this._deltaX),r=Math.abs(this._deltaY),a=this._threshold;if(a>s&&a>r)return this.captureTouchcancel(),void 0;document.removeEventListener("touchmove",this,!0),s>a&&r>a?t="DIAGONAL":s>a&&a>r?t=this._deltaX>0?"RIGHT":"LEFT":a>s&&r>a&&(t=this._deltaY>0?"DOWN":"UP"),i=document.createEvent("CustomEvent"),i.initCustomEvent("swipe",!0,!1,null),i.direction=t,i.angle=this._startSwipeAngle,i.velocity=this._findVelocity(e.timeStamp-this._startTimestamp),i.startX=this._startX,i.startY=this._startY,i.dX=this._deltaX,i.dY=this._deltaY,this.dispatchEvent(i)}}},_findVelocity:{enumerable:!1,value:function(e){return Math.sqrt(this._deltaX*this._deltaX+this._deltaY*this._deltaY)/e}}})}});