montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/method/a",{dependencies:[],factory:function(require,exports,module){define(["require", "exports", "module"], function(require, exports, module) {
exports.foo = function () {
    return this;
};
exports.set = function (x) {
    this.x = x;
};
exports.get = function () {
    return this.x;
};
exports.getClosed = function () {
    return exports.x;
};

});

}})