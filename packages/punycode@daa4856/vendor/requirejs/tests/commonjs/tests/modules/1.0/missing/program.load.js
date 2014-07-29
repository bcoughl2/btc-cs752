montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/missing/program",{dependencies:["test","bogus"],factory:function(require,exports,module){define(["require", "exports", "module", "test","bogus"], function(require, exports, module) {
var test = require('test');
try {
    require('bogus');
    test.print('FAIL require throws error when module missing', 'fail');
} catch (exception) {
    test.print('PASS require throws error when module missing', 'pass');
}
test.print('DONE', 'info');

});

}})