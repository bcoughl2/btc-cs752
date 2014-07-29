var global=window;(function(e,t){"object"==typeof exports?t(module.exports):"function"==typeof define&&define.amd?define([],function(){return t(e)}):t(e)})(this,function(e){"use strict";var t=["buffers","bufferViews","images","videos","samplers","textures","shaders","programs","techniques","materials","accessors","meshes","cameras","lights","skins","nodes","scenes","animations"],n=Object.create(Object.prototype,{_rootDescription:{value:null,writable:!0},rootDescription:{set:function(e){this._rootDescription=e},get:function(){return this._rootDescription}},baseURL:{value:null,writable:!0},_isAbsolutePath:{value:function(e){var t=RegExp("^"+window.location.protocol,"i");return e.match(t)?!0:!1}},resolvePathIfNeeded:{value:function(e){return this._isAbsolutePath(e)?e:this.baseURL+e}},_resolvePathsForCategories:{value:function(e){e.forEach(function(e){var t=this.json[e];if(t){var n=Object.keys(t);n.forEach(function(e){var n=t[e];n.path=this.resolvePathIfNeeded(n.path)},this)}},this)}},_json:{value:null,writable:!0},json:{enumerable:!0,get:function(){return this._json},set:function(e){this._json!==e&&(this._json=e,this._resolvePathsForCategories(["buffers","shaders","images","videos"]))}},_path:{value:null,writable:!0},getEntryDescription:{value:function(e,t){var n=null,i=t;return n=this.rootDescription[i],n?n?n[e]:null:(console.log("ERROR:CANNOT find expected category named:"+i),null)}},_stepToNextCategory:{value:function(){return this._state.categoryIndex=this.getNextCategoryIndex(this._state.categoryIndex+1),-1!==this._state.categoryIndex?(this._state.categoryState.index=0,!0):!1}},_stepToNextDescription:{enumerable:!1,value:function(){var e=this._state.categoryState,t=e.keys;return t?(e.index++,e.keys=null,e.index>=t.length?this._stepToNextCategory():!1):(console.log("INCONSISTENCY ERROR"),!1)}},hasCategory:{value:function(e){return this.rootDescription[e]?!0:!1}},_handleState:{value:function(){for(var e={buffers:this.handleBuffer,bufferViews:this.handleBufferView,shaders:this.handleShader,programs:this.handleProgram,techniques:this.handleTechnique,materials:this.handleMaterial,meshes:this.handleMesh,cameras:this.handleCamera,lights:this.handleLight,nodes:this.handleNode,scenes:this.handleScene,images:this.handleImage,animations:this.handleAnimation,accessors:this.handleAccessor,skins:this.handleSkin,samplers:this.handleSampler,textures:this.handleTexture,videos:this.handleVideo},n=!0;-1!==this._state.categoryIndex;){var i=t[this._state.categoryIndex],r=this._state.categoryState,a=r.keys;if(a||(r.keys=a=Object.keys(this.rootDescription[i]),!a||0!=a.length)){var s=i,o=a[r.index],l=this.getEntryDescription(o,s);if(l){if(e[s]&&e[s].call(this,o,l,this._state.userInfo)===!1){n=!1;break}this._stepToNextDescription()}else if(this.handleError){this.handleError("INCONSISTENCY ERROR: no description found for entry "+o),n=!1;break}}else this._stepToNextDescription()}this.handleLoadCompleted&&this.handleLoadCompleted(n)}},_loadJSONIfNeeded:{enumerable:!0,value:function(e){var t=this;if(this._json)e&&e(this.json);else{var n=this._path,i=n.lastIndexOf("/");this.baseURL=0!==i?n.substring(0,i+1):"";var r=new XMLHttpRequest;r.open("GET",n,!0),r.onreadystatechange=function(){4==r.readyState&&200==r.status&&(t.json=JSON.parse(r.responseText),e&&e(t.json))},r.send(null)}}},_buildLoader:{value:function(e){function t(t){n.rootDescription=t,e&&e(this)}var n=this;this._loadJSONIfNeeded(t)}},_state:{value:null,writable:!0},_getEntryType:{value:function(){for(var e=t,n=0;e.length>n;n++){var i=this.rootDescription[e[n]];if(i)return e[n]}return null}},getNextCategoryIndex:{value:function(e){for(var n=e;t.length>n;n++)if(this.hasCategory(t[n]))return n;return-1}},load:{enumerable:!0,value:function(e,t){var n=this;this._buildLoader(function(){var i=n.getNextCategoryIndex.call(n,0);-1!==i&&(n._state={userInfo:e,options:t,categoryIndex:i,categoryState:{index:"0"}},n._handleState())})}},initWithPath:{value:function(e){return this._path=e,this._json=null,this}},_knownURLs:{writable:!0,value:{}},loaderContext:{value:function(){return this._knownURLs[this._path]===void 0&&(this._knownURLs[this._path]=Object.keys(this._knownURLs).length),"__"+this._knownURLs[this._path]}},initWithJSON:{value:function(e,t){return this.json=e,this.baseURL=t,t||console.log("WARNING: no base URL passed to Reader:initWithJSON"),this}}});return e&&(e.glTFParser=n),n});