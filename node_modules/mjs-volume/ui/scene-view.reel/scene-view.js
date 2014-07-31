/* <copyright>
Copyright (c) 2013, Fabrice Robinet.
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */
/**
    @module "montage/ui/view.reel"
    @requires montage
    @requires montage/ui/component
*/

require("runtime/dependencies/gl-matrix");
var Montage = require("montage").Montage;
var Component = require("montage/ui/component").Component;
var GLSLProgram = require("runtime/glsl-program").GLSLProgram;
var ResourceManager = require("runtime/helpers/resource-manager").ResourceManager;
var glTFScene = require("runtime/glTF-scene").glTFScene;
var glTFNode = require("runtime/glTF-node").glTFNode;
var Scene = require("runtime/scene").Scene;
var Node = require("runtime/node").Node;
var SceneRenderer = require("runtime/scene-renderer").SceneRenderer;
var glTFMaterial = require("runtime/glTF-material").glTFMaterial;
var Utilities = require("runtime/utilities").Utilities;
var dom = require("montage/core/dom");
var Point = require("montage/core/geometry/point").Point;
var TranslateComposer = require("montage/composer/translate-composer").TranslateComposer;
var BuiltInAssets = require("runtime/builtin-assets").BuiltInAssets;
var WebGLRenderer = require("runtime/webgl-renderer").WebGLRenderer;
var Projection = require("runtime/projection").Projection;
var BasicAnimation = require("runtime/animation").BasicAnimation;
var Camera = require("runtime/camera").Camera;
var BBox = require("runtime/utilities").BBox;
var SceneHelper = require("runtime/scene-helper").SceneHelper;
var CameraController = require("controllers/camera-controller").CameraController;
var Transform = require("runtime/transform").Transform;
var Component3D = require("runtime/component-3d").Component3D;
var ActionDispatcher = require("runtime/action-dispatcher").ActionDispatcher;
var Application = require("montage/core/application").Application;
require("runtime/dependencies/webgl-debug");
/**
    Description TODO
    @class module:"montage/ui/view.reel".view
    @extends module:montage/ui/component.Component
*/

exports.SceneView = Component.specialize( {

    /**
     * If true the viewer will automatically switch from one animated viewPoint to another
     * @type {boolean}
     * @default true
     */
    automaticallyCyclesThroughViewPoints: { value: true, writable: true },


    /**
     * If false the scene will be shown only when all resources have been loaded.
     * @type {boolean}
     * @default true
     */
    allowsProgressiveSceneLoading: { value:false, writable:true },

    /**
     * If false the scene will be shown only when all resources have been loaded.
     * @type {boolean}
     * @default true
     */
    allowsViewPointControl: { value: true, writable: true },

    /**
     * A Scene object from runtime/scene to be rendered by SceneView.
     * @type {object}
     * @default true
     */
    scene: {
        get: function() {
            return this._scene;
        },

        set: function(value) {
            if (value) {
                //FIXME:sort of a hack, only set the scene when ready
                if (value.isLoaded() === false) {
                    value.addOwnPropertyChangeListener("status", this);
                    return;
                } else {
                    this.needsDraw = true;
                }

            }

            if (this.scene != value) {
                this.sceneWillChange(value);
                this._scene = value;
                this.sceneDidChange();
            }
        }
    },

    /**
     * 
     * @type {object}
     */
    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            var id = this._viewPoint ? this._viewPoint.id : null;
            var upcomingId = value ? value.id : null;
            if (id != upcomingId) {
                var previousViewPoint = null;
                if (this._viewPoint && value) {
                    if (this._viewPoint.scene == value.scene) {
                        previousViewPoint = this._viewPoint;
                    }
                }
                this.viewPointWillChange(previousViewPoint, value);
                this._viewPoint = value;
                var animationManager = this.getAnimationManager();
                if (animationManager)
                    animationManager.sceneTime = 0;

                if (value) {
                    if (this.scene && (this._viewPoint.scene == null)) {
                        this._viewPoint.scene = this.scene;
                    }
                }
                this.viewPointDidChange();
            }
        }
    },

    play: {
        value: function() {
            switch (this._state) {
                case this.PAUSE:
                case this.STOP:
                    this._lastTime = Date.now();
                    this._state = this.PLAY;
                    this.needsDraw = true;
                    break;
                default:
                    break;
            }

            this._state = this.PLAY;
        }
    },

    pause: {
        value: function() {
            this._state = this.PAUSE;
        }
    },


    stop: {
        value: function() {
            var animationManager = this.getAnimationManager();
            if (animationManager) {
                animationManager.sceneTime = 0;
            }
            this._state = this.STOP;
            this.needsDraw = true;
        }
    },

    loops: { value: true, writable: true},

    /* Private / Internal section
        all the following section including constants and code is private 
    */

    STOP: { value: 0, writable: true },

    PLAY: { value: 1, writable: true },

    PAUSE: { value: 2, writable: true },
 
     _internalViewPoint: { value: null, writable: true },

    _firstFrameDidRender: { value: false, writable: true },

    _sceneResourcesLoaded: { value: false, writable: true },

    _scene: { value: null, writable: true },

    _consideringPointerForPicking: { writable: true, value: false },

    _mousePosition: { writable: true, value : null },

    _showGradient: { value: false, writable: true },

    _showReflection: { value: false, writable: true },

    _showBBOX: { value: false, writable: true },

    _width: { value: null, writable: true },

    _height: { value: null, writable: true },

    _lastTime: { value: 0, writable: true },

    _state: { value: 0, writable: true },

    _viewPoint: { value: null, writable: true },

    _sceneRenderer: { value: null, writable: true },

    _disableRendering: { value: false, writable: true },

    _contextAttributes : { value: null, writable: true },

    //FIXME: figure out why the clear made by the browser isn't performed when no draw element is performed
    _shouldForceClear: { value: false, writable: true },

    _viewPointIndex: { value: 0, writable: true },

    _cameraController: { value: null, writable: true },

    _defaultViewPoint: { value: null, writable:true },

    translateComposer: { value: null, writable: true },

    scaleFactor: { value: (window.devicePixelRatio || 1), writable: true},

    selectedNode: { value: null, writable:true },

    cameraController: {
        get: function() {
            if (this._cameraController == null) {
                this._cameraController = Montage.create(CameraController);
            }
            return this._cameraController;
        }
    },

    sceneTimeWillChange: {
        value: function(animation, upcomingSceneTime) {

        }
    },

    sceneTimeDidChange: {
        value: function(animation) {

            if (this.scene == null)
                return;
            if (this.scene.glTFElement == null) {
                return;
            }

            var endTime = this.scene.glTFElement.endTime;
            if ((endTime !== -1) && (this.sceneView != null)) {
                var animationManager = this.scene.glTFElement.animationManager;
                if (animationManager.sceneTime / 1000. > endTime) {
                    if (this.automaticallyCyclesThroughViewPoints == true) {
                        var viewPointIndex = this.sceneView._viewPointIndex; //_viewPointIndex is private in view, we could actually put/access this info from scene
                        var viewPoints = SceneHelper.getViewPoints(this.scene);
                        if (viewPoints.length > 0) {
                            var nextViewPoint;
                            var checkIdx = 0;
                            do {
                                animationManager.sceneTime = 0;
                                checkIdx++;
                                viewPointIndex = ++viewPointIndex % viewPoints.length;
                                nextViewPoint = viewPoints[viewPointIndex];
                            } while ((checkIdx < viewPoints.length) && (animationManager.nodeHasAnimatedAncestor(nextViewPoint.glTFElement) == false));
                            this.sceneView.viewPoint = nextViewPoint;
                        }
                    }
                }
            }
        }
    },

    sceneWillChange: {
        value: function(value) {
            if (this.getResourceManager()) {
                this.getResourceManager().reset();
            }
            this._firstFrameDidRender = false;

            if (this.delegate) {
                if (this.delegate.sceneWillChange) {
                    this.delegate.sceneWillChange(value);
                }
            }

            if (this._scene) {
                this._scene.removeEventListener("cursorUpdate", this);
                this._scene.removeEventListener("materialUpdate", this);
                this._scene.removeEventListener("textureUpdate", this);
                this.application.removeEventListener("sceneNodeSelected", this);
            }
        }
    },

    sceneDidChange: {
        value: function() {
            //FIXME: incoming scene should not be expected to be just non null
            if (this._scene) {
                this._sceneResourcesLoaded = false;
                this._scene.addEventListener("cursorUpdate", this);
                this._scene.addEventListener("textureUpdate", this);
                this._scene.addEventListener("materialUpdate", this);
                this.application.addEventListener("sceneNodeSelected", this);
                this.applyScene();
                if (this.delegate) {
                    if (this.delegate.sceneDidChange) {
                        this.delegate.sceneDidChange();
                    }
                }
            }
        }
    },

    // Resources
    resourceAvailable: {
        value: function(resource) {
            //only issue draw once all requests finished
            if (this.allowsProgressiveSceneLoading == false) {
                var resourceManager = this.getResourceManager();
                if (resourceManager) {
                    if (resourceManager.hasPendingRequests() == false) {
                        this.needsDraw = true;
                    }
                }
            }
        }
    },

    handleTextureUpdate: {
        value: function(evt) {
            var resourceManager = this.getResourceManager();
            if (resourceManager && this.sceneRenderer) {
                if (this.sceneRenderer.webGLRenderer) {
                    var webGLContext = this.sceneRenderer.webGLRenderer.webGLContext;
                    //trigger texture load/creation
                    var texture = resourceManager.getResource(evt.detail.value, this.sceneRenderer.webGLRenderer.textureDelegate, webGLContext);
                    if (texture) {
                        this.resourceAvailable();
                    }
                }
            }
        }
    },

    handleMaterialUpdate: {
        value: function(evt) {
            this.needsDraw = true;
        }
    },

    handleCursorUpdate: {
        value: function(evt) {
            if (this.element != null) {
                this.element.style.cursor = evt.detail;            
            }
        }
    },



    // Montage

    constructor: {
        value: function View() {
            this.super();
        }
    },


    animationDidStart: {
        value: function(animation) {
            this.needsDraw = true;
            //FIXME:Work-around a cursor issue as after a camera change
            this.element.style.cursor = "default";            
        }
    },

    animationDidStop: {
        value: function(animation) {
        }
    },

    animationDidUpdate: {
        value: function(animation) {
            var step = this._viewPointAnimationStep;
            var previousViewPoint = animation.extras["previousViewPoint"];
            if (this.__matrix == null)
                this.__matrix = mat4.create();
            if (this.__transform == null)
                this.__transform = Object.create(Transform).init();

            var t1 = previousViewPoint.glTFElement.transform;
            var t2 = this.viewPoint.glTFElement.transform;

            t1.interpolateToTransform(t2, step, this.__transform);
            mat4.multiply(this.viewPoint.glTFElement.parent.worldMatrix, this.__transform.matrix, this.__matrix);
            this._internalViewPoint.transform.matrix = this.__matrix;
        }
    },

    viewPointWillChange: {
        value:function(previousViewPoint, newViewPoint) {
            if (this.sceneRenderer) {
                if (newViewPoint) {
                    if (this.scene.glTFElement) {
                        var animationManager = this.getAnimationManager();
                        //we do not animate already animated cameras
                        var hasStaticViewPoint = animationManager.nodeHasAnimatedAncestor(newViewPoint.glTFElement) == false;
                        if (hasStaticViewPoint == false && previousViewPoint != null) {
                            hasStaticViewPoint |= animationManager.nodeHasAnimatedAncestor(previousViewPoint.glTFElement) == false;
                        }
                        if (hasStaticViewPoint && (previousViewPoint != null)) {
                            /* manually add the animation to handle the camera blending */
                            var viewPointAnimationStep = Object.create(BasicAnimation).init();

                            viewPointAnimationStep.path = "_viewPointAnimationStep";
                            viewPointAnimationStep.target = this;
                            viewPointAnimationStep.delegate = this;
                            viewPointAnimationStep.from = Number(0);
                            viewPointAnimationStep.to = Number(1);
                            viewPointAnimationStep.duration = 1000;
                            viewPointAnimationStep.timingFunction = "ease-out";

                            viewPointAnimationStep.extras["previousViewPoint"] = previousViewPoint;

                            animationManager.playAnimation(viewPointAnimationStep);

                            //FIXME: This is an internal detail exposed for now
                            viewPointAnimationStep.animationWasAddedToTarget();
                        }
                    }
                }
            }
        }
    },

    viewPointDidChange: {
        value:function() {
            this.cameraController.viewPoint = this.viewPoint;

            if (this.sceneRenderer) {
                if (this._viewPoint) {
                    if (this.scene) {
                        if (this.scene.glTFElement) {
                            this.sceneRenderer.technique.rootPass.viewPoint = this._internalViewPoint;
                            this._viewPointIndex = this._getViewPointIndex(this.viewPoint);
                            this.needsDraw = true;
                        }
                    }
                }
            }
        }
    },

    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            var id = this._viewPoint ? this._viewPoint.id : null;
            var upcomingId = value ? value.id : null;
            if (id != upcomingId) {
                var previousViewPoint = null;
                if (this._viewPoint && value) {
                    if (this._viewPoint.scene == value.scene) {
                        previousViewPoint = this._viewPoint;
                    }
                }
                this.viewPointWillChange(previousViewPoint, value);
                this._viewPoint = value;
                var animationManager = this.getAnimationManager();
                if (animationManager)
                    animationManager.sceneTime = 0;

                if (value) {
                    if (this.scene && (this._viewPoint.scene == null)) {
                        this._viewPoint.scene = this.scene;
                    }
                }
                this.viewPointDidChange();
            }
        }
    },

    canvas: {
        get: function() {
            if (this.templateObjects) {
                return this.templateObjects.canvas;
            } 
            return null;
        }
    },

    sceneRenderer: {
        get: function() {
            return this._sceneRenderer;
        },
        set: function(value) {
            if (value != this._sceneRenderer) {
                this._sceneRenderer = value;
            }
        }
    },

    handleStatusChange: {
        value: function(status, key, object) {
            if (status === "loaded") {
                this.scene = object;
                this.needsDraw = true;

                if (this.scene.glTFElement) {
                    if (this.scene.glTFElement.animationManager) {
                        if (this.scene.glTFElement.animationManager) {
                            this.scene.glTFElement.animationManager.delegate = this;
                        }
                    }
                }
            }
        }
    },

    //FIXME: cache this in the scene
    _getViewPointIndex: {
        value: function(viewPoint) {
            var viewPoints = SceneHelper.getGLTFViewPoints(viewPoint.scene);

            for (var i = 0 ; i < viewPoints.length ; i++) {
                if (viewPoints[i].baseId === viewPoint.id)
                    return i;
            }
            return 0;
        }
    },

    applyScene: {
        value:function () {
            var m3dScene = this.scene;
            var scene = m3dScene.glTFElement;
            var self = this;
            if (this.sceneRenderer) {
                if (this.sceneRenderer.technique.rootPass) {
                    if (scene) {
                        var viewPoints= SceneHelper.getViewPoints(m3dScene);
                        var hasCamera = viewPoints.length > 0;
                        // arbitry set first coming camera as the view point
                        if (hasCamera) {
                            var shouldKeepViewPoint = false;
                            if (this.viewPoint) {
                                if (this.viewPoint.scene) {
                                    shouldKeepViewPoint = (this.viewPoint.scene === this.scene); 
                                }                                   
                            }
                            if (shouldKeepViewPoint === false) {
                                this.viewPoint = viewPoints[0];
                            }
                        } else {
                            var sceneBBox =  scene.rootNode.getBoundingBox(true);
                            var bbox = Object.create(BBox).init(sceneBBox[0], sceneBBox[1]);
                            scene.rootNode.transform._updateDirtyFlag(false);
                            var glTFScene = this.scene.glTFElement;
                            var sceneBBox =  glTFScene.rootNode.getBoundingBox(true);
                            var midPoint = [
                                (sceneBBox[0][0] + sceneBBox[1][0]) / 2,
                                (sceneBBox[0][1] + sceneBBox[1][1]) / 2,
                                (sceneBBox[0][2] + sceneBBox[1][2]) / 2];
                            var viewPortDistance = midPoint[2];
                            var eye = [midPoint[0], midPoint[1], midPoint[2]];
                            eye[2] += (sceneBBox[1][0] - sceneBBox[0][0]) + (sceneBBox[1][2] - sceneBBox[0][2]);

                            this._defaultViewPoint = SceneHelper.createNodeIncludingCamera("camera01", m3dScene);
                            var glTFCamera = SceneHelper.getGLTFCamera(this._defaultViewPoint);

                            glTFCamera.projection.zfar = eye[2] + sceneBBox[1][2] - sceneBBox[0][2];
                            this._defaultViewPoint.glTFElement.transform.translation = eye;
                            this.viewPoint = this._defaultViewPoint;
                        }

                        this.sceneRenderer.scene = scene;
                    }

                    if (this.viewPoint) {
                        if (this.viewPoint.scene == null) {
                            this.viewPoint.scene = m3dScene;
                        }
                        if (this.sceneRenderer) {
                            this.viewPointDidChange();
                        }
                    }

                    if (this.allowsProgressiveSceneLoading === false) {
                        var renderPromise = this.scene.prepareToRender(this.sceneRenderer.webGLRenderer);
                        renderPromise.then(function () {
                            self._sceneResourcesLoaded = true;
                            self.needsDraw = true;
                        }, function (error) {
                        }, function (progress) {
                        });

                    } else {
                        this.needsDraw = true;
                    }
                }
            }
        }
    },

    getRelativePositionToCanvas: {
        value: function(event) {
            return dom.convertPointFromPageToNode(this.canvas, Point.create().init(event.pageX, event.pageY));
        }
    },

    captureResize: {
        value: function() {
            this.needsDraw = true;
        }
    },

    enterDocument: {
        value: function(firstTime) {
            var self = this;
            window.addEventListener("resize", this, true);

            if (this.scene) {
                this.scene.dispatchEventNamed("enteredDocument", true, false, this);
                this.scene.loadCSSStyles();
            }

            this.element.addEventListener('wheel', function (event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.zoom(event);
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }, false);

            this.element.addEventListener('gesturestart', function (event) {
                event.preventDefault();
            }, false);

            this.element.addEventListener('gesturechange', function (event) {
                event.preventDefault();
            }, false);

            var composer = this.translateComposer;

            composer.addEventListener("translate", function(event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.translate(event);
                    }
                }
                self.needsDraw = true;
            });

            composer.addEventListener('translateStart', function (event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.beginTranslate(event);
                    }
                }
            }, false);

            composer.addEventListener('translateEnd', function (event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.endTranslate(event);
                    }
                }
            }, false);

            this.addComposerForElement(composer, this.canvas);

            /* Hack for MON-420 */
            var wheelEventName;
            if (typeof window.onwheel !== "undefined"){
                wheelEventName = "wheel";
            } else {
                wheelEventName = "mousewheel";
            }
            this.canvas.removeEventListener(wheelEventName, composer, true);
            this.canvas.removeEventListener(wheelEventName, composer, false);

            var simulateContextLoss = false;  //Very naive for now

            if (simulateContextLoss) {
                this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(this.canvas);
            }

            var webGLOptions = {  premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: false };
            var webGLContext =  this.canvas.getContext("experimental-webgl", webGLOptions) ||
                                this.canvas.getContext("webgl", webGLOptions);

            function throwOnGLError(err, funcName, args) {
                throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
            };

            //webGLContext = WebGLDebugUtils.makeDebugContext(webGLContext, throwOnGLError);

            if (webGLContext == null) {
                console.log("Please check that your browser enables & supports WebGL");
                return
            }

            this._contextAttributes = webGLContext.getContextAttributes();
            var antialias = false;
            if (this._contextAttributes) {
                antialias = this._contextAttributes.antialias;
            }
            if (antialias == false) {
                console.log("WARNING: anti-aliasing is not supported/enabled")
            }

            //check from http://davidwalsh.name/detect-ipad
            if (navigator) {
                // For use within normal web clients
                var isiPad = navigator.userAgent.match(/iPad/i) != null;
                if (isiPad == false) {
                    // For use within iPad developer UIWebView
                    // Thanks to Andrew Hedges!
                    var ua = navigator.userAgent;
                    isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
                }
                if (isiPad) {
                    this._shouldForceClear = true;
                }
            }

            var webGLRenderer = Object.create(WebGLRenderer).initWithWebGLContext(webGLContext);
            webGLContext.enable(webGLContext.DEPTH_TEST);
            var options = null;
            this.sceneRenderer = Object.create(SceneRenderer);
            this.sceneRenderer.init(webGLRenderer, options);

            var resourceManager = this.getResourceManager();
            if (!resourceManager.isObserving()) {
                resourceManager.observers.push(this);
                resourceManager.startObserving();
            }

            if (this.scene)
                this.applyScene();

            this.canvas.addEventListener("webglcontextlost", function(event) {
                console.log("context was lost");
                event.preventDefault();
                self.getResourceManager.stopObserving();
                self.sceneRenderer.webGLRenderer.resourceManager.reset();
                self.needsDraw = false;
                self._disableRendering = true;
            }, false);

            this.canvas.addEventListener("webglcontextrestored", function(event) {
                console.log("context was restored");
                event.preventDefault();
                webGLContext.enable(webGLContext.DEPTH_TEST);
                self.needsDraw = true;
                self._disableRendering = false;
            }, false);

            if (simulateContextLoss) {
                setTimeout(function() {
                    self.canvas.loseContext();
                }, 5000);
            }

            //setup gradient
            var self = this;
            var techniquePromise = BuiltInAssets.assetWithName("gradient");
            techniquePromise.then(function (glTFScene_) {
                var scene = Montage.create(Scene).init(glTFScene_);
                self.gradientRenderer = Object.create(SceneRenderer);
                self.gradientRenderer.init(webGLRenderer, null);
                self.gradientRenderer.scene = scene.glTFElement;
                var viewPoints = SceneHelper.getViewPoints(scene);
                if (viewPoints) {
                    if (viewPoints.length) {
                        self.gradientRenderer.technique.rootPass.viewPoint = viewPoints[0].glTFElement;
                    }
                }
                self.needsDraw = true;
            }, function (error) {
            }, function (progress) {
            });

            this.actionDispatcher = ActionDispatcher.create().initWithScene(this.scene);

            this.needsDraw = true;

            this.canvas.addEventListener('touchstart', this.start.bind(this), true);
            this.canvas.addEventListener('touchend', this.end.bind(this), true);
            this.canvas.addEventListener('touchcancel', this.end.bind(this), true);
            this.canvas.addEventListener('touchmove', this.move.bind(this), true);
            this.canvas.addEventListener('gesturechange', this, true);
            this.canvas.addEventListener('mousedown', this.start.bind(this), true);
            this.canvas.addEventListener('mouseup', this.end.bind(this), true);
            this.canvas.addEventListener('mousemove', this.move.bind(this), true);
            this.canvas.addEventListener('wheel', this, true);
        }
    },

    exitDocument: {
        value: function() {
            window.removeEventListener("resize", this, true);
        }
    },

    captureMousewheel: {
        value: function() {
            this.needsDraw = true;
        }
    },

    captureWheel: {
        value: function() {
            this.needsDraw = true;
        }
    },

    captureGesturechange: {
        value: function() {
            this.needsDraw = true;
        }
    },

    _TOUCH_DOWN: { value: 0 },

    _TOUCH_UP: { value: 1 },

    _TOUCH_MOVE: { value: 2 },

    _eventType: { value: -1, writable: true },

    _previousNodeEventType: { value: -1, writable: true },

    _previousHandledNode: { value: null, writable: true },

    handleSelectedNode: {
        value: function(glTFElementID) {
            var glTFElement = null,
                previousGlTFElement = this._previousHandledNode,
                previousHandledComponent3D = previousGlTFElement ? previousGlTFElement.component3D : null;

            if (this._eventType === this._TOUCH_UP) {
                if (previousGlTFElement && previousHandledComponent3D) {
                    previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._TOUCH_UP);
                }

                this._eventType = -1;
            }

            if (glTFElementID) {
                glTFElement = this.scene.glTFElement.ids[glTFElementID];

                if (this._eventType === this._TOUCH_DOWN) {
                    var node = SceneHelper.createNodeFromGlTFElementIfNeeded(glTFElement, this.scene);
                    this.application.dispatchEventNamed("sceneNodeSelected", true, true, node);
                }

            }

            //are we out of a move ?
            if (previousGlTFElement && previousHandledComponent3D && this._previousNodeEventType === this._TOUCH_MOVE &&
                glTFElement !== previousGlTFElement) {
                previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._EXIT);
            }

            if (this._eventType === this._TOUCH_MOVE && glTFElement !== previousGlTFElement) {
                if (glTFElement) {
                    this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._ENTER, glTFElement);
                } else {
                    this._eventType = -1;
                }
            } else if (glTFElement && this._eventType === this._TOUCH_DOWN) {
                this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._TOUCH_DOWN, glTFElement);
                this._eventType = -1;
            }

            this._previousHandledNode = glTFElement;
            this._previousNodeEventType = this._eventType;
        }
    },

    _previousMaterialEventType: { value: -1, writable: true },

    _previousHandledMaterial: { value: null, writable: true },

    handleSelectedMaterial: {
        value: function(glTFElementID) {
            var glTFElement = null,
                previousGlTFElement = this._previousHandledMaterial,
                previousHandledComponent3D = previousGlTFElement ? previousGlTFElement.component3D : null;

            if (this._eventType === this._TOUCH_UP) {
                if (previousGlTFElement && previousHandledComponent3D) {
                    previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._TOUCH_UP);
                }

                this._eventType = -1;
            }

            if (glTFElementID) {
                glTFElement = this.scene.glTFElement.ids[glTFElementID];

                if (this._eventType === this._TOUCH_DOWN) {
                    var material = SceneHelper.createMaterialFromGlTFElementIfNeeded(glTFElement, this.scene);
                    this.application.dispatchEventNamed("sceneMaterialSelected", true, true, material);
                }

            }

            //are we out of a move ?
            if (previousGlTFElement && previousHandledComponent3D && this._previousMaterialEventType === this._TOUCH_MOVE &&
                glTFElement !== previousGlTFElement) {
                previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._EXIT);
            }

            if (this._eventType === this._TOUCH_MOVE && glTFElement !== previousGlTFElement) {
                if (glTFElement) {
                    this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._ENTER, glTFElement);
                } else {
                    this._eventType = -1;
                }
            } else if (glTFElement && this._eventType === this._TOUCH_DOWN) {
                this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._TOUCH_DOWN, glTFElement);
                this._eventType = -1;
            }

            this._previousHandledMaterial = glTFElement;
            this._previousNodeEventType = this._eventType;
        }
    },


    move: {
        value: function (event) {
            var position = this.getRelativePositionToCanvas(event);
            this._mousePosition = [position.x * this.scaleFactor,  (this.height * this.scaleFactor)- (position.y * this.scaleFactor)];
            this._eventType = this._TOUCH_MOVE;
            this.needsDraw = true;
        }
    },

    start: {
        value: function (event) {
            event.preventDefault();
            this._consideringPointerForPicking = true;
            var position = this.getRelativePositionToCanvas(event);
            this._mousePosition = [position.x * this.scaleFactor,  (this.height * this.scaleFactor) - (position.y * this.scaleFactor)];

            if (this._state === this.PLAY) {
                this.pause();
            }

            this._eventType = this._TOUCH_DOWN;

            this.needsDraw = true;
        }
    },

    end:{
        value: function (event) {
            if (this._consideringPointerForPicking && event.target === this.canvas) {
                event.preventDefault();
            }

            if (this._state === this.PAUSE) {
                if (this.scene && this.viewPoint) {
                    if (this.scene.glTFElement) {
                        var animationManager = this.getAnimationManager();
                        if (animationManager.nodeHasAnimatedAncestor(this.viewPoint.glTFElement)) {
                            this.play();
                        }
                    }
                }
            }

            this._consideringPointerForPicking = false;
            this._eventType = this._TOUCH_UP;
            this.handleSelectedNode(null);
            this._mousePosition = null;
        }
    },

    getWebGLRenderer: {
        value: function() {
            return this.sceneRenderer ? this.sceneRenderer.webGLRenderer : null;
        }
    },

    getWebGLContext: {
        value: function() {
            var renderer = this.getWebGLRenderer();
            return renderer ? renderer.webGLContext : null;
        }
    },

    getResourceManager: {
        value: function() {
            var renderer = this.getWebGLRenderer();
            return renderer ? renderer.resourceManager : null;
        }
    },

    getAnimationManager: {
        value: function() {
            if (this.scene) {
                if (this.scene.glTFElement) {
                    return this.scene.glTFElement.animationManager;
                }
            }
            return null;
        }
    },

    showBBOX: {
        get: function() {
            return this._showBBOX;
        },
        set: function(flag) {
            if (flag != this._showBBOX) {
                this._showBBOX = flag;
                this.needsDraw = true;
            }
        }
    },

    showGradient: {
        get: function() {
            return this._showGradient;
        },
        set: function(flag) {
            if (flag != this._showGradient) {
                this._showGradient = flag;
                this.needsDraw = true;
            }
        }
    },

    showReflection: {
        get: function() {
            return this._showReflection;
        },
        set: function(flag) {
            this._showReflection = flag;
            this.needsDraw = true;
        }
    },

    handleSceneNodeSelected: {
        value: function(event) {
            this.selectedNode = event.detail;
            this.needsDraw = true;
        }
    },

    _displayBBOX: {
        value: function(glTFNode) {
            if (!this.scene)
                return;
            if (this.scene.glTFElement) {
                if (glTFNode.getBoundingBox != null) { //work-around issue with scene-tree
                    var cameraMatrix = this.sceneRenderer.technique.rootPass.scenePassRenderer._viewPointMatrix;    
                    var glTFCamera = SceneHelper.getGLTFCamera(this.viewPoint);
                    if (glTFCamera != null) {
                        var projectionMatrix = glTFCamera.projection.matrix;
                        this.getWebGLRenderer().drawBBOX(glTFNode.getBoundingBox(true), cameraMatrix, mat4.identity(), projectionMatrix);
                    }
                }
            }
        }
    },

    _displayAllBBOX: {
        value: function() {
            if (!this.scene)
                return;
            if (this.scene.glTFElement) {
                var cameraMatrix = this.sceneRenderer.technique.rootPass.scenePassRenderer._viewPointMatrix;            
                var ctx = mat4.identity();
                var node = this.scene.glTFElement.rootNode;
                var self = this;

                node.apply( function(node, parent, ctx) {
                        self._displayBBOX(node);
                    return null;
                }, true, ctx);
            }
        }
    },

    width: {
        get: function() {
            if (this._width != null)
                return this._width;
            var gl = this.getWebGLContext();
            return gl != null ? gl.canvas.clientWidth : 0;
        },
        set: function(value) {
            if (this._width != value) {
                this._width = value;
                this.needsDraw = true;
            }
        }
    },

    height: {
        get: function() {
            if (this._height != null)
                return this._height;
            var gl = this.getWebGLContext();
            return gl != null ? gl.canvas.clientHeight : 0;
        },
        set: function(value) {
            if (this._height != value) {
                this._height = value;
                this.needsDraw = true;
            }
        }
    },

    _forwardToNextAnimatedViewPointIfNeeded: {
        value: function() {
            var animationManager = this.getAnimationManager();
            if (animationManager) {
                if (animationManager.nodeHasAnimatedAncestor(this.viewPoint.glTFElement) == true) {
                    return;
                }
                var viewPointIndex = this._viewPointIndex; //_viewPointIndex is private in view, we could actually put/access this info from scene
                var viewPoints = SceneHelper.getViewPoints(this.scene);
                if (viewPoints.length > 1) {
                    var nextViewPoint = this.viewPoint;
                    var checkIdx = 0;
                    while ((checkIdx < viewPoints.length) && (animationManager.nodeHasAnimatedAncestor(nextViewPoint.glTFElement) == false)) {
                        viewPointIndex = ++viewPointIndex % viewPoints.length;
                        nextViewPoint = viewPoints[viewPointIndex];
                        checkIdx++;
                    }
                    this.viewPoint = nextViewPoint;
                }
            }
        }
    },

    draw: {
        value: function() {
            //Update canvas when size changed
            var webGLContext = this.getWebGLContext();
            if (webGLContext == null || this._disableRendering)
                return;
            this.sceneRenderer.technique.rootPass.viewPoint = this._internalViewPoint;

            //WebGL does it for us with preserveDrawBuffer = false
            if (this._shouldForceClear || (this._contextAttributes.preserveDrawingBuffer == null) || (this._contextAttributes.preserveDrawingBuffer == true)) {
                webGLContext.clearColor(0,0,0,0.);
                webGLContext.clear(webGLContext.DEPTH_BUFFER_BIT | webGLContext.COLOR_BUFFER_BIT);
            }

            if (this.delegate) {
                if (this.delegate.sceneWillDraw) {
                    this.delegate.sceneWillDraw();
                }
            }

            if ((this.allowsProgressiveSceneLoading === false) && (this._sceneResourcesLoaded === false)) {
                return;
            }

            if (this._scene == null || this.viewPoint == null || this._disableRendering)
                return;


            this.resizeIfNeeded();
            var viewPoint = this.viewPoint;
            var self = this;
            var time = Date.now();

            if (this.sceneRenderer && this.scene) {
                var animationManager = this.getAnimationManager();
                if (this._state == this.PLAY && animationManager) {
                    this._forwardToNextAnimatedViewPointIfNeeded();
                    animationManager.sceneTime += time - this._lastTime;
                    var endTime = this.scene.glTFElement.endTime;
                    if (animationManager.sceneTime / 1000. > endTime) {
                        if (this.loops) {
                            animationManager.sceneTime = endTime == 0 ? 0 : animationManager.sceneTime % endTime;
                        } else {
                            this.stop();
                        }
                    }
                    animationManager.updateTargetsAtTime(animationManager.sceneTime, this.getResourceManager());
                }

                if (viewPoint.glTFElement) {
                    var glTFCamera = SceneHelper.getGLTFCamera(viewPoint);
                    glTFCamera.projection.aspectRatio =  this.width / this.height;

                    this._internalViewPoint.transform.matrix = viewPoint.glTFElement.worldMatrix;
                    if (this._internalViewPoint.cameras != null) {
                        if (this._internalViewPoint.cameras.length > 0)
                            this._internalViewPoint.cameras[0] = glTFCamera;
                    }
                }
                animationManager.evaluateAtTime(time, this.getResourceManager());
                if (animationManager.hasActiveAnimations()) {
                    this.needsDraw = true;
                }
            }
            this._lastTime = time;

            if (this._state == this.PLAY)
               this.needsDraw = true;

            if (this.scene) {
                var renderer = this.sceneRenderer.webGLRenderer;
                if (webGLContext) {
                    if (this.__renderOptions == null)
                        this.__renderOptions = {};

                    //FIXME: on the iPad with private function to enable webGL there was an issue with depthMask (need to re-check if that got fixed)
                    var allowsReflection = this.showReflection;
                    if(allowsReflection) {
                        /* ------------------------------------------------------------------------------------------------------------
                         Draw reflected scene
                        ------------------------------------------------------------------------------------------------------------ */
                        webGLContext.depthFunc(webGLContext.LESS);
                        webGLContext.enable(webGLContext.DEPTH_TEST);
                        webGLContext.frontFace(webGLContext.CW);
                        webGLContext.depthMask(true);
                        //should retrieve by node
                        var rootNode = this.scene.glTFElement.rootNode;
                        var nodeBBOX = rootNode.getBoundingBox(true);
                        var savedTr = mat4.create(rootNode.transform.matrix);
                        var scaleMatrix = mat4.scale(mat4.identity(), [1, 1, -1]);
                        mat4.multiply(scaleMatrix, rootNode.transform.matrix) ;
                        rootNode.transform.matrix = scaleMatrix;
                        var invVNodeBBOX = rootNode.getBoundingBox(true);
                        var mirrorMatrix = mat4.identity();
                        var translationMatrix = mat4.translate(mat4.identity(), [0, 0,  (nodeBBOX[0][2] - invVNodeBBOX[1][2])]);
                        mat4.multiply(mirrorMatrix, translationMatrix);
                        mat4.multiply(mirrorMatrix, scaleMatrix);
                        rootNode.transform.matrix = mirrorMatrix;
                        this.sceneRenderer.render(time, this.__renderOptions);
                        rootNode.transform.matrix = savedTr;
                        webGLContext.frontFace(webGLContext.CCW);
                    }

                    if (this.showGradient || allowsReflection) {
                        //FIXME:For now, just allow reflection when using default camera
                        if (this.viewPoint === this._defaultViewPoint) {
                            if (this.gradientRenderer) {
                                webGLContext.enable(webGLContext.BLEND);
                                webGLContext.disable(webGLContext.DEPTH_TEST);
                                webGLContext.disable(webGLContext.CULL_FACE);
                                webGLContext.depthMask(false);
                                this.gradientRenderer.render(time, this.__renderOptions);
                                webGLContext.depthMask(true);
                                webGLContext.enable(webGLContext.DEPTH_TEST);
                                webGLContext.enable(webGLContext.CULL_FACE);
                                webGLContext.disable(webGLContext.BLEND);
                            }
                        }
                    }

                    if (this._mousePosition != null) {
                        if (this.scene.nodesShouldBeHitTested) {
                            this.__renderOptions.picking = true;
                            this.__renderOptions.coords = this._mousePosition;
                            this.__renderOptions.delegate = this;
                            this.__renderOptions.pickingMode = "node";
                            this.sceneRenderer.render(time, this.__renderOptions);
                        } 
                        if (this.scene.materialsShouldBeHitTested) {
                            this.__renderOptions.picking = true;
                            this.__renderOptions.coords = this._mousePosition;
                            this.__renderOptions.delegate = this;
                            this.__renderOptions.pickingMode = "material";
                            this.sceneRenderer.render(time, this.__renderOptions);
                        }
                    }

                    this.__renderOptions.picking = false;
                    this.__renderOptions.coords = null;
                    this.__renderOptions.delegate = null;
                    this.__renderOptions.pickingMode = null;

                    this.sceneRenderer.render(time, this.__renderOptions);

                    //FIXME: ...create an API to retrieve the actual viewPoint matrix...
                    if (this.showBBOX) {
                        this._displayAllBBOX();
                    }
                    
                    if (this.delegate) {
                        if (this.delegate.sceneDidDraw) {
                            this.delegate.sceneDidDraw();
                        }
                    }

                    webGLContext.flush();

                    if (this._firstFrameDidRender === false) {
                        this._firstFrameDidRender = true;
                        this.dispatchEventNamed("firstFrameDidRender", true, false, this);
                    }

                    /*
                    var error = webGLContext.getError();
                    if (error != webGLContext.NO_ERROR) {
                        console.log("gl error"+webGLContext.getError());
                    }
                    */
                }
            }
        }
    },

    resizeIfNeeded: {
        value: function(evt) {
            var gl = this.getWebGLContext();
            if (gl == null)
                return;
            var width = this.width * this.scaleFactor;
            var height = this.height * this.scaleFactor;
            if (gl.canvas.width != width || gl.canvas.height != height) {
                gl.canvas.width = width;
                gl.canvas.height = height;
                if (this._width != null)
                    this.element.style.width = this.width + "px";;
                if (this._height != null)
                    this.element.style.height = this.height + "px";;
                gl.viewport(0, 0, width, height);
            }
        }
    },

    templateDidLoad: {
        value: function() {
            var self = this;

            var parent = this.parentComponent;
            var animationTimeout = null;
            var composer = TranslateComposer.create();
            composer.animateMomentum = true;
            composer.hasMomentum = true;
            composer.allowFloats = true;
            composer.pointerSpeedMultiplier = 0.15;
            this._internalViewPoint = SceneHelper.createGLTFNodeIncludingCamera("__internal_viewPoint__");
            this.translateComposer = composer;

            this.needsDraw = true;
        }
    }
});

