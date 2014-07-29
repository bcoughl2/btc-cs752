montageDefine("089a8f0","ui/image.reel/image",{dependencies:["montage/ui/base/abstract-image"],factory:function(require,exports,module){/**
 @module "matte/ui/image.reel"
 */

/*global require,exports */
var AbstractImage = require("montage/ui/base/abstract-image").AbstractImage;

/**
 * Image
 * @class module:"matte/ui/image.reel".Image
 * @extends module:"montage/ui/base/abstract-image.reel".AbstractImage
 */
exports.Image = AbstractImage.specialize(/** @lends module:"matte/ui/image.reel".Image */ {
    hasTemplate: {
        value: false
    },

    constructor: {
        value: function Image() {
            this.super();
            this.classList.add("matte-image");
        }
    }

});

}})