montageDefine("a9d4b97","tests/05-tags_in_comment.json",{exports: {
  "name": "Special char in comment",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<head><!-- commented out tags <title>Test</title>--></head>",
  "expected": [
    {
      "type": "tag",
      "name": "head",
      "attribs": {},
      "children": [
        {
          "data": " commented out tags <title>Test</title>",
          "type": "comment"
        }
      ]
    }
  ]
}})