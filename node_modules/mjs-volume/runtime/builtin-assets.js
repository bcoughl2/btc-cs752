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

var Q = require("q");
var RuntimeTFLoader = require("runtime/runtime-tf-loader").RuntimeTFLoader;

exports.BuiltInAssets = Object.create(Object.prototype, {

    _deferredForName: { value: {}, writable: true },

    _assetInfos: { value: {}, writable: true },

    registerBuiltinAssetsIfNeeded: {
        value: function() {
            var pickingLocation = require.location + "assets/picking/picking.json";
            var gradientLocation = require.location + "assets/gradient/gradient.json";

            this._assetInfos["pickingTechnique"] = { "location" : pickingLocation, "options" : {"ids": ["pickingTechnique"]} };
            this._assetInfos["gradient"] = { "location" : gradientLocation };
        }
    },

    assetInfosForName: {
        value: function(name) {
            this.registerBuiltinAssetsIfNeeded();
            return this._assetInfos[name];
        }
    },

    assetWithName: {
        value: function(assetName, options) {
            var deferred = this._deferredForName[assetName];
            if (!deferred) {
                deferred = Q.defer();
                this._deferredForName[assetName] = deferred;
                var readerDelegate = {};
                readerDelegate.loadCompleted = function (asset) {
                    deferred.resolve(asset);
                }.bind(this);

                var loader = Object.create(RuntimeTFLoader);
                var assetInfos = this.assetInfosForName(assetName);
                if (!assetInfos) {
                    deferred.reject("ERROR:"+assetName+" isn't registered as a built-in asset");
                } else {
                    loader.initWithPath(assetInfos.location);
                    loader.delegate = readerDelegate;
                    loader.load(null, assetInfos.options);
                }
            }

            return deferred.promise;
        }
    }

});
