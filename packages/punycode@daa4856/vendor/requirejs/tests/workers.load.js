montageDefine("daa4856","vendor/requirejs/tests/workers",{dependencies:[],factory:function(require,exports,module){importScripts('../require.js');

require({
        baseUrl: "./"
    },
    ["require", "simple", "anon/blue", "func", "anon/green"],
    function(require, simple, blue, func, green) {
        postMessage(simple.color);
        postMessage(green.name);
        postMessage(func());
        postMessage(blue.name);
    }
);

}})