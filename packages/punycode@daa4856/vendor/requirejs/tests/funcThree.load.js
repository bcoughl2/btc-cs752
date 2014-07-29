montageDefine("daa4856","vendor/requirejs/tests/funcThree",{dependencies:["funcFour"],factory:function(require,exports,module){define("funcThree",
    ["funcFour"],
    function (four) {
        var three = function (arg) {
            return arg + "-" + require("funcFour").suffix();
        };

        three.suffix = function () {
            return "THREE_SUFFIX";
        };

        return three;
    }
);

}})