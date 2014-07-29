montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/cyclic/b",{dependencies:["a"],factory:function(require,exports,module){define(["require", "exports", "module", "a"], function(require, exports, module) {
var a = require('a');
exports.b = function () {
    return a;
};

});

}})