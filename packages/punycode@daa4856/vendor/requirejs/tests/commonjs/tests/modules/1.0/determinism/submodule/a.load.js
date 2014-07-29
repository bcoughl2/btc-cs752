montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/determinism/submodule/a",{dependencies:["test","a"],factory:function(require,exports,module){define(["require", "exports", "module", "test","test","a"], function(require, exports, module) {
var test = require('test');
var pass = false;
var test = require('test');
try {
    require('a');
} catch (exception) {
    pass = true;
}
test.assert(pass, 'require does not fall back to relative modules when absolutes are not available.')

});

}})