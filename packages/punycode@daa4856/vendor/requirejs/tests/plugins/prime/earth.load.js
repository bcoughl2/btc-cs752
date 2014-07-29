montageDefine("daa4856","vendor/requirejs/tests/plugins/prime/earth",{dependencies:["../index!0?./a:./b:./c","../index!2?./a:./b:./c","../index!1?./a:./b:./c"],factory:function(require,exports,module){define(function (require) {
   return {
        getA: function () {
            return require("../index!0?./a:./b:./c");
        },
        getC: function () {
            return require("../index!2?./a:./b:./c");
        },
        getB: function () {
            return require("../index!1?./a:./b:./c");
        }
   };
});

}})