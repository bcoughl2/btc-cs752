montageDefine("daa4856","vendor/requirejs/tests/plugins/textDepend/textDepend",{dependencies:[],factory:function(require,exports,module){define(['text!test.txt'], function (text) {
    return {
        load: function (name, req, load, config) {
            load(text);
        }
    };
});

}})