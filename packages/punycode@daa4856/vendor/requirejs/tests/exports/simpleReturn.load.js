montageDefine("daa4856","vendor/requirejs/tests/exports/simpleReturn",{dependencies:[],factory:function(require,exports,module){//This file does not use exports, just
//return, but need to test that it does not
//automatically get an exports object assigned
define(
    function () {
        return function () {
            return 'simpleReturn';
        };
    }
);

}})