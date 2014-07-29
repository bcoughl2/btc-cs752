montageDefine("daa4856","vendor/requirejs/tests/two",{dependencies:["one"],factory:function(require,exports,module){define("two",
  ["require", "one"],
  function(require, one) {
    return {
      size: "small",
      color: "redtwo",
      doSomething: function() {
        return require("one").doSomething();
      }
    };
  }
);

}})