montageDefine("daa4856","vendor/requirejs/tests/jquery/jqueryDynamic-1.7.html",{text:'<!DOCTYPE html><html><head>\n        <title>jQuery+RequireJS Sample Page</title>\n        <script src=../doh/runner.js></script>\n        <script src=../doh/_browserRunner.js></script>\n        <script data-main=scripts/dynamicApp1.7.js src=../../require.js></script>\n        <script>\n            var master = new doh.Deferred(),\n                masterCount = 0;\n\n            function readyFired() {\n                masterCount += 1;\n                if (masterCount === 3) {\n                    master.callback(true);\n                }\n            }\n\n            doh.register(\n                "jqueryDynamic",\n                [\n                    {\n                        name: "jqueryDynamic",\n                        timeout: 3000,\n                        runTest: function() {\n                            return master;\n                        }\n                    }\n                ]\n            );\n            doh.run();\n        </script>\n    </head>\n    <body>\n        <h1>jQuery+RequireJS Test Page</h1>\n        <p>Tests loading of jquery plugins with require.</p>\n    \n\n</body></html>'});