/*!
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
/* eslint-disable */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):"object"==typeof exports?exports.CKEditor=e(require("vue")):t.CKEditor=e(t.Vue)}(window,(function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(e,n){e.exports=t},function(t,e,n){"use strict";(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.a=n}).call(this,n(2))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";n.r(e);var o=n(0),i=n.n(o);var r=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},u=n(1),a="object"==typeof self&&self&&self.Object===Object&&self,c=u.a||a||Function("return this")(),s=function(){return c.Date.now()},l=c.Symbol,f=Object.prototype,d=f.hasOwnProperty,p=f.toString,v=l?l.toStringTag:void 0;var m=function(t){var e=d.call(t,v),n=t[v];try{t[v]=void 0;var o=!0}catch(t){}var i=p.call(t);return o&&(e?t[v]=n:delete t[v]),i},h=Object.prototype.toString;var y=function(t){return h.call(t)},b=l?l.toStringTag:void 0;var g=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":b&&b in Object(t)?m(t):y(t)};var j=function(t){return null!=t&&"object"==typeof t};var $=function(t){return"symbol"==typeof t||j(t)&&"[object Symbol]"==g(t)},O=/^\s+|\s+$/g,w=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,x=/^0o[0-7]+$/i,S=parseInt;var E=function(t){if("number"==typeof t)return t;if($(t))return NaN;if(r(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=r(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(O,"");var n=_.test(t);return n||x.test(t)?S(t.slice(2),n?2:8):w.test(t)?NaN:+t},T=Math.max,V=Math.min;var D=function(t,e,n){var o,i,u,a,c,l,f=0,d=!1,p=!1,v=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function m(e){var n=o,r=i;return o=i=void 0,f=e,a=t.apply(r,n)}function h(t){return f=t,c=setTimeout(b,e),d?m(t):a}function y(t){var n=t-l;return void 0===l||n>=e||n<0||p&&t-f>=u}function b(){var t=s();if(y(t))return g(t);c=setTimeout(b,function(t){var n=e-(t-l);return p?V(n,u-(t-f)):n}(t))}function g(t){return c=void 0,v&&o?m(t):(o=i=void 0,a)}function j(){var t=s(),n=y(t);if(o=arguments,i=this,l=t,n){if(void 0===c)return h(l);if(p)return clearTimeout(c),c=setTimeout(b,e),m(l)}return void 0===c&&(c=setTimeout(b,e)),a}return e=E(e)||0,r(n)&&(d=!!n.leading,u=(p="maxWait"in n)?T(E(n.maxWait)||0,e):u,v="trailing"in n?!!n.trailing:v),j.cancel=function(){void 0!==c&&clearTimeout(c),f=0,o=l=i=c=void 0},j.flush=function(){return void 0===c?a:g(s())},j};var N={name:"ckeditor",render(){return Object(o.h)(this.tagName)},model:{prop:"modelValue",event:"update:modelValue"},props:{editor:{type:Function,default:null},modelValue:{type:String,default:""},config:{type:Object,default:()=>({})},tagName:{type:String,default:"div"},disabled:{type:Boolean,default:!1}},data:()=>({$_instance:null,$_lastEditorData:{type:String,default:""}}),mounted(){const t=Object.assign({},this.config);this.modelValue&&(t.initialData=this.modelValue),this.editor.create(this.$el,t).then(t=>{this.$_instance=t,t.isReadOnly=this.disabled,this.$_setUpEditorEvents(),this.$emit("ready",t)}).catch(t=>{console.error(t)})},beforeUnmount(){this.$_instance&&(this.$_instance.destroy(),this.$_instance=null),this.$emit("destroy",this.$_instance)},watch:{modelValue(t,e){t!==e&&t!==this.$_lastEditorData&&this.$_instance.setData(t)},disabled(t){this.$_instance.isReadOnly=t}},methods:{$_setUpEditorEvents(){const t=this.$_instance,e=D(e=>{const n=this.$_lastEditorData=t.getData();this.$emit("update:modelValue",n,e,t),this.$emit("input",n,e,t)},300,{leading:!0});t.model.document.on("change:data",e),t.editing.view.document.on("focus",e=>{this.$emit("focus",e,t)}),t.editing.view.document.on("blur",e=>{this.$emit("blur",e,t)})}}};const k=i.a?i.a.version:o.version,[M]=k.split(".").map(t=>parseInt(t,10));if(M<3)throw new Error("The CKEditor plugin works only with Vue 3+. For more information, please refer to https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html");const P={install(t){t.component("ckeditor",N)},component:N};e.default=P}]).default}));
//# sourceMappingURL=ckeditor.js.map