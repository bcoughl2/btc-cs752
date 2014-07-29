montageDefine("daa4856","vendor/requirejs/tests/circular/circularPlugin-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: require.isBrowser ? './' : './circular'
    },
    ["require", "plugin!a"],
    function(require, a) {
        doh.register(
            "circularPlugin",
            [
                function circularPlugin(t) {
                    t.is("a", a.name);
                    t.is("b", a.b.name);
                    t.is("c", a.b.c.name);
                }
            ]
        );
        doh.run();
    }
);

}})