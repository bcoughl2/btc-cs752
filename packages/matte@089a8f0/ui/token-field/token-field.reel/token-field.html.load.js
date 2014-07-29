montageDefine("089a8f0","ui/token-field/token-field.reel/token-field.html",{text:'<!DOCTYPE html><html><head>\n    <meta charset=utf-8>\n    <link rel=stylesheet href=token-field.css>\n    <script type=text/montage-serialization>\n{\n    "owner": {\n        "prototype": "ui/token-field/token-field.reel",\n        "properties": {\n            "element": {"#": "token-field"},\n            "_autocomplete": {"@": "autocomplete"},\n            "_tokenList": {"@": "tokenList"},\n            "_tokensController": {"@": "tokensController"}\n        },\n        "bindings": {\n            "_suggestedValue": {"<-": "@autocomplete.suggestedValue"},\n            "_autocompleteValue": {"<-": "@autocomplete.value"}\n        }\n    },\n\n    "tokensController": {\n        "prototype": "montage/core/range-controller",\n        "properties": {\n            "selectAddedObjects": true\n        },\n        "bindings": {\n            "content": {"<->": "@owner.values"}\n        }\n    },\n\n    "tokenList": {\n        "prototype": "montage/ui/repetition.reel",\n        "properties": {\n            "element": {\n                "#": "token-list"\n            },\n            "isSelectionEnabled": true,\n            "contentController": {"@": "tokensController"}\n        }\n    },\n\n    "token": {\n        "prototype": "ui/token-field/token.reel",\n        "properties": {\n            "element": {"#": "token"}\n        },\n        "bindings": {\n            "value": {"<-": "@tokenList:iteration.object"},\n            "tokensController": {"<-": "@tokenList.contentController"},\n            "textPropertyPath": {"<-": "@owner.textPropertyPath"},\n            "allowAdHocValues": {"<-": "@owner.allowAdHocValues"}\n        }\n    },\n\n    "autocomplete": {\n        "prototype": "ui/autocomplete/autocomplete.reel",\n        "properties": {\n            "element": {"#": "autocomplete"},\n            "identifier": "autocomplete",\n            "delay": "500",\n            "value": ""\n        },\n        "bindings": {\n            "textPropertyPath": {"<-": "@owner.textPropertyPath"},\n            "placeholder": {"<-": "@owner.placeholder"}\n        }\n    }\n}\n    </script>\n</head>\n<body>\n    <div data-montage-id=token-field class=matte-TokenField>\n        <div data-montage-id=token-list class=matte-TokenField-list>\n            <span data-montage-id=token></span>\n        </div>\n        <input data-montage-id=autocomplete class=matte-TokenField-Autocomplete tabindex=0>\n    </div>\n\n\n</body></html>'});