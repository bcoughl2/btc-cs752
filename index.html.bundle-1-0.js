montageDefine("f73ee10","runtime/dependencies/o3dgc",{dependencies:[],factory:function(require,exports,module){/*global ArrayBuffer, Uint32Array, Int32Array, Float32Array, Int8Array, Uint8Array, window, performance, Console*/

/*
Copyright (c) 2013 Khaled Mammou - Advanced Micro Devices, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

exports.o3dgc = (function () {
    "use strict";
    var module, local;
    module = {};
    local = {};
    local.O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0 = 7;
    local.O3DGC_BINARY_STREAM_MAX_SYMBOL0 = 127; // ((1 << O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0) >>> 0) - 1;
    local.O3DGC_BINARY_STREAM_BITS_PER_SYMBOL1 = 6;
    local.O3DGC_BINARY_STREAM_MAX_SYMBOL1 = 63; // ((1 << O3DGC_BINARY_STREAM_BITS_PER_SYMBOL1) >>> 0) - 1;
    local.O3DGC_BINARY_STREAM_NUM_SYMBOLS_UINT32 = 5; // Math.floor((32 + O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0 - 1) / O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0);
    local.O3DGC_BIG_ENDIAN = 0;
    local.O3DGC_LITTLE_ENDIAN = 1;
    local.O3DGC_MAX_DOUBLE = 1.79769e+308;
    local.O3DGC_MIN_LONG = -2147483647;
    local.O3DGC_MAX_LONG = 2147483647;
    local.O3DGC_MAX_UCHAR8 = 255;
    local.O3DGC_MAX_TFAN_SIZE = 256;
    local.O3DGC_MAX_ULONG = 4294967295;
    local.O3DGC_SC3DMC_START_CODE = 0x00001F1;
    local.O3DGC_DV_START_CODE = 0x00001F2;
    local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES = 256;
    local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES = 256;
    local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES = 32;
    local.O3DGC_SC3DMC_MAX_PREDICTION_NEIGHBORS = 2;
    local.O3DGC_SC3DMC_BINARIZATION_FL = 0; // Fixed Length (not supported)
    local.O3DGC_SC3DMC_BINARIZATION_BP = 1; // BPC (not supported)
    local.O3DGC_SC3DMC_BINARIZATION_FC = 2; // 4 bits Coding (not supported)
    local.O3DGC_SC3DMC_BINARIZATION_AC = 3; // Arithmetic Coding (not supported)
    local.O3DGC_SC3DMC_BINARIZATION_AC_EGC = 4; // Arithmetic Coding & EGCk
    local.O3DGC_SC3DMC_BINARIZATION_ASCII = 5; // Arithmetic Coding & EGCk
    local.O3DGC_STREAM_TYPE_UNKOWN = 0;
    local.O3DGC_STREAM_TYPE_ASCII = 1;
    local.O3DGC_STREAM_TYPE_BINARY = 2;
    local.O3DGC_SC3DMC_NO_PREDICTION = 0; // supported
    local.O3DGC_SC3DMC_DIFFERENTIAL_PREDICTION = 1; // supported
    local.O3DGC_SC3DMC_XOR_PREDICTION = 2; // not supported
    local.O3DGC_SC3DMC_ADAPTIVE_DIFFERENTIAL_PREDICTION = 3; // not supported
    local.O3DGC_SC3DMC_CIRCULAR_DIFFERENTIAL_PREDICTION = 4; // not supported
    local.O3DGC_SC3DMC_PARALLELOGRAM_PREDICTION = 5; // supported
    local.O3DGC_SC3DMC_SURF_NORMALS_PREDICTION = 6; // supported
    local.O3DGC_SC3DMC_ENCODE_MODE_QBCR = 0; // not supported
    local.O3DGC_SC3DMC_ENCODE_MODE_SVA = 1; // not supported
    local.O3DGC_SC3DMC_ENCODE_MODE_TFAN = 2; // supported
    local.O3DGC_DYNAMIC_VECTOR_ENCODE_MODE_LIFT = 0;
    local.O3DGC_MIN_NEIGHBORS_SIZE = 128;
    local.O3DGC_MIN_NUM_NEIGHBORS_SIZE = 16;
    local.O3DGC_TFANS_MIN_SIZE_ALLOCATED_VERTICES_BUFFER = 128;
    local.O3DGC_TFANS_MIN_SIZE_TFAN_SIZE_BUFFER = 8;
    local.O3DGC_DEFAULT_VECTOR_SIZE = 32;

    module.O3DGC_IFS_FLOAT_ATTRIBUTE_TYPE_UNKOWN = 0;
    module.O3DGC_IFS_FLOAT_ATTRIBUTE_TYPE_POSITION = 1;
    module.O3DGC_IFS_FLOAT_ATTRIBUTE_TYPE_NORMAL = 2;
    module.O3DGC_IFS_FLOAT_ATTRIBUTE_TYPE_COLOR = 3;
    module.O3DGC_IFS_FLOAT_ATTRIBUTE_TYPE_TEXCOORD = 4;
    module.O3DGC_IFS_FLOAT_ATTRIBUTE_TYPE_WEIGHT = 5;
    module.O3DGC_IFS_INT_ATTRIBUTE_TYPE_UNKOWN = 0;
    module.O3DGC_IFS_INT_ATTRIBUTE_TYPE_INDEX = 1;
    module.O3DGC_IFS_INT_ATTRIBUTE_TYPE_JOINT_ID = 2;
    module.O3DGC_IFS_INT_ATTRIBUTE_TYPE_INDEX_BUFFER_ID = 3;

    module.O3DGC_OK = 0;
    module.O3DGC_ERROR_BUFFER_FULL = 1;
    module.O3DGC_ERROR_CORRUPTED_STREAM = 5;
    module.O3DGC_ERROR_NON_SUPPORTED_FEATURE = 6;
    module.O3DGC_ERROR_AC = 7;

    function SystemEndianness() {
        var a, b, c;
        b = new ArrayBuffer(4);
        a = new Uint32Array(b);
        c = new Uint8Array(b);
        a[0] = 1;
        if (c[0] === 1) {
            return local.O3DGC_LITTLE_ENDIAN;
        }
        return local.O3DGC_BIG_ENDIAN;
    }
    // SC3DMCStats class
    module.SC3DMCStats = function () {
        this.m_timeCoord = 0;
        this.m_timeNormal = 0;
        this.m_timeCoordIndex = 0;
        this.m_timeFloatAttribute = new Float32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_timeIntAttribute = new Float32Array(local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES);
        this.m_timeReorder = 0;
        this.m_streamSizeCoord = 0;
        this.m_streamSizeNormal = 0;
        this.m_streamSizeCoordIndex = 0;
        this.m_streamSizeFloatAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_streamSizeIntAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES);
    };
    // SC3DMCTriplet class
    module.SC3DMCTriplet = function (a, b, c) {
        this.m_a = a;
        this.m_b = b;
        this.m_c = c;
    };
    module.SC3DMCTriplet.prototype.Less = function (rhs) {
        var res;
        if (this.m_c !== rhs.m_c) {
            res = (this.m_c < rhs.m_c);
        } else if (this.m_b !== rhs.m_b) {
            res = (this.m_b < rhs.m_b);
        } else {
            res = (this.m_a < rhs.m_a);
        }
        return res;
    };
    module.SC3DMCTriplet.prototype.Equal = function (rhs) {
        return (this.m_c === rhs.m_c && this.m_b === rhs.m_b && this.m_a === rhs.m_a);
    };
    // SC3DMCPredictor class
    module.SC3DMCPredictor = function () {
        this.m_id = new module.SC3DMCTriplet(-1, -1, -1);
        this.m_pred = new Float32Array(local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES);
    };
    // fix me: optimize this function (e.g., binary search)
    function InsertPredictor(e, nPred, list, dimFloatArray) {
        var pos, foundOrInserted, j, j1, j0, h, i;
        pos = -1;
        foundOrInserted = false;
        j1 = nPred.m_value;
        j0 = 0;
        for (j = j0; j < j1; ++j) {
            if (e.Equal(list[j].m_id)) {
                foundOrInserted = true;
                break;
            } else if (e.Less(list[j].m_id)) {
                if (nPred.m_value < local.O3DGC_SC3DMC_MAX_PREDICTION_NEIGHBORS) {
                    ++nPred.m_value;
                }
                for (h = nPred.m_value - 1; h > j; --h) {
                    list[h].m_id.m_a = list[h - 1].m_id.m_a;
                    list[h].m_id.m_b = list[h - 1].m_id.m_b;
                    list[h].m_id.m_c = list[h - 1].m_id.m_c;
                    for (i = 0; i < dimFloatArray; ++i) {
                        list[h].m_pred[i] = list[h - 1].m_pred[i];
                    }
                }
                list[j].m_id.m_a = e.m_a;
                list[j].m_id.m_b = e.m_b;
                list[j].m_id.m_c = e.m_c;
                pos = j;
                foundOrInserted = true;
                break;
            }
        }
        if (!foundOrInserted && nPred.m_value < local.O3DGC_SC3DMC_MAX_PREDICTION_NEIGHBORS) {
            pos = nPred.m_value++;
            list[pos].m_id.m_a = e.m_a;
            list[pos].m_id.m_b = e.m_b;
            list[pos].m_id.m_c = e.m_c;
        }
        return pos;
    }
    // Timer class
    if (typeof window.performance === 'undefined') {
        window.performance = {};
    }
    if (!window.performance.now) {
        local.nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            local.nowOffset = performance.timing.navigationStart;
        }
        window.performance.now = function now() {
            return Date.now() - local.nowOffset;
        };
    }
    module.Timer = function () {
        this.m_start = 0;
        this.m_end = 0;
    };
    module.Timer.prototype.Tic = function () {
        this.m_start = window.performance.now();
    };
    module.Timer.prototype.Toc = function () {
        this.m_end = window.performance.now();
    };
    module.Timer.prototype.GetElapsedTime = function () {
        return this.m_end - this.m_start;
    };
    // Vec3 class
    module.Vec3 = function (x, y, z) {
        this.m_x = x;
        this.m_y = y;
        this.m_z = z;
    };
    module.Vec3.prototype.Set = function (x, y, z) {
        this.m_x = x;
        this.m_y = y;
        this.m_z = z;
    };
    module.Vec3.prototype.Sub = function (lhs, rhs) {
        this.m_x = lhs.m_x - rhs.m_x;
        this.m_y = lhs.m_y - rhs.m_y;
        this.m_z = lhs.m_z - rhs.m_z;
    };
    module.Vec3.prototype.Add = function (lhs, rhs) {
        this.m_x = lhs.m_x + rhs.m_x;
        this.m_y = lhs.m_y + rhs.m_y;
        this.m_z = lhs.m_z + rhs.m_z;
    };
    module.Vec3.prototype.SelfAdd = function (v) {
        this.m_x += v.m_x;
        this.m_y += v.m_y;
        this.m_z += v.m_z;
    };
    module.Vec3.prototype.Cross = function (lhs, rhs) {
        this.m_x = lhs.m_y * rhs.m_z - lhs.m_z * rhs.m_y;
        this.m_y = lhs.m_z * rhs.m_x - lhs.m_x * rhs.m_z;
        this.m_z = lhs.m_x * rhs.m_y - lhs.m_y * rhs.m_x;
    };
    module.Vec3.prototype.GetNorm = function () {
        return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y + this.m_z * this.m_z);
    };
    function SphereToCube(vin, vout) {
        var ax, ay, az;
        ax = Math.abs(vin.m_x);
        ay = Math.abs(vin.m_y);
        az = Math.abs(vin.m_z);
        if (az >= ax && az >= ay) {
            if (vin.m_z >= 0) {
                vout.m_z = 0;
                vout.m_x = vin.m_x;
                vout.m_y = vin.m_y;
            } else {
                vout.m_z = 1;
                vout.m_x = -vin.m_x;
                vout.m_y = -vin.m_y;
            }
        } else if (ay >= ax && ay >= az) {
            if (vin.m_y >= 0) {
                vout.m_z = 2;
                vout.m_x = vin.m_z;
                vout.m_y = vin.m_x;
            } else {
                vout.m_z = 3;
                vout.m_x = -vin.m_z;
                vout.m_y = -vin.m_x;
            }
        } else {
            if (vin.m_x >= 0) {
                vout.m_z = 4;
                vout.m_x = vin.m_y;
                vout.m_y = vin.m_z;
            } else {
                vout.m_z = 5;
                vout.m_x = -vin.m_y;
                vout.m_y = -vin.m_z;
            }
        }
    }
    local.CubeToSphere = {
        0: function (vin, vout) {
            vout.m_x = vin.m_x;
            vout.m_y = vin.m_y;
            vout.m_z = Math.sqrt(Math.max(0.0, 1.0 - vout.m_x * vout.m_x - vout.m_y * vout.m_y));
        },
        1: function (vin, vout) {
            vout.m_x = -vin.m_x;
            vout.m_y = -vin.m_y;
            vout.m_z = -Math.sqrt(Math.max(0.0, 1.0 - vout.m_x * vout.m_x - vout.m_y * vout.m_y));
        },
        2: function (vin, vout) {
            vout.m_z = vin.m_x;
            vout.m_x = vin.m_y;
            vout.m_y = Math.sqrt(Math.max(0.0, 1.0 - vout.m_x * vout.m_x - vout.m_z * vout.m_z));
        },
        3: function (vin, vout) {
            vout.m_z = -vin.m_x;
            vout.m_x = -vin.m_y;
            vout.m_y = -Math.sqrt(Math.max(0.0, 1.0 - vout.m_x * vout.m_x - vout.m_z * vout.m_z));
        },
        4: function (vin, vout) {
            vout.m_y = vin.m_x;
            vout.m_z = vin.m_y;
            vout.m_x = Math.sqrt(Math.max(0.0, 1.0 - vout.m_y * vout.m_y - vout.m_z * vout.m_z));
        },
        5: function (vin, vout) {
            vout.m_y = -vin.m_x;
            vout.m_z = -vin.m_y;
            vout.m_x = -Math.sqrt(Math.max(0.0, 1.0 - vout.m_y * vout.m_y - vout.m_z * vout.m_z));
        }
    };
    function IntToUInt(value) {
        return (value < 0) ? (-1 - (2 * value)) : (2 * value);
    }
    function UIntToInt(uiValue) {
        return (uiValue & 1) ? -((uiValue + 1) >>> 1) : ((uiValue >>> 1));
    }
    module.Iterator = function () {
        this.m_count = 0;
    };
    module.NumberRef = function () {
        this.m_value = 0;
    };
    // BinaryStream class
    module.BinaryStream = function (buffer) {
        this.m_endianness = SystemEndianness();
        this.m_buffer = buffer;
        this.m_stream = new Uint8Array(this.m_buffer);
        this.m_localBuffer = new ArrayBuffer(4);
        this.m_localBufferViewUChar8 = new Uint8Array(this.m_localBuffer);
        this.m_localBufferViewFloat32 = new Float32Array(this.m_localBuffer);
        this.m_localBufferViewUInt32 = new Uint32Array(this.m_localBuffer);
    };
    module.BinaryStream.prototype.ReadFloat32Bin = function (bsIterator) {
        if (this.m_endianness === local.O3DGC_BIG_ENDIAN) {
            this.m_localBufferViewUChar8[3] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[2] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[1] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[0] = this.m_stream[bsIterator.m_count++];
        } else {
            this.m_localBufferViewUChar8[0] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[1] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[2] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[3] = this.m_stream[bsIterator.m_count++];
        }
        return this.m_localBufferViewFloat32[0];
    };
    module.BinaryStream.prototype.ReadUInt32Bin = function (bsIterator) {
        if (this.m_endianness === local.O3DGC_BIG_ENDIAN) {
            this.m_localBufferViewUChar8[3] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[2] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[1] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[0] = this.m_stream[bsIterator.m_count++];
        } else {
            this.m_localBufferViewUChar8[0] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[1] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[2] = this.m_stream[bsIterator.m_count++];
            this.m_localBufferViewUChar8[3] = this.m_stream[bsIterator.m_count++];
        }
        return this.m_localBufferViewUInt32[0];
    };
    module.BinaryStream.prototype.ReadUChar8Bin = function (bsIterator) {
        return this.m_stream[bsIterator.m_count++];
    };
    module.BinaryStream.prototype.ReadUInt32ASCII = function (bsIterator) {
        var value, shift, i;
        value = 0;
        shift = 0;
        for (i = 0; i < local.O3DGC_BINARY_STREAM_NUM_SYMBOLS_UINT32; ++i) {
            value += (this.m_stream[bsIterator.m_count++] << shift) >>> 0;
            shift += local.O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0;
        }
        return value;
    };
    module.BinaryStream.prototype.ReadFloat32ASCII = function (bsIterator) {
        var value = this.ReadUInt32ASCII(bsIterator);
        if (this.m_endianness === local.O3DGC_BIG_ENDIAN) {
            this.m_localBufferViewUChar8[3] = value & local.O3DGC_MAX_UCHAR8;
            value >>>= 8;
            this.m_localBufferViewUChar8[2] = value & local.O3DGC_MAX_UCHAR8;
            value >>>= 8;
            this.m_localBufferViewUChar8[1] = value & local.O3DGC_MAX_UCHAR8;
            value >>>= 8;
            this.m_localBufferViewUChar8[0] = value & local.O3DGC_MAX_UCHAR8;
        } else {
            this.m_localBufferViewUChar8[0] = value & local.O3DGC_MAX_UCHAR8;
            value >>>= 8;
            this.m_localBufferViewUChar8[1] = value & local.O3DGC_MAX_UCHAR8;
            value >>>= 8;
            this.m_localBufferViewUChar8[2] = value & local.O3DGC_MAX_UCHAR8;
            value >>>= 8;
            this.m_localBufferViewUChar8[3] = value & local.O3DGC_MAX_UCHAR8;
        }
        return this.m_localBufferViewFloat32[0];
    };
    module.BinaryStream.prototype.ReadIntASCII = function (bsIterator) {
        return UIntToInt(this.ReadUIntASCII(bsIterator));
    };
    module.BinaryStream.prototype.ReadUIntASCII = function (bsIterator) {
        var i, x, value;
        value = this.m_stream[bsIterator.m_count++];
        if (value === local.O3DGC_BINARY_STREAM_MAX_SYMBOL0) {
            i = 0;
            do {
                x = this.m_stream[bsIterator.m_count++];
                value += ((x >>> 1) << i) >>> 0;
                i += local.O3DGC_BINARY_STREAM_BITS_PER_SYMBOL1;
            } while (x & 1);
        }
        return value;
    };
    module.BinaryStream.prototype.ReadUCharASCII = function (bsIterator) {
        return this.m_stream[bsIterator.m_count++];
    };
    module.BinaryStream.prototype.ReadFloat32 = function (bsIterator, streamType) {
        if (streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            return this.ReadFloat32ASCII(bsIterator);
        }
        return this.ReadFloat32Bin(bsIterator);
    };
    module.BinaryStream.prototype.ReadUInt32 = function (bsIterator, streamType) {
        if (streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            return this.ReadUInt32ASCII(bsIterator);
        }
        return this.ReadUInt32Bin(bsIterator);
    };
    module.BinaryStream.prototype.ReadUChar = function (bsIterator, streamType) {
        if (streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            return this.ReadUCharASCII(bsIterator);
        }
        return this.ReadUChar8Bin(bsIterator);
    };
    module.BinaryStream.prototype.GetBuffer = function (bsIterator, size) {
        return new Uint8Array(this.m_buffer, bsIterator.m_count, size);
    };

    // Copyright (c) 2004 Amir Said (said@ieee.org) & William A. Pearlman (pearlw@ecse.rpi.edu)
    // All rights reserved.

    local.O3DGC_AC_MIN_LENGTH = 0x01000000;   // threshold for renormalization
    local.O3DGC_AC_MAX_LENGTH = 0xFFFFFFFF;      // maximum AC interval length
    local.O3DGC_AC_BM_LENGTH_SHIFT = 13;     // Maximum values for binary models length bits discarded before mult.
    local.O3DGC_AC_BM_MAX_COUNT = (1 << local.O3DGC_AC_BM_LENGTH_SHIFT) >>> 0;  // for adaptive models
    local.O3DGC_AC_DM_LENGTH_SHIFT = 15; // Maximum values for general models length bits discarded before mult.
    local.O3DGC_AC_DM_MAX_COUNT = (1 << local.O3DGC_AC_DM_LENGTH_SHIFT) >>> 0;  // for adaptive models
    // StaticBitModel class 
    module.StaticBitModel = function () {
        this.m_bit0Prob = (1 << (local.O3DGC_AC_BM_LENGTH_SHIFT - 1)) >>> 0; // p0 = 0.5
    };
    module.StaticBitModel.prototype.SetProbability = function (p) {
        this.m_bit0Prob = Math.floor(p * ((1 << local.O3DGC_AC_BM_LENGTH_SHIFT) >>> 0));
    };
    // AdaptiveBitModel class 
    module.AdaptiveBitModel = function () {
        // initialization to equiprobable model
        this.m_updateCycle = 4;
        this.m_bitsUntilUpdate = 4;
        this.m_bit0Prob = (1 << (local.O3DGC_AC_BM_LENGTH_SHIFT - 1)) >>> 0;
        this.m_bit0Count = 1;
        this.m_bitCount = 2;
    };
    module.AdaptiveBitModel.prototype.Reset = function () {
        this.m_updateCycle = 4;
        this.m_bitsUntilUpdate = 4;
        this.m_bit0Prob = (1 << (local.O3DGC_AC_BM_LENGTH_SHIFT - 1)) >>> 0;
        this.m_bit0Count = 1;
        this.m_bitCount = 2;
    };
    module.AdaptiveBitModel.prototype.Update = function () {
        // halve counts when a threshold is reached
        if ((this.m_bitCount += this.m_updateCycle) > local.O3DGC_AC_BM_MAX_COUNT) {
            this.m_bitCount = (this.m_bitCount + 1) >>> 1;
            this.m_bit0Count = (this.m_bit0Count + 1) >>> 1;
            if (this.m_bit0Count === this.m_bitCount) {
                ++this.m_bitCount;
            }
        }
        // compute scaled bit 0 probability
        var scale = Math.floor(0x80000000 / this.m_bitCount);
        this.m_bit0Prob = (this.m_bit0Count * scale) >>> (31 - local.O3DGC_AC_BM_LENGTH_SHIFT);
        // set frequency of model updates
        this.m_updateCycle = (5 * this.m_updateCycle) >>> 2;
        if (this.m_updateCycle > 64) {
            this.m_updateCycle = 64;
        }
        this.m_bitsUntilUpdate = this.m_updateCycle;
    };
    // AdaptiveDataModel class 
    module.AdaptiveDataModel = function () {
        this.m_buffer = {};
        this.m_distribution = {};
        this.m_symbolCount = {};
        this.m_decoderTable = {};
        this.m_totalCount = 0;
        this.m_updateCycle = 0;
        this.m_symbolsUntilUpdate = 0;
        this.m_dataSymbols = 0;
        this.m_lastSymbol = 0;
        this.m_tableSize = 0;
        this.m_tableShift = 0;
    };
    module.AdaptiveDataModel.prototype.Update = function () {
        var n, sum, s, scale, k, max_cycle, w;
        // halve counts when a threshold is reached
        if ((this.m_totalCount += this.m_updateCycle) > local.O3DGC_AC_DM_MAX_COUNT) {
            this.m_totalCount = 0;
            for (n = 0; n < this.m_dataSymbols; ++n) {
                this.m_totalCount += (this.m_symbolCount[n] = (this.m_symbolCount[n] + 1) >>> 1);
            }
        }
        // compute cumulative distribution, decoder table
        sum = 0;
        s = 0;
        scale = Math.floor(0x80000000 / this.m_totalCount);
        if (this.m_tableSize === 0) {
            for (k = 0; k < this.m_dataSymbols; ++k) {
                this.m_distribution[k] = (scale * sum) >>> (31 - local.O3DGC_AC_DM_LENGTH_SHIFT);
                sum += this.m_symbolCount[k];
            }
        } else {
            for (k = 0; k < this.m_dataSymbols; ++k) {
                this.m_distribution[k] = (scale * sum) >>> (31 - local.O3DGC_AC_DM_LENGTH_SHIFT);
                sum += this.m_symbolCount[k];
                w = this.m_distribution[k] >>> this.m_tableShift;
                while (s < w) {
                    this.m_decoderTable[++s] = k - 1;
                }
            }
            this.m_decoderTable[0] = 0;
            while (s <= this.m_tableSize) {
                this.m_decoderTable[++s] = this.m_dataSymbols - 1;
            }
        }
        // set frequency of model updates
        this.m_updateCycle = (5 * this.m_updateCycle) >>> 2;
        max_cycle = ((this.m_dataSymbols + 6) << 3) >>> 0;
        if (this.m_updateCycle > max_cycle) {
            this.m_updateCycle = max_cycle;
        }
        this.m_symbolsUntilUpdate = this.m_updateCycle;
    };
    module.AdaptiveDataModel.prototype.Reset = function () {
        var k;
        if (this.m_dataSymbols === 0) {
            return;
        }
        // restore probability estimates to uniform distribution
        this.m_totalCount = 0;
        this.m_updateCycle = this.m_dataSymbols;
        for (k = 0; k < this.m_dataSymbols; ++k) {
            this.m_symbolCount[k] = 1;
        }
        this.Update();
        this.m_symbolsUntilUpdate = this.m_updateCycle = (this.m_dataSymbols + 6) >>> 1;
    };
    module.AdaptiveDataModel.prototype.SetAlphabet = function (number_of_symbols) {
        if ((number_of_symbols < 2) || (number_of_symbols > (1 << 11))) {
            Console.log("invalid number of data symbols");
            return module.O3DGC_ERROR_AC;
        }
        if (this.m_dataSymbols !== number_of_symbols) { // assign memory for data model
            this.m_dataSymbols = number_of_symbols;
            this.m_lastSymbol = this.m_dataSymbols - 1;
            // define size of table for fast decoding
            if (this.m_dataSymbols > 16) {
                var table_bits = 3;
                while (this.m_dataSymbols > ((1 << (table_bits + 2)) >>> 0)) {
                    ++table_bits;
                }
                this.m_tableSize = (1 << table_bits) >>> 0;
                this.m_tableShift = local.O3DGC_AC_DM_LENGTH_SHIFT - table_bits;
                this.m_buffer = new ArrayBuffer(4 * (2 * this.m_dataSymbols + this.m_tableSize + 2));
                this.m_distribution = new Uint32Array(this.m_buffer, 0, this.m_dataSymbols);
                this.m_symbolCount = new Uint32Array(this.m_buffer, 4 * this.m_dataSymbols, this.m_dataSymbols);
                this.m_decoderTable = new Uint32Array(this.m_buffer, 8 * this.m_dataSymbols, this.m_tableSize + 2);
            } else {// small alphabet: no table needed
                this.m_tableSize = this.m_tableShift = 0;
                this.m_buffer = new ArrayBuffer(4 * 2 * this.m_dataSymbols);
                this.m_distribution = new Uint32Array(this.m_buffer, 0, this.m_dataSymbols);
                this.m_symbolCount = new Uint32Array(this.m_buffer, 4 * this.m_dataSymbols, this.m_dataSymbols);
                this.m_decoderTable = {};
            }
        }
        this.Reset(); // initialize model
        return module.O3DGC_OK;
    };
    // ArithmeticDecoder class
    module.ArithmeticDecoder = function () {
        this.m_codeBuffer = {};
        this.m_acShift = 0;
        this.m_base = 0;
        this.m_value = 0;
        this.m_length = 0; // arithmetic coding state
        this.m_bufferSize = 0;
        this.m_mode = 0; // mode: 0 = undef, 1 = encoder, 2 = decoder
    };
    module.ArithmeticDecoder.prototype.SetBuffer = function (max_code_bytes, user_buffer) {
        if (max_code_bytes === 0) {
            Console.log("invalid codec buffer size");
            return module.O3DGC_ERROR_AC;
        }
        if (this.m_mode !== 0) {
            Console.log("cannot set buffer while encoding or decoding");
            return module.O3DGC_ERROR_AC;
        }
        this.m_bufferSize = max_code_bytes;
        this.m_codeBuffer = user_buffer;
    };
    module.ArithmeticDecoder.prototype.StartDecoder = function () {
        if (this.m_mode !== 0) {
            Console.log("cannot start decoder");
            return module.O3DGC_ERROR_AC;
        }
        if (this.m_bufferSize === 0) {
            Console.log("no code buffer set");
            return module.O3DGC_ERROR_AC;
        }
        // initialize decoder: interval, pointer, initial code value
        this.m_mode = 2;
        this.m_length = local.O3DGC_AC_MAX_LENGTH;
        this.m_acShift = 3;
        this.m_value = ((this.m_codeBuffer[0] << 24) | (this.m_codeBuffer[1] << 16) | (this.m_codeBuffer[2] << 8) | (this.m_codeBuffer[3])) >>> 0;
    };
    module.ArithmeticDecoder.prototype.StopDecoder = function () {
        if (this.m_mode !== 2) {
            Console.log("invalid to stop decoder");
            return module.O3DGC_ERROR_AC;
        }
        this.m_mode = 0;
    };
    module.ArithmeticDecoder.prototype.GetBit = function () {
        this.m_length >>>= 1; // halve interval
        var bit = (this.m_value >= this.m_length); // decode bit
        if (bit) {
            this.m_value -= this.m_length; // move base
        }
        if (this.m_length < local.O3DGC_AC_MIN_LENGTH) {
            this.RenormDecInterval(); // renormalization
        }
        return bit;
    };
    module.ArithmeticDecoder.prototype.GetBits = function (bits) {
        var s = Math.floor(this.m_value / (this.m_length >>>= bits)); // decode symbol, change length
        this.m_value -= this.m_length * s; // update interval
        if (this.m_length < local.O3DGC_AC_MIN_LENGTH) {
            this.RenormDecInterval(); // renormalization
        }
        return s;
    };
    module.ArithmeticDecoder.prototype.DecodeStaticBitModel = function (M) {
        var x, bit;
        x = M.m_bit0Prob * (this.m_length >>> local.O3DGC_AC_BM_LENGTH_SHIFT); // product l x p0
        bit = (this.m_value >= x); // decision
        // update & shift interval
        if (!bit) {
            this.m_length = x;
        } else {
            this.m_value -= x; // shifted interval base = 0
            this.m_length -= x;
        }
        if (this.m_length < local.O3DGC_AC_MIN_LENGTH) {
            this.RenormDecInterval(); // renormalization
        }
        return bit; // return data bit value
    };
    module.ArithmeticDecoder.prototype.DecodeAdaptiveBitModel = function (M) {
        var x, bit;
        x = M.m_bit0Prob * (this.m_length >>> local.O3DGC_AC_BM_LENGTH_SHIFT);   // product l x p0
        bit = (this.m_value >= x); // decision
        // update interval
        if (!bit) {
            this.m_length = x;
            ++M.m_bit0Count;
        } else {
            this.m_value -= x;
            this.m_length -= x;
        }
        if (this.m_length < local.O3DGC_AC_MIN_LENGTH) {
            this.RenormDecInterval(); // renormalization
        }
        if (--M.m_bitsUntilUpdate === 0) {
            M.Update(); // periodic model update
        }
        return bit; // return data bit value
    };
    module.ArithmeticDecoder.prototype.DecodeAdaptiveDataModel = function (M) {
        var n, s, x, y, t, dv, z, m;
        y = this.m_length;
        if (M.m_tableSize > 0) { // use table look-up for faster decoding
            dv = Math.floor(this.m_value / (this.m_length >>>= local.O3DGC_AC_DM_LENGTH_SHIFT));
            t = dv >>> M.m_tableShift;
            s = M.m_decoderTable[t];         // initial decision based on table look-up
            n = M.m_decoderTable[t + 1] + 1;
            while (n > s + 1) { // finish with bisection search
                m = (s + n) >>> 1;
                if (M.m_distribution[m] > dv) {
                    n = m;
                } else {
                    s = m;
                }
            }
            // compute products
            x = M.m_distribution[s] * this.m_length;
            if (s !== M.m_lastSymbol) {
                y = M.m_distribution[s + 1] * this.m_length;
            }
        } else { // decode using only multiplications
            x = s = 0;
            this.m_length >>>= local.O3DGC_AC_DM_LENGTH_SHIFT;
            m = (n = M.m_dataSymbols) >>> 1;
            // decode via bisection search
            do {
                z = this.m_length * M.m_distribution[m];
                if (z > this.m_value) {
                    n = m;
                    y = z; // value is smaller
                } else {
                    s = m;
                    x = z; // value is larger or equal
                }
            } while ((m = (s + n) >>> 1) !== s);
        }
        this.m_value -= x; // update interval
        this.m_length = y - x;
        if (this.m_length < local.O3DGC_AC_MIN_LENGTH) {
            this.RenormDecInterval(); // renormalization
        }
        ++M.m_symbolCount[s];
        if (--M.m_symbolsUntilUpdate === 0) {
            M.Update(false); // periodic model update
        }
        return s;
    };
    module.ArithmeticDecoder.prototype.ExpGolombDecode = function (k, bModel0, bModel1) {
        var symbol, binary_symbol, l;
        symbol = 0;
        binary_symbol = 0;
        do {
            l = this.DecodeAdaptiveBitModel(bModel1);
            if (l) {
                symbol += (1 << k) >>> 0;
                k++;
            }
        } while (l);
        while (k--) { //next binary part
            if (this.DecodeStaticBitModel(bModel0)) {
                binary_symbol = (binary_symbol | (1 << k)) >>> 0;
            }
        }
        return (symbol + binary_symbol);
    };
    module.ArithmeticDecoder.prototype.RenormDecInterval = function () {
        do { // read least-significant byte
            this.m_value = ((this.m_value << 8) | this.m_codeBuffer[++this.m_acShift]) >>> 0;
            this.m_length = (this.m_length << 8) >>> 0;
        } while (this.m_length < local.O3DGC_AC_MIN_LENGTH); // length multiplied by 256
    };
    module.ArithmeticDecoder.prototype.DecodeIntACEGC = function (mModelValues, bModel0, bModel1, exp_k, M) {
        var uiValue = this.DecodeAdaptiveDataModel(mModelValues);
        if (uiValue === M) {
            uiValue += this.ExpGolombDecode(exp_k, bModel0, bModel1);
        }
        return UIntToInt(uiValue);
    };
    module.ArithmeticDecoder.prototype.DecodeUIntACEGC = function (mModelValues, bModel0, bModel1, exp_k, M) {
        var uiValue = this.DecodeAdaptiveDataModel(mModelValues);
        if (uiValue === M) {
            uiValue += this.ExpGolombDecode(exp_k, bModel0, bModel1);
        }
        return uiValue;
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
    // FIFO class
    module.FIFO = function () {
        this.m_data = {};
        this.m_allocated = 0;
        this.m_size = 0;
        this.m_start = 0;
        this.m_end = 0;
    };
    module.FIFO.prototype.Clear = function () {
        this.m_start = this.m_end = this.m_size = 0;
    };
    module.FIFO.prototype.GetAllocatedSize = function () {
        return this.m_allocated;
    };
    module.FIFO.prototype.GetSize = function () {
        return this.m_size;
    };
    module.FIFO.prototype.Allocate = function (size) {
        if (size > this.m_allocated) {
            this.m_allocated = size;
            this.m_data = new Int32Array(this.m_allocated);
        }
        this.Clear();
        return module.O3DGC_OK;
    };
    module.FIFO.prototype.PopFirst = function () {
        --this.m_size;
        var current = this.m_start++;
        if (this.m_start === this.m_allocated) {
            this.m_end = 0;
        }
        return this.m_data[current];
    };
    module.FIFO.prototype.PushBack = function (value) {
        --this.m_size;
        this.m_data[this.m_end] = value;
        ++this.m_size;
        ++this.m_end;
        if (this.m_end === this.m_allocated) {
            this.m_end = 0;
        }
    };
    // IndexedFaceSet class
    module.IndexedFaceSet = function () {
        this.m_nCoordIndex = 0;
        this.m_nCoord = 0;
        this.m_nNormal = 0;
        this.m_numFloatAttributes = 0;
        this.m_numIntAttributes = 0;
        this.m_creaseAngle = 30.0;
        this.m_ccw = true;
        this.m_solid = true;
        this.m_convex = true;
        this.m_isTriangularMesh = true;
        this.m_coordMin = new Float32Array(3);
        this.m_coordMax = new Float32Array(3);
        this.m_normalMin = new Float32Array(3);
        this.m_normalMax = new Float32Array(3);
        this.m_nFloatAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_nIntAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES);
        this.m_dimFloatAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_dimIntAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES);
        this.m_typeFloatAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_typeIntAttribute = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES);
        this.m_minFloatAttributeBuffer = new ArrayBuffer(4 * local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES);
        this.m_minFloatAttribute = new Float32Array(this.m_minFloatAttributeBuffer);
        this.m_maxFloatAttributeBuffer = new ArrayBuffer(4 * local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES);
        this.m_maxFloatAttribute = new Float32Array(this.m_maxFloatAttributeBuffer);
        this.m_coordIndex = {};
        this.m_coord = {};
        this.m_normal = {};
        this.m_floatAttribute = [];
        this.m_intAttribute = [];
    };
    module.IndexedFaceSet.prototype.GetNCoordIndex = function () {
        return this.m_nCoordIndex;
    };
    module.IndexedFaceSet.prototype.GetNCoordIndex = function () {
        return this.m_nCoordIndex;
    };
    module.IndexedFaceSet.prototype.GetNCoord = function () {
        return this.m_nCoord;
    };
    module.IndexedFaceSet.prototype.GetNNormal = function () {
        return this.m_nNormal;
    };
    module.IndexedFaceSet.prototype.GetNFloatAttribute = function (a) {
        return this.m_nFloatAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetNIntAttribute = function (a) {
        return this.m_nIntAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetNumFloatAttributes = function () {
        return this.m_numFloatAttributes;
    };
    module.IndexedFaceSet.prototype.GetNumIntAttributes = function () {
        return this.m_numIntAttributes;
    };
    module.IndexedFaceSet.prototype.GetCoordMinArray = function () {
        return this.m_coordMin;
    };
    module.IndexedFaceSet.prototype.GetCoordMaxArray = function () {
        return this.m_coordMax;
    };
    module.IndexedFaceSet.prototype.GetNormalMinArray = function () {
        return this.m_normalMin;
    };
    module.IndexedFaceSet.prototype.GetNormalMaxArray = function () {
        return this.m_normalMax;
    };
    module.IndexedFaceSet.prototype.GetFloatAttributeMinArray = function (a) {
        return (new Float32Array(this.m_minFloatAttributeBuffer, a * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES * 4, this.GetFloatAttributeDim(a)));
    };
    module.IndexedFaceSet.prototype.GetFloatAttributeMaxArray = function (a) {
        return (new Float32Array(this.m_maxFloatAttributeBuffer, a * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES * 4, this.GetFloatAttributeDim(a)));
    };
    module.IndexedFaceSet.prototype.GetFloatAttributeDim = function (a) {
        return this.m_dimFloatAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetIntAttributeDim = function (a) {
        return this.m_dimIntAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetFloatAttributeType = function (a) {
        return this.m_typeFloatAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetIntAttributeType = function (a) {
        return this.m_typeIntAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetFloatAttributeMax = function (a, dim) {
        return this.m_maxFloatAttribute[a * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES + dim];
    };
    module.IndexedFaceSet.prototype.GetCreaseAngle = function () {
        return this.m_creaseAngle;
    };
    module.IndexedFaceSet.prototype.GetCreaseAngle = function () {
        return this.m_creaseAngle;
    };
    module.IndexedFaceSet.prototype.GetCCW = function () {
        return this.m_ccw;
    };
    module.IndexedFaceSet.prototype.GetSolid = function () {
        return this.m_solid;
    };
    module.IndexedFaceSet.prototype.GetConvex = function () {
        return this.m_convex;
    };
    module.IndexedFaceSet.prototype.GetIsTriangularMesh = function () {
        return this.m_isTriangularMesh;
    };
    module.IndexedFaceSet.prototype.GetCoordIndex = function () {
        return this.m_coordIndex;
    };
    module.IndexedFaceSet.prototype.GetCoordIndex = function () {
        return this.m_coordIndex;
    };
    module.IndexedFaceSet.prototype.GetCoord = function () {
        return this.m_coord;
    };
    module.IndexedFaceSet.prototype.GetNormal = function () {
        return this.m_normal;
    };
    module.IndexedFaceSet.prototype.GetFloatAttribute = function (a) {
        return this.m_floatAttribute[a];
    };
    module.IndexedFaceSet.prototype.GetIntAttribute = function (a) {
        return this.m_intAttribute[a];
    };
    module.IndexedFaceSet.prototype.SetNCoordIndex = function (nCoordIndex) {
        this.m_nCoordIndex = nCoordIndex;
    };
    module.IndexedFaceSet.prototype.SetNNormalIndex = function (nNormalIndex) {
    };
    module.IndexedFaceSet.prototype.SetNormalPerVertex = function (perVertex) {
    };
    module.IndexedFaceSet.prototype.SetNFloatAttributeIndex = function (nFloatAttributeIndex) {
    };
    module.IndexedFaceSet.prototype.SetNIntAttributeIndex = function (nIntAttributeIndex) {
    };
    module.IndexedFaceSet.prototype.SetFloatAttributePerVertex = function (perVertex) {
    };
    module.IndexedFaceSet.prototype.SetIntAttributePerVertex = function (perVertex) {
    };
    module.IndexedFaceSet.prototype.SetNCoord = function (nCoord) {
        this.m_nCoord = nCoord;
    };
    module.IndexedFaceSet.prototype.SetNNormal = function (nNormal) {
        this.m_nNormal = nNormal;
    };
    module.IndexedFaceSet.prototype.SetNumFloatAttributes = function (numFloatAttributes) {
        this.m_numFloatAttributes = numFloatAttributes;
    };
    module.IndexedFaceSet.prototype.SetNumIntAttributes = function (numIntAttributes) {
        this.m_numIntAttributes = numIntAttributes;
    };
    module.IndexedFaceSet.prototype.SetCreaseAngle = function (creaseAngle) {
        this.m_creaseAngle = creaseAngle;
    };
    module.IndexedFaceSet.prototype.SetCCW = function (ccw) {
        this.m_ccw = ccw;
    };
    module.IndexedFaceSet.prototype.SetSolid = function (solid) {
        this.m_solid = solid;
    };
    module.IndexedFaceSet.prototype.SetConvex = function (convex) {
        this.m_convex = convex;
    };
    module.IndexedFaceSet.prototype.SetIsTriangularMesh = function (isTriangularMesh) {
        this.m_isTriangularMesh = isTriangularMesh;
    };
    module.IndexedFaceSet.prototype.SetCoordMin = function (j, min) {
        this.m_coordMin[j] = min;
    };
    module.IndexedFaceSet.prototype.SetCoordMax = function (j, max) {
        this.m_coordMax[j] = max;
    };
    module.IndexedFaceSet.prototype.SetNormalMin = function (j, min) {
        this.m_normalMin[j] = min;
    };
    module.IndexedFaceSet.prototype.SetNormalMax = function (j, max) {
        this.m_normalMax[j] = max;
    };
    module.IndexedFaceSet.prototype.SetNFloatAttribute = function (a, nFloatAttribute) {
        this.m_nFloatAttribute[a] = nFloatAttribute;
    };
    module.IndexedFaceSet.prototype.SetNIntAttribute = function (a, nIntAttribute) {
        this.m_nIntAttribute[a] = nIntAttribute;
    };
    module.IndexedFaceSet.prototype.SetFloatAttributeDim = function (a, d) {
        this.m_dimFloatAttribute[a] = d;
    };
    module.IndexedFaceSet.prototype.SetIntAttributeDim = function (a, d) {
        this.m_dimIntAttribute[a] = d;
    };
    module.IndexedFaceSet.prototype.SetFloatAttributeType = function (a, d) {
        this.m_typeFloatAttribute[a] = d;
    };
    module.IndexedFaceSet.prototype.SetIntAttributeType = function (a, d) {
        this.m_typeIntAttribute[a] = d;
    };
    module.IndexedFaceSet.prototype.SetFloatAttributeMin = function (a, dim, min) {
        this.m_minFloatAttribute[a * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES + dim] = min;
    };
    module.IndexedFaceSet.prototype.SetFloatAttributeMax = function (a, dim, max) {
        this.m_maxFloatAttribute[a * local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES + dim] = max;
    };
    module.IndexedFaceSet.prototype.SetCoordIndex = function (coordIndex) {
        this.m_coordIndex = coordIndex;
    };
    module.IndexedFaceSet.prototype.SetCoord = function (coord) {
        this.m_coord = coord;
    };
    module.IndexedFaceSet.prototype.SetNormal = function (normal) {
        this.m_normal = normal;
    };
    module.IndexedFaceSet.prototype.SetFloatAttribute = function (a, floatAttribute) {
        this.m_floatAttribute[a] = floatAttribute;
    };
    module.IndexedFaceSet.prototype.SetIntAttribute = function (a, intAttribute) {
        this.m_intAttribute[a] = intAttribute;
    };

    // SC3DMCEncodeParams class
    module.SC3DMCEncodeParams = function () {
        var a;
        this.m_numFloatAttributes = 0;
        this.m_numIntAttributes = 0;
        this.m_floatAttributeQuantBits = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_floatAttributePredMode = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES);
        this.m_intAttributePredMode = new Uint32Array(local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES);
        this.m_encodeMode = local.O3DGC_SC3DMC_ENCODE_MODE_TFAN;
        this.m_streamTypeMode = local.O3DGC_STREAM_TYPE_ASCII;
        this.m_coordQuantBits = 14;
        this.m_normalQuantBits = 8;
        this.m_coordPredMode = local.O3DGC_SC3DMC_PARALLELOGRAM_PREDICTION;
        this.m_normalPredMode = local.O3DGC_SC3DMC_SURF_NORMALS_PREDICTION;
        for (a = 0; a < local.O3DGC_SC3DMC_MAX_NUM_FLOAT_ATTRIBUTES; ++a) {
            this.m_floatAttributePredMode[a] = local.O3DGC_SC3DMC_PARALLELOGRAM_PREDICTION;
        }
        for (a = 0; a < local.O3DGC_SC3DMC_MAX_NUM_INT_ATTRIBUTES; ++a) {
            this.m_intAttributePredMode[a] = local.O3DGC_SC3DMC_DIFFERENTIAL_PREDICTION;
        }
    };
    module.SC3DMCEncodeParams.prototype.GetStreamType = function () {
        return this.m_streamTypeMode;
    };
    module.SC3DMCEncodeParams.prototype.GetEncodeMode = function () {
        return this.m_encodeMode;
    };
    module.SC3DMCEncodeParams.prototype.GetNumFloatAttributes = function () {
        return this.m_numFloatAttributes;
    };
    module.SC3DMCEncodeParams.prototype.GetNumIntAttributes = function () {
        return this.m_numIntAttributes;
    };
    module.SC3DMCEncodeParams.prototype.GetCoordQuantBits = function () {
        return this.m_coordQuantBits;
    };
    module.SC3DMCEncodeParams.prototype.GetNormalQuantBits = function () {
        return this.m_normalQuantBits;
    };
    module.SC3DMCEncodeParams.prototype.GetFloatAttributeQuantBits = function (a) {
        return this.m_floatAttributeQuantBits[a];
    };
    module.SC3DMCEncodeParams.prototype.GetCoordPredMode = function () {
        return this.m_coordPredMode;
    };
    module.SC3DMCEncodeParams.prototype.GetNormalPredMode = function () {
        return this.m_normalPredMode;
    };
    module.SC3DMCEncodeParams.prototype.GetFloatAttributePredMode = function (a) {
        return this.m_floatAttributePredMode[a];
    };
    module.SC3DMCEncodeParams.prototype.GetIntAttributePredMode = function (a) {
        return this.m_intAttributePredMode[a];
    };
    module.SC3DMCEncodeParams.prototype.GetCoordPredMode = function () {
        return this.m_coordPredMode;
    };
    module.SC3DMCEncodeParams.prototype.GetNormalPredMode = function () {
        return this.m_normalPredMode;
    };
    module.SC3DMCEncodeParams.prototype.GetFloatAttributePredMode = function (a) {
        return this.m_floatAttributePredMode[a];
    };
    module.SC3DMCEncodeParams.prototype.GetIntAttributePredMode = function (a) {
        return this.m_intAttributePredMode[a];
    };
    module.SC3DMCEncodeParams.prototype.SetStreamType = function (streamTypeMode) {
        this.m_streamTypeMode = streamTypeMode;
    };
    module.SC3DMCEncodeParams.prototype.SetEncodeMode = function (encodeMode) {
        this.m_encodeMode = encodeMode;
    };
    module.SC3DMCEncodeParams.prototype.SetNumFloatAttributes = function (numFloatAttributes) {
        this.m_numFloatAttributes = numFloatAttributes;
    };
    module.SC3DMCEncodeParams.prototype.SetNumIntAttributes = function (numIntAttributes) {
        this.m_numIntAttributes = numIntAttributes;
    };
    module.SC3DMCEncodeParams.prototype.SetCoordQuantBits = function (coordQuantBits) {
        this.m_coordQuantBits = coordQuantBits;
    };
    module.SC3DMCEncodeParams.prototype.SetNormalQuantBits = function (normalQuantBits) {
        this.m_normalQuantBits = normalQuantBits;
    };
    module.SC3DMCEncodeParams.prototype.SetFloatAttributeQuantBits = function (a, q) {
        this.m_floatAttributeQuantBits[a] = q;
    };
    module.SC3DMCEncodeParams.prototype.SetCoordPredMode = function (coordPredMode) {
        this.m_coordPredMode = coordPredMode;
    };
    module.SC3DMCEncodeParams.prototype.SetNormalPredMode = function (normalPredMode) {
        this.m_normalPredMode = normalPredMode;
    };
    module.SC3DMCEncodeParams.prototype.SetFloatAttributePredMode = function (a, p) {
        this.m_floatAttributePredMode[a] = p;
    };
    module.SC3DMCEncodeParams.prototype.SetIntAttributePredMode = function (a, p) {
        this.m_intAttributePredMode[a] = p;
    };
    // AdjacencyInfo class
    module.AdjacencyInfo = function () {
        this.m_neighborsSize = 0;    // actual allocated size for m_neighbors
        this.m_numNeighborsSize = 0; // actual allocated size for m_numNeighbors
        this.m_numElements = 0;      // number of elements 
        this.m_neighbors = {};
        this.m_numNeighbors = {};
    };
    module.AdjacencyInfo.prototype.Allocate = function (numNeighborsSize, neighborsSize) {
        this.m_numElements = numNeighborsSize;
        if (neighborsSize > this.m_neighborsSize) {
            this.m_neighborsSize = neighborsSize;
            this.m_neighbors = new Int32Array(this.m_neighborsSize);
        }
        if (numNeighborsSize > this.m_numNeighborsSize) {
            this.m_numNeighborsSize = numNeighborsSize;
            this.m_numNeighbors = new Int32Array(this.m_numNeighborsSize);
        }
        return module.O3DGC_OK;
    };
    module.AdjacencyInfo.prototype.AllocateNumNeighborsArray = function (numElements) {
        if (numElements > this.m_numNeighborsSize) {
            this.m_numNeighborsSize = numElements;
            this.m_numNeighbors = new Int32Array(this.m_numNeighborsSize);
        }
        this.m_numElements = numElements;
        return module.O3DGC_OK;
    };
    module.AdjacencyInfo.prototype.AllocateNeighborsArray = function () {
        var i;
        for (i = 1; i < this.m_numElements; ++i) {
            this.m_numNeighbors[i] += this.m_numNeighbors[i - 1];
        }
        if (this.m_numNeighbors[this.m_numElements - 1] > this.m_neighborsSize) {
            this.m_neighborsSize = this.m_numNeighbors[this.m_numElements - 1];
            this.m_neighbors = new Int32Array(this.m_neighborsSize);
        }
        return module.O3DGC_OK;
    };
    module.AdjacencyInfo.prototype.ClearNumNeighborsArray = function () {
        var i;
        for (i = 0; i < this.m_numElements; ++i) {
            this.m_numNeighbors[i] = 0;
        }
        return module.O3DGC_OK;
    };
    module.AdjacencyInfo.prototype.ClearNeighborsArray = function () {
        var i;
        for (i = 0; i < this.m_neighborsSize; ++i) {
            this.m_neighbors[i] = -1;
        }
        return module.O3DGC_OK;
    };
    module.AdjacencyInfo.prototype.Begin = function (element) {
        return (element > 0) ? this.m_numNeighbors[element - 1] : 0;
    };
    module.AdjacencyInfo.prototype.End = function (element) {
        return this.m_numNeighbors[element];
    };
    module.AdjacencyInfo.prototype.AddNeighbor = function (element, neighbor) {
        var p, p0, p1;
        p0 = this.Begin(element);
        p1 = this.End(element);
        for (p = p0; p < p1; ++p) {
            if (this.m_neighbors[p] === -1) {
                this.m_neighbors[p] = neighbor;
                return module.O3DGC_OK;
            }
        }
        return module.O3DGC_ERROR_BUFFER_FULL;
    };
    module.AdjacencyInfo.prototype.GetNeighbor = function (element) {
        return this.m_neighbors[element];
    };
    module.AdjacencyInfo.prototype.GetNumNeighbors = function (element) {
        return this.End(element) - this.Begin(element);
    };
    module.AdjacencyInfo.prototype.GetNumNeighborsBuffer = function () {
        return this.m_numNeighbors;
    };
    module.AdjacencyInfo.prototype.GetNeighborsBuffer = function () {
        return this.m_neighbors;
    };
    // Vector class
    module.Vector = function () {
        this.m_data = {};
        this.m_allocated = 0;
        this.m_size = 0;
    };
    module.Vector.prototype.Clear = function () {
        this.m_size = 0;
    };
    module.Vector.prototype.Get = function (i) {
        return this.m_data[i];
    };
    module.Vector.prototype.GetAllocatedSize = function () {
        return this.m_allocated;
    };
    module.Vector.prototype.GetSize = function () {
        return this.m_size;
    };
    module.Vector.prototype.GetBuffer = function () {
        return this.m_data;
    };
    module.Vector.prototype.SetSize = function (size) {
        this.m_size = size;
    };
    module.Vector.prototype.Allocate = function (size) {
        var i, tmp_data;
        if (size > this.m_allocated) {
            this.m_allocated = size;
            tmp_data = new Int32Array(this.m_allocated);
            if (this.m_size > 0) {
                for (i = 0; i < this.m_size; ++i) {
                    tmp_data[i] = this.m_data[i];
                }
            }
            this.m_data = tmp_data;
        }
    };
    module.Vector.prototype.PushBack = function (value) {
        var i, tmp_data;
        if (this.m_size === this.m_allocated) {
            this.m_allocated *= 2;
            if (this.m_allocated < local.O3DGC_DEFAULT_VECTOR_SIZE) {
                this.m_allocated = local.O3DGC_DEFAULT_VECTOR_SIZE;
            }
            tmp_data = new Int32Array(this.m_allocated);
            if (this.m_size > 0) {
                for (i = 0; i < this.m_size; ++i) {
                    tmp_data[i] = this.m_data[i];
                }
            }
            this.m_data = tmp_data;
        }
        this.m_data[this.m_size++] = value;
    };
    // CompressedTriangleFans class
    module.CompressedTriangleFans = function () {
        this.m_numTFANs = new module.Vector();
        this.m_degrees = new module.Vector();
        this.m_configs = new module.Vector();
        this.m_operations = new module.Vector();
        this.m_indices = new module.Vector();
        this.m_trianglesOrder = new module.Vector();
        this.m_streamType = local.O3DGC_STREAM_TYPE_UNKOWN;
    };
    module.CompressedTriangleFans.prototype.GetStreamType = function () {
        return this.m_streamType;
    };
    module.CompressedTriangleFans.prototype.SetStreamType = function (streamType) {
        this.m_streamType = streamType;
    };
    module.CompressedTriangleFans.prototype.Clear = function () {
        this.m_numTFANs.Clear();
        this.m_degrees.Clear();
        this.m_configs.Clear();
        this.m_operations.Clear();
        this.m_indices.Clear();
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.Allocate = function (numVertices, numTriangles) {
        this.m_numTFANs.Allocate(numVertices);
        this.m_degrees.Allocate(2 * numVertices);
        this.m_configs.Allocate(2 * numVertices);
        this.m_operations.Allocate(2 * numVertices);
        this.m_indices.Allocate(2 * numVertices);
        this.m_trianglesOrder.Allocate(numTriangles);
        this.Clear();
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.PushNumTFans = function (numTFans) {
        this.m_numTFANs.PushBack(numTFans);
    };
    module.CompressedTriangleFans.prototype.ReadNumTFans = function (it) {
        return this.m_numTFANs.Get(it.m_count++);
    };
    module.CompressedTriangleFans.prototype.PushDegree = function (degree) {
        this.m_degrees.PushBack(degree);
    };
    module.CompressedTriangleFans.prototype.ReadDegree = function (it) {
        return this.m_degrees.Get(it.m_count++);
    };
    module.CompressedTriangleFans.prototype.PushConfig = function (config) {
        this.m_configs.PushBack(config);
    };
    module.CompressedTriangleFans.prototype.ReadConfig = function (it) {
        return this.m_configs.Get(it.m_count++);
    };
    module.CompressedTriangleFans.prototype.PushOperation = function (op) {
        this.m_operations.PushBack(op);
    };
    module.CompressedTriangleFans.prototype.ReadOperation = function (it) {
        return this.m_operations.Get(it.m_count++);
    };
    module.CompressedTriangleFans.prototype.PushIndex = function (index) {
        this.m_indices.PushBack(index);
    };
    module.CompressedTriangleFans.prototype.ReadIndex = function (it) {
        return this.m_indices.Get(it.m_count++);
    };
    module.CompressedTriangleFans.prototype.PushTriangleIndex = function (index) {
        this.m_trianglesOrder.PushBack(IntToUInt(index));
    };
    module.CompressedTriangleFans.prototype.ReadTriangleIndex = function (it) {
        return UIntToInt(this.m_trianglesOrder.Get(it.m_count++));
    };
    module.CompressedTriangleFans.prototype.LoadUIntData = function (data, bstream, it) {
        var size, i;
        bstream.ReadUInt32ASCII(it);
        size = bstream.ReadUInt32ASCII(it);
        data.Allocate(size);
        data.Clear();
        for (i = 0; i < size; ++i) {
            data.PushBack(bstream.ReadUIntASCII(it));
        }
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.LoadIntData = function (data, bstream, it) {
        var size, i;
        bstream.ReadUInt32ASCII(it);
        size = bstream.ReadUInt32ASCII(it);
        data.Allocate(size);
        data.Clear();
        for (i = 0; i < size; ++i) {
            data.PushBack(bstream.ReadIntASCII(it));
        }
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.LoadBinData = function (data, bstream, it) {
        var size, symbol, i, h;
        bstream.ReadUInt32ASCII(it);
        size = bstream.ReadUInt32ASCII(it);
        data.Allocate(size * local.O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0);
        data.Clear();
        i = 0;
        while (i < size) {
            symbol = bstream.ReadUCharASCII(it);
            for (h = 0; h < local.O3DGC_BINARY_STREAM_BITS_PER_SYMBOL0; ++h) {
                data.PushBack(symbol & 1);
                symbol >>>= 1;
                ++i;
            }
        }
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.LoadUIntAC = function (data, M, bstream, it) {

        var sizeSize, size, minValue, buffer, acd, mModelValues, i;
        sizeSize = bstream.ReadUInt32Bin(it) - 12;
        size = bstream.ReadUInt32Bin(it);
        if (size === 0) {
            return module.O3DGC_OK;
        }
        minValue = bstream.ReadUInt32Bin(it);
        buffer = bstream.GetBuffer(it, sizeSize);
        it.m_count += sizeSize;
        data.Allocate(size);
        acd = new module.ArithmeticDecoder();
        acd.SetBuffer(sizeSize, buffer);
        acd.StartDecoder();
        mModelValues = new module.AdaptiveDataModel();
        mModelValues.SetAlphabet(M + 1);
        for (i = 0; i < size; ++i) {
            data.PushBack(acd.DecodeAdaptiveDataModel(mModelValues) + minValue);
        }
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.LoadIntACEGC = function (data, M, bstream, it) {
        var sizeSize, size, minValue, buffer, acd, mModelValues, bModel0, bModel1, value, i;
        sizeSize = bstream.ReadUInt32Bin(it) - 12;
        size = bstream.ReadUInt32Bin(it);
        if (size === 0) {
            return module.O3DGC_OK;
        }
        minValue = bstream.ReadUInt32Bin(it) - local.O3DGC_MAX_LONG;
        buffer = bstream.GetBuffer(it, sizeSize);
        it.m_count += sizeSize;
        data.Allocate(size);
        acd = new module.ArithmeticDecoder();
        acd.SetBuffer(sizeSize, buffer);
        acd.StartDecoder();
        mModelValues = new module.AdaptiveDataModel();
        mModelValues.SetAlphabet(M + 2);
        bModel0 = new module.StaticBitModel();
        bModel1 = new module.AdaptiveBitModel();
        for (i = 0; i < size; ++i) {
            value = acd.DecodeAdaptiveDataModel(mModelValues);
            if (value === M) {
                value += acd.ExpGolombDecode(0, bModel0, bModel1);
            }
            data.PushBack(value + minValue);
        }
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.LoadBinAC = function (data, bstream, it) {
        var sizeSize, size, buffer, acd, bModel, i;
        sizeSize = bstream.ReadUInt32Bin(it) - 8;
        size = bstream.ReadUInt32Bin(it);
        if (size === 0) {
            return module.O3DGC_OK;
        }
        buffer = bstream.GetBuffer(it, sizeSize);
        it.m_count += sizeSize;
        data.Allocate(size);
        acd = new module.ArithmeticDecoder();
        acd.SetBuffer(sizeSize, buffer);
        acd.StartDecoder();
        bModel = new module.AdaptiveBitModel();
        for (i = 0; i < size; ++i) {
            data.PushBack(acd.DecodeAdaptiveBitModel(bModel));
        }
        return module.O3DGC_OK;
    };
    module.CompressedTriangleFans.prototype.Load = function (bstream, iterator, decodeTrianglesOrder, streamType) {
        if (streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            this.LoadUIntData(this.m_numTFANs, bstream, iterator);
            this.LoadUIntData(this.m_degrees, bstream, iterator);
            this.LoadUIntData(this.m_configs, bstream, iterator);
            this.LoadBinData(this.m_operations, bstream, iterator);
            this.LoadIntData(this.m_indices, bstream, iterator);
            if (decodeTrianglesOrder) {
                this.LoadUIntData(this.m_trianglesOrder, bstream, iterator);
            }
        } else {
            this.LoadIntACEGC(this.m_numTFANs, 4, bstream, iterator);
            this.LoadIntACEGC(this.m_degrees, 16, bstream, iterator);
            this.LoadUIntAC(this.m_configs, 10, bstream, iterator);
            this.LoadBinAC(this.m_operations, bstream, iterator);
            this.LoadIntACEGC(this.m_indices, 8, bstream, iterator);
            if (decodeTrianglesOrder) {
                this.LoadIntACEGC(this.m_trianglesOrder, 16, bstream, iterator);
            }
        }
        return module.O3DGC_OK;
    };
    // TriangleFans class
    module.TriangleFans = function () {
        this.m_verticesAllocatedSize = 0;
        this.m_sizeTFANAllocatedSize = 0;
        this.m_numTFANs = 0;
        this.m_numVertices = 0;
        this.m_sizeTFAN = {};
        this.m_vertices = {};
    };
    module.TriangleFans.prototype.Allocate = function (sizeTFAN, verticesSize) {
        this.m_numTFANs = 0;
        this.m_numVertices = 0;
        if (this.m_verticesAllocatedSize < verticesSize) {
            this.m_verticesAllocatedSize = verticesSize;
            this.m_vertices = new Int32Array(this.m_verticesAllocatedSize);
        }
        if (this.m_sizeTFANAllocatedSize < sizeTFAN) {
            this.m_sizeTFANAllocatedSize = sizeTFAN;
            this.m_sizeTFAN = new Int32Array(this.m_sizeTFANAllocatedSize);
        }
        return module.O3DGC_OK;
    };
    module.TriangleFans.prototype.Clear = function () {
        this.m_numTFANs = 0;
        this.m_numVertices = 0;
        return module.O3DGC_OK;
    };
    module.TriangleFans.prototype.AddVertex = function (vertex) {
        var i, tmp_vertices;
        ++this.m_numVertices;
        if (this.m_numVertices > this.m_verticesAllocatedSize) {
            this.m_verticesAllocatedSize *= 2;
            tmp_vertices = new Int32Array(this.m_verticesAllocatedSize);
            for (i = 0; i < this.m_numVertices; ++i) {
                tmp_vertices[i] = this.m_vertices[i];
            }
            this.m_vertices = tmp_vertices;
        }
        this.m_vertices[this.m_numVertices - 1] = vertex;
        ++this.m_sizeTFAN[this.m_numTFANs - 1];
        return module.O3DGC_OK;
    };
    module.TriangleFans.prototype.AddTFAN = function () {
        var i, tmp_sizeTFAN;
        ++this.m_numTFANs;
        if (this.m_numTFANs > this.m_sizeTFANAllocatedSize) {
            this.m_sizeTFANAllocatedSize *= 2;
            tmp_sizeTFAN = new Int32Array(this.m_sizeTFANAllocatedSize);
            for (i = 0; i < this.m_numTFANs; ++i) {
                tmp_sizeTFAN[i] = this.m_sizeTFAN[i];
            }
            this.m_sizeTFAN = tmp_sizeTFAN;
        }
        this.m_sizeTFAN[this.m_numTFANs - 1] = (this.m_numTFANs > 1) ? this.m_sizeTFAN[this.m_numTFANs - 2] : 0;
        return module.O3DGC_OK;
    };
    module.TriangleFans.prototype.Begin = function (tfan) {
        return (tfan > 0) ? this.m_sizeTFAN[tfan - 1] : 0;
    };
    module.TriangleFans.prototype.End = function (tfan) {
        return this.m_sizeTFAN[tfan];
    };
    module.TriangleFans.prototype.GetVertex = function (vertex) {
        return this.m_vertices[vertex];
    };
    module.TriangleFans.prototype.GetTFANSize = function (tfan) {
        return this.End(tfan) - this.Begin(tfan);
    };
    module.TriangleFans.prototype.GetNumTFANs = function () {
        return this.m_numTFANs;
    };
    module.TriangleFans.prototype.GetNumVertices = function () {
        return this.m_numVertices;
    };
    // TriangleListDecoder class
    module.TriangleListDecoder = function () {
        this.m_itNumTFans = new module.Iterator();
        this.m_itDegree = new module.Iterator();
        this.m_itConfig = new module.Iterator();
        this.m_itOperation = new module.Iterator();
        this.m_itIndex = new module.Iterator();
        this.m_maxNumVertices = 0;
        this.m_maxNumTriangles = 0;
        this.m_numTriangles = 0;
        this.m_numVertices = 0;
        this.m_tempTrianglesSize = 0;
        this.m_vertexCount = 0;
        this.m_triangleCount = 0;
        this.m_numConqueredTriangles = 0;
        this.m_numVisitedVertices = 0;
        this.m_triangles = {};
        this.m_tempTriangles = {};
        this.m_visitedVertices = {};
        this.m_visitedVerticesValence = {};
        this.m_vertexToTriangle = new module.AdjacencyInfo();
        this.m_ctfans = new module.CompressedTriangleFans();
        this.m_tfans = new module.TriangleFans();
        this.m_streamType = local.O3DGC_STREAM_TYPE_ASCII;
        this.m_decodeTrianglesOrder = false;
        this.m_decodeVerticesOrder = false;
        this.m_processConfig = {
            0: function (decoder, degree) { // ops: 1000001 vertices: -1 -2
                var u;
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[0]);
                for (u = 1; u < degree - 1; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[1]);
            },
            1: function (decoder, degree, focusVertex) { // ops: 1xxxxxx1 vertices: -1 x x x x x -2
                var u, op, index;
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[0]);
                for (u = 1; u < degree - 1; ++u) {
                    op = decoder.m_ctfans.ReadOperation(decoder.m_itOperation);
                    if (op === 1) {
                        index = decoder.m_ctfans.ReadIndex(decoder.m_itIndex);
                        if (index < 0) {
                            decoder.m_tfans.AddVertex(decoder.m_visitedVertices[-index - 1]);
                        } else {
                            decoder.m_tfans.AddVertex(index + focusVertex);
                        }
                    } else {
                        decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                        decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                    }
                }
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[1]);
            },
            2: function (decoder, degree) { // ops: 00000001 vertices: -1
                var u;
                for (u = 0; u < degree - 1; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[0]);
            },
            3: function (decoder, degree) { // ops: 00000001 vertices: -2
                var u;
                for (u = 0; u < degree - 1; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[1]);
            },
            4: function (decoder, degree) {// ops: 10000000 vertices: -1
                var u;
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[0]);
                for (u = 1; u < degree; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
            },
            5: function (decoder, degree) { // ops: 10000000 vertices: -2
                var u;
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[1]);
                for (u = 1; u < degree; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
            },
            6: function (decoder, degree) { // ops: 00000000 vertices:
                var u;
                for (u = 0; u < degree; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
            },
            7: function (decoder, degree) { // ops: 1000001 vertices: -2 -1
                var u;
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[1]);
                for (u = 1; u < degree - 1; ++u) {
                    decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                    decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                }
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[0]);
            },
            8: function (decoder, degree, focusVertex) { // ops: 1xxxxxx1 vertices: -2 x x x x x -1
                var u, op, index;
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[1]);
                for (u = 1; u < degree - 1; ++u) {
                    op = decoder.m_ctfans.ReadOperation(decoder.m_itOperation);
                    if (op === 1) {
                        index = decoder.m_ctfans.ReadIndex(decoder.m_itIndex);
                        if (index < 0) {
                            decoder.m_tfans.AddVertex(decoder.m_visitedVertices[-index - 1]);
                        } else {
                            decoder.m_tfans.AddVertex(index + focusVertex);
                        }
                    } else {
                        decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                        decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                    }
                }
                decoder.m_tfans.AddVertex(decoder.m_visitedVertices[0]);
            },
            9: function (decoder, degree, focusVertex) { // general case
                var u, op, index;
                for (u = 0; u < degree; ++u) {
                    op = decoder.m_ctfans.ReadOperation(decoder.m_itOperation);
                    if (op === 1) {
                        index = decoder.m_ctfans.ReadIndex(decoder.m_itIndex);
                        if (index < 0) {
                            decoder.m_tfans.AddVertex(decoder.m_visitedVertices[-index - 1]);
                        } else {
                            decoder.m_tfans.AddVertex(index + focusVertex);
                        }
                    } else {
                        decoder.m_visitedVertices[decoder.m_numVisitedVertices++] = decoder.m_vertexCount;
                        decoder.m_tfans.AddVertex(decoder.m_vertexCount++);
                    }
                }
            }
        };
    };
    module.TriangleListDecoder.prototype.GetStreamType = function () {
        return this.m_streamType;
    };
    module.TriangleListDecoder.prototype.GetReorderTriangles = function () {
        return this.m_decodeTrianglesOrder;
    };
    module.TriangleListDecoder.prototype.GetReorderVertices = function () {
        return this.m_decodeVerticesOrder;
    };
    module.TriangleListDecoder.prototype.SetStreamType = function (streamType) {
        this.m_streamType = streamType;
    };
    module.TriangleListDecoder.prototype.GetVertexToTriangle = function () {
        return this.m_vertexToTriangle;
    };
    module.TriangleListDecoder.prototype.Reorder = function () {
        var triangles, numTriangles, order, it, prevTriangleIndex, tempTriangles, t, i;
        if (this.m_decodeTrianglesOrder) {
            triangles = this.m_triangles;
            numTriangles = this.m_numTriangles;
            order = this.m_ctfans.m_trianglesOrder.m_data;
            tempTriangles = this.m_tempTriangles;
            tempTriangles.set(triangles);
            it = 0;
            prevTriangleIndex = 0;
            for (i = 0; i < numTriangles; ++i) {
                t = UIntToInt(order[it++]) + prevTriangleIndex;
                triangles[3 * t] = tempTriangles[3 * i];
                triangles[3 * t + 1] = tempTriangles[3 * i + 1];
                triangles[3 * t + 2] = tempTriangles[3 * i + 2];
                prevTriangleIndex = t + 1;
            }
        }
        return module.O3DGC_OK;
    };
    module.TriangleListDecoder.prototype.CompueLocalConnectivityInfo = function (focusVertex) {
        var visitedVertices, visitedVerticesValence, triangles, vertexToTriangle, beginV2T, endV2T, numConqueredTriangles, foundOrInserted, numVisitedVertices, tmp, i, j, k, h, x, y, t, p, v;
        visitedVertices = this.m_visitedVertices;
        visitedVerticesValence = this.m_visitedVerticesValence;
        triangles = this.m_triangles;
        vertexToTriangle = this.m_vertexToTriangle;
        beginV2T = vertexToTriangle.Begin(focusVertex);
        endV2T = vertexToTriangle.End(focusVertex);
        numConqueredTriangles = 0;
        numVisitedVertices = 0;
        t = 0;
        for (i = beginV2T; (t >= 0) && (i < endV2T); ++i) {
            t = vertexToTriangle.GetNeighbor(i);
            if (t >= 0) {
                ++numConqueredTriangles;
                p = 3 * t;
                // extract visited vertices
                for (k = 0; k < 3; ++k) {
                    v = triangles[p + k];
                    if (v > focusVertex) { // vertices are insertices by increasing traversal order
                        foundOrInserted = false;
                        for (j = 0; j < numVisitedVertices; ++j) {
                            if (v === visitedVertices[j]) {
                                visitedVerticesValence[j]++;
                                foundOrInserted = true;
                                break;
                            } else if (v < visitedVertices[j]) {
                                ++numVisitedVertices;
                                for (h = numVisitedVertices - 1; h > j; --h) {
                                    visitedVertices[h] = visitedVertices[h - 1];
                                    visitedVerticesValence[h] = visitedVerticesValence[h - 1];
                                }
                                visitedVertices[j] = v;
                                visitedVerticesValence[j] = 1;
                                foundOrInserted = true;
                                break;
                            }
                        }
                        if (!foundOrInserted) {
                            visitedVertices[numVisitedVertices] = v;
                            visitedVerticesValence[numVisitedVertices] = 1;
                            numVisitedVertices++;
                        }
                    }
                }
            }
        }
        // re-order visited vertices by taking into account their valence (i.e., # of conquered triangles incident to each vertex)
        // in order to avoid config. 9
        if (numVisitedVertices > 2) {
            for (x = 1; x < numVisitedVertices; ++x) {
                if (visitedVerticesValence[x] === 1) {
                    y = x;
                    while ((y > 0) && (visitedVerticesValence[y] < visitedVerticesValence[y - 1])) {
                        tmp = visitedVerticesValence[y];
                        visitedVerticesValence[y] = visitedVerticesValence[y - 1];
                        visitedVerticesValence[y - 1] = tmp;
                        tmp = visitedVertices[y];
                        visitedVertices[y] = visitedVertices[y - 1];
                        visitedVertices[y - 1] = tmp;
                        --y;
                    }
                }
            }
        }
        this.m_numConqueredTriangles = numConqueredTriangles;
        this.m_numVisitedVertices = numVisitedVertices;
        return module.O3DGC_OK;
    };
    module.TriangleListDecoder.prototype.DecompressTFAN = function (focusVertex) {
        var vertexToTriangle, triangles, itDegree, itConfig, tfans, ntfans, processConfig, ctfans, triangleCount, numConqueredTriangles, degree, config, k0, k1, b, c, t, f, k;
        vertexToTriangle = this.m_vertexToTriangle;
        triangles = this.m_triangles;
        itDegree = this.m_itDegree;
        itConfig = this.m_itConfig;
        tfans = this.m_tfans;
        processConfig = this.m_processConfig;
        ctfans = this.m_ctfans;
        triangleCount = this.m_triangleCount;
        numConqueredTriangles = this.m_numConqueredTriangles;
        ntfans = ctfans.ReadNumTFans(this.m_itNumTFans);
        if (ntfans > 0) {
            for (f = 0; f < ntfans; ++f) {
                tfans.AddTFAN();
                degree = ctfans.ReadDegree(itDegree) + 2 - numConqueredTriangles;
                config = ctfans.ReadConfig(itConfig);
                k0 = tfans.GetNumVertices();
                tfans.AddVertex(focusVertex);
                processConfig[config](this, degree, focusVertex);
                k1 = tfans.GetNumVertices();
                b = tfans.GetVertex(k0 + 1);
                for (k = k0 + 2; k < k1; ++k) {
                    c = tfans.GetVertex(k);
                    t = triangleCount * 3;
                    triangles[t++] = focusVertex;
                    triangles[t++] = b;
                    triangles[t] = c;
                    vertexToTriangle.AddNeighbor(focusVertex, triangleCount);
                    vertexToTriangle.AddNeighbor(b, triangleCount);
                    vertexToTriangle.AddNeighbor(c, triangleCount);
                    b = c;
                    triangleCount++;
                }
            }
        }
        this.m_triangleCount = triangleCount;
        return module.O3DGC_OK;
    };
    module.TriangleListDecoder.prototype.Decompress = function () {
        var focusVertex;
        for (focusVertex = 0; focusVertex < this.m_numVertices; ++focusVertex) {
            if (focusVertex === this.m_vertexCount) {
                this.m_vertexCount++; // insert focusVertex
            }
            this.CompueLocalConnectivityInfo(focusVertex);
            this.DecompressTFAN(focusVertex);
        }
        return module.O3DGC_OK;
    };
    module.TriangleListDecoder.prototype.Init = function (triangles, numTriangles, numVertices, maxSizeV2T) {
        var i, numNeighbors;
        this.m_numTriangles = numTriangles;
        this.m_numVertices = numVertices;
        this.m_triangles = triangles;
        this.m_vertexCount = 0;
        this.m_triangleCount = 0;
        this.m_itNumTFans.m_count = 0;
        this.m_itDegree.m_count = 0;
        this.m_itConfig.m_count = 0;
        this.m_itOperation.m_count = 0;
        this.m_itIndex.m_count = 0;
        if (this.m_numVertices > this.m_maxNumVertices) {
            this.m_maxNumVertices = this.m_numVertices;
            this.m_visitedVerticesValence = new Int32Array(this.m_numVertices);
            this.m_visitedVertices = new Int32Array(this.m_numVertices);
        }
        if (this.m_decodeTrianglesOrder && this.m_tempTrianglesSize < this.m_numTriangles) {
            this.m_tempTrianglesSize = this.m_numTriangles;
            this.m_tempTriangles = new Int32Array(3 * this.m_tempTrianglesSize);
        }
        this.m_ctfans.SetStreamType(this.m_streamType);
        this.m_ctfans.Allocate(this.m_numVertices, this.m_numTriangles);
        this.m_tfans.Allocate(2 * this.m_numVertices, 8 * this.m_numVertices);
        // compute vertex-to-triangle adjacency information
        this.m_vertexToTriangle.AllocateNumNeighborsArray(numVertices);
        numNeighbors = this.m_vertexToTriangle.GetNumNeighborsBuffer();
        for (i = 0; i < numVertices; ++i) {
            numNeighbors[i] = maxSizeV2T;
        }
        this.m_vertexToTriangle.AllocateNeighborsArray();
        this.m_vertexToTriangle.ClearNeighborsArray();
        return module.O3DGC_OK;
    };
    module.TriangleListDecoder.prototype.Decode = function (triangles, numTriangles, numVertices, bstream, it) {
        var compressionMask, maxSizeV2T;
        compressionMask = bstream.ReadUChar(it, this.m_streamType);
        this.m_decodeTrianglesOrder = ((compressionMask & 2) !== 0);
        this.m_decodeVerticesOrder = ((compressionMask & 1) !== 0);
        if (this.m_decodeVerticesOrder) { // vertices reordering not supported
            return module.O3DGC_ERROR_NON_SUPPORTED_FEATURE;
        }
        maxSizeV2T = bstream.ReadUInt32(it, this.m_streamType);
        this.Init(triangles, numTriangles, numVertices, maxSizeV2T);
        this.m_ctfans.Load(bstream, it, this.m_decodeTrianglesOrder, this.m_streamType);
        this.Decompress();
        return module.O3DGC_OK;
    };
    // SC3DMCDecoder class
    module.SC3DMCDecoder = function () {
        var i;
        this.m_iterator = new module.Iterator();
        this.m_streamSize = 0;
        this.m_params = new module.SC3DMCEncodeParams();
        this.m_triangleListDecoder = new module.TriangleListDecoder();
        this.m_quantFloatArray = {};
        this.m_orientation = {};
        this.m_normals = {};
        this.m_quantFloatArraySize = 0;
        this.m_normalsSize = 0;
        this.m_orientationSize = 0;
        this.m_stats = new module.SC3DMCStats();
        this.m_streamType = local.O3DGC_STREAM_TYPE_UNKOWN;
        this.m_neighbors = [];
        this.m_idelta = new Float32Array(local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES);
        this.m_minNormal = new Float32Array(2);
        this.m_maxNormal = new Float32Array(2);
        this.m_minNormal[0] = this.m_minNormal[1] = -2;
        this.m_maxNormal[0] = this.m_maxNormal[1] = 2;
        for (i = 0; i < local.O3DGC_SC3DMC_MAX_DIM_ATTRIBUTES; ++i) {
            this.m_neighbors[i] = new module.SC3DMCPredictor();
        }
    };
    module.SC3DMCDecoder.prototype.GetStats = function () {
        return this.m_stats;
    };
    module.SC3DMCDecoder.prototype.DecodeHeader = function (ifs, bstream) {
        var c0, start_code, mask, j, a, d;
        c0 = this.m_iterator.m_count;
        start_code = bstream.ReadUInt32(this.m_iterator, local.O3DGC_STREAM_TYPE_BINARY);
        if (start_code !== local.O3DGC_SC3DMC_START_CODE) {
            this.m_iterator.m_count = c0;
            start_code = bstream.ReadUInt32(this.m_iterator, local.O3DGC_STREAM_TYPE_ASCII);
            if (start_code !== local.O3DGC_SC3DMC_START_CODE) {
                return module.O3DGC_ERROR_CORRUPTED_STREAM;
            }
            this.m_streamType = local.O3DGC_STREAM_TYPE_ASCII;
        } else {
            this.m_streamType = local.O3DGC_STREAM_TYPE_BINARY;
        }
        this.m_streamSize = bstream.ReadUInt32(this.m_iterator, this.m_streamType);
        this.m_params.SetEncodeMode(bstream.ReadUChar(this.m_iterator, this.m_streamType));

        ifs.SetCreaseAngle(bstream.ReadFloat32(this.m_iterator, this.m_streamType));
        mask = bstream.ReadUChar(this.m_iterator, this.m_streamType);
        ifs.SetCCW((mask & 1) === 1);
        ifs.SetSolid((mask & 2) === 1);
        ifs.SetConvex((mask & 4) === 1);
        ifs.SetIsTriangularMesh((mask & 8) === 1);

        ifs.SetNCoord(bstream.ReadUInt32(this.m_iterator, this.m_streamType));
        ifs.SetNNormal(bstream.ReadUInt32(this.m_iterator, this.m_streamType));
        ifs.SetNumFloatAttributes(bstream.ReadUInt32(this.m_iterator, this.m_streamType));
        ifs.SetNumIntAttributes(bstream.ReadUInt32(this.m_iterator, this.m_streamType));

        if (ifs.GetNCoord() > 0) {
            ifs.SetNCoordIndex(bstream.ReadUInt32(this.m_iterator, this.m_streamType));
            for (j = 0; j < 3; ++j) {
                ifs.SetCoordMin(j, bstream.ReadFloat32(this.m_iterator, this.m_streamType));
                ifs.SetCoordMax(j, bstream.ReadFloat32(this.m_iterator, this.m_streamType));
            }
            this.m_params.SetCoordQuantBits(bstream.ReadUChar(this.m_iterator, this.m_streamType));
        }
        if (ifs.GetNNormal() > 0) {
            ifs.SetNNormalIndex(bstream.ReadUInt32(this.m_iterator, this.m_streamType));
            for (j = 0; j < 3; ++j) {
                ifs.SetNormalMin(j, bstream.ReadFloat32(this.m_iterator, this.m_streamType));
                ifs.SetNormalMax(j, bstream.ReadFloat32(this.m_iterator, this.m_streamType));
            }
            ifs.SetNormalPerVertex(bstream.ReadUChar(this.m_iterator, this.m_streamType) === 1);
            this.m_params.SetNormalQuantBits(bstream.ReadUChar(this.m_iterator, this.m_streamType));
        }
        for (a = 0; a < ifs.GetNumFloatAttributes(); ++a) {
            ifs.SetNFloatAttribute(a, bstream.ReadUInt32(this.m_iterator, this.m_streamType));
            if (ifs.GetNFloatAttribute(a) > 0) {
                ifs.SetNFloatAttributeIndex(a, bstream.ReadUInt32(this.m_iterator, this.m_streamType));
                d = bstream.ReadUChar(this.m_iterator, this.m_streamType);
                ifs.SetFloatAttributeDim(a, d);
                for (j = 0; j < d; ++j) {
                    ifs.SetFloatAttributeMin(a, j, bstream.ReadFloat32(this.m_iterator, this.m_streamType));
                    ifs.SetFloatAttributeMax(a, j, bstream.ReadFloat32(this.m_iterator, this.m_streamType));
                }
                ifs.SetFloatAttributePerVertex(a, bstream.ReadUChar(this.m_iterator, this.m_streamType) === 1);
                ifs.SetFloatAttributeType(a, bstream.ReadUChar(this.m_iterator, this.m_streamType));
                this.m_params.SetFloatAttributeQuantBits(a, bstream.ReadUChar(this.m_iterator, this.m_streamType));
            }
        }
        for (a = 0; a < ifs.GetNumIntAttributes(); ++a) {
            ifs.SetNIntAttribute(a, bstream.ReadUInt32(this.m_iterator, this.m_streamType));
            if (ifs.GetNIntAttribute(a) > 0) {
                ifs.SetNIntAttributeIndex(a, bstream.ReadUInt32(this.m_iterator, this.m_streamType));
                ifs.SetIntAttributeDim(a, bstream.ReadUChar(this.m_iterator, this.m_streamType));
                ifs.SetIntAttributePerVertex(a, bstream.ReadUChar(this.m_iterator, this.m_streamType) === 1);
                ifs.SetIntAttributeType(a, bstream.ReadUChar(this.m_iterator, this.m_streamType));
            }
        }
        return module.O3DGC_OK;
    };
    function DeltaPredictors(triangles, ta, v, nPred, neighbors, dimFloatArray, quantFloatArray, stride) {
        var ws, k, p, w, i, id;
        id = new module.SC3DMCTriplet(-1, -1, -1);
        for (k = 0; k < 3; ++k) {
            w = triangles[ta * 3 + k];
            if (w < v) {
                id.m_a = -1;
                id.m_b = -1;
                id.m_c = w;
                p = InsertPredictor(id, nPred, neighbors, dimFloatArray);
                if (p !== -1) {
                    ws = w * stride;
                    for (i = 0; i < dimFloatArray; ++i) {
                        neighbors[p].m_pred[i] = quantFloatArray[ws + i];
                    }
                }
            }
        }
    }
    function ParallelogramPredictors(triangles, ta, v, nPred, neighbors, dimFloatArray, quantFloatArray, stride, v2T, v2TNeighbors) {
        var ta3, tb3, as, bs, cs, a, b, c, x, i, k, u1_begin, u1_end, u1, tb, foundB, p, id;
        ta3 = ta * 3;
        id = new module.SC3DMCTriplet(-1, -1, -1);
        if (triangles[ta3] === v) {
            a = triangles[ta3 + 1];
            b = triangles[ta3 + 2];
        } else if (triangles[ta3 + 1] === v) {
            a = triangles[ta3];
            b = triangles[ta3 + 2];
        } else {
            a = triangles[ta3];
            b = triangles[ta3 + 1];
        }
        if (a < v && b < v) {
            u1_begin = v2T.Begin(a);
            u1_end = v2T.End(a);
            for (u1 = u1_begin; u1 < u1_end; ++u1) {
                tb = v2TNeighbors[u1];
                if (tb < 0) {
                    break;
                }
                tb3 = tb * 3;
                c = -1;
                foundB = false;
                for (k = 0; k < 3; ++k) {
                    x = triangles[tb3 + k];
                    if (x === b) {
                        foundB = true;
                    } else if (x < v && x !== a) {
                        c = x;
                    }
                }
                if (c !== -1 && foundB) {
                    if (a < b) {
                        id.m_a = a;
                        id.m_b = b;
                    } else {
                        id.m_a = b;
                        id.m_b = a;
                    }
                    id.m_c = (-c - 1);
                    p = InsertPredictor(id, nPred, neighbors, dimFloatArray);
                    if (p !== -1) {
                        as = a * stride;
                        bs = b * stride;
                        cs = c * stride;
                        for (i = 0; i < dimFloatArray; ++i) {
                            neighbors[p].m_pred[i] = quantFloatArray[as + i] + quantFloatArray[bs + i] - quantFloatArray[cs + i];
                        }
                    }
                }
            }
        }
    }
    module.SC3DMCDecoder.prototype.DecodeIntArrayBinary = function (intArray,
                                                                    numIntArray,
                                                                    dimIntArray,
                                                                    stride,
                                                                    ifs,
                                                                    predMode,
                                                                    bstream) {
        var testPredEnabled, bestPred, i, u, ta, u_begin, u_end, buffer, iterator, streamType, predResidual, acd, bModel0, bModel1, mModelPreds, v2T, v2TNeighbors, triangles, size, start, streamSize, mask, binarization, iteratorPred, exp_k, M, id, mModelValues, neighbors, normals, nPred, v;
        iterator = this.m_iterator;
        streamType = this.m_streamType;
        acd = new module.ArithmeticDecoder();
        bModel0 = new module.StaticBitModel();
        bModel1 = new module.AdaptiveBitModel();
        mModelPreds = new module.AdaptiveDataModel();
        mModelPreds.SetAlphabet(local.O3DGC_SC3DMC_MAX_PREDICTION_NEIGHBORS + 1);
        v2T = this.m_triangleListDecoder.GetVertexToTriangle();
        v2TNeighbors = v2T.m_neighbors;
        triangles = ifs.GetCoordIndex();
        size = numIntArray * dimIntArray;
        start = iterator.m_count;
        streamSize = bstream.ReadUInt32(iterator, streamType);        // bitsream size
        mask = bstream.ReadUChar(iterator, streamType);
        binarization = (mask >>> 4) & 7;
        predMode.m_value = mask & 7;
        streamSize -= (iterator.m_count - start);
        iteratorPred = new module.Iterator();
        iteratorPred.m_count = iterator.m_count + streamSize;
        exp_k = 0;
        M = 0;
        id = new module.SC3DMCTriplet(-1, -1, -1);
        if (binarization !== local.O3DGC_SC3DMC_BINARIZATION_AC_EGC) {
            return module.O3DGC_ERROR_CORRUPTED_STREAM;
        }
        buffer = bstream.GetBuffer(iterator, streamSize);
        iterator.m_count += streamSize;
        acd.SetBuffer(streamSize, buffer);
        acd.StartDecoder();
        exp_k = acd.ExpGolombDecode(0, bModel0, bModel1);
        M = acd.ExpGolombDecode(0, bModel0, bModel1);
        mModelValues = new module.AdaptiveDataModel();
        mModelValues.SetAlphabet(M + 2);
        neighbors = this.m_neighbors;
        normals = this.m_normals;
        nPred = new module.NumberRef();
        testPredEnabled = predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION;
        for (v = 0; v < numIntArray; ++v) {
            nPred.m_value = 0;
            if (v2T.GetNumNeighbors(v) > 0 && testPredEnabled) {
                u_begin = v2T.Begin(v);
                u_end = v2T.End(v);
                for (u = u_begin; u < u_end; ++u) {
                    ta = v2TNeighbors[u];
                    if (ta < 0) {
                        break;
                    }
                    DeltaPredictors(triangles, ta, v, nPred, neighbors, dimIntArray, intArray, stride);
                }
            }
            if (nPred.m_value > 1) {
                bestPred = acd.DecodeAdaptiveDataModel(mModelPreds);
                for (i = 0; i < dimIntArray; ++i) {
                    predResidual = acd.DecodeIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                    intArray[v * stride + i] = predResidual + neighbors[bestPred].m_pred[i];
                }
            } else if (v > 0 && predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION) {
                for (i = 0; i < dimIntArray; ++i) {
                    predResidual = acd.DecodeIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                    intArray[v * stride + i] = predResidual + intArray[(v - 1) * stride + i];
                }
            } else {
                for (i = 0; i < dimIntArray; ++i) {
                    predResidual = acd.DecodeUIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                    intArray[v * stride + i] = predResidual;
                }
            }
        }
        iterator.m_count = iteratorPred.m_count;
        return module.O3DGC_OK;
    };
    module.SC3DMCDecoder.prototype.DecodeIntArrayASCII = function (intArray,
                                                                   numIntArray,
                                                                   dimIntArray,
                                                                   stride,
                                                                   ifs,
                                                                   predMode,
                                                                   bstream) {
        var testPredEnabled, iterator, streamType, predResidual, v2T, v2TNeighbors, triangles, size, start, streamSize, mask, binarization, iteratorPred, id, neighbors, normals, nPred, v, u_begin, u_end, u, ta, i, bestPred;
        iterator = this.m_iterator;
        streamType = this.m_streamType;
        v2T = this.m_triangleListDecoder.GetVertexToTriangle();
        v2TNeighbors = v2T.m_neighbors;
        triangles = ifs.GetCoordIndex();
        size = numIntArray * dimIntArray;
        start = iterator.m_count;
        streamSize = bstream.ReadUInt32(iterator, streamType);        // bitsream size
        mask = bstream.ReadUChar(iterator, streamType);
        binarization = (mask >>> 4) & 7;
        predMode.m_value = mask & 7;
        streamSize -= (iterator.m_count - start);
        iteratorPred = new module.Iterator();
        iteratorPred.m_count = iterator.m_count + streamSize;
        id = new module.SC3DMCTriplet(-1, -1, -1);
        if (binarization !== local.O3DGC_SC3DMC_BINARIZATION_ASCII) {
            return module.O3DGC_ERROR_CORRUPTED_STREAM;
        }
        bstream.ReadUInt32(iteratorPred, streamType);        // predictors bitsream size
        neighbors = this.m_neighbors;
        normals = this.m_normals;
        nPred = new module.NumberRef();
        testPredEnabled = predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION;
        for (v = 0; v < numIntArray; ++v) {
            nPred.m_value = 0;
            if (v2T.GetNumNeighbors(v) > 0 && testPredEnabled) {
                u_begin = v2T.Begin(v);
                u_end = v2T.End(v);
                for (u = u_begin; u < u_end; ++u) {
                    ta = v2TNeighbors[u];
                    if (ta < 0) {
                        break;
                    }
                    DeltaPredictors(triangles, ta, v, nPred, neighbors, dimIntArray, intArray, stride);
                }
            }
            if (nPred.m_value > 1) {
                bestPred = bstream.ReadUCharASCII(iteratorPred);
                for (i = 0; i < dimIntArray; ++i) {
                    predResidual = bstream.ReadIntASCII(iterator);
                    intArray[v * stride + i] = predResidual + neighbors[bestPred].m_pred[i];
                }
            } else if (v > 0 && predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION) {
                for (i = 0; i < dimIntArray; ++i) {
                    predResidual = bstream.ReadIntASCII(iterator);
                    intArray[v * stride + i] = predResidual + intArray[(v - 1) * stride + i];
                }
            } else {
                for (i = 0; i < dimIntArray; ++i) {
                    predResidual = bstream.ReadUIntASCII(iterator);
                    intArray[v * stride + i] = predResidual;
                }
            }
        }
        iterator.m_count = iteratorPred.m_count;
        return module.O3DGC_OK;
    };
    module.SC3DMCDecoder.prototype.DecodeIntArray = function (intArray,
                                                              numIntArray,
                                                              dimIntArray,
                                                              stride,
                                                              ifs,
                                                              predMode,
                                                              bstream) {
        if (this.m_streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            return this.DecodeIntArrayASCII(intArray, numIntArray, dimIntArray, stride, ifs, predMode, bstream);
        }
        return this.DecodeIntArrayBinary(intArray, numIntArray, dimIntArray, stride, ifs, predMode, bstream);
    };
    function ComputeNormals(triangles, ntris, coords, nvert, normals) {
        var t3, v, n, t, a, b, c, d1, d2, n0;
        n0 = new module.Vec3();
        d1 = new module.Vec3();
        d2 = new module.Vec3();
        n = nvert * 3;
        for (v = 0; v < n; ++v) {
            normals[v] = 0;
        }
        for (t = 0; t < ntris; ++t) {
            t3 = t * 3;
            a = triangles[t3] * 3;
            b = triangles[t3 + 1] * 3;
            c = triangles[t3 + 2] * 3;
            d1.m_x = coords[b] - coords[a];
            d1.m_y = coords[b + 1] - coords[a + 1];
            d1.m_z = coords[b + 2] - coords[a + 2];
            d2.m_x = coords[c] - coords[a];
            d2.m_y = coords[c + 1] - coords[a + 1];
            d2.m_z = coords[c + 2] - coords[a + 2];
            n0.m_x = d1.m_y * d2.m_z - d1.m_z * d2.m_y;
            n0.m_y = d1.m_z * d2.m_x - d1.m_x * d2.m_z;
            n0.m_z = d1.m_x * d2.m_y - d1.m_y * d2.m_x;
            normals[a] += n0.m_x;
            normals[a + 1] += n0.m_y;
            normals[a + 2] += n0.m_z;
            normals[b] += n0.m_x;
            normals[b + 1] += n0.m_y;
            normals[b + 2] += n0.m_z;
            normals[c] += n0.m_x;
            normals[c + 1] += n0.m_y;
            normals[c + 2] += n0.m_z;
        }
    }
    module.SC3DMCDecoder.prototype.ProcessNormals = function (ifs) {
        var v3, v2, nvert, normalSize, normals, quantFloatArray, orientation, triangles, n0, n1, v, rna0, rnb0, ni1, norm0;
        nvert = ifs.GetNNormal();

        normalSize = ifs.GetNNormal() * 3;
        if (this.m_normalsSize < normalSize) {
            this.m_normalsSize = normalSize;
            this.m_normals = new Float32Array(this.m_normalsSize);
        }
        normals = this.m_normals;
        quantFloatArray = this.m_quantFloatArray;
        orientation = this.m_orientation;
        triangles = ifs.GetCoordIndex();
        ComputeNormals(triangles, ifs.GetNCoordIndex(), quantFloatArray, nvert, normals);
        n0 = new module.Vec3();
        n1 = new module.Vec3();
        for (v = 0; v < nvert; ++v) {
            v3 = 3 * v;
            n0.m_x = normals[v3];
            n0.m_y = normals[v3 + 1];
            n0.m_z = normals[v3 + 2];
            norm0 = Math.sqrt(n0.m_x * n0.m_x + n0.m_y * n0.m_y + n0.m_z * n0.m_z);
            if (norm0 === 0.0) {
                norm0 = 1.0;
            }
            SphereToCube(n0, n1);
            rna0 = n1.m_x / norm0;
            rnb0 = n1.m_y / norm0;
            ni1 = n1.m_z + orientation[v];
            orientation[v] = ni1;
            if ((ni1 >>> 1) !== (n1.m_z >>> 1)) {
                rna0 = 0.0;
                rnb0 = 0.0;
            }
            v2 = v * 2;
            normals[v2] = rna0;
            normals[v2 + 1] = rnb0;
        }
        return module.O3DGC_OK;
    };
    module.SC3DMCDecoder.prototype.IQuantize = function (floatArray,
                                                         numFloatArray,
                                                         dimFloatArray,
                                                         stride,
                                                         minFloatArray,
                                                         maxFloatArray,
                                                         nQBits,
                                                         predMode) {
        var v, nin, nout, orientation, normals, CubeToSphere;
        if (predMode.m_value === local.O3DGC_SC3DMC_SURF_NORMALS_PREDICTION) {
            CubeToSphere = local.CubeToSphere;
            orientation = this.m_orientation;
            normals = this.m_normals;
            nin = new module.Vec3(0, 0, 0);
            nout = new module.Vec3(0, 0, 0);
            this.IQuantizeFloatArray(floatArray, numFloatArray, dimFloatArray, stride, this.m_minNormal, this.m_maxNormal, nQBits + 1);
            for (v = 0; v < numFloatArray; ++v) {
                nin.m_x = floatArray[stride * v] + normals[2 * v];
                nin.m_y = floatArray[stride * v + 1] + normals[2 * v + 1];
                nin.m_z = orientation[v];
                CubeToSphere[nin.m_z](nin, nout);
                floatArray[stride * v] = nout.m_x;
                floatArray[stride * v + 1] = nout.m_y;
                floatArray[stride * v + 2] = nout.m_z;
            }
        } else {
            this.IQuantizeFloatArray(floatArray, numFloatArray, dimFloatArray, stride, minFloatArray, maxFloatArray, nQBits);
        }
    };
    module.SC3DMCDecoder.prototype.DecodeFloatArrayBinary = function (floatArray,
                                                                      numFloatArray,
                                                                      dimFloatArray,
                                                                      stride,
                                                                      minFloatArray,
                                                                      maxFloatArray,
                                                                      nQBits,
                                                                      ifs,
                                                                      predMode,
                                                                      bstream) {
        var maxNPred, testPredEnabled, testParaPredEnabled, bestPred, dModel, buffer, quantFloatArray, neighbors, normals, nPred, ta, i, v, u, u_begin, u_end, iterator, orientation, streamType, predResidual, acd, bModel0, bModel1, mModelPreds, v2T, v2TNeighbors, triangles, size, start, streamSize, mask, binarization, iteratorPred, exp_k, M, mModelValues;
        iterator = this.m_iterator;
        orientation = this.m_orientation;
        streamType = this.m_streamType;
        acd = new module.ArithmeticDecoder();
        bModel0 = new module.StaticBitModel();
        bModel1 = new module.AdaptiveBitModel();
        mModelPreds = new module.AdaptiveDataModel();
        maxNPred = local.O3DGC_SC3DMC_MAX_PREDICTION_NEIGHBORS;
        mModelPreds.SetAlphabet(maxNPred + 1);
        v2T = this.m_triangleListDecoder.GetVertexToTriangle();
        v2TNeighbors = v2T.m_neighbors;
        triangles = ifs.GetCoordIndex();
        size = numFloatArray * dimFloatArray;
        start = iterator.m_count;
        streamSize = bstream.ReadUInt32(iterator, streamType);
        mask = bstream.ReadUChar(iterator, streamType);
        binarization = (mask >>> 4) & 7;
        predMode.m_value = mask & 7;
        streamSize -= (iterator.m_count - start);
        iteratorPred = new module.Iterator();
        iteratorPred.m_count = iterator.m_count + streamSize;
        exp_k = 0;
        M = 0;
        if (binarization !== local.O3DGC_SC3DMC_BINARIZATION_AC_EGC) {
            return module.O3DGC_ERROR_CORRUPTED_STREAM;
        }
        buffer = bstream.GetBuffer(iterator, streamSize);
        iterator.m_count += streamSize;
        acd.SetBuffer(streamSize, buffer);
        acd.StartDecoder();
        exp_k = acd.ExpGolombDecode(0, bModel0, bModel1);
        M = acd.ExpGolombDecode(0, bModel0, bModel1);
        mModelValues = new module.AdaptiveDataModel();
        mModelValues.SetAlphabet(M + 2);
        if (predMode.m_value === local.O3DGC_SC3DMC_SURF_NORMALS_PREDICTION) {
            if (this.m_orientationSize < size) {
                this.m_orientationSize = size;
                this.m_orientation = new Int8Array(this.m_orientationSize);
                orientation = this.m_orientation;
            }
            dModel = new module.AdaptiveDataModel();
            dModel.SetAlphabet(12);
            for (i = 0; i < numFloatArray; ++i) {
                orientation[i] = UIntToInt(acd.DecodeAdaptiveDataModel(dModel));
            }
            this.ProcessNormals(ifs);
            dimFloatArray = 2;
        }
        if (this.m_quantFloatArraySize < size) {
            this.m_quantFloatArraySize = size;
            this.m_quantFloatArray = new Int32Array(this.m_quantFloatArraySize);
        }
        quantFloatArray = this.m_quantFloatArray;
        neighbors = this.m_neighbors;
        normals = this.m_normals;
        nPred = new module.NumberRef();
        testPredEnabled = predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION;
        testParaPredEnabled = predMode.m_value === local.O3DGC_SC3DMC_PARALLELOGRAM_PREDICTION;
        for (v = 0; v < numFloatArray; ++v) {
            nPred.m_value = 0;
            if (v2T.GetNumNeighbors(v) > 0 && testPredEnabled) {
                u_begin = v2T.Begin(v);
                u_end = v2T.End(v);
                if (testParaPredEnabled) {
                    for (u = u_begin; u < u_end; ++u) {
                        ta = v2TNeighbors[u];
                        if (ta < 0) {
                            break;
                        }
                        ParallelogramPredictors(triangles, ta, v, nPred, neighbors, dimFloatArray, quantFloatArray, stride, v2T, v2TNeighbors);
                    }
                }
                if (nPred.m_value < maxNPred) {
                    for (u = u_begin; u < u_end; ++u) {
                        ta = v2TNeighbors[u];
                        if (ta < 0) {
                            break;
                        }
                        DeltaPredictors(triangles, ta, v, nPred, neighbors, dimFloatArray, quantFloatArray, stride);
                    }
                }
            }
            if (nPred.m_value > 1) {
                bestPred = acd.DecodeAdaptiveDataModel(mModelPreds);
                for (i = 0; i < dimFloatArray; ++i) {
                    predResidual = acd.DecodeIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                    quantFloatArray[v * stride + i] = predResidual + neighbors[bestPred].m_pred[i];
                }
            } else if (v > 0 && testPredEnabled) {
                for (i = 0; i < dimFloatArray; ++i) {
                    predResidual = acd.DecodeIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                    quantFloatArray[v * stride + i] = predResidual + quantFloatArray[(v - 1) * stride + i];
                }
            } else {
                for (i = 0; i < dimFloatArray; ++i) {
                    predResidual = acd.DecodeUIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                    quantFloatArray[v * stride + i] = predResidual;
                }
            }
        }
        iterator.m_count = iteratorPred.m_count;
        this.IQuantize(floatArray, numFloatArray, dimFloatArray, stride, minFloatArray, maxFloatArray, nQBits, predMode);
        return module.O3DGC_OK;
    };
    module.SC3DMCDecoder.prototype.DecodeFloatArrayASCII = function (floatArray,
                                                                     numFloatArray,
                                                                     dimFloatArray,
                                                                     stride,
                                                                     minFloatArray,
                                                                     maxFloatArray,
                                                                     nQBits,
                                                                     ifs,
                                                                     predMode,
                                                                     bstream) {
        var maxNPred, testPredEnabled, testParaPredEnabled, iterator, orientation, streamType, predResidual, v2T, v2TNeighbors, triangles, size, start, streamSize, mask, binarization, iteratorPred, quantFloatArray, neighbors, normals, nPred, v, u, u_begin, u_end, ta, i, bestPred;
        maxNPred = local.O3DGC_SC3DMC_MAX_PREDICTION_NEIGHBORS;
        iterator = this.m_iterator;
        orientation = this.m_orientation;
        streamType = this.m_streamType;
        v2T = this.m_triangleListDecoder.GetVertexToTriangle();
        v2TNeighbors = v2T.m_neighbors;
        triangles = ifs.GetCoordIndex();
        size = numFloatArray * dimFloatArray;
        start = iterator.m_count;
        streamSize = bstream.ReadUInt32(iterator, streamType);
        mask = bstream.ReadUChar(iterator, streamType);
        binarization = (mask >>> 4) & 7;
        predMode.m_value = mask & 7;
        streamSize -= (iterator.m_count - start);
        iteratorPred = new module.Iterator();
        iteratorPred.m_count = iterator.m_count + streamSize;
        if (binarization !== local.O3DGC_SC3DMC_BINARIZATION_ASCII) {
            return module.O3DGC_ERROR_CORRUPTED_STREAM;
        }
        bstream.ReadUInt32(iteratorPred, streamType);
        if (predMode.m_value === local.O3DGC_SC3DMC_SURF_NORMALS_PREDICTION) {
            if (this.m_orientationSize < numFloatArray) {
                this.m_orientationSize = numFloatArray;
                this.m_orientation = new Int8Array(this.m_orientationSize);
                orientation = this.m_orientation;
            }
            for (i = 0; i < numFloatArray; ++i) {
                orientation[i] = bstream.ReadIntASCII(iterator);
            }
            this.ProcessNormals(ifs);
            dimFloatArray = 2;
        }
        if (this.m_quantFloatArraySize < size) {
            this.m_quantFloatArraySize = size;
            this.m_quantFloatArray = new Int32Array(this.m_quantFloatArraySize);
        }
        quantFloatArray = this.m_quantFloatArray;
        neighbors = this.m_neighbors;
        normals = this.m_normals;
        nPred = new module.NumberRef();
        testPredEnabled = predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION;
        testParaPredEnabled = predMode.m_value === local.O3DGC_SC3DMC_PARALLELOGRAM_PREDICTION;
        for (v = 0; v < numFloatArray; ++v) {
            nPred.m_value = 0;
            if (v2T.GetNumNeighbors(v) > 0 && testPredEnabled) {
                u_begin = v2T.Begin(v);
                u_end = v2T.End(v);
                if (testParaPredEnabled) {
                    for (u = u_begin; u < u_end; ++u) {
                        ta = v2TNeighbors[u];
                        if (ta < 0) {
                            break;
                        }
                        ParallelogramPredictors(triangles, ta, v, nPred, neighbors, dimFloatArray, quantFloatArray, stride, v2T, v2TNeighbors);
                    }
                }
                if (nPred.m_value < maxNPred) {
                    for (u = u_begin; u < u_end; ++u) {
                        ta = v2TNeighbors[u];
                        if (ta < 0) {
                            break;
                        }
                        DeltaPredictors(triangles, ta, v, nPred, neighbors, dimFloatArray, quantFloatArray, stride);
                    }
                }
            }
            if (nPred.m_value > 1) {
                bestPred = bstream.ReadUCharASCII(iteratorPred);
                for (i = 0; i < dimFloatArray; ++i) {
                    predResidual = bstream.ReadIntASCII(iterator);
                    quantFloatArray[v * stride + i] = predResidual + neighbors[bestPred].m_pred[i];
                }
            } else if (v > 0 && predMode.m_value !== local.O3DGC_SC3DMC_NO_PREDICTION) {
                for (i = 0; i < dimFloatArray; ++i) {
                    predResidual = bstream.ReadIntASCII(iterator);
                    quantFloatArray[v * stride + i] = predResidual + quantFloatArray[(v - 1) * stride + i];
                }
            } else {
                for (i = 0; i < dimFloatArray; ++i) {
                    predResidual = bstream.ReadUIntASCII(iterator);
                    quantFloatArray[v * stride + i] = predResidual;
                }
            }
        }
        iterator.m_count = iteratorPred.m_count;
        this.IQuantize(floatArray, numFloatArray, dimFloatArray, stride, minFloatArray, maxFloatArray, nQBits, predMode);
        return module.O3DGC_OK;
    };
    module.SC3DMCDecoder.prototype.DecodeFloatArray = function (floatArray,
                                                                numFloatArray,
                                                                dimFloatArray,
                                                                stride,
                                                                minFloatArray,
                                                                maxFloatArray,
                                                                nQBits,
                                                                ifs,
                                                                predMode,
                                                                bstream) {
        if (this.m_streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            return this.DecodeFloatArrayASCII(floatArray, numFloatArray, dimFloatArray, stride, minFloatArray, maxFloatArray, nQBits, ifs, predMode, bstream);
        }
        return this.DecodeFloatArrayBinary(floatArray, numFloatArray, dimFloatArray, stride, minFloatArray, maxFloatArray, nQBits, ifs, predMode, bstream);
    };
    module.SC3DMCDecoder.prototype.IQuantizeFloatArray = function (floatArray, numFloatArray, dimFloatArray, stride, minFloatArray, maxFloatArray, nQBits) {
        var idelta, quantFloatArray, d, r, v;
        idelta = this.m_idelta;
        quantFloatArray = this.m_quantFloatArray;
        for (d = 0; d < dimFloatArray; ++d) {
            r = maxFloatArray[d] - minFloatArray[d];
            if (r > 0.0) {
                idelta[d] = r / (((1 << nQBits) >>> 0) - 1);
            } else {
                idelta[d] = 1.0;
            }
        }
        for (v = 0; v < numFloatArray; ++v) {
            for (d = 0; d < dimFloatArray; ++d) {
                floatArray[v * stride + d] = quantFloatArray[v * stride + d] * idelta[d] + minFloatArray[d];
            }
        }
        return module.O3DGC_OK;
    };
    module.SC3DMCDecoder.prototype.DecodePlayload = function (ifs, bstream) {
        var params, iterator, stats, predMode, timer, ret, a;
        params = this.m_params;
        iterator = this.m_iterator;
        stats = this.m_stats;
        predMode = new module.NumberRef();
        timer = new module.Timer();
        ret = module.O3DGC_OK;
        this.m_triangleListDecoder.SetStreamType(this.m_streamType);
        stats.m_streamSizeCoordIndex = iterator.m_count;
        timer.Tic();
        this.m_triangleListDecoder.Decode(ifs.GetCoordIndex(), ifs.GetNCoordIndex(), ifs.GetNCoord(), bstream, iterator);
        timer.Toc();
        stats.m_timeCoordIndex = timer.GetElapsedTime();
        stats.m_streamSizeCoordIndex = iterator.m_count - stats.m_streamSizeCoordIndex;
        // decode coord
        stats.m_streamSizeCoord = iterator.m_count;
        timer.Tic();
        if (ifs.GetNCoord() > 0) {
            ret = this.DecodeFloatArray(ifs.GetCoord(), ifs.GetNCoord(), 3, 3, ifs.GetCoordMinArray(), ifs.GetCoordMaxArray(), params.GetCoordQuantBits(), ifs, predMode, bstream);
            params.SetCoordPredMode(predMode.m_value);
        }
        if (ret !== module.O3DGC_OK) {
            return ret;
        }
        timer.Toc();
        stats.m_timeCoord = timer.GetElapsedTime();
        stats.m_streamSizeCoord = iterator.m_count - stats.m_streamSizeCoord;

        // decode Normal
        stats.m_streamSizeNormal = iterator.m_count;
        timer.Tic();
        if (ifs.GetNNormal() > 0) {
            ret = this.DecodeFloatArray(ifs.GetNormal(), ifs.GetNNormal(), 3, 3, ifs.GetNormalMinArray(), ifs.GetNormalMaxArray(), params.GetNormalQuantBits(), ifs, predMode, bstream);
            params.SetNormalPredMode(predMode.m_value);
        }
        if (ret !== module.O3DGC_OK) {
            return ret;
        }
        timer.Toc();
        stats.m_timeNormal = timer.GetElapsedTime();
        stats.m_streamSizeNormal = iterator.m_count - stats.m_streamSizeNormal;

        // decode FloatAttributes
        for (a = 0; a < ifs.GetNumFloatAttributes(); ++a) {
            stats.m_streamSizeFloatAttribute[a] = iterator.m_count;
            timer.Tic();
            ret = this.DecodeFloatArray(ifs.GetFloatAttribute(a), ifs.GetNFloatAttribute(a), ifs.GetFloatAttributeDim(a), ifs.GetFloatAttributeDim(a), ifs.GetFloatAttributeMinArray(a), ifs.GetFloatAttributeMaxArray(a), params.GetFloatAttributeQuantBits(a), ifs, predMode, bstream);
            params.SetFloatAttributePredMode(a, predMode.m_value);
            timer.Toc();
            stats.m_timeFloatAttribute[a] = timer.GetElapsedTime();
            stats.m_streamSizeFloatAttribute[a] = iterator.m_count - stats.m_streamSizeFloatAttribute[a];
        }
        if (ret !== module.O3DGC_OK) {
            return ret;
        }
        // decode IntAttributes
        for (a = 0; a < ifs.GetNumIntAttributes(); ++a) {
            stats.m_streamSizeIntAttribute[a] = iterator.m_count;
            timer.Tic();
            ret = this.DecodeIntArray(ifs.GetIntAttribute(a), ifs.GetNIntAttribute(a), ifs.GetIntAttributeDim(a), ifs.GetIntAttributeDim(a), ifs, predMode, bstream);
            params.SetIntAttributePredMode(a, predMode.m_value);
            timer.Toc();
            stats.m_timeIntAttribute[a] = timer.GetElapsedTime();
            stats.m_streamSizeIntAttribute[a] = iterator.m_count - stats.m_streamSizeIntAttribute[a];
        }
        if (ret !== module.O3DGC_OK) {
            return ret;
        }
        timer.Tic();
        this.m_triangleListDecoder.Reorder();
        timer.Toc();
        stats.m_timeReorder = timer.GetElapsedTime();
        return ret;
    };
    // DVEncodeParams class
    module.DVEncodeParams = function () {
        this.m_encodeMode = local.O3DGC_DYNAMIC_VECTOR_ENCODE_MODE_LIFT;
        this.m_streamTypeMode = local.O3DGC_STREAM_TYPE_ASCII;
        this.m_quantBits = 10;
    };
    module.DVEncodeParams.prototype.GetStreamType = function () {
        return this.m_streamTypeMode;
    };
    module.DVEncodeParams.prototype.GetEncodeMode = function () {
        return this.m_encodeMode;
    };
    module.DVEncodeParams.prototype.GetQuantBits = function () {
        return this.m_quantBits;
    };
    module.DVEncodeParams.prototype.SetStreamType = function (streamTypeMode) {
        this.m_streamTypeMode = streamTypeMode;
    };
    module.DVEncodeParams.prototype.SetEncodeMode = function (encodeMode) {
        this.m_encodeMode = encodeMode;
    };
    module.DVEncodeParams.prototype.SetQuantBits = function (quantBits) {
        this.m_quantBits = quantBits;
    };
    // DynamicVector class
    module.DynamicVector = function () {
        this.m_num = 0;
        this.m_dim = 0;
        this.m_stride = 0;
        this.m_max = {};
        this.m_min = {};
        this.m_vectors = {};
    };
    module.DynamicVector.prototype.GetNVector = function () {
        return this.m_num;
    };
    module.DynamicVector.prototype.GetDimVector = function () {
        return this.m_dim;
    };
    module.DynamicVector.prototype.GetStride = function () {
        return this.m_stride;
    };
    module.DynamicVector.prototype.GetMinArray = function () {
        return this.m_min;
    };
    module.DynamicVector.prototype.GetMaxArray = function () {
        return this.m_max;
    };
    module.DynamicVector.prototype.GetVectors = function () {
        return this.m_vectors;
    };
    module.DynamicVector.prototype.GetMin = function (j) {
        return this.m_min[j];
    };
    module.DynamicVector.prototype.GetMax = function (j) {
        return this.m_max[j];
    };
    module.DynamicVector.prototype.SetNVector = function (num) {
        this.m_num = num;
    };
    module.DynamicVector.prototype.SetDimVector = function (dim) {
        this.m_dim = dim;
    };
    module.DynamicVector.prototype.SetStride = function (stride) {
        this.m_stride = stride;
    };
    module.DynamicVector.prototype.SetMinArray = function (min) {
        this.m_min = min;
    };
    module.DynamicVector.prototype.SetMaxArray = function (max) {
        this.m_max = max;
    };
    module.DynamicVector.prototype.SetMin = function (j, min) {
        this.m_min[j] = min;
    };
    module.DynamicVector.prototype.SetMax = function (j, max) {
        this.m_max[j] = max;
    };
    module.DynamicVector.prototype.SetVectors = function (vectors) {
        this.m_vectors = vectors;
    };
    // DynamicVectorDecoder class
    module.DynamicVectorDecoder = function () {
        this.m_streamSize = 0;
        this.m_maxNumVectors = 0;
        this.m_numVectors = 0;
        this.m_dimVectors = 0;
        this.m_quantVectors = {};
        this.m_iterator = new module.Iterator();
        this.m_streamType = local.O3DGC_STREAM_TYPE_UNKOWN;
        this.m_params = new module.DVEncodeParams();
    };
    module.DynamicVectorDecoder.prototype.GetStreamType = function () {
        return this.m_streamType;
    };
    module.DynamicVectorDecoder.prototype.GetIterator = function () {
        return this.m_iterator;
    };
    module.DynamicVectorDecoder.prototype.SetStreamType = function (streamType) {
        this.m_streamType = streamType;
    };
    module.DynamicVectorDecoder.prototype.SetIterator = function (iterator) {
        this.m_iterator = iterator;
    };
    module.DynamicVectorDecoder.prototype.IUpdate = function (data, shift, size) {
        var p, size1;
        size1 = size - 1;
        p = 2;
        data[shift] -= data[shift + 1] >> 1;
        while (p < size1) {
            data[shift + p] -= (data[shift + p - 1] + data[shift + p + 1] + 2) >> 2;
            p += 2;
        }
        if (p === size1) {
            data[shift + p] -= data[shift + p - 1] >> 1;
        }
        return module.O3DGC_OK;
    };
    module.DynamicVectorDecoder.prototype.IPredict = function (data, shift, size) {
        var p, size1;
        size1 = size - 1;
        p = 1;
        while (p < size1) {
            data[shift + p] += (data[shift + p - 1] + data[shift + p + 1] + 1) >> 1;
            p += 2;
        }
        if (p === size1) {
            data[shift + p] += data[shift + p - 1];
        }
        return module.O3DGC_OK;
    };
    module.DynamicVectorDecoder.prototype.Merge = function (data, shift, size) {
        var i, h, a, b, tmp;
        h = (size >> 1) + (size & 1);
        a = h - 1;
        b = h;
        while (a > 0) {
            for (i = a; i < b; i += 2) {
                tmp = data[shift + i];
                data[shift + i] = data[shift + i + 1];
                data[shift + i + 1] = tmp;
            }
            --a;
            ++b;
        }
        return module.O3DGC_OK;
    };
    module.DynamicVectorDecoder.prototype.ITransform = function (data, shift, size) {
        var n, even, k, i;
        n = size;
        even = 0;
        k = 0;
        even += ((n & 1) << k++) >>> 0;
        while (n > 1) {
            n = (n >> 1) + ((n & 1) >>> 0);
            even += ((n & 1) << k++) >>> 0;
        }
        for (i = k - 2; i >= 0; --i) {
            n = ((n << 1) >>> 0) - (((even >>> i) & 1)) >>> 0;
            this.Merge(data, shift, n);
            this.IUpdate(data, shift, n);
            this.IPredict(data, shift, n);
        }
        return module.O3DGC_OK;
    };
    module.DynamicVectorDecoder.prototype.IQuantize = function (floatArray,
                                                       numFloatArray,
                                                       dimFloatArray,
                                                       stride,
                                                       minFloatArray,
                                                       maxFloatArray,
                                                       nQBits) {
        var quantVectors, r, idelta, size, d, v;
        quantVectors = this.m_quantVectors;
        size = numFloatArray * dimFloatArray;
        for (d = 0; d < dimFloatArray; ++d) {
            r = maxFloatArray[d] - minFloatArray[d];
            if (r > 0.0) {
                idelta = r / (((1 << nQBits) >>> 0) - 1);
            } else {
                idelta = 1.0;
            }
            for (v = 0; v < numFloatArray; ++v) {
                floatArray[v * stride + d] = quantVectors[v + d * numFloatArray] * idelta + minFloatArray[d];
            }
        }
        return module.O3DGC_OK;
    };
    module.DynamicVectorDecoder.prototype.DecodeHeader = function (dynamicVector, bstream) {
        var iterator, c0, start_code, streamType;
        iterator = this.m_iterator;
        c0 = iterator.m_count;
        start_code = bstream.ReadUInt32(iterator, local.O3DGC_STREAM_TYPE_BINARY);
        if (start_code !== local.O3DGC_DV_START_CODE) {
            iterator.m_count = c0;
            start_code = bstream.ReadUInt32(iterator, local.O3DGC_STREAM_TYPE_ASCII);
            if (start_code !== local.O3DGC_DV_START_CODE) {
                return module.O3DGC_ERROR_CORRUPTED_STREAM;
            }
            this.m_streamType = local.O3DGC_STREAM_TYPE_ASCII;
        } else {
            this.m_streamType = local.O3DGC_STREAM_TYPE_BINARY;
        }
        streamType = this.m_streamType;
        this.m_streamSize = bstream.ReadUInt32(iterator, streamType);
        this.m_params.SetEncodeMode(bstream.ReadUChar(iterator, streamType));
        dynamicVector.SetNVector(bstream.ReadUInt32(iterator, streamType));
        if (dynamicVector.GetNVector() > 0) {
            dynamicVector.SetDimVector(bstream.ReadUInt32(iterator, streamType));
            this.m_params.SetQuantBits(bstream.ReadUChar(iterator, streamType));
        }
        return module.O3DGC_OK;
    };
    module.DynamicVectorDecoder.prototype.DecodePlayload = function (dynamicVector, bstream) {
        var size, iterator, streamType, ret, start, streamSize, dim, num, j, acd, bModel0, bModel1, exp_k, M, buffer, mModelValues, quantVectors, v, d;
        iterator = this.m_iterator;
        streamType = this.m_streamType;
        ret = module.O3DGC_OK;
        start = iterator.m_count;
        streamSize = bstream.ReadUInt32(iterator, streamType);
        dim = dynamicVector.GetDimVector();
        num = dynamicVector.GetNVector();
        size = dim * num;
        for (j = 0; j < dynamicVector.GetDimVector(); ++j) {
            dynamicVector.SetMin(j, bstream.ReadFloat32(iterator, streamType));
            dynamicVector.SetMax(j, bstream.ReadFloat32(iterator, streamType));
        }
        acd = new module.ArithmeticDecoder();
        bModel0 = new module.StaticBitModel();
        bModel1 = new module.AdaptiveBitModel();
        streamSize -= (iterator.m_count - start);
        exp_k = 0;
        M = 0;
        if (streamType === local.O3DGC_STREAM_TYPE_BINARY) {
            buffer = bstream.GetBuffer(iterator, streamSize);
            iterator.m_count += streamSize;
            acd.SetBuffer(streamSize, buffer);
            acd.StartDecoder();
            exp_k = acd.ExpGolombDecode(0, bModel0, bModel1);
            M = acd.ExpGolombDecode(0, bModel0, bModel1);
        }
        mModelValues = new module.AdaptiveDataModel();
        mModelValues.SetAlphabet(M + 2);
        if (this.m_maxNumVectors < size) {
            this.m_maxNumVectors = size;
            this.m_quantVectors = new Int32Array(this.m_maxNumVectors);
        }
        quantVectors = this.m_quantVectors;
        if (streamType === local.O3DGC_STREAM_TYPE_ASCII) {
            for (v = 0; v < num; ++v) {
                for (d = 0; d < dim; ++d) {
                    quantVectors[d * num + v] = bstream.ReadIntASCII(iterator);
                }
            }
        } else {
            for (v = 0; v < num; ++v) {
                for (d = 0; d < dim; ++d) {
                    quantVectors[d * num + v] = acd.DecodeIntACEGC(mModelValues, bModel0, bModel1, exp_k, M);
                }
            }
        }
        for (d = 0; d < dim; ++d) {
            this.ITransform(quantVectors, d * num, num);
        }
        this.IQuantize(dynamicVector.GetVectors(), num, dim,
                       dynamicVector.GetStride(), dynamicVector.GetMinArray(),
                       dynamicVector.GetMaxArray(), this.m_params.GetQuantBits());
        return ret;
    };

    return module;
})();


}})
;
//*/
montageDefine("f73ee10","runtime/dependencies/gl-matrix",{dependencies:[],factory:function(require,exports,module){/**
 * @fileoverview gl-matrix - High performance matrix and vector operations for WebGL
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 1.3.7
 */

/*
 * Copyright (c) 2012 Brandon Jones, Colin MacKenzie IV
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

/// 2. --> This is a modified version. quat slerp was updated.

// Updated to use a modification of the "returnExportsGlobal" pattern from https://github.com/umdjs/umd

var global = window;

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(global);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return factory(root);
        });
    } else {
        // Browser globals
        factory(root);
    }
}(this, function (root) {
    "use strict";

    // Tweak to your liking
    var FLOAT_EPSILON = 0.000001;

    var glMath = {};
    (function() {
        if (typeof(Float32Array) != 'undefined') {
            var y = new Float32Array(1);
            var i = new Int32Array(y.buffer);

            /**
             * Fast way to calculate the inverse square root,
             * see http://jsperf.com/inverse-square-root/5
             *
             * If typed arrays are not available, a slower
             * implementation will be used.
             *
             * @param {Number} number the number
             * @returns {Number} Inverse square root
             */
            glMath.invsqrt = function(number) {
              var x2 = number * 0.5;
              y[0] = number;
              var threehalfs = 1.5;

              i[0] = 0x5f3759df - (i[0] >> 1);

              var number2 = y[0];

              return number2 * (threehalfs - (x2 * number2 * number2));
            };
        } else {
            glMath.invsqrt = function(number) { return 1.0 / Math.sqrt(number); };
        }
    })();

    /**
     * @class System-specific optimal array type
     * @name MatrixArray
     */
    var MatrixArray = null;

    // explicitly sets and returns the type of array to use within glMatrix
    function setMatrixArrayType(type) {
        MatrixArray = type;
        return MatrixArray;
    }

    // auto-detects and returns the best type of array to use within glMatrix, falling
    // back to Array if typed arrays are unsupported
    function determineMatrixArrayType() {
        MatrixArray = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
        return MatrixArray;
    }

    determineMatrixArrayType();

    /**
     * @class 3 Dimensional Vector
     * @name vec3
     */
    var vec3 = {};

    /**
     * Creates a new instance of a vec3 using the default array type
     * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
     *
     * @param {vec3} [vec] vec3 containing values to initialize with
     *
     * @returns {vec3} New vec3
     */
    vec3.create = function (vec) {
        var dest = new MatrixArray(3);

        if (vec) {
            dest[0] = vec[0];
            dest[1] = vec[1];
            dest[2] = vec[2];
        } else {
            dest[0] = dest[1] = dest[2] = 0;
        }

        return dest;
    };

    /**
     * Creates a new instance of a vec3, initializing it with the given arguments
     *
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value

     * @returns {vec3} New vec3
     */
    vec3.createFrom = function (x, y, z) {
        var dest = new MatrixArray(3);

        dest[0] = x;
        dest[1] = y;
        dest[2] = z;

        return dest;
    };

    /**
     * Copies the values of one vec3 to another
     *
     * @param {vec3} vec vec3 containing values to copy
     * @param {vec3} dest vec3 receiving copied values
     *
     * @returns {vec3} dest
     */
    vec3.set = function (vec, dest) {
        dest[0] = vec[0];
        dest[1] = vec[1];
        dest[2] = vec[2];

        return dest;
    };

    /**
     * Compares two vectors for equality within a certain margin of error
     *
     * @param {vec3} a First vector
     * @param {vec3} b Second vector
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    vec3.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
            Math.abs(a[2] - b[2]) < FLOAT_EPSILON
        );
    };

    /**
     * Performs a vector addition
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.add = function (vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] += vec2[0];
            vec[1] += vec2[1];
            vec[2] += vec2[2];
            return vec;
        }

        dest[0] = vec[0] + vec2[0];
        dest[1] = vec[1] + vec2[1];
        dest[2] = vec[2] + vec2[2];
        return dest;
    };

    /**
     * Performs a vector subtraction
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.subtract = function (vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] -= vec2[0];
            vec[1] -= vec2[1];
            vec[2] -= vec2[2];
            return vec;
        }

        dest[0] = vec[0] - vec2[0];
        dest[1] = vec[1] - vec2[1];
        dest[2] = vec[2] - vec2[2];
        return dest;
    };

    /**
     * Performs a vector multiplication
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.multiply = function (vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] *= vec2[0];
            vec[1] *= vec2[1];
            vec[2] *= vec2[2];
            return vec;
        }

        dest[0] = vec[0] * vec2[0];
        dest[1] = vec[1] * vec2[1];
        dest[2] = vec[2] * vec2[2];
        return dest;
    };

    /**
     * Negates the components of a vec3
     *
     * @param {vec3} vec vec3 to negate
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.negate = function (vec, dest) {
        if (!dest) { dest = vec; }

        dest[0] = -vec[0];
        dest[1] = -vec[1];
        dest[2] = -vec[2];
        return dest;
    };

    /**
     * Multiplies the components of a vec3 by a scalar value
     *
     * @param {vec3} vec vec3 to scale
     * @param {number} val Value to scale by
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.scale = function (vec, val, dest) {
        if (!dest || vec === dest) {
            vec[0] *= val;
            vec[1] *= val;
            vec[2] *= val;
            return vec;
        }

        dest[0] = vec[0] * val;
        dest[1] = vec[1] * val;
        dest[2] = vec[2] * val;
        return dest;
    };

    /**
     * Generates a unit vector of the same direction as the provided vec3
     * If vector length is 0, returns [0, 0, 0]
     *
     * @param {vec3} vec vec3 to normalize
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.normalize = function (vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2],
            len = Math.sqrt(x * x + y * y + z * z);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        } else if (len === 1) {
            dest[0] = x;
            dest[1] = y;
            dest[2] = z;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        return dest;
    };

    /**
     * Generates the cross product of two vec3s
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.cross = function (vec, vec2, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2],
            x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];

        dest[0] = y * z2 - z * y2;
        dest[1] = z * x2 - x * z2;
        dest[2] = x * y2 - y * x2;
        return dest;
    };

    /**
     * Caclulates the length of a vec3
     *
     * @param {vec3} vec vec3 to calculate length of
     *
     * @returns {number} Length of vec
     */
    vec3.length = function (vec) {
        var x = vec[0], y = vec[1], z = vec[2];
        return Math.sqrt(x * x + y * y + z * z);
    };

    /**
     * Caclulates the squared length of a vec3
     *
     * @param {vec3} vec vec3 to calculate squared length of
     *
     * @returns {number} Squared Length of vec
     */
    vec3.squaredLength = function (vec) {
        var x = vec[0], y = vec[1], z = vec[2];
        return x * x + y * y + z * z;
    };

    /**
     * Caclulates the dot product of two vec3s
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     *
     * @returns {number} Dot product of vec and vec2
     */
    vec3.dot = function (vec, vec2) {
        return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
    };

    /**
     * Generates a unit vector pointing from one vector to another
     *
     * @param {vec3} vec Origin vec3
     * @param {vec3} vec2 vec3 to point to
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.direction = function (vec, vec2, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0] - vec2[0],
            y = vec[1] - vec2[1],
            z = vec[2] - vec2[2],
            len = Math.sqrt(x * x + y * y + z * z);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        return dest;
    };

    /**
     * Performs a linear interpolation between two vec3
     *
     * @param {vec3} vec First vector
     * @param {vec3} vec2 Second vector
     * @param {number} lerp Interpolation amount between the two inputs
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.lerp = function (vec, vec2, lerp, dest) {
        if (!dest) { dest = vec; }

        dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
        dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
        dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);

        return dest;
    };

    /**
     * Calculates the euclidian distance between two vec3
     *
     * Params:
     * @param {vec3} vec First vector
     * @param {vec3} vec2 Second vector
     *
     * @returns {number} Distance between vec and vec2
     */
    vec3.dist = function (vec, vec2) {
        var x = vec2[0] - vec[0],
            y = vec2[1] - vec[1],
            z = vec2[2] - vec[2];

        return Math.sqrt(x*x + y*y + z*z);
    };

    // Pre-allocated to prevent unecessary garbage collection
    var unprojectMat = null;
    var unprojectVec = new MatrixArray(4);
    /**
     * Projects the specified vec3 from screen space into object space
     * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
     *
     * @param {vec3} vec Screen-space vector to project
     * @param {mat4} view View matrix
     * @param {mat4} proj Projection matrix
     * @param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
     * @param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.unproject = function (vec, view, proj, viewport, dest) {
        if (!dest) { dest = vec; }

        if(!unprojectMat) {
            unprojectMat = mat4.create();
        }

        var m = unprojectMat;
        var v = unprojectVec;

        v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
        v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
        v[2] = 2.0 * vec[2] - 1.0;
        v[3] = 1.0;

        mat4.multiply(proj, view, m);
        if(!mat4.inverse(m)) { return null; }

        mat4.multiplyVec4(m, v);
        if(v[3] === 0.0) { return null; }

        dest[0] = v[0] / v[3];
        dest[1] = v[1] / v[3];
        dest[2] = v[2] / v[3];

        return dest;
    };

    var xUnitVec3 = vec3.createFrom(1,0,0);
    var yUnitVec3 = vec3.createFrom(0,1,0);
    var zUnitVec3 = vec3.createFrom(0,0,1);

    var tmpvec3 = vec3.create();
    /**
     * Generates a quaternion of rotation between two given normalized vectors
     *
     * @param {vec3} a Normalized source vector
     * @param {vec3} b Normalized target vector
     * @param {quat4} [dest] quat4 receiving operation result.
     *
     * @returns {quat4} dest if specified, a new quat4 otherwise
     */
    vec3.rotationTo = function (a, b, dest) {
        if (!dest) { dest = quat4.create(); }

        var d = vec3.dot(a, b);
        var axis = tmpvec3;
        if (d >= 1.0) {
            quat4.set(identityQuat4, dest);
        } else if (d < (0.000001 - 1.0)) {
            vec3.cross(xUnitVec3, a, axis);
            if (vec3.length(axis) < 0.000001)
                vec3.cross(yUnitVec3, a, axis);
            if (vec3.length(axis) < 0.000001)
                vec3.cross(zUnitVec3, a, axis);
            vec3.normalize(axis);
            quat4.fromAngleAxis(Math.PI, axis, dest);
        } else {
            var s = Math.sqrt((1.0 + d) * 2.0);
            var sInv = 1.0 / s;
            vec3.cross(a, b, axis);
            dest[0] = axis[0] * sInv;
            dest[1] = axis[1] * sInv;
            dest[2] = axis[2] * sInv;
            dest[3] = s * 0.5;
            quat4.normalize(dest);
        }
        if (dest[3] > 1.0) dest[3] = 1.0;
        else if (dest[3] < -1.0) dest[3] = -1.0;
        return dest;
    };

    /**
     * Returns a string representation of a vector
     *
     * @param {vec3} vec Vector to represent as a string
     *
     * @returns {string} String representation of vec
     */
    vec3.str = function (vec) {
        return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
    };

    /**
     * @class 3x3 Matrix
     * @name mat3
     */
    var mat3 = {};

    /**
     * Creates a new instance of a mat3 using the default array type
     * Any javascript array-like object containing at least 9 numeric elements can serve as a mat3
     *
     * @param {mat3} [mat] mat3 containing values to initialize with
     *
     * @returns {mat3} New mat3
     */
    mat3.create = function (mat) {
        var dest = new MatrixArray(9);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
        } else {
            dest[0] = dest[1] =
            dest[2] = dest[3] =
            dest[4] = dest[5] =
            dest[6] = dest[7] =
            dest[8] = 0;
        }

        return dest;
    };

    /**
     * Creates a new instance of a mat3, initializing it with the given arguments
     *
     * @param {number} m00
     * @param {number} m01
     * @param {number} m02
     * @param {number} m10
     * @param {number} m11
     * @param {number} m12
     * @param {number} m20
     * @param {number} m21
     * @param {number} m22

     * @returns {mat3} New mat3
     */
    mat3.createFrom = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        var dest = new MatrixArray(9);

        dest[0] = m00;
        dest[1] = m01;
        dest[2] = m02;
        dest[3] = m10;
        dest[4] = m11;
        dest[5] = m12;
        dest[6] = m20;
        dest[7] = m21;
        dest[8] = m22;

        return dest;
    };

    /**
     * Calculates the determinant of a mat3
     *
     * @param {mat3} mat mat3 to calculate determinant of
     *
     * @returns {Number} determinant of mat
     */
    mat3.determinant = function (mat) {
        var a00 = mat[0], a01 = mat[1], a02 = mat[2],
            a10 = mat[3], a11 = mat[4], a12 = mat[5],
            a20 = mat[6], a21 = mat[7], a22 = mat[8];

        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    };

    /**
     * Calculates the inverse matrix of a mat3
     *
     * @param {mat3} mat mat3 to calculate inverse of
     * @param {mat3} [dest] mat3 receiving inverse matrix. If not specified result is written to mat
     *
     * @param {mat3} dest is specified, mat otherwise, null if matrix cannot be inverted
     */
    mat3.inverse = function (mat, dest) {
        var a00 = mat[0], a01 = mat[1], a02 = mat[2],
            a10 = mat[3], a11 = mat[4], a12 = mat[5],
            a20 = mat[6], a21 = mat[7], a22 = mat[8],

            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,

            d = a00 * b01 + a01 * b11 + a02 * b21,
            id;

        if (!d) { return null; }
        id = 1 / d;

        if (!dest) { dest = mat3.create(); }

        dest[0] = b01 * id;
        dest[1] = (-a22 * a01 + a02 * a21) * id;
        dest[2] = (a12 * a01 - a02 * a11) * id;
        dest[3] = b11 * id;
        dest[4] = (a22 * a00 - a02 * a20) * id;
        dest[5] = (-a12 * a00 + a02 * a10) * id;
        dest[6] = b21 * id;
        dest[7] = (-a21 * a00 + a01 * a20) * id;
        dest[8] = (a11 * a00 - a01 * a10) * id;
        return dest;
    };

    /**
     * Performs a matrix multiplication
     *
     * @param {mat3} mat First operand
     * @param {mat3} mat2 Second operand
     * @param {mat3} [dest] mat3 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat3} dest if specified, mat otherwise
     */
    mat3.multiply = function (mat, mat2, dest) {
        if (!dest) { dest = mat; }


        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2],
            a10 = mat[3], a11 = mat[4], a12 = mat[5],
            a20 = mat[6], a21 = mat[7], a22 = mat[8],

            b00 = mat2[0], b01 = mat2[1], b02 = mat2[2],
            b10 = mat2[3], b11 = mat2[4], b12 = mat2[5],
            b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];

        dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
        dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
        dest[2] = b00 * a02 + b01 * a12 + b02 * a22;

        dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
        dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
        dest[5] = b10 * a02 + b11 * a12 + b12 * a22;

        dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
        dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
        dest[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return dest;
    };

    /**
     * Transforms the vec2 according to the given mat3.
     *
     * @param {mat3} matrix mat3 to multiply against
     * @param {vec2} vec    the vector to multiply
     * @param {vec2} [dest] an optional receiving vector. If not given, vec is used.
     *
     * @returns {vec2} The multiplication result
     **/
    mat3.multiplyVec2 = function(matrix, vec, dest) {
      if (!dest) dest = vec;
      var x = vec[0], y = vec[1];
      dest[0] = x * matrix[0] + y * matrix[3] + matrix[6];
      dest[1] = x * matrix[1] + y * matrix[4] + matrix[7];
      return dest;
    };

    /**
     * Transforms the vec3 according to the given mat3
     *
     * @param {mat3} matrix mat3 to multiply against
     * @param {vec3} vec    the vector to multiply
     * @param {vec3} [dest] an optional receiving vector. If not given, vec is used.
     *
     * @returns {vec3} The multiplication result
     **/
    mat3.multiplyVec3 = function(matrix, vec, dest) {
      if (!dest) dest = vec;
      var x = vec[0], y = vec[1], z = vec[2];
      dest[0] = x * matrix[0] + y * matrix[3] + z * matrix[6];
      dest[1] = x * matrix[1] + y * matrix[4] + z * matrix[7];
      dest[2] = x * matrix[2] + y * matrix[5] + z * matrix[8];

      return dest;
    };

    /**
     * Copies the values of one mat3 to another
     *
     * @param {mat3} mat mat3 containing values to copy
     * @param {mat3} dest mat3 receiving copied values
     *
     * @returns {mat3} dest
     */
    mat3.set = function (mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        return dest;
    };

    /**
     * Compares two matrices for equality within a certain margin of error
     *
     * @param {mat3} a First matrix
     * @param {mat3} b Second matrix
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    mat3.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
            Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
            Math.abs(a[3] - b[3]) < FLOAT_EPSILON &&
            Math.abs(a[4] - b[4]) < FLOAT_EPSILON &&
            Math.abs(a[5] - b[5]) < FLOAT_EPSILON &&
            Math.abs(a[6] - b[6]) < FLOAT_EPSILON &&
            Math.abs(a[7] - b[7]) < FLOAT_EPSILON &&
            Math.abs(a[8] - b[8]) < FLOAT_EPSILON
        );
    };

    /**
     * Sets a mat3 to an identity matrix
     *
     * @param {mat3} dest mat3 to set
     *
     * @returns dest if specified, otherwise a new mat3
     */
    mat3.identity = function (dest) {
        if (!dest) { dest = mat3.create(); }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 1;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    };

    /**
     * Transposes a mat3 (flips the values over the diagonal)
     *
     * Params:
     * @param {mat3} mat mat3 to transpose
     * @param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
     *
     * @returns {mat3} dest is specified, mat otherwise
     */
    mat3.transpose = function (mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a01 = mat[1], a02 = mat[2],
                a12 = mat[5];

            mat[1] = mat[3];
            mat[2] = mat[6];
            mat[3] = a01;
            mat[5] = mat[7];
            mat[6] = a02;
            mat[7] = a12;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[3];
        dest[2] = mat[6];
        dest[3] = mat[1];
        dest[4] = mat[4];
        dest[5] = mat[7];
        dest[6] = mat[2];
        dest[7] = mat[5];
        dest[8] = mat[8];
        return dest;
    };

    /**
     * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
     *
     * @param {mat3} mat mat3 containing values to copy
     * @param {mat4} [dest] mat4 receiving copied values
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat3.toMat4 = function (mat, dest) {
        if (!dest) { dest = mat4.create(); }

        dest[15] = 1;
        dest[14] = 0;
        dest[13] = 0;
        dest[12] = 0;

        dest[11] = 0;
        dest[10] = mat[8];
        dest[9] = mat[7];
        dest[8] = mat[6];

        dest[7] = 0;
        dest[6] = mat[5];
        dest[5] = mat[4];
        dest[4] = mat[3];

        dest[3] = 0;
        dest[2] = mat[2];
        dest[1] = mat[1];
        dest[0] = mat[0];

        return dest;
    };

    /**
     * Returns a string representation of a mat3
     *
     * @param {mat3} mat mat3 to represent as a string
     *
     * @param {string} String representation of mat
     */
    mat3.str = function (mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] +
            ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] +
            ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ']';
    };

    /**
     * @class 4x4 Matrix
     * @name mat4
     */
    var mat4 = {};

    /**
     * Creates a new instance of a mat4 using the default array type
     * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
     *
     * @param {mat4} [mat] mat4 containing values to initialize with
     *
     * @returns {mat4} New mat4
     */
    mat4.create = function (mat) {
        var dest = new MatrixArray(16);
        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        return dest;
    };

    /**
     * Creates a new instance of a mat4, initializing it with the given arguments
     *
     * @param {number} m00
     * @param {number} m01
     * @param {number} m02
     * @param {number} m03
     * @param {number} m10
     * @param {number} m11
     * @param {number} m12
     * @param {number} m13
     * @param {number} m20
     * @param {number} m21
     * @param {number} m22
     * @param {number} m23
     * @param {number} m30
     * @param {number} m31
     * @param {number} m32
     * @param {number} m33

     * @returns {mat4} New mat4
     */
    mat4.createFrom = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        var dest = new MatrixArray(16);

        dest[0] = m00;
        dest[1] = m01;
        dest[2] = m02;
        dest[3] = m03;
        dest[4] = m10;
        dest[5] = m11;
        dest[6] = m12;
        dest[7] = m13;
        dest[8] = m20;
        dest[9] = m21;
        dest[10] = m22;
        dest[11] = m23;
        dest[12] = m30;
        dest[13] = m31;
        dest[14] = m32;
        dest[15] = m33;

        return dest;
    };

    /**
     * Copies the values of one mat4 to another
     *
     * @param {mat4} mat mat4 containing values to copy
     * @param {mat4} dest mat4 receiving copied values
     *
     * @returns {mat4} dest
     */
    mat4.set = function (mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };

    /**
     * Compares two matrices for equality within a certain margin of error
     *
     * @param {mat4} a First matrix
     * @param {mat4} b Second matrix
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    mat4.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
            Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
            Math.abs(a[3] - b[3]) < FLOAT_EPSILON &&
            Math.abs(a[4] - b[4]) < FLOAT_EPSILON &&
            Math.abs(a[5] - b[5]) < FLOAT_EPSILON &&
            Math.abs(a[6] - b[6]) < FLOAT_EPSILON &&
            Math.abs(a[7] - b[7]) < FLOAT_EPSILON &&
            Math.abs(a[8] - b[8]) < FLOAT_EPSILON &&
            Math.abs(a[9] - b[9]) < FLOAT_EPSILON &&
            Math.abs(a[10] - b[10]) < FLOAT_EPSILON &&
            Math.abs(a[11] - b[11]) < FLOAT_EPSILON &&
            Math.abs(a[12] - b[12]) < FLOAT_EPSILON &&
            Math.abs(a[13] - b[13]) < FLOAT_EPSILON &&
            Math.abs(a[14] - b[14]) < FLOAT_EPSILON &&
            Math.abs(a[15] - b[15]) < FLOAT_EPSILON
        );
    };

    /**
     * Sets a mat4 to an identity matrix
     *
     * @param {mat4} dest mat4 to set
     *
     * @returns {mat4} dest
     */
    mat4.identity = function (dest) {
        if (!dest) { dest = mat4.create(); }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 1;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    };

    /**
     * Transposes a mat4 (flips the values over the diagonal)
     *
     * @param {mat4} mat mat4 to transpose
     * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
     *
     * @param {mat4} dest is specified, mat otherwise
     */
    mat4.transpose = function (mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a01 = mat[1], a02 = mat[2], a03 = mat[3],
                a12 = mat[6], a13 = mat[7],
                a23 = mat[11];

            mat[1] = mat[4];
            mat[2] = mat[8];
            mat[3] = mat[12];
            mat[4] = a01;
            mat[6] = mat[9];
            mat[7] = mat[13];
            mat[8] = a02;
            mat[9] = a12;
            mat[11] = mat[14];
            mat[12] = a03;
            mat[13] = a13;
            mat[14] = a23;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[4];
        dest[2] = mat[8];
        dest[3] = mat[12];
        dest[4] = mat[1];
        dest[5] = mat[5];
        dest[6] = mat[9];
        dest[7] = mat[13];
        dest[8] = mat[2];
        dest[9] = mat[6];
        dest[10] = mat[10];
        dest[11] = mat[14];
        dest[12] = mat[3];
        dest[13] = mat[7];
        dest[14] = mat[11];
        dest[15] = mat[15];
        return dest;
    };

    /**
     * Calculates the determinant of a mat4
     *
     * @param {mat4} mat mat4 to calculate determinant of
     *
     * @returns {number} determinant of mat
     */
    mat4.determinant = function (mat) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

        return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
                a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
                a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
                a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
                a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
                a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
    };

    /**
     * Calculates the inverse matrix of a mat4
     *
     * @param {mat4} mat mat4 to calculate inverse of
     * @param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat
     *
     * @param {mat4} dest is specified, mat otherwise, null if matrix cannot be inverted
     */
    mat4.inverse = function (mat, dest) {
        if (!dest) { dest = mat; }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
            invDet;

            // Calculate the determinant
            if (!d) { return null; }
            invDet = 1 / d;

        dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return dest;
    };

    /**
     * Copies the upper 3x3 elements of a mat4 into another mat4
     *
     * @param {mat4} mat mat4 containing values to copy
     * @param {mat4} [dest] mat4 receiving copied values
     *
     * @returns {mat4} dest is specified, a new mat4 otherwise
     */
    mat4.toRotationMat = function (mat, dest) {
        if (!dest) { dest = mat4.create(); }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;

        return dest;
    };

    /**
     * Copies the upper 3x3 elements of a mat4 into a mat3
     *
     * @param {mat4} mat mat4 containing values to copy
     * @param {mat3} [dest] mat3 receiving copied values
     *
     * @returns {mat3} dest is specified, a new mat3 otherwise
     */
    mat4.toMat3 = function (mat, dest) {
        if (!dest) { dest = mat3.create(); }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[4];
        dest[4] = mat[5];
        dest[5] = mat[6];
        dest[6] = mat[8];
        dest[7] = mat[9];
        dest[8] = mat[10];

        return dest;
    };

    /**
     * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
     * The resulting matrix is useful for calculating transformed normals
     *
     * Params:
     * @param {mat4} mat mat4 containing values to invert and copy
     * @param {mat3} [dest] mat3 receiving values
     *
     * @returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
     */
    mat4.toInverseMat3 = function (mat, dest) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2],
            a10 = mat[4], a11 = mat[5], a12 = mat[6],
            a20 = mat[8], a21 = mat[9], a22 = mat[10],

            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,

            d = a00 * b01 + a01 * b11 + a02 * b21,
            id;

        if (!d) { return null; }
        id = 1 / d;

        if (!dest) { dest = mat3.create(); }

        dest[0] = b01 * id;
        dest[1] = (-a22 * a01 + a02 * a21) * id;
        dest[2] = (a12 * a01 - a02 * a11) * id;
        dest[3] = b11 * id;
        dest[4] = (a22 * a00 - a02 * a20) * id;
        dest[5] = (-a12 * a00 + a02 * a10) * id;
        dest[6] = b21 * id;
        dest[7] = (-a21 * a00 + a01 * a20) * id;
        dest[8] = (a11 * a00 - a01 * a10) * id;

        return dest;
    };

    /**
     * Performs a matrix multiplication
     *
     * @param {mat4} mat First operand
     * @param {mat4} mat2 Second operand
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.multiply = function (mat, mat2, dest) {
        if (!dest) { dest = mat; }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
        var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
        var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
        var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

        // Cache only the current line of the second matrix
        var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
        dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = mat2[4];
        b1 = mat2[5];
        b2 = mat2[6];
        b3 = mat2[7];
        dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = mat2[8];
        b1 = mat2[9];
        b2 = mat2[10];
        b3 = mat2[11];
        dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = mat2[12];
        b1 = mat2[13];
        b2 = mat2[14];
        b3 = mat2[15];
        dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        return dest;
    };


    mat4.multiply3 = function (mat, mat2, dest) {
        if (!dest) { dest = mat; }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
        var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
        var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
        var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

        // Cache only the current line of the second matrix
        var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 =0;
        dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = mat2[4];
        b1 = mat2[5];
        b2 = mat2[6];
        b3 = 0;
        dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = mat2[8];
        b1 = mat2[9];
        b2 = mat2[10];
        b3 =0;
        dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        return dest;
    };

    /**
     * Transforms a vec3 with the given matrix
     * 4th vector component is implicitly '1'
     *
     * @param {mat4} mat mat4 to transform the vector with
     * @param {vec3} vec vec3 to transform
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    mat4.multiplyVec3 = function (mat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];

        return dest;
    };

    mat4.rotateVec3 = function (mat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z ;
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z ;
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z ;

        return dest;
    };


    /**
     * Transforms a vec4 with the given matrix
     *
     * @param {mat4} mat mat4 to transform the vector with
     * @param {vec4} vec vec4 to transform
     * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec4} dest if specified, vec otherwise
     */
    mat4.multiplyVec4 = function (mat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2], w = vec[3];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
        dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;

        return dest;
    };

    /**
     * Translates a matrix by the given vector
     *
     * @param {mat4} mat mat4 to translate
     * @param {vec3} vec vec3 specifying the translation
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.translate = function (mat, vec, dest) {
        var x = vec[0], y = vec[1], z = vec[2],
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23;

        if (!dest || mat === dest) {
            mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
            mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
            mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
            mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            return mat;
        }

        a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
        a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
        a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

        dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
        dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
        dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;

        dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
        dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
        dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
        dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
        return dest;
    };

    /**
     * Scales a matrix by the given vector
     *
     * @param {mat4} mat mat4 to scale
     * @param {vec3} vec vec3 specifying the scale for each axis
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @param {mat4} dest if specified, mat otherwise
     */
    mat4.scale = function (mat, vec, dest) {
        var x = vec[0], y = vec[1], z = vec[2];

        if (!dest || mat === dest) {
            mat[0] *= x;
            mat[1] *= x;
            mat[2] *= x;
            mat[3] *= x;
            mat[4] *= y;
            mat[5] *= y;
            mat[6] *= y;
            mat[7] *= y;
            mat[8] *= z;
            mat[9] *= z;
            mat[10] *= z;
            mat[11] *= z;
            return mat;
        }

        dest[0] = mat[0] * x;
        dest[1] = mat[1] * x;
        dest[2] = mat[2] * x;
        dest[3] = mat[3] * x;
        dest[4] = mat[4] * y;
        dest[5] = mat[5] * y;
        dest[6] = mat[6] * y;
        dest[7] = mat[7] * y;
        dest[8] = mat[8] * z;
        dest[9] = mat[9] * z;
        dest[10] = mat[10] * z;
        dest[11] = mat[11] * z;
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the specified axis
     * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {vec3} axis vec3 representing the axis to rotate around
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotate = function (mat, angle, axis, dest) {
        var x = axis[0], y = axis[1], z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s, c, t,
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            b00, b01, b02,
            b10, b11, b12,
            b20, b21, b22;

        if (!len) {
            return null;
        }

        if (len !== 1) {
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
        }

        s = Math.sin(angle);
        c = Math.cos(angle);
        t = 1 - c;

        a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
        a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
        a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

        // Construct the elements of the rotation matrix
        b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
        b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
        b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform rotation-specific matrix multiplication
        dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
        dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
        dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
        dest[3] = a03 * b00 + a13 * b01 + a23 * b02;

        dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
        dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
        dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
        dest[7] = a03 * b10 + a13 * b11 + a23 * b12;

        dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
        dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
        dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
        dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the X axis
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotateX = function (mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11];

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[4] = a10 * c + a20 * s;
        dest[5] = a11 * c + a21 * s;
        dest[6] = a12 * c + a22 * s;
        dest[7] = a13 * c + a23 * s;

        dest[8] = a10 * -s + a20 * c;
        dest[9] = a11 * -s + a21 * c;
        dest[10] = a12 * -s + a22 * c;
        dest[11] = a13 * -s + a23 * c;
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the Y axis
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotateY = function (mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11];

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[0] = a00 * c + a20 * -s;
        dest[1] = a01 * c + a21 * -s;
        dest[2] = a02 * c + a22 * -s;
        dest[3] = a03 * c + a23 * -s;

        dest[8] = a00 * s + a20 * c;
        dest[9] = a01 * s + a21 * c;
        dest[10] = a02 * s + a22 * c;
        dest[11] = a03 * s + a23 * c;
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the Z axis
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotateZ = function (mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7];

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[0] = a00 * c + a10 * s;
        dest[1] = a01 * c + a11 * s;
        dest[2] = a02 * c + a12 * s;
        dest[3] = a03 * c + a13 * s;

        dest[4] = a00 * -s + a10 * c;
        dest[5] = a01 * -s + a11 * c;
        dest[6] = a02 * -s + a12 * c;
        dest[7] = a03 * -s + a13 * c;

        return dest;
    };

    /**
     * Generates a frustum matrix with the given bounds
     *
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.frustum = function (left, right, bottom, top, near, far, dest) {
        if (!dest) { dest = mat4.create(); }
        var rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);
        dest[0] = (near * 2) / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = (near * 2) / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = (right + left) / rl;
        dest[9] = (top + bottom) / tb;
        dest[10] = -(far + near) / fn;
        dest[11] = -1;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = -(far * near * 2) / fn;
        dest[15] = 0;
        return dest;
    };

    /**
     * Generates a perspective projection matrix with the given bounds
     *
     * @param {number} fovy Vertical field of view
     * @param {number} aspect Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.perspective = function (fovy, aspect, near, far, dest) {
        var top = near * Math.tan(fovy * Math.PI / 360.0),
            right = top * aspect;
        return mat4.frustum(-right, right, -top, top, near, far, dest);
    };

    /**
     * Generates a orthogonal projection matrix with the given bounds
     *
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.ortho = function (left, right, bottom, top, near, far, dest) {
        if (!dest) { dest = mat4.create(); }
        var rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);
        dest[0] = 2 / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 2 / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = -2 / fn;
        dest[11] = 0;
        dest[12] = -(left + right) / rl;
        dest[13] = -(top + bottom) / tb;
        dest[14] = -(far + near) / fn;
        dest[15] = 1;
        return dest;
    };

    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis
     *
     * @param {vec3} eye Position of the viewer
     * @param {vec3} center Point the viewer is looking at
     * @param {vec3} up vec3 pointing "up"
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.lookAt = function (eye, center, up, dest) {
        if (!dest) { dest = mat4.create(); }

        var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
            eyex = eye[0],
            eyey = eye[1],
            eyez = eye[2],
            upx = up[0],
            upy = up[1],
            upz = up[2],
            centerx = center[0],
            centery = center[1],
            centerz = center[2];

        if (eyex === centerx && eyey === centery && eyez === centerz) {
            return mat4.identity(dest);
        }

        //vec3.direction(eye, center, z);
        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;

        // normalize (no check needed for 0 because of early return)
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        //vec3.normalize(vec3.cross(up, z, x));
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        //vec3.normalize(vec3.cross(z, x, y));
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        dest[0] = x0;
        dest[1] = y0;
        dest[2] = z0;
        dest[3] = 0;
        dest[4] = x1;
        dest[5] = y1;
        dest[6] = z1;
        dest[7] = 0;
        dest[8] = x2;
        dest[9] = y2;
        dest[10] = z2;
        dest[11] = 0;
        dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        dest[15] = 1;

        return dest;
    };

    /**
     * Creates a matrix from a quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     var quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *
     * @param {quat4} quat Rotation quaternion
     * @param {vec3} vec Translation vector
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.fromRotationTranslation = function (quat, vec, dest) {
        if (!dest) { dest = mat4.create(); }

        // Quaternion math
        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;
        dest[3] = 0;
        dest[4] = xy - wz;
        dest[5] = 1 - (xx + zz);
        dest[6] = yz + wx;
        dest[7] = 0;
        dest[8] = xz + wy;
        dest[9] = yz - wx;
        dest[10] = 1 - (xx + yy);
        dest[11] = 0;
        dest[12] = vec[0];
        dest[13] = vec[1];
        dest[14] = vec[2];
        dest[15] = 1;

        return dest;
    };

    /**
     * Returns a string representation of a mat4
     *
     * @param {mat4} mat mat4 to represent as a string
     *
     * @returns {string} String representation of mat
     */
    mat4.str = function (mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] +
            ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] +
            ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] +
            ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
    };

    /**
     * @class Quaternion
     * @name quat4
     */
    var quat4 = {};

    /**
     * Creates a new instance of a quat4 using the default array type
     * Any javascript array containing at least 4 numeric elements can serve as a quat4
     *
     * @param {quat4} [quat] quat4 containing values to initialize with
     *
     * @returns {quat4} New quat4
     */
    quat4.create = function (quat) {
        var dest = new MatrixArray(4);

        if (quat) {
            dest[0] = quat[0];
            dest[1] = quat[1];
            dest[2] = quat[2];
            dest[3] = quat[3];
        } else {
            dest[0] = dest[1] = dest[2] = dest[3] = 0;
        }

        return dest;
    };

    /**
     * Creates a new instance of a quat4, initializing it with the given arguments
     *
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value
     * @param {number} w W value

     * @returns {quat4} New quat4
     */
    quat4.createFrom = function (x, y, z, w) {
        var dest = new MatrixArray(4);

        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = w;

        return dest;
    };

    /**
     * Copies the values of one quat4 to another
     *
     * @param {quat4} quat quat4 containing values to copy
     * @param {quat4} dest quat4 receiving copied values
     *
     * @returns {quat4} dest
     */
    quat4.set = function (quat, dest) {
        dest[0] = quat[0];
        dest[1] = quat[1];
        dest[2] = quat[2];
        dest[3] = quat[3];

        return dest;
    };

    /**
     * Compares two quaternions for equality within a certain margin of error
     *
     * @param {quat4} a First vector
     * @param {quat4} b Second vector
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    quat4.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
            Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
            Math.abs(a[3] - b[3]) < FLOAT_EPSILON
        );
    };

    /**
     * Creates a new identity Quat4
     *
     * @param {quat4} [dest] quat4 receiving copied values
     *
     * @returns {quat4} dest is specified, new quat4 otherwise
     */
    quat4.identity = function (dest) {
        if (!dest) { dest = quat4.create(); }
        dest[0] = 0;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 1;
        return dest;
    };

    var identityQuat4 = quat4.identity();

    /**
     * Calculates the W component of a quat4 from the X, Y, and Z components.
     * Assumes that quaternion is 1 unit in length.
     * Any existing W component will be ignored.
     *
     * @param {quat4} quat quat4 to calculate W component of
     * @param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.calculateW = function (quat, dest) {
        var x = quat[0], y = quat[1], z = quat[2];

        if (!dest || quat === dest) {
            quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return quat;
        }
        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return dest;
    };

    /**
     * Calculates the dot product of two quaternions
     *
     * @param {quat4} quat First operand
     * @param {quat4} quat2 Second operand
     *
     * @return {number} Dot product of quat and quat2
     */
    quat4.dot = function(quat, quat2){
        return quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
    };

    /**
     * Calculates the inverse of a quat4
     *
     * @param {quat4} quat quat4 to calculate inverse of
     * @param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.inverse = function(quat, dest) {
        var q0 = quat[0], q1 = quat[1], q2 = quat[2], q3 = quat[3],
            dot = q0*q0 + q1*q1 + q2*q2 + q3*q3,
            invDot = dot ? 1.0/dot : 0;

        // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

        if(!dest || quat === dest) {
            quat[0] *= -invDot;
            quat[1] *= -invDot;
            quat[2] *= -invDot;
            quat[3] *= invDot;
            return quat;
        }
        dest[0] = -quat[0]*invDot;
        dest[1] = -quat[1]*invDot;
        dest[2] = -quat[2]*invDot;
        dest[3] = quat[3]*invDot;
        return dest;
    };


    /**
     * Calculates the conjugate of a quat4
     * If the quaternion is normalized, this function is faster than quat4.inverse and produces the same result.
     *
     * @param {quat4} quat quat4 to calculate conjugate of
     * @param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.conjugate = function (quat, dest) {
        if (!dest || quat === dest) {
            quat[0] *= -1;
            quat[1] *= -1;
            quat[2] *= -1;
            return quat;
        }
        dest[0] = -quat[0];
        dest[1] = -quat[1];
        dest[2] = -quat[2];
        dest[3] = quat[3];
        return dest;
    };

    /**
     * Calculates the length of a quat4
     *
     * Params:
     * @param {quat4} quat quat4 to calculate length of
     *
     * @returns Length of quat
     */
    quat4.length = function (quat) {
        var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    };

    /**
     * Generates a unit quaternion of the same direction as the provided quat4
     * If quaternion length is 0, returns [0, 0, 0, 0]
     *
     * @param {quat4} quat quat4 to normalize
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.normalize = function (quat, dest) {
        if (!dest) { dest = quat; }

        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            len = Math.sqrt(x * x + y * y + z * z + w * w);
        if (len === 0) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 0;
            return dest;
        }
        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        dest[3] = w * len;

        return dest;
    };

    /**
     * Performs quaternion addition
     *
     * @param {quat4} quat First operand
     * @param {quat4} quat2 Second operand
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.add = function (quat, quat2, dest) {
        if(!dest || quat === dest) {
            quat[0] += quat2[0];
            quat[1] += quat2[1];
            quat[2] += quat2[2];
            quat[3] += quat2[3];
            return quat;
        }
        dest[0] = quat[0]+quat2[0];
        dest[1] = quat[1]+quat2[1];
        dest[2] = quat[2]+quat2[2];
        dest[3] = quat[3]+quat2[3];
        return dest;
    };

    /**
     * Performs a quaternion multiplication
     *
     * @param {quat4} quat First operand
     * @param {quat4} quat2 Second operand
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.multiply = function (quat, quat2, dest) {
        if (!dest) { dest = quat; }

        var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3],
            qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];

        dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return dest;
    };

    /**
     * Transforms a vec3 with the given quaternion
     *
     * @param {quat4} quat quat4 to transform the vector with
     * @param {vec3} vec vec3 to transform
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns dest if specified, vec otherwise
     */
    quat4.multiplyVec3 = function (quat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2],
            qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3],

            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat
        dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return dest;
    };

    /**
     * Multiplies the components of a quaternion by a scalar value
     *
     * @param {quat4} quat to scale
     * @param {number} val Value to scale by
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.scale = function (quat, val, dest) {
        if(!dest || quat === dest) {
            quat[0] *= val;
            quat[1] *= val;
            quat[2] *= val;
            quat[3] *= val;
            return quat;
        }
        dest[0] = quat[0]*val;
        dest[1] = quat[1]*val;
        dest[2] = quat[2]*val;
        dest[3] = quat[3]*val;
        return dest;
    };

    /**
     * Calculates a 3x3 matrix from the given quat4
     *
     * @param {quat4} quat quat4 to create matrix from
     * @param {mat3} [dest] mat3 receiving operation result
     *
     * @returns {mat3} dest if specified, a new mat3 otherwise
     */
    quat4.toMat3 = function (quat, dest) {
        if (!dest) { dest = mat3.create(); }

        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;

        dest[3] = xy - wz;
        dest[4] = 1 - (xx + zz);
        dest[5] = yz + wx;

        dest[6] = xz + wy;
        dest[7] = yz - wx;
        dest[8] = 1 - (xx + yy);

        return dest;
    };

    /**
     * Calculates a 4x4 matrix from the given quat4
     *
     * @param {quat4} quat quat4 to create matrix from
     * @param {mat4} [dest] mat4 receiving operation result
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    quat4.toMat4 = function (quat, dest) {
        if (!dest) { dest = mat4.create(); }

        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;
        dest[3] = 0;

        dest[4] = xy - wz;
        dest[5] = 1 - (xx + zz);
        dest[6] = yz + wx;
        dest[7] = 0;

        dest[8] = xz + wy;
        dest[9] = yz - wx;
        dest[10] = 1 - (xx + yy);
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;

        return dest;
    };

    /**
     * Performs a spherical linear interpolation between two quat4
     *
     * @param {quat4} quat First quaternion
     * @param {quat4} quat2 Second quaternion
     * @param {number} slerp Interpolation amount between the two inputs
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.slerp = function (quat, quat2, slerp, dest) {
        if (!dest) { dest = quat; }

        var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
            halfTheta,
            sinHalfTheta,
            ratioA,
            ratioB;

        var sign = 1;
        if (cosHalfTheta < 0) {
            cosHalfTheta = -cosHalfTheta;
            sign = -1;
        }

        if (Math.abs(cosHalfTheta) >= 1.0) {
            if (dest !== quat) {
                dest[0] = quat[0];
                dest[1] = quat[1];
                dest[2] = quat[2];
                dest[3] = quat[3];
            }
            return dest;
        }
        halfTheta = Math.acos(cosHalfTheta);
        sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        if (Math.abs(sinHalfTheta) < 0.001) {
            dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
            dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
            dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
            dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
            return dest;
        }
        ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
        ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;

        dest[0] = (quat[0] * ratioA + quat2[0] * sign * ratioB);
        dest[1] = (quat[1] * ratioA + quat2[1] * sign * ratioB);
        dest[2] = (quat[2] * ratioA + quat2[2] * sign * ratioB);
        dest[3] = (quat[3] * ratioA + quat2[3] * sign * ratioB);

        return dest;
    };

    /**
     * Creates a quaternion from the given 3x3 rotation matrix.
     * If dest is omitted, a new quaternion will be created.
     *
     * @param {mat3}  mat    the rotation matrix
     * @param {quat4} [dest] an optional receiving quaternion
     *
     * @returns {quat4} the quaternion constructed from the rotation matrix
     *
     */
    quat4.fromRotationMatrix = function(mat1, dest) {
        if (!dest) dest = quat4.create();

        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        var mat = mat3.create();
        mat3.transpose(mat1, mat);

        var fTrace = mat[0] + mat[4] + mat[8];
        var fRoot;

        if ( fTrace > 0.0 ) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0);  // 2w
            dest[3] = 0.5 * fRoot;
            fRoot = 0.5/fRoot;  // 1/(4w)
            dest[0] = (mat[7]-mat[5])*fRoot;
            dest[1] = (mat[2]-mat[6])*fRoot;
            dest[2] = (mat[3]-mat[1])*fRoot;
        } else {
            // |w| <= 1/2
            var s_iNext = quat4.fromRotationMatrix.s_iNext = quat4.fromRotationMatrix.s_iNext || [1,2,0];
            var i = 0;
            if ( mat[4] > mat[0] )
              i = 1;
            if ( mat[8] > mat[i*3+i] )
              i = 2;
            var j = s_iNext[i];
            var k = s_iNext[j];

            fRoot = Math.sqrt(mat[i*3+i]-mat[j*3+j]-mat[k*3+k] + 1.0);
            dest[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            dest[3] = (mat[k*3+j] - mat[j*3+k]) * fRoot;
            dest[j] = (mat[j*3+i] + mat[i*3+j]) * fRoot;
            dest[k] = (mat[k*3+i] + mat[i*3+k]) * fRoot;
        }

        return dest;
    };

    /**
     * Alias. See the description for quat4.fromRotationMatrix().
     */
    mat3.toQuat4 = quat4.fromRotationMatrix;

    (function() {
        var mat = mat3.create();

        /**
         * Creates a quaternion from the 3 given vectors. They must be perpendicular
         * to one another and represent the X, Y and Z axes.
         *
         * If dest is omitted, a new quat4 will be created.
         *
         * Example: The default OpenGL orientation has a view vector [0, 0, -1],
         * right vector [1, 0, 0], and up vector [0, 1, 0]. A quaternion representing
         * this orientation could be constructed with:
         *
         *   quat = quat4.fromAxes([0, 0, -1], [1, 0, 0], [0, 1, 0], quat4.create());
         *
         * @param {vec3}  view   the view vector, or direction the object is pointing in
         * @param {vec3}  right  the right vector, or direction to the "right" of the object
         * @param {vec3}  up     the up vector, or direction towards the object's "up"
         * @param {quat4} [dest] an optional receiving quat4
         *
         * @returns {quat4} dest
         **/
        quat4.fromAxes = function(view, right, up, dest) {
            mat[0] = right[0];
            mat[3] = right[1];
            mat[6] = right[2];

            mat[1] = up[0];
            mat[4] = up[1];
            mat[7] = up[2];

            mat[2] = view[0];
            mat[5] = view[1];
            mat[8] = view[2];

            return quat4.fromRotationMatrix(mat, dest);
        };
    })();

    /**
     * Sets a quat4 to the Identity and returns it.
     *
     * @param {quat4} [dest] quat4 to set. If omitted, a
     * new quat4 will be created.
     *
     * @returns {quat4} dest
     */
    quat4.identity = function(dest) {
        if (!dest) dest = quat4.create();
        dest[0] = 0;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 1;
        return dest;
    };

    /**
     * Sets a quat4 from the given angle and rotation axis,
     * then returns it. If dest is not given, a new quat4 is created.
     *
     * @param {Number} angle  the angle in radians
     * @param {vec3}   axis   the axis around which to rotate
     * @param {quat4}  [dest] the optional quat4 to store the result
     *
     * @returns {quat4} dest
     **/
    quat4.fromAngleAxis = function(angle, axis, dest) {
        // The quaternion representing the rotation is
        //   q = cos(A/2)+sin(A/2)*(x*i+y*j+z*k)
        if (!dest) dest = quat4.create();

        var half = angle * 0.5;
        var s = Math.sin(half);
        dest[3] = Math.cos(half);
        dest[0] = s * axis[0];
        dest[1] = s * axis[1];
        dest[2] = s * axis[2];

        return dest;
    };

    /**
     * Stores the angle and axis in a vec4, where the XYZ components represent
     * the axis and the W (4th) component is the angle in radians.
     *
     * If dest is not given, src will be modified in place and returned, after
     * which it should not be considered not a quaternion (just an axis and angle).
     *
     * @param {quat4} quat   the quaternion whose angle and axis to store
     * @param {vec4}  [dest] the optional vec4 to receive the data
     *
     * @returns {vec4} dest
     */
    quat4.toAngleAxis = function(src, dest) {
        if (!dest) dest = src;
        // The quaternion representing the rotation is
        //   q = cos(A/2)+sin(A/2)*(x*i+y*j+z*k)

        var sqrlen = src[0]*src[0]+src[1]*src[1]+src[2]*src[2];
        if (sqrlen > 0)
        {
            dest[3] = 2 * Math.acos(src[3]);
            var invlen = glMath.invsqrt(sqrlen);
            dest[0] = src[0]*invlen;
            dest[1] = src[1]*invlen;
            dest[2] = src[2]*invlen;
        } else {
            // angle is 0 (mod 2*pi), so any axis will do
            dest[3] = 0;
            dest[0] = 1;
            dest[1] = 0;
            dest[2] = 0;
        }

        return dest;
    };

    /**
     * Returns a string representation of a quaternion
     *
     * @param {quat4} quat quat4 to represent as a string
     *
     * @returns {string} String representation of quat
     */
    quat4.str = function (quat) {
        return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
    };

    /**
     * @class 2 Dimensional Vector
     * @name vec2
     */
    var vec2 = {};

    /**
     * Creates a new vec2, initializing it from vec if vec
     * is given.
     *
     * @param {vec2} [vec] the vector's initial contents
     * @returns {vec2} a new 2D vector
     */
    vec2.create = function(vec) {
        var dest = new MatrixArray(2);

        if (vec) {
            dest[0] = vec[0];
            dest[1] = vec[1];
        } else {
            dest[0] = 0;
            dest[1] = 0;
        }
        return dest;
    };

    /**
     * Creates a new instance of a vec2, initializing it with the given arguments
     *
     * @param {number} x X value
     * @param {number} y Y value

     * @returns {vec2} New vec2
     */
    vec2.createFrom = function (x, y) {
        var dest = new MatrixArray(2);

        dest[0] = x;
        dest[1] = y;

        return dest;
    };

    /**
     * Adds the vec2's together. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec2} vecA the first operand
     * @param {vec2} vecB the second operand
     * @param {vec2} [dest] the optional receiving vector
     * @returns {vec2} dest
     */
    vec2.add = function(vecA, vecB, dest) {
        if (!dest) dest = vecB;
        dest[0] = vecA[0] + vecB[0];
        dest[1] = vecA[1] + vecB[1];
        return dest;
    };

    /**
     * Subtracts vecB from vecA. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec2} vecA the first operand
     * @param {vec2} vecB the second operand
     * @param {vec2} [dest] the optional receiving vector
     * @returns {vec2} dest
     */
    vec2.subtract = function(vecA, vecB, dest) {
        if (!dest) dest = vecB;
        dest[0] = vecA[0] - vecB[0];
        dest[1] = vecA[1] - vecB[1];
        return dest;
    };

    /**
     * Multiplies vecA with vecB. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec2} vecA the first operand
     * @param {vec2} vecB the second operand
     * @param {vec2} [dest] the optional receiving vector
     * @returns {vec2} dest
     */
    vec2.multiply = function(vecA, vecB, dest) {
        if (!dest) dest = vecB;
        dest[0] = vecA[0] * vecB[0];
        dest[1] = vecA[1] * vecB[1];
        return dest;
    };

    /**
     * Divides vecA by vecB. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec2} vecA the first operand
     * @param {vec2} vecB the second operand
     * @param {vec2} [dest] the optional receiving vector
     * @returns {vec2} dest
     */
    vec2.divide = function(vecA, vecB, dest) {
        if (!dest) dest = vecB;
        dest[0] = vecA[0] / vecB[0];
        dest[1] = vecA[1] / vecB[1];
        return dest;
    };

    /**
     * Scales vecA by some scalar number. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecA.
     *
     * This is the same as multiplying each component of vecA
     * by the given scalar.
     *
     * @param {vec2}   vecA the vector to be scaled
     * @param {Number} scalar the amount to scale the vector by
     * @param {vec2}   [dest] the optional receiving vector
     * @returns {vec2} dest
     */
    vec2.scale = function(vecA, scalar, dest) {
        if (!dest) dest = vecA;
        dest[0] = vecA[0] * scalar;
        dest[1] = vecA[1] * scalar;
        return dest;
    };

    /**
     * Calculates the euclidian distance between two vec2
     *
     * Params:
     * @param {vec2} vecA First vector
     * @param {vec2} vecB Second vector
     *
     * @returns {number} Distance between vecA and vecB
     */
    vec2.dist = function (vecA, vecB) {
        var x = vecB[0] - vecA[0],
            y = vecB[1] - vecA[1];
        return Math.sqrt(x*x + y*y);
    };

    /**
     * Copies the values of one vec2 to another
     *
     * @param {vec2} vec vec2 containing values to copy
     * @param {vec2} dest vec2 receiving copied values
     *
     * @returns {vec2} dest
     */
    vec2.set = function (vec, dest) {
        dest[0] = vec[0];
        dest[1] = vec[1];
        return dest;
    };

    /**
     * Compares two vectors for equality within a certain margin of error
     *
     * @param {vec2} a First vector
     * @param {vec2} b Second vector
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    vec2.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON
        );
    };

    /**
     * Negates the components of a vec2
     *
     * @param {vec2} vec vec2 to negate
     * @param {vec2} [dest] vec2 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec2} dest if specified, vec otherwise
     */
    vec2.negate = function (vec, dest) {
        if (!dest) { dest = vec; }
        dest[0] = -vec[0];
        dest[1] = -vec[1];
        return dest;
    };

    /**
     * Normlize a vec2
     *
     * @param {vec2} vec vec2 to normalize
     * @param {vec2} [dest] vec2 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec2} dest if specified, vec otherwise
     */
    vec2.normalize = function (vec, dest) {
        if (!dest) { dest = vec; }
        var mag = vec[0] * vec[0] + vec[1] * vec[1];
        if (mag > 0) {
            mag = Math.sqrt(mag);
            dest[0] = vec[0] / mag;
            dest[1] = vec[1] / mag;
        } else {
            dest[0] = dest[1] = 0;
        }
        return dest;
    };

    /**
     * Computes the cross product of two vec2's. Note that the cross product must by definition
     * produce a 3D vector. If a dest vector is given, it will contain the resultant 3D vector.
     * Otherwise, a scalar number will be returned, representing the vector's Z coordinate, since
     * its X and Y must always equal 0.
     *
     * Examples:
     *    var crossResult = vec3.create();
     *    vec2.cross([1, 2], [3, 4], crossResult);
     *    //=> [0, 0, -2]
     *
     *    vec2.cross([1, 2], [3, 4]);
     *    //=> -2
     *
     * See http://stackoverflow.com/questions/243945/calculating-a-2d-vectors-cross-product
     * for some interesting facts.
     *
     * @param {vec2} vecA left operand
     * @param {vec2} vecB right operand
     * @param {vec2} [dest] optional vec2 receiving result. If not specified a scalar is returned
     *
     */
    vec2.cross = function (vecA, vecB, dest) {
        var z = vecA[0] * vecB[1] - vecA[1] * vecB[0];
        if (!dest) return z;
        dest[0] = dest[1] = 0;
        dest[2] = z;
        return dest;
    };

    /**
     * Caclulates the length of a vec2
     *
     * @param {vec2} vec vec2 to calculate length of
     *
     * @returns {Number} Length of vec
     */
    vec2.length = function (vec) {
      var x = vec[0], y = vec[1];
      return Math.sqrt(x * x + y * y);
    };

    /**
     * Caclulates the squared length of a vec2
     *
     * @param {vec2} vec vec2 to calculate squared length of
     *
     * @returns {Number} Squared Length of vec
     */
    vec2.squaredLength = function (vec) {
      var x = vec[0], y = vec[1];
      return x * x + y * y;
    };

    /**
     * Caclulates the dot product of two vec2s
     *
     * @param {vec2} vecA First operand
     * @param {vec2} vecB Second operand
     *
     * @returns {Number} Dot product of vecA and vecB
     */
    vec2.dot = function (vecA, vecB) {
        return vecA[0] * vecB[0] + vecA[1] * vecB[1];
    };

    /**
     * Generates a 2D unit vector pointing from one vector to another
     *
     * @param {vec2} vecA Origin vec2
     * @param {vec2} vecB vec2 to point to
     * @param {vec2} [dest] vec2 receiving operation result. If not specified result is written to vecA
     *
     * @returns {vec2} dest if specified, vecA otherwise
     */
    vec2.direction = function (vecA, vecB, dest) {
        if (!dest) { dest = vecA; }

        var x = vecA[0] - vecB[0],
            y = vecA[1] - vecB[1],
            len = x * x + y * y;

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        }

        len = 1 / Math.sqrt(len);
        dest[0] = x * len;
        dest[1] = y * len;
        return dest;
    };

    /**
     * Performs a linear interpolation between two vec2
     *
     * @param {vec2} vecA First vector
     * @param {vec2} vecB Second vector
     * @param {Number} lerp Interpolation amount between the two inputs
     * @param {vec2} [dest] vec2 receiving operation result. If not specified result is written to vecA
     *
     * @returns {vec2} dest if specified, vecA otherwise
     */
    vec2.lerp = function (vecA, vecB, lerp, dest) {
        if (!dest) { dest = vecA; }
        dest[0] = vecA[0] + lerp * (vecB[0] - vecA[0]);
        dest[1] = vecA[1] + lerp * (vecB[1] - vecA[1]);
        return dest;
    };

    /**
     * Returns a string representation of a vector
     *
     * @param {vec2} vec Vector to represent as a string
     *
     * @returns {String} String representation of vec
     */
    vec2.str = function (vec) {
        return '[' + vec[0] + ', ' + vec[1] + ']';
    };

    /**
     * @class 2x2 Matrix
     * @name mat2
     */
    var mat2 = {};

    /**
     * Creates a new 2x2 matrix. If src is given, the new matrix
     * is initialized to those values.
     *
     * @param {mat2} [src] the seed values for the new matrix, if any
     * @returns {mat2} a new matrix
     */
    mat2.create = function(src) {
        var dest = new MatrixArray(4);

        if (src) {
            dest[0] = src[0];
            dest[1] = src[1];
            dest[2] = src[2];
            dest[3] = src[3];
        } else {
            dest[0] = dest[1] = dest[2] = dest[3] = 0;
        }
        return dest;
    };

    /**
     * Creates a new instance of a mat2, initializing it with the given arguments
     *
     * @param {number} m00
     * @param {number} m01
     * @param {number} m10
     * @param {number} m11

     * @returns {mat2} New mat2
     */
    mat2.createFrom = function (m00, m01, m10, m11) {
        var dest = new MatrixArray(4);

        dest[0] = m00;
        dest[1] = m01;
        dest[2] = m10;
        dest[3] = m11;

        return dest;
    };

    /**
     * Copies the values of one mat2 to another
     *
     * @param {mat2} mat mat2 containing values to copy
     * @param {mat2} dest mat2 receiving copied values
     *
     * @returns {mat2} dest
     */
    mat2.set = function (mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        return dest;
    };

    /**
     * Compares two matrices for equality within a certain margin of error
     *
     * @param {mat2} a First matrix
     * @param {mat2} b Second matrix
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    mat2.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
            Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
            Math.abs(a[3] - b[3]) < FLOAT_EPSILON
        );
    };

    /**
     * Sets a mat2 to an identity matrix
     *
     * @param {mat2} [dest] mat2 to set. If omitted a new one will be created.
     *
     * @returns {mat2} dest
     */
    mat2.identity = function (dest) {
        if (!dest) { dest = mat2.create(); }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 1;
        return dest;
    };

    /**
     * Transposes a mat2 (flips the values over the diagonal)
     *
     * @param {mat2} mat mat2 to transpose
     * @param {mat2} [dest] mat2 receiving transposed values. If not specified result is written to mat
     *
     * @param {mat2} dest if specified, mat otherwise
     */
    mat2.transpose = function (mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a00 = mat[1];
            mat[1] = mat[2];
            mat[2] = a00;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[2];
        dest[2] = mat[1];
        dest[3] = mat[3];
        return dest;
    };

    /**
     * Calculates the determinant of a mat2
     *
     * @param {mat2} mat mat2 to calculate determinant of
     *
     * @returns {Number} determinant of mat
     */
    mat2.determinant = function (mat) {
      return mat[0] * mat[3] - mat[2] * mat[1];
    };

    /**
     * Calculates the inverse matrix of a mat2
     *
     * @param {mat2} mat mat2 to calculate inverse of
     * @param {mat2} [dest] mat2 receiving inverse matrix. If not specified result is written to mat
     *
     * @param {mat2} dest is specified, mat otherwise, null if matrix cannot be inverted
     */
    mat2.inverse = function (mat, dest) {
        if (!dest) { dest = mat; }
        var a0 = mat[0], a1 = mat[1], a2 = mat[2], a3 = mat[3];
        var det = a0 * a3 - a2 * a1;
        if (!det) return null;

        det = 1.0 / det;
        dest[0] =  a3 * det;
        dest[1] = -a1 * det;
        dest[2] = -a2 * det;
        dest[3] =  a0 * det;
        return dest;
    };

    /**
     * Performs a matrix multiplication
     *
     * @param {mat2} matA First operand
     * @param {mat2} matB Second operand
     * @param {mat2} [dest] mat2 receiving operation result. If not specified result is written to matA
     *
     * @returns {mat2} dest if specified, matA otherwise
     */
    mat2.multiply = function (matA, matB, dest) {
        if (!dest) { dest = matA; }
        var a11 = matA[0],
            a12 = matA[1],
            a21 = matA[2],
            a22 = matA[3];
        dest[0] = a11 * matB[0] + a12 * matB[2];
        dest[1] = a11 * matB[1] + a12 * matB[3];
        dest[2] = a21 * matB[0] + a22 * matB[2];
        dest[3] = a21 * matB[1] + a22 * matB[3];
        return dest;
    };

    /**
     * Rotates a 2x2 matrix by an angle
     *
     * @param {mat2}   mat   The matrix to rotate
     * @param {Number} angle The angle in radians
     * @param {mat2} [dest]  Optional mat2 receiving the result. If omitted mat will be used.
     *
     * @returns {mat2} dest if specified, mat otherwise
     */
    mat2.rotate = function (mat, angle, dest) {
        if (!dest) { dest = mat; }
        var a11 = mat[0],
            a12 = mat[1],
            a21 = mat[2],
            a22 = mat[3],
            s = Math.sin(angle),
            c = Math.cos(angle);
        dest[0] = a11 *  c + a12 * s;
        dest[1] = a11 * -s + a12 * c;
        dest[2] = a21 *  c + a22 * s;
        dest[3] = a21 * -s + a22 * c;
        return dest;
    };

    /**
     * Multiplies the vec2 by the given 2x2 matrix
     *
     * @param {mat2} matrix the 2x2 matrix to multiply against
     * @param {vec2} vec    the vector to multiply
     * @param {vec2} [dest] an optional receiving vector. If not given, vec is used.
     *
     * @returns {vec2} The multiplication result
     **/
    mat2.multiplyVec2 = function(matrix, vec, dest) {
      if (!dest) dest = vec;
      var x = vec[0], y = vec[1];
      dest[0] = x * matrix[0] + y * matrix[1];
      dest[1] = x * matrix[2] + y * matrix[3];
      return dest;
    };

    /**
     * Scales the mat2 by the dimensions in the given vec2
     *
     * @param {mat2} matrix the 2x2 matrix to scale
     * @param {vec2} vec    the vector containing the dimensions to scale by
     * @param {vec2} [dest] an optional receiving mat2. If not given, matrix is used.
     *
     * @returns {mat2} dest if specified, matrix otherwise
     **/
    mat2.scale = function(matrix, vec, dest) {
      if (!dest) { dest = matrix; }
      var a11 = matrix[0],
          a12 = matrix[1],
          a21 = matrix[2],
          a22 = matrix[3],
          b11 = vec[0],
          b22 = vec[1];
      dest[0] = a11 * b11;
      dest[1] = a12 * b22;
      dest[2] = a21 * b11;
      dest[3] = a22 * b22;
      return dest;
    };

    /**
     * Returns a string representation of a mat2
     *
     * @param {mat2} mat mat2 to represent as a string
     *
     * @param {String} String representation of mat
     */
    mat2.str = function (mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + ']';
    };

    /**
     * @class 4 Dimensional Vector
     * @name vec4
     */
    var vec4 = {};

    /**
     * Creates a new vec4, initializing it from vec if vec
     * is given.
     *
     * @param {vec4} [vec] the vector's initial contents
     * @returns {vec4} a new 2D vector
     */
    vec4.create = function(vec) {
        var dest = new MatrixArray(4);

        if (vec) {
            dest[0] = vec[0];
            dest[1] = vec[1];
            dest[2] = vec[2];
            dest[3] = vec[3];
        } else {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 0;
        }
        return dest;
    };

    /**
     * Creates a new instance of a vec4, initializing it with the given arguments
     *
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value
     * @param {number} w W value

     * @returns {vec4} New vec4
     */
    vec4.createFrom = function (x, y, z, w) {
        var dest = new MatrixArray(4);

        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = w;

        return dest;
    };

    /**
     * Adds the vec4's together. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec4} vecA the first operand
     * @param {vec4} vecB the second operand
     * @param {vec4} [dest] the optional receiving vector
     * @returns {vec4} dest
     */
    vec4.add = function(vecA, vecB, dest) {
      if (!dest) dest = vecB;
      dest[0] = vecA[0] + vecB[0];
      dest[1] = vecA[1] + vecB[1];
      dest[2] = vecA[2] + vecB[2];
      dest[3] = vecA[3] + vecB[3];
      return dest;
    };

    /**
     * Subtracts vecB from vecA. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec4} vecA the first operand
     * @param {vec4} vecB the second operand
     * @param {vec4} [dest] the optional receiving vector
     * @returns {vec4} dest
     */
    vec4.subtract = function(vecA, vecB, dest) {
      if (!dest) dest = vecB;
      dest[0] = vecA[0] - vecB[0];
      dest[1] = vecA[1] - vecB[1];
      dest[2] = vecA[2] - vecB[2];
      dest[3] = vecA[3] - vecB[3];
      return dest;
    };

    /**
     * Multiplies vecA with vecB. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec4} vecA the first operand
     * @param {vec4} vecB the second operand
     * @param {vec4} [dest] the optional receiving vector
     * @returns {vec4} dest
     */
    vec4.multiply = function(vecA, vecB, dest) {
      if (!dest) dest = vecB;
      dest[0] = vecA[0] * vecB[0];
      dest[1] = vecA[1] * vecB[1];
      dest[2] = vecA[2] * vecB[2];
      dest[3] = vecA[3] * vecB[3];
      return dest;
    };

    /**
     * Divides vecA by vecB. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecB.
     *
     * @param {vec4} vecA the first operand
     * @param {vec4} vecB the second operand
     * @param {vec4} [dest] the optional receiving vector
     * @returns {vec4} dest
     */
    vec4.divide = function(vecA, vecB, dest) {
      if (!dest) dest = vecB;
      dest[0] = vecA[0] / vecB[0];
      dest[1] = vecA[1] / vecB[1];
      dest[2] = vecA[2] / vecB[2];
      dest[3] = vecA[3] / vecB[3];
      return dest;
    };

    /**
     * Scales vecA by some scalar number. If dest is given, the result
     * is stored there. Otherwise, the result is stored in vecA.
     *
     * This is the same as multiplying each component of vecA
     * by the given scalar.
     *
     * @param {vec4}   vecA the vector to be scaled
     * @param {Number} scalar the amount to scale the vector by
     * @param {vec4}   [dest] the optional receiving vector
     * @returns {vec4} dest
     */
    vec4.scale = function(vecA, scalar, dest) {
      if (!dest) dest = vecA;
      dest[0] = vecA[0] * scalar;
      dest[1] = vecA[1] * scalar;
      dest[2] = vecA[2] * scalar;
      dest[3] = vecA[3] * scalar;
      return dest;
    };

    /**
     * Copies the values of one vec4 to another
     *
     * @param {vec4} vec vec4 containing values to copy
     * @param {vec4} dest vec4 receiving copied values
     *
     * @returns {vec4} dest
     */
    vec4.set = function (vec, dest) {
        dest[0] = vec[0];
        dest[1] = vec[1];
        dest[2] = vec[2];
        dest[3] = vec[3];
        return dest;
    };

    /**
     * Compares two vectors for equality within a certain margin of error
     *
     * @param {vec4} a First vector
     * @param {vec4} b Second vector
     *
     * @returns {Boolean} True if a is equivalent to b
     */
    vec4.equal = function (a, b) {
        return a === b || (
            Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
            Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
            Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
            Math.abs(a[3] - b[3]) < FLOAT_EPSILON
        );
    };

    /**
     * Negates the components of a vec4
     *
     * @param {vec4} vec vec4 to negate
     * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec4} dest if specified, vec otherwise
     */
    vec4.negate = function (vec, dest) {
        if (!dest) { dest = vec; }
        dest[0] = -vec[0];
        dest[1] = -vec[1];
        dest[2] = -vec[2];
        dest[3] = -vec[3];
        return dest;
    };

    /**
     * Caclulates the length of a vec2
     *
     * @param {vec2} vec vec2 to calculate length of
     *
     * @returns {Number} Length of vec
     */
    vec4.length = function (vec) {
      var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
    };

    /**
     * Caclulates the squared length of a vec4
     *
     * @param {vec4} vec vec4 to calculate squared length of
     *
     * @returns {Number} Squared Length of vec
     */
    vec4.squaredLength = function (vec) {
      var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
      return x * x + y * y + z * z + w * w;
    };

    /**
     * Performs a linear interpolation between two vec4
     *
     * @param {vec4} vecA First vector
     * @param {vec4} vecB Second vector
     * @param {Number} lerp Interpolation amount between the two inputs
     * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vecA
     *
     * @returns {vec4} dest if specified, vecA otherwise
     */
    vec4.lerp = function (vecA, vecB, lerp, dest) {
        if (!dest) { dest = vecA; }
        dest[0] = vecA[0] + lerp * (vecB[0] - vecA[0]);
        dest[1] = vecA[1] + lerp * (vecB[1] - vecA[1]);
        dest[2] = vecA[2] + lerp * (vecB[2] - vecA[2]);
        dest[3] = vecA[3] + lerp * (vecB[3] - vecA[3]);
        return dest;
    };

    /**
     * Returns a string representation of a vector
     *
     * @param {vec4} vec Vector to represent as a string
     *
     * @returns {String} String representation of vec
     */
    vec4.str = function (vec) {
        return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ', ' + vec[3] + ']';
    };

    /*
     * Exports
     */

    if(root) {
        root.glMatrixArrayType = MatrixArray;
        root.MatrixArray = MatrixArray;
        root.setMatrixArrayType = setMatrixArrayType;
        root.determineMatrixArrayType = determineMatrixArrayType;
        root.glMath = glMath;
        root.vec2 = vec2;
        root.vec3 = vec3;
        root.vec4 = vec4;
        root.mat2 = mat2;
        root.mat3 = mat3;
        root.mat4 = mat4;
        root.quat4 = quat4;
    }

    return {
        glMatrixArrayType: MatrixArray,
        MatrixArray: MatrixArray,
        setMatrixArrayType: setMatrixArrayType,
        determineMatrixArrayType: determineMatrixArrayType,
        glMath: glMath,
        vec2: vec2,
        vec3: vec3,
        vec4: vec4,
        mat2: mat2,
        mat3: mat3,
        mat4: mat4,
        quat4: quat4
    };
}));
}})
;
//*/
montageDefine("f73ee10","runtime/webgl-renderer",{dependencies:["runtime/dependencies/gl-matrix","runtime/glsl-program","runtime/helpers/resource-manager"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet
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
var GLSLProgram = require("runtime/glsl-program").GLSLProgram;
var WebGLTFResourceManager = require("runtime/helpers/resource-manager").WebGLTFResourceManager;

exports.WebGLRenderer = Object.create(Object.prototype, {

    MODEL: { value: "MODEL", writable: false},
    VIEW: { value: "VIEW", writable: false},
    PROJECTION: { value: "PROJECTION", writable: false},
    MODELVIEW: { value: "MODELVIEW", writable: false},
    VIEWPROJECTION: { value: "VIEWPROJECTION", writable: false},
    MODELVIEWPROJECTION: { value: "MODELVIEWPROJECTION", writable: false},
    MODELINVERSE: { value: "MODELINVERSE", writable: false},
    VIEWINVERSE: { value: "VIEWINVERSE", writable: false},
    PROJECTIONINVERSE: { value: "PROJECTIONINVERSE", writable: false},
    MODELVIEWINVERSE: { value: "MODELVIEWINVERSE", writable: false},
    VIEWPROJECTIONINVERSE: { value: "VIEWPROJECTIONINVERSE", writable: false},
    MODELVIEWPROJECTIONINVERSE: { value: "MODELVIEWPROJECTIONINVERSE", writable: false},
    MODELTRANSPOSE: { value: "MODELTRANSPOSE", writable: false},
    VIEWTRANSPOSE: { value: "VIEWTRANSPOSE", writable: false},
    PROJECTIONTRANSPOSE: { value: "PROJECTIONTRANSPOSE", writable: false},
    MODELVIEWTRANSPOSE: { value: "MODELVIEWTRANSPOSE", writable: false},
    VIEWPROJECTIONTRANSPOSE: { value: "VIEWPROJECTIONTRANSPOSE", writable: false},
    MODELVIEWPROJECTIONTRANSPOSE: { value: "MODELVIEWPROJECTIONTRANSPOSE", writable: false},
    MODELINVERSETRANSPOSE: { value: "MODELINVERSETRANSPOSE", writable: false},
    VIEWINVERSETRANSPOSE: { value: "VIEWINVERSETRANSPOSE", writable: false},
    PROJECTIONINVERSETRANSPOSE: { value: "PROJECTIONINVERSETRANSPOSE", writable: false},
    MODELVIEWINVERSETRANSPOSE: { value: "MODELVIEWINVERSETRANSPOSE", writable: false},
    VIEWPROJECTIONINVERSETRANSPOSE: { value: "VIEWPROJECTIONINVERSETRANSPOSE", writable: false},
    MODELVIEWPROJECTIONINVERSETRANSPOSE: { value: "MODELVIEWPROJECTIONINVERSETRANSPOSE", writable: false},

    //private accessors
    _bindedProgram: { value: null, writable: true },

    _debugProgram: { value: null, writable: true },

    _resourceManager: { value: null, writable: true },

    _webGLContext: { value : null, writable: true },

    _projectionMatrix: { value : null, writable: true },

    //default values
    shininess: { value: 200, writable: true },

    light: { value: [0, 0, -1], writable: true },

    specularColor: { value: [1, 1, 1], writable: true },

    GLContextDidChange: {
        value: function(value) {
        }
    },

    initWithWebGLContext: {
        value: function(value) {
            this.webGLContext = value;
            this._states = {};
            return this;
        }
    },

    bindedProgram: {
        get: function() {
            return this._bindedProgram;
        },
        set: function(value) {
            if ((this._bindedProgram !== value) && this._webGLContext) {
                this._bindedProgram = value;
                if (this._bindedProgram) {
                    this._bindedProgram.use(this._webGLContext, false);
                }
            }
        }
    },

    projectionMatrix: {
        get: function() {
            return this._projectionMatrix;
        },
        set: function(value) {
            this._projectionMatrix = value;
        }
    },

    //FIXME:needs to be updated to reflect latest changes
    debugProgram: {
        get: function() {
            if (!this._debugProgram) {
                this._debugProgram = Object.create(GLSLProgram);
                var debugVS =   "precision highp float;" +
                    "attribute vec3 vert;"  +
                    "uniform mat4 u_mvMatrix; " +
                    "uniform mat4 u_projMatrix; " +
                    "void main(void) { " +
                    "gl_Position = u_projMatrix * u_mvMatrix * vec4(vert,1.0); }"

                var debugFS =   "precision highp float;" +
                    "void main(void) { " +
                    "gl_FragColor = vec4(1.,0.,0.,1.); }";

                this._debugProgram.initWithShaders( { "x-shader/x-vertex" : debugVS , "x-shader/x-fragment" : debugFS } );
                if (!this._debugProgram.build(this.webGLContext)) {
                    console.log(this._debugProgram.errorLogs);
                }

            }

            return this._debugProgram;
        }
    },


    webGLContext: {
        get: function() {
            return this._webGLContext;
        },
        set: function(value) {
            this._webGLContext = value;
            this.GLContextDidChange();
        }
    },

    resourceManager: {
        get: function() {
            if (!this._resourceManager) {
                //FIXME: this should be in init
                this._resourceManager = Object.create(WebGLTFResourceManager);
                this._resourceManager.init();
            }

            return this._resourceManager;
        }
    },

    indicesDelegate: {
        value: {
            webGLContext:  {
                value: null, writable: true
            },

            handleError: function(errorCode, info) {
                // FIXME: report error
                console.log("ERROR:vertexAttributeBufferDelegate:"+errorCode+" :"+info);
            },

            //should be called only once
            convert: function (source, resource, ctx) {
                var gl = ctx;
                var previousBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
                var glResource =  gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glResource);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, resource, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, previousBuffer);
                return glResource;
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    setupCompressedMesh: {
        value: function(mesh, attribs, indices) {
            var primitive = mesh.primitives[0];

            var gl = this.webGLContext;
            //create indices
            var previousBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var glResource =  gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glResource);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, previousBuffer);

            glResource.count = indices.length;
            this.resourceManager.setResource(primitive.indices.id, glResource);
            primitive.indices = { "id" : primitive.indices.id, "count" : glResource.count }; //HACK

            //deinterleave for now, I now it is a bad and this will not be needed anymore soon
            var count = attribs.length / 8;     //8 = (3pos + 2uv + 3normals)

            var positions = new Float32Array(count * 3);
            var normals = new Float32Array(count * 3);
            var texcoords = new Float32Array(count * 2);

            var i;
            for (i = 0 ; i < count ; i++) {
                var idx = i * 8;
                positions[(i*3) + 0] = attribs[idx + 0];
                positions[(i*3) + 1] = attribs[idx + 1];
                positions[(i*3) + 2] = attribs[idx + 2];
                normals[(i*3) + 0] = attribs[idx + 5];
                normals[(i*3) + 1] = attribs[idx + 6];
                normals[(i*3) + 2] = attribs[idx + 7];
                texcoords[(i*2) + 0] = attribs[idx + 3];
                texcoords[(i*2) + 1] = attribs[idx + 4];
            }

            previousBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);

            glResource =  gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
            glResource.componentType = gl.FLOAT;
            glResource.componentsPerAttribute = 3;

            this.resourceManager.setResource(primitive.semantics["POSITION"].id, glResource);
            primitive.semantics["POSITION"] = { "id" : primitive.semantics["POSITION"].id , "count" : count, "byteStride" : 12}; //HACK


            glResource =  gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
            gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
            glResource.componentType = gl.FLOAT;
            glResource.componentsPerAttribute = 3;

            this.resourceManager.setResource(primitive.semantics["NORMAL"].id, glResource);
            primitive.semantics["NORMAL"] = { "id" : primitive.semantics["NORMAL"].id, "count" : count, "byteStride" : 12}; //HACK

            if (texcoords.length > 0) {
                glResource =  gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
                gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
                glResource.componentType = gl.FLOAT;
                glResource.componentsPerAttribute = 2;
                this.resourceManager.setResource(primitive.semantics["TEXCOORD_0"].id, glResource);
                primitive.semantics["TEXCOORD_0"] = { "id" : primitive.semantics["TEXCOORD_0"].id, "count" : count, "byteStride" : 8}; //HACK
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, previousBuffer);


        }
    },

    setupCompressedMesh2: {
        value: function(mesh, vertexCount, positions, normals, ifs, floatAttributesIndexes, indices) {
            var gl = this.webGLContext;
            //create indices
            //var previousBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);

            var count = 0;
            var index = 0;
            var primitives = mesh.primitives;

            //setup indices
            for (var i = 0 ; i < primitives.length ; i++) {
                //First we set the indices
                var primitive = mesh.primitives[i];
                var id = primitive.indices.id;
                count = primitive.indices.count;
                var primitiveIndices = new Int16Array(indices.subarray(index, index + count ));

                var glResource =  gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glResource);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, primitiveIndices, gl.STATIC_DRAW);

                this.resourceManager.setResource(id, glResource);
                glResource.count = count;
                primitive.indices = { "id" : id, "count" : glResource.count };
                index += count;
                //Then we setup vertex attributes with potentially multiple set, like color and texcoord
            }

            var semantic;
            var idToSemantic = {};
            //now setup vertex attributes, to do so we build a map of id->vertexAttribute for all used sources in the mesh
            for (var i = 0 ; i < primitives.length ; i++) {
                //First we set the indices
                var primitive = mesh.primitives[i];
                for (semantic in primitive.semantics) {
                    var vertexAttribute = primitive.semantics[semantic];
                    idToSemantic[vertexAttribute.baseId] = semantic;
                }
            }

            for (var attributeId in idToSemantic) {
                var vertexAttributeIndex = floatAttributesIndexes[attributeId];
                if (vertexAttributeIndex != null) {
                    var attr = ifs.GetFloatAttribute(vertexAttributeIndex);
                    var semantic = idToSemantic[attributeId];
                    if (semantic === "JOINT") {
                        for (var k = 0 ; k < attr.length ; k++) {
                            attr[k] = Math.floor(attr[k] + 0.5);
                        }
                    }

                    var componentsPerAttribute =ifs.GetFloatAttributeDim(vertexAttributeIndex);
                    glResource =  gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
                    gl.bufferData(gl.ARRAY_BUFFER, attr, gl.STATIC_DRAW);
                    glResource.componentType = gl.FLOAT;
                    glResource.componentsPerAttribute = componentsPerAttribute;
                    this.resourceManager.setResource(primitive.semantics[semantic].id, glResource);
                    primitive.semantics[semantic] = { "id" : primitive.semantics[semantic].id, "count" : count, "byteStride" : componentsPerAttribute * 4};
                }
            }

            //if (previousBuffer)
            //    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER_BINDING, previousBuffer);

            count = vertexCount;
            previousBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);

            glResource =  gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
            glResource.componentType = gl.FLOAT;
            glResource.componentsPerAttribute = 3;

            this.resourceManager.setResource(primitive.semantics["POSITION"].id, glResource);
            primitive.semantics["POSITION"] = { "id" : primitive.semantics["POSITION"].id , "count" : count, "byteStride" : 12}; //HACK

            if (normals != null) {
                glResource =  gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
                gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
                glResource.componentType = gl.FLOAT;
                glResource.componentsPerAttribute = 3;
                this.resourceManager.setResource(primitive.semantics["NORMAL"].id, glResource);
                primitive.semantics["NORMAL"] = { "id" : primitive.semantics["NORMAL"].id, "count" : count, "byteStride" : 12}; //HACK
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, previousBuffer);
        }
    },

    vertexAttributeBufferDelegate: {
        value: {

            _componentTypeForGLType: function(gl, glType) {
                switch (glType) {
                    case gl.FLOAT:
                    case gl.FLOAT_VEC2:
                    case gl.FLOAT_VEC3:
                    case gl.FLOAT_VEC4:
                        return gl.FLOAT;
                    case gl.UNSIGNED_BYTE:
                        return gl.UNSIGNED_BYTE;
                    case gl.UNSIGNED_SHORT:
                        return gl.UNSIGNED_SHORT;
                    default:
                        return null;
                }
            },

            _componentsPerElementForGLType: function(gl, glType) {
                switch (glType) {
                    case gl.FLOAT:
                    case gl.UNSIGNED_BYTE:
                    case gl.UNSIGNED_SHORT:
                        return 1;
                    case gl.FLOAT_VEC2:
                        return 2;
                    case gl.FLOAT_VEC3:
                        return 3;
                    case gl.FLOAT_VEC4:
                        return 4;
                    default:
                        return null;
                }
            },

            webGLContext:  {
                value: null, writable: true
            },

            handleError: function(errorCode, info) {
                console.log("ERROR:vertexAttributeBufferDelegate:"+errorCode+" :"+info);
            },

            convert: function (source, resource, ctx) {
                var attribute = source;
                var gl = ctx;
                var previousBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);

                var glResource =  gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
                //FIXME: use bufferSubData to prevent alloc
                gl.bufferData(gl.ARRAY_BUFFER, resource, gl.STATIC_DRAW);
                glResource.componentType = this._componentTypeForGLType(gl, attribute.type);
                glResource.componentsPerAttribute = this._componentsPerElementForGLType(gl, attribute.type);
                gl.bindBuffer(gl.ARRAY_BUFFER, previousBuffer);
                return glResource;
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    textureDelegate: {
        value: {
            getGLFilter: function(filter) {
                return filter == null ? WebGLRenderingContext.LINEAR : filter;
            },

            getGLWrapMode: function(wrapMode) {
                return wrapMode == null ? WebGLRenderingContext.REPEAT : wrapMode;
            },

            handleError: function(errorCode, info) {
                // FIXME: report error
                console.log("ERROR:textureDelegate:"+errorCode+" :"+info);
            },

            //nextHighestPowerOfTwo && isPowerOfTwo borrowed from http://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences
            nextHighestPowerOfTwo: function (x) {
                --x;
                for (var i = 1; i < 32; i <<= 1) {
                    x = x | x >> i;
                }
                return x + 1;
            },

            isPowerOfTwo: function(x) {
                return (x & (x - 1)) == 0;
            },

            installCubemapSide: function(gl, target, texture, content) {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, content);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
            },

            createTextureFromImageAndSampler: function(image, sampler, gl) {
                var activeTexture = gl.getParameter(gl.ACTIVE_TEXTURE)
                var textureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
                gl.activeTexture(gl.TEXTURE0);

                var canvas = null;
                var minFilter = this.getGLFilter(sampler.minFilter);
                var magFilter = this.getGLFilter(sampler.magFilter);
                var wrapS = this.getGLWrapMode(sampler.wrapS);
                var wrapT = this.getGLWrapMode(sampler.wrapT);
                var shouldResize = false;
                var usesMipMaps = ((minFilter === gl.NEAREST_MIPMAP_NEAREST) ||
                    (minFilter === gl.LINEAR_MIPMAP_NEAREST) ||
                    (minFilter === gl.NEAREST_MIPMAP_LINEAR) ||
                    (minFilter === gl.LINEAR_MIPMAP_LINEAR));

                if (usesMipMaps ||  (wrapS === gl.REPEAT) || (wrapT === gl.REPEAT)) {

                    var width = parseInt(image.width);
                    var height = parseInt(image.height);

                    if (!this.isPowerOfTwo(width)) {
                        width = this.nextHighestPowerOfTwo(width);
                        shouldResize = true;
                    }
                    if (!this.isPowerOfTwo(height)) {
                        height = this.nextHighestPowerOfTwo(height);
                        shouldResize = true;
                    }

                    if (shouldResize) {
                        canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;

                        var graphicsContext = canvas.getContext("2d");
                        graphicsContext.drawImage(image, 0, 0, parseInt(canvas.width), parseInt(canvas.height));
                        canvas.id = image.id;
                        image = canvas;
                    }
                }


                var texture = gl.createTexture();
                texture.contextID = gl.contextID;

                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
                
                /*
                var extensions = gl.getSupportedExtensions();
                var ext = gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                var max_anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max_anisotropy);
                */

                //FIXME: use from input texture (target, format, internal format)
                //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                if (usesMipMaps) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                }

                gl.bindTexture(gl.TEXTURE_2D, textureBinding);
                gl.activeTexture(activeTexture);


                return texture;
            },

            //should be called only once
            convert: function (source, resource, ctx) {
                var gl = ctx;
                if (source) {
                    if (source.length === 6) {
                        //we must have a cube map here:
                        var cubeTexture = gl.createTexture();
                        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
                        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                        this.installCubemapSide(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X, cubeTexture, source[0]);
                        this.installCubemapSide(gl, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, cubeTexture, source[1]);
                        this.installCubemapSide(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, cubeTexture, source[2]);
                        this.installCubemapSide(gl, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, cubeTexture, source[3]);
                        this.installCubemapSide(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, cubeTexture, source[4]);
                        this.installCubemapSide(gl, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, cubeTexture, source[5]);

                        return cubeTexture;
                    }

                } else if (source.type == "video") {
                    //for now, naive handling of videos
                    resource.source.videoElement = source;
                    var texture = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resource.source.videoElement);
                    gl.bindTexture(gl.TEXTURE_2D, null);
                    return texture;
                }

                return this.createTextureFromImageAndSampler(source, resource.sampler, gl);
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    _lastMaxEnabledArray: { value: 0, writable: true },

    _states: { value: null, writable: true },

    setState: {
        value: function(stateID, flag, force) {

            var gl = this.webGLContext;

            if ((this._states[stateID] != null) && (force != true)) {
                if (this._states[stateID] === flag) {
                    return;
                }
            }

            this._states[stateID] = flag;

            if (flag) {
                gl.enable(stateID);
            } else {
                gl.disable(stateID);
            }
        }
    },

    resetStates : {
        value: function() {
            var gl = this.webGLContext;
            if (gl && (this._lastMaxEnabledArray !== -1)) {
                for (var i = 0 ; i < this._lastMaxEnabledArray ; i++) {
                    gl.disableVertexAttribArray(i);
                }
            }
            this._lastMaxEnabledArray = -1;
            this.bindedProgram = null;
            this.setState(gl.BLEND, false);
        }
    },

    renderPrimitive: {
        value: function(primitiveDescription, pass, time, parameters) {
            
            var renderVertices = false;
            var value = null;
            var primitive = primitiveDescription.primitive;

            //temporary fix 
            if (primitiveDescription.node) {
                if (primitiveDescription.node.instanceSkin) {
                    primitiveDescription.node.instanceSkin.skin.process(primitiveDescription.node, this.resourceManager);
                }
            }


            var newMaxEnabledArray = -1;
            var gl = this.webGLContext;
            var program =  this.bindedProgram;
            var i;
            var currentTexture = 0;
            if (!parameters)
                parameters = primitive.material.parameters;
            var allUniforms = program.uniformSymbols;
            for (i = 0; i < allUniforms.length ; i++) {
                var symbol = allUniforms[i];
                var parameter = pass.instanceProgram.uniforms[symbol];

                value = null;
                parameter = parameters[parameter];
                if (parameter) {
                    if (parameter.semantic != null) {
                        var nodeWrapper = primitiveDescription.nodeWrapper;
                        if (parameter.source) {
                            nodeWrapper = primitiveDescription.nodeWrapper.scenePassRenderer._nodeWrappers[parameter.source.id]
                        }

                        var semantic = parameter.semantic;
                        if (semantic === this.PROJECTION) {
                            value = this.projectionMatrix;
                        } else if (semantic === this.MODELVIEW) {
                            value = nodeWrapper.worldViewMatrix;
                        } else if (semantic === this.MODELVIEWINVERSETRANSPOSE) {
                            value = nodeWrapper.worldViewInverseTransposeMatrix;
                        } else if (semantic === this.MODELVIEWINVERSE) {
                            value = nodeWrapper.worldViewInverseMatrix;
                        }
                    }
                }

                if ((value == null) && parameter != null) {
                    if ((parameter.source) && (semantic == null)) {
                        var nodeWrapper = primitiveDescription.nodeWrapper.scenePassRenderer._nodeWrappers[parameter.source.id];
                        value = nodeWrapper.worldViewMatrix;
                    } else {
                        value = parameter.value;
                    }
                }

                var texture = null;

                if (value != null) {
                    var glType = program.getTypeForSymbol(symbol);
                    var uniformIsSamplerCube = glType === gl.SAMPLER_CUBE;
                    var uniformIsSampler2D = glType === gl.SAMPLER_2D;

                    if (uniformIsSamplerCube) {
                        texture = this.resourceManager.getResource(value, this.textureDelegate, this.webGLContext);
                        if (texture) {
                            gl.activeTexture(gl.TEXTURE0 + currentTexture);
                            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

                            var samplerLocation = program.getLocationForSymbol(symbol);
                            if (typeof samplerLocation !== "undefined") {
                                program.setValueForSymbol(symbol, currentTexture);
                                currentTexture++;
                            }
                        }
                    } else if (uniformIsSampler2D) {
                        texture = this.resourceManager.getResource(value, this.textureDelegate, this.webGLContext);
                        if (texture != null) {
                            //HACK: to keep track of texture
                            gl.activeTexture(gl.TEXTURE0 + currentTexture);
                            gl.bindTexture(gl.TEXTURE_2D, texture);
                            if (parameter.value.source.videoElement) {
                                if (parameter.value.source.timeStamp != time) {
                                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                                        gl.UNSIGNED_BYTE, parameter.value.source.videoElement);
                                    parameter.value.source.timeStamp = time;
                                }
                            }

                            var samplerLocation = program.getLocationForSymbol(symbol);
                            if (typeof samplerLocation !== "undefined") {
                                program.setValueForSymbol(symbol, currentTexture);
                                currentTexture++;
                            } 
                        } 

                    } else {
                        program.setValueForSymbol(symbol, value);
                    }
                }
            }

            program.commit(gl);

            var availableCount = 0;

            //----- bind attributes -----
            var attributes = pass.instanceProgram.attributes;
            var allAttributes = program.attributeSymbols;
            for (i = 0 ; i < allAttributes.length ; i++) {
                var symbol = allAttributes[i];
                var parameter = attributes[symbol];
                parameter = parameters[parameter];
                var semantic = parameter.semantic;
                var accessor = primitive.semantics[semantic];

                var glResource = null;
                if (primitiveDescription.compressed) {
                    glResource = this.resourceManager._getResource( accessor.id);
                } else {
                    glResource = this.resourceManager.getResource( accessor, this.vertexAttributeBufferDelegate, this.webGLContext);
                }

                    // this call will bind the resource when available
                if (glResource) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, glResource);
                    var attributeLocation = program.getLocationForSymbol(symbol);
                    if (typeof attributeLocation !== "undefined") {
                        if (attributeLocation > newMaxEnabledArray) {
                            newMaxEnabledArray = attributeLocation;
                        }

                        //Just enable what was not enabled before...
                        //FIXME: find root cause why it is needed to disable this optimization as it works well 99% of the time
                        //if (this._lastMaxEnabledArray < attributeLocation) {
                        gl.enableVertexAttribArray(attributeLocation);
                        //}

                        gl.vertexAttribPointer(attributeLocation,
                            glResource.componentsPerAttribute,
                            glResource.componentType, false, accessor.byteStride, 0);


                        if ( renderVertices && (semantic == "POSITION")) {
                            gl.drawArrays(gl.POINTS, 0, accessor.count);
                        }
                    }
                    availableCount++;
                } else {
                    this._lastMaxEnabledArray = -1;
                }
            }

            //-----
            var available = availableCount === allAttributes.length;
            if (!renderVertices)  {
                //Just disable what is not required here…
                if (available) {
                    for (var i = (newMaxEnabledArray + 1); i < this._lastMaxEnabledArray ; i++) {
                        gl.disableVertexAttribArray(i);
                    }
                }
                var glIndices = null;
                if (primitiveDescription.compressed) {
                    glIndices = this.resourceManager._getResource(primitive.indices.id);
                } else {
                    glIndices = this.resourceManager.getResource(primitive.indices, this.indicesDelegate, this.webGLContext);
                }

                if (glIndices && available) {
                    //if (!primitiveDescription.mesh.loaded) {
                    //    primitiveDescription.mesh.loadedPrimitivesCount++;
                    //}
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glIndices);
                    gl.drawElements(gl.TRIANGLES, primitive.indices.count, gl.UNSIGNED_SHORT, 0);
                }
            }
            this._lastMaxEnabledArray = newMaxEnabledArray;
            return available;
        }
    },

    programDelegate: {
        value: {
            handleError: function(errorCode, info) {
                // FIXME: report
                console.log("ERROR:programDelegate:"+errorCode+" :"+info);
            },

            //should be called only once per program
            convert: function (source, resource, ctx) {
                var gl = ctx;
                var glslProgram = Object.create(GLSLProgram);
                glslProgram.initWithShaders( resource );
                if (!glslProgram.build(gl)) {
                    console.log(resource);
                    console.log(glslProgram.errorLogs);
                }

                return glslProgram;
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    //Create a Picking technique, to get rid of the special cases, but implemention of new design parameters
    bindRenderTarget: {
        value: function(renderTarget) {
            var gl = this.webGLContext;
            var initializing = renderTarget.FBO ? false : true;
            renderTarget.previousFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);
            if (!renderTarget.FBO) {
                renderTarget.FBO = gl.createFramebuffer();
                initializing = true;
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget.FBO);

            var extras = renderTarget.extras;

            var shouldResize =  (gl.drawingBufferWidth != renderTarget.width) ||
                (gl.drawingBufferHeight != renderTarget.height);
            var width = gl.drawingBufferWidth;
            var height = gl.drawingBufferHeight;

            if (initializing || shouldResize) {
                renderTarget.attachments.forEach (function (attachment) {
                    if (attachment.semantic == "COLOR_ATTACHMENT0") {
                        if (extras.picking) {
                            var textureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
                            if (initializing)
                                extras.pickingTexture = gl.createTexture();
                            if (shouldResize) {
                                gl.bindTexture(gl.TEXTURE_2D, extras.pickingTexture);
                                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                            }
                            if (initializing)
                                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, extras.pickingTexture, 0);
                            gl.bindTexture(gl.TEXTURE_2D, textureBinding);
                        } else {
                        }
                    }

                    if (attachment.semantic == "DEPTH_ATTACHMENT") {
                        if (extras.picking) {
                            var renderBufferBinding = gl.getParameter(gl.RENDERBUFFER_BINDING);
                            if (initializing) {
                                extras.pickingRenderBuffer = gl.createRenderbuffer();
                            }
                            if (shouldResize) {
                                gl.bindRenderbuffer(gl.RENDERBUFFER, extras.pickingRenderBuffer);
                                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
                            }
                            if (initializing)
                                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, extras.pickingRenderBuffer);

                            gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferBinding);
                        } else {
                        }
                    }

                }, this);
            }
            gl.clearColor(0,0,0,1.);
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        }
    },

    unbindRenderTarget: {
        value: function(renderTarget) {
            var gl = this.webGLContext;

            if (renderTarget.extras.picking) {
                if (!renderTarget.extras.pickedPixel) {
                    renderTarget.extras.pickedPixel = new Uint8Array(4); //RGBA
                }
                gl.finish();

                gl.readPixels(  renderTarget.extras.coords[0],
                    renderTarget.extras.coords[1],
                    1,1,
                    gl.RGBA,gl.UNSIGNED_BYTE, renderTarget.extras.pickedPixel);
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget.previousFBO);

            var showPickingImage = false;
            if (showPickingImage) {
                renderTarget.attachments.forEach (function (attachment) {
                    if (attachment.semantic === "COLOR_ATTACHMENT0") {
                        if (renderTarget.extras.picking) {
                            this.drawTexture(renderTarget.extras.pickingTexture);
                        }
                    }
                }, this);
            }
        }
    },

    renderPrimitivesWithPass: {
        value: function(primitives, pass, parameters, time, pickingMode) {
            var count = primitives.length;
            var gl = this.webGLContext;
            if (pass.instanceProgram) {
                var ctx = gl;
                var glProgram = this.resourceManager.getResource(pass.instanceProgram.program, this.programDelegate, ctx);
                if (glProgram) {
                    var blending = 0;
                    var depthTest = 1;
                    var depthMask = 1;
                    var cullFaceEnable = 1;
                    var states = pass.states;
                    var blendEquation = gl.FUNC_ADD;
                    var sfactor = gl.SRC_ALPHA;
                    var dfactor = gl.ONE_MINUS_SRC_ALPHA;
                    var isPickingPass = (pass.id === "__PickingPass");

                    //FIXME: make a clever handling of states, For now this is incomplete and inefficient.(but robust)
                    if (states) {
                        if (states.blendEnable != null) {
                            blending = states.blendEnable;
                        }
                        if (states.depthTestEnable != null) {
                            depthTest = states.depthTestEnable;
                        }
                        if (states.depthMask != null) {
                            depthMask = states.depthMask;
                        }
                        if (states.cullFaceEnable != null) {
                            cullFaceEnable = states.cullFaceEnable;
                        }
                        if(states.blendEquation != null) {
                            var blendFunc = states.blendFunc;
                            if (blendFunc != null) {
                                if (blendFunc.sfactor != null)
                                    sfactor = blendFunc.sfactor;
                                if (blendFunc.dfactor != null)
                                    dfactor = blendFunc.dfactor;
                            }
                        }
                    }

                    this.setState(gl.DEPTH_TEST, depthTest);
                    this.setState(gl.CULL_FACE, cullFaceEnable);

                    gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);

                    gl.depthMask(depthMask);
                    this.setState(gl.BLEND, blending);
                    if (blending === 1) {
                        gl.blendEquation(blendEquation);
                        gl.blendFunc(sfactor, dfactor);
                    }
                    this.bindedProgram = glProgram;

                    if (isPickingPass) {
                        for (var i = 0 ; i < count ; i++) {
                            var primitive = primitives[i];
                            if (primitive.node.hidden)
                                continue;
                            if (!primitive.pickingColor) {
                                
                                if (pickingMode === "node") {
                                    var nodeID = primitive.node.baseId; //FIXME
                                    if (nodeID) {
                                        //FIXME move this into the picking technique when we have it..
                                        //for picking, we need to associate a color to each node.
                                        var nodePickingColor = pass.extras.nodeIDToColor[nodeID];
                                        if (!nodePickingColor) {
                                            nodePickingColor = vec4.createFrom(Math.random(),Math.random(),Math.random(), 1.);
                                            pass.extras.nodeIDToColor[nodeID] = nodePickingColor;
                                        }
                                        primitive.pickingColor = nodePickingColor;
                                    }
                                } else if (pickingMode === "material") {
                                    var materialID = primitive.primitive.material.baseId; //FIXME
                                    if (materialID) {
                                        var materialPickingColor = pass.extras.materialIDToColor[materialID];
                                        if (!materialPickingColor) {
                                            materialPickingColor = vec4.createFrom(Math.random(),Math.random(),Math.random(), 1.);
                                            pass.extras.materialIDToColor[materialID] = materialPickingColor;
                                        }
                                        primitive.pickingColor = materialPickingColor;
                                    }
                                }
                            }
                            this.bindedProgram.setValueForSymbol("u_pickingColor", primitive.pickingColor);
                            this.renderPrimitive(primitive, pass, time, parameters);
                        }
                    } else {
                        for (var i = 0 ; i < count ; i++) {
                            var primitive = primitives[i];
                            if (primitive.node.hidden)
                                continue;
                            var globalIntensity = 1;
                            parameters = primitive.primitive.material.parameters;
                            var transparency = parameters["transparency"];
                            if (transparency) {
                                if (transparency.value != null)
                                    globalIntensity *= transparency.value;
                            }

                            var filterColor = parameters["filterColor"];
                            if (filterColor) {
                                if (filterColor.value != null) {
                                    globalIntensity *= filterColor.value[3];
                                }
                            }
                            if (globalIntensity < 0.00001) {
                                continue;
                            }

                            if ((globalIntensity < 1) && !blending) {
                                this.setState(gl.BLEND, true);
                                gl.blendEquation(gl.FUNC_ADD);
                                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                                this.renderPrimitive(primitive, pass, time);
                                this.setState(gl.BLEND, false);
                            } else {
                                this.renderPrimitive(primitive, pass, time);
                            }
                        }
                    }
                }
            }
        }
    },

    _BBOXProgram: { value: null , writable: true },

    drawBBOX: {
        value: function(bbox, cameraMatrix, modelMatrix, projectionMatrix) {
            if (bbox == null) return;

            var gl = this.webGLContext;

            this.bindedProgram = null;

            this.setState(gl.CULL_FACE, false);

            if (!this._BBOXProgram) {
                this._BBOXProgram = Object.create(GLSLProgram);

                var vertexShader =  "precision highp float;" +
                    "attribute vec3 vert;"  +
                    "uniform mat4 u_projMatrix; " +
                    "uniform mat4 u_vMatrix; " +
                    "uniform mat4 u_mMatrix; " +
                    "void main(void) { " +
                    "gl_Position = u_projMatrix * u_vMatrix * u_mMatrix * vec4(vert,1.0); }";

                var fragmentShader =    "precision highp float;" +
                    "uniform float u_transparency; " +
                    " void main(void) { " +
                    " gl_FragColor = vec4(vec3(1.,1.,1.) , u_transparency);" +
                    "}";

                this._BBOXProgram.initWithShaders( {    "x-shader/x-vertex" : vertexShader ,
                    "x-shader/x-fragment" : fragmentShader } );
                if (!this._BBOXProgram.build(gl))
                    console.log(this._BBOXProgram.errorLogs);
            }

            var min = [bbox[0][0], bbox[0][1], bbox[0][2]];
            var max = [bbox[1][0], bbox[1][1], bbox[1][2]];

            var X = 0;
            var Y = 1;
            var Z = 2;

            if (!this._BBOXIndices) {
                var indices = [ 0, 1,
                    1, 2,
                    2, 3,
                    3, 0,
                    4, 5,
                    5, 6,
                    6, 7,
                    7, 4,
                    3, 7,
                    2, 6,
                    0, 4,
                    1, 5];

                this._BBOXIndices = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._BBOXIndices);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
            }

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._BBOXIndices);

            if (!this._BBOXVertexBuffer) {
                this._BBOXVertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this._BBOXVertexBuffer);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._BBOXVertexBuffer);

            var vertices = [
                max[X], min[Y], min[Z],
                max[X], max[Y], min[Z],
                min[X], max[Y], min[Z],
                min[X], min[Y], min[Z],
                max[X], min[Y], max[Z],
                max[X], max[Y], max[Z],
                min[X], max[Y], max[Z],
                min[X], min[Y], max[Z]
            ];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            var vertLocation = this._BBOXProgram.getLocationForSymbol("vert");
            if (vertLocation != null) {
                gl.enableVertexAttribArray(vertLocation);
                gl.vertexAttribPointer(vertLocation, 3, gl.FLOAT, false, 12, 0);
            }

            this.bindedProgram = this._BBOXProgram;

            var projectionMatrixLocation = this._BBOXProgram.getLocationForSymbol("u_projMatrix");
            if (projectionMatrixLocation) {
                this._BBOXProgram.setValueForSymbol("u_projMatrix",projectionMatrix);
            }

            var mMatrixLocation = this._BBOXProgram.getLocationForSymbol("u_mMatrix");
            if (mMatrixLocation) {
                this._BBOXProgram.setValueForSymbol("u_mMatrix",modelMatrix);
            }

            var vMatrixLocation = this._BBOXProgram.getLocationForSymbol("u_vMatrix");
            if (vMatrixLocation) {
                this._BBOXProgram.setValueForSymbol("u_vMatrix",cameraMatrix);
            }

            var transparency = this._BBOXProgram.getLocationForSymbol("u_transparency");
            if (transparency) {
                this._BBOXProgram.setValueForSymbol("u_transparency",1 /*mesh.step*/);
            }

            this._BBOXProgram.commit(gl);
            //void drawElements(GLenum mode, GLsizei count, GLenum type, GLintptr offset);
            gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);
            gl.disableVertexAttribArray(vertLocation);

            this.setState(gl.BLEND, false);
            this.setState(gl.CULL_FACE, true);
        }
    },

    drawTexture: {
        value: function(textureName) {
            var gl = this.webGLContext;
            //save values
            var restoreDepthState = gl.isEnabled(gl.DEPTH_TEST);
            var restoreCullFace = gl.isEnabled(gl.CULL_FACE);
            var restoreBlend = gl.isEnabled(gl.BLEND);

            this.setState(gl.DEPTH_TEST, 0);
            this.setState(gl.CULL_FACE, 0);
            this.setState(gl.BLEND, 0);

            if (!this.displayTexture) {
                this.displayTexture = {};
                this.displayTexture.program = Object.create(GLSLProgram);

                var vertexShader =  "precision highp float;" +
                    "attribute vec3 vert;"  +
                    "attribute vec2 uv;"  +
                    "uniform mat4 u_projMatrix; " +
                    "varying vec2 v_uv;"  +
                    "void main(void) { " +
                    "v_uv = uv;" +
                    "gl_Position = u_projMatrix * vec4(vert,1.0); }";

                var fragmentShader =    "precision highp float;" +
                    "uniform sampler2D u_texture;" +
                    "varying vec2 v_uv;"  +
                    " void main(void) { " +
                    " vec4 color = texture2D(u_texture, v_uv); " +
                    " gl_FragColor = color; }";

                this.displayTexture.program.initWithShaders({
                    "x-shader/x-vertex" : vertexShader ,
                    "x-shader/x-fragment" : fragmentShader
                });

                if (!this.displayTexture.program.build(gl)) {
                    console.log(this.displayTexture.program.errorLogs);
                }

                var vertices = [
                    - 1.0,-1, 0.0,      0,0,
                    1.0,-1, 0.0,        1,0,
                    -1.0, 1.0, 0.0,     0,1,
                    -1.0, 1.0, 0.0,     0,1,
                    1.0,-1, 0.0,        1,0,
                    1.0, 1.0, 0.0,      1,1];

                // Init the buffer
                this.displayTexture.vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.displayTexture.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            }
            var program = this.displayTexture.program;
            var vertexBuffer = this.displayTexture.vertexBuffer;

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

            var orthoMatrix = mat4.ortho(-1, 1, -1.0, 1, 0, 1000);

            var vertLocation = program.getLocationForSymbol("vert");
            var hasVertex = (typeof vertLocation !== "undefined");
            if (hasVertex) {
                gl.enableVertexAttribArray(vertLocation);
                gl.vertexAttribPointer(vertLocation, 3, gl.FLOAT, false, 20, 0);
            }
            var uvLocation = program.getLocationForSymbol("uv");
            var hasUV = (typeof uvLocation !== "undefined");
            if (hasUV) {
                gl.enableVertexAttribArray(uvLocation);
                gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 20, 12);
            }

            var textureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textureName);

            this.bindedProgram = program;

            var projectionMatrixLocation = program.getLocationForSymbol("u_projMatrix");
            if (projectionMatrixLocation) {
                program.setValueForSymbol("u_projMatrix",orthoMatrix);
            }

            var samplerLocation = program.getLocationForSymbol("u_texture");
            if (samplerLocation) {
                program.setValueForSymbol("u_texture", 0);
            }

            program.commit(gl);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            //restore values
            gl.bindTexture(gl.TEXTURE_2D, textureBinding);

            if (hasVertex)
                gl.disableVertexAttribArray(vertLocation);
            if (hasUV)
                gl.disableVertexAttribArray(uvLocation);

            this.setState(gl.DEPTH_TEST, restoreDepthState);
            this.setState(gl.CULL_FACE, restoreCullFace);
            this.setState(gl.BLEND, restoreBlend);
        }
    }
});

}})
;
//*/
montageDefine("f73ee10","ui/scene-view.reel/scene-view",{dependencies:["runtime/dependencies/gl-matrix","montage","montage/ui/component","runtime/glsl-program","runtime/helpers/resource-manager","runtime/glTF-scene","runtime/glTF-node","runtime/scene","runtime/node","runtime/scene-renderer","runtime/glTF-material","runtime/utilities","montage/core/dom","montage/core/geometry/point","montage/composer/translate-composer","runtime/builtin-assets","runtime/webgl-renderer","runtime/projection","runtime/animation","runtime/camera","runtime/scene-helper","controllers/camera-controller","runtime/transform","runtime/component-3d","runtime/action-dispatcher","montage/core/application","runtime/dependencies/webgl-debug"],factory:function(require,exports,module){/* <copyright>
Copyright (c) 2013, Fabrice Robinet.
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */
/**
    @module "montage/ui/view.reel"
    @requires montage
    @requires montage/ui/component
*/

require("runtime/dependencies/gl-matrix");
var Montage = require("montage").Montage;
var Component = require("montage/ui/component").Component;
var GLSLProgram = require("runtime/glsl-program").GLSLProgram;
var ResourceManager = require("runtime/helpers/resource-manager").ResourceManager;
var glTFScene = require("runtime/glTF-scene").glTFScene;
var glTFNode = require("runtime/glTF-node").glTFNode;
var Scene = require("runtime/scene").Scene;
var Node = require("runtime/node").Node;
var SceneRenderer = require("runtime/scene-renderer").SceneRenderer;
var glTFMaterial = require("runtime/glTF-material").glTFMaterial;
var Utilities = require("runtime/utilities").Utilities;
var dom = require("montage/core/dom");
var Point = require("montage/core/geometry/point").Point;
var TranslateComposer = require("montage/composer/translate-composer").TranslateComposer;
var BuiltInAssets = require("runtime/builtin-assets").BuiltInAssets;
var WebGLRenderer = require("runtime/webgl-renderer").WebGLRenderer;
var Projection = require("runtime/projection").Projection;
var BasicAnimation = require("runtime/animation").BasicAnimation;
var Camera = require("runtime/camera").Camera;
var BBox = require("runtime/utilities").BBox;
var SceneHelper = require("runtime/scene-helper").SceneHelper;
var CameraController = require("controllers/camera-controller").CameraController;
var Transform = require("runtime/transform").Transform;
var Component3D = require("runtime/component-3d").Component3D;
var ActionDispatcher = require("runtime/action-dispatcher").ActionDispatcher;
var Application = require("montage/core/application").Application;
require("runtime/dependencies/webgl-debug");
/**
    Description TODO
    @class module:"montage/ui/view.reel".view
    @extends module:montage/ui/component.Component
*/

exports.SceneView = Component.specialize( {

    /**
     * If true the viewer will automatically switch from one animated viewPoint to another
     * @type {boolean}
     * @default true
     */
    automaticallyCyclesThroughViewPoints: { value: true, writable: true },


    /**
     * If false the scene will be shown only when all resources have been loaded.
     * @type {boolean}
     * @default true
     */
    allowsProgressiveSceneLoading: { value:false, writable:true },

    /**
     * If false the scene will be shown only when all resources have been loaded.
     * @type {boolean}
     * @default true
     */
    allowsViewPointControl: { value: true, writable: true },

    /**
     * A Scene object from runtime/scene to be rendered by SceneView.
     * @type {object}
     * @default true
     */
    scene: {
        get: function() {
            return this._scene;
        },

        set: function(value) {
            if (value) {
                //FIXME:sort of a hack, only set the scene when ready
                if (value.isLoaded() === false) {
                    value.addOwnPropertyChangeListener("status", this);
                    return;
                } else {
                    this.needsDraw = true;
                }

            }

            if (this.scene != value) {
                this.sceneWillChange(value);
                this._scene = value;
                this.sceneDidChange();
            }
        }
    },

    /**
     * 
     * @type {object}
     */
    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            var id = this._viewPoint ? this._viewPoint.id : null;
            var upcomingId = value ? value.id : null;
            if (id != upcomingId) {
                var previousViewPoint = null;
                if (this._viewPoint && value) {
                    if (this._viewPoint.scene == value.scene) {
                        previousViewPoint = this._viewPoint;
                    }
                }
                this.viewPointWillChange(previousViewPoint, value);
                this._viewPoint = value;
                var animationManager = this.getAnimationManager();
                if (animationManager)
                    animationManager.sceneTime = 0;

                if (value) {
                    if (this.scene && (this._viewPoint.scene == null)) {
                        this._viewPoint.scene = this.scene;
                    }
                }
                this.viewPointDidChange();
            }
        }
    },

    play: {
        value: function() {
            switch (this._state) {
                case this.PAUSE:
                case this.STOP:
                    this._lastTime = Date.now();
                    this._state = this.PLAY;
                    this.needsDraw = true;
                    break;
                default:
                    break;
            }

            this._state = this.PLAY;
        }
    },

    pause: {
        value: function() {
            this._state = this.PAUSE;
        }
    },


    stop: {
        value: function() {
            var animationManager = this.getAnimationManager();
            if (animationManager) {
                animationManager.sceneTime = 0;
            }
            this._state = this.STOP;
            this.needsDraw = true;
        }
    },

    loops: { value: true, writable: true},

    /* Private / Internal section
        all the following section including constants and code is private 
    */

    STOP: { value: 0, writable: true },

    PLAY: { value: 1, writable: true },

    PAUSE: { value: 2, writable: true },
 
     _internalViewPoint: { value: null, writable: true },

    _firstFrameDidRender: { value: false, writable: true },

    _sceneResourcesLoaded: { value: false, writable: true },

    _scene: { value: null, writable: true },

    _consideringPointerForPicking: { writable: true, value: false },

    _mousePosition: { writable: true, value : null },

    _showGradient: { value: false, writable: true },

    _showReflection: { value: false, writable: true },

    _showBBOX: { value: false, writable: true },

    _width: { value: null, writable: true },

    _height: { value: null, writable: true },

    _lastTime: { value: 0, writable: true },

    _state: { value: 0, writable: true },

    _viewPoint: { value: null, writable: true },

    _sceneRenderer: { value: null, writable: true },

    _disableRendering: { value: false, writable: true },

    _contextAttributes : { value: null, writable: true },

    //FIXME: figure out why the clear made by the browser isn't performed when no draw element is performed
    _shouldForceClear: { value: false, writable: true },

    _viewPointIndex: { value: 0, writable: true },

    _cameraController: { value: null, writable: true },

    _defaultViewPoint: { value: null, writable:true },

    translateComposer: { value: null, writable: true },

    scaleFactor: { value: (window.devicePixelRatio || 1), writable: true},

    selectedNode: { value: null, writable:true },

    cameraController: {
        get: function() {
            if (this._cameraController == null) {
                this._cameraController = Montage.create(CameraController);
            }
            return this._cameraController;
        }
    },

    sceneTimeWillChange: {
        value: function(animation, upcomingSceneTime) {

        }
    },

    sceneTimeDidChange: {
        value: function(animation) {

            if (this.scene == null)
                return;
            if (this.scene.glTFElement == null) {
                return;
            }

            var endTime = this.scene.glTFElement.endTime;
            if ((endTime !== -1) && (this.sceneView != null)) {
                var animationManager = this.scene.glTFElement.animationManager;
                if (animationManager.sceneTime / 1000. > endTime) {
                    if (this.automaticallyCyclesThroughViewPoints == true) {
                        var viewPointIndex = this.sceneView._viewPointIndex; //_viewPointIndex is private in view, we could actually put/access this info from scene
                        var viewPoints = SceneHelper.getViewPoints(this.scene);
                        if (viewPoints.length > 0) {
                            var nextViewPoint;
                            var checkIdx = 0;
                            do {
                                animationManager.sceneTime = 0;
                                checkIdx++;
                                viewPointIndex = ++viewPointIndex % viewPoints.length;
                                nextViewPoint = viewPoints[viewPointIndex];
                            } while ((checkIdx < viewPoints.length) && (animationManager.nodeHasAnimatedAncestor(nextViewPoint.glTFElement) == false));
                            this.sceneView.viewPoint = nextViewPoint;
                        }
                    }
                }
            }
        }
    },

    sceneWillChange: {
        value: function(value) {
            if (this.getResourceManager()) {
                this.getResourceManager().reset();
            }
            this._firstFrameDidRender = false;

            if (this.delegate) {
                if (this.delegate.sceneWillChange) {
                    this.delegate.sceneWillChange(value);
                }
            }

            if (this._scene) {
                this._scene.removeEventListener("cursorUpdate", this);
                this._scene.removeEventListener("materialUpdate", this);
                this._scene.removeEventListener("textureUpdate", this);
                this.application.removeEventListener("sceneNodeSelected", this);
            }
        }
    },

    sceneDidChange: {
        value: function() {
            //FIXME: incoming scene should not be expected to be just non null
            if (this._scene) {
                this._sceneResourcesLoaded = false;
                this._scene.addEventListener("cursorUpdate", this);
                this._scene.addEventListener("textureUpdate", this);
                this._scene.addEventListener("materialUpdate", this);
                this.application.addEventListener("sceneNodeSelected", this);
                this.applyScene();
                if (this.delegate) {
                    if (this.delegate.sceneDidChange) {
                        this.delegate.sceneDidChange();
                    }
                }
            }
        }
    },

    // Resources
    resourceAvailable: {
        value: function(resource) {
            //only issue draw once all requests finished
            if (this.allowsProgressiveSceneLoading == false) {
                var resourceManager = this.getResourceManager();
                if (resourceManager) {
                    if (resourceManager.hasPendingRequests() == false) {
                        this.needsDraw = true;
                    }
                }
            }
        }
    },

    handleTextureUpdate: {
        value: function(evt) {
            var resourceManager = this.getResourceManager();
            if (resourceManager && this.sceneRenderer) {
                if (this.sceneRenderer.webGLRenderer) {
                    var webGLContext = this.sceneRenderer.webGLRenderer.webGLContext;
                    //trigger texture load/creation
                    var texture = resourceManager.getResource(evt.detail.value, this.sceneRenderer.webGLRenderer.textureDelegate, webGLContext);
                    if (texture) {
                        this.resourceAvailable();
                    }
                }
            }
        }
    },

    handleMaterialUpdate: {
        value: function(evt) {
            this.needsDraw = true;
        }
    },

    handleCursorUpdate: {
        value: function(evt) {
            if (this.element != null) {
                this.element.style.cursor = evt.detail;            
            }
        }
    },



    // Montage

    constructor: {
        value: function View() {
            this.super();
        }
    },


    animationDidStart: {
        value: function(animation) {
            this.needsDraw = true;
            //FIXME:Work-around a cursor issue as after a camera change
            this.element.style.cursor = "default";            
        }
    },

    animationDidStop: {
        value: function(animation) {
        }
    },

    animationDidUpdate: {
        value: function(animation) {
            var step = this._viewPointAnimationStep;
            var previousViewPoint = animation.extras["previousViewPoint"];
            if (this.__matrix == null)
                this.__matrix = mat4.create();
            if (this.__transform == null)
                this.__transform = Object.create(Transform).init();

            var t1 = previousViewPoint.glTFElement.transform;
            var t2 = this.viewPoint.glTFElement.transform;

            t1.interpolateToTransform(t2, step, this.__transform);
            mat4.multiply(this.viewPoint.glTFElement.parent.worldMatrix, this.__transform.matrix, this.__matrix);
            this._internalViewPoint.transform.matrix = this.__matrix;
        }
    },

    viewPointWillChange: {
        value:function(previousViewPoint, newViewPoint) {
            if (this.sceneRenderer) {
                if (newViewPoint) {
                    if (this.scene.glTFElement) {
                        var animationManager = this.getAnimationManager();
                        //we do not animate already animated cameras
                        var hasStaticViewPoint = animationManager.nodeHasAnimatedAncestor(newViewPoint.glTFElement) == false;
                        if (hasStaticViewPoint == false && previousViewPoint != null) {
                            hasStaticViewPoint |= animationManager.nodeHasAnimatedAncestor(previousViewPoint.glTFElement) == false;
                        }
                        if (hasStaticViewPoint && (previousViewPoint != null)) {
                            /* manually add the animation to handle the camera blending */
                            var viewPointAnimationStep = Object.create(BasicAnimation).init();

                            viewPointAnimationStep.path = "_viewPointAnimationStep";
                            viewPointAnimationStep.target = this;
                            viewPointAnimationStep.delegate = this;
                            viewPointAnimationStep.from = Number(0);
                            viewPointAnimationStep.to = Number(1);
                            viewPointAnimationStep.duration = 1000;
                            viewPointAnimationStep.timingFunction = "ease-out";

                            viewPointAnimationStep.extras["previousViewPoint"] = previousViewPoint;

                            animationManager.playAnimation(viewPointAnimationStep);

                            //FIXME: This is an internal detail exposed for now
                            viewPointAnimationStep.animationWasAddedToTarget();
                        }
                    }
                }
            }
        }
    },

    viewPointDidChange: {
        value:function() {
            this.cameraController.viewPoint = this.viewPoint;

            if (this.sceneRenderer) {
                if (this._viewPoint) {
                    if (this.scene) {
                        if (this.scene.glTFElement) {
                            this.sceneRenderer.technique.rootPass.viewPoint = this._internalViewPoint;
                            this._viewPointIndex = this._getViewPointIndex(this.viewPoint);
                            this.needsDraw = true;
                        }
                    }
                }
            }
        }
    },

    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            var id = this._viewPoint ? this._viewPoint.id : null;
            var upcomingId = value ? value.id : null;
            if (id != upcomingId) {
                var previousViewPoint = null;
                if (this._viewPoint && value) {
                    if (this._viewPoint.scene == value.scene) {
                        previousViewPoint = this._viewPoint;
                    }
                }
                this.viewPointWillChange(previousViewPoint, value);
                this._viewPoint = value;
                var animationManager = this.getAnimationManager();
                if (animationManager)
                    animationManager.sceneTime = 0;

                if (value) {
                    if (this.scene && (this._viewPoint.scene == null)) {
                        this._viewPoint.scene = this.scene;
                    }
                }
                this.viewPointDidChange();
            }
        }
    },

    canvas: {
        get: function() {
            if (this.templateObjects) {
                return this.templateObjects.canvas;
            } 
            return null;
        }
    },

    sceneRenderer: {
        get: function() {
            return this._sceneRenderer;
        },
        set: function(value) {
            if (value != this._sceneRenderer) {
                this._sceneRenderer = value;
            }
        }
    },

    handleStatusChange: {
        value: function(status, key, object) {
            if (status === "loaded") {
                this.scene = object;
                this.needsDraw = true;

                if (this.scene.glTFElement) {
                    if (this.scene.glTFElement.animationManager) {
                        if (this.scene.glTFElement.animationManager) {
                            this.scene.glTFElement.animationManager.delegate = this;
                        }
                    }
                }
            }
        }
    },

    //FIXME: cache this in the scene
    _getViewPointIndex: {
        value: function(viewPoint) {
            var viewPoints = SceneHelper.getGLTFViewPoints(viewPoint.scene);

            for (var i = 0 ; i < viewPoints.length ; i++) {
                if (viewPoints[i].baseId === viewPoint.id)
                    return i;
            }
            return 0;
        }
    },

    applyScene: {
        value:function () {
            var m3dScene = this.scene;
            var scene = m3dScene.glTFElement;
            var self = this;
            if (this.sceneRenderer) {
                if (this.sceneRenderer.technique.rootPass) {
                    if (scene) {
                        var viewPoints= SceneHelper.getViewPoints(m3dScene);
                        var hasCamera = viewPoints.length > 0;
                        // arbitry set first coming camera as the view point
                        if (hasCamera) {
                            var shouldKeepViewPoint = false;
                            if (this.viewPoint) {
                                if (this.viewPoint.scene) {
                                    shouldKeepViewPoint = (this.viewPoint.scene === this.scene); 
                                }                                   
                            }
                            if (shouldKeepViewPoint === false) {
                                this.viewPoint = viewPoints[0];
                            }
                        } else {
                            var sceneBBox =  scene.rootNode.getBoundingBox(true);
                            var bbox = Object.create(BBox).init(sceneBBox[0], sceneBBox[1]);
                            scene.rootNode.transform._updateDirtyFlag(false);
                            var glTFScene = this.scene.glTFElement;
                            var sceneBBox =  glTFScene.rootNode.getBoundingBox(true);
                            var midPoint = [
                                (sceneBBox[0][0] + sceneBBox[1][0]) / 2,
                                (sceneBBox[0][1] + sceneBBox[1][1]) / 2,
                                (sceneBBox[0][2] + sceneBBox[1][2]) / 2];
                            var viewPortDistance = midPoint[2];
                            var eye = [midPoint[0], midPoint[1], midPoint[2]];
                            eye[2] += (sceneBBox[1][0] - sceneBBox[0][0]) + (sceneBBox[1][2] - sceneBBox[0][2]);

                            this._defaultViewPoint = SceneHelper.createNodeIncludingCamera("camera01", m3dScene);
                            var glTFCamera = SceneHelper.getGLTFCamera(this._defaultViewPoint);

                            glTFCamera.projection.zfar = eye[2] + sceneBBox[1][2] - sceneBBox[0][2];
                            this._defaultViewPoint.glTFElement.transform.translation = eye;
                            this.viewPoint = this._defaultViewPoint;
                        }

                        this.sceneRenderer.scene = scene;
                    }

                    if (this.viewPoint) {
                        if (this.viewPoint.scene == null) {
                            this.viewPoint.scene = m3dScene;
                        }
                        if (this.sceneRenderer) {
                            this.viewPointDidChange();
                        }
                    }

                    if (this.allowsProgressiveSceneLoading === false) {
                        var renderPromise = this.scene.prepareToRender(this.sceneRenderer.webGLRenderer);
                        renderPromise.then(function () {
                            self._sceneResourcesLoaded = true;
                            self.needsDraw = true;
                        }, function (error) {
                        }, function (progress) {
                        });

                    } else {
                        this.needsDraw = true;
                    }
                }
            }
        }
    },

    getRelativePositionToCanvas: {
        value: function(event) {
            return dom.convertPointFromPageToNode(this.canvas, Point.create().init(event.pageX, event.pageY));
        }
    },

    captureResize: {
        value: function() {
            this.needsDraw = true;
        }
    },

    enterDocument: {
        value: function(firstTime) {
            var self = this;
            window.addEventListener("resize", this, true);

            if (this.scene) {
                this.scene.dispatchEventNamed("enteredDocument", true, false, this);
                this.scene.loadCSSStyles();
            }

            this.element.addEventListener('wheel', function (event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.zoom(event);
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }, false);

            this.element.addEventListener('gesturestart', function (event) {
                event.preventDefault();
            }, false);

            this.element.addEventListener('gesturechange', function (event) {
                event.preventDefault();
            }, false);

            var composer = this.translateComposer;

            composer.addEventListener("translate", function(event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.translate(event);
                    }
                }
                self.needsDraw = true;
            });

            composer.addEventListener('translateStart', function (event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.beginTranslate(event);
                    }
                }
            }, false);

            composer.addEventListener('translateEnd', function (event) {
                if ((self.allowsViewPointControl == true) && (self.scene != null)) {
                    if (self.scene.rootNode) {
                        self.cameraController.node = self.scene.rootNode;
                        self.cameraController.endTranslate(event);
                    }
                }
            }, false);

            this.addComposerForElement(composer, this.canvas);

            /* Hack for MON-420 */
            var wheelEventName;
            if (typeof window.onwheel !== "undefined"){
                wheelEventName = "wheel";
            } else {
                wheelEventName = "mousewheel";
            }
            this.canvas.removeEventListener(wheelEventName, composer, true);
            this.canvas.removeEventListener(wheelEventName, composer, false);

            var simulateContextLoss = false;  //Very naive for now

            if (simulateContextLoss) {
                this.canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(this.canvas);
            }

            var webGLOptions = {  premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: false };
            var webGLContext =  this.canvas.getContext("experimental-webgl", webGLOptions) ||
                                this.canvas.getContext("webgl", webGLOptions);

            function throwOnGLError(err, funcName, args) {
                throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
            };

            //webGLContext = WebGLDebugUtils.makeDebugContext(webGLContext, throwOnGLError);

            if (webGLContext == null) {
                console.log("Please check that your browser enables & supports WebGL");
                return
            }

            this._contextAttributes = webGLContext.getContextAttributes();
            var antialias = false;
            if (this._contextAttributes) {
                antialias = this._contextAttributes.antialias;
            }
            if (antialias == false) {
                console.log("WARNING: anti-aliasing is not supported/enabled")
            }

            //check from http://davidwalsh.name/detect-ipad
            if (navigator) {
                // For use within normal web clients
                var isiPad = navigator.userAgent.match(/iPad/i) != null;
                if (isiPad == false) {
                    // For use within iPad developer UIWebView
                    // Thanks to Andrew Hedges!
                    var ua = navigator.userAgent;
                    isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
                }
                if (isiPad) {
                    this._shouldForceClear = true;
                }
            }

            var webGLRenderer = Object.create(WebGLRenderer).initWithWebGLContext(webGLContext);
            webGLContext.enable(webGLContext.DEPTH_TEST);
            var options = null;
            this.sceneRenderer = Object.create(SceneRenderer);
            this.sceneRenderer.init(webGLRenderer, options);

            var resourceManager = this.getResourceManager();
            if (!resourceManager.isObserving()) {
                resourceManager.observers.push(this);
                resourceManager.startObserving();
            }

            if (this.scene)
                this.applyScene();

            this.canvas.addEventListener("webglcontextlost", function(event) {
                console.log("context was lost");
                event.preventDefault();
                self.getResourceManager.stopObserving();
                self.sceneRenderer.webGLRenderer.resourceManager.reset();
                self.needsDraw = false;
                self._disableRendering = true;
            }, false);

            this.canvas.addEventListener("webglcontextrestored", function(event) {
                console.log("context was restored");
                event.preventDefault();
                webGLContext.enable(webGLContext.DEPTH_TEST);
                self.needsDraw = true;
                self._disableRendering = false;
            }, false);

            if (simulateContextLoss) {
                setTimeout(function() {
                    self.canvas.loseContext();
                }, 5000);
            }

            //setup gradient
            var self = this;
            var techniquePromise = BuiltInAssets.assetWithName("gradient");
            techniquePromise.then(function (glTFScene_) {
                var scene = Montage.create(Scene).init(glTFScene_);
                self.gradientRenderer = Object.create(SceneRenderer);
                self.gradientRenderer.init(webGLRenderer, null);
                self.gradientRenderer.scene = scene.glTFElement;
                var viewPoints = SceneHelper.getViewPoints(scene);
                if (viewPoints) {
                    if (viewPoints.length) {
                        self.gradientRenderer.technique.rootPass.viewPoint = viewPoints[0].glTFElement;
                    }
                }
                self.needsDraw = true;
            }, function (error) {
            }, function (progress) {
            });

            this.actionDispatcher = ActionDispatcher.create().initWithScene(this.scene);

            this.needsDraw = true;

            this.canvas.addEventListener('touchstart', this.start.bind(this), true);
            this.canvas.addEventListener('touchend', this.end.bind(this), true);
            this.canvas.addEventListener('touchcancel', this.end.bind(this), true);
            this.canvas.addEventListener('touchmove', this.move.bind(this), true);
            this.canvas.addEventListener('gesturechange', this, true);
            this.canvas.addEventListener('mousedown', this.start.bind(this), true);
            this.canvas.addEventListener('mouseup', this.end.bind(this), true);
            this.canvas.addEventListener('mousemove', this.move.bind(this), true);
            this.canvas.addEventListener('wheel', this, true);
        }
    },

    exitDocument: {
        value: function() {
            window.removeEventListener("resize", this, true);
        }
    },

    captureMousewheel: {
        value: function() {
            this.needsDraw = true;
        }
    },

    captureWheel: {
        value: function() {
            this.needsDraw = true;
        }
    },

    captureGesturechange: {
        value: function() {
            this.needsDraw = true;
        }
    },

    _TOUCH_DOWN: { value: 0 },

    _TOUCH_UP: { value: 1 },

    _TOUCH_MOVE: { value: 2 },

    _eventType: { value: -1, writable: true },

    _previousNodeEventType: { value: -1, writable: true },

    _previousHandledNode: { value: null, writable: true },

    handleSelectedNode: {
        value: function(glTFElementID) {
            var glTFElement = null,
                previousGlTFElement = this._previousHandledNode,
                previousHandledComponent3D = previousGlTFElement ? previousGlTFElement.component3D : null;

            if (this._eventType === this._TOUCH_UP) {
                if (previousGlTFElement && previousHandledComponent3D) {
                    previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._TOUCH_UP);
                }

                this._eventType = -1;
            }

            if (glTFElementID) {
                glTFElement = this.scene.glTFElement.ids[glTFElementID];

                if (this._eventType === this._TOUCH_DOWN) {
                    var node = SceneHelper.createNodeFromGlTFElementIfNeeded(glTFElement, this.scene);
                    this.application.dispatchEventNamed("sceneNodeSelected", true, true, node);
                }

            }

            //are we out of a move ?
            if (previousGlTFElement && previousHandledComponent3D && this._previousNodeEventType === this._TOUCH_MOVE &&
                glTFElement !== previousGlTFElement) {
                previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._EXIT);
            }

            if (this._eventType === this._TOUCH_MOVE && glTFElement !== previousGlTFElement) {
                if (glTFElement) {
                    this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._ENTER, glTFElement);
                } else {
                    this._eventType = -1;
                }
            } else if (glTFElement && this._eventType === this._TOUCH_DOWN) {
                this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._TOUCH_DOWN, glTFElement);
                this._eventType = -1;
            }

            this._previousHandledNode = glTFElement;
            this._previousNodeEventType = this._eventType;
        }
    },

    _previousMaterialEventType: { value: -1, writable: true },

    _previousHandledMaterial: { value: null, writable: true },

    handleSelectedMaterial: {
        value: function(glTFElementID) {
            var glTFElement = null,
                previousGlTFElement = this._previousHandledMaterial,
                previousHandledComponent3D = previousGlTFElement ? previousGlTFElement.component3D : null;

            if (this._eventType === this._TOUCH_UP) {
                if (previousGlTFElement && previousHandledComponent3D) {
                    previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._TOUCH_UP);
                }

                this._eventType = -1;
            }

            if (glTFElementID) {
                glTFElement = this.scene.glTFElement.ids[glTFElementID];

                if (this._eventType === this._TOUCH_DOWN) {
                    var material = SceneHelper.createMaterialFromGlTFElementIfNeeded(glTFElement, this.scene);
                    this.application.dispatchEventNamed("sceneMaterialSelected", true, true, material);
                }

            }

            //are we out of a move ?
            if (previousGlTFElement && previousHandledComponent3D && this._previousMaterialEventType === this._TOUCH_MOVE &&
                glTFElement !== previousGlTFElement) {
                previousHandledComponent3D.handleActionOnGlTFElement(previousGlTFElement, Component3D._EXIT);
            }

            if (this._eventType === this._TOUCH_MOVE && glTFElement !== previousGlTFElement) {
                if (glTFElement) {
                    this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._ENTER, glTFElement);
                } else {
                    this._eventType = -1;
                }
            } else if (glTFElement && this._eventType === this._TOUCH_DOWN) {
                this.actionDispatcher.dispatchActionOnGlTFElement(Component3D._TOUCH_DOWN, glTFElement);
                this._eventType = -1;
            }

            this._previousHandledMaterial = glTFElement;
            this._previousNodeEventType = this._eventType;
        }
    },


    move: {
        value: function (event) {
            var position = this.getRelativePositionToCanvas(event);
            this._mousePosition = [position.x * this.scaleFactor,  (this.height * this.scaleFactor)- (position.y * this.scaleFactor)];
            this._eventType = this._TOUCH_MOVE;
            this.needsDraw = true;
        }
    },

    start: {
        value: function (event) {
            event.preventDefault();
            this._consideringPointerForPicking = true;
            var position = this.getRelativePositionToCanvas(event);
            this._mousePosition = [position.x * this.scaleFactor,  (this.height * this.scaleFactor) - (position.y * this.scaleFactor)];

            if (this._state === this.PLAY) {
                this.pause();
            }

            this._eventType = this._TOUCH_DOWN;

            this.needsDraw = true;
        }
    },

    end:{
        value: function (event) {
            if (this._consideringPointerForPicking && event.target === this.canvas) {
                event.preventDefault();
            }

            if (this._state === this.PAUSE) {
                if (this.scene && this.viewPoint) {
                    if (this.scene.glTFElement) {
                        var animationManager = this.getAnimationManager();
                        if (animationManager.nodeHasAnimatedAncestor(this.viewPoint.glTFElement)) {
                            this.play();
                        }
                    }
                }
            }

            this._consideringPointerForPicking = false;
            this._eventType = this._TOUCH_UP;
            this.handleSelectedNode(null);
            this._mousePosition = null;
        }
    },

    getWebGLRenderer: {
        value: function() {
            return this.sceneRenderer ? this.sceneRenderer.webGLRenderer : null;
        }
    },

    getWebGLContext: {
        value: function() {
            var renderer = this.getWebGLRenderer();
            return renderer ? renderer.webGLContext : null;
        }
    },

    getResourceManager: {
        value: function() {
            var renderer = this.getWebGLRenderer();
            return renderer ? renderer.resourceManager : null;
        }
    },

    getAnimationManager: {
        value: function() {
            if (this.scene) {
                if (this.scene.glTFElement) {
                    return this.scene.glTFElement.animationManager;
                }
            }
            return null;
        }
    },

    showBBOX: {
        get: function() {
            return this._showBBOX;
        },
        set: function(flag) {
            if (flag != this._showBBOX) {
                this._showBBOX = flag;
                this.needsDraw = true;
            }
        }
    },

    showGradient: {
        get: function() {
            return this._showGradient;
        },
        set: function(flag) {
            if (flag != this._showGradient) {
                this._showGradient = flag;
                this.needsDraw = true;
            }
        }
    },

    showReflection: {
        get: function() {
            return this._showReflection;
        },
        set: function(flag) {
            this._showReflection = flag;
            this.needsDraw = true;
        }
    },

    handleSceneNodeSelected: {
        value: function(event) {
            this.selectedNode = event.detail;
            this.needsDraw = true;
        }
    },

    _displayBBOX: {
        value: function(glTFNode) {
            if (!this.scene)
                return;
            if (this.scene.glTFElement) {
                if (glTFNode.getBoundingBox != null) { //work-around issue with scene-tree
                    var cameraMatrix = this.sceneRenderer.technique.rootPass.scenePassRenderer._viewPointMatrix;    
                    var glTFCamera = SceneHelper.getGLTFCamera(this.viewPoint);
                    if (glTFCamera != null) {
                        var projectionMatrix = glTFCamera.projection.matrix;
                        this.getWebGLRenderer().drawBBOX(glTFNode.getBoundingBox(true), cameraMatrix, mat4.identity(), projectionMatrix);
                    }
                }
            }
        }
    },

    _displayAllBBOX: {
        value: function() {
            if (!this.scene)
                return;
            if (this.scene.glTFElement) {
                var cameraMatrix = this.sceneRenderer.technique.rootPass.scenePassRenderer._viewPointMatrix;            
                var ctx = mat4.identity();
                var node = this.scene.glTFElement.rootNode;
                var self = this;

                node.apply( function(node, parent, ctx) {
                        self._displayBBOX(node);
                    return null;
                }, true, ctx);
            }
        }
    },

    width: {
        get: function() {
            if (this._width != null)
                return this._width;
            var gl = this.getWebGLContext();
            return gl != null ? gl.canvas.clientWidth : 0;
        },
        set: function(value) {
            if (this._width != value) {
                this._width = value;
                this.needsDraw = true;
            }
        }
    },

    height: {
        get: function() {
            if (this._height != null)
                return this._height;
            var gl = this.getWebGLContext();
            return gl != null ? gl.canvas.clientHeight : 0;
        },
        set: function(value) {
            if (this._height != value) {
                this._height = value;
                this.needsDraw = true;
            }
        }
    },

    _forwardToNextAnimatedViewPointIfNeeded: {
        value: function() {
            var animationManager = this.getAnimationManager();
            if (animationManager) {
                if (animationManager.nodeHasAnimatedAncestor(this.viewPoint.glTFElement) == true) {
                    return;
                }
                var viewPointIndex = this._viewPointIndex; //_viewPointIndex is private in view, we could actually put/access this info from scene
                var viewPoints = SceneHelper.getViewPoints(this.scene);
                if (viewPoints.length > 1) {
                    var nextViewPoint = this.viewPoint;
                    var checkIdx = 0;
                    while ((checkIdx < viewPoints.length) && (animationManager.nodeHasAnimatedAncestor(nextViewPoint.glTFElement) == false)) {
                        viewPointIndex = ++viewPointIndex % viewPoints.length;
                        nextViewPoint = viewPoints[viewPointIndex];
                        checkIdx++;
                    }
                    this.viewPoint = nextViewPoint;
                }
            }
        }
    },

    draw: {
        value: function() {
            //Update canvas when size changed
            var webGLContext = this.getWebGLContext();
            if (webGLContext == null || this._disableRendering)
                return;
            this.sceneRenderer.technique.rootPass.viewPoint = this._internalViewPoint;

            //WebGL does it for us with preserveDrawBuffer = false
            if (this._shouldForceClear || (this._contextAttributes.preserveDrawingBuffer == null) || (this._contextAttributes.preserveDrawingBuffer == true)) {
                webGLContext.clearColor(0,0,0,0.);
                webGLContext.clear(webGLContext.DEPTH_BUFFER_BIT | webGLContext.COLOR_BUFFER_BIT);
            }

            if (this.delegate) {
                if (this.delegate.sceneWillDraw) {
                    this.delegate.sceneWillDraw();
                }
            }

            if ((this.allowsProgressiveSceneLoading === false) && (this._sceneResourcesLoaded === false)) {
                return;
            }

            if (this._scene == null || this.viewPoint == null || this._disableRendering)
                return;


            this.resizeIfNeeded();
            var viewPoint = this.viewPoint;
            var self = this;
            var time = Date.now();

            if (this.sceneRenderer && this.scene) {
                var animationManager = this.getAnimationManager();
                if (this._state == this.PLAY && animationManager) {
                    this._forwardToNextAnimatedViewPointIfNeeded();
                    animationManager.sceneTime += time - this._lastTime;
                    var endTime = this.scene.glTFElement.endTime;
                    if (animationManager.sceneTime / 1000. > endTime) {
                        if (this.loops) {
                            animationManager.sceneTime = endTime == 0 ? 0 : animationManager.sceneTime % endTime;
                        } else {
                            this.stop();
                        }
                    }
                    animationManager.updateTargetsAtTime(animationManager.sceneTime, this.getResourceManager());
                }

                if (viewPoint.glTFElement) {
                    var glTFCamera = SceneHelper.getGLTFCamera(viewPoint);
                    glTFCamera.projection.aspectRatio =  this.width / this.height;

                    this._internalViewPoint.transform.matrix = viewPoint.glTFElement.worldMatrix;
                    if (this._internalViewPoint.cameras != null) {
                        if (this._internalViewPoint.cameras.length > 0)
                            this._internalViewPoint.cameras[0] = glTFCamera;
                    }
                }
                animationManager.evaluateAtTime(time, this.getResourceManager());
                if (animationManager.hasActiveAnimations()) {
                    this.needsDraw = true;
                }
            }
            this._lastTime = time;

            if (this._state == this.PLAY)
               this.needsDraw = true;

            if (this.scene) {
                var renderer = this.sceneRenderer.webGLRenderer;
                if (webGLContext) {
                    if (this.__renderOptions == null)
                        this.__renderOptions = {};

                    //FIXME: on the iPad with private function to enable webGL there was an issue with depthMask (need to re-check if that got fixed)
                    var allowsReflection = this.showReflection;
                    if(allowsReflection) {
                        /* ------------------------------------------------------------------------------------------------------------
                         Draw reflected scene
                        ------------------------------------------------------------------------------------------------------------ */
                        webGLContext.depthFunc(webGLContext.LESS);
                        webGLContext.enable(webGLContext.DEPTH_TEST);
                        webGLContext.frontFace(webGLContext.CW);
                        webGLContext.depthMask(true);
                        //should retrieve by node
                        var rootNode = this.scene.glTFElement.rootNode;
                        var nodeBBOX = rootNode.getBoundingBox(true);
                        var savedTr = mat4.create(rootNode.transform.matrix);
                        var scaleMatrix = mat4.scale(mat4.identity(), [1, 1, -1]);
                        mat4.multiply(scaleMatrix, rootNode.transform.matrix) ;
                        rootNode.transform.matrix = scaleMatrix;
                        var invVNodeBBOX = rootNode.getBoundingBox(true);
                        var mirrorMatrix = mat4.identity();
                        var translationMatrix = mat4.translate(mat4.identity(), [0, 0,  (nodeBBOX[0][2] - invVNodeBBOX[1][2])]);
                        mat4.multiply(mirrorMatrix, translationMatrix);
                        mat4.multiply(mirrorMatrix, scaleMatrix);
                        rootNode.transform.matrix = mirrorMatrix;
                        this.sceneRenderer.render(time, this.__renderOptions);
                        rootNode.transform.matrix = savedTr;
                        webGLContext.frontFace(webGLContext.CCW);
                    }

                    if (this.showGradient || allowsReflection) {
                        //FIXME:For now, just allow reflection when using default camera
                        if (this.viewPoint === this._defaultViewPoint) {
                            if (this.gradientRenderer) {
                                webGLContext.enable(webGLContext.BLEND);
                                webGLContext.disable(webGLContext.DEPTH_TEST);
                                webGLContext.disable(webGLContext.CULL_FACE);
                                webGLContext.depthMask(false);
                                this.gradientRenderer.render(time, this.__renderOptions);
                                webGLContext.depthMask(true);
                                webGLContext.enable(webGLContext.DEPTH_TEST);
                                webGLContext.enable(webGLContext.CULL_FACE);
                                webGLContext.disable(webGLContext.BLEND);
                            }
                        }
                    }

                    if (this._mousePosition != null) {
                        if (this.scene.nodesShouldBeHitTested) {
                            this.__renderOptions.picking = true;
                            this.__renderOptions.coords = this._mousePosition;
                            this.__renderOptions.delegate = this;
                            this.__renderOptions.pickingMode = "node";
                            this.sceneRenderer.render(time, this.__renderOptions);
                        } 
                        if (this.scene.materialsShouldBeHitTested) {
                            this.__renderOptions.picking = true;
                            this.__renderOptions.coords = this._mousePosition;
                            this.__renderOptions.delegate = this;
                            this.__renderOptions.pickingMode = "material";
                            this.sceneRenderer.render(time, this.__renderOptions);
                        }
                    }

                    this.__renderOptions.picking = false;
                    this.__renderOptions.coords = null;
                    this.__renderOptions.delegate = null;
                    this.__renderOptions.pickingMode = null;

                    this.sceneRenderer.render(time, this.__renderOptions);

                    //FIXME: ...create an API to retrieve the actual viewPoint matrix...
                    if (this.showBBOX) {
                        this._displayAllBBOX();
                    }
                    
                    if (this.delegate) {
                        if (this.delegate.sceneDidDraw) {
                            this.delegate.sceneDidDraw();
                        }
                    }

                    webGLContext.flush();

                    if (this._firstFrameDidRender === false) {
                        this._firstFrameDidRender = true;
                        this.dispatchEventNamed("firstFrameDidRender", true, false, this);
                    }

                    /*
                    var error = webGLContext.getError();
                    if (error != webGLContext.NO_ERROR) {
                        console.log("gl error"+webGLContext.getError());
                    }
                    */
                }
            }
        }
    },

    resizeIfNeeded: {
        value: function(evt) {
            var gl = this.getWebGLContext();
            if (gl == null)
                return;
            var width = this.width * this.scaleFactor;
            var height = this.height * this.scaleFactor;
            if (gl.canvas.width != width || gl.canvas.height != height) {
                gl.canvas.width = width;
                gl.canvas.height = height;
                if (this._width != null)
                    this.element.style.width = this.width + "px";;
                if (this._height != null)
                    this.element.style.height = this.height + "px";;
                gl.viewport(0, 0, width, height);
            }
        }
    },

    templateDidLoad: {
        value: function() {
            var self = this;

            var parent = this.parentComponent;
            var animationTimeout = null;
            var composer = TranslateComposer.create();
            composer.animateMomentum = true;
            composer.hasMomentum = true;
            composer.allowFloats = true;
            composer.pointerSpeedMultiplier = 0.15;
            this._internalViewPoint = SceneHelper.createGLTFNodeIncludingCamera("__internal_viewPoint__");
            this.translateComposer = composer;

            this.needsDraw = true;
        }
    }
});


}})
;
//*/
montageDefine("f73ee10","runtime/component-3d",{dependencies:["montage","runtime/glTF-node","runtime/transform","montage/core/target","collections/set","cssom","runtime/dependencies/gl-matrix"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet
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
var Transform = require("runtime/transform").Transform;
var Target = require("montage/core/target").Target;
var Set = require("collections/set");
var CSSOM = require("cssom");
require("runtime/dependencies/gl-matrix");

//FIXME: add a state to now that resolution of id pending to avoid adding useless listeners
//This currently *can't* happen with the code path in use, the API would allow it.
exports.Component3D = Target.specialize( {

    _ENTER: { value: "COMPONENT_ENTER"},

    _EXIT: { value: "COMPONENT_EXIT"},

    _TOUCH_DOWN: { value: "_TOUCH_DOWN"},

    _TOUCH_UP: { value: "_TOUCH_UP"},

    //FIXME: work-around
    self: {
        get: function() {
            return this;
        }
    },

    constructor: {
        value: function Component3D() {
            this._hasUnresolvedId = true;
            this._state = this.__STYLE_DEFAULT__;
            this.super();
        }
    },

    handleEnteredDocument: {
        value: function() {
        }
    },

    shouldPerformHitTest: { value: false },

    addEventListener: {
        value: function addEventListener(type, listener, useCapture) {
            if (this.scene) {
                var className = Montage.getInfoForObject(this).objectName;
                if (className == "Node") {
                    this.scene.nodesShouldBeHitTested = true;
                } else if (className == "Material") {
                    this.scene.materialsShouldBeHitTested = true;
                }
            }    
            this.shouldPerformHitHest = true;

            this.super(type, listener, useCapture);
        }
    },

    _glTFElement: { value : null, writable: true },

    glTFElement: {
        get: function() {
            return this._glTFElement;
        },
        set: function(value) {
            this._glTFElement = value;
        }
    },

    _scene: { value : null, writable: true },

    scene: {
        get: function() {
            return this._scene;
        },
        set: function(value) {
            this._scene = value;
            this._sceneDidChange();
        }
    },

    baseURL: {
        get: function() {
            return this.scene ? this.scene.glTFElement.baseURL : null;
        }
    },

    _isAbsolutePath: {
        value: function(path) {
            var isAbsolutePathRegExp = new RegExp("^"+window.location.protocol, "i");

            return path.match(isAbsolutePathRegExp) ? true : false;
        }
    },

    resolvePathIfNeeded: {
        value: function(path) {
            if (this._isAbsolutePath(path)) {
                return path;
            }

            return this.baseURL + path;
        }
    },

    name: {
        get: function() {
            if (this.glTFElement) {
                return this.glTFElement.name;
            }
        },
        set: function(value) {
            if (this.glTFElement) {
                this.glTFElement.name = value;
            }
        }
    },

    _hasUnresolvedId: { value: false, writable: true },

    handleStatusChange: {
        value: function(status, key, object) {
            if (status === "loaded") {
                if (this._id) {
                    this.glTFElement = this.scene.glTFElement.ids[this._id];
                    if (this.glTFElement == null) {
                        //FIXME: this should be probably fixed at the loader level instead of having a special case for root. TBD
                        if (this.scene.glTFElement.rootNode.id == this._id) {
                            this.glTFElement = this.scene.glTFElement.rootNode;
                        }
                    }
                    if (this.glTFElement) {
                        this._hasUnresolvedId = false;

                        //FIXME: this dependency could be broken by either:
                        // - creating a notification center
                        // - make glTFElement launch events
                        this.glTFElement.component3D = this;

                        this.classListDidChange();
                        if (this.shouldPerformHitHest) {
                            this.scene.shouldBeHitTested = true;
                        }
                    }
                }
            }
        }
    },

    resolveIdIfNeeded: {
        value: function() {
            if (this._hasUnresolvedId && this.scene != null) {
                if (this.scene.status !== "loaded") {
                    this.scene.addOwnPropertyChangeListener("status", this);
                    return;
                }

                if (this._id) {
                    this.handleStatusChange(this.scene.status, "status", this.scene);
                }
            }
        }
    },

    _idDidChange: {
        value: function() {
            this.resolveIdIfNeeded();
        }
    },

    _sceneDidChange: {
        value: function() {
            this.resolveIdIfNeeded();
            if (this.scene) {
                this.scene.addEventListener("enteredDocument", this);
                this.scene.addEventListener("styleSheetsDidLoad", this);
            }
        }
    },

    __STYLE_DEFAULT__ : { value: "__default__"},

    _state: { value: this.__STYLE_DEFAULT__, writable: true },

    _stateForSelectorName: {
        value: function(selectorName) {
            var state = null;

            if (selectorName.indexOf(":active") !== -1) {
                if (this.scene) {
                    this.scene.shouldBeHitTested = true;
                }
                return "active";
            } else if (selectorName.indexOf(":hover") !== -1) {
                if (this.scene) {
                    this.scene.shouldBeHitTested = true;
                }
                return "hover";
            } else if (selectorName.indexOf(":") !== -1) {
                return  null;
            }

            //that's fragile, we won't need this once we handle all states
            return this.__STYLE_DEFAULT__;
        }
    },

    _style: { value: null, writable: true },

    _defaultTransition: { value: {"duration" : 0, "timingFunction" : "ease", "delay" : 0 } },

    _createDefaultStyleIfNeeded: {
        value: function() {
            if (this._style == null) {
                this._style = {};
            }
            if (this._style.transitions == null) {
                this._style.transitions = {};
            }
            return this._style;
        }
    },

    _createStyleStateAndPropertyIfNeeded:  {
        value: function(state, property) {
            var style = this._createDefaultStyleIfNeeded();

            if (style[state] == null) {
                style[state] = {};
            }

            var stateValue = style[state];
            if (stateValue[property] == null) {
                stateValue[property] = {};
            }

            return stateValue[property];
         }
    },

    _getStylePropertyObject: {
        value: function(state, property) {
            return this._createStyleStateAndPropertyIfNeeded(state, property);
        }
    },

    _checkTransformConsistency: {
        value : function(floatValues, expectedComponentsCount) {
            if (floatValues.length != expectedComponentsCount) {
                console.log("Component3D: CSS transform ignored got:"+floatValues.length+" but expecting:"+expectedComponentsCount);
                return false;
            }
            return true;
        }
    },

    _createVectorFromCSSTransformOriginDeclaration: {
        value: function(declaration) {
            var components = declaration.split(" ");
            var transformOrigin;

            if (components.length >= 2) {
                transformOrigin = vec2.create();

                transformOrigin[0] = parseFloat(components[0]);
                transformOrigin[1] = parseFloat(components[1]);

                return transformOrigin;
            }

            return vec2.createFrom(50,50);
        }
    },

    _createTransformFromCSS: {
        value: function(declaration) {

            var PI = 3.1415926535;
            var DEG_TO_RAD = PI/180.0;

            var transform = Object.create(Transform).init();
            var rotation, translation, scale;
            var matrix = mat4.identity();
            var index = 0;
            declaration = declaration.trim();
            var end = 0, command;

            var scalesCount = 0;
            var rotationsCount = 0;
            var translationsCount = 0;
            var matricesCount = 0;

            while (end !== -1) {
                end = declaration.indexOf("(", index);
                if (end === -1)
                    break;
                command = declaration.substring(index, end);
                index = end + 1;

                end = declaration.indexOf(")", index);
                if (end === -1)
                    break;
                var valuesDec = declaration.substring(index, end);

                var values = valuesDec.indexOf(",") !== -1 ? valuesDec.split(",") : [valuesDec];

                var floatValues = new Float32Array(values.length);
                for (var i = 0 ; i < values.length ; i++) {
                    floatValues[i] = parseFloat(values[i]);
                }
                index = end + 1;

                switch(command.trim()) {
                    case "matrix3d":
                        if (this._checkTransformConsistency(floatValues, 16)) {
                            var m = floatValues;
                            var mat = mat4.createFrom(
                                m[0], m[1], m[2], m[3],
                                m[4], m[5], m[6], m[7],
                                m[8], m[9], m[10], m[11],
                                m[12], m[13], m[14], m[15]);
                            mat4.multiply(matrix, mat);
                            matricesCount++;
                        }
                        break;
                    case "translate3d":
                        if (this._checkTransformConsistency(floatValues, 3)) {
                            if (translationsCount === 0) 
                                transform.translation = vec3.create(floatValues);
                            mat4.translate(matrix, floatValues);
                            translationsCount++;
                        }
                        break;
                    case "translateX":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            translation = [floatValues[0], 0, 0];
                            if (translationsCount === 0) 
                                transform.translation = vec3.create(translation);
                            mat4.translate(matrix, translation);
                            translationsCount++;
                        }
                        break;
                    case "translateY":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            translation = [0, floatValues[0], 0];
                            if (translationsCount === 0) 
                                transform.translation = vec3.create(translation);
                            mat4.translate(matrix, translation);
                            translationsCount++;
                        }
                        break;
                    case "translateZ":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            translation = [0, 0, floatValues[0]];
                            if (translationsCount === 0) 
                                transform.translation = vec3.create(translation);
                            mat4.translate(matrix, translation);
                            translationsCount++;
                        }
                        break;
                    case "scale3d":
                        if (this._checkTransformConsistency(floatValues, 3)) {
                            if (scalesCount === 0) 
                                transform.scale = vec3.create(floatValues);
                            mat4.scale(matrix, floatValues);
                            translationsCount++;
                        }
                        break;
                    case "scaleX":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            scale = [floatValues[0], 1, 1];
                            if (scalesCount === 0) 
                                transform.scale = vec3.create(scale);
                            mat4.scale(matrix, scale);
                            scalesCount++;
                        }
                        break;
                    case "scaleY":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            scale = [1, floatValues[0], 1];
                            if (scalesCount === 0) 
                                transform.scale = vec3.create(scale);
                            mat4.scale(matrix, scale);
                            scalesCount++;
                        }
                        break;
                    case "scaleZ":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            scale = [1, 1, floatValues[0]];
                            if (scalesCount === 0) 
                                transform.scale = vec3.create(scale);
                            mat4.scale(matrix, scale);
                            scalesCount++;
                        }
                        break;
                    case "rotate3d":
                        if (this._checkTransformConsistency(floatValues, 4)) {
                            floatValues[3] *= DEG_TO_RAD;
                            if (rotationsCount === 0)
                                transform.rotation = floatValues;
                            mat4.rotate(matrix, floatValues[3], floatValues);
                            rotationsCount++;
                        }
                        break;
                    case "rotateX":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            rotation =  [1, 0, 0, floatValues[0]];
                            rotation[3] *= DEG_TO_RAD;
                            if (rotationsCount === 0)
                                transform.rotation = rotation;
                            mat4.rotate(matrix, rotation[3], rotation);
                            rotationsCount++;
                        }

                        break;
                    case "rotateY":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            rotation =  [0, 1, 0, floatValues[0]];
                            rotation[3] *= DEG_TO_RAD;
                            if (rotationsCount === 0) 
                                transform.rotation = rotation;
                            mat4.rotate(matrix, rotation[3], rotation);
                            rotationsCount++;
                        }
                        break;
                    case "rotateZ":
                        if (this._checkTransformConsistency(floatValues, 1)) {
                            rotation =  [0, 0, 1, floatValues[0]];
                            rotation[3] *= DEG_TO_RAD;
                            if (rotationsCount === 0) {
                                transform.rotation = rotation;
                            }
                            mat4.rotate(matrix, rotation[3], rotation);
                            rotationsCount++;
                        }
                        break;
                    case "perspective":
                        end = -1;
                        break;
                    default:
                        end = -1;
                        break;
                }
            }
            /*
                if we have more than exactly one scale / one rotation / one translation, 
                then we take the matrix we just built up
                Otherwise we just return the transform that has of the advantage of holding axis angle
                can represent any rotation angle...
            */
            if ((scalesCount > 1) || (rotationsCount > 1) || (translationsCount > 1) || (matricesCount > 0)) {
                transform.matrix = matrix;
            }
            return transform;
        }
    },

    _createTransitionFromComponents: {
        value: function(transitionComponents) {
            //the property is handled up front
            var transition = {};
            var parsingState = ["duration", "timing-function", "delay"];
            //http://www.w3.org/TR/css3-transitions/#transition-timing-function-property
            // + need to handle steps () and cubic-bezier
            var timingFunctions = ["ease", "linear", "ease-in", "ease-out", "ease-in-out", "step-start"];
            var parsingStateIndex = 0;
            //each component is optional here but there is an order
            transitionComponents.forEach(function (transitionComponent) {
                var componentMatchesParsingState = false;
                var tentativeParsingIndex = parsingStateIndex;

                do {
                    if (parsingState[tentativeParsingIndex] === "duration") {
                        //make sure we really have a duration, otherwise it has to be a timing function
                        if (timingFunctions.indexOf(transitionComponent) === -1) {
                            //so we assume we have a duration here
                            componentMatchesParsingState = true;
                            transition.duration = parseFloat(transitionComponent);
                            parsingStateIndex = tentativeParsingIndex;
                        }
                    } else if (parsingState[tentativeParsingIndex] === "timing-function") {
                        if (timingFunctions.indexOf(transitionComponent) !== -1) {
                            componentMatchesParsingState = true;
                            transition.timingFunction = transitionComponent;
                            parsingStateIndex = tentativeParsingIndex;
                        }
                    } else if (parsingState[tentativeParsingIndex] === "delay") {
                        //delay has to be last parsed element
                        if (tentativeParsingIndex ==  transitionComponents.length-1) {
                            componentMatchesParsingState = true;
                            transition.delay = parseFloat(transitionComponent);
                        }
                    }
                    tentativeParsingIndex++;
                } while ((parsingStateIndex < parsingState.length) && (componentMatchesParsingState == false));

            }, this);
            if (transition.duration == null) {
                transition.duration = 0;
            }
            if (transition.timingFunction == null) {
                transition.timingFunction = "ease";
            }
            if (transition.delay == null) {
                transition.delay = 0;
            }

            return transition;
        }
    },

    _applyCSSPropertyWithValueForState: {
        value: function(state, cssProperty, cssValue) {
            //to be optimized (remove switch)
            if ((cssValue == null) || (cssProperty == null))
                return false;

            if ((cssProperty !== "transition") && this.styleableProperties.indexOf(cssProperty) === -1 ){
                return false;
            }

            var declaration = this._getStylePropertyObject(state, cssProperty);
            //consider delegating this somewhere else..
            switch(cssProperty) {
                case "transition": {
                    var transitionComponents = cssValue.split(" ");
                    if (transitionComponents.length > 0) {
                        var actualProperty = transitionComponents.shift();
                        actualProperty = this.propertyNameFromCSS(actualProperty);
                        //do we handle this property ? otherwise specifying transition for it would be pointless
                        if (this.styleableProperties.indexOf(actualProperty) !== -1 ) {
                            if (transitionComponents.length > 0) {
                                var transition = this._createTransitionFromComponents(transitionComponents);
                                if (transition != null) {
                                    var style = this._createDefaultStyleIfNeeded();
                                    style.transitions[actualProperty] = transition;
                                }
                            }
                        }
                    }
                }
                    break;
                case "offsetTransform":
                    if (typeof cssValue === "string") {
                        declaration.value = this._createTransformFromCSS(cssValue);
                    } else {
                        declaration.value = cssValue;
                    }
                    break;
                case "transformOrigin":
                    if (typeof cssValue === "string") {
                        declaration.value = this._createVectorFromCSSTransformOriginDeclaration(cssValue);
                    } else {
                        declaration.value = cssValue;
                    }
                    break;
                case "transformZOrigin": 
                    if (typeof cssValue === "string") {
                        declaration.value = parseFloat(cssValue);
                    } else {
                        declaration.value = cssValue;
                    }
                    break;
                case "visibility":
                    declaration.value = cssValue;
                    break;
                case "opacity":
                    if (typeof cssValue === "string") {
                        declaration.value = parseFloat(cssValue);
                    } else {
                        declaration.value = cssValue;
                    }
                    break;
                case "cursor":
                    declaration.value = cssValue;                    
                    break;
                default:
                    return false;
            }
            return true;
        }
    },

    propertyNameFromCSS: {
        value: function(cssProperty) {
            //internally we don't want to deal with prefixes.. todo make it general
            if (cssProperty === "-webkit-transform") {
                cssProperty = "transform";
            }
            if (cssProperty === "-webkit-transform-origin") {
                cssProperty = "transform-origin";
            }
            if (cssProperty === "-montage-transform-z-origin") {
                cssProperty = "transformZOrigin";
            }

            //FIXME: we keep this intermediate step as a placeholder to switch between
            //offset or transform some pending CSS verification in test-apps to validate what to do there.
            if (cssProperty === "transform") {
                cssProperty = "offsetTransform";
            }
            if (cssProperty === "transform-origin") {
                cssProperty = "transformOrigin";
            }

            return cssProperty;
        }
    },

    _dumpStyle: {
        value: function(state) {
            console.log("**dump style:"+state);
            var style = this._style[state];
            for (var property in style) {
                var cssValue = style[property];
                if (cssValue.value == null)
                    continue;                        
                switch (property) {
                    case "offsetTransform":
                        console.log("property:"+property+ " value:"+mat4.str(cssValue.value.matrix));
                        break;
                    default:
                        console.log("property:"+property+ " value:"+cssValue.value);
                    break;
                }
            }
        }
    },

    _dumpAllStyles: {
        value: function() {
            console.log("******** dump styles ********");

            for (var state in this._style) {
                this._dumpStyle(state);
            }
        }
    },

    _applyStyleRule: {
        value: function(selectorName, styleRule) {
            var state = this._stateForSelectorName(selectorName);
            var declaration = null;
            if (styleRule.style) {

                if (state === this.__STYLE_DEFAULT__) {
                    this.styleableProperties.forEach(function(property) {
                    declaration = this._getStylePropertyObject(state, property);
                    if (declaration.value == null) {
                            this._applyCSSPropertyWithValueForState(    state, 
                                                                        property, 
                                                                        this.initialValueForStyleableProperty(property));
                    } /*else {
                            this._applyCSSPropertyWithValueForState(    state, 
                                                                        property, 
                                                                        declaration.value);
                        }*/

                    }, this);
                } else {
                    /*
                    this.styleableProperties.forEach(function(property) {
                        declaration = this._getStylePropertyObject(state, property);
                        if (declaration.value == null) {
                            declaration = this._getStylePropertyObject(this.__STYLE_DEFAULT__, property);
                            this._applyCSSPropertyWithValueForState(    state, 
                                                                        property, 
                                                                        declaration.value);
                        }
                    }, this);*/
                }

                var length = styleRule.style.length;
                if (length > 0) {
                    var transition = null;
                    for (var i = 0 ; i < length ; i++) {
                        var cssProperty = styleRule.style[i];
                        var cssValue = styleRule.style[cssProperty];

                        cssProperty = this.propertyNameFromCSS(cssProperty);

                        if (cssProperty.indexOf("transition-") != -1) {
                            if (transition == null) {
                                transition = {};
                            }
                            transition[cssProperty] = cssValue;
                        } else {
                             this._applyCSSPropertyWithValueForState(state, cssProperty, cssValue);
                        }
                    }
                        if (transition != null) {
                            cssProperty = "transition";
                            //build up shorthand version of transition
                            var shortHandTransition = "";
                            if (transition["transition-property"] != null) {
                                shortHandTransition += transition["transition-property"];

                                if (transition["transition-duration"] != null) {
                                    shortHandTransition += " ";
                                    shortHandTransition += transition["transition-duration"];
                                }

                                if (transition["transition-timing-function"] != null) {
                                    shortHandTransition += " ";
                                    shortHandTransition += transition["transition-timing-function"];
                                }

                                if (transition["transition-timing-delay"] != null) {
                                    shortHandTransition += " ";
                                    shortHandTransition += transition["transition-timing-delay"];
                                }

                                this._applyCSSPropertyWithValueForState(state, cssProperty, shortHandTransition);                                
                            }
                        }

                }
            }
        }
    },

    _removeStyleRule: {
        value: function(selectorName, styleRule) {
            if (styleRule.style) {
                var length = styleRule.style.length;
                if (length > 0) {
                    for (var i = 0 ; i < length ; i++) {
                        var cssProperty = styleRule.style[i];
                        var cssValue = styleRule.style[cssProperty];

                        cssProperty = this.propertyNameFromCSS(cssProperty);
                        //should be states ?
                        var state = this._stateForSelectorName(selectorName);
                        if (state != null) {
                            var declaration = this._getStylePropertyObject(state, cssProperty);
                            declaration.value = this.initialValueForStyleableProperty(cssProperty);
                        }
                    }
                }
            }
        }
    },

    appliedProperties: {
        value: null, writable: true
    },

    _executeStylesForState: {
        value: function(state) {
            if (this.appliedProperties == null)
                this.appliedProperties = {};

            if (this.styleableProperties != null) {
                this.styleableProperties.forEach(function(property) {
                    var declaration = this._getStylePropertyObject(state, property);
                    var propertyWasSet = false;
                    if (declaration) {

                        if (declaration.value != null) {
                            propertyWasSet = true;
                            if (this.appliedProperties[property] !== declaration.value) {
                                this[property] = declaration.value;
                                this.appliedProperties[property] = declaration.value;
                            }
                        }
                        
                        if (propertyWasSet == false) {
                            declaration = this._getStylePropertyObject(this.__STYLE_DEFAULT__, property);

                            if (declaration.value != null) {
                                propertyWasSet = true;
                                if (this.appliedProperties[property] !== declaration.value) {
                                    this[property] = declaration.value;
                                    this.appliedProperties[property] = declaration.value;
                                }
                            }
                        }
                    }
                }, this);
            }
        }
    },

    _applySelectorNamed: {
        value: function(selectorName) {
            var cssDescription = this.retrieveCSSRule(selectorName);
            if (cssDescription) {
                this._applyStyleRule(selectorName, cssDescription);
            }
        }
    },

    _applyClassNamed: {
        value: function(className) {
            this._applySelectorNamed("." + className);
            this._applySelectorNamed("." + className + ":hover");
            this._applySelectorNamed("." + className + ":active");
        }
    },

    _removeSelectorNamed: {
        value: function(selectorName) {
            var cssDescription = this.retrieveCSSRule(selectorName);
            if (cssDescription) {
                this._removeStyleRule(selectorName, cssDescription);
            }
        }
    },

    _removeClassNamed: {
        value: function(className, state) {
            this._removeSelectorNamed("." + className + ":hover");
            this._removeSelectorNamed("." + className + ":active");
            this._removeSelectorNamed("." + className);
        }
    },

    _removeSelectorsForState: {
        value: function(state) {
            var values = this.classList.enumerate();
            for (var i = 0 ; i < values.length ; i++) {
                var className = values[i][1];
                this._removeClassNamed(className, state);
            }
        }
    },

    classListDidChange: {
        value: function() {
            var self = this;
            if (this.classList) {
                var values = this.classList.enumerate();
                for (var i = 0 ; i < values.length ; i++) {
                    var className = values[i][1];
                    this._applyClassNamed(className);
                }

                this._executeStylesForState(this._state); 
            } 
        }
    },

    _id: { value: null,  writable: true },

    id: {
        get: function() {
            return this._id;
        },

        set: function(value) {
            if (value != this._id) {
                this._id = value;
                this._idDidChange();
            }
        }
    },

    initWithScene: {
        value: function(scene) {
            this.scene = scene;
            return this;
        }
    },


    //--- class list excerpt from montage / component.js

    _classList: { value: null },

    /**
     The classList of the component's element, the purpose is to mimic the element's API but to also respect the draw.
     It can also be bound to by binding each class as a property.
     example to toggle the complete class: "classList.has('complete')" : { "<-" : "@owner.isCompete"}
     @type {Property}
     @default null
     */
    classList: {
        get: function () {
            if (this._classList == null) {
                this._classList = new Set();
                this._classList.addRangeChangeListener(this, "classList");
            }
            return this._classList;
        },
        set: function(value) {
            if (this._classList !== value) {
                if (this._classList != null) {
                    this._classList.removeRangeChangeListener(this, "classList");
                }
                if (value != null) {
                    var self = this;
                    if (value instanceof Array) {
                        this._classList = new Set();
                        value.forEach( function(className) {
                            self._classList.add(className);
                        },this);
                        value = this._classList;
                    } else {
                        this._classList = value;
                    }
                }
                this._classList.addRangeChangeListener(this, "classList");
                this.classListDidChange();
            }
        }
    },

    handleClassListRangeChange: {
        value: function (plus, minus) {
            //on plus we stack classes
            if (plus != null) {
                plus.forEach(function(className) {
                    this._applyClassNamed(className);
                }, this);
            }
            //when something is removed we resync all
            if (minus != null) {
                minus.forEach(function(className) {
                    this._removeClassNamed(className);
                }, this);
                this.classListDidChange();
                return;
            }

            this._executeStylesForState(this._state); 
            //this._dumpAllStyles();

        }
    },

    cssDescriptions: {
        value: null, writable: true
    },

    handleStyleSheetsDidLoad: {
        value: function() {
            this.scene.removeEventListener("styleSheetsDidLoad", this);
            this.classListDidChange();
        }
    },

    //http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
    retrieveCSSRule: {
        value: function(ruleName) {
            for (var url in this.scene.styleSheets) {
                var styleSheet = this.scene.styleSheets[url];
                var allRules = styleSheet.cssRules;
                for (var i = 0 ; i < allRules.length ; i++) {
                    var styleRule = allRules[i];
                    if (styleRule.selectorText != null) {
                        if (styleRule.selectorText === ruleName) {
                            return styleRule;
                        }
                    }
                }
            }
        }
    },

    //--

    handleActionOnGlTFElement: {
        value: function (glTFElement, action) {
            var state = this.__STYLE_DEFAULT__;

            switch (action) {
                case this._ENTER:
                    state = "hover";
                    var hoverEvent = document.createEvent("CustomEvent");
                    hoverEvent.initCustomEvent("hover", true, true, {
                        glTFElement: glTFElement
                    });
                    this.dispatchEvent(hoverEvent);
                    break;

                case this._EXIT:
                    state = this.__STYLE_DEFAULT__; //this is probably wrong - what happens if active is on going too ?
                    break;

                case this._TOUCH_DOWN:
                    state = "active";
                    var actionEvent = document.createEvent("CustomEvent");
                    actionEvent.initCustomEvent("action", true, true, {
                        glTFElement: glTFElement
                    });
                    this.dispatchEvent(actionEvent);
                    break;

                case this._TOUCH_UP:
                    state = this.__STYLE_DEFAULT__; //this is probably wrong - what happens if hover is on going too ?
                    break;
            }

            if (state !== this._state) {
                this._state = state;
                this._executeStylesForState(state);
            }
        }
    },

    //--

    deserializedFromTemplate: {
        value: function (objectOwner, label, documentPart) {
            this.nextTarget = objectOwner;
            this.identifier = label;
        }
    },

    //--

    blueprintModuleId:require("montage")._blueprintModuleIdDescriptor,

    blueprint:require("montage")._blueprintDescriptor

});

}})
;
//*/
montageDefine("f73ee10","runtime/helpers/resource-manager",{dependencies:[],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

var ContiguousRequests = Object.create(Object, {

    kind: { value:"multi-parts", writable:true },

    range: { value: null, writable:true },

    _requests: { value: null, writable:true },

    requests: {
        get: function() {
            return this._requests;
        },
        set: function(value) {
            this._requests = value;
        }
    },

    canMergeRequest: {
        value: function(request, bytesLimit) {
            var requestSize = request.range[1] - request.range[0];
            var size = this.range[1] - this.range[0];
            if ((requestSize + size) > bytesLimit)
                return false;
            return  (((request.range[0] === this.range[1]) ||
                ((request.range[1]) === this.range[0])) &&
                (request.type ===  this.type));
        }
    },

    mergeRequest: {
        value: function(request) {
            if (this.requests.length === 0) {
                this.requests.push(request);
                this.range = [request.range[0], request.range[1]];
            } else {
                //are we merging at end ?
                if (request.range[0] === this.range[1]) {
                    this.requests.push(request);
                    this.range[1] = request.range[1];
                    //or at the beginning ?
                } else if (request.range[1] === this.range[0]) {
                    this.requests.unshift(request);
                    this.range[0] = request.range[0];
                } else {
                    console.log("ERROR: should not reach");
                }
            }
        }
    },

    mergeRequests: {
        value: function(requests) {
            if (this.range) {
                if (requests[0].range[1] < this.range[0]) {
                    for (var i = requests.length-1 ; i >= 0 ; i--) {
                        this.mergeRequest(requests[i]);
                    }
                } else {
                    for (var i = 0 ; i < requests.length ; i++) {
                        this.mergeRequest(requests[i]);
                    }
                }
            } else {
                requests.forEach( function(request) {
                    this.mergeRequest(request);
                }, this);
            }
        }
    },

    id: { value: null, writable:true},

    initWithRequests: {
        value: function(requests) {
            this.requests = [];

            this.mergeRequests(requests);
            this.id = requests[0].id;
            return this;
        }
    }
})

var RequestTreeNode = Object.create(Object, {

    _content: { value: null, writable:true},

    content: {
        get: function() {
            return this._content;
        },
        set: function(value) {
            this._content = value;
        }
    },

    _parent: { value: null, writable:true},

    parent: {
        get: function() {
            return this._parent;
        },
        set: function(value) {
            this._parent = value;
        }
    },

    _left: { value: null, writable:true},

    left: {
        get: function() {
            return this._left;
        },
        set: function(value) {
            this._left = value;
        }
    },

    _right: { value: null, writable:true},

    right: {
        get: function() {
            return this._right;
        },
        set: function(value) {
            this._right = value;
        }
    },

    _checkConsistency: {
        value: function(ranges) {

            if (ranges.length >= 50) //to avoid max stack size
                return;

            if (this.left)
                this.left._checkConsistency(ranges);

            ranges.push(this.content.range);

            if (this.right)
                this.right._checkConsistency(ranges);

        }
    },

    checkConsistency: {
        value: function() {
            var ranges = [];
            this._checkConsistency(ranges);
            if (ranges.length > 1) {
                for (var i = 0; i < ranges.length-1 ;i++) {
                    var rangeA = ranges[0];
                    var rangeB = ranges[1];
                    if (!(rangeA[1] <= rangeB[0])) {
                        console("ERROR: INCONSISTENCY CHECK Failed, ranges are not ordered in btree")
                    }
                }
            }
        }
    },

    _collect: {
        value: function(nodes, nb) {

            if (this.left)
                this.left._collect(nodes, nb);

            if (nodes.length >= nb)
                return;

            nodes.push(this);

            if (this.right)
                this.right._collect(nodes, nb);

        }
    },

    collect: {
        value: function(nb) {
            var nodes = [];
            this._collect(nodes, nb);
            return nodes;
        }
    },

    insert: {
        value: function(requests, bytesLimit) {
            //insert before ?
            if (requests.range[1] <= this.content.range[0]) {
                if ( (requests.range[1] === this.content.range[0])) {
                    if (requests.kind === "multi-parts")
                        this.content.mergeRequests(requests.requests);
                    else
                        this.content.mergeRequests(requests);

                    if (this.left) {
                        if(this.content.canMergeRequest(this.left.content, bytesLimit)) {
                            this.content.mergeRequests(this.left.content._requests);
                            this.left.remove(this.left.content);
                        }
                    }
                    if (this.parent) {
                        if (this.parent.content.canMergeRequest(this.content, bytesLimit)) {
                            this.parent.content.mergeRequests(this.content._requests);
                            this.remove(this.content);
                        }
                    }

                    //console.log("requests:"+this.content.requests.length);
                    return null;
                } else if (this.left) {
                    return this.left.insert(requests, bytesLimit);
                } else {
                    var treeNode = Object.create(RequestTreeNode);
                    treeNode.parent = this;
                    treeNode.content = requests;
                    this.left = treeNode;
                    return treeNode;
                }
                //insert after ?
            } else if (requests.range[0] >= this.content.range[1]) {
                if ( requests.range[0] === this.content.range[1]) {
                    if (requests.kind === "multi-parts")
                        this.content.mergeRequests(requests.requests);
                    else
                        this.content.mergeRequests(requests);


                    if (this.right) {
                        if(this.content.canMergeRequest(this.right.content, bytesLimit)) {
                            this.content.mergeRequests(this.right.content._requests);
                            this.right.remove(this.right.content);
                        }
                    }
                    if (this.parent) {
                        if (this.parent.content.canMergeRequest(this.content, bytesLimit)) {
                            this.parent.content.mergeRequests(this.content._requests);
                            this.remove(this.content);
                        }
                    }


                    //console.log("requests:"+this.content.requests.length);
                    return null;
                } else if (this.right) {
                    return this.right.insert(requests, bytesLimit);
                } else {
                    var treeNode = Object.create(RequestTreeNode);
                    treeNode.parent = this;
                    treeNode.content = requests;
                    this.right = treeNode;
                    return treeNode;
                }
            } else {
                console.log("ERROR: should not reach");
            }
        }
    },

    contains: {
        value: function(node) {
            if (this.node === node) {
                return true;
            }

            if (this.left) {
                if (this.left.contains(node))
                    return true;
            }

            if (this.right) {
                if (this.right.contains(node))
                    return true;
            }

            return false;
        }
    },

    min: {
        value: function() {
            var node = this;
            while (node.left) {
                node = node.left;
            }
            return node;
        }
    },

    _updateParentWithNode: {
        value: function(node) {
            if (this.parent) {
                if (this === this.parent.left) {
                    this.parent.left = node;
                } else {
                    this.parent.right = node;
                }
            }
            if (node) {
                node.parent = this.parent;
            }
        }
    },

    removeMin: {
        value: function() {
            if (this.parent) {
            }

            var node = this;
            while (node.left || node.right) {
                if (node.left) {
                    node = node.min();
                }
                if (node.right) {
                    node = node.right.min();
                }
            }
            node._updateParentWithNode(null);
            return node;
        }
    },

    remove: {
        value: function(content) {
            if (content.range[1] <= this.content.range[0]) {
                this.left.remove(content);
            } else if (content.range[0] >= this.content.range[1]) {
                this.right.remove(content);
            } else {
                if (content === this.content) {
                    if (this.left && this.right) {
                        var successor = this.right.min();
                        this.content = successor.content;
                        successor._updateParentWithNode(successor.right);
                    } else if (this.left || this.right) {
                        if (this.left) {
                            this._updateParentWithNode(this.left);
                        } else {
                            this._updateParentWithNode(this.right);
                        }
                    } else {
                        this._updateParentWithNode(null);
                    }
                } else {
                    //FIXME: report error
                }
            }
        }
    }

});

exports.WebGLTFResourceManager = Object.create(Object, {
    // errors
    MISSING_DESCRIPTION: { value: "MISSING_DESCRIPTION" },
    INVALID_PATH: { value: "INVALID_PATH" },
    INVALID_TYPE: { value: "INVALID_TYPE" },
    XMLHTTPREQUEST_STATUS_ERROR: { value: "XMLHTTPREQUEST_STATUS_ERROR" },
    NOT_FOUND: { value: "NOT_FOUND" },
    // misc constants
    _resources: { value: null, writable: true },

    _requestTrees: { value: null, writable: true },

    requestTrees : {
        get: function() {
            return this._requestTrees;
        }
    },

    _resourcesStatus: { value: null, writable: true },

    _resourcesBeingProcessedCount: { value: 0, writable: true },

    _observers: { value: null, writable: true },

    _maxConcurrentRequests: { value: 1, writable: true },

    observers: {
        get: function() {
            return this._observers;
        },
        set: function(value) {
            this._observers = value;
        }
    },

    maxConcurrentRequests: {
        get: function() {
            return this._maxConcurrentRequests;
        },
        set: function(value) {
            this._maxConcurrentRequests = value;
        }
    },

    reset: {
        value: function() {
            if (this._resourcesStatus) {
                var ids = Object.keys(this._resourcesStatus);
                ids.forEach(function(id) {
                    var status = this._resourcesStatus[id];
                    if (status) {
                        if (status.xhr)
                            status.xhr.abort();
                    }
                }, this);
            }

            var resourcesKeys = Object.keys(this._resources);
            resourcesKeys.forEach(function(resourceKey) {
                var resource = this._resources[resourceKey];
                if (resource) {
                    if (resource.nodeName === "VIDEO") {
                        resource.pause();
                    }
                }
            }, this);

            this._resources = {};
            this._requestTrees = {};
            this._resourcesStatus = {};
            this._resourcesBeingProcessedCount = 0;
            this._wholeBuffers = {};
        }
    },

    _bytesLimit: { value: 500000, writable: true },

    bytesLimit: {
        get: function() {
            return this._bytesLimit;
        },
        set: function(value) {
            if (this._bytesLimit !== value) {
                this._bytesLimit = value;
            }
        }
    },

    //manage entries
    _containsResource: {
        enumerable: false,
        value: function(resourceID) {
            return this._resources[resourceID] ? true : false;
        }
    },

    init: {
        value: function() {
            this._requestTrees = {};
            this._resources = {};
            this._resourcesStatus = {};
            this._observers = [];
            this._resourcesBeingProcessedCount = 0;
        }
    },

    _storeResource: {
        enumerable: false,
        value: function(resourceID, resource) {
            if (!resourceID) {
                console.log("ERROR: entry does not contain id, cannot store");
                return;
            }

            if (this._containsResource[resourceID]) {
                console.log("WARNING: resource:"+resourceID+" is already stored, overriding");
            }

            this._resources[resourceID] = resource;
        }
    },

    _getResource: {
        enumerable: false,
        value: function(resourceID) {
            return this._resources[resourceID];
        }
    },

    _loadResource: {
        value: function(request, delegate) {
            var self = this;
            var type;
            var path = request.path;
            if (request.kind === "multi-parts") {
                type = request.requests[0].type;
                path = request.requests[0].path;
            } else {
                type = request.type;
                path = request.path;
            }

            if (!type) {
                delegate.handleError(WebGLTFResourceManager.INVALID_TYPE, null);
                return;
            }

            if (!path) {
                delegate.handleError(WebGLTFResourceManager.INVALID_PATH);
                return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', path, true);
            xhr.responseType = type;

            if (request.range) {
                var header = "bytes=" + request.range[0] + "-" + (request.range[1] - 1);
                xhr.setRequestHeader("Range", header);
            }
            //if this is not specified, 1 "big blob" scenes fails to load.
            //fixme disabled for the moment.
            //xhr.setRequestHeader("If-Modified-Since", "Sat, 01 Jan 1970 00:00:00 GMT");

            xhr.onload = function(e) {
                if ((this.status == 200) || (this.status == 206)) {
                    self._resourcesBeingProcessedCount--;
                    if (request.kind === "multi-parts") {
                        request.requests.forEach( function(req_) {
                            var subArray = this.response.slice(req_.range[0] - request.range[0], req_.range[1] - request.range[0]);
                            delegate.resourceAvailable(self, req_, subArray);
                        }, this);
                    } else {
                        delegate.resourceAvailable(self, request, this.response);
                    }

                } else {
                    delegate.handleError(WebGLTFResourceManager.XMLHTTPREQUEST_STATUS_ERROR, this.status);
                }
            };

            /*
             xhr.addEventListener("abort", function() {
             }, false);
             */

            xhr.send(null);

            var resourceStatus = this._resourcesStatus[request.id];
            if (resourceStatus) {
                resourceStatus.xhr = xhr;
            }
        }
    },

    _processNextResource: {
        value: function(requestTree) {
            if (requestTree) {
                var rootIsLeaf = !requestTree.left && !requestTree.right;
                if (rootIsLeaf) {
                    this._handleRequest(requestTree.content);
                    return false;
                } else {
                    var min = requestTree.removeMin();
                    this._handleRequest(min.content);
                }
            }
            return true;
        }
    },

    /*  Some method wrappers for observing,
     because even though at the moment a single property would work,
     Implemntation is likely to change here..
     */

    _observingEnabled: { value: false, writable:true },

    isObserving: {
        value: function() {
            return this._observingEnabled;
        }
    },

    startObserving: {
        value: function() {
            this._observingEnabled = true;
        }
    },

    stopObserving: {
        value: function() {
            this._observingEnabled = false;
        }
    },

    fireResourceAvailable: {
        value: function(resourceId) {
            if (this._observingEnabled && this.observers) {
                this.observers.forEach(function(observer) {
                    if (observer.resourceAvailable) {
                        observer.resourceAvailable(resourceId);
                    }
                }, this);
            }
        }
    },

    send: { value: 0, writable: true },
    requested: { value: 0, writable: true },

    _handleRequest: {
        value: function(request) {
            var resourceStatus = this._resourcesStatus[request.id];
            var node = null;
            var status = null;
            var requestTree = this.requestTrees ? this.requestTrees[request.path] : null;
            if (resourceStatus) {
                if (resourceStatus.status === "loading" )
                    return;
                node = resourceStatus.node;
                status = resourceStatus.status;
            }

            if (request.type === "arraybuffer") {
                if (!status) {
                    var trNode = null;
                    var contRequests;

                    if (request.kind === "multi-parts") {
                        contRequests = Object.create(ContiguousRequests).initWithRequests(request.requests);
                    } else {
                        contRequests = Object.create(ContiguousRequests).initWithRequests([request]);
                    }

                    if (!requestTree) {
                        var rootTreeNode = Object.create(RequestTreeNode);
                        rootTreeNode.content = contRequests;
                        this._requestTrees[request.path] = rootTreeNode;
                        requestTree = rootTreeNode;
                        trNode = rootTreeNode;
                    } else {
                        trNode = requestTree.insert(contRequests, this.bytesLimit);
                    }

                    if (request.kind ==="multi-parts") {
                        request.requests.forEach( function(req_) {
                            this._resourcesStatus[req_.id] =  { "status": "queued", "node": trNode };
                        }, this);

                    } else {
                        this._resourcesStatus[request.id] =  { "status": "queued", "node": trNode };
                    }
                }
                return;
            }
            var self = this;
            var processResourceDelegate = {};

            if (request.kind ==="multi-parts") {
                request.requests.forEach( function(req_) {
                    this._resourcesStatus[req_.id] =  { "status": "loading" };
                }, this);

            } else {
                this._resourcesStatus[request.id] =  { "status": "loading"};
            }

            processResourceDelegate.resourceAvailable = function(resourceManager, req_, res_) {
                // ask the delegate to convert the resource, typically here, the delegate is the renderer and will produce a webGL array buffer
                // this could get more general and flexible by making an unique key with the id from the resource + the converted type (day "ARRAY_BUFFER" or "TEXTURE"..)
                //, but as of now, this fexibility does not seem necessary.
                var convertedResource = req_.delegate.convert(req_, res_, req_.ctx);
                self._storeResource(req_.id, convertedResource);
                req_.delegate.resourceAvailable(convertedResource, req_.ctx);

                delete self._resourcesStatus[req_.id];

                self.fireResourceAvailable.call(self, req_.id);

                if (self._resourcesBeingProcessedCount < self.maxConcurrentRequests) {
                    var requestTree  = resourceManager.requestTrees ? resourceManager.requestTrees[req_.path] : null;
                    if (!self._processNextResource(requestTree)) {
                        if (requestTree) {
                            delete resourceManager.requestTrees[req_.path];
                        }
                    }
                }
            };

            processResourceDelegate.handleError = function(errorCode, info) {
                request.delegate.handleError(errorCode, info);
            }

            self._resourcesBeingProcessedCount++;
            this._loadResource(request, processResourceDelegate);
        }
    },


    _elementSizeForGLType: {
        value: function(glType) {
            switch (glType) {
                case WebGLRenderingContext.FLOAT :
                    return Float32Array.BYTES_PER_ELEMENT;
                case WebGLRenderingContext.UNSIGNED_BYTE:
                    return Uint8Array.BYTES_PER_ELEMENT;
                case WebGLRenderingContext.UNSIGNED_SHORT:
                    return Uint16Array.BYTES_PER_ELEMENT;
                case WebGLRenderingContext.FLOAT_VEC2:
                    return Float32Array.BYTES_PER_ELEMENT * 2;
                case WebGLRenderingContext.FLOAT_VEC3:
                    return Float32Array.BYTES_PER_ELEMENT * 3;
                case WebGLRenderingContext.FLOAT_VEC4:
                    return Float32Array.BYTES_PER_ELEMENT * 4;
                case WebGLRenderingContext.FLOAT_MAT4:
                    return Float32Array.BYTES_PER_ELEMENT * 16;
                case WebGLRenderingContext.FLOAT_MAT3:
                    return Float32Array.BYTES_PER_ELEMENT * 9;
                default:
                    return null;
            }
        }
    },

    //--- mode to not use range request
    _allowRangedRequests: { value: false, writable: false },

    _wholeBuffers: { value: null, writable: true },

    _handleWrappedBufferViewResourceLoading: {
        value: function(wrappedBufferView, delegate, ctx) {

            var requestType = "arraybuffer";
            var bufferView = wrappedBufferView.bufferView;
            if (bufferView) {
                var buffer = bufferView.buffer;
                var byteOffset = wrappedBufferView.byteOffset + bufferView.description.byteOffset;
                var range = [byteOffset , (this._elementSizeForGLType(wrappedBufferView.type) * wrappedBufferView.count) + byteOffset];
                if (buffer.description) {
                    if (buffer.description.type)
                        requestType = buffer.description.type;
                }

                var wrappedBufferRequest = {
                    "source" : wrappedBufferView,
                    "id" : wrappedBufferView.id,
                    "range" : range,
                    "type" : requestType,
                    "path" : buffer.description.path,
                    "delegate" : delegate,
                    "ctx" : ctx,
                    "kind" : "single-part"
                };
            }

            if (this._allowRangedRequests) {
                this._handleRequest(wrappedBufferRequest, null);
            } else {
                if (!this._wholeBuffers) {
                    this._wholeBuffers = {};
                }

                var bufferView = wrappedBufferView.bufferView;
                if (bufferView) {
                    var self = this;
                    var buffer = bufferView.buffer;
                    var wholeBuffer = this._wholeBuffers[buffer.id];
                    if (wholeBuffer == null) {
                        var bufferDelegate = {};

                        bufferDelegate.resourceAvailable = function(resourceManager, req_, res_) {
                            var wholeBuffer = self._wholeBuffers[req_.id];

                            resourceManager._storeResource(req_.id, res_);

                            if (wholeBuffer.pendingRequests) {
                                wholeBuffer.pendingRequests.forEach(function(request) {
                                    delete self._resourcesStatus[request.id];

                                    var subArray = res_.slice(request.range[0], request.range[1]);

                                    var delegate = request.delegate;
                                    if (this._resources[request.id] == null) {
                                        var convertedResource = delegate.convert(request.source, subArray, request.ctx);
                                        resourceManager._storeResource(request.id, convertedResource);
                                        delegate.resourceAvailable(convertedResource, request.ctx);
                                    }

                                    self.fireResourceAvailable.call(self, request.id);

                                }, self);
                                wholeBuffer.pendingRequests = [];
                            }

                        }

                        bufferDelegate.handleError = function(errorCode, info) {
                            //FIXME:
                        }

                        var bufferRequest = {
                            "id" : buffer.id,
                            "type" : requestType,
                            "path" : buffer.description.path,
                            "delegate" : delegate,
                            "ctx" : ctx,
                            "kind" : "single-part" };

                        self._resourcesBeingProcessedCount++;

                        this._loadResource(bufferRequest, bufferDelegate);

                        wholeBuffer = { "activeRequest" : "bufferRequest", "pendingRequests" : [] };
                        this._wholeBuffers[buffer.id] = wholeBuffer;
                    } else {
                        var res_ = this._getResource(buffer.id);
                        if (res_) {
                            var subArray = res_.slice(wrappedBufferRequest.range[0], wrappedBufferRequest.range[1]);
                            var delegate = wrappedBufferRequest.delegate;
                            var convertedResource = delegate.convert(wrappedBufferView, subArray, wrappedBufferRequest.ctx);
                            self._storeResource(wrappedBufferRequest.id, convertedResource);
                            delegate.resourceAvailable(convertedResource, wrappedBufferRequest.ctx);
                            self.fireResourceAvailable.call(self, wrappedBufferRequest.id);

                            return;
                        }
                    }


                    var resourceStatus = this._resourcesStatus[wrappedBufferRequest.id];
                    if (resourceStatus) {
                        if (resourceStatus.status === "loading" )
                            return;
                    }
                    wholeBuffer.pendingRequests.push(wrappedBufferRequest);
                    this._resourcesStatus[wrappedBufferRequest.id] =  { "status": "loading"};

                }
            }
        }
    },

    //TODO: move this in the renderer, to do so, add dynamic handler to the resource manager.
    shaderDelegate: {
        value: {
            handleError: function(errorCode, info) {
                console.log("ERROR:shaderDelegate:"+errorCode+" :"+info);
            },

            convert: function (source, resource, ctx) {
                return resource;
            },

            resourceAvailable: function (resource, ctx) {
                //FIXME: ...
                ctx.sources[ctx.stage] = resource;
                var self = this;
                if (ctx.sources["x-shader/x-fragment"] && ctx.sources["x-shader/x-vertex"]) {
                    var delegate = ctx.programCtx.delegate;
                    var convertedResource = delegate.convert(null, ctx.sources, ctx.programCtx.ctx);
                    ctx.programCtx.resourceManager._storeResource(ctx.programCtx.id, convertedResource);
                    delegate.resourceAvailable(convertedResource, ctx.programCtx.ctx);
                    ctx.programCtx.resourceManager.fireResourceAvailable.call(ctx.programCtx.resourceManager, ctx.programCtx.id);
                }
            }
        }
    },

    _handleProgramLoading: {
        value: function(program, delegate, ctx) {
            var programCtx = { "delegate" : delegate, "ctx"  : ctx, "resourceManager" : this, "id" : program.id };

            var sources = {};
            var fsCtx = { stage: "x-shader/x-fragment", "sources" : sources,  "programCtx" : programCtx };
            var vsCtx = { stage: "x-shader/x-vertex", "sources" : sources,  "programCtx" : programCtx };

            this.getResource(program["x-shader/x-fragment"], this.shaderDelegate, fsCtx);
            this.getResource(program["x-shader/x-vertex"], this.shaderDelegate, vsCtx);
        }
    },

    _handleShaderLoading: {
        value: function(shader, delegate, ctx) {
            this._handleRequest({   "id":shader.id,
                "type" : "text",
                "path" : shader.description.path,
                "delegate" : delegate,
                "ctx" : ctx,
                "kind" : "single-part" }, null);
        }
    },

    _handleVideoLoading: {
        value: function(resource, textureLoadedCallback, ctx) {
            //TODO: unify with binaries
            var resourceStatus = this._resourcesStatus[resource.id];
            var status = null;
            if (resourceStatus) {
                if (resourceStatus.status === "loading" )
                    return;
            }
            this._resourcesStatus[resource.id] = { status: "loading" };
            var self = this;

            if (resource.description.path) {
                this._resourcesBeingProcessedCount++;
                var videoElement = document.createElement('video');
                videoElement.preload = "auto";
                videoElement.loop = "loop";
                videoElement.addEventListener("canplaythrough", function() {
                    self._resourcesBeingProcessedCount--;
                    videoElement.play();
                    delete self._resourcesStatus[resource.id];
                    self._storeResource(resource.id, videoElement);
                    textureLoadedCallback(videoElement, resource.id, ctx);
                });

                videoElement.src = resource.description.path;
            }

        }
    },

    _handleImageLoading: {
        value: function(resource, textureLoadedCallback, ctx, index) {
            //TODO: unify with binaries
            var resourceStatus = this._resourcesStatus[resource.id];
            var status = null;
            if (resourceStatus) {
                if (resourceStatus.status === "loading" )
                    return;
            }
            this._resourcesStatus[resource.id] = { status: "loading" };
            var self = this;

            if (resource.description.path) {
                this._resourcesBeingProcessedCount++;
                var imageObject = new Image();
                imageObject.onload = function() {
                    self._resourcesBeingProcessedCount--;

                    delete self._resourcesStatus[resource.id];
                    self._storeResource(resource.id, imageObject);
                    textureLoadedCallback(imageObject, resource.id, ctx, index);
                }
                imageObject.src = resource.description.path;
            } else if (resource.description.image) {
                textureLoadedCallback(resource.description.image, resource.id, ctx, index);
            }
        }
    },

    _handleTextureLoading: {
        value: function(resource, delegate, ctx) {
            //TODO: unify with binaries
            var resourceStatus = this._resourcesStatus[resource.id];
            var status = null;
            if (resourceStatus) {
                if (resourceStatus.status === "loading" )
                    return;
            }
            this._resourcesStatus[resource.id] = { status: "loading" };

            var self = this;
            if (resource.source) {
                if (resource.source.type === "image") {
                    this._handleImageLoading(resource.source,
                        function(image, id, gl) {
                            var convertedResource = delegate.convert(image, resource, gl);
                            delete self._resourcesStatus[resource.id];

                            self._storeResource(resource.id, convertedResource);
                            delegate.resourceAvailable(convertedResource, gl);
                            self.fireResourceAvailable.call(self, resource.id);
                        }, ctx);
                }

                if (resource.source.type === "video") {
                    this._handleVideoLoading(resource.source,
                        function(video, id, gl) {
                            var convertedResource = delegate.convert(video, resource, gl);
                            delete self._resourcesStatus[resource.id];
                            self._storeResource(resource.id, convertedResource);
                            delegate.resourceAvailable(convertedResource, gl);
                            self.fireResourceAvailable.call(self, resource.id);
                        }, ctx);
                }

            } else if (resource.sources) {
                var idx = 0;
                var contents = [null, null, null, null, null, null];
                var sourceIndex = 0;
                resource.sources.forEach(function(source) {
                    if (source.type === "image") {
                        this._handleImageLoading(source,
                            function(image, id, gl, sourceIndex) {
                                idx++;
                                contents[sourceIndex] = image;
                                if (idx == resource.sources.length) {
                                    var convertedResource = delegate.convert(contents, resource, gl);
                                    delete self._resourcesStatus[resource.id];
                                    self._storeResource(resource.id, convertedResource);
                                    delegate.resourceAvailable(convertedResource, gl);
                                    self.fireResourceAvailable.call(self, resource.id);
                                }
                            }, ctx, sourceIndex++);
                    }
                    if (source.type === "video") {
                        this._handleVideoLoading(source,
                            function(video, id, gl) {
                                idx++;
                                contents[sourceIndex] = video;
                                if (idx == resource.sources.length) {
                                    var convertedResource = delegate.convert(contents, resource, gl);
                                    delete self._resourcesStatus[resource.id];
                                    self._storeResource(resource.id, convertedResource);
                                    delegate.resourceAvailable(convertedResource, gl);
                                    self.fireResourceAvailable.call(self, resource.id);
                                }
                            }, ctx, sourceIndex++);
                    }


                }, this)


            }
        }
    },

    //just used a hack now to setup resources coming from compressed meshes
    setResource: {
        value: function(resourceID, resource) {
            if (this._resources[resourceID]) {
                debugger;
            }

            this._resources[resourceID] = resource;
        }
    },

    getResource: {
        value: function(resource, delegate, ctx) {

            var managedResource = this._getResource(resource.id);
            if (managedResource) {
                return managedResource;
            }

            if (resource.type === "program") {
                this._handleProgramLoading(resource, delegate, ctx);
            } else if (resource.type === "shader") {
                this._handleShaderLoading(resource, delegate, ctx);
            } else if (resource.type === "image") {
                this._handleImageLoading(resource, delegate, ctx);
            } else if (resource.type === "texture") {
                this._handleTextureLoading(resource, delegate, ctx);
            } else {
                this._handleWrappedBufferViewResourceLoading(resource, delegate, ctx);
            }

            return null;
        }
    },

    hasPendingRequests: {
        value: function() {
            return this._resourcesBeingProcessedCount > 0;
        }
    },

    removeAllResources: {
        value: function() {
            this._resources = {};
        }
    }

});


}})
;
//*/
montageDefine("7fd8be3","composer/translate-composer",{dependencies:["./composer","../core/event/event-manager"],factory:function(require,exports,module){/*global require,exports */
/**
 * @module montage/composer/translate-composer
 * @requires montage/core/core
 * @requires montage/composer/composer
 * @requires montage/core/event/event-manager
 */
var Composer = require("./composer").Composer,
    defaultEventManager = require("../core/event/event-manager").defaultEventManager;

/**
 * Abstracts listening for touch and mouse events representing a drag. The
 * emitted events provide translateX and translateY properties that are updated
 * when the user drags on the given element. Should be used wherever a user
 * interacts with an element by dragging.
 *
 * @class TranslateComposer
 * @extends Composer
 * @emits translate
 * @emits translateStart
 * @emits translateEnd
 * @classdesc A composer that elevates touch and mouse events into drag events.
 */
var TranslateComposer = exports.TranslateComposer = Composer.specialize(/** @lends TranslateComposer# */ {

    constructor: {
        value: function TranslateComposer() {
            this.super();
        }
    },

    /**
     * These elements perform some native action when clicked/touched and so we
     * should not preventDefault when a mousedown/touchstart happens on them.
     * @private
     */
    _NATIVE_ELEMENTS: {
        value: ["A", "IFRAME", "EMBED", "OBJECT", "VIDEO", "AUDIO", "CANVAS",
            "LABEL", "INPUT", "BUTTON", "SELECT", "TEXTAREA", "KEYGEN",
            "DETAILS", "COMMAND"
        ]
    },

    _WHEEL_POINTER: {
        value: "wheel",
        writable: false
    },

    _externalUpdate: {
        value: true
    },

    isAnimating: {
        value: false
    },

    isMoving: {
        value: false
    },

    /**
     * When stealChildrenPointer is set to true the translate composer is able
     * to claim the pointer in place of its children when the time difference
     * between touchstart and the first touchmove is within the
     * stealChildrenPointerThreshold.
     *
     * This property should be set to true on translate composers that act as
     * scrollers so that they can capture the pointer instead of its children
     * when the user intends to scroll instead of interacting with one of the
     * children.
     * The intention of the user is deduced by the time difference between
     * touchstart and the first touchmove.
     *
     * @type {boolean}
     */
    stealChildrenPointer: {
        value: false
    },

    /**
     * Time, in ms, between touchstart and touchmove to consider when stealing
     * the pointer from its children.
     * The default value is based on the values we got when measuring on different
     * devices
     * iPad: 127.5
     * Nexus 10 (4.2.2): 153.5
     *
     * @type {number}
     */
    stealChildrenPointerThreshold: {
        value: 130
    },

    frame: {
        value: function() {
            if (this.isAnimating) {
                this._animationInterval();
            }
            this._externalUpdate = false;
        }
    },

    _pointerSpeedMultiplier: {
        value: 1
    },

    /**
     * How many pixels to translate by for each pixel of cursor movement.
     * @type {number}
     * @default 1
     */
    pointerSpeedMultiplier: {
        get: function() {
            return this._pointerSpeedMultiplier;
        },
        set: function(value) {
            this._pointerSpeedMultiplier = value;
        }
    },

    pointerStartEventPosition: {
        value: null
    },

    _shouldDispatchTranslate: {
        value: false
    },

    _isSelfUpdate: {
        value: false
    },

    _allowFloats: {
        value: false
    },

    /**
     * Allow (@link translateX} and {@link translateY} to be floats?
     * @type {boolean}
     * @default false
     */
    allowFloats: {
        get: function() {
            return this._allowFloats;
        },
        set: function(value) {
            if (this._allowFloats !== value) {
                this._allowFloats = value;
                this.translateX = this._translateX;
                this.translateY = this._translateY;
            }
        }
    },

    _translateX: {
        value: 0
    },

    /**
     * Amount of translation in the X (left/right) direction. Can be inverted with
     * {@link invertXAxis}, and restricted to a range with
     * {@link minTranslateX} and {@link maxTranslateX}.
     * @type {number}
     * @default 0
     */
    translateX: {
        get: function() {
            return this._translateX;
        },
        set: function(value) {
            if (this._axis === "vertical") {
                this._translateX = this._minTranslateX || 0;
            } else {
                //jshint -W016
                var tmp = isNaN(value) ? 0 : this._allowFloats ? parseFloat(value) : value >> 0;
                //jshint +W016

                if (this._minTranslateX !== null && tmp < this._minTranslateX) {
                    tmp = this._minTranslateX;
                }
                if (this._maxTranslateX !== null && tmp > this._maxTranslateX) {
                    tmp = this._maxTranslateX;
                }
                if (!this._isSelfUpdate) {
                    this.isAnimating = false;
                }
                this._translateX = tmp;
            }
        }
    },

    _translateY: {
        value: 0
    },

    /**
     * Amount of translation in the Y (up/down) direction. Can be inverted with
     * {@link invertYAxis}, and restricted to a range with
     * {@link minTranslateY} and {@link maxTranslateY}.
     * @type {number}
     * @default 0
     */
    translateY: {
        get: function() {
            return this._translateY;
        },
        set: function(value) {
            if (this._axis === "horizontal") {
                this._translateY = this._minTranslateY || 0;
            } else {
                //jshint -W016
                var tmp = isNaN(value) ? 0 : this._allowFloats ? parseFloat(value) : value >> 0;
                //jshint +W016

                if (this._minTranslateY !== null && tmp < this._minTranslateY) {
                    tmp = this._minTranslateY;
                }
                if (this._maxTranslateY !== null && tmp > this._maxTranslateY) {
                    tmp = this._maxTranslateY;
                }
                if (!this._isSelfUpdate) {
                    this.isAnimating = false;
                }
                this._translateY = tmp;
            }
        }
    },

    _minTranslateX: {
        value: null
    },

    /**
     * The minimum value {@link translateX} can take. If set to null then
     * there is no minimum.
     * @type {?number}
     * @default null
    */
    minTranslateX: {
        get: function() {
            return this._minTranslateX;
        },
        set: function(value) {
            if (value !== null) {
                value = parseFloat(value);
            }

            if (this._minTranslateX !== value) {
                if (value !== null && this._translateX < value) {
                    this.translateX = value;
                }
                this._minTranslateX = value;
            }
        }
    },

    _maxTranslateX: {
        value: null
    },

    /**
     * The maximum value {@link translateX} can take. If set to null then
     * there is no maximum.
     * @type {?number}
     * @default null
     */
    maxTranslateX: {
        get: function() {
            return this._maxTranslateX;
        },
        set: function(value) {
            if (value !== null) {
                value = parseFloat(value);
            }

            if (this._maxTranslateX !== value) {
                if (value !== null && this._translateX > value) {
                    this.translateX = value;
                }
                this._maxTranslateX = value;
            }
        }
    },

    _minTranslateY: {
        value: null
    },

    /**
     * The minimum value {@link translateY} can take. If set to null then
     * there is no minimum.
     * @type {?number}
     * @default null
     */
    minTranslateY: {
        get: function() {
            return this._minTranslateY;
        },
        set: function(value) {
            if (value !== null) {
                value = parseFloat(value);
            }

            if (this._minTranslateY !== value) {
                if (value !== null && this._translateY < value) {
                    this.translateY = value;
                }
                this._minTranslateY = value;
            }
        }
    },

    _maxTranslateY: {
        value: null
    },

    /**
     * The maximum value {@link translateY} can take. If set to null then
     * there is no maximum.
     * @type {?number}
     * @default null
     */
    maxTranslateY: {
        get: function() {
            return this._maxTranslateY;
        },
        set: function(value) {
            if (value !== null) {
                value = parseFloat(value);
            }

            if (this._maxTranslateY !== value) {
                if (value !== null && this._translateY > value) {
                    this.translateY = value;
                }
                this._maxTranslateY = value;
            }
        }
    },

    _axis: {
        value: "both"
    },

    /**
     * Which axis translation is restricted to.
     *
     * Can be "vertical", "horizontal" or "both".
     * @type {string}
     * @default "both"
     */
    axis: {
        get: function() {
            return this._axis;
        },
        set: function(value) {
            switch (value) {
            case "vertical":
            case "horizontal":
                this._axis = value;
                this.translateX = this._translateX;
                this.translateY = this._translateY;
                break;
            default:
                this._axis = "both";
                break;
            }
        }
    },

    /**
     * Invert direction of translation on both axes.
     *
     * This inverts the effect of cursor motion on both axes. For example
     * if set to true moving the mouse up will increase the value of
     * translateY instead of decreasing it.
     *
     * Depends on invertXAxis and invertYAxis.
     * @type {boolean}
     * @default false
    */
    invertAxis: {
        depends: ["invertXAxis", "invertYAxis"],
        get: function() {
            return (this._invertXAxis === this._invertYAxis) ? this._invertXAxis : null;
        },
        set: function(value) {
            this.invertXAxis = value;
            this.invertYAxis = value;
        }
    },

    _invertXAxis: {
        value: false
    },

    /**
     * Invert direction of translation along the X axis.
     *
     * This inverts the effect of left/right cursor motion on translateX.
     * @type {boolean}
     * @default false
     */
    invertXAxis: {
        get: function() {
            return this._invertXAxis;
        },
        set: function(value) {
            this._invertXAxis = !!value;
        }
    },

    _invertYAxis: {
        value: false
    },

    /**
     * Invert direction of translation along the Y axis.
     *
     * This inverts the effect of up/down cursor motion on translateX.
     * @type {boolean}
     * @default false
     */
    invertYAxis: {
        get: function() {
            return this._invertYAxis;
        },
        set: function(value) {
            this._invertYAxis = !!value;
        }
    },

    /**
     *  How fast the cursor has to be moving before translating starts. Only
     *  applied when another component has claimed the pointer.
     *  @type {number}
     *  @default 500
     */
    startTranslateSpeed: {
        value: 500
    },

    startTranslateRadius: {
        value: 8
    },

    _hasMomentum: {
        value: true
    },

    /**
     * Whether to keep translating after the user has releases the cursor.
     * @type {boolean}
     * @default true
     */
    hasMomentum: {
        get: function() {
            return this._hasMomentum;
        },
        set: function(value) {
            this._hasMomentum = value ? true : false;
        }
    },

    __momentumDuration: {
        value: 650
    },

    _momentumDuration: {
        get: function() {
            return this.__momentumDuration;
        },
        set: function(value) {
            //jshint -W016
            this.__momentumDuration = isNaN(value) ? 1 : value >> 0;
            //jshint +W016
            if (this.__momentumDuration < 1) {
                this.__momentumDuration = 1;
            }
        }
    },

    _pointerX: {
        value: null
    },

    _pointerY: {
        value: null
    },

    _touchIdentifier: {
        value: null
    },

    _isFirstMove: {
        value: false
    },

    _start: {
        value: function(x, y, target, timeStamp) {
            this.pointerStartEventPosition = {
                pageX: x,
                pageY: y,
                target: target,
                timeStamp: timeStamp
            };
            this._pointerX = x;
            this._pointerY = y;
            if (window.Touch) {
                this._element.addEventListener("touchend", this, true);
                this._element.addEventListener("touchcancel", this, true);
                this._element.addEventListener("touchmove", this, true);
                this._element.addEventListener("touchmove", this, false);
            } else {
                document.addEventListener("mouseup", this, true);
                this._element.addEventListener("mousemove", this, true);
            }
            if (this.isAnimating) {
                this.isAnimating = false;
                this._dispatchTranslateEnd();
            }
            this._isFirstMove = true;
        }
    },

    _observedPointer: {
        value: null
    },

    /**
     * Determines if the composer will call `preventDefault` on the DOM events it interprets.
     * @param {Event} The event
     * @returns {boolean} whether preventDefault should be called
     * @private
     **/
    _shouldPreventDefault: {
        value: function(event) {
            return !!event.target.tagName && TranslateComposer._NATIVE_ELEMENTS.indexOf(event.target.tagName) === -1 && !event.target.isContentEditable;
        }
    },

    /**
     * Handle the mousedown that bubbled back up from beneath the element
     * If nobody else claimed this pointer, we should handle it now
     * @method
     * @param {Event} event
     * @private
     */
    handleMousedown: {
        value: function(event) {
            this._observedPointer = "mouse";

            if (event.button === 0 && !this.eventManager.componentClaimingPointer(this._observedPointer)) {
                this._start(event.clientX, event.clientY, event.target, event.timeStamp);
                this.eventManager.claimPointer(this._observedPointer, this);
            }
        }
    },

    captureMousemove: {
        value: function(event) {
            if (this.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                event.preventDefault();
                if (this._isFirstMove) {
                    this._firstMove();
                } else {
                    this._move(event.clientX, event.clientY);
                }
            }
        }
    },

    captureMouseup: {
        value: function(event) {
            this._end(event);
        }
    },

    _releaseInterest: { // unload??
        value: function() {

            if (window.Touch) {
                this._element.removeEventListener("touchend", this, true);
                this._element.removeEventListener("touchcancel", this, true);
                if (this._isFirstMove) {
                    //if we receive an end without ever getting a move
                    this._element.removeEventListener("touchmove", this, true);
                }
                this._element.removeEventListener("touchmove", this, false);
            } else {
                document.removeEventListener("mouseup", this, true);
                if (this._isFirstMove) {
                    this._element.removeEventListener("mousemove", this, true);
                } else {
                    document.removeEventListener("mousemove", this, true);
                }
            }

            if (this.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                this.eventManager.forfeitPointer(this._observedPointer, this);
            }
            this._observedPointer = null;
        }
    },

    captureTouchstart: {
        value: function(event) {
            if (this._shouldPreventDefault(event)) {
                event.preventDefault();
            }

            // If already scrolling, ignore any new touchstarts
            if (this._observedPointer !== null && this.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                return;
            }

            if (event.targetTouches && event.targetTouches.length === 1) {
                this._observedPointer = event.targetTouches[0].identifier;
                this._start(event.targetTouches[0].clientX, event.targetTouches[0].clientY, event.targetTouches[0].target, event.timeStamp);
            }
        }
    },

    captureTouchmove: {
        value: function(event) {
            var timeToMove;

            if (this.stealChildrenPointer && this._isAxisMovement(event.targetTouches[0])) {
                timeToMove = event.timeStamp - this.pointerStartEventPosition.timeStamp;
                if (timeToMove < this.stealChildrenPointerThreshold) {
                    this.eventManager.claimPointer(this._observedPointer, this);
                }
            }
        }
    },

    handleTouchmove: {
        value: function(event) {
            var i = 0, len = event.changedTouches.length;
            while (i < len && event.changedTouches[i].identifier !== this._observedPointer) {
                i++;
            }

            if (i < len) {
                if (this._isFirstMove) {
                    // The first inner component in the hierarchy will
                    // claim the pointer if it wasn't claimed during
                    // capture phase.
                    if (!this.eventManager.componentClaimingPointer(this._observedPointer)) {
                        this.eventManager.claimPointer(this._observedPointer, this);
                    }
                }

                if (this.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                    event.preventDefault();
                    if (this._isFirstMove) {
                        this._firstMove();
                    } else {
                        this._move(event.changedTouches[i].clientX, event.changedTouches[i].clientY);
                    }
                } else {
                    // This component didn't claim the pointer so we stop
                    // listening for further movement.
                    this._releaseInterest();
                }
            }
        }
    },

    captureTouchend: {
        value: function(event) {
            var i = 0, len = event.changedTouches.length;
            while (i < len && event.changedTouches[i].identifier !== this._observedPointer) {
                i++;
            }
            if (i < len) {
                this._end(event.changedTouches[i]);
            }
        }
    },

    captureTouchcancel: {
        value: function(event) {
            var i = 0, len = event.changedTouches.length;
            while (i < len && event.changedTouches[i].identifier !== this._observedPointer) {
                i++;
            }
            if (i < len) {
                this._cancel(event.changedTouches[i]);
            }
        }
    },

    _isAxisMovement: {
        value: function(event) {
            var velocity = event.velocity,
                lowerRight = 0.7853981633974483, // pi/4
                lowerLeft = 2.356194490192345, // 3pi/4
                upperLeft = -2.356194490192345, // 5pi/4
                upperRight = -0.7853981633974483, // 7pi/4
                isUp, isDown, isRight, isLeft,
                angle,
                dX, dY;

            if (this.axis === "both") {
                return true;
            }

            if (!velocity || 0 === velocity.speed || isNaN(velocity.speed)) {
                // If there's no speed then we calculate a vector from the
                // initial position to the current position.
                dX = this.pointerStartEventPosition.pageX - event.clientX;
                dY = this.pointerStartEventPosition.pageY - event.clientY;
                angle = Math.atan2(dY, dX);
            } else {
                angle = velocity.angle;
            }

            // The motion is with the grain of the element; we may want to see if we should claim the pointer
            if ("horizontal" === this.axis) {

                isRight = (angle <= lowerRight && angle >= upperRight);
                isLeft = (angle >= lowerLeft || angle <= upperLeft);

                if (isRight || isLeft) {
                    return true;
                }

            } else if ("vertical" === this.axis) {

                isUp = (angle <= upperRight && angle >= upperLeft);
                isDown = (angle >= lowerRight && angle <= lowerLeft);

                if (isUp || isDown) {
                    return true;
                }

            }

            return false;
        }
    },

    _translateEndTimeout: {
        value: null
    },

    captureWheel: {
        value: function() {
            if (!this.eventManager.componentClaimingPointer(this._WHEEL_POINTER)) {
                this.eventManager.claimPointer(this._WHEEL_POINTER, this.component);
            }
        }
    },

    handleWheel: {
        value: function(event) {
            var self = this;

            // If this composers' component is claiming the "wheel" pointer then handle the event
            if (this.eventManager.isPointerClaimedByComponent(this._WHEEL_POINTER, this.component)) {
                var oldTranslateY = this._translateY;
                var deltaY = event.wheelDeltaY || -event.deltaY || 0;
                this._dispatchTranslateStart();
                this.translateY = this._translateY - ((deltaY * 20) / 120);
                this._dispatchTranslate();
                window.clearTimeout(this._translateEndTimeout);
                this._translateEndTimeout = window.setTimeout(function() {
                    self._dispatchTranslateEnd();
                }, 400);

                // If we're not at one of the extremes (i.e. the scroll actually
                // changed the translate) then we want to preventDefault to stop
                // the page scrolling.
                if (oldTranslateY !== this._translateY && this._shouldPreventDefault(event)) {
                    event.preventDefault();
                }
                this.eventManager.forfeitPointer(this._WHEEL_POINTER, this.component);
            }
        }
    },

    _firstMove: {
        value: function() {
            if (this._isFirstMove) {
                this._dispatchTranslateStart(this._translateX, this._translateY);
                this._isFirstMove = false;
                this.isMoving = true;
                //listen to the document for the rest of the move events
                if (window.Touch) {
                    this._element.removeEventListener("touchmove", this, true);
                } else {
                    document.addEventListener("mousemove", this, true);
                    this._element.removeEventListener("mousemove", this, true);
                }

            }
        }
    },

    _move: {
        value: function(x, y) {
            var pointerDelta;

            this._isSelfUpdate = true;
            if (this._axis !== "vertical") {
                pointerDelta = this._invertXAxis ? (this._pointerX - x) : (x - this._pointerX);
                this.translateX += pointerDelta * this._pointerSpeedMultiplier;
            }
            if (this._axis !== "horizontal") {
                pointerDelta = this._invertYAxis ? (this._pointerY - y) : (y - this._pointerY);
                this.translateY += pointerDelta * this._pointerSpeedMultiplier;
            }
            this._isSelfUpdate = false;

            this._pointerX = x;
            this._pointerY = y;

            if (this._shouldDispatchTranslate) {
                this._dispatchTranslate();
            }
        }
    },

    _bezierTValue: {
        value: function(x, p1x, p1y, p2x, p2y) {
            var a = 1 - 3 * p2x + 3 * p1x,
                b = 3 * p2x - 6 * p1x,
                c = 3 * p1x,
                t = 0.5,
                der, i, k, tmp;

            for (i = 0; i < 10; i++) {
                tmp = t * t;
                der = 3 * a * tmp + 2 * b * t + c;
                k = 1 - t;
                t -= ((3 * (k * k * t * p1x + k * tmp * p2x) + tmp * t - x) / der); // der==0
            }
            tmp = t * t;
            k = 1 - t;
            return 3 * (k * k * t * p1y + k * tmp * p2y) + tmp * t;
        }
    },

    _dispatchTranslateStart: {
        value: function(x, y) {
            var translateStartEvent = document.createEvent("CustomEvent");

            translateStartEvent.initCustomEvent("translateStart", true, true, null);
            translateStartEvent.translateX = x;
            translateStartEvent.translateY = y;
            // Event needs to be the same shape as the one in flow-translate-composer
            translateStartEvent.scroll = 0;
            translateStartEvent.pointer = this._observedPointer;
            this.dispatchEvent(translateStartEvent);
        }
    },

    _dispatchTranslateEnd: {
        value: function() {
            var translateEndEvent = document.createEvent("CustomEvent");

            translateEndEvent.initCustomEvent("translateEnd", true, true, null);
            translateEndEvent.translateX = this._translateX;
            translateEndEvent.translateY = this._translateY;
            // Event needs to be the same shape as the one in flow-translate-composer
            translateEndEvent.scroll = 0;
            this.dispatchEvent(translateEndEvent);
        }
    },

    _dispatchTranslateCancel: {
        value: function() {
            var translateCancelEvent = document.createEvent("CustomEvent");

            translateCancelEvent.initCustomEvent("translateCancel", true, true, null);
            translateCancelEvent.translateX = this._translateX;
            translateCancelEvent.translateY = this._translateY;
            // Event needs to be the same shape as the one in flow-translate-composer
            translateCancelEvent.scroll = 0;
            this.dispatchEvent(translateCancelEvent);
        }
    },

    _dispatchTranslate: {
        value: function() {
            var translateEvent = document.createEvent("CustomEvent");
            translateEvent.initCustomEvent("translate", true, true, null);
            translateEvent.translateX = this._translateX;
            translateEvent.translateY = this._translateY;
            // Event needs to be the same shape as the one in flow-translate-composer
            translateEvent.scroll = 0;
            translateEvent.pointer = this._observedPointer;
            this.dispatchEvent(translateEvent);
        }
    },

    animateBouncingX: {value: false, enumerable: false},
    startTimeBounceX: {value: false, enumerable: false},
    animateBouncingY: {value: false, enumerable: false},
    startTimeBounceY: {value: false, enumerable: false},
    animateMomentum: {value: false, enumerable: false},
    startTime: {value: null, enumerable: false},
    startX: {value: null, enumerable: false},
    posX: {value: null, enumerable: false},
    endX: {value: null, enumerable: false},
    startY: {value: null, enumerable: false},
    posY: {value: null, enumerable: false},
    endY: {value: null, enumerable: false},

    translateStrideX: {
        value: null
    },

    translateStrideY: {
        value: null
    },

    translateStrideDuration: {
        value: 330
    },

    _animationInterval: {
        value: function () {
            var time = Date.now(), t, tmp, tmpX, tmpY, animateStride = false;

            if (this.animateMomentum) {
                t=time-this.startTime;
                if (t<this.__momentumDuration) {
                    this.posX=this.startX-((this.momentumX+this.momentumX*(this.__momentumDuration-t)/this.__momentumDuration)*t/1000)/2;
                    this.posY=this.startY-((this.momentumY+this.momentumY*(this.__momentumDuration-t)/this.__momentumDuration)*t/1000)/2;
                    if (this.translateStrideX && (this.startStrideXTime === null) && ((this.__momentumDuration - t < this.translateStrideDuration) || (Math.abs(this.posX - this.endX) < this.translateStrideX * 0.75))) {
                        this.startStrideXTime = time;
                    }
                    if (this.translateStrideY && (this.startStrideYTime === null) && ((this.__momentumDuration - t < this.translateStrideDuration) || (Math.abs(this.posY - this.endY) < this.translateStrideY * 0.75))) {
                        this.startStrideYTime = time;
                    }
                } else {
                    this.animateMomentum = false;
                }
            }
            tmp = Math.round(this.endX / this.translateStrideX);
            if (this.startStrideXTime && (time - this.startStrideXTime > 0)) {
                if (time - this.startStrideXTime < this.translateStrideDuration) {
                    t = this._bezierTValue((time - this.startStrideXTime) / this.translateStrideDuration, 0.275, 0, 0.275, 1);
                    this.posX = this.posX * (1 - t) + (tmp *  this.translateStrideX) * t;
                    animateStride = true;
                } else {
                    this.posX = tmp * this.translateStrideX;
                }
            }
            tmp = Math.round(this.endY / this.translateStrideY);
            if (this.startStrideYTime && (time - this.startStrideYTime > 0)) {
                if (time - this.startStrideYTime < this.translateStrideDuration) {
                    t = this._bezierTValue((time - this.startStrideYTime) / this.translateStrideDuration, 0.275, 0, 0.275, 1);
                    this.posY = this.posY * (1 - t) + (tmp *  this.translateStrideY) * t;
                    animateStride = true;
                } else {
                    this.posY = tmp * this.translateStrideY;
                }
            }
            tmpX = this.posX;
            tmpY = this.posY;
            this._isSelfUpdate=true;
            this.translateX=tmpX;
            this.translateY=tmpY;
            if (this._shouldDispatchTranslate) {
                this._dispatchTranslate();
            }
            this._isSelfUpdate=false;
            this.isAnimating = this.animateMomentum || animateStride;
            if (this.isAnimating) {
                this.needsFrame=true;
            } else {
                this._dispatchTranslateEnd();
            }
        }
    },


    _end: {
        value: function (event) {

            this.startTime=Date.now();

            this.endX = this.posX = this.startX=this._translateX;
            this.endY=this.posY=this.startY=this._translateY;

            if ((this._hasMomentum) && ((event.velocity.speed>40) || this.translateStrideX || this.translateStrideY)) {
                if (this._axis !== "vertical") {
                    this.momentumX = event.velocity.x * this._pointerSpeedMultiplier * (this._invertXAxis ? 1 : -1);
                } else {
                    this.momentumX = 0;
                }
                if (this._axis !== "horizontal") {
                    this.momentumY = event.velocity.y * this._pointerSpeedMultiplier * (this._invertYAxis ? 1 : -1);
                } else {
                    this.momentumY=0;
                }
                this.endX = this.startX - (this.momentumX * this.__momentumDuration / 2000);
                this.endY = this.startY - (this.momentumY * this.__momentumDuration / 2000);
                this.startStrideXTime = null;
                this.startStrideYTime = null;
                this.animateMomentum = true;
            } else {
                this.animateMomentum = false;
            }

            if (this.animateMomentum) {
                this._animationInterval();
            } else if (!this._isFirstMove) {
                this.isMoving = false;
                // Only dispatch a translateEnd if a translate start has occured
                this._dispatchTranslateEnd();
            }
            this._releaseInterest();
        }
    },

    _cancel: {
        value: function (event) {

            this.startTime=Date.now();

            this.endX = this.posX = this.startX=this._translateX;
            this.endY=this.posY=this.startY=this._translateY;
            this.animateMomentum = false;

            if (!this._isFirstMove) {
                this.isMoving = false;
                // Only dispatch a translateCancel if a translate start has
                // occurred.
                this._dispatchTranslateCancel();
            }
            this._releaseInterest();
        }
    },

    surrenderPointer: {
        value: function(pointer, demandingComponent) {
            return ! this.isMoving &&
                demandingComponent.stealChildrenPointer &&
                // assuming that demanding component is a (great)*child
                demandingComponent.stealChildrenPointerThreshold <= this.stealChildrenPointerThreshold;
        }
    },

    eventManager: {
        get: function() {
            return defaultEventManager;
        }
    },

    load: {
        value: function() {
            if (window.Touch) {
                this._element.addEventListener("touchstart", this, true);
                this._element.addEventListener("touchstart", this, false);
            } else {
                this._element.addEventListener("mousedown", this, false);

                var wheelEventName;
                if (typeof window.onwheel !== "undefined"){
                    wheelEventName = "wheel";
                } else {
                    wheelEventName = "mousewheel";
                }
                this._element.addEventListener(wheelEventName, this, false);
                this._element.addEventListener(wheelEventName, this, true);
            }

            this.eventManager.isStoringPointerEvents = true;
        }
    },

    /*
     * Add an event listener to receive events generated by the
    * `TranslateComposer`.
     * @param {string} event type
     * @param {object|function} listener object or function
     * @param {boolean} use capture instead of bubble
     */
    addEventListener: {
        value: function(type, listener, useCapture) {
            Composer.addEventListener.call(this, type, listener, useCapture);
            if (type === "translate") {
                this._shouldDispatchTranslate = true;
            }
        }
    }

});

TranslateComposer.prototype.handleMousewheel = TranslateComposer.prototype.handleWheel;
TranslateComposer.prototype.captureMousewheel = TranslateComposer.prototype.captureWheel;


}})
;
//*/
montageDefine("f73ee10","runtime/runtime-tf-loader",{dependencies:["runtime/dependencies/gl-matrix","runtime/glTF-parser","runtime/resource-description","runtime/technique","runtime/pass","runtime/glsl-program","runtime/glTF-material","runtime/mesh","runtime/glTF-node","runtime/primitive","runtime/projection","runtime/camera","runtime/skin","runtime/glTF-scene","runtime/transform","runtime/animation","runtime/animation-manager"],factory:function(require,exports,module){
require("runtime/dependencies/gl-matrix");
var glTFParser = require("runtime/glTF-parser").glTFParser;
var ResourceDescription = require("runtime/resource-description").ResourceDescription;
var Technique = require("runtime/technique").Technique;
var ProgramPass = require("runtime/pass").ProgramPass;
var Pass = require("runtime/pass").Pass;
var ScenePass = require("runtime/pass").ScenePass;
var GLSLProgram = require("runtime/glsl-program").GLSLProgram;
var glTFMaterial = require("runtime/glTF-material").glTFMaterial;
var Mesh = require("runtime/mesh").Mesh;
var glTFNode = require("runtime/glTF-node").glTFNode;
var Primitive = require("runtime/primitive").Primitive;
var Projection = require("runtime/projection").Projection;
var Camera = require("runtime/camera").Camera;
var Skin = require("runtime/skin").Skin;
var glTFScene = require("runtime/glTF-scene").glTFScene;
var Transform = require("runtime/transform").Transform;
var KeyframeAnimation = require("runtime/animation").KeyframeAnimation;
var AnimationManager = require("runtime/animation-manager").AnimationManager;

exports.RuntimeTFLoader = Object.create(glTFParser, {

    _materials:  { writable:true, value: null },

    _scenes: { writable:true, value: null },

    _animations: { writable:true, value: null },

    //----- implements glTFParser ----------------------------

    totalBufferSize: { value: 0, writable: true },

    handleBuffer: {
        value: function(entryID, description, userInfo) {
            var buffer = Object.create(ResourceDescription).init(entryID, description);
            buffer.id = entryID;
            this.storeEntry(entryID, buffer, description);
            this.totalBufferSize += description.byteLength;
            return true;
        }
    },

    handleBufferView: {
        value: function(entryID, description, userInfo) {
            var bufferView = Object.create(ResourceDescription).init(entryID, description);
            bufferView.id = entryID;

            var buffer = this.getEntry(bufferView.description.buffer);
            description.type = "ArrayBufferView";

            bufferView.buffer = buffer;
            this.storeEntry(entryID, bufferView, description);

            return true;
        }
    },

    handleShader: {
        value: function(entryID, description, userInfo) {
            var shader = Object.create(ResourceDescription).init(entryID, description);
            shader.id = entryID;
            shader.type = "shader";
            this.storeEntry(entryID, shader, description);
            return true;
        }
    },

    handleProgram: {
        value: function(entryID, description, userInfo) {
            var program = Object.create(ResourceDescription).init(entryID, description);
            program.id = entryID;
            program.type = "program";
            var vsShaderEntry = this.getEntry(program.description["vertexShader"]);
            var fsShaderEntry = this.getEntry(program.description["fragmentShader"]);
            program[GLSLProgram.VERTEX_SHADER] = vsShaderEntry.entry;
            program[GLSLProgram.FRAGMENT_SHADER] = fsShaderEntry.entry;
            this.storeEntry(entryID, program, description);
            return true;
        }
    },

    handleImage: {
        value: function(entryID, description, userInfo) {
            var imagePath = description.path;
            var imageResource = Object.create(ResourceDescription).init(imagePath, { "path": imagePath });
            imageResource.type = "image";
            this.storeEntry(entryID, imageResource, description);
            return true;
        }
    },

    handleVideo: {
        value: function(entryID, description, userInfo) {
            var videoPath = description.path;
            var videoResource = Object.create(ResourceDescription).init(videoPath, { "path": videoPath });
            videoResource.type = "video";
            this.storeEntry(entryID, videoResource, description);
            return true;
        }
    },

    handleTechnique: {
        value: function(entryID, description, userInfo) {
            var technique = Object.create(Technique);
            technique.id = entryID;
            var globalID = this.storeEntry(entryID, technique, description);

            var rootPassID = description.pass;
            technique.passName = rootPassID;

            var passesDescriptions = description.passes;
            if (!passesDescriptions) {
                console.log("ERROR: technique does not contain pass");
                return false;
            }

            var passes = {};
            var allPassesNames = Object.keys(description.passes);
            allPassesNames.forEach( function(passName) {
                var passDescription = passesDescriptions[passName];
                var instanceProgram = passDescription.instanceProgram;
                if (instanceProgram) {
                    var pass = Object.create(ProgramPass).init();
                    pass.id = globalID + "_" + rootPassID;
                    pass.instanceProgram = passDescription.instanceProgram;
                    pass.instanceProgram.program = this.getEntry(instanceProgram.program).entry;

                    pass.states = passDescription.states;
                    passes[passName] = pass;
                } else {
                    console.log("ERROR: A Pass with type=program must have a program property");
                    return false;
                }

            }, this);

            technique.parameters = description.parameters;
            technique.passes = passes;

            return true;
        }
    },

    handleMaterial: {
        value: function(entryID, description, userInfo) {
            var material = Object.create(glTFMaterial).init(entryID);
            this.storeEntry(entryID, material, description);
            //Simplification - Just take the selected technique
            var instanceTechnique = description.instanceTechnique;
            var values = instanceTechnique.values;
            material.name = description.name;
            var techniqueEntry = this.getEntry(instanceTechnique.technique);
            if (techniqueEntry) {
                material.technique = techniqueEntry.entry;
            } else {
                console.log("ERROR: invalid file, cannot find referenced technique:"+description.technique);
                return false;
            }

            var parameters =  material.technique.parameters;
            material.parameters = JSON.parse(JSON.stringify(parameters)); //clone parameters
            if (values) {
                var parameterSid;
                for (parameterSid in values) {
                    var parameter = material.parameters[parameterSid];
                    if (parameter) {
                        parameter.value = values[parameterSid];
                        var paramValue = null;
                        switch (parameter.type) {
                            case WebGLRenderingContext.SAMPLER_CUBE:
                            case WebGLRenderingContext.SAMPLER_2D:
                            {
                                var entry = this.getEntry(parameter.value);
                                if (entry) {
                                    //this looks stupid, I need to get rid at least of .entry and treat within the getEntry method.
                                    parameter.value = entry.entry;
                                }
                            }
                                break;
                            default: {
                                break;
                            }
                        }
                    }
                }
            }

            if (!this._materials) {
                this._materials = [];
            }
            this._materials.push(material);

            return true;
        }
    },

    handleLight: {
        value: function(entryID, description, userInfo) {
            //no lights yet.
            return true;
        }
    },

    handleAccessor: {
        value: function(entryID, description, userInfo) {

            description.id = entryID;
            var bufferEntry = this.getEntry(description.bufferView);
            description.bufferView = bufferEntry.entry;
            if (!description.byteOffset)
                description.byteOffset = 0;

            this.storeEntry(entryID, description, description);
        }
    },

    handleMesh: {
        value: function(entryID, description, userInfo) {
            var mesh = Object.create(Mesh).init();
            mesh.id = entryID;
            mesh.name = description.name;

            var isCompressedMesh = false;
            var extensions = description.extensions;
            if (extensions) {
                if (extensions["won-compression"]) {
                    isCompressedMesh = true;
                    mesh.compression = extensions["won-compression"];
                    mesh.compression.type = "won-compression";
                    mesh.compression.compressedData.bufferView =  this.getEntry(mesh.compression.compressedData.bufferView).entry;
                    mesh.compression.compressedData.id = entryID + "_compressedData"
                }

                if (extensions["Open3DGC-compression"]) {
                    isCompressedMesh = true;
                    mesh.compression = extensions["Open3DGC-compression"];
                    mesh.compression.type = "Open3DGC-compression";
                    mesh.compression.compressedData.bufferView =  this.getEntry(mesh.compression.compressedData.bufferView).entry;
                    mesh.compression.compressedData.id = entryID + "_compressedData"
                }
            }

            this.storeEntry(entryID, mesh, description);

            var primitivesDescription = description[Mesh.PRIMITIVES];
            if (!primitivesDescription) {
                //FIXME: not implemented in delegate
                console.log("MISSING_PRIMITIVES for mesh:"+ entryID);
                return false;
            }

            for (var i = 0 ; i < primitivesDescription.length ; i++) {
                var primitiveDescription = primitivesDescription[i];

                if (primitiveDescription.primitive === WebGLRenderingContext.TRIANGLES) {
                    var primitive = Object.create(Primitive).init();

                    //read material
                    var materialEntry = this.getEntry(primitiveDescription.material);
                    primitive.material = materialEntry.entry;

                    mesh.primitives.push(primitive);

                    var attributes = primitiveDescription.attributes;
                    var allSemantics = Object.keys(attributes);

                    allSemantics.forEach( function(semantic) {
                        var attributeID = attributes[semantic];
                        var attributeEntry = this.getEntry(attributeID);

                        //if (!isCompressedMesh) {
                            primitive.addVertexAttribute( { "semantic" :  semantic,
                                "attribute" : attributeEntry.entry });
                        //} else {
                        //    primitive.addVertexAttribute( { "semantic" :  semantic,
                        //        "attribute" : attributeID });
                        //}

                    }, this);

                    //set indices
                    var indicesID = primitiveDescription.indices;
                    var indicesEntry = this.getEntry(indicesID);
                    //if (!isCompressedMesh) {
                        primitive.indices = indicesEntry.entry;
                    //} else {
                    //    primitive.indices = indicesID;
                    //}
                }
            }
            return true;
        }
    },

    handleCamera: {
        value: function(entryID, description, userInfo) {
            //Do not handle camera for now.
            var camera = Object.create(Camera).init();
            camera.id = entryID;
            this.storeEntry(entryID, camera, description);

            var projection = Object.create(Projection);
            projection.initWithDescription(description);
            camera.projection = projection;

            return true;
        }
    },

    handleLight: {
        value: function(entryID, description, userInfo) {
            return true;
        }
    },

    buildNodeHirerachy: {
        value: function(parentEntry) {
            var parentNode = parentEntry.entry;
            var children = parentEntry.description.children;
            if (children) {
                children.forEach( function(childID) {
                    var nodeEntry = this.getEntry(childID);
                    var node = nodeEntry.entry;
                    if (node.parent == null) {
                        parentNode.children.push(node);
                    } else {
                        parentNode.children.push(node.copy());
                    }

                    this.buildNodeHirerachy(nodeEntry);
                }, this);
            }
        }
    },

    /*
        Typically for lights we need to points to other nodes in the scene graph in order to get their transform
        When this happens, a parameter as a source property pointing to the node to be used
     */
    resolveParameterSources: {
        value: function() {
            if (this._materials) {
                this._materials.forEach(function(material) {
                    if (material.parameters) {
                        var parameterKeys = Object.keys(material.parameters);
                        parameterKeys.forEach(function(parameterKey) {
                            var parameter = material.parameters[parameterKey];
                            if (parameter) {
                                if (parameter.source) {
                                    parameter.source = this.getEntry(parameter.source).entry;
                                }
                            }
                        }, this);
                    }
                }, this);
            }
        }
    },

    buildSkeletons: {
        value: function(node) {
            if (node.instanceSkin) {
                var skin = node.instanceSkin.skin;
                if (skin) {
                    node.instanceSkin.skeletons.forEach(function(skeleton) {
                        var nodeEntry = this.getEntry(skeleton);
                        if (nodeEntry) {
                            var rootSkeleton = nodeEntry.entry;
                            var jointsIds = skin.jointsIds;
                            var joints = [];

                            jointsIds.forEach(function(jointId) {
                                var joint = rootSkeleton.nodeWithJointID(jointId);
                                if (joint) {
                                    joints.push(joint);
                                } else {
                                    console.log("WARNING: jointId:"+jointId+" cannot be found in skeleton:"+skeleton);
                                }
                            }, this);

                            skin.nodesForSkeleton[skeleton] = joints;
                        }
                    }, this);

                    var meshSources = [];
                    node.instanceSkin.sources.forEach(function(source) {
                        var sourceEntry = this.getEntry(source);
                        if (sourceEntry) {
                            meshSources.push(sourceEntry.entry);
                        }
                    }, this);
                    skin.sources = meshSources;

                }
            }
            var children = node.children;
            if (children) {
                children.forEach( function(child) {
                    this.buildSkeletons(child);
                }, this);
            }
        }
    },


    handleScene: {
        value: function(entryID, description, userInfo) {

            if (!this._scenes) {
                this._scenes = [];
            }

            if (!description.nodes) {
                console.log("ERROR: invalid file required nodes property is missing from scene");
                return false;
            }

            var scene = Object.create(glTFScene).init();
            scene.ids = this._ids;
            scene.id = entryID;
            scene.name = description.name;
            scene.baseURL = this.baseURL;
            this.storeEntry(entryID, scene, description);

            var rootNode = Object.create(glTFNode).initWithID(); //nothing passed as arg = auto id

            if (description.nodes) {
                description.nodes.forEach(function(nodeUID) {
                    var nodeEntry = this.getEntry(nodeUID);
                    rootNode.children.push(nodeEntry.entry);
                    this.buildNodeHirerachy(nodeEntry);
                }, this);
            }
            this.resolveParameterSources();
            this.buildSkeletons(rootNode);
            scene.rootNode = rootNode;
            this._scenes.push(scene);
            //now build the hirerarchy

            return true;
        }
    },

    handleSkin: {
        value: function(entryID, description, userInfo) {
            var skin = Object.create(Skin).init();
            skin.bindShapeMatrix = mat4.create(description.bindShapeMatrix);
            skin.jointsIds = description.joints;
            skin.inverseBindMatricesDescription = description.inverseBindMatrices;
            skin.inverseBindMatricesDescription.id = entryID + "_inverseBindMatrices";
            skin.inverseBindMatricesDescription.bufferView = this.getEntry(skin.inverseBindMatricesDescription.bufferView).entry;
            this.storeEntry(entryID, skin, description);
        }
    },

    handleNode: {
        value: function(entryID, description, userInfo) {
            var childIndex = 0;
            var self = this;

            var node = Object.create(glTFNode).init();
            node.id = entryID;
            node.jointId = description.jointId;
            node.name = description.name;

            this.storeEntry(entryID, node, description);

            node.transform = Object.create(Transform).initWithDescription(description);

            var meshEntry;
            if (description.mesh) {
                meshEntry = this.getEntry(description.mesh);
                node.meshes.push(meshEntry.entry);
            }

            if (description.meshes) {
                description.meshes.forEach( function(meshID) {
                    meshEntry = this.getEntry(meshID);
                    if (meshEntry)
                        node.meshes.push(meshEntry.entry);
                }, this);
            }

            if (description.camera) {
                var cameraEntry = this.getEntry(description.camera);
                if (cameraEntry)
                    node.cameras.push(cameraEntry.entry);
            }

            if (description.instanceSkin) {
                description.instanceSkin.skin = this.getEntry(description.instanceSkin.skin).entry;
                node.instanceSkin = description.instanceSkin;
                var sources = node.instanceSkin.sources;
                if (sources) {
                    sources.forEach( function(meshID) {
                        meshEntry = this.getEntry(meshID);
                        if (meshEntry)
                            node.meshes.push(meshEntry.entry);
                    }, this);
                }
            }

            return true;
        }
    },

    handleLoadCompleted: {
        value: function(success) {

            if (!this.delegate)
                return;

            var ids = null;
            if (this._state.options) {
                ids = this._state.options.ids;
            }

            if (ids) {
                ids.forEach(function(id) {
                    var entry = this.getEntry(id);
                    if (entry) {
                        this.delegate.loadCompleted(entry.entry);
                    }
                }, this);
            } else {
                if (this._scenes && this.delegate) {
                    if (this._scenes.length > 0) {
                        //add animation manager in scene
                        //FIXME: should get the index of the scene properly here
                        var animationManager = Object.create(AnimationManager).init();
                        animationManager.animations = this._animations;
                        this._scenes[0].animationManager = animationManager;
                        this.delegate.loadCompleted(this._scenes[0]);
                    }
                }
            }
        }
    },

    handleAnimation : {
        value: function(entryID, description, userInfo) {
            if (!this._animations) {
                this._animations = [];
            }

            var animation = Object.create(KeyframeAnimation).initWithDescription(description);
            animation.id =  entryID;
            this.storeEntry(entryID, animation, description);

            var componentSize = 0;
            var parameters = {};
            Object.keys(description.parameters).forEach( function(parameterSID) {
                var parameterUID = description.parameters[parameterSID];
                parameterDescription = this.getEntry(parameterUID).entry;
                //we can avoid code below if we add byteStride
                switch (parameterDescription.type) {
                    case WebGLRenderingContext.FLOAT_VEC4:
                        componentsPerAttribute = 4;
                        break;
                    case WebGLRenderingContext.FLOAT_VEC3:
                        componentsPerAttribute = 3;
                        break;
                    case WebGLRenderingContext.FLOAT_VEC2:
                        componentsPerAttribute = 2;
                        break;
                    case WebGLRenderingContext.FLOAT:
                        componentsPerAttribute = 1;
                        break;
                    default: {
                        console.log("type:"+parameterDescription.type+" byteStride not handled");
                        break;
                    }
                }

                if (parameterDescription.extensions) {
                    var extensions = parameterDescription.extensions;
                    if (extensions) {
                        var compressionObject = extensions["Open3DGC-compression"];
                        if (compressionObject) {
                            var compressedData = compressionObject["compressedData"];
                            if (compressedData) {
                                //we may have already set this bufferView for shared accessors
                                if (typeof compressedData.bufferView !== "object") {
                                    compressedData.bufferView = this.getEntry(compressedData.bufferView).entry;
                                    compressedData.id = entryID + parameterSID + "_compressedData";
                                }
                            }
                        }
                    }
                }

                parameterDescription.byteStride = 4 * componentsPerAttribute;
                parameterDescription.componentsPerAttribute = componentsPerAttribute;
                parameterDescription.id = animation.id + parameterSID;
                parameters[parameterSID] = parameterDescription;
            }, this);

            animation.parameters = parameters;

            animation.channels.forEach(function(channel) {
                var targetUID = channel.target.id;
                channel.path = channel.target.path;
                channel.target = this.getEntry(targetUID).entry;
            }, this);

            Object.keys(animation.samplers).forEach( function(samplerSID) {
                var samplerDescription = description.samplers[samplerSID];
                var sampler = animation.samplers[samplerSID];
                var inputName = samplerDescription.input;
                var outputName = samplerDescription.output;
                sampler.input = parameters[inputName];
                sampler.output = parameters[outputName];
            }, this);

            this._animations.push(animation);
        }
    },

    handleTexture: {
        value: function(entryID, description, userInfo) {
            if (description.source && description.sampler) {
                description.type = "texture";
                description.source = this.getEntry(description.source).entry;
                description.sampler = this.getEntry(description.sampler).entry;
                description.id = entryID; //because the resource manager needs this
                this.storeEntry(entryID, description, description);
            } else if (description.sources && description.sampler) {
                description.type = "texture";
                for (var i = 0 ; i < description.sources.length ; i++) {
                    description.sources[i] = this.getEntry(description.sources[i]).entry;
                }
                description.sampler = this.getEntry(description.sampler).entry;
                description.id = entryID; //because the resource manager needs this
                this.storeEntry(entryID, description, description);

            } else {
                console.log("ERROR: texture"+entryID+" must contain both source and sampler properties");
            }
        }
    },

    handleSampler: {
        value: function(entryID, description, userInfo) {
            description.id = description;
            this.storeEntry(entryID, description, description);
        }
    },

    handleError: {
        value: function(reason) {
            //TODO: propagate in the delegate
        }
    },

    //----- store model values

    _delegate: {
        value: null,
        writable: true
    },

    delegate: {
        enumerable: true,
        get: function() {
            return this._delegate;
        },
        set: function(value) {
            this._delegate = value;
        }
    },

    _entries: {
        enumerable: false,
        value: null,
        writable: true
    },

    removeAllEntries: {
        value: function() {
            this._entries = {};
        }
    },

    containsEntry: {
        enumerable: false,
        value: function(entryID) {
            if (!this._entries)
                return false;
            return this._entries[entryID] ? true : false;
        }
    },

    storeEntry: {
        enumerable: false,
        value: function(id, entry, description) {
            if (this._entries == null) {
                this._entries = {};
            }

            //FIXME: unify with entries and get rid of baseId
            if (this._ids == null) {
                this._ids = {};
            }

            entry.baseId = id;

            this._ids[id] = entry;

            id += this.loaderContext();
            if (!id) {
                console.log("ERROR: not id provided, cannot store");
                return;
            }
            entry.id = id;

            if (this.containsEntry[id]) {
                console.log("WARNING: entry:"+id+" is already stored, overriding");
            }
            this._entries[id] = { "id" : id , "entry" : entry, "description" : description };
            return id;
        }
    },

    getEntry: {
        enumerable: false,
        value: function(entryID) {
            entryID = entryID + this.loaderContext();
            return this._entries ? this._entries[entryID] : null;
        }
    }

});
}})
;
//*/
montageDefine("f73ee10","runtime/dependencies/webgl-debug",{dependencies:[],factory:function(require,exports,module){/*
** Copyright (c) 2012 The Khronos Group Inc.
**
** Permission is hereby granted, free of charge, to any person obtaining a
** copy of this software and/or associated documentation files (the
** "Materials"), to deal in the Materials without restriction, including
** without limitation the rights to use, copy, modify, merge, publish,
** distribute, sublicense, and/or sell copies of the Materials, and to
** permit persons to whom the Materials are furnished to do so, subject to
** the following conditions:
**
** The above copyright notice and this permission notice shall be included
** in all copies or substantial portions of the Materials.
**
** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
*/

// Various functions for helping debug WebGL apps.

WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Wrapped error logging function.
 * @param {string} msg Message to log.
 */
var error = function(msg) {
  if (window.console && window.console.error) {
    window.console.error(msg);
  } else {
    log(msg);
  }
};


/**
 * Which arguments are enums based on the number of arguments to the function.
 * So
 *    'texImage2D': {
 *       9: { 0:true, 2:true, 6:true, 7:true },
 *       6: { 0:true, 2:true, 3:true, 4:true },
 *    },
 *
 * means if there are 9 arguments then 6 and 7 are enums, if there are 6
 * arguments 3 and 4 are enums
 *
 * @type {!Object.<number, !Object.<number, string>}}
 */
var glValidEnumContexts = {
  // Generic setters and getters

  'enable': {1: { 0:true }},
  'disable': {1: { 0:true }},
  'getParameter': {1: { 0:true }},

  // Rendering

  'drawArrays': {3:{ 0:true }},
  'drawElements': {4:{ 0:true, 2:true }},

  // Shaders

  'createShader': {1: { 0:true }},
  'getShaderParameter': {2: { 1:true }},
  'getProgramParameter': {2: { 1:true }},
  'getShaderPrecisionFormat': {2: { 0: true, 1:true }},

  // Vertex attributes

  'getVertexAttrib': {2: { 1:true }},
  'vertexAttribPointer': {6: { 2:true }},

  // Textures

  'bindTexture': {2: { 0:true }},
  'activeTexture': {1: { 0:true }},
  'getTexParameter': {2: { 0:true, 1:true }},
  'texParameterf': {3: { 0:true, 1:true }},
  'texParameteri': {3: { 0:true, 1:true, 2:true }},
  'texImage2D': {
     9: { 0:true, 2:true, 6:true, 7:true },
     6: { 0:true, 2:true, 3:true, 4:true },
  },
  'texSubImage2D': {
    9: { 0:true, 6:true, 7:true },
    7: { 0:true, 4:true, 5:true },
  },
  'copyTexImage2D': {8: { 0:true, 2:true }},
  'copyTexSubImage2D': {8: { 0:true }},
  'generateMipmap': {1: { 0:true }},
  'compressedTexImage2D': {7: { 0: true, 2:true }},
  'compressedTexSubImage2D': {8: { 0: true, 6:true }},

  // Buffer objects

  'bindBuffer': {2: { 0:true }},
  'bufferData': {3: { 0:true, 2:true }},
  'bufferSubData': {3: { 0:true }},
  'getBufferParameter': {2: { 0:true, 1:true }},

  // Renderbuffers and framebuffers

  'pixelStorei': {2: { 0:true, 1:true }},
  'readPixels': {7: { 4:true, 5:true }},
  'bindRenderbuffer': {2: { 0:true }},
  'bindFramebuffer': {2: { 0:true }},
  'checkFramebufferStatus': {1: { 0:true }},
  'framebufferRenderbuffer': {4: { 0:true, 1:true, 2:true }},
  'framebufferTexture2D': {5: { 0:true, 1:true, 2:true }},
  'getFramebufferAttachmentParameter': {3: { 0:true, 1:true, 2:true }},
  'getRenderbufferParameter': {2: { 0:true, 1:true }},
  'renderbufferStorage': {4: { 0:true, 1:true }},

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': {1: { 0:true }},
  'depthFunc': {1: { 0:true }},
  'blendFunc': {2: { 0:true, 1:true }},
  'blendFuncSeparate': {4: { 0:true, 1:true, 2:true, 3:true }},
  'blendEquation': {1: { 0:true }},
  'blendEquationSeparate': {2: { 0:true, 1:true }},
  'stencilFunc': {3: { 0:true }},
  'stencilFuncSeparate': {4: { 0:true, 1:true }},
  'stencilMaskSeparate': {2: { 0:true }},
  'stencilOp': {3: { 0:true, 1:true, 2:true }},
  'stencilOpSeparate': {4: { 0:true, 1:true, 2:true, 3:true }},

  // Culling

  'cullFace': {1: { 0:true }},
  'frontFace': {1: { 0:true }},
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? ("gl." + name) :
      ("/*UNKNOWN WebGL ENUM*/ 0x" + value.toString(16) + "");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} numArgs the number of arguments passed to the function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, numArgs, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    var funcInfo = funcInfo[numArgs];
    if (funcInfo !== undefined) {
      if (funcInfo[argumentIndex]) {
        return glEnumToString(value);
      }
    }
  }
  if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  } else {
    return value.toString();
  }
}

/**
 * Converts the arguments of a WebGL function to a string.
 * Attempts to convert enum arguments to strings.
 *
 * @param {string} functionName the name of the WebGL function.
 * @param {number} args The arguments.
 * @return {string} The arguments as a string.
 */
function glFunctionArgsToString(functionName, args) {
  // apparently we can't do args.join(",");
  var argStr = "";
  var numArgs = args.length;
  for (var ii = 0; ii < numArgs; ++ii) {
    argStr += ((ii == 0) ? '' : ', ') +
        glFunctionArgToString(functionName, numArgs, ii, args[ii]);
  }
  return argStr;
};


function makePropertyWrapper(wrapper, original, propertyName) {
  //log("wrap prop: " + propertyName);
  wrapper.__defineGetter__(propertyName, function() {
    return original[propertyName];
  });
  // TODO(gmane): this needs to handle properties that take more than
  // one value?
  wrapper.__defineSetter__(propertyName, function(value) {
    //log("set: " + propertyName);
    original[propertyName] = value;
  });
}

// Makes a function that calls a function on another object.
function makeFunctionWrapper(original, functionName) {
  //log("wrap fn: " + functionName);
  var f = original[functionName];
  return function() {
    //log("call: " + functionName);
    var result = f.apply(original, arguments);
    return result;
  };
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 * @param {!function(funcName, args): void} opt_onFunc The
 *        function to call when each webgl function is called.
 *        You can use this to log all calls for example.
 */
function makeDebugContext(ctx, opt_onErrorFunc, opt_onFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        var numArgs = args.length;
        for (var ii = 0; ii < numArgs; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, numArgs, ii, args[ii]);
        }
        error("WebGL error "+ glEnumToString(err) + " in "+ functionName +
              "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      if (opt_onFunc) {
        opt_onFunc(functionName, arguments);
      }
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       makePropertyWrapper(wrapper, ctx, propertyName);
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow.hasOwnProperty(err)) {
        if (glErrorShadow[err]) {
          glErrorShadow[err] = false;
          return err;
        }
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingCanvas(canvas) {
  var unwrappedContext_;
  var wrappedContext_;
  var onLost_ = [];
  var onRestored_ = [];
  var wrappedContext_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var numCallsToLoseContext_ = 0;
  var numCalls_ = 0;
  var canRestore_ = false;
  var restoreTimeout_ = 0;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  canvas.getContext = function(f) {
    return function() {
      var ctx = f.apply(canvas, arguments);
      // Did we get a context and is it a WebGL context?
      if (ctx instanceof WebGLRenderingContext) {
        if (ctx != unwrappedContext_) {
          if (unwrappedContext_) {
            throw "got different context"
          }
          unwrappedContext_ = ctx;
          wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
        }
        return wrappedContext_;
      }
      return ctx;
    }
  }(canvas.getContext);

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  var addOnContextLostListener = function(listener) {
    onLost_.push(wrapEvent(listener));
  };

  var addOnContextRestoredListener = function(listener) {
    onRestored_.push(wrapEvent(listener));
  };


  function wrapAddEventListener(canvas) {
    var f = canvas.addEventListener;
    canvas.addEventListener = function(type, listener, bubble) {
      switch (type) {
        case 'webglcontextlost':
          addOnContextLostListener(listener);
          break;
        case 'webglcontextrestored':
          addOnContextRestoredListener(listener);
          break;
        default:
          f.apply(canvas, arguments);
      }
    };
  }

  wrapAddEventListener(canvas);

  canvas.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      numCallsToLoseContext_ = 0;
      ++contextId_;
      while (unwrappedContext_.getError());
      clearErrors();
      glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
      var event = makeWebGLContextEvent("context lost");
      var callbacks = onLost_.slice();
      setTimeout(function() {
          //log("numCallbacks:" + callbacks.length);
          for (var ii = 0; ii < callbacks.length; ++ii) {
            //log("calling callback:" + ii);
            callbacks[ii](event);
          }
          if (restoreTimeout_ >= 0) {
            setTimeout(function() {
                canvas.restoreContext();
              }, restoreTimeout_);
          }
        }, 0);
    }
  };

  canvas.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_.length) {
        setTimeout(function() {
            if (!canRestore_) {
              throw "can not restore. webglcontestlost listener did not call event.preventDefault";
            }
            freeResources();
            resetToInitialState(unwrappedContext_);
            contextLost_ = false;
            numCalls_ = 0;
            canRestore_ = false;
            var callbacks = onRestored_.slice();
            var event = makeWebGLContextEvent("context restored");
            for (var ii = 0; ii < callbacks.length; ++ii) {
              callbacks[ii](event);
            }
          }, 0);
      }
    }
  };

  canvas.loseContextInNCalls = function(numCalls) {
    if (contextLost_) {
      throw "You can not ask a lost contet to be lost";
    }
    numCallsToLoseContext_ = numCalls_ + numCalls;
  };

  canvas.getNumCalls = function() {
    return numCalls_;
  };

  canvas.setRestoreTimeout = function(timeout) {
    restoreTimeout_ = timeout;
  };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShadow_[k];
    }
  }

  function loseContextIfTime() {
    ++numCalls_;
    if (!contextLost_) {
      if (numCallsToLoseContext_ == numCalls_) {
        canvas.loseContext();
      }
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextFunctionWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // log("calling:" + functionName);
      // Only call the functions if the context is not lost.
      loseContextIfTime();
      if (!contextLost_) {
        //if (!checkResources(arguments)) {
        //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
        //  return;
        //}
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        unwrappedContext_.deleteBuffer(resource);
      } else if (resource instanceof WebGLFramebuffer) {
        unwrappedContext_.deleteFramebuffer(resource);
      } else if (resource instanceof WebGLProgram) {
        unwrappedContext_.deleteProgram(resource);
      } else if (resource instanceof WebGLRenderbuffer) {
        unwrappedContext_.deleteRenderbuffer(resource);
      } else if (resource instanceof WebGLShader) {
        unwrappedContext_.deleteShader(resource);
      } else if (resource instanceof WebGLTexture) {
        unwrappedContext_.deleteTexture(resource);
      }
    }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {
      statusMessage: statusMessage,
      preventDefault: function() {
          canRestore_ = true;
        }
    };
  }

  return canvas;

  function makeLostContextSimulatingContext(ctx) {
    // copy all functions and properties to wrapper
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'function') {
         wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
             ctx, propertyName);
       } else {
         makePropertyWrapper(wrappedContext_, ctx, propertyName);
       }
    }

    // Wrap a few functions specially.
    wrappedContext_.getError = function() {
      loseContextIfTime();
      if (!contextLost_) {
        var err;
        while (err = unwrappedContext_.getError()) {
          glErrorShadow_[err] = true;
        }
      }
      for (var err in glErrorShadow_) {
        if (glErrorShadow_[err]) {
          delete glErrorShadow_[err];
          return err;
        }
      }
      return wrappedContext_.NO_ERROR;
    };

    var creationFunctions = [
      "createBuffer",
      "createFramebuffer",
      "createProgram",
      "createRenderbuffer",
      "createShader",
      "createTexture"
    ];
    for (var ii = 0; ii < creationFunctions.length; ++ii) {
      var functionName = creationFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          var obj = f.apply(ctx, arguments);
          obj.__webglDebugContextLostId__ = contextId_;
          resourceDb_.push(obj);
          return obj;
        };
      }(ctx[functionName]);
    }

    var functionsThatShouldReturnNull = [
      "getActiveAttrib",
      "getActiveUniform",
      "getBufferParameter",
      "getContextAttributes",
      "getAttachedShaders",
      "getFramebufferAttachmentParameter",
      "getParameter",
      "getProgramParameter",
      "getProgramInfoLog",
      "getRenderbufferParameter",
      "getShaderParameter",
      "getShaderInfoLog",
      "getShaderSource",
      "getTexParameter",
      "getUniform",
      "getUniformLocation",
      "getVertexAttrib"
    ];
    for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
      var functionName = functionsThatShouldReturnNull[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    var isFunctions = [
      "isBuffer",
      "isEnabled",
      "isFramebuffer",
      "isProgram",
      "isRenderbuffer",
      "isShader",
      "isTexture"
    ];
    for (var ii = 0; ii < isFunctions.length; ++ii) {
      var functionName = isFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return false;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    wrappedContext_.checkFramebufferStatus = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.checkFramebufferStatus);

    wrappedContext_.getAttribLocation = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return -1;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getAttribLocation);

    wrappedContext_.getVertexAttribOffset = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return 0;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getVertexAttribOffset);

    wrappedContext_.isContextLost = function() {
      return contextLost_;
    };

    return wrappedContext_;
  }
}

return {
    /**
     * Initializes this module. Safe to call more than once.
     * @param {!WebGLRenderingContext} ctx A WebGL context. If
    }
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 2, 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} numArgs The number of arguments
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Converts the arguments of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} args The arguments.
   * @return {string} The arguments as a string.
   */
  'glFunctionArgsToString': glFunctionArgsToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) +
   *            " was caused by call to " + funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   * @param {!function(funcName, args): void} opt_onFunc The
   *     function to call when each webgl function is called. You
   *     can use this to log all calls for example.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();


}})
;
//*/
montageDefine("7fd8be3","core/range-controller",{dependencies:["./core","collections/generic-collection"],factory:function(require,exports,module){var Montage = require("./core").Montage;
var GenericCollection = require("collections/generic-collection");

// The content controller is responsible for determining which content from a
// source collection are visible, their order of appearance, and whether they
// are selected. Multiple repetitions may share a single content controller
// and thus their selection state.

// The controller manages a series of visible iterations. Each iteration has a
// corresponding "object" and whether that iteration is "selected". The
// controller uses a bidirectional binding to ensure that the controller's
// "selections" collection and the "selected" property of each iteration are in
// sync.

// The controller can determine which content to display and the order in which
// to render them in a variety of ways. You can either use a "selector" to
// filter and sort the content or use a "visibleIndexes" array. The controller
// binds the content of "organizedContent" depending on which strategy you use.

// The content of "organizedContent" is then reflected with corresponding
// incremental changes to "iterations". The "iterations" array will always
// have an "iteration" corresponding to the "object" in "organizedContent" at
// the same position.

/**
 * A `RangeSelection` is a special kind of `Array` that knows about a `RangeController`
 * and maintains invariants about itself relative to the properties of the
 * `RangeController`. A `RangeSelection` should only be modified using the `splice`
 * method. Changes by directly using other `Array` methods can break the invariants.
 * @class RangeSelection
 * @private
 */
var RangeSelection = function(content, rangeController) {
    var self = content.clone();
    self.makeObservable();
    self.rangeController = rangeController;
    self.contentEquals = content && content.contentEquals || Object.is;

    Object.defineProperty(self, "clone", {
        value: function(){
            return self.slice();
        }
    });

    /**
     * @method splice
     * @param {number} start
     * @param {number} howMany
     * @param {object...} itemsToAdd
     * A custom version of splice to ensure that changes obey the RangeController
     * invariants:
     *  - if rC.multiSelect is false, only allow one item in set.
     *  - if rC.avoidsEmtySelection is true, require at least one item in set.
     *  - only add items that are present in rC.content
     *  - enforce uniqueness of items according to the contentEquals of the content
     */
    var oldSplice = self.splice;
    Object.defineProperty(self, "splice", {
        configurable: false,
        value: function(start, howMany) {
            var content = this.rangeController.content;
            this.contentEquals = content && content.contentEquals || Object.is;
            start = start >= 0 ? start : this.length + start;
            var oldLength = this.length;
            var minusLength = Math.min(howMany, oldLength - start);

            var plusCandidates = [].slice.call(arguments, 2);
            plusCandidates.contentEquals = this.contentEquals;

            var plus = plusCandidates.filter(function(item, index){
                // do not add items to the selection if they aren't in content
                if (content && !content.has(item)) {
                    return false;
                }

                // if the same item appears twice in the add list, only add it once
                if (plusCandidates.findLast(item) > index) {
                    return false;
                }

                // if the item is already in the selection, don't add it
                // unless it's in the part that we're about to delete.
                var indexInSelection = this.find(item);
                return indexInSelection < 0 ||
                        (indexInSelection >= start && indexInSelection < start + minusLength);

            }, this);

            var plusLength = Math.max(plus.length, 0);
            var diffLength = plusLength - minusLength;
            var newLength = Math.max(oldLength + diffLength, start + plusLength);
            var args;

            if (!this.rangeController.multiSelect && newLength > 1) {
                // use the last-supplied item as the sole element of the set
                var last = plusLength ? plus[plusLength-1] : this.one();
                args = [0, oldLength, last];
            } else if (this.rangeController.avoidsEmptySelection && newLength === 0) {
                // use the first item in the selection, unless it is no longer in the content
                if (content.has(this[0])) {
                    args = [1, this.length-1];
                } else {
                    args = [0, this.length, content.one()];
                }
            } else {
                args = [start, howMany].concat(plus);
            }
            return oldSplice.apply(this, args);
        }
    });
    return self;
};

/**
 * A `RangeController` is responsible for managing "ranged content", typically
 * an array, but any collection that implements ranged content change dispatch,
 * `(plus, minus, index)`, would suffice. The controller manages selection and
 * governs the filtering and ordering of the content. `RangeController` is not
 * affiliated with a number range input.
 *
 * A `RangeController` receives a `content` collection, manages what portition
 * of that content is visible and the order of its appearance
 * (`organizedContent`), and projects changes to the the organized content into
 * an array of iteration controllers (`iterations`, containing instances of
 * `Iteration`).
 *
 * The `RangeController` provides a variety of knobs for how to project the
 * content into the organized content, all of which are optional, and the
 * default behavior is to preserve the content and its order.
 * You can use the bindings path expression language (from FRB) to determine
 * the `sortPath` and `filterPath`.
 * There is a `reversed` flag to invert the order of appearance.
 * The `visibleIndexes` property will pluck values from the sorted and filtered
 * content by position, in arbitrary order.
 * The `start` and `length` properties manage a sliding window into the
 * content.
 *
 * The `RangeController` is also responsible for managing which content is
 * selected and provides a variety of knobs for that purpose.
 *
 * @class RangeController
 * @classdesc Manages the selection and visible portion of given content,
 * typically an Array for for a [Repetition]{@link Repetition}.
 * @extends Montage
 */
var RangeController = exports.RangeController = Montage.specialize( /** @lends RangeController# */ {

    constructor: {
        value: function RangeController(content) {
            this.content = null;
            this._selection = new RangeSelection([], this);

            this.sortPath = null;
            this.filterPath = null;
            this.visibleIndexes = null;
            this.reversed = false;
            this.start = null;
            this.length = null;

            this.selectAddedContent = false;
            this.deselectInvisibleContent = false;
            this.clearSelectionOnOrderChange = false;
            this.avoidsEmptySelection = false;
            this.multiSelect = false;

            // The following establishes a pipeline for projecting the
            // underlying content into organizedContent.
            // The filterPath,
            // sortedPath, reversed, and visibleIndexes are all optional stages
            // in that pipeline and used if non-null and in that order.
            // The _orderedContent variable is a necessary intermediate stage
            // From which visibleIndexes plucks visible values.
            this.organizedContent = [];
            // dispatches handleOrganizedContentRangeChange
            this.organizedContent.addRangeChangeListener(this, "organizedContent");
            this.defineBinding("_orderedContent", {
                "<-": "content" +
                    ".($filterPath.defined() ? filter{path($filterPath)} : ())" +
                    ".($sortPath.defined() ? sorted{path($sortPath)} : ())" +
                    ".($reversed ?? 0 ? reversed() : ())"
            });
            this.defineBinding("organizedContent.rangeContent()", {
                "<-": "_orderedContent.(" +
                    "$visibleIndexes.defined() ?" +
                    "$visibleIndexes" +
                        ".filter{<$_orderedContent.length}" +
                        ".map{$_orderedContent[()]}" +
                    " : ()" +
                ").(" +
                    "$start.defined() && $length.defined() ?" +
                    "view($start, $length)" +
                    " : ()" +
                ")"
            });

            this.addRangeAtPathChangeListener("content", this, "handleContentRangeChange");
            this.addPathChangeListener("sortPath", this, "handleOrderChange");
            this.addPathChangeListener("reversed", this, "handleOrderChange");
            this.addOwnPropertyChangeListener("multiSelect", this);

            this.iterations = [];

            if (content) {
                this.initWithContent(content);
            }
        }
    },

    /**
     * Initializes a range controller with a backing collection.
     * @method
     * @param content Any collection that produces range change events, like an
     * `Array` or `SortedSet`.
     * @returns this
     */
    initWithContent: {
        value: function (content) {
            this.content = content;
            return this;
        }
    },

    // Organizing Content
    // ------------------

    /**
     * An FRB expression that determines how to sort the content, like "name"
     * to sort by name.
     * If the `sortPath` is null, the content is not sorted.
     * @type {?string}
     */
    sortPath: {value: null},

    /**
     * Whether to reverse the order of the sorted content.
     * @type {?boolean}
     */
    reversed: {value: null},

    /**
     * An FRB expression that determines how to filter content like
     * "name.startsWith('A')" to see only names starting with 'A'.
     * If the `filterPath` is null, all content is accepted.
     * @type {?string}
     */
    filterPath: {value: null},

    /**
     * An array of indexes to pluck from the ordered and filtered content.
     * The output will be an array of the corresponding content.
     * If the `visibleIndexes` is null, all content is accepted.
     * @type {?Array.<number>}
     */
    visibleIndexes: {value: null},

    /**
     * The first index of a sliding window over the content, suitable for
     * binding (indirectly) to the scroll offset of a large list.
     * If `start` or `length` is null, all content is
     * accepted.
     * @type {?number}
     */
    start: {value: null},

    /**
     * The length of a sliding window over the content, suitable for binding
     * (indirectly) to the scroll height.
     * If `start` or `length` is null, all content is
     * accepted.
     * @type {?number}
     */
    length: {value: null},


    // Managing Selection
    // ------------------

    /**
     * Whether to select new content automatically.
     *
     * Off by default.
     * @type {boolean}
     */
    selectAddedContent: {value: false},
    // TODO make this work

    /**
     * Whether to automatically deselect content that disappears from the
     * `organizedContent`.
     *
     * Off by default.
     * @type {boolean}
     */
    deselectInvisibleContent: {value: false},

    /**
     * Whether to automatically clear the selection whenever the
     * `sortPath`, `filterPath`, or `reversed`
     * knobs change.
     *
     * Off by default.
     * @type {boolean}
     */
    clearSelectionOnOrderChange: {value: false},

    /**
     * Whether to automatically reselect a value if it is the last value
     * removed from the selection.
     *
     * Off by default.
     * @type {boolean}
     */
    avoidsEmptySelection: {value: false},

    /**
     * Whether to automatically deselect all previously selected content when a
     * new selection is made.
     *
     * Off by default.
     * @type {boolean}
     */
    multiSelect: {value: false},


    // Properties managed by the controller
    // ------------------------------------

    /**
     * The content after it has been sorted, reversed, and filtered, suitable
     * for plucking visible indexes and/or then the sliding window.
     * @private
     */
    _orderedContent: {value: null},

    /**
     * An array incrementally projected from `content` through sort,
     * reversed, filter, visibleIndexes, start, and length.
     * @type {Array.<Object>}
     */
    organizedContent: {value: null},

    /**
     * An array of iterations corresponding to each of the values in
     * `organizedContent`, providing an interface for getting or
     * setting whether each is selected.
     * @type {Array.<Iteration>}
     */
    iterations: {value: null},

    _selection: {value: null},

    /**
     * A subset of the `content` that are selected.
     * The user may safely reassign this property and all iterations will react
     * to the change.
     * The selection may be `null`.
     * The selection may be any collection that supports range change events
     * like `Array` or `SortedSet`.
     * @type {?Array|Set|SortedSet}
     */
    selection: {
        get: function () {
            return this._selection;
        },
        /**
         * @name RangeController#set:selection
         * @method
         * @param {Collection} a collection of values to be set as the selection.
         * @deprecated: setting the `selection` will not replace it with the provided.
         * collection. Instead, it will empty the selection and then shallow-copy the
         * contents of the argument into the existing selection array. This is done to
         * maintain the complicated invariants about what the selection can be.
         */
        set: function (collection) {
            var args = [0, this._selection.length];
            if (collection && collection.toArray) {
                args = args.concat(collection.toArray());
            }
            this._selection.splice.apply(this._selection, args);
        }
    },

    /**
     * A managed interface for adding values to the selection, accounting for
     * `multiSelect`.
     * You can however directly manipulate the selection, but that will update
     * the selection asynchronously because the controller cannot change the
     * selection while handling a selection change event.
     * @method
     * @param value
     */
    select: {
        value: function (value) {
            if (!this.multiSelect && this.selection.length >= 1) {
                this.selection.clear();
            }
            this.selection.add(value);
        }
    },

    /**
     * A managed interface for removing values from the selection, accounting
     * for `avoidsEmptySelection`.
     * You can however directly manipulate the selection, but that will update
     * the selection asynchronously because the controller cannot change the
     * selection while handling a selection change event.
     * @method
     * @param value
     */
    deselect: {
        value: function (value) {
            if (!this.avoidsEmptySelection || this.selection.length > 1) {
                this.selection["delete"](value);
            }
        }
    },

    /**
     * A managed interface for clearing the selection, accounting for
     * `avoidsEmptySelection`.
     * You can however directly manipulate the selection, but that will update
     * the selection asynchronously because the controller cannot change the
     * selection while handling a selection change event.
     * @method
     */
    clearSelection: {
        value: function () {
            if (!this.avoidsEmptySelection || this.selection.length > 1) {
                this.selection.clear();
            }
        }
    },

    /**
     * Proxies adding content to the underlying collection, accounting for
     * `selectAddedContent`.
     * @method
     * @param value
     * @return {boolean} whether the value was added
     */
    add: {
        value: function (value) {
            var result;

            if (!this.content) {
                this.content = [];
            }
            result = this.content.add(value);
            if (result) {
                this.handleAdd(value);
            }
            return result;
        }
    },

    /**
     * Proxies pushing content to the underlying collection, accounting for
     * `selectAddedContent`.
     * @method
     * @param ...values
     * @return {boolean} whether the value was added
     */
    push: {
        value: function () {
            var result = this.content.push.apply(this.content, arguments);
            for (var index = 0; index < arguments.length; index++) {
                this.handleAdd(arguments[index]);
            }
            return result;
        }
    },

    /**
     * Proxies popping content from the underlying collection.
     * @method
     * @return the popped value
     */
    pop: {
        value: function () {
            return this.content.pop();
        }
    },

    /**
     * Proxies shifting content from the underlying collection.
     * @method
     * @return the shifted value
     */
    shift: {
        value: function () {
            return this.content.shift();
        }
    },

    /**
     * Proxies unshifting content to the underlying collection, accounting for
     * `selectAddedContent`.
     * @method
     * @param ...values
     * @return {boolean} whether the value was added
     */
    unshift: {
        value: function () {
            var result = this.content.unshift.apply(this.content, arguments);
            for (var index = 0; index < arguments.length; index++) {
                this.handleAdd(arguments[index]);
            }
            return result;
        }
    },

    /**
     * Proxies splicing values into the underlying collection.
     * Accounts for * `selectAddedContent`.
     * @method
     * @return the resulting content
     */
    splice: {
        value: function () {
            var result = this.content.splice.apply(this.content, arguments);
            for (var index = 2; index < arguments.length; index++) {
                this.handleAdd(arguments[index]);
            }
            return result;
        }
    },

    /**
     * Proxies swapping values in the underlying collection.
     * Accounts for * `selectAddedContent`
     * @method
     * @param {number} index the position at which to remove values
     * @param {number} minusLength the number of values to remove
     * @param {Array} plus the values to add
     * @return {Array} `minus`, the removed values from the content
     */
    swap: {
        value: function (index, length, values) {
            var result = this.content.swap.apply(this.content, arguments);
            if (values) {
                for (var index = 2; index < values.length; index++) {
                    this.handleAdd(values[index]);
                }
            }
            return result;
        }
    },

    /**
     * Proxies deleting content from the underlying collection.
     * @method
     * @param value
     * @return {boolean} whether the value was found and deleted successfully
     */
    "delete": {
        value: function (value) {
            return this.content["delete"](value);
        }
    },

    /**
     * Does the value exist in the content?
     * @method
     * @param {object} value the value to test for
     * @return {boolean}
     */
    has: {
        value: function(value) {
            if (this.content) {
                return this.content.has(value);
            } else {
                return false;
            }
        }
    },

    /**
     * Proxies adding each value into the underlying collection.
     * @method
     * @param {...object} values
     */
    addEach: {
        value: GenericCollection.prototype.addEach
    },

    /**
     * Proxies deleting each value out from the underlying collection.
     * @method
     * @param {...object} values
     */
    deleteEach: {
        value: GenericCollection.prototype.deleteEach
    },

    /**
     * Proxies clearing the underlying content collection.
     * @method
     */
    clear: {
        value: function () {
            this.content.clear();
        }
    },

    /**
     * Creates content and adds it to the controller and its backing
     * collection.
     * Uses `add` and `contentConstructor`.
     * @method
     * @return the value constructed and added
     */
    addContent: {
        value: function () {
            var content = new this.contentConstructor();
            this.add(content);
            return content;
        }
    },

    _contentConstructor: {
        value: null
    },

    /**
     * Creates a content value for this range controller.
     * If the backing
     * collection has an intrinsict type, uses its `contentConstructor`.
     * Otherwise, creates and returns simple, empty objects.
     *
     * This property can be set to an alternate content constructor, which will
     * take precedence over either of the above defaults.
     *
     * @type {function}
     */
    contentConstructor: {
        get: function () {
            if (this._contentConstructor) {
                return this._contentConstructor;
            } else if (this.content && this.content.contentConstructor) {
                return this.content.contentConstructor;
            } else {
                return Object;
            }
        },
        set: function (contentConstructor) {
            this._contentConstructor = contentConstructor;
        }
    },

    /**
     * Dispatched by range changes to the controller's content, arranged in
     * constructor.
     * Reacts to content changes to ensure that content that no
     * longer exists is removed from the selection, regardless of whether it is
     * from the user or any other entity modifying the backing collection.
     * @private
     */
    handleContentRangeChange: {
        value: function (plus, minus, index) {
            if (this.selection.length > 0) {
                var equals = this.content && this.content.contentEquals || Object.is;
                // remove all values from the selection that were removed (but
                // not added back)
                minus.deleteEach(plus, equals);
                if (this.selection) {
                    this.selection.deleteEach(minus);
                }
            }
        }
    },

    /**
     * Watches changes to the private reflection of the public selection,
     * enforcing the `multiSelect` and `avoidsEmptySelection` invariants.
     * @private
     */
    handleSelectionRangeChange : {
        value: function(plus, minus, index) {
            if (this.selection) {
                if (this.content) {
                    var notInContent = [];
                    for (var i=0;i<plus.length;i++) {
                        if (!this.content.has(plus[i])) {
                            notInContent.push(plus[i]);
                        }
                    }
                    this._selection.deleteEach(notInContent);
                    if (!this.multiSelect && this._selection.length > 1) {
                        var last = this._selection.pop();
                        this._selection.clear();
                        this._selection.add(last);
                    }
                    if (this.avoidsEmptySelection && this._selection.length == 0) {
                        this._selection.add(minus[0]);
                    }
                } else {
                    this._selection.clear();
                }
            }
        }
    },

    /**
     * Dispatched by a range-at-path change listener arranged in constructor.
     * Synchronizes the `iterations` with changes to `organizedContent`.
     * Also manages the `deselectInvisibleContent` invariant.
     * @private
     */
    handleOrganizedContentRangeChange: {
        value: function (plus, minus, index) {
            if (this.deselectInvisibleContent && this.selection) {
                var diff = minus.clone(1);
                diff.deleteEach(plus);
                this.selection.deleteEach(minus);
            }
        }
    },

    /**
     * Dispatched by changes to sortPath, filterPath, and reversed to maintain
     * the `clearSelectionOnOrderChange` invariant.
     * @private
     */
    handleOrderChange: {
        value: function () {
            if (this.clearSelectionOnOrderChange && this.selection) {
                this.selection.clear();
            }
        }
    },

    /**
     * Dispatched manually by all of the managed methods for adding values to
     * the underlying content, like `add` and `push`, to support `multiSelect`.
     * @private
     */
    handleAdd: {
        value: function (value) {
            if (this.selectAddedContent && this.selection) {
                if (
                    !this.multiSelect &&
                    this.selection.length >= 1
                ) {
                    this.selection.clear();
                }
                this.selection.add(value);
            }
        }
    },

    /**
     * Enforces the `multiSelect` invariant when that property becomes true.
     * @private
     */
    handleMultiSelectChange: {
        value: function() {
            if (this.selection) {
                var length = this.selection.length;
                if (!this.multiSelect && length > 1) {
                    var last = this._selection.pop();
                    this._selection.clear();
                    this._selection.add(last);
                }
            }
        }
    }

}, /** @lends RangeController. */ {

    blueprintModuleId:require("./core")._blueprintModuleIdDescriptor,

    blueprint:require("./core")._blueprintDescriptor

});

// TODO @kriskowal scrollIndex, scrollDelegate -> scrollDelegate.scrollBy(offset)

// TODO multiSelectWithModifiers to support ctrl/command/shift selection such
// that individual values and ranges of values.

// TODO @kriskowal decouple such that content controllers can be chained using
// adapter pattern


}})
;
//*/
montageDefine("f73ee10","runtime/animation",{dependencies:["runtime/dependencies/gl-matrix","runtime/base","runtime/transform","runtime/utilities","runtime/dependencies/o3dgc"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice ROBINET.
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


}})
;
//*/
montageDefine("f73ee10","runtime/pass",{dependencies:["runtime/dependencies/gl-matrix","montage","runtime/glTF-node","runtime/node-wrapper","runtime/projection","runtime/camera","runtime/utilities","runtime/webgl-renderer","runtime/transform","runtime/resource-description"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

/*
 a pass has the following 3 key elements
 -> inputs  []  -> scene,viewpoint
 -> program
 -> outputs

 handleDidChange/handleWillChange inputs

 inputs -> program -> ouput (default to framebuffer)

 -> delegate , to give control to another client object
 */

require("runtime/dependencies/gl-matrix");
var Montage = require("montage").Montage;
var glTFNode = require("runtime/glTF-node").glTFNode;
var NodeWrapper = require("runtime/node-wrapper").NodeWrapper;

var Projection = require("runtime/projection").Projection;
var Camera = require("runtime/camera").Camera;
var Utilities = require("runtime/utilities").Utilities;
var WebGLRenderer = require("runtime/webgl-renderer").WebGLRenderer;
var Transform = require("runtime/transform").Transform;
var ResourceDescription = require("runtime/resource-description").ResourceDescription;

var LinkedListNode = Object.create(Object.prototype, {

    _content: { value: null, writable:true},

    content: {
        get: function() {
            return this._content;
        },
        set: function(value) {
            this._content = value;
        }
    },

    _previous: { value: null, writable:true},

    previous: {
        get: function() {
            return this._previous;
        },
        set: function(value) {
            this._previous = value;
        }
    },

    _next: { value: null, writable:true},

    next: {
        get: function() {
            return this._next;
        },
        set: function(value) {
            this._next = value;
        }
    },

    init: {
        value: function(content) {
            this.content = content;
            this.previous = null;
            this.next = null;
        }
    },

    removeFromList: {
        value: function() {
            if (this.previous) {
                this.previous.next = this.next;
            }
            if (this.next) {
                this.next.previous = this.previous;
            }
            this.next = null;
            this.previous = null;
        }
    }

});

var LinkedList = Object.create(Object.prototype, {

    _tail: { value: null, writable:true},

    tail: {
        get: function() {
            return this._tail;
        },
        set: function(value) {
            this._tail = value;
        }
    },

    _head: { value: null, writable:true},

    head: {
        get: function() {
            return this._head;
        },
        set: function(value) {
            this._head = value;
        }
    },

    append: {
        value: function(node) {
            if (!this.head) {
                this.head = node;
            }
            if (this.tail) {
                node.previous = this.tail;
                this.tail.next = node;
            }
            this.tail = node;
        }
    },

    remove: {
        value: function(node) {
            var id = node.content.id;

            var isTail = false,isHead = false;
            if (this.tail === node) {
                isTail = true;
                this.tail = node.previous;
            }

            if (this.head === node) {
                isHead = true;
                this.head = node.next;
            }

            //node.removeFromList();
            /* consistency check
             for (cnode = this.head ; cnode != null ; cnode = cnode.next) {
             if (id === cnode.content.id) {
             console.log("ERROR: inconsistency found isTail:"+isTail+" isHead:"+isHead);
             }
             }
             */
        }
    }

});

//-- Render Target ---

var RenderTarget = exports.RenderTarget = Object.create(Object.prototype, {

    _extras: { value: null, writable:true},

    _width: { value: 0, writable:true},

    _height: { value: 0, writable:true},

    _attachments: { value: null, writable:true},

    attachments: {
        get: function() {
            return this._attachments;
        },
        set: function(value) {
            this._attachments = value;
        }
    },

    init : {
        value: function() {
            this.attachments = [];
            this.extras = {};
            return this;
        }
    },

    width : {
        get: function() {
            return this._width;
        },
        set: function(value) {
            this._width = value;
        }
    },

    height : {
        get: function() {
            return this._height;
        },
        set: function(value) {
            this._height = value;
        }
    },

    extras : {
        get: function() {
            return this._extras;
        },
        set: function(value) {
            this._extras = value;
        }
    }
});

//-- Pass ---

var Pass = Object.create(Object.prototype, {

    _extras: { value: null, writable:true},

    //constants
    PROGRAM: { value: "program", writable: false },
    SCENE: { value: "scene", writable: false },

    _type: { value: null, writable:true},

    type: {
        get: function() {
            return this._type;
        }
    },

    extras : {
        get: function() {
            return this._extras;
        },
        set: function(value) {
            this._extras = value;
        }
    }
});

var ProgramPass = exports.ProgramPass = Montage.create(Pass, {

    _attributes: { value: null, writable: true },
    _uniforms: { value: null, writable: true },
    _states: { value: null, writable: true },
    _program: { value: null, writable: true },

    states: {
        get: function() {
            return this._states;
        },
        set: function(value) {
            this._states = value;
        }
    },

    program: {
        get: function() {
            return this._program;
        },
        set: function(value) {
            this._program = value;
        }
    },

    init: {
        value: function() {
            this.attributes = {};
            this.uniforms = {};
            this.states = {};
            this._type = Pass.PROGRAM;
            this.extras = {};
            return this;
        }
    }

});

var ScenePassRenderer = Object.create(Object.prototype, {

    _nodeWrappers: { value: null, writable: true },

    _pathIDsForNodeID: { value: null, writable: true },

    _primitivesPerPass: { value: null, writable: true },

    _viewPoint: { value: null, writable: true },

    _scene: { value: null, writable: true },

    _observers: { value: null, writable: true},

    _viewPointMatrix: { value: null, writable: true },

    addObserver: {
        value: function(observer) {
            if (this._observers == null) {
                this._observers = [];
            }

            if (this._observers.indexOf(observer) === -1) {
                this._observers.push(observer);
            } else {
                console.log("WARNING attempt to add 2 times the same observer in sceneRenderer")
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
    },

    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            if (this._observers) {
                for (var i = 0 ; i < this._observers.length ; i++) {
                    this._observers[i].viewPointWillChange(this, this._viewPoint, value);
                }
            }

            if (this._viewPoint != value) {
                this._viewPoint = value;
            }

            if (this._observers) {
                for (var i = 0 ; i < this._observers.length ; i++) {
                    this._observers[i].viewPointMatrixDidUpdate(this);
                    this._observers[i].viewPointDidChange(this);
                }
            }
        }
    },

    setupNodeAtPath: {
        value:function(node, pathID) {
            var nodeWrapper = this._nodeWrappers[node.id];
            if (nodeWrapper == null) {
                nodeWrapper = Object.create(NodeWrapper).init(node);
                this._nodeWrappers[node.id] = nodeWrapper;
                nodeWrapper.scenePassRenderer = this;
            }


            if (node.meshes) {
                node.meshes.forEach( function(mesh) {
                    if (mesh.primitives) {
                        //go through all primitives within all meshes
                        //TODO: cache all this
                        mesh.primitives.forEach( function (primitive) {
                            if (primitive.material) {
                                var technique = primitive.material.technique;
                                if (technique) {
                                    if (technique.rootPass) {
                                        var passUniqueID = technique.rootPass.id;
                                        var passWithPrimitives = null;
                                        var i;
                                        for (i = 0 ; i < this._primitivesPerPass.length ; i++) {
                                            if (this._primitivesPerPass[i].pass === passUniqueID) {
                                                passWithPrimitives = this._primitivesPerPass[i];
                                            }
                                        }

                                        if (passWithPrimitives == null) {
                                            passWithPrimitives = this._primitivesPerPass[passUniqueID] = {
                                                "pass" : technique.rootPass,
                                                "primitives" : []
                                            };
                                            this._primitivesPerPass.push(passWithPrimitives);
                                        }

                                        var renderPrimitive = {};
                                        if (mesh.compression)
                                            renderPrimitive.compressed = true;
                                        renderPrimitive["primitive"] = primitive;
                                        renderPrimitive.node = node;
                                        renderPrimitive.nodeWrapper = nodeWrapper;
                                        passWithPrimitives.primitives.push(renderPrimitive);
                                    }
                                }
                            }
                        }, this);
                    }
                }, this);
            }
        }
    },

    sceneWillChange: {
        value: function(prev, scene) {
            this._viewPointMatrix = mat4.identity();
        }
    },

    sceneDidChange: {
        value: function() {
            //prepares all infos
            this._primitivesPerPass = [];
            this._nodeWrappers = {};
            //Assign a view point from available nodes with camera if none
            var self = this;
            if (!this.scene)
                return;
            this.scene.rootNode.apply( function(node, parent, context) {
                self.setupNodeAtPath(node);
                return null;
            } , true, null);
        }
    },


    render: {
        value: function(webGLRenderer, time, options) {
            if (!this.scene || !this.viewPoint)
                return;
            //FIXME: make a pool to avoid these object, they are temporary we don't want to re-create them each time
            if (this.__matrix == null)
                this.__matrix = mat4.create();

            if (this.viewPoint) {
                mat4.set(this.viewPoint.worldMatrix, this.__matrix);
                mat4.inverse(this.__matrix);
                if (mat4.equal(this._viewPointMatrix, this.__matrix) === false) {
                    mat4.set(this.__matrix, this._viewPointMatrix);
                    if (this._observers) {
                        for (var i = 0 ; i < this._observers.length ; i++) {
                            this._observers[i].viewPointMatrixDidUpdate(this);
                        }
                    }
                }
            }
            var idx;
            var picking = options ? ((options.picking === true) && (options.coords != null)) : false;
            if (picking) {
                this.pickingRenderTarget.extras.coords = options.coords;
                webGLRenderer.bindRenderTarget(this.pickingRenderTarget);
            }

            //set projection matrix
            webGLRenderer.projectionMatrix = this.viewPoint.cameras[0].projection.matrix;

            if (this.__nonOpaquePassesWithPrimitives == null) {
                this.__nonOpaquePassesWithPrimitives = [];
            }

            this.__nonOpaquePassesWithPrimitives.length = 0;
            for (idx = 0 ; idx < this._primitivesPerPass.length ; idx++) {
                var passWithPrimitives = this._primitivesPerPass[idx];
                var pass = picking ? this.pickingPass : passWithPrimitives.pass;

                var states = pass.states;
                //we do not check hitTesting for non-opaque elements
                if (states.blendEnable && !picking) {
                    this.__nonOpaquePassesWithPrimitives.push(passWithPrimitives);
                } else {
                    if (picking && this.pickingTechnique) {
                        webGLRenderer.renderPrimitivesWithPass(passWithPrimitives.primitives, pass, this.pickingTechnique.parameters, time, options.pickingMode);
                    } else {
                        webGLRenderer.renderPrimitivesWithPass(passWithPrimitives.primitives, pass, null, time, options.pickingMode);
                    }
                }
            }

            if (!picking) {
                for (idx = 0 ; idx < this.__nonOpaquePassesWithPrimitives.length ; idx++) {
                    var passWithPrimitives = this.__nonOpaquePassesWithPrimitives[idx];
                    webGLRenderer.renderPrimitivesWithPass(passWithPrimitives.primitives, passWithPrimitives.pass, null, time);
                }
            } else {
                webGLRenderer.unbindRenderTarget(this.pickingRenderTarget);

                var pickedPixel = this.pickingRenderTarget.extras.pickedPixel;
                if ((options.pickingMode === "node") && (this.pickingPass.extras.nodeIDToColor != null)) {
                    var selectedNodeID = null;
                    var nodeIDs = Object.keys(this.pickingPass.extras.nodeIDToColor);
                    nodeIDs.forEach( function(nodeID) {
                        var color = this.pickingPass.extras.nodeIDToColor[nodeID];
                        if (Math.abs(Math.round(color[0]*255) - pickedPixel[0]) <= 1 &&
                            Math.abs(Math.round(color[1]*255) - pickedPixel[1]) <= 1 &&
                            Math.abs(Math.round(color[2]*255) - pickedPixel[2]) <= 1)  {
                            selectedNodeID = nodeID;
                        }
                    }, this);
                    if (options.delegate && options.delegate.handleSelectedNode)
                        options.delegate.handleSelectedNode(selectedNodeID);
                }

                if ((options.pickingMode === "material") && (this.pickingPass.extras.materialIDToColor != null)) {
                    var selectedMaterialID = null;
                    var materialIDs = Object.keys(this.pickingPass.extras.materialIDToColor);
                    materialIDs.forEach( function(materialID) {
                        var color = this.pickingPass.extras.materialIDToColor[materialID];
                        if (Math.abs(Math.round(color[0]*255) - pickedPixel[0]) <= 1 &&
                            Math.abs(Math.round(color[1]*255) - pickedPixel[1]) <= 1 &&
                            Math.abs(Math.round(color[2]*255) - pickedPixel[2]) <= 1)  {
                            selectedMaterialID = materialID;
                        }
                    }, this);
                    if (options.delegate && options.delegate.handleSelectedMaterial)
                        options.delegate.handleSelectedMaterial(selectedMaterialID);
                }
            }
        }
    },

    scene: {
        get: function() {
            return this._scene;
        },
        set: function(value) {
            if (this._scene != value) {
                this.sceneWillChange(this._scene, value);
                this._scene = value;
                this.sceneDidChange();
            }
        }
    },

    _pickingPass: { value: null, writable: true },

    pickingPass: {
        get: function() {
            return this._pickingPass;
        },
        set: function(value) {
            this._pickingPass = value;
            this._pickingPass.id = "__PickingPass";
            this._pickingPass.extras.nodeIDToColor = {};
            this._pickingPass.extras.materialIDToColor = {};
        }
    },

    _pickingTechnique: { value: null, writable: true },

    pickingTechnique: {
        get: function() {
            return this._pickingTechnique;
        },
        set: function(value) {
            this._pickingTechnique = value;
            this.pickingPass =this._pickingTechnique.rootPass;
        }
    },

    _pickingRenderTarget: { value: null, writable: true },

    pickingRenderTarget: {
        get: function() {
            return this._pickingRenderTarget;
        },
        set: function(value) {
            this._pickingRenderTarget = value;
        }
    },

    createPickingRenderTargetIfNeeded: {
        value: function() {
            if (!this._pickingRenderTarget) {
                this._pickingRenderTarget = Object.create(RenderTarget).init();
                this._pickingRenderTarget.attachments.push({
                    "semantic" : "COLOR_ATTACHMENT0",
                    "parameter" : "__pickingTexture"
                });
                this._pickingRenderTarget.attachments.push({
                    "semantic" : "DEPTH_ATTACHMENT",
                    "parameter" : "__pickingRenderBuffer"
                });
                this.pickingRenderTarget.extras.picking = true;
            }
            return this._pickingRenderTarget;
        }
    },

    init: {
        value: function() {
            this.pickingRenderTarget = this.createPickingRenderTargetIfNeeded();
            this.pickingRenderTarget.width = 512;
            this.pickingRenderTarget.height = 512;
            this._nodeWrappers = {};
            return this;
        }
    }

});

var ScenePass = exports.ScenePass = Object.create(Pass, {

    _scenePassRenderer: { value: null, writable: true },

    createScenePassRendererIfNeeded: {
        value: function() {
            if (!this._scenePassRenderer) {
                this._scenePassRenderer = Object.create(ScenePassRenderer).init();
            }
        }
    },

    scenePassRenderer: {
        get: function() {
            this.createScenePassRendererIfNeeded();
            return this._scenePassRenderer;
        },
        set: function(value) {
            this.createScenePassRendererIfNeeded();
            if (this._scenePassRenderer != value) {
                this._scenePassRenderer = value;
            }
        }
    },

    viewPoint: {
        get: function() {
            return this.scenePassRenderer ? this.scenePassRenderer.viewPoint : null;
        },
        set: function(viewpoint) {
            if (this.scenePassRenderer) {
                this.scenePassRenderer.viewPoint = viewpoint;
            }
        }
    },

    scene: {
        get: function() {
            return this.scenePassRenderer.scene;
        },
        set: function(value) {
            this.scenePassRenderer.scene = value;
        }
    },

    execute: {
        value: function(webGLRenderer, time, options) {
            //pickingRenderTarget
            this.scenePassRenderer.render(webGLRenderer, time, options);
        }
    },

    init: {
        value: function() {
            this._type = Pass.SCENE;
            this.extras = {};
            return this;
        }
    }

});

/*
 hitTest: {
 value: function(position, viewport, options) {

 if (this.inputs.scene && this.inputs.viewPoint) {
 var results = [];
 var cameraMatrix = mat4.create();
 var viewerMat =  this.inputs.viewPoint.transform;
 var viewer = vec3.createFrom(viewerMat[12],viewerMat[13], viewerMat[14]);
 var self = this;
 mat4.inverse(viewerMat, cameraMatrix);
 var origin = vec3.create();
 var dest = vec3.create();
 var camera = this.inputs.viewPoint.cameras[0];
 var screenSpaceVec1 = [position[0], viewport[3] - position[1],  camera.projection.znear];
 var screenSpaceVec2 = [position[0], viewport[3] - position[1],  camera.projection.zfar];

 var projectionMatrix = camera.projection.matrix;
 vec3.unproject(screenSpaceVec1, cameraMatrix, projectionMatrix, viewport, origin);
 vec3.unproject(screenSpaceVec2, cameraMatrix, projectionMatrix, viewport, dest);

 var X = 0;
 var Y = 1;
 var Z = 2;
 var direction = vec3.create();
 var originTr = vec3.create();
 var directionTr = vec3.create();
 var ctx = mat4.identity();
 this.inputs.scene.rootNode.apply( function(node, parent, parentTransform) {
 var modelMatrix = mat4.create();
 var modelViewMatrix = mat4.create();
 mat4.multiply( parentTransform, node.transform, modelMatrix);
 mat4.multiply( cameraMatrix, modelMatrix, modelViewMatrix);

 if (node.boundingBox) {
 var modelMatrixInv = mat4.create();
 mat4.inverse(modelMatrix, modelMatrixInv);

 mat4.multiplyVec3(modelMatrixInv, origin, originTr);
 mat4.multiplyVec3(modelMatrixInv, dest, directionTr);
 vec3.subtract(directionTr, originTr);
 vec3.normalize(directionTr);

 var bbox = node.boundingBox;
 if (Utilities.intersectsBBOX(bbox, [originTr , directionTr])) {
 var meshes = node.meshes;
 meshes.forEach( function(mesh) {
 var box = mesh.boundingBox;
 if (box) {
 if (Utilities.intersectsBBOX(box, [originTr , directionTr])) {
 Utilities.rayIntersectsMesh([originTr , directionTr], mesh, modelViewMatrix, results, options);
 }
 }
 }, this);
 if (results.length > 0) {
 results.sort( function(a,b) {

 var dist = vec3.create();
 vec3.subtract(a.intersection, viewer, dist);
 var d1 = vec3.dot(dist,dist);
 vec3.subtract(b.intersection, viewer, dist);
 var d2 = vec3.dot(dist,dist);
 return d1 - d2 }
 );
 }
 }
 }
 return modelMatrix;

 }, true, ctx);
 }
 return results;
 }
 },*/

}})
;
//*/
montageDefine("d3f3ee0","url",{dependencies:["punycode","querystring"],factory:function(require,exports,module){/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '~', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(delims),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#']
      .concat(unwise).concat(autoEscape),
    nonAuthChars = ['/', '@', '?', '#'].concat(delims),
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-zA-Z0-9][a-z0-9A-Z_-]{0,62}$/,
    hostnamePartStart = /^([a-zA-Z0-9][a-z0-9A-Z_-]{0,62})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always have a path component.
    pathedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof(url) === 'object' && url.href) return url;

  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var out = {},
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    out.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      out.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    // don't enforce full RFC correctness, just be unstupid about it.

    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the first @ sign, unless some non-auth character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    var atSign = rest.indexOf('@');
    if (atSign !== -1) {
      var auth = rest.slice(0, atSign);

      // there *may be* an auth
      var hasAuth = true;
      for (var i = 0, l = nonAuthChars.length; i < l; i++) {
        if (auth.indexOf(nonAuthChars[i]) !== -1) {
          // not a valid auth.  Something like http://foo.com/bar@baz/
          hasAuth = false;
          break;
        }
      }

      if (hasAuth) {
        // pluck off the auth portion.
        out.auth = decodeURIComponent(auth);
        rest = rest.substr(atSign + 1);
      }
    }

    var firstNonHost = -1;
    for (var i = 0, l = nonHostChars.length; i < l; i++) {
      var index = rest.indexOf(nonHostChars[i]);
      if (index !== -1 &&
          (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
    }

    if (firstNonHost !== -1) {
      out.host = rest.substr(0, firstNonHost);
      rest = rest.substr(firstNonHost);
    } else {
      out.host = rest;
      rest = '';
    }

    // pull out port.
    var p = parseHost(out.host);
    var keys = Object.keys(p);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      out[key] = p[key];
    }

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    out.hostname = out.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = out.hostname[0] === '[' &&
        out.hostname[out.hostname.length - 1] === ']';

    // validate a little.
    if (out.hostname.length > hostnameMaxLen) {
      out.hostname = '';
    } else if (!ipv6Hostname) {
      var hostparts = out.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            out.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    // hostnames are always lower case.
    out.hostname = out.hostname.toLowerCase();

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = out.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      out.hostname = newOut.join('.');
    }

    out.host = (out.hostname || '') +
        ((out.port) ? ':' + out.port : '');
    out.href += out.host;

    // strip [ and ] from the hostname
    if (ipv6Hostname) {
      out.hostname = out.hostname.substr(1, out.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    out.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    out.search = rest.substr(qm);
    out.query = rest.substr(qm + 1);
    if (parseQueryString) {
      out.query = querystring.parse(out.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    out.search = '';
    out.query = {};
  }
  if (rest) out.pathname = rest;
  if (slashedProtocol[proto] &&
      out.hostname && !out.pathname) {
    out.pathname = '/';
  }

  //to support http.request
  if (out.pathname || out.search) {
    out.path = (out.pathname ? out.pathname : '') +
               (out.search ? out.search : '');
  }

  // finally, reconstruct the href based on what has been validated.
  out.href = urlFormat(out);
  return out;
}

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (typeof(obj) === 'string') obj = urlParse(obj);

  var auth = obj.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = obj.protocol || '',
      pathname = obj.pathname || '',
      hash = obj.hash || '',
      host = false,
      query = '';

  if (obj.host !== undefined) {
    host = auth + obj.host;
  } else if (obj.hostname !== undefined) {
    host = auth + (obj.hostname.indexOf(':') === -1 ?
        obj.hostname :
        '[' + obj.hostname + ']');
    if (obj.port) {
      host += ':' + obj.port;
    }
  }

  if (obj.query && typeof obj.query === 'object' &&
      Object.keys(obj.query).length) {
    query = querystring.stringify(obj.query);
  }

  var search = obj.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (obj.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  return protocol + host + pathname + search + hash;
}

function urlResolve(source, relative) {
  return urlFormat(urlResolveObject(source, relative));
}

function urlResolveObject(source, relative) {
  if (!source) return relative;

  source = urlParse(urlFormat(source), false, true);
  relative = urlParse(urlFormat(relative), false, true);

  // hash is always overridden, no matter what.
  source.hash = relative.hash;

  if (relative.href === '') {
    source.href = urlFormat(source);
    return source;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    relative.protocol = source.protocol;
    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[relative.protocol] &&
        relative.hostname && !relative.pathname) {
      relative.path = relative.pathname = '/';
    }
    relative.href = urlFormat(relative);
    return relative;
  }

  if (relative.protocol && relative.protocol !== source.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      relative.href = urlFormat(relative);
      return relative;
    }
    source.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      relative.pathname = relPath.join('/');
    }
    source.pathname = relative.pathname;
    source.search = relative.search;
    source.query = relative.query;
    source.host = relative.host || '';
    source.auth = relative.auth;
    source.hostname = relative.hostname || relative.host;
    source.port = relative.port;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.slashes = source.slashes || relative.slashes;
    source.href = urlFormat(source);
    return source;
  }

  var isSourceAbs = (source.pathname && source.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host !== undefined ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (source.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = source.pathname && source.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = source.protocol &&
          !slashedProtocol[source.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // source.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {

    delete source.hostname;
    delete source.port;
    if (source.host) {
      if (srcPath[0] === '') srcPath[0] = source.host;
      else srcPath.unshift(source.host);
    }
    delete source.host;
    if (relative.protocol) {
      delete relative.hostname;
      delete relative.port;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      delete relative.host;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    source.host = (relative.host || relative.host === '') ?
                      relative.host : source.host;
    source.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : source.hostname;
    source.search = relative.search;
    source.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    source.search = relative.search;
    source.query = relative.query;
  } else if ('search' in relative) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      source.hostname = source.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = source.host && source.host.indexOf('@') > 0 ?
                       source.host.split('@') : false;
      if (authInHost) {
        source.auth = authInHost.shift();
        source.host = source.hostname = authInHost.shift();
      }
    }
    source.search = relative.search;
    source.query = relative.query;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.href = urlFormat(source);
    return source;
  }
  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    delete source.pathname;
    //to support http.request
    if (!source.search) {
      source.path = '/' + source.search;
    } else {
      delete source.path;
    }
    source.href = urlFormat(source);
    return source;
  }
  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (source.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    source.hostname = source.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = source.host && source.host.indexOf('@') > 0 ?
                     source.host.split('@') : false;
    if (authInHost) {
      source.auth = authInHost.shift();
      source.host = source.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (source.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  source.pathname = srcPath.join('/');
  //to support request.http
  if (source.pathname !== undefined || source.search !== undefined) {
    source.path = (source.pathname ? source.pathname : '') +
                  (source.search ? source.search : '');
  }
  source.auth = relative.auth || source.auth;
  source.slashes = source.slashes || relative.slashes;
  source.href = urlFormat(source);
  return source;
}

function parseHost(host) {
  var out = {};
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      out.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}

}());

}})
;
//*/
montageDefine("f73ee10","runtime/glsl-program",{dependencies:["runtime/dependencies/gl-matrix"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

//FIXME: Delete shader if compile failed
//FIXME: Delete program if LINK failed
//FIXME: Validate
//NOTE: those 2 are typically garbage collected and then the gl resource is supposed to be released, but it shouldn't harm to release them as soon as possible without waiting for gc.

require("runtime/dependencies/gl-matrix");

var GLSLProgram = exports.GLSLProgram = Object.create(Object.prototype, {

    VERTEX_SHADER: { value: "x-shader/x-vertex" },
    FRAGMENT_SHADER: { value: "x-shader/x-fragment" },

    _shaders:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    shaders: {
        enumerable: false,
        get: function() {
            return this._shaders;
        },
        set: function(value) {
            this._shaders = value;
        }
    },

    _errorLogs:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    errorLogs: {
        enumerable: false,
        get: function() {
            return this._errorLogs;
        },
        set: function(value) {
            this._errorLogs = value;
        }
    },

    _pendingCommits:
    {
        value: null,
        writable: true
    },

    pendingCommits: {
        get: function() {
            return this._pendingCommits;
        },
        set: function(value) {
            this._pendingCommits = value;
        }
    },

    _symbolToLocation:
    {
        value: null,
        writable: true
    },

    symbolToLocation: {
        enumerable: false,
        get: function() {
            return this._symbolToLocation;
        },
        set: function(value) {
            this._symbolToLocation = value;
        }
    },

    _symbolToActiveInfo:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    symbolToActiveInfo: {
        get: function() {
            return this._symbolToActiveInfo;
        },
        set: function(value) {
            this._symbolToActiveInfo = value;
        }
    },

    _semanticToSymbol: {
        value: null,
        writable: true
    },

    semanticToSymbol: {
        enumerable: false,
        get: function() {
            return this._semanticToSymbol;
        },
        set: function(value) {
            this._semanticToSymbol = value;
        }
    },

    _symbolToSemantic: {
        value: null,
        writable: true
    },

    symbolToSemantic: {
        get: function() {
            return this._symbolToSemantic;
        },
        set: function(value) {
            this._symbolToSemantic = value;
        }
    },

    _symbolToValue:
    {
        value: null,
        writable: true
    },

    symbolToValue: {
        get: function() {
            return this._symbolToValue;
        },
        set: function(value) {
            this._symbolToValue = value;
        }
    },

    _uniformSymbols:
    {
        value: null,
        writable: true
    },

    uniformSymbols: {
        enumerable: false,
        get: function() {
            return this._uniformSymbols;
        },
        set: function(value) {
            this._uniformSymbols = value;
        }
    },

    _attributeSymbols:
    {
        value: null,
        writable: true
    },

    attributeSymbols: {
        enumerable: false,
        get: function() {
            return this._attributeSymbols;
        },
        set: function(value) {
            this._attributeSymbols = value;
        }
    },


    _GLProgram:
    {
        enumerable: false,
        value: null,
        writable: true
    },

    //API
    GLProgram: {
        enumerable: false,
        get: function() {
            return this._GLProgram;
        },
        set: function(value) {
            this._GLProgram = value;
        }
    },

    getTypeForSymbol: {
        value: function(symbol) {
            var type = null;
            var activeInfo = this.symbolToActiveInfo[symbol];
            if (activeInfo) {
                type = activeInfo.type;
            }
            return type;
        }
    },

    getLocationForSymbol: {
        value: function(symbol) {
            return this.symbolToLocation[symbol];
        }
    },


    getSymbolForSemantic: {
        value: function(semantic) {
            return this.semanticToSymbol[semantic];
        }
    },

    //FIXME: argument order should be reversed
    setSymbolForSemantic: {
        value: function(symbol,semantic)  {
            if (symbol === "none")
                symbol = null;
            if (semantic === "none")
                semantic = null;

            if (!this.symbolToActiveInfo[symbol]) {
                return false;
            }

            //if the semantic is already taken bail out.
            if (semantic) {
                if (this.semanticToSymbol[semantic]) {
                    return false;
                }
            }

            if (symbol) {
                var previousSemantic = this.symbolToSemantic[symbol];
                if ((previousSemantic) && (previousSemantic !== semantic)) {
                    this.semanticToSymbol[previousSemantic] = null;
                }

                this.symbolToSemantic[symbol] = semantic;
            }

            if (semantic) {
                this.semanticToSymbol[semantic] = symbol;
            }

            return true;
        }
    },

    setSemanticForSymbol: {
        value: function(symbol,semantic)  {
            this.setSymbolForSemantic(symbol,semantic);
        }
    },

    getSemanticForSymbol: {
        value: function(symbol) {
            return this.symbolToSemantic[symbol];
        }
    },

    setValueForSymbol: {
        value: function(symbol,value)  {
            var existingValue = this.symbolToValue[symbol];
            var type = this.getTypeForSymbol(symbol);
            var GL = WebGLRenderingContext;

            if (( value != null) && (existingValue != null)) {
                if (type === GL.FLOAT) {
                    if (value === existingValue) {
                        return;
                    }
                } else if (type === GL.FLOAT_MAT4) {
                    if (value.length == 16) {
                        if (mat4.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_MAT3) {
                    if (value.length == 9) {
                        if (mat3.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_VEC3) {
                    if (value.length == 3) {
                        if (vec3.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_VEC4) {
                    if (value.length == 4) {
                        if (vec4.equal(existingValue, value)) {
                            return;
                        }
                    }
                } else if (type === GL.FLOAT_VEC2) {
                    if (value.length == 2) {
                        if (vec4.equal(existingValue, value)) {
                            return;
                        }
                    }
                }

            } else {
                if (type === GL.FLOAT_MAT4) {
                    if (value.length === 16) {
                        existingValue = mat4.create();
                    }
                } else if (type === GL.FLOAT_MAT3) {
                    existingValue = mat3.create();
                } else if (type === GL.FLOAT_VEC3) {
                    existingValue = vec3.create();
                } else if (type === GL.FLOAT_VEC4) {
                    existingValue = vec4.create();
                } else if (type === GL.FLOAT_VEC2) {
                    existingValue = vec2.create();
                }
            }

            if (this.symbolToActiveInfo[symbol] !== null) {
                if (this.pendingCommits.indexOf(symbol) === -1) {
                    this.pendingCommits.push(symbol);
                }
            }

            if (value != null) {
                if (type === GL.FLOAT_MAT4) {
                    if (value.length === 16) {
                        value = mat4.set(value ,existingValue);
                    }
                } else if (type === GL.FLOAT_MAT3) {
                    value = mat3.set(value, existingValue);
                } else if (type === GL.FLOAT_VEC3) {
                    value = vec3.set(value, existingValue);
                } else if (type === GL.FLOAT_VEC4) {
                    value = vec4.set(value, existingValue);
                } else if (type === GL.FLOAT_VEC2) {
                    value = vec2.set(value, existingValue);
                }
            }

            this.symbolToValue[symbol] = value;
        }
    },

    getValueForSymbol: {
        value: function(symbol) {
            return this.symbolToValue[symbol];
        }
    },

    _commitSwitch: {
        value: (function () {
            var theSwitch = [];
            theSwitch[WebGLRenderingContext.FLOAT_MAT2] = function uniformMatrix2fv(GL, location , count, value) {
                GL.uniformMatrix2fv(location , count, value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_MAT3] = function uniformMatrix3fv(GL, location , count, value) {
                GL.uniformMatrix3fv(location , count, value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_MAT4] = function uniformMatrix4fv(GL, location , count, value) {
                GL.uniformMatrix4fv(location , count, value);
            };
            theSwitch[WebGLRenderingContext.FLOAT] = function uniform1f(GL, location , count, value) {
                GL.uniform1f(location,value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_VEC2] = function uniform2fv(GL, location , count, value) {
                GL.uniform2fv(location,value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_VEC3] = function uniform3fv(GL, location , count, value) {
                GL.uniform3fv(location,value);
            };
            theSwitch[WebGLRenderingContext.FLOAT_VEC4] = function uniform4fv(GL, location , count, value) {
                GL.uniform4fv(location,value);
            };
            theSwitch[WebGLRenderingContext.INT] = function uniform1i(GL, location , count, value) {
                GL.uniform1i(location, value);
            };
            theSwitch[WebGLRenderingContext.SAMPLER_2D] = function uniform1i(GL, location , count, value) {
                GL.uniform1i(location, value);
            };
            theSwitch[WebGLRenderingContext.SAMPLER_CUBE] = function uniform1i(GL, location , count, value) {
                GL.uniform1i(location, value);
            };

            return theSwitch;
        })()
    },

    //that should be private
    commit: {
        value: function(GL) {
            if (this.pendingCommits.length) {
                var i = this.pendingCommits.length-1, symbol;
                while (symbol = this.pendingCommits[i--]) {
                    this._commitSwitch[this.getTypeForSymbol(symbol)](
                        GL,
                        this.symbolToLocation[symbol],
                        false,
                        this.getValueForSymbol(symbol));
                }
                this.pendingCommits.length = 0;
            }
        }
    },

    use: {
        value: function(GL, commitValues) {
            GL.useProgram(this.GLProgram);
            if (commitValues) {
                this.commit(GL);
            }
        }
    },

    //that should be private
    createShaderWithSourceAndType: {
        value: function createShaderWithSourceAndType(GL,shaderSource,shaderType) {
            var shader;
            if (shaderType === "x-shader/x-fragment") {
                shader = GL.createShader(GL.FRAGMENT_SHADER);
            } else if (shaderType === "x-shader/x-vertex") {
                shader = GL.createShader(GL.VERTEX_SHADER);
            } else {
                return null;
            }

            GL.shaderSource(shader, shaderSource);
            GL.compileShader(shader);

            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                this.errorLogs = GL.getShaderInfoLog(shader);
                return null;
            }

            return shader;
        }
    },

    build: {
        value: function(GL) {
            var i;
            var vertexShaderSource = this.shaders[GLSLProgram.VERTEX_SHADER];
            var fragmentShaderSource = this.shaders[GLSLProgram.FRAGMENT_SHADER];
            var buildSuccess = false;
            var activeInfo;

            var vertexShader = this.createShaderWithSourceAndType(GL,vertexShaderSource,GLSLProgram.VERTEX_SHADER);
            if (vertexShader == null)
                return false;

            var fragmentShader = this.createShaderWithSourceAndType(GL,fragmentShaderSource,GLSLProgram.FRAGMENT_SHADER);
            if (fragmentShader == null)
                return false;

            this.GLProgram = GL.createProgram();

            GL.attachShader(this.GLProgram, vertexShader);
            GL.attachShader(this.GLProgram, fragmentShader);

            GL.linkProgram(this.GLProgram);
            if (GL.getProgramParameter(this.GLProgram, GL.LINK_STATUS)) {

                this.pendingCommits = [];
                this.symbolToActiveInfo = {};
                this.symbolToValue = {};
                this.symbolToLocation = {};
                this.uniformSymbols = [];
                this.attributeSymbols = [];
                this.symbolToSemantic = {};
                this.semanticToSymbol = {};

                var currentProgram = GL.getParameter( GL.CURRENT_PROGRAM );
                GL.useProgram(this.GLProgram);

                var uniformsCount = GL.getProgramParameter(this.GLProgram,GL.ACTIVE_UNIFORMS);
                for (i = 0 ; i < uniformsCount ; i++) {
                    activeInfo = GL.getActiveUniform(this.GLProgram, i);

                    var name = activeInfo.name;
                    //when an array is retrieve, the symbol we got comes as symbol[0] which is surprising...
                    var arrayIndex = name.indexOf("[0]");
                    if (arrayIndex != -1) {
                        name = name.substring(0,arrayIndex);
                    }

                    this.symbolToActiveInfo[name] = activeInfo;
                    this.symbolToLocation[name] = GL.getUniformLocation(this.GLProgram,name);
                    this.uniformSymbols.push(name);
                }

                var attributesCount = GL.getProgramParameter(this.GLProgram,GL.ACTIVE_ATTRIBUTES);
                for (i = 0 ; i < attributesCount ; i++) {
                    activeInfo = GL.getActiveAttrib(this.GLProgram, i);
                    this.symbolToActiveInfo[activeInfo.name] = activeInfo;
                    this.symbolToLocation[activeInfo.name] = GL.getAttribLocation(this.GLProgram,activeInfo.name);
                    this.attributeSymbols.push(activeInfo.name);
                }

                buildSuccess = true;
                GL.useProgram(currentProgram);
            }
            this.errorLogs = GL.getProgramInfoLog(this.GLProgram);

            return buildSuccess;
        }
    },

    initWithShaders: {
        value: function(shaders) {
            this.shaders = shaders;
        }
    },

    initWithProgram: {
        value: function(program) {
            this.shaders = program.shaders;
            this.semanticToSymbol = program.semanticToSymbol;
            this.symbolToSemantic = program.symbolToSemantic;
        }
    }

});


}})
;
//*/
montageDefine("f73ee10","runtime/utilities",{dependencies:["runtime/dependencies/gl-matrix"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

}})
;
//*/
montageDefine("7fd8be3","composer/press-composer",{dependencies:["../core/core","./composer","../core/event/mutable-event"],factory:function(require,exports,module){/*global require, exports*/
/**
	@module montage/composer/press-composer
    @requires montage
    @requires montage/composer/composer
    @requires montage/core/event/mutable-event
*/
var Montage = require("../core/core").Montage,
    Composer = require("./composer").Composer,
    MutableEvent = require("../core/event/mutable-event").MutableEvent;

/**
 * @class PressComposer
 * @classdesc The `PressComposer` abstracts away handling mouse and touch
 * events that represent presses, allowing generic detection of presses, long
 * presses, and cancelled presses.
 * @extends Composer
 * @fires pressStart
 * @fires press
 * @fires longPress
 * @fires pressCancel
 */
var PressComposer = exports.PressComposer = Composer.specialize(/** @lends PressComposer# */ {

    /**
     * Dispatched when a press begins. It is ended by either a {@link press} or
     * {@link pressCancel} event.
     *
     * @event pressStart
     * @memberof PressComposer
     * @param {PressEvent} event
     */

    /**
     * Dispatched when a press is complete.
     *
     * @event press
     * @memberof PressComposer
     * @param {PressEvent} event
     */

    /**
     * Dispatched when a press lasts for longer than (@link longPressThreshold}
     * On a long press, the sequence of events will be:
     * - pressStart: as soon as the composer recognizes it is a press.
     * - longPress: `longPressThreshold` after the pressStart, if the press has
     *   not yet ended.
     * - press: when the press ends, if it isn't cancelled.
     *
     * Handlers of the `longPress` event can call `cancelPress` to prevent
     * `press` being triggered.
     *
     * @event longPress
     * @memberof PressComposer
     * @param {PressEvent} event
     */

    /**
     * Dispatched when a press is canceled. This could be because the pointer
     * left the element, was claimed by another component or maybe a phone call
     * came in.
     *
     * @event pressCancel
     * @memberof PressComposer
     * @param {PressEvent} event
     */

    // Load/unload

    load: {
        value: function() {
            if (window.Touch) {
                this._element.addEventListener("touchstart", this, true);
            } else {
                this._element.addEventListener("mousedown", this, true);
            }
        }
    },

    unload: {
        value: function() {
            if (window.Touch) {
                this._element.removeEventListener("touchstart", this, true);
            } else {
                this._element.removeEventListener("mousedown", this, true);
            }
        }
    },

    /**
     * Delegate that implements `surrenderPointer`. See Component for
     * explanation of what this method should do.
     *
     * @type {Object}
     * @default null
     */
    delegate: {
        value: null
    },


    /**
     * Cancel the current press.
     *
     * Can be used in a "longPress" event handler to prevent the "press" event
     * being fired.
     * @returns boolean true if a press was canceled, false if the composer was
     * already in a unpressed or canceled state.
     */
    cancelPress: {
        value: function() {
            if (this._state === PressComposer.PRESSED) {
                this._dispatchPressCancel();
                this._endInteraction();
                return true;
            }
            return false;
        }
    },

    // Optimisation so that we don't set a timeout if we do not need to
    addEventListener: {
        value: function(type, listener, useCapture) {
            Composer.addEventListener.call(this, type, listener, useCapture);
            if (type === "longPress") {
                this._shouldDispatchLongPress = true;
            }
        }
    },

    UNPRESSED: {
        value: 0
    },
    PRESSED: {
        value: 1
    },
    CANCELLED: {
        value: 2
    },

    _state: {
        enumerable: false,
        value: 0
    },
    state: {
        get: function() {
            return this._state;
        }
    },

    _shouldDispatchLongPress: {
        enumerable: false,
        value: false
    },

    _longPressThreshold: {
        enumerable: false,
        value: 1000
    },
    /**
     * How long a press has to last (in milliseconds) for a longPress event to
     * be dispatched
     * @type number
     */
    longPressThreshold: {
        get: function() {
            return this._longPressThreshold;
        },
        set: function(value) {
            if (this._longPressThreshold !== value) {
                this._longPressThreshold = value;
            }
        }
    },

    _longPressTimeout: {
        enumberable: false,
        value: null
    },

    // Magic

    _observedPointer: {
        enumerable: false,
        value: null
    },

    // TODO: maybe this should be split and moved into handleTouchstart
    // and handleMousedown
    _startInteraction: {
        enumerable: false,
        value: function(event) {
            if (
                ("enabled" in this.component && !this.component.enabled) ||
                this._observedPointer !== null
            ) {
                return false;
            }

            var i = 0, changedTouchCount;

            if (event.type === "touchstart") {

                changedTouchCount = event.changedTouches.length;
                if (changedTouchCount === 1) {
                    this._observedPointer = event.changedTouches[0].identifier;
                }

                document.addEventListener("touchend", this, false);
                document.addEventListener("touchcancel", this, false);
            } else if (event.type === "mousedown") {
                this._observedPointer = "mouse";
                // Needed to cancel the press if mouseup'd when not on the
                // component
                document.addEventListener("mouseup", this, false);
                // Needed to preventDefault if another component has claimed
                // the pointer
                document.addEventListener("click", this, false);
            }

            // Needed to cancel the press because once a drag is started
            // no mouse events are fired
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#initiate-the-drag-and-drop-operation
            this._element.addEventListener("dragstart", this, false);

            this.component.eventManager.claimPointer(this._observedPointer, this);

            this._dispatchPressStart(event);
        }
    },

    /**
     * Decides what should be done based on an interaction.
     *
     * @param {Event} event The event that caused this to be called.
     * @private
     */
    _interpretInteraction: {
        value: function(event) {
            // TODO maybe the code should be moved out to handleClick and
            // handleMouseup
            var isSurrendered, target, isTarget;

            if (this._observedPointer === null) {
                this._endInteraction(event);
                return;
            }

            isSurrendered = !this.component.eventManager.isPointerClaimedByComponent(this._observedPointer, this);
            target = event.target;
            while (target !== this._element && target && target.parentNode) {
                target = target.parentNode;
            }
            isTarget = target === this._element;

            if (isSurrendered && event.type === "click") {
                // Pointer surrendered, so prevent the default action
                event.preventDefault();
                // No need to dispatch an event as pressCancel was dispatched
                // in surrenderPointer, just end the interaction.
                this._endInteraction(event);
                return;
            } else if (event.type === "mouseup") {

                if (!isSurrendered && isTarget) {
                    this._dispatchPress(event);
                    this._endInteraction(event);
                    return;
                } else if (!isSurrendered && !isTarget) {
                    this._dispatchPressCancel(event);
                    this._endInteraction(event);
                    return;
                } else {
                    this._endInteraction(event);
                }
            }
        }
    },

    /**
     * Remove event listeners after an interaction has finished.
     * @private
     */
    _endInteraction: {
        value: function(event) {
            document.removeEventListener("touchend", this);
            document.removeEventListener("touchcancel", this);
            document.removeEventListener("click", this);
            document.removeEventListener("mouseup", this);

            if (this.component.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                this.component.eventManager.forfeitPointer(this._observedPointer, this);
            }
            this._observedPointer = null;
            this._state = PressComposer.UNPRESSED;
        }
    },

    /**
     * Checks if we are observing one of the changed touches. Returns the index
     * of the changed touch if one matches, otherwise returns false. Make sure
     * to check against `!== false` or `=== false` as the
     * matching index might be 0.
     *
     * @method
     * @returns {number|boolean} The index of the matching touch, or false
     * @private
     */
    _changedTouchisObserved: {
        value: function(changedTouches) {
            if (this._observedPointer === null) {
                return false;
            }

            var i = 0, changedTouchCount = changedTouches.length;

            for (; i < changedTouchCount; i++) {
                if (changedTouches[i].identifier === this._observedPointer) {
                    return i;
                }
            }
            return false;
        }
    },

    // Surrender pointer

    surrenderPointer: {
        value: function(pointer, component) {
            var shouldSurrender = this.callDelegateMethod("surrenderPointer", pointer, component);
            if (typeof shouldSurrender !== "undefined" && shouldSurrender === false) {
                return false;
            }

            this._dispatchPressCancel();
            return true;
        }
    },

    // Handlers

    captureTouchstart: {
        value: function(event) {
            this._startInteraction(event);
        }
    },
    handleTouchend: {
        value: function(event) {
            if (this._observedPointer === null) {
                this._endInteraction(event);
                return;
            }

            if (this._changedTouchisObserved(event.changedTouches) !== false) {
                if (this.component.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                    this._dispatchPress(event);
                } else {
                    event.preventDefault();
                }
                this._endInteraction(event);
            }
        }
    },
    handleTouchcancel: {
        value: function(event) {
            if (this._observedPointer === null || this._changedTouchisObserved(event.changedTouches) !== false) {
                if (this.component.eventManager.isPointerClaimedByComponent(this._observedPointer, this)) {
                    this._dispatchPressCancel(event);
                }
                this._endInteraction(event);
            }
        }
    },

    captureMousedown: {
        value: function(event) {
            this._startInteraction(event);
        }
    },
    handleClick: {
        value: function(event) {
            this._interpretInteraction(event);
        }
    },
    handleMouseup: {
        value: function(event) {
            this._interpretInteraction(event);
        }
    },
    handleDragstart: {
        value: function(event) {
            this._dispatchPressCancel(event);
            this._endInteraction();
        }
    },

    // Event dispatch

    _createPressEvent: {
        enumerable: false,
        value: function(name, event) {
            var pressEvent, detail, index;

            if (!event) {
                event = document.createEvent("CustomEvent");
                event.initCustomEvent(name, true, true, null);
            }

            pressEvent = new PressEvent();
            pressEvent.event = event;
            pressEvent.type = name;
            pressEvent.pointer = this._observedPointer;
            pressEvent.targetElement = event.target;

            if (event.changedTouches &&
                (index = this._changedTouchisObserved(event.changedTouches)) !== false
            ) {
                pressEvent.touch = event.changedTouches[index];
            }

            return pressEvent;
        }
    },

    _dispatchPressStart: {
        enumerable: false,
        value: function (event) {
            this._state = PressComposer.PRESSED;
            this.dispatchEvent(this._createPressEvent("pressStart", event));

            if (this._shouldDispatchLongPress) {
                var self = this;
                this._longPressTimeout = setTimeout(function () {
                    self._dispatchLongPress();
                }, this._longPressThreshold);
            }
        }
    },

    _dispatchPress: {
        enumerable: false,
        value: function (event) {
            if (this._shouldDispatchLongPress) {
                clearTimeout(this._longPressTimeout);
                this._longPressTimeout = null;
            }

            this.dispatchEvent(this._createPressEvent("press", event));
            this._state = PressComposer.UNPRESSED;
        }
    },

    _dispatchLongPress: {
        enumerable: false,
        value: function (event) {
            if (this._shouldDispatchLongPress) {
                this.dispatchEvent(this._createPressEvent("longPress", event));
                this._longPressTimeout = null;
            }
        }
    },

    _dispatchPressCancel: {
        enumerable: false,
        value: function (event) {
            if (this._shouldDispatchLongPress) {
                clearTimeout(this._longPressTimeout);
                this._longPressTimeout = null;
            }

            this._state = PressComposer.CANCELLED;
            this.dispatchEvent(this._createPressEvent("pressCancel", event));
        }
    }

});

/*
 * @class PressEvent
 * @inherits MutableEvent
 * @classdesc The event dispatched by the `PressComposer`, providing access to
 * the raw DOM event and proxying its properties.
 */
var PressEvent = (function(){
    var value, eventProps, typeProps, eventPropDescriptor, typePropDescriptor, i;

    value = MutableEvent.specialize({
        type: {
            value: "press"
        },
        _event: {
            enumerable: false,
            value: null
        },
        event: {
            get: function() {
                return this._event;
            },
            set: function(value) {
                this._event = value;
            }
        },
        _touch: {
            enumerable: false,
            value: null
        },
        touch: {
            get: function() {
                return this._touch;
            },
            set: function(value) {
                this._touch = value;
            }
        }
    });

    // These properties are available directly on the event
    eventProps = ["altKey", "ctrlKey", "metaKey", "shiftKey",
    "cancelBubble", "currentTarget", "defaultPrevented",
    "eventPhase", "timeStamp", "preventDefault",
    "stopImmediatePropagation", "stopPropagation"];
    // These properties are available on the event in the case of mouse, and
    // on the _touch in the case of touch
    typeProps = ["clientX", "clientY", "pageX", "pageY", "screenX", "screenY", "target"];

    eventPropDescriptor = function(prop) {
        return {
            get: function() {
                return this._event[prop];
            }
        };
    };
    typePropDescriptor = function(prop) {
        return {
            get: function() {
                return (this._touch) ? this._touch[prop] : this._event[prop];
            }
        };
    };

    for (i = eventProps.length - 1; i >= 0; i--) {
        Montage.defineProperty(value, eventProps[i], eventPropDescriptor(eventProps[i]));
    }
    for (i = typeProps.length - 1; i >= 0; i--) {
        Montage.defineProperty(value, typeProps[i], typePropDescriptor(typeProps[i]));
    }

    return value;
}());

}})
;
//*/
montageDefine("f73ee10","runtime/scene-renderer",{dependencies:["runtime/dependencies/gl-matrix","runtime/technique","runtime/pass","runtime/builtin-assets","runtime/dependencies/o3dgc"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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
var Technique = require("runtime/technique").Technique;
var ScenePass = require("runtime/pass").ScenePass;
var BuiltInAssets = require("runtime/builtin-assets").BuiltInAssets;
var o3dgc = require("runtime/dependencies/o3dgc").o3dgc;

exports.SceneRenderer = Object.create(Object.prototype, {

    loadPickingTechnique: {
        value: function() {
            var self = this;
            var techniquePromise = BuiltInAssets.assetWithName( "pickingTechnique");

            techniquePromise.then(function (asset) {
                self.technique.rootPass.scenePassRenderer.pickingTechnique = asset;
            }, function (error) {
            }, function (progress) {
            });
        }
    },

    createTechniqueIfNeeded: {
        value: function() {
            if (!this._technique) {
                this._technique = Object.create(Technique).init();
                var pass = Object.create(ScenePass).init();
                //there is just one pass, so passName will be automatically set to "defaultPass"
                this._technique.passes = { "defaultPass": pass };
            }
        }
    },

    _webGLRenderer: { value: null, writable: true },

    _technique: { value: null, writable: true },

    technique: {
        get: function() {
            return this._technique;
        },
        set: function(value) {
            this._technique = value;
        }
    },


    compressedMeshDelegate: {
        value: {
            str2ab: function(str) {
                  var buf = new ArrayBuffer(str.length);
                  var bufView = new Uint8Array(buf);
                  for (var i=0, strLen=str.length; i<strLen; i++) {
                      bufView[i] = str.charCodeAt(i);
                  }
                  return buf;
              },

            decode: function (arrayBuffer, isAscii) {
                    if (arrayBuffer) {
                        function str2ab(str) {
                        }
                        if (isAscii) {
                            var bstream = new o3dgc.BinaryStream(this.str2ab(arrayBuffer));
                        } else {
                            var bstream = new o3dgc.BinaryStream(arrayBuffer);
                        }
                        var decoder = new o3dgc.SC3DMCDecoder();
                        var timer = new o3dgc.Timer();
                        var ifs = new o3dgc.IndexedFaceSet();
                        timer.Tic();
                        decoder.DecodeHeader(ifs, bstream);
                        timer.Toc();
                        console.log("DecodeHeader time (ms) " + timer.GetElapsedTime());
                        // allocate memory
                        var byteSize =
                            3 * 4 * ifs.GetNCoord() +
                            3 * 4 * ifs.GetNNormal();
                        var buffer = new ArrayBuffer(byteSize);
                        var bufferIndices = new ArrayBuffer(3 * 2 * ifs.GetNCoordIndex());

                        var shift = 0;
                        if (ifs.GetNCoordIndex() > 0) {
                            ifs.SetCoordIndex(new Uint16Array(bufferIndices, 0, 3 * ifs.GetNCoordIndex()));
                        }
                        if (ifs.GetNCoord() > 0) {
                            ifs.SetCoord(new Float32Array(buffer, shift, 3 * ifs.GetNCoord()));
                            shift += 12 * ifs.GetNCoord();
                        }
                        if (ifs.GetNNormal() > 0) {
                            ifs.SetNormal(new Float32Array(buffer, shift, 3 * ifs.GetNNormal()));
                            shift += 12 * ifs.GetNNormal();
                        }

                        var numNumFloatAttributes = ifs.GetNumFloatAttributes();
                        for (var a = 0; a < numNumFloatAttributes; ++a){
                            if (ifs.GetNFloatAttribute(a) > 0) {
                                ifs.SetFloatAttribute(a, new Float32Array(ifs.GetFloatAttributeDim(a) * ifs.GetNFloatAttribute(a)));
                            }
                        }
                        /*
                        console.log("Mesh info ");
                        console.log("\t# coords    " + ifs.GetNCoord());
                        console.log("\t# normals   " + ifs.GetNNormal());
                        console.log("\t# texcoords " + ifs.GetNTexCoord());
                        console.log("\t# triangles " + ifs.GetNCoordIndex());
                        */
                        // decode mesh
                        timer.Tic();
                        decoder.DecodePlayload(ifs, bstream);
                        timer.Toc();
                        /*
                        var size = arrayBuffer.byteLength;
                        console.log("DecodePlayload time " + timer.GetElapsedTime() + " ms, " + size + " bytes (" + (8.0 * size / ifs.GetNCoord()) + " bpv)");
                        console.log("Details");
                        var stats = decoder.GetStats();
                        console.log("\t CoordIndex         " + stats.m_timeCoordIndex + " ms, " + stats.m_streamSizeCoordIndex + " bytes (" + (8.0 * stats.m_streamSizeCoordIndex / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Coord              " + stats.m_timeCoord + " ms, " + stats.m_streamSizeCoord + " bytes (" + (8.0 * stats.m_streamSizeCoord / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Normal             " + stats.m_timeNormal + " ms, " + stats.m_streamSizeNormal + " bytes (" + (8.0 * stats.m_streamSizeNormal / ifs.GetNCoord()) + " bpv)");
                        console.log("\t TexCoord           " + stats.m_timeTexCoord + " ms, " + stats.m_streamSizeTexCoord + " bytes (" + (8.0 * stats.m_streamSizeTexCoord / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Color              " + stats.m_timeColor + " ms, " + stats.m_streamSizeColor + " bytes (" + (8.0 * stats.m_streamSizeColor / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Float Attributes   " + stats.m_timeFloatAttribute + " ms, " + stats.m_streamSizeFloatAttribute + " bytes (" + (8.0 * stats.m_streamSizeFloatAttribute / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Integer Attributes " + stats.m_timeFloatAttribute + " ms, " + stats.m_streamSizeFloatAttribute + " bytes (" + (8.0 * stats.m_streamSizeFloatAttribute / ifs.GetNCoord()) + " bpv)");
                        console.log("\t Reorder            " + stats.m_timeReorder + " ms,  " + 0 + " bytes (" + 0.0 + " bpv)");
                        //SaveOBJ(ifs, fileName);
                        */
                        return ifs;
                    }
            },


            handleError: function(errorCode, info) {
                console.log("ERROR:vertexAttributeBufferDelegate:"+errorCode+" :"+info);
            },

            decompressAttribsInner_: function(str, inputStart, inputEnd,
                                             output, outputStart, stride,
                                             decodeOffset, decodeScale) {
                var prev = 0;
                for (var j = inputStart; j < inputEnd; j++) {
                    var code = str.charCodeAt(j);
                    prev += (code >> 1) ^ (-(code & 1));
                    output[outputStart] = decodeScale * (prev + decodeOffset);
                    outputStart += stride;
                }
            },

            decompressIndices_: function(str, inputStart, numIndices,
                                         output, outputStart) {
                var highest = 0;
                for (var i = 0; i < numIndices; i++) {
                    var code = str.charCodeAt(inputStart++);
                    output[outputStart++] = highest - code;
                    if (code == 0) {
                        highest++;
                    }
                }
            },

            decompressMesh: function(str, meshParams, decodeParams, callback)  {
                // Extract conversion parameters from attribArrays.
                var stride = decodeParams.decodeScales.length;
                var decodeOffsets = decodeParams.decodeOffsets;
                var decodeScales = decodeParams.decodeScales;
                var attribStart = meshParams.attribRange[0];
                var numVerts = meshParams.attribRange[1];

                // Decode attributes.
                var inputOffset = attribStart;
                var attribsOut = new Float32Array(stride * numVerts);
                for (var j = 0; j < stride; j++) {
                    var end = inputOffset + numVerts;
                    var decodeScale = decodeScales[j];
                    if (decodeScale) {
                        // Assume if decodeScale is never set, simply ignore the
                        // attribute.
                        this.decompressAttribsInner_(str, inputOffset, end,
                            attribsOut, j, stride,
                            decodeOffsets[j], decodeScale);
                    }
                    inputOffset = end;
                }

                var indexStart = meshParams.indexRange[0];
                var numIndices = 3*meshParams.indexRange[1];
                var indicesOut = new Uint16Array(numIndices);
                this.decompressIndices_(str, inputOffset, numIndices, indicesOut, 0);

                // Decode bboxen.
                /*
                var bboxen = undefined;
                var bboxOffset = meshParams.bboxes;
                if (bboxOffset) {
                    bboxen = decompressAABBs_(str, bboxOffset, meshParams.names.length,
                        decodeOffsets, decodeScales);
                }
                */
                callback(attribsOut, indicesOut, null, meshParams);
            },


            convert: function (source, resource, ctx) {
                var compression = ctx.mesh.compression;
                if (compression.type == "won-compression") {
                    var indexRange = compression.indexRange;
                    if (indexRange) {
                        var meshEnd = indexRange[0] + 3 * indexRange[1];
                        var callback = null;
                        this.decompressMesh(resource, compression, compression,
                            function(attribsOut, indicesOut, bboxen, meshParams) {
                                ctx.renderer.setupCompressedMesh(ctx.mesh, attribsOut, indicesOut);
                            });
                    }
                } else {
                    var vertexCount = 0;
                    var mesh = ctx.mesh;
                    if (compression.compressedData) {
                        var compressedData = compression.compressedData;
                        vertexCount = compressedData.verticesCount;
                        var ifs = this.decode(resource, compressedData.mode === "ascii");
                        var indicesShort = ifs.GetCoordIndex();
                        var positions = ifs.GetCoord();
                        var normals = ifs.GetNNormal() > 0 ? ifs.GetNormal() : null;
                        ctx.renderer.setupCompressedMesh2(ctx.mesh, vertexCount, positions, normals, ifs, compressedData.floatAttributesIndexes, indicesShort);
                    }
                }

                return resource;
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    scene: {
        get: function() {
            return this.technique.rootPass.scene;
        },
        set: function(value) {
            var self = this;
            var scene = this.technique.rootPass.scene;
            if (scene != value) {
                this.technique.rootPass.scene = value;

                this.scene.rootNode.apply( function(node, parent, context) {
                    if (node.meshes) {
                        node.meshes.forEach(function (mesh) {
                            if (mesh.compression) {
                                var requestType = "text";
                                if (mesh.compression.compressedData.mode) {
                                    if (mesh.compression.compressedData.mode == "binary") {
                                        requestType = "arraybuffer";
                                    }
                                }

                                mesh.compression.compressedData.requestType = requestType;

                                self.webGLRenderer.resourceManager.getResource(
                                    mesh.compression.compressedData,
                                    self.compressedMeshDelegate,
                                    { "mesh" : mesh, "renderer" : self.webGLRenderer});
                            }
                        }, this);
                    }
                } , true, null);

            }
        }
    },

    webGLRenderer: {
        get: function() {
            return this._webGLRenderer;
        },
        set: function(value) {
            this._webGLRenderer = value;
        }
    },

    init: {
        value: function( webGLRenderer, options) {
            this.webGLRenderer = webGLRenderer;
            this.createTechniqueIfNeeded();
            this.loadPickingTechnique();
            return this;
        }
    },

    render: {
        value: function(time, options) {
            if (this.technique)
                this.technique.execute(this.webGLRenderer, time, options);
        }
    }

});


}})
;
//*/
montageDefine("daa4856","punycode",{dependencies:[],factory:function(require,exports,module){/*! http://mths.be/punycode by @mathias */
;(function(root) {

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Detect free variables `define`, `exports`, `module` and `require` */
	freeDefine = typeof define == 'function' && typeof define.amd == 'object' &&
		define.amd && define,
	freeExports = typeof exports == 'object' && exports,
	freeModule = typeof module == 'object' && module,
	freeRequire = typeof require == 'function' && require,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexPunycode = /^xn--/,

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process.',
		'ucs2decode': 'UCS-2(decode): illegal sequence',
		'ucs2encode': 'UCS-2(encode): illegal value',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var glue = '.';
		return map(string.split(glue), fn).join(glue);
	}

	/**
	 * Creates an array containing the decimal code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if ((value & 0xF800) == 0xD800) {
				extra = string.charCodeAt(counter++);
				if ((value & 0xFC00) != 0xD800 || (extra & 0xFC00) != 0xDC00) {
					error('ucs2decode');
				}
				value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
			}
			output.push(value);
		}
		return output;
	}

	/**
	 * Creates a string based on an array of decimal code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of decimal code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if ((value & 0xF800) == 0xD800) {
				error('ucs2encode');
			}
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic (decimal) code point.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		return codePoint - 48 < 10
			? codePoint - 22
			: codePoint - 65 < 26
				? codePoint - 65
				: codePoint - 97 < 26
					? codePoint - 97
					: base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if flag is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a basic code point to lowercase is `flag` is falsy, or to
	 * uppercase if `flag` is truthy. The code point is unchanged if it's
	 * caseless. The behavior is undefined if `codePoint` is not a basic code
	 * point.
	 * @private
	 * @param {Number} codePoint The numeric value of a basic code point.
	 * @returns {Number} The resulting basic code point.
	 */
	function encodeBasic(codePoint, flag) {
		codePoint -= (codePoint - 97 < 26) << 5;
		return codePoint + (!flag && codePoint - 65 < 26) << 5;
	}

	/**
	 * Converts a Punycode string of ASCII code points to a string of Unicode
	 * code points.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII code points.
	 * @returns {String} The resulting string of Unicode code points.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    length,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode code points to a Punycode string of ASCII
	 * code points.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode code points.
	 * @returns {String} The resulting Punycode string of ASCII code points.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.0.0',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to decimal Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	if (freeExports) {
		if (freeModule && freeModule.exports == freeExports) {
			// in Node.js or Ringo 0.8+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or Ringo 0.7-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else if (freeDefine) {
		// via curl.js or RequireJS
		define('punycode', punycode);
	} else {
		// in a browser or Rhino
		root.punycode = punycode;
	}

}(this));
}})
;
//*/
montageDefine("f73ee10","runtime/transform",{dependencies:["runtime/dependencies/gl-matrix","runtime/base","runtime/utilities"],factory:function(require,exports,module){// Copyright (c) Fabrice ROBINET
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

}})
;
//*/
montageDefine("f73ee10","runtime/node",{dependencies:["montage","runtime/component-3d","runtime/transform","runtime/animation","runtime/dependencies/gl-matrix"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet
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
var Transform = require("runtime/transform").Transform;
var BasicAnimation = require("runtime/animation").BasicAnimation;
require("runtime/dependencies/gl-matrix");

exports.Node = Component3D.specialize( {

    constructor: {
        value: function Node() {
            this.super();
            //FIXME: these guys are not removed
            this._hidden = false;
            this._visibility = "visible";
            this._offsetTransform = Object.create(Transform).init();

            this.addOwnPropertyChangeListener("hidden", this);
            this.addOwnPropertyChangeListener("visibility", this);
            this.addOwnPropertyChangeListener("offsetTransform", this);
            this.addOwnPropertyChangeListener("originVector", this);
            this.addOwnPropertyChangeListener("glTFElement", this);
            this.addOwnPropertyChangeListener("transformOrigin", this);
            this.addOwnPropertyChangeListener("transformZOrigin", this);
            this.addOwnPropertyChangeListener("cursor", this);
        }
    },

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

    handleGlTFElementChange: {
        value: function() {
            this.handleHiddenChange();
            this.handleVisibilityChange();
            this.handleOffsetTransformChange();
            this.handleOriginVectorChange();
            this.handleTransformOriginChange();
            this.handleTransformZOriginChange();

            this._applyCSSPropertyWithValueForState(this.__STYLE_DEFAULT__, "offsetTransform", this._offsetTransform);

        }
    },

    handleHiddenChange: {
        value: function() {
            if (this.glTFElement != null) {
                this.glTFElement.hidden = this._hidden;
                //FIXME: user a more appropriate name for this, it will just trigger a redraw
                this.scene.dispatchEventNamed("materialUpdate", true, false, this);
            }
        }
    },

    handleVisibilityChange: {
        value: function() {
            if (this.glTFElement != null) {
                this.glTFElement.hidden = this.visibility ? this.visibility === "hidden" : false;
                //FIXME: user a more appropriate name for this, it will just trigger a redraw
                this.scene.dispatchEventNamed("materialUpdate", true, false, this);
            }
        }
    },

    offsetTransform_animationSetter: {
		set: function(value) {
	     	this._offsetTransform = value;
	      	this.handleOffsetTransformChange();
	 	}
	},

    handleCursorChange: {
        value: function() {
            this.scene.dispatchEventNamed("cursorUpdate", true, false, this.cursor);
        }
    },

    handleTransformOriginChange: {
        value: function() {

            var currentTransformOrigin = this.transformOrigin;
            if (currentTransformOrigin == null) {
                currentTransformOrigin = this.initialValueForStyleableProperty("transformOrigin");
            }

            this.originVector = vec3.createFrom(currentTransformOrigin[0], currentTransformOrigin[1], this.transformZOrigin);
        }
    },

    handleTransformZOriginChange: {
        value: function() {
            var currentTransformOrigin = this.transformOrigin;
            if (currentTransformOrigin == null) {
                currentTransformOrigin = this.initialValueForStyleableProperty("transformOrigin");
            }

            this.originVector = vec3.createFrom(currentTransformOrigin[0], currentTransformOrigin[1], this.transformZOrigin);
        }
    },

    handleOffsetTransformChange: {
        value: function() {
            if (this.glTFElement != null) {
                //access a private property. not sure yet which name would be the most appropriate yet
                this.glTFElement._offsetTransform = this._offsetTransform;
                //FIXME: user a more appropriate name for this, it will just trigger a redraw
                this.scene.dispatchEventNamed("materialUpdate", true, false, this);
            }
        }
    },

    handleOriginVectorChange: {
        value: function() {
            if (this.glTFElement != null) {
                this.glTFElement._originVector = this._originVector;
                //FIXME: user a more appropriate name for this, it will just trigger a redraw
                this.scene.dispatchEventNamed("materialUpdate", true, false, this);
            }
        }
    },

    _hidden: { value: false, writable:true },

    //deprecated - just kept for the den-demo
    hidden: {
        set: function(value) {
            if (this._hidden != value) {
                //FIXME: work-around visibility && hidden properties competing here.
                //hidden, historical, and visibility because of CSS
                this.visibility = (value === true) ? "hidden" : "visible";

                this._hidden = value;
            }
        },
        get: function() {
            return this._hidden;
        }
    },

    _visibility: { value: false, writable:true },

    visibility: {
        set: function(value) {
            this._visibility = value;
        },
        get: function() {
            return this._visibility;
        }
    },

    _transform: { value: null, writable:true },

    transform: {
        set: function(value) {
            this._transform = value;
        },
        get: function() {
            return this._transform;
        }
    },

    _offsetTransform: { value: null, writable:true },

    offsetTransform: {
        set: function(value) {
            if (this.glTFElement) {
                var animationManager = this.scene.glTFElement.animationManager;
                animationManager.removeAnimationWithTargetAndPath(this, "offsetTransform_animationSetter");
                if (this._style) {
                    if (this._style.transitions) {
                        var transition = this._style.transitions["offsetTransform"];
                        if (transition != null) {
                            if (transition.duration > 0) {
                                this._offsetTransform.matrix = this._offsetTransform.matrix;
                                fromTr = this._offsetTransform;
                                toTr = value;

                                //toTr.matrix = toTr.matrix;

                                var transformAnimation = Object.create(BasicAnimation).init();
                                transformAnimation.path = "offsetTransform_animationSetter";
                                transformAnimation.target = this;
                                transformAnimation.delegate = this;
                                transformAnimation.from = fromTr;
                                transformAnimation.to = toTr;
                                transformAnimation.duration = transition.duration * 1000;
                                animationManager.playAnimation(transformAnimation);
                                transformAnimation.animationWasAddedToTarget();
                                animationManager.evaluateAtTime(Date.now());
                                return;
                            }
                        }
                    }
                }
            }

            this._offsetTransform = value;
        },
        get: function() {
            return this._offsetTransform;
        }
    },

    _originVector: { value: null, writable:true },

    originVector: {
        set: function(value) {
            this._originVector = value;
        },
        get: function() {
            return this._originVector;
        }
    },

    _transformOrigin: { value: null, writable:true },

    transformOrigin: {
        set: function(value) {
            this._transformOrigin = value;
        },
        get: function() {
            return this._transformOrigin;
        }
    },

    _transformZOrigin: { value: 50, writable:true },

    transformZOrigin: {
        set: function(value) {
            this._transformZOrigin = value;
        },
        get: function() {
            return this._transformZOrigin;
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
                console.log("WARNING attempt to add 2 times the same observer in glTFNode")
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
    },

    _stylableProperties: { value: ["visibility", "offsetTransform", "transformOrigin", "transformZOrigin", "cursor"]},

    styleableProperties: {
        get: function() {
            return this._stylableProperties;
        }
    },

    initialValueForStyleableProperty: {
        value: function(property) {
            if (property === "visibility") {
                return "visible";
            } else if (property === "offsetTransform") {
                return Object.create(Transform).init();
            } else if (property === "originVector") {
                return vec3.createFrom(50, 50, 50);
            } else if (property === "offsetMatrix") {
                return mat4.identity();
            } else if (property === "transformOrigin") {
                return vec2.createFrom(50, 50);
            } else if (property === "transformZOrigin") {
                return 50;                
            } else if (property === "cursor") {
                return "auto";
            }
        }
    }

});

}})
;
//*/
montageDefine("7fd8be3","composer/key-composer",{dependencies:["../core/core","./composer"],factory:function(require,exports,module){/**
 * @module montage/composer/key-composer
 * @requires montage/core/core
 * @requires montage/composer/composer
 */
var Montage = require("../core/core").Montage,
    Composer = require("./composer").Composer;

// Event types dispatched by KeyComposer
var KEYPRESS_EVENT_TYPE = "keyPress",
    LONGKEYPRESS_EVENT_TYPE = "longKeyPress",
    KEYRELEASE_EVENT_TYPE = "keyRelease";

/**
 * @class KeyComposer
 * @classdesc A `Composer` that makes it easy to listen for specific key
 * combinations and react to them.
 * @extends Composer
 * @fires keyPress
 * @fires longKeyPress
 * @fires keyRelease
 * @example
 * keyComposer = KeyComposer.createKey(textComponent, "command+z", "undo");
 * keyComposer.addEventListener("keyPress", undoManager);
 * // when command+z is pressed inside textComponent,
 * // undoManager.handleUndoKeyPress() will be called.
 */
var KeyComposer = exports.KeyComposer = Composer.specialize( /** @lends KeyComposer# */ {

    _isLoaded: {
        value: false
    },

    _shouldDispatchEvent: {
        value: false
    },

    shouldDispatchLongPress: {
        value: false
    },

    _longPressTimeout: {
        value: null
    },

    _keyRegistered: {
        value: false
    },

    _keys:{
        value: null
    },

    /**
     * The keyboard shortcut to listen to. One alphanumeric character or named
     * non-alphanumeric key, possibly with modifiers connected by '+'. The full
     * list of normalized keys and modifiers is in `KeyManager`.  @example "j",
     * "shift+j", "command+shift+j", "backspace", "win+pipe"
     * @type {string}
     * @default null
     */
    keys: {
        get: function() {
            return this._keys;
        },
        set: function(keys) {
            if (this._keyRegistered) {
                KeyManagerProxy.defaultKeyManager.unregisterKey(this);
                this._keys = keys;
                KeyManagerProxy.defaultKeyManager.registerKey(this);
            } else {
                this._keys = keys;
            }
        }
    },

    load: {
        value: function() {
            // Only register the key if somebody is listening for, else let do
            // it later.
            // console.log("--- load", this.identifier);
            this._isLoaded = true;
            if (this._shouldDispatchEvent && !this._keyRegistered) {
                KeyManagerProxy.defaultKeyManager.registerKey(this);
                this._keyRegistered = true;
            }
        }
    },

    unload: {
        value: function() {
            this._isLoaded = false;
            KeyManagerProxy.defaultKeyManager.unregisterKey(this);
            this._keyRegistered = false;
        }
    },

    /**
     * Listen to find out when this `KeyComposer` detects a matching key press.
     * @method
     * @param {string} type Any of the following types: keyPress, longKeyPress
     * and keyRelease.
     * @param {Object|function} listener The listener object or function to
     * call when dispatching the event.
     * @param {boolean} useCapture Specify if the listener want to be called
     * during the capture phase of the event.
     */
    addEventListener: {
        value: function(type, listener, useCapture) {
            // Optimisation so that we don't dispatch an event if we do not need to
            // console.log("--- addEventListener", this.identifier);
            var component = this.component;

            Composer.addEventListener.call(this, type, listener, useCapture);

            if (type == KEYPRESS_EVENT_TYPE || type == LONGKEYPRESS_EVENT_TYPE || type == KEYRELEASE_EVENT_TYPE) {
                this._shouldDispatchEvent = true;
                if (type == LONGKEYPRESS_EVENT_TYPE) {
                    this._shouldDispatchLongPress = true;
                }

                if (this._isLoaded) {
                    if (!this._keyRegistered) {
                        KeyManagerProxy.defaultKeyManager.registerKey(this);
                        this._keyRegistered = true;
                    }
                } else if (component && typeof component.addComposer !== "function") {
                    // this keyComposer is not associated with an element,
                    // let's make it a global key
                    if (!this.element) {
                        this.element = window;
                    }
                    // this keyComposer is not attached to a UI Component,
                    // let's load it manually
                    this.load();
                }
            }
        }
    },

    constructor: {
        value: function() {
            // console.log("KEY CREATED")
            Composer.constructor.call(this);
        }
    },

    /**
     * Called when a composer is part of a template serialization. Responsible
     * for calling `addComposer` on the component or calling `load` on the
     * composer.
     * @private
     */
    deserializedFromTemplate: {
        value: function() {
            var component = this.component;

            if (this.identifier === null) {
                this.identifier = Montage.getInfoForObject(this).label;
            }

            if (component) {
                if (typeof component.addComposer == "function") {
                    component.addComposer(this);
                } else if (!this._isLoaded) {
                    // this keyComposer is not associated with an element,
                    // let's make it a global key
                    if (!this.element) {
                        this.element = window;
                    }
                    // this keyComposer is not attached to a UI Component,
                    // let's load it manually
                    this.load();
                }
            }
        }
    }
}, {

    /**
     * Constructs a `KeyComposer` to listen for a key combination on a
     * component.
     *
     * The composer will only respond to key events triggered by the DOM
     * elements inside its component or when its component is set as the
     * `activeTarget`.
     *
     * @param {Object} component The component to attach the `KeyComposer` to.
     * @param {Object} keys The key combination, possibly including modifier
     * keys.
     * @param {Object} identifier The identifier for events triggered by this
     * composer.
     * @returns {Object} the newly created `KeyComposer` Object
     */
    createKey: {
        value: function(component, keys, identifier) {
            var key = this;

            if (this === KeyComposer) {
                // This function has been called without creating a new
                // instance of KeyComposer first.
                key = new KeyComposer();
            }

            if (!identifier) {
                if (component.identifier) {
                    identifier = component.identifier + keys.toLowerCase().replace(/[ +]/g).toCapitalized();
                } else {
                    identifier = keys.toLowerCase().replace(/[ +]/g);
                }
            }
            key.keys = keys;
            key.identifier = identifier;

            // console.log("CREATING KEY:", component, key, key.identifier);

            component.addComposer(key);

            return key;
        }
    },

    /**
     * Constructs a `KeyComposer` listening for a key combination anywhere on
     * the page.
     *
     * The composer will respond to key events that bubble up to the `window`.
     *
     * @method
     * @param {Object} component. The component to attach the keyComposer to.
     * @param {Object} keys. The key sequence.
     * @param {Object} identifier. The identifier.
     * @returns {Object} the newly created KeyComposer Object
     */
    createGlobalKey: {
        value: function(component, keys, identifier) {
            var key = this;

            if (this === KeyComposer) {
                // This function has been called without creating a new
                // instance of KeyComposer first
                key = new KeyComposer();
            }

            key.keys = keys;
            key.identifier = identifier;
            // console.log("CREATING GLOBAL KEY:", component, key);

            component.addComposerForElement(key, window);

            return key;
        }
    }

});


/**
 * @class KeyManagerProxy
 * @classdesc Provide a proxy for lazy load of KeyManager.
 * @extends Montage
 * @private
 */
var _keyManagerProxy= null;

var KeyManagerProxy = Montage.specialize(  {

    /**
     * @private
     */
    _defaultKeyManager: {
        value: null
    },

    /**
     * @private
     */
    _loadingDefaultKeyManager: {
        value: false
    },

    /**
     * @private
     */
    _keysToRegister : {
        value: []
    },

    /**
     * @private
     */
    constructor: {
        value: function() {
            // console.log("PROXY CREATED")
        }
    },

    /**
     * Register a `KeyComposer` with the default `KeyManager`.
     * @method
     * @param {Object} keyComposer. A key composer object.
     */
    registerKey: {
        value: function(keyComposer) {
            var thisRef = this;

            if (!this._defaultKeyManager) {
                this._keysToRegister.push(keyComposer);
                if (!this._loadingDefaultKeyManager) {
                    this._loadingDefaultKeyManager = true;

                    require.async("core/event/key-manager")
                    .then(function(module) {
                        var keyManager = thisRef._defaultKeyManager = module.defaultKeyManager;
                        thisRef._keysToRegister.forEach(function(keyComposer) {
                            keyManager.registerKey(keyComposer);
                        });
                        thisRef._keysToRegister.length = 0;
                    })
                    .done();
                }
            } else {
                // This will happend only if somebody uses a cached return
                // value from KeyManagerProxy.defaultKeyManager
                this._defaultKeyManager.registerKey(keyComposer);
            }
        }
    },

    /**
     * Unregister a `KeyComposer` with the default `KeyManager`.
     * @method
     * @param {Object} keyComposer. A key composer object.
     */
    unregisterKey: {
        value: function(keyComposer) {
            if (this._defaultKeyManager) {
                this._defaultKeyManager.unregisterKey(keyComposer);
            }
        }
    }

}, {

    /**
     * Return either the default `KeyManager` or its `KeyManagerProxy`.
     * @method
     * @returns {Object} `KeyManager` or `KeyManagerProxy`.
     */
    defaultKeyManager: {
        get: function() {
            if (!_keyManagerProxy) {
                _keyManagerProxy = new KeyManagerProxy();
            }
            if (this._defaultKeyManager) {
                return this._defaultKeyManager;
            } else {
                return _keyManagerProxy;
            }
        }
    }

});

}})
;
//*/
montageDefine("f73ee10","runtime/scene",{dependencies:["montage","runtime/node","montage/core/uuid","runtime/runtime-tf-loader","url","runtime/scene-resource-loader","q","montage/core/target","cssom"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet
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
var Node = require("runtime/node").Node;
var UUID = require("montage/core/uuid");
var RuntimeTFLoader = require("runtime/runtime-tf-loader").RuntimeTFLoader;
var URL = require("url");
var SceneResourceLoader = require("runtime/scene-resource-loader").SceneResourceLoader;
var Q = require("q");
var Target = require("montage/core/target").Target;
var CSSOM = require("cssom");

exports.Scene = Target.specialize( {

    constructor: {
        value: function Scene() {
            this.super();
        }
    },

    _resourcesLoaded: { value: false, writable: true },

    _glTFElement: { value: null, writable: true },

    shouldBeHitTested: { value: false, writable: true },

    glTFElement: {
        get: function() {
            return this._glTFElement;
        },
        set: function(value) {
            this._glTFElement = value;
        }
    },

    _rootNode: { value: null, writable: true },

    rootNode: {
        get: function() {
            if (this.status === "loaded") {
                if (this._rootNode == null) {
                    this._rootNode = Montage.create(Node);
                    this._rootNode.scene = this;
                    this._rootNode.id = this.glTFElement.rootNode.id;
                }
            }
            return this._rootNode;
        }
    },

    sceneResourcesDidPrepare: {
        value: function() {
            if (!this._resourcesLoaded) {
                if (this._prepareToRenderDefer) {
                    this._prepareToRenderDefer.resolve();
                }
                this._resourcesLoaded = true;
                //FIXME: we should pass { scene:scene webGLContext:webGLContext
                //only problem now is pass the webGLContext through the promise properly
                this.dispatchEventNamed("resourcesDidLoad", true, false, this);
                this.status = "loaded";
            }
        }
    },

    isLoaded: {
        value: function() {
            return this.status == "loaded";
        }
    },

    status: { value: 0, writable: true},

    styleSheetsLoaded: { value: false, writable: true},

    styleSheets: { value: null, writable: true},

    loadCSSStyles: {
        value: function() {
            if (document.styleSheets == null)
                return;
            var packages = Object.keys(require.packages);
            var styleSheetsLoaded = 0;
            var styleSheetsCount = document.styleSheets.length;
            var i;
            var styleSheet;
            var styleSheets = [];
            this.styleSheets = {};
            
            for (i = 0; i < styleSheetsCount; i++) {    
                styleSheet = document.styleSheets[i]; 
                if (styleSheet.href != null) {
                    if (styleSheet.href.indexOf(packages[0]) != -1) {
                        //HACK: packages[0] is guaranted to be the entry point
                         //we just want the CSS from this project but not the ones from its dependencies
                        if (styleSheet.href.indexOf(packages[0] + "node_modules") == -1) {
                            styleSheets.push(styleSheet);
                        }
                    }
                } else {
                    // Gets a style node and its content within the current document.
                    if (styleSheet.ownerNode && styleSheet.ownerNode.innerText) {
                        this._addStyleSheets(styleSheet.ownerNode.innerText);
                    }
                }
            }

            styleSheetsCount = styleSheets.length;

            if (styleSheetsCount === 0) {
                this.styleSheetsLoaded = true;
                return;
            }

            styleSheets.forEach(function (styleSheet) {
                var self = this;
                //FIXME: handle error
                var cssPath = styleSheet.href;
                var cssXHR = new XMLHttpRequest();
                cssXHR.open("GET", cssPath, true);
                cssXHR.onreadystatechange = function () {
                    if (cssXHR.readyState == 4) {
                        if (cssXHR.status == 200) {
                            self._addStyleSheets(cssXHR.responseText, styleSheet.href);
                            styleSheetsLoaded++;

                            if (styleSheetsLoaded === styleSheetsCount) {
                                self.dispatchEventNamed("styleSheetsDidLoad", true, false, self);
                            }
                        }
                    }
                };

                cssXHR.send(null);
            }, this);

            return false;
        }
    },

    _addStyleSheets: {
        value: function (styleSheetContent, styleSheetID) {
            if (!styleSheetID) {
                styleSheetID = UUID.generate();
            }

            this.styleSheets[styleSheetID] = CSSOM.parse(styleSheetContent);
        }
    },

    deserializedFromTemplate: {
        value: function(owner, label, documentPart) {
            this._ownerDocumentPart = documentPart;
        }
    },

    _pendingLoading: { value: false },

    _loadScene: {
        value: function() {
            var self = this;
            var readerDelegate = {};
            readerDelegate.loadCompleted = function (scene) {
                this.totalBufferSize =  loader.totalBufferSize;
                this.glTFElement = scene;
                this.status = "loaded";
                console.log("scene loaded:"+this._path);
            }.bind(this);

            if (this._path != null) {
                var absolutePath = this._path;
                var URLObject = URL.parse(absolutePath);
                if (absolutePath[0] === '/') {
                    absolutePath = absolutePath.substr(1);
                    //HACK: packages[0] is guaranted to be the entry point
                    absolutePath = URL.resolve(require.packages[0], absolutePath);
                } else if (!URLObject.scheme) {
                    if (this._ownerDocumentPart == null) 
                        return;
                    var rebase = this._ownerDocumentPart.template.getBaseUrl();
                    absolutePath = URL.resolve(rebase, absolutePath);
                }

                var loader = Object.create(RuntimeTFLoader);
                this.status = "loading";
                loader.initWithPath(absolutePath);
                loader.delegate = readerDelegate;
                loader.load(null /* userInfo */, null /* options */);
            }

            if (this._pendingLoading == true) {
                this.removePathChangeListener("_ownerDocumentPart", this);
                this._pendingLoading = false;
            }
        }
    },

    path: {
        set: function(value) {
            //Work-around until montage implements textfield that do not send continous input..
            if (value) {
                if (value.indexOf(".json") === -1)
                    return;
            }

            if (value !== this._path) {
                this._path = value;
                if (value == null) {
                    this.scene = null;
                } else {
                    var isAbsolute  = (value.length > 0) &&  value[0] === '/';
                    if ((isAbsolute == false) && this._ownerDocumentPart == null) {
                        //FIXME:we should queue
                        if (this._pendingLoading == false) {
                            this.addPathChangeListener("_ownerDocumentPart", this, "_loadScene");
                            this._pendingLoading = true;
                        }
                    } else {
                        this._loadScene();
                    }
                }
            }
        },

        get: function() {
            return this._path;
        }
    },

    _prepareToRenderDefer: { value: null, writable: true },

    /*
        This method doesn't need to be called directly if the rendering is done via a view.
     */
    prepareToRender: {
        value: function(webGLRenderer) {
            if (this._prepareToRenderDefer == null) {
                this._prepareToRenderDefer = Q.defer();
                var sceneResourceLoader = Object.create(SceneResourceLoader).init(this.glTFElement, webGLRenderer, this);
                sceneResourceLoader.loadScene();
            }

            return this._prepareToRenderDefer.promise;
        }
    },

    init: {
        value:function(glTFElement) {
            if (glTFElement) {
                this.glTFElement = glTFElement;
                this.status = "loaded";
            }
            return this;
        }
    },

    blueprintModuleId:require("montage")._blueprintModuleIdDescriptor,

    blueprint:require("montage")._blueprintDescriptor

});

}})
;
//*/
montageDefine("f73ee10","controllers/camera-controller",{dependencies:["runtime/dependencies/gl-matrix","runtime/utilities","runtime/transform","montage"],factory:function(require,exports,module){// Copyright (c) Fabrice ROBINET
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
var Transform = require("runtime/transform").Transform;
var Montage = require("montage").Montage;

exports.CameraController = Montage.specialize( {

    // Montage
    constructor: {
        value: function View() {
            this.super();

            this._lastPosition = [0 ,0];
        }
    },

    _deltaForEvent: {
        value: function(event) {
            return event.wheelDeltaY != null ? event.wheelDeltaY : -event.deltaY;
        }
    },

    _minimalDistance: { value: 0, writable: true},

    _computeInitialDistance: {
        value: function() {
            if (this.sceneBBox) {
                var sceneBBox =  this.sceneBBox;

                //First we compute the sceneRadius
                var sceneBBOXMidpoint = vec3.createFrom(   (sceneBBox[1][0] - sceneBBox[0][0]) / 2, 
                                            (sceneBBox[1][1] - sceneBBox[0][1]) / 2, 
                                            (sceneBBox[1][2] - sceneBBox[0][2]) / 2)
                var sceneRadius = vec3.length(sceneBBOXMidpoint);

                //Then we check what is the starting distance from the view point to center of the sceen
                var targetPosition = [
                    (sceneBBox[0][0] + sceneBBox[1][0]) / 2,
                    (sceneBBox[0][1] + sceneBBox[1][1]) / 2,
                    (sceneBBox[0][2] + sceneBBox[1][2]) / 2];
                var eye = vec3.create(this.viewPoint.glTFElement.transform.translation);
                var direction = vec3.create();
                direction[0] = targetPosition[0] - eye[0];
                direction[1] = targetPosition[1] - eye[1];
                direction[2] = targetPosition[2] - eye[2];

                var initialDistance = vec3.length(direction);

                this._minimalDistance = (initialDistance < sceneRadius) ? initialDistance : sceneRadius;

                this.zoomStep = sceneRadius * 0.0001;
            }            
        }
    },

    viewPointDidChange: {
        value: function() {
            this._computeInitialDistance();
        }
    },

    _viewPoint: { value: null, writable: true},

    viewPoint: {
        get: function() {
            return this._viewPoint;
        },
        set: function(value) {
            if (this._viewPoint != value) {
                this._viewPoint = value;
                this.viewPointDidChange();
            }
        }
    },

    _node: { value: null, writable: true},

    zoomStep: { value: 0, writable: true },

    sceneBBox: { value: null, writable: true},

    nodeDidChange: {
        value: function() {
            var rootNode = this.node.glTFElement;
            this.sceneBBox =  rootNode.getBoundingBox(true);

            this._computeInitialDistance();
        }
    },

    node: {
        get: function() {
            return this._node;
        },
        set: function(value) {
            if (this._node != value) {
                this._node = value;
                this.nodeDidChange();
            }
        }
    },

    _lastPosition: { value: null, writable: true },

    _transform: { value: null, writable: true },

    _axisUp: { value: null, writable: true },

    zoom: {
        value: function(event) {
            if (this.moving)
                return;

            var self = this;
            var direction = vec3.create();
            var eye = vec3.create(this.viewPoint.glTFElement.transform.translation);

            var targetPosition;
            var rootNode = this.node.glTFElement;
            var sceneBBox =  this.sceneBBox;
            targetPosition = [
                (sceneBBox[0][0] + sceneBBox[1][0]) / 2,
                (sceneBBox[0][1] + sceneBBox[1][1]) / 2,
                (sceneBBox[0][2] + sceneBBox[1][2]) / 2];
            
            direction[0] = targetPosition[0] - eye[0];
            direction[1] = targetPosition[1] - eye[1];
            direction[2] = targetPosition[2] - eye[2];

            vec3.normalize(direction);

            var delta = this._deltaForEvent(event);

            var wheelStep =  this.zoomStep * delta;

            eye[0] += wheelStep * direction[0];
            eye[1] += wheelStep * direction[1];
            eye[2] += wheelStep * direction[2];

            var distVec = vec3.create();

            distVec[0] = targetPosition[0] - eye[0];
            distVec[1] = targetPosition[1] - eye[1];
            distVec[2] = targetPosition[2] - eye[2];
            var distance = vec3.length(distVec);
            if (distance > this._minimalDistance) {
                this.viewPoint.glTFElement.transform.translation = eye;
            } else {
                var minimalDistance = (delta > 0) ? -this._minimalDistance : this._minimalDistance;

                eye[0] = targetPosition[0] + direction[0] * minimalDistance;
                eye[1] = targetPosition[1] + direction[1] * minimalDistance;
                eye[2] = targetPosition[2] + direction[2] * minimalDistance;

                this.viewPoint.glTFElement.transform.translation = eye;
            }
        }
    },

    translate: {
        value: function(event) {
            this._transform.matrix = this.viewPoint.glTFElement.worldMatrix;
            if (this.moving == false)
                 return;

            var xDelta = event.translateX - this._lastPosition[0];
            var yDelta = event.translateY - this._lastPosition[1];

            this._lastPosition[0] = event.translateX;
            this._lastPosition[1] = event.translateY;

            xDelta  *=  0.05;
            yDelta  *=  -0.05;

            //if (this._axisUp == null) {
                this._axisUp = vec3.createFrom(0, 1, 0);
                mat4.rotateVec3(this._transform.matrix, this._axisUp);
            //}
            var hasTarget = false;
            var targetPosition;
            if (hasTarget == false) {
                var rootNode = this.node.glTFElement;
                var sceneBBox =  this.sceneBBox;
                targetPosition = [
                    (sceneBBox[0][0] + sceneBBox[1][0]) / 2,
                    (sceneBBox[0][1] + sceneBBox[1][1]) / 2,
                    (sceneBBox[0][2] + sceneBBox[1][2]) / 2];
            }
            var direction = vec3.create();
            var eye = vec3.create(this._transform.translation);

            direction[0] = targetPosition[0] - eye[0];
            direction[1] = targetPosition[1] - eye[1];
            direction[2] = targetPosition[2] - eye[2];

            var axisUpAdjusted = vec3.create(this._axisUp);
            var right = vec3.create();
            vec3.normalize(direction);
            vec3.cross(direction, this._axisUp, right);
            vec3.normalize(right);
            vec3.cross(direction, right, axisUpAdjusted);
            vec3.normalize(axisUpAdjusted);

            var cameraMat = mat4.identity();

            var ratio = 0;
            if (Math.abs(yDelta) > Math.abs(xDelta)) {
                ratio = Math.abs(yDelta) / Math.abs(xDelta);
            } else {
                ratio = Math.abs(xDelta) / Math.abs(yDelta);
            }

            if (ratio > 0.5) {
                mat4.rotate(cameraMat, xDelta, axisUpAdjusted);
                mat4.rotate(cameraMat, yDelta, right);
            } else
            if (Math.abs(yDelta) > Math.abs(xDelta))
                mat4.rotate(cameraMat, yDelta, right);
            else
                mat4.rotate(cameraMat, xDelta, axisUpAdjusted);

            eye[0] -= targetPosition[0];
            eye[1] -= targetPosition[1];
            eye[2] -= targetPosition[2];

            mat4.rotateVec3(cameraMat, eye);

            eye[0] += targetPosition[0];
            eye[1] += targetPosition[1];
            eye[2] += targetPosition[2];

            var  rotationMatrix = mat4.identity();
            mat4.multiply3(cameraMat, this._transform.matrix,  rotationMatrix);

            var translationMatrix = mat4.identity();
            mat4.translate(translationMatrix, eye);

            var finalMat = mat4.identity();
            mat4.multiply(translationMatrix, rotationMatrix, finalMat);
            this.viewPoint.glTFElement.transform.matrix = finalMat;
        }
    },

    beginTranslate: {
        value: function(event) {
            this.moving = true;
            if (this._transform == null) {
                this._transform = Object.create(Transform).init();
            }
            this._transform.matrix = this.viewPoint.glTFElement.worldMatrix;
        }
    },

    endTranslate: {
        value: function(event) {
            this.moving = false;

            this._axisUp = null;
        }
    }

});

}})
;
//*/
montageDefine("e76622a","lib/parse",{dependencies:["./CSSStyleSheet","./CSSStyleRule","./CSSImportRule","./CSSMediaRule","./CSSFontFaceRule","./CSSStyleDeclaration","./CSSKeyframeRule","./CSSKeyframesRule","./CSSValueExpression","./CSSDocumentRule"],factory:function(require,exports,module){//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @param {string} token
 */
CSSOM.parse = function parse(token) {

	var i = 0;

	/**
		"before-selector" or
		"selector" or
		"atRule" or
		"atBlock" or
		"before-name" or
		"name" or
		"before-value" or
		"value"
	*/
	var state = "before-selector";

	var index;
	var buffer = "";

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true,
		"atRule": true,
		"importRule-begin": true,
		"importRule": true,
		"atBlock": true,
		'documentRule-begin': true
	};

	var styleSheet = new CSSOM.CSSStyleSheet;

	// @type CSSStyleSheet|CSSMediaRule|CSSFontFaceRule|CSSKeyframesRule|CSSDocumentRule
	var currentScope = styleSheet;

	// @type CSSMediaRule|CSSKeyframesRule|CSSDocumentRule
	var parentRule;

	var selector, name, value, priority="", styleRule, mediaRule, importRule, fontFaceRule, keyframesRule, keyframeRule, documentRule;

	var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g;

	var parseError = function(message) {
		var lines = token.substring(0, i).split('\n');
		var lineCount = lines.length;
		var charCount = lines.pop().length + 1;
		var error = new Error(message + ' (line ' + lineCount + ', char ' + charCount + ')');
		error.line = lineCount;
		error.char = charCount;
		error.styleSheet = styleSheet;
		throw error;
	};

	for (var character; character = token.charAt(i); i++) {

		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				buffer += character;
			}
			break;

		// String
		case '"':
			index = i + 1;
			do {
				index = token.indexOf('"', index) + 1;
				if (!index) {
					parseError('Unmatched "');
				}
			} while (token[index - 2] === '\\')
			buffer += token.slice(i, index);
			i = index - 1;
			switch (state) {
				case 'before-value':
					state = 'value';
					break;
				case 'importRule-begin':
					state = 'importRule';
					break;
			}
			break;

		case "'":
			index = i + 1;
			do {
				index = token.indexOf("'", index) + 1;
				if (!index) {
					parseError("Unmatched '");
				}
			} while (token[index - 2] === '\\')
			buffer += token.slice(i, index);
			i = index - 1;
			switch (state) {
				case 'before-value':
					state = 'value';
					break;
				case 'importRule-begin':
					state = 'importRule';
					break;
			}
			break;

		// Comment
		case "/":
			if (token.charAt(i + 1) === "*") {
				i += 2;
				index = token.indexOf("*/", i);
				if (index === -1) {
					parseError("Missing */");
				} else {
					i = index + 1;
				}
			} else {
				buffer += character;
			}
			if (state === "importRule-begin") {
				buffer += " ";
				state = "importRule";
			}
			break;

		// At-rule
		case "@":
			if (token.indexOf("@-moz-document", i) === i) {
				state = "documentRule-begin";
				documentRule = new CSSOM.CSSDocumentRule;
				documentRule.__starts = i;
				i += "-moz-document".length;
				buffer = "";
				break;
			} else if (token.indexOf("@media", i) === i) {
				state = "atBlock";
				mediaRule = new CSSOM.CSSMediaRule;
				mediaRule.__starts = i;
				i += "media".length;
				buffer = "";
				break;
			} else if (token.indexOf("@import", i) === i) {
				state = "importRule-begin";
				i += "import".length;
				buffer += "@import";
				break;
			} else if (token.indexOf("@font-face", i) === i) {
				state = "fontFaceRule-begin";
				i += "font-face".length;
				fontFaceRule = new CSSOM.CSSFontFaceRule;
				fontFaceRule.__starts = i;
				buffer = "";
				break;
			} else {
				atKeyframesRegExp.lastIndex = i;
				var matchKeyframes = atKeyframesRegExp.exec(token);
				if (matchKeyframes && matchKeyframes.index === i) {
					state = "keyframesRule-begin";
					keyframesRule = new CSSOM.CSSKeyframesRule;
					keyframesRule.__starts = i;
					keyframesRule._vendorPrefix = matchKeyframes[1]; // Will come out as undefined if no prefix was found
					i += matchKeyframes[0].length - 1;
					buffer = "";
					break;
				} else if (state == "selector") {
					state = "atRule";
				}
			}
			buffer += character;
			break;

		case "{":
			if (state === "selector" || state === "atRule") {
				styleRule.selectorText = buffer.trim();
				styleRule.style.__starts = i;
				buffer = "";
				state = "before-name";
			} else if (state === "atBlock") {
				mediaRule.media.mediaText = buffer.trim();
				currentScope = parentRule = mediaRule;
				mediaRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "fontFaceRule-begin") {
				if (parentRule) {
					fontFaceRule.parentRule = parentRule;
				}
				fontFaceRule.parentStyleSheet = styleSheet;
				styleRule = fontFaceRule;
				buffer = "";
				state = "before-name";
			} else if (state === "keyframesRule-begin") {
				keyframesRule.name = buffer.trim();
				if (parentRule) {
					keyframesRule.parentRule = parentRule;
				}
				keyframesRule.parentStyleSheet = styleSheet;
				currentScope = parentRule = keyframesRule;
				buffer = "";
				state = "keyframeRule-begin";
			} else if (state === "keyframeRule-begin") {
				styleRule = new CSSOM.CSSKeyframeRule;
				styleRule.keyText = buffer.trim();
				styleRule.__starts = i;
				buffer = "";
				state = "before-name";
			} else if (state === "documentRule-begin") {
				// FIXME: what if this '{' is in the url text of the match function?
				documentRule.matcher.matcherText = buffer.trim();
				if (parentRule) {
					documentRule.parentRule = parentRule;
				}
				currentScope = parentRule = documentRule;
				documentRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			}
			break;

		case ":":
			if (state === "name") {
				name = buffer.trim();
				buffer = "";
				state = "before-value";
			} else {
				buffer += character;
			}
			break;

		case '(':
			if (state === 'value') {
				// ie css expression mode
				if (buffer.trim() == 'expression') {
					var info = (new CSSOM.CSSValueExpression(token, i)).parse();

					if (info.error) {
						parseError(info.error);
					} else {
						buffer += info.expression;
						i = info.idx;
					}
				} else {
					index = token.indexOf(')', i + 1);
					if (index === -1) {
						parseError('Unmatched "("');
					}
					buffer += token.slice(i, index + 1);
					i = index;
				}
			} else {
				buffer += character;
			}

			break;

		case "!":
			if (state === "value" && token.indexOf("!important", i) === i) {
				priority = "important";
				i += "important".length;
			} else {
				buffer += character;
			}
			break;

		case ";":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
					buffer = "";
					state = "before-name";
					break;
				case "atRule":
					buffer = "";
					state = "before-selector";
					break;
				case "importRule":
					importRule = new CSSOM.CSSImportRule;
					importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
					importRule.cssText = buffer + character;
					styleSheet.cssRules.push(importRule);
					buffer = "";
					state = "before-selector";
					break;
				default:
					buffer += character;
					break;
			}
			break;

		case "}":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
				case "before-name":
				case "name":
					styleRule.__ends = i + 1;
					if (parentRule) {
						styleRule.parentRule = parentRule;
					}
					styleRule.parentStyleSheet = styleSheet;
					currentScope.cssRules.push(styleRule);
					buffer = "";
					if (currentScope.constructor === CSSOM.CSSKeyframesRule) {
						state = "keyframeRule-begin";
					} else {
						state = "before-selector";
					}
					break;
				case "keyframeRule-begin":
				case "before-selector":
				case "selector":
					// End of media/document rule.
					if (!parentRule) {
						parseError("Unexpected }");
					}
					currentScope.__ends = i + 1;
					// Nesting rules aren't supported yet
					styleSheet.cssRules.push(currentScope);
					currentScope = styleSheet;
					parentRule = null;
					buffer = "";
					state = "before-selector";
					break;
			}
			break;

		default:
			switch (state) {
				case "before-selector":
					state = "selector";
					styleRule = new CSSOM.CSSStyleRule;
					styleRule.__starts = i;
					break;
				case "before-name":
					state = "name";
					break;
				case "before-value":
					state = "value";
					break;
				case "importRule-begin":
					state = "importRule";
					break;
			}
			buffer += character;
			break;
		}
	}

	return styleSheet;
};


//.CommonJS
exports.parse = CSSOM.parse;
// The following modules cannot be included sooner due to the mutual dependency with parse.js
CSSOM.CSSStyleSheet = require("./CSSStyleSheet").CSSStyleSheet;
CSSOM.CSSStyleRule = require("./CSSStyleRule").CSSStyleRule;
CSSOM.CSSImportRule = require("./CSSImportRule").CSSImportRule;
CSSOM.CSSMediaRule = require("./CSSMediaRule").CSSMediaRule;
CSSOM.CSSFontFaceRule = require("./CSSFontFaceRule").CSSFontFaceRule;
CSSOM.CSSStyleDeclaration = require('./CSSStyleDeclaration').CSSStyleDeclaration;
CSSOM.CSSKeyframeRule = require('./CSSKeyframeRule').CSSKeyframeRule;
CSSOM.CSSKeyframesRule = require('./CSSKeyframesRule').CSSKeyframesRule;
CSSOM.CSSValueExpression = require('./CSSValueExpression').CSSValueExpression;
CSSOM.CSSDocumentRule = require('./CSSDocumentRule').CSSDocumentRule;
///CommonJS

}})
;
//*/
montageDefine("f73ee10","runtime/material",{dependencies:["montage","runtime/component-3d","runtime/animation"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet
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

}})
;
//*/
montageDefine("f73ee10","runtime/animation-manager",{dependencies:["runtime/dependencies/gl-matrix","runtime/base","runtime/animation"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice ROBINET
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

}})
;
//*/
montageDefine("f73ee10","runtime/projection",{dependencies:["runtime/dependencies/gl-matrix","runtime/base"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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
var Base = require("runtime/base").Base;

exports.Projection = Object.create(Base, {

    _matrix: { value: null, writable: true },
    _type: { value: null, writable: true },
    _xfov: { value: 0, writable: true },
    _yfov: { value: 0, writable: true },
    _xmag: { value: 0, writable: true },
    _ymag: { value: 0, writable: true },
    _znear: { value: 0, writable: true },
    _zfar: { value: 0, writable: true },
    _aspectRatio: { value: 0, writable: true },

    _dirtyFlag: { value : false, writable: true},

    projection: {
        get: function() {
            return this._type;
        },
        set: function(value) {
            if (this._type !== value) {
                this._type = value;
                this._dirtyFlag = true;
            }
        }
    },

    xfov: {
        get: function() {
            return this._xfov;
        },
        set: function(value) {
            if (this._xfov !== value) {
                this._xfov = value;
                this._dirtyFlag = true;
            }
        }
    },

    yfov: {
        get: function() {
            return this._yfov;
        },
        set: function(value) {
            if (this._yfov !== value) {
                this._yfov = value;
                this._dirtyFlag = true;
            }
        }
    },

    xmag: {
        get: function() {
            return this._xmag;
        },
        set: function(value) {
            if (this._xmag !== value) {
                this._xmag = value;
                this._dirtyFlag = true;
            }
        }
    },

    ymag: {
        get: function() {
            return this._ymag;
        },
        set: function(value) {
            if (this._ymag !== value) {
                this._ymag = value;
                this._dirtyFlag = true;
            }
        }
    },

    znear: {
        get: function() {
            return this._znear;
        },
        set: function(value) {
            if (this._znear !== value) {
                this._znear = value;
                this._dirtyFlag = true;
            }
        }
    },

    zfar: {
        get: function() {
            return this._zfar;
        },
        set: function(value) {
            if (this._zfar !== value) {
                this._zfar = value;
                this._dirtyFlag = true;
            }
        }
    },

    aspectRatio: {
        get: function() {
            return this._aspectRatio;
        },
        set: function(value) {
            var matrix = this.matrix;
            if (matrix) {
                if (this.yfov) {
                    //var degToRadians  = 3.14159265359 / 360.0;
                    //this._scaleX = 1./Math.tan(this.yfov * degToRadians * value);
                    matrix[0] = this._scaleX / value ;
                } else if (this.xfov) {
                    matrix[5] = this._scaleY * value ;

                }
            }
            this._aspectRatio = value;
        }
    },

    _scaleX : { value: 0, writable: true },
    _scaleY : { value: 0, writable: true },

    matrix: {
        get: function() {
            if (this._dirtyFlag)
            {
                if (this.projection === "perspective") {
                    var degToRadians  = 3.14159265359 / 360.0;

                    var scaleX = 0;
                    var scaleY = 0;
                    if (this.yfov) {
                        scaleY =  1./Math.tan(this.yfov * degToRadians);
                    }
                    if (this.xfov) {
                        scaleX = 1./Math.tan(this.xfov * degToRadians);
                    } else {
                        scaleX = scaleY;
                    }
                    if (scaleY == 0) {
                        scaleY = scaleX;
                    }
                    this._scaleX = scaleX;
                    this._scaleY = scaleY;
                    this._matrix = mat4.create();

                    this._matrix[0] = scaleX;
                    this._matrix[1] = 0.0;
                    this._matrix[2] = 0.0;
                    this._matrix[3] = 0.0;

                    this._matrix[4] = 0.0;
                    this._matrix[5]= scaleY;
                    this._matrix[6] = 0.0;
                    this._matrix[7] = 0.0;

                    this._matrix[8] = 0.0;
                    this._matrix[9] = 0.0;
                    this._matrix[10] = (this.zfar + this.znear) / (this.znear - this.zfar);
                    this._matrix[11] = -1.0;

                    this._matrix[12] = 0.0;
                    this._matrix[13] = 0.0;
                    this._matrix[14] = (2.0 * this.zfar * this.znear) / (this.znear - this.zfar);
                    this._matrix[15] = 0.0;

                } else if (this.projection === "orthographic") {
                    this._matrix = mat4.ortho(-this.xmag, this.xmag, -this.ymag, this.ymag, this.znear, this.zfar);
                } else {
                    console.log("WARNING: unhandled camera type:"+type)
                }

                this._dirtyFlag = false;
            }
            return this._matrix;
        },
        set: function(value ) {
            this._matrix = value;
        }
    },


    initWithDescription: {
        value: function(description) {
            this.__Base_init();
            this.projection = description.type;
            description = description[this.projection];
            this.xfov = description.xfov ? description.xfov : 0;
            this.yfov = description.yfov ? description.yfov : 0;
            this.xmag = description.xmag ? description.xmag : 1;
            this.ymag = description.ymag ? description.ymag : 1;
            this.znear = description.znear != null ? description.znear : 1;
            this.zfar = description.zfar != null ? description.zfar : 100;
            this.aspectRatio = description.aspect_ratio ? description.aspect_ratio : 0; //deprecate this one
            if (!this.aspectRatio)
                this.aspectRatio = description.aspectRatio ? description.aspectRatio : 0;
            this._dirtyFlag = true;
        }
    },

    init: {
        value: function() {
            this.__Base_init();

            this.projection = null;
            this.xfov = 0;
            this.yfov = 0;
            this.xmag = 1;
            this.ymag = 1;
            this.znear = 1;
            this.zfar = 100;
            this.aspectRatio = 4./3;
            this._dirtyFlag = true;
        }
    }
});


}})
;
//*/
montageDefine("f73ee10","runtime/scene-helper",{dependencies:["runtime/dependencies/gl-matrix","montage","montage/core/uuid","runtime/glTF-scene","runtime/glTF-node","runtime/scene","runtime/node","runtime/scene-renderer","runtime/glTF-material","runtime/utilities","runtime/projection","runtime/camera","collections/set","runtime/material"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet.
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
var Montage = require("montage").Montage;
var Uuid = require("montage/core/uuid").Uuid;
var glTFScene = require("runtime/glTF-scene").glTFScene;
var glTFNode = require("runtime/glTF-node").glTFNode;
var Scene = require("runtime/scene").Scene;
var Node = require("runtime/node").Node;
var SceneRenderer = require("runtime/scene-renderer").SceneRenderer;
var glTFMaterial = require("runtime/glTF-material").glTFMaterial;
var Utilities = require("runtime/utilities").Utilities;
var Projection = require("runtime/projection").Projection;
var Camera = require("runtime/camera").Camera;
var BBox = require("runtime/utilities").BBox;
var Set = require("collections/set");
var Material = require("runtime/material").Material;

var SceneHelper = exports.SceneHelper = Object.create(Object.prototype, {

    getGLTFViewPoints: {
        value: function(scene) {
            var viewPoints = [];
            var node = scene.glTFElement.rootNode;
            node.apply( function(node, parent, parentTransform) {
                if (node.cameras) {
                    if (node.cameras.length)
                        viewPoints = viewPoints.concat(node);
                }
                return null;
            }, true, null);
            return viewPoints;
        }
    },

    //we don't want to cache this to avoid synchronization here, so we don't want to call it often either :)
    getViewPoints: {
        value: function(scene) {
            var viewPoints = this.getGLTFViewPoints(scene);
            var m3dNodes = [];
            viewPoints.forEach( function(viewPoint) {
                var m3dNode = Montage.create(Node);
                m3dNode.scene = scene;
                //FIXME: should have probably used baseId here
                m3dNode.id = viewPoint.baseId;
                m3dNodes.push(m3dNode);
            }, this);

            return m3dNodes;
        }
    },

    createGLTFNodeIncludingCamera: {
        value: function(cameraName) {
            //TODO: make that a default projection method
            var projection = Object.create(Projection);
            projection.initWithDescription( {
                "type":"perspective",
                "perspective" : {
                    "yfov":45,
                    "aspectRatio":1,
                    "znear":0.1,
                    "zfar":100
                }
            });

            //create camera
            var camera = Object.create(Camera).init();
            camera.projection = projection;
            //create node to hold the camera
            var cameraNode = Object.create(glTFNode).init();
            camera.name = cameraNode.name = cameraName;
            cameraNode.id = Uuid.generate();
            cameraNode.baseId = cameraNode.id;
            cameraNode.cameras.push(camera);
            return cameraNode;
        }
    },

    createNodeIncludingCamera: {
        value: function(cameraName, m3dScene) {
            var cameraNode = SceneHelper.createGLTFNodeIncludingCamera(cameraName);
            var scene = m3dScene.glTFElement;
            scene.ids[cameraNode.baseId] = cameraNode;
            var m3dNode = Montage.create(Node);
            m3dNode.scene = m3dScene;
            m3dNode.id = cameraNode.baseId;
            return m3dNode;
        }
    },

    getMaterialsFromNode: {
        value: function(node) {
            var glTFNode = node.glTFElement;
            var materials = new Set();
            var scene = node.scene;

            if (glTFNode.meshes != null) {
                glTFNode.meshes.forEach( function(mesh) {
                    if (mesh.primitives) {
                        mesh.primitives.forEach( function(primitive) {
                            var glTFMaterial = primitive.material;
                            var material;                            
                            if (glTFMaterial.component3D == null) {
                                material = Montage.create(Material);
                                material.scene = scene;
                                material.id = glTFMaterial.baseId;
                                scene.glTFElement.ids[glTFMaterial.baseId] = glTFMaterial;
                                glTFMaterial.component3D = material;
                            } else {
                                material = glTFMaterial.component3D;
                            }
                            materials.add(material);
                        }, this);
                    }
                }, this);
            }
            return materials;
        }  
    },

    createNodeFromGlTFElementIfNeeded: {
        value: function(glTFNode, scene) {
            if (glTFNode.component3D != null)
                return glTFNode.component3D;

            var m3dNode = new Node();

            scene.glTFElement.ids[glTFNode.baseId] = glTFNode;
            m3dNode.scene = scene;
            m3dNode.id = glTFNode.baseId;
            glTFNode.component3D = m3dNode;

            return m3dNode;
        }
    },

    createMaterialFromGlTFElementIfNeeded: {
        value: function(glTFMaterial, scene) {
            if (glTFMaterial.component3D != null)
                return glTFMaterial.component3D;

            var m3dMaterial = new Material();

            scene.glTFElement.ids[glTFMaterial.baseId] = glTFMaterial;
            m3dMaterial.scene = scene;
            m3dMaterial.id = glTFMaterial.baseId;
            glTFMaterial.component3D = m3dMaterial;

            return m3dMaterial;
        }
    },


    getGLTFCamera: {
        value: function(node) {
            var glTFCamera = null;
            if (node.glTFElement) {
                var glTFNode = node.glTFElement;
                if (glTFNode.cameras != null) {
                    if (glTFNode.cameras.length > 0) {
                        glTFCamera = glTFNode.cameras[0];
                    } 
                }
            }
            return glTFCamera;
        }
    }

});

}})
;
//*/
montageDefine("f73ee10","runtime/mesh-resource-loader",{dependencies:["runtime/resource-loader"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet.
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

var ResourceLoader = require("runtime/resource-loader").ResourceLoader;

exports.MeshResourceLoader = Object.create(ResourceLoader, {

    meshes: { value: null, writable:true},

    fireMeshesDidLoadIfNeeded: {
        value: function() {

            var ids = Object.keys(this._trackedIds);
            if (ids) {
                if (ids.length == 0) {
                    if (this.delegate) {
                        if (this.delegate.meshesDidLoad) {
                            //FIXME: stop being an observer here
                            this.delegate.meshesDidLoad(this.meshes);
                        }
                    }
                }
            }
        }
    },

    resourceAvailable: {
        value: function(resourceId) {
            //console.log("resource available:" + resourceId);

            this._removeTrackedId(resourceId);
            this.fireMeshesDidLoadIfNeeded();
        }
    },

    //load and upload to VRAM
    _fetchResources: {
        value: function(delegate, resources, ctx) {
            var webGLContext = this.webGLRenderer.webGLContext;

            //Load images an upload texture
            var resourceIds = Object.keys(resources);
            resourceIds.forEach(function(resourceId) {
                //FIXME: handle the case of vertexBuffer who expect the resource to be passed as context
                //We want here to change the resource manager to prevent this
                //convert/resourveAvailable method of delegate should have resource has first argument
                var resource = this.webGLRenderer.resourceManager.getResource(resources[resourceId], delegate, webGLContext);
                if (resource == null) {
                    this._addTrackedId(resourceId);
                }
            }, this);
        }
    },

    _fetchAllResources: {
        value: function(resources) {
            var webGLContext = this.webGLRenderer.webGLContext;

            this._fetchResources(this.webGLRenderer.vertexAttributeBufferDelegate, resources.vertexBuffers, true);
            this._fetchResources(this.webGLRenderer.indicesDelegate, resources.allIndices);
            this._fetchResources(this.webGLRenderer.textureDelegate, resources.textures);
            this._fetchResources(this.webGLRenderer.programDelegate, resources.programs);

            //attempt a call to fireMeshesDidLoadIfNeeded just in case if nothing has to be fetched.
            //this might be more efficient to not go through the callback and return a bool here.
            this.fireMeshesDidLoadIfNeeded();
        }
    },

    _trackProgramsFromMaterial: {
        value: function(material, programs) {
            var technique = material.technique;
            if (technique) {
                for (var passId in technique.passes) {
                    var pass = technique.passes[passId];
                    var instanceProgram = pass.instanceProgram;
                    if (instanceProgram) {
                        programs[instanceProgram.program.id] = instanceProgram.program;
                        this._addTrackedId(instanceProgram.program.id);
                    }
                }
            }
        }
    },

    _trackTexturesFromMaterial: {
        value: function(material, textures) {
            var parameters = material.parameters;
            if (parameters) {
                var parametersKeys = Object.keys(parameters);
                if (parametersKeys.length > 0) {
                    parametersKeys.forEach(function(parameterKey) {
                        var parameter = parameters[parameterKey];
                        if (parameter) {
                            if (parameter.value) {
                                var value = parameter.value;
                                if ((value.type === "texture")) {
                                    textures[value.id] = value;
                                    this._addTrackedId(value.id);
                                }
                            }
                        }
                    }, this);
                }
            }
        }
    },


    _trackIndicesFromPrimitive: {
        value: function(primitive, allIndices) {
            var indices = primitive.indices;
            allIndices[indices.id] = indices;
            this._addTrackedId(indices.id);
        }
    },

    _trackVertexBuffersFromPrimitive: {
        value: function(primitive, vertexBuffers) {
            for (var semantic in primitive.semantics) {
                var vertexBuffer = primitive.semantics[semantic];
                vertexBuffers[vertexBuffer.id] = vertexBuffer;
                this._addTrackedId(vertexBuffer.id);
            }
        }
    },

    _trackMesh: {
        value: function(mesh, resources, webGLRenderer) {

            mesh.primitives.forEach( function(primitive) {
                this._trackTexturesFromMaterial(primitive.material, resources.textures);
                this._trackIndicesFromPrimitive(primitive, resources.allIndices);
                this._trackVertexBuffersFromPrimitive(primitive, resources.vertexBuffers);
                this._trackProgramsFromMaterial(primitive.material, resources.programs);

            }, this);

        }
    },

    _trackMeshes: {
        value: function(resources) {
            this.meshes.forEach( function(mesh) {
                this._trackMesh(mesh, resources, this.webGLRenderer);
            }, this);
        }
    },

    loadMeshes: {
        value: function() {
            var resources = {};
            //+ animations ? maybe not required in the pass of this
            //+ programs

            resources.textures = {};
            resources.allIndices = {};
            resources.vertexBuffers = {};
            resources.programs = {};

            this._trackMeshes(resources);
            this._fetchAllResources(resources, this.webGLRenderer);
        }
    },

    init: {
        value: function(meshes, webGLRenderer, delegate) {
            this.delegate = delegate;
            this.webGLRenderer = webGLRenderer;
            this.meshes = meshes;
            webGLRenderer.resourceManager.observers.push(this);
            return this;
        }
    }

});

}})
;
//*/
montageDefine("a5f257c","ui/main.reel/main.html",{text:'<!DOCTYPE html><html><head>\n    <meta http-equiv=content-type content="text/html; charset=utf-8">\n    <title>Main</title>\n\n    <link rel=stylesheet type=text/css href=main.css>\n\n    <script type=text/montage-serialization>\n        {\n            "owner": {\n                "properties": {\n                    "element": {"#": "main"}\n                },\n                "bindings": {\n                    "status": {\n                        "<-": "@scene.status"\n                    }\n                }\n            },\n\n			"sceneView": {\n				"prototype": "mjs-volume/ui/scene-view.reel",\n				"properties": {\n					"element": { "#": "sceneView" },\n					"scene": { "@": "scene" }\n				}\n			},\n\n			"scene": {\n				"prototype": "mjs-volume/runtime/scene",\n				"properties": {\n					"path": "/assets/3d/SwissArmyKnife.json"\n				}\n			},\n\n			"Bottle_Opener": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID23",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'bottle\')": { "<-":"true"},\n				 	"classList.has(\'bottle-openR\')": { "<-": "@Bottle_Opener_radio.checked" }\n				 }\n			},\n\n			"Small_Blade": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID15",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'bottle\')": { "<-":"true"},\n				 	"classList.has(\'bottle-openR\')": { "<-": "@Small_Blade_radio.checked" }\n				 }\n			},\n\n			"Saw": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID97",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'bottle\')": { "<-":"true"},\n				 	"classList.has(\'bottle-openR\')": { "<-": "@Saw_radio.checked" }\n				 }\n			},\n\n			"Can_Opener": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID31",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'can_opener\')": { "<-":"true"},\n				 	"classList.has(\'blade-openL\')": { "<-": "@Can_Opener_radio.checked" }\n				 }\n			},\n\n			"Awl": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID89",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'awl\')": { "<-":"true"},\n				 	"classList.has(\'awl-open\')": { "<-": "@Awl_radio.checked" }\n				 }\n			},\n\n			"Tweezers": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID153",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'tweezer-slide\')": { "<-": "@Tweezer_radio.checked" }\n				 }\n			},\n\n			"BLADE_MAIN": {\n				"prototype": "mjs-volume/runtime/node",\n				"properties": {\n					"id": "ID5",\n					"scene": { "@": "scene" }\n				},\n				 "bindings": {\n				 	"classList.has(\'all_moving_parts\')": { "<-":"true"},\n				 	"classList.has(\'blade\')": { "<-": "true" },\n					"classList.has(\'blade-openL\')": { "<-": "@Main_Blade_radio.checked" }\n				 }\n			},\n\n\n			"RBcontroller": {\n				"prototype": "montage/core/radio-button-controller"\n			},\n			"Main_Blade_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Main_Blade_radio"},\n            		"checked": false,\n					"value": "Main Blade",\n        			"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Bottle_Opener_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Bottle_Opener_radio"},\n            		"checked": false,\n					"value": "Bottle Opener",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Small_Blade_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Small_Blade_radio"},\n            		"checked": false,\n					"value": "Small Blade",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Can_Opener_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Can_Opener_radio"},\n            		"checked": false,\n					"value": "Can Opener",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Awl_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Awl_radio"},\n            		"checked": false,\n					"value": "Can Opener",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Tweezer_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Tweezer_radio"},\n            		"checked": false,\n					"value": "Tweezer",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Saw_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Saw_radio"},\n            		"checked": false,\n					"value": "Saw",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n			"Awl_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Awl_radio"},\n            		"checked": false,\n					"value": "Awl",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			},\n\n			"Reset_All_Tools_radio": {\n				"prototype": "digit/ui/radio-button.reel",\n				"properties": {\n					"element": {"#": "Reset_All_Tools_radio"},\n            		"checked": false,\n					"value": "Reset All Tools",\n					"radioButtonController": {"@": "RBcontroller"}\n				}\n			}\n        }\n    </script>\n</head>\n<body>\n    <div data-montage-id=main data-montage-skin=light>\n    	<h1 align=center>Swiss Army Knife - Tools Demo</h1>\n    			<div align=center data-montage-id=sceneView class=scene></div>\n    			<h2>Please Select a Tool:</h2>\n    			<div align=center data-montage-id=component><strong>\n					<input type=radio data-montage-id=Main_Blade_radio> Main Blade\n					<input type=radio data-montage-id=Small_Blade_radio> Small Blade\n					<input type=radio data-montage-id=Saw_radio> Saw\n					<input type=radio data-montage-id=Tweezer_radio> Tweezers\n					<br><br>\n					<input type=radio data-montage-id=Awl_radio> Awl\n					<input type=radio data-montage-id=Bottle_Opener_radio> Bottle Opener\n					<input type=radio data-montage-id=Can_Opener_radio> Can Opener\n					</strong>\n					&nbsp;&nbsp;<input type=radio data-montage-id=Reset_All_Tools_radio> Reset All Tools\n					<br>\n				</div>\n	<a class=MontageMade href=http://montagejs.org>Made with Montage</a>\n    </div>\n\n\n\n</body></html>'});
;
//*/
montageDefine("7fd8be3","composer/composer",{dependencies:["../core/core","../core/target"],factory:function(require,exports,module){/**
 * @module montage/composer/composer
 * @requires montage/core/core
 */
var Montage = require("../core/core").Montage,
    Target = require("../core/target").Target;

/**
 * The `Composer` helps to keep event normalization and calculation out of
 * specific `Component`s and in a reusable place. For example, the
 * `TranslateComposer` handles listening to different mouse and touch events
 * that represent dragging, and emits common `translate` events with helpful
 * information about the move.
 *
 * Specific composersshould specialize this `Composer` class and implement the
 * `load` and `unload` methods to attach and remove their event listeners.
 * Subclasses can also implement `frame` if they need access to their
 * component's draw cycle.
 *
 * @classdesc Abstracts a pattern of DOM events, emitting more useful,
 * higher-level events.
 * @class Composer
 * @extends Target
 */
exports.Composer = Target.specialize( /** @lends Composer# */ {

    _component: {
        value: null
    },

    /**
     * The Montage `Component` this `Composer` is attached to. Each composer is
     * attached to a single component. By default, most composer will listen to
     * DOM events on this component's element. This is also the component whose
     * draw cycle is affected by `needsFrame` and `frame`.
     * @type {Component}
     * @default null
     */
    component: {
        get: function() {
            return this._component;
        },
        set: function(component) {
            this._component = component;
        }
    },

    _element: {
        value: null
    },

    /**
     * The DOM element where the composer will listen for events. If no element
     * is specified then the composer will use the element associated with its
     * `component` property.
     *
     * Subclasses may want to set their `element` to something other than the
     * component's element during `load` for certain event patterns. One common
     * pattern is to set element to `window` to listen for events anywhere on
     * the page.
     * @type {Element}
     * @default null
     */
    element: {
        get: function() {
            return this._element;
        },
        set: function(element) {
            this._element = element;
        }
    },


    /**
     * This property controls when the component will call this composer's
     * `load` method, which is where the composer adds its event listeners:
     *
     * - If `false`, the component will call `load` during the next draw cycle
     *   after the composer is added to it.
     * - If `true`, the component will call `load` after its
     *   `prepareForActivationEvents`.
     *
     * Delaying the creation of event listeners can improve performance.
     * @default false
     */
    lazyLoad: {
        value: false
    },

    _needsFrame: {
        value: false
    },

    /**
     * This property should be set to 'true' when the composer wants to have
     * its `frame()` method executed during the next draw cycle. Setting this
     * property to 'true' will cause Montage to schedule a new draw cycle if
     * one has not already been scheduled.
     * @type {boolean}
     * @default false
     */
    needsFrame: {
        set: function(value) {
            if (this._needsFrame !== value) {
                this._needsFrame = value;
                if (this._component) {
                    if (value) {
                        this._component.scheduleComposer(this);
                    }
                }
            }
        },
        get: function() {
            return this._needsFrame;
        }
    },

    /**
     * This method will be invoked by the framework at the beginning of a draw
     * cycle. This is where a composer may implement its update logic if it
     * needs to respond to draws by its component.
     * @method
     * @param {Date} timestamp The time that the draw cycle started
     */
    frame: {
        value: function(timestamp) {

        }
    },


    /**
     * Invoked by the framework to default the composer's element to the
     * component's element if necessary.
     * @private
     */
    _resolveDefaults: {
        value: function() {
            if (this.element == null && this.component != null) {
                this.element = this.component.element;
            }
        }
    },

    /**
     * Invoked by the framework to load this composer.
     * @private
     */
    _load: {
        value: function() {
            if (!this.element) {
                this._resolveDefaults();
            }
            this.load();
        }
    },

    /**
     * The component calls `load` on its composers when they should initialize
     * themselves. Exactly when this happens is controlled by the composer's
     * `lazyLoad` property.
     *
     * Subclasses should override `load` with their DOM initialization. Most
     * composers attach DOM event listeners to `this.element` in `load`.
     *
     * @method
     */
    load: {
        value: function() {

        }
    },

    /**
     * The `component` will call `unload` when the composer is removed from the
     * component or the component is removed.
     *
     * Subclasses should override `unload` to do any necessary cleanup, such as
     * removing event listeners.
     *
     * @method
     */
    unload: {
        value: function() {

        }
    },

    /**
     * Called when a composer is part of a template serialization. It's
     * responsible for calling `addComposer` on the component.
     * @private
     */
    deserializedFromTemplate: {
        value: function() {
            if (this.component) {
                this.component.addComposer(this);
            }
        }
    }

});

}})
;
//*/
montageDefine("7fd8be3","ui/base/abstract-radio-button",{dependencies:["../../core/core","./abstract-control","../../composer/press-composer","../../composer/key-composer","collections/dict"],factory:function(require,exports,module){/*global require, exports, document, Error*/
var Montage = require("../../core/core").Montage,
    AbstractControl = require("./abstract-control").AbstractControl,
    PressComposer = require("../../composer/press-composer").PressComposer,
    KeyComposer = require("../../composer/key-composer").KeyComposer,
    Dict = require("collections/dict");

var CLASS_PREFIX = "montage-RadioButton";

/**
 * @class AbstractRadioButton
 * @classdesc Provides common implementation details for radio buttons.
 * @extends AbstractControl
 */
var AbstractRadioButton = exports.AbstractRadioButton = AbstractControl.specialize(
    /** @lends AbstractRadioButton# */
{

    /**
     * Dispatched when the radio button is activated through a mouse click,
     * finger tap, or when focused and the spacebar is pressed.
     * @event action
     * @memberof AbstractRadioButton
     * @param {Event} event
     */

    constructor: {
        value: function AbstractRadioButton() {
            if(this.constructor === AbstractRadioButton) {
                throw new Error("AbstractRadioButton cannot be instantiated.");
            }
            AbstractControl.constructor.call(this); // super
            this._pressComposer = new PressComposer();
            this.addComposer(this._pressComposer);

            this._keyComposer = new KeyComposer();
            this._keyComposer.component = this;
            this._keyComposer.keys = "space";
            this.addComposer(this._keyComposer);

            this.defineBindings({
                // classList management
                "classList.has('montage--disabled')": {
                    "<-": "!enabled"
                },
                "classList.has('montage--active')": {
                    "<-": "active"
                },
                "classList.has('montage-RadioButton--checked')": {
                    "<-": "checked"
                }
            });
        }
    },

    /**
     * Whether the user is pressing the radio button.
     * @type {boolean}
     */
    active: {
        value: false
    },

    _checked: {
        value: null
    },

    /**
     * Whether this radio button is checked.
     * @type {boolean}
     */
    checked: {
        set: function(value) {
            this._checked = value;
        },
        get: function() {
            return this._checked;
        }
    },

    /**
     * Whether this radio button is enabled.
     * @type {boolean}
     */
    enabled: {
        value: true
    },

    _keyComposer: {
        value: null
    },

    _radioButtonController: {
        value: null
    },

    /**
     * The radio button controller that ensures that only one radio button in
     * its `content` is `checked` at any time.
     * @type {RadioButtonController}
     */
    radioButtonController: {
        set: function(value) {
            if (this._radioButtonController) {
                this._radioButtonController.unregisterRadioButton(this);
            }
            this._radioButtonController = value;
            value.registerRadioButton(this);
        },
        get: function() {
            return this._radioButtonController;
        }
    },

    _pressComposer: {
        value: null
    },

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                this.element.setAttribute("role", "radio");
                this._keyComposer.addEventListener("keyPress", this, false);
                this._keyComposer.addEventListener("keyRelease", this, false);
            }
        }
    },

    draw: {
        value: function() {
            if (this.checked) {
                this.element.setAttribute("aria-checked", "true");
            } else {
                this.element.setAttribute("aria-checked", "false");
            }
        }
    },

    handlePressStart: {
        value: function(event) {
            this.active = true;

            if (event.touch) {
                // Prevent default on touchmove so that if we are inside a scroller,
                // it scrolls and not the webpage
                document.addEventListener("touchmove", this, false);
            }
        }
    },

    check: {
        value: function() {
            if (!this.enabled || this.checked) {
                return;
            }

            this.dispatchActionEvent();
            this.checked = true;
        }
    },

    /**
     Handle press event from press composer
     */
    handlePress: {
        value: function(/* event */) {
            this.active = false;
            this.check();
        }
    },

    /**
     Called when all interaction is over.
     @private
     */
    handlePressCancel: {
        value: function(/* event */) {
            this.active = false;
            document.removeEventListener("touchmove", this, false);
        }
    },

    handleKeyPress: {
        value: function() {
            this.active = true;
        }
    },

    handleKeyRelease: {
        value: function() {
            this.active = false;
            this.check();
        }
    },

    prepareForActivationEvents: {
        value: function() {
            this._pressComposer.addEventListener("pressStart", this, false);
            this._pressComposer.addEventListener("press", this, false);
            this._pressComposer.addEventListener("pressCancel", this, false);
        }
    },

    activate: {
        value: function() {
            this.check();
        }
    }
});

}})
;
//*/
montageDefine("f73ee10","runtime/skin",{dependencies:["runtime/dependencies/gl-matrix","runtime/base","runtime/transform","runtime/utilities"],factory:function(require,exports,module){// Copyright (c) 2013,Fabrice Robinet.
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

exports.Skin = Object.create(Object.prototype, {

    jointsIds: { value: null, writable: true },

    nodesForSkeleton: { value: null, writable: true },

    bindShapeMatrix: { value: null, writable: true },

    inverseBindMatricesDescription: { value: null, writable: true },

    matricesForSkeleton:  { value: null, writable: true },

    sources:  { value: null, writable: true },

    init: {
        value: function() {
            this.jointsIds = [];
            this.nodesForSkeleton = {};
            this.matricesForSkeleton = {};
            this.sources = [];
            return this;
        }
    },

    inverseBindMatricesDelegate: {
        value: {
            handleError: function(errorCode, info) {
                console.log("ERROR:vertexAttributeBufferDelegate:"+errorCode+" :"+info);
            },

            convert: function (source, resource, ctx) {
                return new Float32Array(resource);
            },

            resourceAvailable: function (glResource, ctx) {
            }
        }
    },

    process: {
        value: function(node, resourceManager) {
            var skeletons = node.instanceSkin.skeletons;
            var objectSpace = mat4.create();
            mat4.inverse(node.worldMatrix, objectSpace);

            skeletons.forEach(function(skeleton) {
                var nodes = this.nodesForSkeleton[skeleton];
                var matrices = this.matricesForSkeleton[skeleton];
                if (!matrices) {
                    var length = 16 * this.jointsIds.length;
                    matrices = new Float32Array(length);
                    this.matricesForSkeleton[skeleton] = matrices;
                    var identity = mat4.identity();
                    for (var i = 0 ; i < length ; i++) {
                        matrices[i] = identity[i % 16];
                    }
                }
                var inverseBindMatrices = resourceManager.getResource(this.inverseBindMatricesDescription, this.inverseBindMatricesDelegate);
                if (inverseBindMatrices) {
                    this.sources.forEach(function(source) {
                        //FIXME: assume mesh here but it could be morph (later..)
                        var mesh = source;

                        var BSM = this.bindShapeMatrix;
                        var jointsCount = this.jointsIds.length;
                        var IBM = mat4.create();
                        for (var i = 0; i < jointsCount ; i++) {
                            for (var j = 0; j < 16 ; j++) {
                                IBM[j] = inverseBindMatrices[(i * 16) + j];
                            }

                            var JM = nodes[i].worldMatrix;
                            var destMat = mat4.identity();
                            mat4.multiply(destMat, objectSpace);
                            mat4.multiply(destMat, JM);
                            mat4.multiply(destMat, IBM);
                            mat4.multiply(destMat, BSM);
                            for (var j = 0; j < 16 ; j++) {
                                matrices[(i*16)+j] = destMat[j];
                            }
                        }

                        mesh.primitives.forEach(function(primitive) {
                            if (primitive.material.parameters) {
                                primitive.material.parameters["jointMat"].value = matrices;
                            }
                        }, this)
                    }, this);
                }
            }, this);
        }
    }

});

}})
;
//*/
montageDefine("f73ee10","runtime/transform-helper",{dependencies:["runtime/dependencies/gl-matrix","runtime/base","runtime/utilities"],factory:function(require,exports,module){// Copyright (c) Fabrice ROBINET
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

}})
;
//*/
montageDefine("f73ee10","runtime/mesh",{dependencies:["runtime/dependencies/gl-matrix","runtime/base","runtime/utilities"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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
var Base = require("runtime/base").Base;
var Utilities = require("runtime/utilities").Utilities;

exports.Mesh = Object.create(Base, {

    PRIMITIVES: { value: "primitives" },

    _primitives: {
        value: null,
        writable: true
    },

    primitives: {
        enumerable: true,
        get: function() {
            return this._primitives;
        },
        set: function(value) {
            this._primitives = value;
        }
    },

    //theses 2 propreties are just for the demo...
    step: { value: 0, writable:true },
    loadedPrimitivesCount: { value: 0, writable:true },

    loaded: {
        get: function() {
            return (this.loadedPrimitivesCount === this.primitives.length);
        }
    },

    _id: {
        value: null,
        writable: true
    },

    id: {
        enumerable: true,
        get: function() {
            return this._id;
        },
        set: function(value) {
            this._id = value;
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
    },

    _computeBBOXIfNeeded: {
        enumerable: false,
        value: function() {
            if ( (!this._boundingBox) && this.primitives) {
                var count = this.primitives.length;
                if (count > 0) {
                    var bbox = this.primitives[0].boundingBox;
                    if (bbox) {
                        var i;
                        for (i = 1 ; i <  count ; i++) {
                            if (this.primitives[i].boundingBox) { //it could be not here here as we are loading everything asynchronously
                                bbox = Utilities.mergeBBox(bbox, this.primitives[i].boundingBox);
                            }
                        }
                        this._boundingBox = bbox;
                    }
                }
            }
        }
    },

    _boundingBox: {
        value: null,
        writable: true
    },

    boundingBox: {
        enumerable: true,
        get: function() {
            this._computeBBOXIfNeeded();
            return this._boundingBox;
        },
        // we let the possibility to override by hand the bounding volume.
        set: function(value) {
            this._boundingBox = value;
        }
    },

    init: {
        value: function() {
            this.__Base_init();
            this._primitives = [];
            return this;
        }
    }
});

}})
;
//*/
montageDefine("f73ee10","runtime/primitive",{dependencies:["runtime/dependencies/gl-matrix","runtime/utilities"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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
var Utilities = require("runtime/utilities").Utilities;

exports.Primitive = Object.create(Object.prototype, {

    _attributesCount: {
        enumerable: false,
        value: 0,
        writable: true
    },

    attributesCount : {
        enumerable: false,
        get: function() {
            return this._attributesCount;
        }
    },

    init: {
        value: function() {
            this.step = 0;
            this.semantics = {};
            return this;
        }
    },

    _semantics: {
        enumerable: false,
        value: null,
        writable: true
    },

    semantics: {
        enumerable: true,
        get: function() {
            return this._semantics;
        },
        set: function(value) {
            this._semantics = value;
        }
    },

    //since semantics/set got simplified we should get rid of this eventually
    addVertexAttribute: {
        enumerable: false,
        value: function(vertexAttribute) {
            if (vertexAttribute.semantic === "POSITION") {
                var bbox = null;
                var accessor = vertexAttribute.attribute;
                if (accessor.min && accessor.max) {
                    bbox = [ accessor.min, accessor.max];
                }
                this.boundingBox = bbox;
            }

            if (!this.semantics[vertexAttribute.semantics]) {
                this.semantics[vertexAttribute.semantic] = vertexAttribute.attribute;
                this._attributesCount++;
            }
        }
    },

    _computeBBOXIfNeeded: {
        enumerable: false,
        value: function() {
        }
    },

    _boundingBox: {
        value: null,
        writable: true
    },

    boundingBox: {
        enumerable: true,
        get: function() {
            this._computeBBOXIfNeeded();
            return this._boundingBox;
        },
        // we let the possibility to override by hand the bounding volume.
        set: function(value) {
            this._boundingBox = value;
        }
    },

    _indices: { enumerable: false, value: null, writable: true },

    indices: {
        get: function() {
            return this._indices;
        },
        set: function(value) {
            this._indices = value;
        }
    },

    _material: { enumerable: false, value: null, writable: true },

    material: {
        get: function() {
            return this._material;
        },
        set: function(value) {
            this._material = value;
        }
    }

});

}})
;
//*/
montageDefine("7fd8be3","core/radio-button-controller",{dependencies:["./core","./range-controller"],factory:function(require,exports,module){
var Montage = require("./core").Montage,
    RangeController = require("./range-controller").RangeController;

/**
 * The radio button controller intermediates between a set of options and their
 * visual representation as radio buttons. The controller maintains the
 * invariant that only one radio button at a time may be selected and provides
 * a value property with the currently-selected option.
 *
 * @class RadioButtonController
 * @classdesc Manages the selection of mutually-exclusive [RadioButton]{@link
 * AbstractRadioButton}s.
 * @extends Montage
 */
exports.RadioButtonController = Montage.specialize(/** @lends RadioButtonController# */ {

    _radioButtons: {
        value: null
    },

    _content: {
        value: null
    },

    /**
     * The list of possible options.
     * @type Array.<Object>
     */
    content: {
        get: function () {
            return this.getPath("contentController.content");
        },
        set: function (content) {
            this.contentController = new RangeController()
                .initWithContent(content);
        }
    },

    contentController: {
        value: null
    },

    /**
     * The radio button component corresponding to the currently-selected option.
     * @type {?Component}
     */
    selectedRadioButton: {
        value: null
    },

    _value: {
        value: null
    },

    /**
     * The currently-selected option.
    */
    value: {
        set: function(value) {
            if (this._value !== value) {
                this._value = value;
                this._updateRadioButtons();
            }
        },
        get: function() {
            return this._value;
        }
    },

    constructor: {
        value: function RadioButtonController() {
            this._radioButtons = [];

            this.addRangeAtPathChangeListener("_radioButtons.map{checked}", this, "handleRadioButtonChange");
            this.defineBinding("value ", {
                "<->": "contentController.selection.0"
            });
        }
    },

    _updateRadioButtons: {
        value: function() {
            var value = this._value;

            for (var i = 0, ii = this._radioButtons.length; i < ii; i++) {
                if (value === this._radioButtons[i].value) {
                    this._radioButtons[i].checked = true;
                    break;
                }
            }
        }
    },

    /**
     * Add a radio button to be managed by this controller.
     * @method
     * @param {RadioButton} radioButton
     * @returns {undefined}
     */
    registerRadioButton: {
        value: function(radioButton) {
            if (this._radioButtons.indexOf(radioButton) === -1) {
                this._radioButtons.push(radioButton);
                this._updateRadioButtons();
            }
        }
    },

    /**
     * Remove a radio button from being managed by this controller.
     * @method
     * @param {RadioButton} radioButton
     * @returns {undefined}
     */
    unregisterRadioButton: {
        value: function(radioButton) {
            var ix = this._radioButtons.indexOf(radioButton);
            if (ix >= 0) {
                this._radioButtons.splice(ix, 1);
                if (radioButton === this.selectedRadioButton) {
                    this.selectedRadioButton = null;
                }
            }
        }
    },

    handleRadioButtonChange: {
        value: function(plus, minus, index) {
            if (plus[0] === true) {
                for (var i = 0, ii = this._radioButtons.length; i < ii; i++) {
                    if (i === index) {
                        this.selectedRadioButton = this._radioButtons[i];
                        this.value = this.selectedRadioButton.value;
                    } else {
                        this._radioButtons[i].checked = false;
                    }
                }
            }
        }
    }

}, /** @lends RadioButtonController. */ {

    blueprintModuleId:require("./core")._blueprintModuleIdDescriptor,

    blueprint:require("./core")._blueprintDescriptor

});


}})
;
//*/
montageDefine("f73ee10","runtime/action-dispatcher",{dependencies:["montage/core/event/event-manager","montage"],factory:function(require,exports,module){var defaultEventManager = require("montage/core/event/event-manager").defaultEventManager,
    Montage = require("montage").Montage,

    COMPONENT_ACTION_TO_EVENT_TYPE = {
        COMPONENT_ENTER: "hover",
        _TOUCH_DOWN: "action"
    };

exports.ActionDispatcher = Montage.specialize({

    constructor: {
        value: function () {
            this.super();
        }
    },

    _scene: {
        value: null
    },

    initWithScene: {
        value: function (scene) {
            this._scene = scene;
            return this;
        }
    },

    /**
     * Returns the "hierarchical 3D tree" from a glTFElement.
     * @function
     * @private
     * @param {Object} glTFElement - a glTFElement => (leaf level).
     * @param {Array} [path] - the container of glTFElement parents.
     * @return {Array} an array of glTFElement parents to the glTFElement child.
     */
    _findPathToParentsForGlTFElement: {
        value: function (glTFElement, path) {
            if (!Array.isArray(path)) {
                path = [glTFElement];
            }

            if (glTFElement && glTFElement.parent) {
                var parent = glTFElement.parent;
                path.push(parent);

                return this._findPathToParentsForGlTFElement(parent, path);
            }

            return path;
        }
    },

    /**
     * Tries to find whether a listener has been registered for an eventType on a Component3D.
     * @function
     * @private
     * @param {String} action - a "Component Action".
     * @param {Object} component - a component which could be a target.
     * @return {Boolean}
     */
    _isRegisteredListenersForEventTypeOnComponent: {
        value: function (action, component) {
            var eventType = COMPONENT_ACTION_TO_EVENT_TYPE[action];

            if (defaultEventManager && eventType && component.uuid) {
                var registeredListenersForAction = defaultEventManager.registeredEventListeners[eventType];

                if (registeredListenersForAction) {
                    return !!registeredListenersForAction[component.uuid];
                }
            }

            return false;
        }
    },

    /**
     * Tries to find whether a Component3D has a css selector for an eventType.
     * @private
     * @param {String} action - a "Component Action".
     * @param {Object} component - a component which could be a target.
     * @return {Boolean}
     */
    _isComponentStyleRespondToAction: {
        value: function (action, component) {
            var eventType = COMPONENT_ACTION_TO_EVENT_TYPE[action],
                style = component._style;

            return eventType && eventType !== COMPONENT_ACTION_TO_EVENT_TYPE._TOUCH_DOWN &&
                style && typeof style === "object" && style.hasOwnProperty(eventType);
        }
    },

    /**
     * Dispatches an action through the "3D Components tree",
     * until it founds a Component 3D that is listening to this action.
     * @function
     * @public
     * @param {String} action - a "Component Action".
     * @param {Object} glTFElement - a glTFElement that has raised an action.
     */
    dispatchActionOnGlTFElement: {
        value: function(action, glTFElement) {
            if (typeof action === "string" && glTFElement && typeof glTFElement === "object") {
                var pathToParents = this._findPathToParentsForGlTFElement(glTFElement),
                    self = this;

                pathToParents.some(function (element) {
                    var component = element.component3D;

                    if (component && (self._isRegisteredListenersForEventTypeOnComponent(action, component) ||
                        self._isComponentStyleRespondToAction(action, component))) {

                        component.handleActionOnGlTFElement(glTFElement, action);

                        return true;
                    }

                    return false;
                });
            }
        }
    }

});

}})
;
//*/
montageDefine("f73ee10","runtime/node-wrapper",{dependencies:["runtime/dependencies/gl-matrix","runtime/utilities","runtime/transform-helper"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet.
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


}})
;
//*/
montageDefine("f73ee10","runtime/scene-resource-loader",{dependencies:["runtime/resource-loader","runtime/mesh-resource-loader"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet.
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

var ResourceLoader = require("runtime/resource-loader").ResourceLoader;
var MeshResourceLoader = require("runtime/mesh-resource-loader").MeshResourceLoader;

exports.SceneResourceLoader = Object.create(ResourceLoader, {

    _scene: { value:null, writable: true },

    scene: {
        get: function() {
            return this._scene;
        },
        set: function(value) {
            this._scene = value;
        }
    },

    meshesDidLoad: {
        value: function() {
            if (this.delegate) {
                this.delegate.sceneResourcesDidPrepare(this.scene);
            }
        }
    },

    loadScene: {
        value: function() {
            var self = this;
            if (this.scene) {
                var node = this.scene.rootNode;
                var meshes = {};
                var meshesSet = [];
                node.apply( function(node, parent, parentTransform) {
                    if (node.meshes) {
                        if (node.meshes.length) {
                            node.meshes.forEach( function(mesh) {
                                if (meshes[mesh.id] == null) {
                                    meshesSet.push(mesh);
                                    meshes[mesh.id] = mesh;
                                }
                            }, this);
                        }
                    }
                    return null;
                }, true, null);

                var meshResourceLoader = Object.create(MeshResourceLoader).init(meshesSet, self.webGLRenderer, this);
                meshResourceLoader.loadMeshes();
            }
        }
    },

    init: {
        value: function(scene, webGLRenderer, delegate) {
            if (delegate)
                this.delegate = delegate;
            this.webGLRenderer = webGLRenderer;
            this.scene = scene;
            webGLRenderer.resourceManager.observers.push(this);
            return this;
        }
    }

});

}})
;
//*/
montageDefine("f73ee10","runtime/resource-description",{dependencies:[],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

var global = window;

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        factory(module.exports);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return factory(root);
        });
    } else {
        // Browser globals
        factory(root);
    }
}(this, function (root) {
     var ResourceDescription = Object.create(Object.prototype, {

        _description: { value: null, writable: true },

        _id: { value: null, writable: true },

        _type: { value: null, writable: true },

        init: {
            enumerable: true,
            value: function(id, description) {
                this._id = id;
                this._description = description;
                return this;
            }
        },

        description: {
            enumerable: true,
            get: function() {
                return this._description;
            }
        },

        id: {
            enumerable: true,
            get: function() {
                return this._id;
            },
            set: function(value) {
                this._id = value;
            }
        },

        type: {
            enumerable: true,
            get: function() {
                return this._type;
            },
            set: function(value) {
                this._type = value;
            }
        }

    });
 
   if(root) {
        root.ResourceDescription = ResourceDescription;
    }

    return ResourceDescription;

}));
}})
;
//*/
montageDefine("f73ee10","runtime/builtin-assets",{dependencies:["q","runtime/runtime-tf-loader"],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet.
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

}})
;
//*/
montageDefine("6532fb5","querystring",{dependencies:[],factory:function(require,exports,module){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// Query String Utilities

(typeof define === "undefined" ? function($) { $(require, exports, module) } : define)(function(require, exports, module, undefined) {
"use strict";

var QueryString = exports;

function charCode(c) {
  return c.charCodeAt(0);
}

QueryString.unescape = decodeURIComponent;
QueryString.escape = encodeURIComponent;

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};


QueryString.stringify = QueryString.encode = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  obj = (obj === null) ? undefined : obj;

  switch (typeof obj) {
    case 'object':
      return Object.keys(obj).map(function(k) {
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return QueryString.escape(stringifyPrimitive(k)) +
                   eq +
                   QueryString.escape(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return QueryString.escape(stringifyPrimitive(k)) +
                 eq +
                 QueryString.escape(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    default:
      if (!name) return '';
      return QueryString.escape(stringifyPrimitive(name)) + eq +
             QueryString.escape(stringifyPrimitive(obj));
  }
};

// Parse a key=val string.
QueryString.parse = QueryString.decode = function(qs, sep, eq) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  qs.split(sep).forEach(function(kvp) {
    var x = kvp.split(eq);
    var k = QueryString.unescape(x[0], true);
    var v = QueryString.unescape(x.slice(1).join(eq), true);

    if (!(k in obj)) {
      obj[k] = v;
    } else if (!Array.isArray(obj[k])) {
      obj[k] = [obj[k], v];
    } else {
      obj[k].push(v);
    }
  });

  return obj;
};

});

}})
;
//*/
montageDefine("f73ee10","runtime/technique",{dependencies:["runtime/base"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

var Base = require("runtime/base").Base;

exports.Technique = Object.create(Base, {

    _parameters: { value: null, writable: true },

    _passName: { value: null, writable: true },

    _passes: { value: null, writable: true },

    init: {
        value: function() {
            this.__Base_init();
            this.passes = {};
            return this;
        }
    },

    parameters: {
        get: function() {
            return this._parameters;
        },
        set: function(value) {
            this._parameters = value;
        }
    },

    passName: {
        get: function() {
            return this._passName;
        },
        set: function(value) {
            if (this._passName != value) {
                this._passName = value;
            }
        }
    },

    rootPass: {
        get: function() {
            return this._passes[this.passName];
        }
    },

    passesDidChange: {
        value: function() {
            //update the @pass when passes is changed.
            //For convenience set to null if there are multiple passes or to the only pass contained when there is just a single one.
            var passesNames = Object.keys(this.passes);
            this.passName = (passesNames.length == 1) ? passesNames[0] : null;
        }
    },

    passes: {
        get: function() {
            return this._passes;
        },
        set: function(value) {
            if (this._passes != value) {
                this._passes = value;
                this.passesDidChange();
            }
        }
    },

    execute: {
        value: function(webGLRenderer, time, options) {
            webGLRenderer.resetStates();
            this.rootPass.execute(webGLRenderer, time, options);
        }
    }

});


}})
;
//*/
montageDefine("f73ee10","runtime/resource-loader",{dependencies:[],factory:function(require,exports,module){// Copyright (c) 2013, Fabrice Robinet.
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

}})
;
//*/
montageDefine("e76622a","lib/clone",{dependencies:["./CSSStyleSheet","./CSSStyleRule","./CSSMediaRule","./CSSStyleDeclaration","./CSSKeyframeRule","./CSSKeyframesRule"],factory:function(require,exports,module){//.CommonJS
var CSSOM = {
	CSSStyleSheet: require("./CSSStyleSheet").CSSStyleSheet,
	CSSStyleRule: require("./CSSStyleRule").CSSStyleRule,
	CSSMediaRule: require("./CSSMediaRule").CSSMediaRule,
	CSSStyleDeclaration: require("./CSSStyleDeclaration").CSSStyleDeclaration,
	CSSKeyframeRule: require('./CSSKeyframeRule').CSSKeyframeRule,
	CSSKeyframesRule: require('./CSSKeyframesRule').CSSKeyframesRule
};
///CommonJS


/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet|CSSOM.CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSOM.CSSStyleSheet}
 */
CSSOM.clone = function clone(stylesheet) {

	var cloned = new CSSOM.CSSStyleSheet;

	var rules = stylesheet.cssRules;
	if (!rules) {
		return cloned;
	}

	var RULE_TYPES = {
		1: CSSOM.CSSStyleRule,
		4: CSSOM.CSSMediaRule,
		//3: CSSOM.CSSImportRule,
		//5: CSSOM.CSSFontFaceRule,
		//6: CSSOM.CSSPageRule,
		8: CSSOM.CSSKeyframesRule,
		9: CSSOM.CSSKeyframeRule
	};

	for (var i=0, rulesLength=rules.length; i < rulesLength; i++) {
		var rule = rules[i];
		var ruleClone = cloned.cssRules[i] = new RULE_TYPES[rule.type];

		var style = rule.style;
		if (style) {
			var styleClone = ruleClone.style = new CSSOM.CSSStyleDeclaration;
			for (var j=0, styleLength=style.length; j < styleLength; j++) {
				var name = styleClone[j] = style[j];
				styleClone[name] = style[name];
				styleClone._importants[name] = style.getPropertyPriority(name);
			}
			styleClone.length = style.length;
		}

		if (rule.hasOwnProperty('keyText')) {
			ruleClone.keyText = rule.keyText;
		}

		if (rule.hasOwnProperty('selectorText')) {
			ruleClone.selectorText = rule.selectorText;
		}

		if (rule.hasOwnProperty('mediaText')) {
			ruleClone.mediaText = rule.mediaText;
		}

		if (rule.hasOwnProperty('cssRules')) {
			ruleClone.cssRules = clone(rule).cssRules;
		}
	}

	return cloned;

};

//.CommonJS
exports.clone = CSSOM.clone;
///CommonJS

}})
;
//*/
montageDefine("f73ee10","runtime/camera",{dependencies:["runtime/base"],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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

var Base = require("runtime/base").Base;

exports.Camera = Object.create(Base, {

    _projection: { value: null, writable: true },

    projection: {
        get: function() {
            return this._projection;
        },
        set: function(value) {
            this._projection = value;
        }
    },

    init: {
        value: function() {
            this.__Base_init();
            return this;
        }
    }

});


}})
;
//*/
montageDefine("f73ee10","runtime/base",{dependencies:[],factory:function(require,exports,module){// Copyright (c) 2012, Motorola Mobility, Inc.
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
exports.Base = Object.create(Object.prototype, {

    _properties: { value: null, writable: true },

    properties: {
        get: function() {
            return this._properties;
        },
        set: function(value) {
            this._properties = value;
        }
    },

    __Base_init: {
        value: function() {
            this._properties = {};
        }
    }

});

}})
;
//*/
montageDefine("7fd8be3","ui/base/abstract-control",{dependencies:["../../core/core","../component","collections/dict"],factory:function(require,exports,module){/*global require, exports, document, Error*/
var Montage = require("../../core/core").Montage,
    Component = require("../component").Component,
    Dict = require("collections/dict");

/**
 * @class AbstractControl
 * @classdesc A basis for common behavior of control components.
 * @extends Component
 */
exports.AbstractControl = Component.specialize( /** @lends AbstractControl# */ {

    dispatchActionEvent: {
        value: function() {
            return this.dispatchEvent(this.createActionEvent());
        }
    },

    _detail: {
        value: null
    },

    /**
     * The data property of the action event.
     *
     * Example to toggle the complete class: `"detail.get('selectedItem')" : {
     * "<-" : "@repetition:iteration.object"}`
     * @type {Dict}
     * @default null
     */
    detail: {
        get: function() {
            if (this._detail == null) {
                this._detail = new Dict();
            }
            return this._detail;
        }
    },

    createActionEvent: {
        value: function() {
            var actionEvent = document.createEvent("CustomEvent"),
                eventDetail;

            eventDetail = this._detail;
            actionEvent.initCustomEvent("action", true, true, eventDetail);
            return actionEvent;
        }
    }
});

}})
;
//*/
montageDefine("e76622a","lib/index",{dependencies:["./CSSStyleDeclaration","./CSSRule","./CSSStyleRule","./MediaList","./CSSMediaRule","./CSSImportRule","./CSSFontFaceRule","./StyleSheet","./CSSStyleSheet","./CSSKeyframesRule","./CSSKeyframeRule","./MatcherList","./CSSDocumentRule","./CSSValue","./CSSValueExpression","./parse","./clone"],factory:function(require,exports,module){'use strict';

exports.CSSStyleDeclaration = require('./CSSStyleDeclaration').CSSStyleDeclaration;
exports.CSSRule = require('./CSSRule').CSSRule;
exports.CSSStyleRule = require('./CSSStyleRule').CSSStyleRule;
exports.MediaList = require('./MediaList').MediaList;
exports.CSSMediaRule = require('./CSSMediaRule').CSSMediaRule;
exports.CSSImportRule = require('./CSSImportRule').CSSImportRule;
exports.CSSFontFaceRule = require('./CSSFontFaceRule').CSSFontFaceRule;
exports.StyleSheet = require('./StyleSheet').StyleSheet;
exports.CSSStyleSheet = require('./CSSStyleSheet').CSSStyleSheet;
exports.CSSKeyframesRule = require('./CSSKeyframesRule').CSSKeyframesRule;
exports.CSSKeyframeRule = require('./CSSKeyframeRule').CSSKeyframeRule;
exports.MatcherList = require('./MatcherList').MatcherList;
exports.CSSDocumentRule = require('./CSSDocumentRule').CSSDocumentRule;
exports.CSSValue = require('./CSSValue').CSSValue;
exports.CSSValueExpression = require('./CSSValueExpression').CSSValueExpression;
exports.parse = require('./parse').parse;
exports.clone = require('./clone').clone;

}})
;
//*/
montageDefine("daa4856","package.json",{exports: {"name":"punycode","version":"1.0.0","description":"A robust Punycode converter that fully complies to RFC 3492 and RFC 5891, and works on nearly all JavaScript platforms.","homepage":"http://mths.be/punycode","main":"punycode.js","keywords":["punycode","unicode","idn","url","domain"],"licenses":[{"type":"MIT","url":"http://mths.be/mit"},{"type":"GPL","url":"http://mths.be/gpl"}],"author":{"name":"Mathias Bynens","email":"mathias@qiwi.be","url":"http://mathiasbynens.be/"},"maintainers":[{"name":"wizard","email":"wizard@roborooter.com"},{"name":"mathias","email":"mathias@qiwi.be"}],"bugs":{"url":"https://github.com/bestiejs/punycode.js/issues"},"repository":{"type":"git","url":"git://github.com/bestiejs/punycode.js.git"},"engines":["node","rhino"],"directories":{"doc":"docs","test":"tests"},"_npmUser":{"name":"mathias","email":"mathias@qiwi.be"},"_id":"punycode@1.0.0","dependencies":{},"devDependencies":{},"_engineSupported":true,"_npmVersion":"1.0.106","_nodeVersion":"v0.6.8","_defaultsLoaded":true,"dist":{"shasum":"ce9e6c6e9c1db5827174fceb12ff4938700a1bd3","tarball":"http://registry.npmjs.org/punycode/-/punycode-1.0.0.tgz"},"_shasum":"ce9e6c6e9c1db5827174fceb12ff4938700a1bd3","_from":"punycode@>=1.0.0 <1.1.0","_resolved":"https://registry.npmjs.org/punycode/-/punycode-1.0.0.tgz","hash":"daa4856","mappings":{},"production":true,"useScriptInjection":true}})
;
//*/
montageDefine("f73ee10","package.json",{exports: {"name":"mjs-volume","version":"0.1.0","dependencies":{"montage":"~0.14.0","digit":"~0.5.0","matte":"~0.2.0","q":"0.9.6","native":"~0.2.0","collections":"~0.2.1","cssom":"0.3.0","url":"0.7.9"},"repository":{"type":"git","url":"https://github.com/fabrobinet/mjs-volume.git"},"readmeFilename":"README.md","description":"mjs-volume ==========","bugs":{"url":"https://github.com/fabrobinet/mjs-volume/issues"},"homepage":"https://github.com/fabrobinet/mjs-volume","_id":"mjs-volume@0.1.0","_shasum":"30d810e111a448d3b4c62a624510d7b0564af32a","_resolved":"git://github.com/fabrobinet/mjs-volume.git#da0c2ef99e56596c1aee0a8b361df25bd28a9e14","_from":"mjs-volume@git://github.com/fabrobinet/mjs-volume.git","hash":"f73ee10","mappings":{"montage":{"name":"montage","hash":"7fd8be3","location":"../montage@7fd8be3/"},"digit":{"name":"digit","hash":"2367fc9","location":"../digit@2367fc9/"},"matte":{"name":"matte","hash":"089a8f0","location":"../matte@089a8f0/"},"q":{"name":"q","hash":"daba331","location":"../q@daba331/"},"native":{"name":"native","hash":"c5e8789","location":"../native@c5e8789/"},"collections":{"name":"collections","hash":"b17cee3","location":"../collections@b17cee3/"},"cssom":{"name":"cssom","hash":"e76622a","location":"../cssom@e76622a/"},"url":{"name":"url","hash":"d3f3ee0","location":"../url@d3f3ee0/"}},"production":true,"useScriptInjection":true}})
;
//*/
montageDefine("6532fb5","package.json",{exports: {"name":"querystring","id":"querystring","version":"0.1.0","description":"Node's querystring module for all engines.","keywords":["commonjs","query","querystring"],"author":{"name":"Irakli Gozalishvili","email":"rfobic@gmail.com"},"repository":{"type":"git","url":"git://github.com/Gozala/querystring.git","web":"https://github.com/Gozala/querystring"},"bugs":{"url":"http://github.com/Gozala/querystring/issues/"},"devDependencies":{"test":">=0.4.3"},"main":"./querystring.js","engines":{"node":">=0.4.x"},"scripts":{"test":"node tests/test-querystring.js"},"_npmUser":{"name":"gozala","email":"rfobic@gmail.com"},"_id":"querystring@0.1.0","dependencies":{},"_engineSupported":true,"_npmVersion":"1.0.101","_nodeVersion":"v0.5.9","_defaultsLoaded":true,"dist":{"shasum":"cb76a26cda0a10a94163fcdb3e132827f04b7b10","tarball":"http://registry.npmjs.org/querystring/-/querystring-0.1.0.tgz"},"maintainers":[{"name":"gozala","email":"rfobic@gmail.com"}],"directories":{},"_shasum":"cb76a26cda0a10a94163fcdb3e132827f04b7b10","_from":"querystring@>=0.1.0 <0.2.0","_resolved":"https://registry.npmjs.org/querystring/-/querystring-0.1.0.tgz","homepage":"https://github.com/Gozala/querystring","hash":"6532fb5","mappings":{},"production":true,"useScriptInjection":true}})
;
//*/
montageDefine("d3f3ee0","package.json",{exports: {"author":{"name":"Joyent","url":"http://www.joyent.com"},"name":"url","description":"Node.JS url module","keywords":["ender","pakmanager","url"],"publishConfig":{"registry":"http://registry.npmjs.org"},"version":"0.7.9","homepage":"http://nodejs.org/api/url.html","repository":{"type":"git","url":"git://github.com/coolaj86/node.git"},"main":"./url.js","directories":{"lib":"."},"engines":{"node":">= 0.2.0","ender":">= 0.5.0"},"dependencies":{"querystring":">=0.1.0 <0.2.0","punycode":">=1.0.0 <1.1.0"},"devDependencies":{},"_id":"url@0.7.9","dist":{"shasum":"1959b1a8b361fc017b59513a7c7fa9827f5e4ed0","tarball":"http://registry.npmjs.org/url/-/url-0.7.9.tgz"},"maintainers":[{"name":"coolaj86","email":"coolaj86@gmail.com"}],"_shasum":"1959b1a8b361fc017b59513a7c7fa9827f5e4ed0","_from":"url@0.7.9","_resolved":"https://registry.npmjs.org/url/-/url-0.7.9.tgz","bugs":{"url":"https://github.com/coolaj86/node/issues"},"hash":"d3f3ee0","mappings":{"querystring":{"name":"querystring","hash":"6532fb5","location":"../querystring@6532fb5/"},"punycode":{"name":"punycode","hash":"daa4856","location":"../punycode@daa4856/"}},"production":true,"useScriptInjection":true}})
;
//*/
montageDefine("e76622a","package.json",{exports: {"name":"cssom","description":"CSS Object Model implementation and CSS parser","keywords":["CSS","CSSOM","parser","styleSheet"],"version":"0.3.0","homepage":"https://github.com/NV/CSSOM","author":{"name":"Nikita Vasilyev","email":"me@elv1s.ru"},"repository":{"type":"git","url":"git://github.com/NV/CSSOM.git"},"bugs":{"url":"https://github.com/NV/CSSOM/issues"},"main":"./lib/index.js","devDependencies":{"jake":"~0.7.3"},"license":{"type":"MIT","url":"http://creativecommons.org/licenses/MIT/"},"scripts":{"prepublish":"jake lib/index.js"},"readmeFilename":"README.mdown","_id":"cssom@0.3.0","dist":{"shasum":"386d5135528fe65c1ee1bc7c4e55a38854dbcf7a","tarball":"http://registry.npmjs.org/cssom/-/cssom-0.3.0.tgz"},"_resolved":"https://registry.npmjs.org/cssom/-/cssom-0.3.0.tgz","_from":"cssom@0.3.0","_npmVersion":"1.3.8","_npmUser":{"name":"domenic","email":"domenic@domenicdenicola.com"},"maintainers":[{"name":"nv","email":"me@elv1s.ru"},{"name":"domenic","email":"domenic@domenicdenicola.com"}],"directories":{},"_shasum":"386d5135528fe65c1ee1bc7c4e55a38854dbcf7a","hash":"e76622a","mappings":{},"production":true,"useScriptInjection":true}})
;
//*/
montageDefine("2367fc9","ui/radio-button.reel/radio-button",{dependencies:["montage/ui/base/abstract-radio-button"],factory:function(require,exports,module){/**
 * @module "digit/ui/radio-button.reel"
 */
var AbstractRadioButton = require("montage/ui/base/abstract-radio-button").AbstractRadioButton;

CLASS_PREFIX = "digit-RadioButton";
/**
 * ![RadioButton](https://raw.github.com/montagejs/digit/master/ui/radio-button.reel/screenshot.png)
 *
 * ### How to use
 *
 * ```json
 * "radio": {
 *     "prototype": "digit/ui/radio-button.reel",
 *     "properties": {
 *         "element": {"#": "radio"},
 *         "value": 1
 *     }
 * }
 * ```
 *
 * ```html
 * <span data-montage-id="radio"></span>
 * ```
 *
 * ### Customizing with CSS
 *
 * * `.digit-RadioButton` - The radio button element
 *
 * ```css
 * .digit-RadioButton {
 *     border-color: blue;
 * }
 * ```
 * @class RadioButton
 * @extends external:AbstractRadioButton
 */
exports.RadioButton = AbstractRadioButton.specialize(/** @lends RadioButton */{
    constructor: {
        value: function RadioButton() {
            this.super();
        }
    }
});

}})
;
//*/
montageDefine("2367fc9","package.json",{exports: {"name":"digit","version":"0.5.1","repository":{"type":"git","url":"https://github.com/montagejs/digit.git"},"dependencies":{"montage":"~0.14.0","matte":"~0.2.0"},"devDependencies":{"montage-testing":"~0.4.0"},"exclude":["overview.html","overview","run-tests.html","test"],"readmeFilename":"README.md","description":"![digit](overview/assets/images/icon.png)","bugs":{"url":"https://github.com/montagejs/digit/issues"},"homepage":"https://github.com/montagejs/digit","_id":"digit@0.5.1","_from":"digit@~0.5.0","hash":"2367fc9","mappings":{"montage":{"name":"montage","hash":"7fd8be3","location":"../montage@7fd8be3/"},"matte":{"name":"matte","hash":"089a8f0","location":"../matte@089a8f0/"}},"production":true,"useScriptInjection":true}})
;
//*/
montageDefine("2367fc9","ui/radio-button.reel/radio-button.html",{text:'<!DOCTYPE html><html><head>\n    <meta charset=utf-8>\n    <link rel=stylesheet href=radio-button.css>\n    <script type=text/montage-serialization>\n        {\n            "owner": {\n                "properties": {\n                    "element": {"#": "radioButton"}\n                }\n            }\n        }\n    </script>\n</head>\n<body>\n    <span data-montage-id=radioButton class=digit-RadioButton>\n        <svg viewbox="0 0 22 22">\n            <path class=digit-RadioButton-icon d="M11,16 C13.7614239,16 16,13.7614239 16,11 C16,8.23857611 13.7614239,6 11,6 C8.23857611,6 6,8.23857611 6,11 C6,13.7614239 8.23857611,16 11,16 L11,16 Z"></path>\n        </svg>\n    </span>\n\n\n</body></html>'});
;
//*/
montageDefine("f73ee10","ui/scene-view.reel/scene-view.html",{text:'<!DOCTYPE html><html><head>\n    <title></title>\n    <link rel=stylesheet type=text/css href=scene-view.css>\n\n    <script type=text/montage-serialization>\n        {\n            "owner": {\n                "prototype": "ui/scene-view.reel",\n                "properties": {\n                    "element": {\n                        "#": "component"\n                    }\n                }\n            },\n            "canvas": {\n                "value": { "#": "canvas"}\n            }\n        }\n    </script>\n\n</head>\n<body>\n    <div data-montage-id=component class=View>\n        <canvas data-montage-id=canvas class=View-canvas></canvas>\n    </div>\n\n\n</body></html>'});
;
//*/
montageDefine("a5f257c","ui/main.reel/main",{dependencies:["montage/ui/component"],factory:function(require,exports,module){/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
        }
    }
});

}})
bundleLoaded("index.html.bundle-1-0.js")