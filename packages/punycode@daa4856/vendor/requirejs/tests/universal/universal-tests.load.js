montageDefine("daa4856","vendor/requirejs/tests/universal/universal-tests",{dependencies:[],factory:function(require,exports,module){require({baseUrl: require.isBrowser ? "./" : "./universal/"}, ["spell"], function(spell) {
    doh.register(
        "universal",
        [
            function universal(t){
                t.is('spell', spell.name);
                t.is('newt', spell.newtName);
                t.is('tail', spell.tailName);
                t.is('eye', spell.eyeName);
            }
        ]
    );

    doh.run();
});

}})