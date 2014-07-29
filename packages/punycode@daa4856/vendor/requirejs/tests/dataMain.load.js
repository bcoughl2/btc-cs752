montageDefine("daa4856","vendor/requirejs/tests/dataMain",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: "./"    
    },
    ["require", "simple"],
    function(require, simple) {
        doh.register(
            "dataMain", 
            [
                function dataMain(t){
                    t.is("blue", simple.color);
                }
            ]
        );
        doh.run();
    }
);

}})