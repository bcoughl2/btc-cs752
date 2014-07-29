montageDefine("089a8f0","ui/anchor.reel/anchor",{dependencies:["montage/ui/component","native/ui/anchor.reel"],factory:function(require,exports,module){/**
    module:"matte/ui/anchor.reel"
*/

/*global require,exports */
var Component = require("montage/ui/component").Component,
    NativeAnchor = require("native/ui/anchor.reel").Anchor;

/**
 * Montage Anchor
 * @class module:"matte/ui/anchor.reel".Anchor
 * @extends module:"native/ui/anchor.reel".Anchor
 */
exports.Anchor = NativeAnchor.specialize(/** @lends module:"matte/ui/anchor.reel".Anchor# */{

    hasTemplate: {value: false},

    constructor: {
        value: function Anchor() {
            this.super();
            this.classList.add("matte-Anchor");
        }
    }
});

}})