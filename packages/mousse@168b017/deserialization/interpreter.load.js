montageDefine("168b017","deserialization/interpreter",{dependencies:["./reviver","./context"],factory:function(require,exports,module){(function(ns) {
    var Reviver = require("./reviver").Reviver,
        Context = require("./context").Context;

    function Interpreter() {

    }

    Object.defineProperties(Interpreter.prototype, {
        instantiate: {
            value: function(serialization, objects) {
                var reviver = new Reviver(),
                    context = new Context(serialization, reviver, objects);

                return context.getObjects();
            }
        }
    });

    ns.Interpreter = Interpreter;
})(exports);

}})