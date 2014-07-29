montageDefine("c5e8789","ui/input-text.reel/input-text",{dependencies:["ui/text-input"],factory:function(require,exports,module){/**
    @module "montage/ui/native/input-text.reel"
*/
var TextInput = require("ui/text-input").TextInput;
/**
 * Wraps the a &lt;input type="text"> element with binding support for the element's standard attributes.
   @class module:"montage/ui/native/input-text.reel".InputText
   @extends module:montage/ui/text-input.TextInput

 */
exports.InputText = TextInput.specialize({

    select: {
        value: function() {
            this._element.select();
        }
    }

});


}})