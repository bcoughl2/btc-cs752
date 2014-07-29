montageDefine("daa4856","vendor/requirejs/tests/urlfetch/three",{dependencies:[],factory:function(require,exports,module){define("three", {
    name: "three"
});

define("four", ["three"], function (three) {
    return {
        name: "four",
        threeName: "three"
    };
});

}})