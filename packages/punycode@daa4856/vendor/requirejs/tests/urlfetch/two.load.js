montageDefine("daa4856","vendor/requirejs/tests/urlfetch/two",{dependencies:[],factory:function(require,exports,module){define("one", {
    name: "one"
});

define("two", ["one"], function (one) {
    return {
        name: "two",
        oneName: "one"
    };
});

}})