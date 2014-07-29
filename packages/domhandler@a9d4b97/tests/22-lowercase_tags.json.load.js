montageDefine("a9d4b97","tests/22-lowercase_tags.json",{exports: {
  "name": "Basic test",
  "options": {
    "handler": {},
    "parser": {
      "lowerCaseTags": true
    }
  },
  "html": "<!DOCTYPE html><HTML><TITLE>The Title</title><BODY>Hello world</body></html>",
  "expected": [
    {
      "name": "!doctype",
      "data": "!DOCTYPE html",
      "type": "directive"
    },
    {
      "type": "tag",
      "name": "html",
      "attribs": {},
      "children": [
        {
          "type": "tag",
          "name": "title",
          "attribs": {},
          "children": [
            {
              "data": "The Title",
              "type": "text"
            }
          ]
        },
        {
          "type": "tag",
          "name": "body",
          "attribs": {},
          "children": [
            {
              "data": "Hello world",
              "type": "text"
            }
          ]
        }
      ]
    }
  ]
}})