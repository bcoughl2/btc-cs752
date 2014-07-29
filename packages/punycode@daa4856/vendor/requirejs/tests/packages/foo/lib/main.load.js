montageDefine("daa4856","vendor/requirejs/tests/packages/foo/lib/main",{dependencies:["alpha"],factory:function(require,exports,module){define(function (require, exports) {    
    exports.name = 'foo';
    exports.alphaName = require('alpha').name;
});

}})