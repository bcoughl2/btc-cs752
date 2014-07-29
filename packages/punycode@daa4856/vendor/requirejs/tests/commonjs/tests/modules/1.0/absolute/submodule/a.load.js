montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/absolute/submodule/a",{dependencies:["b"],factory:function(require,exports,module){define(["require", "exports", "module", "b"], function(require, exports, module) {
exports.foo = function () {
    return require('b');
};

});

}})