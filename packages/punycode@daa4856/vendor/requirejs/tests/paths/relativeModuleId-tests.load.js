montageDefine("daa4856","vendor/requirejs/tests/paths/relativeModuleId-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: "./",
        paths: {
            "array": "impl/array"
        }
    },
    ["require", "array"],
    function(require, array) {
        doh.register(
            "relativeModuleId",
            [
                function relativeModuleId(t){
                    t.is("impl/array", array.name);
                    t.is("util", array.utilName);
                }
            ]
        );

        doh.run();
    }
);

}})