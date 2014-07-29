montageDefine("3c07db4","core/application",{dependencies:["./core","./target","../window-loader/montage-window","./dom","./template"],factory:function(e,t){var i,s=(e("./core").Montage,e("./target").Target),r=e("../window-loader/montage-window").MontageWindow;e("./dom"),t.Application=s.specialize({eventManager:{value:null},parentApplication:{value:null},mainApplication:{get:function(){for(var e=this;e.parentApplication;)e=e.parentApplication;return e}},_windowsSortOrder:{value:"reverse-z-order"},windowsSortOrder:{get:function(){return null==this.parentApplication?this._windowsSortOrder:this.mainApplication.windowsSortOrder},set:function(e){null==this.parentApplication?-1!==["z-order","reverse-z-order","z-order","reverse-open-order"].indexOf(e)&&(this._windowsSortOrder=e):this.mainApplication.windowsSortOrder=e}},windows:{get:function(){var e;if(null==this.parentApplication){if(!this._windows){var e=new r;e.application=this,e.window=window,this.window=e,this._windows=[this.window],this._multipleWindow=!0}return this._windows}return this.mainApplication.windows}},_window:{value:null},window:{get:function(){if(!this._window&&this==this.mainApplication){var e=new r;e.application=this,e.window=window,this._window=e}return this._window},set:function(e){this._window||(this._window=e)}},attachedWindows:{value:[]},eventManagerForWindow:{value:function(e){return e.defaultEventMananger}},focusWindow:{get:function(){var e=this.windows,t=this.windowsSortOrder;if("z-order"==t)return e[0];if("reverse-z-order"==t)return e[e.length-1];for(var i in e)if(e[i].focused)return e[i]}},delegate:{value:null},nextTarget:{get:function(){return this.delegate}},openWindow:{value:function(e,t,i){var s,n,a=this,o=new r,c={location:!1,menubar:!1,resizable:!0,scrollbars:!0,status:!1,titlebar:!0,toolbar:!1},u={module:e,name:t,parent:window,callback:function(e,t){var i;s=e.document.application,o.window=e,o.application=s,o.component=t,s.window=o,a.attachedWindows.push(o),i=a.mainApplication.windowsSortOrder,"z-order"==i||"reverse-open-order"==i?a.windows.unshift(o):a.windows.push(o),n=document.createEvent("CustomEvent"),n.initCustomEvent("load",!0,!0,null),o.dispatchEvent(n)}};if(this!==this.mainApplication||this._multipleWindow||this.window,"object"==typeof i){var f,m,l="",_="";for(f in i)i.hasOwnProperty(f)&&(c[f]=i[f])}var d=["name"];for(f in c)-1==d.indexOf(f)&&(m=c[f],"boolean"==typeof m?m=m?"yes":"no":(m+="",m.match(/[ ,"]/)&&(m='"'+m.replace(/"/g,'\\"')+'"')),_+=l+f+"="+m,l=",");return window.require.loadPackage({name:"montage"}).then(function(e){var t=window.open(e.location+"window-loader/index.html","_blank",_);t.loadInfo=u}).done(),o}},attachWindow:{value:function(e){var t,i=e.application.parentApplication;return i!==this&&(i&&i.detachWindow(e),e.parentApplication=this,this.attachedWindows.push(e),t=this.mainApplication.windowsSortOrder,"z-order"==t||"reverse-open-order"==t?this.windows.unshift(e):this.windows.push(e),e.focus()),e}},detachWindow:{value:function(e){var t,i,s=this.windows;return void 0===e&&(e=this.window),i=e.application.parentApplication,i==this?(t=this.attachedWindows.indexOf(e),-1!==t&&this.attachedWindows.splice(t,1),t=s.indexOf(e),-1!==t&&s.splice(t,1),e.application.parentApplication=null):i&&i.detachWindow(e),e}},constructor:{value:function(){window.loadInfo&&!this.parentApplication&&(this.parentApplication=window.loadInfo.parent.document.application)}},_load:{value:function(i,s){var r,n=this;t.application=n,e.async("ui/component").then(function(t){return r=t.__root__,r.element=document,e("./template").instantiateDocument(window.document,i).then(function(){n.callDelegateMethod("willFinishLoading",n),r.needsDraw=!0,s&&s(n)})}).done()}},_alertPopup:{value:null,enumerable:!1},_confirmPopup:{value:null,enumerable:!1},_notifyPopup:{value:null,enumerable:!1},_zIndex:{value:null},_isSystemPopup:{value:function(e){return"alert"===e||"confirm"===e||"notify"===e}},_createPopupSlot:{value:function(e){var t=document.createElement("div");document.body.appendChild(t),t.style.zIndex=e,t.style.position="absolute";var s=new i;return s.element=t,s.attachToParentComponent(),s}},getPopupSlot:{value:function(t,s,r){var n=this;e.async("ui/slot.reel/slot").then(function(e){i=i||e.Slot,t=t||"custom";var a,o,c=n._isSystemPopup(t);if(n.popupSlots=n.popupSlots||{},c)switch(t){case"alert":a=9004;break;case"confirm":a=9003;break;case"notify":a=9002}else n._zIndex=n._zIndex?n._zIndex+1:7e3,a=n._zIndex;o=n.popupSlots[t],o||(o=n.popupSlots[t]=n._createPopupSlot(a)),c||(o.element.style.zIndex=a),o.content=s,r.call(this,o)}).done()}},returnPopupSlot:{value:function(e){var t=this;if(t.popupSlots&&t.popupSlots[e]){var i=t.popupSlots[e];i.content=null}}},_getActivePopupSlots:{value:function(){var e=[];if(this.popupSlots){var t=Object.keys(this.popupSlots);if(t&&t.length>0){var i,s=0,r=t.length;for(s=0;r>s;s++)i=this.popupSlots[t[s]],i&&null!==i.content&&e.push(i)}}return e}}})}});