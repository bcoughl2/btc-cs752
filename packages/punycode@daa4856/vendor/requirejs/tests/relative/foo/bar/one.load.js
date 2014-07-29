montageDefine("daa4856","vendor/requirejs/tests/relative/foo/bar/one",{dependencies:[],factory:function(require,exports,module){define("foo/bar/one",
            ["require", ".", "./two", "../three", "text!./message.txt"],
    function (require,   bar, two,     three,      message) {
    return {
        name: "one",
        barName: bar.name,
        twoName: two.name,
        threeName: three.name,
        message: message
    };
});

}})