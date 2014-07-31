// Copyright (c) 2013, Fabrice Robinet.
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

var ResourceLoader = require("runtime/resource-loader").ResourceLoader;
var MeshResourceLoader = require("runtime/mesh-resource-loader").MeshResourceLoader;

exports.SceneResourceLoader = Object.create(ResourceLoader, {

    _scene: { value:null, writable: true },

    scene: {
        get: function() {
            return this._scene;
        },
        set: function(value) {
            this._scene = value;
        }
    },

    meshesDidLoad: {
        value: function() {
            if (this.delegate) {
                this.delegate.sceneResourcesDidPrepare(this.scene);
            }
        }
    },

    loadScene: {
        value: function() {
            var self = this;
            if (this.scene) {
                var node = this.scene.rootNode;
                var meshes = {};
                var meshesSet = [];
                node.apply( function(node, parent, parentTransform) {
                    if (node.meshes) {
                        if (node.meshes.length) {
                            node.meshes.forEach( function(mesh) {
                                if (meshes[mesh.id] == null) {
                                    meshesSet.push(mesh);
                                    meshes[mesh.id] = mesh;
                                }
                            }, this);
                        }
                    }
                    return null;
                }, true, null);

                var meshResourceLoader = Object.create(MeshResourceLoader).init(meshesSet, self.webGLRenderer, this);
                meshResourceLoader.loadMeshes();
            }
        }
    },

    init: {
        value: function(scene, webGLRenderer, delegate) {
            if (delegate)
                this.delegate = delegate;
            this.webGLRenderer = webGLRenderer;
            this.scene = scene;
            webGLRenderer.resourceManager.observers.push(this);
            return this;
        }
    }

});
