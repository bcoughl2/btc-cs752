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

require("runtime/dependencies/gl-matrix");

exports.BBox = Object.create(Object.prototype, {

    _dirty: { value: true, writable:true },
    _size: { value: null, writable: true },
    _min: { value: null, writable: true },
    _max: { value: null, writable: true },

    min: {
        get: function() {
            return this._min;
        },
        set: function(value) {
            this._min = value;
            this._dirty = true;
        }
    },

    max: {
        get: function() {
            return this._max;
        },
        set: function(value) {
            this._max = value;
            this._dirty = true;
        }
    },

    init: {
        value:function(min, max) {
            this.min = min;
            this.max = max;
            return this;
        }
    },

    size: {
        get: function() {
            if (this._dirty) {
                var min = this.min;
                var max = this.max;
                this._size = [
                    (max[0] - min[0]) ,
                    (max[1] - min[1]) ,
                    (max[2] - min[2])];
                this._dirty = false;
            }
            return this._size;
        }
    },

    computeScaleFactor: {
        value: function() {
            var size = this.size;
            //size to fit
            var scaleFactor = size[0] > size[1] ? size[0] : size[1];
            scaleFactor = size[2] > scaleFactor ? size[2] : scaleFactor;
            scaleFactor =  1. / scaleFactor;
            return scaleFactor;
        }
    },

    computeUnitMatrix: {
        value: function(offset) {
            var size = this.size;
            var min = this.min;
            if (offset == null)
                offset = [0, 0, 0];
            //size to fit
            var scaleFactor = this.computeScaleFactor();
            var scaleMatrix = mat4.scale(mat4.identity(), [scaleFactor, scaleFactor, scaleFactor]);
            var translationVector = vec3.createFrom(
                offset[0] -((size[0] / 2) + min[0]),
                offset[1] -((size[1] / 2) + min[1]),
                offset[2] -((size[2] / 2) + min[2]));
            var translation = mat4.translate(scaleMatrix, [
                translationVector[0],
                translationVector[1],
                translationVector[2]]);
            return translation;
        }
    }
});


exports.Utilities = Object.create(Object.prototype, {

    vec3Min: {
        value: function(min, aVec) {
            if (aVec[0] < min[0]) {
                min[0] = aVec[0];
            }
            if (aVec[1] < min[1]) {
                min[1] = aVec[1];
            }
            if (aVec[2] < min[2]) {
                min[2] = aVec[2];
            }
        }
    },

    vec3Max: {
        value: function(max, aVec) {
            if (aVec[0] > max[0]) {
                max[0] = aVec[0];
            }
            if (aVec[1] > max[1]) {
                max[1] = aVec[1];
            }
            if (aVec[2] > max[2]) {
                max[2] = aVec[2];
            }
        }
    },

    mergeBBox: {
        value: function(boxa, boxb) {

            var minBoxA = boxa[0];
            var maxBoxA = boxa[1];
            var minBoxB = boxb[0];
            var maxBoxB = boxb[1];

            var min = [ (minBoxA[0] < minBoxB[0]) ? minBoxA[0] : minBoxB[0],
                (minBoxA[1] < minBoxB[1]) ? minBoxA[1] : minBoxB[1],
                (minBoxA[2] < minBoxB[2]) ? minBoxA[2] : minBoxB[2] ];

            var max = [ (maxBoxA[0] > maxBoxB[0]) ? maxBoxA[0] : maxBoxB[0],
                (maxBoxA[1] > maxBoxB[1]) ? maxBoxA[1] : maxBoxB[1],
                (maxBoxA[2] > maxBoxB[2]) ? maxBoxA[2] : maxBoxB[2] ];

            return [min, max];
        }
    },

    computeBBOXFromVec3Array: {
        value: function(vectors) {
            if (vectors.length === 0)
                return null;

            var min = [vectors[0][0], vectors[0][1], vectors[0][2]];
            var max = [vectors[0][0], vectors[0][1], vectors[0][2]];

            for (var i = 0 ; i < 8 ; i++)
            {
                if (vectors[i][0] < min[0])
                    min[0] = vectors[i][0];
                if (vectors[i][1] < min[1])
                    min[1] = vectors[i][1];
                if (vectors[i][2] < min[2])
                    min[2] = vectors[i][2];

                if (vectors[i][0] > max[0])
                    max[0] = vectors[i][0];
                if (vectors[i][1] > max[1])
                    max[1] = vectors[i][1];
                if (vectors[i][2] > max[2])
                    max[2] = vectors[i][2];
            }
            return [min, max];
        }
    },

    transformBBox: {
        value: function(box, transform) {
            var min = box[0];
            var max = box[1];

            var X = 0;
            var Y = 1;
            var Z = 2;

            var pt0 = mat4.multiplyVec3(transform, vec3.createFrom(min[X], min[Y], min[Z]));
            var pt1 = mat4.multiplyVec3(transform, vec3.createFrom(max[X], min[Y], min[Z]));
            var pt2 = mat4.multiplyVec3(transform, vec3.createFrom(min[X], max[Y], min[Z]));
            var pt3 = mat4.multiplyVec3(transform, vec3.createFrom(max[X], max[Y], min[Z]));
            var pt4 = mat4.multiplyVec3(transform, vec3.createFrom(min[X], min[Y], max[Z]));
            var pt5 = mat4.multiplyVec3(transform, vec3.createFrom(max[X], min[Y], max[Z]));
            var pt6 = mat4.multiplyVec3(transform, vec3.createFrom(min[X], max[Y], max[Z]));
            var pt7 = mat4.multiplyVec3(transform, vec3.createFrom(max[X], max[Y], max[Z]));

            return this.computeBBOXFromVec3Array([pt0, pt1, pt2, pt3, pt4, pt5, pt6, pt7]);
        }
    },


    rayIntersectsMesh: {
        value: function(ray, mesh, worldMatrix, results, options) {
            var verticesBuffer = mesh.verticesBuffer;
            if (verticesBuffer === null) {
                return false;
            }
            var hasResults = false;
            var count = mesh.primitives.length;
            var vert0 = vec3.create();
            var vert1 = vec3.create();
            var vert2 = vec3.create();
            for (var i = 0 ; i < count ; i++) {
                var primitive = mesh.primitives[i];

                if (options) {
                    var materials = options.materials;
                    if (materials) {
                        if (materials.indexOf(primitive.material["name"]) == -1) {
                            continue;
                        }
                    }
                }

                if ((primitive.material.inputs.transparency !== null) && (typeof primitive.material.inputs.transparency !== "undefined")) {
                    if (primitive.material.inputs.transparency < 1)
                        continue;
                }

                var bbox = primitive.boundingBox;
                if (!this.intersectsBBOX(bbox, ray))
                    continue;
                return true;
            }
            return hasResults;
        }
    },


    /*
     An Efficient and Robust Ray–Box Intersection Algorithm
     Amy Williams Steve Barrus R. Keith Morley Peter Shirley University of Utah
     Non optimized version
     */
    intersectsBBOX: {
        value: function(bbox, ray) {

            var X = 0;
            var Y = 1;
            var Z = 2;
            var tmin, tmax;
            var tymin, tymax;
            var tzmin, tzmax;

            var direction =  ray[1];
            var origin = ray[0];

            var min = bbox[0];
            var max = bbox[1];

            if (direction[X] >= 0) {
                tmin = (min[X] - origin[X]) / direction[X];
                tmax = (max[X] - origin[X]) / direction[X];
            } else {
                tmin = (max[X] - origin[X]) / direction[X];
                tmax = (min[X] - origin[X]) / direction[X];
            }

            if (direction[Y] >= 0) {
                tymin = (min[Y] - origin[Y]) / direction[Y];
                tymax = (max[Y] - origin[Y]) / direction[Y];
            } else {
                tymin = (max[Y] - origin[Y]) / direction[Y];
                tymax = (min[Y] - origin[Y]) / direction[Y];
            }

            if ( (tmin > tymax) || (tymin > tmax) ) {
                return false;
            }

            if (tymin > tmin)
                tmin = tymin;
            if (tymax < tmax)
                tmax = tymax;

            if (direction[Z] >= 0) {
                tzmin = (min[Z] - origin[Z]) / direction[Z];
                tzmax = (max[Z] - origin[Z]) / direction[Z];
            } else {
                tzmin = (max[Z] - origin[Z]) / direction[Z];
                tzmax = (min[Z] - origin[Z]) / direction[Z];
            }

            if ( (tmin > tzmax) || (tzmin > tmax) ) {
                return false;
            }

            if (tzmin > tmin)
                tmin = tzmin;
            if (tzmax < tmax)
                tmax = tzmax;

            return true;
        }
    },

    inverpolateAxisAngle : {
        value: function(from, to, step, destination) {
            var AXIS_ANGLE_INTERP = 0;
            var AXIS_ANGLE_INTERP_NAIVE = 1;
            var QUATERNION = 2;
            var interpolationType = AXIS_ANGLE_INTERP_NAIVE;
            var axisAngle1 = from;//vec4.createFrom(from[0],from[1],from[2],from[3]);
            var axisAngle2 = to;//vec4.createFrom(to[0],to[1],to[2],to[3]);
            if (interpolationType == AXIS_ANGLE_INTERP) {
                vec3.normalize(axisAngle1); //FIXME: do that upfront
                vec3.normalize(axisAngle2);
                //get the rotation axis from the cross product
                var rotAxis = vec3.create();
                vec3.cross(axisAngle1, axisAngle2, rotAxis);

                var lA1 = Math.sqrt(vec3.dot(axisAngle1,axisAngle1));
                var lA2 = Math.sqrt(vec3.dot(axisAngle2,axisAngle2));

                //now the rotation angle
                var angle = Math.acos(vec3.dot(axisAngle1,axisAngle2));
                var axisAngleRotMat = mat4.identity();
                mat4.rotate(axisAngleRotMat, angle * step, rotAxis);

                mat4.multiplyVec3(axisAngleRotMat, axisAngle1, rotAxis);
                vec3.normalize(rotAxis);

                var interpolatedAngle = axisAngle1[3]+((axisAngle2[3]-axisAngle1[3]) * step);
                quat4.fromAngleAxis(interpolatedAngle, rotAxis, destination);
            } else if (interpolationType == AXIS_ANGLE_INTERP_NAIVE) {
                //direct linear interpolation of components, to be considered for small angles
                for (i = 0 ; i < destination.length ; i++) {
                    var v1 = axisAngle1[i];
                    var v2 = axisAngle2[i];
                    axisAngle2[i] = v1 + ((v2 - v1) * step);
                }
                quat4.fromAngleAxis(axisAngle2[3], axisAngle2, destination);
            } else if (interpolationType == QUATERNION) {
                quat4.slerp(from, to, step, destination);
            }
        }
    },

    //utility to move out of here and be shared with same code in animations
    interpolateVec: {
        value: function(from, to, step, destination) {
            for (i = 0 ; i < destination.length ; i++) {
                var v1 = from[i];
                var v2 = to[i];
                destination[i] = v1 + ((v2 - v1) * step);
            }
        }
    },

    /* Originally from: http://tog.acm.org/resources/GraphicsGems/gemsii/unmatrix.c
     * Simplified version without Shear and Perspective decomposition
     *
     * unmatrix.c - given a 4x4 matrix, decompose it into standard operations.
     *
     * Author:	Spencer W. Thomas
     * 		University of Michigan
     */
    idx: {
        value: function(i, j) {
            return (i * 4) + j;
        }
    },

    decomposeMat4: {
        value: function(matrix, translation, rotation, scale) {
            var i, j;
            var locMat = mat4.create();
            var pmat = mat4.create();
            var invpmat = mat4.create();
            var tinvpmat = mat4.create();
            var rows = [vec3.create(), vec3.create(), vec3.create()];

            mat4.set(matrix, locMat);

            var idx, idx1;
            for (i = 0 ; i < 4 ; i++) {
                for (j = 0 ; j < 4 ; j++) {
                    idx = this.idx(i,j);
                    idx1 = this.idx(3,3);
                    locMat[idx] /= locMat[idx1];
                }
            }
            mat4.set(locMat, pmat);

            for (i = 0; i < 3; i++ ) {
                idx = this.idx(i,3);
                pmat[idx] = 0
            }
            idx = this.idx(3,3);
            pmat[idx] = 1;

            if (locMat[this.idx(0, 3)] != 0 ||
                locMat[this.idx(1, 3)] != 0 ||
                locMat[this.idx(2, 3)] != 0 ) {
                locMat[this.idx(0, 3)] = 0;
                locMat[this.idx(1, 3)] = 0;
                locMat[this.idx(2, 3)] = 0;
                locMat[this.idx(3, 3)] = 1;
            }

            if (translation) {
                translation[0] = locMat[this.idx(3, 0)];
                translation[1] = locMat[this.idx(3, 1)];
                translation[2] = locMat[this.idx(3, 2)];
            }

            locMat[this.idx(3, 0)] = 0;
            locMat[this.idx(3, 1)] = 0;
            locMat[this.idx(3, 2)] = 0;

            /* Now get scale and shear. */
            for ( i = 0 ; i < 3 ; i++ ) {
                rows[i][0] = locMat[this.idx(i, 0)];
                rows[i][1] = locMat[this.idx(i, 1)];
                rows[i][2] = locMat[this.idx(i, 2)];
            }

            if (scale != null) {
                scale[0] = vec3.length(rows[0]);
                scale[1] = vec3.length(rows[1]);
                scale[2] = vec3.length(rows[2]);
            }

            vec3.normalize(rows[0]);
            vec3.normalize(rows[1]);
            vec3.normalize(rows[2]);

            var res = vec3.create();
            vec3.cross(rows[1], rows[2], res);

            if ( vec3.dot(rows[0], res) < 0 ) {
                for ( i = 0; i < 3; i++ ) {
                    if (scale != null)
                        scale[i] *= -1;
                    rows[i][0] *= -1;
                    rows[i][1] *= -1;
                    rows[i][2] *= -1;
                }
            }

            if (rotation != null) {

rotation[0] = 0.5 * Math.sqrt(Math.max(1 + rows[0][0] - rows[1][1] - rows[2][2], 0));
rotation[1] = 0.5 * Math.sqrt(Math.max(1 - rows[0][0] + rows[1][1] - rows[2][2], 0));
rotation[2] = 0.5 * Math.sqrt(Math.max(1 - rows[0][0] - rows[1][1] + rows[2][2], 0));
rotation[3] = 0.5 * Math.sqrt(Math.max(1 + rows[0][0] + rows[1][1] + rows[2][2], 0));

if (rows[2][1] > rows[1][2])
    rotation[0] = -rotation[0]
if (rows[0][2] > rows[2][0])
    rotation[1] = -rotation[1]
if (rows[1][0] > rows[0][1])
    rotation[2] = -rotation[2]

/*
                var amat3 = mat3.create();
                amat3[0] = rows[0][0];
                amat3[1] = rows[1][0];
                amat3[2] = rows[2][0];
                amat3[3] = rows[0][1];
                amat3[4] = rows[1][1];
                amat3[5] = rows[2][1];
                amat3[6] = rows[0][2];
                amat3[7] = rows[1][2];
                amat3[8] = rows[2][2];
                mat3.transpose(amat3);
                quat4.fromRotationMatrix(amat3, rotation);
                quat4.normalize(rotation);*/
            }
        }
    }

});
