!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n["k-redux-factory"]=n["k-redux-factory"]||{})}(this,function(n){"use strict";var t=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e])}return n},r=function(n){return function(){return function(){return function(){return function(r){return t({},r,{action:n(r.action)})}}}}};n.reducer=function(n){return function(){return function(){return function(){return function(r){return t({},r,{state:n(r.action,r.state)})}}}}},n.mapAction=r,n.mapState=function(n){return function(t){return function(){return function(){return function(){return function(r){var e=r.action;return!n||n.test(e.type)?{action:e,state:t(r.state)}:r}}}}}},n.mapPayload=function(n){return function(e){return function(){return function(){return function(){return function(u){var o=u.action,c=o.payload,i=o.type;return!n||n.test(i)?r(function(n){return t({},n,{payload:e(c)})})()()()(u):u}}}}}},Object.defineProperty(n,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
