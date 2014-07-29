montageDefine("f73ee10","extras/scene-tree.reel/tree.reel/repetition-tree",{dependencies:["montage/ui/repetition.reel/repetition"],factory:function(require,exports,module){var Repetition = require("montage/ui/repetition.reel/repetition").Repetition;

/**
 * @class RepetitionTree
 * @extends Repetition
 */
exports.RepetitionTree = Repetition.specialize(/** @lends RepetitionTree# */ {

    constructor: {
        value: function RepetitionTree() {
            this.super();

        }
    },

    hasTemplate: {
        value: false
    },

    draw: {
        value: function () {
            this.super();

            if (this.selectedIterations) {
                var iteration = this.selectedIterations[0];

                if (iteration) {
                    var element = iteration.firstElement;

                    if (element) {
                        element.scrollIntoViewIfNeeded();
                    }
                }
            }
        }
    }

});

}})