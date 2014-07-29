/**
 * @module ui/tree-cell.reel
 * @requires montage/ui/component
 */

var Component = require("montage/ui/component").Component,
    ModuleLocation = module.location.replace(/[^\/]+.js$/m, ""),
    SceneTreeNode = require("extras/scene-tree.reel/core/scene-tree-node").SceneTreeNode,

    NODE_TYPES = require("extras/scene-tree.reel/core/scene-tree-node").SceneTreeNodeTypes,
    MIME_TYPES = require("extras/scene-tree.reel/core/mime-types");

/**
 * @class TreeCell
 * @extends Component
 */
exports.TreeCell = Component.specialize(/** @lends TreeCell# */ {

    constructor: {
        value: function TreeCell() {
            this.super();
        }
    },

    hasChildren: {
        value: false
    },

    configuration: {
        value: null
    },

    name: {
        value: null
    },

    id: {
        value: null
    },

    type: {
        value: null
    },

    _node: {
        value: null
    },

    node: {
        set: function (iteration) {
            if (iteration && typeof iteration === "object" && iteration.content) {
                var content = iteration.content,
                    isRoot = content.root;

                if (isRoot) {
                    iteration.expanded = true;
                } else {
                    this.id = content.glTFElement.baseId;
                }

                if (content.rawChildren) {
                    this.hasChildren = Object.keys(content.rawChildren).length > 0;
                }

                this.name = content.name;
                this._node = iteration;
                this.type = content.type;
            }
        },
        get: function () {
            return this._node;
        }
    },

    isDraggable: {
        value: null
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                if (this.isDraggable) {
                    this._element.addEventListener("dragstart", this, true);
                }
            }
        }
    },

    captureDragstart: {
        value: function (event) {
            if (this._node && this._node.content && this._node.content.glTFElement) {
                var dataTransfer = event.dataTransfer;

                if (dataTransfer) {
                    dataTransfer.effectAllowed = 'move';
                    dataTransfer.setData(MIME_TYPES.TEXT_PLAIN, this._node.content.glTFElement.baseId);
                }
            }
        }
    },

    draw: {
        value: function () {
            if (this.node) {
                var indentValue = this.configuration.get("indentValue") * (this.node.depth - 1),
                    sceneNode = this.node.content;

                this._element.style.marginLeft = indentValue + this.configuration.get("indentUnit");

                if (this.isDraggable) {
                    this._element.setAttribute("draggable", "true");
                }

                if (sceneNode && sceneNode instanceof SceneTreeNode && !sceneNode.hasChildren()) {
                    this.classList.add('LastSceneNode');
                }

                if (this.configuration.get("displayNodeType")) {
                    var nodeTypeElement = this.templateObjects.nodeTypeImage;

                    switch (this.type) {
                        case NODE_TYPES.NODE:
                            nodeTypeElement.src = ModuleLocation + "icons/cube.png";
                            nodeTypeElement.alt = "node";
                            break;
                        case NODE_TYPES.LIGHT:
                            nodeTypeElement.src = ModuleLocation + "icons/light.png";
                            nodeTypeElement.alt = "light";
                            break;
                        case NODE_TYPES.CAMERA:
                            nodeTypeElement.src = ModuleLocation + "icons/camera.png";
                            nodeTypeElement.alt = "camera";
                            break;
                    }
                }
            }
        }
    }

});
