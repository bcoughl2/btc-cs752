(function(){function e(e){var i=e.split("?"),t=parseInt(i[0],10),s=i[1].split(":"),a=s[t];return{index:t,choices:s,choice:a}}define({normalize:function(t,s){var a=e(t),u=a.choices;for(i=0;u.length>i;i++)u[i]=s(u[i]);return a.index+"?"+u.join(":")},load:function(i,t,s){t([e(i).choice],function(e){s(e)})},write:function(i,t,s){var a=e(t);s("define('"+i+"!"+t+"', ['"+a.choice+"'], function (value) { return value;});\n")}})})();