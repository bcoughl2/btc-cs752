montageDefine("daa4856","vendor/requirejs/tests/one",{dependencies:["two"],factory:function(require,exports,module){//
//  Test comment
//
define('one',
    [
     "require", "two"
    ],
  function(require) {
    var one = {
      size: "large",
      doSomething: function() {
        return require("two");
      }
    };

    return one;
  }
)

}})