montageDefine("a9d4b97","tests/18-enforce_empty_tags.json",{exports: {
  "name": "Enforce empty tags",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<link>text</link>",
  "expected": [
    {
      "type": "tag",
      "name": "link",
      "attribs": {}
    },
    {
      "data": "text",
      "type": "text"
    }
  ]
}})