var Ae=Object.defineProperty;var xe=Object.getOwnPropertySymbols;var Te=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable,Oe=Reflect.get,Re=Reflect.set;var Ce=(e,n,r)=>n in e?Ae(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,Ee=(e,n)=>{for(var r in n||(n={}))Te.call(n,r)&&Ce(e,r,n[r]);if(xe)for(var r of xe(n))Se.call(n,r)&&Ce(e,r,n[r]);return e};function makeMap(e,n){const r=Object.create(null),t=e.split(",");for(let o=0;o<t.length;o++)r[t[o]]=!0;return n?o=>!!r[o.toLowerCase()]:o=>!!r[o]}const specialBooleanAttrs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",isSpecialBooleanAttr=makeMap(specialBooleanAttrs);function includeBooleanAttr(e){return!!e||e===""}function normalizeStyle(e){if(isArray(e)){const n={};for(let r=0;r<e.length;r++){const t=e[r],o=isString(t)?parseStringStyle(t):normalizeStyle(t);if(o)for(const i in o)n[i]=o[i]}return n}else{if(isString(e))return e;if(isObject$1(e))return e}}const listDelimiterRE=/;(?![^(]*\))/g,propertyDelimiterRE=/:(.+)/;function parseStringStyle(e){const n={};return e.split(listDelimiterRE).forEach(r=>{if(r){const t=r.split(propertyDelimiterRE);t.length>1&&(n[t[0].trim()]=t[1].trim())}}),n}function normalizeClass(e){let n="";if(isString(e))n=e;else if(isArray(e))for(let r=0;r<e.length;r++){const t=normalizeClass(e[r]);t&&(n+=t+" ")}else if(isObject$1(e))for(const r in e)e[r]&&(n+=r+" ");return n.trim()}const toDisplayString=e=>e==null?"":isArray(e)||isObject$1(e)&&(e.toString===objectToString||!isFunction(e.toString))?JSON.stringify(e,replacer,2):String(e),replacer=(e,n)=>n&&n.__v_isRef?replacer(e,n.value):isMap(n)?{[`Map(${n.size})`]:[...n.entries()].reduce((r,[t,o])=>(r[`${t} =>`]=o,r),{})}:isSet(n)?{[`Set(${n.size})`]:[...n.values()]}:isObject$1(n)&&!isArray(n)&&!isPlainObject(n)?String(n):n,EMPTY_OBJ={},EMPTY_ARR=[],NOOP=()=>{},NO=()=>!1,onRE=/^on[^a-z]/,isOn=e=>onRE.test(e),isModelListener=e=>e.startsWith("onUpdate:"),extend=Object.assign,remove=(e,n)=>{const r=e.indexOf(n);r>-1&&e.splice(r,1)},hasOwnProperty=Object.prototype.hasOwnProperty,hasOwn=(e,n)=>hasOwnProperty.call(e,n),isArray=Array.isArray,isMap=e=>toTypeString(e)==="[object Map]",isSet=e=>toTypeString(e)==="[object Set]",isFunction=e=>typeof e=="function",isString=e=>typeof e=="string",isSymbol=e=>typeof e=="symbol",isObject$1=e=>e!==null&&typeof e=="object",isPromise$1=e=>isObject$1(e)&&isFunction(e.then)&&isFunction(e.catch),objectToString=Object.prototype.toString,toTypeString=e=>objectToString.call(e),toRawType=e=>toTypeString(e).slice(8,-1),isPlainObject=e=>toTypeString(e)==="[object Object]",isIntegerKey=e=>isString(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,isReservedProp=makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),cacheStringFunction=e=>{const n=Object.create(null);return r=>n[r]||(n[r]=e(r))},camelizeRE=/-(\w)/g,camelize=cacheStringFunction(e=>e.replace(camelizeRE,(n,r)=>r?r.toUpperCase():"")),hyphenateRE=/\B([A-Z])/g,hyphenate=cacheStringFunction(e=>e.replace(hyphenateRE,"-$1").toLowerCase()),capitalize=cacheStringFunction(e=>e.charAt(0).toUpperCase()+e.slice(1)),toHandlerKey=cacheStringFunction(e=>e?`on${capitalize(e)}`:""),hasChanged=(e,n)=>!Object.is(e,n),invokeArrayFns=(e,n)=>{for(let r=0;r<e.length;r++)e[r](n)},def=(e,n,r)=>{Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value:r})},toNumber=e=>{const n=parseFloat(e);return isNaN(n)?e:n};let _globalThis;const getGlobalThis=()=>_globalThis||(_globalThis=typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});let activeEffectScope;const effectScopeStack=[];class EffectScope{constructor(n=!1){this.active=!0,this.effects=[],this.cleanups=[],!n&&activeEffectScope&&(this.parent=activeEffectScope,this.index=(activeEffectScope.scopes||(activeEffectScope.scopes=[])).push(this)-1)}run(n){if(this.active)try{return this.on(),n()}finally{this.off()}}on(){this.active&&(effectScopeStack.push(this),activeEffectScope=this)}off(){this.active&&(effectScopeStack.pop(),activeEffectScope=effectScopeStack[effectScopeStack.length-1])}stop(n){if(this.active){if(this.effects.forEach(r=>r.stop()),this.cleanups.forEach(r=>r()),this.scopes&&this.scopes.forEach(r=>r.stop(!0)),this.parent&&!n){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.active=!1}}}function recordEffectScope(e,n){n=n||activeEffectScope,n&&n.active&&n.effects.push(e)}const createDep=e=>{const n=new Set(e);return n.w=0,n.n=0,n},wasTracked=e=>(e.w&trackOpBit)>0,newTracked=e=>(e.n&trackOpBit)>0,initDepMarkers=({deps:e})=>{if(e.length)for(let n=0;n<e.length;n++)e[n].w|=trackOpBit},finalizeDepMarkers=e=>{const{deps:n}=e;if(n.length){let r=0;for(let t=0;t<n.length;t++){const o=n[t];wasTracked(o)&&!newTracked(o)?o.delete(e):n[r++]=o,o.w&=~trackOpBit,o.n&=~trackOpBit}n.length=r}},targetMap=new WeakMap;let effectTrackDepth=0,trackOpBit=1;const maxMarkerBits=30,effectStack=[];let activeEffect;const ITERATE_KEY=Symbol(""),MAP_KEY_ITERATE_KEY=Symbol("");class ReactiveEffect{constructor(n,r=null,t){this.fn=n,this.scheduler=r,this.active=!0,this.deps=[],recordEffectScope(this,t)}run(){if(!this.active)return this.fn();if(!effectStack.includes(this))try{return effectStack.push(activeEffect=this),enableTracking(),trackOpBit=1<<++effectTrackDepth,effectTrackDepth<=maxMarkerBits?initDepMarkers(this):cleanupEffect(this),this.fn()}finally{effectTrackDepth<=maxMarkerBits&&finalizeDepMarkers(this),trackOpBit=1<<--effectTrackDepth,resetTracking(),effectStack.pop();const n=effectStack.length;activeEffect=n>0?effectStack[n-1]:void 0}}stop(){this.active&&(cleanupEffect(this),this.onStop&&this.onStop(),this.active=!1)}}function cleanupEffect(e){const{deps:n}=e;if(n.length){for(let r=0;r<n.length;r++)n[r].delete(e);n.length=0}}let shouldTrack=!0;const trackStack=[];function pauseTracking(){trackStack.push(shouldTrack),shouldTrack=!1}function enableTracking(){trackStack.push(shouldTrack),shouldTrack=!0}function resetTracking(){const e=trackStack.pop();shouldTrack=e===void 0?!0:e}function track(e,n,r){if(!isTracking())return;let t=targetMap.get(e);t||targetMap.set(e,t=new Map);let o=t.get(r);o||t.set(r,o=createDep()),trackEffects(o)}function isTracking(){return shouldTrack&&activeEffect!==void 0}function trackEffects(e,n){let r=!1;effectTrackDepth<=maxMarkerBits?newTracked(e)||(e.n|=trackOpBit,r=!wasTracked(e)):r=!e.has(activeEffect),r&&(e.add(activeEffect),activeEffect.deps.push(e))}function trigger(e,n,r,t,o,i){const s=targetMap.get(e);if(!s)return;let a=[];if(n==="clear")a=[...s.values()];else if(r==="length"&&isArray(e))s.forEach((l,u)=>{(u==="length"||u>=t)&&a.push(l)});else switch(r!==void 0&&a.push(s.get(r)),n){case"add":isArray(e)?isIntegerKey(r)&&a.push(s.get("length")):(a.push(s.get(ITERATE_KEY)),isMap(e)&&a.push(s.get(MAP_KEY_ITERATE_KEY)));break;case"delete":isArray(e)||(a.push(s.get(ITERATE_KEY)),isMap(e)&&a.push(s.get(MAP_KEY_ITERATE_KEY)));break;case"set":isMap(e)&&a.push(s.get(ITERATE_KEY));break}if(a.length===1)a[0]&&triggerEffects(a[0]);else{const l=[];for(const u of a)u&&l.push(...u);triggerEffects(createDep(l))}}function triggerEffects(e,n){for(const r of isArray(e)?e:[...e])(r!==activeEffect||r.allowRecurse)&&(r.scheduler?r.scheduler():r.run())}const isNonTrackableKeys=makeMap("__proto__,__v_isRef,__isVue"),builtInSymbols=new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(isSymbol)),get=createGetter(),shallowGet=createGetter(!1,!0),readonlyGet=createGetter(!0),arrayInstrumentations=createArrayInstrumentations();function createArrayInstrumentations(){const e={};return["includes","indexOf","lastIndexOf"].forEach(n=>{e[n]=function(...r){const t=toRaw(this);for(let i=0,s=this.length;i<s;i++)track(t,"get",i+"");const o=t[n](...r);return o===-1||o===!1?t[n](...r.map(toRaw)):o}}),["push","pop","shift","unshift","splice"].forEach(n=>{e[n]=function(...r){pauseTracking();const t=toRaw(this)[n].apply(this,r);return resetTracking(),t}}),e}function createGetter(e=!1,n=!1){return function(t,o,i){if(o==="__v_isReactive")return!e;if(o==="__v_isReadonly")return e;if(o==="__v_raw"&&i===(e?n?shallowReadonlyMap:readonlyMap:n?shallowReactiveMap:reactiveMap).get(t))return t;const s=isArray(t);if(!e&&s&&hasOwn(arrayInstrumentations,o))return Reflect.get(arrayInstrumentations,o,i);const a=Reflect.get(t,o,i);return(isSymbol(o)?builtInSymbols.has(o):isNonTrackableKeys(o))||(e||track(t,"get",o),n)?a:isRef(a)?!s||!isIntegerKey(o)?a.value:a:isObject$1(a)?e?readonly(a):reactive(a):a}}const set=createSetter(),shallowSet=createSetter(!0);function createSetter(e=!1){return function(r,t,o,i){let s=r[t];if(!e&&(o=toRaw(o),s=toRaw(s),!isArray(r)&&isRef(s)&&!isRef(o)))return s.value=o,!0;const a=isArray(r)&&isIntegerKey(t)?Number(t)<r.length:hasOwn(r,t),l=Reflect.set(r,t,o,i);return r===toRaw(i)&&(a?hasChanged(o,s)&&trigger(r,"set",t,o):trigger(r,"add",t,o)),l}}function deleteProperty(e,n){const r=hasOwn(e,n);e[n];const t=Reflect.deleteProperty(e,n);return t&&r&&trigger(e,"delete",n,void 0),t}function has(e,n){const r=Reflect.has(e,n);return(!isSymbol(n)||!builtInSymbols.has(n))&&track(e,"has",n),r}function ownKeys(e){return track(e,"iterate",isArray(e)?"length":ITERATE_KEY),Reflect.ownKeys(e)}const mutableHandlers={get,set,deleteProperty,has,ownKeys},readonlyHandlers={get:readonlyGet,set(e,n){return!0},deleteProperty(e,n){return!0}},shallowReactiveHandlers=extend({},mutableHandlers,{get:shallowGet,set:shallowSet}),toShallow=e=>e,getProto=e=>Reflect.getPrototypeOf(e);function get$1(e,n,r=!1,t=!1){e=e.__v_raw;const o=toRaw(e),i=toRaw(n);n!==i&&!r&&track(o,"get",n),!r&&track(o,"get",i);const{has:s}=getProto(o),a=t?toShallow:r?toReadonly:toReactive;if(s.call(o,n))return a(e.get(n));if(s.call(o,i))return a(e.get(i));e!==o&&e.get(n)}function has$1(e,n=!1){const r=this.__v_raw,t=toRaw(r),o=toRaw(e);return e!==o&&!n&&track(t,"has",e),!n&&track(t,"has",o),e===o?r.has(e):r.has(e)||r.has(o)}function size(e,n=!1){return e=e.__v_raw,!n&&track(toRaw(e),"iterate",ITERATE_KEY),Reflect.get(e,"size",e)}function add(e){e=toRaw(e);const n=toRaw(this);return getProto(n).has.call(n,e)||(n.add(e),trigger(n,"add",e,e)),this}function set$1(e,n){n=toRaw(n);const r=toRaw(this),{has:t,get:o}=getProto(r);let i=t.call(r,e);i||(e=toRaw(e),i=t.call(r,e));const s=o.call(r,e);return r.set(e,n),i?hasChanged(n,s)&&trigger(r,"set",e,n):trigger(r,"add",e,n),this}function deleteEntry(e){const n=toRaw(this),{has:r,get:t}=getProto(n);let o=r.call(n,e);o||(e=toRaw(e),o=r.call(n,e)),t&&t.call(n,e);const i=n.delete(e);return o&&trigger(n,"delete",e,void 0),i}function clear(){const e=toRaw(this),n=e.size!==0,r=e.clear();return n&&trigger(e,"clear",void 0,void 0),r}function createForEach(e,n){return function(t,o){const i=this,s=i.__v_raw,a=toRaw(s),l=n?toShallow:e?toReadonly:toReactive;return!e&&track(a,"iterate",ITERATE_KEY),s.forEach((u,f)=>t.call(o,l(u),l(f),i))}}function createIterableMethod(e,n,r){return function(...t){const o=this.__v_raw,i=toRaw(o),s=isMap(i),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,u=o[e](...t),f=r?toShallow:n?toReadonly:toReactive;return!n&&track(i,"iterate",l?MAP_KEY_ITERATE_KEY:ITERATE_KEY),{next(){const{value:c,done:d}=u.next();return d?{value:c,done:d}:{value:a?[f(c[0]),f(c[1])]:f(c),done:d}},[Symbol.iterator](){return this}}}}function createReadonlyMethod(e){return function(...n){return e==="delete"?!1:this}}function createInstrumentations(){const e={get(i){return get$1(this,i)},get size(){return size(this)},has:has$1,add,set:set$1,delete:deleteEntry,clear,forEach:createForEach(!1,!1)},n={get(i){return get$1(this,i,!1,!0)},get size(){return size(this)},has:has$1,add,set:set$1,delete:deleteEntry,clear,forEach:createForEach(!1,!0)},r={get(i){return get$1(this,i,!0)},get size(){return size(this,!0)},has(i){return has$1.call(this,i,!0)},add:createReadonlyMethod("add"),set:createReadonlyMethod("set"),delete:createReadonlyMethod("delete"),clear:createReadonlyMethod("clear"),forEach:createForEach(!0,!1)},t={get(i){return get$1(this,i,!0,!0)},get size(){return size(this,!0)},has(i){return has$1.call(this,i,!0)},add:createReadonlyMethod("add"),set:createReadonlyMethod("set"),delete:createReadonlyMethod("delete"),clear:createReadonlyMethod("clear"),forEach:createForEach(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{e[i]=createIterableMethod(i,!1,!1),r[i]=createIterableMethod(i,!0,!1),n[i]=createIterableMethod(i,!1,!0),t[i]=createIterableMethod(i,!0,!0)}),[e,r,n,t]}const[mutableInstrumentations,readonlyInstrumentations,shallowInstrumentations,shallowReadonlyInstrumentations]=createInstrumentations();function createInstrumentationGetter(e,n){const r=n?e?shallowReadonlyInstrumentations:shallowInstrumentations:e?readonlyInstrumentations:mutableInstrumentations;return(t,o,i)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?t:Reflect.get(hasOwn(r,o)&&o in t?r:t,o,i)}const mutableCollectionHandlers={get:createInstrumentationGetter(!1,!1)},shallowCollectionHandlers={get:createInstrumentationGetter(!1,!0)},readonlyCollectionHandlers={get:createInstrumentationGetter(!0,!1)},reactiveMap=new WeakMap,shallowReactiveMap=new WeakMap,readonlyMap=new WeakMap,shallowReadonlyMap=new WeakMap;function targetTypeMap(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function getTargetType(e){return e.__v_skip||!Object.isExtensible(e)?0:targetTypeMap(toRawType(e))}function reactive(e){return e&&e.__v_isReadonly?e:createReactiveObject(e,!1,mutableHandlers,mutableCollectionHandlers,reactiveMap)}function shallowReactive(e){return createReactiveObject(e,!1,shallowReactiveHandlers,shallowCollectionHandlers,shallowReactiveMap)}function readonly(e){return createReactiveObject(e,!0,readonlyHandlers,readonlyCollectionHandlers,readonlyMap)}function createReactiveObject(e,n,r,t,o){if(!isObject$1(e)||e.__v_raw&&!(n&&e.__v_isReactive))return e;const i=o.get(e);if(i)return i;const s=getTargetType(e);if(s===0)return e;const a=new Proxy(e,s===2?t:r);return o.set(e,a),a}function isReactive(e){return isReadonly(e)?isReactive(e.__v_raw):!!(e&&e.__v_isReactive)}function isReadonly(e){return!!(e&&e.__v_isReadonly)}function isProxy(e){return isReactive(e)||isReadonly(e)}function toRaw(e){const n=e&&e.__v_raw;return n?toRaw(n):e}function markRaw(e){return def(e,"__v_skip",!0),e}const toReactive=e=>isObject$1(e)?reactive(e):e,toReadonly=e=>isObject$1(e)?readonly(e):e;function trackRefValue(e){isTracking()&&(e=toRaw(e),e.dep||(e.dep=createDep()),trackEffects(e.dep))}function triggerRefValue(e,n){e=toRaw(e),e.dep&&triggerEffects(e.dep)}function isRef(e){return Boolean(e&&e.__v_isRef===!0)}function ref(e){return createRef(e,!1)}function shallowRef(e){return createRef(e,!0)}function createRef(e,n){return isRef(e)?e:new RefImpl(e,n)}class RefImpl{constructor(n,r){this._shallow=r,this.dep=void 0,this.__v_isRef=!0,this._rawValue=r?n:toRaw(n),this._value=r?n:toReactive(n)}get value(){return trackRefValue(this),this._value}set value(n){n=this._shallow?n:toRaw(n),hasChanged(n,this._rawValue)&&(this._rawValue=n,this._value=this._shallow?n:toReactive(n),triggerRefValue(this))}}function unref(e){return isRef(e)?e.value:e}const shallowUnwrapHandlers={get:(e,n,r)=>unref(Reflect.get(e,n,r)),set:(e,n,r,t)=>{const o=e[n];return isRef(o)&&!isRef(r)?(o.value=r,!0):Reflect.set(e,n,r,t)}};function proxyRefs(e){return isReactive(e)?e:new Proxy(e,shallowUnwrapHandlers)}class ComputedRefImpl{constructor(n,r,t){this._setter=r,this.dep=void 0,this._dirty=!0,this.__v_isRef=!0,this.effect=new ReactiveEffect(n,()=>{this._dirty||(this._dirty=!0,triggerRefValue(this))}),this.__v_isReadonly=t}get value(){const n=toRaw(this);return trackRefValue(n),n._dirty&&(n._dirty=!1,n._value=n.effect.run()),n._value}set value(n){this._setter(n)}}function computed(e,n){let r,t;const o=isFunction(e);return o?(r=e,t=NOOP):(r=e.get,t=e.set),new ComputedRefImpl(r,t,o||!t)}Promise.resolve();function emit$1(e,n,...r){const t=e.vnode.props||EMPTY_OBJ;let o=r;const i=n.startsWith("update:"),s=i&&n.slice(7);if(s&&s in t){const f=`${s==="modelValue"?"model":s}Modifiers`,{number:c,trim:d}=t[f]||EMPTY_OBJ;d?o=r.map(_=>_.trim()):c&&(o=r.map(toNumber))}let a,l=t[a=toHandlerKey(n)]||t[a=toHandlerKey(camelize(n))];!l&&i&&(l=t[a=toHandlerKey(hyphenate(n))]),l&&callWithAsyncErrorHandling(l,e,6,o);const u=t[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,callWithAsyncErrorHandling(u,e,6,o)}}function normalizeEmitsOptions(e,n,r=!1){const t=n.emitsCache,o=t.get(e);if(o!==void 0)return o;const i=e.emits;let s={},a=!1;if(!isFunction(e)){const l=u=>{const f=normalizeEmitsOptions(u,n,!0);f&&(a=!0,extend(s,f))};!r&&n.mixins.length&&n.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!a?(t.set(e,null),null):(isArray(i)?i.forEach(l=>s[l]=null):extend(s,i),t.set(e,s),s)}function isEmitListener(e,n){return!e||!isOn(n)?!1:(n=n.slice(2).replace(/Once$/,""),hasOwn(e,n[0].toLowerCase()+n.slice(1))||hasOwn(e,hyphenate(n))||hasOwn(e,n))}let currentRenderingInstance=null,currentScopeId=null;function setCurrentRenderingInstance(e){const n=currentRenderingInstance;return currentRenderingInstance=e,currentScopeId=e&&e.type.__scopeId||null,n}function pushScopeId(e){currentScopeId=e}function popScopeId(){currentScopeId=null}function withCtx(e,n=currentRenderingInstance,r){if(!n||e._n)return e;const t=(...o)=>{t._d&&setBlockTracking(-1);const i=setCurrentRenderingInstance(n),s=e(...o);return setCurrentRenderingInstance(i),t._d&&setBlockTracking(1),s};return t._n=!0,t._c=!0,t._d=!0,t}function markAttrsAccessed(){}function renderComponentRoot(e){const{type:n,vnode:r,proxy:t,withProxy:o,props:i,propsOptions:[s],slots:a,attrs:l,emit:u,render:f,renderCache:c,data:d,setupState:_,ctx:v,inheritAttrs:b}=e;let C,m;const g=setCurrentRenderingInstance(e);try{if(r.shapeFlag&4){const k=o||t;C=normalizeVNode(f.call(k,k,c,i,_,d,v)),m=l}else{const k=n;C=normalizeVNode(k.length>1?k(i,{attrs:l,slots:a,emit:u}):k(i,null)),m=n.props?l:getFunctionalFallthrough(l)}}catch(k){blockStack.length=0,handleError(k,e,1),C=createVNode(Comment)}let y=C;if(m&&b!==!1){const k=Object.keys(m),{shapeFlag:x}=y;k.length&&x&(1|6)&&(s&&k.some(isModelListener)&&(m=filterModelListeners(m,s)),y=cloneVNode(y,m))}return r.dirs&&(y.dirs=y.dirs?y.dirs.concat(r.dirs):r.dirs),r.transition&&(y.transition=r.transition),C=y,setCurrentRenderingInstance(g),C}const getFunctionalFallthrough=e=>{let n;for(const r in e)(r==="class"||r==="style"||isOn(r))&&((n||(n={}))[r]=e[r]);return n},filterModelListeners=(e,n)=>{const r={};for(const t in e)(!isModelListener(t)||!(t.slice(9)in n))&&(r[t]=e[t]);return r};function shouldUpdateComponent(e,n,r){const{props:t,children:o,component:i}=e,{props:s,children:a,patchFlag:l}=n,u=i.emitsOptions;if(n.dirs||n.transition)return!0;if(r&&l>=0){if(l&1024)return!0;if(l&16)return t?hasPropsChanged(t,s,u):!!s;if(l&8){const f=n.dynamicProps;for(let c=0;c<f.length;c++){const d=f[c];if(s[d]!==t[d]&&!isEmitListener(u,d))return!0}}}else return(o||a)&&(!a||!a.$stable)?!0:t===s?!1:t?s?hasPropsChanged(t,s,u):!0:!!s;return!1}function hasPropsChanged(e,n,r){const t=Object.keys(n);if(t.length!==Object.keys(e).length)return!0;for(let o=0;o<t.length;o++){const i=t[o];if(n[i]!==e[i]&&!isEmitListener(r,i))return!0}return!1}function updateHOCHostEl({vnode:e,parent:n},r){for(;n&&n.subTree===e;)(e=n.vnode).el=r,n=n.parent}const isSuspense=e=>e.__isSuspense;function queueEffectWithSuspense(e,n){n&&n.pendingBranch?isArray(e)?n.effects.push(...e):n.effects.push(e):queuePostFlushCb(e)}function provide(e,n){if(currentInstance){let r=currentInstance.provides;const t=currentInstance.parent&&currentInstance.parent.provides;t===r&&(r=currentInstance.provides=Object.create(t)),r[e]=n}}function inject(e,n,r=!1){const t=currentInstance||currentRenderingInstance;if(t){const o=t.parent==null?t.vnode.appContext&&t.vnode.appContext.provides:t.parent.provides;if(o&&e in o)return o[e];if(arguments.length>1)return r&&isFunction(n)?n.call(t.proxy):n}}function useTransitionState(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return onMounted(()=>{e.isMounted=!0}),onBeforeUnmount(()=>{e.isUnmounting=!0}),e}const TransitionHookValidator=[Function,Array],BaseTransitionImpl={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:TransitionHookValidator,onEnter:TransitionHookValidator,onAfterEnter:TransitionHookValidator,onEnterCancelled:TransitionHookValidator,onBeforeLeave:TransitionHookValidator,onLeave:TransitionHookValidator,onAfterLeave:TransitionHookValidator,onLeaveCancelled:TransitionHookValidator,onBeforeAppear:TransitionHookValidator,onAppear:TransitionHookValidator,onAfterAppear:TransitionHookValidator,onAppearCancelled:TransitionHookValidator},setup(e,{slots:n}){const r=getCurrentInstance(),t=useTransitionState();let o;return()=>{const i=n.default&&getTransitionRawChildren(n.default(),!0);if(!i||!i.length)return;const s=toRaw(e),{mode:a}=s,l=i[0];if(t.isLeaving)return emptyPlaceholder(l);const u=getKeepAliveChild(l);if(!u)return emptyPlaceholder(l);const f=resolveTransitionHooks(u,s,t,r);setTransitionHooks(u,f);const c=r.subTree,d=c&&getKeepAliveChild(c);let _=!1;const{getTransitionKey:v}=u.type;if(v){const b=v();o===void 0?o=b:b!==o&&(o=b,_=!0)}if(d&&d.type!==Comment&&(!isSameVNodeType(u,d)||_)){const b=resolveTransitionHooks(d,s,t,r);if(setTransitionHooks(d,b),a==="out-in")return t.isLeaving=!0,b.afterLeave=()=>{t.isLeaving=!1,r.update()},emptyPlaceholder(l);a==="in-out"&&u.type!==Comment&&(b.delayLeave=(C,m,g)=>{const y=getLeavingNodesForType(t,d);y[String(d.key)]=d,C._leaveCb=()=>{m(),C._leaveCb=void 0,delete f.delayedLeave},f.delayedLeave=g})}return l}}},BaseTransition=BaseTransitionImpl;function getLeavingNodesForType(e,n){const{leavingVNodes:r}=e;let t=r.get(n.type);return t||(t=Object.create(null),r.set(n.type,t)),t}function resolveTransitionHooks(e,n,r,t){const{appear:o,mode:i,persisted:s=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:c,onLeave:d,onAfterLeave:_,onLeaveCancelled:v,onBeforeAppear:b,onAppear:C,onAfterAppear:m,onAppearCancelled:g}=n,y=String(e.key),k=getLeavingNodesForType(r,e),x=(A,E)=>{A&&callWithAsyncErrorHandling(A,t,9,E)},w={mode:i,persisted:s,beforeEnter(A){let E=a;if(!r.isMounted)if(o)E=b||a;else return;A._leaveCb&&A._leaveCb(!0);const S=k[y];S&&isSameVNodeType(e,S)&&S.el._leaveCb&&S.el._leaveCb(),x(E,[A])},enter(A){let E=l,S=u,O=f;if(!r.isMounted)if(o)E=C||l,S=m||u,O=g||f;else return;let P=!1;const L=A._enterCb=M=>{P||(P=!0,M?x(O,[A]):x(S,[A]),w.delayedLeave&&w.delayedLeave(),A._enterCb=void 0)};E?(E(A,L),E.length<=1&&L()):L()},leave(A,E){const S=String(e.key);if(A._enterCb&&A._enterCb(!0),r.isUnmounting)return E();x(c,[A]);let O=!1;const P=A._leaveCb=L=>{O||(O=!0,E(),L?x(v,[A]):x(_,[A]),A._leaveCb=void 0,k[S]===e&&delete k[S])};k[S]=e,d?(d(A,P),d.length<=1&&P()):P()},clone(A){return resolveTransitionHooks(A,n,r,t)}};return w}function emptyPlaceholder(e){if(isKeepAlive(e))return e=cloneVNode(e),e.children=null,e}function getKeepAliveChild(e){return isKeepAlive(e)?e.children?e.children[0]:void 0:e}function setTransitionHooks(e,n){e.shapeFlag&6&&e.component?setTransitionHooks(e.component.subTree,n):e.shapeFlag&128?(e.ssContent.transition=n.clone(e.ssContent),e.ssFallback.transition=n.clone(e.ssFallback)):e.transition=n}function getTransitionRawChildren(e,n=!1){let r=[],t=0;for(let o=0;o<e.length;o++){const i=e[o];i.type===Fragment?(i.patchFlag&128&&t++,r=r.concat(getTransitionRawChildren(i.children,n))):(n||i.type!==Comment)&&r.push(i)}if(t>1)for(let o=0;o<r.length;o++)r[o].patchFlag=-2;return r}function defineComponent(e){return isFunction(e)?{setup:e,name:e.name}:e}const isAsyncWrapper=e=>!!e.type.__asyncLoader,isKeepAlive=e=>e.type.__isKeepAlive;function onActivated(e,n){registerKeepAliveHook(e,"a",n)}function onDeactivated(e,n){registerKeepAliveHook(e,"da",n)}function registerKeepAliveHook(e,n,r=currentInstance){const t=e.__wdc||(e.__wdc=()=>{let o=r;for(;o;){if(o.isDeactivated)return;o=o.parent}e()});if(injectHook(n,t,r),r){let o=r.parent;for(;o&&o.parent;)isKeepAlive(o.parent.vnode)&&injectToKeepAliveRoot(t,n,r,o),o=o.parent}}function injectToKeepAliveRoot(e,n,r,t){const o=injectHook(n,e,t,!0);onUnmounted(()=>{remove(t[n],o)},r)}function injectHook(e,n,r=currentInstance,t=!1){if(r){const o=r[e]||(r[e]=[]),i=n.__weh||(n.__weh=(...s)=>{if(r.isUnmounted)return;pauseTracking(),setCurrentInstance(r);const a=callWithAsyncErrorHandling(n,r,e,s);return unsetCurrentInstance(),resetTracking(),a});return t?o.unshift(i):o.push(i),i}}const createHook=e=>(n,r=currentInstance)=>(!isInSSRComponentSetup||e==="sp")&&injectHook(e,n,r),onBeforeMount=createHook("bm"),onMounted=createHook("m"),onBeforeUpdate=createHook("bu"),onUpdated=createHook("u"),onBeforeUnmount=createHook("bum"),onUnmounted=createHook("um"),onServerPrefetch=createHook("sp"),onRenderTriggered=createHook("rtg"),onRenderTracked=createHook("rtc");function onErrorCaptured(e,n=currentInstance){injectHook("ec",e,n)}let shouldCacheAccess=!0;function applyOptions(e){const n=resolveMergedOptions(e),r=e.proxy,t=e.ctx;shouldCacheAccess=!1,n.beforeCreate&&callHook(n.beforeCreate,e,"bc");const{data:o,computed:i,methods:s,watch:a,provide:l,inject:u,created:f,beforeMount:c,mounted:d,beforeUpdate:_,updated:v,activated:b,deactivated:C,beforeDestroy:m,beforeUnmount:g,destroyed:y,unmounted:k,render:x,renderTracked:w,renderTriggered:A,errorCaptured:E,serverPrefetch:S,expose:O,inheritAttrs:P,components:L,directives:M,filters:G}=n;if(u&&resolveInjections(u,t,null,e.appContext.config.unwrapInjectedRef),s)for(const q in s){const ee=s[q];isFunction(ee)&&(t[q]=ee.bind(r))}if(o){const q=o.call(r,r);isObject$1(q)&&(e.data=reactive(q))}if(shouldCacheAccess=!0,i)for(const q in i){const ee=i[q],fe=isFunction(ee)?ee.bind(r,r):isFunction(ee.get)?ee.get.bind(r,r):NOOP,N=!isFunction(ee)&&isFunction(ee.set)?ee.set.bind(r):NOOP,V=computed({get:fe,set:N});Object.defineProperty(t,q,{enumerable:!0,configurable:!0,get:()=>V.value,set:$=>V.value=$})}if(a)for(const q in a)createWatcher(a[q],t,r,q);if(l){const q=isFunction(l)?l.call(r):l;Reflect.ownKeys(q).forEach(ee=>{provide(ee,q[ee])})}f&&callHook(f,e,"c");function j(q,ee){isArray(ee)?ee.forEach(fe=>q(fe.bind(r))):ee&&q(ee.bind(r))}if(j(onBeforeMount,c),j(onMounted,d),j(onBeforeUpdate,_),j(onUpdated,v),j(onActivated,b),j(onDeactivated,C),j(onErrorCaptured,E),j(onRenderTracked,w),j(onRenderTriggered,A),j(onBeforeUnmount,g),j(onUnmounted,k),j(onServerPrefetch,S),isArray(O))if(O.length){const q=e.exposed||(e.exposed={});O.forEach(ee=>{Object.defineProperty(q,ee,{get:()=>r[ee],set:fe=>r[ee]=fe})})}else e.exposed||(e.exposed={});x&&e.render===NOOP&&(e.render=x),P!=null&&(e.inheritAttrs=P),L&&(e.components=L),M&&(e.directives=M)}function resolveInjections(e,n,r=NOOP,t=!1){isArray(e)&&(e=normalizeInject(e));for(const o in e){const i=e[o];let s;isObject$1(i)?"default"in i?s=inject(i.from||o,i.default,!0):s=inject(i.from||o):s=inject(i),isRef(s)&&t?Object.defineProperty(n,o,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):n[o]=s}}function callHook(e,n,r){callWithAsyncErrorHandling(isArray(e)?e.map(t=>t.bind(n.proxy)):e.bind(n.proxy),n,r)}function createWatcher(e,n,r,t){const o=t.includes(".")?createPathGetter(r,t):()=>r[t];if(isString(e)){const i=n[e];isFunction(i)&&watch(o,i)}else if(isFunction(e))watch(o,e.bind(r));else if(isObject$1(e))if(isArray(e))e.forEach(i=>createWatcher(i,n,r,t));else{const i=isFunction(e.handler)?e.handler.bind(r):n[e.handler];isFunction(i)&&watch(o,i,e)}}function resolveMergedOptions(e){const n=e.type,{mixins:r,extends:t}=n,{mixins:o,optionsCache:i,config:{optionMergeStrategies:s}}=e.appContext,a=i.get(n);let l;return a?l=a:!o.length&&!r&&!t?l=n:(l={},o.length&&o.forEach(u=>mergeOptions$1(l,u,s,!0)),mergeOptions$1(l,n,s)),i.set(n,l),l}function mergeOptions$1(e,n,r,t=!1){const{mixins:o,extends:i}=n;i&&mergeOptions$1(e,i,r,!0),o&&o.forEach(s=>mergeOptions$1(e,s,r,!0));for(const s in n)if(!(t&&s==="expose")){const a=internalOptionMergeStrats[s]||r&&r[s];e[s]=a?a(e[s],n[s]):n[s]}return e}const internalOptionMergeStrats={data:mergeDataFn,props:mergeObjectOptions,emits:mergeObjectOptions,methods:mergeObjectOptions,computed:mergeObjectOptions,beforeCreate:mergeAsArray,created:mergeAsArray,beforeMount:mergeAsArray,mounted:mergeAsArray,beforeUpdate:mergeAsArray,updated:mergeAsArray,beforeDestroy:mergeAsArray,beforeUnmount:mergeAsArray,destroyed:mergeAsArray,unmounted:mergeAsArray,activated:mergeAsArray,deactivated:mergeAsArray,errorCaptured:mergeAsArray,serverPrefetch:mergeAsArray,components:mergeObjectOptions,directives:mergeObjectOptions,watch:mergeWatchOptions,provide:mergeDataFn,inject:mergeInject};function mergeDataFn(e,n){return n?e?function(){return extend(isFunction(e)?e.call(this,this):e,isFunction(n)?n.call(this,this):n)}:n:e}function mergeInject(e,n){return mergeObjectOptions(normalizeInject(e),normalizeInject(n))}function normalizeInject(e){if(isArray(e)){const n={};for(let r=0;r<e.length;r++)n[e[r]]=e[r];return n}return e}function mergeAsArray(e,n){return e?[...new Set([].concat(e,n))]:n}function mergeObjectOptions(e,n){return e?extend(extend(Object.create(null),e),n):n}function mergeWatchOptions(e,n){if(!e)return n;if(!n)return e;const r=extend(Object.create(null),e);for(const t in n)r[t]=mergeAsArray(e[t],n[t]);return r}function initProps(e,n,r,t=!1){const o={},i={};def(i,InternalObjectKey,1),e.propsDefaults=Object.create(null),setFullProps(e,n,o,i);for(const s in e.propsOptions[0])s in o||(o[s]=void 0);r?e.props=t?o:shallowReactive(o):e.type.props?e.props=o:e.props=i,e.attrs=i}function updateProps(e,n,r,t){const{props:o,attrs:i,vnode:{patchFlag:s}}=e,a=toRaw(o),[l]=e.propsOptions;let u=!1;if((t||s>0)&&!(s&16)){if(s&8){const f=e.vnode.dynamicProps;for(let c=0;c<f.length;c++){let d=f[c];const _=n[d];if(l)if(hasOwn(i,d))_!==i[d]&&(i[d]=_,u=!0);else{const v=camelize(d);o[v]=resolvePropValue(l,a,v,_,e,!1)}else _!==i[d]&&(i[d]=_,u=!0)}}}else{setFullProps(e,n,o,i)&&(u=!0);let f;for(const c in a)(!n||!hasOwn(n,c)&&((f=hyphenate(c))===c||!hasOwn(n,f)))&&(l?r&&(r[c]!==void 0||r[f]!==void 0)&&(o[c]=resolvePropValue(l,a,c,void 0,e,!0)):delete o[c]);if(i!==a)for(const c in i)(!n||!hasOwn(n,c))&&(delete i[c],u=!0)}u&&trigger(e,"set","$attrs")}function setFullProps(e,n,r,t){const[o,i]=e.propsOptions;let s=!1,a;if(n)for(let l in n){if(isReservedProp(l))continue;const u=n[l];let f;o&&hasOwn(o,f=camelize(l))?!i||!i.includes(f)?r[f]=u:(a||(a={}))[f]=u:isEmitListener(e.emitsOptions,l)||u!==t[l]&&(t[l]=u,s=!0)}if(i){const l=toRaw(r),u=a||EMPTY_OBJ;for(let f=0;f<i.length;f++){const c=i[f];r[c]=resolvePropValue(o,l,c,u[c],e,!hasOwn(u,c))}}return s}function resolvePropValue(e,n,r,t,o,i){const s=e[r];if(s!=null){const a=hasOwn(s,"default");if(a&&t===void 0){const l=s.default;if(s.type!==Function&&isFunction(l)){const{propsDefaults:u}=o;r in u?t=u[r]:(setCurrentInstance(o),t=u[r]=l.call(null,n),unsetCurrentInstance())}else t=l}s[0]&&(i&&!a?t=!1:s[1]&&(t===""||t===hyphenate(r))&&(t=!0))}return t}function normalizePropsOptions(e,n,r=!1){const t=n.propsCache,o=t.get(e);if(o)return o;const i=e.props,s={},a=[];let l=!1;if(!isFunction(e)){const f=c=>{l=!0;const[d,_]=normalizePropsOptions(c,n,!0);extend(s,d),_&&a.push(..._)};!r&&n.mixins.length&&n.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!i&&!l)return t.set(e,EMPTY_ARR),EMPTY_ARR;if(isArray(i))for(let f=0;f<i.length;f++){const c=camelize(i[f]);validatePropName(c)&&(s[c]=EMPTY_OBJ)}else if(i)for(const f in i){const c=camelize(f);if(validatePropName(c)){const d=i[f],_=s[c]=isArray(d)||isFunction(d)?{type:d}:d;if(_){const v=getTypeIndex(Boolean,_.type),b=getTypeIndex(String,_.type);_[0]=v>-1,_[1]=b<0||v<b,(v>-1||hasOwn(_,"default"))&&a.push(c)}}}const u=[s,a];return t.set(e,u),u}function validatePropName(e){return e[0]!=="$"}function getType(e){const n=e&&e.toString().match(/^\s*function (\w+)/);return n?n[1]:e===null?"null":""}function isSameType(e,n){return getType(e)===getType(n)}function getTypeIndex(e,n){return isArray(n)?n.findIndex(r=>isSameType(r,e)):isFunction(n)&&isSameType(n,e)?0:-1}const isInternalKey=e=>e[0]==="_"||e==="$stable",normalizeSlotValue=e=>isArray(e)?e.map(normalizeVNode):[normalizeVNode(e)],normalizeSlot$1=(e,n,r)=>{const t=withCtx((...o)=>normalizeSlotValue(n(...o)),r);return t._c=!1,t},normalizeObjectSlots=(e,n,r)=>{const t=e._ctx;for(const o in e){if(isInternalKey(o))continue;const i=e[o];if(isFunction(i))n[o]=normalizeSlot$1(o,i,t);else if(i!=null){const s=normalizeSlotValue(i);n[o]=()=>s}}},normalizeVNodeSlots=(e,n)=>{const r=normalizeSlotValue(n);e.slots.default=()=>r},initSlots=(e,n)=>{if(e.vnode.shapeFlag&32){const r=n._;r?(e.slots=toRaw(n),def(n,"_",r)):normalizeObjectSlots(n,e.slots={})}else e.slots={},n&&normalizeVNodeSlots(e,n);def(e.slots,InternalObjectKey,1)},updateSlots=(e,n,r)=>{const{vnode:t,slots:o}=e;let i=!0,s=EMPTY_OBJ;if(t.shapeFlag&32){const a=n._;a?r&&a===1?i=!1:(extend(o,n),!r&&a===1&&delete o._):(i=!n.$stable,normalizeObjectSlots(n,o)),s=n}else n&&(normalizeVNodeSlots(e,n),s={default:1});if(i)for(const a in o)!isInternalKey(a)&&!(a in s)&&delete o[a]};function invokeDirectiveHook(e,n,r,t){const o=e.dirs,i=n&&n.dirs;for(let s=0;s<o.length;s++){const a=o[s];i&&(a.oldValue=i[s].value);let l=a.dir[t];l&&(pauseTracking(),callWithAsyncErrorHandling(l,r,8,[e.el,a,e,n]),resetTracking())}}function createAppContext(){return{app:null,config:{isNativeTag:NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let uid=0;function createAppAPI(e,n){return function(t,o=null){o!=null&&!isObject$1(o)&&(o=null);const i=createAppContext(),s=new Set;let a=!1;const l=i.app={_uid:uid++,_component:t,_props:o,_container:null,_context:i,_instance:null,version,get config(){return i.config},set config(u){},use(u,...f){return s.has(u)||(u&&isFunction(u.install)?(s.add(u),u.install(l,...f)):isFunction(u)&&(s.add(u),u(l,...f))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,f){return f?(i.components[u]=f,l):i.components[u]},directive(u,f){return f?(i.directives[u]=f,l):i.directives[u]},mount(u,f,c){if(!a){const d=createVNode(t,o);return d.appContext=i,f&&n?n(d,u):e(d,u,c),a=!0,l._container=u,u.__vue_app__=l,getExposeProxy(d.component)||d.component.proxy}},unmount(){a&&(e(null,l._container),delete l._container.__vue_app__)},provide(u,f){return i.provides[u]=f,l}};return l}}const queuePostRenderEffect=queueEffectWithSuspense;function createRenderer(e){return baseCreateRenderer(e)}function baseCreateRenderer(e,n){const r=getGlobalThis();r.__VUE__=!0;const{insert:t,remove:o,patchProp:i,createElement:s,createText:a,createComment:l,setText:u,setElementText:f,parentNode:c,nextSibling:d,setScopeId:_=NOOP,cloneNode:v,insertStaticContent:b}=e,C=(T,R,D,z=null,B=null,J=null,te=!1,Y=null,Z=!!R.dynamicChildren)=>{if(T===R)return;T&&!isSameVNodeType(T,R)&&(z=Q(T),ne(T,B,J,!0),T=null),R.patchFlag===-2&&(Z=!1,R.dynamicChildren=null);const{type:W,ref:ie,shapeFlag:oe}=R;switch(W){case Text:m(T,R,D,z);break;case Comment:g(T,R,D,z);break;case Static:T==null&&y(R,D,z,te);break;case Fragment:M(T,R,D,z,B,J,te,Y,Z);break;default:oe&1?w(T,R,D,z,B,J,te,Y,Z):oe&6?G(T,R,D,z,B,J,te,Y,Z):(oe&64||oe&128)&&W.process(T,R,D,z,B,J,te,Y,Z,ue)}ie!=null&&B&&setRef(ie,T&&T.ref,J,R||T,!R)},m=(T,R,D,z)=>{if(T==null)t(R.el=a(R.children),D,z);else{const B=R.el=T.el;R.children!==T.children&&u(B,R.children)}},g=(T,R,D,z)=>{T==null?t(R.el=l(R.children||""),D,z):R.el=T.el},y=(T,R,D,z)=>{[T.el,T.anchor]=b(T.children,R,D,z)},k=({el:T,anchor:R},D,z)=>{let B;for(;T&&T!==R;)B=d(T),t(T,D,z),T=B;t(R,D,z)},x=({el:T,anchor:R})=>{let D;for(;T&&T!==R;)D=d(T),o(T),T=D;o(R)},w=(T,R,D,z,B,J,te,Y,Z)=>{te=te||R.type==="svg",T==null?A(R,D,z,B,J,te,Y,Z):O(T,R,B,J,te,Y,Z)},A=(T,R,D,z,B,J,te,Y)=>{let Z,W;const{type:ie,props:oe,shapeFlag:F,transition:U,patchFlag:re,dirs:pe}=T;if(T.el&&v!==void 0&&re===-1)Z=T.el=v(T.el);else{if(Z=T.el=s(T.type,J,oe&&oe.is,oe),F&8?f(Z,T.children):F&16&&S(T.children,Z,null,z,B,J&&ie!=="foreignObject",te,Y),pe&&invokeDirectiveHook(T,null,z,"created"),oe){for(const he in oe)he!=="value"&&!isReservedProp(he)&&i(Z,he,null,oe[he],J,T.children,z,B,H);"value"in oe&&i(Z,"value",null,oe.value),(W=oe.onVnodeBeforeMount)&&invokeVNodeHook(W,z,T)}E(Z,T,T.scopeId,te,z)}pe&&invokeDirectiveHook(T,null,z,"beforeMount");const de=(!B||B&&!B.pendingBranch)&&U&&!U.persisted;de&&U.beforeEnter(Z),t(Z,R,D),((W=oe&&oe.onVnodeMounted)||de||pe)&&queuePostRenderEffect(()=>{W&&invokeVNodeHook(W,z,T),de&&U.enter(Z),pe&&invokeDirectiveHook(T,null,z,"mounted")},B)},E=(T,R,D,z,B)=>{if(D&&_(T,D),z)for(let J=0;J<z.length;J++)_(T,z[J]);if(B){let J=B.subTree;if(R===J){const te=B.vnode;E(T,te,te.scopeId,te.slotScopeIds,B.parent)}}},S=(T,R,D,z,B,J,te,Y,Z=0)=>{for(let W=Z;W<T.length;W++){const ie=T[W]=Y?cloneIfMounted(T[W]):normalizeVNode(T[W]);C(null,ie,R,D,z,B,J,te,Y)}},O=(T,R,D,z,B,J,te)=>{const Y=R.el=T.el;let{patchFlag:Z,dynamicChildren:W,dirs:ie}=R;Z|=T.patchFlag&16;const oe=T.props||EMPTY_OBJ,F=R.props||EMPTY_OBJ;let U;(U=F.onVnodeBeforeUpdate)&&invokeVNodeHook(U,D,R,T),ie&&invokeDirectiveHook(R,T,D,"beforeUpdate");const re=B&&R.type!=="foreignObject";if(W?P(T.dynamicChildren,W,Y,D,z,re,J):te||fe(T,R,Y,null,D,z,re,J,!1),Z>0){if(Z&16)L(Y,R,oe,F,D,z,B);else if(Z&2&&oe.class!==F.class&&i(Y,"class",null,F.class,B),Z&4&&i(Y,"style",oe.style,F.style,B),Z&8){const pe=R.dynamicProps;for(let de=0;de<pe.length;de++){const he=pe[de],_e=oe[he],be=F[he];(be!==_e||he==="value")&&i(Y,he,_e,be,B,T.children,D,z,H)}}Z&1&&T.children!==R.children&&f(Y,R.children)}else!te&&W==null&&L(Y,R,oe,F,D,z,B);((U=F.onVnodeUpdated)||ie)&&queuePostRenderEffect(()=>{U&&invokeVNodeHook(U,D,R,T),ie&&invokeDirectiveHook(R,T,D,"updated")},z)},P=(T,R,D,z,B,J,te)=>{for(let Y=0;Y<R.length;Y++){const Z=T[Y],W=R[Y],ie=Z.el&&(Z.type===Fragment||!isSameVNodeType(Z,W)||Z.shapeFlag&(6|64))?c(Z.el):D;C(Z,W,ie,null,z,B,J,te,!0)}},L=(T,R,D,z,B,J,te)=>{if(D!==z){for(const Y in z){if(isReservedProp(Y))continue;const Z=z[Y],W=D[Y];Z!==W&&Y!=="value"&&i(T,Y,W,Z,te,R.children,B,J,H)}if(D!==EMPTY_OBJ)for(const Y in D)!isReservedProp(Y)&&!(Y in z)&&i(T,Y,D[Y],null,te,R.children,B,J,H);"value"in z&&i(T,"value",D.value,z.value)}},M=(T,R,D,z,B,J,te,Y,Z)=>{const W=R.el=T?T.el:a(""),ie=R.anchor=T?T.anchor:a("");let{patchFlag:oe,dynamicChildren:F,slotScopeIds:U}=R;U&&(Y=Y?Y.concat(U):U),T==null?(t(W,D,z),t(ie,D,z),S(R.children,D,ie,B,J,te,Y,Z)):oe>0&&oe&64&&F&&T.dynamicChildren?(P(T.dynamicChildren,F,D,B,J,te,Y),(R.key!=null||B&&R===B.subTree)&&traverseStaticChildren(T,R,!0)):fe(T,R,D,ie,B,J,te,Y,Z)},G=(T,R,D,z,B,J,te,Y,Z)=>{R.slotScopeIds=Y,T==null?R.shapeFlag&512?B.ctx.activate(R,D,z,te,Z):X(R,D,z,B,J,te,Z):j(T,R,Z)},X=(T,R,D,z,B,J,te)=>{const Y=T.component=createComponentInstance(T,z,B);if(isKeepAlive(T)&&(Y.ctx.renderer=ue),setupComponent(Y),Y.asyncDep){if(B&&B.registerDep(Y,q),!T.el){const Z=Y.subTree=createVNode(Comment);g(null,Z,R,D)}return}q(Y,T,R,D,B,J,te)},j=(T,R,D)=>{const z=R.component=T.component;if(shouldUpdateComponent(T,R,D))if(z.asyncDep&&!z.asyncResolved){ee(z,R,D);return}else z.next=R,invalidateJob(z.update),z.update();else R.component=T.component,R.el=T.el,z.vnode=R},q=(T,R,D,z,B,J,te)=>{const Y=()=>{if(T.isMounted){let{next:ie,bu:oe,u:F,parent:U,vnode:re}=T,pe=ie,de;Z.allowRecurse=!1,ie?(ie.el=re.el,ee(T,ie,te)):ie=re,oe&&invokeArrayFns(oe),(de=ie.props&&ie.props.onVnodeBeforeUpdate)&&invokeVNodeHook(de,U,ie,re),Z.allowRecurse=!0;const he=renderComponentRoot(T),_e=T.subTree;T.subTree=he,C(_e,he,c(_e.el),Q(_e),T,B,J),ie.el=he.el,pe===null&&updateHOCHostEl(T,he.el),F&&queuePostRenderEffect(F,B),(de=ie.props&&ie.props.onVnodeUpdated)&&queuePostRenderEffect(()=>invokeVNodeHook(de,U,ie,re),B)}else{let ie;const{el:oe,props:F}=R,{bm:U,m:re,parent:pe}=T,de=isAsyncWrapper(R);if(Z.allowRecurse=!1,U&&invokeArrayFns(U),!de&&(ie=F&&F.onVnodeBeforeMount)&&invokeVNodeHook(ie,pe,R),Z.allowRecurse=!0,oe&&se){const he=()=>{T.subTree=renderComponentRoot(T),se(oe,T.subTree,T,B,null)};de?R.type.__asyncLoader().then(()=>!T.isUnmounted&&he()):he()}else{const he=T.subTree=renderComponentRoot(T);C(null,he,D,z,T,B,J),R.el=he.el}if(re&&queuePostRenderEffect(re,B),!de&&(ie=F&&F.onVnodeMounted)){const he=R;queuePostRenderEffect(()=>invokeVNodeHook(ie,pe,he),B)}R.shapeFlag&256&&T.a&&queuePostRenderEffect(T.a,B),T.isMounted=!0,R=D=z=null}},Z=new ReactiveEffect(Y,()=>queueJob(T.update),T.scope),W=T.update=Z.run.bind(Z);W.id=T.uid,Z.allowRecurse=W.allowRecurse=!0,W()},ee=(T,R,D)=>{R.component=T;const z=T.vnode.props;T.vnode=R,T.next=null,updateProps(T,R.props,z,D),updateSlots(T,R.children,D),pauseTracking(),flushPreFlushCbs(void 0,T.update),resetTracking()},fe=(T,R,D,z,B,J,te,Y,Z=!1)=>{const W=T&&T.children,ie=T?T.shapeFlag:0,oe=R.children,{patchFlag:F,shapeFlag:U}=R;if(F>0){if(F&128){V(W,oe,D,z,B,J,te,Y,Z);return}else if(F&256){N(W,oe,D,z,B,J,te,Y,Z);return}}U&8?(ie&16&&H(W,B,J),oe!==W&&f(D,oe)):ie&16?U&16?V(W,oe,D,z,B,J,te,Y,Z):H(W,B,J,!0):(ie&8&&f(D,""),U&16&&S(oe,D,z,B,J,te,Y,Z))},N=(T,R,D,z,B,J,te,Y,Z)=>{T=T||EMPTY_ARR,R=R||EMPTY_ARR;const W=T.length,ie=R.length,oe=Math.min(W,ie);let F;for(F=0;F<oe;F++){const U=R[F]=Z?cloneIfMounted(R[F]):normalizeVNode(R[F]);C(T[F],U,D,null,B,J,te,Y,Z)}W>ie?H(T,B,J,!0,!1,oe):S(R,D,z,B,J,te,Y,Z,oe)},V=(T,R,D,z,B,J,te,Y,Z)=>{let W=0;const ie=R.length;let oe=T.length-1,F=ie-1;for(;W<=oe&&W<=F;){const U=T[W],re=R[W]=Z?cloneIfMounted(R[W]):normalizeVNode(R[W]);if(isSameVNodeType(U,re))C(U,re,D,null,B,J,te,Y,Z);else break;W++}for(;W<=oe&&W<=F;){const U=T[oe],re=R[F]=Z?cloneIfMounted(R[F]):normalizeVNode(R[F]);if(isSameVNodeType(U,re))C(U,re,D,null,B,J,te,Y,Z);else break;oe--,F--}if(W>oe){if(W<=F){const U=F+1,re=U<ie?R[U].el:z;for(;W<=F;)C(null,R[W]=Z?cloneIfMounted(R[W]):normalizeVNode(R[W]),D,re,B,J,te,Y,Z),W++}}else if(W>F)for(;W<=oe;)ne(T[W],B,J,!0),W++;else{const U=W,re=W,pe=new Map;for(W=re;W<=F;W++){const ge=R[W]=Z?cloneIfMounted(R[W]):normalizeVNode(R[W]);ge.key!=null&&pe.set(ge.key,W)}let de,he=0;const _e=F-re+1;let be=!1,ke=0;const ve=new Array(_e);for(W=0;W<_e;W++)ve[W]=0;for(W=U;W<=oe;W++){const ge=T[W];if(he>=_e){ne(ge,B,J,!0);continue}let me;if(ge.key!=null)me=pe.get(ge.key);else for(de=re;de<=F;de++)if(ve[de-re]===0&&isSameVNodeType(ge,R[de])){me=de;break}me===void 0?ne(ge,B,J,!0):(ve[me-re]=W+1,me>=ke?ke=me:be=!0,C(ge,R[me],D,null,B,J,te,Y,Z),he++)}const we=be?getSequence(ve):EMPTY_ARR;for(de=we.length-1,W=_e-1;W>=0;W--){const ge=re+W,me=R[ge],ye=ge+1<ie?R[ge+1].el:z;ve[W]===0?C(null,me,D,ye,B,J,te,Y,Z):be&&(de<0||W!==we[de]?$(me,D,ye,2):de--)}}},$=(T,R,D,z,B=null)=>{const{el:J,type:te,transition:Y,children:Z,shapeFlag:W}=T;if(W&6){$(T.component.subTree,R,D,z);return}if(W&128){T.suspense.move(R,D,z);return}if(W&64){te.move(T,R,D,ue);return}if(te===Fragment){t(J,R,D);for(let oe=0;oe<Z.length;oe++)$(Z[oe],R,D,z);t(T.anchor,R,D);return}if(te===Static){k(T,R,D);return}if(z!==2&&W&1&&Y)if(z===0)Y.beforeEnter(J),t(J,R,D),queuePostRenderEffect(()=>Y.enter(J),B);else{const{leave:oe,delayLeave:F,afterLeave:U}=Y,re=()=>t(J,R,D),pe=()=>{oe(J,()=>{re(),U&&U()})};F?F(J,re,pe):pe()}else t(J,R,D)},ne=(T,R,D,z=!1,B=!1)=>{const{type:J,props:te,ref:Y,children:Z,dynamicChildren:W,shapeFlag:ie,patchFlag:oe,dirs:F}=T;if(Y!=null&&setRef(Y,null,D,T,!0),ie&256){R.ctx.deactivate(T);return}const U=ie&1&&F,re=!isAsyncWrapper(T);let pe;if(re&&(pe=te&&te.onVnodeBeforeUnmount)&&invokeVNodeHook(pe,R,T),ie&6)K(T.component,D,z);else{if(ie&128){T.suspense.unmount(D,z);return}U&&invokeDirectiveHook(T,null,R,"beforeUnmount"),ie&64?T.type.remove(T,R,D,B,ue,z):W&&(J!==Fragment||oe>0&&oe&64)?H(W,R,D,!1,!0):(J===Fragment&&oe&(128|256)||!B&&ie&16)&&H(Z,R,D),z&&ce(T)}(re&&(pe=te&&te.onVnodeUnmounted)||U)&&queuePostRenderEffect(()=>{pe&&invokeVNodeHook(pe,R,T),U&&invokeDirectiveHook(T,null,R,"unmounted")},D)},ce=T=>{const{type:R,el:D,anchor:z,transition:B}=T;if(R===Fragment){I(D,z);return}if(R===Static){x(T);return}const J=()=>{o(D),B&&!B.persisted&&B.afterLeave&&B.afterLeave()};if(T.shapeFlag&1&&B&&!B.persisted){const{leave:te,delayLeave:Y}=B,Z=()=>te(D,J);Y?Y(T.el,J,Z):Z()}else J()},I=(T,R)=>{let D;for(;T!==R;)D=d(T),o(T),T=D;o(R)},K=(T,R,D)=>{const{bum:z,scope:B,update:J,subTree:te,um:Y}=T;z&&invokeArrayFns(z),B.stop(),J&&(J.active=!1,ne(te,T,R,D)),Y&&queuePostRenderEffect(Y,R),queuePostRenderEffect(()=>{T.isUnmounted=!0},R),R&&R.pendingBranch&&!R.isUnmounted&&T.asyncDep&&!T.asyncResolved&&T.suspenseId===R.pendingId&&(R.deps--,R.deps===0&&R.resolve())},H=(T,R,D,z=!1,B=!1,J=0)=>{for(let te=J;te<T.length;te++)ne(T[te],R,D,z,B)},Q=T=>T.shapeFlag&6?Q(T.component.subTree):T.shapeFlag&128?T.suspense.next():d(T.anchor||T.el),le=(T,R,D)=>{T==null?R._vnode&&ne(R._vnode,null,null,!0):C(R._vnode||null,T,R,null,null,null,D),flushPostFlushCbs(),R._vnode=T},ue={p:C,um:ne,m:$,r:ce,mt:X,mc:S,pc:fe,pbc:P,n:Q,o:e};let ae,se;return n&&([ae,se]=n(ue)),{render:le,hydrate:ae,createApp:createAppAPI(le,ae)}}function setRef(e,n,r,t,o=!1){if(isArray(e)){e.forEach((d,_)=>setRef(d,n&&(isArray(n)?n[_]:n),r,t,o));return}if(isAsyncWrapper(t)&&!o)return;const i=t.shapeFlag&4?getExposeProxy(t.component)||t.component.proxy:t.el,s=o?null:i,{i:a,r:l}=e,u=n&&n.r,f=a.refs===EMPTY_OBJ?a.refs={}:a.refs,c=a.setupState;if(u!=null&&u!==l&&(isString(u)?(f[u]=null,hasOwn(c,u)&&(c[u]=null)):isRef(u)&&(u.value=null)),isString(l)){const d=()=>{f[l]=s,hasOwn(c,l)&&(c[l]=s)};s?(d.id=-1,queuePostRenderEffect(d,r)):d()}else if(isRef(l)){const d=()=>{l.value=s};s?(d.id=-1,queuePostRenderEffect(d,r)):d()}else isFunction(l)&&callWithErrorHandling(l,a,12,[s,f])}function invokeVNodeHook(e,n,r,t=null){callWithAsyncErrorHandling(e,n,7,[r,t])}function traverseStaticChildren(e,n,r=!1){const t=e.children,o=n.children;if(isArray(t)&&isArray(o))for(let i=0;i<t.length;i++){const s=t[i];let a=o[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=o[i]=cloneIfMounted(o[i]),a.el=s.el),r||traverseStaticChildren(s,a))}}function getSequence(e){const n=e.slice(),r=[0];let t,o,i,s,a;const l=e.length;for(t=0;t<l;t++){const u=e[t];if(u!==0){if(o=r[r.length-1],e[o]<u){n[t]=o,r.push(t);continue}for(i=0,s=r.length-1;i<s;)a=i+s>>1,e[r[a]]<u?i=a+1:s=a;u<e[r[i]]&&(i>0&&(n[t]=r[i-1]),r[i]=t)}}for(i=r.length,s=r[i-1];i-- >0;)r[i]=s,s=n[s];return r}const isTeleport=e=>e.__isTeleport,COMPONENTS="components";function resolveComponent(e,n){return resolveAsset(COMPONENTS,e,!0,n)||e}const NULL_DYNAMIC_COMPONENT=Symbol();function resolveAsset(e,n,r=!0,t=!1){const o=currentRenderingInstance||currentInstance;if(o){const i=o.type;if(e===COMPONENTS){const a=getComponentName(i);if(a&&(a===n||a===camelize(n)||a===capitalize(camelize(n))))return i}const s=resolve(o[e]||i[e],n)||resolve(o.appContext[e],n);return!s&&t?i:s}}function resolve(e,n){return e&&(e[n]||e[camelize(n)]||e[capitalize(camelize(n))])}const Fragment=Symbol(void 0),Text=Symbol(void 0),Comment=Symbol(void 0),Static=Symbol(void 0),blockStack=[];let currentBlock=null;function openBlock(e=!1){blockStack.push(currentBlock=e?null:[])}function closeBlock(){blockStack.pop(),currentBlock=blockStack[blockStack.length-1]||null}let isBlockTreeEnabled=1;function setBlockTracking(e){isBlockTreeEnabled+=e}function setupBlock(e){return e.dynamicChildren=isBlockTreeEnabled>0?currentBlock||EMPTY_ARR:null,closeBlock(),isBlockTreeEnabled>0&&currentBlock&&currentBlock.push(e),e}function createElementBlock(e,n,r,t,o,i){return setupBlock(createBaseVNode(e,n,r,t,o,i,!0))}function createBlock(e,n,r,t,o){return setupBlock(createVNode(e,n,r,t,o,!0))}function isVNode(e){return e?e.__v_isVNode===!0:!1}function isSameVNodeType(e,n){return e.type===n.type&&e.key===n.key}const InternalObjectKey="__vInternal",normalizeKey=({key:e})=>e!=null?e:null,normalizeRef=({ref:e})=>e!=null?isString(e)||isRef(e)||isFunction(e)?{i:currentRenderingInstance,r:e}:e:null;function createBaseVNode(e,n=null,r=null,t=0,o=null,i=e===Fragment?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:n,key:n&&normalizeKey(n),ref:n&&normalizeRef(n),scopeId:currentScopeId,slotScopeIds:null,children:r,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:t,dynamicProps:o,dynamicChildren:null,appContext:null};return a?(normalizeChildren(l,r),i&128&&e.normalize(l)):r&&(l.shapeFlag|=isString(r)?8:16),isBlockTreeEnabled>0&&!s&&currentBlock&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&currentBlock.push(l),l}const createVNode=_createVNode;function _createVNode(e,n=null,r=null,t=0,o=null,i=!1){if((!e||e===NULL_DYNAMIC_COMPONENT)&&(e=Comment),isVNode(e)){const a=cloneVNode(e,n,!0);return r&&normalizeChildren(a,r),a}if(isClassComponent(e)&&(e=e.__vccOpts),n){n=guardReactiveProps(n);let{class:a,style:l}=n;a&&!isString(a)&&(n.class=normalizeClass(a)),isObject$1(l)&&(isProxy(l)&&!isArray(l)&&(l=extend({},l)),n.style=normalizeStyle(l))}const s=isString(e)?1:isSuspense(e)?128:isTeleport(e)?64:isObject$1(e)?4:isFunction(e)?2:0;return createBaseVNode(e,n,r,t,o,s,i,!0)}function guardReactiveProps(e){return e?isProxy(e)||InternalObjectKey in e?extend({},e):e:null}function cloneVNode(e,n,r=!1){const{props:t,ref:o,patchFlag:i,children:s}=e,a=n?mergeProps(t||{},n):t;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:a,key:a&&normalizeKey(a),ref:n&&n.ref?r&&o?isArray(o)?o.concat(normalizeRef(n)):[o,normalizeRef(n)]:normalizeRef(n):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:n&&e.type!==Fragment?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&cloneVNode(e.ssContent),ssFallback:e.ssFallback&&cloneVNode(e.ssFallback),el:e.el,anchor:e.anchor}}function createTextVNode(e=" ",n=0){return createVNode(Text,null,e,n)}function createCommentVNode(e="",n=!1){return n?(openBlock(),createBlock(Comment,null,e)):createVNode(Comment,null,e)}function normalizeVNode(e){return e==null||typeof e=="boolean"?createVNode(Comment):isArray(e)?createVNode(Fragment,null,e.slice()):typeof e=="object"?cloneIfMounted(e):createVNode(Text,null,String(e))}function cloneIfMounted(e){return e.el===null||e.memo?e:cloneVNode(e)}function normalizeChildren(e,n){let r=0;const{shapeFlag:t}=e;if(n==null)n=null;else if(isArray(n))r=16;else if(typeof n=="object")if(t&(1|64)){const o=n.default;o&&(o._c&&(o._d=!1),normalizeChildren(e,o()),o._c&&(o._d=!0));return}else{r=32;const o=n._;!o&&!(InternalObjectKey in n)?n._ctx=currentRenderingInstance:o===3&&currentRenderingInstance&&(currentRenderingInstance.slots._===1?n._=1:(n._=2,e.patchFlag|=1024))}else isFunction(n)?(n={default:n,_ctx:currentRenderingInstance},r=32):(n=String(n),t&64?(r=16,n=[createTextVNode(n)]):r=8);e.children=n,e.shapeFlag|=r}function mergeProps(...e){const n={};for(let r=0;r<e.length;r++){const t=e[r];for(const o in t)if(o==="class")n.class!==t.class&&(n.class=normalizeClass([n.class,t.class]));else if(o==="style")n.style=normalizeStyle([n.style,t.style]);else if(isOn(o)){const i=n[o],s=t[o];i!==s&&(n[o]=i?[].concat(i,s):s)}else o!==""&&(n[o]=t[o])}return n}function renderList(e,n,r,t){let o;const i=r&&r[t];if(isArray(e)||isString(e)){o=new Array(e.length);for(let s=0,a=e.length;s<a;s++)o[s]=n(e[s],s,void 0,i&&i[s])}else if(typeof e=="number"){o=new Array(e);for(let s=0;s<e;s++)o[s]=n(s+1,s,void 0,i&&i[s])}else if(isObject$1(e))if(e[Symbol.iterator])o=Array.from(e,(s,a)=>n(s,a,void 0,i&&i[a]));else{const s=Object.keys(e);o=new Array(s.length);for(let a=0,l=s.length;a<l;a++){const u=s[a];o[a]=n(e[u],u,a,i&&i[a])}}else o=[];return r&&(r[t]=o),o}const getPublicInstance=e=>e?isStatefulComponent(e)?getExposeProxy(e)||e.proxy:getPublicInstance(e.parent):null,publicPropertiesMap=extend(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>getPublicInstance(e.parent),$root:e=>getPublicInstance(e.root),$emit:e=>e.emit,$options:e=>resolveMergedOptions(e),$forceUpdate:e=>()=>queueJob(e.update),$nextTick:e=>nextTick.bind(e.proxy),$watch:e=>instanceWatch.bind(e)}),PublicInstanceProxyHandlers={get({_:e},n){const{ctx:r,setupState:t,data:o,props:i,accessCache:s,type:a,appContext:l}=e;let u;if(n[0]!=="$"){const _=s[n];if(_!==void 0)switch(_){case 0:return t[n];case 1:return o[n];case 3:return r[n];case 2:return i[n]}else{if(t!==EMPTY_OBJ&&hasOwn(t,n))return s[n]=0,t[n];if(o!==EMPTY_OBJ&&hasOwn(o,n))return s[n]=1,o[n];if((u=e.propsOptions[0])&&hasOwn(u,n))return s[n]=2,i[n];if(r!==EMPTY_OBJ&&hasOwn(r,n))return s[n]=3,r[n];shouldCacheAccess&&(s[n]=4)}}const f=publicPropertiesMap[n];let c,d;if(f)return n==="$attrs"&&track(e,"get",n),f(e);if((c=a.__cssModules)&&(c=c[n]))return c;if(r!==EMPTY_OBJ&&hasOwn(r,n))return s[n]=3,r[n];if(d=l.config.globalProperties,hasOwn(d,n))return d[n]},set({_:e},n,r){const{data:t,setupState:o,ctx:i}=e;if(o!==EMPTY_OBJ&&hasOwn(o,n))o[n]=r;else if(t!==EMPTY_OBJ&&hasOwn(t,n))t[n]=r;else if(hasOwn(e.props,n))return!1;return n[0]==="$"&&n.slice(1)in e?!1:(i[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:t,appContext:o,propsOptions:i}},s){let a;return r[s]!==void 0||e!==EMPTY_OBJ&&hasOwn(e,s)||n!==EMPTY_OBJ&&hasOwn(n,s)||(a=i[0])&&hasOwn(a,s)||hasOwn(t,s)||hasOwn(publicPropertiesMap,s)||hasOwn(o.config.globalProperties,s)}},emptyAppContext=createAppContext();let uid$1=0;function createComponentInstance(e,n,r){const t=e.type,o=(n?n.appContext:e.appContext)||emptyAppContext,i={uid:uid$1++,vnode:e,type:t,parent:n,appContext:o,root:null,next:null,subTree:null,update:null,scope:new EffectScope(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:normalizePropsOptions(t,o),emitsOptions:normalizeEmitsOptions(t,o),emit:null,emitted:null,propsDefaults:EMPTY_OBJ,inheritAttrs:t.inheritAttrs,ctx:EMPTY_OBJ,data:EMPTY_OBJ,props:EMPTY_OBJ,attrs:EMPTY_OBJ,slots:EMPTY_OBJ,refs:EMPTY_OBJ,setupState:EMPTY_OBJ,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=n?n.root:i,i.emit=emit$1.bind(null,i),e.ce&&e.ce(i),i}let currentInstance=null;const getCurrentInstance=()=>currentInstance||currentRenderingInstance,setCurrentInstance=e=>{currentInstance=e,e.scope.on()},unsetCurrentInstance=()=>{currentInstance&&currentInstance.scope.off(),currentInstance=null};function isStatefulComponent(e){return e.vnode.shapeFlag&4}let isInSSRComponentSetup=!1;function setupComponent(e,n=!1){isInSSRComponentSetup=n;const{props:r,children:t}=e.vnode,o=isStatefulComponent(e);initProps(e,r,o,n),initSlots(e,t);const i=o?setupStatefulComponent(e,n):void 0;return isInSSRComponentSetup=!1,i}function setupStatefulComponent(e,n){const r=e.type;e.accessCache=Object.create(null),e.proxy=markRaw(new Proxy(e.ctx,PublicInstanceProxyHandlers));const{setup:t}=r;if(t){const o=e.setupContext=t.length>1?createSetupContext(e):null;setCurrentInstance(e),pauseTracking();const i=callWithErrorHandling(t,e,0,[e.props,o]);if(resetTracking(),unsetCurrentInstance(),isPromise$1(i)){if(i.then(unsetCurrentInstance,unsetCurrentInstance),n)return i.then(s=>{handleSetupResult(e,s,n)}).catch(s=>{handleError(s,e,0)});e.asyncDep=i}else handleSetupResult(e,i,n)}else finishComponentSetup(e,n)}function handleSetupResult(e,n,r){isFunction(n)?e.type.__ssrInlineRender?e.ssrRender=n:e.render=n:isObject$1(n)&&(e.setupState=proxyRefs(n)),finishComponentSetup(e,r)}let compile;function finishComponentSetup(e,n,r){const t=e.type;if(!e.render){if(!n&&compile&&!t.render){const o=t.template;if(o){const{isCustomElement:i,compilerOptions:s}=e.appContext.config,{delimiters:a,compilerOptions:l}=t,u=extend(extend({isCustomElement:i,delimiters:a},s),l);t.render=compile(o,u)}}e.render=t.render||NOOP}setCurrentInstance(e),pauseTracking(),applyOptions(e),resetTracking(),unsetCurrentInstance()}function createAttrsProxy(e){return new Proxy(e.attrs,{get(n,r){return track(e,"get","$attrs"),n[r]}})}function createSetupContext(e){const n=t=>{e.exposed=t||{}};let r;return{get attrs(){return r||(r=createAttrsProxy(e))},slots:e.slots,emit:e.emit,expose:n}}function getExposeProxy(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(proxyRefs(markRaw(e.exposed)),{get(n,r){if(r in n)return n[r];if(r in publicPropertiesMap)return publicPropertiesMap[r](e)}}))}function getComponentName(e){return isFunction(e)&&e.displayName||e.name}function isClassComponent(e){return isFunction(e)&&"__vccOpts"in e}function callWithErrorHandling(e,n,r,t){let o;try{o=t?e(...t):e()}catch(i){handleError(i,n,r)}return o}function callWithAsyncErrorHandling(e,n,r,t){if(isFunction(e)){const i=callWithErrorHandling(e,n,r,t);return i&&isPromise$1(i)&&i.catch(s=>{handleError(s,n,r)}),i}const o=[];for(let i=0;i<e.length;i++)o.push(callWithAsyncErrorHandling(e[i],n,r,t));return o}function handleError(e,n,r,t=!0){const o=n?n.vnode:null;if(n){let i=n.parent;const s=n.proxy,a=r;for(;i;){const u=i.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](e,s,a)===!1)return}i=i.parent}const l=n.appContext.config.errorHandler;if(l){callWithErrorHandling(l,null,10,[e,s,a]);return}}logError(e,r,o,t)}function logError(e,n,r,t=!0){console.error(e)}let isFlushing=!1,isFlushPending=!1;const queue=[];let flushIndex=0;const pendingPreFlushCbs=[];let activePreFlushCbs=null,preFlushIndex=0;const pendingPostFlushCbs=[];let activePostFlushCbs=null,postFlushIndex=0;const resolvedPromise=Promise.resolve();let currentFlushPromise=null,currentPreFlushParentJob=null;function nextTick(e){const n=currentFlushPromise||resolvedPromise;return e?n.then(this?e.bind(this):e):n}function findInsertionIndex(e){let n=flushIndex+1,r=queue.length;for(;n<r;){const t=n+r>>>1;getId(queue[t])<e?n=t+1:r=t}return n}function queueJob(e){(!queue.length||!queue.includes(e,isFlushing&&e.allowRecurse?flushIndex+1:flushIndex))&&e!==currentPreFlushParentJob&&(e.id==null?queue.push(e):queue.splice(findInsertionIndex(e.id),0,e),queueFlush())}function queueFlush(){!isFlushing&&!isFlushPending&&(isFlushPending=!0,currentFlushPromise=resolvedPromise.then(flushJobs))}function invalidateJob(e){const n=queue.indexOf(e);n>flushIndex&&queue.splice(n,1)}function queueCb(e,n,r,t){isArray(e)?r.push(...e):(!n||!n.includes(e,e.allowRecurse?t+1:t))&&r.push(e),queueFlush()}function queuePreFlushCb(e){queueCb(e,activePreFlushCbs,pendingPreFlushCbs,preFlushIndex)}function queuePostFlushCb(e){queueCb(e,activePostFlushCbs,pendingPostFlushCbs,postFlushIndex)}function flushPreFlushCbs(e,n=null){if(pendingPreFlushCbs.length){for(currentPreFlushParentJob=n,activePreFlushCbs=[...new Set(pendingPreFlushCbs)],pendingPreFlushCbs.length=0,preFlushIndex=0;preFlushIndex<activePreFlushCbs.length;preFlushIndex++)activePreFlushCbs[preFlushIndex]();activePreFlushCbs=null,preFlushIndex=0,currentPreFlushParentJob=null,flushPreFlushCbs(e,n)}}function flushPostFlushCbs(e){if(pendingPostFlushCbs.length){const n=[...new Set(pendingPostFlushCbs)];if(pendingPostFlushCbs.length=0,activePostFlushCbs){activePostFlushCbs.push(...n);return}for(activePostFlushCbs=n,activePostFlushCbs.sort((r,t)=>getId(r)-getId(t)),postFlushIndex=0;postFlushIndex<activePostFlushCbs.length;postFlushIndex++)activePostFlushCbs[postFlushIndex]();activePostFlushCbs=null,postFlushIndex=0}}const getId=e=>e.id==null?1/0:e.id;function flushJobs(e){isFlushPending=!1,isFlushing=!0,flushPreFlushCbs(e),queue.sort((r,t)=>getId(r)-getId(t));const n=NOOP;try{for(flushIndex=0;flushIndex<queue.length;flushIndex++){const r=queue[flushIndex];r&&r.active!==!1&&callWithErrorHandling(r,null,14)}}finally{flushIndex=0,queue.length=0,flushPostFlushCbs(),isFlushing=!1,currentFlushPromise=null,(queue.length||pendingPreFlushCbs.length||pendingPostFlushCbs.length)&&flushJobs(e)}}const INITIAL_WATCHER_VALUE={};function watch(e,n,r){return doWatch(e,n,r)}function doWatch(e,n,{immediate:r,deep:t,flush:o,onTrack:i,onTrigger:s}=EMPTY_OBJ){const a=currentInstance;let l,u=!1,f=!1;if(isRef(e)?(l=()=>e.value,u=!!e._shallow):isReactive(e)?(l=()=>e,t=!0):isArray(e)?(f=!0,u=e.some(isReactive),l=()=>e.map(m=>{if(isRef(m))return m.value;if(isReactive(m))return traverse(m);if(isFunction(m))return callWithErrorHandling(m,a,2)})):isFunction(e)?n?l=()=>callWithErrorHandling(e,a,2):l=()=>{if(!(a&&a.isUnmounted))return c&&c(),callWithAsyncErrorHandling(e,a,3,[d])}:l=NOOP,n&&t){const m=l;l=()=>traverse(m())}let c,d=m=>{c=C.onStop=()=>{callWithErrorHandling(m,a,4)}};if(isInSSRComponentSetup)return d=NOOP,n?r&&callWithAsyncErrorHandling(n,a,3,[l(),f?[]:void 0,d]):l(),NOOP;let _=f?[]:INITIAL_WATCHER_VALUE;const v=()=>{if(!!C.active)if(n){const m=C.run();(t||u||(f?m.some((g,y)=>hasChanged(g,_[y])):hasChanged(m,_)))&&(c&&c(),callWithAsyncErrorHandling(n,a,3,[m,_===INITIAL_WATCHER_VALUE?void 0:_,d]),_=m)}else C.run()};v.allowRecurse=!!n;let b;o==="sync"?b=v:o==="post"?b=()=>queuePostRenderEffect(v,a&&a.suspense):b=()=>{!a||a.isMounted?queuePreFlushCb(v):v()};const C=new ReactiveEffect(l,b);return n?r?v():_=C.run():o==="post"?queuePostRenderEffect(C.run.bind(C),a&&a.suspense):C.run(),()=>{C.stop(),a&&a.scope&&remove(a.scope.effects,C)}}function instanceWatch(e,n,r){const t=this.proxy,o=isString(e)?e.includes(".")?createPathGetter(t,e):()=>t[e]:e.bind(t,t);let i;isFunction(n)?i=n:(i=n.handler,r=n);const s=currentInstance;setCurrentInstance(this);const a=doWatch(o,i.bind(t),r);return s?setCurrentInstance(s):unsetCurrentInstance(),a}function createPathGetter(e,n){const r=n.split(".");return()=>{let t=e;for(let o=0;o<r.length&&t;o++)t=t[r[o]];return t}}function traverse(e,n){if(!isObject$1(e)||e.__v_skip||(n=n||new Set,n.has(e)))return e;if(n.add(e),isRef(e))traverse(e.value,n);else if(isArray(e))for(let r=0;r<e.length;r++)traverse(e[r],n);else if(isSet(e)||isMap(e))e.forEach(r=>{traverse(r,n)});else if(isPlainObject(e))for(const r in e)traverse(e[r],n);return e}function h(e,n,r){const t=arguments.length;return t===2?isObject$1(n)&&!isArray(n)?isVNode(n)?createVNode(e,null,[n]):createVNode(e,n):createVNode(e,null,n):(t>3?r=Array.prototype.slice.call(arguments,2):t===3&&isVNode(r)&&(r=[r]),createVNode(e,n,r))}const version="3.2.20",svgNS="http://www.w3.org/2000/svg",doc=typeof document!="undefined"?document:null,staticTemplateCache=new Map,nodeOps={insert:(e,n,r)=>{n.insertBefore(e,r||null)},remove:e=>{const n=e.parentNode;n&&n.removeChild(e)},createElement:(e,n,r,t)=>{const o=n?doc.createElementNS(svgNS,e):doc.createElement(e,r?{is:r}:void 0);return e==="select"&&t&&t.multiple!=null&&o.setAttribute("multiple",t.multiple),o},createText:e=>doc.createTextNode(e),createComment:e=>doc.createComment(e),setText:(e,n)=>{e.nodeValue=n},setElementText:(e,n)=>{e.textContent=n},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>doc.querySelector(e),setScopeId(e,n){e.setAttribute(n,"")},cloneNode(e){const n=e.cloneNode(!0);return"_value"in e&&(n._value=e._value),n},insertStaticContent(e,n,r,t){const o=r?r.previousSibling:n.lastChild;let i=staticTemplateCache.get(e);if(!i){const s=doc.createElement("template");if(s.innerHTML=t?`<svg>${e}</svg>`:e,i=s.content,t){const a=i.firstChild;for(;a.firstChild;)i.appendChild(a.firstChild);i.removeChild(a)}staticTemplateCache.set(e,i)}return n.insertBefore(i.cloneNode(!0),r),[o?o.nextSibling:n.firstChild,r?r.previousSibling:n.lastChild]}};function patchClass(e,n,r){const t=e._vtc;t&&(n=(n?[n,...t]:[...t]).join(" ")),n==null?e.removeAttribute("class"):r?e.setAttribute("class",n):e.className=n}function patchStyle(e,n,r){const t=e.style,o=t.display;if(!r)e.removeAttribute("style");else if(isString(r))n!==r&&(t.cssText=r);else{for(const i in r)setStyle(t,i,r[i]);if(n&&!isString(n))for(const i in n)r[i]==null&&setStyle(t,i,"")}"_vod"in e&&(t.display=o)}const importantRE=/\s*!important$/;function setStyle(e,n,r){if(isArray(r))r.forEach(t=>setStyle(e,n,t));else if(n.startsWith("--"))e.setProperty(n,r);else{const t=autoPrefix(e,n);importantRE.test(r)?e.setProperty(hyphenate(t),r.replace(importantRE,""),"important"):e[t]=r}}const prefixes=["Webkit","Moz","ms"],prefixCache={};function autoPrefix(e,n){const r=prefixCache[n];if(r)return r;let t=camelize(n);if(t!=="filter"&&t in e)return prefixCache[n]=t;t=capitalize(t);for(let o=0;o<prefixes.length;o++){const i=prefixes[o]+t;if(i in e)return prefixCache[n]=i}return n}const xlinkNS="http://www.w3.org/1999/xlink";function patchAttr(e,n,r,t,o){if(t&&n.startsWith("xlink:"))r==null?e.removeAttributeNS(xlinkNS,n.slice(6,n.length)):e.setAttributeNS(xlinkNS,n,r);else{const i=isSpecialBooleanAttr(n);r==null||i&&!includeBooleanAttr(r)?e.removeAttribute(n):e.setAttribute(n,i?"":r)}}function patchDOMProp(e,n,r,t,o,i,s){if(n==="innerHTML"||n==="textContent"){t&&s(t,o,i),e[n]=r==null?"":r;return}if(n==="value"&&e.tagName!=="PROGRESS"){e._value=r;const a=r==null?"":r;e.value!==a&&(e.value=a),r==null&&e.removeAttribute(n);return}if(r===""||r==null){const a=typeof e[n];if(a==="boolean"){e[n]=includeBooleanAttr(r);return}else if(r==null&&a==="string"){e[n]="",e.removeAttribute(n);return}else if(a==="number"){try{e[n]=0}catch{}e.removeAttribute(n);return}}try{e[n]=r}catch{}}let _getNow=Date.now,skipTimestampCheck=!1;if(typeof window!="undefined"){_getNow()>document.createEvent("Event").timeStamp&&(_getNow=()=>performance.now());const e=navigator.userAgent.match(/firefox\/(\d+)/i);skipTimestampCheck=!!(e&&Number(e[1])<=53)}let cachedNow=0;const p=Promise.resolve(),reset=()=>{cachedNow=0},getNow=()=>cachedNow||(p.then(reset),cachedNow=_getNow());function addEventListener(e,n,r,t){e.addEventListener(n,r,t)}function removeEventListener(e,n,r,t){e.removeEventListener(n,r,t)}function patchEvent(e,n,r,t,o=null){const i=e._vei||(e._vei={}),s=i[n];if(t&&s)s.value=t;else{const[a,l]=parseName(n);if(t){const u=i[n]=createInvoker(t,o);addEventListener(e,a,u,l)}else s&&(removeEventListener(e,a,s,l),i[n]=void 0)}}const optionsModifierRE=/(?:Once|Passive|Capture)$/;function parseName(e){let n;if(optionsModifierRE.test(e)){n={};let r;for(;r=e.match(optionsModifierRE);)e=e.slice(0,e.length-r[0].length),n[r[0].toLowerCase()]=!0}return[hyphenate(e.slice(2)),n]}function createInvoker(e,n){const r=t=>{const o=t.timeStamp||_getNow();(skipTimestampCheck||o>=r.attached-1)&&callWithAsyncErrorHandling(patchStopImmediatePropagation(t,r.value),n,5,[t])};return r.value=e,r.attached=getNow(),r}function patchStopImmediatePropagation(e,n){if(isArray(n)){const r=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{r.call(e),e._stopped=!0},n.map(t=>o=>!o._stopped&&t(o))}else return n}const nativeOnRE=/^on[a-z]/,patchProp=(e,n,r,t,o=!1,i,s,a,l)=>{n==="class"?patchClass(e,t,o):n==="style"?patchStyle(e,r,t):isOn(n)?isModelListener(n)||patchEvent(e,n,r,t,s):(n[0]==="."?(n=n.slice(1),!0):n[0]==="^"?(n=n.slice(1),!1):shouldSetAsProp(e,n,t,o))?patchDOMProp(e,n,t,i,s,a,l):(n==="true-value"?e._trueValue=t:n==="false-value"&&(e._falseValue=t),patchAttr(e,n,t,o))};function shouldSetAsProp(e,n,r,t){return t?!!(n==="innerHTML"||n==="textContent"||n in e&&nativeOnRE.test(n)&&isFunction(r)):n==="spellcheck"||n==="draggable"||n==="form"||n==="list"&&e.tagName==="INPUT"||n==="type"&&e.tagName==="TEXTAREA"||nativeOnRE.test(n)&&isString(r)?!1:n in e}const DOMTransitionPropsValidators={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};BaseTransition.props;const rendererOptions=extend({patchProp},nodeOps);let renderer;function ensureRenderer(){return renderer||(renderer=createRenderer(rendererOptions))}const createApp=(...e)=>{const n=ensureRenderer().createApp(...e),{mount:r}=n;return n.mount=t=>{const o=normalizeContainer(t);if(!o)return;const i=n._component;!isFunction(i)&&!i.render&&!i.template&&(i.template=o.innerHTML),o.innerHTML="";const s=r(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},n};function normalizeContainer(e){return isString(e)?document.querySelector(e):e}function getDevtoolsGlobalHook(){return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__}function getTarget(){return typeof navigator!="undefined"&&typeof window!="undefined"?window:typeof global!="undefined"?global:{}}const isProxyAvailable=typeof Proxy=="function",HOOK_SETUP="devtools-plugin:setup",HOOK_PLUGIN_SETTINGS_SET="plugin:settings:set";class ApiProxy{constructor(n,r){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=n,this.hook=r;const t={};if(n.settings)for(const s in n.settings){const a=n.settings[s];t[s]=a.defaultValue}const o=`__vue-devtools-plugin-settings__${n.id}`;let i=Ee({},t);try{const s=localStorage.getItem(o),a=JSON.parse(s);Object.assign(i,a)}catch{}this.fallbacks={getSettings(){return i},setSettings(s){try{localStorage.setItem(o,JSON.stringify(s))}catch{}i=s}},r.on(HOOK_PLUGIN_SETTINGS_SET,(s,a)=>{s===this.plugin.id&&this.fallbacks.setSettings(a)}),this.proxiedOn=new Proxy({},{get:(s,a)=>this.target?this.target.on[a]:(...l)=>{this.onQueue.push({method:a,args:l})}}),this.proxiedTarget=new Proxy({},{get:(s,a)=>this.target?this.target[a]:a==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(a)?(...l)=>(this.targetQueue.push({method:a,args:l,resolve:()=>{}}),this.fallbacks[a](...l)):(...l)=>new Promise(u=>{this.targetQueue.push({method:a,args:l,resolve:u})})})}async setRealTarget(n){this.target=n;for(const r of this.onQueue)this.target.on[r.method](...r.args);for(const r of this.targetQueue)r.resolve(await this.target[r.method](...r.args))}}function setupDevtoolsPlugin(e,n){const r=getTarget(),t=getDevtoolsGlobalHook(),o=isProxyAvailable&&e.enableEarlyProxy;if(t&&(r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!o))t.emit(HOOK_SETUP,e,n);else{const i=o?new ApiProxy(e,t):null;(r.__VUE_DEVTOOLS_PLUGINS__=r.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:e,setupFn:n,proxy:i}),i&&n(i.proxiedTarget)}}/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */var storeKey="store";function useStore(e){return e===void 0&&(e=null),inject(e!==null?e:storeKey)}function find(e,n){return e.filter(n)[0]}function deepCopy(e,n){if(n===void 0&&(n=[]),e===null||typeof e!="object")return e;var r=find(n,function(o){return o.original===e});if(r)return r.copy;var t=Array.isArray(e)?[]:{};return n.push({original:e,copy:t}),Object.keys(e).forEach(function(o){t[o]=deepCopy(e[o],n)}),t}function forEachValue(e,n){Object.keys(e).forEach(function(r){return n(e[r],r)})}function isObject(e){return e!==null&&typeof e=="object"}function isPromise(e){return e&&typeof e.then=="function"}function partial(e,n){return function(){return e(n)}}function genericSubscribe(e,n,r){return n.indexOf(e)<0&&(r&&r.prepend?n.unshift(e):n.push(e)),function(){var t=n.indexOf(e);t>-1&&n.splice(t,1)}}function resetStore(e,n){e._actions=Object.create(null),e._mutations=Object.create(null),e._wrappedGetters=Object.create(null),e._modulesNamespaceMap=Object.create(null);var r=e.state;installModule(e,r,[],e._modules.root,!0),resetStoreState(e,r,n)}function resetStoreState(e,n,r){var t=e._state;e.getters={},e._makeLocalGettersCache=Object.create(null);var o=e._wrappedGetters,i={};forEachValue(o,function(s,a){i[a]=partial(s,e),Object.defineProperty(e.getters,a,{get:function(){return i[a]()},enumerable:!0})}),e._state=reactive({data:n}),e.strict&&enableStrictMode(e),t&&r&&e._withCommit(function(){t.data=null})}function installModule(e,n,r,t,o){var i=!r.length,s=e._modules.getNamespace(r);if(t.namespaced&&(e._modulesNamespaceMap[s],e._modulesNamespaceMap[s]=t),!i&&!o){var a=getNestedState(n,r.slice(0,-1)),l=r[r.length-1];e._withCommit(function(){a[l]=t.state})}var u=t.context=makeLocalContext(e,s,r);t.forEachMutation(function(f,c){var d=s+c;registerMutation(e,d,f,u)}),t.forEachAction(function(f,c){var d=f.root?c:s+c,_=f.handler||f;registerAction(e,d,_,u)}),t.forEachGetter(function(f,c){var d=s+c;registerGetter(e,d,f,u)}),t.forEachChild(function(f,c){installModule(e,n,r.concat(c),f,o)})}function makeLocalContext(e,n,r){var t=n==="",o={dispatch:t?e.dispatch:function(i,s,a){var l=unifyObjectStyle(i,s,a),u=l.payload,f=l.options,c=l.type;return(!f||!f.root)&&(c=n+c),e.dispatch(c,u)},commit:t?e.commit:function(i,s,a){var l=unifyObjectStyle(i,s,a),u=l.payload,f=l.options,c=l.type;(!f||!f.root)&&(c=n+c),e.commit(c,u,f)}};return Object.defineProperties(o,{getters:{get:t?function(){return e.getters}:function(){return makeLocalGetters(e,n)}},state:{get:function(){return getNestedState(e.state,r)}}}),o}function makeLocalGetters(e,n){if(!e._makeLocalGettersCache[n]){var r={},t=n.length;Object.keys(e.getters).forEach(function(o){if(o.slice(0,t)===n){var i=o.slice(t);Object.defineProperty(r,i,{get:function(){return e.getters[o]},enumerable:!0})}}),e._makeLocalGettersCache[n]=r}return e._makeLocalGettersCache[n]}function registerMutation(e,n,r,t){var o=e._mutations[n]||(e._mutations[n]=[]);o.push(function(s){r.call(e,t.state,s)})}function registerAction(e,n,r,t){var o=e._actions[n]||(e._actions[n]=[]);o.push(function(s){var a=r.call(e,{dispatch:t.dispatch,commit:t.commit,getters:t.getters,state:t.state,rootGetters:e.getters,rootState:e.state},s);return isPromise(a)||(a=Promise.resolve(a)),e._devtoolHook?a.catch(function(l){throw e._devtoolHook.emit("vuex:error",l),l}):a})}function registerGetter(e,n,r,t){e._wrappedGetters[n]||(e._wrappedGetters[n]=function(i){return r(t.state,t.getters,i.state,i.getters)})}function enableStrictMode(e){watch(function(){return e._state.data},function(){},{deep:!0,flush:"sync"})}function getNestedState(e,n){return n.reduce(function(r,t){return r[t]},e)}function unifyObjectStyle(e,n,r){return isObject(e)&&e.type&&(r=n,n=e,e=e.type),{type:e,payload:n,options:r}}var LABEL_VUEX_BINDINGS="vuex bindings",MUTATIONS_LAYER_ID="vuex:mutations",ACTIONS_LAYER_ID="vuex:actions",INSPECTOR_ID="vuex",actionId=0;function addDevtools(e,n){setupDevtoolsPlugin({id:"org.vuejs.vuex",app:e,label:"Vuex",homepage:"https://next.vuex.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",packageName:"vuex",componentStateTypes:[LABEL_VUEX_BINDINGS]},function(r){r.addTimelineLayer({id:MUTATIONS_LAYER_ID,label:"Vuex Mutations",color:COLOR_LIME_500}),r.addTimelineLayer({id:ACTIONS_LAYER_ID,label:"Vuex Actions",color:COLOR_LIME_500}),r.addInspector({id:INSPECTOR_ID,label:"Vuex",icon:"storage",treeFilterPlaceholder:"Filter stores..."}),r.on.getInspectorTree(function(t){if(t.app===e&&t.inspectorId===INSPECTOR_ID)if(t.filter){var o=[];flattenStoreForInspectorTree(o,n._modules.root,t.filter,""),t.rootNodes=o}else t.rootNodes=[formatStoreForInspectorTree(n._modules.root,"")]}),r.on.getInspectorState(function(t){if(t.app===e&&t.inspectorId===INSPECTOR_ID){var o=t.nodeId;makeLocalGetters(n,o),t.state=formatStoreForInspectorState(getStoreModule(n._modules,o),o==="root"?n.getters:n._makeLocalGettersCache,o)}}),r.on.editInspectorState(function(t){if(t.app===e&&t.inspectorId===INSPECTOR_ID){var o=t.nodeId,i=t.path;o!=="root"&&(i=o.split("/").filter(Boolean).concat(i)),n._withCommit(function(){t.set(n._state.data,i,t.state.value)})}}),n.subscribe(function(t,o){var i={};t.payload&&(i.payload=t.payload),i.state=o,r.notifyComponentUpdate(),r.sendInspectorTree(INSPECTOR_ID),r.sendInspectorState(INSPECTOR_ID),r.addTimelineEvent({layerId:MUTATIONS_LAYER_ID,event:{time:Date.now(),title:t.type,data:i}})}),n.subscribeAction({before:function(t,o){var i={};t.payload&&(i.payload=t.payload),t._id=actionId++,t._time=Date.now(),i.state=o,r.addTimelineEvent({layerId:ACTIONS_LAYER_ID,event:{time:t._time,title:t.type,groupId:t._id,subtitle:"start",data:i}})},after:function(t,o){var i={},s=Date.now()-t._time;i.duration={_custom:{type:"duration",display:s+"ms",tooltip:"Action duration",value:s}},t.payload&&(i.payload=t.payload),i.state=o,r.addTimelineEvent({layerId:ACTIONS_LAYER_ID,event:{time:Date.now(),title:t.type,groupId:t._id,subtitle:"end",data:i}})}})})}var COLOR_LIME_500=8702998,COLOR_DARK=6710886,COLOR_WHITE=16777215,TAG_NAMESPACED={label:"namespaced",textColor:COLOR_WHITE,backgroundColor:COLOR_DARK};function extractNameFromPath(e){return e&&e!=="root"?e.split("/").slice(-2,-1)[0]:"Root"}function formatStoreForInspectorTree(e,n){return{id:n||"root",label:extractNameFromPath(n),tags:e.namespaced?[TAG_NAMESPACED]:[],children:Object.keys(e._children).map(function(r){return formatStoreForInspectorTree(e._children[r],n+r+"/")})}}function flattenStoreForInspectorTree(e,n,r,t){t.includes(r)&&e.push({id:t||"root",label:t.endsWith("/")?t.slice(0,t.length-1):t||"Root",tags:n.namespaced?[TAG_NAMESPACED]:[]}),Object.keys(n._children).forEach(function(o){flattenStoreForInspectorTree(e,n._children[o],r,t+o+"/")})}function formatStoreForInspectorState(e,n,r){n=r==="root"?n:n[r];var t=Object.keys(n),o={state:Object.keys(e.state).map(function(s){return{key:s,editable:!0,value:e.state[s]}})};if(t.length){var i=transformPathsToObjectTree(n);o.getters=Object.keys(i).map(function(s){return{key:s.endsWith("/")?extractNameFromPath(s):s,editable:!1,value:canThrow(function(){return i[s]})}})}return o}function transformPathsToObjectTree(e){var n={};return Object.keys(e).forEach(function(r){var t=r.split("/");if(t.length>1){var o=n,i=t.pop();t.forEach(function(s){o[s]||(o[s]={_custom:{value:{},display:s,tooltip:"Module",abstract:!0}}),o=o[s]._custom.value}),o[i]=canThrow(function(){return e[r]})}else n[r]=canThrow(function(){return e[r]})}),n}function getStoreModule(e,n){var r=n.split("/").filter(function(t){return t});return r.reduce(function(t,o,i){var s=t[o];if(!s)throw new Error('Missing module "'+o+'" for path "'+n+'".');return i===r.length-1?s:s._children},n==="root"?e:e.root._children)}function canThrow(e){try{return e()}catch(n){return n}}var Module=function(n,r){this.runtime=r,this._children=Object.create(null),this._rawModule=n;var t=n.state;this.state=(typeof t=="function"?t():t)||{}},prototypeAccessors$1={namespaced:{configurable:!0}};prototypeAccessors$1.namespaced.get=function(){return!!this._rawModule.namespaced};Module.prototype.addChild=function(n,r){this._children[n]=r};Module.prototype.removeChild=function(n){delete this._children[n]};Module.prototype.getChild=function(n){return this._children[n]};Module.prototype.hasChild=function(n){return n in this._children};Module.prototype.update=function(n){this._rawModule.namespaced=n.namespaced,n.actions&&(this._rawModule.actions=n.actions),n.mutations&&(this._rawModule.mutations=n.mutations),n.getters&&(this._rawModule.getters=n.getters)};Module.prototype.forEachChild=function(n){forEachValue(this._children,n)};Module.prototype.forEachGetter=function(n){this._rawModule.getters&&forEachValue(this._rawModule.getters,n)};Module.prototype.forEachAction=function(n){this._rawModule.actions&&forEachValue(this._rawModule.actions,n)};Module.prototype.forEachMutation=function(n){this._rawModule.mutations&&forEachValue(this._rawModule.mutations,n)};Object.defineProperties(Module.prototype,prototypeAccessors$1);var ModuleCollection=function(n){this.register([],n,!1)};ModuleCollection.prototype.get=function(n){return n.reduce(function(r,t){return r.getChild(t)},this.root)};ModuleCollection.prototype.getNamespace=function(n){var r=this.root;return n.reduce(function(t,o){return r=r.getChild(o),t+(r.namespaced?o+"/":"")},"")};ModuleCollection.prototype.update=function(n){update([],this.root,n)};ModuleCollection.prototype.register=function(n,r,t){var o=this;t===void 0&&(t=!0);var i=new Module(r,t);if(n.length===0)this.root=i;else{var s=this.get(n.slice(0,-1));s.addChild(n[n.length-1],i)}r.modules&&forEachValue(r.modules,function(a,l){o.register(n.concat(l),a,t)})};ModuleCollection.prototype.unregister=function(n){var r=this.get(n.slice(0,-1)),t=n[n.length-1],o=r.getChild(t);!o||!o.runtime||r.removeChild(t)};ModuleCollection.prototype.isRegistered=function(n){var r=this.get(n.slice(0,-1)),t=n[n.length-1];return r?r.hasChild(t):!1};function update(e,n,r){if(n.update(r),r.modules)for(var t in r.modules){if(!n.getChild(t))return;update(e.concat(t),n.getChild(t),r.modules[t])}}function createStore(e){return new Store(e)}var Store=function(n){var r=this;n===void 0&&(n={});var t=n.plugins;t===void 0&&(t=[]);var o=n.strict;o===void 0&&(o=!1);var i=n.devtools;this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new ModuleCollection(n),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._makeLocalGettersCache=Object.create(null),this._devtools=i;var s=this,a=this,l=a.dispatch,u=a.commit;this.dispatch=function(d,_){return l.call(s,d,_)},this.commit=function(d,_,v){return u.call(s,d,_,v)},this.strict=o;var f=this._modules.root.state;installModule(this,f,[],this._modules.root),resetStoreState(this,f),t.forEach(function(c){return c(r)})},prototypeAccessors={state:{configurable:!0}};Store.prototype.install=function(n,r){n.provide(r||storeKey,this),n.config.globalProperties.$store=this;var t=this._devtools!==void 0?this._devtools:!1;t&&addDevtools(n,this)};prototypeAccessors.state.get=function(){return this._state.data};prototypeAccessors.state.set=function(e){};Store.prototype.commit=function(n,r,t){var o=this,i=unifyObjectStyle(n,r,t),s=i.type,a=i.payload,l={type:s,payload:a},u=this._mutations[s];!u||(this._withCommit(function(){u.forEach(function(c){c(a)})}),this._subscribers.slice().forEach(function(f){return f(l,o.state)}))};Store.prototype.dispatch=function(n,r){var t=this,o=unifyObjectStyle(n,r),i=o.type,s=o.payload,a={type:i,payload:s},l=this._actions[i];if(!!l){try{this._actionSubscribers.slice().filter(function(f){return f.before}).forEach(function(f){return f.before(a,t.state)})}catch{}var u=l.length>1?Promise.all(l.map(function(f){return f(s)})):l[0](s);return new Promise(function(f,c){u.then(function(d){try{t._actionSubscribers.filter(function(_){return _.after}).forEach(function(_){return _.after(a,t.state)})}catch{}f(d)},function(d){try{t._actionSubscribers.filter(function(_){return _.error}).forEach(function(_){return _.error(a,t.state,d)})}catch{}c(d)})})}};Store.prototype.subscribe=function(n,r){return genericSubscribe(n,this._subscribers,r)};Store.prototype.subscribeAction=function(n,r){var t=typeof n=="function"?{before:n}:n;return genericSubscribe(t,this._actionSubscribers,r)};Store.prototype.watch=function(n,r,t){var o=this;return watch(function(){return n(o.state,o.getters)},r,Object.assign({},t))};Store.prototype.replaceState=function(n){var r=this;this._withCommit(function(){r._state.data=n})};Store.prototype.registerModule=function(n,r,t){t===void 0&&(t={}),typeof n=="string"&&(n=[n]),this._modules.register(n,r),installModule(this,this.state,n,this._modules.get(n),t.preserveState),resetStoreState(this,this.state)};Store.prototype.unregisterModule=function(n){var r=this;typeof n=="string"&&(n=[n]),this._modules.unregister(n),this._withCommit(function(){var t=getNestedState(r.state,n.slice(0,-1));delete t[n[n.length-1]]}),resetStore(this)};Store.prototype.hasModule=function(n){return typeof n=="string"&&(n=[n]),this._modules.isRegistered(n)};Store.prototype.hotUpdate=function(n){this._modules.update(n),resetStore(this,!0)};Store.prototype._withCommit=function(n){var r=this._committing;this._committing=!0,n(),this._committing=r};Object.defineProperties(Store.prototype,prototypeAccessors);var mapState=normalizeNamespace(function(e,n){var r={};return normalizeMap(n).forEach(function(t){var o=t.key,i=t.val;r[o]=function(){var a=this.$store.state,l=this.$store.getters;if(e){var u=getModuleByNamespace(this.$store,"mapState",e);if(!u)return;a=u.context.state,l=u.context.getters}return typeof i=="function"?i.call(this,a,l):a[i]},r[o].vuex=!0}),r}),mapMutations=normalizeNamespace(function(e,n){var r={};return normalizeMap(n).forEach(function(t){var o=t.key,i=t.val;r[o]=function(){for(var a=[],l=arguments.length;l--;)a[l]=arguments[l];var u=this.$store.commit;if(e){var f=getModuleByNamespace(this.$store,"mapMutations",e);if(!f)return;u=f.context.commit}return typeof i=="function"?i.apply(this,[u].concat(a)):u.apply(this.$store,[i].concat(a))}}),r}),mapGetters=normalizeNamespace(function(e,n){var r={};return normalizeMap(n).forEach(function(t){var o=t.key,i=t.val;i=e+i,r[o]=function(){if(!(e&&!getModuleByNamespace(this.$store,"mapGetters",e)))return this.$store.getters[i]},r[o].vuex=!0}),r}),mapActions=normalizeNamespace(function(e,n){var r={};return normalizeMap(n).forEach(function(t){var o=t.key,i=t.val;r[o]=function(){for(var a=[],l=arguments.length;l--;)a[l]=arguments[l];var u=this.$store.dispatch;if(e){var f=getModuleByNamespace(this.$store,"mapActions",e);if(!f)return;u=f.context.dispatch}return typeof i=="function"?i.apply(this,[u].concat(a)):u.apply(this.$store,[i].concat(a))}}),r}),createNamespacedHelpers=function(e){return{mapState:mapState.bind(null,e),mapGetters:mapGetters.bind(null,e),mapMutations:mapMutations.bind(null,e),mapActions:mapActions.bind(null,e)}};function normalizeMap(e){return isValidMap(e)?Array.isArray(e)?e.map(function(n){return{key:n,val:n}}):Object.keys(e).map(function(n){return{key:n,val:e[n]}}):[]}function isValidMap(e){return Array.isArray(e)||isObject(e)}function normalizeNamespace(e){return function(n,r){return typeof n!="string"?(r=n,n=""):n.charAt(n.length-1)!=="/"&&(n+="/"),e(n,r)}}function getModuleByNamespace(e,n,r){var t=e._modulesNamespaceMap[r];return t}function createLogger(e){e===void 0&&(e={});var n=e.collapsed;n===void 0&&(n=!0);var r=e.filter;r===void 0&&(r=function(f,c,d){return!0});var t=e.transformer;t===void 0&&(t=function(f){return f});var o=e.mutationTransformer;o===void 0&&(o=function(f){return f});var i=e.actionFilter;i===void 0&&(i=function(f,c){return!0});var s=e.actionTransformer;s===void 0&&(s=function(f){return f});var a=e.logMutations;a===void 0&&(a=!0);var l=e.logActions;l===void 0&&(l=!0);var u=e.logger;return u===void 0&&(u=console),function(f){var c=deepCopy(f.state);typeof u!="undefined"&&(a&&f.subscribe(function(d,_){var v=deepCopy(_);if(r(d,c,v)){var b=getFormattedTime(),C=o(d),m="mutation "+d.type+b;startMessage(u,m,n),u.log("%c prev state","color: #9E9E9E; font-weight: bold",t(c)),u.log("%c mutation","color: #03A9F4; font-weight: bold",C),u.log("%c next state","color: #4CAF50; font-weight: bold",t(v)),endMessage(u)}c=v}),l&&f.subscribeAction(function(d,_){if(i(d,_)){var v=getFormattedTime(),b=s(d),C="action "+d.type+v;startMessage(u,C,n),u.log("%c action","color: #03A9F4; font-weight: bold",b),endMessage(u)}}))}}function startMessage(e,n,r){var t=r?e.groupCollapsed:e.group;try{t.call(e,n)}catch{e.log(n)}}function endMessage(e){try{e.groupEnd()}catch{e.log("\u2014\u2014 log end \u2014\u2014")}}function getFormattedTime(){var e=new Date;return" @ "+pad(e.getHours(),2)+":"+pad(e.getMinutes(),2)+":"+pad(e.getSeconds(),2)+"."+pad(e.getMilliseconds(),3)}function repeat(e,n){return new Array(n+1).join(e)}function pad(e,n){return repeat("0",n-e.toString().length)+e}var index={version:"4.0.2",Store,storeKey,createStore,useStore,mapState,mapMutations,mapGetters,mapActions,createNamespacedHelpers,createLogger},Vuex=index;/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */const hasSymbol=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol",PolySymbol=e=>hasSymbol?Symbol(e):"_vr_"+e,matchedRouteKey=PolySymbol("rvlm"),viewDepthKey=PolySymbol("rvd"),routerKey=PolySymbol("r"),routeLocationKey=PolySymbol("rl"),routerViewLocationKey=PolySymbol("rvl"),isBrowser=typeof window!="undefined";function isESModule(e){return e.__esModule||hasSymbol&&e[Symbol.toStringTag]==="Module"}const assign=Object.assign;function applyToParams(e,n){const r={};for(const t in n){const o=n[t];r[t]=Array.isArray(o)?o.map(e):e(o)}return r}const noop=()=>{},TRAILING_SLASH_RE=/\/$/,removeTrailingSlash=e=>e.replace(TRAILING_SLASH_RE,"");function parseURL(e,n,r="/"){let t,o={},i="",s="";const a=n.indexOf("?"),l=n.indexOf("#",a>-1?a:0);return a>-1&&(t=n.slice(0,a),i=n.slice(a+1,l>-1?l:n.length),o=e(i)),l>-1&&(t=t||n.slice(0,l),s=n.slice(l,n.length)),t=resolveRelativePath(t!=null?t:n,r),{fullPath:t+(i&&"?")+i+s,path:t,query:o,hash:s}}function stringifyURL(e,n){const r=n.query?e(n.query):"";return n.path+(r&&"?")+r+(n.hash||"")}function stripBase(e,n){return!n||!e.toLowerCase().startsWith(n.toLowerCase())?e:e.slice(n.length)||"/"}function isSameRouteLocation(e,n,r){const t=n.matched.length-1,o=r.matched.length-1;return t>-1&&t===o&&isSameRouteRecord(n.matched[t],r.matched[o])&&isSameRouteLocationParams(n.params,r.params)&&e(n.query)===e(r.query)&&n.hash===r.hash}function isSameRouteRecord(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}function isSameRouteLocationParams(e,n){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(const r in e)if(!isSameRouteLocationParamsValue(e[r],n[r]))return!1;return!0}function isSameRouteLocationParamsValue(e,n){return Array.isArray(e)?isEquivalentArray(e,n):Array.isArray(n)?isEquivalentArray(n,e):e===n}function isEquivalentArray(e,n){return Array.isArray(n)?e.length===n.length&&e.every((r,t)=>r===n[t]):e.length===1&&e[0]===n}function resolveRelativePath(e,n){if(e.startsWith("/"))return e;if(!e)return n;const r=n.split("/"),t=e.split("/");let o=r.length-1,i,s;for(i=0;i<t.length;i++)if(s=t[i],!(o===1||s==="."))if(s==="..")o--;else break;return r.slice(0,o).join("/")+"/"+t.slice(i-(i===t.length?1:0)).join("/")}var NavigationType;(function(e){e.pop="pop",e.push="push"})(NavigationType||(NavigationType={}));var NavigationDirection;(function(e){e.back="back",e.forward="forward",e.unknown=""})(NavigationDirection||(NavigationDirection={}));function normalizeBase(e){if(!e)if(isBrowser){const n=document.querySelector("base");e=n&&n.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),removeTrailingSlash(e)}const BEFORE_HASH_RE=/^[^#]+#/;function createHref(e,n){return e.replace(BEFORE_HASH_RE,"#")+n}function getElementPosition(e,n){const r=document.documentElement.getBoundingClientRect(),t=e.getBoundingClientRect();return{behavior:n.behavior,left:t.left-r.left-(n.left||0),top:t.top-r.top-(n.top||0)}}const computeScrollPosition=()=>({left:window.pageXOffset,top:window.pageYOffset});function scrollToPosition(e){let n;if("el"in e){const r=e.el,t=typeof r=="string"&&r.startsWith("#"),o=typeof r=="string"?t?document.getElementById(r.slice(1)):document.querySelector(r):r;if(!o)return;n=getElementPosition(o,e)}else n=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(n):window.scrollTo(n.left!=null?n.left:window.pageXOffset,n.top!=null?n.top:window.pageYOffset)}function getScrollKey(e,n){return(history.state?history.state.position-n:-1)+e}const scrollPositions=new Map;function saveScrollPosition(e,n){scrollPositions.set(e,n)}function getSavedScrollPosition(e){const n=scrollPositions.get(e);return scrollPositions.delete(e),n}let createBaseLocation=()=>location.protocol+"//"+location.host;function createCurrentLocation(e,n){const{pathname:r,search:t,hash:o}=n,i=e.indexOf("#");if(i>-1){let a=o.includes(e.slice(i))?e.slice(i).length:1,l=o.slice(a);return l[0]!=="/"&&(l="/"+l),stripBase(l,"")}return stripBase(r,e)+t+o}function useHistoryListeners(e,n,r,t){let o=[],i=[],s=null;const a=({state:d})=>{const _=createCurrentLocation(e,location),v=r.value,b=n.value;let C=0;if(d){if(r.value=_,n.value=d,s&&s===v){s=null;return}C=b?d.position-b.position:0}else t(_);o.forEach(m=>{m(r.value,v,{delta:C,type:NavigationType.pop,direction:C?C>0?NavigationDirection.forward:NavigationDirection.back:NavigationDirection.unknown})})};function l(){s=r.value}function u(d){o.push(d);const _=()=>{const v=o.indexOf(d);v>-1&&o.splice(v,1)};return i.push(_),_}function f(){const{history:d}=window;!d.state||d.replaceState(assign({},d.state,{scroll:computeScrollPosition()}),"")}function c(){for(const d of i)d();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",f)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",f),{pauseListeners:l,listen:u,destroy:c}}function buildState(e,n,r,t=!1,o=!1){return{back:e,current:n,forward:r,replaced:t,position:window.history.length,scroll:o?computeScrollPosition():null}}function useHistoryStateNavigation(e){const{history:n,location:r}=window,t={value:createCurrentLocation(e,r)},o={value:n.state};o.value||i(t.value,{back:null,current:t.value,forward:null,position:n.length-1,replaced:!0,scroll:null},!0);function i(l,u,f){const c=e.indexOf("#"),d=c>-1?(r.host&&document.querySelector("base")?e:e.slice(c))+l:createBaseLocation()+e+l;try{n[f?"replaceState":"pushState"](u,"",d),o.value=u}catch(_){console.error(_),r[f?"replace":"assign"](d)}}function s(l,u){const f=assign({},n.state,buildState(o.value.back,l,o.value.forward,!0),u,{position:o.value.position});i(l,f,!0),t.value=l}function a(l,u){const f=assign({},o.value,n.state,{forward:l,scroll:computeScrollPosition()});i(f.current,f,!0);const c=assign({},buildState(t.value,l,null),{position:f.position+1},u);i(l,c,!1),t.value=l}return{location:t,state:o,push:a,replace:s}}function createWebHistory(e){e=normalizeBase(e);const n=useHistoryStateNavigation(e),r=useHistoryListeners(e,n.state,n.location,n.replace);function t(i,s=!0){s||r.pauseListeners(),history.go(i)}const o=assign({location:"",base:e,go:t,createHref:createHref.bind(null,e)},n,r);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>n.state.value}),o}function isRouteLocation(e){return typeof e=="string"||e&&typeof e=="object"}function isRouteName(e){return typeof e=="string"||typeof e=="symbol"}const START_LOCATION_NORMALIZED={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},NavigationFailureSymbol=PolySymbol("nf");var NavigationFailureType;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(NavigationFailureType||(NavigationFailureType={}));function createRouterError(e,n){return assign(new Error,{type:e,[NavigationFailureSymbol]:!0},n)}function isNavigationFailure(e,n){return e instanceof Error&&NavigationFailureSymbol in e&&(n==null||!!(e.type&n))}const BASE_PARAM_PATTERN="[^/]+?",BASE_PATH_PARSER_OPTIONS={sensitive:!1,strict:!1,start:!0,end:!0},REGEX_CHARS_RE=/[.+*?^${}()[\]/\\]/g;function tokensToParser(e,n){const r=assign({},BASE_PATH_PARSER_OPTIONS,n),t=[];let o=r.start?"^":"";const i=[];for(const u of e){const f=u.length?[]:[90];r.strict&&!u.length&&(o+="/");for(let c=0;c<u.length;c++){const d=u[c];let _=40+(r.sensitive?.25:0);if(d.type===0)c||(o+="/"),o+=d.value.replace(REGEX_CHARS_RE,"\\$&"),_+=40;else if(d.type===1){const{value:v,repeatable:b,optional:C,regexp:m}=d;i.push({name:v,repeatable:b,optional:C});const g=m||BASE_PARAM_PATTERN;if(g!==BASE_PARAM_PATTERN){_+=10;try{new RegExp(`(${g})`)}catch(k){throw new Error(`Invalid custom RegExp for param "${v}" (${g}): `+k.message)}}let y=b?`((?:${g})(?:/(?:${g}))*)`:`(${g})`;c||(y=C&&u.length<2?`(?:/${y})`:"/"+y),C&&(y+="?"),o+=y,_+=20,C&&(_+=-8),b&&(_+=-20),g===".*"&&(_+=-50)}f.push(_)}t.push(f)}if(r.strict&&r.end){const u=t.length-1;t[u][t[u].length-1]+=.7000000000000001}r.strict||(o+="/?"),r.end?o+="$":r.strict&&(o+="(?:/|$)");const s=new RegExp(o,r.sensitive?"":"i");function a(u){const f=u.match(s),c={};if(!f)return null;for(let d=1;d<f.length;d++){const _=f[d]||"",v=i[d-1];c[v.name]=_&&v.repeatable?_.split("/"):_}return c}function l(u){let f="",c=!1;for(const d of e){(!c||!f.endsWith("/"))&&(f+="/"),c=!1;for(const _ of d)if(_.type===0)f+=_.value;else if(_.type===1){const{value:v,repeatable:b,optional:C}=_,m=v in u?u[v]:"";if(Array.isArray(m)&&!b)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const g=Array.isArray(m)?m.join("/"):m;if(!g)if(C)d.length<2&&(f.endsWith("/")?f=f.slice(0,-1):c=!0);else throw new Error(`Missing required param "${v}"`);f+=g}}return f}return{re:s,score:t,keys:i,parse:a,stringify:l}}function compareScoreArray(e,n){let r=0;for(;r<e.length&&r<n.length;){const t=n[r]-e[r];if(t)return t;r++}return e.length<n.length?e.length===1&&e[0]===40+40?-1:1:e.length>n.length?n.length===1&&n[0]===40+40?1:-1:0}function comparePathParserScore(e,n){let r=0;const t=e.score,o=n.score;for(;r<t.length&&r<o.length;){const i=compareScoreArray(t[r],o[r]);if(i)return i;r++}return o.length-t.length}const ROOT_TOKEN={type:0,value:""},VALID_PARAM_RE=/[a-zA-Z0-9_]/;function tokenizePath(e){if(!e)return[[]];if(e==="/")return[[ROOT_TOKEN]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function n(_){throw new Error(`ERR (${r})/"${u}": ${_}`)}let r=0,t=r;const o=[];let i;function s(){i&&o.push(i),i=[]}let a=0,l,u="",f="";function c(){!u||(r===0?i.push({type:0,value:u}):r===1||r===2||r===3?(i.length>1&&(l==="*"||l==="+")&&n(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:f,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):n("Invalid state to consume buffer"),u="")}function d(){u+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&r!==2){t=r,r=4;continue}switch(r){case 0:l==="/"?(u&&c(),s()):l===":"?(c(),r=1):d();break;case 4:d(),r=t;break;case 1:l==="("?r=2:VALID_PARAM_RE.test(l)?d():(c(),r=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?f[f.length-1]=="\\"?f=f.slice(0,-1)+l:r=3:f+=l;break;case 3:c(),r=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,f="";break;default:n("Unknown state");break}}return r===2&&n(`Unfinished custom RegExp for param "${u}"`),c(),s(),o}function createRouteRecordMatcher(e,n,r){const t=tokensToParser(tokenizePath(e.path),r),o=assign(t,{record:e,parent:n,children:[],alias:[]});return n&&!o.record.aliasOf==!n.record.aliasOf&&n.children.push(o),o}function createRouterMatcher(e,n){const r=[],t=new Map;n=mergeOptions({strict:!1,end:!0,sensitive:!1},n);function o(f){return t.get(f)}function i(f,c,d){const _=!d,v=normalizeRouteRecord(f);v.aliasOf=d&&d.record;const b=mergeOptions(n,f),C=[v];if("alias"in f){const y=typeof f.alias=="string"?[f.alias]:f.alias;for(const k of y)C.push(assign({},v,{components:d?d.record.components:v.components,path:k,aliasOf:d?d.record:v}))}let m,g;for(const y of C){const{path:k}=y;if(c&&k[0]!=="/"){const x=c.record.path,w=x[x.length-1]==="/"?"":"/";y.path=c.record.path+(k&&w+k)}if(m=createRouteRecordMatcher(y,c,b),d?d.alias.push(m):(g=g||m,g!==m&&g.alias.push(m),_&&f.name&&!isAliasRecord(m)&&s(f.name)),"children"in v){const x=v.children;for(let w=0;w<x.length;w++)i(x[w],m,d&&d.children[w])}d=d||m,l(m)}return g?()=>{s(g)}:noop}function s(f){if(isRouteName(f)){const c=t.get(f);c&&(t.delete(f),r.splice(r.indexOf(c),1),c.children.forEach(s),c.alias.forEach(s))}else{const c=r.indexOf(f);c>-1&&(r.splice(c,1),f.record.name&&t.delete(f.record.name),f.children.forEach(s),f.alias.forEach(s))}}function a(){return r}function l(f){let c=0;for(;c<r.length&&comparePathParserScore(f,r[c])>=0;)c++;r.splice(c,0,f),f.record.name&&!isAliasRecord(f)&&t.set(f.record.name,f)}function u(f,c){let d,_={},v,b;if("name"in f&&f.name){if(d=t.get(f.name),!d)throw createRouterError(1,{location:f});b=d.record.name,_=assign(paramsFromLocation(c.params,d.keys.filter(g=>!g.optional).map(g=>g.name)),f.params),v=d.stringify(_)}else if("path"in f)v=f.path,d=r.find(g=>g.re.test(v)),d&&(_=d.parse(v),b=d.record.name);else{if(d=c.name?t.get(c.name):r.find(g=>g.re.test(c.path)),!d)throw createRouterError(1,{location:f,currentLocation:c});b=d.record.name,_=assign({},c.params,f.params),v=d.stringify(_)}const C=[];let m=d;for(;m;)C.unshift(m.record),m=m.parent;return{name:b,path:v,params:_,matched:C,meta:mergeMetaFields(C)}}return e.forEach(f=>i(f)),{addRoute:i,resolve:u,removeRoute:s,getRoutes:a,getRecordMatcher:o}}function paramsFromLocation(e,n){const r={};for(const t of n)t in e&&(r[t]=e[t]);return r}function normalizeRouteRecord(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:normalizeRecordProps(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||{}:{default:e.component}}}function normalizeRecordProps(e){const n={},r=e.props||!1;if("component"in e)n.default=r;else for(const t in e.components)n[t]=typeof r=="boolean"?r:r[t];return n}function isAliasRecord(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function mergeMetaFields(e){return e.reduce((n,r)=>assign(n,r.meta),{})}function mergeOptions(e,n){const r={};for(const t in e)r[t]=t in n?n[t]:e[t];return r}const HASH_RE=/#/g,AMPERSAND_RE=/&/g,SLASH_RE=/\//g,EQUAL_RE=/=/g,IM_RE=/\?/g,PLUS_RE=/\+/g,ENC_BRACKET_OPEN_RE=/%5B/g,ENC_BRACKET_CLOSE_RE=/%5D/g,ENC_CARET_RE=/%5E/g,ENC_BACKTICK_RE=/%60/g,ENC_CURLY_OPEN_RE=/%7B/g,ENC_PIPE_RE=/%7C/g,ENC_CURLY_CLOSE_RE=/%7D/g,ENC_SPACE_RE=/%20/g;function commonEncode(e){return encodeURI(""+e).replace(ENC_PIPE_RE,"|").replace(ENC_BRACKET_OPEN_RE,"[").replace(ENC_BRACKET_CLOSE_RE,"]")}function encodeHash(e){return commonEncode(e).replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryValue(e){return commonEncode(e).replace(PLUS_RE,"%2B").replace(ENC_SPACE_RE,"+").replace(HASH_RE,"%23").replace(AMPERSAND_RE,"%26").replace(ENC_BACKTICK_RE,"`").replace(ENC_CURLY_OPEN_RE,"{").replace(ENC_CURLY_CLOSE_RE,"}").replace(ENC_CARET_RE,"^")}function encodeQueryKey(e){return encodeQueryValue(e).replace(EQUAL_RE,"%3D")}function encodePath(e){return commonEncode(e).replace(HASH_RE,"%23").replace(IM_RE,"%3F")}function encodeParam(e){return e==null?"":encodePath(e).replace(SLASH_RE,"%2F")}function decode(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function parseQuery(e){const n={};if(e===""||e==="?")return n;const t=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<t.length;++o){const i=t[o].replace(PLUS_RE," "),s=i.indexOf("="),a=decode(s<0?i:i.slice(0,s)),l=s<0?null:decode(i.slice(s+1));if(a in n){let u=n[a];Array.isArray(u)||(u=n[a]=[u]),u.push(l)}else n[a]=l}return n}function stringifyQuery(e){let n="";for(let r in e){const t=e[r];if(r=encodeQueryKey(r),t==null){t!==void 0&&(n+=(n.length?"&":"")+r);continue}(Array.isArray(t)?t.map(i=>i&&encodeQueryValue(i)):[t&&encodeQueryValue(t)]).forEach(i=>{i!==void 0&&(n+=(n.length?"&":"")+r,i!=null&&(n+="="+i))})}return n}function normalizeQuery(e){const n={};for(const r in e){const t=e[r];t!==void 0&&(n[r]=Array.isArray(t)?t.map(o=>o==null?null:""+o):t==null?t:""+t)}return n}function useCallbacks(){let e=[];function n(t){return e.push(t),()=>{const o=e.indexOf(t);o>-1&&e.splice(o,1)}}function r(){e=[]}return{add:n,list:()=>e,reset:r}}function guardToPromiseFn(e,n,r,t,o){const i=t&&(t.enterCallbacks[o]=t.enterCallbacks[o]||[]);return()=>new Promise((s,a)=>{const l=c=>{c===!1?a(createRouterError(4,{from:r,to:n})):c instanceof Error?a(c):isRouteLocation(c)?a(createRouterError(2,{from:n,to:c})):(i&&t.enterCallbacks[o]===i&&typeof c=="function"&&i.push(c),s())},u=e.call(t&&t.instances[o],n,r,l);let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch(c=>a(c))})}function extractComponentsGuards(e,n,r,t){const o=[];for(const i of e)for(const s in i.components){let a=i.components[s];if(!(n!=="beforeRouteEnter"&&!i.instances[s]))if(isRouteComponent(a)){const u=(a.__vccOpts||a)[n];u&&o.push(guardToPromiseFn(u,r,t,i,s))}else{let l=a();o.push(()=>l.then(u=>{if(!u)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${i.path}"`));const f=isESModule(u)?u.default:u;i.components[s]=f;const d=(f.__vccOpts||f)[n];return d&&guardToPromiseFn(d,r,t,i,s)()}))}}return o}function isRouteComponent(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function useLink(e){const n=inject(routerKey),r=inject(routeLocationKey),t=computed(()=>n.resolve(unref(e.to))),o=computed(()=>{const{matched:l}=t.value,{length:u}=l,f=l[u-1],c=r.matched;if(!f||!c.length)return-1;const d=c.findIndex(isSameRouteRecord.bind(null,f));if(d>-1)return d;const _=getOriginalPath(l[u-2]);return u>1&&getOriginalPath(f)===_&&c[c.length-1].path!==_?c.findIndex(isSameRouteRecord.bind(null,l[u-2])):d}),i=computed(()=>o.value>-1&&includesParams(r.params,t.value.params)),s=computed(()=>o.value>-1&&o.value===r.matched.length-1&&isSameRouteLocationParams(r.params,t.value.params));function a(l={}){return guardEvent(l)?n[unref(e.replace)?"replace":"push"](unref(e.to)).catch(noop):Promise.resolve()}return{route:t,href:computed(()=>t.value.href),isActive:i,isExactActive:s,navigate:a}}const RouterLinkImpl=defineComponent({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink,setup(e,{slots:n}){const r=reactive(useLink(e)),{options:t}=inject(routerKey),o=computed(()=>({[getLinkClass(e.activeClass,t.linkActiveClass,"router-link-active")]:r.isActive,[getLinkClass(e.exactActiveClass,t.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive}));return()=>{const i=n.default&&n.default(r);return e.custom?i:h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:o.value},i)}}}),RouterLink=RouterLinkImpl;function guardEvent(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const n=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(n))return}return e.preventDefault&&e.preventDefault(),!0}}function includesParams(e,n){for(const r in n){const t=n[r],o=e[r];if(typeof t=="string"){if(t!==o)return!1}else if(!Array.isArray(o)||o.length!==t.length||t.some((i,s)=>i!==o[s]))return!1}return!0}function getOriginalPath(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const getLinkClass=(e,n,r)=>e!=null?e:n!=null?n:r,RouterViewImpl=defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},setup(e,{attrs:n,slots:r}){const t=inject(routerViewLocationKey),o=computed(()=>e.route||t.value),i=inject(viewDepthKey,0),s=computed(()=>o.value.matched[i]);provide(viewDepthKey,i+1),provide(matchedRouteKey,s),provide(routerViewLocationKey,o);const a=ref();return watch(()=>[a.value,s.value,e.name],([l,u,f],[c,d,_])=>{u&&(u.instances[f]=l,d&&d!==u&&l&&l===c&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),l&&u&&(!d||!isSameRouteRecord(u,d)||!c)&&(u.enterCallbacks[f]||[]).forEach(v=>v(l))},{flush:"post"}),()=>{const l=o.value,u=s.value,f=u&&u.components[e.name],c=e.name;if(!f)return normalizeSlot(r.default,{Component:f,route:l});const d=u.props[e.name],_=d?d===!0?l.params:typeof d=="function"?d(l):d:null,b=h(f,assign({},_,n,{onVnodeUnmounted:C=>{C.component.isUnmounted&&(u.instances[c]=null)},ref:a}));return normalizeSlot(r.default,{Component:b,route:l})||b}}});function normalizeSlot(e,n){if(!e)return null;const r=e(n);return r.length===1?r[0]:r}const RouterView=RouterViewImpl;function createRouter(e){const n=createRouterMatcher(e.routes,e),r=e.parseQuery||parseQuery,t=e.stringifyQuery||stringifyQuery,o=e.history,i=useCallbacks(),s=useCallbacks(),a=useCallbacks(),l=shallowRef(START_LOCATION_NORMALIZED);let u=START_LOCATION_NORMALIZED;isBrowser&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const f=applyToParams.bind(null,I=>""+I),c=applyToParams.bind(null,encodeParam),d=applyToParams.bind(null,decode);function _(I,K){let H,Q;return isRouteName(I)?(H=n.getRecordMatcher(I),Q=K):Q=I,n.addRoute(Q,H)}function v(I){const K=n.getRecordMatcher(I);K&&n.removeRoute(K)}function b(){return n.getRoutes().map(I=>I.record)}function C(I){return!!n.getRecordMatcher(I)}function m(I,K){if(K=assign({},K||l.value),typeof I=="string"){const se=parseURL(r,I,K.path),T=n.resolve({path:se.path},K),R=o.createHref(se.fullPath);return assign(se,T,{params:d(T.params),hash:decode(se.hash),redirectedFrom:void 0,href:R})}let H;if("path"in I)H=assign({},I,{path:parseURL(r,I.path,K.path).path});else{const se=assign({},I.params);for(const T in se)se[T]==null&&delete se[T];H=assign({},I,{params:c(I.params)}),K.params=c(K.params)}const Q=n.resolve(H,K),le=I.hash||"";Q.params=f(d(Q.params));const ue=stringifyURL(t,assign({},I,{hash:encodeHash(le),path:Q.path})),ae=o.createHref(ue);return assign({fullPath:ue,hash:le,query:t===stringifyQuery?normalizeQuery(I.query):I.query||{}},Q,{redirectedFrom:void 0,href:ae})}function g(I){return typeof I=="string"?parseURL(r,I,l.value.path):assign({},I)}function y(I,K){if(u!==I)return createRouterError(8,{from:K,to:I})}function k(I){return A(I)}function x(I){return k(assign(g(I),{replace:!0}))}function w(I){const K=I.matched[I.matched.length-1];if(K&&K.redirect){const{redirect:H}=K;let Q=typeof H=="function"?H(I):H;return typeof Q=="string"&&(Q=Q.includes("?")||Q.includes("#")?Q=g(Q):{path:Q},Q.params={}),assign({query:I.query,hash:I.hash,params:I.params},Q)}}function A(I,K){const H=u=m(I),Q=l.value,le=I.state,ue=I.force,ae=I.replace===!0,se=w(H);if(se)return A(assign(g(se),{state:le,force:ue,replace:ae}),K||H);const T=H;T.redirectedFrom=K;let R;return!ue&&isSameRouteLocation(t,Q,H)&&(R=createRouterError(16,{to:T,from:Q}),N(Q,Q,!0,!1)),(R?Promise.resolve(R):S(T,Q)).catch(D=>isNavigationFailure(D)?D:q(D,T,Q)).then(D=>{if(D){if(isNavigationFailure(D,2))return A(assign(g(D.to),{state:le,force:ue,replace:ae}),K||T)}else D=P(T,Q,!0,ae,le);return O(T,Q,D),D})}function E(I,K){const H=y(I,K);return H?Promise.reject(H):Promise.resolve()}function S(I,K){let H;const[Q,le,ue]=extractChangingRecords(I,K);H=extractComponentsGuards(Q.reverse(),"beforeRouteLeave",I,K);for(const se of Q)se.leaveGuards.forEach(T=>{H.push(guardToPromiseFn(T,I,K))});const ae=E.bind(null,I,K);return H.push(ae),runGuardQueue(H).then(()=>{H=[];for(const se of i.list())H.push(guardToPromiseFn(se,I,K));return H.push(ae),runGuardQueue(H)}).then(()=>{H=extractComponentsGuards(le,"beforeRouteUpdate",I,K);for(const se of le)se.updateGuards.forEach(T=>{H.push(guardToPromiseFn(T,I,K))});return H.push(ae),runGuardQueue(H)}).then(()=>{H=[];for(const se of I.matched)if(se.beforeEnter&&!K.matched.includes(se))if(Array.isArray(se.beforeEnter))for(const T of se.beforeEnter)H.push(guardToPromiseFn(T,I,K));else H.push(guardToPromiseFn(se.beforeEnter,I,K));return H.push(ae),runGuardQueue(H)}).then(()=>(I.matched.forEach(se=>se.enterCallbacks={}),H=extractComponentsGuards(ue,"beforeRouteEnter",I,K),H.push(ae),runGuardQueue(H))).then(()=>{H=[];for(const se of s.list())H.push(guardToPromiseFn(se,I,K));return H.push(ae),runGuardQueue(H)}).catch(se=>isNavigationFailure(se,8)?se:Promise.reject(se))}function O(I,K,H){for(const Q of a.list())Q(I,K,H)}function P(I,K,H,Q,le){const ue=y(I,K);if(ue)return ue;const ae=K===START_LOCATION_NORMALIZED,se=isBrowser?history.state:{};H&&(Q||ae?o.replace(I.fullPath,assign({scroll:ae&&se&&se.scroll},le)):o.push(I.fullPath,le)),l.value=I,N(I,K,H,ae),fe()}let L;function M(){L=o.listen((I,K,H)=>{const Q=m(I),le=w(Q);if(le){A(assign(le,{replace:!0}),Q).catch(noop);return}u=Q;const ue=l.value;isBrowser&&saveScrollPosition(getScrollKey(ue.fullPath,H.delta),computeScrollPosition()),S(Q,ue).catch(ae=>isNavigationFailure(ae,4|8)?ae:isNavigationFailure(ae,2)?(A(ae.to,Q).then(se=>{isNavigationFailure(se,4|16)&&!H.delta&&H.type===NavigationType.pop&&o.go(-1,!1)}).catch(noop),Promise.reject()):(H.delta&&o.go(-H.delta,!1),q(ae,Q,ue))).then(ae=>{ae=ae||P(Q,ue,!1),ae&&(H.delta?o.go(-H.delta,!1):H.type===NavigationType.pop&&isNavigationFailure(ae,4|16)&&o.go(-1,!1)),O(Q,ue,ae)}).catch(noop)})}let G=useCallbacks(),X=useCallbacks(),j;function q(I,K,H){fe(I);const Q=X.list();return Q.length?Q.forEach(le=>le(I,K,H)):console.error(I),Promise.reject(I)}function ee(){return j&&l.value!==START_LOCATION_NORMALIZED?Promise.resolve():new Promise((I,K)=>{G.add([I,K])})}function fe(I){j||(j=!0,M(),G.list().forEach(([K,H])=>I?H(I):K()),G.reset())}function N(I,K,H,Q){const{scrollBehavior:le}=e;if(!isBrowser||!le)return Promise.resolve();const ue=!H&&getSavedScrollPosition(getScrollKey(I.fullPath,0))||(Q||!H)&&history.state&&history.state.scroll||null;return nextTick().then(()=>le(I,K,ue)).then(ae=>ae&&scrollToPosition(ae)).catch(ae=>q(ae,I,K))}const V=I=>o.go(I);let $;const ne=new Set;return{currentRoute:l,addRoute:_,removeRoute:v,hasRoute:C,getRoutes:b,resolve:m,options:e,push:k,replace:x,go:V,back:()=>V(-1),forward:()=>V(1),beforeEach:i.add,beforeResolve:s.add,afterEach:a.add,onError:X.add,isReady:ee,install(I){const K=this;I.component("RouterLink",RouterLink),I.component("RouterView",RouterView),I.config.globalProperties.$router=K,Object.defineProperty(I.config.globalProperties,"$route",{enumerable:!0,get:()=>unref(l)}),isBrowser&&!$&&l.value===START_LOCATION_NORMALIZED&&($=!0,k(o.location).catch(le=>{}));const H={};for(const le in START_LOCATION_NORMALIZED)H[le]=computed(()=>l.value[le]);I.provide(routerKey,K),I.provide(routeLocationKey,reactive(H)),I.provide(routerViewLocationKey,l);const Q=I.unmount;ne.add(I),I.unmount=function(){ne.delete(I),ne.size<1&&(u=START_LOCATION_NORMALIZED,L&&L(),l.value=START_LOCATION_NORMALIZED,$=!1,j=!1),Q()}}}}function runGuardQueue(e){return e.reduce((n,r)=>n.then(()=>r()),Promise.resolve())}function extractChangingRecords(e,n){const r=[],t=[],o=[],i=Math.max(n.matched.length,e.matched.length);for(let s=0;s<i;s++){const a=n.matched[s];a&&(e.matched.find(u=>isSameRouteRecord(u,a))?t.push(a):r.push(a));const l=e.matched[s];l&&(n.matched.find(u=>isSameRouteRecord(u,l))||o.push(l))}return[r,t,o]}function useRouter(){return inject(routerKey)}function useRoute(){return inject(routeLocationKey)}var commonjsGlobal=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var mavonEditor$1={exports:{}};(function(module,exports){(function(e,n){module.exports=n()})(commonjsGlobal,function(){return function(e){function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=e,n.c=r,n.i=function(t){return t},n.d=function(t,o,i){n.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(o,"a",o),o},n.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},n.p="",n(n.s=69)}([function(e,n,r){function t(j){return Object.prototype.toString.call(j)}function o(j){return t(j)==="[object String]"}function i(j,q){return x.call(j,q)}function s(j){return Array.prototype.slice.call(arguments,1).forEach(function(q){if(q){if(typeof q!="object")throw new TypeError(q+"must be object");Object.keys(q).forEach(function(ee){j[ee]=q[ee]})}}),j}function a(j,q,ee){return[].concat(j.slice(0,q),ee,j.slice(q+1))}function l(j){return!(j>=55296&&j<=57343)&&!(j>=64976&&j<=65007)&&(65535&j)!=65535&&(65535&j)!=65534&&!(j>=0&&j<=8)&&j!==11&&!(j>=14&&j<=31)&&!(j>=127&&j<=159)&&!(j>1114111)}function u(j){if(j>65535){j-=65536;var q=55296+(j>>10),ee=56320+(1023&j);return String.fromCharCode(q,ee)}return String.fromCharCode(j)}function f(j,q){var ee=0;return i(O,q)?O[q]:q.charCodeAt(0)===35&&S.test(q)&&(ee=q[1].toLowerCase()==="x"?parseInt(q.slice(2),16):parseInt(q.slice(1),10),l(ee))?u(ee):j}function c(j){return j.indexOf("\\")<0?j:j.replace(w,"$1")}function d(j){return j.indexOf("\\")<0&&j.indexOf("&")<0?j:j.replace(E,function(q,ee,fe){return ee||f(q,fe)})}function _(j){return M[j]}function v(j){return P.test(j)?j.replace(L,_):j}function b(j){return j.replace(G,"\\$&")}function C(j){switch(j){case 9:case 32:return!0}return!1}function m(j){if(j>=8192&&j<=8202)return!0;switch(j){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function g(j){return X.test(j)}function y(j){switch(j){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function k(j){return j=j.trim().replace(/\s+/g," "),"\u1E9E".toLowerCase()==="\u1E7E"&&(j=j.replace(/ẞ/g,"\xDF")),j.toLowerCase().toUpperCase()}var x=Object.prototype.hasOwnProperty,w=/\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,A=/&([a-z#][a-z0-9]{1,31});/gi,E=new RegExp(w.source+"|"+A.source,"gi"),S=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,O=r(53),P=/[&<>"]/,L=/[&<>"]/g,M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},G=/[.?*+^$[\]\\(){}|-]/g,X=r(34);n.lib={},n.lib.mdurl=r(57),n.lib.ucmicro=r(196),n.assign=s,n.isString=o,n.has=i,n.unescapeMd=c,n.unescapeAll=d,n.isValidEntityCode=l,n.fromCodePoint=u,n.escapeHtml=v,n.arrayReplaceAt=a,n.isSpace=C,n.isWhiteSpace=m,n.isMdAsciiPunct=y,n.isPunctChar=g,n.escapeRE=b,n.normalizeReference=k},function(e,n){var r=e.exports=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();typeof __g=="number"&&(__g=r)},function(e,n){var r={}.hasOwnProperty;e.exports=function(t,o){return r.call(t,o)}},function(e,n,r){e.exports=!r(11)(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},function(e,n,r){var t=r(5),o=r(13);e.exports=r(3)?function(i,s,a){return t.f(i,s,o(1,a))}:function(i,s,a){return i[s]=a,i}},function(e,n,r){var t=r(9),o=r(43),i=r(28),s=Object.defineProperty;n.f=r(3)?Object.defineProperty:function(a,l,u){if(t(a),l=i(l,!0),t(u),o)try{return s(a,l,u)}catch{}if("get"in u||"set"in u)throw TypeError("Accessors not supported!");return"value"in u&&(a[l]=u.value),a}},function(e,n,r){var t=r(88),o=r(19);e.exports=function(i){return t(o(i))}},function(e,n,r){var t=r(26)("wks"),o=r(14),i=r(1).Symbol,s=typeof i=="function";(e.exports=function(a){return t[a]||(t[a]=s&&i[a]||(s?i:o)("Symbol."+a))}).store=t},function(e,n){e.exports=function(r){return typeof r=="object"?r!==null:typeof r=="function"}},function(e,n,r){var t=r(8);e.exports=function(o){if(!t(o))throw TypeError(o+" is not an object!");return o}},function(e,n){var r=e.exports={version:"2.6.12"};typeof __e=="number"&&(__e=r)},function(e,n){e.exports=function(r){try{return!!r()}catch{return!0}}},function(e,n){e.exports=!0},function(e,n){e.exports=function(r,t){return{enumerable:!(1&r),configurable:!(2&r),writable:!(4&r),value:t}}},function(e,n){var r=0,t=Math.random();e.exports=function(o){return"Symbol(".concat(o===void 0?"":o,")_",(++r+t).toString(36))}},function(e,n){function r(o,i){var s=o[1]||"",a=o[3];if(!a)return s;if(i&&typeof btoa=="function"){var l=t(a);return[s].concat(a.sources.map(function(u){return"/*# sourceURL="+a.sourceRoot+u+" */"})).concat([l]).join(`
`)}return[s].join(`
`)}function t(o){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"}e.exports=function(o){var i=[];return i.toString=function(){return this.map(function(s){var a=r(s,o);return s[2]?"@media "+s[2]+"{"+a+"}":a}).join("")},i.i=function(s,a){typeof s=="string"&&(s=[[null,s,""]]);for(var l={},u=0;u<this.length;u++){var f=this[u][0];typeof f=="number"&&(l[f]=!0)}for(u=0;u<s.length;u++){var c=s[u];typeof c[0]=="number"&&l[c[0]]||(a&&!c[2]?c[2]=a:a&&(c[2]="("+c[2]+") and ("+a+")"),i.push(c))}},i}},function(e,n){e.exports=function(r,t,o,i,s){var a,l=r=r||{},u=typeof r.default;u!=="object"&&u!=="function"||(a=r,l=r.default);var f=typeof l=="function"?l.options:l;t&&(f.render=t.render,f.staticRenderFns=t.staticRenderFns),i&&(f._scopeId=i);var c;if(s?(c=function(v){v=v||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,v||typeof __VUE_SSR_CONTEXT__=="undefined"||(v=__VUE_SSR_CONTEXT__),o&&o.call(this,v),v&&v._registeredComponents&&v._registeredComponents.add(s)},f._ssrRegister=c):o&&(c=o),c){var d=f.functional,_=d?f.render:f.beforeCreate;d?f.render=function(v,b){return c.call(b),_(v,b)}:f.beforeCreate=_?[].concat(_,c):[c]}return{esModule:a,exports:l,options:f}}},function(e,n,r){function t(k){for(var x=0;x<k.length;x++){var w=k[x],A=f[w.id];if(A){A.refs++;for(var E=0;E<A.parts.length;E++)A.parts[E](w.parts[E]);for(;E<w.parts.length;E++)A.parts.push(i(w.parts[E]));A.parts.length>w.parts.length&&(A.parts.length=w.parts.length)}else{for(var S=[],E=0;E<w.parts.length;E++)S.push(i(w.parts[E]));f[w.id]={id:w.id,refs:1,parts:S}}}}function o(){var k=document.createElement("style");return k.type="text/css",c.appendChild(k),k}function i(k){var x,w,A=document.querySelector("style["+m+'~="'+k.id+'"]');if(A){if(v)return b;A.parentNode.removeChild(A)}if(g){var E=_++;A=d||(d=o()),x=s.bind(null,A,E,!1),w=s.bind(null,A,E,!0)}else A=o(),x=a.bind(null,A),w=function(){A.parentNode.removeChild(A)};return x(k),function(S){if(S){if(S.css===k.css&&S.media===k.media&&S.sourceMap===k.sourceMap)return;x(k=S)}else w()}}function s(k,x,w,A){var E=w?"":A.css;if(k.styleSheet)k.styleSheet.cssText=y(x,E);else{var S=document.createTextNode(E),O=k.childNodes;O[x]&&k.removeChild(O[x]),O.length?k.insertBefore(S,O[x]):k.appendChild(S)}}function a(k,x){var w=x.css,A=x.media,E=x.sourceMap;if(A&&k.setAttribute("media",A),C.ssrId&&k.setAttribute(m,x.id),E&&(w+=`
/*# sourceURL=`+E.sources[0]+" */",w+=`
/*# sourceMappingURL=data:application/json;base64,`+btoa(unescape(encodeURIComponent(JSON.stringify(E))))+" */"),k.styleSheet)k.styleSheet.cssText=w;else{for(;k.firstChild;)k.removeChild(k.firstChild);k.appendChild(document.createTextNode(w))}}var l=typeof document!="undefined";if(typeof DEBUG!="undefined"&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=r(206),f={},c=l&&(document.head||document.getElementsByTagName("head")[0]),d=null,_=0,v=!1,b=function(){},C=null,m="data-vue-ssr-id",g=typeof navigator!="undefined"&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(k,x,w,A){v=w,C=A||{};var E=u(k,x);return t(E),function(S){for(var O=[],P=0;P<E.length;P++){var L=E[P],M=f[L.id];M.refs--,O.push(M)}S?(E=u(k,S),t(E)):E=[];for(var P=0;P<O.length;P++){var M=O[P];if(M.refs===0){for(var G=0;G<M.parts.length;G++)M.parts[G]();delete f[M.id]}}}};var y=function(){var k=[];return function(x,w){return k[x]=w,k.filter(Boolean).join(`
`)}}()},function(e,n,r){function t(m,g,y,k,x){return m!=="*"||g!=="*"||y.substring(k-2,k-1)!=="*"||y.substring(x+1,x+2)!=="*"}function o(m,g){typeof g!="function"&&(g=function(){});var y=document.querySelectorAll("script[src='"+m+"']");if(y.length>0)return y[0].addEventListener("load",function(){g()}),void g();var k=document.createElement("script"),x=document.getElementsByTagName("head")[0];k.type="text/javascript",k.charset="UTF-8",k.src=m,k.addEventListener?k.addEventListener("load",function(){g()},!1):k.attachEvent&&k.attachEvent("onreadystatechange",function(){window.event.srcElement.readyState==="loaded"&&g()}),x.appendChild(k)}function i(m,g,y){if(typeof g!="function"&&(g=function(){}),document.querySelectorAll("link[href='"+m+"']").length>0)return void g();if(y){var k=document.querySelectorAll("link#"+y);if(k.length)return void(k[0].href=m)}var x=document.createElement("link"),w=document.getElementsByTagName("head")[0];x.rel="stylesheet",x.href=m,y&&(x.id=y),x.addEventListener?x.addEventListener("load",function(){g()},!1):x.attachEvent&&x.attachEvent("onreadystatechange",function(){window.event.srcElement.readyState==="loaded"&&g()}),w.appendChild(x)}r.d(n,"g",function(){return s}),r.d(n,"i",function(){return a}),r.d(n,"j",function(){return l}),r.d(n,"k",function(){return u}),r.d(n,"h",function(){return f}),r.d(n,"l",function(){return c}),r.d(n,"m",function(){return d}),r.d(n,"e",function(){return _}),r.d(n,"f",function(){return v}),r.d(n,"b",function(){return b}),n.d=o,n.c=i,r.d(n,"a",function(){return C});var s=function(m,g,y){var k=g.prefix,x=g.subfix,w=g.str;if(g.type,m.focus(),typeof m.selectionStart=="number"&&typeof m.selectionEnd=="number"){var A=m.selectionStart,E=m.selectionEnd,S=m.value;A===E?(m.value=S.substring(0,A)+k+w+x+S.substring(E,S.length),m.selectionStart=A+k.length,m.selectionEnd=A+(w.length+k.length)):S.substring(A-k.length,A)===k&&S.substring(E,E+x.length)===x&&t(k,x,S,A,E)?(m.value=S.substring(0,A-k.length)+S.substring(A,E)+S.substring(E+x.length,S.length),m.selectionStart=A-k.length,m.selectionEnd=E-k.length):(m.value=S.substring(0,A)+k+S.substring(A,E)+x+S.substring(E,S.length),m.selectionStart=A+k.length,m.selectionEnd=A+(E-A+k.length))}else alert("Error: Browser version is too low");y.d_value=m.value,m.focus()},a=function(m){var g=m.getTextareaDom();if(typeof g.selectionStart=="number"&&typeof g.selectionEnd=="number"){var y=g.selectionStart,k=g.selectionEnd,x=g.value;if(y===k)g.value=x.substring(0,y)+"1. "+x.substring(k,x.length),g.selectionEnd=g.selectionStart=y+3;else{for(var w=y;w>0&&x.substring(w-1,w)!==`
`;)w--;for(var A=x.substring(w,k),E=A.split(`
`),S=0;S<E.length;S++)E[S]=S+1+". "+E[S];var O=E.join(`
`);g.value=x.substring(0,w)+O+x.substring(k,x.length),g.selectionStart=w,g.selectionEnd=k+O.length-A.length}}else alert("Error: Browser version is too low");m.d_value=g.value,g.focus()},l=function(m){var g=m.getTextareaDom();if(typeof g.selectionStart=="number"&&typeof g.selectionEnd=="number"){for(var y=g.selectionStart,k=g.selectionEnd,x=g.value,w=y;w>0&&x.substring(w-1,w)!==`
`;)w--;for(var A=k;A<x.length&&x.substring(A,A+1)!==`
`;)A++;A<x.length&&A++,g.value=x.substring(0,w)+x.substring(A,x.length),g.selectionEnd=g.selectionStart=w===0?0:w-1}else alert("Error: Browser version is too low");m.d_value=g.value,g.focus()},u=function(m){var g=m.getTextareaDom();if(typeof g.selectionStart=="number"&&typeof g.selectionEnd=="number"){var y=g.selectionStart,k=g.selectionEnd,x=g.value;if(y===k)g.value=x.substring(0,y)+"- "+x.substring(k,x.length),g.selectionEnd=g.selectionStart=y+2;else{for(var w=y;w>0&&x.substring(w-1,w)!==`
`;)w--;var A=x.substring(w,k),E=A.replace(/\n/g,`
- `);E="- "+E,g.value=x.substring(0,w)+E+x.substring(k,x.length),g.selectionStart=w,g.selectionEnd=k+E.length-A.length}}else alert("Error: Browser version is too low");m.d_value=g.value,g.focus()},f=function(m,g){g=g?new Array(g).fill(" ").join(""):"	";var y=m.getTextareaDom();if(typeof y.selectionStart=="number"&&typeof y.selectionEnd=="number"){var k=y.selectionStart,x=y.selectionEnd,w=y.value,A=w.substring(0,k).split(`
`).pop();if(A.match(/^\s*[0-9]+\.\s+\S*/)){var E=A.replace(/(\d+)/,1);y.value=w.substring(0,k-E.length)+g+E+w.substring(x,w.length)}else A.match(/^\s*-\s+\S*/)?y.value=w.substring(0,k-A.length)+g+A+w.substring(x,w.length):y.value=w.substring(0,k)+g+w.substring(x,w.length);y.selectionStart=y.selectionEnd=k+g.length}else alert("Error: Browser version is too low");m.d_value=y.value,y.focus()},c=function(m,g){var y=new RegExp(g?"\\s{"+g+"}":"	");console.log("regTab:",y);var k=m.getTextareaDom();if(typeof k.selectionStart=="number"&&typeof k.selectionEnd=="number"){var x=k.selectionStart,w=k.selectionEnd,A=k.value,E=A.substring(0,x).split(`
`).pop();E.search(y)>=0&&(k.value=A.substring(0,x-E.length)+E.replace(y,"")+A.substring(w,A.length),k.selectionStart=k.selectionEnd=x-(g||1))}else alert("Error: Browser version is too low");m.d_value=k.value,k.focus()},d=function(m,g){var y=m.getTextareaDom();if(typeof y.selectionStart=="number"&&typeof y.selectionEnd=="number"){var k=y.selectionStart,x=y.selectionEnd,w=y.value,A=w.substring(0,k).split(`
`).pop(),E=A.match(/^\s*(?:[0-9]+\.|-)\s+\S+/);if(E){g.preventDefault();var S=E.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift();if(S.search(/-/)>=0)y.value=w.substring(0,k)+`
`+S+w.substring(x,w.length),y.selectionStart=y.selectionEnd=k+S.length+1;else{var O=S.replace(/(\d+)/,parseInt(S)+1);y.value=w.substring(0,k)+`
`+O+w.substring(x,w.length),y.selectionStart=y.selectionEnd=k+O.length+1}}else{var P=A.match(/^\s*(?:[0-9]+\.|-)\s+$/);if(P){g.preventDefault();var L=P.shift().length;y.value=w.substring(0,k-L)+`
`+w.substring(x,w.length),y.selectionStart=y.selectionEnd=k-L}}}else alert("Error: Browser version is too low");m.d_value=y.value,y.focus()},_=function(m,g){var y=void 0;y=m.$refs.navigationContent,y.innerHTML=m.d_render;var k=y.children;if(k.length)for(var x=0;x<k.length;x++)(function(w,A,E){/^H[1-6]{1}$/.exec(w.tagName)?w.onclick=function(){var S=m.$refs.vShowContent,O=m.$refs.vNoteEdit;m.s_subfield?m.s_preview_switch&&(O.scrollTop=S.children[A].offsetTop*(O.scrollHeight-O.offsetHeight)/(S.scrollHeight-S.offsetHeight)):m.s_preview_switch&&(S.scrollTop=S.children[A].offsetTop)}:w.style.display="none"})(k[x],x)},v=function(m,g){var y=m.srcElement?m.srcElement:m.target,k=y.scrollTop/(y.scrollHeight-y.offsetHeight);g.edit_scroll_height>=0&&y.scrollHeight!==g.edit_scroll_height&&y.scrollHeight-y.offsetHeight-y.scrollTop<=30&&(g.$refs.vNoteEdit.scrollTop=y.scrollHeight-y.offsetHeight,k=1),g.edit_scroll_height=y.scrollHeight,g.$refs.vShowContent.scrollHeight>g.$refs.vShowContent.offsetHeight&&(g.$refs.vShowContent.scrollTop=(g.$refs.vShowContent.scrollHeight-g.$refs.vShowContent.offsetHeight)*k)},b=function(m){m.$el.addEventListener("fullscreenchange",function(g){m.$toolbar_right_read_change_status()},!1),m.$el.addEventListener("mozfullscreenchange",function(g){m.$toolbar_right_read_change_status()},!1),m.$el.addEventListener("webkitfullscreenchange",function(g){m.$toolbar_right_read_change_status()},!1),m.$el.addEventListener("msfullscreenchange",function(g){m.$toolbar_right_read_change_status()},!1)},C=function(m){m.$refs.vShowContent.addEventListener("click",function(g){g=g||window.event;var y=g.srcElement?g.srcElement:g.target;y.tagName==="IMG"&&(m.imageClick!=null?m.imageClick(y):m.d_preview_imgsrc=y.src)})}},function(e,n){e.exports=function(r){if(r==null)throw TypeError("Can't call method on  "+r);return r}},function(e,n){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,n){e.exports={}},function(e,n,r){var t=r(48),o=r(20);e.exports=Object.keys||function(i){return t(i,o)}},function(e,n){n.f={}.propertyIsEnumerable},function(e,n,r){var t=r(5).f,o=r(2),i=r(7)("toStringTag");e.exports=function(s,a,l){s&&!o(s=l?s:s.prototype,i)&&t(s,i,{configurable:!0,value:a})}},function(e,n,r){var t=r(26)("keys"),o=r(14);e.exports=function(i){return t[i]||(t[i]=o(i))}},function(e,n,r){var t=r(10),o=r(1),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(e.exports=function(s,a){return i[s]||(i[s]=a!==void 0?a:{})})("versions",[]).push({version:t.version,mode:r(12)?"pure":"global",copyright:"\xA9 2020 Denis Pushkarev (zloirock.ru)"})},function(e,n){var r=Math.ceil,t=Math.floor;e.exports=function(o){return isNaN(o=+o)?0:(o>0?t:r)(o)}},function(e,n,r){var t=r(8);e.exports=function(o,i){if(!t(o))return o;var s,a;if(i&&typeof(s=o.toString)=="function"&&!t(a=s.call(o))||typeof(s=o.valueOf)=="function"&&!t(a=s.call(o))||!i&&typeof(s=o.toString)=="function"&&!t(a=s.call(o)))return a;throw TypeError("Can't convert object to primitive value")}},function(e,n,r){var t=r(1),o=r(10),i=r(12),s=r(30),a=r(5).f;e.exports=function(l){var u=o.Symbol||(o.Symbol=i?{}:t.Symbol||{});l.charAt(0)=="_"||l in u||a(u,l,{value:s.f(l)})}},function(e,n,r){n.f=r(7)},function(e,n,r){function t(a,l){return new i(l).process(a)}var o=r(51),i=r(111);n=e.exports=t,n.FilterCSS=i;for(var s in o)n[s]=o[s];typeof window!="undefined"&&(window.filterCSS=e.exports)},function(e,n,r){function t(){this.__rules__=[],this.__cache__=null}t.prototype.__find__=function(o){for(var i=0;i<this.__rules__.length;i++)if(this.__rules__[i].name===o)return i;return-1},t.prototype.__compile__=function(){var o=this,i=[""];o.__rules__.forEach(function(s){s.enabled&&s.alt.forEach(function(a){i.indexOf(a)<0&&i.push(a)})}),o.__cache__={},i.forEach(function(s){o.__cache__[s]=[],o.__rules__.forEach(function(a){a.enabled&&(s&&a.alt.indexOf(s)<0||o.__cache__[s].push(a.fn))})})},t.prototype.at=function(o,i,s){var a=this.__find__(o),l=s||{};if(a===-1)throw new Error("Parser rule not found: "+o);this.__rules__[a].fn=i,this.__rules__[a].alt=l.alt||[],this.__cache__=null},t.prototype.before=function(o,i,s,a){var l=this.__find__(o),u=a||{};if(l===-1)throw new Error("Parser rule not found: "+o);this.__rules__.splice(l,0,{name:i,enabled:!0,fn:s,alt:u.alt||[]}),this.__cache__=null},t.prototype.after=function(o,i,s,a){var l=this.__find__(o),u=a||{};if(l===-1)throw new Error("Parser rule not found: "+o);this.__rules__.splice(l+1,0,{name:i,enabled:!0,fn:s,alt:u.alt||[]}),this.__cache__=null},t.prototype.push=function(o,i,s){var a=s||{};this.__rules__.push({name:o,enabled:!0,fn:i,alt:a.alt||[]}),this.__cache__=null},t.prototype.enable=function(o,i){Array.isArray(o)||(o=[o]);var s=[];return o.forEach(function(a){var l=this.__find__(a);if(l<0){if(i)return;throw new Error("Rules manager: invalid rule name "+a)}this.__rules__[l].enabled=!0,s.push(a)},this),this.__cache__=null,s},t.prototype.enableOnly=function(o,i){Array.isArray(o)||(o=[o]),this.__rules__.forEach(function(s){s.enabled=!1}),this.enable(o,i)},t.prototype.disable=function(o,i){Array.isArray(o)||(o=[o]);var s=[];return o.forEach(function(a){var l=this.__find__(a);if(l<0){if(i)return;throw new Error("Rules manager: invalid rule name "+a)}this.__rules__[l].enabled=!1,s.push(a)},this),this.__cache__=null,s},t.prototype.getRules=function(o){return this.__cache__===null&&this.__compile__(),this.__cache__[o]||[]},e.exports=t},function(e,n,r){function t(o,i,s){this.type=o,this.tag=i,this.attrs=null,this.map=null,this.nesting=s,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}t.prototype.attrIndex=function(o){var i,s,a;if(!this.attrs)return-1;for(i=this.attrs,s=0,a=i.length;s<a;s++)if(i[s][0]===o)return s;return-1},t.prototype.attrPush=function(o){this.attrs?this.attrs.push(o):this.attrs=[o]},t.prototype.attrSet=function(o,i){var s=this.attrIndex(o),a=[o,i];s<0?this.attrPush(a):this.attrs[s]=a},t.prototype.attrGet=function(o){var i=this.attrIndex(o),s=null;return i>=0&&(s=this.attrs[i][1]),s},t.prototype.attrJoin=function(o,i){var s=this.attrIndex(o);s<0?this.attrPush([o,i]):this.attrs[s][1]=this.attrs[s][1]+" "+i},e.exports=t},function(e,n){e.exports=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/},function(e,n){e.exports={indexOf:function(r,t){var o,i;if(Array.prototype.indexOf)return r.indexOf(t);for(o=0,i=r.length;o<i;o++)if(r[o]===t)return o;return-1},forEach:function(r,t,o){var i,s;if(Array.prototype.forEach)return r.forEach(t,o);for(i=0,s=r.length;i<s;i++)t.call(o,r[i],i,r)},trim:function(r){return String.prototype.trim?r.trim():r.replace(/(^\s*)|(\s*$)/g,"")},spaceIndex:function(r){var t=/\s|\n|\t/,o=t.exec(r);return o?o.index:-1}}},function(e,n,r){function t(i){r(203)}var o=r(16)(r(66),r(200),t,"data-v-548e2160",null);o.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\src\\components\\md-toolbar-left.vue",o.esModule&&Object.keys(o.esModule).some(function(i){return i!=="default"&&i.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] md-toolbar-left.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,n,r){var t=r(16)(r(67),r(198),null,null,null);t.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\src\\components\\md-toolbar-right.vue",t.esModule&&Object.keys(t.esModule).some(function(o){return o!=="default"&&o.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),t.options.functional&&console.error("[vue-loader] md-toolbar-right.vue: functional components are not supported with templates, they should use render functions."),e.exports=t.exports},function(e,n,r){n.a={"1c":"1c",abnf:"abnf",accesslog:"accesslog",actionscript:"actionscript",as:"actionscript",ada:"ada",apache:"apache",apacheconf:"apache",applescript:"applescript",osascript:"applescript",arduino:"arduino",armasm:"armasm",arm:"armasm",asciidoc:"asciidoc",adoc:"asciidoc",aspectj:"aspectj",autohotkey:"autohotkey",ahk:"autohotkey",autoit:"autoit",avrasm:"avrasm",awk:"awk",axapta:"axapta",bash:"bash",sh:"bash",zsh:"bash",basic:"basic",bnf:"bnf",brainfuck:"brainfuck",bf:"brainfuck",cal:"cal",capnproto:"capnproto",capnp:"capnproto",ceylon:"ceylon",clean:"clean",icl:"clean",dcl:"clean","clojure-repl":"clojure-repl",clojure:"clojure",clj:"clojure",cmake:"cmake","cmake.in":"cmake",coffeescript:"coffeescript",coffee:"coffeescript",cson:"coffeescript",iced:"coffeescript",coq:"coq",cos:"cos",cls:"cos",cpp:"cpp",c:"cpp",cc:"cpp",h:"cpp","c++":"cpp","h++":"cpp",hpp:"cpp",crmsh:"crmsh",crm:"crmsh",pcmk:"crmsh",crystal:"crystal",cr:"crystal",cs:"cs",csharp:"cs",csp:"csp",css:"css",d:"d",dart:"dart",delphi:"delphi",dpr:"delphi",dfm:"delphi",pas:"delphi",pascal:"delphi",freepascal:"delphi",lazarus:"delphi",lpr:"delphi",lfm:"delphi",diff:"diff",patch:"diff",django:"django",jinja:"django",dns:"dns",bind:"dns",zone:"dns",dockerfile:"dockerfile",docker:"dockerfile",dos:"dos",bat:"dos",cmd:"dos",dsconfig:"dsconfig",dts:"dts",dust:"dust",dst:"dust",ebnf:"ebnf",elixir:"elixir",elm:"elm",erb:"erb","erlang-repl":"erlang-repl",erlang:"erlang",erl:"erlang",excel:"excel",xlsx:"excel",xls:"excel",fix:"fix",flix:"flix",fortran:"fortran",f90:"fortran",f95:"fortran",fsharp:"fsharp",fs:"fsharp",gams:"gams",gms:"gams",gauss:"gauss",gss:"gauss",gcode:"gcode",nc:"gcode",gherkin:"gherkin",feature:"gherkin",glsl:"glsl",go:"go",golang:"go",golo:"golo",gradle:"gradle",groovy:"groovy",haml:"haml",handlebars:"handlebars",hbs:"handlebars","html.hbs":"handlebars","html.handlebars":"handlebars",haskell:"haskell",hs:"haskell",haxe:"haxe",hx:"haxe",hsp:"hsp",htmlbars:"htmlbars",http:"http",https:"http",hy:"hy",hylang:"hy",inform7:"inform7",i7:"inform7",ini:"ini",toml:"ini",irpf90:"irpf90",java:"java",jsp:"java",javascript:"javascript",js:"javascript",jsx:"javascript","jboss-cli":"jboss-cli","wildfly-cli":"jboss-cli",json:"json","julia-repl":"julia-repl",julia:"julia",kotlin:"kotlin",lasso:"lasso",ls:"livescript",lassoscript:"lasso",ldif:"ldif",leaf:"leaf",less:"less",lisp:"lisp",livecodeserver:"livecodeserver",livescript:"livescript",llvm:"llvm",lsl:"lsl",lua:"lua",makefile:"makefile",mk:"makefile",mak:"makefile",markdown:"markdown",md:"markdown",mkdown:"markdown",mkd:"markdown",mathematica:"mathematica",mma:"mathematica",matlab:"matlab",maxima:"maxima",mel:"mel",mercury:"mercury",m:"mercury",moo:"mercury",mipsasm:"mipsasm",mips:"mipsasm",mizar:"mizar",mojolicious:"mojolicious",monkey:"monkey",moonscript:"moonscript",moon:"moonscript",n1ql:"n1ql",nginx:"nginx",nginxconf:"nginx",nimrod:"nimrod",nim:"nimrod",nix:"nix",nixos:"nix",nsis:"nsis",objectivec:"objectivec",mm:"objectivec",objc:"objectivec","obj-c":"objectivec",ocaml:"ocaml",ml:"sml",openscad:"openscad",scad:"openscad",oxygene:"oxygene",parser3:"parser3",perl:"perl",pl:"perl",pm:"perl",pf:"pf","pf.conf":"pf",php:"php",php3:"php",php4:"php",php5:"php",php6:"php",pony:"pony",powershell:"powershell",ps:"powershell",processing:"processing",profile:"profile",prolog:"prolog",protobuf:"protobuf",puppet:"puppet",pp:"puppet",purebasic:"purebasic",pb:"purebasic",pbi:"purebasic",python:"python",py:"python",gyp:"python",q:"q",k:"q",kdb:"q",qml:"qml",qt:"qml",r:"r",rib:"rib",roboconf:"roboconf",graph:"roboconf",instances:"roboconf",routeros:"routeros",mikrotik:"routeros",rsl:"rsl",ruby:"ruby",rb:"ruby",gemspec:"ruby",podspec:"ruby",thor:"ruby",irb:"ruby",ruleslanguage:"ruleslanguage",rust:"rust",rs:"rust",scala:"scala",scheme:"scheme",scilab:"scilab",sci:"scilab",scss:"scss",shell:"shell",console:"shell",smali:"smali",smalltalk:"smalltalk",st:"smalltalk",sml:"sml",sqf:"sqf",sql:"sql",stan:"stan",stata:"stata",do:"stata",ado:"stata",step21:"step21",p21:"step21",step:"step21",stp:"step21",stylus:"stylus",styl:"stylus",subunit:"subunit",swift:"swift",taggerscript:"taggerscript",tap:"tap",tcl:"tcl",tk:"tcl",tex:"tex",thrift:"thrift",tp:"tp",twig:"twig",craftcms:"twig",typescript:"typescript",ts:"typescript",vala:"vala",vbnet:"vbnet",vb:"vbnet","vbscript-html":"vbscript-html",vbscript:"vbscript",vbs:"vbscript",verilog:"verilog",v:"verilog",sv:"verilog",svh:"verilog",vhdl:"vhdl",vim:"vim",x86asm:"x86asm",xl:"xl",tao:"xl",xml:"xml",html:"xml",xhtml:"xml",rss:"xml",atom:"xml",xjb:"xml",xsd:"xml",xsl:"xml",plist:"xml",xquery:"xquery",xpath:"xquery",xq:"xquery",yaml:"yaml",yml:"yaml",YAML:"yaml",zephir:"zephir",zep:"zephir"}},function(e,n,r){function t(u){return u&&u.__esModule?u:{default:u}}n.__esModule=!0;var o=r(79),i=t(o),s=r(78),a=t(s),l=typeof a.default=="function"&&typeof i.default=="symbol"?function(u){return typeof u}:function(u){return u&&typeof a.default=="function"&&u.constructor===a.default&&u!==a.default.prototype?"symbol":typeof u};n.default=typeof a.default=="function"&&l(i.default)==="symbol"?function(u){return u===void 0?"undefined":l(u)}:function(u){return u&&typeof a.default=="function"&&u.constructor===a.default&&u!==a.default.prototype?"symbol":u===void 0?"undefined":l(u)}},function(e,n){var r={}.toString;e.exports=function(t){return r.call(t).slice(8,-1)}},function(e,n,r){var t=r(8),o=r(1).document,i=t(o)&&t(o.createElement);e.exports=function(s){return i?o.createElement(s):{}}},function(e,n,r){var t=r(1),o=r(10),i=r(85),s=r(4),a=r(2),l=function(u,f,c){var d,_,v,b=u&l.F,C=u&l.G,m=u&l.S,g=u&l.P,y=u&l.B,k=u&l.W,x=C?o:o[f]||(o[f]={}),w=x.prototype,A=C?t:m?t[f]:(t[f]||{}).prototype;C&&(c=f);for(d in c)(_=!b&&A&&A[d]!==void 0)&&a(x,d)||(v=_?A[d]:c[d],x[d]=C&&typeof A[d]!="function"?c[d]:y&&_?i(v,t):k&&A[d]==v?function(E){var S=function(O,P,L){if(this instanceof E){switch(arguments.length){case 0:return new E;case 1:return new E(O);case 2:return new E(O,P)}return new E(O,P,L)}return E.apply(this,arguments)};return S.prototype=E.prototype,S}(v):g&&typeof v=="function"?i(Function.call,v):v,g&&((x.virtual||(x.virtual={}))[d]=v,u&l.R&&w&&!w[d]&&s(w,d,v)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l},function(e,n,r){e.exports=!r(3)&&!r(11)(function(){return Object.defineProperty(r(41)("div"),"a",{get:function(){return 7}}).a!=7})},function(e,n,r){var t=r(12),o=r(42),i=r(49),s=r(4),a=r(21),l=r(90),u=r(24),f=r(96),c=r(7)("iterator"),d=!([].keys&&"next"in[].keys()),_=function(){return this};e.exports=function(v,b,C,m,g,y,k){l(C,b,m);var x,w,A,E=function(q){if(!d&&q in L)return L[q];switch(q){case"keys":case"values":return function(){return new C(this,q)}}return function(){return new C(this,q)}},S=b+" Iterator",O=g=="values",P=!1,L=v.prototype,M=L[c]||L["@@iterator"]||g&&L[g],G=M||E(g),X=g?O?E("entries"):G:void 0,j=b=="Array"&&L.entries||M;if(j&&(A=f(j.call(new v)))!==Object.prototype&&A.next&&(u(A,S,!0),t||typeof A[c]=="function"||s(A,c,_)),O&&M&&M.name!=="values"&&(P=!0,G=function(){return M.call(this)}),t&&!k||!d&&!P&&L[c]||s(L,c,G),a[b]=G,a[S]=_,g)if(x={values:O?G:E("values"),keys:y?G:E("keys"),entries:X},k)for(w in x)w in L||i(L,w,x[w]);else o(o.P+o.F*(d||P),b,x);return x}},function(e,n,r){var t=r(9),o=r(93),i=r(20),s=r(25)("IE_PROTO"),a=function(){},l=function(){var u,f=r(41)("iframe"),c=i.length;for(f.style.display="none",r(87).appendChild(f),f.src="javascript:",u=f.contentWindow.document,u.open(),u.write("<script>document.F=Object<\/script>"),u.close(),l=u.F;c--;)delete l.prototype[i[c]];return l()};e.exports=Object.create||function(u,f){var c;return u!==null?(a.prototype=t(u),c=new a,a.prototype=null,c[s]=u):c=l(),f===void 0?c:o(c,f)}},function(e,n,r){var t=r(48),o=r(20).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(i){return t(i,o)}},function(e,n){n.f=Object.getOwnPropertySymbols},function(e,n,r){var t=r(2),o=r(6),i=r(84)(!1),s=r(25)("IE_PROTO");e.exports=function(a,l){var u,f=o(a),c=0,d=[];for(u in f)u!=s&&t(f,u)&&d.push(u);for(;l.length>c;)t(f,u=l[c++])&&(~i(d,u)||d.push(u));return d}},function(e,n,r){e.exports=r(4)},function(e,n,r){var t=r(19);e.exports=function(o){return Object(t(o))}},function(e,n){function r(){var a={};return a["align-content"]=!1,a["align-items"]=!1,a["align-self"]=!1,a["alignment-adjust"]=!1,a["alignment-baseline"]=!1,a.all=!1,a["anchor-point"]=!1,a.animation=!1,a["animation-delay"]=!1,a["animation-direction"]=!1,a["animation-duration"]=!1,a["animation-fill-mode"]=!1,a["animation-iteration-count"]=!1,a["animation-name"]=!1,a["animation-play-state"]=!1,a["animation-timing-function"]=!1,a.azimuth=!1,a["backface-visibility"]=!1,a.background=!0,a["background-attachment"]=!0,a["background-clip"]=!0,a["background-color"]=!0,a["background-image"]=!0,a["background-origin"]=!0,a["background-position"]=!0,a["background-repeat"]=!0,a["background-size"]=!0,a["baseline-shift"]=!1,a.binding=!1,a.bleed=!1,a["bookmark-label"]=!1,a["bookmark-level"]=!1,a["bookmark-state"]=!1,a.border=!0,a["border-bottom"]=!0,a["border-bottom-color"]=!0,a["border-bottom-left-radius"]=!0,a["border-bottom-right-radius"]=!0,a["border-bottom-style"]=!0,a["border-bottom-width"]=!0,a["border-collapse"]=!0,a["border-color"]=!0,a["border-image"]=!0,a["border-image-outset"]=!0,a["border-image-repeat"]=!0,a["border-image-slice"]=!0,a["border-image-source"]=!0,a["border-image-width"]=!0,a["border-left"]=!0,a["border-left-color"]=!0,a["border-left-style"]=!0,a["border-left-width"]=!0,a["border-radius"]=!0,a["border-right"]=!0,a["border-right-color"]=!0,a["border-right-style"]=!0,a["border-right-width"]=!0,a["border-spacing"]=!0,a["border-style"]=!0,a["border-top"]=!0,a["border-top-color"]=!0,a["border-top-left-radius"]=!0,a["border-top-right-radius"]=!0,a["border-top-style"]=!0,a["border-top-width"]=!0,a["border-width"]=!0,a.bottom=!1,a["box-decoration-break"]=!0,a["box-shadow"]=!0,a["box-sizing"]=!0,a["box-snap"]=!0,a["box-suppress"]=!0,a["break-after"]=!0,a["break-before"]=!0,a["break-inside"]=!0,a["caption-side"]=!1,a.chains=!1,a.clear=!0,a.clip=!1,a["clip-path"]=!1,a["clip-rule"]=!1,a.color=!0,a["color-interpolation-filters"]=!0,a["column-count"]=!1,a["column-fill"]=!1,a["column-gap"]=!1,a["column-rule"]=!1,a["column-rule-color"]=!1,a["column-rule-style"]=!1,a["column-rule-width"]=!1,a["column-span"]=!1,a["column-width"]=!1,a.columns=!1,a.contain=!1,a.content=!1,a["counter-increment"]=!1,a["counter-reset"]=!1,a["counter-set"]=!1,a.crop=!1,a.cue=!1,a["cue-after"]=!1,a["cue-before"]=!1,a.cursor=!1,a.direction=!1,a.display=!0,a["display-inside"]=!0,a["display-list"]=!0,a["display-outside"]=!0,a["dominant-baseline"]=!1,a.elevation=!1,a["empty-cells"]=!1,a.filter=!1,a.flex=!1,a["flex-basis"]=!1,a["flex-direction"]=!1,a["flex-flow"]=!1,a["flex-grow"]=!1,a["flex-shrink"]=!1,a["flex-wrap"]=!1,a.float=!1,a["float-offset"]=!1,a["flood-color"]=!1,a["flood-opacity"]=!1,a["flow-from"]=!1,a["flow-into"]=!1,a.font=!0,a["font-family"]=!0,a["font-feature-settings"]=!0,a["font-kerning"]=!0,a["font-language-override"]=!0,a["font-size"]=!0,a["font-size-adjust"]=!0,a["font-stretch"]=!0,a["font-style"]=!0,a["font-synthesis"]=!0,a["font-variant"]=!0,a["font-variant-alternates"]=!0,a["font-variant-caps"]=!0,a["font-variant-east-asian"]=!0,a["font-variant-ligatures"]=!0,a["font-variant-numeric"]=!0,a["font-variant-position"]=!0,a["font-weight"]=!0,a.grid=!1,a["grid-area"]=!1,a["grid-auto-columns"]=!1,a["grid-auto-flow"]=!1,a["grid-auto-rows"]=!1,a["grid-column"]=!1,a["grid-column-end"]=!1,a["grid-column-start"]=!1,a["grid-row"]=!1,a["grid-row-end"]=!1,a["grid-row-start"]=!1,a["grid-template"]=!1,a["grid-template-areas"]=!1,a["grid-template-columns"]=!1,a["grid-template-rows"]=!1,a["hanging-punctuation"]=!1,a.height=!0,a.hyphens=!1,a.icon=!1,a["image-orientation"]=!1,a["image-resolution"]=!1,a["ime-mode"]=!1,a["initial-letters"]=!1,a["inline-box-align"]=!1,a["justify-content"]=!1,a["justify-items"]=!1,a["justify-self"]=!1,a.left=!1,a["letter-spacing"]=!0,a["lighting-color"]=!0,a["line-box-contain"]=!1,a["line-break"]=!1,a["line-grid"]=!1,a["line-height"]=!1,a["line-snap"]=!1,a["line-stacking"]=!1,a["line-stacking-ruby"]=!1,a["line-stacking-shift"]=!1,a["line-stacking-strategy"]=!1,a["list-style"]=!0,a["list-style-image"]=!0,a["list-style-position"]=!0,a["list-style-type"]=!0,a.margin=!0,a["margin-bottom"]=!0,a["margin-left"]=!0,a["margin-right"]=!0,a["margin-top"]=!0,a["marker-offset"]=!1,a["marker-side"]=!1,a.marks=!1,a.mask=!1,a["mask-box"]=!1,a["mask-box-outset"]=!1,a["mask-box-repeat"]=!1,a["mask-box-slice"]=!1,a["mask-box-source"]=!1,a["mask-box-width"]=!1,a["mask-clip"]=!1,a["mask-image"]=!1,a["mask-origin"]=!1,a["mask-position"]=!1,a["mask-repeat"]=!1,a["mask-size"]=!1,a["mask-source-type"]=!1,a["mask-type"]=!1,a["max-height"]=!0,a["max-lines"]=!1,a["max-width"]=!0,a["min-height"]=!0,a["min-width"]=!0,a["move-to"]=!1,a["nav-down"]=!1,a["nav-index"]=!1,a["nav-left"]=!1,a["nav-right"]=!1,a["nav-up"]=!1,a["object-fit"]=!1,a["object-position"]=!1,a.opacity=!1,a.order=!1,a.orphans=!1,a.outline=!1,a["outline-color"]=!1,a["outline-offset"]=!1,a["outline-style"]=!1,a["outline-width"]=!1,a.overflow=!1,a["overflow-wrap"]=!1,a["overflow-x"]=!1,a["overflow-y"]=!1,a.padding=!0,a["padding-bottom"]=!0,a["padding-left"]=!0,a["padding-right"]=!0,a["padding-top"]=!0,a.page=!1,a["page-break-after"]=!1,a["page-break-before"]=!1,a["page-break-inside"]=!1,a["page-policy"]=!1,a.pause=!1,a["pause-after"]=!1,a["pause-before"]=!1,a.perspective=!1,a["perspective-origin"]=!1,a.pitch=!1,a["pitch-range"]=!1,a["play-during"]=!1,a.position=!1,a["presentation-level"]=!1,a.quotes=!1,a["region-fragment"]=!1,a.resize=!1,a.rest=!1,a["rest-after"]=!1,a["rest-before"]=!1,a.richness=!1,a.right=!1,a.rotation=!1,a["rotation-point"]=!1,a["ruby-align"]=!1,a["ruby-merge"]=!1,a["ruby-position"]=!1,a["shape-image-threshold"]=!1,a["shape-outside"]=!1,a["shape-margin"]=!1,a.size=!1,a.speak=!1,a["speak-as"]=!1,a["speak-header"]=!1,a["speak-numeral"]=!1,a["speak-punctuation"]=!1,a["speech-rate"]=!1,a.stress=!1,a["string-set"]=!1,a["tab-size"]=!1,a["table-layout"]=!1,a["text-align"]=!0,a["text-align-last"]=!0,a["text-combine-upright"]=!0,a["text-decoration"]=!0,a["text-decoration-color"]=!0,a["text-decoration-line"]=!0,a["text-decoration-skip"]=!0,a["text-decoration-style"]=!0,a["text-emphasis"]=!0,a["text-emphasis-color"]=!0,a["text-emphasis-position"]=!0,a["text-emphasis-style"]=!0,a["text-height"]=!0,a["text-indent"]=!0,a["text-justify"]=!0,a["text-orientation"]=!0,a["text-overflow"]=!0,a["text-shadow"]=!0,a["text-space-collapse"]=!0,a["text-transform"]=!0,a["text-underline-position"]=!0,a["text-wrap"]=!0,a.top=!1,a.transform=!1,a["transform-origin"]=!1,a["transform-style"]=!1,a.transition=!1,a["transition-delay"]=!1,a["transition-duration"]=!1,a["transition-property"]=!1,a["transition-timing-function"]=!1,a["unicode-bidi"]=!1,a["vertical-align"]=!1,a.visibility=!1,a["voice-balance"]=!1,a["voice-duration"]=!1,a["voice-family"]=!1,a["voice-pitch"]=!1,a["voice-range"]=!1,a["voice-rate"]=!1,a["voice-stress"]=!1,a["voice-volume"]=!1,a.volume=!1,a["white-space"]=!1,a.widows=!1,a.width=!0,a["will-change"]=!1,a["word-break"]=!0,a["word-spacing"]=!0,a["word-wrap"]=!0,a["wrap-flow"]=!1,a["wrap-through"]=!1,a["writing-mode"]=!1,a["z-index"]=!1,a}function t(a,l,u){}function o(a,l,u){}function i(a,l){return s.test(l)?"":l}var s=/javascript\s*\:/gim;n.whiteList=r(),n.getDefaultWhiteList=r,n.onAttr=t,n.onIgnoreAttr=o,n.safeAttrValue=i},function(e,n){e.exports={indexOf:function(r,t){var o,i;if(Array.prototype.indexOf)return r.indexOf(t);for(o=0,i=r.length;o<i;o++)if(r[o]===t)return o;return-1},forEach:function(r,t,o){var i,s;if(Array.prototype.forEach)return r.forEach(t,o);for(i=0,s=r.length;i<s;i++)t.call(o,r[i],i,r)},trim:function(r){return String.prototype.trim?r.trim():r.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(r){return String.prototype.trimRight?r.trimRight():r.replace(/(\s*$)/g,"")}}},function(e,n,r){e.exports=r(181)},function(e,n,r){var t=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,o="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",i=new RegExp("^(?:"+t+"|"+o+"|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?].*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),s=new RegExp("^(?:"+t+"|"+o+")");e.exports.HTML_TAG_RE=i,e.exports.HTML_OPEN_CLOSE_TAG_RE=s},function(e,n,r){function t(o,i){var s,a,l,u,f,c,d=i.length;for(s=d-1;s>=0;s--)a=i[s],a.marker!==95&&a.marker!==42||a.end!==-1&&(l=i[a.end],c=s>0&&i[s-1].end===a.end+1&&i[s-1].token===a.token-1&&i[a.end+1].token===l.token+1&&i[s-1].marker===a.marker,f=String.fromCharCode(a.marker),u=o.tokens[a.token],u.type=c?"strong_open":"em_open",u.tag=c?"strong":"em",u.nesting=1,u.markup=c?f+f:f,u.content="",u=o.tokens[l.token],u.type=c?"strong_close":"em_close",u.tag=c?"strong":"em",u.nesting=-1,u.markup=c?f+f:f,u.content="",c&&(o.tokens[i[s-1].token].content="",o.tokens[i[a.end+1].token].content="",s--))}e.exports.tokenize=function(o,i){var s,a,l,u=o.pos,f=o.src.charCodeAt(u);if(i||f!==95&&f!==42)return!1;for(a=o.scanDelims(o.pos,f===42),s=0;s<a.length;s++)l=o.push("text","",0),l.content=String.fromCharCode(f),o.delimiters.push({marker:f,length:a.length,jump:s,token:o.tokens.length-1,end:-1,open:a.can_open,close:a.can_close});return o.pos+=a.length,!0},e.exports.postProcess=function(o){var i,s=o.tokens_meta,a=o.tokens_meta.length;for(t(o,o.delimiters),i=0;i<a;i++)s[i]&&s[i].delimiters&&t(o,s[i].delimiters)}},function(e,n,r){function t(o,i){var s,a,l,u,f,c=[],d=i.length;for(s=0;s<d;s++)l=i[s],l.marker===126&&l.end!==-1&&(u=i[l.end],f=o.tokens[l.token],f.type="s_open",f.tag="s",f.nesting=1,f.markup="~~",f.content="",f=o.tokens[u.token],f.type="s_close",f.tag="s",f.nesting=-1,f.markup="~~",f.content="",o.tokens[u.token-1].type==="text"&&o.tokens[u.token-1].content==="~"&&c.push(u.token-1));for(;c.length;){for(s=c.pop(),a=s+1;a<o.tokens.length&&o.tokens[a].type==="s_close";)a++;a--,s!==a&&(f=o.tokens[a],o.tokens[a]=o.tokens[s],o.tokens[s]=f)}}e.exports.tokenize=function(o,i){var s,a,l,u,f,c=o.pos,d=o.src.charCodeAt(c);if(i||d!==126||(a=o.scanDelims(o.pos,!0),u=a.length,f=String.fromCharCode(d),u<2))return!1;for(u%2&&(l=o.push("text","",0),l.content=f,u--),s=0;s<u;s+=2)l=o.push("text","",0),l.content=f+f,o.delimiters.push({marker:d,length:0,jump:s,token:o.tokens.length-1,end:-1,open:a.can_open,close:a.can_close});return o.pos+=a.length,!0},e.exports.postProcess=function(o){var i,s=o.tokens_meta,a=o.tokens_meta.length;for(t(o,o.delimiters),i=0;i<a;i++)s[i]&&s[i].delimiters&&t(o,s[i].delimiters)}},function(e,n,r){e.exports.encode=r(183),e.exports.decode=r(182),e.exports.format=r(184),e.exports.parse=r(185)},function(e,n){e.exports=/[\0-\x1F\x7F-\x9F]/},function(e,n){e.exports=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/},function(e,n){e.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/},function(e,n,r){function t(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]}}function o(N,V,$){}function i(N,V,$){}function s(N,V,$){}function a(N,V,$){}function l(N){return N.replace(S,"&lt;").replace(O,"&gt;")}function u(N,V,$,ne){if($=b($),V==="href"||V==="src"){if(($=A.trim($))==="#")return"#";if($.substr(0,7)!=="http://"&&$.substr(0,8)!=="https://"&&$.substr(0,7)!=="mailto:"&&$.substr(0,4)!=="tel:"&&$.substr(0,11)!=="data:image/"&&$.substr(0,6)!=="ftp://"&&$.substr(0,2)!=="./"&&$.substr(0,3)!=="../"&&$[0]!=="#"&&$[0]!=="/")return""}else if(V==="background"){if(j.lastIndex=0,j.test($))return""}else if(V==="style"){if(q.lastIndex=0,q.test($)||(ee.lastIndex=0,ee.test($)&&(j.lastIndex=0,j.test($))))return"";ne!==!1&&(ne=ne||E,$=ne.process($))}return $=C($)}function f(N){return N.replace(P,"&quot;")}function c(N){return N.replace(L,'"')}function d(N){return N.replace(M,function(V,$){return $[0]==="x"||$[0]==="X"?String.fromCharCode(parseInt($.substr(1),16)):String.fromCharCode(parseInt($,10))})}function _(N){return N.replace(G,":").replace(X," ")}function v(N){for(var V="",$=0,ne=N.length;$<ne;$++)V+=N.charCodeAt($)<32?" ":N.charAt($);return A.trim(V)}function b(N){return N=c(N),N=d(N),N=_(N),N=v(N)}function C(N){return N=f(N),N=l(N)}function m(){return""}function g(N,V){function $(K){return!!ne||A.indexOf(N,K)!==-1}typeof V!="function"&&(V=function(){});var ne=!Array.isArray(N),ce=[],I=!1;return{onIgnoreTag:function(K,H,Q){if($(K)){if(Q.isClosing){var le="[/removed]",ue=Q.position+le.length;return ce.push([I!==!1?I:Q.position,ue]),I=!1,le}return I||(I=Q.position),"[removed]"}return V(K,H,Q)},remove:function(K){var H="",Q=0;return A.forEach(ce,function(le){H+=K.slice(Q,le[0]),Q=le[1]}),H+=K.slice(Q)}}}function y(N){return N.replace(fe,"")}function k(N){var V=N.split("");return V=V.filter(function($){var ne=$.charCodeAt(0);return ne!==127&&(!(ne<=31)||ne===10||ne===13)}),V.join("")}var x=r(31).FilterCSS,w=r(31).getDefaultWhiteList,A=r(35),E=new x,S=/</g,O=/>/g,P=/"/g,L=/&quot;/g,M=/&#([a-zA-Z0-9]*);?/gim,G=/&colon;?/gim,X=/&newline;?/gim,j=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,q=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,ee=/u\s*r\s*l\s*\(.*/gi,fe=/<!--[\s\S]*?-->/g;n.whiteList=t(),n.getDefaultWhiteList=t,n.onTag=o,n.onIgnoreTag=i,n.onTagAttr=s,n.onIgnoreTagAttr=a,n.safeAttrValue=u,n.escapeHtml=l,n.escapeQuote=f,n.unescapeQuote=c,n.escapeHtmlEntities=d,n.escapeDangerHtml5Entities=_,n.clearNonPrintableCharacter=v,n.friendlyAttrValue=b,n.escapeAttrValue=C,n.onIgnoreTagStripAll=m,n.StripTagBody=g,n.stripCommentTag=y,n.stripBlankChar=k,n.cssFilter=E,n.getDefaultCSSWhiteList=w},function(e,n,r){function t(_){var v=c.spaceIndex(_);if(v===-1)var b=_.slice(1,-1);else var b=_.slice(1,v+1);return b=c.trim(b).toLowerCase(),b.slice(0,1)==="/"&&(b=b.slice(1)),b.slice(-1)==="/"&&(b=b.slice(0,-1)),b}function o(_){return _.slice(0,2)==="</"}function i(_,v,b){var C="",m=0,g=!1,y=!1,k=0,x=_.length,w="",A="";e:for(k=0;k<x;k++){var E=_.charAt(k);if(g===!1){if(E==="<"){g=k;continue}}else if(y===!1){if(E==="<"){C+=b(_.slice(m,k)),g=k,m=k;continue}if(E===">"){C+=b(_.slice(m,g)),A=_.slice(g,k+1),w=t(A),C+=v(g,C.length,w,A,o(A)),m=k+1,g=!1;continue}if(E==='"'||E==="'")for(var S=1,O=_.charAt(k-S);O===" "||O==="=";){if(O==="="){y=E;continue e}O=_.charAt(k-++S)}}else if(E===y){y=!1;continue}}return m<_.length&&(C+=b(_.substr(m))),C}function s(_,v){function b(E,S){if(E=c.trim(E),E=E.replace(d,"").toLowerCase(),!(E.length<1)){var O=v(E,S||"");O&&m.push(O)}}for(var C=0,m=[],g=!1,y=_.length,k=0;k<y;k++){var x,w,A=_.charAt(k);if(g!==!1||A!=="=")if(g===!1||k!==C||A!=='"'&&A!=="'"||_.charAt(k-1)!=="="){if(/\s|\n|\t/.test(A)){if(_=_.replace(/\s|\n|\t/g," "),g===!1){if((w=a(_,k))===-1){x=c.trim(_.slice(C,k)),b(x),g=!1,C=k+1;continue}k=w-1;continue}if((w=l(_,k-1))===-1){x=c.trim(_.slice(C,k)),x=f(x),b(g,x),g=!1,C=k+1;continue}}}else{if((w=_.indexOf(A,k+1))===-1)break;x=c.trim(_.slice(C+1,w)),b(g,x),g=!1,k=w,C=k+1}else g=_.slice(C,k),C=k+1}return C<_.length&&(g===!1?b(_.slice(C)):b(g,f(c.trim(_.slice(C))))),c.trim(m.join(" "))}function a(_,v){for(;v<_.length;v++){var b=_[v];if(b!==" ")return b==="="?v:-1}}function l(_,v){for(;v>0;v--){var b=_[v];if(b!==" ")return b==="="?v:-1}}function u(_){return _[0]==='"'&&_[_.length-1]==='"'||_[0]==="'"&&_[_.length-1]==="'"}function f(_){return u(_)?_.substr(1,_.length-2):_}var c=r(35),d=/[^a-zA-Z0-9_:\.\-]/gim;n.parseTag=i,n.parseAttr=s},function(e,n,r){function t(i){r(204),r(205)}var o=r(16)(r(68),r(201),t,"data-v-7a63e4b3",null);o.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\src\\mavon-editor.vue",o.esModule&&Object.keys(o.esModule).some(function(i){return i!=="default"&&i.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] mavon-editor.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,n,r){var t=r(197),o={autoTextarea:t,install:function(i){i.component("auto-textarea",t)}};e.exports=o},function(e,n,r){Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){var t=this;return{temp_value:function(){return t.value}(),s_autofocus:function(){if(t.autofocus)return"autofocus"}()}},created:function(){},props:{fullHeight:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},value:{type:String,default:""},placeholder:{type:String,default:""},border:{type:Boolean,default:!1},resize:{type:Boolean,default:!1},onchange:{type:Function,default:null},fontSize:{type:String,default:"14px"},lineHeight:{type:String,default:"18px"}},methods:{change:function(t){this.onchange&&this.onchange(this.temp_value,t)}},watch:{value:function(t,o){this.temp_value=t},temp_value:function(t,o){this.$emit("input",t)}}}},function(e,n,r){Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"s-md-toolbar-left",props:{editable:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},toolbars:{type:Object,required:!0},d_words:{type:Object,required:!0},image_filter:{type:Function,default:null}},data:function(){return{img_file:[[0,null]],img_timer:null,header_timer:null,s_img_dropdown_open:!1,s_header_dropdown_open:!1,s_img_link_open:!1,trigger:null,num:0,link_text:"",link_addr:"",link_type:"link"}},methods:{$imgLinkAdd:function(){this.$emit("toolbar_left_addlink",this.link_type,this.link_text,this.link_addr),this.s_img_link_open=!1},$toggle_imgLinkAdd:function(t){var o=this;this.link_type=t,this.link_text=this.link_addr="",this.s_img_link_open=!0,this.$nextTick(function(){o.$refs.linkTextInput.focus()}),this.s_img_dropdown_open=!1},$imgFileListClick:function(t){this.$emit("imgTouch",this.img_file[t])},$changeUrl:function(t,o){this.img_file[t][0]=o},$imgFileAdd:function(t){this.img_file.push([++this.num,t]),this.$emit("imgAdd",this.num,t),this.s_img_dropdown_open=!1},$imgFilesAdd:function(t){for(var o=typeof this.image_filter=="function",i=0;i<t.length;i++)o&&this.image_filter(t[i])===!0?this.$imgFileAdd(t[i]):!o&&t[i].type.match(/^image\//i)&&this.$imgFileAdd(t[i])},$imgAdd:function(t){this.$imgFilesAdd(t.target.files),t.target.value=""},$imgDel:function(t){this.$emit("imgDel",this.img_file[t]),this.img_file.splice(t,1),this.num--,this.s_img_dropdown_open=!1},isEqualName:function(t,o){return!(!this.img_file[o][1]||this.img_file[o][1].name!=t&&this.img_file[o][1]._name!=t)},$imgDelByFilename:function(t){for(var o=0;this.img_file.length>o;){if(this.img_file[o][1]==t||this.isEqualName(t,o))return this.$imgDel(o),!0;o+=1}return!1},$imgAddByFilename:function(t,o){for(var i=0;i<this.img_file.length;i++)if(this.img_file[i][0]==t)return!1;return this.img_file[0][0]=t,this.img_file[0][1]=o,this.img_file[0][2]=t,this.img_file.unshift(["./"+this.num,null]),this.$emit("imgAdd",this.img_file[1][0],o,!1),!0},$imgAddByUrl:function(t,o){for(var i=0;i<this.img_file.length;i++)if(this.img_file[i][0]==t)return!1;return this.img_file[0][0]=t,this.img_file[0][1]=o,this.img_file.unshift(["./"+this.num,null]),!0},$imgUpdateByFilename:function(t,o){for(var i=0;i<this.img_file.length;i++)if(this.img_file[i][0]==t||this.isEqualName(t,i))return this.img_file[i][1]=o,this.$emit("imgAdd",t,o,!1),!0;return!1},$mouseenter_img_dropdown:function(){this.editable&&(clearTimeout(this.img_timer),this.s_img_dropdown_open=!0)},$mouseleave_img_dropdown:function(){var t=this;this.img_timer=setTimeout(function(){t.s_img_dropdown_open=!1},200)},$mouseenter_header_dropdown:function(){this.editable&&(clearTimeout(this.header_timer),this.s_header_dropdown_open=!0)},$mouseleave_header_dropdown:function(){var t=this;this.header_timer=setTimeout(function(){t.s_header_dropdown_open=!1},200)},$clicks:function(t){this.editable&&this.$emit("toolbar_left_click",t)},$click_header:function(t){this.$emit("toolbar_left_click",t),this.s_header_dropdown_open=!1},handleClose:function(t){this.s_img_dropdown_open=!1}}}},function(e,n,r){Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"s-md-toolbar-right",props:{s_subfield:{type:Boolean,required:!0},toolbars:{type:Object,required:!0},s_preview_switch:{type:Boolean,required:!0},s_fullScreen:{type:Boolean,required:!0},s_html_code:{type:Boolean,required:!0},s_navigation:{type:Boolean,required:!0},d_words:{type:Object,required:!0}},methods:{$clicks:function(t){this.$emit("toolbar_right_click",t)}}}},function(module,__webpack_exports__,__webpack_require__){Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__=__webpack_require__(39),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__),__WEBPACK_IMPORTED_MODULE_1_auto_textarea__=__webpack_require__(64);__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_auto_textarea__);var __WEBPACK_IMPORTED_MODULE_2__lib_core_keydown_listen_js__=__webpack_require__(73),__WEBPACK_IMPORTED_MODULE_3__lib_core_hljs_lang_hljs_css_js__=__webpack_require__(72);__webpack_require__(38);var __WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__=__webpack_require__(18),__WEBPACK_IMPORTED_MODULE_6__lib_util_js__=__webpack_require__(77),__WEBPACK_IMPORTED_MODULE_7__lib_toolbar_left_click_js__=__webpack_require__(75),__WEBPACK_IMPORTED_MODULE_8__lib_toolbar_right_click_js__=__webpack_require__(76),__WEBPACK_IMPORTED_MODULE_9__lib_config_js__=__webpack_require__(70);__webpack_require__(71);var __WEBPACK_IMPORTED_MODULE_11__lib_mixins_markdown_js__=__webpack_require__(74),__WEBPACK_IMPORTED_MODULE_12__components_md_toolbar_left_vue__=__webpack_require__(36),__WEBPACK_IMPORTED_MODULE_12__components_md_toolbar_left_vue___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_md_toolbar_left_vue__),__WEBPACK_IMPORTED_MODULE_13__components_md_toolbar_right_vue__=__webpack_require__(37),__WEBPACK_IMPORTED_MODULE_13__components_md_toolbar_right_vue___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_md_toolbar_right_vue__),__WEBPACK_IMPORTED_MODULE_14__lib_font_css_fontello_css__=__webpack_require__(114);__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__lib_font_css_fontello_css__);var __WEBPACK_IMPORTED_MODULE_15__lib_css_md_css__=__webpack_require__(113);__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__lib_css_md_css__);var xss=__webpack_require__(209);__webpack_exports__.default={mixins:[__WEBPACK_IMPORTED_MODULE_11__lib_mixins_markdown_js__.a],props:{scrollStyle:{type:Boolean,default:!0},boxShadow:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},autofocus:{type:Boolean,default:!0},fontSize:{type:String,default:"14px"},toolbarsBackground:{type:String,default:"#ffffff"},editorBackground:{type:String,default:"#ffffff"},previewBackground:{type:String,default:"#fbfbfb"},boxShadowStyle:{type:String,default:"0 2px 12px 0 rgba(0, 0, 0, 0.1)"},help:{type:String,default:null},value:{type:String,default:""},language:{type:String,default:"zh-CN"},subfield:{type:Boolean,default:!0},navigation:{type:Boolean,default:!1},defaultOpen:{type:String,default:null},editable:{type:Boolean,default:!0},toolbarsFlag:{type:Boolean,default:!0},toolbars:{type:Object,default:function(){return __WEBPACK_IMPORTED_MODULE_9__lib_config_js__.a.toolbars}},xssOptions:{type:Object,default:function(){return null}},codeStyle:{type:String,default:function(){return"github"}},placeholder:{type:String,default:null},ishljs:{type:Boolean,default:!0},externalLink:{type:[Object,Boolean],default:!0},imageFilter:{type:Function,default:null},imageClick:{type:Function,default:null},tabSize:{type:Number,default:0},shortCut:{type:Boolean,default:!0}},data:function(){var e=this;return{s_right_click_menu_show:!1,right_click_menu_top:0,right_click_menu_left:0,s_subfield:function(){return e.subfield}(),s_autofocus:!0,s_navigation:function(){return e.navigation}(),s_scrollStyle:function(){return e.scrollStyle}(),d_value:"",d_render:"",s_preview_switch:function(){var n=e.defaultOpen;return n||(n=e.subfield?"preview":"edit"),n==="preview"}(),s_fullScreen:!1,s_help:!1,s_html_code:!1,d_help:null,d_words:null,edit_scroll_height:-1,s_readmodel:!1,s_table_enter:!1,d_history:function(){var n=[];return n.push(e.value),n}(),d_history_index:0,currentTimeout:"",d_image_file:[],d_preview_imgsrc:null,s_external_link:{markdown_css:function(){return"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"},hljs_js:function(){return"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"},hljs_lang:function(n){return"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/"+n+".min.js"},hljs_css:function(n){return __WEBPACK_IMPORTED_MODULE_3__lib_core_hljs_lang_hljs_css_js__.a[n]?"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/"+n+".min.css":""},katex_js:function(){return"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"},katex_css:function(){return"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"}},p_external_link:{},textarea_selectionEnd:0,textarea_selectionEnds:[0]}},created:function(){var e=this;this.initLanguage(),this.initExternalFuc(),this.$nextTick(function(){e.editableTextarea()})},mounted:function(){var e=this;this.$el.addEventListener("paste",function(n){e.$paste(n)}),this.$el.addEventListener("drop",function(n){e.$drag(n)}),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_core_keydown_listen_js__.a)(this),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.a)(this),this.autofocus&&this.getTextareaDom().focus(),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.b)(this),this.d_value=this.value||"",document.body.appendChild(this.$refs.help),this.loadExternalLink("markdown_css","css"),this.loadExternalLink("katex_css","css"),this.loadExternalLink("katex_js","js",function(){e.iRender(!0)}),this.loadExternalLink("hljs_js","js",function(){e.iRender(!0)}),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(e.externalLink)==="object"&&typeof e.externalLink.markdown_css=="function"||e.codeStyleChange(e.codeStyle,!0)},beforeDestroy:function(){document.body.removeChild(this.$refs.help)},getMarkdownIt:function(){return this.mixins[0].data().markdownIt},methods:{loadExternalLink:function(e,n,r){if(typeof this.p_external_link[e]!="function")return void(this.p_external_link[e]!=0&&console.error("external_link."+e,"is not a function, if you want to disabled this error log, set external_link."+e,"to function or false"));var t={css:__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.c,js:__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.d};t.hasOwnProperty(n)&&t[n](this.p_external_link[e](),r)},initExternalFuc:function(){for(var e=this,n=["markdown_css","hljs_js","hljs_css","hljs_lang","katex_js","katex_css"],r=__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(e.externalLink),t=r==="object",o=r==="boolean",i=0;i<n.length;i++)o&&!e.externalLink||t&&e.externalLink[n[i]]===!1?e.p_external_link[n[i]]=!1:t&&typeof e.externalLink[n[i]]=="function"?e.p_external_link[n[i]]=e.externalLink[n[i]]:e.p_external_link[n[i]]=e.s_external_link[n[i]]},textAreaFocus:function(){this.$refs.vNoteTextarea.$refs.vTextarea.focus()},$drag:function(e){var n=e.dataTransfer;if(n){var r=n.files;r.length>0&&(e.preventDefault(),this.$refs.toolbar_left.$imgFilesAdd(r))}},$paste:function(e){var n=e.clipboardData;if(n){var r=n.items;if(!r)return;for(var t=n.types||[],o=null,i=0;i<t.length;i++)if(t[i]==="Files"){o=r[i];break}if(o&&o.kind==="file"){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib_util_js__.a)(e);var s=o.getAsFile();this.$refs.toolbar_left.$imgFilesAdd([s])}}},$imgTouch:function(e){},$imgDel:function(e){this.markdownIt.image_del(e[1]);var n=e[0],r=new RegExp("\\!\\["+e[1]._name+"\\]\\("+n+"\\)","g");this.d_value=this.d_value.replace(r,""),this.iRender(),this.$emit("imgDel",e)},$imgAdd:function(e,n,r){r===void 0&&(r=!0);var t=this;if(this.__rFilter==null&&(this.__rFilter=/^image\//i),this.__oFReader=new FileReader,this.__oFReader.onload=function(i){t.markdownIt.image_add(e,i.target.result),n.miniurl=i.target.result,r===!0&&(n._name=n.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g,""),t.insertText(t.getTextareaDom(),{prefix:"!["+n._name+"]("+e+")",subfix:"",str:""}),t.$nextTick(function(){t.$emit("imgAdd",e,n)}))},n){var o=n;this.__rFilter.test(o.type)&&this.__oFReader.readAsDataURL(o)}},$imgUpdateByUrl:function(e,n){var r=this;this.markdownIt.image_add(e,n),this.$nextTick(function(){r.d_render=this.markdownIt.render(this.d_value)})},$imgAddByUrl:function(e,n){return!!this.$refs.toolbar_left.$imgAddByUrl(e,n)&&(this.$imgUpdateByUrl(e,n),!0)},$img2Url:function $img2Url(fileIndex,url){var reg_str="/(!\\[[^\\[]*?\\](?=\\())\\(\\s*("+fileIndex+")\\s*\\)/g",reg=eval(reg_str);this.d_value=this.d_value.replace(reg,"$1("+url+")"),this.$refs.toolbar_left.$changeUrl(fileIndex,url),this.iRender()},$imglst2Url:function(e){if(e instanceof Array)for(var n=0;n<e.length;n++)this.$img2Url(e[n][0],e[n][1])},toolbar_left_click:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib_toolbar_left_click_js__.a)(e,this)},toolbar_left_addlink:function(e,n,r){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__lib_toolbar_left_click_js__.b)(e,n,r,this)},toolbar_right_click:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_toolbar_right_click_js__.a)(e,this)},getNavigation:function(e,n){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.e)(e,n)},change:function(e,n){this.$emit("change",e,n)},fullscreen:function(e,n){this.$emit("fullScreen",e,n)},readmodel:function(e,n){this.$emit("readModel",e,n)},previewtoggle:function(e,n){this.$emit("previewToggle",e,n)},subfieldtoggle:function(e,n){this.$emit("subfieldToggle",e,n)},htmlcode:function(e,n){this.$emit("htmlCode",e,n)},helptoggle:function(e,n){this.$emit("helpToggle",e,n)},save:function(e,n){this.$emit("save",e,n)},navigationtoggle:function(e,n){this.$emit("navigationToggle",e,n)},$toolbar_right_read_change_status:function(){this.s_readmodel=!this.s_readmodel,this.readmodel&&this.readmodel(this.s_readmodel,this.d_value),this.s_readmodel&&this.toolbars.navigation&&this.getNavigation(this,!0)},$v_edit_scroll:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.f)(e,this)},getTextareaDom:function(){return this.$refs.vNoteTextarea.$refs.vTextarea},insertText:function(e,n){var r=n.prefix,t=n.subfix,o=n.str,i=n.type;__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.g)(e,{prefix:r,subfix:t,str:o,type:i},this)},insertTab:function(){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.h)(this,this.tabSize)},insertOl:function(){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.i)(this)},removeLine:function(){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.j)(this)},insertUl:function(){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.k)(this)},unInsertTab:function(){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.l)(this,this.tabSize)},insertEnter:function(e){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.m)(this,e)},saveHistory:function(){this.d_history.splice(this.d_history_index+1,this.d_history.length),this.d_history.push(this.d_value),this.textarea_selectionEnds.splice(this.d_history_index+1,this.textarea_selectionEnds.length),this.textarea_selectionEnds.push(this.textarea_selectionEnd),this.d_history_index=this.d_history.length-1},saveSelectionEndsHistory:function(){var e=this.$refs.vNoteTextarea&&this.$refs.vNoteTextarea.$el.querySelector("textarea");this.textarea_selectionEnd=e?e.selectionEnd:this.textarea_selectionEnd},initLanguage:function(){var e=__WEBPACK_IMPORTED_MODULE_9__lib_config_js__.a.langList.indexOf(this.language)>=0?this.language:"zh-CN",n=this;n.$render(__WEBPACK_IMPORTED_MODULE_9__lib_config_js__.a["help_"+e],function(r){n.d_help=r}),this.d_words=__WEBPACK_IMPORTED_MODULE_9__lib_config_js__.a["words_"+e]},editableTextarea:function(){var e=this.$refs.vNoteTextarea.$refs.vTextarea;this.editable?e.removeAttribute("disabled"):e.setAttribute("disabled","disabled")},codeStyleChange:function(e,n){if(n=n||!1,typeof this.p_external_link.hljs_css!="function")return void(this.p_external_link.hljs_css!=0&&console.error("external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false"));var r=this.p_external_link.hljs_css(e);r.length===0&&n&&(console.warn("hljs color scheme",e,"do not exist, loading default github"),r=this.p_external_link.hljs_css("github")),r.length>0?__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.c)(r,null,"md-code-style"):console.warn("hljs color scheme",e,"do not exist, hljs color scheme will not change")},iRender:function(e){var n=this;this.$render(n.d_value,function(r){n.d_render=r,e||n.change&&n.change(n.d_value,n.d_render),n.s_navigation&&__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_core_extra_function_js__.e)(n,!1),n.$emit("input",n.d_value),n.d_value!==n.d_history[n.d_history_index]&&(window.clearTimeout(n.currentTimeout),n.currentTimeout=setTimeout(function(){n.saveHistory()},500))})},$emptyHistory:function(){this.d_history=[this.d_value],this.d_history_index=0}},watch:{d_value:function(e,n){this.saveSelectionEndsHistory(),this.iRender()},value:function(e,n){this.xssOptions&&(e=xss(e,this.xssOptions)),e!==this.d_value&&(this.d_value=e)},subfield:function(e,n){this.s_subfield=e},d_history_index:function(){this.d_history_index>20&&(this.d_history.shift(),this.d_history_index=this.d_history_index-1),this.d_value=this.d_history[this.d_history_index]},language:function(e){this.initLanguage()},editable:function(){this.editableTextarea()},defaultOpen:function(e){var n=e;return n||(n=this.subfield?"preview":"edit"),this.s_preview_switch=n==="preview"},codeStyle:function(e){this.codeStyleChange(e)}},components:{"v-autoTextarea":__WEBPACK_IMPORTED_MODULE_1_auto_textarea__.autoTextarea,"v-md-toolbar-left":__WEBPACK_IMPORTED_MODULE_12__components_md_toolbar_left_vue___default.a,"v-md-toolbar-right":__WEBPACK_IMPORTED_MODULE_13__components_md_toolbar_right_vue___default.a}}},function(e,n,r){var t=r(63),o={markdownIt:t.mixins[0].data().markdownIt,mavonEditor:t,LeftToolbar:r(36),RightToolbar:r(37),install:function(i){i.component("mavon-editor",t)}};e.exports=o},function(e,n,r){r.d(n,"a",function(){return fe});var t=r(193),o=r.n(t),i=r(194),s=r.n(i),a=r(188),l=r.n(a),u=r(189),f=r.n(u),c=r(191),d=r.n(c),_=r(192),v=r.n(_),b=r(187),C=r.n(b),m=r(190),g=r.n(m),y=r(217),k=r.n(y),x=r(218),w=r.n(x),A=r(212),E=r.n(A),S=r(213),O=r.n(S),P=r(215),L=r.n(P),M=r(216),G=r.n(M),X=r(211),j=r.n(X),q=r(214),ee=r.n(q),fe={"help_zh-CN":o.a,"help_zh-TW":s.a,"help_pt-BR":d.a,help_en:l.a,help_fr:f.a,help_ru:v.a,help_de:C.a,help_ja:g.a,"words_zh-CN":k.a,"words_zh-TW":w.a,"words_pt-BR":L.a,words_en:E.a,words_fr:O.a,words_ru:G.a,words_de:j.a,words_ja:ee.a,langList:["en","zh-CN","zh-TW","fr","pt-BR","ru","de","ja"],toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,undo:!0,redo:!0,trash:!0,save:!0,alignleft:!0,aligncenter:!0,alignright:!0,navigation:!0,subfield:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,preview:!0}}},function(e,n,r){r(18)},function(e,n,r){n.a={agate:1,androidstudio:1,"arduino-light":1,arta:1,ascetic:1,"atelier-cave-dark":1,"atelier-cave-light":1,"atelier-dune-dark":1,"atelier-dune-light":1,"atelier-estuary-dark":1,"atelier-estuary-light":1,"atelier-forest-dark":1,"atelier-forest-light":1,"atelier-heath-dark":1,"atelier-heath-light":1,"atelier-lakeside-dark":1,"atelier-lakeside-light":1,"atelier-plateau-dark":1,"atelier-plateau-light":1,"atelier-savanna-dark":1,"atelier-savanna-light":1,"atelier-seaside-dark":1,"atelier-seaside-light":1,"atelier-sulphurpool-dark":1,"atelier-sulphurpool-light":1,"atom-one-dark":1,"atom-one-light":1,"brown-paper":1,"codepen-embed":1,"color-brewer":1,darcula:1,dark:1,darkula:1,default:1,docco:1,dracula:1,far:1,foundation:1,"github-gist":1,github:1,googlecode:1,grayscale:1,"gruvbox-dark":1,"gruvbox-light":1,hopscotch:1,hybrid:1,idea:1,"ir-black":1,"kimbie.dark":1,"kimbie.light":1,magula:1,"mono-blue":1,"monokai-sublime":1,monokai:1,obsidian:1,ocean:1,"paraiso-dark":1,"paraiso-light":1,pojoaque:1,purebasic:1,qtcreator_dark:1,qtcreator_light:1,railscasts:1,rainbow:1,routeros:1,"school-book":1,"solarized-dark":1,"solarized-light":1,sunburst:1,"tomorrow-night-blue":1,"tomorrow-night-bright":1,"tomorrow-night-eighties":1,"tomorrow-night":1,tomorrow:1,vs:1,vs2015:1,xcode:1,xt256:1,zenburn:1}},function(e,n,r){r.d(n,"a",function(){return o});var t={F8:119,F9:120,F10:121,F11:122,F12:123,B:66,I:73,H:72,U:85,D:68,M:77,Q:81,O:79,L:76,S:83,Z:90,Y:89,C:67,T:84,R:82,DELETE:8,TAB:9,ENTER:13,ONE:97,TWO:98,THREE:99,FOUR:100,FIVE:101,SIX:102,_ONE:49,_TWO:50,_THREE:51,_FOUR:52,_FIVE:53,_SIX:54},o=function(i){i.shortCut&&i.$el.addEventListener("keydown",function(s){if(s.ctrlKey||s.metaKey||s.altKey||s.shiftKey)if(!s.ctrlKey&&!s.metaKey||s.altKey||s.shiftKey){if((s.ctrlKey||s.metaKey)&&s.altKey&&!s.shiftKey)switch(s.keyCode){case t.S:s.preventDefault(),i.toolbar_left_click("superscript");break;case t.U:s.preventDefault(),i.toolbar_left_click("ul");break;case t.L:s.preventDefault(),i.toolbar_left_click("imagelink");break;case t.C:s.preventDefault(),i.toolbar_left_click("code");break;case t.T:s.preventDefault(),i.toolbar_left_click("table")}else if((s.ctrlKey||s.metaKey)&&s.shiftKey&&!s.altKey)switch(s.keyCode){case t.S:s.preventDefault(),i.toolbar_left_click("subscript");break;case t.D:s.preventDefault(),i.toolbar_left_click("strikethrough");break;case t.L:s.preventDefault(),i.toolbar_left_click("alignleft");break;case t.R:s.preventDefault(),i.toolbar_left_click("alignright");break;case t.C:s.preventDefault(),i.toolbar_left_click("aligncenter")}else if(!s.ctrlKey&&!s.metaKey&&s.shiftKey&&!s.altKey)switch(s.keyCode){case t.TAB:i.$refs.toolbar_left.s_img_link_open||(s.preventDefault(),i.unInsertTab())}}else switch(s.keyCode){case t.B:s.preventDefault(),i.toolbar_left_click("bold");break;case t.I:s.preventDefault(),i.toolbar_left_click("italic");break;case t.H:s.preventDefault(),i.toolbar_left_click("header");break;case t.U:s.preventDefault(),i.toolbar_left_click("underline");break;case t.D:s.preventDefault(),i.toolbar_left_click("removeLine");break;case t.M:s.preventDefault(),i.toolbar_left_click("mark");break;case t.Q:s.preventDefault(),i.toolbar_left_click("quote");break;case t.O:s.preventDefault(),i.toolbar_left_click("ol");break;case t.L:s.preventDefault(),i.toolbar_left_click("link");break;case t.S:s.preventDefault(),i.toolbar_left_click("save");break;case t.Z:s.preventDefault(),i.toolbar_left_click("undo");break;case t.Y:s.preventDefault(),i.toolbar_left_click("redo");break;case t.DELETE:s.preventDefault(),i.toolbar_left_click("trash");break;case t.ONE:s.preventDefault(),i.toolbar_left_click("header1");break;case t.TWO:s.preventDefault(),i.toolbar_left_click("header2");break;case t.THREE:s.preventDefault(),i.toolbar_left_click("header3");break;case t.FOUR:s.preventDefault(),i.toolbar_left_click("header4");break;case t.FIVE:s.preventDefault(),i.toolbar_left_click("header5");break;case t.SIX:s.preventDefault(),i.toolbar_left_click("header6");break;case t._ONE:s.preventDefault(),i.toolbar_left_click("header1");break;case t._TWO:s.preventDefault(),i.toolbar_left_click("header2");break;case t._THREE:s.preventDefault(),i.toolbar_left_click("header3");break;case t._FOUR:s.preventDefault(),i.toolbar_left_click("header4");break;case t._FIVE:s.preventDefault(),i.toolbar_left_click("header5");break;case t._SIX:s.preventDefault(),i.toolbar_left_click("header6")}else switch(s.keyCode){case t.F8:i.toolbars.navigation&&(s.preventDefault(),i.toolbar_right_click("navigation"));break;case t.F9:i.toolbars.preview&&(s.preventDefault(),i.toolbar_right_click("preview"));break;case t.F10:i.toolbars.fullscreen&&(s.preventDefault(),i.toolbar_right_click("fullscreen"));break;case t.F11:i.toolbars.readmodel&&(s.preventDefault(),i.toolbar_right_click("read"));break;case t.F12:i.toolbars.subfield&&(s.preventDefault(),i.toolbar_right_click("subfield"));break;case t.TAB:i.$refs.toolbar_left.s_img_link_open||(s.preventDefault(),i.insertTab());break;case t.ENTER:i.$refs.toolbar_left.s_img_link_open?(s.preventDefault(),i.$refs.toolbar_left.$imgLinkAdd()):i.insertEnter(s)}})}},function(e,n,r){var t=r(38),o=r(18),i={html:!0,xhtmlOut:!0,breaks:!0,langPrefix:"lang-",linkify:!1,typographer:!0,quotes:"\u201C\u201D\u2018\u2019"},s=r(136)(i),a=r(120),l=r(132),u=r(133),f=r(119),c=r(117),d=r(126),_=r(129),v=r(131),b=r(134),C=r(118),m=r(135),g=s.renderer.rules.link_open||function(S,O,P,L,M){return M.renderToken(S,O,P)};s.renderer.rules.link_open=function(S,O,P,L,M){var G=S[O].attrIndex("href");if(S[O].attrs[G][1].startsWith("#"))return g(S,O,P,L,M);var X=S[O].attrIndex("target");return X<0?S[O].attrPush(["target","_blank"]):S[O].attrs[X][1]="_blank",g(S,O,P,L,M)};var y=r(127),k=r(130),x=r(128),w={},A=[],E={hljs:"auto",highlighted:!0,langCheck:function(S){S&&t.a[S]&&!w[S]&&(w[S]=1,A.push(t.a[S]))}};s.use(y,E).use(a).use(u).use(l).use(C).use(C,"hljs-left").use(C,"hljs-center").use(C,"hljs-right").use(f).use(c).use(d).use(_).use(v).use(C).use(x).use(k).use(b).use(m),n.a={data:function(){return{markdownIt:s}},mounted:function(){E.highlighted=this.ishljs},methods:{$render:function(S,O){var P=this;w={},A=[];var L=s.render(S);this.ishljs&&A.length>0&&P.$_render(S,O,L),O(L)},$_render:function(S,O,P){for(var L=this,M=0,G=0;G<A.length;G++){var X=L.p_external_link.hljs_lang(A[G]);r.i(o.d)(X,function(){(M+=1)===A.length&&(P=s.render(S),O(P))})}}},watch:{ishljs:function(S){E.highlighted=S}}}},function(e,n,r){function t(d){d.d_history_index>0&&d.d_history_index--,d.$nextTick(function(){var _=d.textarea_selectionEnds[d.d_history_index];d.getTextareaDom().selectionStart=_,d.getTextareaDom().selectionEnd=_}),d.getTextareaDom().focus()}function o(d){d.d_history_index<d.d_history.length-1&&d.d_history_index++,d.$nextTick(function(){var _=d.textarea_selectionEnds[d.d_history_index];d.getTextareaDom().selectionStart=_,d.getTextareaDom().selectionEnd=_}),d.getTextareaDom().focus()}function i(d){d.d_value="",d.getTextareaDom().focus()}function s(d){d.save(d.d_value,d.d_render)}function a(d){d.insertOl()}function l(d){d.insertUl()}function u(d){d.removeLine()}r.d(n,"b",function(){return f}),r.d(n,"a",function(){return c});var f=function(d,_,v,b){var C={prefix:d==="link"?"["+_+"](":"!["+_+"](",subfix:")",str:v};b.insertText(b.getTextareaDom(),C)},c=function(d,_){var v={bold:{prefix:"**",subfix:"**",str:_.d_words.tl_bold},italic:{prefix:"*",subfix:"*",str:_.d_words.tl_italic},header:{prefix:"# ",subfix:"",str:_.d_words.tl_header},header1:{prefix:"# ",subfix:"",str:_.d_words.tl_header_one},header2:{prefix:"## ",subfix:"",str:_.d_words.tl_header_two},header3:{prefix:"### ",subfix:"",str:_.d_words.tl_header_three},header4:{prefix:"#### ",subfix:"",str:_.d_words.tl_header_four},header5:{prefix:"##### ",subfix:"",str:_.d_words.tl_header_five},header6:{prefix:"###### ",subfix:"",str:_.d_words.tl_header_six},underline:{prefix:"++",subfix:"++",str:_.d_words.tl_underline},strikethrough:{prefix:"~~",subfix:"~~",str:_.d_words.tl_strikethrough},mark:{prefix:"==",subfix:"==",str:_.d_words.tl_mark},superscript:{prefix:"^",subfix:"^",str:_.d_words.tl_superscript},subscript:{prefix:"~",subfix:"~",str:_.d_words.tl_subscript},quote:{prefix:"> ",subfix:"",str:_.d_words.tl_quote},link:{prefix:"[](",subfix:")",str:_.d_words.tl_link},imagelink:{prefix:"![](",subfix:")",str:_.d_words.tl_image},code:{prefix:"```\n",subfix:"\n\n```\n",str:"language"},table:{prefix:"",subfix:"",str:`|column1|column2|column3|
|-|-|-|
|content1|content2|content3|
`},aligncenter:{prefix:`::: hljs-center

`,subfix:`

:::
`,str:_.d_words.tl_aligncenter},alignright:{prefix:`::: hljs-right

`,subfix:`

:::
`,str:_.d_words.tl_alignright},alignleft:{prefix:`::: hljs-left

`,subfix:`

:::
`,str:_.d_words.tl_alignleft}};v.hasOwnProperty(d)&&_.insertText(_.getTextareaDom(),v[d]);var b={undo:t,redo:o,trash:i,save:s,ol:a,ul:l,removeLine:u};b.hasOwnProperty(d)&&b[d](_)}},function(e,n,r){function t(c){c.s_html_code=!c.s_html_code,c.htmlcode&&c.htmlcode(c.s_html_code,c.d_value)}function o(c){c.s_help=!c.s_help,c.helptoggle&&c.helptoggle(c.s_help,c.d_value)}function i(c){var d=c.$refs.vReadModel;d.requestFullscreen?d.requestFullscreen():d.mozRequestFullScreen?d.mozRequestFullScreen():d.webkitRequestFullscreen?d.webkitRequestFullscreen():d.msRequestFullscreen&&d.msRequestFullscreen()}function s(c){c.s_preview_switch=!c.s_preview_switch,c.previewtoggle&&c.previewtoggle(c.s_preview_switch,c.d_value)}function a(c){c.s_fullScreen=!c.s_fullScreen,c.fullscreen&&c.fullscreen(c.s_fullScreen,c.d_value)}function l(c){c.s_subfield=!c.s_subfield,c.s_preview_switch=c.s_subfield,c.previewtoggle&&c.previewtoggle(c.s_preview_switch,c.d_value),c.subfieldtoggle&&c.subfieldtoggle(c.s_subfield,c.d_value)}function u(c){c.s_navigation=!c.s_navigation,c.s_navigation&&(c.s_preview_switch=!0),c.navigationtoggle&&c.navigationtoggle(c.s_navigation,c.d_value),c.s_navigation&&c.getNavigation(c,!1)}r.d(n,"a",function(){return f});var f=function(c,d){var _={help:o,html:t,read:i,preview:s,fullscreen:a,navigation:u,subfield:l};_.hasOwnProperty(c)&&_[c](d)}},function(e,n,r){function t(i){i&&(i.preventDefault&&i.preventDefault(),i.stopPropagation&&i.stopPropagation())}n.a=t;var o=r(39);r.n(o)},function(e,n,r){e.exports={default:r(80),__esModule:!0}},function(e,n,r){e.exports={default:r(81),__esModule:!0}},function(e,n,r){r(103),r(101),r(104),r(105),e.exports=r(10).Symbol},function(e,n,r){r(102),r(106),e.exports=r(30).f("iterator")},function(e,n){e.exports=function(r){if(typeof r!="function")throw TypeError(r+" is not a function!");return r}},function(e,n){e.exports=function(){}},function(e,n,r){var t=r(6),o=r(99),i=r(98);e.exports=function(s){return function(a,l,u){var f,c=t(a),d=o(c.length),_=i(u,d);if(s&&l!=l){for(;d>_;)if((f=c[_++])!=f)return!0}else for(;d>_;_++)if((s||_ in c)&&c[_]===l)return s||_||0;return!s&&-1}}},function(e,n,r){var t=r(82);e.exports=function(o,i,s){if(t(o),i===void 0)return o;switch(s){case 1:return function(a){return o.call(i,a)};case 2:return function(a,l){return o.call(i,a,l)};case 3:return function(a,l,u){return o.call(i,a,l,u)}}return function(){return o.apply(i,arguments)}}},function(e,n,r){var t=r(22),o=r(47),i=r(23);e.exports=function(s){var a=t(s),l=o.f;if(l)for(var u,f=l(s),c=i.f,d=0;f.length>d;)c.call(s,u=f[d++])&&a.push(u);return a}},function(e,n,r){var t=r(1).document;e.exports=t&&t.documentElement},function(e,n,r){var t=r(40);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(o){return t(o)=="String"?o.split(""):Object(o)}},function(e,n,r){var t=r(40);e.exports=Array.isArray||function(o){return t(o)=="Array"}},function(e,n,r){var t=r(45),o=r(13),i=r(24),s={};r(4)(s,r(7)("iterator"),function(){return this}),e.exports=function(a,l,u){a.prototype=t(s,{next:o(1,u)}),i(a,l+" Iterator")}},function(e,n){e.exports=function(r,t){return{value:t,done:!!r}}},function(e,n,r){var t=r(14)("meta"),o=r(8),i=r(2),s=r(5).f,a=0,l=Object.isExtensible||function(){return!0},u=!r(11)(function(){return l(Object.preventExtensions({}))}),f=function(b){s(b,t,{value:{i:"O"+ ++a,w:{}}})},c=function(b,C){if(!o(b))return typeof b=="symbol"?b:(typeof b=="string"?"S":"P")+b;if(!i(b,t)){if(!l(b))return"F";if(!C)return"E";f(b)}return b[t].i},d=function(b,C){if(!i(b,t)){if(!l(b))return!0;if(!C)return!1;f(b)}return b[t].w},_=function(b){return u&&v.NEED&&l(b)&&!i(b,t)&&f(b),b},v=e.exports={KEY:t,NEED:!1,fastKey:c,getWeak:d,onFreeze:_}},function(e,n,r){var t=r(5),o=r(9),i=r(22);e.exports=r(3)?Object.defineProperties:function(s,a){o(s);for(var l,u=i(a),f=u.length,c=0;f>c;)t.f(s,l=u[c++],a[l]);return s}},function(e,n,r){var t=r(23),o=r(13),i=r(6),s=r(28),a=r(2),l=r(43),u=Object.getOwnPropertyDescriptor;n.f=r(3)?u:function(f,c){if(f=i(f),c=s(c,!0),l)try{return u(f,c)}catch{}if(a(f,c))return o(!t.f.call(f,c),f[c])}},function(e,n,r){var t=r(6),o=r(46).f,i={}.toString,s=typeof window=="object"&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(l){try{return o(l)}catch{return s.slice()}};e.exports.f=function(l){return s&&i.call(l)=="[object Window]"?a(l):o(t(l))}},function(e,n,r){var t=r(2),o=r(50),i=r(25)("IE_PROTO"),s=Object.prototype;e.exports=Object.getPrototypeOf||function(a){return a=o(a),t(a,i)?a[i]:typeof a.constructor=="function"&&a instanceof a.constructor?a.constructor.prototype:a instanceof Object?s:null}},function(e,n,r){var t=r(27),o=r(19);e.exports=function(i){return function(s,a){var l,u,f=String(o(s)),c=t(a),d=f.length;return c<0||c>=d?i?"":void 0:(l=f.charCodeAt(c),l<55296||l>56319||c+1===d||(u=f.charCodeAt(c+1))<56320||u>57343?i?f.charAt(c):l:i?f.slice(c,c+2):u-56320+(l-55296<<10)+65536)}}},function(e,n,r){var t=r(27),o=Math.max,i=Math.min;e.exports=function(s,a){return s=t(s),s<0?o(s+a,0):i(s,a)}},function(e,n,r){var t=r(27),o=Math.min;e.exports=function(i){return i>0?o(t(i),9007199254740991):0}},function(e,n,r){var t=r(83),o=r(91),i=r(21),s=r(6);e.exports=r(44)(Array,"Array",function(a,l){this._t=s(a),this._i=0,this._k=l},function(){var a=this._t,l=this._k,u=this._i++;return!a||u>=a.length?(this._t=void 0,o(1)):l=="keys"?o(0,u):l=="values"?o(0,a[u]):o(0,[u,a[u]])},"values"),i.Arguments=i.Array,t("keys"),t("values"),t("entries")},function(e,n){},function(e,n,r){var t=r(97)(!0);r(44)(String,"String",function(o){this._t=String(o),this._i=0},function(){var o,i=this._t,s=this._i;return s>=i.length?{value:void 0,done:!0}:(o=t(i,s),this._i+=o.length,{value:o,done:!1})})},function(e,n,r){var t=r(1),o=r(2),i=r(3),s=r(42),a=r(49),l=r(92).KEY,u=r(11),f=r(26),c=r(24),d=r(14),_=r(7),v=r(30),b=r(29),C=r(86),m=r(89),g=r(9),y=r(8),k=r(50),x=r(6),w=r(28),A=r(13),E=r(45),S=r(95),O=r(94),P=r(47),L=r(5),M=r(22),G=O.f,X=L.f,j=S.f,q=t.Symbol,ee=t.JSON,fe=ee&&ee.stringify,N=_("_hidden"),V=_("toPrimitive"),$={}.propertyIsEnumerable,ne=f("symbol-registry"),ce=f("symbols"),I=f("op-symbols"),K=Object.prototype,H=typeof q=="function"&&!!P.f,Q=t.QObject,le=!Q||!Q.prototype||!Q.prototype.findChild,ue=i&&u(function(){return E(X({},"a",{get:function(){return X(this,"a",{value:7}).a}})).a!=7})?function(F,U,re){var pe=G(K,U);pe&&delete K[U],X(F,U,re),pe&&F!==K&&X(K,U,pe)}:X,ae=function(F){var U=ce[F]=E(q.prototype);return U._k=F,U},se=H&&typeof q.iterator=="symbol"?function(F){return typeof F=="symbol"}:function(F){return F instanceof q},T=function(F,U,re){return F===K&&T(I,U,re),g(F),U=w(U,!0),g(re),o(ce,U)?(re.enumerable?(o(F,N)&&F[N][U]&&(F[N][U]=!1),re=E(re,{enumerable:A(0,!1)})):(o(F,N)||X(F,N,A(1,{})),F[N][U]=!0),ue(F,U,re)):X(F,U,re)},R=function(F,U){g(F);for(var re,pe=C(U=x(U)),de=0,he=pe.length;he>de;)T(F,re=pe[de++],U[re]);return F},D=function(F,U){return U===void 0?E(F):R(E(F),U)},z=function(F){var U=$.call(this,F=w(F,!0));return!(this===K&&o(ce,F)&&!o(I,F))&&(!(U||!o(this,F)||!o(ce,F)||o(this,N)&&this[N][F])||U)},B=function(F,U){if(F=x(F),U=w(U,!0),F!==K||!o(ce,U)||o(I,U)){var re=G(F,U);return!re||!o(ce,U)||o(F,N)&&F[N][U]||(re.enumerable=!0),re}},J=function(F){for(var U,re=j(x(F)),pe=[],de=0;re.length>de;)o(ce,U=re[de++])||U==N||U==l||pe.push(U);return pe},te=function(F){for(var U,re=F===K,pe=j(re?I:x(F)),de=[],he=0;pe.length>he;)!o(ce,U=pe[he++])||re&&!o(K,U)||de.push(ce[U]);return de};H||(q=function(){if(this instanceof q)throw TypeError("Symbol is not a constructor!");var F=d(arguments.length>0?arguments[0]:void 0),U=function(re){this===K&&U.call(I,re),o(this,N)&&o(this[N],F)&&(this[N][F]=!1),ue(this,F,A(1,re))};return i&&le&&ue(K,F,{configurable:!0,set:U}),ae(F)},a(q.prototype,"toString",function(){return this._k}),O.f=B,L.f=T,r(46).f=S.f=J,r(23).f=z,P.f=te,i&&!r(12)&&a(K,"propertyIsEnumerable",z,!0),v.f=function(F){return ae(_(F))}),s(s.G+s.W+s.F*!H,{Symbol:q});for(var Y="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),Z=0;Y.length>Z;)_(Y[Z++]);for(var W=M(_.store),ie=0;W.length>ie;)b(W[ie++]);s(s.S+s.F*!H,"Symbol",{for:function(F){return o(ne,F+="")?ne[F]:ne[F]=q(F)},keyFor:function(F){if(!se(F))throw TypeError(F+" is not a symbol!");for(var U in ne)if(ne[U]===F)return U},useSetter:function(){le=!0},useSimple:function(){le=!1}}),s(s.S+s.F*!H,"Object",{create:D,defineProperty:T,defineProperties:R,getOwnPropertyDescriptor:B,getOwnPropertyNames:J,getOwnPropertySymbols:te});var oe=u(function(){P.f(1)});s(s.S+s.F*oe,"Object",{getOwnPropertySymbols:function(F){return P.f(k(F))}}),ee&&s(s.S+s.F*(!H||u(function(){var F=q();return fe([F])!="[null]"||fe({a:F})!="{}"||fe(Object(F))!="{}"})),"JSON",{stringify:function(F){for(var U,re,pe=[F],de=1;arguments.length>de;)pe.push(arguments[de++]);if(re=U=pe[1],(y(U)||F!==void 0)&&!se(F))return m(U)||(U=function(he,_e){if(typeof re=="function"&&(_e=re.call(this,he,_e)),!se(_e))return _e}),pe[1]=U,fe.apply(ee,pe)}}),q.prototype[V]||r(4)(q.prototype,V,q.prototype.valueOf),c(q,"Symbol"),c(Math,"Math",!0),c(t.JSON,"JSON",!0)},function(e,n,r){r(29)("asyncIterator")},function(e,n,r){r(29)("observable")},function(e,n,r){r(100);for(var t=r(1),o=r(4),i=r(21),s=r(7)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<a.length;l++){var u=a[l],f=t[u],c=f&&f.prototype;c&&!c[s]&&o(c,s,u),i[u]=i.Array}},function(e,n,r){n=e.exports=r(15)(!1),n.push([e.i,`
.auto-textarea-wrapper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: normal;
}
.auto-textarea-wrapper .auto-textarea-block {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word !important;
  visibility: hidden;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 100%;
}
.auto-textarea-wrapper .auto-textarea-input {
  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
  color: #2c3e50;
}
.auto-textarea-wrapper .auto-textarea-input.no-border {
  outline: 0 none;
  border: none !important;
}
.auto-textarea-wrapper .auto-textarea-input.no-resize {
  resize: none;
}
`,""])},function(e,n,r){n=e.exports=r(15)(!1),n.push([e.i,`
.op-icon.dropdown-wrapper.dropdown[data-v-548e2160] {
  position: relative;
}
.op-icon.dropdown-wrapper.dropdown[type=button][data-v-548e2160] {
  -webkit-appearance: unset;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown[data-v-548e2160] {
  position: absolute;
  display: block;
  background: #fff;
  top: 32px;
  left: -45px;
  min-width: 130px;
  z-index: 1600;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown .dropdown-item[data-v-548e2160]:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown .dropdown-item[data-v-548e2160]:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.op-header[data-v-548e2160] {
  left: -30px;
  min-width: 90px;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-enter-active[data-v-548e2160],
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-leave-active[data-v-548e2160] {
  opacity: 1;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-enter[data-v-548e2160],
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-leave-active[data-v-548e2160] {
  opacity: 0;
}
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.transition[data-v-548e2160],
.op-icon.dropdown-wrapper.dropdown .popup-dropdown.transition .dropdown-item[data-v-548e2160] {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-item[data-v-548e2160] {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #606266;
  position: relative;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-item[data-v-548e2160]:hover {
  color: #303133;
  background-color: #e9e9eb;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-item input[data-v-548e2160] {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images[data-v-548e2160] {
  box-sizing: border-box;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images button[data-v-548e2160] {
  position: absolute;
  top: -1px;
  right: 5px;
  font-size: 14px;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images button[data-v-548e2160]:hover {
  color: #f56c6c;
  background-color: transparent;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images span[data-v-548e2160] {
  display: inline-block;
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images:hover .image-show[data-v-548e2160] {
  display: block !important;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images .image-show[data-v-548e2160] {
  display: none;
  position: absolute;
  left: -128px;
  top: 0;
  width: 120px;
  height: 90px;
  object-fit: contain;
  border: 1px solid #f2f6fc;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images .image-show.transition[data-v-548e2160] {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.op-icon.dropdown-wrapper.dropdown .dropdown-images.transition[data-v-548e2160] {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.add-image-link-wrapper[data-v-548e2160] {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1600;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
.add-image-link-wrapper.fade-enter-active[data-v-548e2160],
.add-image-link-wrapper.fade-leave-active[data-v-548e2160] {
  opacity: 1;
}
.add-image-link-wrapper.fade-enter[data-v-548e2160],
.add-image-link-wrapper.fade-leave-active[data-v-548e2160] {
  opacity: 0;
}
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
  position: fixed;
  box-sizing: border-box;
  text-align: center;
  width: 24%;
  left: 38%;
  height: auto;
  padding: 40px;
  top: 25%;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
  z-index: 3;
  background: #fff;
  border-radius: 2px;
}
@media only screen and (max-width: 1500px) {
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
    width: 34%;
    left: 33%;
}
}
@media only screen and (max-width: 1000px) {
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
    width: 50%;
    left: 25%;
}
}
@media only screen and (max-width: 600px) {
.add-image-link-wrapper .add-image-link[data-v-548e2160] {
    width: 80%;
    left: 10%;
}
}
.add-image-link-wrapper .add-image-link i[data-v-548e2160] {
  font-size: 24px;
  position: absolute;
  right: 8px;
  top: 6px;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
}
.add-image-link-wrapper .add-image-link .title[data-v-548e2160] {
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 10px;
  font-weight: 500 !important;
}
.add-image-link-wrapper .add-image-link .input-wrapper[data-v-548e2160] {
  margin-top: 10px;
  width: 80%;
  border: 1px solid #eeece8;
  text-align: left;
  margin-left: 10%;
  height: 35px;
}
.add-image-link-wrapper .add-image-link .input-wrapper input[data-v-548e2160] {
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  width: 90%;
  margin-left: 8px;
  border: none;
  outline: none;
}
.add-image-link-wrapper .add-image-link .op-btn[data-v-548e2160] {
  width: 100px;
  height: 35px;
  display: inline-block;
  margin-top: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 35px;
  opacity: 0.9;
  border-radius: 2px;
  letter-spacing: 1px;
  font-size: 15px;
}
.add-image-link-wrapper .add-image-link .op-btn.sure[data-v-548e2160] {
  background: #2185d0;
  color: #fff;
  margin-left: 5%;
}
.add-image-link-wrapper .add-image-link .op-btn.sure[data-v-548e2160]:hover {
  opacity: 1;
}
.add-image-link-wrapper .add-image-link .op-btn.cancel[data-v-548e2160] {
  border: 1px solid #bcbcbc;
  color: #bcbcbc;
}
.add-image-link-wrapper .add-image-link .op-btn.cancel[data-v-548e2160]:hover {
  color: #000;
}
`,""])},function(e,n,r){n=e.exports=r(15)(!1),n.push([e.i,`
textarea:disabled {
  background-color: #fff;
}
.v-note-wrapper {
  position: relative;
  min-width: 300px;
  min-height: 300px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  background-color: #fff;
  z-index: 1500;
  text-align: left;
  border: 1px solid #f2f6fc;
  border-radius: 4px;
}
.v-note-wrapper.fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0;
  height: auto;
  z-index: 1501;
}
.v-note-wrapper .v-note-op {
  padding: 1px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  white-space: pre-line;
  -webkit-box-flex: 0;
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
  min-height: 40px;
  -webkit-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border-bottom: 1px solid #f2f6fc;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  z-index: 1;
}
.v-note-wrapper .v-note-op .v-left-item,
.v-note-wrapper .v-note-op .v-right-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  min-height: 40px;
  box-sizing: border-box;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon-divider,
.v-note-wrapper .v-note-op .v-right-item .op-icon-divider {
  height: 40px;
  border-left: 1px solid #e5e5e5;
  margin: 0 6px 0 4px;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon,
.v-note-wrapper .v-note-op .v-right-item .op-icon {
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  height: 28px;
  width: 28px;
  margin: 6px 0 5px 0px;
  font-size: 14px;
  padding: 4.5px 6px 5px 3.5px;
  color: #757575;
  border-radius: 5px;
  text-align: center;
  background: none;
  border: none;
  outline: none;
  line-height: 1;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon.dropdown-wrapper,
.v-note-wrapper .v-note-op .v-right-item .op-icon.dropdown-wrapper {
  line-height: 18px;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon.selected,
.v-note-wrapper .v-note-op .v-right-item .op-icon.selected {
  color: rgba(0,0,0,0.8);
  background: #eaeaea;
}
.v-note-wrapper .v-note-op .v-left-item .op-icon:hover,
.v-note-wrapper .v-note-op .v-right-item .op-icon:hover {
  color: rgba(0,0,0,0.8);
  background: #e9e9eb;
}
.v-note-wrapper .v-note-op .v-left-item.transition .op-icon,
.v-note-wrapper .v-note-op .v-right-item.transition .op-icon {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.v-note-wrapper .v-note-op .v-right-item {
  text-align: right;
  padding-right: 6px;
  max-width: 30%;
}
.v-note-wrapper .v-note-op .v-left-item {
  text-align: left;
  padding-left: 6px;
}
.v-note-wrapper .v-note-panel {
  position: relative;
  border-top: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 50%;
      -ms-flex: 0 0 50%;
          flex: 0 0 50%;
  width: 50%;
  padding: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  cursor: text;
  border-bottom-left-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.transition {
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-edit {
  width: 100%;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 100%;
      -ms-flex: 0 0 100%;
          flex: 0 0 100%;
  overflow-y: auto;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-show {
  width: 0;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 0;
      -ms-flex: 0 0 0px;
          flex: 0 0 0;
  display: none;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-div {
  width: 100%;
  padding: 20px 25px;
  box-sizing: border-box;
  outline: 0 none;
  border: none !important;
  color: #2c3e50;
  font-size: 16px;
}
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
  width: 100%;
  padding: 8px 25px 15px 25px;
}
.v-note-wrapper .v-note-panel .v-note-show {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 50%;
      -ms-flex: 0 0 50%;
          flex: 0 0 50%;
  width: 50%;
  overflow-y: auto;
  padding: 0 0;
  -webkit-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}
.v-note-wrapper .v-note-panel .v-note-show.single-show {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 100%;
      -ms-flex: 0 0 100%;
          flex: 0 0 100%;
  width: 100%;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  width: 100%;
  height: 100%;
  padding: 8px 25px 15px 25px;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:hover,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:active,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-track,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style-border-radius::-webkit-scrollbar,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  width: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  background-color: rgba(255,255,255,0.98);
  border-left: 1px solid #f2f6fc;
  border-right: 1px solid #f2f6fc;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.transition {
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
@media only screen and (max-width: 768px) {
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
    width: 50%;
}
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter-active,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active {
  height: 100%;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active {
  height: 0;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #f2f6fc;
  -webkit-box-flex: 0;
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
  line-height: 50px;
  font-size: 16px;
  box-sizing: border-box;
  padding: 0 12px 0 18px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close {
  float: right;
  color: #606266;
  font-size: 18px;
  cursor: pointer;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close:hover {
  color: #303133;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content {
  overflow-y: auto;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  padding: 8px 0;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6 {
  margin: 2px 0;
  font-weight: 500;
  font-size: 17px;
  color: #2185d0;
  cursor: pointer;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 12px;
  border-bottom: none;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5:hover,
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6:hover {
  color: #483d8b;
  -webkit-text-decoration-line: underline;
          text-decoration-line: underline;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2 {
  padding-left: 27px;
  font-size: 17px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3 {
  padding-left: 42px;
  font-size: 17px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4 {
  padding-left: 58px;
  font-size: 15px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5 {
  padding-left: 72px;
  font-size: 15px;
}
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6 {
  padding-left: 87px;
  font-size: 15px;
}
.v-note-wrapper .v-note-read-model {
  position: relative;
  display: none;
  width: 100%;
  height: 100%;
  background: #fbfbfb;
  padding: 30px 8% 50px 8%;
  overflow-y: auto;
  box-sizing: border-box;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-wrapper .v-note-read-model.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-wrapper .v-note-read-model.show {
  display: block;
}
.v-note-wrapper.shadow {
  border: none;
}
.v-note-help-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1600;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
.v-note-help-wrapper.fade-enter-active,
.v-note-help-wrapper.fade-leave-active {
  opacity: 1;
}
.v-note-help-wrapper.fade-enter,
.v-note-help-wrapper.fade-leave-active {
  opacity: 0;
}
.v-note-help-wrapper .v-note-help-content {
  position: relative;
  width: 60%;
  max-width: 800px;
  margin: 30px auto;
  height: 90%;
  min-width: 320px;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
  z-index: 3;
  border: 1px solid #f2f6fc;
}
.v-note-help-wrapper .v-note-help-content.shadow {
  border: none;
  box-shadow: 0 0px 5px rgba(0,0,0,0.157), 0 0px 5px rgba(0,0,0,0.227);
}
.v-note-help-wrapper .v-note-help-content i {
  font-size: 28px;
  position: absolute;
  right: 15px;
  top: 8px;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
}
.v-note-help-wrapper .v-note-help-content i:hover {
  color: #000;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show {
  width: 100%;
  height: 100%;
  font-size: 18px;
  background: #fbfbfb;
  overflow-y: auto;
  padding: 2% 6%;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 0px #808080 inset;
}
.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style-border-radius::-webkit-scrollbar {
  border-bottom-right-radius: 4px;
}
.v-note-img-wrapper {
  position: fixed;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1600;
  -webkit-transition: all 0.1s linear 0s;
  transition: all 0.1s linear 0s;
}
.v-note-img-wrapper.fade-enter-active,
.v-note-img-wrapper.fade-leave-active {
  opacity: 1;
}
.v-note-img-wrapper.fade-enter,
.v-note-img-wrapper.fade-leave-active {
  opacity: 0;
}
.v-note-img-wrapper img {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
      -ms-flex: 0 0 auto;
          flex: 0 0 auto;
  z-index: 3;
}
.v-note-img-wrapper i {
  font-size: 28px;
  position: absolute;
  right: 15px;
  top: 8px;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
}
.v-note-img-wrapper i:hover {
  color: #fff;
}
`,""])},function(e,n,r){n=e.exports=r(15)(!1),n.push([e.i,`
.auto-textarea-wrapper[data-v-7a63e4b3] {
    height: 100%;
}
`,""])},function(e,n,r){function t(l){return l==null}function o(l){var u={};for(var f in l)u[f]=l[f];return u}function i(l){l=o(l||{}),l.whiteList=l.whiteList||s.whiteList,l.onAttr=l.onAttr||s.onAttr,l.onIgnoreAttr=l.onIgnoreAttr||s.onIgnoreAttr,l.safeAttrValue=l.safeAttrValue||s.safeAttrValue,this.options=l}var s=r(51),a=r(112);r(52),i.prototype.process=function(l){if(l=l||"",!(l=l.toString()))return"";var u=this,f=u.options,c=f.whiteList,d=f.onAttr,_=f.onIgnoreAttr,v=f.safeAttrValue;return a(l,function(b,C,m,g,y){var k=c[m],x=!1;if(k===!0?x=k:typeof k=="function"?x=k(g):k instanceof RegExp&&(x=k.test(g)),x!==!0&&(x=!1),g=v(m,g)){var w={position:C,sourcePosition:b,source:y,isWhite:x};if(x){var A=d(m,g,w);return t(A)?m+":"+g:A}var A=_(m,g,w);return t(A)?void 0:A}})},e.exports=i},function(e,n,r){function t(i,s){function a(){if(!u){var b=o.trim(i.slice(f,c)),C=b.indexOf(":");if(C!==-1){var m=o.trim(b.slice(0,C)),g=o.trim(b.slice(C+1));if(m){var y=s(f,d.length,m,g,b);y&&(d+=y+"; ")}}}f=c+1}i=o.trimRight(i),i[i.length-1]!==";"&&(i+=";");for(var l=i.length,u=!1,f=0,c=0,d="";c<l;c++){var _=i[c];if(_==="/"&&i[c+1]==="*"){var v=i.indexOf("*/",c+2);if(v===-1)break;c=v+1,f=c+1,u=!1}else _==="("?u=!0:_===")"?u=!1:_===";"?u||a():_===`
`&&a()}return o.trim(d)}var o=r(52);e.exports=t},function(e,n){},function(e,n){},function(e,n,r){function t(w){return Array.prototype.slice.call(arguments,1).forEach(function(A){A&&Object.keys(A).forEach(function(E){w[E]=A[E]})}),w}function o(w){return Object.prototype.toString.call(w)}function i(w){return o(w)==="[object String]"}function s(w){return o(w)==="[object Object]"}function a(w){return o(w)==="[object RegExp]"}function l(w){return o(w)==="[object Function]"}function u(w){return w.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function f(w){return Object.keys(w||{}).reduce(function(A,E){return A||g.hasOwnProperty(E)},!1)}function c(w){w.__index__=-1,w.__text_cache__=""}function d(w){return function(A,E){var S=A.slice(E);return w.test(S)?S.match(w)[0].length:0}}function _(){return function(w,A){A.normalize(w)}}function v(w){function A(M){return M.replace("%TLDS%",S.src_tlds)}function E(M,G){throw new Error('(LinkifyIt) Invalid schema "'+M+'": '+G)}var S=w.re=r(116)(w.__opts__),O=w.__tlds__.slice();w.onCompile(),w.__tlds_replaced__||O.push(k),O.push(S.src_xn),S.src_tlds=O.join("|"),S.email_fuzzy=RegExp(A(S.tpl_email_fuzzy),"i"),S.link_fuzzy=RegExp(A(S.tpl_link_fuzzy),"i"),S.link_no_ip_fuzzy=RegExp(A(S.tpl_link_no_ip_fuzzy),"i"),S.host_fuzzy_test=RegExp(A(S.tpl_host_fuzzy_test),"i");var P=[];w.__compiled__={},Object.keys(w.__schemas__).forEach(function(M){var G=w.__schemas__[M];if(G!==null){var X={validate:null,link:null};return w.__compiled__[M]=X,s(G)?(a(G.validate)?X.validate=d(G.validate):l(G.validate)?X.validate=G.validate:E(M,G),void(l(G.normalize)?X.normalize=G.normalize:G.normalize?E(M,G):X.normalize=_())):i(G)?void P.push(M):void E(M,G)}}),P.forEach(function(M){w.__compiled__[w.__schemas__[M]]&&(w.__compiled__[M].validate=w.__compiled__[w.__schemas__[M]].validate,w.__compiled__[M].normalize=w.__compiled__[w.__schemas__[M]].normalize)}),w.__compiled__[""]={validate:null,normalize:_()};var L=Object.keys(w.__compiled__).filter(function(M){return M.length>0&&w.__compiled__[M]}).map(u).join("|");w.re.schema_test=RegExp("(^|(?!_)(?:[><\uFF5C]|"+S.src_ZPCc+"))("+L+")","i"),w.re.schema_search=RegExp("(^|(?!_)(?:[><\uFF5C]|"+S.src_ZPCc+"))("+L+")","ig"),w.re.pretest=RegExp("("+w.re.schema_test.source+")|("+w.re.host_fuzzy_test.source+")|@","i"),c(w)}function b(w,A){var E=w.__index__,S=w.__last_index__,O=w.__text_cache__.slice(E,S);this.schema=w.__schema__.toLowerCase(),this.index=E+A,this.lastIndex=S+A,this.raw=O,this.text=O,this.url=O}function C(w,A){var E=new b(w,A);return w.__compiled__[E.schema].normalize(E,w),E}function m(w,A){if(!(this instanceof m))return new m(w,A);A||f(w)&&(A=w,w={}),this.__opts__=t({},g,A),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=t({},y,w),this.__compiled__={},this.__tlds__=x,this.__tlds_replaced__=!1,this.re={},v(this)}var g={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},y={"http:":{validate:function(w,A,E){var S=w.slice(A);return E.re.http||(E.re.http=new RegExp("^\\/\\/"+E.re.src_auth+E.re.src_host_port_strict+E.re.src_path,"i")),E.re.http.test(S)?S.match(E.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(w,A,E){var S=w.slice(A);return E.re.no_http||(E.re.no_http=new RegExp("^"+E.re.src_auth+"(?:localhost|(?:(?:"+E.re.src_domain+")\\.)+"+E.re.src_domain_root+")"+E.re.src_port+E.re.src_host_terminator+E.re.src_path,"i")),E.re.no_http.test(S)?A>=3&&w[A-3]===":"||A>=3&&w[A-3]==="/"?0:S.match(E.re.no_http)[0].length:0}},"mailto:":{validate:function(w,A,E){var S=w.slice(A);return E.re.mailto||(E.re.mailto=new RegExp("^"+E.re.src_email_name+"@"+E.re.src_host_strict,"i")),E.re.mailto.test(S)?S.match(E.re.mailto)[0].length:0}}},k="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",x="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");m.prototype.add=function(w,A){return this.__schemas__[w]=A,v(this),this},m.prototype.set=function(w){return this.__opts__=t(this.__opts__,w),this},m.prototype.test=function(w){if(this.__text_cache__=w,this.__index__=-1,!w.length)return!1;var A,E,S,O,P,L,M,G;if(this.re.schema_test.test(w)){for(M=this.re.schema_search,M.lastIndex=0;(A=M.exec(w))!==null;)if(O=this.testSchemaAt(w,A[2],M.lastIndex)){this.__schema__=A[2],this.__index__=A.index+A[1].length,this.__last_index__=A.index+A[0].length+O;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(G=w.search(this.re.host_fuzzy_test))>=0&&(this.__index__<0||G<this.__index__)&&(E=w.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(P=E.index+E[1].length,(this.__index__<0||P<this.__index__)&&(this.__schema__="",this.__index__=P,this.__last_index__=E.index+E[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&w.indexOf("@")>=0&&(S=w.match(this.re.email_fuzzy))!==null&&(P=S.index+S[1].length,L=S.index+S[0].length,(this.__index__<0||P<this.__index__||P===this.__index__&&L>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=P,this.__last_index__=L)),this.__index__>=0},m.prototype.pretest=function(w){return this.re.pretest.test(w)},m.prototype.testSchemaAt=function(w,A,E){return this.__compiled__[A.toLowerCase()]?this.__compiled__[A.toLowerCase()].validate(w,E,this):0},m.prototype.match=function(w){var A=0,E=[];this.__index__>=0&&this.__text_cache__===w&&(E.push(C(this,A)),A=this.__last_index__);for(var S=A?w.slice(A):w;this.test(S);)E.push(C(this,A)),S=S.slice(this.__last_index__),A+=this.__last_index__;return E.length?E:null},m.prototype.tlds=function(w,A){return w=Array.isArray(w)?w:[w],A?(this.__tlds__=this.__tlds__.concat(w).sort().filter(function(E,S,O){return E!==O[S-1]}).reverse(),v(this),this):(this.__tlds__=w.slice(),this.__tlds_replaced__=!0,v(this),this)},m.prototype.normalize=function(w){w.schema||(w.url="http://"+w.url),w.schema!=="mailto:"||/^mailto:/i.test(w.url)||(w.url="mailto:"+w.url)},m.prototype.onCompile=function(){},e.exports=m},function(e,n,r){e.exports=function(t){var o={};return o.src_Any=r(60).source,o.src_Cc=r(58).source,o.src_Z=r(59).source,o.src_P=r(34).source,o.src_ZPCc=[o.src_Z,o.src_P,o.src_Cc].join("|"),o.src_ZCc=[o.src_Z,o.src_Cc].join("|"),o.src_pseudo_letter="(?:(?![><\uFF5C]|"+o.src_ZPCc+")"+o.src_Any+")",o.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",o.src_auth="(?:(?:(?!"+o.src_ZCc+"|[@/\\[\\]()]).)+@)?",o.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",o.src_host_terminator="(?=$|[><\uFF5C]|"+o.src_ZPCc+")(?!-|_|:\\d|\\.-|\\.(?!$|"+o.src_ZPCc+"))",o.src_path="(?:[/?#](?:(?!"+o.src_ZCc+`|[><\uFF5C]|[()[\\]{}.,"'?!\\-]).|\\[(?:(?!`+o.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+o.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+o.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+o.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+o.src_ZCc+"|[']).)+\\'|\\'(?="+o.src_pseudo_letter+"|[-]).|\\.{2,4}[a-zA-Z0-9%/]|\\.(?!"+o.src_ZCc+"|[.]).|"+(t&&t["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+"\\,(?!"+o.src_ZCc+").|\\!(?!"+o.src_ZCc+"|[!]).|\\?(?!"+o.src_ZCc+"|[?]).)+|\\/)?",o.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',o.src_xn="xn--[a-z0-9\\-]{1,59}",o.src_domain_root="(?:"+o.src_xn+"|"+o.src_pseudo_letter+"{1,63})",o.src_domain="(?:"+o.src_xn+"|(?:"+o.src_pseudo_letter+")|(?:"+o.src_pseudo_letter+"(?:-|"+o.src_pseudo_letter+"){0,61}"+o.src_pseudo_letter+"))",o.src_host="(?:(?:(?:(?:"+o.src_domain+")\\.)*"+o.src_domain+"))",o.tpl_host_fuzzy="(?:"+o.src_ip4+"|(?:(?:(?:"+o.src_domain+")\\.)+(?:%TLDS%)))",o.tpl_host_no_ip_fuzzy="(?:(?:(?:"+o.src_domain+")\\.)+(?:%TLDS%))",o.src_host_strict=o.src_host+o.src_host_terminator,o.tpl_host_fuzzy_strict=o.tpl_host_fuzzy+o.src_host_terminator,o.src_host_port_strict=o.src_host+o.src_port+o.src_host_terminator,o.tpl_host_port_fuzzy_strict=o.tpl_host_fuzzy+o.src_port+o.src_host_terminator,o.tpl_host_port_no_ip_fuzzy_strict=o.tpl_host_no_ip_fuzzy+o.src_port+o.src_host_terminator,o.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+o.src_ZPCc+"|>|$))",o.tpl_email_fuzzy='(^|[><\uFF5C]|"|\\(|'+o.src_ZCc+")("+o.src_email_name+"@"+o.tpl_host_fuzzy_strict+")",o.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+o.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+o.tpl_host_port_fuzzy_strict+o.src_path+")",o.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+o.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+o.tpl_host_port_no_ip_fuzzy_strict+o.src_path+")",o}},function(e,n,r){e.exports=function(t){function o(c,d,_,v){var b,C,m,g,y,k=c.bMarks[d]+c.tShift[d],x=c.eMarks[d];if(k+2>=x||c.src.charCodeAt(k++)!==42||c.src.charCodeAt(k++)!==91)return!1;for(g=k;k<x;k++){if((m=c.src.charCodeAt(k))===91)return!1;if(m===93){y=k;break}m===92&&k++}return!(y<0||c.src.charCodeAt(y+1)!==58)&&(!!v||(b=c.src.slice(g,y).replace(/\\(.)/g,"$1"),C=c.src.slice(y+2,x).trim(),b.length!==0&&C.length!==0&&(c.env.abbreviations||(c.env.abbreviations={}),c.env.abbreviations[":"+b]===void 0&&(c.env.abbreviations[":"+b]=C),c.line=d+1,!0)))}function i(c){var d,_,v,b,C,m,g,y,k,x,w,A,E,S=c.tokens;if(c.env.abbreviations){for(A=new RegExp("(?:"+Object.keys(c.env.abbreviations).map(function(O){return O.substr(1)}).sort(function(O,P){return P.length-O.length}).map(s).join("|")+")"),w="(^|"+u+"|"+f+"|["+l.split("").map(s).join("")+"])("+Object.keys(c.env.abbreviations).map(function(O){return O.substr(1)}).sort(function(O,P){return P.length-O.length}).map(s).join("|")+")($|"+u+"|"+f+"|["+l.split("").map(s).join("")+"])",k=new RegExp(w,"g"),_=0,v=S.length;_<v;_++)if(S[_].type==="inline"){for(b=S[_].children,d=b.length-1;d>=0;d--)if(E=b[d],E.type==="text"&&(y=0,m=E.content,k.lastIndex=0,g=[],A.test(m))){for(;x=k.exec(m);)(x.index>0||x[1].length>0)&&(C=new c.Token("text","",0),C.content=m.slice(y,x.index+x[1].length),g.push(C)),C=new c.Token("abbr_open","abbr",1),C.attrs=[["title",c.env.abbreviations[":"+x[2]]]],g.push(C),C=new c.Token("text","",0),C.content=x[2],g.push(C),C=new c.Token("abbr_close","abbr",-1),g.push(C),k.lastIndex-=x[3].length,y=k.lastIndex;g.length&&(y<m.length&&(C=new c.Token("text","",0),C.content=m.slice(y),g.push(C)),S[_].children=b=a(b,d,g))}}}}var s=t.utils.escapeRE,a=t.utils.arrayReplaceAt,l=" \r\n$+<=>^`|~",u=t.utils.lib.ucmicro.P.source,f=t.utils.lib.ucmicro.Z.source;t.block.ruler.before("reference","abbr_def",o,{alt:["paragraph","reference"]}),t.core.ruler.after("linkify","abbr_replace",i)}},function(e,n,r){e.exports=function(t,o,i){function s(b){return b.trim().split(" ",2)[0]===o}function a(b,C,m,g,y){return b[C].nesting===1&&b[C].attrPush(["class",o]),y.renderToken(b,C,m,g,y)}function l(b,C,m,g){var y,k,x,w,A,E,S,O,P=!1,L=b.bMarks[C]+b.tShift[C],M=b.eMarks[C];if(c!==b.src.charCodeAt(L))return!1;for(y=L+1;y<=M&&f[(y-L)%d]===b.src[y];y++);if((x=Math.floor((y-L)/d))<u||(y-=(y-L)%d,w=b.src.slice(L,y),A=b.src.slice(y,M),!_(A)))return!1;if(g)return!0;for(k=C;!(++k>=m)&&(L=b.bMarks[k]+b.tShift[k],M=b.eMarks[k],!(L<M&&b.sCount[k]<b.blkIndent));)if(c===b.src.charCodeAt(L)&&!(b.sCount[k]-b.blkIndent>=4)){for(y=L+1;y<=M&&f[(y-L)%d]===b.src[y];y++);if(!(Math.floor((y-L)/d)<x||(y-=(y-L)%d,(y=b.skipSpaces(y))<M))){P=!0;break}}return S=b.parentType,O=b.lineMax,b.parentType="container",b.lineMax=k,E=b.push("container_"+o+"_open","div",1),E.markup=w,E.block=!0,E.info=A,E.map=[C,k],b.md.block.tokenize(b,C+1,k),E=b.push("container_"+o+"_close","div",-1),E.markup=b.src.slice(L,y),E.block=!0,b.parentType=S,b.lineMax=O,b.line=k+(P?1:0),!0}i=i||{};var u=3,f=i.marker||":",c=f.charCodeAt(0),d=f.length,_=i.validate||s,v=i.render||a;t.block.ruler.before("fence","container_"+o,l,{alt:["paragraph","reference","blockquote","list"]}),t.renderer.rules["container_"+o+"_open"]=v,t.renderer.rules["container_"+o+"_close"]=v}},function(e,n,r){e.exports=function(t){function o(l,u){var f,c,d=l.bMarks[u]+l.tShift[u],_=l.eMarks[u];return d>=_||(c=l.src.charCodeAt(d++))!==126&&c!==58?-1:(f=l.skipSpaces(d),d===f||f>=_?-1:d)}function i(l,u){var f,c,d=l.level+2;for(f=u+2,c=l.tokens.length-2;f<c;f++)l.tokens[f].level===d&&l.tokens[f].type==="paragraph_open"&&(l.tokens[f+2].hidden=!0,l.tokens[f].hidden=!0,f+=2)}function s(l,u,f,c){var d,_,v,b,C,m,g,y,k,x,w,A,E,S,O,P,L,M,G,X;if(c)return!(l.ddIndent<0)&&o(l,u)>=0;if((k=u+1)>=f||l.isEmpty(k)&&++k>=f||l.sCount[k]<l.blkIndent||(_=o(l,k))<0)return!1;g=l.tokens.length,G=!0,X=l.push("dl_open","dl",1),X.map=m=[u,0],b=u,v=k;e:for(;;){for(M=!1,X=l.push("dt_open","dt",1),X.map=[b,b],X=l.push("inline","",0),X.map=[b,b],X.content=l.getLines(b,b+1,l.blkIndent,!1).trim(),X.children=[],X=l.push("dt_close","dt",-1);;){for(X=l.push("dd_open","dd",1),X.map=C=[k,0],L=_,y=l.eMarks[v],x=l.sCount[v]+_-(l.bMarks[v]+l.tShift[v]);L<y&&(d=l.src.charCodeAt(L),a(d));)d===9?x+=4-x%4:x++,L++;if(_=L,P=l.tight,w=l.ddIndent,A=l.blkIndent,O=l.tShift[v],S=l.sCount[v],E=l.parentType,l.blkIndent=l.ddIndent=l.sCount[v]+2,l.tShift[v]=_-l.bMarks[v],l.sCount[v]=x,l.tight=!0,l.parentType="deflist",l.md.block.tokenize(l,v,f,!0),l.tight&&!M||(G=!1),M=l.line-v>1&&l.isEmpty(l.line-1),l.tShift[v]=O,l.sCount[v]=S,l.tight=P,l.parentType=E,l.blkIndent=A,l.ddIndent=w,X=l.push("dd_close","dd",-1),C[1]=k=l.line,k>=f||l.sCount[k]<l.blkIndent)break e;if((_=o(l,k))<0)break;v=k}if(k>=f||(b=k,l.isEmpty(b))||l.sCount[b]<l.blkIndent||(v=b+1)>=f||(l.isEmpty(v)&&v++,v>=f)||l.sCount[v]<l.blkIndent||(_=o(l,v))<0)break}return X=l.push("dl_close","dl",-1),m[1]=k,l.line=k,G&&i(l,g),!0}var a=t.utils.isSpace;t.block.ruler.before("paragraph","deflist",s,{alt:["paragraph","reference","blockquote"]})}},function(e,n,r){var t=r(121),o=r(122),i=r(124),s=r(125),a=r(123);e.exports=function(l,u){var f={defs:t,shortcuts:o,enabled:[]},c=a(l.utils.assign({},f,u||{}));l.renderer.rules.emoji=i,l.core.ruler.push("emoji",s(l,c.defs,c.shortcuts,c.scanRE,c.replaceRE))}},function(e,n){e.exports={100:"\u{1F4AF}",1234:"\u{1F522}",grinning:"\u{1F600}",smiley:"\u{1F603}",smile:"\u{1F604}",grin:"\u{1F601}",laughing:"\u{1F606}",satisfied:"\u{1F606}",sweat_smile:"\u{1F605}",joy:"\u{1F602}",rofl:"\u{1F923}",relaxed:"\u263A\uFE0F",blush:"\u{1F60A}",innocent:"\u{1F607}",slightly_smiling_face:"\u{1F642}",upside_down_face:"\u{1F643}",wink:"\u{1F609}",relieved:"\u{1F60C}",heart_eyes:"\u{1F60D}",kissing_heart:"\u{1F618}",kissing:"\u{1F617}",kissing_smiling_eyes:"\u{1F619}",kissing_closed_eyes:"\u{1F61A}",yum:"\u{1F60B}",stuck_out_tongue_winking_eye:"\u{1F61C}",stuck_out_tongue_closed_eyes:"\u{1F61D}",stuck_out_tongue:"\u{1F61B}",money_mouth_face:"\u{1F911}",hugs:"\u{1F917}",nerd_face:"\u{1F913}",sunglasses:"\u{1F60E}",clown_face:"\u{1F921}",cowboy_hat_face:"\u{1F920}",smirk:"\u{1F60F}",unamused:"\u{1F612}",disappointed:"\u{1F61E}",pensive:"\u{1F614}",worried:"\u{1F61F}",confused:"\u{1F615}",slightly_frowning_face:"\u{1F641}",frowning_face:"\u2639\uFE0F",persevere:"\u{1F623}",confounded:"\u{1F616}",tired_face:"\u{1F62B}",weary:"\u{1F629}",triumph:"\u{1F624}",angry:"\u{1F620}",rage:"\u{1F621}",pout:"\u{1F621}",no_mouth:"\u{1F636}",neutral_face:"\u{1F610}",expressionless:"\u{1F611}",hushed:"\u{1F62F}",frowning:"\u{1F626}",anguished:"\u{1F627}",open_mouth:"\u{1F62E}",astonished:"\u{1F632}",dizzy_face:"\u{1F635}",flushed:"\u{1F633}",scream:"\u{1F631}",fearful:"\u{1F628}",cold_sweat:"\u{1F630}",cry:"\u{1F622}",disappointed_relieved:"\u{1F625}",drooling_face:"\u{1F924}",sob:"\u{1F62D}",sweat:"\u{1F613}",sleepy:"\u{1F62A}",sleeping:"\u{1F634}",roll_eyes:"\u{1F644}",thinking:"\u{1F914}",lying_face:"\u{1F925}",grimacing:"\u{1F62C}",zipper_mouth_face:"\u{1F910}",nauseated_face:"\u{1F922}",sneezing_face:"\u{1F927}",mask:"\u{1F637}",face_with_thermometer:"\u{1F912}",face_with_head_bandage:"\u{1F915}",smiling_imp:"\u{1F608}",imp:"\u{1F47F}",japanese_ogre:"\u{1F479}",japanese_goblin:"\u{1F47A}",hankey:"\u{1F4A9}",poop:"\u{1F4A9}",shit:"\u{1F4A9}",ghost:"\u{1F47B}",skull:"\u{1F480}",skull_and_crossbones:"\u2620\uFE0F",alien:"\u{1F47D}",space_invader:"\u{1F47E}",robot:"\u{1F916}",jack_o_lantern:"\u{1F383}",smiley_cat:"\u{1F63A}",smile_cat:"\u{1F638}",joy_cat:"\u{1F639}",heart_eyes_cat:"\u{1F63B}",smirk_cat:"\u{1F63C}",kissing_cat:"\u{1F63D}",scream_cat:"\u{1F640}",crying_cat_face:"\u{1F63F}",pouting_cat:"\u{1F63E}",open_hands:"\u{1F450}",raised_hands:"\u{1F64C}",clap:"\u{1F44F}",pray:"\u{1F64F}",handshake:"\u{1F91D}","+1":"\u{1F44D}",thumbsup:"\u{1F44D}","-1":"\u{1F44E}",thumbsdown:"\u{1F44E}",fist_oncoming:"\u{1F44A}",facepunch:"\u{1F44A}",punch:"\u{1F44A}",fist_raised:"\u270A",fist:"\u270A",fist_left:"\u{1F91B}",fist_right:"\u{1F91C}",crossed_fingers:"\u{1F91E}",v:"\u270C\uFE0F",metal:"\u{1F918}",ok_hand:"\u{1F44C}",point_left:"\u{1F448}",point_right:"\u{1F449}",point_up_2:"\u{1F446}",point_down:"\u{1F447}",point_up:"\u261D\uFE0F",hand:"\u270B",raised_hand:"\u270B",raised_back_of_hand:"\u{1F91A}",raised_hand_with_fingers_splayed:"\u{1F590}",vulcan_salute:"\u{1F596}",wave:"\u{1F44B}",call_me_hand:"\u{1F919}",muscle:"\u{1F4AA}",middle_finger:"\u{1F595}",fu:"\u{1F595}",writing_hand:"\u270D\uFE0F",selfie:"\u{1F933}",nail_care:"\u{1F485}",ring:"\u{1F48D}",lipstick:"\u{1F484}",kiss:"\u{1F48B}",lips:"\u{1F444}",tongue:"\u{1F445}",ear:"\u{1F442}",nose:"\u{1F443}",footprints:"\u{1F463}",eye:"\u{1F441}",eyes:"\u{1F440}",speaking_head:"\u{1F5E3}",bust_in_silhouette:"\u{1F464}",busts_in_silhouette:"\u{1F465}",baby:"\u{1F476}",boy:"\u{1F466}",girl:"\u{1F467}",man:"\u{1F468}",woman:"\u{1F469}",blonde_woman:"\u{1F471}\u200D\u2640",blonde_man:"\u{1F471}",person_with_blond_hair:"\u{1F471}",older_man:"\u{1F474}",older_woman:"\u{1F475}",man_with_gua_pi_mao:"\u{1F472}",woman_with_turban:"\u{1F473}\u200D\u2640",man_with_turban:"\u{1F473}",policewoman:"\u{1F46E}\u200D\u2640",policeman:"\u{1F46E}",cop:"\u{1F46E}",construction_worker_woman:"\u{1F477}\u200D\u2640",construction_worker_man:"\u{1F477}",construction_worker:"\u{1F477}",guardswoman:"\u{1F482}\u200D\u2640",guardsman:"\u{1F482}",female_detective:"\u{1F575}\uFE0F\u200D\u2640\uFE0F",male_detective:"\u{1F575}",detective:"\u{1F575}",woman_health_worker:"\u{1F469}\u200D\u2695",man_health_worker:"\u{1F468}\u200D\u2695",woman_farmer:"\u{1F469}\u200D\u{1F33E}",man_farmer:"\u{1F468}\u200D\u{1F33E}",woman_cook:"\u{1F469}\u200D\u{1F373}",man_cook:"\u{1F468}\u200D\u{1F373}",woman_student:"\u{1F469}\u200D\u{1F393}",man_student:"\u{1F468}\u200D\u{1F393}",woman_singer:"\u{1F469}\u200D\u{1F3A4}",man_singer:"\u{1F468}\u200D\u{1F3A4}",woman_teacher:"\u{1F469}\u200D\u{1F3EB}",man_teacher:"\u{1F468}\u200D\u{1F3EB}",woman_factory_worker:"\u{1F469}\u200D\u{1F3ED}",man_factory_worker:"\u{1F468}\u200D\u{1F3ED}",woman_technologist:"\u{1F469}\u200D\u{1F4BB}",man_technologist:"\u{1F468}\u200D\u{1F4BB}",woman_office_worker:"\u{1F469}\u200D\u{1F4BC}",man_office_worker:"\u{1F468}\u200D\u{1F4BC}",woman_mechanic:"\u{1F469}\u200D\u{1F527}",man_mechanic:"\u{1F468}\u200D\u{1F527}",woman_scientist:"\u{1F469}\u200D\u{1F52C}",man_scientist:"\u{1F468}\u200D\u{1F52C}",woman_artist:"\u{1F469}\u200D\u{1F3A8}",man_artist:"\u{1F468}\u200D\u{1F3A8}",woman_firefighter:"\u{1F469}\u200D\u{1F692}",man_firefighter:"\u{1F468}\u200D\u{1F692}",woman_pilot:"\u{1F469}\u200D\u2708",man_pilot:"\u{1F468}\u200D\u2708",woman_astronaut:"\u{1F469}\u200D\u{1F680}",man_astronaut:"\u{1F468}\u200D\u{1F680}",woman_judge:"\u{1F469}\u200D\u2696",man_judge:"\u{1F468}\u200D\u2696",mrs_claus:"\u{1F936}",santa:"\u{1F385}",princess:"\u{1F478}",prince:"\u{1F934}",bride_with_veil:"\u{1F470}",man_in_tuxedo:"\u{1F935}",angel:"\u{1F47C}",pregnant_woman:"\u{1F930}",bowing_woman:"\u{1F647}\u200D\u2640",bowing_man:"\u{1F647}",bow:"\u{1F647}",tipping_hand_woman:"\u{1F481}",information_desk_person:"\u{1F481}",sassy_woman:"\u{1F481}",tipping_hand_man:"\u{1F481}\u200D\u2642",sassy_man:"\u{1F481}\u200D\u2642",no_good_woman:"\u{1F645}",no_good:"\u{1F645}",ng_woman:"\u{1F645}",no_good_man:"\u{1F645}\u200D\u2642",ng_man:"\u{1F645}\u200D\u2642",ok_woman:"\u{1F646}",ok_man:"\u{1F646}\u200D\u2642",raising_hand_woman:"\u{1F64B}",raising_hand:"\u{1F64B}",raising_hand_man:"\u{1F64B}\u200D\u2642",woman_facepalming:"\u{1F926}\u200D\u2640",man_facepalming:"\u{1F926}\u200D\u2642",woman_shrugging:"\u{1F937}\u200D\u2640",man_shrugging:"\u{1F937}\u200D\u2642",pouting_woman:"\u{1F64E}",person_with_pouting_face:"\u{1F64E}",pouting_man:"\u{1F64E}\u200D\u2642",frowning_woman:"\u{1F64D}",person_frowning:"\u{1F64D}",frowning_man:"\u{1F64D}\u200D\u2642",haircut_woman:"\u{1F487}",haircut:"\u{1F487}",haircut_man:"\u{1F487}\u200D\u2642",massage_woman:"\u{1F486}",massage:"\u{1F486}",massage_man:"\u{1F486}\u200D\u2642",business_suit_levitating:"\u{1F574}",dancer:"\u{1F483}",man_dancing:"\u{1F57A}",dancing_women:"\u{1F46F}",dancers:"\u{1F46F}",dancing_men:"\u{1F46F}\u200D\u2642",walking_woman:"\u{1F6B6}\u200D\u2640",walking_man:"\u{1F6B6}",walking:"\u{1F6B6}",running_woman:"\u{1F3C3}\u200D\u2640",running_man:"\u{1F3C3}",runner:"\u{1F3C3}",running:"\u{1F3C3}",couple:"\u{1F46B}",two_women_holding_hands:"\u{1F46D}",two_men_holding_hands:"\u{1F46C}",couple_with_heart_woman_man:"\u{1F491}",couple_with_heart:"\u{1F491}",couple_with_heart_woman_woman:"\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}",couple_with_heart_man_man:"\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}",couplekiss_man_woman:"\u{1F48F}",couplekiss_woman_woman:"\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}",couplekiss_man_man:"\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",family_man_woman_boy:"\u{1F46A}",family:"\u{1F46A}",family_man_woman_girl:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",family_man_woman_girl_boy:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",family_man_woman_boy_boy:"\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",family_man_woman_girl_girl:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",family_woman_woman_boy:"\u{1F469}\u200D\u{1F469}\u200D\u{1F466}",family_woman_woman_girl:"\u{1F469}\u200D\u{1F469}\u200D\u{1F467}",family_woman_woman_girl_boy:"\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",family_woman_woman_boy_boy:"\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",family_woman_woman_girl_girl:"\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",family_man_man_boy:"\u{1F468}\u200D\u{1F468}\u200D\u{1F466}",family_man_man_girl:"\u{1F468}\u200D\u{1F468}\u200D\u{1F467}",family_man_man_girl_boy:"\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",family_man_man_boy_boy:"\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",family_man_man_girl_girl:"\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",family_woman_boy:"\u{1F469}\u200D\u{1F466}",family_woman_girl:"\u{1F469}\u200D\u{1F467}",family_woman_girl_boy:"\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",family_woman_boy_boy:"\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",family_woman_girl_girl:"\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",family_man_boy:"\u{1F468}\u200D\u{1F466}",family_man_girl:"\u{1F468}\u200D\u{1F467}",family_man_girl_boy:"\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",family_man_boy_boy:"\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",family_man_girl_girl:"\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",womans_clothes:"\u{1F45A}",shirt:"\u{1F455}",tshirt:"\u{1F455}",jeans:"\u{1F456}",necktie:"\u{1F454}",dress:"\u{1F457}",bikini:"\u{1F459}",kimono:"\u{1F458}",high_heel:"\u{1F460}",sandal:"\u{1F461}",boot:"\u{1F462}",mans_shoe:"\u{1F45E}",shoe:"\u{1F45E}",athletic_shoe:"\u{1F45F}",womans_hat:"\u{1F452}",tophat:"\u{1F3A9}",mortar_board:"\u{1F393}",crown:"\u{1F451}",rescue_worker_helmet:"\u26D1",school_satchel:"\u{1F392}",pouch:"\u{1F45D}",purse:"\u{1F45B}",handbag:"\u{1F45C}",briefcase:"\u{1F4BC}",eyeglasses:"\u{1F453}",dark_sunglasses:"\u{1F576}",closed_umbrella:"\u{1F302}",open_umbrella:"\u2602\uFE0F",dog:"\u{1F436}",cat:"\u{1F431}",mouse:"\u{1F42D}",hamster:"\u{1F439}",rabbit:"\u{1F430}",fox_face:"\u{1F98A}",bear:"\u{1F43B}",panda_face:"\u{1F43C}",koala:"\u{1F428}",tiger:"\u{1F42F}",lion:"\u{1F981}",cow:"\u{1F42E}",pig:"\u{1F437}",pig_nose:"\u{1F43D}",frog:"\u{1F438}",monkey_face:"\u{1F435}",see_no_evil:"\u{1F648}",hear_no_evil:"\u{1F649}",speak_no_evil:"\u{1F64A}",monkey:"\u{1F412}",chicken:"\u{1F414}",penguin:"\u{1F427}",bird:"\u{1F426}",baby_chick:"\u{1F424}",hatching_chick:"\u{1F423}",hatched_chick:"\u{1F425}",duck:"\u{1F986}",eagle:"\u{1F985}",owl:"\u{1F989}",bat:"\u{1F987}",wolf:"\u{1F43A}",boar:"\u{1F417}",horse:"\u{1F434}",unicorn:"\u{1F984}",bee:"\u{1F41D}",honeybee:"\u{1F41D}",bug:"\u{1F41B}",butterfly:"\u{1F98B}",snail:"\u{1F40C}",shell:"\u{1F41A}",beetle:"\u{1F41E}",ant:"\u{1F41C}",spider:"\u{1F577}",spider_web:"\u{1F578}",turtle:"\u{1F422}",snake:"\u{1F40D}",lizard:"\u{1F98E}",scorpion:"\u{1F982}",crab:"\u{1F980}",squid:"\u{1F991}",octopus:"\u{1F419}",shrimp:"\u{1F990}",tropical_fish:"\u{1F420}",fish:"\u{1F41F}",blowfish:"\u{1F421}",dolphin:"\u{1F42C}",flipper:"\u{1F42C}",shark:"\u{1F988}",whale:"\u{1F433}",whale2:"\u{1F40B}",crocodile:"\u{1F40A}",leopard:"\u{1F406}",tiger2:"\u{1F405}",water_buffalo:"\u{1F403}",ox:"\u{1F402}",cow2:"\u{1F404}",deer:"\u{1F98C}",dromedary_camel:"\u{1F42A}",camel:"\u{1F42B}",elephant:"\u{1F418}",rhinoceros:"\u{1F98F}",gorilla:"\u{1F98D}",racehorse:"\u{1F40E}",pig2:"\u{1F416}",goat:"\u{1F410}",ram:"\u{1F40F}",sheep:"\u{1F411}",dog2:"\u{1F415}",poodle:"\u{1F429}",cat2:"\u{1F408}",rooster:"\u{1F413}",turkey:"\u{1F983}",dove:"\u{1F54A}",rabbit2:"\u{1F407}",mouse2:"\u{1F401}",rat:"\u{1F400}",chipmunk:"\u{1F43F}",feet:"\u{1F43E}",paw_prints:"\u{1F43E}",dragon:"\u{1F409}",dragon_face:"\u{1F432}",cactus:"\u{1F335}",christmas_tree:"\u{1F384}",evergreen_tree:"\u{1F332}",deciduous_tree:"\u{1F333}",palm_tree:"\u{1F334}",seedling:"\u{1F331}",herb:"\u{1F33F}",shamrock:"\u2618\uFE0F",four_leaf_clover:"\u{1F340}",bamboo:"\u{1F38D}",tanabata_tree:"\u{1F38B}",leaves:"\u{1F343}",fallen_leaf:"\u{1F342}",maple_leaf:"\u{1F341}",mushroom:"\u{1F344}",ear_of_rice:"\u{1F33E}",bouquet:"\u{1F490}",tulip:"\u{1F337}",rose:"\u{1F339}",wilted_flower:"\u{1F940}",sunflower:"\u{1F33B}",blossom:"\u{1F33C}",cherry_blossom:"\u{1F338}",hibiscus:"\u{1F33A}",earth_americas:"\u{1F30E}",earth_africa:"\u{1F30D}",earth_asia:"\u{1F30F}",full_moon:"\u{1F315}",waning_gibbous_moon:"\u{1F316}",last_quarter_moon:"\u{1F317}",waning_crescent_moon:"\u{1F318}",new_moon:"\u{1F311}",waxing_crescent_moon:"\u{1F312}",first_quarter_moon:"\u{1F313}",moon:"\u{1F314}",waxing_gibbous_moon:"\u{1F314}",new_moon_with_face:"\u{1F31A}",full_moon_with_face:"\u{1F31D}",sun_with_face:"\u{1F31E}",first_quarter_moon_with_face:"\u{1F31B}",last_quarter_moon_with_face:"\u{1F31C}",crescent_moon:"\u{1F319}",dizzy:"\u{1F4AB}",star:"\u2B50\uFE0F",star2:"\u{1F31F}",sparkles:"\u2728",zap:"\u26A1\uFE0F",fire:"\u{1F525}",boom:"\u{1F4A5}",collision:"\u{1F4A5}",comet:"\u2604",sunny:"\u2600\uFE0F",sun_behind_small_cloud:"\u{1F324}",partly_sunny:"\u26C5\uFE0F",sun_behind_large_cloud:"\u{1F325}",sun_behind_rain_cloud:"\u{1F326}",rainbow:"\u{1F308}",cloud:"\u2601\uFE0F",cloud_with_rain:"\u{1F327}",cloud_with_lightning_and_rain:"\u26C8",cloud_with_lightning:"\u{1F329}",cloud_with_snow:"\u{1F328}",snowman_with_snow:"\u2603\uFE0F",snowman:"\u26C4\uFE0F",snowflake:"\u2744\uFE0F",wind_face:"\u{1F32C}",dash:"\u{1F4A8}",tornado:"\u{1F32A}",fog:"\u{1F32B}",ocean:"\u{1F30A}",droplet:"\u{1F4A7}",sweat_drops:"\u{1F4A6}",umbrella:"\u2614\uFE0F",green_apple:"\u{1F34F}",apple:"\u{1F34E}",pear:"\u{1F350}",tangerine:"\u{1F34A}",orange:"\u{1F34A}",mandarin:"\u{1F34A}",lemon:"\u{1F34B}",banana:"\u{1F34C}",watermelon:"\u{1F349}",grapes:"\u{1F347}",strawberry:"\u{1F353}",melon:"\u{1F348}",cherries:"\u{1F352}",peach:"\u{1F351}",pineapple:"\u{1F34D}",kiwi_fruit:"\u{1F95D}",avocado:"\u{1F951}",tomato:"\u{1F345}",eggplant:"\u{1F346}",cucumber:"\u{1F952}",carrot:"\u{1F955}",corn:"\u{1F33D}",hot_pepper:"\u{1F336}",potato:"\u{1F954}",sweet_potato:"\u{1F360}",chestnut:"\u{1F330}",peanuts:"\u{1F95C}",honey_pot:"\u{1F36F}",croissant:"\u{1F950}",bread:"\u{1F35E}",baguette_bread:"\u{1F956}",cheese:"\u{1F9C0}",egg:"\u{1F95A}",fried_egg:"\u{1F373}",bacon:"\u{1F953}",pancakes:"\u{1F95E}",fried_shrimp:"\u{1F364}",poultry_leg:"\u{1F357}",meat_on_bone:"\u{1F356}",pizza:"\u{1F355}",hotdog:"\u{1F32D}",hamburger:"\u{1F354}",fries:"\u{1F35F}",stuffed_flatbread:"\u{1F959}",taco:"\u{1F32E}",burrito:"\u{1F32F}",green_salad:"\u{1F957}",shallow_pan_of_food:"\u{1F958}",spaghetti:"\u{1F35D}",ramen:"\u{1F35C}",stew:"\u{1F372}",fish_cake:"\u{1F365}",sushi:"\u{1F363}",bento:"\u{1F371}",curry:"\u{1F35B}",rice:"\u{1F35A}",rice_ball:"\u{1F359}",rice_cracker:"\u{1F358}",oden:"\u{1F362}",dango:"\u{1F361}",shaved_ice:"\u{1F367}",ice_cream:"\u{1F368}",icecream:"\u{1F366}",cake:"\u{1F370}",birthday:"\u{1F382}",custard:"\u{1F36E}",lollipop:"\u{1F36D}",candy:"\u{1F36C}",chocolate_bar:"\u{1F36B}",popcorn:"\u{1F37F}",doughnut:"\u{1F369}",cookie:"\u{1F36A}",milk_glass:"\u{1F95B}",baby_bottle:"\u{1F37C}",coffee:"\u2615\uFE0F",tea:"\u{1F375}",sake:"\u{1F376}",beer:"\u{1F37A}",beers:"\u{1F37B}",clinking_glasses:"\u{1F942}",wine_glass:"\u{1F377}",tumbler_glass:"\u{1F943}",cocktail:"\u{1F378}",tropical_drink:"\u{1F379}",champagne:"\u{1F37E}",spoon:"\u{1F944}",fork_and_knife:"\u{1F374}",plate_with_cutlery:"\u{1F37D}",soccer:"\u26BD\uFE0F",basketball:"\u{1F3C0}",football:"\u{1F3C8}",baseball:"\u26BE\uFE0F",tennis:"\u{1F3BE}",volleyball:"\u{1F3D0}",rugby_football:"\u{1F3C9}","8ball":"\u{1F3B1}",ping_pong:"\u{1F3D3}",badminton:"\u{1F3F8}",goal_net:"\u{1F945}",ice_hockey:"\u{1F3D2}",field_hockey:"\u{1F3D1}",cricket:"\u{1F3CF}",golf:"\u26F3\uFE0F",bow_and_arrow:"\u{1F3F9}",fishing_pole_and_fish:"\u{1F3A3}",boxing_glove:"\u{1F94A}",martial_arts_uniform:"\u{1F94B}",ice_skate:"\u26F8",ski:"\u{1F3BF}",skier:"\u26F7",snowboarder:"\u{1F3C2}",weight_lifting_woman:"\u{1F3CB}\uFE0F\u200D\u2640\uFE0F",weight_lifting_man:"\u{1F3CB}",person_fencing:"\u{1F93A}",women_wrestling:"\u{1F93C}\u200D\u2640",men_wrestling:"\u{1F93C}\u200D\u2642",woman_cartwheeling:"\u{1F938}\u200D\u2640",man_cartwheeling:"\u{1F938}\u200D\u2642",basketball_woman:"\u26F9\uFE0F\u200D\u2640\uFE0F",basketball_man:"\u26F9",woman_playing_handball:"\u{1F93E}\u200D\u2640",man_playing_handball:"\u{1F93E}\u200D\u2642",golfing_woman:"\u{1F3CC}\uFE0F\u200D\u2640\uFE0F",golfing_man:"\u{1F3CC}",surfing_woman:"\u{1F3C4}\u200D\u2640",surfing_man:"\u{1F3C4}",surfer:"\u{1F3C4}",swimming_woman:"\u{1F3CA}\u200D\u2640",swimming_man:"\u{1F3CA}",swimmer:"\u{1F3CA}",woman_playing_water_polo:"\u{1F93D}\u200D\u2640",man_playing_water_polo:"\u{1F93D}\u200D\u2642",rowing_woman:"\u{1F6A3}\u200D\u2640",rowing_man:"\u{1F6A3}",rowboat:"\u{1F6A3}",horse_racing:"\u{1F3C7}",biking_woman:"\u{1F6B4}\u200D\u2640",biking_man:"\u{1F6B4}",bicyclist:"\u{1F6B4}",mountain_biking_woman:"\u{1F6B5}\u200D\u2640",mountain_biking_man:"\u{1F6B5}",mountain_bicyclist:"\u{1F6B5}",running_shirt_with_sash:"\u{1F3BD}",medal_sports:"\u{1F3C5}",medal_military:"\u{1F396}","1st_place_medal":"\u{1F947}","2nd_place_medal":"\u{1F948}","3rd_place_medal":"\u{1F949}",trophy:"\u{1F3C6}",rosette:"\u{1F3F5}",reminder_ribbon:"\u{1F397}",ticket:"\u{1F3AB}",tickets:"\u{1F39F}",circus_tent:"\u{1F3AA}",woman_juggling:"\u{1F939}\u200D\u2640",man_juggling:"\u{1F939}\u200D\u2642",performing_arts:"\u{1F3AD}",art:"\u{1F3A8}",clapper:"\u{1F3AC}",microphone:"\u{1F3A4}",headphones:"\u{1F3A7}",musical_score:"\u{1F3BC}",musical_keyboard:"\u{1F3B9}",drum:"\u{1F941}",saxophone:"\u{1F3B7}",trumpet:"\u{1F3BA}",guitar:"\u{1F3B8}",violin:"\u{1F3BB}",game_die:"\u{1F3B2}",dart:"\u{1F3AF}",bowling:"\u{1F3B3}",video_game:"\u{1F3AE}",slot_machine:"\u{1F3B0}",car:"\u{1F697}",red_car:"\u{1F697}",taxi:"\u{1F695}",blue_car:"\u{1F699}",bus:"\u{1F68C}",trolleybus:"\u{1F68E}",racing_car:"\u{1F3CE}",police_car:"\u{1F693}",ambulance:"\u{1F691}",fire_engine:"\u{1F692}",minibus:"\u{1F690}",truck:"\u{1F69A}",articulated_lorry:"\u{1F69B}",tractor:"\u{1F69C}",kick_scooter:"\u{1F6F4}",bike:"\u{1F6B2}",motor_scooter:"\u{1F6F5}",motorcycle:"\u{1F3CD}",rotating_light:"\u{1F6A8}",oncoming_police_car:"\u{1F694}",oncoming_bus:"\u{1F68D}",oncoming_automobile:"\u{1F698}",oncoming_taxi:"\u{1F696}",aerial_tramway:"\u{1F6A1}",mountain_cableway:"\u{1F6A0}",suspension_railway:"\u{1F69F}",railway_car:"\u{1F683}",train:"\u{1F68B}",mountain_railway:"\u{1F69E}",monorail:"\u{1F69D}",bullettrain_side:"\u{1F684}",bullettrain_front:"\u{1F685}",light_rail:"\u{1F688}",steam_locomotive:"\u{1F682}",train2:"\u{1F686}",metro:"\u{1F687}",tram:"\u{1F68A}",station:"\u{1F689}",helicopter:"\u{1F681}",small_airplane:"\u{1F6E9}",airplane:"\u2708\uFE0F",flight_departure:"\u{1F6EB}",flight_arrival:"\u{1F6EC}",rocket:"\u{1F680}",artificial_satellite:"\u{1F6F0}",seat:"\u{1F4BA}",canoe:"\u{1F6F6}",boat:"\u26F5\uFE0F",sailboat:"\u26F5\uFE0F",motor_boat:"\u{1F6E5}",speedboat:"\u{1F6A4}",passenger_ship:"\u{1F6F3}",ferry:"\u26F4",ship:"\u{1F6A2}",anchor:"\u2693\uFE0F",construction:"\u{1F6A7}",fuelpump:"\u26FD\uFE0F",busstop:"\u{1F68F}",vertical_traffic_light:"\u{1F6A6}",traffic_light:"\u{1F6A5}",world_map:"\u{1F5FA}",moyai:"\u{1F5FF}",statue_of_liberty:"\u{1F5FD}",fountain:"\u26F2\uFE0F",tokyo_tower:"\u{1F5FC}",european_castle:"\u{1F3F0}",japanese_castle:"\u{1F3EF}",stadium:"\u{1F3DF}",ferris_wheel:"\u{1F3A1}",roller_coaster:"\u{1F3A2}",carousel_horse:"\u{1F3A0}",parasol_on_ground:"\u26F1",beach_umbrella:"\u{1F3D6}",desert_island:"\u{1F3DD}",mountain:"\u26F0",mountain_snow:"\u{1F3D4}",mount_fuji:"\u{1F5FB}",volcano:"\u{1F30B}",desert:"\u{1F3DC}",camping:"\u{1F3D5}",tent:"\u26FA\uFE0F",railway_track:"\u{1F6E4}",motorway:"\u{1F6E3}",building_construction:"\u{1F3D7}",factory:"\u{1F3ED}",house:"\u{1F3E0}",house_with_garden:"\u{1F3E1}",houses:"\u{1F3D8}",derelict_house:"\u{1F3DA}",office:"\u{1F3E2}",department_store:"\u{1F3EC}",post_office:"\u{1F3E3}",european_post_office:"\u{1F3E4}",hospital:"\u{1F3E5}",bank:"\u{1F3E6}",hotel:"\u{1F3E8}",convenience_store:"\u{1F3EA}",school:"\u{1F3EB}",love_hotel:"\u{1F3E9}",wedding:"\u{1F492}",classical_building:"\u{1F3DB}",church:"\u26EA\uFE0F",mosque:"\u{1F54C}",synagogue:"\u{1F54D}",kaaba:"\u{1F54B}",shinto_shrine:"\u26E9",japan:"\u{1F5FE}",rice_scene:"\u{1F391}",national_park:"\u{1F3DE}",sunrise:"\u{1F305}",sunrise_over_mountains:"\u{1F304}",stars:"\u{1F320}",sparkler:"\u{1F387}",fireworks:"\u{1F386}",city_sunrise:"\u{1F307}",city_sunset:"\u{1F306}",cityscape:"\u{1F3D9}",night_with_stars:"\u{1F303}",milky_way:"\u{1F30C}",bridge_at_night:"\u{1F309}",foggy:"\u{1F301}",watch:"\u231A\uFE0F",iphone:"\u{1F4F1}",calling:"\u{1F4F2}",computer:"\u{1F4BB}",keyboard:"\u2328\uFE0F",desktop_computer:"\u{1F5A5}",printer:"\u{1F5A8}",computer_mouse:"\u{1F5B1}",trackball:"\u{1F5B2}",joystick:"\u{1F579}",clamp:"\u{1F5DC}",minidisc:"\u{1F4BD}",floppy_disk:"\u{1F4BE}",cd:"\u{1F4BF}",dvd:"\u{1F4C0}",vhs:"\u{1F4FC}",camera:"\u{1F4F7}",camera_flash:"\u{1F4F8}",video_camera:"\u{1F4F9}",movie_camera:"\u{1F3A5}",film_projector:"\u{1F4FD}",film_strip:"\u{1F39E}",telephone_receiver:"\u{1F4DE}",phone:"\u260E\uFE0F",telephone:"\u260E\uFE0F",pager:"\u{1F4DF}",fax:"\u{1F4E0}",tv:"\u{1F4FA}",radio:"\u{1F4FB}",studio_microphone:"\u{1F399}",level_slider:"\u{1F39A}",control_knobs:"\u{1F39B}",stopwatch:"\u23F1",timer_clock:"\u23F2",alarm_clock:"\u23F0",mantelpiece_clock:"\u{1F570}",hourglass:"\u231B\uFE0F",hourglass_flowing_sand:"\u23F3",satellite:"\u{1F4E1}",battery:"\u{1F50B}",electric_plug:"\u{1F50C}",bulb:"\u{1F4A1}",flashlight:"\u{1F526}",candle:"\u{1F56F}",wastebasket:"\u{1F5D1}",oil_drum:"\u{1F6E2}",money_with_wings:"\u{1F4B8}",dollar:"\u{1F4B5}",yen:"\u{1F4B4}",euro:"\u{1F4B6}",pound:"\u{1F4B7}",moneybag:"\u{1F4B0}",credit_card:"\u{1F4B3}",gem:"\u{1F48E}",balance_scale:"\u2696\uFE0F",wrench:"\u{1F527}",hammer:"\u{1F528}",hammer_and_pick:"\u2692",hammer_and_wrench:"\u{1F6E0}",pick:"\u26CF",nut_and_bolt:"\u{1F529}",gear:"\u2699\uFE0F",chains:"\u26D3",gun:"\u{1F52B}",bomb:"\u{1F4A3}",hocho:"\u{1F52A}",knife:"\u{1F52A}",dagger:"\u{1F5E1}",crossed_swords:"\u2694\uFE0F",shield:"\u{1F6E1}",smoking:"\u{1F6AC}",coffin:"\u26B0\uFE0F",funeral_urn:"\u26B1\uFE0F",amphora:"\u{1F3FA}",crystal_ball:"\u{1F52E}",prayer_beads:"\u{1F4FF}",barber:"\u{1F488}",alembic:"\u2697\uFE0F",telescope:"\u{1F52D}",microscope:"\u{1F52C}",hole:"\u{1F573}",pill:"\u{1F48A}",syringe:"\u{1F489}",thermometer:"\u{1F321}",toilet:"\u{1F6BD}",potable_water:"\u{1F6B0}",shower:"\u{1F6BF}",bathtub:"\u{1F6C1}",bath:"\u{1F6C0}",bellhop_bell:"\u{1F6CE}",key:"\u{1F511}",old_key:"\u{1F5DD}",door:"\u{1F6AA}",couch_and_lamp:"\u{1F6CB}",bed:"\u{1F6CF}",sleeping_bed:"\u{1F6CC}",framed_picture:"\u{1F5BC}",shopping:"\u{1F6CD}",shopping_cart:"\u{1F6D2}",gift:"\u{1F381}",balloon:"\u{1F388}",flags:"\u{1F38F}",ribbon:"\u{1F380}",confetti_ball:"\u{1F38A}",tada:"\u{1F389}",dolls:"\u{1F38E}",izakaya_lantern:"\u{1F3EE}",lantern:"\u{1F3EE}",wind_chime:"\u{1F390}",email:"\u2709\uFE0F",envelope:"\u2709\uFE0F",envelope_with_arrow:"\u{1F4E9}",incoming_envelope:"\u{1F4E8}","e-mail":"\u{1F4E7}",love_letter:"\u{1F48C}",inbox_tray:"\u{1F4E5}",outbox_tray:"\u{1F4E4}",package:"\u{1F4E6}",label:"\u{1F3F7}",mailbox_closed:"\u{1F4EA}",mailbox:"\u{1F4EB}",mailbox_with_mail:"\u{1F4EC}",mailbox_with_no_mail:"\u{1F4ED}",postbox:"\u{1F4EE}",postal_horn:"\u{1F4EF}",scroll:"\u{1F4DC}",page_with_curl:"\u{1F4C3}",page_facing_up:"\u{1F4C4}",bookmark_tabs:"\u{1F4D1}",bar_chart:"\u{1F4CA}",chart_with_upwards_trend:"\u{1F4C8}",chart_with_downwards_trend:"\u{1F4C9}",spiral_notepad:"\u{1F5D2}",spiral_calendar:"\u{1F5D3}",calendar:"\u{1F4C6}",date:"\u{1F4C5}",card_index:"\u{1F4C7}",card_file_box:"\u{1F5C3}",ballot_box:"\u{1F5F3}",file_cabinet:"\u{1F5C4}",clipboard:"\u{1F4CB}",file_folder:"\u{1F4C1}",open_file_folder:"\u{1F4C2}",card_index_dividers:"\u{1F5C2}",newspaper_roll:"\u{1F5DE}",newspaper:"\u{1F4F0}",notebook:"\u{1F4D3}",notebook_with_decorative_cover:"\u{1F4D4}",ledger:"\u{1F4D2}",closed_book:"\u{1F4D5}",green_book:"\u{1F4D7}",blue_book:"\u{1F4D8}",orange_book:"\u{1F4D9}",books:"\u{1F4DA}",book:"\u{1F4D6}",open_book:"\u{1F4D6}",bookmark:"\u{1F516}",link:"\u{1F517}",paperclip:"\u{1F4CE}",paperclips:"\u{1F587}",triangular_ruler:"\u{1F4D0}",straight_ruler:"\u{1F4CF}",pushpin:"\u{1F4CC}",round_pushpin:"\u{1F4CD}",scissors:"\u2702\uFE0F",pen:"\u{1F58A}",fountain_pen:"\u{1F58B}",black_nib:"\u2712\uFE0F",paintbrush:"\u{1F58C}",crayon:"\u{1F58D}",memo:"\u{1F4DD}",pencil:"\u{1F4DD}",pencil2:"\u270F\uFE0F",mag:"\u{1F50D}",mag_right:"\u{1F50E}",lock_with_ink_pen:"\u{1F50F}",closed_lock_with_key:"\u{1F510}",lock:"\u{1F512}",unlock:"\u{1F513}",heart:"\u2764\uFE0F",yellow_heart:"\u{1F49B}",green_heart:"\u{1F49A}",blue_heart:"\u{1F499}",purple_heart:"\u{1F49C}",black_heart:"\u{1F5A4}",broken_heart:"\u{1F494}",heavy_heart_exclamation:"\u2763\uFE0F",two_hearts:"\u{1F495}",revolving_hearts:"\u{1F49E}",heartbeat:"\u{1F493}",heartpulse:"\u{1F497}",sparkling_heart:"\u{1F496}",cupid:"\u{1F498}",gift_heart:"\u{1F49D}",heart_decoration:"\u{1F49F}",peace_symbol:"\u262E\uFE0F",latin_cross:"\u271D\uFE0F",star_and_crescent:"\u262A\uFE0F",om:"\u{1F549}",wheel_of_dharma:"\u2638\uFE0F",star_of_david:"\u2721\uFE0F",six_pointed_star:"\u{1F52F}",menorah:"\u{1F54E}",yin_yang:"\u262F\uFE0F",orthodox_cross:"\u2626\uFE0F",place_of_worship:"\u{1F6D0}",ophiuchus:"\u26CE",aries:"\u2648\uFE0F",taurus:"\u2649\uFE0F",gemini:"\u264A\uFE0F",cancer:"\u264B\uFE0F",leo:"\u264C\uFE0F",virgo:"\u264D\uFE0F",libra:"\u264E\uFE0F",scorpius:"\u264F\uFE0F",sagittarius:"\u2650\uFE0F",capricorn:"\u2651\uFE0F",aquarius:"\u2652\uFE0F",pisces:"\u2653\uFE0F",id:"\u{1F194}",atom_symbol:"\u269B\uFE0F",accept:"\u{1F251}",radioactive:"\u2622\uFE0F",biohazard:"\u2623\uFE0F",mobile_phone_off:"\u{1F4F4}",vibration_mode:"\u{1F4F3}",eight_pointed_black_star:"\u2734\uFE0F",vs:"\u{1F19A}",white_flower:"\u{1F4AE}",ideograph_advantage:"\u{1F250}",secret:"\u3299\uFE0F",congratulations:"\u3297\uFE0F",u6e80:"\u{1F235}",a:"\u{1F170}\uFE0F",b:"\u{1F171}\uFE0F",ab:"\u{1F18E}",cl:"\u{1F191}",o2:"\u{1F17E}\uFE0F",sos:"\u{1F198}",x:"\u274C",o:"\u2B55\uFE0F",stop_sign:"\u{1F6D1}",no_entry:"\u26D4\uFE0F",name_badge:"\u{1F4DB}",no_entry_sign:"\u{1F6AB}",anger:"\u{1F4A2}",hotsprings:"\u2668\uFE0F",no_pedestrians:"\u{1F6B7}",do_not_litter:"\u{1F6AF}",no_bicycles:"\u{1F6B3}","non-potable_water":"\u{1F6B1}",underage:"\u{1F51E}",no_mobile_phones:"\u{1F4F5}",no_smoking:"\u{1F6AD}",exclamation:"\u2757\uFE0F",heavy_exclamation_mark:"\u2757\uFE0F",grey_exclamation:"\u2755",question:"\u2753",grey_question:"\u2754",bangbang:"\u203C\uFE0F",interrobang:"\u2049\uFE0F",low_brightness:"\u{1F505}",high_brightness:"\u{1F506}",part_alternation_mark:"\u303D\uFE0F",warning:"\u26A0\uFE0F",children_crossing:"\u{1F6B8}",trident:"\u{1F531}",fleur_de_lis:"\u269C\uFE0F",beginner:"\u{1F530}",recycle:"\u267B\uFE0F",white_check_mark:"\u2705",chart:"\u{1F4B9}",sparkle:"\u2747\uFE0F",eight_spoked_asterisk:"\u2733\uFE0F",negative_squared_cross_mark:"\u274E",globe_with_meridians:"\u{1F310}",diamond_shape_with_a_dot_inside:"\u{1F4A0}",m:"\u24C2\uFE0F",cyclone:"\u{1F300}",zzz:"\u{1F4A4}",atm:"\u{1F3E7}",wc:"\u{1F6BE}",wheelchair:"\u267F\uFE0F",parking:"\u{1F17F}\uFE0F",sa:"\u{1F202}\uFE0F",passport_control:"\u{1F6C2}",customs:"\u{1F6C3}",baggage_claim:"\u{1F6C4}",left_luggage:"\u{1F6C5}",mens:"\u{1F6B9}",womens:"\u{1F6BA}",baby_symbol:"\u{1F6BC}",restroom:"\u{1F6BB}",put_litter_in_its_place:"\u{1F6AE}",cinema:"\u{1F3A6}",signal_strength:"\u{1F4F6}",koko:"\u{1F201}",symbols:"\u{1F523}",information_source:"\u2139\uFE0F",abc:"\u{1F524}",abcd:"\u{1F521}",capital_abcd:"\u{1F520}",ng:"\u{1F196}",ok:"\u{1F197}",up:"\u{1F199}",cool:"\u{1F192}",new:"\u{1F195}",free:"\u{1F193}",zero:"0\uFE0F\u20E3",one:"1\uFE0F\u20E3",two:"2\uFE0F\u20E3",three:"3\uFE0F\u20E3",four:"4\uFE0F\u20E3",five:"5\uFE0F\u20E3",six:"6\uFE0F\u20E3",seven:"7\uFE0F\u20E3",eight:"8\uFE0F\u20E3",nine:"9\uFE0F\u20E3",keycap_ten:"\u{1F51F}",hash:"#\uFE0F\u20E3",asterisk:"*\uFE0F\u20E3",arrow_forward:"\u25B6\uFE0F",pause_button:"\u23F8",play_or_pause_button:"\u23EF",stop_button:"\u23F9",record_button:"\u23FA",next_track_button:"\u23ED",previous_track_button:"\u23EE",fast_forward:"\u23E9",rewind:"\u23EA",arrow_double_up:"\u23EB",arrow_double_down:"\u23EC",arrow_backward:"\u25C0\uFE0F",arrow_up_small:"\u{1F53C}",arrow_down_small:"\u{1F53D}",arrow_right:"\u27A1\uFE0F",arrow_left:"\u2B05\uFE0F",arrow_up:"\u2B06\uFE0F",arrow_down:"\u2B07\uFE0F",arrow_upper_right:"\u2197\uFE0F",arrow_lower_right:"\u2198\uFE0F",arrow_lower_left:"\u2199\uFE0F",arrow_upper_left:"\u2196\uFE0F",arrow_up_down:"\u2195\uFE0F",left_right_arrow:"\u2194\uFE0F",arrow_right_hook:"\u21AA\uFE0F",leftwards_arrow_with_hook:"\u21A9\uFE0F",arrow_heading_up:"\u2934\uFE0F",arrow_heading_down:"\u2935\uFE0F",twisted_rightwards_arrows:"\u{1F500}",repeat:"\u{1F501}",repeat_one:"\u{1F502}",arrows_counterclockwise:"\u{1F504}",arrows_clockwise:"\u{1F503}",musical_note:"\u{1F3B5}",notes:"\u{1F3B6}",heavy_plus_sign:"\u2795",heavy_minus_sign:"\u2796",heavy_division_sign:"\u2797",heavy_multiplication_x:"\u2716\uFE0F",heavy_dollar_sign:"\u{1F4B2}",currency_exchange:"\u{1F4B1}",tm:"\u2122\uFE0F",copyright:"\xA9\uFE0F",registered:"\xAE\uFE0F",wavy_dash:"\u3030\uFE0F",curly_loop:"\u27B0",loop:"\u27BF",end:"\u{1F51A}",back:"\u{1F519}",on:"\u{1F51B}",top:"\u{1F51D}",soon:"\u{1F51C}",heavy_check_mark:"\u2714\uFE0F",ballot_box_with_check:"\u2611\uFE0F",radio_button:"\u{1F518}",white_circle:"\u26AA\uFE0F",black_circle:"\u26AB\uFE0F",red_circle:"\u{1F534}",large_blue_circle:"\u{1F535}",small_red_triangle:"\u{1F53A}",small_red_triangle_down:"\u{1F53B}",small_orange_diamond:"\u{1F538}",small_blue_diamond:"\u{1F539}",large_orange_diamond:"\u{1F536}",large_blue_diamond:"\u{1F537}",white_square_button:"\u{1F533}",black_square_button:"\u{1F532}",black_small_square:"\u25AA\uFE0F",white_small_square:"\u25AB\uFE0F",black_medium_small_square:"\u25FE\uFE0F",white_medium_small_square:"\u25FD\uFE0F",black_medium_square:"\u25FC\uFE0F",white_medium_square:"\u25FB\uFE0F",black_large_square:"\u2B1B\uFE0F",white_large_square:"\u2B1C\uFE0F",speaker:"\u{1F508}",mute:"\u{1F507}",sound:"\u{1F509}",loud_sound:"\u{1F50A}",bell:"\u{1F514}",no_bell:"\u{1F515}",mega:"\u{1F4E3}",loudspeaker:"\u{1F4E2}",eye_speech_bubble:"\u{1F441}\u200D\u{1F5E8}",speech_balloon:"\u{1F4AC}",thought_balloon:"\u{1F4AD}",right_anger_bubble:"\u{1F5EF}",spades:"\u2660\uFE0F",clubs:"\u2663\uFE0F",hearts:"\u2665\uFE0F",diamonds:"\u2666\uFE0F",black_joker:"\u{1F0CF}",flower_playing_cards:"\u{1F3B4}",mahjong:"\u{1F004}\uFE0F",clock1:"\u{1F550}",clock2:"\u{1F551}",clock3:"\u{1F552}",clock4:"\u{1F553}",clock5:"\u{1F554}",clock6:"\u{1F555}",clock7:"\u{1F556}",clock8:"\u{1F557}",clock9:"\u{1F558}",clock10:"\u{1F559}",clock11:"\u{1F55A}",clock12:"\u{1F55B}",clock130:"\u{1F55C}",clock230:"\u{1F55D}",clock330:"\u{1F55E}",clock430:"\u{1F55F}",clock530:"\u{1F560}",clock630:"\u{1F561}",clock730:"\u{1F562}",clock830:"\u{1F563}",clock930:"\u{1F564}",clock1030:"\u{1F565}",clock1130:"\u{1F566}",clock1230:"\u{1F567}",white_flag:"\u{1F3F3}\uFE0F",black_flag:"\u{1F3F4}",checkered_flag:"\u{1F3C1}",triangular_flag_on_post:"\u{1F6A9}",rainbow_flag:"\u{1F3F3}\uFE0F\u200D\u{1F308}",afghanistan:"\u{1F1E6}\u{1F1EB}",aland_islands:"\u{1F1E6}\u{1F1FD}",albania:"\u{1F1E6}\u{1F1F1}",algeria:"\u{1F1E9}\u{1F1FF}",american_samoa:"\u{1F1E6}\u{1F1F8}",andorra:"\u{1F1E6}\u{1F1E9}",angola:"\u{1F1E6}\u{1F1F4}",anguilla:"\u{1F1E6}\u{1F1EE}",antarctica:"\u{1F1E6}\u{1F1F6}",antigua_barbuda:"\u{1F1E6}\u{1F1EC}",argentina:"\u{1F1E6}\u{1F1F7}",armenia:"\u{1F1E6}\u{1F1F2}",aruba:"\u{1F1E6}\u{1F1FC}",australia:"\u{1F1E6}\u{1F1FA}",austria:"\u{1F1E6}\u{1F1F9}",azerbaijan:"\u{1F1E6}\u{1F1FF}",bahamas:"\u{1F1E7}\u{1F1F8}",bahrain:"\u{1F1E7}\u{1F1ED}",bangladesh:"\u{1F1E7}\u{1F1E9}",barbados:"\u{1F1E7}\u{1F1E7}",belarus:"\u{1F1E7}\u{1F1FE}",belgium:"\u{1F1E7}\u{1F1EA}",belize:"\u{1F1E7}\u{1F1FF}",benin:"\u{1F1E7}\u{1F1EF}",bermuda:"\u{1F1E7}\u{1F1F2}",bhutan:"\u{1F1E7}\u{1F1F9}",bolivia:"\u{1F1E7}\u{1F1F4}",caribbean_netherlands:"\u{1F1E7}\u{1F1F6}",bosnia_herzegovina:"\u{1F1E7}\u{1F1E6}",botswana:"\u{1F1E7}\u{1F1FC}",brazil:"\u{1F1E7}\u{1F1F7}",british_indian_ocean_territory:"\u{1F1EE}\u{1F1F4}",british_virgin_islands:"\u{1F1FB}\u{1F1EC}",brunei:"\u{1F1E7}\u{1F1F3}",bulgaria:"\u{1F1E7}\u{1F1EC}",burkina_faso:"\u{1F1E7}\u{1F1EB}",burundi:"\u{1F1E7}\u{1F1EE}",cape_verde:"\u{1F1E8}\u{1F1FB}",cambodia:"\u{1F1F0}\u{1F1ED}",cameroon:"\u{1F1E8}\u{1F1F2}",canada:"\u{1F1E8}\u{1F1E6}",canary_islands:"\u{1F1EE}\u{1F1E8}",cayman_islands:"\u{1F1F0}\u{1F1FE}",central_african_republic:"\u{1F1E8}\u{1F1EB}",chad:"\u{1F1F9}\u{1F1E9}",chile:"\u{1F1E8}\u{1F1F1}",cn:"\u{1F1E8}\u{1F1F3}",christmas_island:"\u{1F1E8}\u{1F1FD}",cocos_islands:"\u{1F1E8}\u{1F1E8}",colombia:"\u{1F1E8}\u{1F1F4}",comoros:"\u{1F1F0}\u{1F1F2}",congo_brazzaville:"\u{1F1E8}\u{1F1EC}",congo_kinshasa:"\u{1F1E8}\u{1F1E9}",cook_islands:"\u{1F1E8}\u{1F1F0}",costa_rica:"\u{1F1E8}\u{1F1F7}",cote_divoire:"\u{1F1E8}\u{1F1EE}",croatia:"\u{1F1ED}\u{1F1F7}",cuba:"\u{1F1E8}\u{1F1FA}",curacao:"\u{1F1E8}\u{1F1FC}",cyprus:"\u{1F1E8}\u{1F1FE}",czech_republic:"\u{1F1E8}\u{1F1FF}",denmark:"\u{1F1E9}\u{1F1F0}",djibouti:"\u{1F1E9}\u{1F1EF}",dominica:"\u{1F1E9}\u{1F1F2}",dominican_republic:"\u{1F1E9}\u{1F1F4}",ecuador:"\u{1F1EA}\u{1F1E8}",egypt:"\u{1F1EA}\u{1F1EC}",el_salvador:"\u{1F1F8}\u{1F1FB}",equatorial_guinea:"\u{1F1EC}\u{1F1F6}",eritrea:"\u{1F1EA}\u{1F1F7}",estonia:"\u{1F1EA}\u{1F1EA}",ethiopia:"\u{1F1EA}\u{1F1F9}",eu:"\u{1F1EA}\u{1F1FA}",european_union:"\u{1F1EA}\u{1F1FA}",falkland_islands:"\u{1F1EB}\u{1F1F0}",faroe_islands:"\u{1F1EB}\u{1F1F4}",fiji:"\u{1F1EB}\u{1F1EF}",finland:"\u{1F1EB}\u{1F1EE}",fr:"\u{1F1EB}\u{1F1F7}",french_guiana:"\u{1F1EC}\u{1F1EB}",french_polynesia:"\u{1F1F5}\u{1F1EB}",french_southern_territories:"\u{1F1F9}\u{1F1EB}",gabon:"\u{1F1EC}\u{1F1E6}",gambia:"\u{1F1EC}\u{1F1F2}",georgia:"\u{1F1EC}\u{1F1EA}",de:"\u{1F1E9}\u{1F1EA}",ghana:"\u{1F1EC}\u{1F1ED}",gibraltar:"\u{1F1EC}\u{1F1EE}",greece:"\u{1F1EC}\u{1F1F7}",greenland:"\u{1F1EC}\u{1F1F1}",grenada:"\u{1F1EC}\u{1F1E9}",guadeloupe:"\u{1F1EC}\u{1F1F5}",guam:"\u{1F1EC}\u{1F1FA}",guatemala:"\u{1F1EC}\u{1F1F9}",guernsey:"\u{1F1EC}\u{1F1EC}",guinea:"\u{1F1EC}\u{1F1F3}",guinea_bissau:"\u{1F1EC}\u{1F1FC}",guyana:"\u{1F1EC}\u{1F1FE}",haiti:"\u{1F1ED}\u{1F1F9}",honduras:"\u{1F1ED}\u{1F1F3}",hong_kong:"\u{1F1ED}\u{1F1F0}",hungary:"\u{1F1ED}\u{1F1FA}",iceland:"\u{1F1EE}\u{1F1F8}",india:"\u{1F1EE}\u{1F1F3}",indonesia:"\u{1F1EE}\u{1F1E9}",iran:"\u{1F1EE}\u{1F1F7}",iraq:"\u{1F1EE}\u{1F1F6}",ireland:"\u{1F1EE}\u{1F1EA}",isle_of_man:"\u{1F1EE}\u{1F1F2}",israel:"\u{1F1EE}\u{1F1F1}",it:"\u{1F1EE}\u{1F1F9}",jamaica:"\u{1F1EF}\u{1F1F2}",jp:"\u{1F1EF}\u{1F1F5}",crossed_flags:"\u{1F38C}",jersey:"\u{1F1EF}\u{1F1EA}",jordan:"\u{1F1EF}\u{1F1F4}",kazakhstan:"\u{1F1F0}\u{1F1FF}",kenya:"\u{1F1F0}\u{1F1EA}",kiribati:"\u{1F1F0}\u{1F1EE}",kosovo:"\u{1F1FD}\u{1F1F0}",kuwait:"\u{1F1F0}\u{1F1FC}",kyrgyzstan:"\u{1F1F0}\u{1F1EC}",laos:"\u{1F1F1}\u{1F1E6}",latvia:"\u{1F1F1}\u{1F1FB}",lebanon:"\u{1F1F1}\u{1F1E7}",lesotho:"\u{1F1F1}\u{1F1F8}",liberia:"\u{1F1F1}\u{1F1F7}",libya:"\u{1F1F1}\u{1F1FE}",liechtenstein:"\u{1F1F1}\u{1F1EE}",lithuania:"\u{1F1F1}\u{1F1F9}",luxembourg:"\u{1F1F1}\u{1F1FA}",macau:"\u{1F1F2}\u{1F1F4}",macedonia:"\u{1F1F2}\u{1F1F0}",madagascar:"\u{1F1F2}\u{1F1EC}",malawi:"\u{1F1F2}\u{1F1FC}",malaysia:"\u{1F1F2}\u{1F1FE}",maldives:"\u{1F1F2}\u{1F1FB}",mali:"\u{1F1F2}\u{1F1F1}",malta:"\u{1F1F2}\u{1F1F9}",marshall_islands:"\u{1F1F2}\u{1F1ED}",martinique:"\u{1F1F2}\u{1F1F6}",mauritania:"\u{1F1F2}\u{1F1F7}",mauritius:"\u{1F1F2}\u{1F1FA}",mayotte:"\u{1F1FE}\u{1F1F9}",mexico:"\u{1F1F2}\u{1F1FD}",micronesia:"\u{1F1EB}\u{1F1F2}",moldova:"\u{1F1F2}\u{1F1E9}",monaco:"\u{1F1F2}\u{1F1E8}",mongolia:"\u{1F1F2}\u{1F1F3}",montenegro:"\u{1F1F2}\u{1F1EA}",montserrat:"\u{1F1F2}\u{1F1F8}",morocco:"\u{1F1F2}\u{1F1E6}",mozambique:"\u{1F1F2}\u{1F1FF}",myanmar:"\u{1F1F2}\u{1F1F2}",namibia:"\u{1F1F3}\u{1F1E6}",nauru:"\u{1F1F3}\u{1F1F7}",nepal:"\u{1F1F3}\u{1F1F5}",netherlands:"\u{1F1F3}\u{1F1F1}",new_caledonia:"\u{1F1F3}\u{1F1E8}",new_zealand:"\u{1F1F3}\u{1F1FF}",nicaragua:"\u{1F1F3}\u{1F1EE}",niger:"\u{1F1F3}\u{1F1EA}",nigeria:"\u{1F1F3}\u{1F1EC}",niue:"\u{1F1F3}\u{1F1FA}",norfolk_island:"\u{1F1F3}\u{1F1EB}",northern_mariana_islands:"\u{1F1F2}\u{1F1F5}",north_korea:"\u{1F1F0}\u{1F1F5}",norway:"\u{1F1F3}\u{1F1F4}",oman:"\u{1F1F4}\u{1F1F2}",pakistan:"\u{1F1F5}\u{1F1F0}",palau:"\u{1F1F5}\u{1F1FC}",palestinian_territories:"\u{1F1F5}\u{1F1F8}",panama:"\u{1F1F5}\u{1F1E6}",papua_new_guinea:"\u{1F1F5}\u{1F1EC}",paraguay:"\u{1F1F5}\u{1F1FE}",peru:"\u{1F1F5}\u{1F1EA}",philippines:"\u{1F1F5}\u{1F1ED}",pitcairn_islands:"\u{1F1F5}\u{1F1F3}",poland:"\u{1F1F5}\u{1F1F1}",portugal:"\u{1F1F5}\u{1F1F9}",puerto_rico:"\u{1F1F5}\u{1F1F7}",qatar:"\u{1F1F6}\u{1F1E6}",reunion:"\u{1F1F7}\u{1F1EA}",romania:"\u{1F1F7}\u{1F1F4}",ru:"\u{1F1F7}\u{1F1FA}",rwanda:"\u{1F1F7}\u{1F1FC}",st_barthelemy:"\u{1F1E7}\u{1F1F1}",st_helena:"\u{1F1F8}\u{1F1ED}",st_kitts_nevis:"\u{1F1F0}\u{1F1F3}",st_lucia:"\u{1F1F1}\u{1F1E8}",st_pierre_miquelon:"\u{1F1F5}\u{1F1F2}",st_vincent_grenadines:"\u{1F1FB}\u{1F1E8}",samoa:"\u{1F1FC}\u{1F1F8}",san_marino:"\u{1F1F8}\u{1F1F2}",sao_tome_principe:"\u{1F1F8}\u{1F1F9}",saudi_arabia:"\u{1F1F8}\u{1F1E6}",senegal:"\u{1F1F8}\u{1F1F3}",serbia:"\u{1F1F7}\u{1F1F8}",seychelles:"\u{1F1F8}\u{1F1E8}",sierra_leone:"\u{1F1F8}\u{1F1F1}",singapore:"\u{1F1F8}\u{1F1EC}",sint_maarten:"\u{1F1F8}\u{1F1FD}",slovakia:"\u{1F1F8}\u{1F1F0}",slovenia:"\u{1F1F8}\u{1F1EE}",solomon_islands:"\u{1F1F8}\u{1F1E7}",somalia:"\u{1F1F8}\u{1F1F4}",south_africa:"\u{1F1FF}\u{1F1E6}",south_georgia_south_sandwich_islands:"\u{1F1EC}\u{1F1F8}",kr:"\u{1F1F0}\u{1F1F7}",south_sudan:"\u{1F1F8}\u{1F1F8}",es:"\u{1F1EA}\u{1F1F8}",sri_lanka:"\u{1F1F1}\u{1F1F0}",sudan:"\u{1F1F8}\u{1F1E9}",suriname:"\u{1F1F8}\u{1F1F7}",swaziland:"\u{1F1F8}\u{1F1FF}",sweden:"\u{1F1F8}\u{1F1EA}",switzerland:"\u{1F1E8}\u{1F1ED}",syria:"\u{1F1F8}\u{1F1FE}",taiwan:"\u{1F1F9}\u{1F1FC}",tajikistan:"\u{1F1F9}\u{1F1EF}",tanzania:"\u{1F1F9}\u{1F1FF}",thailand:"\u{1F1F9}\u{1F1ED}",timor_leste:"\u{1F1F9}\u{1F1F1}",togo:"\u{1F1F9}\u{1F1EC}",tokelau:"\u{1F1F9}\u{1F1F0}",tonga:"\u{1F1F9}\u{1F1F4}",trinidad_tobago:"\u{1F1F9}\u{1F1F9}",tunisia:"\u{1F1F9}\u{1F1F3}",tr:"\u{1F1F9}\u{1F1F7}",turkmenistan:"\u{1F1F9}\u{1F1F2}",turks_caicos_islands:"\u{1F1F9}\u{1F1E8}",tuvalu:"\u{1F1F9}\u{1F1FB}",uganda:"\u{1F1FA}\u{1F1EC}",ukraine:"\u{1F1FA}\u{1F1E6}",united_arab_emirates:"\u{1F1E6}\u{1F1EA}",gb:"\u{1F1EC}\u{1F1E7}",uk:"\u{1F1EC}\u{1F1E7}",us:"\u{1F1FA}\u{1F1F8}",us_virgin_islands:"\u{1F1FB}\u{1F1EE}",uruguay:"\u{1F1FA}\u{1F1FE}",uzbekistan:"\u{1F1FA}\u{1F1FF}",vanuatu:"\u{1F1FB}\u{1F1FA}",vatican_city:"\u{1F1FB}\u{1F1E6}",venezuela:"\u{1F1FB}\u{1F1EA}",vietnam:"\u{1F1FB}\u{1F1F3}",wallis_futuna:"\u{1F1FC}\u{1F1EB}",western_sahara:"\u{1F1EA}\u{1F1ED}",yemen:"\u{1F1FE}\u{1F1EA}",zambia:"\u{1F1FF}\u{1F1F2}",zimbabwe:"\u{1F1FF}\u{1F1FC}"}},function(e,n,r){e.exports={angry:[">:(",">:-("],blush:[':")',':-")'],broken_heart:["</3","<\\3"],confused:[":/",":-/"],cry:[":'(",":'-(",":,(",":,-("],frowning:[":(",":-("],heart:["<3"],imp:["]:(","]:-("],innocent:["o:)","O:)","o:-)","O:-)","0:)","0:-)"],joy:[":')",":'-)",":,)",":,-)",":'D",":'-D",":,D",":,-D"],kissing:[":*",":-*"],laughing:["x-)","X-)"],neutral_face:[":|",":-|"],open_mouth:[":o",":-o",":O",":-O"],rage:[":@",":-@"],smile:[":D",":-D"],smiley:[":)",":-)"],smiling_imp:["]:)","]:-)"],sob:[":,'(",":,'-(",";(",";-("],stuck_out_tongue:[":P",":-P"],sunglasses:["8-)","B-)"],sweat:[",:(",",:-("],sweat_smile:[",:)",",:-)"],unamused:[":s",":-S",":z",":-Z",":$",":-$"],wink:[";)",";-)"]}},function(e,n,r){function t(o){return o.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}e.exports=function(o){var i,s=o.defs;o.enabled.length&&(s=Object.keys(s).reduce(function(f,c){return o.enabled.indexOf(c)>=0&&(f[c]=s[c]),f},{})),i=Object.keys(o.shortcuts).reduce(function(f,c){return s[c]?Array.isArray(o.shortcuts[c])?(o.shortcuts[c].forEach(function(d){f[d]=c}),f):(f[o.shortcuts[c]]=c,f):f},{});var a=Object.keys(s).map(function(f){return":"+f+":"}).concat(Object.keys(i)).sort().reverse().map(function(f){return t(f)}).join("|"),l=RegExp(a),u=RegExp(a,"g");return{defs:s,shortcuts:i,scanRE:l,replaceRE:u}}},function(e,n,r){e.exports=function(t,o){return t[o].content}},function(e,n,r){e.exports=function(t,o,i,s,a){function l(d,_,v){var b,C=0,m=[];return d.replace(a,function(g,y,k){var x;if(i.hasOwnProperty(g)){if(x=i[g],y>0&&!c.test(k[y-1])||y+g.length<k.length&&!c.test(k[y+g.length]))return}else x=g.slice(1,-1);y>C&&(b=new v("text","",0),b.content=d.slice(C,y),m.push(b)),b=new v("emoji","",0),b.markup=x,b.content=o[x],m.push(b),C=y+g.length}),C<d.length&&(b=new v("text","",0),b.content=d.slice(C),m.push(b)),m}var u=t.utils.arrayReplaceAt,f=t.utils.lib.ucmicro,c=new RegExp([f.Z.source,f.P.source,f.Cc.source].join("|"));return function(d){var _,v,b,C,m,g=d.tokens,y=0;for(v=0,b=g.length;v<b;v++)if(g[v].type==="inline")for(C=g[v].children,_=C.length-1;_>=0;_--)m=C[_],m.type!=="link_open"&&m.type!=="link_close"||m.info==="auto"&&(y-=m.nesting),m.type==="text"&&y===0&&s.test(m.content)&&(g[v].children=C=u(C,_,l(m.content,m.level,d.Token)))}}},function(e,n,r){function t(c,d,_,v){var b=Number(c[d].meta.id+1).toString(),C="";return typeof v.docId=="string"&&(C="-"+v.docId+"-"),C+b}function o(c,d){var _=Number(c[d].meta.id+1).toString();return c[d].meta.subId>0&&(_+=":"+c[d].meta.subId),"["+_+"]"}function i(c,d,_,v,b){var C=b.rules.footnote_anchor_name(c,d,_,v,b),m=b.rules.footnote_caption(c,d,_,v,b),g=C;return c[d].meta.subId>0&&(g+=":"+c[d].meta.subId),'<sup class="footnote-ref"><a href="#fn'+C+'" id="fnref'+g+'">'+m+"</a></sup>"}function s(c,d,_){return(_.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function a(){return`</ol>
</section>
`}function l(c,d,_,v,b){var C=b.rules.footnote_anchor_name(c,d,_,v,b);return c[d].meta.subId>0&&(C+=":"+c[d].meta.subId),'<li id="fn'+C+'" class="footnote-item">'}function u(){return`</li>
`}function f(c,d,_,v,b){var C=b.rules.footnote_anchor_name(c,d,_,v,b);return c[d].meta.subId>0&&(C+=":"+c[d].meta.subId),' <a href="#fnref'+C+'" class="footnote-backref">\u21A9\uFE0E</a>'}e.exports=function(c){function d(g,y,k,x){var w,A,E,S,O,P,L,M,G,X,j,q=g.bMarks[y]+g.tShift[y],ee=g.eMarks[y];if(q+4>ee||g.src.charCodeAt(q)!==91||g.src.charCodeAt(q+1)!==94)return!1;for(O=q+2;O<ee;O++){if(g.src.charCodeAt(O)===32)return!1;if(g.src.charCodeAt(O)===93)break}if(O===q+2||O+1>=ee||g.src.charCodeAt(++O)!==58)return!1;if(x)return!0;for(O++,g.env.footnotes||(g.env.footnotes={}),g.env.footnotes.refs||(g.env.footnotes.refs={}),P=g.src.slice(q+2,O-2),g.env.footnotes.refs[":"+P]=-1,L=new g.Token("footnote_reference_open","",1),L.meta={label:P},L.level=g.level++,g.tokens.push(L),w=g.bMarks[y],A=g.tShift[y],E=g.sCount[y],S=g.parentType,j=O,M=G=g.sCount[y]+O-(g.bMarks[y]+g.tShift[y]);O<ee&&(X=g.src.charCodeAt(O),m(X));)X===9?G+=4-G%4:G++,O++;return g.tShift[y]=O-j,g.sCount[y]=G-M,g.bMarks[y]=j,g.blkIndent+=4,g.parentType="footnote",g.sCount[y]<g.blkIndent&&(g.sCount[y]+=g.blkIndent),g.md.block.tokenize(g,y,k,!0),g.parentType=S,g.blkIndent-=4,g.tShift[y]=A,g.sCount[y]=E,g.bMarks[y]=w,L=new g.Token("footnote_reference_close","",-1),L.level=--g.level,g.tokens.push(L),!0}function _(g,y){var k,x,w,A,E,S=g.posMax,O=g.pos;return!(O+2>=S)&&g.src.charCodeAt(O)===94&&g.src.charCodeAt(O+1)===91&&(k=O+2,!((x=C(g,O+1))<0)&&(y||(g.env.footnotes||(g.env.footnotes={}),g.env.footnotes.list||(g.env.footnotes.list=[]),w=g.env.footnotes.list.length,g.md.inline.parse(g.src.slice(k,x),g.md,g.env,E=[]),A=g.push("footnote_ref","",0),A.meta={id:w},g.env.footnotes.list[w]={content:g.src.slice(k,x),tokens:E}),g.pos=x+1,g.posMax=S,!0))}function v(g,y){var k,x,w,A,E,S=g.posMax,O=g.pos;if(O+3>S||!g.env.footnotes||!g.env.footnotes.refs||g.src.charCodeAt(O)!==91||g.src.charCodeAt(O+1)!==94)return!1;for(x=O+2;x<S;x++){if(g.src.charCodeAt(x)===32||g.src.charCodeAt(x)===10)return!1;if(g.src.charCodeAt(x)===93)break}return x!==O+2&&!(x>=S)&&(x++,k=g.src.slice(O+2,x-1),g.env.footnotes.refs[":"+k]!==void 0&&(y||(g.env.footnotes.list||(g.env.footnotes.list=[]),g.env.footnotes.refs[":"+k]<0?(w=g.env.footnotes.list.length,g.env.footnotes.list[w]={label:k,count:0},g.env.footnotes.refs[":"+k]=w):w=g.env.footnotes.refs[":"+k],A=g.env.footnotes.list[w].count,g.env.footnotes.list[w].count++,E=g.push("footnote_ref","",0),E.meta={id:w,subId:A,label:k}),g.pos=x,g.posMax=S,!0))}function b(g){var y,k,x,w,A,E,S,O,P,L,M=!1,G={};if(g.env.footnotes&&(g.tokens=g.tokens.filter(function(X){return X.type==="footnote_reference_open"?(M=!0,P=[],L=X.meta.label,!1):X.type==="footnote_reference_close"?(M=!1,G[":"+L]=P,!1):(M&&P.push(X),!M)}),g.env.footnotes.list)){for(E=g.env.footnotes.list,S=new g.Token("footnote_block_open","",1),g.tokens.push(S),y=0,k=E.length;y<k;y++){for(S=new g.Token("footnote_open","",1),S.meta={id:y,label:E[y].label},g.tokens.push(S),E[y].tokens?(O=[],S=new g.Token("paragraph_open","p",1),S.block=!0,O.push(S),S=new g.Token("inline","",0),S.children=E[y].tokens,S.content=E[y].content,O.push(S),S=new g.Token("paragraph_close","p",-1),S.block=!0,O.push(S)):E[y].label&&(O=G[":"+E[y].label]),g.tokens=g.tokens.concat(O),A=g.tokens[g.tokens.length-1].type==="paragraph_close"?g.tokens.pop():null,w=E[y].count>0?E[y].count:1,x=0;x<w;x++)S=new g.Token("footnote_anchor","",0),S.meta={id:y,subId:x,label:E[y].label},g.tokens.push(S);A&&g.tokens.push(A),S=new g.Token("footnote_close","",-1),g.tokens.push(S)}S=new g.Token("footnote_block_close","",-1),g.tokens.push(S)}}var C=c.helpers.parseLinkLabel,m=c.utils.isSpace;c.renderer.rules.footnote_ref=i,c.renderer.rules.footnote_block_open=s,c.renderer.rules.footnote_block_close=a,c.renderer.rules.footnote_open=l,c.renderer.rules.footnote_close=u,c.renderer.rules.footnote_anchor=f,c.renderer.rules.footnote_caption=o,c.renderer.rules.footnote_anchor_name=t,c.block.ruler.before("reference","footnote_def",d,{alt:["paragraph","reference"]}),c.inline.ruler.after("image","footnote_inline",_),c.inline.ruler.after("footnote_inline","footnote_ref",v),c.core.ruler.after("inline","footnote_tail",b)}},function(e,n){var r=function(t,o){o=o||{},o.highlighted===void 0&&(o.highlighted=!0),o.hljs===void 0&&(o.hljs="auto"),typeof o.langCheck!="function"&&(o.langCheck=function(){}),t.options.highlight=function(i,s){var a=o.hljs;if(o.hljs==="auto"&&(a=window.hljs),o.highlighted&&s&&a){if(a.getLanguage(s))return'<pre><div class="hljs"><code class="'+t.options.langPrefix+s+'">'+a.highlight(s,i,!0).value+"</code></div></pre>";typeof o.langCheck=="function"&&o.langCheck(s)}return'<pre><code class="'+t.options.langPrefix+s+'">'+t.utils.escapeHtml(i)+"</code></pre>"}};e.exports=r},function(e,n){e.exports=function(r,t){r.image_add=function(i,s){r.__image instanceof Object||(r.__image={}),r.__image[i]=s},r.image_del=function(i){r.__image instanceof Object||(r.__image={}),delete r.__image[i]};var o=r.renderer.rules.image;r.renderer.rules.image=function(i,s,a,l,u){var f=i[s].attrs;if(r.__image instanceof Object){for(var c=0;c<f.length;c++)if(f[c][0]=="src"&&r.__image.hasOwnProperty(i[s].attrs[c][1])){f.push(["rel",f[c][1]]),f[c][1]=r.__image[i[s].attrs[c][1]];break}}return o(i,s,a,l,u)}}},function(e,n,r){e.exports=function(t){function o(s,a){var l,u,f,c,d,_=s.pos,v=s.src.charCodeAt(_);if(a||v!==43||(u=s.scanDelims(s.pos,!0),c=u.length,d=String.fromCharCode(v),c<2))return!1;for(c%2&&(f=s.push("text","",0),f.content=d,c--),l=0;l<c;l+=2)f=s.push("text","",0),f.content=d+d,s.delimiters.push({marker:v,jump:l,token:s.tokens.length-1,level:s.level,end:-1,open:u.can_open,close:u.can_close});return s.pos+=u.length,!0}function i(s){var a,l,u,f,c,d=[],_=s.delimiters,v=s.delimiters.length;for(a=0;a<v;a++)u=_[a],u.marker===43&&u.end!==-1&&(f=_[u.end],c=s.tokens[u.token],c.type="ins_open",c.tag="ins",c.nesting=1,c.markup="++",c.content="",c=s.tokens[f.token],c.type="ins_close",c.tag="ins",c.nesting=-1,c.markup="++",c.content="",s.tokens[f.token-1].type==="text"&&s.tokens[f.token-1].content==="+"&&d.push(f.token-1));for(;d.length;){for(a=d.pop(),l=a+1;l<s.tokens.length&&s.tokens[l].type==="ins_close";)l++;l--,a!==l&&(c=s.tokens[l],s.tokens[l]=s.tokens[a],s.tokens[a]=c)}}t.inline.ruler.before("emphasis","ins",o),t.inline.ruler2.before("emphasis","ins",i)}},function(e,n,r){function t(a,l){var u,f,c=a.posMax,d=!0,_=!0;return u=l>0?a.src.charCodeAt(l-1):-1,f=l+1<=c?a.src.charCodeAt(l+1):-1,(u===32||u===9||f>=48&&f<=57)&&(_=!1),f!==32&&f!==9||(d=!1),{can_open:d,can_close:_}}function o(a,l){if(!s&&window.katex&&(s=window.katex),!s)return!1;var u,f,c,d,_;if(a.src[a.pos]!=="$")return!1;if(d=t(a,a.pos),!d.can_open)return l||(a.pending+="$"),a.pos+=1,!0;for(u=a.pos+1,f=u;(f=a.src.indexOf("$",f))!==-1;){for(_=f-1;a.src[_]==="\\";)_-=1;if((f-_)%2==1)break;f+=1}return f===-1?(l||(a.pending+="$"),a.pos=u,!0):f-u==0?(l||(a.pending+="$$"),a.pos=u+1,!0):(d=t(a,f),d.can_close?(l||(c=a.push("math_inline","math",0),c.markup="$",c.content=a.src.slice(u,f)),a.pos=f+1,!0):(l||(a.pending+="$"),a.pos=u,!0))}function i(a,l,u,f){if(!s&&window.katex&&(s=window.katex),!s)return!1;var c,d,_,v,b,C=!1,m=a.bMarks[l]+a.tShift[l],g=a.eMarks[l];if(m+2>g||a.src.slice(m,m+2)!=="$$")return!1;if(m+=2,c=a.src.slice(m,g),f)return!0;for(c.trim().slice(-2)==="$$"&&(c=c.trim().slice(0,-2),C=!0),_=l;!C&&!(++_>=u)&&(m=a.bMarks[_]+a.tShift[_],g=a.eMarks[_],!(m<g&&a.tShift[_]<a.blkIndent));)a.src.slice(m,g).trim().slice(-2)==="$$"&&(v=a.src.slice(0,g).lastIndexOf("$$"),d=a.src.slice(m,v),C=!0);return a.line=_+1,b=a.push("math_block","math",0),b.block=!0,b.content=(c&&c.trim()?c+`
`:"")+a.getLines(l+1,_,a.tShift[l],!0)+(d&&d.trim()?d:""),b.map=[l,a.line],b.markup="$$",!0}var s=null;e.exports=function(a,l){l=l||{};var u=function(_){!s&&window.katex&&(s=window.katex),l.displayMode=!1;try{return s.renderToString(_,l)}catch(v){return l.throwOnError&&console.log(v),_}},f=function(_,v){return u(_[v].content)},c=function(_){!s&&window.katex&&(s=window.katex),l.displayMode=!0;try{return"<p>"+s.renderToString(_,l)+"</p>"}catch(v){return l.throwOnError&&console.log(v),_}},d=function(_,v){return c(_[v].content)+`
`};a.inline.ruler.after("escape","math_inline",o),a.block.ruler.after("blockquote","math_block",i,{alt:["paragraph","reference","blockquote","list"]}),a.renderer.rules.math_inline=f,a.renderer.rules.math_block=d}},function(e,n,r){e.exports=function(t){function o(s,a){var l,u,f,c,d,_=s.pos,v=s.src.charCodeAt(_);if(a||v!==61||(u=s.scanDelims(s.pos,!0),c=u.length,d=String.fromCharCode(v),c<2))return!1;for(c%2&&(f=s.push("text","",0),f.content=d,c--),l=0;l<c;l+=2)f=s.push("text","",0),f.content=d+d,s.delimiters.push({marker:v,jump:l,token:s.tokens.length-1,level:s.level,end:-1,open:u.can_open,close:u.can_close});return s.pos+=u.length,!0}function i(s){var a,l,u,f,c,d=[],_=s.delimiters,v=s.delimiters.length;for(a=0;a<v;a++)u=_[a],u.marker===61&&u.end!==-1&&(f=_[u.end],c=s.tokens[u.token],c.type="mark_open",c.tag="mark",c.nesting=1,c.markup="==",c.content="",c=s.tokens[f.token],c.type="mark_close",c.tag="mark",c.nesting=-1,c.markup="==",c.content="",s.tokens[f.token-1].type==="text"&&s.tokens[f.token-1].content==="="&&d.push(f.token-1));for(;d.length;){for(a=d.pop(),l=a+1;l<s.tokens.length&&s.tokens[l].type==="mark_close";)l++;l--,a!==l&&(c=s.tokens[l],s.tokens[l]=s.tokens[a],s.tokens[a]=c)}}t.inline.ruler.before("emphasis","mark",o),t.inline.ruler2.before("emphasis","mark",i)}},function(e,n,r){function t(i,s){var a,l,u,f=i.posMax,c=i.pos;if(i.src.charCodeAt(c)!==126||s||c+2>=f)return!1;for(i.pos=c+1;i.pos<f;){if(i.src.charCodeAt(i.pos)===126){a=!0;break}i.md.inline.skipToken(i)}return a&&c+1!==i.pos?(l=i.src.slice(c+1,i.pos),l.match(/(^|[^\\])(\\\\)*\s/)?(i.pos=c,!1):(i.posMax=i.pos,i.pos=c+1,u=i.push("sub_open","sub",1),u.markup="~",u=i.push("text","",0),u.content=l.replace(o,"$1"),u=i.push("sub_close","sub",-1),u.markup="~",i.pos=i.posMax+1,i.posMax=f,!0)):(i.pos=c,!1)}var o=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;e.exports=function(i){i.inline.ruler.after("emphasis","sub",t)}},function(e,n,r){function t(i,s){var a,l,u,f=i.posMax,c=i.pos;if(i.src.charCodeAt(c)!==94||s||c+2>=f)return!1;for(i.pos=c+1;i.pos<f;){if(i.src.charCodeAt(i.pos)===94){a=!0;break}i.md.inline.skipToken(i)}return a&&c+1!==i.pos?(l=i.src.slice(c+1,i.pos),l.match(/(^|[^\\])(\\\\)*\s/)?(i.pos=c,!1):(i.posMax=i.pos,i.pos=c+1,u=i.push("sup_open","sup",1),u.markup="^",u=i.push("text","",0),u.content=l.replace(o,"$1"),u=i.push("sup_close","sup",-1),u.markup="^",i.pos=i.posMax+1,i.posMax=f,!0)):(i.pos=c,!1)}var o=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;e.exports=function(i){i.inline.ruler.after("emphasis","sup",t)}},function(e,n){function r(m,g,y){var k=m.attrIndex(g),x=[g,y];k<0?m.attrPush(x):m.attrs[k]=x}function t(m,g){for(var y=m[g].level-1,k=g-1;k>=0;k--)if(m[k].level===y)return k;return-1}function o(m,g){return f(m[g])&&c(m[g-1])&&d(m[g-2])&&_(m[g])}function i(m,g){if(m.children.unshift(s(m,g)),m.children[1].content=m.children[1].content.slice(3),m.content=m.content.slice(3),b)if(C){m.children.pop();var y="task-item-"+Math.ceil(1e7*Math.random()-1e3);m.children[0].content=m.children[0].content.slice(0,-1)+' id="'+y+'">',m.children.push(u(m.content,y,g))}else m.children.unshift(a(g)),m.children.push(l(g))}function s(m,g){var y=new g("html_inline","",0),k=v?' disabled="" ':"";return m.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+k+'type="checkbox">':m.content.indexOf("[x] ")!==0&&m.content.indexOf("[X] ")!==0||(y.content='<input class="task-list-item-checkbox" checked=""'+k+'type="checkbox">'),y}function a(m){var g=new m("html_inline","",0);return g.content="<label>",g}function l(m){var g=new m("html_inline","",0);return g.content="</label>",g}function u(m,g,y){var k=new y("html_inline","",0);return k.content='<label class="task-list-item-label" for="'+g+'">'+m+"</label>",k.attrs=[{for:g}],k}function f(m){return m.type==="inline"}function c(m){return m.type==="paragraph_open"}function d(m){return m.type==="list_item_open"}function _(m){return m.content.indexOf("[ ] ")===0||m.content.indexOf("[x] ")===0||m.content.indexOf("[X] ")===0}var v=!0,b=!1,C=!1;e.exports=function(m,g){g&&(v=!g.enabled,b=!!g.label,C=!!g.labelAfter),m.core.ruler.after("inline","github-task-lists",function(y){for(var k=y.tokens,x=2;x<k.length;x++)o(k,x)&&(i(k[x],y.Token),r(k[x-2],"class","task-list-item"+(v?"":" enabled")),r(k[t(k,x-2)],"class","contains-task-list"))})}},function(e,n,r){e.exports=function(t){function o(u,f){for(;u.src.indexOf(`
`)>=0&&u.src.indexOf(`
`)<u.src.indexOf("@[toc]");)u.tokens.slice(-1)[0].type==="softbreak"&&(u.src=u.src.split(`
`).slice(1).join(`
`),u.pos=0);var c;if(u.src.charCodeAt(u.pos)!==64||u.src.charCodeAt(u.pos+1)!==91)return!1;var d=s.exec(u.src);if(!d||(d=d.filter(function(C){return C}),d.length<1)||f)return!1;c=u.push("toc_open","toc",1),c.markup="@[toc]",c=u.push("toc_body","",0);var _=a;d.length>1&&(_=d.pop()),c.content=_,c=u.push("toc_close","toc",-1);var v=0,b=u.src.indexOf(`
`);return v=b!==-1?u.pos+b:u.pos+u.posMax+1,u.pos=v,!0}var i,s=/^@\[toc\](?:\((?:\s+)?([^\)]+)(?:\s+)?\)?)?(?:\s+?)?$/im,a="Table of Contents",l=function(u){return u.replace(/[^\w\s]/gi,"").split(" ").join("_")};t.renderer.rules.heading_open=function(u,f){var c=u[f].tag,d=u[f+1];return d.type==="inline"?"<"+c+'><a id="'+(l(d.content)+"_"+d.map[0])+'"></a>':"</h1>"},t.renderer.rules.toc_open=function(u,f){return""},t.renderer.rules.toc_close=function(u,f){return""},t.renderer.rules.toc_body=function(u,f){for(var c=[],d=i.tokens,_=d.length,v=0;v<_;v++)if(d[v].type==="heading_close"){var b=d[v],C=d[v-1];C.type==="inline"&&c.push({level:+b.tag.substr(1,1),anchor:l(C.content)+"_"+C.map[0],content:C.content})}var m=0,g=c.map(function(y){var k=[];if(y.level>m)for(var x=y.level-m,w=0;w<x;w++)k.push("<ul>"),m++;else if(y.level<m)for(var x=m-y.level,w=0;w<x;w++)k.push("</ul>"),m--;return k=k.concat(['<li><a href="#',y.anchor,'">',y.content,"</a></li>"]),k.join("")});return"<h3>"+u[f].content+"</h3>"+g.join("")+new Array(m+1).join("</ul>")},t.core.ruler.push("grab_state",function(u){i=u}),t.inline.ruler.after("emphasis","toc",o)}},function(e,n,r){e.exports=r(142)},function(e,n,r){e.exports=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","section","source","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"]},function(e,n,r){n.parseLinkLabel=r(140),n.parseLinkDestination=r(139),n.parseLinkTitle=r(141)},function(e,n,r){var t=r(0).unescapeAll;e.exports=function(o,i,s){var a,l,u=i,f={ok:!1,pos:0,lines:0,str:""};if(o.charCodeAt(i)===60){for(i++;i<s;){if((a=o.charCodeAt(i))===10)return f;if(a===62)return f.pos=i+1,f.str=t(o.slice(u+1,i)),f.ok=!0,f;a===92&&i+1<s?i+=2:i++}return f}for(l=0;i<s&&(a=o.charCodeAt(i))!==32&&!(a<32||a===127);)if(a===92&&i+1<s)i+=2;else{if(a===40&&l++,a===41){if(l===0)break;l--}i++}return u===i||l!==0||(f.str=t(o.slice(u,i)),f.lines=0,f.pos=i,f.ok=!0),f}},function(e,n,r){e.exports=function(t,o,i){var s,a,l,u,f=-1,c=t.posMax,d=t.pos;for(t.pos=o+1,s=1;t.pos<c;){if((l=t.src.charCodeAt(t.pos))===93&&--s==0){a=!0;break}if(u=t.pos,t.md.inline.skipToken(t),l===91){if(u===t.pos-1)s++;else if(i)return t.pos=d,-1}}return a&&(f=t.pos),t.pos=d,f}},function(e,n,r){var t=r(0).unescapeAll;e.exports=function(o,i,s){var a,l,u=0,f=i,c={ok:!1,pos:0,lines:0,str:""};if(i>=s||(l=o.charCodeAt(i))!==34&&l!==39&&l!==40)return c;for(i++,l===40&&(l=41);i<s;){if((a=o.charCodeAt(i))===l)return c.pos=i+1,c.lines=u,c.str=t(o.slice(f+1,i)),c.ok=!0,c;a===10?u++:a===92&&i+1<s&&(i++,o.charCodeAt(i)===10&&u++),i++}return c}},function(e,n,r){function t(k){var x=k.trim().toLowerCase();return!m.test(x)||!!g.test(x)}function o(k){var x=v.parse(k,!0);if(x.hostname&&(!x.protocol||y.indexOf(x.protocol)>=0))try{x.hostname=b.toASCII(x.hostname)}catch{}return v.encode(v.format(x))}function i(k){var x=v.parse(k,!0);if(x.hostname&&(!x.protocol||y.indexOf(x.protocol)>=0))try{x.hostname=b.toUnicode(x.hostname)}catch{}return v.decode(v.format(x))}function s(k,x){if(!(this instanceof s))return new s(k,x);x||a.isString(k)||(x=k||{},k="default"),this.inline=new d,this.block=new c,this.core=new f,this.renderer=new u,this.linkify=new _,this.validateLink=t,this.normalizeLink=o,this.normalizeLinkText=i,this.utils=a,this.helpers=a.assign({},l),this.options={},this.configure(k),x&&this.set(x)}var a=r(0),l=r(138),u=r(149),f=r(144),c=r(143),d=r(145),_=r(115),v=r(57),b=r(186),C={default:r(147),zero:r(148),commonmark:r(146)},m=/^(vbscript|javascript|file|data):/,g=/^data:image\/(gif|png|jpeg|webp);/,y=["http:","https:","mailto:"];s.prototype.set=function(k){return a.assign(this.options,k),this},s.prototype.configure=function(k){var x,w=this;if(a.isString(k)&&(x=k,!(k=C[x])))throw new Error('Wrong `markdown-it` preset "'+x+'", check name');if(!k)throw new Error("Wrong `markdown-it` preset, can't be empty");return k.options&&w.set(k.options),k.components&&Object.keys(k.components).forEach(function(A){k.components[A].rules&&w[A].ruler.enableOnly(k.components[A].rules),k.components[A].rules2&&w[A].ruler2.enableOnly(k.components[A].rules2)}),this},s.prototype.enable=function(k,x){var w=[];Array.isArray(k)||(k=[k]),["core","block","inline"].forEach(function(E){w=w.concat(this[E].ruler.enable(k,!0))},this),w=w.concat(this.inline.ruler2.enable(k,!0));var A=k.filter(function(E){return w.indexOf(E)<0});if(A.length&&!x)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+A);return this},s.prototype.disable=function(k,x){var w=[];Array.isArray(k)||(k=[k]),["core","block","inline"].forEach(function(E){w=w.concat(this[E].ruler.disable(k,!0))},this),w=w.concat(this.inline.ruler2.disable(k,!0));var A=k.filter(function(E){return w.indexOf(E)<0});if(A.length&&!x)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+A);return this},s.prototype.use=function(k){var x=[this].concat(Array.prototype.slice.call(arguments,1));return k.apply(k,x),this},s.prototype.parse=function(k,x){if(typeof k!="string")throw new Error("Input data should be a String");var w=new this.core.State(k,this,x);return this.core.process(w),w.tokens},s.prototype.render=function(k,x){return x=x||{},this.renderer.render(this.parse(k,x),this.options,x)},s.prototype.parseInline=function(k,x){var w=new this.core.State(k,this,x);return w.inlineMode=!0,this.core.process(w),w.tokens},s.prototype.renderInline=function(k,x){return x=x||{},this.renderer.render(this.parseInline(k,x),this.options,x)},e.exports=s},function(e,n,r){function t(){this.ruler=new o;for(var s=0;s<i.length;s++)this.ruler.push(i[s][0],i[s][1],{alt:(i[s][2]||[]).slice()})}var o=r(32),i=[["table",r(161),["paragraph","reference"]],["code",r(151)],["fence",r(152),["paragraph","reference","blockquote","list"]],["blockquote",r(150),["paragraph","reference","blockquote","list"]],["hr",r(154),["paragraph","reference","blockquote","list"]],["list",r(157),["paragraph","reference","blockquote"]],["reference",r(159)],["heading",r(153),["paragraph","reference","blockquote"]],["lheading",r(156)],["html_block",r(155),["paragraph","reference","blockquote"]],["paragraph",r(158)]];t.prototype.tokenize=function(s,a,l){for(var u,f=this.ruler.getRules(""),c=f.length,d=a,_=!1,v=s.md.options.maxNesting;d<l&&(s.line=d=s.skipEmptyLines(d),!(d>=l))&&!(s.sCount[d]<s.blkIndent);){if(s.level>=v){s.line=l;break}for(u=0;u<c&&!f[u](s,d,l,!1);u++);s.tight=!_,s.isEmpty(s.line-1)&&(_=!0),(d=s.line)<l&&s.isEmpty(d)&&(_=!0,d++,s.line=d)}},t.prototype.parse=function(s,a,l,u){var f;s&&(f=new this.State(s,a,l,u),this.tokenize(f,f.line,f.lineMax))},t.prototype.State=r(160),e.exports=t},function(e,n,r){function t(){this.ruler=new o;for(var s=0;s<i.length;s++)this.ruler.push(i[s][0],i[s][1])}var o=r(32),i=[["normalize",r(165)],["block",r(162)],["inline",r(163)],["linkify",r(164)],["replacements",r(166)],["smartquotes",r(167)]];t.prototype.process=function(s){var a,l,u;for(u=this.ruler.getRules(""),a=0,l=u.length;a<l;a++)u[a](s)},t.prototype.State=r(168),e.exports=t},function(e,n,r){function t(){var a;for(this.ruler=new o,a=0;a<i.length;a++)this.ruler.push(i[a][0],i[a][1]);for(this.ruler2=new o,a=0;a<s.length;a++)this.ruler2.push(s[a][0],s[a][1])}var o=r(32),i=[["text",r(179)],["newline",r(177)],["escape",r(173)],["backticks",r(170)],["strikethrough",r(56).tokenize],["emphasis",r(55).tokenize],["link",r(176)],["image",r(175)],["autolink",r(169)],["html_inline",r(174)],["entity",r(172)]],s=[["balance_pairs",r(171)],["strikethrough",r(56).postProcess],["emphasis",r(55).postProcess],["text_collapse",r(180)]];t.prototype.skipToken=function(a){var l,u,f=a.pos,c=this.ruler.getRules(""),d=c.length,_=a.md.options.maxNesting,v=a.cache;if(v[f]!==void 0)return void(a.pos=v[f]);if(a.level<_)for(u=0;u<d&&(a.level++,l=c[u](a,!0),a.level--,!l);u++);else a.pos=a.posMax;l||a.pos++,v[f]=a.pos},t.prototype.tokenize=function(a){for(var l,u,f=this.ruler.getRules(""),c=f.length,d=a.posMax,_=a.md.options.maxNesting;a.pos<d;){if(a.level<_)for(u=0;u<c&&!(l=f[u](a,!1));u++);if(l){if(a.pos>=d)break}else a.pending+=a.src[a.pos++]}a.pending&&a.pushPending()},t.prototype.parse=function(a,l,u,f){var c,d,_,v=new this.State(a,l,u,f);for(this.tokenize(v),d=this.ruler2.getRules(""),_=d.length,c=0;c<_;c++)d[c](v)},t.prototype.State=r(178),e.exports=t},function(e,n,r){e.exports={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","text_collapse"]}}}},function(e,n,r){e.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}},function(e,n,r){e.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","text_collapse"]}}}},function(e,n,r){function t(){this.rules=o({},a)}var o=r(0).assign,i=r(0).unescapeAll,s=r(0).escapeHtml,a={};a.code_inline=function(l,u,f,c,d){var _=l[u];return"<code"+d.renderAttrs(_)+">"+s(l[u].content)+"</code>"},a.code_block=function(l,u,f,c,d){var _=l[u];return"<pre"+d.renderAttrs(_)+"><code>"+s(l[u].content)+`</code></pre>
`},a.fence=function(l,u,f,c,d){var _,v,b,C,m=l[u],g=m.info?i(m.info).trim():"",y="";return g&&(y=g.split(/\s+/g)[0]),_=f.highlight&&f.highlight(m.content,y)||s(m.content),_.indexOf("<pre")===0?_+`
`:g?(v=m.attrIndex("class"),b=m.attrs?m.attrs.slice():[],v<0?b.push(["class",f.langPrefix+y]):b[v][1]+=" "+f.langPrefix+y,C={attrs:b},"<pre><code"+d.renderAttrs(C)+">"+_+`</code></pre>
`):"<pre><code"+d.renderAttrs(m)+">"+_+`</code></pre>
`},a.image=function(l,u,f,c,d){var _=l[u];return _.attrs[_.attrIndex("alt")][1]=d.renderInlineAsText(_.children,f,c),d.renderToken(l,u,f)},a.hardbreak=function(l,u,f){return f.xhtmlOut?`<br />
`:`<br>
`},a.softbreak=function(l,u,f){return f.breaks?f.xhtmlOut?`<br />
`:`<br>
`:`
`},a.text=function(l,u){return s(l[u].content)},a.html_block=function(l,u){return l[u].content},a.html_inline=function(l,u){return l[u].content},t.prototype.renderAttrs=function(l){var u,f,c;if(!l.attrs)return"";for(c="",u=0,f=l.attrs.length;u<f;u++)c+=" "+s(l.attrs[u][0])+'="'+s(l.attrs[u][1])+'"';return c},t.prototype.renderToken=function(l,u,f){var c,d="",_=!1,v=l[u];return v.hidden?"":(v.block&&v.nesting!==-1&&u&&l[u-1].hidden&&(d+=`
`),d+=(v.nesting===-1?"</":"<")+v.tag,d+=this.renderAttrs(v),v.nesting===0&&f.xhtmlOut&&(d+=" /"),v.block&&(_=!0,v.nesting===1&&u+1<l.length&&(c=l[u+1],(c.type==="inline"||c.hidden||c.nesting===-1&&c.tag===v.tag)&&(_=!1))),d+=_?`>
`:">")},t.prototype.renderInline=function(l,u,f){for(var c,d="",_=this.rules,v=0,b=l.length;v<b;v++)c=l[v].type,_[c]!==void 0?d+=_[c](l,v,u,f,this):d+=this.renderToken(l,v,u);return d},t.prototype.renderInlineAsText=function(l,u,f){for(var c="",d=0,_=l.length;d<_;d++)l[d].type==="text"?c+=l[d].content:l[d].type==="image"&&(c+=this.renderInlineAsText(l[d].children,u,f));return c},t.prototype.render=function(l,u,f){var c,d,_,v="",b=this.rules;for(c=0,d=l.length;c<d;c++)_=l[c].type,_==="inline"?v+=this.renderInline(l[c].children,u,f):b[_]!==void 0?v+=b[l[c].type](l,c,u,f,this):v+=this.renderToken(l,c,u,f);return v},e.exports=t},function(e,n,r){var t=r(0).isSpace;e.exports=function(o,i,s,a){var l,u,f,c,d,_,v,b,C,m,g,y,k,x,w,A,E,S,O,P,L=o.lineMax,M=o.bMarks[i]+o.tShift[i],G=o.eMarks[i];if(o.sCount[i]-o.blkIndent>=4||o.src.charCodeAt(M++)!==62)return!1;if(a)return!0;for(c=C=o.sCount[i]+M-(o.bMarks[i]+o.tShift[i]),o.src.charCodeAt(M)===32?(M++,c++,C++,l=!1,A=!0):o.src.charCodeAt(M)===9?(A=!0,(o.bsCount[i]+C)%4==3?(M++,c++,C++,l=!1):l=!0):A=!1,m=[o.bMarks[i]],o.bMarks[i]=M;M<G&&(u=o.src.charCodeAt(M),t(u));)u===9?C+=4-(C+o.bsCount[i]+(l?1:0))%4:C++,M++;for(g=[o.bsCount[i]],o.bsCount[i]=o.sCount[i]+1+(A?1:0),_=M>=G,x=[o.sCount[i]],o.sCount[i]=C-c,w=[o.tShift[i]],o.tShift[i]=M-o.bMarks[i],S=o.md.block.ruler.getRules("blockquote"),k=o.parentType,o.parentType="blockquote",P=!1,b=i+1;b<s&&(o.sCount[b]<o.blkIndent&&(P=!0),M=o.bMarks[b]+o.tShift[b],G=o.eMarks[b],!(M>=G));b++)if(o.src.charCodeAt(M++)!==62||P){if(_)break;for(E=!1,f=0,d=S.length;f<d;f++)if(S[f](o,b,s,!0)){E=!0;break}if(E){o.lineMax=b,o.blkIndent!==0&&(m.push(o.bMarks[b]),g.push(o.bsCount[b]),w.push(o.tShift[b]),x.push(o.sCount[b]),o.sCount[b]-=o.blkIndent);break}m.push(o.bMarks[b]),g.push(o.bsCount[b]),w.push(o.tShift[b]),x.push(o.sCount[b]),o.sCount[b]=-1}else{for(c=C=o.sCount[b]+M-(o.bMarks[b]+o.tShift[b]),o.src.charCodeAt(M)===32?(M++,c++,C++,l=!1,A=!0):o.src.charCodeAt(M)===9?(A=!0,(o.bsCount[b]+C)%4==3?(M++,c++,C++,l=!1):l=!0):A=!1,m.push(o.bMarks[b]),o.bMarks[b]=M;M<G&&(u=o.src.charCodeAt(M),t(u));)u===9?C+=4-(C+o.bsCount[b]+(l?1:0))%4:C++,M++;_=M>=G,g.push(o.bsCount[b]),o.bsCount[b]=o.sCount[b]+1+(A?1:0),x.push(o.sCount[b]),o.sCount[b]=C-c,w.push(o.tShift[b]),o.tShift[b]=M-o.bMarks[b]}for(y=o.blkIndent,o.blkIndent=0,O=o.push("blockquote_open","blockquote",1),O.markup=">",O.map=v=[i,0],o.md.block.tokenize(o,i,b),O=o.push("blockquote_close","blockquote",-1),O.markup=">",o.lineMax=L,o.parentType=k,v[1]=o.line,f=0;f<w.length;f++)o.bMarks[f+i]=m[f],o.tShift[f+i]=w[f],o.sCount[f+i]=x[f],o.bsCount[f+i]=g[f];return o.blkIndent=y,!0}},function(e,n,r){e.exports=function(t,o,i){var s,a,l;if(t.sCount[o]-t.blkIndent<4)return!1;for(a=s=o+1;s<i;)if(t.isEmpty(s))s++;else{if(!(t.sCount[s]-t.blkIndent>=4))break;s++,a=s}return t.line=a,l=t.push("code_block","code",0),l.content=t.getLines(o,a,4+t.blkIndent,!0),l.map=[o,t.line],!0}},function(e,n,r){e.exports=function(t,o,i,s){var a,l,u,f,c,d,_,v=!1,b=t.bMarks[o]+t.tShift[o],C=t.eMarks[o];if(t.sCount[o]-t.blkIndent>=4||b+3>C||(a=t.src.charCodeAt(b))!==126&&a!==96||(c=b,b=t.skipChars(b,a),(l=b-c)<3)||(_=t.src.slice(c,b),u=t.src.slice(b,C),a===96&&u.indexOf(String.fromCharCode(a))>=0))return!1;if(s)return!0;for(f=o;!(++f>=i)&&(b=c=t.bMarks[f]+t.tShift[f],C=t.eMarks[f],!(b<C&&t.sCount[f]<t.blkIndent));)if(t.src.charCodeAt(b)===a&&!(t.sCount[f]-t.blkIndent>=4||(b=t.skipChars(b,a))-c<l||(b=t.skipSpaces(b))<C)){v=!0;break}return l=t.sCount[o],t.line=f+(v?1:0),d=t.push("fence","code",0),d.info=u,d.content=t.getLines(o+1,f,l,!0),d.markup=_,d.map=[o,t.line],!0}},function(e,n,r){var t=r(0).isSpace;e.exports=function(o,i,s,a){var l,u,f,c,d=o.bMarks[i]+o.tShift[i],_=o.eMarks[i];if(o.sCount[i]-o.blkIndent>=4||(l=o.src.charCodeAt(d))!==35||d>=_)return!1;for(u=1,l=o.src.charCodeAt(++d);l===35&&d<_&&u<=6;)u++,l=o.src.charCodeAt(++d);return!(u>6||d<_&&!t(l))&&(!!a||(_=o.skipSpacesBack(_,d),f=o.skipCharsBack(_,35,d),f>d&&t(o.src.charCodeAt(f-1))&&(_=f),o.line=i+1,c=o.push("heading_open","h"+String(u),1),c.markup="########".slice(0,u),c.map=[i,o.line],c=o.push("inline","",0),c.content=o.src.slice(d,_).trim(),c.map=[i,o.line],c.children=[],c=o.push("heading_close","h"+String(u),-1),c.markup="########".slice(0,u),!0))}},function(e,n,r){var t=r(0).isSpace;e.exports=function(o,i,s,a){var l,u,f,c,d=o.bMarks[i]+o.tShift[i],_=o.eMarks[i];if(o.sCount[i]-o.blkIndent>=4||(l=o.src.charCodeAt(d++))!==42&&l!==45&&l!==95)return!1;for(u=1;d<_;){if((f=o.src.charCodeAt(d++))!==l&&!t(f))return!1;f===l&&u++}return!(u<3)&&(!!a||(o.line=i+1,c=o.push("hr","hr",0),c.map=[i,o.line],c.markup=Array(u+1).join(String.fromCharCode(l)),!0))}},function(e,n,r){var t=r(137),o=r(54).HTML_OPEN_CLOSE_TAG_RE,i=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+t.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(o.source+"\\s*$"),/^$/,!1]];e.exports=function(s,a,l,u){var f,c,d,_,v=s.bMarks[a]+s.tShift[a],b=s.eMarks[a];if(s.sCount[a]-s.blkIndent>=4||!s.md.options.html||s.src.charCodeAt(v)!==60)return!1;for(_=s.src.slice(v,b),f=0;f<i.length&&!i[f][0].test(_);f++);if(f===i.length)return!1;if(u)return i[f][2];if(c=a+1,!i[f][1].test(_)){for(;c<l&&!(s.sCount[c]<s.blkIndent);c++)if(v=s.bMarks[c]+s.tShift[c],b=s.eMarks[c],_=s.src.slice(v,b),i[f][1].test(_)){_.length!==0&&c++;break}}return s.line=c,d=s.push("html_block","",0),d.map=[a,c],d.content=s.getLines(a,c,s.blkIndent,!0),!0}},function(e,n,r){e.exports=function(t,o,i){var s,a,l,u,f,c,d,_,v,b,C=o+1,m=t.md.block.ruler.getRules("paragraph");if(t.sCount[o]-t.blkIndent>=4)return!1;for(b=t.parentType,t.parentType="paragraph";C<i&&!t.isEmpty(C);C++)if(!(t.sCount[C]-t.blkIndent>3)){if(t.sCount[C]>=t.blkIndent&&(c=t.bMarks[C]+t.tShift[C],d=t.eMarks[C],c<d&&((v=t.src.charCodeAt(c))===45||v===61)&&(c=t.skipChars(c,v),(c=t.skipSpaces(c))>=d))){_=v===61?1:2;break}if(!(t.sCount[C]<0)){for(a=!1,l=0,u=m.length;l<u;l++)if(m[l](t,C,i,!0)){a=!0;break}if(a)break}}return!!_&&(s=t.getLines(o,C,t.blkIndent,!1).trim(),t.line=C+1,f=t.push("heading_open","h"+String(_),1),f.markup=String.fromCharCode(v),f.map=[o,t.line],f=t.push("inline","",0),f.content=s,f.map=[o,t.line-1],f.children=[],f=t.push("heading_close","h"+String(_),-1),f.markup=String.fromCharCode(v),t.parentType=b,!0)}},function(e,n,r){function t(a,l){var u,f,c,d;return f=a.bMarks[l]+a.tShift[l],c=a.eMarks[l],u=a.src.charCodeAt(f++),u!==42&&u!==45&&u!==43||f<c&&(d=a.src.charCodeAt(f),!s(d))?-1:f}function o(a,l){var u,f=a.bMarks[l]+a.tShift[l],c=f,d=a.eMarks[l];if(c+1>=d||(u=a.src.charCodeAt(c++))<48||u>57)return-1;for(;;){if(c>=d)return-1;u=a.src.charCodeAt(c++);{if(!(u>=48&&u<=57)){if(u===41||u===46)break;return-1}if(c-f>=10)return-1}}return c<d&&(u=a.src.charCodeAt(c),!s(u))?-1:c}function i(a,l){var u,f,c=a.level+2;for(u=l+2,f=a.tokens.length-2;u<f;u++)a.tokens[u].level===c&&a.tokens[u].type==="paragraph_open"&&(a.tokens[u+2].hidden=!0,a.tokens[u].hidden=!0,u+=2)}var s=r(0).isSpace;e.exports=function(a,l,u,f){var c,d,_,v,b,C,m,g,y,k,x,w,A,E,S,O,P,L,M,G,X,j,q,ee,fe,N,V,$,ne=!1,ce=!0;if(a.sCount[l]-a.blkIndent>=4||a.listIndent>=0&&a.sCount[l]-a.listIndent>=4&&a.sCount[l]<a.blkIndent)return!1;if(f&&a.parentType==="paragraph"&&a.tShift[l]>=a.blkIndent&&(ne=!0),(q=o(a,l))>=0){if(m=!0,fe=a.bMarks[l]+a.tShift[l],A=Number(a.src.substr(fe,q-fe-1)),ne&&A!==1)return!1}else{if(!((q=t(a,l))>=0))return!1;m=!1}if(ne&&a.skipSpaces(q)>=a.eMarks[l])return!1;if(w=a.src.charCodeAt(q-1),f)return!0;for(x=a.tokens.length,m?($=a.push("ordered_list_open","ol",1),A!==1&&($.attrs=[["start",A]])):$=a.push("bullet_list_open","ul",1),$.map=k=[l,0],$.markup=String.fromCharCode(w),S=l,ee=!1,V=a.md.block.ruler.getRules("list"),L=a.parentType,a.parentType="list";S<u;){for(j=q,E=a.eMarks[S],C=O=a.sCount[S]+q-(a.bMarks[l]+a.tShift[l]);j<E;){if((c=a.src.charCodeAt(j))===9)O+=4-(O+a.bsCount[S])%4;else{if(c!==32)break;O++}j++}if(d=j,b=d>=E?1:O-C,b>4&&(b=1),v=C+b,$=a.push("list_item_open","li",1),$.markup=String.fromCharCode(w),$.map=g=[l,0],X=a.tight,G=a.tShift[l],M=a.sCount[l],P=a.listIndent,a.listIndent=a.blkIndent,a.blkIndent=v,a.tight=!0,a.tShift[l]=d-a.bMarks[l],a.sCount[l]=O,d>=E&&a.isEmpty(l+1)?a.line=Math.min(a.line+2,u):a.md.block.tokenize(a,l,u,!0),a.tight&&!ee||(ce=!1),ee=a.line-l>1&&a.isEmpty(a.line-1),a.blkIndent=a.listIndent,a.listIndent=P,a.tShift[l]=G,a.sCount[l]=M,a.tight=X,$=a.push("list_item_close","li",-1),$.markup=String.fromCharCode(w),S=l=a.line,g[1]=S,d=a.bMarks[l],S>=u||a.sCount[S]<a.blkIndent||a.sCount[l]-a.blkIndent>=4)break;for(N=!1,_=0,y=V.length;_<y;_++)if(V[_](a,S,u,!0)){N=!0;break}if(N)break;if(m){if((q=o(a,S))<0)break}else if((q=t(a,S))<0)break;if(w!==a.src.charCodeAt(q-1))break}return $=m?a.push("ordered_list_close","ol",-1):a.push("bullet_list_close","ul",-1),$.markup=String.fromCharCode(w),k[1]=S,a.line=S,a.parentType=L,ce&&i(a,x),!0}},function(e,n,r){e.exports=function(t,o){var i,s,a,l,u,f,c=o+1,d=t.md.block.ruler.getRules("paragraph"),_=t.lineMax;for(f=t.parentType,t.parentType="paragraph";c<_&&!t.isEmpty(c);c++)if(!(t.sCount[c]-t.blkIndent>3||t.sCount[c]<0)){for(s=!1,a=0,l=d.length;a<l;a++)if(d[a](t,c,_,!0)){s=!0;break}if(s)break}return i=t.getLines(o,c,t.blkIndent,!1).trim(),t.line=c,u=t.push("paragraph_open","p",1),u.map=[o,t.line],u=t.push("inline","",0),u.content=i,u.map=[o,t.line],u.children=[],u=t.push("paragraph_close","p",-1),t.parentType=f,!0}},function(e,n,r){var t=r(0).normalizeReference,o=r(0).isSpace;e.exports=function(i,s,a,l){var u,f,c,d,_,v,b,C,m,g,y,k,x,w,A,E,S=0,O=i.bMarks[s]+i.tShift[s],P=i.eMarks[s],L=s+1;if(i.sCount[s]-i.blkIndent>=4||i.src.charCodeAt(O)!==91)return!1;for(;++O<P;)if(i.src.charCodeAt(O)===93&&i.src.charCodeAt(O-1)!==92){if(O+1===P||i.src.charCodeAt(O+1)!==58)return!1;break}for(d=i.lineMax,A=i.md.block.ruler.getRules("reference"),g=i.parentType,i.parentType="reference";L<d&&!i.isEmpty(L);L++)if(!(i.sCount[L]-i.blkIndent>3||i.sCount[L]<0)){for(w=!1,v=0,b=A.length;v<b;v++)if(A[v](i,L,d,!0)){w=!0;break}if(w)break}for(x=i.getLines(s,L,i.blkIndent,!1).trim(),P=x.length,O=1;O<P;O++){if((u=x.charCodeAt(O))===91)return!1;if(u===93){m=O;break}(u===10||u===92&&++O<P&&x.charCodeAt(O)===10)&&S++}if(m<0||x.charCodeAt(m+1)!==58)return!1;for(O=m+2;O<P;O++)if((u=x.charCodeAt(O))===10)S++;else if(!o(u))break;if(y=i.md.helpers.parseLinkDestination(x,O,P),!y.ok||(_=i.md.normalizeLink(y.str),!i.md.validateLink(_)))return!1;for(O=y.pos,S+=y.lines,f=O,c=S,k=O;O<P;O++)if((u=x.charCodeAt(O))===10)S++;else if(!o(u))break;for(y=i.md.helpers.parseLinkTitle(x,O,P),O<P&&k!==O&&y.ok?(E=y.str,O=y.pos,S+=y.lines):(E="",O=f,S=c);O<P&&(u=x.charCodeAt(O),o(u));)O++;if(O<P&&x.charCodeAt(O)!==10&&E)for(E="",O=f,S=c;O<P&&(u=x.charCodeAt(O),o(u));)O++;return!(O<P&&x.charCodeAt(O)!==10)&&!!(C=t(x.slice(1,m)))&&(!!l||(i.env.references===void 0&&(i.env.references={}),i.env.references[C]===void 0&&(i.env.references[C]={title:E,href:_}),i.parentType=g,i.line=s+S+1,!0))}},function(e,n,r){function t(s,a,l,u){var f,c,d,_,v,b,C,m;for(this.src=s,this.md=a,this.env=l,this.tokens=u,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0,this.result="",c=this.src,m=!1,d=_=b=C=0,v=c.length;_<v;_++){if(f=c.charCodeAt(_),!m){if(i(f)){b++,f===9?C+=4-C%4:C++;continue}m=!0}f!==10&&_!==v-1||(f!==10&&_++,this.bMarks.push(d),this.eMarks.push(_),this.tShift.push(b),this.sCount.push(C),this.bsCount.push(0),m=!1,b=0,C=0,d=_+1)}this.bMarks.push(c.length),this.eMarks.push(c.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}var o=r(33),i=r(0).isSpace;t.prototype.push=function(s,a,l){var u=new o(s,a,l);return u.block=!0,l<0&&this.level--,u.level=this.level,l>0&&this.level++,this.tokens.push(u),u},t.prototype.isEmpty=function(s){return this.bMarks[s]+this.tShift[s]>=this.eMarks[s]},t.prototype.skipEmptyLines=function(s){for(var a=this.lineMax;s<a&&!(this.bMarks[s]+this.tShift[s]<this.eMarks[s]);s++);return s},t.prototype.skipSpaces=function(s){for(var a,l=this.src.length;s<l&&(a=this.src.charCodeAt(s),i(a));s++);return s},t.prototype.skipSpacesBack=function(s,a){if(s<=a)return s;for(;s>a;)if(!i(this.src.charCodeAt(--s)))return s+1;return s},t.prototype.skipChars=function(s,a){for(var l=this.src.length;s<l&&this.src.charCodeAt(s)===a;s++);return s},t.prototype.skipCharsBack=function(s,a,l){if(s<=l)return s;for(;s>l;)if(a!==this.src.charCodeAt(--s))return s+1;return s},t.prototype.getLines=function(s,a,l,u){var f,c,d,_,v,b,C,m=s;if(s>=a)return"";for(b=new Array(a-s),f=0;m<a;m++,f++){for(c=0,C=_=this.bMarks[m],v=m+1<a||u?this.eMarks[m]+1:this.eMarks[m];_<v&&c<l;){if(d=this.src.charCodeAt(_),i(d))d===9?c+=4-(c+this.bsCount[m])%4:c++;else{if(!(_-C<this.tShift[m]))break;c++}_++}b[f]=c>l?new Array(c-l+1).join(" ")+this.src.slice(_,v):this.src.slice(_,v)}return b.join("")},t.prototype.Token=o,e.exports=t},function(e,n,r){function t(s,a){var l=s.bMarks[a]+s.blkIndent,u=s.eMarks[a];return s.src.substr(l,u-l)}function o(s){var a,l=[],u=0,f=s.length,c=0,d=0,_=!1,v=0;for(a=s.charCodeAt(u);u<f;)a===96?_?(_=!1,v=u):c%2==0&&(_=!0,v=u):a!==124||c%2!=0||_||(l.push(s.substring(d,u)),d=u+1),a===92?c++:c=0,u++,u===f&&_&&(_=!1,u=v+1),a=s.charCodeAt(u);return l.push(s.substring(d)),l}var i=r(0).isSpace;e.exports=function(s,a,l,u){var f,c,d,_,v,b,C,m,g,y,k,x;if(a+2>l||(v=a+1,s.sCount[v]<s.blkIndent)||s.sCount[v]-s.blkIndent>=4||(d=s.bMarks[v]+s.tShift[v])>=s.eMarks[v]||(f=s.src.charCodeAt(d++))!==124&&f!==45&&f!==58)return!1;for(;d<s.eMarks[v];){if((f=s.src.charCodeAt(d))!==124&&f!==45&&f!==58&&!i(f))return!1;d++}for(c=t(s,a+1),b=c.split("|"),g=[],_=0;_<b.length;_++){if(!(y=b[_].trim())){if(_===0||_===b.length-1)continue;return!1}if(!/^:?-+:?$/.test(y))return!1;y.charCodeAt(y.length-1)===58?g.push(y.charCodeAt(0)===58?"center":"right"):y.charCodeAt(0)===58?g.push("left"):g.push("")}if(c=t(s,a).trim(),c.indexOf("|")===-1||s.sCount[a]-s.blkIndent>=4||(b=o(c.replace(/^\||\|$/g,"")),(C=b.length)>g.length))return!1;if(u)return!0;for(m=s.push("table_open","table",1),m.map=k=[a,0],m=s.push("thead_open","thead",1),m.map=[a,a+1],m=s.push("tr_open","tr",1),m.map=[a,a+1],_=0;_<b.length;_++)m=s.push("th_open","th",1),m.map=[a,a+1],g[_]&&(m.attrs=[["style","text-align:"+g[_]]]),m=s.push("inline","",0),m.content=b[_].trim(),m.map=[a,a+1],m.children=[],m=s.push("th_close","th",-1);for(m=s.push("tr_close","tr",-1),m=s.push("thead_close","thead",-1),m=s.push("tbody_open","tbody",1),m.map=x=[a+2,0],v=a+2;v<l&&!(s.sCount[v]<s.blkIndent)&&(c=t(s,v).trim(),c.indexOf("|")!==-1)&&!(s.sCount[v]-s.blkIndent>=4);v++){for(b=o(c.replace(/^\||\|$/g,"")),m=s.push("tr_open","tr",1),_=0;_<C;_++)m=s.push("td_open","td",1),g[_]&&(m.attrs=[["style","text-align:"+g[_]]]),m=s.push("inline","",0),m.content=b[_]?b[_].trim():"",m.children=[],m=s.push("td_close","td",-1);m=s.push("tr_close","tr",-1)}return m=s.push("tbody_close","tbody",-1),m=s.push("table_close","table",-1),k[1]=x[1]=v,s.line=v,!0}},function(e,n,r){e.exports=function(t){var o;t.inlineMode?(o=new t.Token("inline","",0),o.content=t.src,o.map=[0,1],o.children=[],t.tokens.push(o)):t.md.block.parse(t.src,t.md,t.env,t.tokens)}},function(e,n,r){e.exports=function(t){var o,i,s,a=t.tokens;for(i=0,s=a.length;i<s;i++)o=a[i],o.type==="inline"&&t.md.inline.parse(o.content,t.md,t.env,o.children)}},function(e,n,r){function t(s){return/^<a[>\s]/i.test(s)}function o(s){return/^<\/a\s*>/i.test(s)}var i=r(0).arrayReplaceAt;e.exports=function(s){var a,l,u,f,c,d,_,v,b,C,m,g,y,k,x,w,A,E=s.tokens;if(s.md.options.linkify){for(l=0,u=E.length;l<u;l++)if(E[l].type==="inline"&&s.md.linkify.pretest(E[l].content))for(f=E[l].children,y=0,a=f.length-1;a>=0;a--)if(d=f[a],d.type!=="link_close"){if(d.type==="html_inline"&&(t(d.content)&&y>0&&y--,o(d.content)&&y++),!(y>0)&&d.type==="text"&&s.md.linkify.test(d.content)){for(b=d.content,A=s.md.linkify.match(b),_=[],g=d.level,m=0,v=0;v<A.length;v++)k=A[v].url,x=s.md.normalizeLink(k),s.md.validateLink(x)&&(w=A[v].text,w=A[v].schema?A[v].schema!=="mailto:"||/^mailto:/i.test(w)?s.md.normalizeLinkText(w):s.md.normalizeLinkText("mailto:"+w).replace(/^mailto:/,""):s.md.normalizeLinkText("http://"+w).replace(/^http:\/\//,""),C=A[v].index,C>m&&(c=new s.Token("text","",0),c.content=b.slice(m,C),c.level=g,_.push(c)),c=new s.Token("link_open","a",1),c.attrs=[["href",x]],c.level=g++,c.markup="linkify",c.info="auto",_.push(c),c=new s.Token("text","",0),c.content=w,c.level=g,_.push(c),c=new s.Token("link_close","a",-1),c.level=--g,c.markup="linkify",c.info="auto",_.push(c),m=A[v].lastIndex);m<b.length&&(c=new s.Token("text","",0),c.content=b.slice(m),c.level=g,_.push(c)),E[l].children=f=i(f,a,_)}}else for(a--;f[a].level!==d.level&&f[a].type!=="link_open";)a--}}},function(e,n,r){var t=/\r\n?|\n/g,o=/\0/g;e.exports=function(i){var s;s=i.src.replace(t,`
`),s=s.replace(o,"\uFFFD"),i.src=s}},function(e,n,r){function t(f,c){return u[c.toLowerCase()]}function o(f){var c,d,_=0;for(c=f.length-1;c>=0;c--)d=f[c],d.type!=="text"||_||(d.content=d.content.replace(l,t)),d.type==="link_open"&&d.info==="auto"&&_--,d.type==="link_close"&&d.info==="auto"&&_++}function i(f){var c,d,_=0;for(c=f.length-1;c>=0;c--)d=f[c],d.type!=="text"||_||s.test(d.content)&&(d.content=d.content.replace(/\+-/g,"\xB1").replace(/\.{2,}/g,"\u2026").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---([^-]|$)/gm,"$1\u2014$2").replace(/(^|\s)--(\s|$)/gm,"$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/gm,"$1\u2013$2")),d.type==="link_open"&&d.info==="auto"&&_--,d.type==="link_close"&&d.info==="auto"&&_++}var s=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,a=/\((c|tm|r|p)\)/i,l=/\((c|tm|r|p)\)/gi,u={c:"\xA9",r:"\xAE",p:"\xA7",tm:"\u2122"};e.exports=function(f){var c;if(f.md.options.typographer)for(c=f.tokens.length-1;c>=0;c--)f.tokens[c].type==="inline"&&(a.test(f.tokens[c].content)&&o(f.tokens[c].children),s.test(f.tokens[c].content)&&i(f.tokens[c].children))}},function(e,n,r){function t(c,d,_){return c.substr(0,d)+_+c.substr(d+1)}function o(c,d){var _,v,b,C,m,g,y,k,x,w,A,E,S,O,P,L,M,G,X,j,q;for(X=[],_=0;_<c.length;_++){for(v=c[_],y=c[_].level,M=X.length-1;M>=0&&!(X[M].level<=y);M--);if(X.length=M+1,v.type==="text"){b=v.content,m=0,g=b.length;e:for(;m<g&&(u.lastIndex=m,C=u.exec(b));){if(P=L=!0,m=C.index+1,G=C[0]==="'",x=32,C.index-1>=0)x=b.charCodeAt(C.index-1);else for(M=_-1;M>=0&&c[M].type!=="softbreak"&&c[M].type!=="hardbreak";M--)if(c[M].type==="text"){x=c[M].content.charCodeAt(c[M].content.length-1);break}if(w=32,m<g)w=b.charCodeAt(m);else for(M=_+1;M<c.length&&c[M].type!=="softbreak"&&c[M].type!=="hardbreak";M++)if(c[M].type==="text"){w=c[M].content.charCodeAt(0);break}if(A=a(x)||s(String.fromCharCode(x)),E=a(w)||s(String.fromCharCode(w)),S=i(x),O=i(w),O?P=!1:E&&(S||A||(P=!1)),S?L=!1:A&&(O||E||(L=!1)),w===34&&C[0]==='"'&&x>=48&&x<=57&&(L=P=!1),P&&L&&(P=!1,L=E),P||L){if(L){for(M=X.length-1;M>=0&&(k=X[M],!(X[M].level<y));M--)if(k.single===G&&X[M].level===y){k=X[M],G?(j=d.md.options.quotes[2],q=d.md.options.quotes[3]):(j=d.md.options.quotes[0],q=d.md.options.quotes[1]),v.content=t(v.content,C.index,q),c[k.token].content=t(c[k.token].content,k.pos,j),m+=q.length-1,k.token===_&&(m+=j.length-1),b=v.content,g=b.length,X.length=M;continue e}}P?X.push({token:_,pos:C.index,single:G,level:y}):L&&G&&(v.content=t(v.content,C.index,f))}else G&&(v.content=t(v.content,C.index,f))}}}}var i=r(0).isWhiteSpace,s=r(0).isPunctChar,a=r(0).isMdAsciiPunct,l=/['"]/,u=/['"]/g,f="\u2019";e.exports=function(c){var d;if(c.md.options.typographer)for(d=c.tokens.length-1;d>=0;d--)c.tokens[d].type==="inline"&&l.test(c.tokens[d].content)&&o(c.tokens[d].children,c)}},function(e,n,r){function t(i,s,a){this.src=i,this.env=a,this.tokens=[],this.inlineMode=!1,this.md=s}var o=r(33);t.prototype.Token=o,e.exports=t},function(e,n,r){var t=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,o=/^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;e.exports=function(i,s){var a,l,u,f,c,d,_=i.pos;return i.src.charCodeAt(_)===60&&(a=i.src.slice(_),!(a.indexOf(">")<0)&&(o.test(a)?(l=a.match(o),f=l[0].slice(1,-1),c=i.md.normalizeLink(f),!!i.md.validateLink(c)&&(s||(d=i.push("link_open","a",1),d.attrs=[["href",c]],d.markup="autolink",d.info="auto",d=i.push("text","",0),d.content=i.md.normalizeLinkText(f),d=i.push("link_close","a",-1),d.markup="autolink",d.info="auto"),i.pos+=l[0].length,!0)):!!t.test(a)&&(u=a.match(t),f=u[0].slice(1,-1),c=i.md.normalizeLink("mailto:"+f),!!i.md.validateLink(c)&&(s||(d=i.push("link_open","a",1),d.attrs=[["href",c]],d.markup="autolink",d.info="auto",d=i.push("text","",0),d.content=i.md.normalizeLinkText(f),d=i.push("link_close","a",-1),d.markup="autolink",d.info="auto"),i.pos+=u[0].length,!0))))}},function(e,n,r){e.exports=function(t,o){var i,s,a,l,u,f,c=t.pos;if(t.src.charCodeAt(c)!==96)return!1;for(i=c,c++,s=t.posMax;c<s&&t.src.charCodeAt(c)===96;)c++;for(a=t.src.slice(i,c),l=u=c;(l=t.src.indexOf("`",u))!==-1;){for(u=l+1;u<s&&t.src.charCodeAt(u)===96;)u++;if(u-l===a.length)return o||(f=t.push("code_inline","code",0),f.markup=a,f.content=t.src.slice(c,l).replace(/\n/g," ").replace(/^ (.+) $/,"$1")),t.pos=u,!0}return o||(t.pending+=a),t.pos+=a.length,!0}},function(e,n,r){function t(o,i){var s,a,l,u,f,c,d,_,v={},b=i.length;for(s=0;s<b;s++)if(l=i[s],l.length=l.length||0,l.close){for(v.hasOwnProperty(l.marker)||(v[l.marker]=[-1,-1,-1]),f=v[l.marker][l.length%3],c=-1,a=s-l.jump-1;a>f;a-=u.jump+1)if(u=i[a],u.marker===l.marker&&(c===-1&&(c=a),u.open&&u.end<0&&u.level===l.level&&(d=!1,(u.close||l.open)&&(u.length+l.length)%3==0&&(u.length%3==0&&l.length%3==0||(d=!0)),!d))){_=a>0&&!i[a-1].open?i[a-1].jump+1:0,l.jump=s-a+_,l.open=!1,u.end=s,u.jump=_,u.close=!1,c=-1;break}c!==-1&&(v[l.marker][(l.length||0)%3]=c)}}e.exports=function(o){var i,s=o.tokens_meta,a=o.tokens_meta.length;for(t(o,o.delimiters),i=0;i<a;i++)s[i]&&s[i].delimiters&&t(o,s[i].delimiters)}},function(e,n,r){var t=r(53),o=r(0).has,i=r(0).isValidEntityCode,s=r(0).fromCodePoint,a=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,l=/^&([a-z][a-z0-9]{1,31});/i;e.exports=function(u,f){var c,d,_=u.pos,v=u.posMax;if(u.src.charCodeAt(_)!==38)return!1;if(_+1<v){if(u.src.charCodeAt(_+1)===35){if(d=u.src.slice(_).match(a))return f||(c=d[1][0].toLowerCase()==="x"?parseInt(d[1].slice(1),16):parseInt(d[1],10),u.pending+=s(i(c)?c:65533)),u.pos+=d[0].length,!0}else if((d=u.src.slice(_).match(l))&&o(t,d[1]))return f||(u.pending+=t[d[1]]),u.pos+=d[0].length,!0}return f||(u.pending+="&"),u.pos++,!0}},function(e,n,r){for(var t=r(0).isSpace,o=[],i=0;i<256;i++)o.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(s){o[s.charCodeAt(0)]=1}),e.exports=function(s,a){var l,u=s.pos,f=s.posMax;if(s.src.charCodeAt(u)!==92)return!1;if(++u<f){if((l=s.src.charCodeAt(u))<256&&o[l]!==0)return a||(s.pending+=s.src[u]),s.pos+=2,!0;if(l===10){for(a||s.push("hardbreak","br",0),u++;u<f&&(l=s.src.charCodeAt(u),t(l));)u++;return s.pos=u,!0}}return a||(s.pending+="\\"),s.pos++,!0}},function(e,n,r){function t(i){var s=32|i;return s>=97&&s<=122}var o=r(54).HTML_TAG_RE;e.exports=function(i,s){var a,l,u,f,c=i.pos;return!!i.md.options.html&&(u=i.posMax,!(i.src.charCodeAt(c)!==60||c+2>=u)&&!((a=i.src.charCodeAt(c+1))!==33&&a!==63&&a!==47&&!t(a))&&!!(l=i.src.slice(c).match(o))&&(s||(f=i.push("html_inline","",0),f.content=i.src.slice(c,c+l[0].length)),i.pos+=l[0].length,!0))}},function(e,n,r){var t=r(0).normalizeReference,o=r(0).isSpace;e.exports=function(i,s){var a,l,u,f,c,d,_,v,b,C,m,g,y,k="",x=i.pos,w=i.posMax;if(i.src.charCodeAt(i.pos)!==33||i.src.charCodeAt(i.pos+1)!==91||(d=i.pos+2,(c=i.md.helpers.parseLinkLabel(i,i.pos+1,!1))<0))return!1;if((_=c+1)<w&&i.src.charCodeAt(_)===40){for(_++;_<w&&(l=i.src.charCodeAt(_),o(l)||l===10);_++);if(_>=w)return!1;for(y=_,b=i.md.helpers.parseLinkDestination(i.src,_,i.posMax),b.ok&&(k=i.md.normalizeLink(b.str),i.md.validateLink(k)?_=b.pos:k=""),y=_;_<w&&(l=i.src.charCodeAt(_),o(l)||l===10);_++);if(b=i.md.helpers.parseLinkTitle(i.src,_,i.posMax),_<w&&y!==_&&b.ok)for(C=b.str,_=b.pos;_<w&&(l=i.src.charCodeAt(_),o(l)||l===10);_++);else C="";if(_>=w||i.src.charCodeAt(_)!==41)return i.pos=x,!1;_++}else{if(i.env.references===void 0)return!1;if(_<w&&i.src.charCodeAt(_)===91?(y=_+1,_=i.md.helpers.parseLinkLabel(i,_),_>=0?f=i.src.slice(y,_++):_=c+1):_=c+1,f||(f=i.src.slice(d,c)),!(v=i.env.references[t(f)]))return i.pos=x,!1;k=v.href,C=v.title}return s||(u=i.src.slice(d,c),i.md.inline.parse(u,i.md,i.env,g=[]),m=i.push("image","img",0),m.attrs=a=[["src",k],["alt",""]],m.children=g,m.content=u,C&&a.push(["title",C])),i.pos=_,i.posMax=w,!0}},function(e,n,r){var t=r(0).normalizeReference,o=r(0).isSpace;e.exports=function(i,s){var a,l,u,f,c,d,_,v,b,C,m="",g=i.pos,y=i.posMax,k=i.pos,x=!0;if(i.src.charCodeAt(i.pos)!==91||(c=i.pos+1,(f=i.md.helpers.parseLinkLabel(i,i.pos,!0))<0))return!1;if((d=f+1)<y&&i.src.charCodeAt(d)===40){for(x=!1,d++;d<y&&(l=i.src.charCodeAt(d),o(l)||l===10);d++);if(d>=y)return!1;for(k=d,_=i.md.helpers.parseLinkDestination(i.src,d,i.posMax),_.ok&&(m=i.md.normalizeLink(_.str),i.md.validateLink(m)?d=_.pos:m=""),k=d;d<y&&(l=i.src.charCodeAt(d),o(l)||l===10);d++);if(_=i.md.helpers.parseLinkTitle(i.src,d,i.posMax),d<y&&k!==d&&_.ok)for(b=_.str,d=_.pos;d<y&&(l=i.src.charCodeAt(d),o(l)||l===10);d++);else b="";(d>=y||i.src.charCodeAt(d)!==41)&&(x=!0),d++}if(x){if(i.env.references===void 0)return!1;if(d<y&&i.src.charCodeAt(d)===91?(k=d+1,d=i.md.helpers.parseLinkLabel(i,d),d>=0?u=i.src.slice(k,d++):d=f+1):d=f+1,u||(u=i.src.slice(c,f)),!(v=i.env.references[t(u)]))return i.pos=g,!1;m=v.href,b=v.title}return s||(i.pos=c,i.posMax=f,C=i.push("link_open","a",1),C.attrs=a=[["href",m]],b&&a.push(["title",b]),i.md.inline.tokenize(i),C=i.push("link_close","a",-1)),i.pos=d,i.posMax=y,!0}},function(e,n,r){var t=r(0).isSpace;e.exports=function(o,i){var s,a,l=o.pos;if(o.src.charCodeAt(l)!==10)return!1;for(s=o.pending.length-1,a=o.posMax,i||(s>=0&&o.pending.charCodeAt(s)===32?s>=1&&o.pending.charCodeAt(s-1)===32?(o.pending=o.pending.replace(/ +$/,""),o.push("hardbreak","br",0)):(o.pending=o.pending.slice(0,-1),o.push("softbreak","br",0)):o.push("softbreak","br",0)),l++;l<a&&t(o.src.charCodeAt(l));)l++;return o.pos=l,!0}},function(e,n,r){function t(l,u,f,c){this.src=l,this.env=f,this.md=u,this.tokens=c,this.tokens_meta=Array(c.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[]}var o=r(33),i=r(0).isWhiteSpace,s=r(0).isPunctChar,a=r(0).isMdAsciiPunct;t.prototype.pushPending=function(){var l=new o("text","",0);return l.content=this.pending,l.level=this.pendingLevel,this.tokens.push(l),this.pending="",l},t.prototype.push=function(l,u,f){this.pending&&this.pushPending();var c=new o(l,u,f),d=null;return f<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),c.level=this.level,f>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],d={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(c),this.tokens_meta.push(d),c},t.prototype.scanDelims=function(l,u){var f,c,d,_,v,b,C,m,g,y=l,k=!0,x=!0,w=this.posMax,A=this.src.charCodeAt(l);for(f=l>0?this.src.charCodeAt(l-1):32;y<w&&this.src.charCodeAt(y)===A;)y++;return d=y-l,c=y<w?this.src.charCodeAt(y):32,C=a(f)||s(String.fromCharCode(f)),g=a(c)||s(String.fromCharCode(c)),b=i(f),m=i(c),m?k=!1:g&&(b||C||(k=!1)),b?x=!1:C&&(m||g||(x=!1)),u?(_=k,v=x):(_=k&&(!x||C),v=x&&(!k||g)),{can_open:_,can_close:v,length:d}},t.prototype.Token=o,e.exports=t},function(e,n,r){function t(o){switch(o){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}e.exports=function(o,i){for(var s=o.pos;s<o.posMax&&!t(o.src.charCodeAt(s));)s++;return s!==o.pos&&(i||(o.pending+=o.src.slice(o.pos,s)),o.pos=s,!0)}},function(e,n,r){e.exports=function(t){var o,i,s=0,a=t.tokens,l=t.tokens.length;for(o=i=0;o<l;o++)a[o].nesting<0&&s--,a[o].level=s,a[o].nesting>0&&s++,a[o].type==="text"&&o+1<l&&a[o+1].type==="text"?a[o+1].content=a[o].content+a[o+1].content:(o!==i&&(a[i]=a[o]),i++);o!==i&&(a.length=i)}},function(e,n){e.exports={Aacute:"\xC1",aacute:"\xE1",Abreve:"\u0102",abreve:"\u0103",ac:"\u223E",acd:"\u223F",acE:"\u223E\u0333",Acirc:"\xC2",acirc:"\xE2",acute:"\xB4",Acy:"\u0410",acy:"\u0430",AElig:"\xC6",aelig:"\xE6",af:"\u2061",Afr:"\u{1D504}",afr:"\u{1D51E}",Agrave:"\xC0",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",Alpha:"\u0391",alpha:"\u03B1",Amacr:"\u0100",amacr:"\u0101",amalg:"\u2A3F",amp:"&",AMP:"&",andand:"\u2A55",And:"\u2A53",and:"\u2227",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",ange:"\u29A4",angle:"\u2220",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angmsd:"\u2221",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angst:"\xC5",angzarr:"\u237C",Aogon:"\u0104",aogon:"\u0105",Aopf:"\u{1D538}",aopf:"\u{1D552}",apacir:"\u2A6F",ap:"\u2248",apE:"\u2A70",ape:"\u224A",apid:"\u224B",apos:"'",ApplyFunction:"\u2061",approx:"\u2248",approxeq:"\u224A",Aring:"\xC5",aring:"\xE5",Ascr:"\u{1D49C}",ascr:"\u{1D4B6}",Assign:"\u2254",ast:"*",asymp:"\u2248",asympeq:"\u224D",Atilde:"\xC3",atilde:"\xE3",Auml:"\xC4",auml:"\xE4",awconint:"\u2233",awint:"\u2A11",backcong:"\u224C",backepsilon:"\u03F6",backprime:"\u2035",backsim:"\u223D",backsimeq:"\u22CD",Backslash:"\u2216",Barv:"\u2AE7",barvee:"\u22BD",barwed:"\u2305",Barwed:"\u2306",barwedge:"\u2305",bbrk:"\u23B5",bbrktbrk:"\u23B6",bcong:"\u224C",Bcy:"\u0411",bcy:"\u0431",bdquo:"\u201E",becaus:"\u2235",because:"\u2235",Because:"\u2235",bemptyv:"\u29B0",bepsi:"\u03F6",bernou:"\u212C",Bernoullis:"\u212C",Beta:"\u0392",beta:"\u03B2",beth:"\u2136",between:"\u226C",Bfr:"\u{1D505}",bfr:"\u{1D51F}",bigcap:"\u22C2",bigcirc:"\u25EF",bigcup:"\u22C3",bigodot:"\u2A00",bigoplus:"\u2A01",bigotimes:"\u2A02",bigsqcup:"\u2A06",bigstar:"\u2605",bigtriangledown:"\u25BD",bigtriangleup:"\u25B3",biguplus:"\u2A04",bigvee:"\u22C1",bigwedge:"\u22C0",bkarow:"\u290D",blacklozenge:"\u29EB",blacksquare:"\u25AA",blacktriangle:"\u25B4",blacktriangledown:"\u25BE",blacktriangleleft:"\u25C2",blacktriangleright:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bNot:"\u2AED",bnot:"\u2310",Bopf:"\u{1D539}",bopf:"\u{1D553}",bot:"\u22A5",bottom:"\u22A5",bowtie:"\u22C8",boxbox:"\u29C9",boxdl:"\u2510",boxdL:"\u2555",boxDl:"\u2556",boxDL:"\u2557",boxdr:"\u250C",boxdR:"\u2552",boxDr:"\u2553",boxDR:"\u2554",boxh:"\u2500",boxH:"\u2550",boxhd:"\u252C",boxHd:"\u2564",boxhD:"\u2565",boxHD:"\u2566",boxhu:"\u2534",boxHu:"\u2567",boxhU:"\u2568",boxHU:"\u2569",boxminus:"\u229F",boxplus:"\u229E",boxtimes:"\u22A0",boxul:"\u2518",boxuL:"\u255B",boxUl:"\u255C",boxUL:"\u255D",boxur:"\u2514",boxuR:"\u2558",boxUr:"\u2559",boxUR:"\u255A",boxv:"\u2502",boxV:"\u2551",boxvh:"\u253C",boxvH:"\u256A",boxVh:"\u256B",boxVH:"\u256C",boxvl:"\u2524",boxvL:"\u2561",boxVl:"\u2562",boxVL:"\u2563",boxvr:"\u251C",boxvR:"\u255E",boxVr:"\u255F",boxVR:"\u2560",bprime:"\u2035",breve:"\u02D8",Breve:"\u02D8",brvbar:"\xA6",bscr:"\u{1D4B7}",Bscr:"\u212C",bsemi:"\u204F",bsim:"\u223D",bsime:"\u22CD",bsolb:"\u29C5",bsol:"\\",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bump:"\u224E",bumpE:"\u2AAE",bumpe:"\u224F",Bumpeq:"\u224E",bumpeq:"\u224F",Cacute:"\u0106",cacute:"\u0107",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",cap:"\u2229",Cap:"\u22D2",capcup:"\u2A47",capdot:"\u2A40",CapitalDifferentialD:"\u2145",caps:"\u2229\uFE00",caret:"\u2041",caron:"\u02C7",Cayleys:"\u212D",ccaps:"\u2A4D",Ccaron:"\u010C",ccaron:"\u010D",Ccedil:"\xC7",ccedil:"\xE7",Ccirc:"\u0108",ccirc:"\u0109",Cconint:"\u2230",ccups:"\u2A4C",ccupssm:"\u2A50",Cdot:"\u010A",cdot:"\u010B",cedil:"\xB8",Cedilla:"\xB8",cemptyv:"\u29B2",cent:"\xA2",centerdot:"\xB7",CenterDot:"\xB7",cfr:"\u{1D520}",Cfr:"\u212D",CHcy:"\u0427",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",Chi:"\u03A7",chi:"\u03C7",circ:"\u02C6",circeq:"\u2257",circlearrowleft:"\u21BA",circlearrowright:"\u21BB",circledast:"\u229B",circledcirc:"\u229A",circleddash:"\u229D",CircleDot:"\u2299",circledR:"\xAE",circledS:"\u24C8",CircleMinus:"\u2296",CirclePlus:"\u2295",CircleTimes:"\u2297",cir:"\u25CB",cirE:"\u29C3",cire:"\u2257",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",ClockwiseContourIntegral:"\u2232",CloseCurlyDoubleQuote:"\u201D",CloseCurlyQuote:"\u2019",clubs:"\u2663",clubsuit:"\u2663",colon:":",Colon:"\u2237",Colone:"\u2A74",colone:"\u2254",coloneq:"\u2254",comma:",",commat:"@",comp:"\u2201",compfn:"\u2218",complement:"\u2201",complexes:"\u2102",cong:"\u2245",congdot:"\u2A6D",Congruent:"\u2261",conint:"\u222E",Conint:"\u222F",ContourIntegral:"\u222E",copf:"\u{1D554}",Copf:"\u2102",coprod:"\u2210",Coproduct:"\u2210",copy:"\xA9",COPY:"\xA9",copysr:"\u2117",CounterClockwiseContourIntegral:"\u2233",crarr:"\u21B5",cross:"\u2717",Cross:"\u2A2F",Cscr:"\u{1D49E}",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",cuesc:"\u22DF",cularr:"\u21B6",cularrp:"\u293D",cupbrcap:"\u2A48",cupcap:"\u2A46",CupCap:"\u224D",cup:"\u222A",Cup:"\u22D3",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curarrm:"\u293C",curlyeqprec:"\u22DE",curlyeqsucc:"\u22DF",curlyvee:"\u22CE",curlywedge:"\u22CF",curren:"\xA4",curvearrowleft:"\u21B6",curvearrowright:"\u21B7",cuvee:"\u22CE",cuwed:"\u22CF",cwconint:"\u2232",cwint:"\u2231",cylcty:"\u232D",dagger:"\u2020",Dagger:"\u2021",daleth:"\u2138",darr:"\u2193",Darr:"\u21A1",dArr:"\u21D3",dash:"\u2010",Dashv:"\u2AE4",dashv:"\u22A3",dbkarow:"\u290F",dblac:"\u02DD",Dcaron:"\u010E",dcaron:"\u010F",Dcy:"\u0414",dcy:"\u0434",ddagger:"\u2021",ddarr:"\u21CA",DD:"\u2145",dd:"\u2146",DDotrahd:"\u2911",ddotseq:"\u2A77",deg:"\xB0",Del:"\u2207",Delta:"\u0394",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",Dfr:"\u{1D507}",dfr:"\u{1D521}",dHar:"\u2965",dharl:"\u21C3",dharr:"\u21C2",DiacriticalAcute:"\xB4",DiacriticalDot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",DiacriticalGrave:"`",DiacriticalTilde:"\u02DC",diam:"\u22C4",diamond:"\u22C4",Diamond:"\u22C4",diamondsuit:"\u2666",diams:"\u2666",die:"\xA8",DifferentialD:"\u2146",digamma:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",DJcy:"\u0402",djcy:"\u0452",dlcorn:"\u231E",dlcrop:"\u230D",dollar:"$",Dopf:"\u{1D53B}",dopf:"\u{1D555}",Dot:"\xA8",dot:"\u02D9",DotDot:"\u20DC",doteq:"\u2250",doteqdot:"\u2251",DotEqual:"\u2250",dotminus:"\u2238",dotplus:"\u2214",dotsquare:"\u22A1",doublebarwedge:"\u2306",DoubleContourIntegral:"\u222F",DoubleDot:"\xA8",DoubleDownArrow:"\u21D3",DoubleLeftArrow:"\u21D0",DoubleLeftRightArrow:"\u21D4",DoubleLeftTee:"\u2AE4",DoubleLongLeftArrow:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",DoubleLongRightArrow:"\u27F9",DoubleRightArrow:"\u21D2",DoubleRightTee:"\u22A8",DoubleUpArrow:"\u21D1",DoubleUpDownArrow:"\u21D5",DoubleVerticalBar:"\u2225",DownArrowBar:"\u2913",downarrow:"\u2193",DownArrow:"\u2193",Downarrow:"\u21D3",DownArrowUpArrow:"\u21F5",DownBreve:"\u0311",downdownarrows:"\u21CA",downharpoonleft:"\u21C3",downharpoonright:"\u21C2",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVectorBar:"\u2956",DownLeftVector:"\u21BD",DownRightTeeVector:"\u295F",DownRightVectorBar:"\u2957",DownRightVector:"\u21C1",DownTeeArrow:"\u21A7",DownTee:"\u22A4",drbkarow:"\u2910",drcorn:"\u231F",drcrop:"\u230C",Dscr:"\u{1D49F}",dscr:"\u{1D4B9}",DScy:"\u0405",dscy:"\u0455",dsol:"\u29F6",Dstrok:"\u0110",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",dtrif:"\u25BE",duarr:"\u21F5",duhar:"\u296F",dwangle:"\u29A6",DZcy:"\u040F",dzcy:"\u045F",dzigrarr:"\u27FF",Eacute:"\xC9",eacute:"\xE9",easter:"\u2A6E",Ecaron:"\u011A",ecaron:"\u011B",Ecirc:"\xCA",ecirc:"\xEA",ecir:"\u2256",ecolon:"\u2255",Ecy:"\u042D",ecy:"\u044D",eDDot:"\u2A77",Edot:"\u0116",edot:"\u0117",eDot:"\u2251",ee:"\u2147",efDot:"\u2252",Efr:"\u{1D508}",efr:"\u{1D522}",eg:"\u2A9A",Egrave:"\xC8",egrave:"\xE8",egs:"\u2A96",egsdot:"\u2A98",el:"\u2A99",Element:"\u2208",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",elsdot:"\u2A97",Emacr:"\u0112",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",EmptySmallSquare:"\u25FB",emptyv:"\u2205",EmptyVerySmallSquare:"\u25AB",emsp13:"\u2004",emsp14:"\u2005",emsp:"\u2003",ENG:"\u014A",eng:"\u014B",ensp:"\u2002",Eogon:"\u0118",eogon:"\u0119",Eopf:"\u{1D53C}",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",Epsilon:"\u0395",epsilon:"\u03B5",epsiv:"\u03F5",eqcirc:"\u2256",eqcolon:"\u2255",eqsim:"\u2242",eqslantgtr:"\u2A96",eqslantless:"\u2A95",Equal:"\u2A75",equals:"=",EqualTilde:"\u2242",equest:"\u225F",Equilibrium:"\u21CC",equiv:"\u2261",equivDD:"\u2A78",eqvparsl:"\u29E5",erarr:"\u2971",erDot:"\u2253",escr:"\u212F",Escr:"\u2130",esdot:"\u2250",Esim:"\u2A73",esim:"\u2242",Eta:"\u0397",eta:"\u03B7",ETH:"\xD0",eth:"\xF0",Euml:"\xCB",euml:"\xEB",euro:"\u20AC",excl:"!",exist:"\u2203",Exists:"\u2203",expectation:"\u2130",exponentiale:"\u2147",ExponentialE:"\u2147",fallingdotseq:"\u2252",Fcy:"\u0424",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",Ffr:"\u{1D509}",ffr:"\u{1D523}",filig:"\uFB01",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",Fopf:"\u{1D53D}",fopf:"\u{1D557}",forall:"\u2200",ForAll:"\u2200",fork:"\u22D4",forkv:"\u2AD9",Fouriertrf:"\u2131",fpartint:"\u2A0D",frac12:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",fscr:"\u{1D4BB}",Fscr:"\u2131",gacute:"\u01F5",Gamma:"\u0393",gamma:"\u03B3",Gammad:"\u03DC",gammad:"\u03DD",gap:"\u2A86",Gbreve:"\u011E",gbreve:"\u011F",Gcedil:"\u0122",Gcirc:"\u011C",gcirc:"\u011D",Gcy:"\u0413",gcy:"\u0433",Gdot:"\u0120",gdot:"\u0121",ge:"\u2265",gE:"\u2267",gEl:"\u2A8C",gel:"\u22DB",geq:"\u2265",geqq:"\u2267",geqslant:"\u2A7E",gescc:"\u2AA9",ges:"\u2A7E",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",Gfr:"\u{1D50A}",gfr:"\u{1D524}",gg:"\u226B",Gg:"\u22D9",ggg:"\u22D9",gimel:"\u2137",GJcy:"\u0403",gjcy:"\u0453",gla:"\u2AA5",gl:"\u2277",glE:"\u2A92",glj:"\u2AA4",gnap:"\u2A8A",gnapprox:"\u2A8A",gne:"\u2A88",gnE:"\u2269",gneq:"\u2A88",gneqq:"\u2269",gnsim:"\u22E7",Gopf:"\u{1D53E}",gopf:"\u{1D558}",grave:"`",GreaterEqual:"\u2265",GreaterEqualLess:"\u22DB",GreaterFullEqual:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",GreaterSlantEqual:"\u2A7E",GreaterTilde:"\u2273",Gscr:"\u{1D4A2}",gscr:"\u210A",gsim:"\u2273",gsime:"\u2A8E",gsiml:"\u2A90",gtcc:"\u2AA7",gtcir:"\u2A7A",gt:">",GT:">",Gt:"\u226B",gtdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrapprox:"\u2A86",gtrarr:"\u2978",gtrdot:"\u22D7",gtreqless:"\u22DB",gtreqqless:"\u2A8C",gtrless:"\u2277",gtrsim:"\u2273",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",Hacek:"\u02C7",hairsp:"\u200A",half:"\xBD",hamilt:"\u210B",HARDcy:"\u042A",hardcy:"\u044A",harrcir:"\u2948",harr:"\u2194",hArr:"\u21D4",harrw:"\u21AD",Hat:"^",hbar:"\u210F",Hcirc:"\u0124",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",hercon:"\u22B9",hfr:"\u{1D525}",Hfr:"\u210C",HilbertSpace:"\u210B",hksearow:"\u2925",hkswarow:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",hookrightarrow:"\u21AA",hopf:"\u{1D559}",Hopf:"\u210D",horbar:"\u2015",HorizontalLine:"\u2500",hscr:"\u{1D4BD}",Hscr:"\u210B",hslash:"\u210F",Hstrok:"\u0126",hstrok:"\u0127",HumpDownHump:"\u224E",HumpEqual:"\u224F",hybull:"\u2043",hyphen:"\u2010",Iacute:"\xCD",iacute:"\xED",ic:"\u2063",Icirc:"\xCE",icirc:"\xEE",Icy:"\u0418",icy:"\u0438",Idot:"\u0130",IEcy:"\u0415",iecy:"\u0435",iexcl:"\xA1",iff:"\u21D4",ifr:"\u{1D526}",Ifr:"\u2111",Igrave:"\xCC",igrave:"\xEC",ii:"\u2148",iiiint:"\u2A0C",iiint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",IJlig:"\u0132",ijlig:"\u0133",Imacr:"\u012A",imacr:"\u012B",image:"\u2111",ImaginaryI:"\u2148",imagline:"\u2110",imagpart:"\u2111",imath:"\u0131",Im:"\u2111",imof:"\u22B7",imped:"\u01B5",Implies:"\u21D2",incare:"\u2105",in:"\u2208",infin:"\u221E",infintie:"\u29DD",inodot:"\u0131",intcal:"\u22BA",int:"\u222B",Int:"\u222C",integers:"\u2124",Integral:"\u222B",intercal:"\u22BA",Intersection:"\u22C2",intlarhk:"\u2A17",intprod:"\u2A3C",InvisibleComma:"\u2063",InvisibleTimes:"\u2062",IOcy:"\u0401",iocy:"\u0451",Iogon:"\u012E",iogon:"\u012F",Iopf:"\u{1D540}",iopf:"\u{1D55A}",Iota:"\u0399",iota:"\u03B9",iprod:"\u2A3C",iquest:"\xBF",iscr:"\u{1D4BE}",Iscr:"\u2110",isin:"\u2208",isindot:"\u22F5",isinE:"\u22F9",isins:"\u22F4",isinsv:"\u22F3",isinv:"\u2208",it:"\u2062",Itilde:"\u0128",itilde:"\u0129",Iukcy:"\u0406",iukcy:"\u0456",Iuml:"\xCF",iuml:"\xEF",Jcirc:"\u0134",jcirc:"\u0135",Jcy:"\u0419",jcy:"\u0439",Jfr:"\u{1D50D}",jfr:"\u{1D527}",jmath:"\u0237",Jopf:"\u{1D541}",jopf:"\u{1D55B}",Jscr:"\u{1D4A5}",jscr:"\u{1D4BF}",Jsercy:"\u0408",jsercy:"\u0458",Jukcy:"\u0404",jukcy:"\u0454",Kappa:"\u039A",kappa:"\u03BA",kappav:"\u03F0",Kcedil:"\u0136",kcedil:"\u0137",Kcy:"\u041A",kcy:"\u043A",Kfr:"\u{1D50E}",kfr:"\u{1D528}",kgreen:"\u0138",KHcy:"\u0425",khcy:"\u0445",KJcy:"\u040C",kjcy:"\u045C",Kopf:"\u{1D542}",kopf:"\u{1D55C}",Kscr:"\u{1D4A6}",kscr:"\u{1D4C0}",lAarr:"\u21DA",Lacute:"\u0139",lacute:"\u013A",laemptyv:"\u29B4",lagran:"\u2112",Lambda:"\u039B",lambda:"\u03BB",lang:"\u27E8",Lang:"\u27EA",langd:"\u2991",langle:"\u27E8",lap:"\u2A85",Laplacetrf:"\u2112",laquo:"\xAB",larrb:"\u21E4",larrbfs:"\u291F",larr:"\u2190",Larr:"\u219E",lArr:"\u21D0",larrfs:"\u291D",larrhk:"\u21A9",larrlp:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",latail:"\u2919",lAtail:"\u291B",lat:"\u2AAB",late:"\u2AAD",lates:"\u2AAD\uFE00",lbarr:"\u290C",lBarr:"\u290E",lbbrk:"\u2772",lbrace:"{",lbrack:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",Lcaron:"\u013D",lcaron:"\u013E",Lcedil:"\u013B",lcedil:"\u013C",lceil:"\u2308",lcub:"{",Lcy:"\u041B",lcy:"\u043B",ldca:"\u2936",ldquo:"\u201C",ldquor:"\u201E",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",le:"\u2264",lE:"\u2266",LeftAngleBracket:"\u27E8",LeftArrowBar:"\u21E4",leftarrow:"\u2190",LeftArrow:"\u2190",Leftarrow:"\u21D0",LeftArrowRightArrow:"\u21C6",leftarrowtail:"\u21A2",LeftCeiling:"\u2308",LeftDoubleBracket:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVectorBar:"\u2959",LeftDownVector:"\u21C3",LeftFloor:"\u230A",leftharpoondown:"\u21BD",leftharpoonup:"\u21BC",leftleftarrows:"\u21C7",leftrightarrow:"\u2194",LeftRightArrow:"\u2194",Leftrightarrow:"\u21D4",leftrightarrows:"\u21C6",leftrightharpoons:"\u21CB",leftrightsquigarrow:"\u21AD",LeftRightVector:"\u294E",LeftTeeArrow:"\u21A4",LeftTee:"\u22A3",LeftTeeVector:"\u295A",leftthreetimes:"\u22CB",LeftTriangleBar:"\u29CF",LeftTriangle:"\u22B2",LeftTriangleEqual:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVectorBar:"\u2958",LeftUpVector:"\u21BF",LeftVectorBar:"\u2952",LeftVector:"\u21BC",lEg:"\u2A8B",leg:"\u22DA",leq:"\u2264",leqq:"\u2266",leqslant:"\u2A7D",lescc:"\u2AA8",les:"\u2A7D",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessapprox:"\u2A85",lessdot:"\u22D6",lesseqgtr:"\u22DA",lesseqqgtr:"\u2A8B",LessEqualGreater:"\u22DA",LessFullEqual:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",LessLess:"\u2AA1",lesssim:"\u2272",LessSlantEqual:"\u2A7D",LessTilde:"\u2272",lfisht:"\u297C",lfloor:"\u230A",Lfr:"\u{1D50F}",lfr:"\u{1D529}",lg:"\u2276",lgE:"\u2A91",lHar:"\u2962",lhard:"\u21BD",lharu:"\u21BC",lharul:"\u296A",lhblk:"\u2584",LJcy:"\u0409",ljcy:"\u0459",llarr:"\u21C7",ll:"\u226A",Ll:"\u22D8",llcorner:"\u231E",Lleftarrow:"\u21DA",llhard:"\u296B",lltri:"\u25FA",Lmidot:"\u013F",lmidot:"\u0140",lmoustache:"\u23B0",lmoust:"\u23B0",lnap:"\u2A89",lnapprox:"\u2A89",lne:"\u2A87",lnE:"\u2268",lneq:"\u2A87",lneqq:"\u2268",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",lobrk:"\u27E6",longleftarrow:"\u27F5",LongLeftArrow:"\u27F5",Longleftarrow:"\u27F8",longleftrightarrow:"\u27F7",LongLeftRightArrow:"\u27F7",Longleftrightarrow:"\u27FA",longmapsto:"\u27FC",longrightarrow:"\u27F6",LongRightArrow:"\u27F6",Longrightarrow:"\u27F9",looparrowleft:"\u21AB",looparrowright:"\u21AC",lopar:"\u2985",Lopf:"\u{1D543}",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",lowbar:"_",LowerLeftArrow:"\u2199",LowerRightArrow:"\u2198",loz:"\u25CA",lozenge:"\u25CA",lozf:"\u29EB",lpar:"(",lparlt:"\u2993",lrarr:"\u21C6",lrcorner:"\u231F",lrhar:"\u21CB",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",lscr:"\u{1D4C1}",Lscr:"\u2112",lsh:"\u21B0",Lsh:"\u21B0",lsim:"\u2272",lsime:"\u2A8D",lsimg:"\u2A8F",lsqb:"[",lsquo:"\u2018",lsquor:"\u201A",Lstrok:"\u0141",lstrok:"\u0142",ltcc:"\u2AA6",ltcir:"\u2A79",lt:"<",LT:"<",Lt:"\u226A",ltdot:"\u22D6",lthree:"\u22CB",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltri:"\u25C3",ltrie:"\u22B4",ltrif:"\u25C2",ltrPar:"\u2996",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",macr:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",Map:"\u2905",map:"\u21A6",mapsto:"\u21A6",mapstodown:"\u21A7",mapstoleft:"\u21A4",mapstoup:"\u21A5",marker:"\u25AE",mcomma:"\u2A29",Mcy:"\u041C",mcy:"\u043C",mdash:"\u2014",mDDot:"\u223A",measuredangle:"\u2221",MediumSpace:"\u205F",Mellintrf:"\u2133",Mfr:"\u{1D510}",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",midast:"*",midcir:"\u2AF0",mid:"\u2223",middot:"\xB7",minusb:"\u229F",minus:"\u2212",minusd:"\u2238",minusdu:"\u2A2A",MinusPlus:"\u2213",mlcp:"\u2ADB",mldr:"\u2026",mnplus:"\u2213",models:"\u22A7",Mopf:"\u{1D544}",mopf:"\u{1D55E}",mp:"\u2213",mscr:"\u{1D4C2}",Mscr:"\u2133",mstpos:"\u223E",Mu:"\u039C",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nabla:"\u2207",Nacute:"\u0143",nacute:"\u0144",nang:"\u2220\u20D2",nap:"\u2249",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",napprox:"\u2249",natural:"\u266E",naturals:"\u2115",natur:"\u266E",nbsp:"\xA0",nbump:"\u224E\u0338",nbumpe:"\u224F\u0338",ncap:"\u2A43",Ncaron:"\u0147",ncaron:"\u0148",Ncedil:"\u0145",ncedil:"\u0146",ncong:"\u2247",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",Ncy:"\u041D",ncy:"\u043D",ndash:"\u2013",nearhk:"\u2924",nearr:"\u2197",neArr:"\u21D7",nearrow:"\u2197",ne:"\u2260",nedot:"\u2250\u0338",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",nequiv:"\u2262",nesear:"\u2928",nesim:"\u2242\u0338",NestedGreaterGreater:"\u226B",NestedLessLess:"\u226A",NewLine:`
`,nexist:"\u2204",nexists:"\u2204",Nfr:"\u{1D511}",nfr:"\u{1D52B}",ngE:"\u2267\u0338",nge:"\u2271",ngeq:"\u2271",ngeqq:"\u2267\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",nGg:"\u22D9\u0338",ngsim:"\u2275",nGt:"\u226B\u20D2",ngt:"\u226F",ngtr:"\u226F",nGtv:"\u226B\u0338",nharr:"\u21AE",nhArr:"\u21CE",nhpar:"\u2AF2",ni:"\u220B",nis:"\u22FC",nisd:"\u22FA",niv:"\u220B",NJcy:"\u040A",njcy:"\u045A",nlarr:"\u219A",nlArr:"\u21CD",nldr:"\u2025",nlE:"\u2266\u0338",nle:"\u2270",nleftarrow:"\u219A",nLeftarrow:"\u21CD",nleftrightarrow:"\u21AE",nLeftrightarrow:"\u21CE",nleq:"\u2270",nleqq:"\u2266\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",nless:"\u226E",nLl:"\u22D8\u0338",nlsim:"\u2274",nLt:"\u226A\u20D2",nlt:"\u226E",nltri:"\u22EA",nltrie:"\u22EC",nLtv:"\u226A\u0338",nmid:"\u2224",NoBreak:"\u2060",NonBreakingSpace:"\xA0",nopf:"\u{1D55F}",Nopf:"\u2115",Not:"\u2AEC",not:"\xAC",NotCongruent:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",NotElement:"\u2209",NotEqual:"\u2260",NotEqualTilde:"\u2242\u0338",NotExists:"\u2204",NotGreater:"\u226F",NotGreaterEqual:"\u2271",NotGreaterFullEqual:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",NotGreaterLess:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",NotGreaterTilde:"\u2275",NotHumpDownHump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",notin:"\u2209",notindot:"\u22F5\u0338",notinE:"\u22F9\u0338",notinva:"\u2209",notinvb:"\u22F7",notinvc:"\u22F6",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangle:"\u22EA",NotLeftTriangleEqual:"\u22EC",NotLess:"\u226E",NotLessEqual:"\u2270",NotLessGreater:"\u2278",NotLessLess:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",NotLessTilde:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",notni:"\u220C",notniva:"\u220C",notnivb:"\u22FE",notnivc:"\u22FD",NotPrecedes:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",NotReverseElement:"\u220C",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangle:"\u22EB",NotRightTriangleEqual:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",NotSubset:"\u2282\u20D2",NotSubsetEqual:"\u2288",NotSucceeds:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",NotSupersetEqual:"\u2289",NotTilde:"\u2241",NotTildeEqual:"\u2244",NotTildeFullEqual:"\u2247",NotTildeTilde:"\u2249",NotVerticalBar:"\u2224",nparallel:"\u2226",npar:"\u2226",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",npr:"\u2280",nprcue:"\u22E0",nprec:"\u2280",npreceq:"\u2AAF\u0338",npre:"\u2AAF\u0338",nrarrc:"\u2933\u0338",nrarr:"\u219B",nrArr:"\u21CF",nrarrw:"\u219D\u0338",nrightarrow:"\u219B",nRightarrow:"\u21CF",nrtri:"\u22EB",nrtrie:"\u22ED",nsc:"\u2281",nsccue:"\u22E1",nsce:"\u2AB0\u0338",Nscr:"\u{1D4A9}",nscr:"\u{1D4C3}",nshortmid:"\u2224",nshortparallel:"\u2226",nsim:"\u2241",nsime:"\u2244",nsimeq:"\u2244",nsmid:"\u2224",nspar:"\u2226",nsqsube:"\u22E2",nsqsupe:"\u22E3",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsube:"\u2288",nsubset:"\u2282\u20D2",nsubseteq:"\u2288",nsubseteqq:"\u2AC5\u0338",nsucc:"\u2281",nsucceq:"\u2AB0\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupe:"\u2289",nsupset:"\u2283\u20D2",nsupseteq:"\u2289",nsupseteqq:"\u2AC6\u0338",ntgl:"\u2279",Ntilde:"\xD1",ntilde:"\xF1",ntlg:"\u2278",ntriangleleft:"\u22EA",ntrianglelefteq:"\u22EC",ntriangleright:"\u22EB",ntrianglerighteq:"\u22ED",Nu:"\u039D",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvap:"\u224D\u20D2",nvdash:"\u22AC",nvDash:"\u22AD",nVdash:"\u22AE",nVDash:"\u22AF",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvHarr:"\u2904",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwarhk:"\u2923",nwarr:"\u2196",nwArr:"\u21D6",nwarrow:"\u2196",nwnear:"\u2927",Oacute:"\xD3",oacute:"\xF3",oast:"\u229B",Ocirc:"\xD4",ocirc:"\xF4",ocir:"\u229A",Ocy:"\u041E",ocy:"\u043E",odash:"\u229D",Odblac:"\u0150",odblac:"\u0151",odiv:"\u2A38",odot:"\u2299",odsold:"\u29BC",OElig:"\u0152",oelig:"\u0153",ofcir:"\u29BF",Ofr:"\u{1D512}",ofr:"\u{1D52C}",ogon:"\u02DB",Ograve:"\xD2",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",ohm:"\u03A9",oint:"\u222E",olarr:"\u21BA",olcir:"\u29BE",olcross:"\u29BB",oline:"\u203E",olt:"\u29C0",Omacr:"\u014C",omacr:"\u014D",Omega:"\u03A9",omega:"\u03C9",Omicron:"\u039F",omicron:"\u03BF",omid:"\u29B6",ominus:"\u2296",Oopf:"\u{1D546}",oopf:"\u{1D560}",opar:"\u29B7",OpenCurlyDoubleQuote:"\u201C",OpenCurlyQuote:"\u2018",operp:"\u29B9",oplus:"\u2295",orarr:"\u21BB",Or:"\u2A54",or:"\u2228",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oS:"\u24C8",Oscr:"\u{1D4AA}",oscr:"\u2134",Oslash:"\xD8",oslash:"\xF8",osol:"\u2298",Otilde:"\xD5",otilde:"\xF5",otimesas:"\u2A36",Otimes:"\u2A37",otimes:"\u2297",Ouml:"\xD6",ouml:"\xF6",ovbar:"\u233D",OverBar:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",OverParenthesis:"\u23DC",para:"\xB6",parallel:"\u2225",par:"\u2225",parsim:"\u2AF3",parsl:"\u2AFD",part:"\u2202",PartialD:"\u2202",Pcy:"\u041F",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",perp:"\u22A5",pertenk:"\u2031",Pfr:"\u{1D513}",pfr:"\u{1D52D}",Phi:"\u03A6",phi:"\u03C6",phiv:"\u03D5",phmmat:"\u2133",phone:"\u260E",Pi:"\u03A0",pi:"\u03C0",pitchfork:"\u22D4",piv:"\u03D6",planck:"\u210F",planckh:"\u210E",plankv:"\u210F",plusacir:"\u2A23",plusb:"\u229E",pluscir:"\u2A22",plus:"+",plusdo:"\u2214",plusdu:"\u2A25",pluse:"\u2A72",PlusMinus:"\xB1",plusmn:"\xB1",plussim:"\u2A26",plustwo:"\u2A27",pm:"\xB1",Poincareplane:"\u210C",pointint:"\u2A15",popf:"\u{1D561}",Popf:"\u2119",pound:"\xA3",prap:"\u2AB7",Pr:"\u2ABB",pr:"\u227A",prcue:"\u227C",precapprox:"\u2AB7",prec:"\u227A",preccurlyeq:"\u227C",Precedes:"\u227A",PrecedesEqual:"\u2AAF",PrecedesSlantEqual:"\u227C",PrecedesTilde:"\u227E",preceq:"\u2AAF",precnapprox:"\u2AB9",precneqq:"\u2AB5",precnsim:"\u22E8",pre:"\u2AAF",prE:"\u2AB3",precsim:"\u227E",prime:"\u2032",Prime:"\u2033",primes:"\u2119",prnap:"\u2AB9",prnE:"\u2AB5",prnsim:"\u22E8",prod:"\u220F",Product:"\u220F",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prop:"\u221D",Proportional:"\u221D",Proportion:"\u2237",propto:"\u221D",prsim:"\u227E",prurel:"\u22B0",Pscr:"\u{1D4AB}",pscr:"\u{1D4C5}",Psi:"\u03A8",psi:"\u03C8",puncsp:"\u2008",Qfr:"\u{1D514}",qfr:"\u{1D52E}",qint:"\u2A0C",qopf:"\u{1D562}",Qopf:"\u211A",qprime:"\u2057",Qscr:"\u{1D4AC}",qscr:"\u{1D4C6}",quaternions:"\u210D",quatint:"\u2A16",quest:"?",questeq:"\u225F",quot:'"',QUOT:'"',rAarr:"\u21DB",race:"\u223D\u0331",Racute:"\u0154",racute:"\u0155",radic:"\u221A",raemptyv:"\u29B3",rang:"\u27E9",Rang:"\u27EB",rangd:"\u2992",range:"\u29A5",rangle:"\u27E9",raquo:"\xBB",rarrap:"\u2975",rarrb:"\u21E5",rarrbfs:"\u2920",rarrc:"\u2933",rarr:"\u2192",Rarr:"\u21A0",rArr:"\u21D2",rarrfs:"\u291E",rarrhk:"\u21AA",rarrlp:"\u21AC",rarrpl:"\u2945",rarrsim:"\u2974",Rarrtl:"\u2916",rarrtl:"\u21A3",rarrw:"\u219D",ratail:"\u291A",rAtail:"\u291C",ratio:"\u2236",rationals:"\u211A",rbarr:"\u290D",rBarr:"\u290F",RBarr:"\u2910",rbbrk:"\u2773",rbrace:"}",rbrack:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",Rcaron:"\u0158",rcaron:"\u0159",Rcedil:"\u0156",rcedil:"\u0157",rceil:"\u2309",rcub:"}",Rcy:"\u0420",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdquo:"\u201D",rdquor:"\u201D",rdsh:"\u21B3",real:"\u211C",realine:"\u211B",realpart:"\u211C",reals:"\u211D",Re:"\u211C",rect:"\u25AD",reg:"\xAE",REG:"\xAE",ReverseElement:"\u220B",ReverseEquilibrium:"\u21CB",ReverseUpEquilibrium:"\u296F",rfisht:"\u297D",rfloor:"\u230B",rfr:"\u{1D52F}",Rfr:"\u211C",rHar:"\u2964",rhard:"\u21C1",rharu:"\u21C0",rharul:"\u296C",Rho:"\u03A1",rho:"\u03C1",rhov:"\u03F1",RightAngleBracket:"\u27E9",RightArrowBar:"\u21E5",rightarrow:"\u2192",RightArrow:"\u2192",Rightarrow:"\u21D2",RightArrowLeftArrow:"\u21C4",rightarrowtail:"\u21A3",RightCeiling:"\u2309",RightDoubleBracket:"\u27E7",RightDownTeeVector:"\u295D",RightDownVectorBar:"\u2955",RightDownVector:"\u21C2",RightFloor:"\u230B",rightharpoondown:"\u21C1",rightharpoonup:"\u21C0",rightleftarrows:"\u21C4",rightleftharpoons:"\u21CC",rightrightarrows:"\u21C9",rightsquigarrow:"\u219D",RightTeeArrow:"\u21A6",RightTee:"\u22A2",RightTeeVector:"\u295B",rightthreetimes:"\u22CC",RightTriangleBar:"\u29D0",RightTriangle:"\u22B3",RightTriangleEqual:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVectorBar:"\u2954",RightUpVector:"\u21BE",RightVectorBar:"\u2953",RightVector:"\u21C0",ring:"\u02DA",risingdotseq:"\u2253",rlarr:"\u21C4",rlhar:"\u21CC",rlm:"\u200F",rmoustache:"\u23B1",rmoust:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",robrk:"\u27E7",ropar:"\u2986",ropf:"\u{1D563}",Ropf:"\u211D",roplus:"\u2A2E",rotimes:"\u2A35",RoundImplies:"\u2970",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rrarr:"\u21C9",Rrightarrow:"\u21DB",rsaquo:"\u203A",rscr:"\u{1D4C7}",Rscr:"\u211B",rsh:"\u21B1",Rsh:"\u21B1",rsqb:"]",rsquo:"\u2019",rsquor:"\u2019",rthree:"\u22CC",rtimes:"\u22CA",rtri:"\u25B9",rtrie:"\u22B5",rtrif:"\u25B8",rtriltri:"\u29CE",RuleDelayed:"\u29F4",ruluhar:"\u2968",rx:"\u211E",Sacute:"\u015A",sacute:"\u015B",sbquo:"\u201A",scap:"\u2AB8",Scaron:"\u0160",scaron:"\u0161",Sc:"\u2ABC",sc:"\u227B",sccue:"\u227D",sce:"\u2AB0",scE:"\u2AB4",Scedil:"\u015E",scedil:"\u015F",Scirc:"\u015C",scirc:"\u015D",scnap:"\u2ABA",scnE:"\u2AB6",scnsim:"\u22E9",scpolint:"\u2A13",scsim:"\u227F",Scy:"\u0421",scy:"\u0441",sdotb:"\u22A1",sdot:"\u22C5",sdote:"\u2A66",searhk:"\u2925",searr:"\u2198",seArr:"\u21D8",searrow:"\u2198",sect:"\xA7",semi:";",seswar:"\u2929",setminus:"\u2216",setmn:"\u2216",sext:"\u2736",Sfr:"\u{1D516}",sfr:"\u{1D530}",sfrown:"\u2322",sharp:"\u266F",SHCHcy:"\u0429",shchcy:"\u0449",SHcy:"\u0428",shcy:"\u0448",ShortDownArrow:"\u2193",ShortLeftArrow:"\u2190",shortmid:"\u2223",shortparallel:"\u2225",ShortRightArrow:"\u2192",ShortUpArrow:"\u2191",shy:"\xAD",Sigma:"\u03A3",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",sim:"\u223C",simdot:"\u2A6A",sime:"\u2243",simeq:"\u2243",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",slarr:"\u2190",SmallCircle:"\u2218",smallsetminus:"\u2216",smashp:"\u2A33",smeparsl:"\u29E4",smid:"\u2223",smile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",SOFTcy:"\u042C",softcy:"\u044C",solbar:"\u233F",solb:"\u29C4",sol:"/",Sopf:"\u{1D54A}",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",spar:"\u2225",sqcap:"\u2293",sqcaps:"\u2293\uFE00",sqcup:"\u2294",sqcups:"\u2294\uFE00",Sqrt:"\u221A",sqsub:"\u228F",sqsube:"\u2291",sqsubset:"\u228F",sqsubseteq:"\u2291",sqsup:"\u2290",sqsupe:"\u2292",sqsupset:"\u2290",sqsupseteq:"\u2292",square:"\u25A1",Square:"\u25A1",SquareIntersection:"\u2293",SquareSubset:"\u228F",SquareSubsetEqual:"\u2291",SquareSuperset:"\u2290",SquareSupersetEqual:"\u2292",SquareUnion:"\u2294",squarf:"\u25AA",squ:"\u25A1",squf:"\u25AA",srarr:"\u2192",Sscr:"\u{1D4AE}",sscr:"\u{1D4C8}",ssetmn:"\u2216",ssmile:"\u2323",sstarf:"\u22C6",Star:"\u22C6",star:"\u2606",starf:"\u2605",straightepsilon:"\u03F5",straightphi:"\u03D5",strns:"\xAF",sub:"\u2282",Sub:"\u22D0",subdot:"\u2ABD",subE:"\u2AC5",sube:"\u2286",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subne:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",subset:"\u2282",Subset:"\u22D0",subseteq:"\u2286",subseteqq:"\u2AC5",SubsetEqual:"\u2286",subsetneq:"\u228A",subsetneqq:"\u2ACB",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",succapprox:"\u2AB8",succ:"\u227B",succcurlyeq:"\u227D",Succeeds:"\u227B",SucceedsEqual:"\u2AB0",SucceedsSlantEqual:"\u227D",SucceedsTilde:"\u227F",succeq:"\u2AB0",succnapprox:"\u2ABA",succneqq:"\u2AB6",succnsim:"\u22E9",succsim:"\u227F",SuchThat:"\u220B",sum:"\u2211",Sum:"\u2211",sung:"\u266A",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",sup:"\u2283",Sup:"\u22D1",supdot:"\u2ABE",supdsub:"\u2AD8",supE:"\u2AC6",supe:"\u2287",supedot:"\u2AC4",Superset:"\u2283",SupersetEqual:"\u2287",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supne:"\u228B",supplus:"\u2AC0",supset:"\u2283",Supset:"\u22D1",supseteq:"\u2287",supseteqq:"\u2AC6",supsetneq:"\u228B",supsetneqq:"\u2ACC",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swarhk:"\u2926",swarr:"\u2199",swArr:"\u21D9",swarrow:"\u2199",swnwar:"\u292A",szlig:"\xDF",Tab:"	",target:"\u2316",Tau:"\u03A4",tau:"\u03C4",tbrk:"\u23B4",Tcaron:"\u0164",tcaron:"\u0165",Tcedil:"\u0162",tcedil:"\u0163",Tcy:"\u0422",tcy:"\u0442",tdot:"\u20DB",telrec:"\u2315",Tfr:"\u{1D517}",tfr:"\u{1D531}",there4:"\u2234",therefore:"\u2234",Therefore:"\u2234",Theta:"\u0398",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",thickapprox:"\u2248",thicksim:"\u223C",ThickSpace:"\u205F\u200A",ThinSpace:"\u2009",thinsp:"\u2009",thkap:"\u2248",thksim:"\u223C",THORN:"\xDE",thorn:"\xFE",tilde:"\u02DC",Tilde:"\u223C",TildeEqual:"\u2243",TildeFullEqual:"\u2245",TildeTilde:"\u2248",timesbar:"\u2A31",timesb:"\u22A0",times:"\xD7",timesd:"\u2A30",tint:"\u222D",toea:"\u2928",topbot:"\u2336",topcir:"\u2AF1",top:"\u22A4",Topf:"\u{1D54B}",topf:"\u{1D565}",topfork:"\u2ADA",tosa:"\u2929",tprime:"\u2034",trade:"\u2122",TRADE:"\u2122",triangle:"\u25B5",triangledown:"\u25BF",triangleleft:"\u25C3",trianglelefteq:"\u22B4",triangleq:"\u225C",triangleright:"\u25B9",trianglerighteq:"\u22B5",tridot:"\u25EC",trie:"\u225C",triminus:"\u2A3A",TripleDot:"\u20DB",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",Tscr:"\u{1D4AF}",tscr:"\u{1D4C9}",TScy:"\u0426",tscy:"\u0446",TSHcy:"\u040B",tshcy:"\u045B",Tstrok:"\u0166",tstrok:"\u0167",twixt:"\u226C",twoheadleftarrow:"\u219E",twoheadrightarrow:"\u21A0",Uacute:"\xDA",uacute:"\xFA",uarr:"\u2191",Uarr:"\u219F",uArr:"\u21D1",Uarrocir:"\u2949",Ubrcy:"\u040E",ubrcy:"\u045E",Ubreve:"\u016C",ubreve:"\u016D",Ucirc:"\xDB",ucirc:"\xFB",Ucy:"\u0423",ucy:"\u0443",udarr:"\u21C5",Udblac:"\u0170",udblac:"\u0171",udhar:"\u296E",ufisht:"\u297E",Ufr:"\u{1D518}",ufr:"\u{1D532}",Ugrave:"\xD9",ugrave:"\xF9",uHar:"\u2963",uharl:"\u21BF",uharr:"\u21BE",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",Umacr:"\u016A",umacr:"\u016B",uml:"\xA8",UnderBar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",UnionPlus:"\u228E",Uogon:"\u0172",uogon:"\u0173",Uopf:"\u{1D54C}",uopf:"\u{1D566}",UpArrowBar:"\u2912",uparrow:"\u2191",UpArrow:"\u2191",Uparrow:"\u21D1",UpArrowDownArrow:"\u21C5",updownarrow:"\u2195",UpDownArrow:"\u2195",Updownarrow:"\u21D5",UpEquilibrium:"\u296E",upharpoonleft:"\u21BF",upharpoonright:"\u21BE",uplus:"\u228E",UpperLeftArrow:"\u2196",UpperRightArrow:"\u2197",upsi:"\u03C5",Upsi:"\u03D2",upsih:"\u03D2",Upsilon:"\u03A5",upsilon:"\u03C5",UpTeeArrow:"\u21A5",UpTee:"\u22A5",upuparrows:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",Uring:"\u016E",uring:"\u016F",urtri:"\u25F9",Uscr:"\u{1D4B0}",uscr:"\u{1D4CA}",utdot:"\u22F0",Utilde:"\u0168",utilde:"\u0169",utri:"\u25B5",utrif:"\u25B4",uuarr:"\u21C8",Uuml:"\xDC",uuml:"\xFC",uwangle:"\u29A7",vangrt:"\u299C",varepsilon:"\u03F5",varkappa:"\u03F0",varnothing:"\u2205",varphi:"\u03D5",varpi:"\u03D6",varpropto:"\u221D",varr:"\u2195",vArr:"\u21D5",varrho:"\u03F1",varsigma:"\u03C2",varsubsetneq:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vartheta:"\u03D1",vartriangleleft:"\u22B2",vartriangleright:"\u22B3",vBar:"\u2AE8",Vbar:"\u2AEB",vBarv:"\u2AE9",Vcy:"\u0412",vcy:"\u0432",vdash:"\u22A2",vDash:"\u22A8",Vdash:"\u22A9",VDash:"\u22AB",Vdashl:"\u2AE6",veebar:"\u22BB",vee:"\u2228",Vee:"\u22C1",veeeq:"\u225A",vellip:"\u22EE",verbar:"|",Verbar:"\u2016",vert:"|",Vert:"\u2016",VerticalBar:"\u2223",VerticalLine:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",VeryThinSpace:"\u200A",Vfr:"\u{1D519}",vfr:"\u{1D533}",vltri:"\u22B2",vnsub:"\u2282\u20D2",vnsup:"\u2283\u20D2",Vopf:"\u{1D54D}",vopf:"\u{1D567}",vprop:"\u221D",vrtri:"\u22B3",Vscr:"\u{1D4B1}",vscr:"\u{1D4CB}",vsubnE:"\u2ACB\uFE00",vsubne:"\u228A\uFE00",vsupnE:"\u2ACC\uFE00",vsupne:"\u228B\uFE00",Vvdash:"\u22AA",vzigzag:"\u299A",Wcirc:"\u0174",wcirc:"\u0175",wedbar:"\u2A5F",wedge:"\u2227",Wedge:"\u22C0",wedgeq:"\u2259",weierp:"\u2118",Wfr:"\u{1D51A}",wfr:"\u{1D534}",Wopf:"\u{1D54E}",wopf:"\u{1D568}",wp:"\u2118",wr:"\u2240",wreath:"\u2240",Wscr:"\u{1D4B2}",wscr:"\u{1D4CC}",xcap:"\u22C2",xcirc:"\u25EF",xcup:"\u22C3",xdtri:"\u25BD",Xfr:"\u{1D51B}",xfr:"\u{1D535}",xharr:"\u27F7",xhArr:"\u27FA",Xi:"\u039E",xi:"\u03BE",xlarr:"\u27F5",xlArr:"\u27F8",xmap:"\u27FC",xnis:"\u22FB",xodot:"\u2A00",Xopf:"\u{1D54F}",xopf:"\u{1D569}",xoplus:"\u2A01",xotime:"\u2A02",xrarr:"\u27F6",xrArr:"\u27F9",Xscr:"\u{1D4B3}",xscr:"\u{1D4CD}",xsqcup:"\u2A06",xuplus:"\u2A04",xutri:"\u25B3",xvee:"\u22C1",xwedge:"\u22C0",Yacute:"\xDD",yacute:"\xFD",YAcy:"\u042F",yacy:"\u044F",Ycirc:"\u0176",ycirc:"\u0177",Ycy:"\u042B",ycy:"\u044B",yen:"\xA5",Yfr:"\u{1D51C}",yfr:"\u{1D536}",YIcy:"\u0407",yicy:"\u0457",Yopf:"\u{1D550}",yopf:"\u{1D56A}",Yscr:"\u{1D4B4}",yscr:"\u{1D4CE}",YUcy:"\u042E",yucy:"\u044E",yuml:"\xFF",Yuml:"\u0178",Zacute:"\u0179",zacute:"\u017A",Zcaron:"\u017D",zcaron:"\u017E",Zcy:"\u0417",zcy:"\u0437",Zdot:"\u017B",zdot:"\u017C",zeetrf:"\u2128",ZeroWidthSpace:"\u200B",Zeta:"\u0396",zeta:"\u03B6",zfr:"\u{1D537}",Zfr:"\u2128",ZHcy:"\u0416",zhcy:"\u0436",zigrarr:"\u21DD",zopf:"\u{1D56B}",Zopf:"\u2124",Zscr:"\u{1D4B5}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"}},function(e,n,r){function t(s){var a,l,u=i[s];if(u)return u;for(u=i[s]=[],a=0;a<128;a++)l=String.fromCharCode(a),u.push(l);for(a=0;a<s.length;a++)l=s.charCodeAt(a),u[l]="%"+("0"+l.toString(16).toUpperCase()).slice(-2);return u}function o(s,a){var l;return typeof a!="string"&&(a=o.defaultChars),l=t(a),s.replace(/(%[a-f0-9]{2})+/gi,function(u){var f,c,d,_,v,b,C,m="";for(f=0,c=u.length;f<c;f+=3)d=parseInt(u.slice(f+1,f+3),16),d<128?m+=l[d]:(224&d)==192&&f+3<c&&(192&(_=parseInt(u.slice(f+4,f+6),16)))==128?(C=d<<6&1984|63&_,m+=C<128?"\uFFFD\uFFFD":String.fromCharCode(C),f+=3):(240&d)==224&&f+6<c&&(_=parseInt(u.slice(f+4,f+6),16),v=parseInt(u.slice(f+7,f+9),16),(192&_)==128&&(192&v)==128)?(C=d<<12&61440|_<<6&4032|63&v,m+=C<2048||C>=55296&&C<=57343?"\uFFFD\uFFFD\uFFFD":String.fromCharCode(C),f+=6):(248&d)==240&&f+9<c&&(_=parseInt(u.slice(f+4,f+6),16),v=parseInt(u.slice(f+7,f+9),16),b=parseInt(u.slice(f+10,f+12),16),(192&_)==128&&(192&v)==128&&(192&b)==128)?(C=d<<18&1835008|_<<12&258048|v<<6&4032|63&b,C<65536||C>1114111?m+="\uFFFD\uFFFD\uFFFD\uFFFD":(C-=65536,m+=String.fromCharCode(55296+(C>>10),56320+(1023&C))),f+=9):m+="\uFFFD";return m})}var i={};o.defaultChars=";/?:@&=+$,#",o.componentChars="",e.exports=o},function(e,n,r){function t(s){var a,l,u=i[s];if(u)return u;for(u=i[s]=[],a=0;a<128;a++)l=String.fromCharCode(a),/^[0-9a-z]$/i.test(l)?u.push(l):u.push("%"+("0"+a.toString(16).toUpperCase()).slice(-2));for(a=0;a<s.length;a++)u[s.charCodeAt(a)]=s[a];return u}function o(s,a,l){var u,f,c,d,_,v="";for(typeof a!="string"&&(l=a,a=o.defaultChars),l===void 0&&(l=!0),_=t(a),u=0,f=s.length;u<f;u++)if(c=s.charCodeAt(u),l&&c===37&&u+2<f&&/^[0-9a-f]{2}$/i.test(s.slice(u+1,u+3)))v+=s.slice(u,u+3),u+=2;else if(c<128)v+=_[c];else if(c>=55296&&c<=57343){if(c>=55296&&c<=56319&&u+1<f&&(d=s.charCodeAt(u+1))>=56320&&d<=57343){v+=encodeURIComponent(s[u]+s[u+1]),u++;continue}v+="%EF%BF%BD"}else v+=encodeURIComponent(s[u]);return v}var i={};o.defaultChars=";/?:@&=+$,-_.!~*'()#",o.componentChars="-_.!~*'()",e.exports=o},function(e,n,r){e.exports=function(t){var o="";return o+=t.protocol||"",o+=t.slashes?"//":"",o+=t.auth?t.auth+"@":"",t.hostname&&t.hostname.indexOf(":")!==-1?o+="["+t.hostname+"]":o+=t.hostname||"",o+=t.port?":"+t.port:"",o+=t.pathname||"",o+=t.search||"",o+=t.hash||""}},function(e,n,r){function t(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}function o(m,g){if(m&&m instanceof t)return m;var y=new t;return y.parse(m,g),y}var i=/^([a-z0-9.+-]+:)/i,s=/:[0-9]*$/,a=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["<",">",'"',"`"," ","\r",`
`,"	"],u=["{","}","|","\\","^","`"].concat(l),f=["'"].concat(u),c=["%","/","?",";","#"].concat(f),d=["/","?","#"],_=/^[+a-z0-9A-Z_-]{0,63}$/,v=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,b={javascript:!0,"javascript:":!0},C={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};t.prototype.parse=function(m,g){var y,k,x,w,A,E=m;if(E=E.trim(),!g&&m.split("#").length===1){var S=a.exec(E);if(S)return this.pathname=S[1],S[2]&&(this.search=S[2]),this}var O=i.exec(E);if(O&&(O=O[0],x=O.toLowerCase(),this.protocol=O,E=E.substr(O.length)),(g||O||E.match(/^\/\/[^@\/]+@[^@\/]+/))&&(!(A=E.substr(0,2)==="//")||O&&b[O]||(E=E.substr(2),this.slashes=!0)),!b[O]&&(A||O&&!C[O])){var P=-1;for(y=0;y<d.length;y++)(w=E.indexOf(d[y]))!==-1&&(P===-1||w<P)&&(P=w);var L,M;for(M=P===-1?E.lastIndexOf("@"):E.lastIndexOf("@",P),M!==-1&&(L=E.slice(0,M),E=E.slice(M+1),this.auth=L),P=-1,y=0;y<c.length;y++)(w=E.indexOf(c[y]))!==-1&&(P===-1||w<P)&&(P=w);P===-1&&(P=E.length),E[P-1]===":"&&P--;var G=E.slice(0,P);E=E.slice(P),this.parseHost(G),this.hostname=this.hostname||"";var X=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!X){var j=this.hostname.split(/\./);for(y=0,k=j.length;y<k;y++){var q=j[y];if(q&&!q.match(_)){for(var ee="",fe=0,N=q.length;fe<N;fe++)q.charCodeAt(fe)>127?ee+="x":ee+=q[fe];if(!ee.match(_)){var V=j.slice(0,y),$=j.slice(y+1),ne=q.match(v);ne&&(V.push(ne[1]),$.unshift(ne[2])),$.length&&(E=$.join(".")+E),this.hostname=V.join(".");break}}}}this.hostname.length>255&&(this.hostname=""),X&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}var ce=E.indexOf("#");ce!==-1&&(this.hash=E.substr(ce),E=E.slice(0,ce));var I=E.indexOf("?");return I!==-1&&(this.search=E.substr(I),E=E.slice(0,I)),E&&(this.pathname=E),C[x]&&this.hostname&&!this.pathname&&(this.pathname=""),this},t.prototype.parseHost=function(m){var g=s.exec(m);g&&(g=g[0],g!==":"&&(this.port=g.substr(1)),m=m.substr(0,m.length-g.length)),m&&(this.hostname=m)},e.exports=o},function(e,n,r){(function(t,o){var i;(function(s){function a(N){throw new RangeError(j[N])}function l(N,V){for(var $=N.length,ne=[];$--;)ne[$]=V(N[$]);return ne}function u(N,V){var $=N.split("@"),ne="";return $.length>1&&(ne=$[0]+"@",N=$[1]),N=N.replace(X,"."),ne+l(N.split("."),V).join(".")}function f(N){for(var V,$,ne=[],ce=0,I=N.length;ce<I;)V=N.charCodeAt(ce++),V>=55296&&V<=56319&&ce<I?($=N.charCodeAt(ce++),(64512&$)==56320?ne.push(((1023&V)<<10)+(1023&$)+65536):(ne.push(V),ce--)):ne.push(V);return ne}function c(N){return l(N,function(V){var $="";return V>65535&&(V-=65536,$+=fe(V>>>10&1023|55296),V=56320|1023&V),$+=fe(V)}).join("")}function d(N){return N-48<10?N-22:N-65<26?N-65:N-97<26?N-97:x}function _(N,V){return N+22+75*(N<26)-((V!=0)<<5)}function v(N,V,$){var ne=0;for(N=$?ee(N/S):N>>1,N+=ee(N/V);N>q*A>>1;ne+=x)N=ee(N/q);return ee(ne+(q+1)*N/(N+E))}function b(N){var V,$,ne,ce,I,K,H,Q,le,ue,ae=[],se=N.length,T=0,R=P,D=O;for($=N.lastIndexOf(L),$<0&&($=0),ne=0;ne<$;++ne)N.charCodeAt(ne)>=128&&a("not-basic"),ae.push(N.charCodeAt(ne));for(ce=$>0?$+1:0;ce<se;){for(I=T,K=1,H=x;ce>=se&&a("invalid-input"),Q=d(N.charCodeAt(ce++)),(Q>=x||Q>ee((k-T)/K))&&a("overflow"),T+=Q*K,le=H<=D?w:H>=D+A?A:H-D,!(Q<le);H+=x)ue=x-le,K>ee(k/ue)&&a("overflow"),K*=ue;V=ae.length+1,D=v(T-I,V,I==0),ee(T/V)>k-R&&a("overflow"),R+=ee(T/V),T%=V,ae.splice(T++,0,R)}return c(ae)}function C(N){var V,$,ne,ce,I,K,H,Q,le,ue,ae,se,T,R,D,z=[];for(N=f(N),se=N.length,V=P,$=0,I=O,K=0;K<se;++K)(ae=N[K])<128&&z.push(fe(ae));for(ne=ce=z.length,ce&&z.push(L);ne<se;){for(H=k,K=0;K<se;++K)(ae=N[K])>=V&&ae<H&&(H=ae);for(T=ne+1,H-V>ee((k-$)/T)&&a("overflow"),$+=(H-V)*T,V=H,K=0;K<se;++K)if(ae=N[K],ae<V&&++$>k&&a("overflow"),ae==V){for(Q=$,le=x;ue=le<=I?w:le>=I+A?A:le-I,!(Q<ue);le+=x)D=Q-ue,R=x-ue,z.push(fe(_(ue+D%R,0))),Q=ee(D/R);z.push(fe(_(Q,0))),I=v($,T,ne==ce),$=0,++ne}++$,++V}return z.join("")}function m(N){return u(N,function(V){return M.test(V)?b(V.slice(4).toLowerCase()):V})}function g(N){return u(N,function(V){return G.test(V)?"xn--"+C(V):V})}typeof n=="object"&&n&&n.nodeType,typeof t=="object"&&t&&t.nodeType;var y,k=2147483647,x=36,w=1,A=26,E=38,S=700,O=72,P=128,L="-",M=/^xn--/,G=/[^\x20-\x7E]/,X=/[\x2E\u3002\uFF0E\uFF61]/g,j={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},q=x-w,ee=Math.floor,fe=String.fromCharCode;y={version:"1.4.1",ucs2:{decode:f,encode:c},decode:b,encode:C,toASCII:g,toUnicode:m},(i=function(){return y}.call(n,r,n,t))!==void 0&&(t.exports=i)})()}).call(n,r(208)(e),r(207))},function(e,n){e.exports=`@[toc](Catalog)

Markdown Handbuch
===
> Details: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Fett**
\`\`\`
**fett**
__fett__
\`\`\`
## *Kursiv*
\`\`\`
*kursiv*
_kursiv_
\`\`\`
## \xDCberschriften
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Trennlinien
\`\`\`
***
---
\`\`\`
****
## ^Hoch^gestellt & ~Tief~gestellt
\`\`\`
hochgestellt x^2^
tiefgestellt H~2~0
\`\`\`
## ++Unterstrichen++ & ~~Durchgestrichen~~
\`\`\`
++unterstrichen++
~~durchgestrichen~~
\`\`\`
## ==Markiert==
\`\`\`
==markiert==
\`\`\`
## Zitat

\`\`\`
> zitat 1
>> zitat 2
>>> zitat 3
...
\`\`\`

## Liste
\`\`\`
ol
1.
2.
3.
...

ul
-
-
...
\`\`\`

## Todo Liste

- [x] aufgabe 1
- [ ] aufgabe 2

\`\`\`
- [x] aufgabe 1
- [ ] aufgabe 2
\`\`\`

## Link
\`\`\`
Text Link
[Text](www.baidu.com)

Link mit Bild
![Text](http://www.image.com)
\`\`\`
## Code
\\\`\`\` Typ

Codeblock

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Tabelle
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| links | mitte | rechts |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| links | mitte | rechts |
| ---------------------- | ------------- | ----------------- |
## Fu\xDFnote
\`\`\`
hallo[^hallo]
\`\`\`

Schau zum unteren Rand[^hallo]

[^hallo]: fussnote

## Emojis
Details: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematik

Formeln lassen sich darstellen z.b. \uFF1A$x_i + y_i = z_i$ und $\\sum_{i=1}^n a_i=0$
Formeln k\xF6nnen auf einer eigenen Zeile gerendert werden
$$\\sum_{i=1}^n a_i=0$$
Details: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`links\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`mitte\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`rechts\`
\`:::\`
:::

## Liste von Definitionen

Term 1

:   Definition 1

Term 2 mit *inline markup*

:   Definition 2

        { ein wenig code, teil von Definition 2 }

    Dritter Absatz von Definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 mit *inline markup*

:   Definition 2

        { ein wenig code, teil von Definition 2 }

    Dritter Absatz von Definition 2.

\`\`\`

## Abk\xFCrzungen
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
Die HTML Spezifikation
wird gepflegt vom W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
Die HTML Spezifikation
wird gepflegt vom W3C.
\`\`\`
`},function(e,n){e.exports=`@[toc](Catalog)

Markdown Guide
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Bold**
\`\`\`
**bold**
__bold__
\`\`\`
## *Italic*
\`\`\`
*italic*
_italic_
\`\`\`
## Header
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Dividing line
\`\`\`
***
---
\`\`\`
****
## ^Super^script & ~Sub~script
\`\`\`
super x^2^
sub H~2~0
\`\`\`
## ++Underline++ & ~~Strikethrough~~
\`\`\`
++underline++
~~strikethrough~~
\`\`\`
## ==Mark==
\`\`\`
==mark==
\`\`\`
## Quote

\`\`\`
> quote 1
>> quote 2
>>> quote 3
...
\`\`\`

## List
\`\`\`
ol
1.
2.
3.
...

ul
-
-
...
\`\`\`

## Todo List

- [x] task 1
- [ ] task 2

\`\`\`
- [x] task 1
- [ ] task 2
\`\`\`

## Link
\`\`\`
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
\`\`\`
## Code
\\\`\`\` type

code block

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Table
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |
## Footnote
\`\`\`
hello[^hello]
\`\`\`

Look at the bottom[^hello]

[^hello]: footnote

## Emojis
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematics

We can render formulas for example\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$
We can also single-line rendering
$$\\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`left\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`center\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`right\`
\`:::\`
:::

## deflist

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
`},function(e,n){e.exports=`@[toc](Catalogue)

Guide Markdown
==============
> D\xE9tail : [http://commonmark.org/help/](http://commonmark.org/help/)

## **Bold**
\`\`\`
**bold**
__bold__
\`\`\`
## *Italic*
\`\`\`
*italic*
_italic_
\`\`\`
## Header
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Dividing line
\`\`\`
***
---
\`\`\`
****
## ^Super^script & ~Sub~script
\`\`\`
super x^2^
sub H~2~0
\`\`\`
## ++Underline++ & ~~Strikethrough~~
\`\`\`
++underline++
~~strikethrough~~
\`\`\`
## ==Mark==
\`\`\`
==mark==
\`\`\`
## Quote

\`\`\`
> quote 1
>> quote 2
>>> quote 3
...
\`\`\`

## List
\`\`\`
ol
1.
2.
3.
...

ul
-
-
...
\`\`\`
## Link

## Todo List

- [x] \xC9quipe 1
- [ ] \xC9quipe 2

\`\`\`
- [x] \xC9quipe 1
- [ ] \xC9quipe 2
\`\`\`

\`\`\`
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
\`\`\`
## Code
\\\`\`\` type

code block

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Table
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |
## Footnote
\`\`\`
hello[^hello]
\`\`\`

Look at the bottom[^hello]

[^hello]: footnote

## Emojis
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematics

We can render formulas for example\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$
We can also single-line rendering
$$\\sum_{i=1}^n a_i=0$$
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`left\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`center\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`right\`
\`:::\`
:::

## deflist

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
`},function(e,n){e.exports=`@[toc](\u76EE\u6B21)

Markdown \u6587\u6CD5\u30AC\u30A4\u30C9
===
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)

## **\u592A\u5B57**
\`\`\`
**\u592A\u5B57**
__\u592A\u5B57__
\`\`\`
## *\u659C\u4F53*
\`\`\`
*\u659C\u4F53*
_\u659C\u4F53_
\`\`\`
## \u898B\u51FA\u3057
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## \u6A2A\u7DDA
\`\`\`
***
---
\`\`\`
****
## ^\u4E0A\u4ED8\u304D^\u6587\u5B57 & ~\u4E0B\u4ED8\u304D~\u6587\u5B57
\`\`\`
super x^2^
sub H~2~0
\`\`\`
## ++\u4E0B\u7DDA++ & ~~\u53D6\u308A\u6D88\u3057\u7DDA~~
\`\`\`
++underline++
~~strikethrough~~
\`\`\`
## ==\u86CD\u5149\u30DA\u30F3==
\`\`\`
==mark==
\`\`\`
## \u5F15\u7528

\`\`\`
> quote 1
>> quote 2
>>> quote 3
...
\`\`\`

## \u30EA\u30B9\u30C8
\`\`\`
\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8
1.
2.
3.
...

\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8
-
-
...
\`\`\`

## Todo\u30EA\u30B9\u30C8

- [x] task 1
- [ ] task 2

\`\`\`
- [x] task 1
- [ ] task 2
\`\`\`

## \u30EA\u30F3\u30AF
\`\`\`
Text Link
[Text](www.baidu.com)

Image Link
![Text](http://www.image.com)
\`\`\`
## \u30B3\u30FC\u30C9
\\\`\`\` type

code block

\\\`\`\`

\\\` code \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## \u8868
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| left | center | right |
| ---------------------- | ------------- | ----------------- |

## \u811A\u6CE8
\`\`\`
hello[^hello]
\`\`\`

Look at the bottom[^hello]

[^hello]: footnote

## \u7D75\u6587\u5B57
> Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ \u6570\u5F0F
> Detailed: [KaTeX\u30DE\u30CB\u30E5\u30A2\u30EB](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u3001[KaTeX function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u3001[LaTeX\u30DE\u30CB\u30E5\u30A2\u30EB](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

We can render formulas for example\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$  
We can also single-line rendering
$$\\sum_{i=1}^n a_i=0$$

## \u30EC\u30A4\u30A2\u30A6\u30C8

::: hljs-left
\`::: hljs-left\`
\`left\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`center\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`right\`
\`:::\`
:::

## \u5B9A\u7FA9\u30EA\u30B9\u30C8

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`
Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
\`\`\`
`},function(e,n){e.exports=`@[toc](Directory)

Guia Markdown
===
> Detalhes: [http://commonmark.org/help/](http://commonmark.org/help/)

## **Negrito**
\`\`\`
**negrito**
__negrito__
\`\`\`
## *It\xE1lico*
\`\`\`
*it\xE1lico*
_it\xE1lico_
\`\`\`
## Cabe\xE7alho
\`\`\`
# h1 #
h1
====
## h2 ##
h2
----
### h3 ###
#### h4 ####
##### h5 #####
###### h6 ######
\`\`\`
## Linha Divisora
\`\`\`
***
---
\`\`\`
****
## ^Sobre^scrito & ~Sub~scrito
\`\`\`
sobre x^2^
sub H~2~0
\`\`\`
## ++Sublinhar++ & ~~Tachar~~
\`\`\`
++sublinhar++
~~tachar~~
\`\`\`
## ==Marcador==
\`\`\`
==marcador==
\`\`\`
## Cita\xE7\xE3o

\`\`\`
> cita\xE7\xE3o 1
>> cita\xE7\xE3o 2
>>> cita\xE7\xE3o 3
...
\`\`\`

## Listas
\`\`\`
lista Numerada
1.
2.
3.
...

lista com marcadores
-
-
...
\`\`\`

## Todo Listas

- [x] Tarefa 1
- [ ] Tarefa 2

\`\`\`
- [x] Tarefa 1
- [ ] Tarefa 2
\`\`\`

## Link
\`\`\`
Link Texto
[Text](www.baidu.com)

Link Imagem
![Text](http://www.image.com)
\`\`\`
## C\xF3digo
\\\`\`\` tipo

bloco de c\xF3digo

\\\`\`\`

\\\` c\xF3digo \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`

## Tabela
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| esquerda | centro | direita |
\`\`\`
| th1 | th2 | th3 |
| :--  | :--: | ----: |
| esquerda | centro | direita |
| ---------------------- | ------------- | ----------------- |
## Rodap\xE9
\`\`\`
ol\xE1[^ol\xE1]
\`\`\`

Olhe para baixo[^ol\xE1]

[^ol\xE1]: rodap\xE9

## Emojis
Detalhes: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$ Mathematics

Podemos mostrar f\xF3rmulas por exemplo\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$
Podemos tamb\xE9m mostrar em uma \xFAnica linha:
$$\\sum_{i=1}^n a_i=0$$
Detalhes: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## Layout

::: hljs-left
\`::: hljs-left\`
\`esquerda\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`centro\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`direita\`
\`:::\`
:::

## Defini\xE7\xF5es

Termo 1

:   Defini\xE7\xE3o 1

Termo 2 com *markup inline*

:   Defini\xE7\xE3o 2

        { um pouco de c\xF3digo, parte da Defini\xE7\xE3o 2 }

    Terceiro par\xE1grafo da defini\xE7\xE3o 2.

\`\`\`
Termo 1

:   Defini\xE7\xE3o 1

Termo 2 com *markup inline*

:   Defini\xE7\xE3o 2

        { um pouco de c\xF3digo, parte da Defini\xE7\xE3o 2 }

    Terceiro par\xE1grafo da defini\xE7\xE3o 2.

\`\`\`

## Abrevia\xE7\xF5es
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
A especifica\xE7\xE3o HTML
\xE9 mantida pela W3C.
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
\xE9 mantida pela W3C.
\`\`\`
`},function(e,n){e.exports=`@[toc](Catalog)  
  
Markdown \u043F\u043E\u043C\u043E\u0449\u044C  
===  
> \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435: [http://commonmark.org/help/](http://commonmark.org/help/)  
  
## **\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439**  
\`\`\`  
**\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439**  
__\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439__  
\`\`\`  
## *\u041A\u0443\u0440\u0441\u0438\u0432*  
\`\`\`  
*\u041A\u0443\u0440\u0441\u0438\u0432*  
_\u041A\u0443\u0440\u0441\u0438\u0432_  
\`\`\`  
## \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A  
\`\`\`  
# h1 #  
h1  
====  
## h2 ##  
h2  
----  
### h3 ###  
#### h4 ####  
##### h5 #####  
###### h6 ######  
\`\`\`  
## \u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u043D\u0438\u044F  
\`\`\`  
***  
---  
\`\`\`  
****  
## ^\u0412\u0435\u0440\u0445\u043D\u0438\u0439^\u0438\u043D\u0434\u0435\u043A\u0441 & ~\u041D\u0438\u0436\u043D\u0438\u0439~\u0438\u043D\u0434\u0435\u043A\u0441  
\`\`\`  
\u0432\u0435\u0440\u0445\u043D\u0438\u0439 x^2^  
\u043D\u0438\u0436\u043D\u0438\u0439 H~2~0  
\`\`\`  
## ++\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439++ & ~~\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439~~  
\`\`\`  
++\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439++  
~~\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439~~  
\`\`\`  
## ==\u041E\u0442\u043C\u0435\u0442\u043A\u0430==  
\`\`\`  
==\u041E\u0442\u043C\u0435\u0442\u043A\u0430==  
\`\`\`  
## \u0426\u0438\u0442\u0430\u0442\u0430  
  
\`\`\`  
> \u0426\u0438\u0442\u0430\u0442\u0430  
>> \u0426\u0438\u0442\u0430\u0442\u0430 2  
>>> \u0426\u0438\u0442\u0430\u0442\u0430 3  
...  
\`\`\`  
  
## \u0421\u043F\u0438\u0441\u043E\u043A  
\`\`\`  
ol  
1.  
2.  
3.  
...  
  
ul  
-  
-  
...  
\`\`\`  
  
## \u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0434\u0430\u0447  
  
- [x] \u0417\u0430\u0434\u0430\u0447\u0430 1  
- [ ] \u0417\u0430\u0434\u0430\u0447\u0430 2  
  
\`\`\`  
- [x] \u0417\u0430\u0434\u0430\u0447\u0430 1  
- [ ] \u0417\u0430\u0434\u0430\u0447\u0430 2  
\`\`\`  
  
## \u0421\u0441\u044B\u043B\u043A\u0430  
\`\`\`  
\u0421\u0441\u044B\u043B\u043A\u0430  
[\u0422\u0435\u043A\u0441\u0442](www.baidu.com)  
  
\u0421\u0441\u044B\u043B\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F  
![\u0422\u0435\u043A\u0441\u0442](http://www.image.com)  
\`\`\`  
## \u041A\u043E\u0434  
\\\`\`\` type  
  
code block  
  
\\\`\`\`  
  
\\\` code \\\`  
  
\`\`\`c++  
int main()  
{  
 printf("hello world!");}  
\`\`\`  
\`code\`  
  
## \u0422\u0430\u0431\u043B\u0438\u0446\u0430  
\`\`\`  
| th1 | th2 | th3 |  
| :--  | :--: | ----: |  
| left | center | right |  
\`\`\`  
| th1 | th2 | th3 |  
| :--  | :--: | ----: |  
| left | center | right |  
| ---------------------- | ------------- | ----------------- |  
## \u0421\u043D\u043E\u0441\u043A\u0430  
\`\`\`  
\u041F\u0440\u0438\u0432\u0435\u0442[^\u041F\u0440\u0438\u0432\u0435\u0442]  
\`\`\`  
  
\u0422\u0443\u0442 \u0447\u0442\u043E-\u0442\u043E \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0435[^\u041F\u0440\u0438\u0432\u0435\u0442]  
  
[^\u041F\u0440\u0438\u0432\u0435\u0442]: \u0410 \u0442\u0443\u0442 \u043E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u0435  
  
## Emojis  
\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)  
\`\`\`  
:laughing:  
:blush:  
:smiley:  
:)  
...  
\`\`\`  
:laughing::blush::smiley::)  
  
## $\\KaTeX$ Mathematics  
  
\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0432\u043E\u0434\u0438\u0442\u044C \u0442\u0430\u043A\u0438\u0435 \u0444\u043E\u0440\u043C\u0443\u043B\u044B\uFF1A$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$  
\u0410 \u0442\u0430\u043A\u0436\u0435 \u0432 \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443:
$$\\sum_{i=1}^n a_i=0$$  
\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435: 
- [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)
- [katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)
- [latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)  
  
## \u0420\u0430\u0437\u043C\u0435\u0442\u043A\u0430
  
::: hljs-left  
\`::: hljs-left\`  
\`left\`  
\`:::\`  
:::  
  
::: hljs-center  
\`::: hljs-center\`  
\`center\`  
\`:::\`  
:::  
  
::: hljs-right  
\`::: hljs-right\`  
\`right\`  
\`:::\`  
:::  
  
## \u0421\u043F\u0438\u0441\u043E\u043A \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0439
  
\u0422\u0435\u0440\u043C\u0438\u043D 1  
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 1  
  
\u0422\u0435\u0440\u043C\u0438\u043D  2 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C *\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0438*
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 2  
  
 { \u041A\u0430\u043A\u043E\u0439-\u043D\u0438\u0431\u0443\u0434\u044C \u043A\u043E\u0434, \u0447\u0430\u0441\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2 }  
 \u0422\u0440\u0435\u0442\u0438\u0439 \u043F\u0430\u0440\u0430\u0433\u0440\u0430\u0444 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2.  
\`\`\`  
\u0422\u0435\u0440\u043C\u0438\u043D 1  
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 1  
  
\u0422\u0435\u0440\u043C\u0438\u043D  2 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C *\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0438*
  
:   \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 2  
  
 { \u041A\u0430\u043A\u043E\u0439-\u043D\u0438\u0431\u0443\u0434\u044C \u043A\u043E\u0434, \u0447\u0430\u0441\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2 }  
 \u0422\u0440\u0435\u0442\u0438\u0439 \u043F\u0430\u0440\u0430\u0433\u0440\u0430\u0444 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F 2.  
\`\`\`  
  
## \u0421\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F
*[HTML]: Hyper Text Markup Language  
*[W3C]:  World Wide Web Consortium  
The HTML specification  
is maintained by the W3C.  
\`\`\`  
*[HTML]: Hyper Text Markup Language  
*[W3C]:  World Wide Web Consortium  
The HTML specification  
is maintained by the W3C.  
\`\`\`
`},function(e,n){e.exports=`@[toc](\u76EE\u5F55)

Markdown \u8BED\u6CD5\u7B80\u4ECB
=============
> [\u8BED\u6CD5\u8BE6\u89E3](http://commonmark.org/help/)

## **\u76EE\u5F55**
\`\`\`
@[toc](\u76EE\u5F55)
\`\`\`

## **\u7C97\u4F53**
\`\`\`
**\u7C97\u4F53**
__\u7C97\u4F53__
\`\`\`
## *\u659C\u4F53*
\`\`\`
*\u659C\u4F53*
_\u659C\u4F53_
\`\`\`
## \u6807\u9898
\`\`\`
# \u4E00\u7EA7\u6807\u9898 #
\u4E00\u7EA7\u6807\u9898
====
## \u4E8C\u7EA7\u6807\u9898 ##
\u4E8C\u7EA7\u6807\u9898
----
### \u4E09\u7EA7\u6807\u9898 ###
#### \u56DB\u7EA7\u6807\u9898 ####
##### \u4E94\u7EA7\u6807\u9898 #####
###### \u516D\u7EA7\u6807\u9898 ######
\`\`\`
## \u5206\u5272\u7EBF
\`\`\`
***
---
\`\`\`
****
## ^\u4E0A^\u89D2~\u4E0B~\u6807
\`\`\`
\u4E0A\u89D2\u6807 x^2^
\u4E0B\u89D2\u6807 H~2~0
\`\`\`
## ++\u4E0B\u5212\u7EBF++ ~~\u4E2D\u5212\u7EBF~~
\`\`\`
++\u4E0B\u5212\u7EBF++
~~\u4E2D\u5212\u7EBF~~
\`\`\`
## ==\u6807\u8BB0==
\`\`\`
==\u6807\u8BB0==
\`\`\`
## \u6BB5\u843D\u5F15\u7528
\`\`\`
> \u4E00\u7EA7
>> \u4E8C\u7EA7
>>> \u4E09\u7EA7
...
\`\`\`

## \u5217\u8868
\`\`\`
\u6709\u5E8F\u5217\u8868
1.
2.
3.
...
\u65E0\u5E8F\u5217\u8868
-
-
...
\`\`\`

## \u4EFB\u52A1\u5217\u8868

- [x] \u5DF2\u5B8C\u6210\u4EFB\u52A1
- [ ] \u672A\u5B8C\u6210\u4EFB\u52A1

\`\`\`
- [x] \u5DF2\u5B8C\u6210\u4EFB\u52A1
- [ ] \u672A\u5B8C\u6210\u4EFB\u52A1
\`\`\`

## \u94FE\u63A5
\`\`\`
[\u94FE\u63A5](www.baidu.com)
![\u56FE\u7247\u63CF\u8FF0](http://www.image.com)
\`\`\`
## \u4EE3\u7801\u6BB5\u843D
\\\`\`\` type

\u4EE3\u7801\u6BB5\u843D

\\\`\`\`

\\\` \u4EE3\u7801\u5757 \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`
## \u8868\u683C(table)
\`\`\`
| \u6807\u98981 | \u6807\u98982 | \u6807\u98983 |
| :--  | :--: | ----: |
| \u5DE6\u5BF9\u9F50 | \u5C45\u4E2D | \u53F3\u5BF9\u9F50 |
| ---------------------- | ------------- | ----------------- |
\`\`\`
| \u6807\u98981 | \u6807\u98982 | \u6807\u98983 |
| :--  | :--: | ----: |
| \u5DE6\u5BF9\u9F50 | \u5C45\u4E2D | \u53F3\u5BF9\u9F50 |
| ---------------------- | ------------- | ----------------- |
## \u811A\u6CE8(footnote)
\`\`\`
hello[^hello]
\`\`\`

\u89C1\u5E95\u90E8\u811A\u6CE8[^hello]

[^hello]: \u4E00\u4E2A\u6CE8\u811A

## \u8868\u60C5(emoji)
[\u53C2\u8003\u7F51\u7AD9: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$\u516C\u5F0F

\u6211\u4EEC\u53EF\u4EE5\u6E32\u67D3\u516C\u5F0F\u4F8B\u5982\uFF1A$x_i + y_i = z_i$\u548C$\\sum_{i=1}^n a_i=0$
\u6211\u4EEC\u4E5F\u53EF\u4EE5\u5355\u884C\u6E32\u67D3
$$\\sum_{i=1}^n a_i=0$$
\u5177\u4F53\u53EF\u53C2\u7167[katex\u6587\u6863](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex\u652F\u6301\u7684\u51FD\u6570](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex\u6587\u6863](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## \u5E03\u5C40

::: hljs-left
\`::: hljs-left\`
\`\u5C45\u5DE6\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`\u5C45\u4E2D\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`\u5C45\u53F3\`
\`:::\`
:::

## \u5B9A\u4E49

\u672F\u8BED\u4E00

:   \u5B9A\u4E49\u4E00

\u5305\u542B\u6709*\u884C\u5185\u6807\u8BB0*\u7684\u672F\u8BED\u4E8C

:   \u5B9A\u4E49\u4E8C

        {\u4E00\u4E9B\u5B9A\u4E49\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u7801}

    \u5B9A\u4E49\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`
\u672F\u8BED\u4E00

:   \u5B9A\u4E49\u4E00

\u5305\u542B\u6709*\u884C\u5185\u6807\u8BB0*\u7684\u672F\u8BED\u4E8C

:   \u5B9A\u4E49\u4E8C

        {\u4E00\u4E9B\u5B9A\u4E49\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u7801}

    \u5B9A\u4E49\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u89C4\u8303\u7531 W3C \u7EF4\u62A4
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u89C4\u8303\u7531 W3C \u7EF4\u62A4
\`\`\`

`},function(e,n){e.exports=`@[toc](\u76EE\u9304)

Markdown \u8A9E\u6CD5\u7C21\u4ECB
=============
> [\u8A9E\u6CD5\u8A73\u89E3](http://commonmark.org/help/)

## **\u7C97\u9AD4**
\`\`\`
**\u7C97\u9AD4**
__\u7C97\u9AD4__
\`\`\`
## *\u659C\u9AD4*
\`\`\`
*\u659C\u9AD4*
_\u659C\u9AD4_
\`\`\`
## \u6A19\u984C
\`\`\`
# \u4E00\u7D1A\u6A19\u984C #
\u4E00\u7D1A\u6A19\u984C
====
## \u4E8C\u7D1A\u6A19\u984C ##
\u4E8C\u7D1A\u6A19\u984C
----
### \u4E09\u7D1A\u6A19\u984C ###
#### \u56DB\u7D1A\u6A19\u984C ####
##### \u4E94\u7D1A\u6A19\u984C #####
###### \u516D\u7D1A\u6A19\u984C ######
\`\`\`
## \u5206\u5272\u7DDA
\`\`\`
***
---
\`\`\`
****
## ^\u4E0A^\u89D2~\u4E0B~\u6A19
\`\`\`
\u4E0A\u89D2\u6A19 x^2^
\u4E0B\u89D2\u6A19 H~2~0
\`\`\`
## ++\u4E0B\u5283\u7DDA++ ~~\u4E2D\u5283\u7DDA~~
\`\`\`
++\u4E0B\u5283\u7DDA++
~~\u4E2D\u5283\u7DDA~~
\`\`\`
## ==\u6A19\u8A18==
\`\`\`
==\u6A19\u8A18==
\`\`\`
## \u6BB5\u843D\u5F15\u7528
\`\`\`
> \u4E00\u7D1A
>> \u4E8C\u7D1A
>>> \u4E09\u7D1A
...
\`\`\`

## \u5217\u8868
\`\`\`
\u6709\u5E8F\u5217\u8868
1.
2.
3.
...
\u7121\u5E8F\u5217\u8868
-
-
...
\`\`\`

## \u4EFB\u52D9\u5217\u8868

- [x] \u5DF2\u5B8C\u6210\u4EFB\u52D9
- [ ] \u672A\u5B8C\u6210\u4EFB\u52D9

\`\`\`
- [x] \u5DF2\u5B8C\u6210\u4EFB\u52D9
- [ ] \u672A\u5B8C\u6210\u4EFB\u52D9
\`\`\`

## \u93C8\u63A5
\`\`\`
[\u93C8\u63A5](www.baidu.com)
![\u5716\u7247\u63CF\u8FF0](http://www.image.com)
\`\`\`
## \u4EE3\u78BC\u6BB5\u843D
\\\`\`\` type

\u4EE3\u78BC\u6BB5\u843D

\\\`\`\`

\\\` \u4EE3\u78BC\u584A \\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
\`code\`
## \u8868\u683C(table)
\`\`\`
| \u6A19\u984C1 | \u6A19\u984C2 | \u6A19\u984C3 |
| :--  | :--: | ----: |
| \u5DE6\u5C0D\u9F4A | \u5C45\u4E2D | \u53F3\u5C0D\u9F4A |
| ---------------------- | ------------- | ----------------- |
\`\`\`
| \u6A19\u984C1 | \u6A19\u984C2 | \u6A19\u984C3 |
| :--  | :--: | ----: |
| \u5DE6\u5C0D\u9F4A | \u5C45\u4E2D | \u53F3\u5C0D\u9F4A |
| ---------------------- | ------------- | ----------------- |
## \u8173\u8A3B(footnote)
\`\`\`
hello[^hello]
\`\`\`

\u898B\u5E95\u90E8\u8173\u8A3B[^hello]

[^hello]: \u4E00\u500B\u8A3B\u8173

## \u8868\u60C5(emoji)
[\u53C3\u8003\u7DB2\u7AD9: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::)

## $\\KaTeX$\u516C\u5F0F

\u6211\u5011\u53EF\u4EE5\u6E32\u67D3\u516C\u5F0F\u4F8B\u5982\uFF1A$x_i + y_i = z_i$\u548C$\\sum_{i=1}^n a_i=0$
\u6211\u5011\u4E5F\u53EF\u4EE5\u55AE\u884C\u6E32\u67D3
$$\\sum_{i=1}^n a_i=0$$
\u5177\u9AD4\u53EF\u53C3\u7167[katex\u6587\u6A94](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\u548C[katex\u652F\u6301\u7684\u51FD\u6578](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\u4EE5\u53CA[latex\u6587\u6A94](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## \u5E03\u5C40

::: hljs-left
\`::: hljs-left\`
\`\u5C45\u5DE6\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`\u5C45\u4E2D\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`\u5C45\u53F3\`
\`:::\`
:::

## \u5B9A\u7FA9

\u8853\u8A9E\u4E00

:   \u5B9A\u7FA9\u4E00

\u5305\u542B\u6709*\u884C\u5167\u6A19\u8A18*\u7684\u8853\u8A9E\u4E8C

:   \u5B9A\u7FA9\u4E8C

        {\u4E00\u4E9B\u5B9A\u7FA9\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u78BC}

    \u5B9A\u7FA9\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`
\u8853\u8A9E\u4E00

:   \u5B9A\u7FA9\u4E00

\u5305\u542B\u6709*\u884C\u5167\u6A19\u8A18*\u7684\u8853\u8A9E\u4E8C

:   \u5B9A\u7FA9\u4E8C

        {\u4E00\u4E9B\u5B9A\u7FA9\u4E8C\u7684\u6587\u5B57\u6216\u4EE3\u78BC}

    \u5B9A\u7FA9\u4E8C\u7684\u7B2C\u4E09\u6BB5

\`\`\`

## abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u898F\u7BC4\u7531 W3C \u7DAD\u8B77
\`\`\`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
HTML \u898F\u7BC4\u7531 W3C \u7DAD\u8B77
\`\`\`

`},function(e,n){e.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/},function(e,n,r){n.Any=r(60),n.Cc=r(58),n.Cf=r(195),n.P=r(34),n.Z=r(59)},function(e,n,r){function t(i){r(202)}var o=r(16)(r(65),r(199),t,null,null);o.options.__file="D:\\work\\songwang\\yuangongji\\mavonEditor\\node_modules\\auto-textarea\\auto-textarea.vue",o.esModule&&Object.keys(o.esModule).some(function(i){return i!=="default"&&i.substr(0,2)!=="__"})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] auto-textarea.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,n,r){e.exports={render:function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticClass:"v-right-item"},[t._t("right-toolbar-before"),t._v(" "),t.toolbars.navigation?i("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_navigation,expression:"!s_navigation"}],staticClass:"op-icon fa fa-mavon-bars",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_navigation_on+" (F8)"},on:{click:function(s){return t.$clicks("navigation")}}}):t._e(),t._v(" "),t.toolbars.navigation?i("button",{directives:[{name:"show",rawName:"v-show",value:t.s_navigation,expression:"s_navigation"}],staticClass:"op-icon fa fa-mavon-bars selected",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_navigation_off+" (F8)"},on:{click:function(s){return t.$clicks("navigation")}}}):t._e(),t._v(" "),t.toolbars.preview?i("button",{directives:[{name:"show",rawName:"v-show",value:t.s_preview_switch,expression:"s_preview_switch"}],staticClass:"op-icon fa fa-mavon-eye-slash selected",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_edit+" (F9)"},on:{click:function(s){return t.$clicks("preview")}}}):t._e(),t._v(" "),t.toolbars.preview?i("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_preview_switch,expression:"!s_preview_switch"}],staticClass:"op-icon fa fa-mavon-eye",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_preview+" (F9)"},on:{click:function(s){return t.$clicks("preview")}}}):t._e(),t._v(" "),t.toolbars.fullscreen?i("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_fullScreen,expression:"!s_fullScreen"}],staticClass:"op-icon fa fa-mavon-arrows-alt",attrs:{type:"button",title:t.d_words.tl_fullscreen_on+" (F10)","aria-hidden":"true"},on:{click:function(s){return t.$clicks("fullscreen")}}}):t._e(),t._v(" "),t.toolbars.fullscreen?i("button",{directives:[{name:"show",rawName:"v-show",value:t.s_fullScreen,expression:"s_fullScreen"}],staticClass:"op-icon fa fa-mavon-compress selected",attrs:{type:"button",title:t.d_words.tl_fullscreen_off+" (F10)","aria-hidden":"true"},on:{click:function(s){return t.$clicks("fullscreen")}}}):t._e(),t._v(" "),t.toolbars.readmodel?i("button",{staticClass:"op-icon fa fa-mavon-window-maximize",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_read+" (F11)"},on:{click:function(s){return t.$clicks("read")}}}):t._e(),t._v(" "),t.toolbars.subfield?i("button",{staticClass:"op-icon fa fa-mavon-columns",class:{selected:t.s_subfield},attrs:{type:"button","aria-hidden":"true",title:(t.s_subfield?t.d_words.tl_single_column:t.d_words.tl_double_column)+" (F12)"},on:{click:function(s){return t.$clicks("subfield")}}}):t._e(),t._v(" "),t.toolbars.help&&t.toolbars.htmlcode&&t.toolbars.readmodel&&t.toolbars.fullscreen&&t.toolbars.subfield&&t.toolbars.navigation?i("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.htmlcode?i("button",{directives:[{name:"show",rawName:"v-show",value:!t.s_html_code,expression:"!s_html_code"}],staticClass:"op-icon fa fa-mavon-code",attrs:{type:"button",title:t.d_words.tl_html_on,"aria-hidden":"true"},on:{click:function(s){return t.$clicks("html")}}}):t._e(),t._v(" "),t.toolbars.htmlcode?i("button",{directives:[{name:"show",rawName:"v-show",value:t.s_html_code,expression:"s_html_code"}],staticClass:"op-icon fa fa-mavon-code selected",attrs:{type:"button",title:t.d_words.tl_html_off,"aria-hidden":"true"},on:{click:function(s){return t.$clicks("html")}}}):t._e(),t._v(" "),t.toolbars.help?i("button",{staticClass:"op-icon fa fa-mavon-question-circle",staticStyle:{"font-size":"17px",padding:"5px 6px 5px 3px"},attrs:{type:"button",title:t.d_words.tl_help,"aria-hidden":"true"},on:{click:function(s){return t.$clicks("help")}}}):t._e(),t._v(" "),t._t("right-toolbar-after")],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,n,r){e.exports={render:function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticClass:"auto-textarea-wrapper",style:{fontSize:t.fontSize,lineHeight:t.lineHeight,height:t.fullHeight?"100%":"auto"}},[i("pre",{staticClass:"auto-textarea-block",style:{fontSize:t.fontSize,lineHeight:t.lineHeight,minHeight:t.fullHeight?"100%":"auto"}},[i("br"),t._v(t._s(t.temp_value)+" ")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.temp_value,expression:"temp_value"}],ref:"vTextarea",staticClass:"auto-textarea-input",class:{"no-border":!t.border,"no-resize":!t.resize},style:{fontSize:t.fontSize,lineHeight:t.lineHeight},attrs:{autofocus:t.s_autofocus,spellcheck:"false",placeholder:t.placeholder},domProps:{value:t.temp_value},on:{keyup:t.change,input:function(s){s.target.composing||(t.temp_value=s.target.value)}}})])},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,n,r){e.exports={render:function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticClass:"v-left-item"},[t._t("left-toolbar-before"),t._v(" "),t.toolbars.bold?i("button",{staticClass:"op-icon fa fa-mavon-bold",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_bold+" (ctrl+b)"},on:{click:function(s){return t.$clicks("bold")}}}):t._e(),t._v(" "),t.toolbars.italic?i("button",{staticClass:"op-icon fa fa-mavon-italic",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_italic+" (ctrl+i)"},on:{click:function(s){return t.$clicks("italic")}}}):t._e(),t._v(" "),t.toolbars.header?i("div",{staticClass:"op-icon fa fa-mavon-header dropdown dropdown-wrapper",class:{selected:t.s_header_dropdown_open},attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_header+" (ctrl+h)"},on:{mouseleave:t.$mouseleave_header_dropdown,mouseenter:t.$mouseenter_header_dropdown}},[i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.s_header_dropdown_open,expression:"s_header_dropdown_open"}],staticClass:"op-header popup-dropdown",class:{transition:t.transition},on:{mouseenter:t.$mouseenter_header_dropdown,mouseleave:t.$mouseleave_header_dropdown}},[i("div",{staticClass:"dropdown-item",attrs:{title:"#"},on:{click:function(s){return s.stopPropagation(),t.$click_header("header1")}}},[i("span",[t._v(t._s(t.d_words.tl_header_one))])]),t._v(" "),i("div",{staticClass:"dropdown-item",attrs:{title:"## "},on:{click:function(s){return s.stopPropagation(),t.$click_header("header2")}}},[i("span",[t._v(t._s(t.d_words.tl_header_two))])]),t._v(" "),i("div",{staticClass:"dropdown-item",attrs:{title:"### "},on:{click:function(s){return s.stopPropagation(),t.$click_header("header3")}}},[i("span",[t._v(t._s(t.d_words.tl_header_three))])]),t._v(" "),i("div",{staticClass:"dropdown-item",attrs:{title:"#### "},on:{click:function(s){return s.stopPropagation(),t.$click_header("header4")}}},[i("span",[t._v(t._s(t.d_words.tl_header_four))])]),t._v(" "),i("div",{staticClass:"dropdown-item",attrs:{title:"##### "},on:{click:function(s){return s.stopPropagation(),t.$click_header("header5")}}},[i("span",[t._v(t._s(t.d_words.tl_header_five))])]),t._v(" "),i("div",{staticClass:"dropdown-item",attrs:{title:"###### "},on:{click:function(s){return s.stopPropagation(),t.$click_header("header6")}}},[i("span",[t._v(t._s(t.d_words.tl_header_six))])])])])],1):t._e(),t._v(" "),t.toolbars.header||t.toolbars.italic||t.toolbars.bold?i("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.underline?i("button",{staticClass:"op-icon fa fa-mavon-underline",attrs:{disabled:!t.editable,type:"button",title:t.d_words.tl_underline+" (ctrl+u)","aria-hidden":"true"},on:{click:function(s){return t.$clicks("underline")}}}):t._e(),t._v(" "),t.toolbars.strikethrough?i("button",{staticClass:"op-icon fa fa-mavon-strikethrough",attrs:{disabled:!t.editable,type:"button",title:t.d_words.tl_strikethrough+" (ctrl+shift+d)","aria-hidden":"true"},on:{click:function(s){return t.$clicks("strikethrough")}}}):t._e(),t._v(" "),t.toolbars.mark?i("button",{staticClass:"op-icon fa fa-mavon-thumb-tack",attrs:{disabled:!t.editable,type:"button",title:t.d_words.tl_mark+" (ctrl+m)","aria-hidden":"true"},on:{click:function(s){return t.$clicks("mark")}}}):t._e(),t._v(" "),t.toolbars.superscript?i("button",{staticClass:"op-icon fa fa-mavon-superscript",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_superscript+" (ctrl+alt+s)"},on:{click:function(s){return t.$clicks("superscript")}}}):t._e(),t._v(" "),t.toolbars.subscript?i("button",{staticClass:"op-icon fa fa-mavon-subscript",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_subscript+" (ctrl+shift+s)"},on:{click:function(s){return t.$clicks("subscript")}}}):t._e(),t._v(" "),t.toolbars.alignleft?i("button",{staticClass:"op-icon fa fa-mavon-align-left",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_alignleft+" (ctrl+l)"},on:{click:function(s){return t.$clicks("alignleft")}}}):t._e(),t._v(" "),t.toolbars.aligncenter?i("button",{staticClass:"op-icon fa fa-mavon-align-center",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_aligncenter+" (ctrl+e)"},on:{click:function(s){return t.$clicks("aligncenter")}}}):t._e(),t._v(" "),t.toolbars.alignright?i("button",{staticClass:"op-icon fa fa-mavon-align-right",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_alignright+" (ctrl+r)"},on:{click:function(s){return t.$clicks("alignright")}}}):t._e(),t._v(" "),t.toolbars.superscript||t.toolbars.subscript||t.toolbars.underline||t.toolbars.strikethrough||t.toolbars.mark?i("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.quote?i("button",{staticClass:"op-icon fa fa-mavon-quote-left",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_quote+" (ctrl+q)"},on:{click:function(s){return t.$clicks("quote")}}}):t._e(),t._v(" "),t.toolbars.ol?i("button",{staticClass:"op-icon fa fa-mavon-list-ol",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_ol+" (ctrl+o)"},on:{click:function(s){return t.$clicks("ol")}}}):t._e(),t._v(" "),t.toolbars.ul?i("button",{staticClass:"op-icon fa fa-mavon-list-ul",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_ul+" (ctrl+alt+u)"},on:{click:function(s){return t.$clicks("ul")}}}):t._e(),t._v(" "),t.toolbars.ul||t.toolbars.ol||t.toolbars.quote?i("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.link?i("button",{staticClass:"op-icon fa fa-mavon-link",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_link+" (ctrl+l)"},on:{click:function(s){return s.stopPropagation(),t.$toggle_imgLinkAdd("link")}}}):t._e(),t._v(" "),t.toolbars.imagelink?i("div",{staticClass:"op-icon fa fa-mavon-picture-o dropdown dropdown-wrapper",class:{selected:t.s_img_dropdown_open},attrs:{disabled:!t.editable,type:"button","aria-hidden":"true"},on:{mouseleave:t.$mouseleave_img_dropdown,mouseenter:t.$mouseenter_img_dropdown}},[i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.s_img_dropdown_open,expression:"s_img_dropdown_open"}],staticClass:"op-image popup-dropdown",class:{transition:t.transition},on:{mouseleave:t.$mouseleave_img_dropdown,mouseenter:t.$mouseenter_img_dropdown}},[i("div",{staticClass:"dropdown-item",on:{click:function(s){return s.stopPropagation(),t.$toggle_imgLinkAdd("imagelink")}}},[i("span",[t._v(t._s(t.d_words.tl_image))])]),t._v(" "),i("div",{staticClass:"dropdown-item",staticStyle:{overflow:"hidden"}},[i("input",{attrs:{type:"file",accept:"image/gif,image/jpeg,image/jpg,image/png,image/svg",multiple:"multiple"},on:{change:function(s){return t.$imgAdd(s)}}}),t._v(t._s(t.d_words.tl_upload)+`
                `)]),t._v(" "),t._l(t.img_file,function(s,a){return s&&s[1]?i("div",{key:a,staticClass:"dropdown-item dropdown-images",attrs:{title:s[1].name},on:{click:function(l){return l.stopPropagation(),t.$imgFileListClick(a)}}},[i("span",[t._v(t._s(s[1].name))]),t._v(" "),i("button",{staticClass:"op-icon fa fa-mavon-times",attrs:{slot:"right",type:"button","aria-hidden":"true",title:t.d_words.tl_upload_remove},on:{click:function(l){return l.stopPropagation(),t.$imgDel(a)}},slot:"right"}),t._v(" "),i("img",{staticClass:"image-show",class:{transition:t.transition},attrs:{src:s[1].miniurl,alt:"none"}})]):t._e()})],2)])],1):t._e(),t._v(" "),t.toolbars.code?i("button",{staticClass:"op-icon fa fa-mavon-code",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_code+" (ctrl+alt+c)"},on:{click:function(s){return t.$clicks("code")}}}):t._e(),t._v(" "),t.toolbars.table?i("button",{staticClass:"op-icon fa fa-mavon-table",attrs:{disabled:!t.editable,type:"button","aria-hidden":"true",title:t.d_words.tl_table+" (ctrl+alt+t)"},on:{click:function(s){return t.$clicks("table")}}}):t._e(),t._v(" "),t.toolbars.link||t.toolbars.imagelink||t.toolbars.code||t.toolbars.table?i("span",{staticClass:"op-icon-divider"}):t._e(),t._v(" "),t.toolbars.undo?i("button",{staticClass:"op-icon fa fa-mavon-undo",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_undo+" (ctrl+z)"},on:{click:function(s){return t.$clicks("undo")}}}):t._e(),t._v(" "),t.toolbars.redo?i("button",{staticClass:"op-icon fa fa-mavon-repeat",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_redo+" (ctrl+y)"},on:{click:function(s){return t.$clicks("redo")}}}):t._e(),t._v(" "),t.toolbars.trash?i("button",{staticClass:"op-icon fa fa-mavon-trash-o",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_trash+" (ctrl+breakspace)"},on:{click:function(s){return t.$clicks("trash")}}}):t._e(),t._v(" "),t.toolbars.save?i("button",{staticClass:"op-icon fa fa-mavon-floppy-o",attrs:{type:"button","aria-hidden":"true",title:t.d_words.tl_save+" (ctrl+s)"},on:{click:function(s){return t.$clicks("save")}}}):t._e(),t._v(" "),t._t("left-toolbar-after"),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.s_img_link_open?i("div",{staticClass:"add-image-link-wrapper"},[i("div",{staticClass:"add-image-link"},[i("i",{staticClass:"fa fa-mavon-times",attrs:{"aria-hidden":"true"},on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.s_img_link_open=!1}}}),t._v(" "),i("h3",{staticClass:"title"},[t._v(t._s(t.link_type=="link"?t.d_words.tl_popup_link_title:t.d_words.tl_popup_img_link_title))]),t._v(" "),i("div",{staticClass:"link-text input-wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.link_text,expression:"link_text"}],ref:"linkTextInput",attrs:{type:"text",placeholder:t.link_type=="link"?t.d_words.tl_popup_link_text:t.d_words.tl_popup_img_link_text},domProps:{value:t.link_text},on:{input:function(s){s.target.composing||(t.link_text=s.target.value)}}})]),t._v(" "),i("div",{staticClass:"link-addr input-wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.link_addr,expression:"link_addr"}],attrs:{type:"text",placeholder:t.link_type=="link"?t.d_words.tl_popup_link_addr:t.d_words.tl_popup_img_link_addr},domProps:{value:t.link_addr},on:{input:function(s){s.target.composing||(t.link_addr=s.target.value)}}})]),t._v(" "),i("div",{staticClass:"op-btn cancel",on:{click:function(s){s.stopPropagation(),t.s_img_link_open=!1}}},[t._v(t._s(t.d_words.tl_popup_link_cancel))]),t._v(" "),i("div",{staticClass:"op-btn sure",on:{click:function(s){return s.stopPropagation(),t.$imgLinkAdd()}}},[t._v(t._s(t.d_words.tl_popup_link_sure))])])]):t._e()])],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,n,r){e.exports={render:function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticClass:"v-note-wrapper markdown-body",class:[{fullscreen:t.s_fullScreen,shadow:t.boxShadow}],style:{"box-shadow":t.boxShadow?t.boxShadowStyle:""}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.toolbarsFlag,expression:"toolbarsFlag"}],staticClass:"v-note-op",style:{background:t.toolbarsBackground}},[i("v-md-toolbar-left",{ref:"toolbar_left",class:{transition:t.transition},attrs:{editable:t.editable,transition:t.transition,d_words:t.d_words,toolbars:t.toolbars,image_filter:t.imageFilter},on:{toolbar_left_click:t.toolbar_left_click,toolbar_left_addlink:t.toolbar_left_addlink,imgAdd:t.$imgAdd,imgDel:t.$imgDel,imgTouch:t.$imgTouch}},[t._t("left-toolbar-before",null,{slot:"left-toolbar-before"}),t._v(" "),t._t("left-toolbar-after",null,{slot:"left-toolbar-after"})],2),t._v(" "),i("v-md-toolbar-right",{ref:"toolbar_right",class:{transition:t.transition},attrs:{d_words:t.d_words,toolbars:t.toolbars,s_subfield:t.s_subfield,s_preview_switch:t.s_preview_switch,s_fullScreen:t.s_fullScreen,s_html_code:t.s_html_code,s_navigation:t.s_navigation},on:{toolbar_right_click:t.toolbar_right_click}},[t._t("right-toolbar-before",null,{slot:"right-toolbar-before"}),t._v(" "),t._t("right-toolbar-after",null,{slot:"right-toolbar-after"})],2)],1),t._v(" "),i("div",{staticClass:"v-note-panel"},[i("div",{ref:"vNoteEdit",staticClass:"v-note-edit divarea-wrapper",class:{"scroll-style":t.s_scrollStyle,"scroll-style-border-radius":t.s_scrollStyle&&!t.s_preview_switch&&!t.s_html_code,"single-edit":!t.s_preview_switch&&!t.s_html_code,"single-show":!t.s_subfield&&t.s_preview_switch||!t.s_subfield&&t.s_html_code,transition:t.transition},on:{scroll:t.$v_edit_scroll,click:t.textAreaFocus}},[i("div",{staticClass:"content-input-wrapper",style:{"background-color":t.editorBackground}},[i("v-autoTextarea",{ref:"vNoteTextarea",staticClass:"content-input",style:{"background-color":t.editorBackground},attrs:{placeholder:t.placeholder?t.placeholder:t.d_words.start_editor,fontSize:t.fontSize,lineHeight:"1.5",fullHeight:""},model:{value:t.d_value,callback:function(s){t.d_value=s},expression:"d_value"}})],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.s_preview_switch||t.s_html_code,expression:"s_preview_switch || s_html_code"}],staticClass:"v-note-show",class:{"single-show":!t.s_subfield&&t.s_preview_switch||!t.s_subfield&&t.s_html_code}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.s_html_code,expression:"!s_html_code"}],ref:"vShowContent",staticClass:"v-show-content",class:{"scroll-style":t.s_scrollStyle,"scroll-style-border-radius":t.s_scrollStyle},style:{"background-color":t.previewBackground},domProps:{innerHTML:t._s(t.d_render)}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.s_html_code,expression:"s_html_code"}],staticClass:"v-show-content-html",class:{"scroll-style":t.s_scrollStyle,"scroll-style-border-radius":t.s_scrollStyle},style:{"background-color":t.previewBackground}},[t._v(`
                `+t._s(t.d_render)+`
            `)])]),t._v(" "),i("transition",{attrs:{name:"slideTop"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.s_navigation,expression:"s_navigation"}],staticClass:"v-note-navigation-wrapper",class:{transition:t.transition}},[i("div",{staticClass:"v-note-navigation-title"},[t._v(`
                    `+t._s(t.d_words.navigation_title)),i("i",{staticClass:"fa fa-mavon-times v-note-navigation-close",attrs:{"aria-hidden":"true"},on:{click:function(s){return t.toolbar_right_click("navigation")}}})]),t._v(" "),i("div",{ref:"navigationContent",staticClass:"v-note-navigation-content",class:{"scroll-style":t.s_scrollStyle}})])])],1),t._v(" "),i("transition",{attrs:{name:"fade"}},[i("div",{ref:"help"},[t.s_help?i("div",{staticClass:"v-note-help-wrapper",on:{click:function(s){return s.target!==s.currentTarget?null:t.toolbar_right_click("help")}}},[i("div",{staticClass:"v-note-help-content markdown-body",class:{shadow:t.boxShadow}},[i("i",{staticClass:"fa fa-mavon-times",attrs:{"aria-hidden":"true"},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.toolbar_right_click("help")}}}),t._v(" "),i("div",{staticClass:"scroll-style v-note-help-show",domProps:{innerHTML:t._s(t.d_help)}})])]):t._e()])]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.d_preview_imgsrc?i("div",{staticClass:"v-note-img-wrapper",on:{click:function(s){t.d_preview_imgsrc=null}}},[i("img",{attrs:{src:t.d_preview_imgsrc,alt:"none"}})]):t._e()]),t._v(" "),i("div",{ref:"vReadModel",staticClass:"v-note-read-model scroll-style",class:{show:t.s_readmodel}},[i("div",{ref:"vNoteReadContent",staticClass:"v-note-read-content",domProps:{innerHTML:t._s(t.d_render)}})])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},function(e,n,r){var t=r(107);typeof t=="string"&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals),r(17)("c0faed68",t,!1,{})},function(e,n,r){var t=r(108);typeof t=="string"&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals),r(17)("118de024",t,!1,{})},function(e,n,r){var t=r(109);typeof t=="string"&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals),r(17)("2f84471f",t,!1,{})},function(e,n,r){var t=r(110);typeof t=="string"&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals),r(17)("6daa4aa0",t,!1,{})},function(e,n){e.exports=function(r,t){for(var o=[],i={},s=0;s<t.length;s++){var a=t[s],l=a[0],u=a[1],f=a[2],c=a[3],d={id:r+":"+s,css:u,media:f,sourceMap:c};i[l]?i[l].parts.push(d):o.push(i[l]={id:l,parts:[d]})}return o}},function(e,n){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch{typeof window=="object"&&(r=window)}e.exports=r},function(e,n){e.exports=function(r){return r.webpackPolyfill||(r.deprecate=function(){},r.paths=[],r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),r.webpackPolyfill=1),r}},function(e,n,r){function t(l,u){return new s(u).process(l)}var o=r(61),i=r(62),s=r(210);n=e.exports=t,n.filterXSS=t,n.FilterXSS=s;for(var a in o)n[a]=o[a];for(var a in i)n[a]=i[a];typeof window!="undefined"&&(window.filterXSS=e.exports),function(){return typeof self!="undefined"&&typeof DedicatedWorkerGlobalScope!="undefined"&&self instanceof DedicatedWorkerGlobalScope}()&&(self.filterXSS=e.exports)},function(e,n,r){function t(_){return _==null}function o(_){var v=d.spaceIndex(_);if(v===-1)return{html:"",closing:_[_.length-2]==="/"};_=d.trim(_.slice(v+1,-1));var b=_[_.length-1]==="/";return b&&(_=d.trim(_.slice(0,-1))),{html:_,closing:b}}function i(_){var v={};for(var b in _)v[b]=_[b];return v}function s(_){_=i(_||{}),_.stripIgnoreTag&&(_.onIgnoreTag&&console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),_.onIgnoreTag=l.onIgnoreTagStripAll),_.whiteList=_.whiteList||l.whiteList,_.onTag=_.onTag||l.onTag,_.onTagAttr=_.onTagAttr||l.onTagAttr,_.onIgnoreTag=_.onIgnoreTag||l.onIgnoreTag,_.onIgnoreTagAttr=_.onIgnoreTagAttr||l.onIgnoreTagAttr,_.safeAttrValue=_.safeAttrValue||l.safeAttrValue,_.escapeHtml=_.escapeHtml||l.escapeHtml,this.options=_,_.css===!1?this.cssFilter=!1:(_.css=_.css||{},this.cssFilter=new a(_.css))}var a=r(31).FilterCSS,l=r(61),u=r(62),f=u.parseTag,c=u.parseAttr,d=r(35);s.prototype.process=function(_){if(_=_||"",!(_=_.toString()))return"";var v=this,b=v.options,C=b.whiteList,m=b.onTag,g=b.onIgnoreTag,y=b.onTagAttr,k=b.onIgnoreTagAttr,x=b.safeAttrValue,w=b.escapeHtml,A=v.cssFilter;b.stripBlankChar&&(_=l.stripBlankChar(_)),b.allowCommentTag||(_=l.stripCommentTag(_));var E=!1;if(b.stripIgnoreTagBody){var E=l.StripTagBody(b.stripIgnoreTagBody,g);g=E.onIgnoreTag}var S=f(_,function(O,P,L,M,G){var X={sourcePosition:O,position:P,isClosing:G,isWhite:C.hasOwnProperty(L)},j=m(L,M,X);if(!t(j))return j;if(X.isWhite){if(X.isClosing)return"</"+L+">";var q=o(M),ee=C[L],fe=c(q.html,function(V,$){var ne=d.indexOf(ee,V)!==-1,ce=y(L,V,$,ne);if(!t(ce))return ce;if(ne)return $=x(L,V,$,A),$?V+'="'+$+'"':V;var ce=k(L,V,$,ne);return t(ce)?void 0:ce}),M="<"+L;return fe&&(M+=" "+fe),q.closing&&(M+=" /"),M+=">"}var j=g(L,M,X);return t(j)?w(M):j},w);return E&&(S=E.remove(S)),S},e.exports=s},function(e,n){e.exports={start_editor:"Bearbeitung beginnen...",navigation_title:"Navigation",tl_bold:"Fett",tl_italic:"Kursiv",tl_header:"\xDCberschrift",tl_header_one:"\xDCberschrift 1",tl_header_two:"\xDCberschrift 2",tl_header_three:"\xDCberschrift 3",tl_header_four:"\xDCberschrift 4",tl_header_five:"\xDCberschrift 5",tl_header_six:"\xDCberschrift 6",tl_underline:"Unterstrichen",tl_strikethrough:"Durchgestrichen",tl_mark:"Markiert",tl_superscript:"Hochgestellt",tl_subscript:"Tiefgestellt",tl_quote:"Zitat",tl_ol:"Ol",tl_ul:"Ul",tl_link:"Link",tl_image:"Link mit Bild",tl_code:"Code",tl_table:"Tabelle",tl_undo:"R\xFCckg\xE4ngig",tl_redo:"Wiederherstellen",tl_trash:"M\xFClleimer",tl_save:"Speichern",tl_navigation_on:"Navigation AN",tl_navigation_off:"Navigation AUS",tl_preview:"Vorschau",tl_aligncenter:"Text zentrieren",tl_alignleft:"Nach links ausrichten",tl_alignright:"Nach rechts ausrichten",tl_edit:"Bearbeiten",tl_single_column:"Einspaltig",tl_double_column:"Zweispaltig",tl_fullscreen_on:"Vollbild AN",tl_fullscreen_off:"Vollbild AUS",tl_read:"Lesemodus",tl_html_on:"HTML AN",tl_html_off:"HTML AUS",tl_help:"Markdown Handbuch",tl_upload:"Bilder-Upload",tl_upload_remove:"Entfernen",tl_popup_link_title:"Link hinzuf\xFCgen",tl_popup_link_text:"Text des Links",tl_popup_link_addr:"Linkziel",tl_popup_img_link_title:"Bild hinzuf\xFCgen",tl_popup_img_link_text:"Text des Bildes",tl_popup_img_link_addr:"Link auf Bild",tl_popup_link_sure:"Ja",tl_popup_link_cancel:"Abbruch"}},function(e,n){e.exports={start_editor:"Begin editing...",navigation_title:"Navigation",tl_bold:"Bold",tl_italic:"Italic",tl_header:"Header",tl_header_one:"Header 1",tl_header_two:"Header 2",tl_header_three:"Header 3",tl_header_four:"Header 4",tl_header_five:"Header 5",tl_header_six:"Header 6",tl_underline:"Underline",tl_strikethrough:"Strikethrough",tl_mark:"Mark",tl_superscript:"Superscript",tl_subscript:"Subscript",tl_quote:"Quote",tl_ol:"Ol",tl_ul:"Ul",tl_link:"Link",tl_image:"Image Link",tl_code:"Code",tl_table:"Table",tl_undo:"Undo",tl_redo:"Redo",tl_trash:"Trash",tl_save:"Save",tl_navigation_on:"Navigation ON",tl_navigation_off:"Navigation OFF",tl_preview:"Preview",tl_aligncenter:"Center text",tl_alignleft:"Clamp text to the left",tl_alignright:"Clamp text to the right",tl_edit:"Edit",tl_single_column:"Single Column",tl_double_column:"Double Columns",tl_fullscreen_on:"FullScreen ON",tl_fullscreen_off:"FullScreen OFF",tl_read:"Read Model",tl_html_on:"HTML ON",tl_html_off:"HTML OFF",tl_help:"Markdown Guide",tl_upload:"Upload Images",tl_upload_remove:"Remove",tl_popup_link_title:"Add Link",tl_popup_link_text:"Link text",tl_popup_link_addr:"Link address",tl_popup_img_link_title:"Add Image",tl_popup_img_link_text:"Image Text",tl_popup_img_link_addr:"Image Link",tl_popup_link_sure:"Sure",tl_popup_link_cancel:"Cancel"}},function(e,n){e.exports={start_editor:"D\xE9but d'\xE9dition...",navigation_title:"Navigation",tl_bold:"Gras",tl_italic:"Italique",tl_header:"Ent\xEAte",tl_header_one:"Ent\xEAte 1",tl_header_two:"Ent\xEAte 2",tl_header_three:"Ent\xEAte 3",tl_header_four:"Ent\xEAte 4",tl_header_five:"Ent\xEAte 5",tl_header_six:"Ent\xEAte 6",tl_underline:"Soulign\xE9",tl_strikethrough:"Barr\xE9",tl_mark:"Mark",tl_superscript:"Exposant",tl_subscript:"Sous-exposant",tl_quote:"Quote",tl_ol:"Liste ",tl_ul:"Puce",tl_link:"Lien",tl_image:"Image Lien",tl_code:"Code",tl_table:"Table",tl_undo:"Annuler",tl_redo:"Refaire",tl_trash:"Supprimer",tl_save:"Sauver",tl_navigation_on:"Activer la navigation",tl_navigation_off:"D\xE9sactiver le navigation",tl_preview:"Previsualis\xE9",tl_aligncenter:"Center le texte",tl_alignleft:"F\xE9rer le texte \xE0 gauche",tl_alignright:"F\xE9rer le texte \xE0 droite",tl_edit:"Editer",tl_single_column:"Seule Colonne",tl_double_column:"Colonnes Doubles",tl_fullscreen_on:"Activer le mode plein \xE9cran",tl_fullscreen_off:"D\xE9sactiver le mode plein \xE9cran",tl_read:"Lire le mod\xE8le",tl_html_on:"Activer le mode HTML",tl_html_off:"D\xE9sactiver le mode HTML",tl_help:"Guide Markdown",tl_upload:"T\xE9l\xE9charger les images",tl_upload_remove:"Supprimer",tl_popup_link_title:"Ajouter un lien",tl_popup_link_text:"Description",tl_popup_link_addr:"Link",tl_popup_img_link_title:"Ajouter une image",tl_popup_img_link_text:"Description",tl_popup_img_link_addr:"Link",tl_popup_link_sure:"s\xFBr",tl_popup_link_cancel:"Annuler"}},function(e,n){e.exports={start_editor:"\u7DE8\u96C6\u3092\u59CB\u3081\u3066\u306D\uFF01",navigation_title:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",tl_bold:"\u592A\u5B57",tl_italic:"\u659C\u4F53",tl_header:"\u898B\u51FA\u3057",tl_header_one:"\u898B\u51FA\u30571",tl_header_two:"\u898B\u51FA\u30572",tl_header_three:"\u898B\u51FA\u30573",tl_header_four:"\u898B\u51FA\u30574",tl_header_five:"\u898B\u51FA\u30575",tl_header_six:"\u898B\u51FA\u30576",tl_underline:"\u4E0B\u7DDA",tl_strikethrough:"\u53D6\u308A\u6D88\u3057\u7DDA",tl_mark:"\u86CD\u5149\u30DA\u30F3",tl_superscript:"\u4E0A\u4ED8\u304D\u6587\u5B57",tl_subscript:"\u4E0B\u4ED8\u304D\u6587\u5B57",tl_quote:"\u5F15\u7528",tl_ol:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8",tl_ul:"\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8",tl_link:"\u30CF\u30A4\u30D1\u30FC\u30EA\u30F3\u30AF",tl_image:"\u753B\u50CF\u306E\u30EA\u30F3\u30AF",tl_code:"\u30B3\u30FC\u30C9\u306E\u633F\u5165",tl_table:"\u8868\u306E\u633F\u5165",tl_undo:"\u623B\u308B",tl_redo:"\u9032\u3080",tl_trash:"\u524A\u9664",tl_save:"\u4FDD\u5B58",tl_navigation_on:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u3092\u8868\u793A",tl_navigation_off:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u3092\u975E\u8868\u793A",tl_preview:"\u30D7\u30EC\u30D3\u30E5\u30FC",tl_aligncenter:"\u4E2D\u592E\u63C3\u3048",tl_alignleft:"\u5DE6\u63C3\u3048",tl_alignright:"\u53F3\u63C3\u3048",tl_edit:"\u7DE8\u96C6",tl_single_column:"\u4E00\u5217",tl_double_column:"\u4E8C\u5217",tl_fullscreen_on:"\u5168\u753B\u9762\u8868\u793A",tl_fullscreen_off:"\u5168\u753B\u9762\u8868\u793A\u306E\u7D42\u4E86",tl_read:"\u30E2\u30C7\u30EB\u306E\u8AAD\u307F\u8FBC\u307F",tl_html_on:"HTML\u3067\u8868\u793A",tl_html_off:"HTML\u8868\u793A\u306E\u7D42\u4E86",tl_help:"\u30D8\u30EB\u30D7",tl_upload:"\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",tl_upload_remove:"\u753B\u50CF\u306E\u524A\u9664",tl_popup_link_title:"\u30EA\u30F3\u30AF\u306E\u8FFD\u52A0",tl_popup_link_text:"\u30EA\u30F3\u30AF\u30C6\u30AD\u30B9\u30C8",tl_popup_link_addr:"\u30EA\u30F3\u30AF\u5148\u306EURL",tl_popup_img_link_title:"\u753B\u50CF\u306E\u8FFD\u52A0",tl_popup_img_link_text:"\u753B\u50CF\u30BF\u30A4\u30C8\u30EB",tl_popup_img_link_addr:"\u753B\u50CFURL",tl_popup_link_sure:"OK",tl_popup_link_cancel:"\u623B\u308B"}},function(e,n){e.exports={start_editor:"Come\xE7ar edi\xE7\xE3o...",navigation_title:"Navega\xE7\xE3o",tl_bold:"Negrito",tl_italic:"It\xE1lico",tl_header:"Cabe\xE7alho",tl_header_one:"Cabe\xE7alho 1",tl_header_two:"Cabe\xE7alho 2",tl_header_three:"Cabe\xE7alho 3",tl_header_four:"Cabe\xE7alho 4",tl_header_five:"Cabe\xE7alho 5",tl_header_six:"Cabe\xE7alho 6",tl_underline:"Sublinhar",tl_strikethrough:"Tachar",tl_mark:"Marca\xE7\xE3o",tl_superscript:"Sobrescrito",tl_subscript:"Subscrito",tl_quote:"Cita\xE7\xE3o",tl_ol:"Lista Numerada",tl_ul:"Lista com marcadores",tl_link:"Link",tl_image:"Link de imagem",tl_code:"C\xF3digo",tl_table:"Tabela",tl_undo:"Desfazer",tl_redo:"Refazer",tl_trash:"Lixo",tl_save:"Salvar",tl_navigation_on:"Mostrar Navega\xE7\xE3o",tl_navigation_off:"Esconder Navega\xE7\xE3o",tl_preview:"Preview",tl_aligncenter:"Alinhar no centro",tl_alignleft:"Alinhar \xE0 esquerda",tl_alignright:"Alinhar \xE0 direita",tl_edit:"Editar",tl_single_column:"Coluna \xDAnica",tl_double_column:"Duas Colunas",tl_fullscreen_on:"Ligar Tela Cheia",tl_fullscreen_off:"Desligar Tela Cheia",tl_read:"Modo de Leitura",tl_html_on:"Ligar HTML",tl_html_off:"Desligar HTML",tl_help:"Guia Markdown",tl_upload:"Upload de Imagens",tl_upload_remove:"Remover",tl_popup_link_title:"Adicionar Link",tl_popup_link_text:"Descri\xE7\xE3o",tl_popup_link_addr:"Link",tl_popup_img_link_title:"Adicionar fotos",tl_popup_img_link_text:"Descri\xE7\xE3o",tl_popup_img_link_addr:"Link",tl_popup_link_sure:"Confirmar",tl_popup_link_cancel:"Cancelar"}},function(e,n){e.exports={start_editor:"\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435...",navigation_title:"\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",tl_bold:"\u041F\u043E\u043B\u0443\u0436\u0438\u0440\u043D\u044B\u0439",tl_italic:"\u041A\u0443\u0440\u0441\u0438\u0432",tl_header:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438",tl_header_one:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 1",tl_header_two:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 2",tl_header_three:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 3",tl_header_four:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 4",tl_header_five:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 5",tl_header_six:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 6",tl_underline:"\u041F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439",tl_strikethrough:"\u0417\u0430\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044B\u0439",tl_mark:"\u041E\u0442\u043C\u0435\u0442\u043A\u0430",tl_superscript:"\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u0438\u043D\u0434\u0435\u043A\u0441",tl_subscript:"\u041D\u0438\u0436\u043D\u0438\u0439 \u0438\u043D\u0434\u0435\u043A\u0441",tl_quote:"\u0426\u0438\u0442\u0430\u0442\u0430",tl_ol:"\u041D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A",tl_ul:"\u0421\u043F\u0438\u0441\u043E\u043A",tl_link:"\u0421\u0441\u044B\u043B\u043A\u0430",tl_image:"\u0421\u0441\u044B\u043B\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",tl_code:"\u041A\u043E\u0434",tl_table:"\u0422\u0430\u0431\u043B\u0438\u0446\u0430",tl_undo:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",tl_redo:"\u0412\u0435\u0440\u043D\u0443\u0442\u044C",tl_trash:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",tl_save:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",tl_navigation_on:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044E",tl_navigation_off:"\u0421\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044E",tl_preview:"\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440",tl_aligncenter:"\u0412\u044B\u0440\u043E\u0432\u043D\u044F\u0442\u044C \u043F\u043E \u0446\u0435\u043D\u0442\u0440\u0443",tl_alignleft:"\u0412\u044B\u0440\u043E\u0432\u043D\u044F\u0442\u044C \u043F\u043E \u043B\u0435\u0432\u043E\u043C\u0443 \u043A\u0440\u0430\u044E",tl_alignright:"\u0412\u044B\u0440\u043E\u0432\u043D\u044F\u0442\u044C \u043F\u043E \u043F\u0440\u0430\u0432\u043E\u043C\u0443 \u043A\u0440\u0430\u044E",tl_edit:"\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440",tl_single_column:"\u041E\u0434\u043D\u043E \u043F\u043E\u043B\u0435",tl_double_column:"\u0414\u0432\u0430 \u043F\u043E\u043B\u044F",tl_fullscreen_on:"\u041F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",tl_fullscreen_off:"\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",tl_read:"\u0420\u0435\u0436\u0438\u043C \u0447\u0442\u0435\u043D\u0438\u044F",tl_html_on:"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C HTML",tl_html_off:"\u0423\u0431\u0440\u0430\u0442\u044C HTML",tl_help:"Markdown \u043F\u043E\u043C\u043E\u0449\u044C",tl_upload:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",tl_upload_remove:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",tl_popup_link_title:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",tl_popup_link_text:"\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438",tl_popup_link_addr:"\u0410\u0434\u0440\u0435\u0441 \u0441\u0441\u044B\u043B\u043A\u0438",tl_popup_img_link_title:"\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",tl_popup_img_link_text:"\u0422\u0435\u043A\u0441\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",tl_popup_img_link_addr:"\u0421\u0441\u044B\u043B\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",tl_popup_link_sure:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",tl_popup_link_cancel:"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"}},function(e,n){e.exports={start_editor:"\u5F00\u59CB\u7F16\u8F91...",navigation_title:"\u5BFC\u822A\u76EE\u5F55",tl_bold:"\u7C97\u4F53",tl_italic:"\u659C\u4F53",tl_header:"\u6807\u9898",tl_header_one:"\u4E00\u7EA7\u6807\u9898",tl_header_two:"\u4E8C\u7EA7\u6807\u9898",tl_header_three:"\u4E09\u7EA7\u6807\u9898",tl_header_four:"\u56DB\u7EA7\u6807\u9898",tl_header_five:"\u4E94\u7EA7\u6807\u9898",tl_header_six:"\u516D\u7EA7\u6807\u9898",tl_underline:"\u4E0B\u5212\u7EBF",tl_strikethrough:"\u4E2D\u5212\u7EBF",tl_mark:"\u6807\u8BB0",tl_superscript:"\u4E0A\u89D2\u6807",tl_subscript:"\u4E0B\u89D2\u6807",tl_quote:"\u6BB5\u843D\u5F15\u7528",tl_ol:"\u6709\u5E8F\u5217\u8868",tl_ul:"\u65E0\u5E8F\u5217\u8868",tl_link:"\u94FE\u63A5",tl_image:"\u6DFB\u52A0\u56FE\u7247\u94FE\u63A5",tl_code:"\u4EE3\u7801\u5757",tl_table:"\u8868\u683C",tl_undo:"\u4E0A\u4E00\u6B65",tl_redo:"\u4E0B\u4E00\u6B65",tl_trash:"\u6E05\u7A7A",tl_save:"\u4FDD\u5B58",tl_navigation_on:"\u5F00\u542F\u6807\u9898\u5BFC\u822A",tl_navigation_off:"\u5173\u95ED\u6807\u9898\u5BFC\u822A",tl_preview:"\u9884\u89C8",tl_aligncenter:"\u5C45\u4E2D",tl_alignleft:"\u5C45\u5DE6",tl_alignright:"\u5C45\u53F3",tl_edit:"\u7F16\u8F91",tl_single_column:"\u5355\u680F",tl_double_column:"\u53CC\u680F",tl_fullscreen_on:"\u5168\u5C4F\u7F16\u8F91",tl_fullscreen_off:"\u9000\u51FA\u5168\u5C4F",tl_read:"\u6C89\u6D78\u5F0F\u9605\u8BFB",tl_html_on:"\u67E5\u770Bhtml\u6587\u672C",tl_html_off:"\u8FD4\u56DEmarkdown\u6587\u672C",tl_help:"markdown\u8BED\u6CD5\u5E2E\u52A9",tl_upload:"\u4E0A\u4F20\u56FE\u7247",tl_upload_remove:"\u5220\u9664",tl_popup_link_title:"\u6DFB\u52A0\u94FE\u63A5",tl_popup_link_text:"\u94FE\u63A5\u63CF\u8FF0",tl_popup_link_addr:"\u94FE\u63A5\u5730\u5740",tl_popup_img_link_title:"\u6DFB\u52A0\u56FE\u7247",tl_popup_img_link_text:"\u56FE\u7247\u63CF\u8FF0",tl_popup_img_link_addr:"\u56FE\u7247\u94FE\u63A5",tl_popup_link_sure:"\u786E\u5B9A",tl_popup_link_cancel:"\u53D6\u6D88"}},function(e,n){e.exports={start_editor:"\u958B\u59CB\u7DE8\u8F2F...",navigation_title:"\u5C0E\u822A\u76EE\u9304",tl_bold:"\u7C97\u9AD4",tl_italic:"\u659C\u9AD4",tl_header:"\u6A19\u984C",tl_header_one:"\u4E00\u7D1A\u6A19\u984C",tl_header_two:"\u4E8C\u7D1A\u6A19\u984C",tl_header_three:"\u4E09\u7D1A\u6A19\u984C",tl_header_four:"\u56DB\u7D1A\u6A19\u984C",tl_header_five:"\u4E94\u7D1A\u6A19\u984C",tl_header_six:"\u516D\u7D1A\u6A19\u984C",tl_underline:"\u4E0B\u5283\u7DDA",tl_strikethrough:"\u4E2D\u5283\u7DDA",tl_mark:"\u6A19\u8A18",tl_superscript:"\u4E0A\u89D2\u6A19",tl_subscript:"\u4E0B\u89D2\u6A19",tl_quote:"\u6BB5\u843D\u5F15\u7528",tl_ol:"\u6709\u5E8F\u5217\u8868",tl_ul:"\u7121\u5E8F\u5217\u8868",tl_link:"\u93C8\u63A5",tl_image:"\u6DFB\u52A0\u5716\u7247\u93C8\u63A5",tl_code:"\u4EE3\u78BC\u584A",tl_table:"\u8868\u683C",tl_undo:"\u4E0A\u4E00\u6B65",tl_redo:"\u4E0B\u4E00\u6B65",tl_trash:"\u6E05\u7A7A",tl_save:"\u4FDD\u5B58",tl_navigation_on:"\u958B\u555F\u6A19\u984C\u5C0E\u822A",tl_navigation_off:"\u95DC\u9589\u6A19\u984C\u5C0E\u822A",tl_preview:"\u9810\u89BD",tl_aligncenter:"\u5C45\u4E2D",tl_alignleft:"\u5C45\u5DE6",tl_alignright:"\u5C45\u53F3",tl_edit:"\u7DE8\u8F2F",tl_single_column:"\u55AE\u6B04",tl_double_column:"\u96D9\u6B04",tl_fullscreen_on:"\u5168\u5C4F\u7DE8\u8F2F",tl_fullscreen_off:"\u9000\u51FA\u5168\u5C4F",tl_read:"\u6C88\u6D78\u5F0F\u95B1\u8B80",tl_html_on:"\u67E5\u770Bhtml\u6587\u672C",tl_html_off:"\u8FD4\u56DEmarkdown\u6587\u672C",tl_help:"markdown\u8A9E\u6CD5\u5E6B\u52A9",tl_upload:"\u4E0A\u50B3\u5716\u7247",tl_upload_remove:"\u522A\u9664",tl_popup_link_title:"\u6DFB\u52A0\u93C8\u63A5",tl_popup_link_text:"\u93C8\u63A5\u63CF\u8FF0",tl_popup_link_addr:"\u93C8\u63A5\u5730\u5740",tl_popup_img_link_title:"\u6DFB\u52A0\u5716\u7247",tl_popup_img_link_text:"\u5716\u7247\u63CF\u8FF0",tl_popup_img_link_addr:"\u5716\u7247\u93C8\u63A5",tl_popup_link_sure:"\u78BA\u5B9A",tl_popup_link_cancel:"\u53D6\u6D88"}}])})})(mavonEditor$1);var mavonEditor=getDefaultExportFromCjs(mavonEditor$1.exports),EN_US=["second","minute","hour","day","week","month","year"];function en_US(e,n){if(n===0)return["just now","right now"];var r=EN_US[Math.floor(n/2)];return e>1&&(r+="s"),[e+" "+r+" ago","in "+e+" "+r]}var ZH_CN=["\u79D2","\u5206\u949F","\u5C0F\u65F6","\u5929","\u5468","\u4E2A\u6708","\u5E74"];function zh_CN(e,n){if(n===0)return["\u521A\u521A","\u7247\u523B\u540E"];var r=ZH_CN[~~(n/2)];return[e+" "+r+"\u524D",e+" "+r+"\u540E"]}var Locales={},register=function(e,n){Locales[e]=n},getLocale=function(e){return Locales[e]||Locales.en_US},SEC_ARRAY=[60,60,24,7,365/7/12,12];function toDate(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}function formatDiff(e,n){var r=e<0?1:0;e=Math.abs(e);for(var t=e,o=0;e>=SEC_ARRAY[o]&&o<SEC_ARRAY.length;o++)e/=SEC_ARRAY[o];return e=Math.floor(e),o*=2,e>(o===0?9:1)&&(o+=1),n(e,o,t)[r].replace("%s",e.toString())}function diffSec(e,n){var r=n?toDate(n):new Date;return(+r-+toDate(e))/1e3}var format=function(e,n,r){var t=diffSec(e,r&&r.relativeDate);return formatDiff(t,getLocale(n))};register("en_US",en_US);register("zh_CN",zh_CN);export{createStore as A,createApp as B,mavonEditor as C,Fragment as F,Vuex as V,resolveComponent as a,openBlock as b,computed as c,createElementBlock as d,renderList as e,createBlock as f,getCurrentInstance as g,createBaseVNode as h,createTextVNode as i,normalizeStyle as j,popScopeId as k,createVNode as l,onBeforeMount as m,normalizeClass as n,onMounted as o,pushScopeId as p,createCommentVNode as q,reactive as r,useRoute as s,toDisplayString as t,useStore as u,useRouter as v,withCtx as w,createWebHistory as x,createRouter as y,format as z};
