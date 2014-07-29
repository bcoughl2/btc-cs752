montageDefine("a9d4b97","tests/09-unquoted_attrib.json",{exports: {
  "name": "Unquoted attributes",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<font size= 14>the text</font>",
  "expected": [
    {
      "type": "tag",
      "name": "font",
      "attribs": {
        "size": "14"
      },
      "children": [
        {
          "data": "the text",
          "type": "text"
        }
      ]
    }
  ]
}})