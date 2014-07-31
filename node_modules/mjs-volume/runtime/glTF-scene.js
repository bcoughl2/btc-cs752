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

var Montage = require("montage").Montage;
var glTFNode = require("runtime/glTF-node").glTFNode;

exports.glTFScene = Montage.specialize( {

    constructor: {
        value: function glTFScene() {
            this.super();
        }
    },

    _rootNode: { value : null, writable: true },

    rootNode: {
        get: function() {
            return this._rootNode;
        },
        set: function(value) {
            this._rootNode = value;
        }
    },

    _id: { value: null, writable: true },

    id: {
        get: function() {
            return this._id;
        },
        set: function(value) {
            this._id = value;
        }
    },

    baseURL: { value: null, writable:true },

    _animationManager: { value: null, writable: true },

    animationManager: {
        get: function() {
            return this._animationManager;
        },
        set: function(value) {
            this._animationManager = value;
        }
    },

    init: {
        value: function() {
            this.rootNode = Object.create(glTFNode);
            this.rootNode.initWithID();
            return this;
        }
    },

    startTime: {
        get: function() {
            var startTime = 0;
            if (this.animationManager) {
                return this.animationManager.startTime;
            }
            return startTime;
        }
    },

    endTime: {
        get: function() {
            var endTime = -1;
            if (this.animationManager) {
                return this.animationManager.endTime;
            }
            return endTime;
        }
    },

    _name: {
        value: null,
        writable: true
    },

    name: {
        enumerable: true,
        get: function() {
            return this._name;
        },
        set: function(value) {
            this._name = value;
        }
    }
});
