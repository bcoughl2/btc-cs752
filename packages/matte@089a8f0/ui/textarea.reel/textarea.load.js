montageDefine("089a8f0","ui/textarea.reel/textarea",{dependencies:["montage/ui/base/abstract-text-area"],factory:function(require,exports,module){/**
    module:"matte/ui/textarea.reel"
*/
/*global require,exports */
var AbstractTextArea = require("montage/ui/base/abstract-text-area").AbstractTextArea;

/**
 * Textarea
 * @class module:"matte/ui/textarea.reel".Textarea
 * @lends module:"native/ui/textarea.reel".Textarea
 */
exports.Textarea = AbstractTextArea.specialize(/** @lends module:"matte/ui/textarea.reel".Textarea */ {

    hasTemplate: {value: true},

    constructor: {
        value: function Textarea() {
            this.super();
            this.classList.add("matte-Textarea");
        }
    }
});

}})