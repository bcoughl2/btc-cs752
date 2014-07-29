montageDefine("daa4856","vendor/requirejs/tests/packages/optimizing/packages/engine/main",{dependencies:[],factory:function(require,exports,module){define(['./pistons', './sparkplugs'], function (pistons, sparkplugs) {
    return {
        name: 'engine',
        pistonsName: pistons.name,
        sparkplugsName: sparkplugs.name
    };
});
}})