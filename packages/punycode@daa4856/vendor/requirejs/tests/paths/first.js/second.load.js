montageDefine("daa4856","vendor/requirejs/tests/paths/first.js/second",{dependencies:[],factory:function(require,exports,module){define(['./first'], function () {
    return function (id, parentRequire, loaded) {
        loaded({
            name: 'first',
            secondName: 'second'
        });
    };
});

}})