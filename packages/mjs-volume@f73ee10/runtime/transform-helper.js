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

var TransformHelper = exports.TransformHelper = Object.create(Object.prototype, {

    _viewMatrix: { value: null, writable: true },

    _worldViewMatrix: { value: null, writable: true },

    _worldViewInverseTransposeMatrix: { value: null, writable: true },

    _worldViewInverseMatrix: { value: null, writable: true },

    _dirty: { value: true, writable: true },

    _id: { value: 0, writable: true },

    //node observer for the viewPoint.transform and node.transform
    transformWillChange: {
        value: function(node, prev, transform) {
            this._dirty = true;
        }
    },

    transformDidChange: {
        value: function(node) {
        }
    },

    _node: { value: null, writable: true },

    node: {
        set: function(value) {
            if (this._node != value) {
                if (this._node) {
                    this._node.transform.removeObserver(this);
                }
                this._node = value;
                if (this._node) {
                    this._node.transform.addObserver(this);
                }
                this._dirty = true;
            }
        },
        get: function() {
            return this._node;
        }
    },

    _viewMatrix: { value: null, writable: true },

    viewMatrix: {
        set: function(value) {
            this._viewMatrix = value;
            this._dirty = true;
        },
        get: function() {
            return this._viewMatrix;
        }
    },

    transformDidUpdate: {
        value: function(transform) {
            this._dirty = true;
        }
    },

    updateMatricesIfNeeded: {
        value: function() {
            if (this._dirty) {
                mat4.multiply(this._viewMatrix, this._node.worldMatrix, this._worldViewMatrix);
                mat4.toInverseMat3(this._worldViewMatrix, this._worldViewInverseTransposeMatrix);
                mat3.transpose(this._worldViewInverseTransposeMatrix);
                mat4.inverse(this._worldViewMatrix, this._worldViewInverseMatrix);
                this._dirty = false;
            }
        }
    },

    worldViewMatrix: {
        get: function() {
            if (this._dirty) { //add this non-strictly necessary test to potentially prevent a function call
                this.updateMatricesIfNeeded();
            }
            return this._worldViewMatrix;
        }
    },

    worldViewInverseTransposeMatrix: {
        get: function() {
            if (this._dirty) { //add this non-strictly necessary test to potentially prevent a function call
                this.updateMatricesIfNeeded();
            }
            return this._worldViewInverseTransposeMatrix;
        }
    },

   worldViewInverseMatrix: {
        get: function() {
            if (this._dirty) { //add this non-strictly necessary test to potentially prevent a function call
                this.updateMatricesIfNeeded();
            }
            return this._worldViewInverseMatrix;
        }
    },

    init: {
        value: function() {
            this._viewMatrix = mat4.identity();
            this._worldViewMatrix = mat4.identity();
            this._worldViewInverseTransposeMatrix = mat3.identity();
            this._worldViewInverseMatrix = mat4.identity();
            return this;
        }
    }

});
