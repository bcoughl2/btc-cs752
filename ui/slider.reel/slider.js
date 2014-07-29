/**
 * @module ui/slider.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Slider
 * @extends Component
 */
exports.Slider = Component.specialize(/** @lends Slider# */ {
    constructor: {
        value: function Slider() {
            this.super();
        }
    }
});
