montageDefine("a9d4b97","tests/17-xml_namespace.json",{exports: {
  "name": "XML Namespace",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<ns:tag>text</ns:tag>",
  "expected": [
    {
      "type": "tag",
      "name": "ns:tag",
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