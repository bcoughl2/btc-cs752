montageDefine("daa4856","vendor/requirejs/tests/packages/baz/lib/index",{dependencies:[],factory:function(require,exports,module){define(['bar', 'foo', './helper'], function (bar, foo, helper) {
    return {
        name: 'baz',
        barDepVersion: bar.version,
        fooName: foo.name,
        helperName: helper.name
    };
});

}})