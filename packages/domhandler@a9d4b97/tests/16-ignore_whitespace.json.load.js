montageDefine("a9d4b97","tests/16-ignore_whitespace.json",{exports: {
  "name": "Options 'ignoreWhitespace' set to 'true'",
  "options": {
    "handler": {
      "ignoreWhitespace": true
    },
    "parser": {}
  },
  "html": "Line one\n<br> \t\n<br>\nline two<font>\n <br> x </font>",
  "expected": [
    {
      "data": "Line one\n",
      "type": "text"
    },
    {
      "type": "tag",
      "name": "br",
      "attribs": {}
    },
    {
      "type": "tag",
      "name": "br",
      "attribs": {}
    },
    {
      "data": "\nline two",
      "type": "text"
    },
    {
      "type": "tag",
      "name": "font",
      "attribs": {},
      "children": [
        {
          "type": "tag",
          "name": "br",
          "attribs": {}
        },
        {
          "data": " x ",
          "type": "text"
        }
      ]
    }
  ]
}})