// Copyright (c) 2013,Fabrice Robinet.
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

require("runtime/dependencies/gl-matrix");
var Base = require("runtime/base").Base;
var Transform = require("runtime/transform").Transform;
var Utilities = require("runtime/utilities").Utilities;

exports.Skin = Object.create(Object.prototype, {

    jointsIds: { value: null, writable: true },

    nodesForSkeleton: { value: null, writable: true },

    bindShapeMatrix: { value: null, writable: true },

    inverseBindMatricesDescription: { value: null, writable: true },

    matricesForSkeleton:  { value: null, writable: true },

    sources:  { value: null, writable: true },

    init: {
        value: function() {
            this.jointsIds = [];
            this.nodesForSkeleton = {};
            this.matricesForSkeleton = {};
            this.sources = [];
            return this;
        }
    },

    inverseBindMatricesDelegate: {
        value: {
            handleError: function(errorCode, info) {
                console.log("ERROR:vertexAttributeBufferDelegate:"+errorCode+" :"+info);
            },

            convert: function (source, resource, ctx) {
                return new Float32Array(resource);
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    process: {
        value: function(node, resourceManager) {
            var skeletons = node.instanceSkin.skeletons;
            var objectSpace = mat4.create();
            mat4.inverse(node.worldMatrix, objectSpace);

            skeletons.forEach(function(skeleton) {
                var nodes = this.nodesForSkeleton[skeleton];
                var matrices = this.matricesForSkeleton[skeleton];
                if (!matrices) {
                    var length = 16 * this.jointsIds.length;
                    matrices = new Float32Array(length);
                    this.matricesForSkeleton[skeleton] = matrices;
                    var identity = mat4.identity();
                    for (var i = 0 ; i < length ; i++) {
                        matrices[i] = identity[i % 16];
                    }
                }
                var inverseBindMatrices = resourceManager.getResource(this.inverseBindMatricesDescription, this.inverseBindMatricesDelegate);
                if (inverseBindMatrices) {
                    this.sources.forEach(function(source) {
                        //FIXME: assume mesh here but it could be morph (later..)
                        var mesh = source;

                        var BSM = this.bindShapeMatrix;
                        var jointsCount = this.jointsIds.length;
                        var IBM = mat4.create();
                        for (var i = 0; i < jointsCount ; i++) {
                            for (var j = 0; j < 16 ; j++) {
                                IBM[j] = inverseBindMatrices[(i * 16) + j];
                            }

                            var JM = nodes[i].worldMatrix;
                            var destMat = mat4.identity();
                            mat4.multiply(destMat, objectSpace);
                            mat4.multiply(destMat, JM);
                            mat4.multiply(destMat, IBM);
                            mat4.multiply(destMat, BSM);
                            for (var j = 0; j < 16 ; j++) {
                                matrices[(i*16)+j] = destMat[j];
                            }
                        }

                        mesh.primitives.forEach(function(primitive) {
                            if (primitive.material.parameters) {
                                primitive.material.parameters["jointMat"].value = matrices;
                            }
                        }, this)
                    }, this);
                }
            }, this);
        }
    }

});
