montageDefine("daa4856","vendor/requirejs/tests/funcTwo",{dependencies:["funcOne"],factory:function(require,exports,module){define("funcTwo",
    ["require", "funcOne"],
    function (require) {
        var two = function (name) {
            this.name = name;
            this.one = new (require("funcOne"))("ONE");
        };
    
        two.prototype.oneName = function () {
            return this.one.getName();
        };

        return two;
    }
);

}})