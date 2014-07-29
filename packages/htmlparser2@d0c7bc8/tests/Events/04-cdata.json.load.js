montageDefine("d0c7bc8","tests/Events/04-cdata.json",{exports: {
  "name": "CDATA",
  "options": {
    "handler": {},
    "parser": {}
  },
  "html": "<tag><![CDATA[ asdf ><asdf></adsf><> fo]]></tag>",
  "expected": [
    {
      "event": "opentagname",
      "data": [
        "tag"
      ]
    },
    {
      "event": "opentag",
      "data": [
        "tag",
        {}
      ]
    },
    {
      "event": "cdatastart",
      "data": []
    },
    {
      "event": "text",
      "data": [
        " asdf ><asdf></adsf><> fo"
      ]
    },
    {
      "event": "cdataend",
      "data": []
    },
    {
      "event": "closetag",
      "data": [
        "tag"
      ]
    }
  ]
}})