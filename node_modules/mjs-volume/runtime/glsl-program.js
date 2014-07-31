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

//FIXME: Delete shader if compile failed
//FIXME: Delete program if LINK failed
//FIXME: Validate
//NOTE: those 2 are typically garbage collected and then the gl resource is supposed to be released, but it shouldn't harm to release them as soon as possible without waiting for gc.

require("runtime/dependencies/gl-matrix");

var GLSLProgram = exports.GLSLProgram = Object.create(Object.prototype, {

    VERTEX_SHADER: { value: "x-shader/x-vertex" },
    FRAGMENT_SHADER: { value: "x-shader/x-fragment" },

    _shaders:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    shaders: {
        enumerable: false,
        get: function() {
            return this._shaders;
        },
        set: function(value) {
            this._shaders = value;
        }
    },

    _errorLogs:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    errorLogs: {
        enumerable: false,
        get: function() {
            return this._errorLogs;
        },
        set: function(value) {
            this._errorLogs = value;
        }
    },

    _pendingCommits:
    {
        value: null,
        writable: true
    },

    pendingCommits: {
        get: function() {
            return this._pendingCommits;
        },
        set: function(value) {
            this._pendingCommits = value;
        }
    },

    _symbolToLocation:
    {
        value: null,
        writable: true
    },

    symbolToLocation: {
        enumerable: false,
        get: function() {
            return this._symbolToLocation;
        },
        set: function(value) {
            this._symbolToLocation = value;
        }
    },

    _symbolToActiveInfo:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    symbolToActiveInfo: {
        get: function() {
            return this._symbolToActiveInfo;
        },
        set: function(value) {
            this._symbolToActiveInfo = value;
        }
    },

    _semanticToSymbol: {
        value: null,
        writable: true
    },

    semanticToSymbol: {
        enumerable: false,
        get: function() {
            return this._semanticToSymbol;
        },
        set: function(value) {
            this._semanticToSymbol = value;
        }
    },

    _symbolToSemantic: {
        value: null,
        writable: true
    },

    symbolToSemantic: {
        get: function() {
            return this._symbolToSemantic;
        },
        set: function(value) {
            this._symbolToSemantic = value;
        }
    },

    _symbolToValue:
    {
        value: null,
        writable: true
    },

    symbolToValue: {
        get: function() {
            return this._symbolToValue;
        },
        set: function(value) {
            this._symbolToValue = value;
        }
    },

    _uniformSymbols:
    {
        value: null,
        writable: true
    },

    uniformSymbols: {
        enumerable: false,
        get: function() {
            return this._uniformSymbols;
        },
        set: function(value) {
            this._uniformSymbols = value;
        }
    },

    _attributeSymbols:
    {
        value: null,
        writable: true
    },

    attributeSymbols: {
        enumerable: false,
        get: function() {
            return this._attributeSymbols;
        },
        set: function(value) {
            this._attributeSymbols = value;
        }
    },


    _GLProgram:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    //API
    GLProgram: {
        enumerable: false,
        get: function() {
            return this._GLProgram;
        },
        set: function(value) {
            this._GLProgram = value;
        }
    },

    getTypeForSymbol: {
        value: function(symbol) {
            var type = null;
            var activeInfo = this.symbolToActiveInfo[symbol];
            if (activeInfo) {
                type = activeInfo.type;
            }
            return type;
        }
    },

    getLocationForSymbol: {
        value: function(symbol) {
            return this.symbolToLocation[symbol];
        }
    },


    getSymbolForSemantic: {
        value: function(semantic) {
            return this.semanticToSymbol[semantic];
        }
    },

    //FIXME: argument order should be reversed
    setSymbolForSemantic: {
        value: function(symbol,semantic)  {
            if (symbol === "none")
                symbol = null;
            if (semantic === "none")
                semantic = null;

            if (!this.symbolToActiveInfo[symbol]) {
                return false;
            }

            //if the semantic is already taken bail out.
            if (semantic) {
                if (this.semanticToSymbol[semantic]) {
                    return false;
                }
            }

            if (symbol) {
                var previousSemantic = this.symbolToSemantic[symbol];
                if ((previousSemantic) && (previousSemantic !== semantic)) {
                    this.semanticToSymbol[previousSemantic] = null;
                }

                this.symbolToSemantic[symbol] = semantic;
            }

            if (semantic) {
                this.semanticToSymbol[semantic] = symbol;
            }

            return true;
        }
    },

    setSemanticForSymbol: {
        value: function(symbol,semantic)  {
            this.setSymbolForSemantic(symbol,semantic);
        }
    },

    getSemanticForSymbol: {
        value: function(symbol) {
            return this.symbolToSemantic[symbol];
        }
    },

    setValueForSymbol: {
        value: function(symbol,value)  {
            var existingValue = this.symbolToValue[symbol];
            var type = this.getTypeForSymbol(symbol);
            var GL = WebGLRenderingContext;

            if (( value != null) && (existingValue != null)) {
                if (type === GL.FLOAT) {
                    if (value === existingValue) {
                        return;
                    }
                } else if (type === GL.FLOAT_MAT4) {
                    if (value.length == 16) {
                        if (mat4.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_MAT3) {
                    if (value.length == 9) {
                        if (mat3.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_VEC3) {
                    if (value.length == 3) {
                        if (vec3.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_VEC4) {
                    if (value.length == 4) {
                        if (vec4.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_VEC2) {
                    if (value.length == 2) {
                        if (vec4.equal(existingValue, value)) {
                            return;
                        }
                    }
                }

            } else {
                if (type === GL.FLOAT_MAT4) {
                    if (value.length === 16) {
                        existingValue = mat4.create();
                    }
                } else if (type === GL.FLOAT_MAT3) {
                    existingValue = mat3.create();
                } else if (type === GL.FLOAT_VEC3) {
                    existingValue = vec3.create();
                } else if (type === GL.FLOAT_VEC4) {
                    existingValue = vec4.create();
                } else if (type === GL.FLOAT_VEC2) {
                    existingValue = vec2.create();
                }
            }

            if (this.symbolToActiveInfo[symbol] !== null) {
                if (this.pendingCommits.indexOf(symbol) === -1) {
                    this.pendingCommits.push(symbol);
                }
            }

            if (value != null) {
                if (type === GL.FLOAT_MAT4) {
                    if (value.length === 16) {
                        value = mat4.set(value ,existingValue);
                    }
                } else if (type === GL.FLOAT_MAT3) {
                    value = mat3.set(value, existingValue);
                } else if (type === GL.FLOAT_VEC3) {
                    value = vec3.set(value, existingValue);
                } else if (type === GL.FLOAT_VEC4) {
                    value = vec4.set(value, existingValue);
                } else if (type === GL.FLOAT_VEC2) {
                    value = vec2.set(value, existingValue);
                }
            }

            this.symbolToValue[symbol] = value;
        }
    },

    getValueForSymbol: {
        value: function(symbol) {
            return this.symbolToValue[symbol];
        }
    },

    _commitSwitch: {
        value: (function () {
            var theSwitch = [];
            theSwitch[WebGLRenderingContext.FLOAT_MAT2] = function uniformMatrix2fv(GL, location , count, value) {
                GL.uniformMatrix2fv(location , count, value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_MAT3] = function uniformMatrix3fv(GL, location , count, value) {
                GL.uniformMatrix3fv(location , count, value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_MAT4] = function uniformMatrix4fv(GL, location , count, value) {
                GL.uniformMatrix4fv(location , count, value);
            };
            theSwitch[WebGLRenderingContext.FLOAT] = function uniform1f(GL, location , count, value) {
                GL.uniform1f(location,value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_VEC2] = function uniform2fv(GL, location , count, value) {
                GL.uniform2fv(location,value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_VEC3] = function uniform3fv(GL, location , count, value) {
                GL.uniform3fv(location,value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_VEC4] = function uniform4fv(GL, location , count, value) {
                GL.uniform4fv(location,value);
            };
            theSwitch[WebGLRenderingContext.INT] = function uniform1i(GL, location , count, value) {
                GL.uniform1i(location, value);
            };
            theSwitch[WebGLRenderingContext.SAMPLER_2D] = function uniform1i(GL, location , count, value) {
                GL.uniform1i(location, value);
            };
            theSwitch[WebGLRenderingContext.SAMPLER_CUBE] = function uniform1i(GL, location , count, value) {
                GL.uniform1i(location, value);
            };

            return theSwitch;
        })()
    },

    //that should be private
    commit: {
        value: function(GL) {
            if (this.pendingCommits.length) {
                var i = this.pendingCommits.length-1, symbol;
                while (symbol = this.pendingCommits[i--]) {
                    this._commitSwitch[this.getTypeForSymbol(symbol)](
                        GL,
                        this.symbolToLocation[symbol],
                        false,
                        this.getValueForSymbol(symbol));
                }
                this.pendingCommits.length = 0;
            }
        }
    },

    use: {
        value: function(GL, commitValues) {
            GL.useProgram(this.GLProgram);
            if (commitValues) {
                this.commit(GL);
            }
        }
    },

    //that should be private
    createShaderWithSourceAndType: {
        value: function createShaderWithSourceAndType(GL,shaderSource,shaderType) {
            var shader;
            if (shaderType === "x-shader/x-fragment") {
                shader = GL.createShader(GL.FRAGMENT_SHADER);
            } else if (shaderType === "x-shader/x-vertex") {
                shader = GL.createShader(GL.VERTEX_SHADER);
            } else {
                return null;
            }

            GL.shaderSource(shader, shaderSource);
            GL.compileShader(shader);

            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                this.errorLogs = GL.getShaderInfoLog(shader);
                return null;
            }

            return shader;
        }
    },

    build: {
        value: function(GL) {
            var i;
            var vertexShaderSource = this.shaders[GLSLProgram.VERTEX_SHADER];
            var fragmentShaderSource = this.shaders[GLSLProgram.FRAGMENT_SHADER];
            var buildSuccess = false;
            var activeInfo;

            var vertexShader = this.createShaderWithSourceAndType(GL,vertexShaderSource,GLSLProgram.VERTEX_SHADER);
            if (vertexShader == null)
                return false;

            var fragmentShader = this.createShaderWithSourceAndType(GL,fragmentShaderSource,GLSLProgram.FRAGMENT_SHADER);
            if (fragmentShader == null)
                return false;

            this.GLProgram = GL.createProgram();

            GL.attachShader(this.GLProgram, vertexShader);
            GL.attachShader(this.GLProgram, fragmentShader);

            GL.linkProgram(this.GLProgram);
            if (GL.getProgramParameter(this.GLProgram, GL.LINK_STATUS)) {

                this.pendingCommits = [];
                this.symbolToActiveInfo = {};
                this.symbolToValue = {};
                this.symbolToLocation = {};
                this.uniformSymbols = [];
                this.attributeSymbols = [];
                this.symbolToSemantic = {};
                this.semanticToSymbol = {};

                var currentProgram = GL.getParameter( GL.CURRENT_PROGRAM );
                GL.useProgram(this.GLProgram);

                var uniformsCount = GL.getProgramParameter(this.GLProgram,GL.ACTIVE_UNIFORMS);
                for (i = 0 ; i < uniformsCount ; i++) {
                    activeInfo = GL.getActiveUniform(this.GLProgram, i);

                    var name = activeInfo.name;
                    //when an array is retrieve, the symbol we got comes as symbol[0] which is surprising...
                    var arrayIndex = name.indexOf("[0]");
                    if (arrayIndex != -1) {
                        name = name.substring(0,arrayIndex);
                    }

                    this.symbolToActiveInfo[name] = activeInfo;
                    this.symbolToLocation[name] = GL.getUniformLocation(this.GLProgram,name);
                    this.uniformSymbols.push(name);
                }

                var attributesCount = GL.getProgramParameter(this.GLProgram,GL.ACTIVE_ATTRIBUTES);
                for (i = 0 ; i < attributesCount ; i++) {
                    activeInfo = GL.getActiveAttrib(this.GLProgram, i);
                    this.symbolToActiveInfo[activeInfo.name] = activeInfo;
                    this.symbolToLocation[activeInfo.name] = GL.getAttribLocation(this.GLProgram,activeInfo.name);
                    this.attributeSymbols.push(activeInfo.name);
                }

                buildSuccess = true;
                GL.useProgram(currentProgram);
            }
            this.errorLogs = GL.getProgramInfoLog(this.GLProgram);

            return buildSuccess;
        }
    },

    initWithShaders: {
        value: function(shaders) {
            this.shaders = shaders;
        }
    },

    initWithProgram: {
        value: function(program) {
            this.shaders = program.shaders;
            this.semanticToSymbol = program.semanticToSymbol;
            this.symbolToSemantic = program.symbolToSemantic;
        }
    }

});

