montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/determinism/program",{dependencies:["test","submodule/a"],factory:function(require,exports,module){define(["require", "exports", "module", "test","submodule/a"], function(require, exports, module) {
var test = require('test');
require('submodule/a');
test.print('DONE', 'info');

});

}})