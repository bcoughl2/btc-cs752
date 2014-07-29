montageDefine("daa4856","vendor/requirejs/tests/funcFour",{dependencies:["funcThree"],factory:function(require,exports,module){define("funcFour",
    ["require", "funcThree"],
    function (require) {
        var four = function (arg) {
            return "FOUR called with " + arg;
        };

        four.suffix = function () {
            return require("funcThree").suffix();
        };

        return four;
    }
);

}})