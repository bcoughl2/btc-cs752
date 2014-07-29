montageDefine("daa4856","vendor/requirejs/tests/paths/first.js/first",{dependencies:[],factory:function(require,exports,module){globalCounter += 1;

define(['./second'], function (second) {
    globalCounter += 1;
    return {
        load: second
    };
});

}})