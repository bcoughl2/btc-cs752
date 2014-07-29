montageDefine("d0c7bc8","tests/02-stream",{dependencies:["./test-helper.js","..","fs"],factory:function(require,exports,module){var helper = require("./test-helper.js"),
	Stream = require("..").WritableStream,
	fs = require("fs");

exports.dir = "Stream";

exports.test = function(test, cb){
	fs.createReadStream(__dirname + test.file).pipe(
		new Stream(
			helper.getEventCollector(function(err, events){
				cb(err, events);

				var handler = helper.getEventCollector(cb),
				    stream = new Stream(handler, test.options);

				stream.end(fs.readFileSync(__dirname + test.file));
			}
		), test.options)
	);
};
}})