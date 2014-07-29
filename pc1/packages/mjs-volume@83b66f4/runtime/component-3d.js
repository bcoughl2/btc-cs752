var Montage=require("montage").Montage,glTFNode=require("runtime/glTF-node").glTFNode,Transform=require("runtime/transform").Transform,Target=require("montage/core/target").Target,Set=require("collections/set"),CSSOM=require("cssom");require("runtime/dependencies/gl-matrix"),exports.Component3D=Target.specialize({_ENTER:{value:"COMPONENT_ENTER"},_EXIT:{value:"COMPONENT_EXIT"},_TOUCH_DOWN:{value:"_TOUCH_DOWN"},_TOUCH_UP:{value:"_TOUCH_UP"},self:{get:function(){return this}},constructor:{value:function(){this._hasUnresolvedId=!0,this._state=this.__STYLE_DEFAULT__,this.super()}},handleEnteredDocument:{value:function(){}},shouldPerformHitTest:{value:!1},addEventListener:{value:function(e,t,n){if(this.scene){var i=Montage.getInfoForObject(this).objectName;"Node"==i?this.scene.nodesShouldBeHitTested=!0:"Material"==i&&(this.scene.materialsShouldBeHitTested=!0)}this.shouldPerformHitHest=!0,this.super(e,t,n)}},_glTFElement:{value:null,writable:!0},glTFElement:{get:function(){return this._glTFElement},set:function(e){this._glTFElement=e}},_scene:{value:null,writable:!0},scene:{get:function(){return this._scene},set:function(e){this._scene=e,this._sceneDidChange()}},baseURL:{get:function(){return this.scene?this.scene.glTFElement.baseURL:null}},_isAbsolutePath:{value:function(e){var t=RegExp("^"+window.location.protocol,"i");return e.match(t)?!0:!1}},resolvePathIfNeeded:{value:function(e){return this._isAbsolutePath(e)?e:this.baseURL+e}},name:{get:function(){return this.glTFElement?this.glTFElement.name:void 0},set:function(e){this.glTFElement&&(this.glTFElement.name=e)}},_hasUnresolvedId:{value:!1,writable:!0},handleStatusChange:{value:function(e){"loaded"===e&&this._id&&(this.glTFElement=this.scene.glTFElement.ids[this._id],null==this.glTFElement&&this.scene.glTFElement.rootNode.id==this._id&&(this.glTFElement=this.scene.glTFElement.rootNode),this.glTFElement&&(this._hasUnresolvedId=!1,this.glTFElement.component3D=this,this.classListDidChange(),this.shouldPerformHitHest&&(this.scene.shouldBeHitTested=!0)))}},resolveIdIfNeeded:{value:function(){if(this._hasUnresolvedId&&null!=this.scene){if("loaded"!==this.scene.status)return this.scene.addOwnPropertyChangeListener("status",this),void 0;this._id&&this.handleStatusChange(this.scene.status,"status",this.scene)}}},_idDidChange:{value:function(){this.resolveIdIfNeeded()}},_sceneDidChange:{value:function(){this.resolveIdIfNeeded(),this.scene&&(this.scene.addEventListener("enteredDocument",this),this.scene.addEventListener("styleSheetsDidLoad",this))}},__STYLE_DEFAULT__:{value:"__default__"},_state:{value:this.__STYLE_DEFAULT__,writable:!0},_stateForSelectorName:{value:function(e){return-1!==e.indexOf(":active")?(this.scene&&(this.scene.shouldBeHitTested=!0),"active"):-1!==e.indexOf(":hover")?(this.scene&&(this.scene.shouldBeHitTested=!0),"hover"):-1!==e.indexOf(":")?null:this.__STYLE_DEFAULT__}},_style:{value:null,writable:!0},_defaultTransition:{value:{duration:0,timingFunction:"ease",delay:0}},_createDefaultStyleIfNeeded:{value:function(){return null==this._style&&(this._style={}),null==this._style.transitions&&(this._style.transitions={}),this._style}},_createStyleStateAndPropertyIfNeeded:{value:function(e,t){var n=this._createDefaultStyleIfNeeded();null==n[e]&&(n[e]={});var i=n[e];return null==i[t]&&(i[t]={}),i[t]}},_getStylePropertyObject:{value:function(e,t){return this._createStyleStateAndPropertyIfNeeded(e,t)}},_checkTransformConsistency:{value:function(e,t){return e.length!=t?(console.log("Component3D: CSS transform ignored got:"+e.length+" but expecting:"+t),!1):!0}},_createVectorFromCSSTransformOriginDeclaration:{value:function(e){var t,n=e.split(" ");return n.length>=2?(t=vec2.create(),t[0]=parseFloat(n[0]),t[1]=parseFloat(n[1]),t):vec2.createFrom(50,50)}},_createTransformFromCSS:{value:function(e){var t,n,i,r=3.1415926535,a=r/180,s=Object.create(Transform).init(),o=mat4.identity(),l=0;e=e.trim();for(var u,c=0,h=0,d=0,f=0,m=0;-1!==c&&(c=e.indexOf("(",l),-1!==c)&&(u=e.substring(l,c),l=c+1,c=e.indexOf(")",l),-1!==c);){for(var p=e.substring(l,c),v=-1!==p.indexOf(",")?p.split(","):[p],_=new Float32Array(v.length),g=0;v.length>g;g++)_[g]=parseFloat(v[g]);switch(l=c+1,u.trim()){case"matrix3d":if(this._checkTransformConsistency(_,16)){var b=_,y=mat4.createFrom(b[0],b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8],b[9],b[10],b[11],b[12],b[13],b[14],b[15]);mat4.multiply(o,y),m++}break;case"translate3d":this._checkTransformConsistency(_,3)&&(0===f&&(s.translation=vec3.create(_)),mat4.translate(o,_),f++);break;case"translateX":this._checkTransformConsistency(_,1)&&(n=[_[0],0,0],0===f&&(s.translation=vec3.create(n)),mat4.translate(o,n),f++);break;case"translateY":this._checkTransformConsistency(_,1)&&(n=[0,_[0],0],0===f&&(s.translation=vec3.create(n)),mat4.translate(o,n),f++);break;case"translateZ":this._checkTransformConsistency(_,1)&&(n=[0,0,_[0]],0===f&&(s.translation=vec3.create(n)),mat4.translate(o,n),f++);break;case"scale3d":this._checkTransformConsistency(_,3)&&(0===h&&(s.scale=vec3.create(_)),mat4.scale(o,_),f++);break;case"scaleX":this._checkTransformConsistency(_,1)&&(i=[_[0],1,1],0===h&&(s.scale=vec3.create(i)),mat4.scale(o,i),h++);break;case"scaleY":this._checkTransformConsistency(_,1)&&(i=[1,_[0],1],0===h&&(s.scale=vec3.create(i)),mat4.scale(o,i),h++);break;case"scaleZ":this._checkTransformConsistency(_,1)&&(i=[1,1,_[0]],0===h&&(s.scale=vec3.create(i)),mat4.scale(o,i),h++);break;case"rotate3d":this._checkTransformConsistency(_,4)&&(_[3]*=a,0===d&&(s.rotation=_),mat4.rotate(o,_[3],_),d++);break;case"rotateX":this._checkTransformConsistency(_,1)&&(t=[1,0,0,_[0]],t[3]*=a,0===d&&(s.rotation=t),mat4.rotate(o,t[3],t),d++);break;case"rotateY":this._checkTransformConsistency(_,1)&&(t=[0,1,0,_[0]],t[3]*=a,0===d&&(s.rotation=t),mat4.rotate(o,t[3],t),d++);break;case"rotateZ":this._checkTransformConsistency(_,1)&&(t=[0,0,1,_[0]],t[3]*=a,0===d&&(s.rotation=t),mat4.rotate(o,t[3],t),d++);break;case"perspective":c=-1;break;default:c=-1}}return(h>1||d>1||f>1||m>0)&&(s.matrix=o),s}},_createTransitionFromComponents:{value:function(e){var t={},n=["duration","timing-function","delay"],i=["ease","linear","ease-in","ease-out","ease-in-out","step-start"],r=0;return e.forEach(function(a){var s=!1,o=r;do"duration"===n[o]?-1===i.indexOf(a)&&(s=!0,t.duration=parseFloat(a),r=o):"timing-function"===n[o]?-1!==i.indexOf(a)&&(s=!0,t.timingFunction=a,r=o):"delay"===n[o]&&o==e.length-1&&(s=!0,t.delay=parseFloat(a)),o++;while(n.length>r&&0==s)},this),null==t.duration&&(t.duration=0),null==t.timingFunction&&(t.timingFunction="ease"),null==t.delay&&(t.delay=0),t}},_applyCSSPropertyWithValueForState:{value:function(e,t,n){if(null==n||null==t)return!1;if("transition"!==t&&-1===this.styleableProperties.indexOf(t))return!1;var i=this._getStylePropertyObject(e,t);switch(t){case"transition":var r=n.split(" ");if(r.length>0){var a=r.shift();if(a=this.propertyNameFromCSS(a),-1!==this.styleableProperties.indexOf(a)&&r.length>0){var s=this._createTransitionFromComponents(r);if(null!=s){var o=this._createDefaultStyleIfNeeded();o.transitions[a]=s}}}break;case"offsetTransform":i.value="string"==typeof n?this._createTransformFromCSS(n):n;break;case"transformOrigin":i.value="string"==typeof n?this._createVectorFromCSSTransformOriginDeclaration(n):n;break;case"transformZOrigin":i.value="string"==typeof n?parseFloat(n):n;break;case"visibility":i.value=n;break;case"opacity":i.value="string"==typeof n?parseFloat(n):n;break;case"cursor":i.value=n;break;default:return!1}return!0}},propertyNameFromCSS:{value:function(e){return"-webkit-transform"===e&&(e="transform"),"-webkit-transform-origin"===e&&(e="transform-origin"),"-montage-transform-z-origin"===e&&(e="transformZOrigin"),"transform"===e&&(e="offsetTransform"),"transform-origin"===e&&(e="transformOrigin"),e}},_dumpStyle:{value:function(e){console.log("**dump style:"+e);var t=this._style[e];for(var n in t){var i=t[n];if(null!=i.value)switch(n){case"offsetTransform":console.log("property:"+n+" value:"+mat4.str(i.value.matrix));break;default:console.log("property:"+n+" value:"+i.value)}}}},_dumpAllStyles:{value:function(){console.log("******** dump styles ********");for(var e in this._style)this._dumpStyle(e)}},_applyStyleRule:{value:function(e,t){var n=this._stateForSelectorName(e),i=null;if(t.style){n===this.__STYLE_DEFAULT__&&this.styleableProperties.forEach(function(e){i=this._getStylePropertyObject(n,e),null==i.value&&this._applyCSSPropertyWithValueForState(n,e,this.initialValueForStyleableProperty(e))},this);var r=t.style.length;if(r>0){for(var a=null,s=0;r>s;s++){var o=t.style[s],l=t.style[o];o=this.propertyNameFromCSS(o),-1!=o.indexOf("transition-")?(null==a&&(a={}),a[o]=l):this._applyCSSPropertyWithValueForState(n,o,l)}if(null!=a){o="transition";var u="";null!=a["transition-property"]&&(u+=a["transition-property"],null!=a["transition-duration"]&&(u+=" ",u+=a["transition-duration"]),null!=a["transition-timing-function"]&&(u+=" ",u+=a["transition-timing-function"]),null!=a["transition-timing-delay"]&&(u+=" ",u+=a["transition-timing-delay"]),this._applyCSSPropertyWithValueForState(n,o,u))}}}}},_removeStyleRule:{value:function(e,t){if(t.style){var n=t.style.length;if(n>0)for(var i=0;n>i;i++){var r=t.style[i];t.style[r],r=this.propertyNameFromCSS(r);var a=this._stateForSelectorName(e);if(null!=a){var s=this._getStylePropertyObject(a,r);s.value=this.initialValueForStyleableProperty(r)}}}}},appliedProperties:{value:null,writable:!0},_executeStylesForState:{value:function(e){null==this.appliedProperties&&(this.appliedProperties={}),null!=this.styleableProperties&&this.styleableProperties.forEach(function(t){var n=this._getStylePropertyObject(e,t),i=!1;n&&(null!=n.value&&(i=!0,this.appliedProperties[t]!==n.value&&(this[t]=n.value,this.appliedProperties[t]=n.value)),0==i&&(n=this._getStylePropertyObject(this.__STYLE_DEFAULT__,t),null!=n.value&&(i=!0,this.appliedProperties[t]!==n.value&&(this[t]=n.value,this.appliedProperties[t]=n.value))))},this)}},_applySelectorNamed:{value:function(e){var t=this.retrieveCSSRule(e);t&&this._applyStyleRule(e,t)}},_applyClassNamed:{value:function(e){this._applySelectorNamed("."+e),this._applySelectorNamed("."+e+":hover"),this._applySelectorNamed("."+e+":active")}},_removeSelectorNamed:{value:function(e){var t=this.retrieveCSSRule(e);t&&this._removeStyleRule(e,t)}},_removeClassNamed:{value:function(e){this._removeSelectorNamed("."+e+":hover"),this._removeSelectorNamed("."+e+":active"),this._removeSelectorNamed("."+e)}},_removeSelectorsForState:{value:function(e){for(var t=this.classList.enumerate(),n=0;t.length>n;n++){var i=t[n][1];this._removeClassNamed(i,e)}}},classListDidChange:{value:function(){if(this.classList){for(var e=this.classList.enumerate(),t=0;e.length>t;t++){var n=e[t][1];this._applyClassNamed(n)}this._executeStylesForState(this._state)}}},_id:{value:null,writable:!0},id:{get:function(){return this._id},set:function(e){e!=this._id&&(this._id=e,this._idDidChange())}},initWithScene:{value:function(e){return this.scene=e,this}},_classList:{value:null},classList:{get:function(){return null==this._classList&&(this._classList=new Set,this._classList.addRangeChangeListener(this,"classList")),this._classList},set:function(e){if(this._classList!==e){if(null!=this._classList&&this._classList.removeRangeChangeListener(this,"classList"),null!=e){var t=this;e instanceof Array?(this._classList=new Set,e.forEach(function(e){t._classList.add(e)},this),e=this._classList):this._classList=e}this._classList.addRangeChangeListener(this,"classList"),this.classListDidChange()}}},handleClassListRangeChange:{value:function(e,t){return null!=e&&e.forEach(function(e){this._applyClassNamed(e)},this),null!=t?(t.forEach(function(e){this._removeClassNamed(e)},this),this.classListDidChange(),void 0):(this._executeStylesForState(this._state),void 0)}},cssDescriptions:{value:null,writable:!0},handleStyleSheetsDidLoad:{value:function(){this.scene.removeEventListener("styleSheetsDidLoad",this),this.classListDidChange()}},retrieveCSSRule:{value:function(e){for(var t in this.scene.styleSheets)for(var n=this.scene.styleSheets[t],i=n.cssRules,r=0;i.length>r;r++){var a=i[r];if(null!=a.selectorText&&a.selectorText===e)return a}}},handleActionOnGlTFElement:{value:function(e,t){var n=this.__STYLE_DEFAULT__;switch(t){case this._ENTER:n="hover";var i=document.createEvent("CustomEvent");i.initCustomEvent("hover",!0,!0,{glTFElement:e}),this.dispatchEvent(i);break;case this._EXIT:n=this.__STYLE_DEFAULT__;break;case this._TOUCH_DOWN:n="active";var r=document.createEvent("CustomEvent");r.initCustomEvent("action",!0,!0,{glTFElement:e}),this.dispatchEvent(r);break;case this._TOUCH_UP:n=this.__STYLE_DEFAULT__}n!==this._state&&(this._state=n,this._executeStylesForState(n))}},deserializedFromTemplate:{value:function(e,t){this.nextTarget=e,this.identifier=t}},blueprintModuleId:require("montage")._blueprintModuleIdDescriptor,blueprint:require("montage")._blueprintDescriptor});