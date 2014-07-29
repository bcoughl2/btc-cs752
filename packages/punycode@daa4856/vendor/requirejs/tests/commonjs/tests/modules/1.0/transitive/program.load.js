montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/transitive/program",{dependencies:["test","a"],factory:function(require,exports,module){define(["require", "exports", "module", "test","a"], function(require, exports, module) {
var test = require('test');
test.assert(require('a').foo() == 1, 'transitive');
test.print('DONE', 'info');

});

}})