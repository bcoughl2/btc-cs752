montageDefine("089a8f0","ui/loading-panel.reel/loading-panel.html",{text:'<!DOCTYPE html><html><head>\n    <meta charset=utf-8>\n    <link rel=stylesheet href=loading-panel.css>\n    <script type=text/montage-serialization>\n{\n    "owner": {\n        "prototype": "ui/loading-panel.reel",\n        "properties": {\n            "element": {"#": "loadingPanel"}\n        }\n    },\n\n    "loadingIndicator": {\n        "prototype": "ui/progress.reel",\n        "properties": {\n            "element": {"#": "loadingIndicator"}\n        },\n        "bindings": {\n            "value": {"<-": "@owner.initializedModuleCount"},\n            "max": {"<-": "@owner.requiredModuleCount"}\n        }\n    },\n\n    "loadedCount": {\n        "prototype": "montage/ui/text.reel",\n        "properties": {\n            "element": {"#": "loadedCount"}\n        },\n        "bindings": {\n            "value": {"<-": "@owner.initializedModuleCount"}\n        }\n    },\n\n     "requiredCount": {\n        "prototype": "montage/ui/text.reel",\n        "properties": {\n            "element": {"#": "requiredCount"}\n        },\n        "bindings": {\n            "value": {"<-": "@owner.requiredModuleCount"}\n        }\n    }\n}\n    </script>\n</head>\n<body>\n    <div data-montage-id=loadingPanel class=matte-LoadingPanel>\n        <div data-montage-id=loadingIndicator class=matte-LoadingPanel-loadingIndicator></div>\n        <div data-montage-id=loadingCount class=matte-LoadingPanel-loadingCount>\n            <span data-montage-id=loadedCount class=matte-LoadingPanel-loadedCount>0</span>\n            <span class=matte-Loading-divider>/</span>\n            <span data-montage-id=requiredCount class=requiredCount>0</span>\n        </div>\n    </div>\n\n\n</body></html>'});