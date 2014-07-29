montageDefine("daa4856","vendor/requirejs/tests/remoteUrls/remoteUrls-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: require.isBrowser ? "./" : "./remoteUrls/"
    },
    ["require", "jqwrap"],
    function(require, jqwrap) {
        doh.register(
            "remoteUrls",
            [
                function remoteUrls(t){
                    t.is(true, jqwrap.isFunction);
                }
            ]
        );

        doh.run();
    }
);

}})