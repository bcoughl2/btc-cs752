montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/cyclic/program",{dependencies:["test","a","b"],factory:function(require,exports,module){define(["require", "exports", "module", "test","a","b"], function(require, exports, module) {
var test = require('test');
var a = require('a');
var b = require('b');

test.assert(a.a, 'a exists');
test.assert(b.b, 'b exists')
test.assert(a.a().b === b.b, 'a gets b');
test.assert(b.b().a === a.a, 'b gets a');

test.print('DONE', 'info');

});

}})