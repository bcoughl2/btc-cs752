montageDefine("daa4856","vendor/requirejs/tests/priority/tree",{dependencies:[],factory:function(require,exports,module){define("bark", function () {
    return {
        name: "bark"
    };
});

var globalLeafNameForTree = globalLeafName;

define("tree", ["leaf", "bark"], function () {
   return {
        name: "tree",
        leafName: globalLeafNameForTree,
        barkName: bark.name
   };
});

}})