montageDefine("daa4856","vendor/requirejs/tests/plugins/fromText/fromText-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: require.isBrowser ? './' : './plugins/fromText',
        paths: {
            'text': '../../../text'
        }
},      ['refine!a'],
function (a) {

    doh.register(
        'pluginsFromText',
        [
            function pluginsFromText(t){
                t.is('a', a.name);
             }
        ]
    );
    doh.run();
});

}})