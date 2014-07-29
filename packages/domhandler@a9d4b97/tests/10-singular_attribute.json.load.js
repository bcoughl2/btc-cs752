montageDefine("a9d4b97","tests/10-singular_attribute.json",{exports: {
  "name": "Singular attribute",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<option value='foo' selected>",
  "expected": [
    {
      "type": "tag",
      "name": "option",
      "attribs": {
        "value": "foo",
        "selected": ""
      }
    }
  ]
}})