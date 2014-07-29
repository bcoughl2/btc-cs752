montageDefine("a9d4b97","tests/19-ignore_empty_tags.json",{exports: {
  "name": "Ignore empty tags (xml mode)",
  "options": {
    "handler": {},
    "parser": {
      "xmlMode": true
    }
  },
  "html": "<link>text</link>",
  "expected": [
    {
      "type": "tag",
      "name": "link",
      "attribs": {},
      "children": [
        {
          "data": "text",
          "type": "text"
        }
      ]
    }
  ]
}})