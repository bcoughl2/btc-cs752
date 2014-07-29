montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/monkeys/program",{dependencies:["a","test"],factory:function(require,exports,module){define(["require", "exports", "module", "a","test"], function(require, exports, module) {
var a = require('a');
var test = require('test');
test.assert(exports.monkey == 10, 'monkeys permitted');
test.print('DONE', 'info');

});

}})