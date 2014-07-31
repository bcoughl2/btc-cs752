/**
 * @requires montage/ui/component
 */
var Montage = require("montage").Montage,

    SceneTreeNodeTypes = {
        NODE: 'NODE',
        MESH: 'MESH',
        LIGHT: 'LIGHT',
        CAMERA: 'CAMERA'
    };

exports.SceneTreeNodeTypes = SceneTreeNodeTypes;

/**
 * @class SceneTreeNode
 * @extends Component
 */
exports.SceneTreeNode = Montage.specialize(/** @lends SceneTreeNode# */ {

    constructor: {
        value: function SceneTreeNode(glTFElement, type, parent) {
            this.super();

            this.name = glTFElement.name;
            this.glTFElement = glTFElement;
            this.children = [];
            this.rawChildren = {};
            this.type = type || SceneTreeNodeTypes.NODE;
            this.fulfilled = false;
            this.parent = parent;
        }
    },

    name: {
        value: null
    },

    _type: {
        value: null
    },

    type: {
        set: function (type) {
            if (typeof type === "string") {
                this._type = SceneTreeNodeTypes[type.toUpperCase()] || null;
            }
        },
        get: function () {
            return this._type;
        }
    },

    glTFElement: {
        value: null
    },

    children: {
        value: null
    },

    rawChildren: {
        value: null
    },

    parent: {
        value: null
    },

    fulfilled: {
        value: null
    },

    hasChildren: {
        value: function () {
            if (this.glTFElement && Array.isArray(this.glTFElement.children)) {
                return this.glTFElement.children.length > 0;
            }

            return false;
        }
    },

    fulfill: {
        value: function () {
            if (this.rawChildren && !this.fulfilled) {
                var children = [],
                    rawChildren = this.rawChildren,
                    rawChildrenKeys = Object.keys(rawChildren);

                for (var i = 0, length = rawChildrenKeys.length; i < length; i++) {
                    children.push(rawChildren[rawChildrenKeys[i]]);
                }

                this.children = children;
            }

            this.fulfilled = true;
        }
    },

    toParentPath: {
        value: function (currentSceneTreeNode, path) {
            if (!currentSceneTreeNode || !Array.isArray(path)) {
                currentSceneTreeNode = this;
                path = [currentSceneTreeNode];
            }

            if (currentSceneTreeNode && currentSceneTreeNode.parent) {
                var parent = currentSceneTreeNode.parent;
                path.unshift(parent);

                return this.toParentPath(parent, path);
            }

            return path;
        }
    }

});
