montageDefine("a9d4b97","tests/03-single_tag_2.json",{exports: {
  "name": "Single Tag 2",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<br>text<br>",
  "expected": [
    {
      "type": "tag",
      "name": "br",
      "attribs": {}
    },
    {
      "data": "text",
      "type": "text"
    },
    {
      "type": "tag",
      "name": "br",
      "attribs": {}
    }
  ]
}})