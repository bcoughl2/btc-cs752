montageDefine("daa4856","vendor/requirejs/tests/priority/priorityWithDeps/script/req/app",{dependencies:[],factory:function(require,exports,module){define('Carousel', function () {
    return function Carousel(service) {
        this.service = service;
        this.someType = 'Carousel';
    };
});

define('app', ['Carousel'], function () {

});

}})