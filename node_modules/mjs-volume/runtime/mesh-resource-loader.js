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

exports.MeshResourceLoader = Object.create(ResourceLoader, {

    meshes: { value: null, writable:true},

    fireMeshesDidLoadIfNeeded: {
        value: function() {

            var ids = Object.keys(this._trackedIds);
            if (ids) {
                if (ids.length == 0) {
                    if (this.delegate) {
                        if (this.delegate.meshesDidLoad) {
                            //FIXME: stop being an observer here
                            this.delegate.meshesDidLoad(this.meshes);
                        }
                    }
                }
            }
        }
    },

    resourceAvailable: {
        value: function(resourceId) {
            //console.log("resource available:" + resourceId);

            this._removeTrackedId(resourceId);
            this.fireMeshesDidLoadIfNeeded();
        }
    },

    //load and upload to VRAM
    _fetchResources: {
        value: function(delegate, resources, ctx) {
            var webGLContext = this.webGLRenderer.webGLContext;

            //Load images an upload texture
            var resourceIds = Object.keys(resources);
            resourceIds.forEach(function(resourceId) {
                //FIXME: handle the case of vertexBuffer who expect the resource to be passed as context
                //We want here to change the resource manager to prevent this
                //convert/resourveAvailable method of delegate should have resource has first argument
                var resource = this.webGLRenderer.resourceManager.getResource(resources[resourceId], delegate, webGLContext);
                if (resource == null) {
                    this._addTrackedId(resourceId);
                }
            }, this);
        }
    },

    _fetchAllResources: {
        value: function(resources) {
            var webGLContext = this.webGLRenderer.webGLContext;

            this._fetchResources(this.webGLRenderer.vertexAttributeBufferDelegate, resources.vertexBuffers, true);
            this._fetchResources(this.webGLRenderer.indicesDelegate, resources.allIndices);
            this._fetchResources(this.webGLRenderer.textureDelegate, resources.textures);
            this._fetchResources(this.webGLRenderer.programDelegate, resources.programs);

            //attempt a call to fireMeshesDidLoadIfNeeded just in case if nothing has to be fetched.
            //this might be more efficient to not go through the callback and return a bool here.
            this.fireMeshesDidLoadIfNeeded();
        }
    },

    _trackProgramsFromMaterial: {
        value: function(material, programs) {
            var technique = material.technique;
            if (technique) {
                for (var passId in technique.passes) {
                    var pass = technique.passes[passId];
                    var instanceProgram = pass.instanceProgram;
                    if (instanceProgram) {
                        programs[instanceProgram.program.id] = instanceProgram.program;
                        this._addTrackedId(instanceProgram.program.id);
                    }
                }
            }
        }
    },

    _trackTexturesFromMaterial: {
        value: function(material, textures) {
            var parameters = material.parameters;
            if (parameters) {
                var parametersKeys = Object.keys(parameters);
                if (parametersKeys.length > 0) {
                    parametersKeys.forEach(function(parameterKey) {
                        var parameter = parameters[parameterKey];
                        if (parameter) {
                            if (parameter.value) {
                                var value = parameter.value;
                                if ((value.type === "texture")) {
                                    textures[value.id] = value;
                                    this._addTrackedId(value.id);
                                }
                            }
                        }
                    }, this);
                }
            }
        }
    },


    _trackIndicesFromPrimitive: {
        value: function(primitive, allIndices) {
            var indices = primitive.indices;
            allIndices[indices.id] = indices;
            this._addTrackedId(indices.id);
        }
    },

    _trackVertexBuffersFromPrimitive: {
        value: function(primitive, vertexBuffers) {
            for (var semantic in primitive.semantics) {
                var vertexBuffer = primitive.semantics[semantic];
                vertexBuffers[vertexBuffer.id] = vertexBuffer;
                this._addTrackedId(vertexBuffer.id);
            }
        }
    },

    _trackMesh: {
        value: function(mesh, resources, webGLRenderer) {

            mesh.primitives.forEach( function(primitive) {
                this._trackTexturesFromMaterial(primitive.material, resources.textures);
                this._trackIndicesFromPrimitive(primitive, resources.allIndices);
                this._trackVertexBuffersFromPrimitive(primitive, resources.vertexBuffers);
                this._trackProgramsFromMaterial(primitive.material, resources.programs);

            }, this);

        }
    },

    _trackMeshes: {
        value: function(resources) {
            this.meshes.forEach( function(mesh) {
                this._trackMesh(mesh, resources, this.webGLRenderer);
            }, this);
        }
    },

    loadMeshes: {
        value: function() {
            var resources = {};
            //+ animations ? maybe not required in the pass of this
            //+ programs

            resources.textures = {};
            resources.allIndices = {};
            resources.vertexBuffers = {};
            resources.programs = {};

            this._trackMeshes(resources);
            this._fetchAllResources(resources, this.webGLRenderer);
        }
    },

    init: {
        value: function(meshes, webGLRenderer, delegate) {
            this.delegate = delegate;
            this.webGLRenderer = webGLRenderer;
            this.meshes = meshes;
            webGLRenderer.resourceManager.observers.push(this);
            return this;
        }
    }

});
