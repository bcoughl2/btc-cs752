montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/determinism/test",{dependencies:["system"],factory:function(require,exports,module){define(["require", "exports", "module", "system"], function(require, exports, module) {

exports.print = typeof print !== "undefined" ? print : function () {
    var system = require("system");
    var stdio = system.stdio;
    stdio.print.apply(stdio, arguments);
};

exports.assert = function (guard, message) {
    if (guard) {
        exports.print('PASS ' + message, 'pass');
    } else {
        exports.print('FAIL ' + message, 'fail');
    }
};


});

}})