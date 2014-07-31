
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