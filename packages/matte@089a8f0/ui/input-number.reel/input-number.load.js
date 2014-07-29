montageDefine("089a8f0","ui/input-number.reel/input-number",{dependencies:["native/ui/input-number.reel"],factory:function(require,exports,module){
/**
    @module "matte/ui/input-number.reel"
*/

var NativeInputNumber = require("native/ui/input-number.reel").InputNumber;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"matte/ui/input-number.reel".InputNumber
   @extends module:"native/ui/input-number.reel".InputNumber
 */
exports.InputNumber = NativeInputNumber.specialize(/** @lends module:"matte/ui/input-number.reel".InputNumber */{

    hasTemplate: {
        value: true
    },

    constructor: {
        value: function InputNumber() {
            this.super();
            this.classList.add("matte-InputNumber");
            this.classList.add("matte-InputText");
        }
    }

});

}})