montageDefine("d0c7bc8","tests/00-runtests",{dependencies:["fs","path","assert"],factory:function(require,exports,module){var fs = require("fs"),
    path = require("path"),
    assert = require("assert");

var runCount = 0,
	testCount = 0,
	done = false;

[
 "./01-events.js",
 "./02-stream.js",
 "./03-feed.js"
]
.map(require)
.forEach(function (test){
	console.log("\nStarting", test.dir, "\n----");

	var dir = path.resolve(__dirname, test.dir);

	//read files, load them, run them
	fs
	.readdirSync(dir)
	.filter(RegExp.prototype.test, /^[^\._]/) //ignore all files with a leading dot or underscore
	.map(function(name){
		return path.resolve(dir, name);
	})
	.map(require)
	.forEach(function(file){
		runCount++;
		
		console.log("Testing:", file.name);
		
		var second = false; //every test runs twice
		test.test(file, function(err, dom){
			assert.ifError(err);
			assert.deepEqual(file.expected, dom, "didn't get expected output");
						
			if(second){
				testCount++;
				if(!--runCount && done){
					console.log("Total tests:", testCount);
				}
			}
			else second = true;
		});
	});
});

var done = true; //started all tests
}})