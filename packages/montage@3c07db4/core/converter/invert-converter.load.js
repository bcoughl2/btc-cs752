montageDefine("3c07db4","core/converter/invert-converter",{dependencies:["../core","./converter"],factory:function(e,t){e("../core").Montage;var i=e("./converter").Converter;t.InvertConverter=i.specialize({convert:{value:function(e){return!e}},revert:{value:function(e){return!e}}})}});