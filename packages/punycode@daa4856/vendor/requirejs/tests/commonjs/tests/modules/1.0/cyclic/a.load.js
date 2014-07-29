montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/cyclic/a",{dependencies:["b"],factory:function(require,exports,module){define(["require", "exports", "module", "b"], function(require, exports, module) {
exports.a = function () {
    return b;
};
var b = require('b');

});

}})