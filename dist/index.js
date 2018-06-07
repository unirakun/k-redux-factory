var n,t,r=require("lodash"),e=function(n){return"@@krf/"+n.toUpperCase()},u=function(n){return function(t){return(n?">":"")+n+">"+t}},i=function(n){return function(t){return e("SET"+u(n)(t))}},o=function(n){return function(t){return function(r){return{type:i(n)(t),payload:r}}}},c=function(n){return function(t){return e("RESET"+u(n)(t))}},a=function(n){return function(t){return function(){return{type:c(n)(t)}}}},f=function(n){return function(t){return e("ADD"+u(n)(t))}},s=function(n){return function(t){return e("UPDATE"+u(n)(t))}},d=function(n){return function(t){return function(r){return{type:s(n)(t),payload:r}}}},y=function(n){return function(t){return e("REMOVE"+u(n)(t))}},p=function(n){return function(t){return e("ADD_OR_UPDATE"+u(n)(t))}},l={set:o,SET:i,add:function(n){return function(t){return function(r){return{type:f(n)(t),payload:r}}}},ADD:f,reset:a,RESET:c,remove:function(n){return function(t){return function(r){return{type:y(n)(t),payload:r}}}},REMOVE:y,update:d,UPDATE:s,addOrUpdate:function(n){return function(t){return function(r){return{type:p(n)(t),payload:r}}}},ADD_OR_UPDATE:p},v={data:{},keys:[],array:[],initialized:!1},g=function(n,t){var r={};return function(n){return Array.isArray(n)?n:[n]}(t).forEach(function(t){r[t[n]]=t}),r},O=function(n){return function(t){return Object.assign({},n,{data:t,keys:Object.keys(t),array:Object.values(t),initialized:!0})}},E=function(n,t,r){return O(t)(g(n,r))},b=function(n,r,e){var u=e[n];return O(r)(Object.assign({},r.data,((t={})[u]=Object.assign({},r.data[u],e),t)))},j=function(n,t){return void 0!==t?E(n,{},t):v},m=function(t){return function(e){return function(u){return function(o){return function(a,d){void 0===a&&(a=j(t,o)),void 0===d&&(d={});var l=d.payload;switch(d.type){case i(e)(u):return E(t,a,l);case f(e)(u):return function(t,r,e){var u=e[t];return O(r)(Object.assign({},r.data,((n={})[u]=e,n)))}(t,a,l);case p(e)(u):return b(t,a,l);case y(e)(u):return function(n,t,e){return O(t)(r.omit(t.data,[].concat(e)))}(0,a,l);case c(e)(u):return j(t,o);case s(e)(u):return function(n){return function(t){return void 0!==n.data[t]}}(a)(l[t])?b(t,a,l):a;default:return a}}}}}};var A=function(n){return function(t){var e=t,u=n.name,i=n.path;void 0!==i&&i.length>0&&(e=r.at(t,i)[0]);return e[u]}},D=function(n){return function(t){return function(r){return A(t)(r)[n]}}},k=D("keys"),T=D("array"),h=D("initialized"),U={},w=function(n){return void 0!==n?n:U},R=function(){return function(n){return function(t){return function(r){return function(e,u){void 0===e&&(e=w(r)),void 0===u&&(u={});var o=u.payload;switch(u.type){case i(n)(t):return o;case s(n)(t):return Object.assign({},e,o);case c(n)(t):return w(r);default:return e}}}}}};var S,z,P=function(n){return function(){return function(t){return A(n)(t)}}},V={keyValue:{middlewares:[function(n){return function(t){return function(r){return function(e){return function(u){return void 0===u&&(u={}),Object.assign({},u,{state:m(n)(t)(r)(e)(u.state,u.action)})}}}}}],actions:l,selectors:{getState:A,getKeys:k,getAsArray:T,getLength:function(n){return function(t){return k(n)(t).length}},isInitialized:h,get:function(n){return function(t){return function(r){var e=function(n){return D("data")(n)}(n)(r);return null==t?e:Array.isArray(t)?t.map(function(n){return e[n]}):e[t]}}},getBy:function(n){return function(t,e){return function(u){var i=T(n)(u);return Array.isArray(e)?i.filter(function(n){return e.includes(r.at(n,t)[0])}):i.filter(function(n){return e===r.at(n,t)[0]})}}},hasKey:function(n){return function(t){return function(r){return k(n)(r).includes(t)}}}}},simpleObject:{middlewares:[function(n){return function(t){return function(r){return function(e){return function(u){return void 0===u&&(u={}),Object.assign({},u,{state:R(n)(t)(r)(e)(u.state,u.action)})}}}}}],actions:{set:o,SET:i,reset:a,RESET:c,update:d,UPDATE:s},selectors:{get:P,isInitialized:function(n){return function(t){return void 0!==n.defaultData?A(n)(t)!==n.defaultData:P(n)()(t)!==U}}}}};var _=function(n){return void 0===n&&(n={}),function(t){var r=t.key,e=t.type;void 0===e&&(e="keyValue");var u=t.prefix;void 0===u&&(u="");var i=t.name,o=t.defaultData,c=V[e];return Object.assign.apply(Object,[function(n){return function(t){return function(r){return function(e){return function(u){return function(i,o){void 0===o&&(o={});var c=o.type;void 0===c&&(c="UNKNOWN");var a={state:i,action:{type:c,payload:o.payload}};return(n.pre||[].concat(n.engine||[],n.post||[])).map(function(n){return n(t)(r)(e)(u)}).forEach(function(n){a=n(a)}),a.state}}}}}}(Object.assign({},n,{engine:c.middlewares}))(r)(u)(i)(o),{krfType:e}].concat(Object.keys(c.actions).map(function(n){return(S={})[n]=c.actions[n](u)(i),S}),Object.keys(c.selectors).map(function(n){return(z={})[n]=c.selectors[n](t),z})))}},K=function(){throw Error("parameter is not a middleware configuration, nor a factory option object.")},N=function(n){return void 0===n&&(n={}),function(t){return null==t&&K(),function(n){return n.engine||n.pre||n.post}(t)?function(r){return _(t)(Object.assign({},r,n))}:function(n){return!!n.name||"string"==typeof n}(t)?"string"==typeof t?_()(Object.assign({},{name:t},n)):_()(Object.assign({},t,n)):void K()}},x=(N({type:"simpleObject"}),N({type:"keyValue"}),N());module.exports=x;
