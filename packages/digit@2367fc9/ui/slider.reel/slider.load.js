montageDefine("2367fc9","ui/slider.reel/slider",{dependencies:["montage/ui/base/abstract-slider"],factory:function(require,exports,module){var AbstractSlider = require("montage/ui/base/abstract-slider").AbstractSlider;

exports.Slider = AbstractSlider.specialize({
    constructor: {
        value: function Slider() {
            this.super();
        }
    }
});

}})