montageDefine("a9d4b97","tests/15-non-verbose.json",{exports: {
  "name": "Option 'verbose' set to 'false'",
  "options": {
    "handler": {
      "verbose": false
    },
    "parser": {}
  },
  "html": "<\n font\t\n size='14' \n>the text<\n /\t\nfont\t \n>",
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