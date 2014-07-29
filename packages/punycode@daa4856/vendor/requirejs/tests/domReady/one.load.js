montageDefine("daa4856","vendor/requirejs/tests/domReady/one",{dependencies:[],factory:function(require,exports,module){define({
    addToDom: function () {
        var div = document.createElement('div');
        div.id = 'one';
        div.setAttribute('data-name', 'one');
        document.getElementsByTagName('body')[0].appendChild(div);
    }
});

}})