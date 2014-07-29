montageDefine("f73ee10","assets/gradient/gradient.json",{exports: {
    "asset": {
        "generator": "hand-written"
    },
    "accessors": {
        "attribute_22": {
            "bufferView": "bufferView_28",
            "byteOffset": 0,
            "byteStride": 12,
            "count": 4,
            "max": [
                0.5,
                0.5,
                0.5
            ],
            "min": [
                -0.5,
                -0.5,
                -0.5
            ],
            "type": 35665
        },
        "indices_20": {
            "bufferView": "bufferView_29",
            "byteOffset": 0,
            "count": 6,
            "type": 5123
        }
        
    },
    "bufferViews": {
        "bufferView_28": {
            "buffer": "gradient.bin",
            "byteLength": 48,
            "byteOffset": 0,
            "target": 34962
        },
        "bufferView_29": {
            "buffer": "gradient.bin",
            "byteLength": 12,
            "byteOffset": 48,
            "target": 34963
        }
    },
    "buffers": {
        "gradient.bin": {
            "byteLength": 60,
            "path": "gradient.bin"
        }
    },
    "cameras": {
        "camera_0": {
            "type": "orthographic",
            "orthographic" : {
                "xmag": 1, 
                "ymag": 1,
                "zfar": 1000,
                "znear": 0
        }
        }
    },
    "materials": {
        "material.0": {
            "instanceTechnique": {
                "technique": "technique1"
            },
            "name": "blinn3"
        }
    },
    "meshes": {
        "quad_mesh": {
            "name": "quad_mesh",
            "primitives": [
                {
                    "indices": "indices_20",
                    "material": "material.0",
                    "primitive": 4,
                    "attributes": {
                        "POSITION": "attribute_22"
                    }
                }
            ]
        }
    },
    "nodes": {
        "node_0": {
            "meshes": [
                "quad_mesh"
            ],
            "name": "quad"
        },
        "node_1": {
            "camera": "camera_0",
            "name": "camera1"
        }
    },
    "profile": "WebGL 1.0",
    "programs": {
        "program_0": {
            "fragmentShader": "gradient0FS",
            "vertexShader": "gradient0VS"
        }
    },
    "scene": "defaultScene",
    "scenes": {
        "defaultScene": {
            "nodes": [
                "node_0",
                "node_1"
            ]
        }
    },
    "shaders": {
        "gradient0FS": {
            "path": "gradient0FS.glsl"
        },
        "gradient0VS": {
            "path": "gradient0VS.glsl"
        }
    },
    "techniques": {
        "technique1": {
            "parameters": {
                "color0": {
                    "type": 35665,
                    "value": [
                        1,
                        1,
                        1
                    ]
                },
                "color1": {
                    "type": 35665,
                    "value": [
                        0,
                        0,
                        0
                    ]
                },
                "position": {
                    "semantic": "POSITION",
                    "type": 35665
                },
                "projectionMatrix": {
                    "semantic": "PROJECTION",
                    "type": 35676
                }
            },
            "pass": "gradientPass",
            "passes": {
                "gradientPass": {
                    "instanceProgram": {
                        "attributes": {
                            "a_position": "position"
                        },
                        "program": "program_0",
                        "uniforms": {
                            "u_color0": "color0",
                            "u_color1": "color1",
                            "u_projectionMatrix": "projectionMatrix"
                        }
                    },
                    "states": {
                        "blendEnable": 1,
                        "blendEquation": 32774,
                        "blendFunc": {
                            "dfactor": 771,
                            "sfactor": 770
                        },
                        "cullFaceEnable": 0,
                        "depthMask": 0,
                        "depthTestEnable": 0
                    }
                }
            }
        }
    }
}})