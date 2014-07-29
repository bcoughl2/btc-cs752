montageDefine("daa4856","vendor/requirejs/tests/dos",{dependencies:[],factory:function(require,exports,module){define("dos",
  ["tres"],
  function(tres) {
    return {
      name: "dos",
      doSomething: function() {
        return {
          tresName: tres.name
        };
      }
    };
  }
);

}})