montageDefine("daa4856","vendor/requirejs/tests/browsertests/vardefine/four",{dependencies:[],factory:function(require,exports,module){(function () {

    function define(msg) {
        log('STILL GOOD, inner define: ' + msg);
    }

    if (typeof define !== 'function') { var define = window.badDefine; }

    define("four.js script");


}());


}})