// Copyright (c) 2012, Motorola Mobility, Inc.
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
//  * Neither the name of the Motorola Mobility, Inc. nor the names of its
//    contributors may be used to endorse or promote products derived from this
//    software without specific prior written permission.
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

/*
 a pass has the following 3 key elements
 -> inputs  []  -> scene,viewpoint
 -> program
 -> outputs

 handleDidChange/handleWillChange inputs

 inputs -> program -> ouput (default to framebuffer)

 -> delegate , to give control to another client object
 */

require("runtime/dependencies/gl-matrix");
var Montage = require("montage").Montage;
var glTFNode = require("runtime/glTF-node").glTFNode;
var NodeWrapper = require("runtime/node-wrapper").NodeWrapper;

var Projection = require("runtime/projection").Projection;
var Camera = require("runtime/camera").Camera;
var Utilities = require("runtime/utilities").Utilities;
var WebGLRenderer = require("runtime/webgl-renderer").WebGLRenderer;
var Transform = require("runtime/transform").Transform;
var ResourceDescription = require("runtime/resource-description").ResourceDescription;

var LinkedListNode = Object.create(Object.prototype, {

    _content: { value: null, writable:true},

    content: {
        get: function() {
            return this._content;
        },
        set: function(value) {
            this._content = value;
        }
    },

    _previous: { value: null, writable:true},

    previous: {
        get: function() {
            return this._previous;
        },
        set: function(value) {
            this._previous = value;
        }
    },

    _next: { value: null, writable:true},

    next: {
        get: function() {
            return this._next;
        },
        set: function(value) {
            this._next = value;
        }
    },

    init: {
        value: function(content) {
            this.content = content;
            this.previous = null;
            this.next = null;
        }
    },

    removeFromList: {
        value: function() {
            if (this.previous) {
                this.previous.next = this.next;
            }
            if (this.next) {
                this.next.previous = this.previous;
            }
            this.next = null;
            this.previous = null;
        }
    }

});

var LinkedList = Object.create(Object.prototype, {

    _tail: { value: null, writable:true},

    tail: {
        get: function() {
            return this._tail;
        },
        set: function(value) {
            this._tail = value;
        }
    },

    _head: { value: null, writable:true},

    head: {
        get: function() {
            return this._head;
        },
        set: function(value) {
            this._head = value;
        }
    },

    append: {
        value: function(node) {
            if (!this.head) {
                this.head = node;
            }
            if (this.tail) {
                node.previous = this.tail;
                this.tail.next = node;
            }
            this.tail = node;
        }
    },

    remove: {
        value: function(node) {
            var id = node.content.id;

            var isTail = false,isHead = false;
            if (this.tail === node) {
                isTail = true;
                this.tail = node.previous;
            }

            if (this.head === node) {
                isHead = true;
                this.head = node.next;
            }

            //node.removeFromList();
            /* consistency check
             for (cnode = this.head ; cnode != null ; cnode = cnode.next) {
             if (id === cnode.content.id) {
             console.log("ERROR: inconsistency found isTail:"+isTail+" isHead:"+isHead);
             }
             }
             */
        }
    }

});

//-- Render Target ---

var RenderTarget = exports.RenderTarget = Object.create(Object.prototype, {

    _extras: { value: null, writable:true},

    _width: { value: 0, writable:true},

    _height: { value: 0, writable:true},

    _attachments: { value: null, writable:true},

    attachments: {
        get: function() {
            return this._attachments;
        },
        set: function(value) {
            this._attachments = value;
        }
    },

    init : {
        value: function() {
            this.attachments = [];
            this.extras = {};
            return this;
        }
    },

    width : {
        get: function() {
            return this._width;
        },
        set: function(value) {
            this._width = value;
        }
    },

    height : {
        get: function() {
            return this._height;
        },
        set: function(value) {
            this._height = value;
        }
    },

    extras : {
        get: function() {
            return this._extras;
        },
        set: function(value) {
            this._extras = value;
        }
    }
});

//-- Pass ---

var Pass = Object.create(Object.prototype, {

    _extras: { value: null, writable:true},

    //constants
    PROGRAM: { value: "program", writable: false },
    SCENE: { value: "scene", writable: false },

    _type: { value: null, writable:true},

    type: {
        get: function() {
            return this._type;
        }
    },

    extras : {
        get: function() {
            return this._extras;
        },
        set: function(value) {
            this._extras = value;
        }
    }
});

var ProgramPass = exports.ProgramPass = Montage.create(Pass, {

    _attributes: { value: null, writable: true },
    _uniforms: { value: null, writable: true },
    _states: { value: null, writable: true },
    _program: { value: null, writable: true },

    states: {
        get: function() {
            return this._states;
        },
        set: function(value) {
            this._states = value;
        }
    },

    program: {
        get: function() {
            return this._program;
        },
        set: function(value) {
            this._program = value;
        }
    },

    init: {
        value: function() {
            this.attributes = {};
            this.uniforms = {};
            this.states = {};
            this._type = Pass.PROGRAM;
            this.extras = {};
            return this;
        }
    }

});

var ScenePassRenderer = Object.create(Object.prototype, {

    _nodeWrappers: { value: null, writable: true },

    _pathIDsForNodeID: { value: null, writable: true },

    _primitivesPerPass: { value: null, writable: true },

    _viewPoint: { value: null, writable: true },

    _scene: { value: null, writable: true },

    _observers: { value: null, writable: true},

    _viewPointMatrix: { value: null, writable: true },

    addObserver: {
        value: function(observer) {
            if (this._observers == null) {
                this._observers = [];
            }

            if (this._observers.indexOf(observer) === -1) {
                this._observers.push(observer);
            } else {
                console.log("WARNING attempt to add 2 times the same observer in sceneRenderer")
            }
        }
    },

    removeObserver: {
        value: function(observer) {
            if (this._observers) {
                var index = this._observers.indexOf(observer);
                if (index !== -1) {
                    this._observers.splice(index, 1);
                }
            }
        }
    },

    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            if (this._observers) {
                for (var i = 0 ; i < this._observers.length ; i++) {
                    this._observers[i].viewPointWillChange(this, this._viewPoint, value);
                }
            }

            if (this._viewPoint != value) {
                this._viewPoint = value;
            }

            if (this._observers) {
                for (var i = 0 ; i < this._observers.length ; i++) {
                    this._observers[i].viewPointMatrixDidUpdate(this);
                    this._observers[i].viewPointDidChange(this);
                }
            }
        }
    },

    setupNodeAtPath: {
        value:function(node, pathID) {
            var nodeWrapper = this._nodeWrappers[node.id];
            if (nodeWrapper == null) {
                nodeWrapper = Object.create(NodeWrapper).init(node);
                this._nodeWrappers[node.id] = nodeWrapper;
                nodeWrapper.scenePassRenderer = this;
            }


            if (node.meshes) {
                node.meshes.forEach( function(mesh) {
                    if (mesh.primitives) {
                        //go through all primitives within all meshes
                        //TODO: cache all this
                        mesh.primitives.forEach( function (primitive) {
                            if (primitive.material) {
                                var technique = primitive.material.technique;
                                if (technique) {
                                    if (technique.rootPass) {
                                        var passUniqueID = technique.rootPass.id;
                                        var passWithPrimitives = null;
                                        var i;
                                        for (i = 0 ; i < this._primitivesPerPass.length ; i++) {
                                            if (this._primitivesPerPass[i].pass === passUniqueID) {
                                                passWithPrimitives = this._primitivesPerPass[i];
                                            }
                                        }

                                        if (passWithPrimitives == null) {
                                            passWithPrimitives = this._primitivesPerPass[passUniqueID] = {
                                                "pass" : technique.rootPass,
                                                "primitives" : []
                                            };
                                            this._primitivesPerPass.push(passWithPrimitives);
                                        }

                                        var renderPrimitive = {};
                                        if (mesh.compression)
                                            renderPrimitive.compressed = true;
                                        renderPrimitive["primitive"] = primitive;
                                        renderPrimitive.node = node;
                                        renderPrimitive.nodeWrapper = nodeWrapper;
                                        passWithPrimitives.primitives.push(renderPrimitive);
                                    }
                                }
                            }
                        }, this);
                    }
                }, this);
            }
        }
    },

    sceneWillChange: {
        value: function(prev, scene) {
            this._viewPointMatrix = mat4.identity();
        }
    },

    sceneDidChange: {
        value: function() {
            //prepares all infos
            this._primitivesPerPass = [];
            this._nodeWrappers = {};
            //Assign a view point from available nodes with camera if none
            var self = this;
            if (!this.scene)
                return;
            this.scene.rootNode.apply( function(node, parent, context) {
                self.setupNodeAtPath(node);
                return null;
            } , true, null);
        }
    },


    render: {
        value: function(webGLRenderer, time, options) {
            if (!this.scene || !this.viewPoint)
                return;
            //FIXME: make a pool to avoid these object, they are temporary we don't want to re-create them each time
            if (this.__matrix == null)
                this.__matrix = mat4.create();

            if (this.viewPoint) {
                mat4.set(this.viewPoint.worldMatrix, this.__matrix);
                mat4.inverse(this.__matrix);
                if (mat4.equal(this._viewPointMatrix, this.__matrix) === false) {
                    mat4.set(this.__matrix, this._viewPointMatrix);
                    if (this._observers) {
                        for (var i = 0 ; i < this._observers.length ; i++) {
                            this._observers[i].viewPointMatrixDidUpdate(this);
                        }
                    }
                }
            }
            var idx;
            var picking = options ? ((options.picking === true) && (options.coords != null)) : false;
            if (picking) {
                this.pickingRenderTarget.extras.coords = options.coords;
                webGLRenderer.bindRenderTarget(this.pickingRenderTarget);
            }

            //set projection matrix
            webGLRenderer.projectionMatrix = this.viewPoint.cameras[0].projection.matrix;

            if (this.__nonOpaquePassesWithPrimitives == null) {
                this.__nonOpaquePassesWithPrimitives = [];
            }

            this.__nonOpaquePassesWithPrimitives.length = 0;
            for (idx = 0 ; idx < this._primitivesPerPass.length ; idx++) {
                var passWithPrimitives = this._primitivesPerPass[idx];
                var pass = picking ? this.pickingPass : passWithPrimitives.pass;

                var states = pass.states;
                //we do not check hitTesting for non-opaque elements
                if (states.blendEnable && !picking) {
                    this.__nonOpaquePassesWithPrimitives.push(passWithPrimitives);
                } else {
                    if (picking && this.pickingTechnique) {
                        webGLRenderer.renderPrimitivesWithPass(passWithPrimitives.primitives, pass, this.pickingTechnique.parameters, time, options.pickingMode);
                    } else {
                        webGLRenderer.renderPrimitivesWithPass(passWithPrimitives.primitives, pass, null, time, options.pickingMode);
                    }
                }
            }

            if (!picking) {
                for (idx = 0 ; idx < this.__nonOpaquePassesWithPrimitives.length ; idx++) {
                    var passWithPrimitives = this.__nonOpaquePassesWithPrimitives[idx];
                    webGLRenderer.renderPrimitivesWithPass(passWithPrimitives.primitives, passWithPrimitives.pass, null, time);
                }
            } else {
                webGLRenderer.unbindRenderTarget(this.pickingRenderTarget);

                var pickedPixel = this.pickingRenderTarget.extras.pickedPixel;
                if ((options.pickingMode === "node") && (this.pickingPass.extras.nodeIDToColor != null)) {
                    var selectedNodeID = null;
                    var nodeIDs = Object.keys(this.pickingPass.extras.nodeIDToColor);
                    nodeIDs.forEach( function(nodeID) {
                        var color = this.pickingPass.extras.nodeIDToColor[nodeID];
                        if (Math.abs(Math.round(color[0]*255) - pickedPixel[0]) <= 1 &&
                            Math.abs(Math.round(color[1]*255) - pickedPixel[1]) <= 1 &&
                            Math.abs(Math.round(color[2]*255) - pickedPixel[2]) <= 1)  {
                            selectedNodeID = nodeID;
                        }
                    }, this);
                    if (options.delegate && options.delegate.handleSelectedNode)
                        options.delegate.handleSelectedNode(selectedNodeID);
                }

                if ((options.pickingMode === "material") && (this.pickingPass.extras.materialIDToColor != null)) {
                    var selectedMaterialID = null;
                    var materialIDs = Object.keys(this.pickingPass.extras.materialIDToColor);
                    materialIDs.forEach( function(materialID) {
                        var color = this.pickingPass.extras.materialIDToColor[materialID];
                        if (Math.abs(Math.round(color[0]*255) - pickedPixel[0]) <= 1 &&
                            Math.abs(Math.round(color[1]*255) - pickedPixel[1]) <= 1 &&
                            Math.abs(Math.round(color[2]*255) - pickedPixel[2]) <= 1)  {
                            selectedMaterialID = materialID;
                        }
                    }, this);
                    if (options.delegate && options.delegate.handleSelectedMaterial)
                        options.delegate.handleSelectedMaterial(selectedMaterialID);
                }
            }
        }
    },

    scene: {
        get: function() {
            return this._scene;
        },
        set: function(value) {
            if (this._scene != value) {
                this.sceneWillChange(this._scene, value);
                this._scene = value;
                this.sceneDidChange();
            }
        }
    },

    _pickingPass: { value: null, writable: true },

    pickingPass: {
        get: function() {
            return this._pickingPass;
        },
        set: function(value) {
            this._pickingPass = value;
            this._pickingPass.id = "__PickingPass";
            this._pickingPass.extras.nodeIDToColor = {};
            this._pickingPass.extras.materialIDToColor = {};
        }
    },

    _pickingTechnique: { value: null, writable: true },

    pickingTechnique: {
        get: function() {
            return this._pickingTechnique;
        },
        set: function(value) {
            this._pickingTechnique = value;
            this.pickingPass =this._pickingTechnique.rootPass;
        }
    },

    _pickingRenderTarget: { value: null, writable: true },

    pickingRenderTarget: {
        get: function() {
            return this._pickingRenderTarget;
        },
        set: function(value) {
            this._pickingRenderTarget = value;
        }
    },

    createPickingRenderTargetIfNeeded: {
        value: function() {
            if (!this._pickingRenderTarget) {
                this._pickingRenderTarget = Object.create(RenderTarget).init();
                this._pickingRenderTarget.attachments.push({
                    "semantic" : "COLOR_ATTACHMENT0",
                    "parameter" : "__pickingTexture"
                });
                this._pickingRenderTarget.attachments.push({
                    "semantic" : "DEPTH_ATTACHMENT",
                    "parameter" : "__pickingRenderBuffer"
                });
                this.pickingRenderTarget.extras.picking = true;
            }
            return this._pickingRenderTarget;
        }
    },

    init: {
        value: function() {
            this.pickingRenderTarget = this.createPickingRenderTargetIfNeeded();
            this.pickingRenderTarget.width = 512;
            this.pickingRenderTarget.height = 512;
            this._nodeWrappers = {};
            return this;
        }
    }

});

var ScenePass = exports.ScenePass = Object.create(Pass, {

    _scenePassRenderer: { value: null, writable: true },

    createScenePassRendererIfNeeded: {
        value: function() {
            if (!this._scenePassRenderer) {
                this._scenePassRenderer = Object.create(ScenePassRenderer).init();
            }
        }
    },

    scenePassRenderer: {
        get: function() {
            this.createScenePassRendererIfNeeded();
            return this._scenePassRenderer;
        },
        set: function(value) {
            this.createScenePassRendererIfNeeded();
            if (this._scenePassRenderer != value) {
                this._scenePassRenderer = value;
            }
        }
    },

    viewPoint: {
        get: function() {
            return this.scenePassRenderer ? this.scenePassRenderer.viewPoint : null;
        },
        set: function(viewpoint) {
            if (this.scenePassRenderer) {
                this.scenePassRenderer.viewPoint = viewpoint;
            }
        }
    },

    scene: {
        get: function() {
            return this.scenePassRenderer.scene;
        },
        set: function(value) {
            this.scenePassRenderer.scene = value;
        }
    },

    execute: {
        value: function(webGLRenderer, time, options) {
            //pickingRenderTarget
            this.scenePassRenderer.render(webGLRenderer, time, options);
        }
    },

    init: {
        value: function() {
            this._type = Pass.SCENE;
            this.extras = {};
            return this;
        }
    }

});

/*
 hitTest: {
 value: function(position, viewport, options) {

 if (this.inputs.scene && this.inputs.viewPoint) {
 var results = [];
 var cameraMatrix = mat4.create();
 var viewerMat =  this.inputs.viewPoint.transform;
 var viewer = vec3.createFrom(viewerMat[12],viewerMat[13], viewerMat[14]);
 var self = this;
 mat4.inverse(viewerMat, cameraMatrix);
 var origin = vec3.create();
 var dest = vec3.create();
 var camera = this.inputs.viewPoint.cameras[0];
 var screenSpaceVec1 = [position[0], viewport[3] - position[1],  camera.projection.znear];
 var screenSpaceVec2 = [position[0], viewport[3] - position[1],  camera.projection.zfar];

 var projectionMatrix = camera.projection.matrix;
 vec3.unproject(screenSpaceVec1, cameraMatrix, projectionMatrix, viewport, origin);
 vec3.unproject(screenSpaceVec2, cameraMatrix, projectionMatrix, viewport, dest);

 var X = 0;
 var Y = 1;
 var Z = 2;
 var direction = vec3.create();
 var originTr = vec3.create();
 var directionTr = vec3.create();
 var ctx = mat4.identity();
 this.inputs.scene.rootNode.apply( function(node, parent, parentTransform) {
 var modelMatrix = mat4.create();
 var modelViewMatrix = mat4.create();
 mat4.multiply( parentTransform, node.transform, modelMatrix);
 mat4.multiply( cameraMatrix, modelMatrix, modelViewMatrix);

 if (node.boundingBox) {
 var modelMatrixInv = mat4.create();
 mat4.inverse(modelMatrix, modelMatrixInv);

 mat4.multiplyVec3(modelMatrixInv, origin, originTr);
 mat4.multiplyVec3(modelMatrixInv, dest, directionTr);
 vec3.subtract(directionTr, originTr);
 vec3.normalize(directionTr);

 var bbox = node.boundingBox;
 if (Utilities.intersectsBBOX(bbox, [originTr , directionTr])) {
 var meshes = node.meshes;
 meshes.forEach( function(mesh) {
 var box = mesh.boundingBox;
 if (box) {
 if (Utilities.intersectsBBOX(box, [originTr , directionTr])) {
 Utilities.rayIntersectsMesh([originTr , directionTr], mesh, modelViewMatrix, results, options);
 }
 }
 }, this);
 if (results.length > 0) {
 results.sort( function(a,b) {

 var dist = vec3.create();
 vec3.subtract(a.intersection, viewer, dist);
 var d1 = vec3.dot(dist,dist);
 vec3.subtract(b.intersection, viewer, dist);
 var d2 = vec3.dot(dist,dist);
 return d1 - d2 }
 );
 }
 }
 }
 return modelMatrix;

 }, true, ctx);
 }
 return results;
 }
 },*/
