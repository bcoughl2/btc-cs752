/**
 * @requires montage/ui/component
 */
var Montage = require("montage").Montage,
    SCENE_TREE_NODE = require("./scene-tree-node"),
    SceneTreeNode = SCENE_TREE_NODE.SceneTreeNode,
    NODE_TYPES = SCENE_TREE_NODE.SceneTreeNodeTypes;

/**
 * @class SceneTreeFactory
 * @extends Component
 */
exports.SceneTreeFactory = Montage.specialize(/** @lends SceneTreeFactory# */ {

    constructor: {
        value: function SceneTreeFactory(configuration) {
            this.super();

            this._configuration = configuration;
        }
    },

    _configuration: {
        value: null
    },

    _sceneGraphTree: {
        value: null
    },

    buildWithGlTFTree: {
        value: function (tree) {
            if (tree && typeof tree === "object") {
                var self = this,
                    nodeChildren = tree.children;

                this._resetEnvironment();

                if (Array.isArray(nodeChildren)) {
                    nodeChildren.forEach(function (node) {
                        var nodeExamined = self._examineNode(node);
                        self._sceneGraphTree.children.push(nodeExamined);
                    });
                }

                return this._sceneGraphTree;
            }
        }
    },

    _resetEnvironment: {
        value: function () {
            this._sceneGraphTree = {
                children: [],
                root: true
            };
        }
    },

    _examineNode: {
        value: function (node, parent) {
            var nodeChildren = node.children,
                sceneGraphNode = this._createSceneTreeNode(node, parent);

            if (Array.isArray(nodeChildren)) {
                var self = this;

                nodeChildren.forEach(function (childNode) {
                    var nodeExamined = self._examineNode(childNode, sceneGraphNode);
                    sceneGraphNode.rawChildren[nodeExamined.name] = nodeExamined;
                });
            }

            return sceneGraphNode;
        }
    },

    _createSceneTreeNode: {
        value: function (node, parent) {
            var sceneGraphNode = new SceneTreeNode(node, NODE_TYPES.NODE, parent),
                meshes = node.meshes;

            if (Array.isArray(meshes) && this._configuration.get("meshesEnabled")) {
                meshes.forEach(function (mesh) {
                    sceneGraphNode.rawChildren[mesh.name] = new SceneTreeNode(mesh, NODE_TYPES.MESH, sceneGraphNode);
                });
            }

            return sceneGraphNode;
        }
    }

});
