montageDefine("daa4856","vendor/requirejs/tests/jquery/scripts/dynamicApp1.6",{dependencies:[],factory:function(require,exports,module){require({
    "baseUrl": "./scripts/",
    "paths": {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min"
    },
    priority: ['jquery']
});

define(["jquery.gamma", "jquery.epsilon"], function() {

    $(function () {
        doh.is('epsilon', $('body').epsilon());
        doh.is('epsilon', $('body').epsilon());
        readyFired();
    });

});

}})