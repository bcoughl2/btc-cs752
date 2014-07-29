montageDefine("daa4856","vendor/requirejs/tests/simple.html",{text:'<!DOCTYPE html><html><head>\n    <title>require.js: Simple Test</title>\n    <script src=../require.js></script>\n    <script src=doh/runner.js></script>\n    <script src=doh/_browserRunner.js></script>\n    <script>moreSimpleTests = true</script>\n    <script src=simple-tests.js></script>\n    <script>\n        //This test is only in the HTML since it uses an URL for a require\n        //argument. It will not work well in say, the Rhino tests.\n        var path = location.href.replace(/simple\\.html$/, "foo"),\n            index = path.indexOf(":"),\n            noProtocolPath = path.substring(index + 1, path.length).replace(/foo/, "bar");\n\n        require([path, noProtocolPath], function() {\n            doh.register(\n                        "fooBar", \n                        [\n                            function fooBar(t){\n                                t.is("foo", foo.name); \n                                t.is("bar", bar.name); \n                            }\n                        ]\n                    );\n            doh.run();\n            \n        });\n    </script>\n</head>\n<body>\n    <h1>require.js: Simple Test</h1>\n    <p>Check console for messages</p>\n\n\n</body></html>'});