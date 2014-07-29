montageDefine("daa4856","vendor/requirejs/tests/circular/complexPlugin/helper",{dependencies:["main"],factory:function(require,exports,module){define(function (require, exports) {
    //Create circular dependency here
    var main = require('main');

    exports.name = 'helper';
});

}})