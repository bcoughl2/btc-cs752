montageDefine("a9d4b97","tests/06-comment_in_script.json",{exports: {
  "name": "Script source in comment",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<script><!--var foo = 1;--></script>",
  "expected": [
    {
      "type": "script",
      "name": "script",
      "attribs": {},
      "children": [
        {
          "data": "<!--var foo = 1;-->",
          "type": "text"
        }
      ]
    }
  ]
}})