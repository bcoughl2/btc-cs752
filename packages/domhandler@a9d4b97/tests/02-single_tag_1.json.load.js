montageDefine("a9d4b97","tests/02-single_tag_1.json",{exports: {
  "name": "Single Tag 1",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<br>text</br>",
  "expected": [
    {
      "type": "tag",
      "name": "br",
      "attribs": {}
    },
    {
      "data": "text",
      "type": "text"
    }
  ]
}})