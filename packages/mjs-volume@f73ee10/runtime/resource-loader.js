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

exports.ResourceLoader = Object.create(Object.prototype, {

    webGLRenderer: { value: null, writable:true},

    delegate: { value: null, writable:true},

    _trackedIds: { value: null, writable:true },

    _addTrackedId: {
        value: function(trackedId) {
            //console.log("add tracked resource:" + trackedId);

            if (this._trackedIds == null) {
                this._trackedIds = {};
            }
//            if (this._trackedIds[trackedId] == null)
//                console.log("add track"+trackedId);
            this._trackedIds[trackedId] = true;
        }
    },

    _removeTrackedId: {
        value: function(trackedId) {
            //console.log("remove track"+trackedId);
            if (this._trackedIds[trackedId] == null) {
                //we are listening to all request so we ignore this for now.
                //console.log("MeshLoader: inconsistency error")
            } else {
                //console.log("loaded:"+trackedId);
                delete this._trackedIds[trackedId];
            }
        }
    }

});
