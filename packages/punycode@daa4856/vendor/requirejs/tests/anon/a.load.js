montageDefine("daa4856","vendor/requirejs/tests/anon/a",{dependencies:["sub/b"],factory:function(require,exports,module){define(function (require) {
    var b =  require("sub/b");
    return {
        name: "a",
        bName: b.f()
    };
});

}})