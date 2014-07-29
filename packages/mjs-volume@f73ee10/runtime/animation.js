// Copyright (c) 2013, Fabrice ROBINET.
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
var o3dgc = require("runtime/dependencies/o3dgc").o3dgc;

/** MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * KeySpline - use bezier curve for transition easing function
 * is inspired from Firefox's nsSMILKeySpline.cpp
 * Usage:
 * var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
 * spline.get(x) => returns the easing value | x must be in [0, 1] range
 */

var easingFunctions = {
    "ease":        [0.25, 0.1, 0.25, 1.0],
    "linear":      [0.00, 0.0, 1.00, 1.0],
    "ease-in":     [0.42, 0.0, 1.00, 1.0],
    "ease-out":    [0.00, 0.0, 0.58, 1.0],
    "ease-in-out": [0.42, 0.0, 0.58, 1.0]
};

function KeySpline (easingFunction) {

    var mX1 = easingFunction[0];
    var mY1 = easingFunction[1];
    var mX2 = easingFunction[2];
    var mY2 = easingFunction[3];

    this.get = function(aX) {
        if (mX1 == mY1 && mX2 == mY2) return aX; // linear
        return CalcBezier(GetTForX(aX), mY1, mY2);
    }

    function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
    function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
    function C(aA1)      { return 3.0 * aA1; }

    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    function CalcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
    }

    // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
    function GetSlope(aT, aA1, aA2) {
        return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }

    function GetTForX(aX) {
        // Newton raphson iteration
        var aGuessT = aX;
        for (var i = 0; i < 4; ++i) {
            var currentSlope = GetSlope(aGuessT, mX1, mX2);
            if (currentSlope == 0.0) return aGuessT;
            var currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
}

var Channel = exports.Channel = Object.create(Base, {

    startTime: { value: 0, writable:true },

    endTime: { value: -1, writable:true },

    _sampler: { value: null, writable: true },

    sampler: {
        get: function() {
            return this._sampler;
        },
        set: function(value ) {
            this._sampler = value;
        }
    },

    _target: { value: null, writable: true },

    target: {
        get: function() {
            return this._target;
        },
        set: function(value ) {
            this._target = value;
        }
    },

    _path: { value: null, writable: true },

    path: {
        get: function() {
            return this._path;
        },
        set: function(value ) {
            this._path = value;
        }
    },

    parameterDelegate: {
        value: {
            handleError: function(errorCode, info) {
                console.log("ERROR:parameterDelegate:"+errorCode+" :"+info);
            },

            decode: function(arrayBuffer, parameter) {
                if (arrayBuffer, parameter) {
                    function str2ab(str) {
                        var buf = new ArrayBuffer(str.length);
                        var bufView = new Uint8Array(buf);
                        for (var i = 0 , strLen = str.length ; i<strLen ; i++) {
                            bufView[i] = str.charCodeAt(i);
                        }
                        return buf;
                    }

                    var resType = parameter.extensions["Open3DGC-compression"].compressedData.mode == "ascii" ? "text" : "arraybuffer";

                    if (resType === "text") {
                        var bstream = new o3dgc.BinaryStream(str2ab(arrayBuffer));
                        var size = arrayBuffer.length;
                    }
                    else{
                        var bstream = new o3dgc.BinaryStream(arrayBuffer);
                        var size = arrayBuffer.byteLength;
                    }

                    var decoder = new o3dgc.DynamicVectorDecoder();
                    var dynamicVector = new o3dgc.DynamicVector();
                    var timer = new o3dgc.Timer();
                    timer.Tic();
                    decoder.DecodeHeader(dynamicVector, bstream);
                    timer.Toc();
                    console.log("DecodeHeader time (ms) " + timer.GetElapsedTime());
                    // allocate memory
                    if (dynamicVector.GetNVector() > 0 && dynamicVector.GetDimVector()) {
                        dynamicVector.SetVectors(new Float32Array(dynamicVector.GetNVector() * dynamicVector.GetDimVector()));
                        dynamicVector.SetMinArray(new Float32Array(dynamicVector.GetDimVector()));
                        dynamicVector.SetMaxArray(new Float32Array(dynamicVector.GetDimVector()));
                        dynamicVector.SetStride(dynamicVector.GetDimVector());
                    }
                    console.log("Dynamic vector info:"+parameter.id);
                    console.log("\t# vectors   " + dynamicVector.GetNVector());
                    console.log("\tdim         " + dynamicVector.GetDimVector());
                    // decode DV
                    timer.Tic();
                    decoder.DecodePlayload(dynamicVector, bstream);
                    timer.Toc();
                    console.log("DecodePlayload time " + timer.GetElapsedTime() + " ms, " + size + " bytes (" + (8.0 * size / dynamicVector.GetNVector()) + " bpv)");

                    return dynamicVector.GetVectors();
                }
            },

            convert: function (source, resource, ctx) {
                var parameter = ctx;
                if (parameter.extensions) {
                    var extensions = parameter.extensions;
                    var compression = extensions["Open3DGC-compression"];
                    if (compression) {
                        var compressionData = compression["compressedData"];
                        if (compressionData) {
                            return this.decode(resource, ctx);
                        }
                    }
                }

                return new Float32Array(resource);
            },

            resourceAvailable: function (convertedResource, ctx) {
            }
        }
    },

    getParameterArray: {
        value: function(parameter, resourceManager) {
            if (parameter.extensions) {
                var extensions = parameter.extensions;
                var compression = extensions["Open3DGC-compression"];
                if (compression) {
                    var compressionData = compression["compressedData"];
                    if (compressionData) {
                        return resourceManager.getResource(compressionData, this.parameterDelegate, parameter);
                    }
                }
            }
            return resourceManager.getResource(parameter, this.parameterDelegate, parameter);
        }
    },

    //This is not definitive... it's like this just for early testing
    updateTargetsAtTime: {
        value: function(time, resourceManager) {

            var inputParameter = this.sampler.input;
            var outputParameter = this.sampler.output;
            var inputArray = this.getParameterArray(inputParameter, resourceManager);
            var outputArray = this.getParameterArray(outputParameter, resourceManager);
            if (inputArray && outputArray) {
                time /= 1000;
                var count = inputParameter.count;

                this.endTime = inputArray[count - 1];
                this.startTime = inputArray[0];

                var lastKeyIndex = 0;
                var i;
                var keyIndex = 0;
                var ratio = 0;
                var timeDelta = 0;
                var found = false;

                var allBefore = true;
                var allAfter = true;
                if (count > 0) {
                    if (time < this.startTime) {
                        ratio = 0;
                        lastKeyIndex = 0;
                    } else if (time >= this.endTime) {
                        ratio = 1;
                        lastKeyIndex = count - 2;
                    } else {
                        for (i = lastKeyIndex ; i < count - 1 ; i++) {
                            if ((inputArray[i] <= time) && (time < inputArray[i+1])) {
                                lastKeyIndex = i;
                                timeDelta = inputArray[i+1] - inputArray[i];
                                ratio = (time - inputArray[i]) / timeDelta;
                                break;
                            }
                        }
                    }

                    if (this.__vec4 == null) {
                        this.__vec4 = vec4.create();
                    }
                    if (this.__vec3 == null) {
                        this.__vec3 = vec3.create();
                    }
                    if (this.__vec2 == null) {
                        this.__vec2 = vec2.create();
                    }

                    var interpolatedValue = null;
                    switch (outputParameter.componentsPerAttribute) {
                        case 4 :
                            interpolatedValue = this.__vec4;
                            break;
                        case 3 :
                            interpolatedValue = this.__vec3;
                            break;
                        case 2 :
                            interpolatedValue = this.__vec2;
                            break;
                        case 1 :
                            console.log("float interpolation not handled yet");
                            break;
                        default:
                            break;
                    }

                    this.index = lastKeyIndex;

                    var idx1 = lastKeyIndex * outputParameter.componentsPerAttribute;
                    var idx2 = idx1 + outputParameter.componentsPerAttribute;

                    var path = this.path;
                    if (path === "rotation") {
                        //HACK: for now just handle rotation and convert as orientation
                        path = "orientation";

                        var AXIS_ANGLE_INTERP = 0;
                        var AXIS_ANGLE_INTERP_NAIVE = 1;
                        var QUATERNION = 2;

                        var interpolationType = QUATERNION;//AXIS_ANGLE_INTERP_NAIVE;

                        if (interpolationType == AXIS_ANGLE_INTERP) {
                            var axisAngle1 = vec4.createFrom(outputArray[idx1 + 0],outputArray[idx1 + 1],outputArray[idx1 + 2],outputArray[idx1 + 3]);
                            var axisAngle2 = vec4.createFrom(outputArray[idx2 + 0],outputArray[idx2 + 1],outputArray[idx2 + 2],outputArray[idx2 + 3]);

                            vec3.normalize(axisAngle1); //FIXME: do that upfront
                            vec3.normalize(axisAngle2);
                            //get the rotation axis from the cross product
                            var rotAxis = vec3.create();
                            vec3.cross(axisAngle1, axisAngle2, rotAxis);

                            var lA1 = Math.sqrt(vec3.dot(axisAngle1,axisAngle1));
                            var lA2 = Math.sqrt(vec3.dot(axisAngle2,axisAngle2));
                            //var rotAxis = vec3.createFrom(Bx,By,Bz);
                            //vec3.normalize(rotAxis);

                            //now the rotation angle
                            var angle = Math.acos(vec3.dot(axisAngle1,axisAngle2));
                            var axisAngleRotMat = mat4.identity();
                            mat4.rotate(axisAngleRotMat, angle * ratio, rotAxis);

                            mat4.multiplyVec3(axisAngleRotMat, axisAngle1, rotAxis);
                            vec3.normalize(rotAxis);

                            var interpolatedAngle = axisAngle1[3]+((axisAngle2[3]-axisAngle1[3]) * ratio);
                            quat4.fromAngleAxis(interpolatedAngle, rotAxis, interpolatedValue);
                        } else if (interpolationType == AXIS_ANGLE_INTERP_NAIVE) {
                            var axisAngle1 = vec4.createFrom(outputArray[idx1 + 0],outputArray[idx1 + 1],outputArray[idx1 + 2],outputArray[idx1 + 3]);
                            var axisAngle2 = vec4.createFrom(outputArray[idx2 + 0],outputArray[idx2 + 1],outputArray[idx2 + 2],outputArray[idx2 + 3]);

                            //direct linear interpolation of components, to be considered for small angles
                            for (i = 0 ; i < interpolatedValue.length ; i++) {
                                var v1 = axisAngle1[ i];
                                var v2 = axisAngle2[ i];
                                axisAngle2[i] = v1 + ((v2 - v1) * ratio);
                            }
                            quat4.fromAngleAxis(axisAngle2[3], axisAngle2, interpolatedValue);
                        } else if (interpolationType == QUATERNION) {

                            if (this._quats == null) {
                                this._quats = [];

                                this._quats.push(quat4.create());
                                this._quats.push(quat4.create());
                            }

                            if (this._vecs == null) {
                                this._vecs = [];

                                this._vecs.push(vec3.create());
                                this._vecs.push(vec3.create());
                            }

                            this._vecs[0][0] = outputArray[idx1 + 0];
                            this._vecs[0][1] = outputArray[idx1 + 1];
                            this._vecs[0][2] = outputArray[idx1 + 2];

                            this._vecs[1][0] = outputArray[idx2 + 0];
                            this._vecs[1][1] = outputArray[idx2 + 1];
                            this._vecs[1][2] = outputArray[idx2 + 2];

                            var k1 = this._quats[0];
                            var k2 = this._quats[1];

                            quat4.fromAngleAxis(outputArray[idx1 + 3],
                                this._vecs[0], k1);
                            quat4.fromAngleAxis(outputArray[idx2 + 3],
                                this._vecs[1], k2);
                            quat4.slerp(k1, k2, ratio, interpolatedValue);
                        }

                    } else {
                        for (i = 0 ; i < interpolatedValue.length ; i++) {
                            var v1 = outputArray[idx1 + i];
                            var v2 = outputArray[idx2 + i];
                            interpolatedValue[i] = v1 + ((v2 - v1) * ratio);
                        }
                    }
                    this.target.transform[path] = interpolatedValue;
                }
            }
        }
    },

    initWithDescription: {
        value: function(description) {
            this.init();
            this.index = 0;
            this.target = description.target; //this will be overriden with the object

            return this;
        }
    },

    init: {
        value: function() {
            this.__Base_init();
            return this;
        }
    }

});

var Sampler = Object.create(Base, {

    _input: { value: null, writable: true },

    input: {
        get: function() {
            return this._input;
        },
        set: function(value ) {
            this._input = value;
        }
    },

    _output: { value: null, writable: true },

    output: {
        get: function() {
            return this._output;
        },
        set: function(value ) {
            this._output = value;
        }
    },

    initWithDescription: {
        value: function(description) {
            this.init();

            return this;
        }
    },

    init: {
        value: function() {
            this.__Base_init();
            return this;
        }
    }
});

//FIXME: refactor some common methods of Basic Animation and KeyFrame Animation
var Animation = exports.Animation = Object.create(Object.prototype, {

    KEYFRAME: { value: "KEYFRAME", writable: true },

    BASIC: { value: "BASIC", writable: true },

    _type: { value: null, writable: true },

    type: {
        set: function(value) {
            this._type = value;
        }, get: function() {
            return this._type;
        }
    },

    _delegate: { value: null, writable: true },

    delegate: {
        set: function(value) {
            this._delegate = value;
        }, get: function() {
            return this._delegate;
        }
    }

});

function TransformInterpolator(from, to, step)
{
    var result = Object.create(Transform).init();
    from.interpolateToTransform(to, step, result);
    return result;
}


function NumberInterpolator(from, to, step)
{
    //FIXME: the timing function should not be hardcoded, but for the current demos we just need ease out
    return from + ((to - from) * step);
}

//add the moment, system based.
exports.BasicAnimation = Object.create(Animation, {

    _startTime: { value: 0, writable: true },

    _from: { value: null, writable: true },

    _to: { value: null, writable: true },

    _duration: { value: 0, writable: true },

    path: { value: null, writable: true },

    target: { value: null, writable: true },

    _interpolator: { value: null, writable: true },

    extras : { value: null, writable: true },

    _timingFunction: { value: null, writable: true },

    _bezier: { value: null, writable: true },

    timingFunction: {
        set: function(value) {
            this._timingFunction = value;
        },
        get: function() {
            return this._timingFunction || "ease";
        }
    },

    _inferInterpolatorFromValue: {
        value: function(value) {
            //is number

            if (! isNaN (value-0) && value != null) {
                return NumberInterpolator;
            } else if (value instanceof Object) {
                return TransformInterpolator;
            }
            return nil;
        }
    },

    to: {
        set: function(value) {
            this._interpolator = this._inferInterpolatorFromValue(value);
            this._to = value;
        }, get: function() {
            return this._to;
        }
    },

    from: {
        set: function(value) {
            this._from = value;
        }, get: function() {
            return this._from;
        }
    },

    duration: {
        set: function(value) {
            this._duration = value;
        }, get: function() {
            return this._duration;
        }
    },

    _evaluateAtTime: {
        value: function(time) {
            var step = (time - this._startTime) / this.duration;
            if (step > 1)
                step = 1;
            if (step < 0)
                step = 0;
            if (this._bezier == null) {
                var easingFunction = easingFunctions[this.timingFunction] || "ease";
                this._bezier = new KeySpline(easingFunction);
            }

            step = this._bezier.get(step);
            var value = this._interpolator(this._from, this._to, step);
            if (this.target) {
                if (this.path) {
                    this.target[this.path] = value;
                    this.delegate.animationDidUpdate(this);
                }
            }
        }
    },

    animationWasAddedToTarget: {
        value: function(target) {
            this._startTime = Date.now();
        }
    },

    animationWasRemovedFromTarget: {
        value: function(target) {
            this._startTime = 0;
        }
    },

    init: {
        value: function() {
            this.type = Animation.BASIC;
            this.extras = {};
            return this;
        }
    }

});

exports.KeyframeAnimation = Object.create(Animation, {

    _count: { value: 0, writable: true },

    _parameters: { value: null, writable: true },

    _channels: { value: null, writable: true },

    _samplers: { value: null, writable: true },

    _startTime: { value: 0, writable: true },

    _endTime: { value: -1, writable: true },

    channels: {
        get: function() {
            return this._channels;
        },
        set: function(value ) {
            this._channels = value;
        }
    },

    samplers: {
        get: function() {
            return this._samplers;
        },
        set: function(value ) {
            this._samplers = value;
        }
    },

    parameters: {
        get: function() {
            return this._parameters;
        },
        set: function(value ) {
            this._parameters = value;
        }
    },

    count: {
        get: function() {
            return this._count;
        },
        set: function(value ) {
            this._count = value;
        }
    },

    startTime: {
        get: function() {
            if (this.channels) {
                if (this.channels.length > 0) {
                    var startTime = this.channels[0].startTime;
                    for (var i = 1 ; i < this.channels.length ; i++ ) {
                        if (this.channels[i].startTime < startTime) {
                            startTime = this.channels[i].startTime;
                        }
                    }
                    return startTime;
                }
                return 0;
            }
        }
    },

    endTime: {
        get: function() {
            if (this.channels) {
                if (this.channels.length > 0) {
                    var endTime = this.channels[0].endTime;
                    for (var i = 1 ; i < this.channels.length ; i++ ) {
                        if (this.channels[i].endTime > endTime) {
                            endTime = this.channels[i].endTime;
                        }
                    }
                    return endTime;
                }
                return -1;
            }
        }
    },

    updateTargetsAtTime: {
        value: function(time, resourceManager) {
            this.channels.forEach( function(channel) {
                channel.updateTargetsAtTime(time, resourceManager);
            }, this);
        }
    },

    initWithDescription: {
        value: function(description) {
            this.init();

            this.count = description.count;

            var parameters = {};
            Object.keys(description.samplers).forEach( function(samplerID) {
                var samplerDescription = description.samplers[samplerID];
                var sampler = Object.create(Sampler).initWithDescription(samplerDescription);
                this.samplers[samplerID] = sampler;
            }, this);

            description.channels.forEach( function(channelDescription) {
                var animationChannel = Object.create(Channel).initWithDescription(channelDescription);

                animationChannel.sampler = this.samplers[channelDescription.sampler];
                animationChannel.target = channelDescription.target;

                this.channels.push(animationChannel);
            }, this);

            return this;
        }
    },

    init: {
        value: function() {
            this.channels = [];
            this.samplers = {};
            this.type = Animation.KEYFRAME;
            return this;
        }
    }
});

