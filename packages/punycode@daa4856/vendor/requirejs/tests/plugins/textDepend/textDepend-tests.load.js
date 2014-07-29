montageDefine("daa4856","vendor/requirejs/tests/plugins/textDepend/textDepend-tests",{dependencies:[],factory:function(require,exports,module){require({
        baseUrl: require.isBrowser ? './' : './plugins/textDepend',
        paths: {
            'text': '../../../text'
        }
},      ['textDepend!a'],
function (textValue) {

    doh.register(
        'textDepend',
        [
            function textDepend(t){
                t.is('hello world', textValue);
             }
        ]
    );
    doh.run();
});

}})