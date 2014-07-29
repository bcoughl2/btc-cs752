montageDefine("daa4856","vendor/requirejs/tests/circular/complexPlugin/viewport",{dependencies:["slowText!viewport.html","toolbar"],factory:function(require,exports,module){define(function(require) {
    return {
        name: 'viewport',
        template: require('slowText!viewport.html'),
        toolbar: require('toolbar')
    };
});

}})