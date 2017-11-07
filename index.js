!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("lodash/flatten"),require("lodash/isString"),require("lodash/isObjectLike"),require("lodash/get"),require("lodash/orderBy"),require("lodash/omit"),require("lodash/uniq"),require("lodash/without"),require("lodash/keyBy"),require("lodash/at")):"function"==typeof define&&define.amd?define(["exports","lodash/flatten","lodash/isString","lodash/isObjectLike","lodash/get","lodash/orderBy","lodash/omit","lodash/uniq","lodash/without","lodash/keyBy","lodash/at"],n):n(t["k-redux-factory"]=t["k-redux-factory"]||{},t._flatten,t._isString,t._isObjectLike,t._get,t._orderBy,t._omit,t._uniq,t._without,t._keyBy,t._at)}(this,function(t,n,e,r,u,a,i,o,c,f,d){"use strict";n=n&&"default"in n?n.default:n,e=e&&"default"in e?e.default:e,r=r&&"default"in r?r.default:r,u=u&&"default"in u?u.default:u,a=a&&"default"in a?a.default:a,i=i&&"default"in i?i.default:i,o=o&&"default"in o?o.default:o,c=c&&"default"in c?c.default:c,f=f&&"default"in f?f.default:f,d=d&&"default"in d?d.default:d;var l=function(t){return"@trampss/"+t.toUpperCase()},s=function(t){return l("SET_"+t)},y=function(t){return function(n){return{type:s(t),payload:n}}},p=function(t){return l("RESET_"+t)},h=function(t){return function(){return{type:p(t)}}},v=function(t){return l("ADD_"+t)},g=function(t){return l("UPDATE_"+t)},m=function(t){return function(n){return{type:g(t),payload:n}}},O=function(t){return l("REMOVE_"+t)},E=function(t){return l("ADD_OR_UPDATE_"+t)},_=function(t){return l("REPLACE_"+t)},b=function(t){return l("ORDER_BY_"+t)},k=function(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t},j=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},A=function(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)},D={data:{},keys:[],array:[],initialized:!1},q=function(t){return function(n,e){return t.array.find(function(t){return t[n]===e})}},R=function(t,n,e){var r=void 0,u=e[t];return r=q(n)(t,u)?n.array.map(function(n){return n[t]===u?e:n}):[].concat(A(n.array),[e]),j({},n,{data:j({},n.data,k({},u,e)),keys:o([].concat(A(n.keys),[u])),array:r,initialized:!0})},w=function(t,n,e){var r=e[t];return j({},n,{data:j({},n.data,k({},r,j({},n.data[r],e))),array:n.array.map(function(n){return n[t]===r?j({},n,e):n})})},T=function(t,n,e){var r=e[t];return j({},n,{data:j({},n.data,k({},r,e)),array:n.array.map(function(n){return n[t]===r?e:n})})},z=function(t){return function(d){return function(){return function(){var l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,y=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},h=y.type,m=y.payload;switch(h){case s(d):return{data:f(m,t),keys:o(m.map(function(n){return n[t]})),array:m,initialized:!0};case v(d):return R(t,l,m);case E(d):return q(l)(t,m[t])?w(t,l,m):R(t,l,m);case g(d):return q(l)(t,m[t])?w(t,l,m):l;case _(d):return q(l)(t,m[t])?T(t,l,m):l;case b(d):var k=m,z="asc";r(m)&&(k=m.by,z=m.desc?"desc":"asc");var B=a(l.array,e(k)?function(t){return u(t,k)}:k,z);return j({},l,{array:B,keys:o(B.map(function(n){return n[t]}))});case O(d):var P=n([m]);return j({},l,{data:i(l.data,P),keys:c.apply(void 0,[l.keys].concat(A(P))),array:l.array?l.array.filter(function(n){return!P.includes(n[t])}):[]});case p(d):return D;default:return l}}}}},B=Object.freeze({set:y,SET:s,add:function(t){return function(n){return{type:v(t),payload:n}}},ADD:v,reset:h,RESET:p,remove:function(t){return function(n){return{type:O(t),payload:n}}},REMOVE:O,update:m,UPDATE:g,addOrUpdate:function(t){return function(n){return{type:E(t),payload:n}}},ADD_OR_UPDATE:E,replace:function(t){return function(n){return{type:_(t),payload:n}}},REPLACE:_,orderBy:function(t){return function(n){return{type:b(t),payload:n}}},ORDER_BY:b}),P=function(t){return function(n){var e=n;return void 0!==t.path&&(e=d(n,t.path)[0]),e[t.name]}},S=function(t){return function(n){return function(e){return P(n)(e)[t]}}},U=S("keys"),x=S("array"),L=S("initialized"),V=function(t){return S("data")(t)},C={middlewares:[function(t){return function(n){return function(e){return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return j({},r,{state:z(t)(n)(e)(r.state,r.action)})}}}}],actions:B,selectors:Object.freeze({getState:P,getKeys:U,getAsArray:x,getLength:function(t){return function(n){return U(t)(n).length}},isInitialized:L,get:function(t){return function(n){return function(e){var r=V(t)(e);return n?Array.isArray(n)?n.map(function(t){return r[t]}):r[n]:r}}},getBy:function(t){return function(n,e){return function(r){var u=x(t)(r);return Array.isArray(e)?u.filter(function(t){return e.includes(d(t,n)[0])}):u.filter(function(t){return e===d(t,n)[0]})}}}})},M={},N=function(t){return void 0!==t?t:M},I=function(){return function(t){return function(n){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N(n),r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=r.type,a=r.payload;switch(u){case s(t):return a;case g(t):return j({},e,a);case p(t):return N(n);default:return e}}}}},K=function(t){return function(){return function(n){return P(t)(n)}}},Y={middlewares:[function(t){return function(t){return function(n){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return j({},e,{state:I()(t)(n)(e.state,e.action)})}}}}],actions:Object.freeze({set:y,SET:s,reset:h,RESET:p,update:m,UPDATE:g}),selectors:Object.freeze({get:K,isInitialized:function(t){return function(n){return void 0!==t.defaultData?P(t)(n)!==t.defaultData:K(t)()(n)!==M}}})},W=Object.freeze({keyValue:C,simpleObject:Y}),F=function(t){return function(n){return function(e){return function(r){return function(u){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=a.type,o={state:u,action:{type:void 0===i?"UNKNOWN":i,payload:a.payload}};return[].concat(A(t.pre||[]),A(t.engine||[]),A(t.post||[])).map(function(t){return t(n)(e)(r)}).forEach(function(t){o=t(o)}),o.state}}}}},G=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(n){var e=n.key,r=n.type,u=void 0===r?"keyValue":r,a=n.prefix,i=void 0===a?"":a,o=n.name,c=n.defaultData,f=W[u];return Object.assign.apply(Object,[F(j({},t,{engine:f.middlewares}))(e)(""+i+o)(c),{trampssType:u}].concat(A(Object.keys(f.actions).map(function(t){return k({},t,f.actions[t](""+i+o))})),A(Object.keys(f.selectors).map(function(t){return k({},t,f.selectors[t](n))}))))}},H=function(){throw Error("parameter is not a middleware configuration, nor a factory option object.")},J=function(t){return t.engine||t.pre||t.post},Q=function(t){return!!t.name||"string"==typeof t},X=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(n){return null!==n&&void 0!==n||H(),J(n)?function(e){return G(n)(j({},e,t))}:Q(n)?"string"==typeof n?G()(j({name:n},t)):G()(j({},n,t)):void H()}},Z=X({type:"simpleObject"}),$=X({type:"keyValue"}),tt=X();t.simpleObject=Z,t.keyValue=$,t.default=tt,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
