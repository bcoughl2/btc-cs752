montageDefine("daa4856","vendor/requirejs/tests/text/widget",{dependencies:[],factory:function(require,exports,module){define("widget",
  ["subwidget", "text!widget.html"],
  function(subwidget, template) {
    return {
      subWidgetName: subwidget.name,
      subWidgetTemplate: subwidget.template,
      subWidgetTemplate2: subwidget.template2,
      template: template
    };
  }
);

}})