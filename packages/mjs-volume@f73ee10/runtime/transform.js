// Copyright (c) Fabrice ROBINET
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
var Utilities = require("runtime/utilities").Utilities;

//FIXME: add decomposition to be able to add getters in TRS
var Transform = exports.Transform = Object.create(Base, {
    _matrix: { value: null, writable: true },

    _dirty: { value: true, writable: true },
    _dirtyTranslation: { value: false, writable: true },
    _dirtyRotation: { value: false, writable: true },
    _dirtyScale: { value: false, writable: true },

    _translation: { value: null, writable: true },
    _orientation: { value: null, writable: true },
    _rotation: { value: null, writable: true },

    _scale: { value: null, writable: true },

    _id: { value: 0, writable: true },

    _AXIS_ANGLE: { value: 1, writable: true },
    _QUATERNION: { value: 2, writable: true },

    _rotationMode: { value : 1, writable: true },

    _fireTransformDidUpdate: {
        value: function(flag) {
            if (this._observers) {
                for (var i = 0 ; i < this._observers.length ; i++) {
                    this._observers[i].transformDidUpdate(this);
                }
            }
        }
    },

    _updateDirtyFlag: {
        value: function(flag) {
            this._dirty = flag;
            this._fireTransformDidUpdate();
        }
    },

    interpolateToTransform: {
        value: function(to, step, destination) {
            this._rebuildAffinesIfNeeded();
            to._rebuildAffinesIfNeeded();

            Utilities.interpolateVec(this._translation, to._translation, step, destination._translation);
            Utilities.interpolateVec(this._scale, to._scale, step, destination._scale);
        
            if (to._rotationMode === Transform._AXIS_ANGLE ) {
                var rotation = vec4.create();

                if (this._rotationMode == Transform._QUATERNION) {
                    this.rotation = vec4.createFrom(to._rotation[0], to._rotation[1], to._rotation[2], -this.rotation[3]);
                }

                Utilities.interpolateVec(this.rotation, to._rotation, step, rotation);
                destination.rotation = rotation;
            } else {
                var orientation = vec4.create();
                quat4.slerp(this.orientation, to.orientation, step, orientation);
                destination.orientation = orientation;
            }
            //FIXME:breaks encapsulation
            destination._updateDirtyFlag(true);
        }
    },

    matrix: {
        get: function() {
            if (this._dirty) {
                if (this._matrix == null) {
                    this._matrix = mat4.create();
                }
                if (this._intermediateMatrices == null) {
                    this._intermediateMatrices = [];

                    this._intermediateMatrices.push(mat4.identity());   //idx: 0 tmp
                    this._intermediateMatrices.push(mat4.identity());   //idx: 1 tr
                    this._intermediateMatrices.push(mat4.identity());   //idx: 2 scale
                    this._intermediateMatrices.push(mat4.identity());   //idx: 3 rotation
                }

                mat4.identity(this._matrix);
                mat4.identity(this._intermediateMatrices[0]);

                //reset all to identity
                mat4.set(this._intermediateMatrices[0], this._intermediateMatrices[1]); //tr
                mat4.set(this._intermediateMatrices[0], this._intermediateMatrices[2]); //scale
                mat4.set(this._intermediateMatrices[0], this._intermediateMatrices[3]); //rotation

                mat4.translate(this._intermediateMatrices[1], this._translation);
                mat4.scale(this._intermediateMatrices[2], this._scale);

                if (this._rotationMode === Transform._AXIS_ANGLE) {
                    mat4.identity(this._intermediateMatrices[3]);
                    mat4.rotate(this._intermediateMatrices[3], this._rotation[3], this._rotation);
                } else {
                    quat4.toMat4(this._orientation, this._intermediateMatrices[3]);
                } 

                mat4.multiply(this._matrix, this._intermediateMatrices[1]);
                mat4.multiply(this._matrix, this._intermediateMatrices[2]);
                mat4.multiply(this._matrix, this._intermediateMatrices[3]);

                //we can be silent about this one (not use this._updateDirtyFlag(false))
                this._dirty = false;
            }

            return this._matrix;
        },
        set: function(value ) {
            if (this._matrix == null) {
                this._matrix = mat4.create();
            }

            mat4.set(value, this._matrix);
            this._updateDirtyFlag(false);
            this._dirtyTranslation = this._dirtyRotation = this._dirtyScale = true;
            this._rotationMode = this._QUATERNION;
        }
    },

    _rebuildAffinesIfNeeded: {
        value: function() {
            if (this._dirtyTranslation || this._dirtyRotation || this._dirtyScale) {
                Utilities.decomposeMat4(this.matrix, this._dirtyTranslation ? this._translation : null, 
                                                     this._dirtyRotation ? this._orientation : null, 
                                                     this._dirtyScale ? this._scale : null);
                
                this._dirtyTranslation = this._dirtyRotation = this._dirtyScale = false;
                if (this._rotationMode == Transform._AXIS_ANGLE)
                    this.rotation = vec4.create(this.rotation);
                else
                    this.orientation = vec4.create(this.orientation);

            }
        }
    },

    translation : {
        set: function(value ) {
            this._translation = value;
            this._dirtyTranslation = false;
            this._updateDirtyFlag(true);
        }, get: function(value) {
            if (this._dirtyTranslation)
                this._rebuildAffinesIfNeeded();
            return this._translation;
        }
    },

    orientation : {
        set: function(value ) {
            this._dirtyRotation = false;
            this._rotationMode = Transform._QUATERNION;
            this._orientation = value;
            this._updateDirtyFlag(true);
        }, get: function(value) {
            if (this._dirtyRotation)    
                this._rebuildAffinesIfNeeded();
            if (this._rotationMode !== Transform._QUATERNION) {
                quat4.fromAngleAxis(this._rotation[3], this._rotation, this._orientation);
            }
            return this._orientation;
        }
    },

    rotation : {
        set: function(value ) {
            this._dirtyRotation = false;
            this._rotationMode = Transform._AXIS_ANGLE;
            this._rotation = value;
            this._updateDirtyFlag(true);
        }, get: function(value) {
            if (this._dirtyRotation)
                this._rebuildAffinesIfNeeded();
            if (this._rotationMode !== Transform._AXIS_ANGLE) {
                quat4.toAngleAxis(this._orientation, this._rotation);
            }
            return this._rotation;
        }
    },

    scale : {
        set: function(value ) {
            this._dirtyScale = false;
            this._scale = value;
            this._updateDirtyFlag(true);
        }, get: function(value) {
            if (this._dirtyScale)   
                this._rebuildAffinesIfNeeded();
            return this._scale;
        }
    },

    _commonInit: {
        value: function() {
            this.translation = vec3.createFrom(0,0,0);
            this.rotation = vec4.createFrom(0,0,0,0);
            this.orientation = vec4.createFrom(0,0,0,0);
            this.scale = vec3.createFrom(1,1,1);
            this.matrix = mat4.identity();
            this._id = Transform.bumpId();
        }
    },

    initWithDescription: {
        value: function(description) {
            this._commonInit();

            if (description.matrix) {
                this.matrix = mat4.create(description.matrix);
            } else if (description.translation || description.rotation || description.scale) {
                this.translation = description.translation ? vec3.create(description.translation) : vec3.createFrom(0,0,0);
                
                if (description.rotation) {
                    this.orientation = quat4.fromAngleAxis(description.rotation[3], vec3.createFrom(description.rotation[0],description.rotation[1],description.rotation[2]))
                } else if (description.orientation) {
                    this.orientation = quat4.create(description.orientation);
                }

                this.scale = description.scale ? vec3.create(description.scale) : vec3.createFrom(1,1,1);
            } else {
                this.matrix = mat4.identity();
            }
            return this;
        }
    },

    init: {
        value: function() {
            this._commonInit();
            return this;
        }
    },

    bumpId: {
        value: function() {
            Transform._id++;
            return Transform._id;
        }
    },

    copy: {
        value: function() {
            var transform = Object.create(Transform).init();

            if (this._translation != null) {
                transform.translation = vec3.create(this._translation);
            }

            if (this._scale != null) {
                transform.scale = vec3.create(this._scale);
            }

            if (this._orientation != null) {
                transform.orientation = quat4.create(this._orientation);
            }

            if (this._rotation != null) {
                transform.rotation = vec4.create(this._rotation);
            }

            transform.matrix = mat4.create(this.matrix);
            return transform;
        }
    },

    _observers: { value: null, writable: true},

    addObserver: {
        value: function(observer) {
            if (this._observers == null) {
                this._observers = [];
            }

            if (this._observers.indexOf(observer) === -1) {
                this._observers.push(observer);
            } else {
                console.log("WARNING attempt to add 2 times the same observer in transform")
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
    }

});
