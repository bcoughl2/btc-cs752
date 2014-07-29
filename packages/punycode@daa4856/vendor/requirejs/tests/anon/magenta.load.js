montageDefine("daa4856","vendor/requirejs/tests/anon/magenta",{dependencies:["fake1","red","./blue","text!./message.txt","fake2"],factory:function(require,exports,module){define(function (require, exports, module) {
    //This is a fakeout require("fake1");

    var red = require("red"),
        blue = require('./blue'),
        message = require('text!./message.txt');

    /*
     And another fakeoute require("fake2");
    */

    //Use ugly exports
    exports.name = red.name + blue.name;
    exports.path = require.toUrl('./foo.html');
    exports.message = message;
});

}})