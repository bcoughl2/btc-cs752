montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/relative/program",{dependencies:["test","submodule/a","submodule/b"],factory:function(require,exports,module){define(["require", "exports", "module", "test","submodule/a","submodule/b"], function(require, exports, module) {
var test = require('test');
var a = require('submodule/a');
var b = require('submodule/b');
test.assert(a.foo == b.foo, 'a and b share foo through a relative require');
test.print('DONE', 'info');

});

}})