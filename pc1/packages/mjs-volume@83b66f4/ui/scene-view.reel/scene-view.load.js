montageDefine("83b66f4","ui/scene-view.reel/scene-view",{dependencies:["runtime/dependencies/gl-matrix","montage","montage/ui/component","runtime/glsl-program","runtime/helpers/resource-manager","runtime/glTF-scene","runtime/glTF-node","runtime/scene","runtime/node","runtime/scene-renderer","runtime/glTF-material","runtime/utilities","montage/core/dom","montage/core/geometry/point","montage/composer/translate-composer","runtime/builtin-assets","runtime/webgl-renderer","runtime/projection","runtime/animation","runtime/camera","runtime/scene-helper","controllers/camera-controller","runtime/transform","runtime/component-3d","runtime/action-dispatcher","montage/core/application","runtime/dependencies/webgl-debug"],factory:function(e,t){e("runtime/dependencies/gl-matrix");var i=e("montage").Montage,n=e("montage/ui/component").Component;e("runtime/glsl-program").GLSLProgram,e("runtime/helpers/resource-manager").ResourceManager,e("runtime/glTF-scene").glTFScene,e("runtime/glTF-node").glTFNode;var r=e("runtime/scene").Scene;e("runtime/node").Node;var a=e("runtime/scene-renderer").SceneRenderer;e("runtime/glTF-material").glTFMaterial,e("runtime/utilities").Utilities;var s=e("montage/core/dom"),o=e("montage/core/geometry/point").Point,l=e("montage/composer/translate-composer").TranslateComposer,u=e("runtime/builtin-assets").BuiltInAssets,c=e("runtime/webgl-renderer").WebGLRenderer;e("runtime/projection").Projection;var h=e("runtime/animation").BasicAnimation;e("runtime/camera").Camera;var d=e("runtime/utilities").BBox,m=e("runtime/scene-helper").SceneHelper,f=e("controllers/camera-controller").CameraController,p=e("runtime/transform").Transform,_=e("runtime/component-3d").Component3D,v=e("runtime/action-dispatcher").ActionDispatcher;e("montage/core/application").Application,e("runtime/dependencies/webgl-debug"),t.SceneView=n.specialize({automaticallyCyclesThroughViewPoints:{value:!0,writable:!0},allowsProgressiveSceneLoading:{value:!1,writable:!0},allowsViewPointControl:{value:!0,writable:!0},scene:{get:function(){return this._scene},set:function(e){if(e){if(e.isLoaded()===!1)return e.addOwnPropertyChangeListener("status",this),void 0;this.needsDraw=!0}this.scene!=e&&(this.sceneWillChange(e),this._scene=e,this.sceneDidChange())}},viewPoint:{get:function(){return this._viewPoint},set:function(e){var t=this._viewPoint?this._viewPoint.id:null,i=e?e.id:null;if(t!=i){var n=null;this._viewPoint&&e&&this._viewPoint.scene==e.scene&&(n=this._viewPoint),this.viewPointWillChange(n,e),this._viewPoint=e;var r=this.getAnimationManager();r&&(r.sceneTime=0),e&&this.scene&&null==this._viewPoint.scene&&(this._viewPoint.scene=this.scene),this.viewPointDidChange()}}},play:{value:function(){switch(this._state){case this.PAUSE:case this.STOP:this._lastTime=Date.now(),this._state=this.PLAY,this.needsDraw=!0;break;default:}this._state=this.PLAY}},pause:{value:function(){this._state=this.PAUSE}},stop:{value:function(){var e=this.getAnimationManager();e&&(e.sceneTime=0),this._state=this.STOP,this.needsDraw=!0}},loops:{value:!0,writable:!0},STOP:{value:0,writable:!0},PLAY:{value:1,writable:!0},PAUSE:{value:2,writable:!0},_internalViewPoint:{value:null,writable:!0},_firstFrameDidRender:{value:!1,writable:!0},_sceneResourcesLoaded:{value:!1,writable:!0},_scene:{value:null,writable:!0},_consideringPointerForPicking:{writable:!0,value:!1},_mousePosition:{writable:!0,value:null},_showGradient:{value:!1,writable:!0},_showReflection:{value:!1,writable:!0},_showBBOX:{value:!1,writable:!0},_width:{value:null,writable:!0},_height:{value:null,writable:!0},_lastTime:{value:0,writable:!0},_state:{value:0,writable:!0},_viewPoint:{value:null,writable:!0},_sceneRenderer:{value:null,writable:!0},_disableRendering:{value:!1,writable:!0},_contextAttributes:{value:null,writable:!0},_shouldForceClear:{value:!1,writable:!0},_viewPointIndex:{value:0,writable:!0},_cameraController:{value:null,writable:!0},_defaultViewPoint:{value:null,writable:!0},translateComposer:{value:null,writable:!0},scaleFactor:{value:window.devicePixelRatio||1,writable:!0},selectedNode:{value:null,writable:!0},cameraController:{get:function(){return null==this._cameraController&&(this._cameraController=i.create(f)),this._cameraController}},sceneTimeWillChange:{value:function(){}},sceneTimeDidChange:{value:function(){if(null!=this.scene&&null!=this.scene.glTFElement){var e=this.scene.glTFElement.endTime;if(-1!==e&&null!=this.sceneView){var t=this.scene.glTFElement.animationManager;if(t.sceneTime/1e3>e&&1==this.automaticallyCyclesThroughViewPoints){var i=this.sceneView._viewPointIndex,n=m.getViewPoints(this.scene);if(n.length>0){var r,a=0;do t.sceneTime=0,a++,i=++i%n.length,r=n[i];while(n.length>a&&0==t.nodeHasAnimatedAncestor(r.glTFElement));this.sceneView.viewPoint=r}}}}}},sceneWillChange:{value:function(e){this.getResourceManager()&&this.getResourceManager().reset(),this._firstFrameDidRender=!1,this.delegate&&this.delegate.sceneWillChange&&this.delegate.sceneWillChange(e),this._scene&&(this._scene.removeEventListener("cursorUpdate",this),this._scene.removeEventListener("materialUpdate",this),this._scene.removeEventListener("textureUpdate",this),this.application.removeEventListener("sceneNodeSelected",this))}},sceneDidChange:{value:function(){this._scene&&(this._sceneResourcesLoaded=!1,this._scene.addEventListener("cursorUpdate",this),this._scene.addEventListener("textureUpdate",this),this._scene.addEventListener("materialUpdate",this),this.application.addEventListener("sceneNodeSelected",this),this.applyScene(),this.delegate&&this.delegate.sceneDidChange&&this.delegate.sceneDidChange())}},resourceAvailable:{value:function(){if(0==this.allowsProgressiveSceneLoading){var e=this.getResourceManager();e&&0==e.hasPendingRequests()&&(this.needsDraw=!0)}}},handleTextureUpdate:{value:function(e){var t=this.getResourceManager();if(t&&this.sceneRenderer&&this.sceneRenderer.webGLRenderer){var i=this.sceneRenderer.webGLRenderer.webGLContext,n=t.getResource(e.detail.value,this.sceneRenderer.webGLRenderer.textureDelegate,i);n&&this.resourceAvailable()}}},handleMaterialUpdate:{value:function(){this.needsDraw=!0}},handleCursorUpdate:{value:function(e){null!=this.element&&(this.element.style.cursor=e.detail)}},constructor:{value:function(){this.super()}},animationDidStart:{value:function(){this.needsDraw=!0,this.element.style.cursor="default"}},animationDidStop:{value:function(){}},animationDidUpdate:{value:function(e){var t=this._viewPointAnimationStep,i=e.extras.previousViewPoint;null==this.__matrix&&(this.__matrix=mat4.create()),null==this.__transform&&(this.__transform=Object.create(p).init());var n=i.glTFElement.transform,r=this.viewPoint.glTFElement.transform;n.interpolateToTransform(r,t,this.__transform),mat4.multiply(this.viewPoint.glTFElement.parent.worldMatrix,this.__transform.matrix,this.__matrix),this._internalViewPoint.transform.matrix=this.__matrix}},viewPointWillChange:{value:function(e,t){if(this.sceneRenderer&&t&&this.scene.glTFElement){var i=this.getAnimationManager(),n=0==i.nodeHasAnimatedAncestor(t.glTFElement);if(0==n&&null!=e&&(n|=0==i.nodeHasAnimatedAncestor(e.glTFElement)),n&&null!=e){var r=Object.create(h).init();r.path="_viewPointAnimationStep",r.target=this,r.delegate=this,r.from=Number(0),r.to=Number(1),r.duration=1e3,r.timingFunction="ease-out",r.extras.previousViewPoint=e,i.playAnimation(r),r.animationWasAddedToTarget()}}}},viewPointDidChange:{value:function(){this.cameraController.viewPoint=this.viewPoint,this.sceneRenderer&&this._viewPoint&&this.scene&&this.scene.glTFElement&&(this.sceneRenderer.technique.rootPass.viewPoint=this._internalViewPoint,this._viewPointIndex=this._getViewPointIndex(this.viewPoint),this.needsDraw=!0)}},viewPoint:{get:function(){return this._viewPoint},set:function(e){var t=this._viewPoint?this._viewPoint.id:null,i=e?e.id:null;if(t!=i){var n=null;this._viewPoint&&e&&this._viewPoint.scene==e.scene&&(n=this._viewPoint),this.viewPointWillChange(n,e),this._viewPoint=e;var r=this.getAnimationManager();r&&(r.sceneTime=0),e&&this.scene&&null==this._viewPoint.scene&&(this._viewPoint.scene=this.scene),this.viewPointDidChange()}}},canvas:{get:function(){return this.templateObjects?this.templateObjects.canvas:null}},sceneRenderer:{get:function(){return this._sceneRenderer},set:function(e){e!=this._sceneRenderer&&(this._sceneRenderer=e)}},handleStatusChange:{value:function(e,t,i){"loaded"===e&&(this.scene=i,this.needsDraw=!0,this.scene.glTFElement&&this.scene.glTFElement.animationManager&&this.scene.glTFElement.animationManager&&(this.scene.glTFElement.animationManager.delegate=this))}},_getViewPointIndex:{value:function(e){for(var t=m.getGLTFViewPoints(e.scene),i=0;t.length>i;i++)if(t[i].baseId===e.id)return i;return 0}},applyScene:{value:function(){var e=this.scene,t=e.glTFElement,i=this;if(this.sceneRenderer&&this.sceneRenderer.technique.rootPass){if(t){var n=m.getViewPoints(e),r=n.length>0;if(r){var a=!1;this.viewPoint&&this.viewPoint.scene&&(a=this.viewPoint.scene===this.scene),a===!1&&(this.viewPoint=n[0])}else{var s=t.rootNode.getBoundingBox(!0);Object.create(d).init(s[0],s[1]),t.rootNode.transform._updateDirtyFlag(!1);var o=this.scene.glTFElement,s=o.rootNode.getBoundingBox(!0),l=[(s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2,(s[0][2]+s[1][2])/2];l[2];var u=[l[0],l[1],l[2]];u[2]+=s[1][0]-s[0][0]+(s[1][2]-s[0][2]),this._defaultViewPoint=m.createNodeIncludingCamera("camera01",e);var c=m.getGLTFCamera(this._defaultViewPoint);c.projection.zfar=u[2]+s[1][2]-s[0][2],this._defaultViewPoint.glTFElement.transform.translation=u,this.viewPoint=this._defaultViewPoint}this.sceneRenderer.scene=t}if(this.viewPoint&&(null==this.viewPoint.scene&&(this.viewPoint.scene=e),this.sceneRenderer&&this.viewPointDidChange()),this.allowsProgressiveSceneLoading===!1){var h=this.scene.prepareToRender(this.sceneRenderer.webGLRenderer);h.then(function(){i._sceneResourcesLoaded=!0,i.needsDraw=!0},function(){},function(){})}else this.needsDraw=!0}}},getRelativePositionToCanvas:{value:function(e){return s.convertPointFromPageToNode(this.canvas,o.create().init(e.pageX,e.pageY))}},captureResize:{value:function(){this.needsDraw=!0}},enterDocument:{value:function(){var e=this;window.addEventListener("resize",this,!0),this.scene&&(this.scene.dispatchEventNamed("enteredDocument",!0,!1,this),this.scene.loadCSSStyles()),this.element.addEventListener("wheel",function(t){1==e.allowsViewPointControl&&null!=e.scene&&e.scene.rootNode&&(e.cameraController.node=e.scene.rootNode,e.cameraController.zoom(t)),t.stopPropagation(),t.preventDefault()},!1),this.element.addEventListener("gesturestart",function(e){e.preventDefault()},!1),this.element.addEventListener("gesturechange",function(e){e.preventDefault()},!1);var t=this.translateComposer;t.addEventListener("translate",function(t){1==e.allowsViewPointControl&&null!=e.scene&&e.scene.rootNode&&(e.cameraController.node=e.scene.rootNode,e.cameraController.translate(t)),e.needsDraw=!0}),t.addEventListener("translateStart",function(t){1==e.allowsViewPointControl&&null!=e.scene&&e.scene.rootNode&&(e.cameraController.node=e.scene.rootNode,e.cameraController.beginTranslate(t))},!1),t.addEventListener("translateEnd",function(t){1==e.allowsViewPointControl&&null!=e.scene&&e.scene.rootNode&&(e.cameraController.node=e.scene.rootNode,e.cameraController.endTranslate(t))},!1),this.addComposerForElement(t,this.canvas);var n;n=window.onwheel!==void 0?"wheel":"mousewheel",this.canvas.removeEventListener(n,t,!0),this.canvas.removeEventListener(n,t,!1);var s=!1;s&&(this.canvas=WebGLDebugUtils.makeLostContextSimulatingCanvas(this.canvas));var o={premultipliedAlpha:!0,antialias:!0,preserveDrawingBuffer:!1},l=this.canvas.getContext("experimental-webgl",o)||this.canvas.getContext("webgl",o);if(null==l)return console.log("Please check that your browser enables & supports WebGL"),void 0;this._contextAttributes=l.getContextAttributes();var h=!1;if(this._contextAttributes&&(h=this._contextAttributes.antialias),0==h&&console.log("WARNING: anti-aliasing is not supported/enabled"),navigator){var d=null!=navigator.userAgent.match(/iPad/i);if(0==d){var f=navigator.userAgent;d=/iPad/i.test(f)||/iPhone OS 3_1_2/i.test(f)||/iPhone OS 3_2_2/i.test(f)}d&&(this._shouldForceClear=!0)}var p=Object.create(c).initWithWebGLContext(l);l.enable(l.DEPTH_TEST);var _=null;this.sceneRenderer=Object.create(a),this.sceneRenderer.init(p,_);var g=this.getResourceManager();g.isObserving()||(g.observers.push(this),g.startObserving()),this.scene&&this.applyScene(),this.canvas.addEventListener("webglcontextlost",function(t){console.log("context was lost"),t.preventDefault(),e.getResourceManager.stopObserving(),e.sceneRenderer.webGLRenderer.resourceManager.reset(),e.needsDraw=!1,e._disableRendering=!0},!1),this.canvas.addEventListener("webglcontextrestored",function(t){console.log("context was restored"),t.preventDefault(),l.enable(l.DEPTH_TEST),e.needsDraw=!0,e._disableRendering=!1},!1),s&&setTimeout(function(){e.canvas.loseContext()},5e3);var e=this,b=u.assetWithName("gradient");b.then(function(t){var n=i.create(r).init(t);e.gradientRenderer=Object.create(a),e.gradientRenderer.init(p,null),e.gradientRenderer.scene=n.glTFElement;var s=m.getViewPoints(n);s&&s.length&&(e.gradientRenderer.technique.rootPass.viewPoint=s[0].glTFElement),e.needsDraw=!0},function(){},function(){}),this.actionDispatcher=v.create().initWithScene(this.scene),this.needsDraw=!0,this.canvas.addEventListener("touchstart",this.start.bind(this),!0),this.canvas.addEventListener("touchend",this.end.bind(this),!0),this.canvas.addEventListener("touchcancel",this.end.bind(this),!0),this.canvas.addEventListener("touchmove",this.move.bind(this),!0),this.canvas.addEventListener("gesturechange",this,!0),this.canvas.addEventListener("mousedown",this.start.bind(this),!0),this.canvas.addEventListener("mouseup",this.end.bind(this),!0),this.canvas.addEventListener("mousemove",this.move.bind(this),!0),this.canvas.addEventListener("wheel",this,!0)}},exitDocument:{value:function(){window.removeEventListener("resize",this,!0)}},captureMousewheel:{value:function(){this.needsDraw=!0}},captureWheel:{value:function(){this.needsDraw=!0}},captureGesturechange:{value:function(){this.needsDraw=!0}},_TOUCH_DOWN:{value:0},_TOUCH_UP:{value:1},_TOUCH_MOVE:{value:2},_eventType:{value:-1,writable:!0},_previousNodeEventType:{value:-1,writable:!0},_previousHandledNode:{value:null,writable:!0},handleSelectedNode:{value:function(e){var t=null,i=this._previousHandledNode,n=i?i.component3D:null;if(this._eventType===this._TOUCH_UP&&(i&&n&&n.handleActionOnGlTFElement(i,_._TOUCH_UP),this._eventType=-1),e&&(t=this.scene.glTFElement.ids[e],this._eventType===this._TOUCH_DOWN)){var r=m.createNodeFromGlTFElementIfNeeded(t,this.scene);this.application.dispatchEventNamed("sceneNodeSelected",!0,!0,r)}i&&n&&this._previousNodeEventType===this._TOUCH_MOVE&&t!==i&&n.handleActionOnGlTFElement(i,_._EXIT),this._eventType===this._TOUCH_MOVE&&t!==i?t?this.actionDispatcher.dispatchActionOnGlTFElement(_._ENTER,t):this._eventType=-1:t&&this._eventType===this._TOUCH_DOWN&&(this.actionDispatcher.dispatchActionOnGlTFElement(_._TOUCH_DOWN,t),this._eventType=-1),this._previousHandledNode=t,this._previousNodeEventType=this._eventType}},_previousMaterialEventType:{value:-1,writable:!0},_previousHandledMaterial:{value:null,writable:!0},handleSelectedMaterial:{value:function(e){var t=null,i=this._previousHandledMaterial,n=i?i.component3D:null;if(this._eventType===this._TOUCH_UP&&(i&&n&&n.handleActionOnGlTFElement(i,_._TOUCH_UP),this._eventType=-1),e&&(t=this.scene.glTFElement.ids[e],this._eventType===this._TOUCH_DOWN)){var r=m.createMaterialFromGlTFElementIfNeeded(t,this.scene);this.application.dispatchEventNamed("sceneMaterialSelected",!0,!0,r)}i&&n&&this._previousMaterialEventType===this._TOUCH_MOVE&&t!==i&&n.handleActionOnGlTFElement(i,_._EXIT),this._eventType===this._TOUCH_MOVE&&t!==i?t?this.actionDispatcher.dispatchActionOnGlTFElement(_._ENTER,t):this._eventType=-1:t&&this._eventType===this._TOUCH_DOWN&&(this.actionDispatcher.dispatchActionOnGlTFElement(_._TOUCH_DOWN,t),this._eventType=-1),this._previousHandledMaterial=t,this._previousNodeEventType=this._eventType}},move:{value:function(e){var t=this.getRelativePositionToCanvas(e);this._mousePosition=[t.x*this.scaleFactor,this.height*this.scaleFactor-t.y*this.scaleFactor],this._eventType=this._TOUCH_MOVE,this.needsDraw=!0}},start:{value:function(e){e.preventDefault(),this._consideringPointerForPicking=!0;var t=this.getRelativePositionToCanvas(e);this._mousePosition=[t.x*this.scaleFactor,this.height*this.scaleFactor-t.y*this.scaleFactor],this._state===this.PLAY&&this.pause(),this._eventType=this._TOUCH_DOWN,this.needsDraw=!0}},end:{value:function(e){if(this._consideringPointerForPicking&&e.target===this.canvas&&e.preventDefault(),this._state===this.PAUSE&&this.scene&&this.viewPoint&&this.scene.glTFElement){var t=this.getAnimationManager();t.nodeHasAnimatedAncestor(this.viewPoint.glTFElement)&&this.play()}this._consideringPointerForPicking=!1,this._eventType=this._TOUCH_UP,this.handleSelectedNode(null),this._mousePosition=null}},getWebGLRenderer:{value:function(){return this.sceneRenderer?this.sceneRenderer.webGLRenderer:null}},getWebGLContext:{value:function(){var e=this.getWebGLRenderer();return e?e.webGLContext:null}},getResourceManager:{value:function(){var e=this.getWebGLRenderer();return e?e.resourceManager:null}},getAnimationManager:{value:function(){return this.scene&&this.scene.glTFElement?this.scene.glTFElement.animationManager:null}},showBBOX:{get:function(){return this._showBBOX},set:function(e){e!=this._showBBOX&&(this._showBBOX=e,this.needsDraw=!0)}},showGradient:{get:function(){return this._showGradient},set:function(e){e!=this._showGradient&&(this._showGradient=e,this.needsDraw=!0)}},showReflection:{get:function(){return this._showReflection},set:function(e){this._showReflection=e,this.needsDraw=!0}},handleSceneNodeSelected:{value:function(e){this.selectedNode=e.detail,this.needsDraw=!0}},_displayBBOX:{value:function(e){if(this.scene&&this.scene.glTFElement&&null!=e.getBoundingBox){var t=this.sceneRenderer.technique.rootPass.scenePassRenderer._viewPointMatrix,i=m.getGLTFCamera(this.viewPoint);if(null!=i){var n=i.projection.matrix;this.getWebGLRenderer().drawBBOX(e.getBoundingBox(!0),t,mat4.identity(),n)}}}},_displayAllBBOX:{value:function(){if(this.scene&&this.scene.glTFElement){this.sceneRenderer.technique.rootPass.scenePassRenderer._viewPointMatrix;var e=mat4.identity(),t=this.scene.glTFElement.rootNode,i=this;t.apply(function(e){return i._displayBBOX(e),null},!0,e)}}},width:{get:function(){if(null!=this._width)return this._width;var e=this.getWebGLContext();return null!=e?e.canvas.clientWidth:0},set:function(e){this._width!=e&&(this._width=e,this.needsDraw=!0)}},height:{get:function(){if(null!=this._height)return this._height;var e=this.getWebGLContext();return null!=e?e.canvas.clientHeight:0},set:function(e){this._height!=e&&(this._height=e,this.needsDraw=!0)}},_forwardToNextAnimatedViewPointIfNeeded:{value:function(){var e=this.getAnimationManager();if(e){if(1==e.nodeHasAnimatedAncestor(this.viewPoint.glTFElement))return;var t=this._viewPointIndex,i=m.getViewPoints(this.scene);if(i.length>1){for(var n=this.viewPoint,r=0;i.length>r&&0==e.nodeHasAnimatedAncestor(n.glTFElement);)t=++t%i.length,n=i[t],r++;this.viewPoint=n}}}},draw:{value:function(){var e=this.getWebGLContext();if(!(null==e||this._disableRendering||(this.sceneRenderer.technique.rootPass.viewPoint=this._internalViewPoint,(this._shouldForceClear||null==this._contextAttributes.preserveDrawingBuffer||1==this._contextAttributes.preserveDrawingBuffer)&&(e.clearColor(0,0,0,0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT)),this.delegate&&this.delegate.sceneWillDraw&&this.delegate.sceneWillDraw(),this.allowsProgressiveSceneLoading===!1&&this._sceneResourcesLoaded===!1||null==this._scene||null==this.viewPoint||this._disableRendering))){this.resizeIfNeeded();var t=this.viewPoint,i=Date.now();if(this.sceneRenderer&&this.scene){var n=this.getAnimationManager();if(this._state==this.PLAY&&n){this._forwardToNextAnimatedViewPointIfNeeded(),n.sceneTime+=i-this._lastTime;var r=this.scene.glTFElement.endTime;n.sceneTime/1e3>r&&(this.loops?n.sceneTime=0==r?0:n.sceneTime%r:this.stop()),n.updateTargetsAtTime(n.sceneTime,this.getResourceManager())}if(t.glTFElement){var a=m.getGLTFCamera(t);a.projection.aspectRatio=this.width/this.height,this._internalViewPoint.transform.matrix=t.glTFElement.worldMatrix,null!=this._internalViewPoint.cameras&&this._internalViewPoint.cameras.length>0&&(this._internalViewPoint.cameras[0]=a)}n.evaluateAtTime(i,this.getResourceManager()),n.hasActiveAnimations()&&(this.needsDraw=!0)}if(this._lastTime=i,this._state==this.PLAY&&(this.needsDraw=!0),this.scene&&(this.sceneRenderer.webGLRenderer,e)){null==this.__renderOptions&&(this.__renderOptions={});var s=this.showReflection;if(s){e.depthFunc(e.LESS),e.enable(e.DEPTH_TEST),e.frontFace(e.CW),e.depthMask(!0);var o=this.scene.glTFElement.rootNode,l=o.getBoundingBox(!0),u=mat4.create(o.transform.matrix),c=mat4.scale(mat4.identity(),[1,1,-1]);mat4.multiply(c,o.transform.matrix),o.transform.matrix=c;var h=o.getBoundingBox(!0),d=mat4.identity(),f=mat4.translate(mat4.identity(),[0,0,l[0][2]-h[1][2]]);mat4.multiply(d,f),mat4.multiply(d,c),o.transform.matrix=d,this.sceneRenderer.render(i,this.__renderOptions),o.transform.matrix=u,e.frontFace(e.CCW)}(this.showGradient||s)&&this.viewPoint===this._defaultViewPoint&&this.gradientRenderer&&(e.enable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.depthMask(!1),this.gradientRenderer.render(i,this.__renderOptions),e.depthMask(!0),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),e.disable(e.BLEND)),null!=this._mousePosition&&(this.scene.nodesShouldBeHitTested&&(this.__renderOptions.picking=!0,this.__renderOptions.coords=this._mousePosition,this.__renderOptions.delegate=this,this.__renderOptions.pickingMode="node",this.sceneRenderer.render(i,this.__renderOptions)),this.scene.materialsShouldBeHitTested&&(this.__renderOptions.picking=!0,this.__renderOptions.coords=this._mousePosition,this.__renderOptions.delegate=this,this.__renderOptions.pickingMode="material",this.sceneRenderer.render(i,this.__renderOptions))),this.__renderOptions.picking=!1,this.__renderOptions.coords=null,this.__renderOptions.delegate=null,this.__renderOptions.pickingMode=null,this.sceneRenderer.render(i,this.__renderOptions),this.showBBOX&&this._displayAllBBOX(),this.delegate&&this.delegate.sceneDidDraw&&this.delegate.sceneDidDraw(),e.flush(),this._firstFrameDidRender===!1&&(this._firstFrameDidRender=!0,this.dispatchEventNamed("firstFrameDidRender",!0,!1,this))}}}},resizeIfNeeded:{value:function(){var e=this.getWebGLContext();if(null!=e){var t=this.width*this.scaleFactor,i=this.height*this.scaleFactor;(e.canvas.width!=t||e.canvas.height!=i)&&(e.canvas.width=t,e.canvas.height=i,null!=this._width&&(this.element.style.width=this.width+"px"),null!=this._height&&(this.element.style.height=this.height+"px"),e.viewport(0,0,t,i))}}},templateDidLoad:{value:function(){this.parentComponent;var e=l.create();e.animateMomentum=!0,e.hasMomentum=!0,e.allowFloats=!0,e.pointerSpeedMultiplier=.15,this._internalViewPoint=m.createGLTFNodeIncludingCamera("__internal_viewPoint__"),this.translateComposer=e,this.needsDraw=!0}}})}});