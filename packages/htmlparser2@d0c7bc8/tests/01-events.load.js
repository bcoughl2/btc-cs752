montageDefine("d0c7bc8","tests/01-events",{dependencies:["./test-helper.js"],factory:function(require,exports,module){var helper = require("./test-helper.js");

exports.dir = "Events";

exports.test = function(test, cb){
	helper.writeToParser(
		helper.getEventCollector(cb),
		test.options.parser,
		test.html
	);
};
}})