montageDefine("daa4856","vendor/requirejs/tests/commonjs/tests/modules/1.0/method/program",{dependencies:["test","a"],factory:function(require,exports,module){define(["require", "exports", "module", "test","a"], function(require, exports, module) {
var test = require('test');
var a = require('a');
var foo = a.foo;
test.assert(a.foo() == a, 'calling a module member');
test.assert(foo() == (function (){return this})(), 'members not implicitly bound');
a.set(10);
test.assert(a.get() == 10, 'get and set')
test.print('DONE', 'info');

});

}})