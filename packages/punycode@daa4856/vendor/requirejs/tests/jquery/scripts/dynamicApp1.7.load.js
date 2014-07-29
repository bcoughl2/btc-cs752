montageDefine("daa4856","vendor/requirejs/tests/jquery/scripts/dynamicApp1.7",{dependencies:[],factory:function(require,exports,module){require({
    "baseUrl": "./scripts/",
    "paths": {
        "jquery": "http://code.jquery.com/jquery-1.7b2"
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