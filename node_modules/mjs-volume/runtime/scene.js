// Copyright (c) 2013, Fabrice Robinet
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

var Montage = require("montage").Montage;
var Node = require("runtime/node").Node;
var UUID = require("montage/core/uuid");
var RuntimeTFLoader = require("runtime/runtime-tf-loader").RuntimeTFLoader;
var URL = require("url");
var SceneResourceLoader = require("runtime/scene-resource-loader").SceneResourceLoader;
var Q = require("q");
var Target = require("montage/core/target").Target;
var CSSOM = require("cssom");

exports.Scene = Target.specialize( {

    constructor: {
        value: function Scene() {
            this.super();
        }
    },

    _resourcesLoaded: { value: false, writable: true },

    _glTFElement: { value: null, writable: true },

    shouldBeHitTested: { value: false, writable: true },

    glTFElement: {
        get: function() {
            return this._glTFElement;
        },
        set: function(value) {
            this._glTFElement = value;
        }
    },

    _rootNode: { value: null, writable: true },

    rootNode: {
        get: function() {
            if (this.status === "loaded") {
                if (this._rootNode == null) {
                    this._rootNode = Montage.create(Node);
                    this._rootNode.scene = this;
                    this._rootNode.id = this.glTFElement.rootNode.id;
                }
            }
            return this._rootNode;
        }
    },

    sceneResourcesDidPrepare: {
        value: function() {
            if (!this._resourcesLoaded) {
                if (this._prepareToRenderDefer) {
                    this._prepareToRenderDefer.resolve();
                }
                this._resourcesLoaded = true;
                //FIXME: we should pass { scene:scene webGLContext:webGLContext
                //only problem now is pass the webGLContext through the promise properly
                this.dispatchEventNamed("resourcesDidLoad", true, false, this);
                this.status = "loaded";
            }
        }
    },

    isLoaded: {
        value: function() {
            return this.status == "loaded";
        }
    },

    status: { value: 0, writable: true},

    styleSheetsLoaded: { value: false, writable: true},

    styleSheets: { value: null, writable: true},

    loadCSSStyles: {
        value: function() {
            if (document.styleSheets == null)
                return;
            var packages = Object.keys(require.packages);
            var styleSheetsLoaded = 0;
            var styleSheetsCount = document.styleSheets.length;
            var i;
            var styleSheet;
            var styleSheets = [];
            this.styleSheets = {};
            
            for (i = 0; i < styleSheetsCount; i++) {    
                styleSheet = document.styleSheets[i]; 
                if (styleSheet.href != null) {
                    if (styleSheet.href.indexOf(packages[0]) != -1) {
                        //HACK: packages[0] is guaranted to be the entry point
                         //we just want the CSS from this project but not the ones from its dependencies
                        if (styleSheet.href.indexOf(packages[0] + "node_modules") == -1) {
                            styleSheets.push(styleSheet);
                        }
                    }
                } else {
                    // Gets a style node and its content within the current document.
                    if (styleSheet.ownerNode && styleSheet.ownerNode.innerText) {
                        this._addStyleSheets(styleSheet.ownerNode.innerText);
                    }
                }
            }

            styleSheetsCount = styleSheets.length;

            if (styleSheetsCount === 0) {
                this.styleSheetsLoaded = true;
                return;
            }

            styleSheets.forEach(function (styleSheet) {
                var self = this;
                //FIXME: handle error
                var cssPath = styleSheet.href;
                var cssXHR = new XMLHttpRequest();
                cssXHR.open("GET", cssPath, true);
                cssXHR.onreadystatechange = function () {
                    if (cssXHR.readyState == 4) {
                        if (cssXHR.status == 200) {
                            self._addStyleSheets(cssXHR.responseText, styleSheet.href);
                            styleSheetsLoaded++;

                            if (styleSheetsLoaded === styleSheetsCount) {
                                self.dispatchEventNamed("styleSheetsDidLoad", true, false, self);
                            }
                        }
                    }
                };

                cssXHR.send(null);
            }, this);

            return false;
        }
    },

    _addStyleSheets: {
        value: function (styleSheetContent, styleSheetID) {
            if (!styleSheetID) {
                styleSheetID = UUID.generate();
            }

            this.styleSheets[styleSheetID] = CSSOM.parse(styleSheetContent);
        }
    },

    deserializedFromTemplate: {
        value: function(owner, label, documentPart) {
            this._ownerDocumentPart = documentPart;
        }
    },

    _pendingLoading: { value: false },

    _loadScene: {
        value: function() {
            var self = this;
            var readerDelegate = {};
            readerDelegate.loadCompleted = function (scene) {
                this.totalBufferSize =  loader.totalBufferSize;
                this.glTFElement = scene;
                this.status = "loaded";
                console.log("scene loaded:"+this._path);
            }.bind(this);

            if (this._path != null) {
                var absolutePath = this._path;
                var URLObject = URL.parse(absolutePath);
                if (absolutePath[0] === '/') {
                    absolutePath = absolutePath.substr(1);
                    //HACK: packages[0] is guaranted to be the entry point
                    absolutePath = URL.resolve(require.packages[0], absolutePath);
                } else if (!URLObject.scheme) {
                    if (this._ownerDocumentPart == null) 
                        return;
                    var rebase = this._ownerDocumentPart.template.getBaseUrl();
                    absolutePath = URL.resolve(rebase, absolutePath);
                }

                var loader = Object.create(RuntimeTFLoader);
                this.status = "loading";
                loader.initWithPath(absolutePath);
                loader.delegate = readerDelegate;
                loader.load(null /* userInfo */, null /* options */);
            }

            if (this._pendingLoading == true) {
                this.removePathChangeListener("_ownerDocumentPart", this);
                this._pendingLoading = false;
            }
        }
    },

    path: {
        set: function(value) {
            //Work-around until montage implements textfield that do not send continous input..
            if (value) {
                if (value.indexOf(".json") === -1)
                    return;
            }

            if (value !== this._path) {
                this._path = value;
                if (value == null) {
                    this.scene = null;
                } else {
                    var isAbsolute  = (value.length > 0) &&  value[0] === '/';
                    if ((isAbsolute == false) && this._ownerDocumentPart == null) {
                        //FIXME:we should queue
                        if (this._pendingLoading == false) {
                            this.addPathChangeListener("_ownerDocumentPart", this, "_loadScene");
                            this._pendingLoading = true;
                        }
                    } else {
                        this._loadScene();
                    }
                }
            }
        },

        get: function() {
            return this._path;
        }
    },

    _prepareToRenderDefer: { value: null, writable: true },

    /*
        This method doesn't need to be called directly if the rendering is done via a view.
     */
    prepareToRender: {
        value: function(webGLRenderer) {
            if (this._prepareToRenderDefer == null) {
                this._prepareToRenderDefer = Q.defer();
                var sceneResourceLoader = Object.create(SceneResourceLoader).init(this.glTFElement, webGLRenderer, this);
                sceneResourceLoader.loadScene();
            }

            return this._prepareToRenderDefer.promise;
        }
    },

    init: {
        value:function(glTFElement) {
            if (glTFElement) {
                this.glTFElement = glTFElement;
                this.status = "loaded";
            }
            return this;
        }
    },

    blueprintModuleId:require("montage")._blueprintModuleIdDescriptor,

    blueprint:require("montage")._blueprintDescriptor

});
