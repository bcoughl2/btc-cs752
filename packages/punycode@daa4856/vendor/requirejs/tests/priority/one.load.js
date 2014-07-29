montageDefine("daa4856","vendor/requirejs/tests/priority/one",{dependencies:[],factory:function(require,exports,module){//Example layer file.

define("alpha",
    ["beta", "gamma"],
    function (beta, gamma) {
        return {
            name: "alpha",
            betaName: beta.name
        };
    }
);

define("beta",
    ["gamma"],
    function (gamma) {
        return {
            name: "beta",
            gammaName: gamma.name
        };
    }
);

}})