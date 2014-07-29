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
require("runtime/dependencies/gl-matrix");
var Technique = require("runtime/technique").Technique;
var ScenePass = require("runtime/pass").ScenePass;
var BuiltInAssets = require("runtime/builtin-assets").BuiltInAssets;
var o3dgc = require("runtime/dependencies/o3dgc").o3dgc;

exports.SceneRenderer = Object.create(Object.prototype, {

    loadPickingTechnique: {
        value: function() {
            var self = this;
            var techniquePromise = BuiltInAssets.assetWithName( "pickingTechnique");

            techniquePromise.then(function (asset) {
                self.technique.rootPass.scenePassRenderer.pickingTechnique = asset;
            }, function (error) {
            }, function (progress) {
            });
        }
    },

    createTechniqueIfNeeded: {
        value: function() {
            if (!this._technique) {
                this._technique = Object.create(Technique).init();
                var pass = Object.create(ScenePass).init();
                //there is just one pass, so passName will be automatically set to "defaultPass"
                this._technique.passes = { "defaultPass": pass };
            }
        }
    },

    _webGLRenderer: { value: null, writable: true },

    _technique: { value: null, writable: true },

    technique: {
        get: function() {
            return this._technique;
        },
        set: function(value) {
            this._technique = value;
        }
    },


    compressedMeshDelegate: {
        value: {
            str2ab: function(str) {
                  var buf = new ArrayBuffer(str.length);
                  var bufView = new Uint8Array(buf);
                  for (var i=0, strLen=str.length; i<strLen; i++) {
                      bufView[i] = str.charCodeAt(i);
                  }
                  return buf;
              },

            decode: function (arrayBuffer, isAscii) {
                    if (arrayBuffer) {
                        function str2ab(str) {
                        }
                        if (isAscii) {
                            var bstream = new o3dgc.BinaryStream(this.str2ab(arrayBuffer));
                        } else {
                            var bstream = new o3dgc.BinaryStream(arrayBuffer);
                        }
                        var decoder = new o3dgc.SC3DMCDecoder();
                        var timer = new o3dgc.Timer();
                        var ifs = new o3dgc.IndexedFaceSet();
                        timer.Tic();
                        decoder.DecodeHeader(ifs, bstream);
                        timer.Toc();
                        console.log("DecodeHeader time (ms) " + timer.GetElapsedTime());
                        // allocate memory
                        var byteSize =
                            3 * 4 * ifs.GetNCoord() +
                            3 * 4 * ifs.GetNNormal();
                        var buffer = new ArrayBuffer(byteSize);
                        var bufferIndices = new ArrayBuffer(3 * 2 * ifs.GetNCoordIndex());

                        var shift = 0;
                        if (ifs.GetNCoordIndex() > 0) {
                            ifs.SetCoordIndex(new Uint16Array(bufferIndices, 0, 3 * ifs.GetNCoordIndex()));
                        }
                        if (ifs.GetNCoord() > 0) {
                            ifs.SetCoord(new Float32Array(buffer, shift, 3 * ifs.GetNCoord()));
                            shift += 12 * ifs.GetNCoord();
                        }
                        if (ifs.GetNNormal() > 0) {
                            ifs.SetNormal(new Float32Array(buffer, shift, 3 * ifs.GetNNormal()));
                            shift += 12 * ifs.GetNNormal();
                        }

                        var numNumFloatAttributes = ifs.GetNumFloatAttributes();
                        for (var a = 0; a < numNumFloatAttributes; ++a){
                            if (ifs.GetNFloatAttribute(a) > 0) {
                                ifs.SetFloatAttribute(a, new Float32Array(ifs.GetFloatAttributeDim(a) * ifs.GetNFloatAttribute(a)));
                            }
                        }
                        /*
                        console.log("Mesh info ");
                        console.log("\t# coords    " + ifs.GetNCoord());
                        console.log("\t# normals   " + ifs.GetNNormal());
                        console.log("\t# texcoords " + ifs.GetNTexCoord());
                        console.log("\t# triangles " + ifs.GetNCoordIndex());
                        */
                        // decode mesh
                        timer.Tic();
                        decoder.DecodePlayload(ifs, bstream);
                        timer.Toc();
                        /*
                        var size = arrayBuffer.byteLength;
                        console.log("DecodePlayload time " + timer.GetElapsedTime() + " ms, " + size + " bytes (" + (8.0 * size / ifs.GetNCoord()) + " bpv)");
                        console.log("Details");
                        var stats = decoder.GetStats();
                        console.log("\t CoordIndex         " + stats.m_timeCoordIndex + " ms, " + stats.m_streamSizeCoordIndex + " bytes (" + (8.0 * stats.m_streamSizeCoordIndex / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Coord              " + stats.m_timeCoord + " ms, " + stats.m_streamSizeCoord + " bytes (" + (8.0 * stats.m_streamSizeCoord / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Normal             " + stats.m_timeNormal + " ms, " + stats.m_streamSizeNormal + " bytes (" + (8.0 * stats.m_streamSizeNormal / ifs.GetNCoord()) + " bpv)");
                        console.log("\t TexCoord           " + stats.m_timeTexCoord + " ms, " + stats.m_streamSizeTexCoord + " bytes (" + (8.0 * stats.m_streamSizeTexCoord / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Color              " + stats.m_timeColor + " ms, " + stats.m_streamSizeColor + " bytes (" + (8.0 * stats.m_streamSizeColor / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Float Attributes   " + stats.m_timeFloatAttribute + " ms, " + stats.m_streamSizeFloatAttribute + " bytes (" + (8.0 * stats.m_streamSizeFloatAttribute / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Integer Attributes " + stats.m_timeFloatAttribute + " ms, " + stats.m_streamSizeFloatAttribute + " bytes (" + (8.0 * stats.m_streamSizeFloatAttribute / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Reorder            " + stats.m_timeReorder + " ms,  " + 0 + " bytes (" + 0.0 + " bpv)");
                        //SaveOBJ(ifs, fileName);
                        */
                        return ifs;
                    }
            },


            handleError: function(errorCode, info) {
                console.log("ERROR:vertexAttributeBufferDelegate:"+errorCode+" :"+info);
            },

            decompressAttribsInner_: function(str, inputStart, inputEnd,
                                             output, outputStart, stride,
                                             decodeOffset, decodeScale) {
                var prev = 0;
                for (var j = inputStart; j < inputEnd; j++) {
                    var code = str.charCodeAt(j);
                    prev += (code >> 1) ^ (-(code & 1));
                    output[outputStart] = decodeScale * (prev + decodeOffset);
                    outputStart += stride;
                }
            },

            decompressIndices_: function(str, inputStart, numIndices,
                                         output, outputStart) {
                var highest = 0;
                for (var i = 0; i < numIndices; i++) {
                    var code = str.charCodeAt(inputStart++);
                    output[outputStart++] = highest - code;
                    if (code == 0) {
                        highest++;
                    }
                }
            },

            decompressMesh: function(str, meshParams, decodeParams, callback)  {
                // Extract conversion parameters from attribArrays.
                var stride = decodeParams.decodeScales.length;
                var decodeOffsets = decodeParams.decodeOffsets;
                var decodeScales = decodeParams.decodeScales;
                var attribStart = meshParams.attribRange[0];
                var numVerts = meshParams.attribRange[1];

                // Decode attributes.
                var inputOffset = attribStart;
                var attribsOut = new Float32Array(stride * numVerts);
                for (var j = 0; j < stride; j++) {
                    var end = inputOffset + numVerts;
                    var decodeScale = decodeScales[j];
                    if (decodeScale) {
                        // Assume if decodeScale is never set, simply ignore the
                        // attribute.
                        this.decompressAttribsInner_(str, inputOffset, end,
                            attribsOut, j, stride,
                            decodeOffsets[j], decodeScale);
                    }
                    inputOffset = end;
                }

                var indexStart = meshParams.indexRange[0];
                var numIndices = 3*meshParams.indexRange[1];
                var indicesOut = new Uint16Array(numIndices);
                this.decompressIndices_(str, inputOffset, numIndices, indicesOut, 0);

                // Decode bboxen.
                /*
                var bboxen = undefined;
                var bboxOffset = meshParams.bboxes;
                if (bboxOffset) {
                    bboxen = decompressAABBs_(str, bboxOffset, meshParams.names.length,
                        decodeOffsets, decodeScales);
                }
                */
                callback(attribsOut, indicesOut, null, meshParams);
            },


            convert: function (source, resource, ctx) {
                var compression = ctx.mesh.compression;
                if (compression.type == "won-compression") {
                    var indexRange = compression.indexRange;
                    if (indexRange) {
                        var meshEnd = indexRange[0] + 3 * indexRange[1];
                        var callback = null;
                        this.decompressMesh(resource, compression, compression,
                            function(attribsOut, indicesOut, bboxen, meshParams) {
                                ctx.renderer.setupCompressedMesh(ctx.mesh, attribsOut, indicesOut);
                            });
                    }
                } else {
                    var vertexCount = 0;
                    var mesh = ctx.mesh;
                    if (compression.compressedData) {
                        var compressedData = compression.compressedData;
                        vertexCount = compressedData.verticesCount;
                        var ifs = this.decode(resource, compressedData.mode === "ascii");
                        var indicesShort = ifs.GetCoordIndex();
                        var positions = ifs.GetCoord();
                        var normals = ifs.GetNNormal() > 0 ? ifs.GetNormal() : null;
                        ctx.renderer.setupCompressedMesh2(ctx.mesh, vertexCount, positions, normals, ifs, compressedData.floatAttributesIndexes, indicesShort);
                    }
                }

                return resource;
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    scene: {
        get: function() {
            return this.technique.rootPass.scene;
        },
        set: function(value) {
            var self = this;
            var scene = this.technique.rootPass.scene;
            if (scene != value) {
                this.technique.rootPass.scene = value;

                this.scene.rootNode.apply( function(node, parent, context) {
                    if (node.meshes) {
                        node.meshes.forEach(function (mesh) {
                            if (mesh.compression) {
                                var requestType = "text";
                                if (mesh.compression.compressedData.mode) {
                                    if (mesh.compression.compressedData.mode == "binary") {
                                        requestType = "arraybuffer";
                                    }
                                }

                                mesh.compression.compressedData.requestType = requestType;

                                self.webGLRenderer.resourceManager.getResource(
                                    mesh.compression.compressedData,
                                    self.compressedMeshDelegate,
                                    { "mesh" : mesh, "renderer" : self.webGLRenderer});
                            }
                        }, this);
                    }
                } , true, null);

            }
        }
    },

    webGLRenderer: {
        get: function() {
            return this._webGLRenderer;
        },
        set: function(value) {
            this._webGLRenderer = value;
        }
    },

    init: {
        value: function( webGLRenderer, options) {
            this.webGLRenderer = webGLRenderer;
            this.createTechniqueIfNeeded();
            this.loadPickingTechnique();
            return this;
        }
    },

    render: {
        value: function(time, options) {
            if (this.technique)
                this.technique.execute(this.webGLRenderer, time, options);
        }
    }

});

