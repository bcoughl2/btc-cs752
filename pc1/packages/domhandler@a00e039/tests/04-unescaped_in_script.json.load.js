montageDefine("a00e039","tests/04-unescaped_in_script.json",{exports:{name:"Unescaped chars in script",options:{handler:{},parser:{}},html:'<head><script language="Javascript">var foo = "<bar>"; alert(2 > foo); var baz = 10 << 2; var zip = 10 >> 1; var yap = "<<>>>><<";</script></head>',expected:[{type:"tag",name:"head",attribs:{},children:[{type:"script",name:"script",attribs:{language:"Javascript"},children:[{data:'var foo = "<bar>"; alert(2 > foo); var baz = 10 << 2; var zip = 10 >> 1; var yap = "<<>>>><<";',type:"text"}]}]}]}});