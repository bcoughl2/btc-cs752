montageDefine("d418305","ui/list.reel/list.html",{text:'<!DOCTYPE html><html><head>\n    <meta charset=utf-8>\n    <link rel=stylesheet href=list.css>\n    <link rel=stylesheet href=../list-item.reel/list-item.css>\n    <script type=text/montage-serialization>{"owner":{"properties":{"element":{"#":"list"}}},"repetition":{"prototype":"montage/ui/repetition.reel","properties":{"element":{"#":"repetition"}},"bindings":{"isSelectionEnabled":{"<-":"@owner.isSelectionEnabled"}}},"scroller":{"prototype":"matte/ui/scroller.reel","properties":{"element":{"#":"scroller"}},"bindings":{"axis":{"<-":"@owner.axis"}}},":iteration":{"alias":"@repetition:iteration"}}</script>\n</head>\n<body>\n	<div data-montage-id=list class=digit-List>\n        <div data-montage-id=scroller class=digit-List-scroller>\n            <ul data-montage-id=repetition class=digit-List-repetition>\n                <li data-param=*></li>\n            </ul>\n        </div>\n	</div>\n\n\n</body></html>'});