montageDefine("daa4856","vendor/requirejs/tests/relative/top",{dependencies:[],factory:function(require,exports,module){
define(function () {
    require.relativeBaseUrlCounter += 1;
    return {
        id: require.relativeBaseUrlCounter
    };
});

}})