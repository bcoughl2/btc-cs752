montageDefine("daa4856","vendor/requirejs/tests/funcOne",{dependencies:["funcTwo"],factory:function(require,exports,module){define("funcOne",
    ["require", "funcTwo"],
    function (require) {
        var one = function (name) {
            this.name = name;
        };

        one.prototype.getName = function () {
            var inst = new (require("funcTwo"))("-NESTED");
            return this.name + inst.name;
        };

        return one;
    }
);

}})