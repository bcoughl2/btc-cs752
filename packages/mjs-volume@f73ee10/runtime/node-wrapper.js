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

require("runtime/dependencies/gl-matrix");
var Utilities = require("runtime/utilities").Utilities;
var TransformHelper = require("runtime/transform-helper").TransformHelper;

exports.NodeWrapper = Object.create(Object.prototype, {

    _transformHelper: { value: null, writable: true },

    node: {
        get: function() {
            return this._transformHelper.node;
        }
    },

    init: {
        value: function(node) {
            this._transformHelper = Object.create(TransformHelper).init();
            this._transformHelper.node = node;
            return this;
        }
    },

    viewPointWillChange: {
        value: function(node, prev, transform) {
        }
    },

    viewPointDidChange: {
        value: function() {
            this._transformHelper.viewPoint = this._scenePassRenderer.viewPoint;
        }
    },

    viewPointMatrixDidUpdate: {
        value: function() {
            this._transformHelper.transformDidUpdate();
        }
    },

    //-------

    scenePassRenderer: {
        get: function() {
            return this._scenePassRenderer;
        },
        set: function(value) {
            if (this._scenePassRenderer != value) {
                if (this._scenePassRenderer) {
                    this._scenePassRenderer.removeObserver(this)
                }

                this._scenePassRenderer = value;
                this._transformHelper.viewMatrix = value._viewPointMatrix;

                if (this._scenePassRenderer) {
                    this._scenePassRenderer.addObserver(this);
                }
            }
        }
    },

    worldMatrix: {
        get: function() {
            return this.node.worldMatrix;
        }
    },

    worldViewMatrix: {
        get: function() {
            return this._transformHelper.worldViewMatrix;
        }
    },

    viewMatrix: {
        get: function() {
            return this._transformHelper.viewMatrix;
        }
    },

    worldViewInverseMatrix: {
        get: function() {
            return this._transformHelper.worldViewInverseMatrix;
        }
    },

    worldViewInverseTransposeMatrix: {
        get: function() {
            return this._transformHelper.worldViewInverseTransposeMatrix;
        }
    }

});

