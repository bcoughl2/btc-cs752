montageDefine("089a8f0","ui/button.reel/button",{dependencies:["native/ui/button.reel"],factory:function(require,exports,module){/*global require,exports */
/**
    module:"matte/ui/button.reel"
*/
var NativeButton = require("native/ui/button.reel").Button;

/**
 * Montage Button
 @class module:"matte/ui/button.reel".Button
 @extends module:"native/ui/button.reel".Button
*/
exports.Button = NativeButton.specialize(/** @lends module:"matte/ui/button.reel".Button# */ {

    hasTemplate: {value: true},

    constructor: {
        value: function Button() {
            this.super();
            this.classList.add("matte-Button");
        }
    }
});

}})