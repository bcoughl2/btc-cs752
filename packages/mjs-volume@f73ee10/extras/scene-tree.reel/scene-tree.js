/**
 * @module ui/scene-graph-tree.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    Dict = require("collections/dict"),
    SceneTreeFactory = require("./core/scene-tree-factory").SceneTreeFactory,
    Application = require("montage/core/application").Application,

    /*jshint -W079 */
    Node = require("runtime/node").Node,

    DEFAULT_VALUES = {
        indentValue: 10,
        indentUnit: "px",
        meshesEnabled: false,
        displayNodeType: true
    };

/**
 * @class SceneGraphTree
 * @extends Component
 */
exports.SceneTree = Component.specialize(/** @lends SceneGraphTree# */ {

    constructor: {
        value: function SceneGraphTree() {
            this.super();

            this.configuration = Dict();
            this._treeFactory = new SceneTreeFactory(this.configuration);

            this._populateConfiguration();
        }
    },

    _treeFactory: {
        value: null
    },

    configuration: {
        value: null
    },

    _scene: {
        value: null
    },

    scene: {
        set: function (scene) {
            if (scene && typeof scene === "object") {
                this._scene = scene;
            }
        },
        get: function () {
            return this._scene;
        }
    },

    selectedNode: {
        value: null
    },

    _sceneGraphTree: {
        value: null
    },

    sceneGraphTree: {
        set: function (tree) {
            if (tree) {
                this._sceneGraphTree = this._treeFactory.buildWithGlTFTree(tree);
            }
        },
        get: function () {
            return this._sceneGraphTree;
        }
    },

    isCellDraggable: {
        value: null
    },

    treeController: {
        value: null
    },

    rangeController: {
        value: null
    },

    enterDocument: {
        value: function (firstime) {
            if (firstime) {
                this.addOwnPropertyChangeListener("selectedNode", this);
                this.addPathChangeListener("scene.status", this, "handleStatusChange");
                Application.addEventListener("sceneNodeSelected", this);
            }
        }
    },

    exitDocument: {
        value: function () {
            this.removeOwnPropertyChangeListener("selectedNode", this);
            this.removePathChangeListener("scene.status", this);
            Application.removeEventListener("sceneNodeSelected", this);
        }
    },

    handleSceneNodeSelected: {
        value: function(event) {
            var node = event.detail,
                selected = this.selectedNode,
                alreadySelected = selected && selected.content.glTFElement.baseId === node.id;

            if (node && !alreadySelected) {
                this.selectTreeControllerNodeById(node.id);
                this.needsDraw = true;
            }
        }
    },

    _populateConfiguration: {
        value: function () {
            var self = this;

            Object.keys(DEFAULT_VALUES).forEach(function (key) {
                self.configuration.set(key, DEFAULT_VALUES[key]);
            });
        }
    },

    _createNodeFromGlTFElement: {
        value: function(glTFNode) {
            var m3dNode = new Node();

            this.scene.glTFElement.ids[glTFNode.baseId] = glTFNode;
            m3dNode.scene = this._scene;
            m3dNode.id = glTFNode.baseId;
            glTFNode.component3D = m3dNode;

            return m3dNode;
        }
    },

    _getComponent3DFromGlTFElement: {
        value: function (GlTFElement) {
            return GlTFElement.component3D ? GlTFElement.component3D : this._createNodeFromGlTFElement(GlTFElement);
        }
    },

    handleStatusChange: {
        value: function(status) {
            if (status === "loaded" && this._scene) {
                this.sceneGraphTree = this._scene.rootNode.glTFElement;
            }
        }
    },

    handleSelectedNodeChange: {
        value: function (selectedNode) {
            if (selectedNode && selectedNode.content && selectedNode.content.glTFElement) {
                var component3D = this._getComponent3DFromGlTFElement(selectedNode.content.glTFElement);
                Application.dispatchEventNamed("sceneNodeSelected", true, true, component3D);
            }
        }
    },

    _findSceneTreeNodeById: {
        value: function (id, currentNode) {
            var node = null,
                self = this,
                children = null;

            if (!currentNode) {
                children = this.treeController.root.content.children;

            } else {
                var rawChildren = currentNode.rawChildren;

                children = Object.keys(rawChildren).map(function (key) {
                    return rawChildren[key];
                });
            }

            children.some(function (sceneTreeNode) {
                if (sceneTreeNode.glTFElement && sceneTreeNode.glTFElement.baseId === id) {
                    node = sceneTreeNode;

                    return true;
                }

                node = self._findSceneTreeNodeById(id, sceneTreeNode);

                return !!node;
            });

            return node;
        }
    },

    _fulfillSceneTreeNodePath: {
        value: function (path) {
            if (Array.isArray(path)) {

                path.forEach(function (sceneTreeNode) {
                    if (!sceneTreeNode.fulfilled) {
                        sceneTreeNode.fulfill();
                    }
                });
            }
        }
    },

    _expandTreeControllerNode: {
        value: function (treeControllerNode) {
            if (treeControllerNode) {
                if (!treeControllerNode.expanded) {
                    treeControllerNode.expanded = true;
                }

                this._expandTreeControllerNode(treeControllerNode.parent);
            }
        }
    },

    _findTreeControllerNodeById: {
        value: function (id) {
            var nodes = this.treeController.root.nodes,
                node = null;

            nodes.some(function (treeControllerNode) {
                var content = treeControllerNode.content;

                if (content.glTFElement && content.glTFElement.baseId === id) {
                    node = treeControllerNode;
                }

                return !!node;
            });

            return node;
        }
    },

    selectTreeControllerNodeById: {
        value: function (id) {
            if (this.treeController && this.treeController.root) {
                var sceneNodeTree = this._findSceneTreeNodeById(id);

                if (sceneNodeTree) {
                    var path = sceneNodeTree.toParentPath();

                    if (path) {
                        this._fulfillSceneTreeNodePath(path);

                        var treeControllerNode = this._findTreeControllerNodeById(id);

                        this._expandTreeControllerNode(treeControllerNode.parent);
                        this.rangeController.select(treeControllerNode);
                    }
                }
            }
        }
    }

});
