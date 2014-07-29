montageDefine("daa4856","vendor/requirejs/tests/nestedDefine/four",{dependencies:[],factory:function(require,exports,module){define(['two', 'three'], function (two, three) {
    return {
        name: 'four',
        twoName: two.name,
        threeName: three.name
    };
});

}})