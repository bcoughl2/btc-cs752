montageDefine("daa4856","vendor/requirejs/tests/order/bar",{dependencies:[],factory:function(require,exports,module){var bar = 0;
define(function () {
    bar += 1;
    return function () {
        bar += 2;
    }
});

}})