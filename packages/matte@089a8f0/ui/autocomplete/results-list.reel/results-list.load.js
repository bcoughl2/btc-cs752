montageDefine("089a8f0","ui/autocomplete/results-list.reel/results-list",{dependencies:["montage/ui/component"],factory:function(require,exports,module){var Component = require("montage/ui/component").Component;

exports.ResultsList = Component.specialize({

    textPropertyPath: {value: null},

    // contentController -> this.repetition.contentController
    contentController: {value: null},

    activeIndexes: {value: null}
});

}})