montageDefine("daa4856","vendor/requirejs/tests/exports/moduleAndExports-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: require.isBrowser ? "./" : "./exports/"
    },
    ['am'],
    function(am) {
        doh.register(
            "moduleAndExports",
            [
                function moduleAndExports(t){
                    t.is('am', am.name);
                    t.is('bm', am.bName);
                    t.is('cm', am.cName);
                }
            ]
        );
        doh.run();
    }
);

}})