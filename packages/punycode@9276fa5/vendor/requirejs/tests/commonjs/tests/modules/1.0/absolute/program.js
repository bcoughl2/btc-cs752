define(["require","exports","module","test","submodule/a","b"],function(e){var i=e("test"),t=e("submodule/a"),s=e("b");i.assert(t.foo().foo===s.foo,"require works with absolute identifiers"),i.print("DONE","info")});