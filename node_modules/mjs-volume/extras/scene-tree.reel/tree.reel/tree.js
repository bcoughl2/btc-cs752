/**
 * @module ui/tree.reel
 * @requires montage/ui/component
 * @requires montage/core/TreeController
 */
var Component = require("montage/ui/component").Component,
    TreeController = require("montage/core/tree-controller").TreeController;

/**
 * @class Tree
 * @extends Component
 */
exports.Tree = Component.specialize(/** @lends Tree# */ {

    constructor: {
        value: function Tree() {
            this.super();
        }
    },

    _childrenPath: {
        value: "children"
    },

    _tree: {
        value: null
    },

    tree: {
        set: function (tree) {
            if (tree) {
                this._tree = tree;
                this.treeController = new TreeController(tree, this._childrenPath);
            }
        },
        get: function () {
            return this._tree;
        }
    },

    configuration: {
        value: null
    },

    selectedNode: {
        value: null
    },

    treeController: {
        value: null
    },

    rangeController: {
        value: null
    },

    isCellDraggable: {
        value: null
    },

    handleExpandedAction: {
        value: function (event) {
            var treeCell = event.target.ownerComponent;

            // treeCell.node.content => its SceneTreeNode
            if (treeCell && !treeCell.node.content.fulfilled) {
                treeCell.node.expanded = false;
                treeCell.node.content.fulfill();
                treeCell.node.expanded = true;
            }
        }
    }

});
