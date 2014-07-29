montageDefine("7fd8be3","core/bindings",{dependencies:["./deprecate","frb"],factory:function(require,exports,module){// logs: montage/core/bindings is deprecated, use montage/core/core instead.
require("./deprecate").deprecationWarning("montage/core/bindings", "montage/core/core");

exports.Bindings = require("frb");

}})