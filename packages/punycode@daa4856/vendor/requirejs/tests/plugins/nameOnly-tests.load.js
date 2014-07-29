montageDefine("daa4856","vendor/requirejs/tests/plugins/nameOnly-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: require.isBrowser ? "./" : "./plugins/"
},      ['require', 'nameOnly!'],
function (require,   nameOnly) {

    doh.register(
        "pluginsNameOnly",
        [
            function pluginsNameOnly(t){
                t.is("nameOnly", nameOnly.name);
             }
        ]
    );
    doh.run();
});

}})