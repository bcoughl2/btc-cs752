// Copyright (c) 2013, Fabrice ROBINET
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
var KeyframeAnimation = require("runtime/animation").KeyframeAnimation;
var BasicAnimation = require("runtime/animation").BasicAnimation;
var Animation = require("runtime/animation").Animation;

exports.AnimationManager = Object.create(Base, {

    startTime: {
        get: function() {
            if (this.animations) {
                if (this.animations.length > 0) {
                    var startTime = this.animations[0].startTime;
                    for (var i = 1 ; i < this.animations.length ; i++ ) {
                        if (this.animations[i].startTime < startTime) {
                            startTime = this.animations[i].startTime;
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
            if (this.animations) {
                if (this.animations.length > 0) {
                    var endTime = this.animations[0].endTime;
                    for (var i = 1 ; i < this.animations.length ; i++ ) {
                        if (this.animations[i].endTime > endTime) {
                            endTime = this.animations[i].endTime;
                        }
                    }
                    return endTime;
                }
                return -1;
            }
        }
    },

    _animations: { value: null, writable: true },

    animations: {
        get: function() {
            return this._animations;
        },
        set: function(value) {
            if (this._animations != value) {
                this._animations = value;
            }
        }
    },

    _sceneTime: { value: 0, writable: true },

    sceneTime: {
        get: function() {
            return this._sceneTime;
        },
        set: function(value) {
            if (this._delegate) {
                if (this._delegate.sceneTimeWillChange) {
                    this._delegate.sceneTimeWillChange(this, value);
                }
            }
            this._sceneTime = value;
            if (this._delegate) {
                if (this._delegate.sceneTimeDidChange) {
                    this._delegate.sceneTimeDidChange(this);
                }
            }
        }
    },

    _delegate: { value: 0, writable: true },

    delegate: {
        get: function() {
            return this._delegate;
        },
        set: function(value) {
            this._delegate = value;
        }
    },

    targets: {
        get: function() {
            var targets = [];
            if (this._animations != null) {
                this._animations.forEach(function(animation) {
                    if (animation.type == Animation.KEYFRAME) {
                        animation.channels.forEach(function(channel) {
                            targets.push(channel.target.id);
                        }, this);
                    } else {
                        if (animation.type == Animation.BASIC) {
                        }
                    }

                }, this);
            }
            return targets;
        }
    },

    hasAnimation: {
        value: function(targetUID, targets) {
            //it is a forEach, because eventually we will return all the animations for a given target.
            var animated = false;
            if (this._animations == null)
                return false;
            if (targets == null)
                targets = this.targets;

            return targets.indexOf(targetUID) !== -1;
        }
    },

    nodeHasAnimatedAncestor: {
        value: function(node) {
            do {
                if (this.hasAnimation(node.id)) {
                    return true;
                }
                node = node.parent;
            } while (node != null);
            return false;
        }
    },

    //will be deprecated
    updateTargetsAtTime: {
        value: function(time, resourceManager) {
            if (this.animations) {
                this.animations.forEach( function(animation) {
                    //FIXME: unify this - could just use a method called evaluate
                    if (animation.type == Animation.KEYFRAME) {
                        animation.updateTargetsAtTime(time, resourceManager);
                    } else if (animation.type == Animation.BASIC) {
                        //animation._evaluateAtTime(time);
                    }
                }, this);
            }
        }
    },

    evaluateAtTime: {
        value: function(time, resourceManager) {
            if (this._activeAnimations) {

                this._activeAnimations.forEach( function(animation) {
                    //FIXME: unify this - could just use a method called evaluate
                    if (animation.type == Animation.KEYFRAME) {
                        //animation.updateTargetsAtTime(time, resourceManager);
                    } else if (animation.type == Animation.BASIC) {
                        animation._evaluateAtTime(time);
                    }
                }, this);
            }
        }
    },

    hasActiveAnimations: {
        value: function() {
            return this._activeAnimations.length > 0;
        }
    },

    _activeAnimations: { value: 0 , writable: true },

    _removeAnimationAtIndex: {
        value: function(index) {
            var animation = this._activeAnimations[index];
            //animation._evaluateAtTime(Date.now());
            if (animation.delegate) {
                animation.delegate.animationDidStop(animation);
            }
            this._activeAnimations.splice(index, 1);
        }
    },

    playAnimation: {
        value: function(animation) {
            var self = this;
            this._activeAnimations.push(animation);
            if (animation.delegate)
                animation.delegate.animationDidStart(animation);
            setTimeout(function() {
                //animation may have been removed
                var index = self._activeAnimations.indexOf(animation);
                if (index !== -1) {
                    self._removeAnimationAtIndex(index);
                }
            }, animation.duration);
        }
    },

    init: {
        value: function() {
            this.__Base_init();
            this.animations = [];
            this._activeAnimations = [];
            return this;
        }
    },

    removeAnimationWithTargetAndPath: {
        value: function(target, path) {
            if (this._activeAnimations) {
                for (var i = 0 ; i < this._activeAnimations.length ; i++) {
                    var animation = this._activeAnimations[i];
                    if ((animation.target === target) && (animation.path == path)) {
                        this._removeAnimationAtIndex(i);
                        return;
                    }
                }
            }
        }
    }

});
