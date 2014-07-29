montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/nested/program",{dependencies:["test","a/b/c/d"],factory:function(require,exports,module){define(["require", "exports", "module", "test","a/b/c/d"], function(require, exports, module) {
var test = require('test');
test.assert(require('a/b/c/d').foo() == 1, 'nested module identifier');
test.print('DONE', 'info');

});

}})