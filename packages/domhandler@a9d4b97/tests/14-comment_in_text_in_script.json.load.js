montageDefine("a9d4b97","tests/14-comment_in_text_in_script.json",{exports: {
  "name": "Comment within text within script",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<script>this is <!-- the comment --> the text</script>",
  "expected": [
    {
      "type": "script",
      "name": "script",
      "attribs": {},
      "children": [
        {
          "data": "this is <!-- the comment --> the text",
          "type": "text"
        }
      ]
    }
  ]
}})