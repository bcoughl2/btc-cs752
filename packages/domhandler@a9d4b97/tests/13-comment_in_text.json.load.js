montageDefine("a9d4b97","tests/13-comment_in_text.json",{exports: {
  "name": "Comment within text",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "this is <!-- the comment --> the text",
  "expected": [
    {
      "data": "this is ",
      "type": "text"
    },
    {
      "data": " the comment ",
      "type": "comment"
    },
    {
      "data": " the text",
      "type": "text"
    }
  ]
}})