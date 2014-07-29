montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/test",{dependencies:["system"],factory:function(require,exports,module){define(["require", "exports", "module", "system"], function(require, exports, module) {

exports.print = function () {
    var system = require("system");
    var stdio = system.stdio;
    stdio.print.apply(stdio, arguments);
};

exports.assert = function (guard, message) {
    if (guard) {
        console.log('PASS ' + message, 'pass');
    } else {
        console.error('FAIL ' + message, 'fail');
    }
};


});

}})