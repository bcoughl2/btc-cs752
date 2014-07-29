montageDefine("9276fa5","vendor/requirejs/docs/errors.html",{text:"<html><head></head><body><div id=directory class=section>\n<h1>Common Errors</h1>\n\n<ul class=\"index mono\">\n<li class=hbox><a href=#mismatch>Mismatched anonymous define() modules ...</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 1</span></li>\n<li class=hbox><a href=#timeout>Load timeout for modules: ...</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 2</span></li>\n<li class=hbox><a href=#defineerror>Error evaluating module ...</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 3</span></li>\n<li class=hbox><a href=#notloaded>Module name ... has not been loaded yet for context: ...</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 4</span></li>\n<li class=hbox><a href=#requireargs>Invalid require call</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 5</span></li>\n<li class=hbox><a href=#interactive>No matching script interactive for ...</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 6</span></li>\n<li class=hbox><a href=#pathnotsupported>Path is not supported: ...</a><span class=\"spacer boxFlex\"></span><span class=sect>§ 7</span></li>\n</ul>\n\n<p>This page lists errors that are generated by RequireJS. If the following information does not fix the problem, you can ask on the <a href=https://groups.google.com/group/requirejs>RequireJS list</a> or <a href=https://github.com/jrburke/requirejs/issues>open an issue</a>. In either case it is best to have an example or detailed explanation of the problem, hopefully with steps to reproduce.</p>\n\n</div>\n\n<div class=section>\n<h2><a name=mismatch>Mismatched anonymous define() modules ...</a><span class=sectionMark>§ 1</span></h2>\n\n<p>If you manually code a script tag in HTML to load a script with an anonymous define() call, this error can occur.</p>\n\n<p>Also seen if you manually code a script tag in HTML to load a script that has a few named modules, but then try to load an anonymous module that ends up having the same name as one of the named modules in the script loaded by the manually coded script tag.</p>\n\n<p>Finally, if you use the loader plugins or anonymous modules (modules that call define() with no string ID) but do not use the RequireJS optimizer to combine files together, this error can occur. The optimizer knows how to name anonymous modules correctly so that they can be combined with other modules in an optimized file.</p>\n\n<p>To avoid the error:</p>\n\n<ul>\n    <li>Be sure to load all scripts that call define() via the RequireJS API. Do not manually code script tags in HTML to load scripts that have define() calls in them.</li>\n    <li>If you manually code an HTML script tag, be sure it only includes named modules, and that an anonymous module that will have the same name as one of the modules in that file is not loaded.</li>\n    <li>If the problem is the use of loader plugins or anonymous modules but the RequireJS optimizer is not used for file bundling, use the RequireJS optimizer.</li>\n</ul>\n\n</div>\n\n\n<div class=section>\n<h2><a name=timeout>Load timeout for modules: ...</a><span class=sectionMark>§ 2</span></h2>\n\n<p>Likely causes and fixes:</p>\n\n<ul>\n    <li>There was a script error in one of the listed modules. If there is no script error in the browser's error console, and if you are using Firebug, try loading the page in another browser like Chrome or Safari. Sometimes script errors do not show up in Firebug.</li>\n    <li>The path configuration for a module is incorrect. Check the \"Net\" or \"Network\" tab in the browser's developer tools to see if there was a 404 for an URL that would map to the module name. Make sure the script file is in the right place. In some cases you may need to use the <a href=api.html#config>paths configuration</a> to fix the URL resolution for the script.</li>\n</ul>\n\n</div>\n\n\n<div class=section>\n<h2><a name=defineerror>Error evaluating module ...</a><span class=sectionMark>§ 3</span></h2>\n\n<p>An error occured when the define() function was called for the module given in the error message. It is an error with the code logic inside the define function. The error could happen inside a require callback.</p>\n\n<p>In Firefox and WebKit browsers, a line number and file name will be indicated in the error. It can be used to locate\nthe source of the problem. Better isolation of the error can be done by using a debugger to place a\nbreakpoint in the file that contains the error.</p>\n\n</div>\n\n<div class=section>\n<h2><a name=notloaded>Module name ... has not been loaded yet for context: ...</a><span class=sectionMark>§ 4</span></h2>\n\n<p>This occurs when there is is a require('name') call, but the 'name' module has not been loaded yet.</p>\n\n<p>If you are using the simplified define wrapper, make sure you have <strong>require</strong> as the first argument to the definition function:</p>\n\n<pre><code>define(function (require) {\n    var namedModule = require('name');\n});\n</code></pre>\n\n<p>If you are listing dependencies in the dependency array, make sure that <strong>require</strong> and <strong>name</strong> are in the dependency array:</p>\n\n<pre><code>define(['require', 'name'], function (require) {\n    var namedModule = require('name');\n});\n</code></pre>\n\n<p>Or, if part of a require() callback:</p>\n\n<pre><code>require(['require', 'name'], function (require) {\n    var namedModule = require('name');\n});\n</code></pre>\n\n<p>Be sure that <strong>require('name')</strong> only occurs inside a define() definition function or a require() callback function, never in the global space by its own.</p>\n\n</div>\n\n\n<div class=section>\n<h2><a name=requireargs>Invalid require call</a><span class=sectionMark>§ 4</span></h2>\n\n<p>This occurs when there is is a call like:</p>\n\n<pre><code>require('dependency', function (dependency) {});\n</code></pre>\n\n<p>Asynchronously loading dependencies should use an array to list the dependencies:</p>\n\n<pre><code>require(['dependency'], function (dependency) {});\n</code></pre>\n\n</div>\n\n<div class=section>\n<h2><a name=interactive>No matching script interactive for ...</a><span class=sectionMark>§ 6</span></h2>\n\n<p>This error only shows up in some IE browsers. Most likely caused by loading a script that calls define() but was loaded in a plain script tag or via some other call, like an eval() of a JavaScript string.</p>\n\n<p>To avoid the error, be sure to load all scripts that call define via the RequireJS API.</p>\n\n</div>\n\n<div class=section>\n<h2><a name=pathnotsupported>Path is not supported: ...</a><span class=sectionMark>§ 7</span></h2>\n\n<p>This error occurs when the optimizer encounters a path to a module or script which is a network path. The optimizer only allows\nbuilding with local resources. To fix it:</p>\n\n<p>Make sure you reference the network dependency as a module name, not as a full URL, so that it can be mapped to a different\nduring the build:</p>\n\n\n<pre><code>//DO NOT DO THIS\nrequire(['http://some.domain.dom/path/to/dependency.js'],\nfunction (dependency) {});\n\n//Rather, do this:\nrequire.config({\n    paths: {\n        'dependency': 'http://some.domain.dom/path/to/dependency'\n    }\n});\n\nrequire(['dependency'], function (dependency) {});\n</code></pre>\n\n<p>If you want to include this dependency in the built/optimized file, download the JS file and in the\nbuild profile for the optimizer, put in a paths config that points to that local file.</p>\n\n<p>If you want to <b>exclude</b> that file from being included, and just need to map \"dependency\"\nfor the build (otherwise it will not build), then use the special \"empty:\" paths config:</p>\n\n<pre><code>//Inside the build profile\n{\n    paths: {\n        'dependency': 'empty:'\n    }\n}\n</code></pre>\n\n</div>\n</body></html>"});