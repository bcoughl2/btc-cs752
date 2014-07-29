montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/exactExports/program",{dependencies:["test","a"],factory:function(require,exports,module){define(["require", "exports", "module", "test","a"], function(require, exports, module) {
var test = require('test');
var a = require('a');
test.assert(a.program() === exports, 'exact exports');
test.print('DONE', 'info');

});

}})