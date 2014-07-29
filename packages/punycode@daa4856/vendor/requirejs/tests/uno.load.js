montageDefine("daa4856","vendor/requirejs/tests/uno",{dependencies:[],factory:function(require,exports,module){define("uno",
  ["dos", "tres"],
  function(dos, tres) {
    return {
      name: "uno",
      doSomething: function() {
        return {
          dosName: dos.name,
          tresName: tres.name
        };
      }
    };
  }
);

}})