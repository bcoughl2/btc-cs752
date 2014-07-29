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
var Component3D = require("runtime/component-3d").Component3D;
var BasicAnimation = require("runtime/animation").BasicAnimation;

exports.Material = Component3D.specialize( {

    constructor: {
        value: function Material() {
            this.super();

            this.addRangeAtPathChangeListener("filterColor", this, "handleFilterColorChange");
            this.addRangeAtPathChangeListener("emission", this, "handleEmissionChange");
            this.addOwnPropertyChangeListener("glTFElement", this);
            this.addOwnPropertyChangeListener("image", this);
            this.addOwnPropertyChangeListener("opacity", this);
        }
    },

    filterColor: { value: [1,1,1,1]},

    emission: { value: [0,0,0,0]},

    _originalOpacity: { value: 1, writable: true },

    handleGlTFElementChange: {
        value: function() {
            this.handleFilterColorChange();
            this.handleEmissionChange();
            this.handleImageChange();

            this._originalOpacity = this._opacity;
            if (this._opacity == null) {
                if (this.glTFElement.parameters["transparency"] != null) {
                    this._originalOpacity = this._opacity = this.glTFElement.parameters["transparency"].value;
                }
            } else {
                this.handleOpacityChange();
            }
        }
    },

    initialValueForStyleableProperty: {
        value: function(property) {
            if (property == "opacity") {
                return this._originalOpacity;
            }
        }
    },

    handleFilterColorChange: {
        value: function(plus, minus, index) {
            if (this.glTFElement != null) {
                if (this.glTFElement.parameters["filterColor"]) {
                    this.glTFElement.parameters["filterColor"].value = this.filterColor;
                    if (this.scene) {
                        this.scene.dispatchEventNamed("materialUpdate", true, false, this);
                    }
                }
            }
        }
    },

    handleEmissionChange: {
        value: function(plus, minus, index) {
            if (this.glTFElement != null) {
                if (this.glTFElement.parameters["emission"]) {
                    this.glTFElement.parameters["emission"].value = this.emission;
                    if (this.scene) {
                        this.scene.dispatchEventNamed("materialUpdate", true, false, this);
                    }
                }
            }
        }
    },


    handleOpacityChange: {
        value: function() {
            if (this.glTFElement != null) {
                if (this.glTFElement.parameters["transparency"]) {
                    this.glTFElement.parameters["transparency"].value = this._opacity;
                    if (this.scene) {
                        this.scene.dispatchEventNamed("materialUpdate", true, false, this);
                    }
                }
            }
        }
    },

    handleImageChange: {
        value: function() {
            if (this.glTFElement != null) {
                if (this.glTFElement.parameters["diffuse"]) {
                    if (this._image) {
                        var imagePath = this.resolvePathIfNeeded(this._image);
                        var parameterValue = this.parameterForImagePath(imagePath);
                        this.glTFElement.parameters["diffuse"] = parameterValue;
                        if (this.scene) {
                            this.scene.dispatchEventNamed("textureUpdate", true, false, parameterValue);
                        }
                    }
                }
            }
        }
    },

    parameterForImagePath: {
        value: function(imagePath) {

            var sampler = {
                "magFilter": WebGLRenderingContext.LINEAR,
                "minFilter": WebGLRenderingContext.LINEAR,
                "type": "sampler",
                "wrapS" : WebGLRenderingContext.REPEAT,
                "wrapT" : WebGLRenderingContext.REPEAT
            };

            var source = {
                "id" : "source-"+ imagePath,
                "type" : "image",
                "baseId" : "source-"+ imagePath,
                "description" : {
                    "path" : imagePath
                }
            };

            var parameterValue = {
                "baseId": "texture-" + imagePath,
                "id": "texture-" + imagePath,
                "format": WebGLRenderingContext.RGBA,
                "internalFormat" : WebGLRenderingContext.RGBA,
                "sampler" : sampler,
                "source" : source,
                "type" : "texture",
                "target" : WebGLRenderingContext.TEXTURE_2D
            };

            var parameter = {
                "parameter": "diffuse",
                "value" : parameterValue
            };

            return parameter;
        }
    },

    _image: { value: null , writable:true },

    image: {
        set: function(value) {
            if (value) {
                //FIXME: remove this when we initialized property image with the path in place when the glTFElement comes up
                if (value.length == 0) {
                    return;
                }
            } else {
                return;
            }

            var lowerCaseImage = value.toLowerCase();
            if ((lowerCaseImage.indexOf(".jpg") != -1) || (lowerCaseImage.indexOf(".jpeg") != -1) || (lowerCaseImage.indexOf(".png") != -1)) {
                if (this._image != value) {
                    this._image = value;
                }
            }
        },
        get: function() {
            return this._image;
        }
    },

    _opacity: { value: null, writable:true },

    animationDidStart: {
        value: function(animation) {
        }
    },

    animationDidStop: {
        value: function(animation) {
        }
    },

    animationDidUpdate: {
        value: function(animation) {
        }
    },

    opacity_animationSetter: {
        set: function(value) {
            if (this._opacity != value) {
                this._opacity = value;
                this.handleOpacityChange();
            }
        }
    },

    opacity: {
        set: function(value) {
            if (this._opacity != value) {
                //remove animation if any
                if (this.glTFElement) {
                    var animationManager = this.scene.glTFElement.animationManager;
                    animationManager.removeAnimationWithTargetAndPath(this, "opacity_animationSetter");
                    if (this._style) {
                        if (this._style.transitions) {
                            var transition = this._style.transitions["opacity"];
                            if (transition != null) {
                                if (transition.duration > 0) {
                                    var  opacityAnimation = Object.create(BasicAnimation).init();
                                    opacityAnimation.path = "opacity_animationSetter";
                                    opacityAnimation.target = this;
                                    opacityAnimation.delegate = this;
                                    opacityAnimation.from = Number(this._opacity);
                                    opacityAnimation.to = Number(value);
                                    opacityAnimation.duration = transition.duration * 1000;
                                    animationManager.playAnimation(opacityAnimation);
                                    opacityAnimation.animationWasAddedToTarget();
                                    animationManager.evaluateAtTime(Date.now());
                                    return;
                                }
                            }
                        }
                    }
                }

                this._opacity = value;
            }
        },
        get: function() {
            return this._opacity;
        }
    },

    _stylableProperties: { value: ["opacity"]},

    styleableProperties: {
        get: function() {
            return this._stylableProperties;
        }
    }

});
