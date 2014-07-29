montageDefine("daa4856","vendor/requirejs/tests/defineError/error",{dependencies:["main"],factory:function(require,exports,module){define(['require', 'main'], function (require, main) {
    return {
        name: 'error',
        bad: doesNotExist.bad(),
        doSomething: function () {
            require('main').doSomething();
        }
    };
});

}})