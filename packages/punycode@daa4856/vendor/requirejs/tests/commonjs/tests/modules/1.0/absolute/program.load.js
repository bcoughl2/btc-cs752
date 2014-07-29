montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/absolute/program",{dependencies:["test","submodule/a","b"],factory:function(require,exports,module){define(["require", "exports", "module", "test","submodule/a","b"], function(require, exports, module) {
var test = require('test');
var a = require('submodule/a');
var b = require('b');
test.assert(a.foo().foo === b.foo, 'require works with absolute identifiers');
test.print('DONE', 'info');

});

}})