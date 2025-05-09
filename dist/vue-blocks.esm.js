var Re = Object.defineProperty;
var Oe = (e, t, n) => t in e ? Re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Te = (e, t, n) => Oe(e, typeof t != "symbol" ? t + "" : t, n);
function createDeferred() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.resolve = t, e.reject = n;
  }), e;
}
function fetchXhr(e, t) {
  return t = t || {}, t.headers = t.headers || {}, t.headers["X-Requested-With"] = "XMLHttpRequest", fetch(e, t);
}
function tryEvaluateProperty(node, propertyName, defaultValue = null) {
  if (node.hasAttribute(propertyName)) {
    let propValue = node.getAttribute(propertyName).trim();
    if (propValue.startsWith("{") || propValue.startsWith("["))
      try {
        return eval("(" + propValue + ")");
      } catch (e) {
        throw new Error("Error parsing property " + propertyName + " of " + node.outerHTML.split(/\n/, 2)[0] + ": " + e);
      }
    else if (propValue > "")
      return propValue.trim().split(/\s*,\s*/);
  }
  return defaultValue;
}
function highlightErrorInSource(e, t) {
  const n = e.split(`
`), r = t.lineno - 1, s = n[r] ?? "", o = ("-".repeat(Math.max(0, t.colno - 1)) + "^--- " + t.message + `
`).replace("--^", "> ^");
  return [
    n[r - 2] ?? "",
    n[r - 1] ?? "",
    s,
    o,
    n[r + 1] ?? "",
    n[r + 2] ?? ""
  ].join(`
`);
}
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const EMPTY_OBJ = {}, EMPTY_ARR = [], NOOP = () => {
}, NO = () => !1, isOn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), isModelListener = (e) => e.startsWith("onUpdate:"), extend = Object.assign, remove = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, hasOwnProperty$1 = Object.prototype.hasOwnProperty, hasOwn = (e, t) => hasOwnProperty$1.call(e, t), isArray$1 = Array.isArray, isMap = (e) => toTypeString(e) === "[object Map]", isSet = (e) => toTypeString(e) === "[object Set]", isDate = (e) => toTypeString(e) === "[object Date]", isRegExp = (e) => toTypeString(e) === "[object RegExp]", isFunction = (e) => typeof e == "function", isString = (e) => typeof e == "string", isSymbol = (e) => typeof e == "symbol", isObject = (e) => e !== null && typeof e == "object", isPromise = (e) => (isObject(e) || isFunction(e)) && isFunction(e.then) && isFunction(e.catch), objectToString = Object.prototype.toString, toTypeString = (e) => objectToString.call(e), toRawType = (e) => toTypeString(e).slice(8, -1), isPlainObject = (e) => toTypeString(e) === "[object Object]", isIntegerKey = (e) => isString(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), cacheStringFunction = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, camelizeRE = /-(\w)/g, camelize = cacheStringFunction(
  (e) => e.replace(camelizeRE, (t, n) => n ? n.toUpperCase() : "")
), hyphenateRE = /\B([A-Z])/g, hyphenate = cacheStringFunction(
  (e) => e.replace(hyphenateRE, "-$1").toLowerCase()
), capitalize = cacheStringFunction((e) => e.charAt(0).toUpperCase() + e.slice(1)), toHandlerKey = cacheStringFunction(
  (e) => e ? `on${capitalize(e)}` : ""
), hasChanged = (e, t) => !Object.is(e, t), invokeArrayFns = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, def = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, looseToNumber = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, toNumber = (e) => {
  const t = isString(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let _globalThis;
const getGlobalThis = () => _globalThis || (_globalThis = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function genCacheKey(e, t) {
  return e + JSON.stringify(
    t,
    (n, r) => typeof r == "function" ? r.toString() : r
  );
}
const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol", isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
function normalizeStyle(e) {
  if (isArray$1(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = isString(r) ? parseStringStyle(r) : normalizeStyle(r);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (isString(e) || isObject(e))
    return e;
}
const listDelimiterRE = /;(?![^(]*\))/g, propertyDelimiterRE = /:([^]+)/, styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(e) {
  const t = {};
  return e.replace(styleCommentRE, "").split(listDelimiterRE).forEach((n) => {
    if (n) {
      const r = n.split(propertyDelimiterRE);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function stringifyStyle(e) {
  if (!e) return "";
  if (isString(e)) return e;
  let t = "";
  for (const n in e) {
    const r = e[n];
    if (isString(r) || typeof r == "number") {
      const s = n.startsWith("--") ? n : hyphenate(n);
      t += `${s}:${r};`;
    }
  }
  return t;
}
function normalizeClass(e) {
  let t = "";
  if (isString(e))
    t = e;
  else if (isArray$1(e))
    for (let n = 0; n < e.length; n++) {
      const r = normalizeClass(e[n]);
      r && (t += r + " ");
    }
  else if (isObject(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function normalizeProps(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !isString(t) && (e.class = normalizeClass(t)), n && (e.style = normalizeStyle(n)), e;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS), isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS), isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS), isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS), specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs), isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
);
function includeBooleanAttr(e) {
  return !!e || e === "";
}
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
  "accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"
), isKnownSvgAttr = /* @__PURE__ */ makeMap(
  "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan"
);
function isRenderableAttrValue(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
const cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function getEscapedCssVarName(e, t) {
  return e.replace(
    cssVarNameEscapeSymbolsRE,
    (n) => `\\${n}`
  );
}
function looseCompareArrays(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = looseEqual(e[r], t[r]);
  return n;
}
function looseEqual(e, t) {
  if (e === t) return !0;
  let n = isDate(e), r = isDate(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = isSymbol(e), r = isSymbol(t), n || r)
    return e === t;
  if (n = isArray$1(e), r = isArray$1(t), n || r)
    return n && r ? looseCompareArrays(e, t) : !1;
  if (n = isObject(e), r = isObject(t), n || r) {
    if (!n || !r)
      return !1;
    const s = Object.keys(e).length, i = Object.keys(t).length;
    if (s !== i)
      return !1;
    for (const o in e) {
      const a = e.hasOwnProperty(o), l = t.hasOwnProperty(o);
      if (a && !l || !a && l || !looseEqual(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function looseIndexOf(e, t) {
  return e.findIndex((n) => looseEqual(n, t));
}
const isRef$1 = (e) => !!(e && e.__v_isRef === !0), toDisplayString = (e) => isString(e) ? e : e == null ? "" : isArray$1(e) || isObject(e) && (e.toString === objectToString || !isFunction(e.toString)) ? isRef$1(e) ? toDisplayString(e.value) : JSON.stringify(e, replacer, 2) : String(e), replacer = (e, t) => isRef$1(t) ? replacer(e, t.value) : isMap(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, s], i) => (n[stringifySymbol(r, i) + " =>"] = s, n),
    {}
  )
} : isSet(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => stringifySymbol(n))
} : isSymbol(t) ? stringifySymbol(t) : isObject(t) && !isArray$1(t) && !isPlainObject(t) ? String(t) : t, stringifySymbol = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = activeEffectScope, !t && activeEffectScope && (this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = activeEffectScope;
      try {
        return activeEffectScope = this, t();
      } finally {
        activeEffectScope = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function effectScope(e) {
  return new EffectScope(e);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(e, t = !1) {
  activeEffectScope && activeEffectScope.cleanups.push(e);
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, activeEffectScope && activeEffectScope.active && activeEffectScope.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, pausedQueueEffects.has(this) && (pausedQueueEffects.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || batch(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, cleanupEffect(this), prepareDeps(this);
    const t = activeSub, n = shouldTrack;
    activeSub = this, shouldTrack = !0;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this), activeSub = t, shouldTrack = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        removeSub(t);
      this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? pausedQueueEffects.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    isDirty(this) && this.run();
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0, batchedSub, batchedComputed;
function batch(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = batchedComputed, batchedComputed = e;
    return;
  }
  e.next = batchedSub, batchedSub = e;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0)
    return;
  if (batchedComputed) {
    let t = batchedComputed;
    for (batchedComputed = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; batchedSub; ) {
    let t = batchedSub;
    for (batchedSub = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function prepareDeps(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function cleanupDeps(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), removeSub(r), removeDep(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  e.deps = t, e.depsTail = n;
}
function isDirty(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (refreshComputed(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function refreshComputed(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === globalVersion))
    return;
  e.globalVersion = globalVersion;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !isDirty(e)) {
    e.flags &= -3;
    return;
  }
  const n = activeSub, r = shouldTrack;
  activeSub = e, shouldTrack = !0;
  try {
    prepareDeps(e);
    const s = e.fn(e._value);
    (t.version === 0 || hasChanged(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    activeSub = n, shouldTrack = r, cleanupDeps(e), e.flags &= -3;
  }
}
function removeSub(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e;
  if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      removeSub(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function removeDep(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function effect(e, t) {
  e.effect instanceof ReactiveEffect && (e = e.effect.fn);
  const n = new ReactiveEffect(e);
  t && extend(n, t);
  try {
    n.run();
  } catch (s) {
    throw n.stop(), s;
  }
  const r = n.run.bind(n);
  return r.effect = n, r;
}
function stop(e) {
  e.effect.stop();
}
let shouldTrack = !0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack), shouldTrack = !1;
}
function resetTracking() {
  const e = trackStack.pop();
  shouldTrack = e === void 0 ? !0 : e;
}
function cleanupEffect(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = activeSub;
    activeSub = void 0;
    try {
      t();
    } finally {
      activeSub = n;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!activeSub || !shouldTrack || activeSub === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== activeSub)
      n = this.activeLink = new Link(activeSub, this), activeSub.deps ? (n.prevDep = activeSub.depsTail, activeSub.depsTail.nextDep = n, activeSub.depsTail = n) : activeSub.deps = activeSub.depsTail = n, addSub(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = activeSub.depsTail, n.nextDep = void 0, activeSub.depsTail.nextDep = n, activeSub.depsTail = n, activeSub.deps === n && (activeSub.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, globalVersion++, this.notify(t);
  }
  notify(t) {
    startBatch();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      endBatch();
    }
  }
}
function addSub(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        addSub(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap(), ITERATE_KEY = Symbol(
  ""
), MAP_KEY_ITERATE_KEY = Symbol(
  ""
), ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(e, t, n) {
  if (shouldTrack && activeSub) {
    let r = targetMap.get(e);
    r || targetMap.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || (r.set(n, s = new Dep()), s.map = r, s.key = n), s.track();
  }
}
function trigger(e, t, n, r, s, i) {
  const o = targetMap.get(e);
  if (!o) {
    globalVersion++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (startBatch(), t === "clear")
    o.forEach(a);
  else {
    const l = isArray$1(e), c = l && isIntegerKey(n);
    if (l && n === "length") {
      const f = Number(r);
      o.forEach((u, d) => {
        (d === "length" || d === ARRAY_ITERATE_KEY || !isSymbol(d) && d >= f) && a(u);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), c && a(o.get(ARRAY_ITERATE_KEY)), t) {
        case "add":
          l ? c && a(o.get("length")) : (a(o.get(ITERATE_KEY)), isMap(e) && a(o.get(MAP_KEY_ITERATE_KEY)));
          break;
        case "delete":
          l || (a(o.get(ITERATE_KEY)), isMap(e) && a(o.get(MAP_KEY_ITERATE_KEY)));
          break;
        case "set":
          isMap(e) && a(o.get(ITERATE_KEY));
          break;
      }
  }
  endBatch();
}
function getDepFromReactive(e, t) {
  const n = targetMap.get(e);
  return n && n.get(t);
}
function reactiveReadArray(e) {
  const t = toRaw(e);
  return t === e ? t : (track(t, "iterate", ARRAY_ITERATE_KEY), isShallow(e) ? t : t.map(toReactive));
}
function shallowReadArray(e) {
  return track(e = toRaw(e), "iterate", ARRAY_ITERATE_KEY), e;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...e) {
    return reactiveReadArray(this).concat(
      ...e.map((t) => isArray$1(t) ? reactiveReadArray(t) : t)
    );
  },
  entries() {
    return iterator(this, "entries", (e) => (e[1] = toReactive(e[1]), e));
  },
  every(e, t) {
    return apply(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return apply(this, "filter", e, t, (n) => n.map(toReactive), arguments);
  },
  find(e, t) {
    return apply(this, "find", e, t, toReactive, arguments);
  },
  findIndex(e, t) {
    return apply(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return apply(this, "findLast", e, t, toReactive, arguments);
  },
  findLastIndex(e, t) {
    return apply(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return apply(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return searchProxy(this, "includes", e);
  },
  indexOf(...e) {
    return searchProxy(this, "indexOf", e);
  },
  join(e) {
    return reactiveReadArray(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return searchProxy(this, "lastIndexOf", e);
  },
  map(e, t) {
    return apply(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...e) {
    return noTracking(this, "push", e);
  },
  reduce(e, ...t) {
    return reduce(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return reduce(this, "reduceRight", e, t);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return apply(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return noTracking(this, "splice", e);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(e) {
    return reactiveReadArray(this).toSorted(e);
  },
  toSpliced(...e) {
    return reactiveReadArray(this).toSpliced(...e);
  },
  unshift(...e) {
    return noTracking(this, "unshift", e);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(e, t, n) {
  const r = shallowReadArray(e), s = r[t]();
  return r !== e && !isShallow(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.value && (i.value = n(i.value)), i;
  }), s;
}
const arrayProto = Array.prototype;
function apply(e, t, n, r, s, i) {
  const o = shallowReadArray(e), a = o !== e && !isShallow(e), l = o[t];
  if (l !== arrayProto[t]) {
    const u = l.apply(e, i);
    return a ? toReactive(u) : u;
  }
  let c = n;
  o !== e && (a ? c = function(u, d) {
    return n.call(this, toReactive(u), d, e);
  } : n.length > 2 && (c = function(u, d) {
    return n.call(this, u, d, e);
  }));
  const f = l.call(o, c, r);
  return a && s ? s(f) : f;
}
function reduce(e, t, n, r) {
  const s = shallowReadArray(e);
  let i = n;
  return s !== e && (isShallow(e) ? n.length > 3 && (i = function(o, a, l) {
    return n.call(this, o, a, l, e);
  }) : i = function(o, a, l) {
    return n.call(this, o, toReactive(a), l, e);
  }), s[t](i, ...r);
}
function searchProxy(e, t, n) {
  const r = toRaw(e);
  track(r, "iterate", ARRAY_ITERATE_KEY);
  const s = r[t](...n);
  return (s === -1 || s === !1) && isProxy(n[0]) ? (n[0] = toRaw(n[0]), r[t](...n)) : s;
}
function noTracking(e, t, n = []) {
  pauseTracking(), startBatch();
  const r = toRaw(e)[t].apply(e, n);
  return endBatch(), resetTracking(), r;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap("__proto__,__v_isRef,__isVue"), builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(isSymbol)
);
function hasOwnProperty(e) {
  isSymbol(e) || (e = String(e));
  const t = toRaw(this);
  return track(t, "has", e), t.hasOwnProperty(e);
}
class BaseReactiveHandler {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (s ? i ? shallowReadonlyMap : readonlyMap : i ? shallowReactiveMap : reactiveMap).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = isArray$1(t);
    if (!s) {
      let l;
      if (o && (l = arrayInstrumentations[n]))
        return l;
      if (n === "hasOwnProperty")
        return hasOwnProperty;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(t) ? t : r
    );
    return (isSymbol(n) ? builtInSymbols.has(n) : isNonTrackableKeys(n)) || (s || track(t, "get", n), i) ? a : isRef(a) ? o && isIntegerKey(n) ? a : a.value : isObject(a) ? s ? readonly(a) : reactive(a) : a;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let i = t[n];
    if (!this._isShallow) {
      const l = isReadonly(i);
      if (!isShallow(r) && !isReadonly(r) && (i = toRaw(i), r = toRaw(r)), !isArray$1(t) && isRef(i) && !isRef(r))
        return l ? !1 : (i.value = r, !0);
    }
    const o = isArray$1(t) && isIntegerKey(n) ? Number(n) < t.length : hasOwn(t, n), a = Reflect.set(
      t,
      n,
      r,
      isRef(t) ? t : s
    );
    return t === toRaw(s) && (o ? hasChanged(r, i) && trigger(t, "set", n, r) : trigger(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = hasOwn(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && trigger(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!isSymbol(n) || !builtInSymbols.has(n)) && track(t, "has", n), r;
  }
  ownKeys(t) {
    return track(
      t,
      "iterate",
      isArray$1(t) ? "length" : ITERATE_KEY
    ), Reflect.ownKeys(t);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler(), readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(), shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(!0), shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(!0), toShallow = (e) => e, getProto = (e) => Reflect.getPrototypeOf(e);
function createIterableMethod(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, i = toRaw(s), o = isMap(i), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, c = s[e](...r), f = n ? toShallow : t ? toReadonly : toReactive;
    return !t && track(
      i,
      "iterate",
      l ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    ), {
      // iterator protocol
      next() {
        const { value: u, done: d } = c.next();
        return d ? { value: u, done: d } : {
          value: a ? [f(u[0]), f(u[1])] : f(u),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function createInstrumentations(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, o = toRaw(i), a = toRaw(s);
      e || (hasChanged(s, a) && track(o, "get", s), track(o, "get", a));
      const { has: l } = getProto(o), c = t ? toShallow : e ? toReadonly : toReactive;
      if (l.call(o, s))
        return c(i.get(s));
      if (l.call(o, a))
        return c(i.get(a));
      i !== o && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && track(toRaw(s), "iterate", ITERATE_KEY), Reflect.get(s, "size", s);
    },
    has(s) {
      const i = this.__v_raw, o = toRaw(i), a = toRaw(s);
      return e || (hasChanged(s, a) && track(o, "has", s), track(o, "has", a)), s === a ? i.has(s) : i.has(s) || i.has(a);
    },
    forEach(s, i) {
      const o = this, a = o.__v_raw, l = toRaw(a), c = t ? toShallow : e ? toReadonly : toReactive;
      return !e && track(l, "iterate", ITERATE_KEY), a.forEach((f, u) => s.call(i, c(f), c(u), o));
    }
  };
  return extend(
    n,
    e ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(s) {
        !t && !isShallow(s) && !isReadonly(s) && (s = toRaw(s));
        const i = toRaw(this);
        return getProto(i).has.call(i, s) || (i.add(s), trigger(i, "add", s, s)), this;
      },
      set(s, i) {
        !t && !isShallow(i) && !isReadonly(i) && (i = toRaw(i));
        const o = toRaw(this), { has: a, get: l } = getProto(o);
        let c = a.call(o, s);
        c || (s = toRaw(s), c = a.call(o, s));
        const f = l.call(o, s);
        return o.set(s, i), c ? hasChanged(i, f) && trigger(o, "set", s, i) : trigger(o, "add", s, i), this;
      },
      delete(s) {
        const i = toRaw(this), { has: o, get: a } = getProto(i);
        let l = o.call(i, s);
        l || (s = toRaw(s), l = o.call(i, s)), a && a.call(i, s);
        const c = i.delete(s);
        return l && trigger(i, "delete", s, void 0), c;
      },
      clear() {
        const s = toRaw(this), i = s.size !== 0, o = s.clear();
        return i && trigger(
          s,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = createIterableMethod(s, e, t);
  }), n;
}
function createInstrumentationGetter(e, t) {
  const n = createInstrumentations(e, t);
  return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    hasOwn(n, s) && s in r ? n : r,
    s,
    i
  );
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(!1, !1)
}, shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(!1, !0)
}, readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(!0, !1)
}, shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(!0, !0)
}, reactiveMap = /* @__PURE__ */ new WeakMap(), shallowReactiveMap = /* @__PURE__ */ new WeakMap(), readonlyMap = /* @__PURE__ */ new WeakMap(), shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : targetTypeMap(toRawType(e));
}
function reactive(e) {
  return isReadonly(e) ? e : createReactiveObject(
    e,
    !1,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(e) {
  return createReactiveObject(
    e,
    !1,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(e) {
  return createReactiveObject(
    e,
    !0,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(e) {
  return createReactiveObject(
    e,
    !0,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(e, t, n, r, s) {
  if (!isObject(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const o = getTargetType(e);
  if (o === 0)
    return e;
  const a = new Proxy(
    e,
    o === 2 ? r : n
  );
  return s.set(e, a), a;
}
function isReactive(e) {
  return isReadonly(e) ? isReactive(e.__v_raw) : !!(e && e.__v_isReactive);
}
function isReadonly(e) {
  return !!(e && e.__v_isReadonly);
}
function isShallow(e) {
  return !!(e && e.__v_isShallow);
}
function isProxy(e) {
  return e ? !!e.__v_raw : !1;
}
function toRaw(e) {
  const t = e && e.__v_raw;
  return t ? toRaw(t) : e;
}
function markRaw(e) {
  return !hasOwn(e, "__v_skip") && Object.isExtensible(e) && def(e, "__v_skip", !0), e;
}
const toReactive = (e) => isObject(e) ? reactive(e) : e, toReadonly = (e) => isObject(e) ? readonly(e) : e;
function isRef(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ref(e) {
  return createRef(e, !1);
}
function shallowRef(e) {
  return createRef(e, !0);
}
function createRef(e, t) {
  return isRef(e) ? e : new RefImpl(e, t);
}
class RefImpl {
  constructor(t, n) {
    this.dep = new Dep(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : toRaw(t), this._value = n ? t : toReactive(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || isShallow(t) || isReadonly(t);
    t = r ? t : toRaw(t), hasChanged(t, n) && (this._rawValue = t, this._value = r ? t : toReactive(t), this.dep.trigger());
  }
}
function triggerRef(e) {
  e.dep && e.dep.trigger();
}
function unref(e) {
  return isRef(e) ? e.value : e;
}
function toValue(e) {
  return isFunction(e) ? e() : unref(e);
}
const shallowUnwrapHandlers = {
  get: (e, t, n) => t === "__v_raw" ? e : unref(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return isRef(s) && !isRef(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function proxyRefs(e) {
  return isReactive(e) ? e : new Proxy(e, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new Dep(), { get: r, set: s } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = r, this._set = s;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function customRef(e) {
  return new CustomRefImpl(e);
}
function toRefs(e) {
  const t = isArray$1(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = propertyToRef(e, n);
  return t;
}
class ObjectRefImpl {
  constructor(t, n, r) {
    this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function toRef(e, t, n) {
  return isRef(e) ? e : isFunction(e) ? new GetterRefImpl(e) : isObject(e) && arguments.length > 1 ? propertyToRef(e, t, n) : ref(e);
}
function propertyToRef(e, t, n) {
  const r = e[t];
  return isRef(r) ? r : new ObjectRefImpl(e, t, n);
}
class ComputedRefImpl {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = globalVersion - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this)
      return batch(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return refreshComputed(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function computed$1(e, t, n = !1) {
  let r, s;
  return isFunction(e) ? r = e : (r = e.get, s = e.set), new ComputedRefImpl(r, s, n);
}
const TrackOpTypes = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate"
}, TriggerOpTypes = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
  CLEAR: "clear"
}, INITIAL_WATCHER_VALUE = {}, cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher;
function getCurrentWatcher() {
  return activeWatcher;
}
function onWatcherCleanup(e, t = !1, n = activeWatcher) {
  if (n) {
    let r = cleanupMap.get(n);
    r || cleanupMap.set(n, r = []), r.push(e);
  }
}
function watch$1(e, t, n = EMPTY_OBJ) {
  const { immediate: r, deep: s, once: i, scheduler: o, augmentJob: a, call: l } = n, c = (_) => s ? _ : isShallow(_) || s === !1 || s === 0 ? traverse(_, 1) : traverse(_);
  let f, u, d, m, v = !1, S = !1;
  if (isRef(e) ? (u = () => e.value, v = isShallow(e)) : isReactive(e) ? (u = () => c(e), v = !0) : isArray$1(e) ? (S = !0, v = e.some((_) => isReactive(_) || isShallow(_)), u = () => e.map((_) => {
    if (isRef(_))
      return _.value;
    if (isReactive(_))
      return c(_);
    if (isFunction(_))
      return l ? l(_, 2) : _();
  })) : isFunction(e) ? t ? u = l ? () => l(e, 2) : e : u = () => {
    if (d) {
      pauseTracking();
      try {
        d();
      } finally {
        resetTracking();
      }
    }
    const _ = activeWatcher;
    activeWatcher = f;
    try {
      return l ? l(e, 3, [m]) : e(m);
    } finally {
      activeWatcher = _;
    }
  } : u = NOOP, t && s) {
    const _ = u, b = s === !0 ? 1 / 0 : s;
    u = () => traverse(_(), b);
  }
  const I = getCurrentScope(), A = () => {
    f.stop(), I && I.active && remove(I.effects, f);
  };
  if (i && t) {
    const _ = t;
    t = (...b) => {
      _(...b), A();
    };
  }
  let T = S ? new Array(e.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const y = (_) => {
    if (!(!(f.flags & 1) || !f.dirty && !_))
      if (t) {
        const b = f.run();
        if (s || v || (S ? b.some((x, D) => hasChanged(x, T[D])) : hasChanged(b, T))) {
          d && d();
          const x = activeWatcher;
          activeWatcher = f;
          try {
            const D = [
              b,
              // pass undefined as the old value when it's changed for the first time
              T === INITIAL_WATCHER_VALUE ? void 0 : S && T[0] === INITIAL_WATCHER_VALUE ? [] : T,
              m
            ];
            l ? l(t, 3, D) : (
              // @ts-expect-error
              t(...D)
            ), T = b;
          } finally {
            activeWatcher = x;
          }
        }
      } else
        f.run();
  };
  return a && a(y), f = new ReactiveEffect(u), f.scheduler = o ? () => o(y, !1) : y, m = (_) => onWatcherCleanup(_, !1, f), d = f.onStop = () => {
    const _ = cleanupMap.get(f);
    if (_) {
      if (l)
        l(_, 4);
      else
        for (const b of _) b();
      cleanupMap.delete(f);
    }
  }, t ? r ? y(!0) : T = f.run() : o ? o(y.bind(null, !0), !0) : f.run(), A.pause = f.pause.bind(f), A.resume = f.resume.bind(f), A.stop = A, A;
}
function traverse(e, t = 1 / 0, n) {
  if (t <= 0 || !isObject(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, isRef(e))
    traverse(e.value, t, n);
  else if (isArray$1(e))
    for (let r = 0; r < e.length; r++)
      traverse(e[r], t, n);
  else if (isSet(e) || isMap(e))
    e.forEach((r) => {
      traverse(r, t, n);
    });
  else if (isPlainObject(e)) {
    for (const r in e)
      traverse(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && traverse(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack$1 = [];
function pushWarningContext(e) {
  stack$1.push(e);
}
function popWarningContext() {
  stack$1.pop();
}
let isWarning = !1;
function warn$1(e, ...t) {
  if (isWarning) return;
  isWarning = !0, pauseTracking();
  const n = stack$1.length ? stack$1[stack$1.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = getComponentTrace();
  if (r)
    callWithErrorHandling(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((i) => {
          var o, a;
          return (a = (o = i.toString) == null ? void 0 : o.call(i)) != null ? a : JSON.stringify(i);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: i }) => `at <${formatComponentName(n, i.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    s.length && i.push(`
`, ...formatTrace(s)), console.warn(...i);
  }
  resetTracking(), isWarning = !1;
}
function getComponentTrace() {
  let e = stack$1[stack$1.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function formatTrace(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...formatTraceEntry(n));
  }), t;
}
function formatTraceEntry({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${formatComponentName(
    e.component,
    e.type,
    r
  )}`, i = ">" + n;
  return e.props ? [s, ...formatProps(e.props), i] : [s + i];
}
function formatProps(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...formatProp(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function formatProp(e, t, n) {
  return isString(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : isRef(t) ? (t = formatProp(e, toRaw(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : isFunction(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = toRaw(t), n ? t : [`${e}=`, t]);
}
function assertNumber(e, t) {
}
const ErrorCodes = {
  SETUP_FUNCTION: 0,
  0: "SETUP_FUNCTION",
  RENDER_FUNCTION: 1,
  1: "RENDER_FUNCTION",
  NATIVE_EVENT_HANDLER: 5,
  5: "NATIVE_EVENT_HANDLER",
  COMPONENT_EVENT_HANDLER: 6,
  6: "COMPONENT_EVENT_HANDLER",
  VNODE_HOOK: 7,
  7: "VNODE_HOOK",
  DIRECTIVE_HOOK: 8,
  8: "DIRECTIVE_HOOK",
  TRANSITION_HOOK: 9,
  9: "TRANSITION_HOOK",
  APP_ERROR_HANDLER: 10,
  10: "APP_ERROR_HANDLER",
  APP_WARN_HANDLER: 11,
  11: "APP_WARN_HANDLER",
  FUNCTION_REF: 12,
  12: "FUNCTION_REF",
  ASYNC_COMPONENT_LOADER: 13,
  13: "ASYNC_COMPONENT_LOADER",
  SCHEDULER: 14,
  14: "SCHEDULER",
  COMPONENT_UPDATE: 15,
  15: "COMPONENT_UPDATE",
  APP_UNMOUNT_CLEANUP: 16,
  16: "APP_UNMOUNT_CLEANUP"
}, ErrorTypeStrings$1 = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function callWithErrorHandling(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    handleError(s, t, n);
  }
}
function callWithAsyncErrorHandling(e, t, n, r) {
  if (isFunction(e)) {
    const s = callWithErrorHandling(e, t, n, r);
    return s && isPromise(s) && s.catch((i) => {
      handleError(i, t, n);
    }), s;
  }
  if (isArray$1(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(callWithAsyncErrorHandling(e[i], t, n, r));
    return s;
  }
}
function handleError(e, t, n, r = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || EMPTY_OBJ;
  if (t) {
    let a = t.parent;
    const l = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const f = a.ec;
      if (f) {
        for (let u = 0; u < f.length; u++)
          if (f[u](e, l, c) === !1)
            return;
      }
      a = a.parent;
    }
    if (i) {
      pauseTracking(), callWithErrorHandling(i, null, 10, [
        e,
        l,
        c
      ]), resetTracking();
      return;
    }
  }
  logError(e, n, s, r, o);
}
function logError(e, t, n, r = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null, postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(e) {
  const t = currentFlushPromise || resolvedPromise;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function findInsertionIndex$1(e) {
  let t = flushIndex + 1, n = queue.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = queue[r], i = getId(s);
    i < e || i === e && s.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function queueJob(e) {
  if (!(e.flags & 1)) {
    const t = getId(e), n = queue[queue.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= getId(n) ? queue.push(e) : queue.splice(findInsertionIndex$1(t), 0, e), e.flags |= 1, queueFlush();
  }
}
function queueFlush() {
  currentFlushPromise || (currentFlushPromise = resolvedPromise.then(flushJobs));
}
function queuePostFlushCb(e) {
  isArray$1(e) ? pendingPostFlushCbs.push(...e) : activePostFlushCbs && e.id === -1 ? activePostFlushCbs.splice(postFlushIndex + 1, 0, e) : e.flags & 1 || (pendingPostFlushCbs.push(e), e.flags |= 1), queueFlush();
}
function flushPreFlushCbs(e, t, n = flushIndex + 1) {
  for (; n < queue.length; n++) {
    const r = queue[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      queue.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function flushPostFlushCbs(e) {
  if (pendingPostFlushCbs.length) {
    const t = [...new Set(pendingPostFlushCbs)].sort(
      (n, r) => getId(n) - getId(r)
    );
    if (pendingPostFlushCbs.length = 0, activePostFlushCbs) {
      activePostFlushCbs.push(...t);
      return;
    }
    for (activePostFlushCbs = t, postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const n = activePostFlushCbs[postFlushIndex];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    activePostFlushCbs = null, postFlushIndex = 0;
  }
}
const getId = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function flushJobs(e) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const t = queue[flushIndex];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), callWithErrorHandling(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const t = queue[flushIndex];
      t && (t.flags &= -2);
    }
    flushIndex = -1, queue.length = 0, flushPostFlushCbs(), currentFlushPromise = null, (queue.length || pendingPostFlushCbs.length) && flushJobs();
  }
}
let devtools$1, buffer = [], devtoolsNotInstalled = !1;
function emit$1(e, ...t) {
  devtools$1 ? devtools$1.emit(e, ...t) : devtoolsNotInstalled || buffer.push({ event: e, args: t });
}
function setDevtoolsHook$1(e, t) {
  var n, r;
  devtools$1 = e, devtools$1 ? (devtools$1.enabled = !0, buffer.forEach(({ event: s, args: i }) => devtools$1.emit(s, ...i)), buffer = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
    setDevtoolsHook$1(i, t);
  }), setTimeout(() => {
    devtools$1 || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, devtoolsNotInstalled = !0, buffer = []);
  }, 3e3)) : (devtoolsNotInstalled = !0, buffer = []);
}
function devtoolsInitApp(e, t) {
  emit$1("app:init", e, t, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(e) {
  emit$1("app:unmount", e);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
), devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
), _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
), devtoolsComponentRemoved = (e) => {
  devtools$1 && typeof devtools$1.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(e) && _devtoolsComponentRemoved(e);
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(e) {
  return (t) => {
    emit$1(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
function devtoolsComponentEmit(e, t, n) {
  emit$1(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let currentRenderingInstance = null, currentScopeId = null;
function setCurrentRenderingInstance(e) {
  const t = currentRenderingInstance;
  return currentRenderingInstance = e, currentScopeId = e && e.type.__scopeId || null, t;
}
function pushScopeId(e) {
  currentScopeId = e;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (e) => withCtx;
function withCtx(e, t = currentRenderingInstance, n) {
  if (!t || e._n)
    return e;
  const r = (...s) => {
    r._d && setBlockTracking(-1);
    const i = setCurrentRenderingInstance(t);
    let o;
    try {
      o = e(...s);
    } finally {
      setCurrentRenderingInstance(i), r._d && setBlockTracking(1);
    }
    return __VUE_PROD_DEVTOOLS__ && devtoolsComponentUpdated(t), o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function withDirectives(e, t) {
  if (currentRenderingInstance === null)
    return e;
  const n = getComponentPublicInstance(currentRenderingInstance), r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, o, a, l = EMPTY_OBJ] = t[s];
    i && (isFunction(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && traverse(o), r.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }));
  }
  return e;
}
function invokeDirectiveHook(e, t, n, r) {
  const s = e.dirs, i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    i && (a.oldValue = i[o].value);
    let l = a.dir[r];
    l && (pauseTracking(), callWithAsyncErrorHandling(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), resetTracking());
  }
}
const TeleportEndKey = Symbol("_vte"), isTeleport = (e) => e.__isTeleport, isTeleportDisabled = (e) => e && (e.disabled || e.disabled === ""), isTeleportDeferred = (e) => e && (e.defer || e.defer === ""), isTargetSVG = (e) => typeof SVGElement < "u" && e instanceof SVGElement, isTargetMathML = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, resolveTarget = (e, t) => {
  const n = e && e.to;
  return isString(n) ? t ? t(n) : null : n;
}, TeleportImpl = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, r, s, i, o, a, l, c) {
    const {
      mc: f,
      pc: u,
      pbc: d,
      o: { insert: m, querySelector: v, createText: S, createComment: I }
    } = c, A = isTeleportDisabled(t.props);
    let { shapeFlag: T, children: y, dynamicChildren: _ } = t;
    if (e == null) {
      const b = t.el = S(""), x = t.anchor = S("");
      m(b, n, r), m(x, n, r);
      const D = (R, O) => {
        T & 16 && (s && s.isCE && (s.ce._teleportTarget = R), f(
          y,
          R,
          O,
          s,
          i,
          o,
          a,
          l
        ));
      }, M = () => {
        const R = t.target = resolveTarget(t.props, v), O = prepareAnchor(R, t, S, m);
        R && (o !== "svg" && isTargetSVG(R) ? o = "svg" : o !== "mathml" && isTargetMathML(R) && (o = "mathml"), A || (D(R, O), updateCssVars(t, !1)));
      };
      A && (D(n, x), updateCssVars(t, !0)), isTeleportDeferred(t.props) ? queuePostRenderEffect(() => {
        M(), t.el.__isMounted = !0;
      }, i) : M();
    } else {
      if (isTeleportDeferred(t.props) && !e.el.__isMounted) {
        queuePostRenderEffect(() => {
          TeleportImpl.process(
            e,
            t,
            n,
            r,
            s,
            i,
            o,
            a,
            l,
            c
          ), delete e.el.__isMounted;
        }, i);
        return;
      }
      t.el = e.el, t.targetStart = e.targetStart;
      const b = t.anchor = e.anchor, x = t.target = e.target, D = t.targetAnchor = e.targetAnchor, M = isTeleportDisabled(e.props), R = M ? n : x, O = M ? b : D;
      if (o === "svg" || isTargetSVG(x) ? o = "svg" : (o === "mathml" || isTargetMathML(x)) && (o = "mathml"), _ ? (d(
        e.dynamicChildren,
        _,
        R,
        s,
        i,
        o,
        a
      ), traverseStaticChildren(e, t, !0)) : l || u(
        e,
        t,
        R,
        O,
        s,
        i,
        o,
        a,
        !1
      ), A)
        M ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : moveTeleport(
          t,
          n,
          b,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const H = t.target = resolveTarget(
          t.props,
          v
        );
        H && moveTeleport(
          t,
          H,
          null,
          c,
          0
        );
      } else M && moveTeleport(
        t,
        x,
        D,
        c,
        1
      );
      updateCssVars(t, A);
    }
  },
  remove(e, t, n, { um: r, o: { remove: s } }, i) {
    const {
      shapeFlag: o,
      children: a,
      anchor: l,
      targetStart: c,
      targetAnchor: f,
      target: u,
      props: d
    } = e;
    if (u && (s(c), s(f)), i && s(l), o & 16) {
      const m = i || !isTeleportDisabled(d);
      for (let v = 0; v < a.length; v++) {
        const S = a[v];
        r(
          S,
          t,
          n,
          m,
          !!S.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(e, t, n, { o: { insert: r }, m: s }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: o, anchor: a, shapeFlag: l, children: c, props: f } = e, u = i === 2;
  if (u && r(o, t, n), (!u || isTeleportDisabled(f)) && l & 16)
    for (let d = 0; d < c.length; d++)
      s(
        c[d],
        t,
        n,
        2
      );
  u && r(a, t, n);
}
function hydrateTeleport(e, t, n, r, s, i, {
  o: { nextSibling: o, parentNode: a, querySelector: l, insert: c, createText: f }
}, u) {
  const d = t.target = resolveTarget(
    t.props,
    l
  );
  if (d) {
    const m = isTeleportDisabled(t.props), v = d._lpa || d.firstChild;
    if (t.shapeFlag & 16)
      if (m)
        t.anchor = u(
          o(e),
          t,
          a(e),
          n,
          r,
          s,
          i
        ), t.targetStart = v, t.targetAnchor = v && o(v);
      else {
        t.anchor = o(e);
        let S = v;
        for (; S; ) {
          if (S && S.nodeType === 8) {
            if (S.data === "teleport start anchor")
              t.targetStart = S;
            else if (S.data === "teleport anchor") {
              t.targetAnchor = S, d._lpa = t.targetAnchor && o(t.targetAnchor);
              break;
            }
          }
          S = o(S);
        }
        t.targetAnchor || prepareAnchor(d, t, f, c), u(
          v && o(v),
          t,
          d,
          n,
          r,
          s,
          i
        );
      }
    updateCssVars(t, m);
  }
  return t.anchor && o(t.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let r, s;
    for (t ? (r = e.el, s = e.anchor) : (r = e.targetStart, s = e.targetAnchor); r && r !== s; )
      r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
    n.ut();
  }
}
function prepareAnchor(e, t, n, r) {
  const s = t.targetStart = n(""), i = t.targetAnchor = n("");
  return s[TeleportEndKey] = i, e && (r(s, e), r(i, e)), i;
}
const leaveCbKey = Symbol("_leaveCb"), enterCbKey$1 = Symbol("_enterCb");
function useTransitionState() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return onMounted(() => {
    e.isMounted = !0;
  }), onBeforeUnmount(() => {
    e.isUnmounting = !0;
  }), e;
}
const TransitionHookValidator = [Function, Array], BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
}, recursiveGetSubtree = (e) => {
  const t = e.subTree;
  return t.component ? recursiveGetSubtree(t.component) : t;
}, BaseTransitionImpl = {
  name: "BaseTransition",
  props: BaseTransitionPropsValidators,
  setup(e, { slots: t }) {
    const n = getCurrentInstance(), r = useTransitionState();
    return () => {
      const s = t.default && getTransitionRawChildren(t.default(), !0);
      if (!s || !s.length)
        return;
      const i = findNonCommentChild(s), o = toRaw(e), { mode: a } = o;
      if (r.isLeaving)
        return emptyPlaceholder(i);
      const l = getInnerChild$1(i);
      if (!l)
        return emptyPlaceholder(i);
      let c = resolveTransitionHooks(
        l,
        o,
        r,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (u) => c = u
      );
      l.type !== Comment && setTransitionHooks(l, c);
      let f = n.subTree && getInnerChild$1(n.subTree);
      if (f && f.type !== Comment && !isSameVNodeType(l, f) && recursiveGetSubtree(n).type !== Comment) {
        let u = resolveTransitionHooks(
          f,
          o,
          r,
          n
        );
        if (setTransitionHooks(f, u), a === "out-in" && l.type !== Comment)
          return r.isLeaving = !0, u.afterLeave = () => {
            r.isLeaving = !1, n.job.flags & 8 || n.update(), delete u.afterLeave, f = void 0;
          }, emptyPlaceholder(i);
        a === "in-out" && l.type !== Comment ? u.delayLeave = (d, m, v) => {
          const S = getLeavingNodesForType(
            r,
            f
          );
          S[String(f.key)] = f, d[leaveCbKey] = () => {
            m(), d[leaveCbKey] = void 0, delete c.delayedLeave, f = void 0;
          }, c.delayedLeave = () => {
            v(), delete c.delayedLeave, f = void 0;
          };
        } : f = void 0;
      } else f && (f = void 0);
      return i;
    };
  }
};
function findNonCommentChild(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Comment) {
        t = n;
        break;
      }
  }
  return t;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function resolveTransitionHooks(e, t, n, r, s) {
  const {
    appear: i,
    mode: o,
    persisted: a = !1,
    onBeforeEnter: l,
    onEnter: c,
    onAfterEnter: f,
    onEnterCancelled: u,
    onBeforeLeave: d,
    onLeave: m,
    onAfterLeave: v,
    onLeaveCancelled: S,
    onBeforeAppear: I,
    onAppear: A,
    onAfterAppear: T,
    onAppearCancelled: y
  } = t, _ = String(e.key), b = getLeavingNodesForType(n, e), x = (R, O) => {
    R && callWithAsyncErrorHandling(
      R,
      r,
      9,
      O
    );
  }, D = (R, O) => {
    const H = O[1];
    x(R, O), isArray$1(R) ? R.every((N) => N.length <= 1) && H() : R.length <= 1 && H();
  }, M = {
    mode: o,
    persisted: a,
    beforeEnter(R) {
      let O = l;
      if (!n.isMounted)
        if (i)
          O = I || l;
        else
          return;
      R[leaveCbKey] && R[leaveCbKey](
        !0
        /* cancelled */
      );
      const H = b[_];
      H && isSameVNodeType(e, H) && H.el[leaveCbKey] && H.el[leaveCbKey](), x(O, [R]);
    },
    enter(R) {
      let O = c, H = f, N = u;
      if (!n.isMounted)
        if (i)
          O = A || c, H = T || f, N = y || u;
        else
          return;
      let F = !1;
      const G = R[enterCbKey$1] = (J) => {
        F || (F = !0, J ? x(N, [R]) : x(H, [R]), M.delayedLeave && M.delayedLeave(), R[enterCbKey$1] = void 0);
      };
      O ? D(O, [R, G]) : G();
    },
    leave(R, O) {
      const H = String(e.key);
      if (R[enterCbKey$1] && R[enterCbKey$1](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return O();
      x(d, [R]);
      let N = !1;
      const F = R[leaveCbKey] = (G) => {
        N || (N = !0, O(), G ? x(S, [R]) : x(v, [R]), R[leaveCbKey] = void 0, b[H] === e && delete b[H]);
      };
      b[H] = e, m ? D(m, [R, F]) : F();
    },
    clone(R) {
      const O = resolveTransitionHooks(
        R,
        t,
        n,
        r,
        s
      );
      return s && s(O), O;
    }
  };
  return M;
}
function emptyPlaceholder(e) {
  if (isKeepAlive(e))
    return e = cloneVNode(e), e.children = null, e;
}
function getInnerChild$1(e) {
  if (!isKeepAlive(e))
    return isTeleport(e.type) && e.children ? findNonCommentChild(e.children) : e;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && isFunction(n.default))
      return n.default();
  }
}
function setTransitionHooks(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, setTransitionHooks(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function getTransitionRawChildren(e, t = !1, n) {
  let r = [], s = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === Fragment ? (o.patchFlag & 128 && s++, r = r.concat(
      getTransitionRawChildren(o.children, t, a)
    )) : (t || o.type !== Comment) && r.push(a != null ? cloneVNode(o, { key: a }) : o);
  }
  if (s > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(e, t) {
  return isFunction(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    extend({ name: e.name }, t, { setup: e })
  ) : e;
}
function useId() {
  const e = getCurrentInstance();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function markAsyncBoundary(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function useTemplateRef(e) {
  const t = getCurrentInstance(), n = shallowRef(null);
  if (t) {
    const s = t.refs === EMPTY_OBJ ? t.refs = {} : t.refs;
    Object.defineProperty(s, e, {
      enumerable: !0,
      get: () => n.value,
      set: (i) => n.value = i
    });
  }
  return n;
}
function setRef(e, t, n, r, s = !1) {
  if (isArray$1(e)) {
    e.forEach(
      (v, S) => setRef(
        v,
        t && (isArray$1(t) ? t[S] : t),
        n,
        r,
        s
      )
    );
    return;
  }
  if (isAsyncWrapper(r) && !s) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && setRef(e, t, n, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? getComponentPublicInstance(r.component) : r.el, o = s ? null : i, { i: a, r: l } = e, c = t && t.r, f = a.refs === EMPTY_OBJ ? a.refs = {} : a.refs, u = a.setupState, d = toRaw(u), m = u === EMPTY_OBJ ? () => !1 : (v) => hasOwn(d, v);
  if (c != null && c !== l && (isString(c) ? (f[c] = null, m(c) && (u[c] = null)) : isRef(c) && (c.value = null)), isFunction(l))
    callWithErrorHandling(l, a, 12, [o, f]);
  else {
    const v = isString(l), S = isRef(l);
    if (v || S) {
      const I = () => {
        if (e.f) {
          const A = v ? m(l) ? u[l] : f[l] : l.value;
          s ? isArray$1(A) && remove(A, i) : isArray$1(A) ? A.includes(i) || A.push(i) : v ? (f[l] = [i], m(l) && (u[l] = f[l])) : (l.value = [i], e.k && (f[e.k] = l.value));
        } else v ? (f[l] = o, m(l) && (u[l] = o)) : S && (l.value = o, e.k && (f[e.k] = o));
      };
      o ? (I.id = -1, queuePostRenderEffect(I, n)) : I();
    }
  }
}
let hasLoggedMismatchError = !1;
const logMismatchError = () => {
  hasLoggedMismatchError || (console.error("Hydration completed but contains mismatches."), hasLoggedMismatchError = !0);
}, isSVGContainer = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", isMathMLContainer = (e) => e.namespaceURI.includes("MathML"), getContainerType = (e) => {
  if (e.nodeType === 1) {
    if (isSVGContainer(e)) return "svg";
    if (isMathMLContainer(e)) return "mathml";
  }
}, isComment = (e) => e.nodeType === 8;
function createHydrationFunctions(e) {
  const {
    mt: t,
    p: n,
    o: {
      patchProp: r,
      createText: s,
      nextSibling: i,
      parentNode: o,
      remove: a,
      insert: l,
      createComment: c
    }
  } = e, f = (y, _) => {
    if (!_.hasChildNodes()) {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && warn$1(
        "Attempting to hydrate existing markup but container is empty. Performing full mount instead."
      ), n(null, y, _), flushPostFlushCbs(), _._vnode = y;
      return;
    }
    u(_.firstChild, y, null, null, null), flushPostFlushCbs(), _._vnode = y;
  }, u = (y, _, b, x, D, M = !1) => {
    M = M || !!_.dynamicChildren;
    const R = isComment(y) && y.data === "[", O = () => S(
      y,
      _,
      b,
      x,
      D,
      R
    ), { type: H, ref: N, shapeFlag: F, patchFlag: G } = _;
    let J = y.nodeType;
    _.el = y, __VUE_PROD_DEVTOOLS__ && (def(y, "__vnode", _, !0), def(y, "__vueParentComponent", b, !0)), G === -2 && (M = !1, _.dynamicChildren = null);
    let K = null;
    switch (H) {
      case Text:
        J !== 3 ? _.children === "" ? (l(_.el = s(""), o(y), y), K = y) : K = O() : (y.data !== _.children && (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && warn$1(
          "Hydration text mismatch in",
          y.parentNode,
          `
  - rendered on server: ${JSON.stringify(
            y.data
          )}
  - expected on client: ${JSON.stringify(_.children)}`
        ), logMismatchError(), y.data = _.children), K = i(y));
        break;
      case Comment:
        T(y) ? (K = i(y), A(
          _.el = y.content.firstChild,
          y,
          b
        )) : J !== 8 || R ? K = O() : K = i(y);
        break;
      case Static:
        if (R && (y = i(y), J = y.nodeType), J === 1 || J === 3) {
          K = y;
          const X = !_.children.length;
          for (let z = 0; z < _.staticCount; z++)
            X && (_.children += K.nodeType === 1 ? K.outerHTML : K.data), z === _.staticCount - 1 && (_.anchor = K), K = i(K);
          return R ? i(K) : K;
        } else
          O();
        break;
      case Fragment:
        R ? K = v(
          y,
          _,
          b,
          x,
          D,
          M
        ) : K = O();
        break;
      default:
        if (F & 1)
          (J !== 1 || _.type.toLowerCase() !== y.tagName.toLowerCase()) && !T(y) ? K = O() : K = d(
            y,
            _,
            b,
            x,
            D,
            M
          );
        else if (F & 6) {
          _.slotScopeIds = D;
          const X = o(y);
          if (R ? K = I(y) : isComment(y) && y.data === "teleport start" ? K = I(y, y.data, "teleport end") : K = i(y), t(
            _,
            X,
            null,
            b,
            x,
            getContainerType(X),
            M
          ), isAsyncWrapper(_) && !_.type.__asyncResolved) {
            let z;
            R ? (z = createVNode(Fragment), z.anchor = K ? K.previousSibling : X.lastChild) : z = y.nodeType === 3 ? createTextVNode("") : createVNode("div"), z.el = y, _.component.subTree = z;
          }
        } else F & 64 ? J !== 8 ? K = O() : K = _.type.hydrate(
          y,
          _,
          b,
          x,
          D,
          M,
          e,
          m
        ) : F & 128 ? K = _.type.hydrate(
          y,
          _,
          b,
          x,
          getContainerType(o(y)),
          D,
          M,
          e,
          u
        ) : __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && warn$1("Invalid HostVNode type:", H, `(${typeof H})`);
    }
    return N != null && setRef(N, null, x, _), K;
  }, d = (y, _, b, x, D, M) => {
    M = M || !!_.dynamicChildren;
    const { type: R, props: O, patchFlag: H, shapeFlag: N, dirs: F, transition: G } = _, J = R === "input" || R === "option";
    if (J || H !== -1) {
      F && invokeDirectiveHook(_, null, b, "created");
      let K = !1;
      if (T(y)) {
        K = needTransition(
          null,
          // no need check parentSuspense in hydration
          G
        ) && b && b.vnode.props && b.vnode.props.appear;
        const z = y.content.firstChild;
        K && G.beforeEnter(z), A(z, y, b), _.el = y = z;
      }
      if (N & 16 && // skip if element has innerHTML / textContent
      !(O && (O.innerHTML || O.textContent))) {
        let z = m(
          y.firstChild,
          _,
          y,
          b,
          x,
          D,
          M
        ), ie = !1;
        for (; z; ) {
          isMismatchAllowed(
            y,
            1
            /* CHILDREN */
          ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && !ie && (warn$1(
            "Hydration children mismatch on",
            y,
            `
Server rendered element contains more child nodes than client vdom.`
          ), ie = !0), logMismatchError());
          const ae = z;
          z = z.nextSibling, a(ae);
        }
      } else if (N & 8) {
        let z = _.children;
        z[0] === `
` && (y.tagName === "PRE" || y.tagName === "TEXTAREA") && (z = z.slice(1)), y.textContent !== z && (isMismatchAllowed(
          y,
          0
          /* TEXT */
        ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && warn$1(
          "Hydration text content mismatch on",
          y,
          `
  - rendered on server: ${y.textContent}
  - expected on client: ${_.children}`
        ), logMismatchError()), y.textContent = _.children);
      }
      if (O) {
        if (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ || J || !M || H & 48) {
          const z = y.tagName.includes("-");
          for (const ie in O)
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && // #11189 skip if this node has directives that have created hooks
            // as it could have mutated the DOM in any possible way
            !(F && F.some((ae) => ae.dir.created)) && propHasMismatch(y, ie, O[ie], _, b) && logMismatchError(), (J && (ie.endsWith("value") || ie === "indeterminate") || isOn(ie) && !isReservedProp(ie) || // force hydrate v-bind with .prop modifiers
            ie[0] === "." || z) && r(y, ie, null, O[ie], void 0, b);
        } else if (O.onClick)
          r(
            y,
            "onClick",
            null,
            O.onClick,
            void 0,
            b
          );
        else if (H & 4 && isReactive(O.style))
          for (const z in O.style) O.style[z];
      }
      let X;
      (X = O && O.onVnodeBeforeMount) && invokeVNodeHook(X, b, _), F && invokeDirectiveHook(_, null, b, "beforeMount"), ((X = O && O.onVnodeMounted) || F || K) && queueEffectWithSuspense(() => {
        X && invokeVNodeHook(X, b, _), K && G.enter(y), F && invokeDirectiveHook(_, null, b, "mounted");
      }, x);
    }
    return y.nextSibling;
  }, m = (y, _, b, x, D, M, R) => {
    R = R || !!_.dynamicChildren;
    const O = _.children, H = O.length;
    let N = !1;
    for (let F = 0; F < H; F++) {
      const G = R ? O[F] : O[F] = normalizeVNode(O[F]), J = G.type === Text;
      y ? (J && !R && F + 1 < H && normalizeVNode(O[F + 1]).type === Text && (l(
        s(
          y.data.slice(G.children.length)
        ),
        b,
        i(y)
      ), y.data = G.children), y = u(
        y,
        G,
        x,
        D,
        M,
        R
      )) : J && !G.children ? l(G.el = s(""), b) : (isMismatchAllowed(
        b,
        1
        /* CHILDREN */
      ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && !N && (warn$1(
        "Hydration children mismatch on",
        b,
        `
Server rendered element contains fewer child nodes than client vdom.`
      ), N = !0), logMismatchError()), n(
        null,
        G,
        b,
        null,
        x,
        D,
        getContainerType(b),
        M
      ));
    }
    return y;
  }, v = (y, _, b, x, D, M) => {
    const { slotScopeIds: R } = _;
    R && (D = D ? D.concat(R) : R);
    const O = o(y), H = m(
      i(y),
      _,
      O,
      b,
      x,
      D,
      M
    );
    return H && isComment(H) && H.data === "]" ? i(_.anchor = H) : (logMismatchError(), l(_.anchor = c("]"), O, H), H);
  }, S = (y, _, b, x, D, M) => {
    if (isMismatchAllowed(
      y.parentElement,
      1
      /* CHILDREN */
    ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && warn$1(
      `Hydration node mismatch:
- rendered on server:`,
      y,
      y.nodeType === 3 ? "(text)" : isComment(y) && y.data === "[" ? "(start of fragment)" : "",
      `
- expected on client:`,
      _.type
    ), logMismatchError()), _.el = null, M) {
      const H = I(y);
      for (; ; ) {
        const N = i(y);
        if (N && N !== H)
          a(N);
        else
          break;
      }
    }
    const R = i(y), O = o(y);
    return a(y), n(
      null,
      _,
      O,
      R,
      b,
      x,
      getContainerType(O),
      D
    ), b && (b.vnode.el = _.el, updateHOCHostEl(b, _.el)), R;
  }, I = (y, _ = "[", b = "]") => {
    let x = 0;
    for (; y; )
      if (y = i(y), y && isComment(y) && (y.data === _ && x++, y.data === b)) {
        if (x === 0)
          return i(y);
        x--;
      }
    return y;
  }, A = (y, _, b) => {
    const x = _.parentNode;
    x && x.replaceChild(y, _);
    let D = b;
    for (; D; )
      D.vnode.el === _ && (D.vnode.el = D.subTree.el = y), D = D.parent;
  }, T = (y) => y.nodeType === 1 && y.tagName === "TEMPLATE";
  return [f, u];
}
function propHasMismatch(e, t, n, r, s) {
  let i, o, a, l;
  if (t === "class")
    a = e.getAttribute("class"), l = normalizeClass(n), isSetEqual(toClassSet(a || ""), toClassSet(l)) || (i = 2, o = "class");
  else if (t === "style") {
    a = e.getAttribute("style") || "", l = isString(n) ? n : stringifyStyle(normalizeStyle(n));
    const c = toStyleMap(a), f = toStyleMap(l);
    if (r.dirs)
      for (const { dir: u, value: d } of r.dirs)
        u.name === "show" && !d && f.set("display", "none");
    s && resolveCssVars(s, r, f), isMapEqual(c, f) || (i = 3, o = "style");
  } else (e instanceof SVGElement && isKnownSvgAttr(t) || e instanceof HTMLElement && (isBooleanAttr(t) || isKnownHtmlAttr(t))) && (isBooleanAttr(t) ? (a = e.hasAttribute(t), l = includeBooleanAttr(n)) : n == null ? (a = e.hasAttribute(t), l = !1) : (e.hasAttribute(t) ? a = e.getAttribute(t) : t === "value" && e.tagName === "TEXTAREA" ? a = e.value : a = !1, l = isRenderableAttrValue(n) ? String(n) : !1), a !== l && (i = 4, o = t));
  if (i != null && !isMismatchAllowed(e, i)) {
    const c = (d) => d === !1 ? "(not rendered)" : `${o}="${d}"`, f = `Hydration ${MismatchTypeString[i]} mismatch on`, u = `
  - rendered on server: ${c(a)}
  - expected on client: ${c(l)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    return warn$1(f, e, u), !0;
  }
  return !1;
}
function toClassSet(e) {
  return new Set(e.trim().split(/\s+/));
}
function isSetEqual(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function toStyleMap(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e.split(";")) {
    let [r, s] = n.split(":");
    r = r.trim(), s = s && s.trim(), r && s && t.set(r, s);
  }
  return t;
}
function isMapEqual(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const [n, r] of e)
    if (r !== t.get(n))
      return !1;
  return !0;
}
function resolveCssVars(e, t, n) {
  const r = e.subTree;
  if (e.getCssVars && (t === r || r && r.type === Fragment && r.children.includes(t))) {
    const s = e.getCssVars();
    for (const i in s)
      n.set(
        `--${getEscapedCssVarName(i)}`,
        String(s[i])
      );
  }
  t === r && e.parent && resolveCssVars(e.parent, e.vnode, n);
}
const allowMismatchAttr = "data-allow-mismatch", MismatchTypeString = {
  0: "text",
  1: "children",
  2: "class",
  3: "style",
  4: "attribute"
};
function isMismatchAllowed(e, t) {
  if (t === 0 || t === 1)
    for (; e && !e.hasAttribute(allowMismatchAttr); )
      e = e.parentElement;
  const n = e && e.getAttribute(allowMismatchAttr);
  if (n == null)
    return !1;
  if (n === "")
    return !0;
  {
    const r = n.split(",");
    return t === 0 && r.includes("children") ? !0 : n.split(",").includes(MismatchTypeString[t]);
  }
}
const requestIdleCallback = getGlobalThis().requestIdleCallback || ((e) => setTimeout(e, 1)), cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((e) => clearTimeout(e)), hydrateOnIdle = (e = 1e4) => (t) => {
  const n = requestIdleCallback(t, { timeout: e });
  return () => cancelIdleCallback(n);
};
function elementIsVisibleInViewport(e) {
  const { top: t, left: n, bottom: r, right: s } = e.getBoundingClientRect(), { innerHeight: i, innerWidth: o } = window;
  return (t > 0 && t < i || r > 0 && r < i) && (n > 0 && n < o || s > 0 && s < o);
}
const hydrateOnVisible = (e) => (t, n) => {
  const r = new IntersectionObserver((s) => {
    for (const i of s)
      if (i.isIntersecting) {
        r.disconnect(), t();
        break;
      }
  }, e);
  return n((s) => {
    if (s instanceof Element) {
      if (elementIsVisibleInViewport(s))
        return t(), r.disconnect(), !1;
      r.observe(s);
    }
  }), () => r.disconnect();
}, hydrateOnMediaQuery = (e) => (t) => {
  if (e) {
    const n = matchMedia(e);
    if (n.matches)
      t();
    else
      return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
  }
}, hydrateOnInteraction = (e = []) => (t, n) => {
  isString(e) && (e = [e]);
  let r = !1;
  const s = (o) => {
    r || (r = !0, i(), t(), o.target.dispatchEvent(new o.constructor(o.type, o)));
  }, i = () => {
    n((o) => {
      for (const a of e)
        o.removeEventListener(a, s);
    });
  };
  return n((o) => {
    for (const a of e)
      o.addEventListener(a, s, { once: !0 });
  }), i;
};
function forEachElement(e, t) {
  if (isComment(e) && e.data === "[") {
    let n = 1, r = e.nextSibling;
    for (; r; ) {
      if (r.nodeType === 1) {
        if (t(r) === !1)
          break;
      } else if (isComment(r))
        if (r.data === "]") {
          if (--n === 0) break;
        } else r.data === "[" && n++;
      r = r.nextSibling;
    }
  } else
    t(e);
}
const isAsyncWrapper = (e) => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(e) {
  isFunction(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    hydrate: i,
    timeout: o,
    // undefined = never times out
    suspensible: a = !0,
    onError: l
  } = e;
  let c = null, f, u = 0;
  const d = () => (u++, c = null, m()), m = () => {
    let v;
    return c || (v = c = t().catch((S) => {
      if (S = S instanceof Error ? S : new Error(String(S)), l)
        return new Promise((I, A) => {
          l(S, () => I(d()), () => A(S), u + 1);
        });
      throw S;
    }).then((S) => v !== c && c ? c : (S && (S.__esModule || S[Symbol.toStringTag] === "Module") && (S = S.default), f = S, S)));
  };
  return /* @__PURE__ */ defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: m,
    __asyncHydrate(v, S, I) {
      const A = i ? () => {
        const T = i(
          I,
          (y) => forEachElement(v, y)
        );
        T && (S.bum || (S.bum = [])).push(T);
      } : I;
      f ? A() : m().then(() => !S.isUnmounted && A());
    },
    get __asyncResolved() {
      return f;
    },
    setup() {
      const v = currentInstance;
      if (markAsyncBoundary(v), f)
        return () => createInnerComp(f, v);
      const S = (y) => {
        c = null, handleError(
          y,
          v,
          13,
          !r
        );
      };
      if (a && v.suspense || isInSSRComponentSetup)
        return m().then((y) => () => createInnerComp(y, v)).catch((y) => (S(y), () => r ? createVNode(r, {
          error: y
        }) : null));
      const I = ref(!1), A = ref(), T = ref(!!s);
      return s && setTimeout(() => {
        T.value = !1;
      }, s), o != null && setTimeout(() => {
        if (!I.value && !A.value) {
          const y = new Error(
            `Async component timed out after ${o}ms.`
          );
          S(y), A.value = y;
        }
      }, o), m().then(() => {
        I.value = !0, v.parent && isKeepAlive(v.parent.vnode) && v.parent.update();
      }).catch((y) => {
        S(y), A.value = y;
      }), () => {
        if (I.value && f)
          return createInnerComp(f, v);
        if (A.value && r)
          return createVNode(r, {
            error: A.value
          });
        if (n && !T.value)
          return createVNode(n);
      };
    }
  });
}
function createInnerComp(e, t) {
  const { ref: n, props: r, children: s, ce: i } = t.vnode, o = createVNode(e, r, s);
  return o.ref = n, o.ce = i, delete t.vnode.ce, o;
}
const isKeepAlive = (e) => e.type.__isKeepAlive, KeepAliveImpl = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: !0,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(e, { slots: t }) {
    const n = getCurrentInstance(), r = n.ctx;
    if (!r.renderer)
      return () => {
        const T = t.default && t.default();
        return T && T.length === 1 ? T[0] : T;
      };
    const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
    let o = null;
    __VUE_PROD_DEVTOOLS__ && (n.__v_cache = s);
    const a = n.suspense, {
      renderer: {
        p: l,
        m: c,
        um: f,
        o: { createElement: u }
      }
    } = r, d = u("div");
    r.activate = (T, y, _, b, x) => {
      const D = T.component;
      c(T, y, _, 0, a), l(
        D.vnode,
        T,
        y,
        _,
        D,
        a,
        b,
        T.slotScopeIds,
        x
      ), queuePostRenderEffect(() => {
        D.isDeactivated = !1, D.a && invokeArrayFns(D.a);
        const M = T.props && T.props.onVnodeMounted;
        M && invokeVNodeHook(M, D.parent, T);
      }, a), __VUE_PROD_DEVTOOLS__ && devtoolsComponentAdded(D);
    }, r.deactivate = (T) => {
      const y = T.component;
      invalidateMount(y.m), invalidateMount(y.a), c(T, d, null, 1, a), queuePostRenderEffect(() => {
        y.da && invokeArrayFns(y.da);
        const _ = T.props && T.props.onVnodeUnmounted;
        _ && invokeVNodeHook(_, y.parent, T), y.isDeactivated = !0;
      }, a), __VUE_PROD_DEVTOOLS__ && devtoolsComponentAdded(y);
    };
    function m(T) {
      resetShapeFlag(T), f(T, n, a, !0);
    }
    function v(T) {
      s.forEach((y, _) => {
        const b = getComponentName(y.type);
        b && !T(b) && S(_);
      });
    }
    function S(T) {
      const y = s.get(T);
      y && (!o || !isSameVNodeType(y, o)) ? m(y) : o && resetShapeFlag(o), s.delete(T), i.delete(T);
    }
    watch(
      () => [e.include, e.exclude],
      ([T, y]) => {
        T && v((_) => matches(T, _)), y && v((_) => !matches(y, _));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: !0 }
    );
    let I = null;
    const A = () => {
      I != null && (isSuspense(n.subTree.type) ? queuePostRenderEffect(() => {
        s.set(I, getInnerChild(n.subTree));
      }, n.subTree.suspense) : s.set(I, getInnerChild(n.subTree)));
    };
    return onMounted(A), onUpdated(A), onBeforeUnmount(() => {
      s.forEach((T) => {
        const { subTree: y, suspense: _ } = n, b = getInnerChild(y);
        if (T.type === b.type && T.key === b.key) {
          resetShapeFlag(b);
          const x = b.component.da;
          x && queuePostRenderEffect(x, _);
          return;
        }
        m(T);
      });
    }), () => {
      if (I = null, !t.default)
        return o = null;
      const T = t.default(), y = T[0];
      if (T.length > 1)
        return o = null, T;
      if (!isVNode(y) || !(y.shapeFlag & 4) && !(y.shapeFlag & 128))
        return o = null, y;
      let _ = getInnerChild(y);
      if (_.type === Comment)
        return o = null, _;
      const b = _.type, x = getComponentName(
        isAsyncWrapper(_) ? _.type.__asyncResolved || {} : b
      ), { include: D, exclude: M, max: R } = e;
      if (D && (!x || !matches(D, x)) || M && x && matches(M, x))
        return _.shapeFlag &= -257, o = _, y;
      const O = _.key == null ? b : _.key, H = s.get(O);
      return _.el && (_ = cloneVNode(_), y.shapeFlag & 128 && (y.ssContent = _)), I = O, H ? (_.el = H.el, _.component = H.component, _.transition && setTransitionHooks(_, _.transition), _.shapeFlag |= 512, i.delete(O), i.add(O)) : (i.add(O), R && i.size > parseInt(R, 10) && S(i.values().next().value)), _.shapeFlag |= 256, o = _, isSuspense(y.type) ? y : _;
    };
  }
}, KeepAlive = KeepAliveImpl;
function matches(e, t) {
  return isArray$1(e) ? e.some((n) => matches(n, t)) : isString(e) ? e.split(",").includes(t) : isRegExp(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function onActivated(e, t) {
  registerKeepAliveHook(e, "a", t);
}
function onDeactivated(e, t) {
  registerKeepAliveHook(e, "da", t);
}
function registerKeepAliveHook(e, t, n = currentInstance) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (injectHook(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      isKeepAlive(s.parent.vnode) && injectToKeepAliveRoot(r, t, n, s), s = s.parent;
  }
}
function injectToKeepAliveRoot(e, t, n, r) {
  const s = injectHook(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  onUnmounted(() => {
    remove(r[t], s);
  }, n);
}
function resetShapeFlag(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function getInnerChild(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function injectHook(e, t, n = currentInstance, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      pauseTracking();
      const a = setCurrentInstance(n), l = callWithAsyncErrorHandling(t, n, e, o);
      return a(), resetTracking(), l;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const createHook = (e) => (t, n = currentInstance) => {
  (!isInSSRComponentSetup || e === "sp") && injectHook(e, (...r) => t(...r), n);
}, onBeforeMount = createHook("bm"), onMounted = createHook("m"), onBeforeUpdate = createHook(
  "bu"
), onUpdated = createHook("u"), onBeforeUnmount = createHook(
  "bum"
), onUnmounted = createHook("um"), onServerPrefetch = createHook(
  "sp"
), onRenderTriggered = createHook("rtg"), onRenderTracked = createHook("rtc");
function onErrorCaptured(e, t = currentInstance) {
  injectHook("ec", e, t);
}
const COMPONENTS = "components", DIRECTIVES = "directives";
function resolveComponent(e, t) {
  return resolveAsset(COMPONENTS, e, !0, t) || e;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(e) {
  return isString(e) ? resolveAsset(COMPONENTS, e, !1) || e : e || NULL_DYNAMIC_COMPONENT;
}
function resolveDirective(e) {
  return resolveAsset(DIRECTIVES, e);
}
function resolveAsset(e, t, n = !0, r = !1) {
  const s = currentRenderingInstance || currentInstance;
  if (s) {
    const i = s.type;
    if (e === COMPONENTS) {
      const a = getComponentName(
        i,
        !1
      );
      if (a && (a === t || a === camelize(t) || a === capitalize(camelize(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(s[e] || i[e], t) || // global registration
      resolve(s.appContext[e], t)
    );
    return !o && r ? i : o;
  }
}
function resolve(e, t) {
  return e && (e[t] || e[camelize(t)] || e[capitalize(camelize(t))]);
}
function renderList(e, t, n, r) {
  let s;
  const i = n && n[r], o = isArray$1(e);
  if (o || isString(e)) {
    const a = o && isReactive(e);
    let l = !1;
    a && (l = !isShallow(e), e = shallowReadArray(e)), s = new Array(e.length);
    for (let c = 0, f = e.length; c < f; c++)
      s[c] = t(
        l ? toReactive(e[c]) : e[c],
        c,
        void 0,
        i && i[c]
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let a = 0; a < e; a++)
      s[a] = t(a + 1, a, void 0, i && i[a]);
  } else if (isObject(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (a, l) => t(a, l, void 0, i && i[l])
      );
    else {
      const a = Object.keys(e);
      s = new Array(a.length);
      for (let l = 0, c = a.length; l < c; l++) {
        const f = a[l];
        s[l] = t(e[f], f, l, i && i[l]);
      }
    }
  else
    s = [];
  return n && (n[r] = s), s;
}
function createSlots(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (isArray$1(r))
      for (let s = 0; s < r.length; s++)
        e[r[s].name] = r[s].fn;
    else r && (e[r.name] = r.key ? (...s) => {
      const i = r.fn(...s);
      return i && (i.key = r.key), i;
    } : r.fn);
  }
  return e;
}
function renderSlot(e, t, n = {}, r, s) {
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce)
    return t !== "default" && (n.name = t), openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", n, r && r())],
      64
    );
  let i = e[t];
  i && i._c && (i._d = !1), openBlock();
  const o = i && ensureValidVNode(i(n)), a = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  o && o.key, l = createBlock(
    Fragment,
    {
      key: (a && !isSymbol(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!o && r ? "_fb" : "")
    },
    o || (r ? r() : []),
    o && e._ === 1 ? 64 : -2
  );
  return !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), i && i._c && (i._d = !0), l;
}
function ensureValidVNode(e) {
  return e.some((t) => isVNode(t) ? !(t.type === Comment || t.type === Fragment && !ensureValidVNode(t.children)) : !0) ? e : null;
}
function toHandlers(e, t) {
  const n = {};
  for (const r in e)
    n[t && /[A-Z]/.test(r) ? `on:${r}` : toHandlerKey(r)] = e[r];
  return n;
}
const getPublicInstance = (e) => e ? isStatefulComponent(e) ? getComponentPublicInstance(e) : getPublicInstance(e.parent) : null, publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => getPublicInstance(e.parent),
    $root: (e) => getPublicInstance(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => __VUE_OPTIONS_API__ ? resolveMergedOptions(e) : e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      queueJob(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = nextTick.bind(e.proxy)),
    $watch: (e) => __VUE_OPTIONS_API__ ? instanceWatch.bind(e) : NOOP
  })
), hasSetupBinding = (e, t) => e !== EMPTY_OBJ && !e.__isScriptSetup && hasOwn(e, t), PublicInstanceProxyHandlers = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: i, accessCache: o, type: a, appContext: l } = e;
    let c;
    if (t[0] !== "$") {
      const m = o[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (hasSetupBinding(r, t))
          return o[t] = 1, r[t];
        if (s !== EMPTY_OBJ && hasOwn(s, t))
          return o[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && hasOwn(c, t)
        )
          return o[t] = 3, i[t];
        if (n !== EMPTY_OBJ && hasOwn(n, t))
          return o[t] = 4, n[t];
        (!__VUE_OPTIONS_API__ || shouldCacheAccess) && (o[t] = 0);
      }
    }
    const f = publicPropertiesMap[t];
    let u, d;
    if (f)
      return t === "$attrs" && track(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (u = a.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== EMPTY_OBJ && hasOwn(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      d = l.config.globalProperties, hasOwn(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: i } = e;
    return hasSetupBinding(s, t) ? (s[t] = n, !0) : r !== EMPTY_OBJ && hasOwn(r, t) ? (r[t] = n, !0) : hasOwn(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: i }
  }, o) {
    let a;
    return !!n[o] || e !== EMPTY_OBJ && hasOwn(e, o) || hasSetupBinding(t, o) || (a = i[0]) && hasOwn(a, o) || hasOwn(r, o) || hasOwn(publicPropertiesMap, o) || hasOwn(s.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : hasOwn(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
}, RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ extend({}, PublicInstanceProxyHandlers, {
  get(e, t) {
    if (t !== Symbol.unscopables)
      return PublicInstanceProxyHandlers.get(e, t, e);
  },
  has(e, t) {
    return t[0] !== "_" && !isGloballyAllowed(t);
  }
});
function defineProps() {
  return null;
}
function defineEmits() {
  return null;
}
function defineExpose(e) {
}
function defineOptions(e) {
}
function defineSlots() {
  return null;
}
function defineModel() {
}
function withDefaults(e, t) {
  return null;
}
function useSlots() {
  return getContext().slots;
}
function useAttrs() {
  return getContext().attrs;
}
function getContext() {
  const e = getCurrentInstance();
  return e.setupContext || (e.setupContext = createSetupContext(e));
}
function normalizePropsOrEmits(e) {
  return isArray$1(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function mergeDefaults(e, t) {
  const n = normalizePropsOrEmits(e);
  for (const r in t) {
    if (r.startsWith("__skip")) continue;
    let s = n[r];
    s ? isArray$1(s) || isFunction(s) ? s = n[r] = { type: s, default: t[r] } : s.default = t[r] : s === null && (s = n[r] = { default: t[r] }), s && t[`__skip_${r}`] && (s.skipFactory = !0);
  }
  return n;
}
function mergeModels(e, t) {
  return !e || !t ? e || t : isArray$1(e) && isArray$1(t) ? e.concat(t) : extend({}, normalizePropsOrEmits(e), normalizePropsOrEmits(t));
}
function createPropsRestProxy(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) || Object.defineProperty(n, r, {
      enumerable: !0,
      get: () => e[r]
    });
  return n;
}
function withAsyncContext(e) {
  const t = getCurrentInstance();
  let n = e();
  return unsetCurrentInstance(), isPromise(n) && (n = n.catch((r) => {
    throw setCurrentInstance(t), r;
  })), [n, () => setCurrentInstance(t)];
}
let shouldCacheAccess = !0;
function applyOptions(e) {
  const t = resolveMergedOptions(e), n = e.proxy, r = e.ctx;
  shouldCacheAccess = !1, t.beforeCreate && callHook$1(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: o,
    watch: a,
    provide: l,
    inject: c,
    // lifecycle
    created: f,
    beforeMount: u,
    mounted: d,
    beforeUpdate: m,
    updated: v,
    activated: S,
    deactivated: I,
    beforeDestroy: A,
    beforeUnmount: T,
    destroyed: y,
    unmounted: _,
    render: b,
    renderTracked: x,
    renderTriggered: D,
    errorCaptured: M,
    serverPrefetch: R,
    // public API
    expose: O,
    inheritAttrs: H,
    // assets
    components: N,
    directives: F,
    filters: G
  } = t;
  if (c && resolveInjections(c, r, null), o)
    for (const X in o) {
      const z = o[X];
      isFunction(z) && (r[X] = z.bind(n));
    }
  if (s) {
    const X = s.call(n, n);
    isObject(X) && (e.data = reactive(X));
  }
  if (shouldCacheAccess = !0, i)
    for (const X in i) {
      const z = i[X], ie = isFunction(z) ? z.bind(n, n) : isFunction(z.get) ? z.get.bind(n, n) : NOOP, ae = !isFunction(z) && isFunction(z.set) ? z.set.bind(n) : NOOP, ce = computed({
        get: ie,
        set: ae
      });
      Object.defineProperty(r, X, {
        enumerable: !0,
        configurable: !0,
        get: () => ce.value,
        set: (ue) => ce.value = ue
      });
    }
  if (a)
    for (const X in a)
      createWatcher(a[X], r, n, X);
  if (l) {
    const X = isFunction(l) ? l.call(n) : l;
    Reflect.ownKeys(X).forEach((z) => {
      provide(z, X[z]);
    });
  }
  f && callHook$1(f, e, "c");
  function K(X, z) {
    isArray$1(z) ? z.forEach((ie) => X(ie.bind(n))) : z && X(z.bind(n));
  }
  if (K(onBeforeMount, u), K(onMounted, d), K(onBeforeUpdate, m), K(onUpdated, v), K(onActivated, S), K(onDeactivated, I), K(onErrorCaptured, M), K(onRenderTracked, x), K(onRenderTriggered, D), K(onBeforeUnmount, T), K(onUnmounted, _), K(onServerPrefetch, R), isArray$1(O))
    if (O.length) {
      const X = e.exposed || (e.exposed = {});
      O.forEach((z) => {
        Object.defineProperty(X, z, {
          get: () => n[z],
          set: (ie) => n[z] = ie
        });
      });
    } else e.exposed || (e.exposed = {});
  b && e.render === NOOP && (e.render = b), H != null && (e.inheritAttrs = H), N && (e.components = N), F && (e.directives = F), R && markAsyncBoundary(e);
}
function resolveInjections(e, t, n = NOOP) {
  isArray$1(e) && (e = normalizeInject(e));
  for (const r in e) {
    const s = e[r];
    let i;
    isObject(s) ? "default" in s ? i = inject(
      s.from || r,
      s.default,
      !0
    ) : i = inject(s.from || r) : i = inject(s), isRef(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[r] = i;
  }
}
function callHook$1(e, t, n) {
  callWithAsyncErrorHandling(
    isArray$1(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function createWatcher(e, t, n, r) {
  let s = r.includes(".") ? createPathGetter(n, r) : () => n[r];
  if (isString(e)) {
    const i = t[e];
    isFunction(i) && watch(s, i);
  } else if (isFunction(e))
    watch(s, e.bind(n));
  else if (isObject(e))
    if (isArray$1(e))
      e.forEach((i) => createWatcher(i, t, n, r));
    else {
      const i = isFunction(e.handler) ? e.handler.bind(n) : t[e.handler];
      isFunction(i) && watch(s, i, e);
    }
}
function resolveMergedOptions(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = i.get(t);
  let l;
  return a ? l = a : !s.length && !n && !r ? l = t : (l = {}, s.length && s.forEach(
    (c) => mergeOptions$1(l, c, o, !0)
  ), mergeOptions$1(l, t, o)), isObject(t) && i.set(t, l), l;
}
function mergeOptions$1(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && mergeOptions$1(e, i, n, !0), s && s.forEach(
    (o) => mergeOptions$1(e, o, n, !0)
  );
  for (const o in t)
    if (!(r && o === "expose")) {
      const a = internalOptionMergeStrats[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(e, t) {
  return t ? e ? function() {
    return extend(
      isFunction(e) ? e.call(this, this) : e,
      isFunction(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function mergeInject(e, t) {
  return mergeObjectOptions(normalizeInject(e), normalizeInject(t));
}
function normalizeInject(e) {
  if (isArray$1(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function mergeAsArray$1(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mergeObjectOptions(e, t) {
  return e ? extend(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function mergeEmitsOrPropsOptions(e, t) {
  return e ? isArray$1(e) && isArray$1(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : extend(
    /* @__PURE__ */ Object.create(null),
    normalizePropsOrEmits(e),
    normalizePropsOrEmits(t ?? {})
  ) : t;
}
function mergeWatchOptions(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = extend(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = mergeAsArray$1(e[r], t[r]);
  return n;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(e, t) {
  return function(r, s = null) {
    isFunction(r) || (r = extend({}, r)), s != null && !isObject(s) && (s = null);
    const i = createAppContext(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const c = i.app = {
      _uid: uid$1++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version,
      get config() {
        return i.config;
      },
      set config(f) {
      },
      use(f, ...u) {
        return o.has(f) || (f && isFunction(f.install) ? (o.add(f), f.install(c, ...u)) : isFunction(f) && (o.add(f), f(c, ...u))), c;
      },
      mixin(f) {
        return __VUE_OPTIONS_API__ && (i.mixins.includes(f) || i.mixins.push(f)), c;
      },
      component(f, u) {
        return u ? (i.components[f] = u, c) : i.components[f];
      },
      directive(f, u) {
        return u ? (i.directives[f] = u, c) : i.directives[f];
      },
      mount(f, u, d) {
        if (!l) {
          const m = c._ceVNode || createVNode(r, s);
          return m.appContext = i, d === !0 ? d = "svg" : d === !1 && (d = void 0), u && t ? t(m, f) : e(m, f, d), l = !0, c._container = f, f.__vue_app__ = c, __VUE_PROD_DEVTOOLS__ && (c._instance = m.component, devtoolsInitApp(c, version)), getComponentPublicInstance(m.component);
        }
      },
      onUnmount(f) {
        a.push(f);
      },
      unmount() {
        l && (callWithAsyncErrorHandling(
          a,
          c._instance,
          16
        ), e(null, c._container), __VUE_PROD_DEVTOOLS__ && (c._instance = null, devtoolsUnmountApp(c)), delete c._container.__vue_app__);
      },
      provide(f, u) {
        return i.provides[f] = u, c;
      },
      runWithContext(f) {
        const u = currentApp;
        currentApp = c;
        try {
          return f();
        } finally {
          currentApp = u;
        }
      }
    };
    return c;
  };
}
let currentApp = null;
function provide(e, t) {
  if (currentInstance) {
    let n = currentInstance.provides;
    const r = currentInstance.parent && currentInstance.parent.provides;
    r === n && (n = currentInstance.provides = Object.create(r)), n[e] = t;
  }
}
function inject(e, t, n = !1) {
  const r = currentInstance || currentRenderingInstance;
  if (r || currentApp) {
    const s = currentApp ? currentApp._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && isFunction(t) ? t.call(r && r.proxy) : t;
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
const internalObjectProto = {}, createInternalObject = () => Object.create(internalObjectProto), isInternalObject = (e) => Object.getPrototypeOf(e) === internalObjectProto;
function initProps(e, t, n, r = !1) {
  const s = {}, i = createInternalObject();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), setFullProps(e, t, s, i);
  for (const o in e.propsOptions[0])
    o in s || (s[o] = void 0);
  n ? e.props = r ? s : shallowReactive(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function updateProps(e, t, n, r) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, a = toRaw(s), [l] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = e.vnode.dynamicProps;
      for (let u = 0; u < f.length; u++) {
        let d = f[u];
        if (isEmitListener(e.emitsOptions, d))
          continue;
        const m = t[d];
        if (l)
          if (hasOwn(i, d))
            m !== i[d] && (i[d] = m, c = !0);
          else {
            const v = camelize(d);
            s[v] = resolvePropValue(
              l,
              a,
              v,
              m,
              e,
              !1
            );
          }
        else
          m !== i[d] && (i[d] = m, c = !0);
      }
    }
  } else {
    setFullProps(e, t, s, i) && (c = !0);
    let f;
    for (const u in a)
      (!t || // for camelCase
      !hasOwn(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = hyphenate(u)) === u || !hasOwn(t, f))) && (l ? n && // for camelCase
      (n[u] !== void 0 || // for kebab-case
      n[f] !== void 0) && (s[u] = resolvePropValue(
        l,
        a,
        u,
        void 0,
        e,
        !0
      )) : delete s[u]);
    if (i !== a)
      for (const u in i)
        (!t || !hasOwn(t, u)) && (delete i[u], c = !0);
  }
  c && trigger(e.attrs, "set", "");
}
function setFullProps(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (isReservedProp(l))
        continue;
      const c = t[l];
      let f;
      s && hasOwn(s, f = camelize(l)) ? !i || !i.includes(f) ? n[f] = c : (a || (a = {}))[f] = c : isEmitListener(e.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c, o = !0);
    }
  if (i) {
    const l = toRaw(n), c = a || EMPTY_OBJ;
    for (let f = 0; f < i.length; f++) {
      const u = i[f];
      n[u] = resolvePropValue(
        s,
        l,
        u,
        c[u],
        e,
        !hasOwn(c, u)
      );
    }
  }
  return o;
}
function resolvePropValue(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const a = hasOwn(o, "default");
    if (a && r === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && isFunction(l)) {
        const { propsDefaults: c } = s;
        if (n in c)
          r = c[n];
        else {
          const f = setCurrentInstance(s);
          r = c[n] = l.call(
            null,
            t
          ), f();
        }
      } else
        r = l;
      s.ce && s.ce._setProp(n, r);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !a ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === hyphenate(n)) && (r = !0));
  }
  return r;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(e, t, n = !1) {
  const r = __VUE_OPTIONS_API__ && n ? mixinPropsCache : t.propsCache, s = r.get(e);
  if (s)
    return s;
  const i = e.props, o = {}, a = [];
  let l = !1;
  if (__VUE_OPTIONS_API__ && !isFunction(e)) {
    const f = (u) => {
      l = !0;
      const [d, m] = normalizePropsOptions(u, t, !0);
      extend(o, d), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !l)
    return isObject(e) && r.set(e, EMPTY_ARR), EMPTY_ARR;
  if (isArray$1(i))
    for (let f = 0; f < i.length; f++) {
      const u = camelize(i[f]);
      validatePropName(u) && (o[u] = EMPTY_OBJ);
    }
  else if (i)
    for (const f in i) {
      const u = camelize(f);
      if (validatePropName(u)) {
        const d = i[f], m = o[u] = isArray$1(d) || isFunction(d) ? { type: d } : extend({}, d), v = m.type;
        let S = !1, I = !0;
        if (isArray$1(v))
          for (let A = 0; A < v.length; ++A) {
            const T = v[A], y = isFunction(T) && T.name;
            if (y === "Boolean") {
              S = !0;
              break;
            } else y === "String" && (I = !1);
          }
        else
          S = isFunction(v) && v.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = S, m[
          1
          /* shouldCastTrue */
        ] = I, (S || hasOwn(m, "default")) && a.push(u);
      }
    }
  const c = [o, a];
  return isObject(e) && r.set(e, c), c;
}
function validatePropName(e) {
  return e[0] !== "$" && !isReservedProp(e);
}
const isInternalKey = (e) => e[0] === "_" || e === "$stable", normalizeSlotValue = (e) => isArray$1(e) ? e.map(normalizeVNode) : [normalizeVNode(e)], normalizeSlot$1 = (e, t, n) => {
  if (t._n)
    return t;
  const r = withCtx((...s) => normalizeSlotValue(t(...s)), n);
  return r._c = !1, r;
}, normalizeObjectSlots = (e, t, n) => {
  const r = e._ctx;
  for (const s in e) {
    if (isInternalKey(s)) continue;
    const i = e[s];
    if (isFunction(i))
      t[s] = normalizeSlot$1(s, i, r);
    else if (i != null) {
      const o = normalizeSlotValue(i);
      t[s] = () => o;
    }
  }
}, normalizeVNodeSlots = (e, t) => {
  const n = normalizeSlotValue(t);
  e.slots.default = () => n;
}, assignSlots = (e, t, n) => {
  for (const r in t)
    (n || r !== "_") && (e[r] = t[r]);
}, initSlots = (e, t, n) => {
  const r = e.slots = createInternalObject();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (assignSlots(r, t, n), n && def(r, "_", s, !0)) : normalizeObjectSlots(t, r);
  } else t && normalizeVNodeSlots(e, t);
}, updateSlots = (e, t, n) => {
  const { vnode: r, slots: s } = e;
  let i = !0, o = EMPTY_OBJ;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? i = !1 : assignSlots(s, t, n) : (i = !t.$stable, normalizeObjectSlots(t, s)), o = t;
  } else t && (normalizeVNodeSlots(e, t), o = { default: 1 });
  if (i)
    for (const a in s)
      !isInternalKey(a) && o[a] == null && delete s[a];
};
function initFeatureFlags() {
  typeof __VUE_OPTIONS_API__ != "boolean" && (getGlobalThis().__VUE_OPTIONS_API__ = !0), typeof __VUE_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis().__VUE_PROD_DEVTOOLS__ = !1), typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(e) {
  return baseCreateRenderer(e);
}
function createHydrationRenderer(e) {
  return baseCreateRenderer(e, createHydrationFunctions);
}
function baseCreateRenderer(e, t) {
  initFeatureFlags();
  const n = getGlobalThis();
  n.__VUE__ = !0, __VUE_PROD_DEVTOOLS__ && setDevtoolsHook$1(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: r,
    remove: s,
    patchProp: i,
    createElement: o,
    createText: a,
    createComment: l,
    setText: c,
    setElementText: f,
    parentNode: u,
    nextSibling: d,
    setScopeId: m = NOOP,
    insertStaticContent: v
  } = e, S = (g, E, C, k = null, P = null, V = null, U = void 0, $ = null, B = !!E.dynamicChildren) => {
    if (g === E)
      return;
    g && !isSameVNodeType(g, E) && (k = w(g), ue(g, P, V, !0), g = null), E.patchFlag === -2 && (B = !1, E.dynamicChildren = null);
    const { type: L, ref: Z, shapeFlag: W } = E;
    switch (L) {
      case Text:
        I(g, E, C, k);
        break;
      case Comment:
        A(g, E, C, k);
        break;
      case Static:
        g == null && T(E, C, k, U);
        break;
      case Fragment:
        N(
          g,
          E,
          C,
          k,
          P,
          V,
          U,
          $,
          B
        );
        break;
      default:
        W & 1 ? b(
          g,
          E,
          C,
          k,
          P,
          V,
          U,
          $,
          B
        ) : W & 6 ? F(
          g,
          E,
          C,
          k,
          P,
          V,
          U,
          $,
          B
        ) : (W & 64 || W & 128) && L.process(
          g,
          E,
          C,
          k,
          P,
          V,
          U,
          $,
          B,
          Y
        );
    }
    Z != null && P && setRef(Z, g && g.ref, V, E || g, !E);
  }, I = (g, E, C, k) => {
    if (g == null)
      r(
        E.el = a(E.children),
        C,
        k
      );
    else {
      const P = E.el = g.el;
      E.children !== g.children && c(P, E.children);
    }
  }, A = (g, E, C, k) => {
    g == null ? r(
      E.el = l(E.children || ""),
      C,
      k
    ) : E.el = g.el;
  }, T = (g, E, C, k) => {
    [g.el, g.anchor] = v(
      g.children,
      E,
      C,
      k,
      g.el,
      g.anchor
    );
  }, y = ({ el: g, anchor: E }, C, k) => {
    let P;
    for (; g && g !== E; )
      P = d(g), r(g, C, k), g = P;
    r(E, C, k);
  }, _ = ({ el: g, anchor: E }) => {
    let C;
    for (; g && g !== E; )
      C = d(g), s(g), g = C;
    s(E);
  }, b = (g, E, C, k, P, V, U, $, B) => {
    E.type === "svg" ? U = "svg" : E.type === "math" && (U = "mathml"), g == null ? x(
      E,
      C,
      k,
      P,
      V,
      U,
      $,
      B
    ) : R(
      g,
      E,
      P,
      V,
      U,
      $,
      B
    );
  }, x = (g, E, C, k, P, V, U, $) => {
    let B, L;
    const { props: Z, shapeFlag: W, transition: Q, dirs: ee } = g;
    if (B = g.el = o(
      g.type,
      V,
      Z && Z.is,
      Z
    ), W & 8 ? f(B, g.children) : W & 16 && M(
      g.children,
      B,
      null,
      k,
      P,
      resolveChildrenNamespace(g, V),
      U,
      $
    ), ee && invokeDirectiveHook(g, null, k, "created"), D(B, g, g.scopeId, U, k), Z) {
      for (const se in Z)
        se !== "value" && !isReservedProp(se) && i(B, se, null, Z[se], V, k);
      "value" in Z && i(B, "value", null, Z.value, V), (L = Z.onVnodeBeforeMount) && invokeVNodeHook(L, k, g);
    }
    __VUE_PROD_DEVTOOLS__ && (def(B, "__vnode", g, !0), def(B, "__vueParentComponent", k, !0)), ee && invokeDirectiveHook(g, null, k, "beforeMount");
    const te = needTransition(P, Q);
    te && Q.beforeEnter(B), r(B, E, C), ((L = Z && Z.onVnodeMounted) || te || ee) && queuePostRenderEffect(() => {
      L && invokeVNodeHook(L, k, g), te && Q.enter(B), ee && invokeDirectiveHook(g, null, k, "mounted");
    }, P);
  }, D = (g, E, C, k, P) => {
    if (C && m(g, C), k)
      for (let V = 0; V < k.length; V++)
        m(g, k[V]);
    if (P) {
      let V = P.subTree;
      if (E === V || isSuspense(V.type) && (V.ssContent === E || V.ssFallback === E)) {
        const U = P.vnode;
        D(
          g,
          U,
          U.scopeId,
          U.slotScopeIds,
          P.parent
        );
      }
    }
  }, M = (g, E, C, k, P, V, U, $, B = 0) => {
    for (let L = B; L < g.length; L++) {
      const Z = g[L] = $ ? cloneIfMounted(g[L]) : normalizeVNode(g[L]);
      S(
        null,
        Z,
        E,
        C,
        k,
        P,
        V,
        U,
        $
      );
    }
  }, R = (g, E, C, k, P, V, U) => {
    const $ = E.el = g.el;
    __VUE_PROD_DEVTOOLS__ && ($.__vnode = E);
    let { patchFlag: B, dynamicChildren: L, dirs: Z } = E;
    B |= g.patchFlag & 16;
    const W = g.props || EMPTY_OBJ, Q = E.props || EMPTY_OBJ;
    let ee;
    if (C && toggleRecurse(C, !1), (ee = Q.onVnodeBeforeUpdate) && invokeVNodeHook(ee, C, E, g), Z && invokeDirectiveHook(E, g, C, "beforeUpdate"), C && toggleRecurse(C, !0), (W.innerHTML && Q.innerHTML == null || W.textContent && Q.textContent == null) && f($, ""), L ? O(
      g.dynamicChildren,
      L,
      $,
      C,
      k,
      resolveChildrenNamespace(E, P),
      V
    ) : U || z(
      g,
      E,
      $,
      null,
      C,
      k,
      resolveChildrenNamespace(E, P),
      V,
      !1
    ), B > 0) {
      if (B & 16)
        H($, W, Q, C, P);
      else if (B & 2 && W.class !== Q.class && i($, "class", null, Q.class, P), B & 4 && i($, "style", W.style, Q.style, P), B & 8) {
        const te = E.dynamicProps;
        for (let se = 0; se < te.length; se++) {
          const re = te[se], de = W[re], le = Q[re];
          (le !== de || re === "value") && i($, re, de, le, P, C);
        }
      }
      B & 1 && g.children !== E.children && f($, E.children);
    } else !U && L == null && H($, W, Q, C, P);
    ((ee = Q.onVnodeUpdated) || Z) && queuePostRenderEffect(() => {
      ee && invokeVNodeHook(ee, C, E, g), Z && invokeDirectiveHook(E, g, C, "updated");
    }, k);
  }, O = (g, E, C, k, P, V, U) => {
    for (let $ = 0; $ < E.length; $++) {
      const B = g[$], L = E[$], Z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        B.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (B.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(B, L) || // - In the case of a component, it could contain anything.
        B.shapeFlag & 70) ? u(B.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      S(
        B,
        L,
        Z,
        null,
        k,
        P,
        V,
        U,
        !0
      );
    }
  }, H = (g, E, C, k, P) => {
    if (E !== C) {
      if (E !== EMPTY_OBJ)
        for (const V in E)
          !isReservedProp(V) && !(V in C) && i(
            g,
            V,
            E[V],
            null,
            P,
            k
          );
      for (const V in C) {
        if (isReservedProp(V)) continue;
        const U = C[V], $ = E[V];
        U !== $ && V !== "value" && i(g, V, $, U, P, k);
      }
      "value" in C && i(g, "value", E.value, C.value, P);
    }
  }, N = (g, E, C, k, P, V, U, $, B) => {
    const L = E.el = g ? g.el : a(""), Z = E.anchor = g ? g.anchor : a("");
    let { patchFlag: W, dynamicChildren: Q, slotScopeIds: ee } = E;
    ee && ($ = $ ? $.concat(ee) : ee), g == null ? (r(L, C, k), r(Z, C, k), M(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      E.children || [],
      C,
      Z,
      P,
      V,
      U,
      $,
      B
    )) : W > 0 && W & 64 && Q && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    g.dynamicChildren ? (O(
      g.dynamicChildren,
      Q,
      C,
      P,
      V,
      U,
      $
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (E.key != null || P && E === P.subTree) && traverseStaticChildren(
      g,
      E,
      !0
      /* shallow */
    )) : z(
      g,
      E,
      C,
      Z,
      P,
      V,
      U,
      $,
      B
    );
  }, F = (g, E, C, k, P, V, U, $, B) => {
    E.slotScopeIds = $, g == null ? E.shapeFlag & 512 ? P.ctx.activate(
      E,
      C,
      k,
      U,
      B
    ) : G(
      E,
      C,
      k,
      P,
      V,
      U,
      B
    ) : J(g, E, B);
  }, G = (g, E, C, k, P, V, U) => {
    const $ = g.component = createComponentInstance(
      g,
      k,
      P
    );
    if (isKeepAlive(g) && ($.ctx.renderer = Y), setupComponent($, !1, U), $.asyncDep) {
      if (P && P.registerDep($, K, U), !g.el) {
        const B = $.subTree = createVNode(Comment);
        A(null, B, E, C);
      }
    } else
      K(
        $,
        g,
        E,
        C,
        P,
        V,
        U
      );
  }, J = (g, E, C) => {
    const k = E.component = g.component;
    if (shouldUpdateComponent(g, E, C))
      if (k.asyncDep && !k.asyncResolved) {
        X(k, E, C);
        return;
      } else
        k.next = E, k.update();
    else
      E.el = g.el, k.vnode = E;
  }, K = (g, E, C, k, P, V, U) => {
    const $ = () => {
      if (g.isMounted) {
        let { next: W, bu: Q, u: ee, parent: te, vnode: se } = g;
        {
          const pe = locateNonHydratedAsyncRoot(g);
          if (pe) {
            W && (W.el = se.el, X(g, W, U)), pe.asyncDep.then(() => {
              g.isUnmounted || $();
            });
            return;
          }
        }
        let re = W, de;
        toggleRecurse(g, !1), W ? (W.el = se.el, X(g, W, U)) : W = se, Q && invokeArrayFns(Q), (de = W.props && W.props.onVnodeBeforeUpdate) && invokeVNodeHook(de, te, W, se), toggleRecurse(g, !0);
        const le = renderComponentRoot(g), ge = g.subTree;
        g.subTree = le, S(
          ge,
          le,
          // parent may have changed if it's in a teleport
          u(ge.el),
          // anchor may have changed if it's in a fragment
          w(ge),
          g,
          P,
          V
        ), W.el = le.el, re === null && updateHOCHostEl(g, le.el), ee && queuePostRenderEffect(ee, P), (de = W.props && W.props.onVnodeUpdated) && queuePostRenderEffect(
          () => invokeVNodeHook(de, te, W, se),
          P
        ), __VUE_PROD_DEVTOOLS__ && devtoolsComponentUpdated(g);
      } else {
        let W;
        const { el: Q, props: ee } = E, { bm: te, m: se, parent: re, root: de, type: le } = g, ge = isAsyncWrapper(E);
        if (toggleRecurse(g, !1), te && invokeArrayFns(te), !ge && (W = ee && ee.onVnodeBeforeMount) && invokeVNodeHook(W, re, E), toggleRecurse(g, !0), Q && oe) {
          const pe = () => {
            g.subTree = renderComponentRoot(g), oe(
              Q,
              g.subTree,
              g,
              P,
              null
            );
          };
          ge && le.__asyncHydrate ? le.__asyncHydrate(
            Q,
            g,
            pe
          ) : pe();
        } else {
          de.ce && de.ce._injectChildStyle(le);
          const pe = g.subTree = renderComponentRoot(g);
          S(
            null,
            pe,
            C,
            k,
            g,
            P,
            V
          ), E.el = pe.el;
        }
        if (se && queuePostRenderEffect(se, P), !ge && (W = ee && ee.onVnodeMounted)) {
          const pe = E;
          queuePostRenderEffect(
            () => invokeVNodeHook(W, re, pe),
            P
          );
        }
        (E.shapeFlag & 256 || re && isAsyncWrapper(re.vnode) && re.vnode.shapeFlag & 256) && g.a && queuePostRenderEffect(g.a, P), g.isMounted = !0, __VUE_PROD_DEVTOOLS__ && devtoolsComponentAdded(g), E = C = k = null;
      }
    };
    g.scope.on();
    const B = g.effect = new ReactiveEffect($);
    g.scope.off();
    const L = g.update = B.run.bind(B), Z = g.job = B.runIfDirty.bind(B);
    Z.i = g, Z.id = g.uid, B.scheduler = () => queueJob(Z), toggleRecurse(g, !0), L();
  }, X = (g, E, C) => {
    E.component = g;
    const k = g.vnode.props;
    g.vnode = E, g.next = null, updateProps(g, E.props, k, C), updateSlots(g, E.children, C), pauseTracking(), flushPreFlushCbs(g), resetTracking();
  }, z = (g, E, C, k, P, V, U, $, B = !1) => {
    const L = g && g.children, Z = g ? g.shapeFlag : 0, W = E.children, { patchFlag: Q, shapeFlag: ee } = E;
    if (Q > 0) {
      if (Q & 128) {
        ae(
          L,
          W,
          C,
          k,
          P,
          V,
          U,
          $,
          B
        );
        return;
      } else if (Q & 256) {
        ie(
          L,
          W,
          C,
          k,
          P,
          V,
          U,
          $,
          B
        );
        return;
      }
    }
    ee & 8 ? (Z & 16 && me(L, P, V), W !== L && f(C, W)) : Z & 16 ? ee & 16 ? ae(
      L,
      W,
      C,
      k,
      P,
      V,
      U,
      $,
      B
    ) : me(L, P, V, !0) : (Z & 8 && f(C, ""), ee & 16 && M(
      W,
      C,
      k,
      P,
      V,
      U,
      $,
      B
    ));
  }, ie = (g, E, C, k, P, V, U, $, B) => {
    g = g || EMPTY_ARR, E = E || EMPTY_ARR;
    const L = g.length, Z = E.length, W = Math.min(L, Z);
    let Q;
    for (Q = 0; Q < W; Q++) {
      const ee = E[Q] = B ? cloneIfMounted(E[Q]) : normalizeVNode(E[Q]);
      S(
        g[Q],
        ee,
        C,
        null,
        P,
        V,
        U,
        $,
        B
      );
    }
    L > Z ? me(
      g,
      P,
      V,
      !0,
      !1,
      W
    ) : M(
      E,
      C,
      k,
      P,
      V,
      U,
      $,
      B,
      W
    );
  }, ae = (g, E, C, k, P, V, U, $, B) => {
    let L = 0;
    const Z = E.length;
    let W = g.length - 1, Q = Z - 1;
    for (; L <= W && L <= Q; ) {
      const ee = g[L], te = E[L] = B ? cloneIfMounted(E[L]) : normalizeVNode(E[L]);
      if (isSameVNodeType(ee, te))
        S(
          ee,
          te,
          C,
          null,
          P,
          V,
          U,
          $,
          B
        );
      else
        break;
      L++;
    }
    for (; L <= W && L <= Q; ) {
      const ee = g[W], te = E[Q] = B ? cloneIfMounted(E[Q]) : normalizeVNode(E[Q]);
      if (isSameVNodeType(ee, te))
        S(
          ee,
          te,
          C,
          null,
          P,
          V,
          U,
          $,
          B
        );
      else
        break;
      W--, Q--;
    }
    if (L > W) {
      if (L <= Q) {
        const ee = Q + 1, te = ee < Z ? E[ee].el : k;
        for (; L <= Q; )
          S(
            null,
            E[L] = B ? cloneIfMounted(E[L]) : normalizeVNode(E[L]),
            C,
            te,
            P,
            V,
            U,
            $,
            B
          ), L++;
      }
    } else if (L > Q)
      for (; L <= W; )
        ue(g[L], P, V, !0), L++;
    else {
      const ee = L, te = L, se = /* @__PURE__ */ new Map();
      for (L = te; L <= Q; L++) {
        const he = E[L] = B ? cloneIfMounted(E[L]) : normalizeVNode(E[L]);
        he.key != null && se.set(he.key, L);
      }
      let re, de = 0;
      const le = Q - te + 1;
      let ge = !1, pe = 0;
      const _e = new Array(le);
      for (L = 0; L < le; L++) _e[L] = 0;
      for (L = ee; L <= W; L++) {
        const he = g[L];
        if (de >= le) {
          ue(he, P, V, !0);
          continue;
        }
        let ye;
        if (he.key != null)
          ye = se.get(he.key);
        else
          for (re = te; re <= Q; re++)
            if (_e[re - te] === 0 && isSameVNodeType(he, E[re])) {
              ye = re;
              break;
            }
        ye === void 0 ? ue(he, P, V, !0) : (_e[ye - te] = L + 1, ye >= pe ? pe = ye : ge = !0, S(
          he,
          E[ye],
          C,
          null,
          P,
          V,
          U,
          $,
          B
        ), de++);
      }
      const be = ge ? getSequence(_e) : EMPTY_ARR;
      for (re = be.length - 1, L = le - 1; L >= 0; L--) {
        const he = te + L, ye = E[he], Ce = he + 1 < Z ? E[he + 1].el : k;
        _e[L] === 0 ? S(
          null,
          ye,
          C,
          Ce,
          P,
          V,
          U,
          $,
          B
        ) : ge && (re < 0 || L !== be[re] ? ce(ye, C, Ce, 2) : re--);
      }
    }
  }, ce = (g, E, C, k, P = null) => {
    const { el: V, type: U, transition: $, children: B, shapeFlag: L } = g;
    if (L & 6) {
      ce(g.component.subTree, E, C, k);
      return;
    }
    if (L & 128) {
      g.suspense.move(E, C, k);
      return;
    }
    if (L & 64) {
      U.move(g, E, C, Y);
      return;
    }
    if (U === Fragment) {
      r(V, E, C);
      for (let W = 0; W < B.length; W++)
        ce(B[W], E, C, k);
      r(g.anchor, E, C);
      return;
    }
    if (U === Static) {
      y(g, E, C);
      return;
    }
    if (k !== 2 && L & 1 && $)
      if (k === 0)
        $.beforeEnter(V), r(V, E, C), queuePostRenderEffect(() => $.enter(V), P);
      else {
        const { leave: W, delayLeave: Q, afterLeave: ee } = $, te = () => r(V, E, C), se = () => {
          W(V, () => {
            te(), ee && ee();
          });
        };
        Q ? Q(V, te, se) : se();
      }
    else
      r(V, E, C);
  }, ue = (g, E, C, k = !1, P = !1) => {
    const {
      type: V,
      props: U,
      ref: $,
      children: B,
      dynamicChildren: L,
      shapeFlag: Z,
      patchFlag: W,
      dirs: Q,
      cacheIndex: ee
    } = g;
    if (W === -2 && (P = !1), $ != null && setRef($, null, C, g, !0), ee != null && (E.renderCache[ee] = void 0), Z & 256) {
      E.ctx.deactivate(g);
      return;
    }
    const te = Z & 1 && Q, se = !isAsyncWrapper(g);
    let re;
    if (se && (re = U && U.onVnodeBeforeUnmount) && invokeVNodeHook(re, E, g), Z & 6)
      ve(g.component, C, k);
    else {
      if (Z & 128) {
        g.suspense.unmount(C, k);
        return;
      }
      te && invokeDirectiveHook(g, null, E, "beforeUnmount"), Z & 64 ? g.type.remove(
        g,
        E,
        C,
        Y,
        k
      ) : L && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !L.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (V !== Fragment || W > 0 && W & 64) ? me(
        L,
        E,
        C,
        !1,
        !0
      ) : (V === Fragment && W & 384 || !P && Z & 16) && me(B, E, C), k && Ee(g);
    }
    (se && (re = U && U.onVnodeUnmounted) || te) && queuePostRenderEffect(() => {
      re && invokeVNodeHook(re, E, g), te && invokeDirectiveHook(g, null, E, "unmounted");
    }, C);
  }, Ee = (g) => {
    const { type: E, el: C, anchor: k, transition: P } = g;
    if (E === Fragment) {
      Se(C, k);
      return;
    }
    if (E === Static) {
      _(g);
      return;
    }
    const V = () => {
      s(C), P && !P.persisted && P.afterLeave && P.afterLeave();
    };
    if (g.shapeFlag & 1 && P && !P.persisted) {
      const { leave: U, delayLeave: $ } = P, B = () => U(C, V);
      $ ? $(g.el, V, B) : B();
    } else
      V();
  }, Se = (g, E) => {
    let C;
    for (; g !== E; )
      C = d(g), s(g), g = C;
    s(E);
  }, ve = (g, E, C) => {
    const { bum: k, scope: P, job: V, subTree: U, um: $, m: B, a: L } = g;
    invalidateMount(B), invalidateMount(L), k && invokeArrayFns(k), P.stop(), V && (V.flags |= 8, ue(U, g, E, C)), $ && queuePostRenderEffect($, E), queuePostRenderEffect(() => {
      g.isUnmounted = !0;
    }, E), E && E.pendingBranch && !E.isUnmounted && g.asyncDep && !g.asyncResolved && g.suspenseId === E.pendingId && (E.deps--, E.deps === 0 && E.resolve()), __VUE_PROD_DEVTOOLS__ && devtoolsComponentRemoved(g);
  }, me = (g, E, C, k = !1, P = !1, V = 0) => {
    for (let U = V; U < g.length; U++)
      ue(g[U], E, C, k, P);
  }, w = (g) => {
    if (g.shapeFlag & 6)
      return w(g.component.subTree);
    if (g.shapeFlag & 128)
      return g.suspense.next();
    const E = d(g.anchor || g.el), C = E && E[TeleportEndKey];
    return C ? d(C) : E;
  };
  let q = !1;
  const j = (g, E, C) => {
    g == null ? E._vnode && ue(E._vnode, null, null, !0) : S(
      E._vnode || null,
      g,
      E,
      null,
      null,
      null,
      C
    ), E._vnode = g, q || (q = !0, flushPreFlushCbs(), flushPostFlushCbs(), q = !1);
  }, Y = {
    p: S,
    um: ue,
    m: ce,
    r: Ee,
    mt: G,
    mc: M,
    pc: z,
    pbc: O,
    n: w,
    o: e
  };
  let ne, oe;
  return t && ([ne, oe] = t(
    Y
  )), {
    render: j,
    hydrate: ne,
    createApp: createAppAPI(j, ne)
  };
}
function resolveChildrenNamespace({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function toggleRecurse({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function needTransition(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function traverseStaticChildren(e, t, n = !1) {
  const r = e.children, s = t.children;
  if (isArray$1(r) && isArray$1(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let a = s[i];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[i] = cloneIfMounted(s[i]), a.el = o.el), !n && a.patchFlag !== -2 && traverseStaticChildren(o, a)), a.type === Text && (a.el = o.el);
    }
}
function getSequence(e) {
  const t = e.slice(), n = [0];
  let r, s, i, o, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (s = n[n.length - 1], e[s] < c) {
        t[r] = s, n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        a = i + o >> 1, e[n[a]] < c ? i = a + 1 : o = a;
      c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function locateNonHydratedAsyncRoot(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : locateNonHydratedAsyncRoot(t);
}
function invalidateMount(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const ssrContextKey = Symbol.for("v-scx"), useSSRContext = () => inject(ssrContextKey);
function watchEffect(e, t) {
  return doWatch(e, null, t);
}
function watchPostEffect(e, t) {
  return doWatch(
    e,
    null,
    { flush: "post" }
  );
}
function watchSyncEffect(e, t) {
  return doWatch(
    e,
    null,
    { flush: "sync" }
  );
}
function watch(e, t, n) {
  return doWatch(e, t, n);
}
function doWatch(e, t, n = EMPTY_OBJ) {
  const { immediate: r, deep: s, flush: i, once: o } = n, a = extend({}, n), l = t && r || !t && i !== "post";
  let c;
  if (isInSSRComponentSetup) {
    if (i === "sync") {
      const m = useSSRContext();
      c = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!l) {
      const m = () => {
      };
      return m.stop = NOOP, m.resume = NOOP, m.pause = NOOP, m;
    }
  }
  const f = currentInstance;
  a.call = (m, v, S) => callWithAsyncErrorHandling(m, f, v, S);
  let u = !1;
  i === "post" ? a.scheduler = (m) => {
    queuePostRenderEffect(m, f && f.suspense);
  } : i !== "sync" && (u = !0, a.scheduler = (m, v) => {
    v ? m() : queueJob(m);
  }), a.augmentJob = (m) => {
    t && (m.flags |= 4), u && (m.flags |= 2, f && (m.id = f.uid, m.i = f));
  };
  const d = watch$1(e, t, a);
  return isInSSRComponentSetup && (c ? c.push(d) : l && d()), d;
}
function instanceWatch(e, t, n) {
  const r = this.proxy, s = isString(e) ? e.includes(".") ? createPathGetter(r, e) : () => r[e] : e.bind(r, r);
  let i;
  isFunction(t) ? i = t : (i = t.handler, n = t);
  const o = setCurrentInstance(this), a = doWatch(s, i.bind(r), n);
  return o(), a;
}
function createPathGetter(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function useModel(e, t, n = EMPTY_OBJ) {
  const r = getCurrentInstance(), s = camelize(t), i = hyphenate(t), o = getModelModifiers(e, s), a = customRef((l, c) => {
    let f, u = EMPTY_OBJ, d;
    return watchSyncEffect(() => {
      const m = e[s];
      hasChanged(f, m) && (f = m, c());
    }), {
      get() {
        return l(), n.get ? n.get(f) : f;
      },
      set(m) {
        const v = n.set ? n.set(m) : m;
        if (!hasChanged(v, f) && !(u !== EMPTY_OBJ && hasChanged(m, u)))
          return;
        const S = r.vnode.props;
        S && // check if parent has passed v-model
        (t in S || s in S || i in S) && (`onUpdate:${t}` in S || `onUpdate:${s}` in S || `onUpdate:${i}` in S) || (f = m, c()), r.emit(`update:${t}`, v), hasChanged(m, v) && hasChanged(m, u) && !hasChanged(v, d) && c(), u = m, d = v;
      }
    };
  });
  return a[Symbol.iterator] = () => {
    let l = 0;
    return {
      next() {
        return l < 2 ? { value: l++ ? o || EMPTY_OBJ : a, done: !1 } : { done: !0 };
      }
    };
  }, a;
}
const getModelModifiers = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${camelize(t)}Modifiers`] || e[`${hyphenate(t)}Modifiers`];
function emit(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || EMPTY_OBJ;
  let s = n;
  const i = t.startsWith("update:"), o = i && getModelModifiers(r, t.slice(7));
  o && (o.trim && (s = n.map((f) => isString(f) ? f.trim() : f)), o.number && (s = n.map(looseToNumber))), __VUE_PROD_DEVTOOLS__ && devtoolsComponentEmit(e, t, s);
  let a, l = r[a = toHandlerKey(t)] || // also try camelCase event handler (#2249)
  r[a = toHandlerKey(camelize(t))];
  !l && i && (l = r[a = toHandlerKey(hyphenate(t))]), l && callWithAsyncErrorHandling(
    l,
    e,
    6,
    s
  );
  const c = r[a + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, callWithAsyncErrorHandling(
      c,
      e,
      6,
      s
    );
  }
}
function normalizeEmitsOptions(e, t, n = !1) {
  const r = t.emitsCache, s = r.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let o = {}, a = !1;
  if (__VUE_OPTIONS_API__ && !isFunction(e)) {
    const l = (c) => {
      const f = normalizeEmitsOptions(c, t, !0);
      f && (a = !0, extend(o, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !a ? (isObject(e) && r.set(e, null), null) : (isArray$1(i) ? i.forEach((l) => o[l] = null) : extend(o, i), isObject(e) && r.set(e, o), o);
}
function isEmitListener(e, t) {
  return !e || !isOn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), hasOwn(e, t[0].toLowerCase() + t.slice(1)) || hasOwn(e, hyphenate(t)) || hasOwn(e, t));
}
function markAttrsAccessed() {
}
function renderComponentRoot(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    propsOptions: [i],
    slots: o,
    attrs: a,
    emit: l,
    render: c,
    renderCache: f,
    props: u,
    data: d,
    setupState: m,
    ctx: v,
    inheritAttrs: S
  } = e, I = setCurrentRenderingInstance(e);
  let A, T;
  try {
    if (n.shapeFlag & 4) {
      const _ = s || r, b = _;
      A = normalizeVNode(
        c.call(
          b,
          _,
          f,
          u,
          m,
          d,
          v
        )
      ), T = a;
    } else {
      const _ = t;
      A = normalizeVNode(
        _.length > 1 ? _(
          u,
          { attrs: a, slots: o, emit: l }
        ) : _(
          u,
          null
        )
      ), T = t.props ? a : getFunctionalFallthrough(a);
    }
  } catch (_) {
    blockStack.length = 0, handleError(_, e, 1), A = createVNode(Comment);
  }
  let y = A;
  if (T && S !== !1) {
    const _ = Object.keys(T), { shapeFlag: b } = y;
    _.length && b & 7 && (i && _.some(isModelListener) && (T = filterModelListeners(
      T,
      i
    )), y = cloneVNode(y, T, !1, !0));
  }
  return n.dirs && (y = cloneVNode(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && setTransitionHooks(y, n.transition), A = y, setCurrentRenderingInstance(I), A;
}
function filterSingleRoot(e, t = !0) {
  let n;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (isVNode(s)) {
      if (s.type !== Comment || s.children === "v-if") {
        if (n)
          return;
        n = s;
      }
    } else
      return;
  }
  return n;
}
const getFunctionalFallthrough = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || isOn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, filterModelListeners = (e, t) => {
  const n = {};
  for (const r in e)
    (!isModelListener(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function shouldUpdateComponent(e, t, n) {
  const { props: r, children: s, component: i } = e, { props: o, children: a, patchFlag: l } = t, c = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return r ? hasPropsChanged(r, o, c) : !!o;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let u = 0; u < f.length; u++) {
        const d = f[u];
        if (o[d] !== r[d] && !isEmitListener(c, d))
          return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable) ? !0 : r === o ? !1 : r ? o ? hasPropsChanged(r, o, c) : !0 : !!o;
  return !1;
}
function hasPropsChanged(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !isEmitListener(n, i))
      return !0;
  }
  return !1;
}
function updateHOCHostEl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const isSuspense = (e) => e.__isSuspense;
let suspenseId = 0;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: !0,
  process(e, t, n, r, s, i, o, a, l, c) {
    if (e == null)
      mountSuspense(
        t,
        n,
        r,
        s,
        i,
        o,
        a,
        l,
        c
      );
    else {
      if (i && i.deps > 0 && !e.suspense.isInFallback) {
        t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
        return;
      }
      patchSuspense(
        e,
        t,
        n,
        r,
        s,
        o,
        a,
        l,
        c
      );
    }
  },
  hydrate: hydrateSuspense,
  normalize: normalizeSuspenseChildren
}, Suspense = SuspenseImpl;
function triggerEvent(e, t) {
  const n = e.props && e.props[t];
  isFunction(n) && n();
}
function mountSuspense(e, t, n, r, s, i, o, a, l) {
  const {
    p: c,
    o: { createElement: f }
  } = l, u = f("div"), d = e.suspense = createSuspenseBoundary(
    e,
    s,
    r,
    t,
    u,
    n,
    i,
    o,
    a,
    l
  );
  c(
    null,
    d.pendingBranch = e.ssContent,
    u,
    null,
    r,
    d,
    i,
    o
  ), d.deps > 0 ? (triggerEvent(e, "onPending"), triggerEvent(e, "onFallback"), c(
    null,
    e.ssFallback,
    t,
    n,
    r,
    null,
    // fallback tree will not have suspense context
    i,
    o
  ), setActiveBranch(d, e.ssFallback)) : d.resolve(!1, !0);
}
function patchSuspense(e, t, n, r, s, i, o, a, { p: l, um: c, o: { createElement: f } }) {
  const u = t.suspense = e.suspense;
  u.vnode = t, t.el = e.el;
  const d = t.ssContent, m = t.ssFallback, { activeBranch: v, pendingBranch: S, isInFallback: I, isHydrating: A } = u;
  if (S)
    u.pendingBranch = d, isSameVNodeType(d, S) ? (l(
      S,
      d,
      u.hiddenContainer,
      null,
      s,
      u,
      i,
      o,
      a
    ), u.deps <= 0 ? u.resolve() : I && (A || (l(
      v,
      m,
      n,
      r,
      s,
      null,
      // fallback tree will not have suspense context
      i,
      o,
      a
    ), setActiveBranch(u, m)))) : (u.pendingId = suspenseId++, A ? (u.isHydrating = !1, u.activeBranch = S) : c(S, s, u), u.deps = 0, u.effects.length = 0, u.hiddenContainer = f("div"), I ? (l(
      null,
      d,
      u.hiddenContainer,
      null,
      s,
      u,
      i,
      o,
      a
    ), u.deps <= 0 ? u.resolve() : (l(
      v,
      m,
      n,
      r,
      s,
      null,
      // fallback tree will not have suspense context
      i,
      o,
      a
    ), setActiveBranch(u, m))) : v && isSameVNodeType(d, v) ? (l(
      v,
      d,
      n,
      r,
      s,
      u,
      i,
      o,
      a
    ), u.resolve(!0)) : (l(
      null,
      d,
      u.hiddenContainer,
      null,
      s,
      u,
      i,
      o,
      a
    ), u.deps <= 0 && u.resolve()));
  else if (v && isSameVNodeType(d, v))
    l(
      v,
      d,
      n,
      r,
      s,
      u,
      i,
      o,
      a
    ), setActiveBranch(u, d);
  else if (triggerEvent(t, "onPending"), u.pendingBranch = d, d.shapeFlag & 512 ? u.pendingId = d.component.suspenseId : u.pendingId = suspenseId++, l(
    null,
    d,
    u.hiddenContainer,
    null,
    s,
    u,
    i,
    o,
    a
  ), u.deps <= 0)
    u.resolve();
  else {
    const { timeout: T, pendingId: y } = u;
    T > 0 ? setTimeout(() => {
      u.pendingId === y && u.fallback(m);
    }, T) : T === 0 && u.fallback(m);
  }
}
function createSuspenseBoundary(e, t, n, r, s, i, o, a, l, c, f = !1) {
  const {
    p: u,
    m: d,
    um: m,
    n: v,
    o: { parentNode: S, remove: I }
  } = c;
  let A;
  const T = isVNodeSuspensible(e);
  T && t && t.pendingBranch && (A = t.pendingId, t.deps++);
  const y = e.props ? toNumber(e.props.timeout) : void 0, _ = i, b = {
    vnode: e,
    parent: t,
    parentComponent: n,
    namespace: o,
    container: r,
    hiddenContainer: s,
    deps: 0,
    pendingId: suspenseId++,
    timeout: typeof y == "number" ? y : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !f,
    isHydrating: f,
    isUnmounted: !1,
    effects: [],
    resolve(x = !1, D = !1) {
      const {
        vnode: M,
        activeBranch: R,
        pendingBranch: O,
        pendingId: H,
        effects: N,
        parentComponent: F,
        container: G
      } = b;
      let J = !1;
      b.isHydrating ? b.isHydrating = !1 : x || (J = R && O.transition && O.transition.mode === "out-in", J && (R.transition.afterLeave = () => {
        H === b.pendingId && (d(
          O,
          G,
          i === _ ? v(R) : i,
          0
        ), queuePostFlushCb(N));
      }), R && (S(R.el) === G && (i = v(R)), m(R, F, b, !0)), J || d(O, G, i, 0)), setActiveBranch(b, O), b.pendingBranch = null, b.isInFallback = !1;
      let K = b.parent, X = !1;
      for (; K; ) {
        if (K.pendingBranch) {
          K.effects.push(...N), X = !0;
          break;
        }
        K = K.parent;
      }
      !X && !J && queuePostFlushCb(N), b.effects = [], T && t && t.pendingBranch && A === t.pendingId && (t.deps--, t.deps === 0 && !D && t.resolve()), triggerEvent(M, "onResolve");
    },
    fallback(x) {
      if (!b.pendingBranch)
        return;
      const { vnode: D, activeBranch: M, parentComponent: R, container: O, namespace: H } = b;
      triggerEvent(D, "onFallback");
      const N = v(M), F = () => {
        b.isInFallback && (u(
          null,
          x,
          O,
          N,
          R,
          null,
          // fallback tree will not have suspense context
          H,
          a,
          l
        ), setActiveBranch(b, x));
      }, G = x.transition && x.transition.mode === "out-in";
      G && (M.transition.afterLeave = F), b.isInFallback = !0, m(
        M,
        R,
        null,
        // no suspense so unmount hooks fire now
        !0
        // shouldRemove
      ), G || F();
    },
    move(x, D, M) {
      b.activeBranch && d(b.activeBranch, x, D, M), b.container = x;
    },
    next() {
      return b.activeBranch && v(b.activeBranch);
    },
    registerDep(x, D, M) {
      const R = !!b.pendingBranch;
      R && b.deps++;
      const O = x.vnode.el;
      x.asyncDep.catch((H) => {
        handleError(H, x, 0);
      }).then((H) => {
        if (x.isUnmounted || b.isUnmounted || b.pendingId !== x.suspenseId)
          return;
        x.asyncResolved = !0;
        const { vnode: N } = x;
        handleSetupResult(x, H, !1), O && (N.el = O);
        const F = !O && x.subTree.el;
        D(
          x,
          N,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          S(O || x.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          O ? null : v(x.subTree),
          b,
          o,
          M
        ), F && I(F), updateHOCHostEl(x, N.el), R && --b.deps === 0 && b.resolve();
      });
    },
    unmount(x, D) {
      b.isUnmounted = !0, b.activeBranch && m(
        b.activeBranch,
        n,
        x,
        D
      ), b.pendingBranch && m(
        b.pendingBranch,
        n,
        x,
        D
      );
    }
  };
  return b;
}
function hydrateSuspense(e, t, n, r, s, i, o, a, l) {
  const c = t.suspense = createSuspenseBoundary(
    t,
    r,
    n,
    e.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    s,
    i,
    o,
    a,
    !0
  ), f = l(
    e,
    c.pendingBranch = t.ssContent,
    n,
    c,
    i,
    o
  );
  return c.deps === 0 && c.resolve(!1, !0), f;
}
function normalizeSuspenseChildren(e) {
  const { shapeFlag: t, children: n } = e, r = t & 32;
  e.ssContent = normalizeSuspenseSlot(
    r ? n.default : n
  ), e.ssFallback = r ? normalizeSuspenseSlot(n.fallback) : createVNode(Comment);
}
function normalizeSuspenseSlot(e) {
  let t;
  if (isFunction(e)) {
    const n = isBlockTreeEnabled && e._c;
    n && (e._d = !1, openBlock()), e = e(), n && (e._d = !0, t = currentBlock, closeBlock());
  }
  return isArray$1(e) && (e = filterSingleRoot(e)), e = normalizeVNode(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)), e;
}
function queueEffectWithSuspense(e, t) {
  t && t.pendingBranch ? isArray$1(e) ? t.effects.push(...e) : t.effects.push(e) : queuePostFlushCb(e);
}
function setActiveBranch(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e;
  let s = t.el;
  for (; !s && t.component; )
    t = t.component.subTree, s = t.el;
  n.el = s, r && r.subTree === n && (r.vnode.el = s, updateHOCHostEl(r, s));
}
function isVNodeSuspensible(e) {
  const t = e.props && e.props.suspensible;
  return t != null && t !== !1;
}
const Fragment = Symbol.for("v-fgt"), Text = Symbol.for("v-txt"), Comment = Symbol.for("v-cmt"), Static = Symbol.for("v-stc"), blockStack = [];
let currentBlock = null;
function openBlock(e = !1) {
  blockStack.push(currentBlock = e ? null : []);
}
function closeBlock() {
  blockStack.pop(), currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(e, t = !1) {
  isBlockTreeEnabled += e, e < 0 && currentBlock && t && (currentBlock.hasOnce = !0);
}
function setupBlock(e) {
  return e.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null, closeBlock(), isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(e), e;
}
function createElementBlock(e, t, n, r, s, i) {
  return setupBlock(
    createBaseVNode(
      e,
      t,
      n,
      r,
      s,
      i,
      !0
    )
  );
}
function createBlock(e, t, n, r, s) {
  return setupBlock(
    createVNode(
      e,
      t,
      n,
      r,
      s,
      !0
    )
  );
}
function isVNode(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function isSameVNodeType(e, t) {
  return e.type === t.type && e.key === t.key;
}
function transformVNodeArgs(e) {
}
const normalizeKey = ({ key: e }) => e ?? null, normalizeRef = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? isString(e) || isRef(e) || isFunction(e) ? { i: currentRenderingInstance, r: e, k: t, f: !!n } : e : null);
function createBaseVNode(e, t = null, n = null, r = 0, s = null, i = e === Fragment ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && normalizeKey(t),
    ref: t && normalizeRef(t),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  return a ? (normalizeChildren(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= isString(n) ? 8 : 16), isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && currentBlock.push(l), l;
}
const createVNode = _createVNode;
function _createVNode(e, t = null, n = null, r = 0, s = null, i = !1) {
  if ((!e || e === NULL_DYNAMIC_COMPONENT) && (e = Comment), isVNode(e)) {
    const a = cloneVNode(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && normalizeChildren(a, n), isBlockTreeEnabled > 0 && !i && currentBlock && (a.shapeFlag & 6 ? currentBlock[currentBlock.indexOf(e)] = a : currentBlock.push(a)), a.patchFlag = -2, a;
  }
  if (isClassComponent(e) && (e = e.__vccOpts), t) {
    t = guardReactiveProps(t);
    let { class: a, style: l } = t;
    a && !isString(a) && (t.class = normalizeClass(a)), isObject(l) && (isProxy(l) && !isArray$1(l) && (l = extend({}, l)), t.style = normalizeStyle(l));
  }
  const o = isString(e) ? 1 : isSuspense(e) ? 128 : isTeleport(e) ? 64 : isObject(e) ? 4 : isFunction(e) ? 2 : 0;
  return createBaseVNode(
    e,
    t,
    n,
    r,
    s,
    o,
    i,
    !0
  );
}
function guardReactiveProps(e) {
  return e ? isProxy(e) || isInternalObject(e) ? extend({}, e) : e : null;
}
function cloneVNode(e, t, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: o, children: a, transition: l } = e, c = t ? mergeProps(s || {}, t) : s, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && normalizeKey(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? isArray$1(i) ? i.concat(normalizeRef(t)) : [i, normalizeRef(t)] : normalizeRef(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Fragment ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && cloneVNode(e.ssContent),
    ssFallback: e.ssFallback && cloneVNode(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && r && setTransitionHooks(
    f,
    l.clone(f)
  ), f;
}
function createTextVNode(e = " ", t = 0) {
  return createVNode(Text, null, e, t);
}
function createStaticVNode(e, t) {
  const n = createVNode(Static, null, e);
  return n.staticCount = t, n;
}
function createCommentVNode(e = "", t = !1) {
  return t ? (openBlock(), createBlock(Comment, null, e)) : createVNode(Comment, null, e);
}
function normalizeVNode(e) {
  return e == null || typeof e == "boolean" ? createVNode(Comment) : isArray$1(e) ? createVNode(
    Fragment,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : isVNode(e) ? cloneIfMounted(e) : createVNode(Text, null, String(e));
}
function cloneIfMounted(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : cloneVNode(e);
}
function normalizeChildren(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (isArray$1(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), normalizeChildren(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !isInternalObject(t) ? t._ctx = currentRenderingInstance : s === 3 && currentRenderingInstance && (currentRenderingInstance.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else isFunction(t) ? (t = { default: t, _ctx: currentRenderingInstance }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [createTextVNode(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function mergeProps(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = normalizeClass([t.class, r.class]));
      else if (s === "style")
        t.style = normalizeStyle([t.style, r.style]);
      else if (isOn(s)) {
        const i = t[s], o = r[s];
        o && i !== o && !(isArray$1(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function invokeVNodeHook(e, t, n, r = null) {
  callWithAsyncErrorHandling(e, t, 7, [
    n,
    r
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(e, t, n) {
  const r = e.type, s = (t ? t.appContext : e.appContext) || emptyAppContext, i = {
    uid: uid++,
    vnode: e,
    type: r,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(r, s),
    emitsOptions: normalizeEmitsOptions(r, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = emit.bind(null, i), e.ce && e.ce(i), i;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance, setInSSRSetupState;
{
  const e = getGlobalThis(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  internalSetCurrentInstance = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => currentInstance = n
  ), setInSSRSetupState = t(
    "__VUE_SSR_SETTERS__",
    (n) => isInSSRComponentSetup = n
  );
}
const setCurrentInstance = (e) => {
  const t = currentInstance;
  return internalSetCurrentInstance(e), e.scope.on(), () => {
    e.scope.off(), internalSetCurrentInstance(t);
  };
}, unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off(), internalSetCurrentInstance(null);
};
function isStatefulComponent(e) {
  return e.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = !1;
function setupComponent(e, t = !1, n = !1) {
  t && setInSSRSetupState(t);
  const { props: r, children: s } = e.vnode, i = isStatefulComponent(e);
  initProps(e, r, i, t), initSlots(e, s, n);
  const o = i ? setupStatefulComponent(e, t) : void 0;
  return t && setInSSRSetupState(!1), o;
}
function setupStatefulComponent(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, PublicInstanceProxyHandlers);
  const { setup: r } = n;
  if (r) {
    pauseTracking();
    const s = e.setupContext = r.length > 1 ? createSetupContext(e) : null, i = setCurrentInstance(e), o = callWithErrorHandling(
      r,
      e,
      0,
      [
        e.props,
        s
      ]
    ), a = isPromise(o);
    if (resetTracking(), i(), (a || e.sp) && !isAsyncWrapper(e) && markAsyncBoundary(e), a) {
      if (o.then(unsetCurrentInstance, unsetCurrentInstance), t)
        return o.then((l) => {
          handleSetupResult(e, l, t);
        }).catch((l) => {
          handleError(l, e, 0);
        });
      e.asyncDep = o;
    } else
      handleSetupResult(e, o, t);
  } else
    finishComponentSetup(e, t);
}
function handleSetupResult(e, t, n) {
  isFunction(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : isObject(t) && (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = t), e.setupState = proxyRefs(t)), finishComponentSetup(e, n);
}
let compile$1, installWithProxy;
function registerRuntimeCompiler(e) {
  compile$1 = e, installWithProxy = (t) => {
    t.render._rc && (t.withProxy = new Proxy(t.ctx, RuntimeCompiledPublicInstanceProxyHandlers));
  };
}
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && compile$1 && !r.render) {
      const s = r.template || __VUE_OPTIONS_API__ && resolveMergedOptions(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: a, compilerOptions: l } = r, c = extend(
          extend(
            {
              isCustomElement: i,
              delimiters: a
            },
            o
          ),
          l
        );
        r.render = compile$1(s, c);
      }
    }
    e.render = r.render || NOOP, installWithProxy && installWithProxy(e);
  }
  if (__VUE_OPTIONS_API__) {
    const s = setCurrentInstance(e);
    pauseTracking();
    try {
      applyOptions(e);
    } finally {
      resetTracking(), s();
    }
  }
}
const attrsProxyHandlers = {
  get(e, t) {
    return track(e, "get", ""), e[t];
  }
};
function createSetupContext(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, attrsProxyHandlers),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function getComponentPublicInstance(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(proxyRefs(markRaw(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in publicPropertiesMap)
        return publicPropertiesMap[n](e);
    },
    has(t, n) {
      return n in t || n in publicPropertiesMap;
    }
  })) : e.proxy;
}
const classifyRE = /(?:^|[-_])(\w)/g, classify = (e) => e.replace(classifyRE, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(e, t = !0) {
  return isFunction(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function formatComponentName(e, t, n = !1) {
  let r = getComponentName(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (i) => {
      for (const o in i)
        if (i[o] === t)
          return o;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? classify(r) : n ? "App" : "Anonymous";
}
function isClassComponent(e) {
  return isFunction(e) && "__vccOpts" in e;
}
const computed = (e, t) => computed$1(e, t, isInSSRComponentSetup);
function h(e, t, n) {
  const r = arguments.length;
  return r === 2 ? isObject(t) && !isArray$1(t) ? isVNode(t) ? createVNode(e, null, [t]) : createVNode(e, t) : createVNode(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && isVNode(n) && (n = [n]), createVNode(e, t, n));
}
function initCustomFormatter() {
}
function withMemo(e, t, n, r) {
  const s = n[r];
  if (s && isMemoSame(s, e))
    return s;
  const i = t();
  return i.memo = e.slice(), i.cacheIndex = r, n[r] = i;
}
function isMemoSame(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let r = 0; r < n.length; r++)
    if (hasChanged(n[r], t[r]))
      return !1;
  return isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(e), !0;
}
const version = "3.5.13", warn = NOOP, ErrorTypeStrings = ErrorTypeStrings$1, devtools = devtools$1, setDevtoolsHook = setDevtoolsHook$1, _ssrUtils = {
  createComponentInstance,
  setupComponent,
  renderComponentRoot,
  setCurrentRenderingInstance,
  isVNode,
  normalizeVNode,
  getComponentPublicInstance,
  ensureValidVNode,
  pushWarningContext,
  popWarningContext
}, ssrUtils = _ssrUtils, resolveFilter = null, compatUtils = null, DeprecationTypes = null;
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy;
const tt = typeof window < "u" && window.trustedTypes;
if (tt)
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const unsafeToTrustedHTML = policy ? (e) => policy.createHTML(e) : (e) => e, svgNS = "http://www.w3.org/2000/svg", mathmlNS = "http://www.w3.org/1998/Math/MathML", doc = typeof document < "u" ? document : null, templateContainer = doc && /* @__PURE__ */ doc.createElement("template"), nodeOps = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const s = t === "svg" ? doc.createElementNS(svgNS, e) : t === "mathml" ? doc.createElementNS(mathmlNS, e) : n ? doc.createElement(e, { is: n }) : doc.createElement(e);
    return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (e) => doc.createTextNode(e),
  createComment: (e) => doc.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => doc.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, s, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const a = templateContainer.content;
      if (r === "svg" || r === "mathml") {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, TRANSITION$1 = "transition", ANIMATION = "animation", vtcKey = Symbol("_vtc"), DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, TransitionPropsValidators = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
), decorate$1 = (e) => (e.displayName = "Transition", e.props = TransitionPropsValidators, e), Transition = /* @__PURE__ */ decorate$1(
  (e, { slots: t }) => h(BaseTransition, resolveTransitionProps(e), t)
), callHook = (e, t = []) => {
  isArray$1(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, hasExplicitCallback = (e) => e ? isArray$1(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function resolveTransitionProps(e) {
  const t = {};
  for (const N in e)
    N in DOMTransitionPropsValidators || (t[N] = e[N]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: r,
    duration: s,
    enterFromClass: i = `${n}-enter-from`,
    enterActiveClass: o = `${n}-enter-active`,
    enterToClass: a = `${n}-enter-to`,
    appearFromClass: l = i,
    appearActiveClass: c = o,
    appearToClass: f = a,
    leaveFromClass: u = `${n}-leave-from`,
    leaveActiveClass: d = `${n}-leave-active`,
    leaveToClass: m = `${n}-leave-to`
  } = e, v = normalizeDuration(s), S = v && v[0], I = v && v[1], {
    onBeforeEnter: A,
    onEnter: T,
    onEnterCancelled: y,
    onLeave: _,
    onLeaveCancelled: b,
    onBeforeAppear: x = A,
    onAppear: D = T,
    onAppearCancelled: M = y
  } = t, R = (N, F, G, J) => {
    N._enterCancelled = J, removeTransitionClass(N, F ? f : a), removeTransitionClass(N, F ? c : o), G && G();
  }, O = (N, F) => {
    N._isLeaving = !1, removeTransitionClass(N, u), removeTransitionClass(N, m), removeTransitionClass(N, d), F && F();
  }, H = (N) => (F, G) => {
    const J = N ? D : T, K = () => R(F, N, G);
    callHook(J, [F, K]), nextFrame(() => {
      removeTransitionClass(F, N ? l : i), addTransitionClass(F, N ? f : a), hasExplicitCallback(J) || whenTransitionEnds(F, r, S, K);
    });
  };
  return extend(t, {
    onBeforeEnter(N) {
      callHook(A, [N]), addTransitionClass(N, i), addTransitionClass(N, o);
    },
    onBeforeAppear(N) {
      callHook(x, [N]), addTransitionClass(N, l), addTransitionClass(N, c);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(N, F) {
      N._isLeaving = !0;
      const G = () => O(N, F);
      addTransitionClass(N, u), N._enterCancelled ? (addTransitionClass(N, d), forceReflow()) : (forceReflow(), addTransitionClass(N, d)), nextFrame(() => {
        N._isLeaving && (removeTransitionClass(N, u), addTransitionClass(N, m), hasExplicitCallback(_) || whenTransitionEnds(N, r, I, G));
      }), callHook(_, [N, G]);
    },
    onEnterCancelled(N) {
      R(N, !1, void 0, !0), callHook(y, [N]);
    },
    onAppearCancelled(N) {
      R(N, !0, void 0, !0), callHook(M, [N]);
    },
    onLeaveCancelled(N) {
      O(N), callHook(b, [N]);
    }
  });
}
function normalizeDuration(e) {
  if (e == null)
    return null;
  if (isObject(e))
    return [NumberOf(e.enter), NumberOf(e.leave)];
  {
    const t = NumberOf(e);
    return [t, t];
  }
}
function NumberOf(e) {
  return toNumber(e);
}
function addTransitionClass(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[vtcKey] || (e[vtcKey] = /* @__PURE__ */ new Set())).add(t);
}
function removeTransitionClass(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[vtcKey];
  n && (n.delete(t), n.size || (e[vtcKey] = void 0));
}
function nextFrame(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let endId = 0;
function whenTransitionEnds(e, t, n, r) {
  const s = e._endId = ++endId, i = () => {
    s === e._endId && r();
  };
  if (n != null)
    return setTimeout(i, n);
  const { type: o, timeout: a, propCount: l } = getTransitionInfo(e, t);
  if (!o)
    return r();
  const c = o + "end";
  let f = 0;
  const u = () => {
    e.removeEventListener(c, d), i();
  }, d = (m) => {
    m.target === e && ++f >= l && u();
  };
  setTimeout(() => {
    f < l && u();
  }, a + 1), e.addEventListener(c, d);
}
function getTransitionInfo(e, t) {
  const n = window.getComputedStyle(e), r = (v) => (n[v] || "").split(", "), s = r(`${TRANSITION$1}Delay`), i = r(`${TRANSITION$1}Duration`), o = getTimeout(s, i), a = r(`${ANIMATION}Delay`), l = r(`${ANIMATION}Duration`), c = getTimeout(a, l);
  let f = null, u = 0, d = 0;
  t === TRANSITION$1 ? o > 0 && (f = TRANSITION$1, u = o, d = i.length) : t === ANIMATION ? c > 0 && (f = ANIMATION, u = c, d = l.length) : (u = Math.max(o, c), f = u > 0 ? o > c ? TRANSITION$1 : ANIMATION : null, d = f ? f === TRANSITION$1 ? i.length : l.length : 0);
  const m = f === TRANSITION$1 && /\b(transform|all)(,|$)/.test(
    r(`${TRANSITION$1}Property`).toString()
  );
  return {
    type: f,
    timeout: u,
    propCount: d,
    hasTransform: m
  };
}
function getTimeout(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => toMs(n) + toMs(e[r])));
}
function toMs(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
function patchClass(e, t, n) {
  const r = e[vtcKey];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const vShowOriginalDisplay = Symbol("_vod"), vShowHidden = Symbol("_vsh"), vShow = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[vShowOriginalDisplay] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : setDisplay(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), setDisplay(e, !0), r.enter(e)) : r.leave(e, () => {
      setDisplay(e, !1);
    }) : setDisplay(e, t));
  },
  beforeUnmount(e, { value: t }) {
    setDisplay(e, t);
  }
};
function setDisplay(e, t) {
  e.style.display = t ? e[vShowOriginalDisplay] : "none", e[vShowHidden] = !t;
}
function initVShowForSSR() {
  vShow.getSSRProps = ({ value: e }) => {
    if (!e)
      return { style: { display: "none" } };
  };
}
const CSS_VAR_TEXT = Symbol("");
function useCssVars(e) {
  const t = getCurrentInstance();
  if (!t)
    return;
  const n = t.ut = (s = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((i) => setVarsOnNode(i, s));
  }, r = () => {
    const s = e(t.proxy);
    t.ce ? setVarsOnNode(t.ce, s) : setVarsOnVNode(t.subTree, s), n(s);
  };
  onBeforeUpdate(() => {
    queuePostFlushCb(r);
  }), onMounted(() => {
    watch(r, NOOP, { flush: "post" });
    const s = new MutationObserver(r);
    s.observe(t.subTree.el.parentNode, { childList: !0 }), onUnmounted(() => s.disconnect());
  });
}
function setVarsOnVNode(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      setVarsOnVNode(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    setVarsOnNode(e.el, t);
  else if (e.type === Fragment)
    e.children.forEach((n) => setVarsOnVNode(n, t));
  else if (e.type === Static) {
    let { el: n, anchor: r } = e;
    for (; n && (setVarsOnNode(n, t), n !== r); )
      n = n.nextSibling;
  }
}
function setVarsOnNode(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let r = "";
    for (const s in t)
      n.setProperty(`--${s}`, t[s]), r += `--${s}: ${t[s]};`;
    n[CSS_VAR_TEXT] = r;
  }
}
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(e, t, n) {
  const r = e.style, s = isString(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (isString(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          n[a] == null && setStyle(r, a, "");
        }
      else
        for (const o in t)
          n[o] == null && setStyle(r, o, "");
    for (const o in n)
      o === "display" && (i = !0), setStyle(r, o, n[o]);
  } else if (s) {
    if (t !== n) {
      const o = r[CSS_VAR_TEXT];
      o && (n += ";" + o), r.cssText = n, i = displayRE.test(n);
    }
  } else t && e.removeAttribute("style");
  vShowOriginalDisplay in e && (e[vShowOriginalDisplay] = i ? r.display : "", e[vShowHidden] && (r.display = "none"));
}
const importantRE = /\s*!important$/;
function setStyle(e, t, n) {
  if (isArray$1(n))
    n.forEach((r) => setStyle(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = autoPrefix(e, t);
    importantRE.test(n) ? e.setProperty(
      hyphenate(r),
      n.replace(importantRE, ""),
      "important"
    ) : e[r] = n;
  }
}
const prefixes = ["Webkit", "Moz", "ms"], prefixCache = {};
function autoPrefix(e, t) {
  const n = prefixCache[t];
  if (n)
    return n;
  let r = camelize(t);
  if (r !== "filter" && r in e)
    return prefixCache[t] = r;
  r = capitalize(r);
  for (let s = 0; s < prefixes.length; s++) {
    const i = prefixes[s] + r;
    if (i in e)
      return prefixCache[t] = i;
  }
  return t;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(e, t, n, r, s, i = isSpecialBooleanAttr(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(xlinkNS, t.slice(6, t.length)) : e.setAttributeNS(xlinkNS, t, n) : n == null || i && !includeBooleanAttr(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : isSymbol(n) ? String(n) : n
  );
}
function patchDOMProp(e, t, n, r, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? unsafeToTrustedHTML(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const a = i === "OPTION" ? e.getAttribute("value") || "" : e.value, l = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (a !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = includeBooleanAttr(n) : n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function addEventListener(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function removeEventListener(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const veiKey = Symbol("_vei");
function patchEvent(e, t, n, r, s = null) {
  const i = e[veiKey] || (e[veiKey] = {}), o = i[t];
  if (r && o)
    o.value = r;
  else {
    const [a, l] = parseName(t);
    if (r) {
      const c = i[t] = createInvoker(
        r,
        s
      );
      addEventListener(e, a, c, l);
    } else o && (removeEventListener(e, a, o, l), i[t] = void 0);
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(e) {
  let t;
  if (optionsModifierRE.test(e)) {
    t = {};
    let r;
    for (; r = e.match(optionsModifierRE); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : hyphenate(e.slice(2)), t];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve(), getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = getNow(), n;
}
function patchStopImmediatePropagation(e, t) {
  if (isArray$1(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (r) => (s) => !s._stopped && r && r(s)
    );
  } else
    return t;
}
const isNativeOn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, patchProp = (e, t, n, r, s, i) => {
  const o = s === "svg";
  t === "class" ? patchClass(e, r, o) : t === "style" ? patchStyle(e, n, r) : isOn(t) ? isModelListener(t) || patchEvent(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : shouldSetAsProp(e, t, r, o)) ? (patchDOMProp(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && patchAttr(e, t, r, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !isString(r)) ? patchDOMProp(e, camelize(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), patchAttr(e, t, r, o));
};
function shouldSetAsProp(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && isNativeOn(t) && isFunction(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return isNativeOn(t) && isString(n) ? !1 : t in e;
}
const REMOVAL = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineCustomElement(e, t, n) {
  const r = /* @__PURE__ */ defineComponent(e, t);
  isPlainObject(r) && extend(r, t);
  class s extends VueElement {
    constructor(o) {
      super(r, o, n);
    }
  }
  return s.def = r, s;
}
/*! #__NO_SIDE_EFFECTS__ */
const defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */ (e, t) => /* @__PURE__ */ defineCustomElement(e, t, createSSRApp), BaseClass = typeof HTMLElement < "u" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(t, n = {}, r = createApp) {
    super(), this._def = t, this._props = n, this._createApp = r, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && r !== createApp ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this, this._def.__asyncLoader || this._resolveProps(this._def);
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof VueElement) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? (this._setParent(), this._update()) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._instance.provides = t._instance.provides);
  }
  disconnectedCallback() {
    this._connected = !1, nextTick(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const s of r)
        this._setAttr(s.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (r, s = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: i, styles: o } = r;
      let a;
      if (i && !isArray$1(i))
        for (const l in i) {
          const c = i[l];
          (c === Number || c && c.type === Number) && (l in this._props && (this._props[l] = toNumber(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[camelize(l)] = !0);
        }
      this._numberProps = a, s && this._resolveProps(r), this.shadowRoot && this._applyStyles(o), this._mount(r);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then(
      (r) => t(this._def = r, !0)
    ) : t(this._def);
  }
  _mount(t) {
    __VUE_PROD_DEVTOOLS__ && !t.name && (t.name = "VueElement"), this._app = this._createApp(t), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const r in n)
        hasOwn(this, r) || Object.defineProperty(this, r, {
          // unwrap ref to be consistent with public instance behavior
          get: () => unref(n[r])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, r = isArray$1(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && r.includes(s) && this._setProp(s, this[s]);
    for (const s of r.map(camelize))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(i) {
          this._setProp(s, i, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const n = this.hasAttribute(t);
    let r = n ? this.getAttribute(t) : REMOVAL;
    const s = camelize(t);
    n && this._numberProps && this._numberProps[s] && (r = toNumber(r)), this._setProp(s, r, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, r = !0, s = !1) {
    if (n !== this._props[t] && (n === REMOVAL ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), s && this._instance && this._update(), r)) {
      const i = this._ob;
      i && i.disconnect(), n === !0 ? this.setAttribute(hyphenate(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(hyphenate(t), n + "") : n || this.removeAttribute(hyphenate(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    render(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = createVNode(this._def, extend(t, this._props));
    return this._instance || (n.ce = (r) => {
      this._instance = r, r.ce = this, r.isCE = !0;
      const s = (i, o) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            isPlainObject(o[0]) ? extend({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      r.emit = (i, ...o) => {
        s(i, o), hyphenate(i) !== i && s(hyphenate(i), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const r = this._nonce;
    for (let s = t.length - 1; s >= 0; s--) {
      const i = document.createElement("style");
      r && i.setAttribute("nonce", r), i.textContent = t[s], this.shadowRoot.prepend(i);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const r = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[r] || (t[r] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let r = 0; r < t.length; r++) {
      const s = t[r], i = s.getAttribute("name") || "default", o = this._slots[i], a = s.parentNode;
      if (o)
        for (const l of o) {
          if (n && l.nodeType === 1) {
            const c = n + "-s", f = document.createTreeWalker(l, 1);
            l.setAttribute(c, "");
            let u;
            for (; u = f.nextNode(); )
              u.setAttribute(c, "");
          }
          a.insertBefore(l, s);
        }
      else
        for (; s.firstChild; ) a.insertBefore(s.firstChild, s);
      a.removeChild(s);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
function useHost(e) {
  const t = getCurrentInstance(), n = t && t.ce;
  return n || null;
}
function useShadowRoot() {
  const e = useHost();
  return e && e.shadowRoot;
}
function useCssModule(e = "$style") {
  {
    const t = getCurrentInstance();
    if (!t)
      return EMPTY_OBJ;
    const n = t.type.__cssModules;
    if (!n)
      return EMPTY_OBJ;
    const r = n[e];
    return r || EMPTY_OBJ;
  }
}
const positionMap = /* @__PURE__ */ new WeakMap(), newPositionMap = /* @__PURE__ */ new WeakMap(), moveCbKey = Symbol("_moveCb"), enterCbKey = Symbol("_enterCb"), decorate = (e) => (delete e.props.mode, e), TransitionGroupImpl = /* @__PURE__ */ decorate({
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = getCurrentInstance(), r = useTransitionState();
    let s, i;
    return onUpdated(() => {
      if (!s.length)
        return;
      const o = e.moveClass || `${e.name || "v"}-move`;
      if (!hasCSSTransform(
        s[0].el,
        n.vnode.el,
        o
      ))
        return;
      s.forEach(callPendingCbs), s.forEach(recordPosition);
      const a = s.filter(applyTranslation);
      forceReflow(), a.forEach((l) => {
        const c = l.el, f = c.style;
        addTransitionClass(c, o), f.transform = f.webkitTransform = f.transitionDuration = "";
        const u = c[moveCbKey] = (d) => {
          d && d.target !== c || (!d || /transform$/.test(d.propertyName)) && (c.removeEventListener("transitionend", u), c[moveCbKey] = null, removeTransitionClass(c, o));
        };
        c.addEventListener("transitionend", u);
      });
    }), () => {
      const o = toRaw(e), a = resolveTransitionProps(o);
      let l = o.tag || Fragment;
      if (s = [], i)
        for (let c = 0; c < i.length; c++) {
          const f = i[c];
          f.el && f.el instanceof Element && (s.push(f), setTransitionHooks(
            f,
            resolveTransitionHooks(
              f,
              a,
              r,
              n
            )
          ), positionMap.set(
            f,
            f.el.getBoundingClientRect()
          ));
        }
      i = t.default ? getTransitionRawChildren(t.default()) : [];
      for (let c = 0; c < i.length; c++) {
        const f = i[c];
        f.key != null && setTransitionHooks(
          f,
          resolveTransitionHooks(f, a, r, n)
        );
      }
      return createVNode(l, null, i);
    };
  }
}), TransitionGroup = TransitionGroupImpl;
function callPendingCbs(e) {
  const t = e.el;
  t[moveCbKey] && t[moveCbKey](), t[enterCbKey] && t[enterCbKey]();
}
function recordPosition(e) {
  newPositionMap.set(e, e.el.getBoundingClientRect());
}
function applyTranslation(e) {
  const t = positionMap.get(e), n = newPositionMap.get(e), r = t.left - n.left, s = t.top - n.top;
  if (r || s) {
    const i = e.el.style;
    return i.transform = i.webkitTransform = `translate(${r}px,${s}px)`, i.transitionDuration = "0s", e;
  }
}
function hasCSSTransform(e, t, n) {
  const r = e.cloneNode(), s = e[vtcKey];
  s && s.forEach((a) => {
    a.split(/\s+/).forEach((l) => l && r.classList.remove(l));
  }), n.split(/\s+/).forEach((a) => a && r.classList.add(a)), r.style.display = "none";
  const i = t.nodeType === 1 ? t : t.parentNode;
  i.appendChild(r);
  const { hasTransform: o } = getTransitionInfo(r);
  return i.removeChild(r), o;
}
const getModelAssigner = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return isArray$1(t) ? (n) => invokeArrayFns(t, n) : t;
};
function onCompositionStart(e) {
  e.target.composing = !0;
}
function onCompositionEnd(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const assignKey = Symbol("_assign"), vModelText = {
  created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
    e[assignKey] = getModelAssigner(s);
    const i = r || s.props && s.props.type === "number";
    addEventListener(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), i && (a = looseToNumber(a)), e[assignKey](a);
    }), n && addEventListener(e, "change", () => {
      e.value = e.value.trim();
    }), t || (addEventListener(e, "compositionstart", onCompositionStart), addEventListener(e, "compositionend", onCompositionEnd), addEventListener(e, "change", onCompositionEnd));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: s, number: i } }, o) {
    if (e[assignKey] = getModelAssigner(o), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? looseToNumber(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (r && t === n || s && e.value.trim() === l) || (e.value = l));
  }
}, vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[assignKey] = getModelAssigner(n), addEventListener(e, "change", () => {
      const r = e._modelValue, s = getValue(e), i = e.checked, o = e[assignKey];
      if (isArray$1(r)) {
        const a = looseIndexOf(r, s), l = a !== -1;
        if (i && !l)
          o(r.concat(s));
        else if (!i && l) {
          const c = [...r];
          c.splice(a, 1), o(c);
        }
      } else if (isSet(r)) {
        const a = new Set(r);
        i ? a.add(s) : a.delete(s), o(a);
      } else
        o(getCheckboxValue(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(e, t, n) {
    e[assignKey] = getModelAssigner(n), setChecked(e, t, n);
  }
};
function setChecked(e, { value: t, oldValue: n }, r) {
  e._modelValue = t;
  let s;
  if (isArray$1(t))
    s = looseIndexOf(t, r.props.value) > -1;
  else if (isSet(t))
    s = t.has(r.props.value);
  else {
    if (t === n) return;
    s = looseEqual(t, getCheckboxValue(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const vModelRadio = {
  created(e, { value: t }, n) {
    e.checked = looseEqual(t, n.props.value), e[assignKey] = getModelAssigner(n), addEventListener(e, "change", () => {
      e[assignKey](getValue(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, r) {
    e[assignKey] = getModelAssigner(r), t !== n && (e.checked = looseEqual(t, r.props.value));
  }
}, vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, r) {
    const s = isSet(t);
    addEventListener(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (o) => o.selected).map(
        (o) => n ? looseToNumber(getValue(o)) : getValue(o)
      );
      e[assignKey](
        e.multiple ? s ? new Set(i) : i : i[0]
      ), e._assigning = !0, nextTick(() => {
        e._assigning = !1;
      });
    }), e[assignKey] = getModelAssigner(r);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    setSelected(e, t);
  },
  beforeUpdate(e, t, n) {
    e[assignKey] = getModelAssigner(n);
  },
  updated(e, { value: t }) {
    e._assigning || setSelected(e, t);
  }
};
function setSelected(e, t) {
  const n = e.multiple, r = isArray$1(t);
  if (!(n && !r && !isSet(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const o = e.options[s], a = getValue(o);
      if (n)
        if (r) {
          const l = typeof a;
          l === "string" || l === "number" ? o.selected = t.some((c) => String(c) === String(a)) : o.selected = looseIndexOf(t, a) > -1;
        } else
          o.selected = t.has(a);
      else if (looseEqual(getValue(o), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function getValue(e) {
  return "_value" in e ? e._value : e.value;
}
function getCheckboxValue(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const vModelDynamic = {
  created(e, t, n) {
    callModelHook(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    callModelHook(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, r) {
    callModelHook(e, t, n, r, "beforeUpdate");
  },
  updated(e, t, n, r) {
    callModelHook(e, t, n, r, "updated");
  }
};
function resolveDynamicModel(e, t) {
  switch (e) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (t) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(e, t, n, r, s) {
  const o = resolveDynamicModel(
    e.tagName,
    n.props && n.props.type
  )[s];
  o && o(e, t, n, r);
}
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value: e }) => ({ value: e }), vModelRadio.getSSRProps = ({ value: e }, t) => {
    if (t.props && looseEqual(t.props.value, e))
      return { checked: !0 };
  }, vModelCheckbox.getSSRProps = ({ value: e }, t) => {
    if (isArray$1(e)) {
      if (t.props && looseIndexOf(e, t.props.value) > -1)
        return { checked: !0 };
    } else if (isSet(e)) {
      if (t.props && e.has(t.props.value))
        return { checked: !0 };
    } else if (e)
      return { checked: !0 };
  }, vModelDynamic.getSSRProps = (e, t) => {
    if (typeof t.type != "string")
      return;
    const n = resolveDynamicModel(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      t.type.toUpperCase(),
      t.props && t.props.type
    );
    if (n.getSSRProps)
      return n.getSSRProps(e, t);
  };
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"], modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => systemModifiers.some((n) => e[`${n}Key`] && !t.includes(n))
}, withModifiers = (e, t) => {
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = (s, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const a = modifierGuards[t[o]];
      if (a && a(s, t)) return;
    }
    return e(s, ...i);
  });
}, keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, withKeys = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), r = t.join(".");
  return n[r] || (n[r] = (s) => {
    if (!("key" in s))
      return;
    const i = hyphenate(s.key);
    if (t.some(
      (o) => o === i || keyNames[o] === i
    ))
      return e(s);
  });
}, rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer, enabledHydration = !1;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  return renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions), enabledHydration = !0, renderer;
}
const render = (...e) => {
  ensureRenderer().render(...e);
}, hydrate = (...e) => {
  ensureHydrationRenderer().hydrate(...e);
}, createApp = (...e) => {
  const t = ensureRenderer().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const s = normalizeContainer(r);
    if (!s) return;
    const i = t._component;
    !isFunction(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = n(s, !1, resolveRootNamespace(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
}, createSSRApp = (...e) => {
  const t = ensureHydrationRenderer().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const s = normalizeContainer(r);
    if (s)
      return n(s, !0, resolveRootNamespace(s));
  }, t;
};
function resolveRootNamespace(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function normalizeContainer(e) {
  return isString(e) ? document.querySelector(e) : e;
}
let ssrDirectiveInitialized = !1;
const initDirectivesForSSR = () => {
  ssrDirectiveInitialized || (ssrDirectiveInitialized = !0, initVModelForSSR(), initVShowForSSR());
}, runtimeDom = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition,
  BaseTransitionPropsValidators,
  Comment,
  DeprecationTypes,
  EffectScope,
  ErrorCodes,
  ErrorTypeStrings,
  Fragment,
  KeepAlive,
  ReactiveEffect,
  Static,
  Suspense,
  Teleport,
  Text,
  TrackOpTypes,
  Transition,
  TransitionGroup,
  TriggerOpTypes,
  VueElement,
  assertNumber,
  callWithAsyncErrorHandling,
  callWithErrorHandling,
  camelize,
  capitalize,
  cloneVNode,
  compatUtils,
  computed,
  createApp,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createElementVNode: createBaseVNode,
  createHydrationRenderer,
  createPropsRestProxy,
  createRenderer,
  createSSRApp,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  customRef,
  defineAsyncComponent,
  defineComponent,
  defineCustomElement,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  defineProps,
  defineSSRCustomElement,
  defineSlots,
  devtools,
  effect,
  effectScope,
  getCurrentInstance,
  getCurrentScope,
  getCurrentWatcher,
  getTransitionRawChildren,
  guardReactiveProps,
  h,
  handleError,
  hasInjectionContext,
  hydrate,
  hydrateOnIdle,
  hydrateOnInteraction,
  hydrateOnMediaQuery,
  hydrateOnVisible,
  initCustomFormatter,
  initDirectivesForSSR,
  inject,
  isMemoSame,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  isRuntimeOnly,
  isShallow,
  isVNode,
  markRaw,
  mergeDefaults,
  mergeModels,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onScopeDispose,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  onWatcherCleanup,
  openBlock,
  popScopeId,
  provide,
  proxyRefs,
  pushScopeId,
  queuePostFlushCb,
  reactive,
  readonly,
  ref,
  registerRuntimeCompiler,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  resolveFilter,
  resolveTransitionHooks,
  setBlockTracking,
  setDevtoolsHook,
  setTransitionHooks,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  ssrContextKey,
  ssrUtils,
  stop,
  toDisplayString,
  toHandlerKey,
  toHandlers,
  toRaw,
  toRef,
  toRefs,
  toValue,
  transformVNodeArgs,
  triggerRef,
  unref,
  useAttrs,
  useCssModule,
  useCssVars,
  useHost,
  useId,
  useModel,
  useSSRContext,
  useShadowRoot,
  useSlots,
  useTemplateRef,
  useTransitionState,
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
  vShow,
  version,
  warn,
  watch,
  watchEffect,
  watchPostEffect,
  watchSyncEffect,
  withAsyncContext,
  withCtx,
  withDefaults,
  withDirectives,
  withKeys,
  withMemo,
  withModifiers,
  withScopeId
}, Symbol.toStringTag, { value: "Module" }));
/**
* @vue/compiler-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const FRAGMENT = Symbol(""), TELEPORT = Symbol(""), SUSPENSE = Symbol(""), KEEP_ALIVE = Symbol(""), BASE_TRANSITION = Symbol(
  ""
), OPEN_BLOCK = Symbol(""), CREATE_BLOCK = Symbol(""), CREATE_ELEMENT_BLOCK = Symbol(
  ""
), CREATE_VNODE = Symbol(""), CREATE_ELEMENT_VNODE = Symbol(
  ""
), CREATE_COMMENT = Symbol(
  ""
), CREATE_TEXT = Symbol(
  ""
), CREATE_STATIC = Symbol(
  ""
), RESOLVE_COMPONENT = Symbol(
  ""
), RESOLVE_DYNAMIC_COMPONENT = Symbol(
  ""
), RESOLVE_DIRECTIVE = Symbol(
  ""
), RESOLVE_FILTER = Symbol(
  ""
), WITH_DIRECTIVES = Symbol(
  ""
), RENDER_LIST = Symbol(""), RENDER_SLOT = Symbol(""), CREATE_SLOTS = Symbol(""), TO_DISPLAY_STRING = Symbol(
  ""
), MERGE_PROPS = Symbol(""), NORMALIZE_CLASS = Symbol(
  ""
), NORMALIZE_STYLE = Symbol(
  ""
), NORMALIZE_PROPS = Symbol(
  ""
), GUARD_REACTIVE_PROPS = Symbol(
  ""
), TO_HANDLERS = Symbol(""), CAMELIZE = Symbol(""), CAPITALIZE = Symbol(""), TO_HANDLER_KEY = Symbol(
  ""
), SET_BLOCK_TRACKING = Symbol(
  ""
), PUSH_SCOPE_ID = Symbol(""), POP_SCOPE_ID = Symbol(""), WITH_CTX = Symbol(""), UNREF = Symbol(""), IS_REF = Symbol(""), WITH_MEMO = Symbol(""), IS_MEMO_SAME = Symbol(""), helperNameMap = {
  [FRAGMENT]: "Fragment",
  [TELEPORT]: "Teleport",
  [SUSPENSE]: "Suspense",
  [KEEP_ALIVE]: "KeepAlive",
  [BASE_TRANSITION]: "BaseTransition",
  [OPEN_BLOCK]: "openBlock",
  [CREATE_BLOCK]: "createBlock",
  [CREATE_ELEMENT_BLOCK]: "createElementBlock",
  [CREATE_VNODE]: "createVNode",
  [CREATE_ELEMENT_VNODE]: "createElementVNode",
  [CREATE_COMMENT]: "createCommentVNode",
  [CREATE_TEXT]: "createTextVNode",
  [CREATE_STATIC]: "createStaticVNode",
  [RESOLVE_COMPONENT]: "resolveComponent",
  [RESOLVE_DYNAMIC_COMPONENT]: "resolveDynamicComponent",
  [RESOLVE_DIRECTIVE]: "resolveDirective",
  [RESOLVE_FILTER]: "resolveFilter",
  [WITH_DIRECTIVES]: "withDirectives",
  [RENDER_LIST]: "renderList",
  [RENDER_SLOT]: "renderSlot",
  [CREATE_SLOTS]: "createSlots",
  [TO_DISPLAY_STRING]: "toDisplayString",
  [MERGE_PROPS]: "mergeProps",
  [NORMALIZE_CLASS]: "normalizeClass",
  [NORMALIZE_STYLE]: "normalizeStyle",
  [NORMALIZE_PROPS]: "normalizeProps",
  [GUARD_REACTIVE_PROPS]: "guardReactiveProps",
  [TO_HANDLERS]: "toHandlers",
  [CAMELIZE]: "camelize",
  [CAPITALIZE]: "capitalize",
  [TO_HANDLER_KEY]: "toHandlerKey",
  [SET_BLOCK_TRACKING]: "setBlockTracking",
  [PUSH_SCOPE_ID]: "pushScopeId",
  [POP_SCOPE_ID]: "popScopeId",
  [WITH_CTX]: "withCtx",
  [UNREF]: "unref",
  [IS_REF]: "isRef",
  [WITH_MEMO]: "withMemo",
  [IS_MEMO_SAME]: "isMemoSame"
};
function registerRuntimeHelpers(e) {
  Object.getOwnPropertySymbols(e).forEach((t) => {
    helperNameMap[t] = e[t];
  });
}
const locStub = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function createRoot(e, t = "") {
  return {
    type: 0,
    source: t,
    children: e,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: locStub
  };
}
function createVNodeCall(e, t, n, r, s, i, o, a = !1, l = !1, c = !1, f = locStub) {
  return e && (a ? (e.helper(OPEN_BLOCK), e.helper(getVNodeBlockHelper(e.inSSR, c))) : e.helper(getVNodeHelper(e.inSSR, c)), o && e.helper(WITH_DIRECTIVES)), {
    type: 13,
    tag: t,
    props: n,
    children: r,
    patchFlag: s,
    dynamicProps: i,
    directives: o,
    isBlock: a,
    disableTracking: l,
    isComponent: c,
    loc: f
  };
}
function createArrayExpression(e, t = locStub) {
  return {
    type: 17,
    loc: t,
    elements: e
  };
}
function createObjectExpression(e, t = locStub) {
  return {
    type: 15,
    loc: t,
    properties: e
  };
}
function createObjectProperty(e, t) {
  return {
    type: 16,
    loc: locStub,
    key: isString(e) ? createSimpleExpression(e, !0) : e,
    value: t
  };
}
function createSimpleExpression(e, t = !1, n = locStub, r = 0) {
  return {
    type: 4,
    loc: n,
    content: e,
    isStatic: t,
    constType: t ? 3 : r
  };
}
function createCompoundExpression(e, t = locStub) {
  return {
    type: 8,
    loc: t,
    children: e
  };
}
function createCallExpression(e, t = [], n = locStub) {
  return {
    type: 14,
    loc: n,
    callee: e,
    arguments: t
  };
}
function createFunctionExpression(e, t = void 0, n = !1, r = !1, s = locStub) {
  return {
    type: 18,
    params: e,
    returns: t,
    newline: n,
    isSlot: r,
    loc: s
  };
}
function createConditionalExpression(e, t, n, r = !0) {
  return {
    type: 19,
    test: e,
    consequent: t,
    alternate: n,
    newline: r,
    loc: locStub
  };
}
function createCacheExpression(e, t, n = !1, r = !1) {
  return {
    type: 20,
    index: e,
    value: t,
    needPauseTracking: n,
    inVOnce: r,
    needArraySpread: !1,
    loc: locStub
  };
}
function createBlockStatement(e) {
  return {
    type: 21,
    body: e,
    loc: locStub
  };
}
function getVNodeHelper(e, t) {
  return e || t ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}
function getVNodeBlockHelper(e, t) {
  return e || t ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}
function convertToBlock(e, { helper: t, removeHelper: n, inSSR: r }) {
  e.isBlock || (e.isBlock = !0, n(getVNodeHelper(r, e.isComponent)), t(OPEN_BLOCK), t(getVNodeBlockHelper(r, e.isComponent)));
}
const defaultDelimitersOpen = new Uint8Array([123, 123]), defaultDelimitersClose = new Uint8Array([125, 125]);
function isTagStartChar(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function isWhitespace(e) {
  return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function isEndOfTagSection(e) {
  return e === 47 || e === 62 || isWhitespace(e);
}
function toCharCodes(e) {
  const t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++)
    t[n] = e.charCodeAt(n);
  return t;
}
const Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class Tokenizer {
  constructor(t, n) {
    this.stack = t, this.cbs = n, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = defaultDelimitersOpen, this.delimiterClose = defaultDelimitersClose, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = defaultDelimitersOpen, this.delimiterClose = defaultDelimitersClose;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(t) {
    let n = 1, r = t + 1;
    for (let s = this.newlines.length - 1; s >= 0; s--) {
      const i = this.newlines[s];
      if (t > i) {
        n = s + 2, r = t - i;
        break;
      }
    }
    return {
      column: r,
      line: n,
      offset: t
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(t) {
    t === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t));
  }
  stateInterpolationOpen(t) {
    if (t === this.delimiterOpen[this.delimiterIndex])
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const n = this.index + 1 - this.delimiterOpen.length;
        n > this.sectionStart && this.cbs.ontext(this.sectionStart, n), this.state = 3, this.sectionStart = n;
      } else
        this.delimiterIndex++;
    else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(t)) : (this.state = 1, this.stateText(t));
  }
  stateInterpolation(t) {
    t === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(t));
  }
  stateInterpolationClose(t) {
    t === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(t));
  }
  stateSpecialStartSequence(t) {
    const n = this.sequenceIndex === this.currentSequence.length;
    if (!(n ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.inRCDATA = !1;
    else if (!n) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === 62 || isWhitespace(t)) {
        const n = this.index - this.currentSequence.length;
        if (this.sectionStart < n) {
          const r = this.index;
          this.index = n, this.cbs.ontext(this.sectionStart, n), this.index = r;
        }
        this.sectionStart = n + 2, this.stateInClosingTagName(t), this.inRCDATA = !1;
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot ? !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === Sequences.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Sequences.Cdata.length && (this.state = 28, this.currentSequence = Sequences.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length; ) {
      const n = this.buffer.charCodeAt(this.index);
      if (n === 10 && this.newlines.push(this.index), n === t)
        return !0;
    }
    return this.index = this.buffer.length - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Sequences.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, n) {
    this.enterRCDATA(t, n), this.state = 31;
  }
  enterRCDATA(t, n) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = n;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : isTagStartChar(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    isEndOfTagSection(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (isEndOfTagSection(t)) {
      const n = this.buffer.slice(this.sectionStart, this.index);
      n !== "template" && this.enterRCDATA(toCharCodes("</" + n), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    isWhitespace(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = isTagStartChar(t) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === 62 || isWhitespace(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    t === 62 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(t) {
    t === 62 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : t === 47 ? this.state = 7 : t === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : isWhitespace(t) || this.handleAttrStart(t);
  }
  handleAttrStart(t) {
    t === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : t === 46 || t === 58 || t === 64 || t === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : isWhitespace(t) || (this.state = 11, this.stateBeforeAttrName(t));
  }
  stateInAttrName(t) {
    (t === 61 || isEndOfTagSection(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || isEndOfTagSection(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || isEndOfTagSection(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || isEndOfTagSection(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || isEndOfTagSection(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(t) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(t);
  }
  stateAfterAttrName(t) {
    t === 61 ? this.state = 18 : t === 47 || t === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t)) : isWhitespace(t) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(t));
  }
  stateBeforeAttrValue(t) {
    t === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : t === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : isWhitespace(t) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(t));
  }
  handleInAttrValue(t, n) {
    (t === n || this.fastForwardTo(n)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(
      n === 34 ? 3 : 2,
      this.index + 1
    ), this.state = 11);
  }
  stateInAttrValueDoubleQuotes(t) {
    this.handleInAttrValue(t, 34);
  }
  stateInAttrValueSingleQuotes(t) {
    this.handleInAttrValue(t, 39);
  }
  stateInAttrValueNoQuotes(t) {
    isWhitespace(t) || t === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(t)) : (t === 39 || t === 60 || t === 61 || t === 96) && this.cbs.onerr(
      18,
      this.index
    );
  }
  stateBeforeDeclaration(t) {
    t === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = t === 45 ? 25 : 23;
  }
  stateInDeclaration(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === 45 ? (this.state = 28, this.currentSequence = Sequences.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === Sequences.ScriptEnd[3] ? this.startSpecial(Sequences.ScriptEnd, 4) : t === Sequences.StyleEnd[3] ? this.startSpecial(Sequences.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === Sequences.TitleEnd[3] ? this.startSpecial(Sequences.TitleEnd, 4) : t === Sequences.TextareaEnd[3] ? this.startSpecial(Sequences.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  startEntity() {
  }
  stateInEntity() {
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(t) {
    for (this.buffer = t; this.index < this.buffer.length; ) {
      const n = this.buffer.charCodeAt(this.index);
      switch (n === 10 && this.newlines.push(this.index), this.state) {
        case 1: {
          this.stateText(n);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(n);
          break;
        }
        case 3: {
          this.stateInterpolation(n);
          break;
        }
        case 4: {
          this.stateInterpolationClose(n);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(n);
          break;
        }
        case 32: {
          this.stateInRCDATA(n);
          break;
        }
        case 26: {
          this.stateCDATASequence(n);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(n);
          break;
        }
        case 12: {
          this.stateInAttrName(n);
          break;
        }
        case 13: {
          this.stateInDirName(n);
          break;
        }
        case 14: {
          this.stateInDirArg(n);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(n);
          break;
        }
        case 16: {
          this.stateInDirModifier(n);
          break;
        }
        case 28: {
          this.stateInCommentLike(n);
          break;
        }
        case 27: {
          this.stateInSpecialComment(n);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(n);
          break;
        }
        case 6: {
          this.stateInTagName(n);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(n);
          break;
        }
        case 9: {
          this.stateInClosingTagName(n);
          break;
        }
        case 5: {
          this.stateBeforeTagName(n);
          break;
        }
        case 17: {
          this.stateAfterAttrName(n);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(n);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(n);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(n);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(n);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(n);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(n);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(n);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(n);
          break;
        }
        case 23: {
          this.stateInDeclaration(n);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(n);
          break;
        }
        case 25: {
          this.stateBeforeComment(n);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(n);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length;
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === Sequences.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, n) {
  }
}
function getCompatValue(e, { compatConfig: t }) {
  const n = t && t[e];
  return e === "MODE" ? n || 3 : n;
}
function isCompatEnabled(e, t) {
  const n = getCompatValue("MODE", t), r = getCompatValue(e, t);
  return n === 3 ? r === !0 : r !== !1;
}
function checkCompatEnabled(e, t, n, ...r) {
  return isCompatEnabled(e, t);
}
function defaultOnError(e) {
  throw e;
}
function defaultOnWarn(e) {
}
function createCompilerError(e, t, n, r) {
  const s = `https://vuejs.org/error-reference/#compiler-${e}`, i = new SyntaxError(String(s));
  return i.code = e, i.loc = t, i;
}
const isStaticExp = (e) => e.type === 4 && e.isStatic;
function isCoreComponent(e) {
  switch (e) {
    case "Teleport":
    case "teleport":
      return TELEPORT;
    case "Suspense":
    case "suspense":
      return SUSPENSE;
    case "KeepAlive":
    case "keep-alive":
      return KEEP_ALIVE;
    case "BaseTransition":
    case "base-transition":
      return BASE_TRANSITION;
  }
}
const nonIdentifierRE = /^\d|[^\$\w\xA0-\uFFFF]/, isSimpleIdentifier = (e) => !nonIdentifierRE.test(e), validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/, validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/, whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g, getExpSource = (e) => e.type === 4 ? e.content : e.loc.source, isMemberExpressionBrowser = (e) => {
  const t = getExpSource(e).trim().replace(whitespaceRE, (a) => a.trim());
  let n = 0, r = [], s = 0, i = 0, o = null;
  for (let a = 0; a < t.length; a++) {
    const l = t.charAt(a);
    switch (n) {
      case 0:
        if (l === "[")
          r.push(n), n = 1, s++;
        else if (l === "(")
          r.push(n), n = 2, i++;
        else if (!(a === 0 ? validFirstIdentCharRE : validIdentCharRE).test(l))
          return !1;
        break;
      case 1:
        l === "'" || l === '"' || l === "`" ? (r.push(n), n = 3, o = l) : l === "[" ? s++ : l === "]" && (--s || (n = r.pop()));
        break;
      case 2:
        if (l === "'" || l === '"' || l === "`")
          r.push(n), n = 3, o = l;
        else if (l === "(")
          i++;
        else if (l === ")") {
          if (a === t.length - 1)
            return !1;
          --i || (n = r.pop());
        }
        break;
      case 3:
        l === o && (n = r.pop(), o = null);
        break;
    }
  }
  return !s && !i;
}, isMemberExpression = isMemberExpressionBrowser, fnExpRE = /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/, isFnExpressionBrowser = (e) => fnExpRE.test(getExpSource(e)), isFnExpression = isFnExpressionBrowser;
function findDir(e, t, n = !1) {
  for (let r = 0; r < e.props.length; r++) {
    const s = e.props[r];
    if (s.type === 7 && (n || s.exp) && (isString(t) ? s.name === t : t.test(s.name)))
      return s;
  }
}
function findProp(e, t, n = !1, r = !1) {
  for (let s = 0; s < e.props.length; s++) {
    const i = e.props[s];
    if (i.type === 6) {
      if (n) continue;
      if (i.name === t && (i.value || r))
        return i;
    } else if (i.name === "bind" && (i.exp || r) && isStaticArgOf(i.arg, t))
      return i;
  }
}
function isStaticArgOf(e, t) {
  return !!(e && isStaticExp(e) && e.content === t);
}
function hasDynamicKeyVBind(e) {
  return e.props.some(
    (t) => t.type === 7 && t.name === "bind" && (!t.arg || // v-bind="obj"
    t.arg.type !== 4 || // v-bind:[_ctx.foo]
    !t.arg.isStatic)
    // v-bind:[foo]
  );
}
function isText$1(e) {
  return e.type === 5 || e.type === 2;
}
function isVSlot(e) {
  return e.type === 7 && e.name === "slot";
}
function isTemplateNode(e) {
  return e.type === 1 && e.tagType === 3;
}
function isSlotOutlet(e) {
  return e.type === 1 && e.tagType === 2;
}
const propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
function getUnnormalizedProps(e, t = []) {
  if (e && !isString(e) && e.type === 14) {
    const n = e.callee;
    if (!isString(n) && propsHelperSet.has(n))
      return getUnnormalizedProps(
        e.arguments[0],
        t.concat(e)
      );
  }
  return [e, t];
}
function injectProp(e, t, n) {
  let r, s = e.type === 13 ? e.props : e.arguments[2], i = [], o;
  if (s && !isString(s) && s.type === 14) {
    const a = getUnnormalizedProps(s);
    s = a[0], i = a[1], o = i[i.length - 1];
  }
  if (s == null || isString(s))
    r = createObjectExpression([t]);
  else if (s.type === 14) {
    const a = s.arguments[0];
    !isString(a) && a.type === 15 ? hasProp(t, a) || a.properties.unshift(t) : s.callee === TO_HANDLERS ? r = createCallExpression(n.helper(MERGE_PROPS), [
      createObjectExpression([t]),
      s
    ]) : s.arguments.unshift(createObjectExpression([t])), !r && (r = s);
  } else s.type === 15 ? (hasProp(t, s) || s.properties.unshift(t), r = s) : (r = createCallExpression(n.helper(MERGE_PROPS), [
    createObjectExpression([t]),
    s
  ]), o && o.callee === GUARD_REACTIVE_PROPS && (o = i[i.length - 2]));
  e.type === 13 ? o ? o.arguments[0] = r : e.props = r : o ? o.arguments[0] = r : e.arguments[2] = r;
}
function hasProp(e, t) {
  let n = !1;
  if (e.key.type === 4) {
    const r = e.key.content;
    n = t.properties.some(
      (s) => s.key.type === 4 && s.key.content === r
    );
  }
  return n;
}
function toValidAssetId(e, t) {
  return `_${t}_${e.replace(/[^\w]/g, (n, r) => n === "-" ? "_" : e.charCodeAt(r).toString())}`;
}
function getMemoedVNodeCall(e) {
  return e.type === 14 && e.callee === WITH_MEMO ? e.arguments[1].returns : e;
}
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/, defaultParserOptions = {
  parseMode: "base",
  ns: 0,
  delimiters: ["{{", "}}"],
  getNamespace: () => 0,
  isVoidTag: NO,
  isPreTag: NO,
  isIgnoreNewlineTag: NO,
  isCustomElement: NO,
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: !1,
  prefixIdentifiers: !1
};
let currentOptions = defaultParserOptions, currentRoot = null, currentInput = "", currentOpenTag = null, currentProp = null, currentAttrValue = "", currentAttrStartIndex = -1, currentAttrEndIndex = -1, inPre = 0, inVPre = !1, currentVPreBoundary = null;
const stack = [], tokenizer = new Tokenizer(stack, {
  onerr: emitError,
  ontext(e, t) {
    onText(getSlice(e, t), e, t);
  },
  ontextentity(e, t, n) {
    onText(e, t, n);
  },
  oninterpolation(e, t) {
    if (inVPre)
      return onText(getSlice(e, t), e, t);
    let n = e + tokenizer.delimiterOpen.length, r = t - tokenizer.delimiterClose.length;
    for (; isWhitespace(currentInput.charCodeAt(n)); )
      n++;
    for (; isWhitespace(currentInput.charCodeAt(r - 1)); )
      r--;
    let s = getSlice(n, r);
    s.includes("&") && (s = currentOptions.decodeEntities(s, !1)), addNode({
      type: 5,
      content: createExp(s, !1, getLoc(n, r)),
      loc: getLoc(e, t)
    });
  },
  onopentagname(e, t) {
    const n = getSlice(e, t);
    currentOpenTag = {
      type: 1,
      tag: n,
      ns: currentOptions.getNamespace(n, stack[0], currentOptions.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: getLoc(e - 1, t),
      codegenNode: void 0
    };
  },
  onopentagend(e) {
    endOpenTag(e);
  },
  onclosetag(e, t) {
    const n = getSlice(e, t);
    if (!currentOptions.isVoidTag(n)) {
      let r = !1;
      for (let s = 0; s < stack.length; s++)
        if (stack[s].tag.toLowerCase() === n.toLowerCase()) {
          r = !0, s > 0 && emitError(24, stack[0].loc.start.offset);
          for (let o = 0; o <= s; o++) {
            const a = stack.shift();
            onCloseTag(a, t, o < s);
          }
          break;
        }
      r || emitError(23, backTrack(e, 60));
    }
  },
  onselfclosingtag(e) {
    const t = currentOpenTag.tag;
    currentOpenTag.isSelfClosing = !0, endOpenTag(e), stack[0] && stack[0].tag === t && onCloseTag(stack.shift(), e);
  },
  onattribname(e, t) {
    currentProp = {
      type: 6,
      name: getSlice(e, t),
      nameLoc: getLoc(e, t),
      value: void 0,
      loc: getLoc(e)
    };
  },
  ondirname(e, t) {
    const n = getSlice(e, t), r = n === "." || n === ":" ? "bind" : n === "@" ? "on" : n === "#" ? "slot" : n.slice(2);
    if (!inVPre && r === "" && emitError(26, e), inVPre || r === "")
      currentProp = {
        type: 6,
        name: n,
        nameLoc: getLoc(e, t),
        value: void 0,
        loc: getLoc(e)
      };
    else if (currentProp = {
      type: 7,
      name: r,
      rawName: n,
      exp: void 0,
      arg: void 0,
      modifiers: n === "." ? [createSimpleExpression("prop")] : [],
      loc: getLoc(e)
    }, r === "pre") {
      inVPre = tokenizer.inVPre = !0, currentVPreBoundary = currentOpenTag;
      const s = currentOpenTag.props;
      for (let i = 0; i < s.length; i++)
        s[i].type === 7 && (s[i] = dirToAttr(s[i]));
    }
  },
  ondirarg(e, t) {
    if (e === t) return;
    const n = getSlice(e, t);
    if (inVPre)
      currentProp.name += n, setLocEnd(currentProp.nameLoc, t);
    else {
      const r = n[0] !== "[";
      currentProp.arg = createExp(
        r ? n : n.slice(1, -1),
        r,
        getLoc(e, t),
        r ? 3 : 0
      );
    }
  },
  ondirmodifier(e, t) {
    const n = getSlice(e, t);
    if (inVPre)
      currentProp.name += "." + n, setLocEnd(currentProp.nameLoc, t);
    else if (currentProp.name === "slot") {
      const r = currentProp.arg;
      r && (r.content += "." + n, setLocEnd(r.loc, t));
    } else {
      const r = createSimpleExpression(n, !0, getLoc(e, t));
      currentProp.modifiers.push(r);
    }
  },
  onattribdata(e, t) {
    currentAttrValue += getSlice(e, t), currentAttrStartIndex < 0 && (currentAttrStartIndex = e), currentAttrEndIndex = t;
  },
  onattribentity(e, t, n) {
    currentAttrValue += e, currentAttrStartIndex < 0 && (currentAttrStartIndex = t), currentAttrEndIndex = n;
  },
  onattribnameend(e) {
    const t = currentProp.loc.start.offset, n = getSlice(t, e);
    currentProp.type === 7 && (currentProp.rawName = n), currentOpenTag.props.some(
      (r) => (r.type === 7 ? r.rawName : r.name) === n
    ) && emitError(2, t);
  },
  onattribend(e, t) {
    if (currentOpenTag && currentProp) {
      if (setLocEnd(currentProp.loc, t), e !== 0)
        if (currentAttrValue.includes("&") && (currentAttrValue = currentOptions.decodeEntities(
          currentAttrValue,
          !0
        )), currentProp.type === 6)
          currentProp.name === "class" && (currentAttrValue = condense(currentAttrValue).trim()), e === 1 && !currentAttrValue && emitError(13, t), currentProp.value = {
            type: 2,
            content: currentAttrValue,
            loc: e === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
          }, tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html" && tokenizer.enterRCDATA(toCharCodes("</template"), 0);
        else {
          let n = 0;
          currentProp.exp = createExp(
            currentAttrValue,
            !1,
            getLoc(currentAttrStartIndex, currentAttrEndIndex),
            0,
            n
          ), currentProp.name === "for" && (currentProp.forParseResult = parseForExpression(currentProp.exp));
          let r = -1;
          currentProp.name === "bind" && (r = currentProp.modifiers.findIndex(
            (s) => s.content === "sync"
          )) > -1 && checkCompatEnabled(
            "COMPILER_V_BIND_SYNC",
            currentOptions,
            currentProp.loc,
            currentProp.rawName
          ) && (currentProp.name = "model", currentProp.modifiers.splice(r, 1));
        }
      (currentProp.type !== 7 || currentProp.name !== "pre") && currentOpenTag.props.push(currentProp);
    }
    currentAttrValue = "", currentAttrStartIndex = currentAttrEndIndex = -1;
  },
  oncomment(e, t) {
    currentOptions.comments && addNode({
      type: 3,
      content: getSlice(e, t),
      loc: getLoc(e - 4, t + 3)
    });
  },
  onend() {
    const e = currentInput.length;
    for (let t = 0; t < stack.length; t++)
      onCloseTag(stack[t], e - 1), emitError(24, stack[t].loc.start.offset);
  },
  oncdata(e, t) {
    stack[0].ns !== 0 ? onText(getSlice(e, t), e, t) : emitError(1, e - 9);
  },
  onprocessinginstruction(e) {
    (stack[0] ? stack[0].ns : currentOptions.ns) === 0 && emitError(
      21,
      e - 1
    );
  }
}), forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, stripParensRE = /^\(|\)$/g;
function parseForExpression(e) {
  const t = e.loc, n = e.content, r = n.match(forAliasRE);
  if (!r) return;
  const [, s, i] = r, o = (u, d, m = !1) => {
    const v = t.start.offset + d, S = v + u.length;
    return createExp(
      u,
      !1,
      getLoc(v, S),
      0,
      m ? 1 : 0
      /* Normal */
    );
  }, a = {
    source: o(i.trim(), n.indexOf(i, s.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: !1
  };
  let l = s.trim().replace(stripParensRE, "").trim();
  const c = s.indexOf(l), f = l.match(forIteratorRE);
  if (f) {
    l = l.replace(forIteratorRE, "").trim();
    const u = f[1].trim();
    let d;
    if (u && (d = n.indexOf(u, c + l.length), a.key = o(u, d, !0)), f[2]) {
      const m = f[2].trim();
      m && (a.index = o(
        m,
        n.indexOf(
          m,
          a.key ? d + u.length : c + l.length
        ),
        !0
      ));
    }
  }
  return l && (a.value = o(l, c, !0)), a;
}
function getSlice(e, t) {
  return currentInput.slice(e, t);
}
function endOpenTag(e) {
  tokenizer.inSFCRoot && (currentOpenTag.innerLoc = getLoc(e + 1, e + 1)), addNode(currentOpenTag);
  const { tag: t, ns: n } = currentOpenTag;
  n === 0 && currentOptions.isPreTag(t) && inPre++, currentOptions.isVoidTag(t) ? onCloseTag(currentOpenTag, e) : (stack.unshift(currentOpenTag), (n === 1 || n === 2) && (tokenizer.inXML = !0)), currentOpenTag = null;
}
function onText(e, t, n) {
  {
    const i = stack[0] && stack[0].tag;
    i !== "script" && i !== "style" && e.includes("&") && (e = currentOptions.decodeEntities(e, !1));
  }
  const r = stack[0] || currentRoot, s = r.children[r.children.length - 1];
  s && s.type === 2 ? (s.content += e, setLocEnd(s.loc, n)) : r.children.push({
    type: 2,
    content: e,
    loc: getLoc(t, n)
  });
}
function onCloseTag(e, t, n = !1) {
  n ? setLocEnd(e.loc, backTrack(t, 60)) : setLocEnd(e.loc, lookAhead(t, 62) + 1), tokenizer.inSFCRoot && (e.children.length ? e.innerLoc.end = extend({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = extend({}, e.innerLoc.start), e.innerLoc.source = getSlice(
    e.innerLoc.start.offset,
    e.innerLoc.end.offset
  ));
  const { tag: r, ns: s, children: i } = e;
  if (inVPre || (r === "slot" ? e.tagType = 2 : isFragmentTemplate(e) ? e.tagType = 3 : isComponent(e) && (e.tagType = 1)), tokenizer.inRCDATA || (e.children = condenseWhitespace(i)), s === 0 && currentOptions.isIgnoreNewlineTag(r)) {
    const o = i[0];
    o && o.type === 2 && (o.content = o.content.replace(/^\r?\n/, ""));
  }
  s === 0 && currentOptions.isPreTag(r) && inPre--, currentVPreBoundary === e && (inVPre = tokenizer.inVPre = !1, currentVPreBoundary = null), tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0 && (tokenizer.inXML = !1);
  {
    const o = e.props;
    if (!tokenizer.inSFCRoot && isCompatEnabled(
      "COMPILER_NATIVE_TEMPLATE",
      currentOptions
    ) && e.tag === "template" && !isFragmentTemplate(e)) {
      const l = stack[0] || currentRoot, c = l.children.indexOf(e);
      l.children.splice(c, 1, ...e.children);
    }
    const a = o.find(
      (l) => l.type === 6 && l.name === "inline-template"
    );
    a && checkCompatEnabled(
      "COMPILER_INLINE_TEMPLATE",
      currentOptions,
      a.loc
    ) && e.children.length && (a.value = {
      type: 2,
      content: getSlice(
        e.children[0].loc.start.offset,
        e.children[e.children.length - 1].loc.end.offset
      ),
      loc: a.loc
    });
  }
}
function lookAhead(e, t) {
  let n = e;
  for (; currentInput.charCodeAt(n) !== t && n < currentInput.length - 1; ) n++;
  return n;
}
function backTrack(e, t) {
  let n = e;
  for (; currentInput.charCodeAt(n) !== t && n >= 0; ) n--;
  return n;
}
const specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function isFragmentTemplate({ tag: e, props: t }) {
  if (e === "template") {
    for (let n = 0; n < t.length; n++)
      if (t[n].type === 7 && specialTemplateDir.has(t[n].name))
        return !0;
  }
  return !1;
}
function isComponent({ tag: e, props: t }) {
  if (currentOptions.isCustomElement(e))
    return !1;
  if (e === "component" || isUpperCase(e.charCodeAt(0)) || isCoreComponent(e) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(e) || currentOptions.isNativeTag && !currentOptions.isNativeTag(e))
    return !0;
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (r.type === 6) {
      if (r.name === "is" && r.value) {
        if (r.value.content.startsWith("vue:"))
          return !0;
        if (checkCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          currentOptions,
          r.loc
        ))
          return !0;
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      r.name === "bind" && isStaticArgOf(r.arg, "is") && checkCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        currentOptions,
        r.loc
      )
    )
      return !0;
  }
  return !1;
}
function isUpperCase(e) {
  return e > 64 && e < 91;
}
const windowsNewlineRE = /\r\n/g;
function condenseWhitespace(e, t) {
  const n = currentOptions.whitespace !== "preserve";
  let r = !1;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (i.type === 2)
      if (inPre)
        i.content = i.content.replace(windowsNewlineRE, `
`);
      else if (isAllWhitespace(i.content)) {
        const o = e[s - 1] && e[s - 1].type, a = e[s + 1] && e[s + 1].type;
        !o || !a || n && (o === 3 && (a === 3 || a === 1) || o === 1 && (a === 3 || a === 1 && hasNewlineChar(i.content))) ? (r = !0, e[s] = null) : i.content = " ";
      } else n && (i.content = condense(i.content));
  }
  return r ? e.filter(Boolean) : e;
}
function isAllWhitespace(e) {
  for (let t = 0; t < e.length; t++)
    if (!isWhitespace(e.charCodeAt(t)))
      return !1;
  return !0;
}
function hasNewlineChar(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e.charCodeAt(t);
    if (n === 10 || n === 13)
      return !0;
  }
  return !1;
}
function condense(e) {
  let t = "", n = !1;
  for (let r = 0; r < e.length; r++)
    isWhitespace(e.charCodeAt(r)) ? n || (t += " ", n = !0) : (t += e[r], n = !1);
  return t;
}
function addNode(e) {
  (stack[0] || currentRoot).children.push(e);
}
function getLoc(e, t) {
  return {
    start: tokenizer.getPos(e),
    // @ts-expect-error allow late attachment
    end: t == null ? t : tokenizer.getPos(t),
    // @ts-expect-error allow late attachment
    source: t == null ? t : getSlice(e, t)
  };
}
function cloneLoc(e) {
  return getLoc(e.start.offset, e.end.offset);
}
function setLocEnd(e, t) {
  e.end = tokenizer.getPos(t), e.source = getSlice(e.start.offset, t);
}
function dirToAttr(e) {
  const t = {
    type: 6,
    name: e.rawName,
    nameLoc: getLoc(
      e.loc.start.offset,
      e.loc.start.offset + e.rawName.length
    ),
    value: void 0,
    loc: e.loc
  };
  if (e.exp) {
    const n = e.exp.loc;
    n.end.offset < e.loc.end.offset && (n.start.offset--, n.start.column--, n.end.offset++, n.end.column++), t.value = {
      type: 2,
      content: e.exp.content,
      loc: n
    };
  }
  return t;
}
function createExp(e, t = !1, n, r = 0, s = 0) {
  return createSimpleExpression(e, t, n, r);
}
function emitError(e, t, n) {
  currentOptions.onError(
    createCompilerError(e, getLoc(t, t))
  );
}
function reset() {
  tokenizer.reset(), currentOpenTag = null, currentProp = null, currentAttrValue = "", currentAttrStartIndex = -1, currentAttrEndIndex = -1, stack.length = 0;
}
function baseParse(e, t) {
  if (reset(), currentInput = e, currentOptions = extend({}, defaultParserOptions), t) {
    let s;
    for (s in t)
      t[s] != null && (currentOptions[s] = t[s]);
  }
  tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0, tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
  const n = t && t.delimiters;
  n && (tokenizer.delimiterOpen = toCharCodes(n[0]), tokenizer.delimiterClose = toCharCodes(n[1]));
  const r = currentRoot = createRoot([], e);
  return tokenizer.parse(currentInput), r.loc = getLoc(0, e.length), r.children = condenseWhitespace(r.children), currentRoot = null, r;
}
function cacheStatic(e, t) {
  walk(
    e,
    void 0,
    t,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    isSingleElementRoot(e, e.children[0])
  );
}
function isSingleElementRoot(e, t) {
  const { children: n } = e;
  return n.length === 1 && t.type === 1 && !isSlotOutlet(t);
}
function walk(e, t, n, r = !1, s = !1) {
  const { children: i } = e, o = [];
  for (let f = 0; f < i.length; f++) {
    const u = i[f];
    if (u.type === 1 && u.tagType === 0) {
      const d = r ? 0 : getConstantType(u, n);
      if (d > 0) {
        if (d >= 2) {
          u.codegenNode.patchFlag = -1, o.push(u);
          continue;
        }
      } else {
        const m = u.codegenNode;
        if (m.type === 13) {
          const v = m.patchFlag;
          if ((v === void 0 || v === 512 || v === 1) && getGeneratedPropsConstantType(u, n) >= 2) {
            const S = getNodeProps(u);
            S && (m.props = n.hoist(S));
          }
          m.dynamicProps && (m.dynamicProps = n.hoist(m.dynamicProps));
        }
      }
    } else if (u.type === 12 && (r ? 0 : getConstantType(u, n)) >= 2) {
      o.push(u);
      continue;
    }
    if (u.type === 1) {
      const d = u.tagType === 1;
      d && n.scopes.vSlot++, walk(u, e, n, !1, s), d && n.scopes.vSlot--;
    } else if (u.type === 11)
      walk(u, e, n, u.children.length === 1, !0);
    else if (u.type === 9)
      for (let d = 0; d < u.branches.length; d++)
        walk(
          u.branches[d],
          e,
          n,
          u.branches[d].children.length === 1,
          s
        );
  }
  let a = !1;
  if (o.length === i.length && e.type === 1) {
    if (e.tagType === 0 && e.codegenNode && e.codegenNode.type === 13 && isArray$1(e.codegenNode.children))
      e.codegenNode.children = l(
        createArrayExpression(e.codegenNode.children)
      ), a = !0;
    else if (e.tagType === 1 && e.codegenNode && e.codegenNode.type === 13 && e.codegenNode.children && !isArray$1(e.codegenNode.children) && e.codegenNode.children.type === 15) {
      const f = c(e.codegenNode, "default");
      f && (f.returns = l(
        createArrayExpression(f.returns)
      ), a = !0);
    } else if (e.tagType === 3 && t && t.type === 1 && t.tagType === 1 && t.codegenNode && t.codegenNode.type === 13 && t.codegenNode.children && !isArray$1(t.codegenNode.children) && t.codegenNode.children.type === 15) {
      const f = findDir(e, "slot", !0), u = f && f.arg && c(t.codegenNode, f.arg);
      u && (u.returns = l(
        createArrayExpression(u.returns)
      ), a = !0);
    }
  }
  if (!a)
    for (const f of o)
      f.codegenNode = n.cache(f.codegenNode);
  function l(f) {
    const u = n.cache(f);
    return s && n.hmr && (u.needArraySpread = !0), u;
  }
  function c(f, u) {
    if (f.children && !isArray$1(f.children) && f.children.type === 15) {
      const d = f.children.properties.find(
        (m) => m.key === u || m.key.content === u
      );
      return d && d.value;
    }
  }
  o.length && n.transformHoist && n.transformHoist(i, n, e);
}
function getConstantType(e, t) {
  const { constantCache: n } = t;
  switch (e.type) {
    case 1:
      if (e.tagType !== 0)
        return 0;
      const r = n.get(e);
      if (r !== void 0)
        return r;
      const s = e.codegenNode;
      if (s.type !== 13 || s.isBlock && e.tag !== "svg" && e.tag !== "foreignObject" && e.tag !== "math")
        return 0;
      if (s.patchFlag === void 0) {
        let o = 3;
        const a = getGeneratedPropsConstantType(e, t);
        if (a === 0)
          return n.set(e, 0), 0;
        a < o && (o = a);
        for (let l = 0; l < e.children.length; l++) {
          const c = getConstantType(e.children[l], t);
          if (c === 0)
            return n.set(e, 0), 0;
          c < o && (o = c);
        }
        if (o > 1)
          for (let l = 0; l < e.props.length; l++) {
            const c = e.props[l];
            if (c.type === 7 && c.name === "bind" && c.exp) {
              const f = getConstantType(c.exp, t);
              if (f === 0)
                return n.set(e, 0), 0;
              f < o && (o = f);
            }
          }
        if (s.isBlock) {
          for (let l = 0; l < e.props.length; l++)
            if (e.props[l].type === 7)
              return n.set(e, 0), 0;
          t.removeHelper(OPEN_BLOCK), t.removeHelper(
            getVNodeBlockHelper(t.inSSR, s.isComponent)
          ), s.isBlock = !1, t.helper(getVNodeHelper(t.inSSR, s.isComponent));
        }
        return n.set(e, o), o;
      } else
        return n.set(e, 0), 0;
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return getConstantType(e.content, t);
    case 4:
      return e.constType;
    case 8:
      let i = 3;
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o];
        if (isString(a) || isSymbol(a))
          continue;
        const l = getConstantType(a, t);
        if (l === 0)
          return 0;
        l < i && (i = l);
      }
      return i;
    case 20:
      return 2;
    default:
      return 0;
  }
}
const allowHoistedHelperSet = /* @__PURE__ */ new Set([
  NORMALIZE_CLASS,
  NORMALIZE_STYLE,
  NORMALIZE_PROPS,
  GUARD_REACTIVE_PROPS
]);
function getConstantTypeOfHelperCall(e, t) {
  if (e.type === 14 && !isString(e.callee) && allowHoistedHelperSet.has(e.callee)) {
    const n = e.arguments[0];
    if (n.type === 4)
      return getConstantType(n, t);
    if (n.type === 14)
      return getConstantTypeOfHelperCall(n, t);
  }
  return 0;
}
function getGeneratedPropsConstantType(e, t) {
  let n = 3;
  const r = getNodeProps(e);
  if (r && r.type === 15) {
    const { properties: s } = r;
    for (let i = 0; i < s.length; i++) {
      const { key: o, value: a } = s[i], l = getConstantType(o, t);
      if (l === 0)
        return l;
      l < n && (n = l);
      let c;
      if (a.type === 4 ? c = getConstantType(a, t) : a.type === 14 ? c = getConstantTypeOfHelperCall(a, t) : c = 0, c === 0)
        return c;
      c < n && (n = c);
    }
  }
  return n;
}
function getNodeProps(e) {
  const t = e.codegenNode;
  if (t.type === 13)
    return t.props;
}
function createTransformContext(e, {
  filename: t = "",
  prefixIdentifiers: n = !1,
  hoistStatic: r = !1,
  hmr: s = !1,
  cacheHandlers: i = !1,
  nodeTransforms: o = [],
  directiveTransforms: a = {},
  transformHoist: l = null,
  isBuiltInComponent: c = NOOP,
  isCustomElement: f = NOOP,
  expressionPlugins: u = [],
  scopeId: d = null,
  slotted: m = !0,
  ssr: v = !1,
  inSSR: S = !1,
  ssrCssVars: I = "",
  bindingMetadata: A = EMPTY_OBJ,
  inline: T = !1,
  isTS: y = !1,
  onError: _ = defaultOnError,
  onWarn: b = defaultOnWarn,
  compatConfig: x
}) {
  const D = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), M = {
    // options
    filename: t,
    selfName: D && capitalize(camelize(D[1])),
    prefixIdentifiers: n,
    hoistStatic: r,
    hmr: s,
    cacheHandlers: i,
    nodeTransforms: o,
    directiveTransforms: a,
    transformHoist: l,
    isBuiltInComponent: c,
    isCustomElement: f,
    expressionPlugins: u,
    scopeId: d,
    slotted: m,
    ssr: v,
    inSSR: S,
    ssrCssVars: I,
    bindingMetadata: A,
    inline: T,
    isTS: y,
    onError: _,
    onWarn: b,
    compatConfig: x,
    // state
    root: e,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: e,
    childIndex: 0,
    inVOnce: !1,
    // methods
    helper(R) {
      const O = M.helpers.get(R) || 0;
      return M.helpers.set(R, O + 1), R;
    },
    removeHelper(R) {
      const O = M.helpers.get(R);
      if (O) {
        const H = O - 1;
        H ? M.helpers.set(R, H) : M.helpers.delete(R);
      }
    },
    helperString(R) {
      return `_${helperNameMap[M.helper(R)]}`;
    },
    replaceNode(R) {
      M.parent.children[M.childIndex] = M.currentNode = R;
    },
    removeNode(R) {
      const O = M.parent.children, H = R ? O.indexOf(R) : M.currentNode ? M.childIndex : -1;
      !R || R === M.currentNode ? (M.currentNode = null, M.onNodeRemoved()) : M.childIndex > H && (M.childIndex--, M.onNodeRemoved()), M.parent.children.splice(H, 1);
    },
    onNodeRemoved: NOOP,
    addIdentifiers(R) {
    },
    removeIdentifiers(R) {
    },
    hoist(R) {
      isString(R) && (R = createSimpleExpression(R)), M.hoists.push(R);
      const O = createSimpleExpression(
        `_hoisted_${M.hoists.length}`,
        !1,
        R.loc,
        2
      );
      return O.hoisted = R, O;
    },
    cache(R, O = !1, H = !1) {
      const N = createCacheExpression(
        M.cached.length,
        R,
        O,
        H
      );
      return M.cached.push(N), N;
    }
  };
  return M.filters = /* @__PURE__ */ new Set(), M;
}
function transform(e, t) {
  const n = createTransformContext(e, t);
  traverseNode(e, n), t.hoistStatic && cacheStatic(e, n), t.ssr || createRootCodegen(e, n), e.helpers = /* @__PURE__ */ new Set([...n.helpers.keys()]), e.components = [...n.components], e.directives = [...n.directives], e.imports = n.imports, e.hoists = n.hoists, e.temps = n.temps, e.cached = n.cached, e.transformed = !0, e.filters = [...n.filters];
}
function createRootCodegen(e, t) {
  const { helper: n } = t, { children: r } = e;
  if (r.length === 1) {
    const s = r[0];
    if (isSingleElementRoot(e, s) && s.codegenNode) {
      const i = s.codegenNode;
      i.type === 13 && convertToBlock(i, t), e.codegenNode = i;
    } else
      e.codegenNode = s;
  } else if (r.length > 1) {
    let s = 64;
    e.codegenNode = createVNodeCall(
      t,
      n(FRAGMENT),
      void 0,
      e.children,
      s,
      void 0,
      void 0,
      !0,
      void 0,
      !1
    );
  }
}
function traverseChildren(e, t) {
  let n = 0;
  const r = () => {
    n--;
  };
  for (; n < e.children.length; n++) {
    const s = e.children[n];
    isString(s) || (t.grandParent = t.parent, t.parent = e, t.childIndex = n, t.onNodeRemoved = r, traverseNode(s, t));
  }
}
function traverseNode(e, t) {
  t.currentNode = e;
  const { nodeTransforms: n } = t, r = [];
  for (let i = 0; i < n.length; i++) {
    const o = n[i](e, t);
    if (o && (isArray$1(o) ? r.push(...o) : r.push(o)), t.currentNode)
      e = t.currentNode;
    else
      return;
  }
  switch (e.type) {
    case 3:
      t.ssr || t.helper(CREATE_COMMENT);
      break;
    case 5:
      t.ssr || t.helper(TO_DISPLAY_STRING);
      break;
    // for container types, further traverse downwards
    case 9:
      for (let i = 0; i < e.branches.length; i++)
        traverseNode(e.branches[i], t);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      traverseChildren(e, t);
      break;
  }
  t.currentNode = e;
  let s = r.length;
  for (; s--; )
    r[s]();
}
function createStructuralDirectiveTransform(e, t) {
  const n = isString(e) ? (r) => r === e : (r) => e.test(r);
  return (r, s) => {
    if (r.type === 1) {
      const { props: i } = r;
      if (r.tagType === 3 && i.some(isVSlot))
        return;
      const o = [];
      for (let a = 0; a < i.length; a++) {
        const l = i[a];
        if (l.type === 7 && n(l.name)) {
          i.splice(a, 1), a--;
          const c = t(r, l, s);
          c && o.push(c);
        }
      }
      return o;
    }
  };
}
const PURE_ANNOTATION = "/*@__PURE__*/", aliasHelper = (e) => `${helperNameMap[e]}: _${helperNameMap[e]}`;
function createCodegenContext(e, {
  mode: t = "function",
  prefixIdentifiers: n = t === "module",
  sourceMap: r = !1,
  filename: s = "template.vue.html",
  scopeId: i = null,
  optimizeImports: o = !1,
  runtimeGlobalName: a = "Vue",
  runtimeModuleName: l = "vue",
  ssrRuntimeModuleName: c = "vue/server-renderer",
  ssr: f = !1,
  isTS: u = !1,
  inSSR: d = !1
}) {
  const m = {
    mode: t,
    prefixIdentifiers: n,
    sourceMap: r,
    filename: s,
    scopeId: i,
    optimizeImports: o,
    runtimeGlobalName: a,
    runtimeModuleName: l,
    ssrRuntimeModuleName: c,
    ssr: f,
    isTS: u,
    inSSR: d,
    source: e.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: !1,
    map: void 0,
    helper(S) {
      return `_${helperNameMap[S]}`;
    },
    push(S, I = -2, A) {
      m.code += S;
    },
    indent() {
      v(++m.indentLevel);
    },
    deindent(S = !1) {
      S ? --m.indentLevel : v(--m.indentLevel);
    },
    newline() {
      v(m.indentLevel);
    }
  };
  function v(S) {
    m.push(
      `
` + "  ".repeat(S),
      0
      /* Start */
    );
  }
  return m;
}
function generate(e, t = {}) {
  const n = createCodegenContext(e, t);
  t.onContextCreated && t.onContextCreated(n);
  const {
    mode: r,
    push: s,
    prefixIdentifiers: i,
    indent: o,
    deindent: a,
    newline: l,
    scopeId: c,
    ssr: f
  } = n, u = Array.from(e.helpers), d = u.length > 0, m = !i && r !== "module";
  genFunctionPreamble(e, n);
  const S = f ? "ssrRender" : "render", A = (f ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
  if (s(`function ${S}(${A}) {`), o(), m && (s("with (_ctx) {"), o(), d && (s(
    `const { ${u.map(aliasHelper).join(", ")} } = _Vue
`,
    -1
    /* End */
  ), l())), e.components.length && (genAssets(e.components, "component", n), (e.directives.length || e.temps > 0) && l()), e.directives.length && (genAssets(e.directives, "directive", n), e.temps > 0 && l()), e.filters && e.filters.length && (l(), genAssets(e.filters, "filter", n), l()), e.temps > 0) {
    s("let ");
    for (let T = 0; T < e.temps; T++)
      s(`${T > 0 ? ", " : ""}_temp${T}`);
  }
  return (e.components.length || e.directives.length || e.temps) && (s(
    `
`,
    0
    /* Start */
  ), l()), f || s("return "), e.codegenNode ? genNode(e.codegenNode, n) : s("null"), m && (a(), s("}")), a(), s("}"), {
    ast: e,
    code: n.code,
    preamble: "",
    map: n.map ? n.map.toJSON() : void 0
  };
}
function genFunctionPreamble(e, t) {
  const {
    ssr: n,
    prefixIdentifiers: r,
    push: s,
    newline: i,
    runtimeModuleName: o,
    runtimeGlobalName: a,
    ssrRuntimeModuleName: l
  } = t, c = a, f = Array.from(e.helpers);
  if (f.length > 0 && (s(
    `const _Vue = ${c}
`,
    -1
    /* End */
  ), e.hoists.length)) {
    const u = [
      CREATE_VNODE,
      CREATE_ELEMENT_VNODE,
      CREATE_COMMENT,
      CREATE_TEXT,
      CREATE_STATIC
    ].filter((d) => f.includes(d)).map(aliasHelper).join(", ");
    s(
      `const { ${u} } = _Vue
`,
      -1
      /* End */
    );
  }
  genHoists(e.hoists, t), i(), s("return ");
}
function genAssets(e, t, { helper: n, push: r, newline: s, isTS: i }) {
  const o = n(
    t === "filter" ? RESOLVE_FILTER : t === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
  );
  for (let a = 0; a < e.length; a++) {
    let l = e[a];
    const c = l.endsWith("__self");
    c && (l = l.slice(0, -6)), r(
      `const ${toValidAssetId(l, t)} = ${o}(${JSON.stringify(l)}${c ? ", true" : ""})${i ? "!" : ""}`
    ), a < e.length - 1 && s();
  }
}
function genHoists(e, t) {
  if (!e.length)
    return;
  t.pure = !0;
  const { push: n, newline: r } = t;
  r();
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    i && (n(`const _hoisted_${s + 1} = `), genNode(i, t), r());
  }
  t.pure = !1;
}
function genNodeListAsArray(e, t) {
  const n = e.length > 3 || !1;
  t.push("["), n && t.indent(), genNodeList(e, t, n), n && t.deindent(), t.push("]");
}
function genNodeList(e, t, n = !1, r = !0) {
  const { push: s, newline: i } = t;
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    isString(a) ? s(
      a,
      -3
      /* Unknown */
    ) : isArray$1(a) ? genNodeListAsArray(a, t) : genNode(a, t), o < e.length - 1 && (n ? (r && s(","), i()) : r && s(", "));
  }
}
function genNode(e, t) {
  if (isString(e)) {
    t.push(
      e,
      -3
      /* Unknown */
    );
    return;
  }
  if (isSymbol(e)) {
    t.push(t.helper(e));
    return;
  }
  switch (e.type) {
    case 1:
    case 9:
    case 11:
      genNode(e.codegenNode, t);
      break;
    case 2:
      genText(e, t);
      break;
    case 4:
      genExpression(e, t);
      break;
    case 5:
      genInterpolation(e, t);
      break;
    case 12:
      genNode(e.codegenNode, t);
      break;
    case 8:
      genCompoundExpression(e, t);
      break;
    case 3:
      genComment(e, t);
      break;
    case 13:
      genVNodeCall(e, t);
      break;
    case 14:
      genCallExpression(e, t);
      break;
    case 15:
      genObjectExpression(e, t);
      break;
    case 17:
      genArrayExpression(e, t);
      break;
    case 18:
      genFunctionExpression(e, t);
      break;
    case 19:
      genConditionalExpression(e, t);
      break;
    case 20:
      genCacheExpression(e, t);
      break;
    case 21:
      genNodeList(e.body, t, !0, !1);
      break;
  }
}
function genText(e, t) {
  t.push(JSON.stringify(e.content), -3, e);
}
function genExpression(e, t) {
  const { content: n, isStatic: r } = e;
  t.push(
    r ? JSON.stringify(n) : n,
    -3,
    e
  );
}
function genInterpolation(e, t) {
  const { push: n, helper: r, pure: s } = t;
  s && n(PURE_ANNOTATION), n(`${r(TO_DISPLAY_STRING)}(`), genNode(e.content, t), n(")");
}
function genCompoundExpression(e, t) {
  for (let n = 0; n < e.children.length; n++) {
    const r = e.children[n];
    isString(r) ? t.push(
      r,
      -3
      /* Unknown */
    ) : genNode(r, t);
  }
}
function genExpressionAsPropertyKey(e, t) {
  const { push: n } = t;
  if (e.type === 8)
    n("["), genCompoundExpression(e, t), n("]");
  else if (e.isStatic) {
    const r = isSimpleIdentifier(e.content) ? e.content : JSON.stringify(e.content);
    n(r, -2, e);
  } else
    n(`[${e.content}]`, -3, e);
}
function genComment(e, t) {
  const { push: n, helper: r, pure: s } = t;
  s && n(PURE_ANNOTATION), n(
    `${r(CREATE_COMMENT)}(${JSON.stringify(e.content)})`,
    -3,
    e
  );
}
function genVNodeCall(e, t) {
  const { push: n, helper: r, pure: s } = t, {
    tag: i,
    props: o,
    children: a,
    patchFlag: l,
    dynamicProps: c,
    directives: f,
    isBlock: u,
    disableTracking: d,
    isComponent: m
  } = e;
  let v;
  l && (v = String(l)), f && n(r(WITH_DIRECTIVES) + "("), u && n(`(${r(OPEN_BLOCK)}(${d ? "true" : ""}), `), s && n(PURE_ANNOTATION);
  const S = u ? getVNodeBlockHelper(t.inSSR, m) : getVNodeHelper(t.inSSR, m);
  n(r(S) + "(", -2, e), genNodeList(
    genNullableArgs([i, o, a, v, c]),
    t
  ), n(")"), u && n(")"), f && (n(", "), genNode(f, t), n(")"));
}
function genNullableArgs(e) {
  let t = e.length;
  for (; t-- && e[t] == null; )
    ;
  return e.slice(0, t + 1).map((n) => n || "null");
}
function genCallExpression(e, t) {
  const { push: n, helper: r, pure: s } = t, i = isString(e.callee) ? e.callee : r(e.callee);
  s && n(PURE_ANNOTATION), n(i + "(", -2, e), genNodeList(e.arguments, t), n(")");
}
function genObjectExpression(e, t) {
  const { push: n, indent: r, deindent: s, newline: i } = t, { properties: o } = e;
  if (!o.length) {
    n("{}", -2, e);
    return;
  }
  const a = o.length > 1 || !1;
  n(a ? "{" : "{ "), a && r();
  for (let l = 0; l < o.length; l++) {
    const { key: c, value: f } = o[l];
    genExpressionAsPropertyKey(c, t), n(": "), genNode(f, t), l < o.length - 1 && (n(","), i());
  }
  a && s(), n(a ? "}" : " }");
}
function genArrayExpression(e, t) {
  genNodeListAsArray(e.elements, t);
}
function genFunctionExpression(e, t) {
  const { push: n, indent: r, deindent: s } = t, { params: i, returns: o, body: a, newline: l, isSlot: c } = e;
  c && n(`_${helperNameMap[WITH_CTX]}(`), n("(", -2, e), isArray$1(i) ? genNodeList(i, t) : i && genNode(i, t), n(") => "), (l || a) && (n("{"), r()), o ? (l && n("return "), isArray$1(o) ? genNodeListAsArray(o, t) : genNode(o, t)) : a && genNode(a, t), (l || a) && (s(), n("}")), c && (e.isNonScopedSlot && n(", undefined, true"), n(")"));
}
function genConditionalExpression(e, t) {
  const { test: n, consequent: r, alternate: s, newline: i } = e, { push: o, indent: a, deindent: l, newline: c } = t;
  if (n.type === 4) {
    const u = !isSimpleIdentifier(n.content);
    u && o("("), genExpression(n, t), u && o(")");
  } else
    o("("), genNode(n, t), o(")");
  i && a(), t.indentLevel++, i || o(" "), o("? "), genNode(r, t), t.indentLevel--, i && c(), i || o(" "), o(": ");
  const f = s.type === 19;
  f || t.indentLevel++, genNode(s, t), f || t.indentLevel--, i && l(
    !0
    /* without newline */
  );
}
function genCacheExpression(e, t) {
  const { push: n, helper: r, indent: s, deindent: i, newline: o } = t, { needPauseTracking: a, needArraySpread: l } = e;
  l && n("[...("), n(`_cache[${e.index}] || (`), a && (s(), n(`${r(SET_BLOCK_TRACKING)}(-1`), e.inVOnce && n(", true"), n("),"), o(), n("(")), n(`_cache[${e.index}] = `), genNode(e.value, t), a && (n(`).cacheIndex = ${e.index},`), o(), n(`${r(SET_BLOCK_TRACKING)}(1),`), o(), n(`_cache[${e.index}]`), i()), n(")"), l && n(")]");
}
new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
);
const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (e, t, n) => processIf(e, t, n, (r, s, i) => {
    const o = n.parent.children;
    let a = o.indexOf(r), l = 0;
    for (; a-- >= 0; ) {
      const c = o[a];
      c && c.type === 9 && (l += c.branches.length);
    }
    return () => {
      if (i)
        r.codegenNode = createCodegenNodeForBranch(
          s,
          l,
          n
        );
      else {
        const c = getParentCondition(r.codegenNode);
        c.alternate = createCodegenNodeForBranch(
          s,
          l + r.branches.length - 1,
          n
        );
      }
    };
  })
);
function processIf(e, t, n, r) {
  if (t.name !== "else" && (!t.exp || !t.exp.content.trim())) {
    const s = t.exp ? t.exp.loc : e.loc;
    n.onError(
      createCompilerError(28, t.loc)
    ), t.exp = createSimpleExpression("true", !1, s);
  }
  if (t.name === "if") {
    const s = createIfBranch(e, t), i = {
      type: 9,
      loc: cloneLoc(e.loc),
      branches: [s]
    };
    if (n.replaceNode(i), r)
      return r(i, s, !0);
  } else {
    const s = n.parent.children;
    let i = s.indexOf(e);
    for (; i-- >= -1; ) {
      const o = s[i];
      if (o && o.type === 3) {
        n.removeNode(o);
        continue;
      }
      if (o && o.type === 2 && !o.content.trim().length) {
        n.removeNode(o);
        continue;
      }
      if (o && o.type === 9) {
        t.name === "else-if" && o.branches[o.branches.length - 1].condition === void 0 && n.onError(
          createCompilerError(30, e.loc)
        ), n.removeNode();
        const a = createIfBranch(e, t);
        o.branches.push(a);
        const l = r && r(o, a, !1);
        traverseNode(a, n), l && l(), n.currentNode = null;
      } else
        n.onError(
          createCompilerError(30, e.loc)
        );
      break;
    }
  }
}
function createIfBranch(e, t) {
  const n = e.tagType === 3;
  return {
    type: 10,
    loc: e.loc,
    condition: t.name === "else" ? void 0 : t.exp,
    children: n && !findDir(e, "for") ? e.children : [e],
    userKey: findProp(e, "key"),
    isTemplateIf: n
  };
}
function createCodegenNodeForBranch(e, t, n) {
  return e.condition ? createConditionalExpression(
    e.condition,
    createChildrenCodegenNode(e, t, n),
    // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    createCallExpression(n.helper(CREATE_COMMENT), [
      '""',
      "true"
    ])
  ) : createChildrenCodegenNode(e, t, n);
}
function createChildrenCodegenNode(e, t, n) {
  const { helper: r } = n, s = createObjectProperty(
    "key",
    createSimpleExpression(
      `${t}`,
      !1,
      locStub,
      2
    )
  ), { children: i } = e, o = i[0];
  if (i.length !== 1 || o.type !== 1)
    if (i.length === 1 && o.type === 11) {
      const l = o.codegenNode;
      return injectProp(l, s, n), l;
    } else
      return createVNodeCall(
        n,
        r(FRAGMENT),
        createObjectExpression([s]),
        i,
        64,
        void 0,
        void 0,
        !0,
        !1,
        !1,
        e.loc
      );
  else {
    const l = o.codegenNode, c = getMemoedVNodeCall(l);
    return c.type === 13 && convertToBlock(c, n), injectProp(c, s, n), l;
  }
}
function getParentCondition(e) {
  for (; ; )
    if (e.type === 19)
      if (e.alternate.type === 19)
        e = e.alternate;
      else
        return e;
    else e.type === 20 && (e = e.value);
}
const transformBind = (e, t, n) => {
  const { modifiers: r, loc: s } = e, i = e.arg;
  let { exp: o } = e;
  if (o && o.type === 4 && !o.content.trim() && (o = void 0), !o) {
    if (i.type !== 4 || !i.isStatic)
      return n.onError(
        createCompilerError(
          52,
          i.loc
        )
      ), {
        props: [
          createObjectProperty(i, createSimpleExpression("", !0, s))
        ]
      };
    transformBindShorthand(e), o = e.exp;
  }
  return i.type !== 4 ? (i.children.unshift("("), i.children.push(') || ""')) : i.isStatic || (i.content = `${i.content} || ""`), r.some((a) => a.content === "camel") && (i.type === 4 ? i.isStatic ? i.content = camelize(i.content) : i.content = `${n.helperString(CAMELIZE)}(${i.content})` : (i.children.unshift(`${n.helperString(CAMELIZE)}(`), i.children.push(")"))), n.inSSR || (r.some((a) => a.content === "prop") && injectPrefix(i, "."), r.some((a) => a.content === "attr") && injectPrefix(i, "^")), {
    props: [createObjectProperty(i, o)]
  };
}, transformBindShorthand = (e, t) => {
  const n = e.arg, r = camelize(n.content);
  e.exp = createSimpleExpression(r, !1, n.loc);
}, injectPrefix = (e, t) => {
  e.type === 4 ? e.isStatic ? e.content = t + e.content : e.content = `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
}, transformFor = createStructuralDirectiveTransform(
  "for",
  (e, t, n) => {
    const { helper: r, removeHelper: s } = n;
    return processFor(e, t, n, (i) => {
      const o = createCallExpression(r(RENDER_LIST), [
        i.source
      ]), a = isTemplateNode(e), l = findDir(e, "memo"), c = findProp(e, "key", !1, !0);
      c && c.type === 7 && !c.exp && transformBindShorthand(c);
      let u = c && (c.type === 6 ? c.value ? createSimpleExpression(c.value.content, !0) : void 0 : c.exp);
      const d = c && u ? createObjectProperty("key", u) : null, m = i.source.type === 4 && i.source.constType > 0, v = m ? 64 : c ? 128 : 256;
      return i.codegenNode = createVNodeCall(
        n,
        r(FRAGMENT),
        void 0,
        o,
        v,
        void 0,
        void 0,
        !0,
        !m,
        !1,
        e.loc
      ), () => {
        let S;
        const { children: I } = i, A = I.length !== 1 || I[0].type !== 1, T = isSlotOutlet(e) ? e : a && e.children.length === 1 && isSlotOutlet(e.children[0]) ? e.children[0] : null;
        if (T ? (S = T.codegenNode, a && d && injectProp(S, d, n)) : A ? S = createVNodeCall(
          n,
          r(FRAGMENT),
          d ? createObjectExpression([d]) : void 0,
          e.children,
          64,
          void 0,
          void 0,
          !0,
          void 0,
          !1
        ) : (S = I[0].codegenNode, a && d && injectProp(S, d, n), S.isBlock !== !m && (S.isBlock ? (s(OPEN_BLOCK), s(
          getVNodeBlockHelper(n.inSSR, S.isComponent)
        )) : s(
          getVNodeHelper(n.inSSR, S.isComponent)
        )), S.isBlock = !m, S.isBlock ? (r(OPEN_BLOCK), r(getVNodeBlockHelper(n.inSSR, S.isComponent))) : r(getVNodeHelper(n.inSSR, S.isComponent))), l) {
          const y = createFunctionExpression(
            createForLoopParams(i.parseResult, [
              createSimpleExpression("_cached")
            ])
          );
          y.body = createBlockStatement([
            createCompoundExpression(["const _memo = (", l.exp, ")"]),
            createCompoundExpression([
              "if (_cached",
              ...u ? [" && _cached.key === ", u] : [],
              ` && ${n.helperString(
                IS_MEMO_SAME
              )}(_cached, _memo)) return _cached`
            ]),
            createCompoundExpression(["const _item = ", S]),
            createSimpleExpression("_item.memo = _memo"),
            createSimpleExpression("return _item")
          ]), o.arguments.push(
            y,
            createSimpleExpression("_cache"),
            createSimpleExpression(String(n.cached.length))
          ), n.cached.push(null);
        } else
          o.arguments.push(
            createFunctionExpression(
              createForLoopParams(i.parseResult),
              S,
              !0
            )
          );
      };
    });
  }
);
function processFor(e, t, n, r) {
  if (!t.exp) {
    n.onError(
      createCompilerError(31, t.loc)
    );
    return;
  }
  const s = t.forParseResult;
  if (!s) {
    n.onError(
      createCompilerError(32, t.loc)
    );
    return;
  }
  finalizeForParseResult(s);
  const { addIdentifiers: i, removeIdentifiers: o, scopes: a } = n, { source: l, value: c, key: f, index: u } = s, d = {
    type: 11,
    loc: t.loc,
    source: l,
    valueAlias: c,
    keyAlias: f,
    objectIndexAlias: u,
    parseResult: s,
    children: isTemplateNode(e) ? e.children : [e]
  };
  n.replaceNode(d), a.vFor++;
  const m = r && r(d);
  return () => {
    a.vFor--, m && m();
  };
}
function finalizeForParseResult(e, t) {
  e.finalized || (e.finalized = !0);
}
function createForLoopParams({ value: e, key: t, index: n }, r = []) {
  return createParamsList([e, t, n, ...r]);
}
function createParamsList(e) {
  let t = e.length;
  for (; t-- && !e[t]; )
    ;
  return e.slice(0, t + 1).map((n, r) => n || createSimpleExpression("_".repeat(r + 1), !1));
}
const defaultFallback = createSimpleExpression("undefined", !1), trackSlotScopes = (e, t) => {
  if (e.type === 1 && (e.tagType === 1 || e.tagType === 3)) {
    const n = findDir(e, "slot");
    if (n)
      return n.exp, t.scopes.vSlot++, () => {
        t.scopes.vSlot--;
      };
  }
}, buildClientSlotFn = (e, t, n, r) => createFunctionExpression(
  e,
  n,
  !1,
  !0,
  n.length ? n[0].loc : r
);
function buildSlots(e, t, n = buildClientSlotFn) {
  t.helper(WITH_CTX);
  const { children: r, loc: s } = e, i = [], o = [];
  let a = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
  const l = findDir(e, "slot", !0);
  if (l) {
    const { arg: I, exp: A } = l;
    I && !isStaticExp(I) && (a = !0), i.push(
      createObjectProperty(
        I || createSimpleExpression("default", !0),
        n(A, void 0, r, s)
      )
    );
  }
  let c = !1, f = !1;
  const u = [], d = /* @__PURE__ */ new Set();
  let m = 0;
  for (let I = 0; I < r.length; I++) {
    const A = r[I];
    let T;
    if (!isTemplateNode(A) || !(T = findDir(A, "slot", !0))) {
      A.type !== 3 && u.push(A);
      continue;
    }
    if (l) {
      t.onError(
        createCompilerError(37, T.loc)
      );
      break;
    }
    c = !0;
    const { children: y, loc: _ } = A, {
      arg: b = createSimpleExpression("default", !0),
      exp: x,
      loc: D
    } = T;
    let M;
    isStaticExp(b) ? M = b ? b.content : "default" : a = !0;
    const R = findDir(A, "for"), O = n(x, R, y, _);
    let H, N;
    if (H = findDir(A, "if"))
      a = !0, o.push(
        createConditionalExpression(
          H.exp,
          buildDynamicSlot(b, O, m++),
          defaultFallback
        )
      );
    else if (N = findDir(
      A,
      /^else(-if)?$/,
      !0
      /* allowEmpty */
    )) {
      let F = I, G;
      for (; F-- && (G = r[F], G.type === 3); )
        ;
      if (G && isTemplateNode(G) && findDir(G, /^(else-)?if$/)) {
        let J = o[o.length - 1];
        for (; J.alternate.type === 19; )
          J = J.alternate;
        J.alternate = N.exp ? createConditionalExpression(
          N.exp,
          buildDynamicSlot(
            b,
            O,
            m++
          ),
          defaultFallback
        ) : buildDynamicSlot(b, O, m++);
      } else
        t.onError(
          createCompilerError(30, N.loc)
        );
    } else if (R) {
      a = !0;
      const F = R.forParseResult;
      F ? (finalizeForParseResult(F), o.push(
        createCallExpression(t.helper(RENDER_LIST), [
          F.source,
          createFunctionExpression(
            createForLoopParams(F),
            buildDynamicSlot(b, O),
            !0
          )
        ])
      )) : t.onError(
        createCompilerError(
          32,
          R.loc
        )
      );
    } else {
      if (M) {
        if (d.has(M)) {
          t.onError(
            createCompilerError(
              38,
              D
            )
          );
          continue;
        }
        d.add(M), M === "default" && (f = !0);
      }
      i.push(createObjectProperty(b, O));
    }
  }
  if (!l) {
    const I = (A, T) => {
      const y = n(A, void 0, T, s);
      return t.compatConfig && (y.isNonScopedSlot = !0), createObjectProperty("default", y);
    };
    c ? u.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    u.some((A) => isNonWhitespaceContent(A)) && (f ? t.onError(
      createCompilerError(
        39,
        u[0].loc
      )
    ) : i.push(
      I(void 0, u)
    )) : i.push(I(void 0, r));
  }
  const v = a ? 2 : hasForwardedSlots(e.children) ? 3 : 1;
  let S = createObjectExpression(
    i.concat(
      createObjectProperty(
        "_",
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        createSimpleExpression(
          v + "",
          !1
        )
      )
    ),
    s
  );
  return o.length && (S = createCallExpression(t.helper(CREATE_SLOTS), [
    S,
    createArrayExpression(o)
  ])), {
    slots: S,
    hasDynamicSlots: a
  };
}
function buildDynamicSlot(e, t, n) {
  const r = [
    createObjectProperty("name", e),
    createObjectProperty("fn", t)
  ];
  return n != null && r.push(
    createObjectProperty("key", createSimpleExpression(String(n), !0))
  ), createObjectExpression(r);
}
function hasForwardedSlots(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    switch (n.type) {
      case 1:
        if (n.tagType === 2 || hasForwardedSlots(n.children))
          return !0;
        break;
      case 9:
        if (hasForwardedSlots(n.branches)) return !0;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(n.children)) return !0;
        break;
    }
  }
  return !1;
}
function isNonWhitespaceContent(e) {
  return e.type !== 2 && e.type !== 12 ? !0 : e.type === 2 ? !!e.content.trim() : isNonWhitespaceContent(e.content);
}
const directiveImportMap = /* @__PURE__ */ new WeakMap(), transformElement = (e, t) => function() {
  if (e = t.currentNode, !(e.type === 1 && (e.tagType === 0 || e.tagType === 1)))
    return;
  const { tag: r, props: s } = e, i = e.tagType === 1;
  let o = i ? resolveComponentType(e, t) : `"${r}"`;
  const a = isObject(o) && o.callee === RESOLVE_DYNAMIC_COMPONENT;
  let l, c, f = 0, u, d, m, v = (
    // dynamic component may resolve to plain elements
    a || o === TELEPORT || o === SUSPENSE || !i && // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    (r === "svg" || r === "foreignObject" || r === "math")
  );
  if (s.length > 0) {
    const S = buildProps(
      e,
      t,
      void 0,
      i,
      a
    );
    l = S.props, f = S.patchFlag, d = S.dynamicPropNames;
    const I = S.directives;
    m = I && I.length ? createArrayExpression(
      I.map((A) => buildDirectiveArgs(A, t))
    ) : void 0, S.shouldUseBlock && (v = !0);
  }
  if (e.children.length > 0)
    if (o === KEEP_ALIVE && (v = !0, f |= 1024), i && // Teleport is not a real component and has dedicated runtime handling
    o !== TELEPORT && // explained above.
    o !== KEEP_ALIVE) {
      const { slots: I, hasDynamicSlots: A } = buildSlots(e, t);
      c = I, A && (f |= 1024);
    } else if (e.children.length === 1 && o !== TELEPORT) {
      const I = e.children[0], A = I.type, T = A === 5 || A === 8;
      T && getConstantType(I, t) === 0 && (f |= 1), T || A === 2 ? c = I : c = e.children;
    } else
      c = e.children;
  d && d.length && (u = stringifyDynamicPropNames(d)), e.codegenNode = createVNodeCall(
    t,
    o,
    l,
    c,
    f === 0 ? void 0 : f,
    u,
    m,
    !!v,
    !1,
    i,
    e.loc
  );
};
function resolveComponentType(e, t, n = !1) {
  let { tag: r } = e;
  const s = isComponentTag(r), i = findProp(
    e,
    "is",
    !1,
    !0
    /* allow empty */
  );
  if (i)
    if (s || isCompatEnabled(
      "COMPILER_IS_ON_ELEMENT",
      t
    )) {
      let a;
      if (i.type === 6 ? a = i.value && createSimpleExpression(i.value.content, !0) : (a = i.exp, a || (a = createSimpleExpression("is", !1, i.arg.loc))), a)
        return createCallExpression(t.helper(RESOLVE_DYNAMIC_COMPONENT), [
          a
        ]);
    } else i.type === 6 && i.value.content.startsWith("vue:") && (r = i.value.content.slice(4));
  const o = isCoreComponent(r) || t.isBuiltInComponent(r);
  return o ? (n || t.helper(o), o) : (t.helper(RESOLVE_COMPONENT), t.components.add(r), toValidAssetId(r, "component"));
}
function buildProps(e, t, n = e.props, r, s, i = !1) {
  const { tag: o, loc: a, children: l } = e;
  let c = [];
  const f = [], u = [], d = l.length > 0;
  let m = !1, v = 0, S = !1, I = !1, A = !1, T = !1, y = !1, _ = !1;
  const b = [], x = (O) => {
    c.length && (f.push(
      createObjectExpression(dedupeProperties(c), a)
    ), c = []), O && f.push(O);
  }, D = () => {
    t.scopes.vFor > 0 && c.push(
      createObjectProperty(
        createSimpleExpression("ref_for", !0),
        createSimpleExpression("true")
      )
    );
  }, M = ({ key: O, value: H }) => {
    if (isStaticExp(O)) {
      const N = O.content, F = isOn(N);
      if (F && (!r || s) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      N.toLowerCase() !== "onclick" && // omit v-model handlers
      N !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !isReservedProp(N) && (T = !0), F && isReservedProp(N) && (_ = !0), F && H.type === 14 && (H = H.arguments[0]), H.type === 20 || (H.type === 4 || H.type === 8) && getConstantType(H, t) > 0)
        return;
      N === "ref" ? S = !0 : N === "class" ? I = !0 : N === "style" ? A = !0 : N !== "key" && !b.includes(N) && b.push(N), r && (N === "class" || N === "style") && !b.includes(N) && b.push(N);
    } else
      y = !0;
  };
  for (let O = 0; O < n.length; O++) {
    const H = n[O];
    if (H.type === 6) {
      const { loc: N, name: F, nameLoc: G, value: J } = H;
      let K = !0;
      if (F === "ref" && (S = !0, D()), F === "is" && (isComponentTag(o) || J && J.content.startsWith("vue:") || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        t
      )))
        continue;
      c.push(
        createObjectProperty(
          createSimpleExpression(F, !0, G),
          createSimpleExpression(
            J ? J.content : "",
            K,
            J ? J.loc : N
          )
        )
      );
    } else {
      const { name: N, arg: F, exp: G, loc: J, modifiers: K } = H, X = N === "bind", z = N === "on";
      if (N === "slot") {
        r || t.onError(
          createCompilerError(40, J)
        );
        continue;
      }
      if (N === "once" || N === "memo" || N === "is" || X && isStaticArgOf(F, "is") && (isComponentTag(o) || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        t
      )) || z && i)
        continue;
      if (
        // #938: elements with dynamic keys should be forced into blocks
        (X && isStaticArgOf(F, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        z && d && isStaticArgOf(F, "vue:before-update")) && (m = !0), X && isStaticArgOf(F, "ref") && D(), !F && (X || z)
      ) {
        if (y = !0, G)
          if (X) {
            if (D(), x(), isCompatEnabled(
              "COMPILER_V_BIND_OBJECT_ORDER",
              t
            )) {
              f.unshift(G);
              continue;
            }
            f.push(G);
          } else
            x({
              type: 14,
              loc: J,
              callee: t.helper(TO_HANDLERS),
              arguments: r ? [G] : [G, "true"]
            });
        else
          t.onError(
            createCompilerError(
              X ? 34 : 35,
              J
            )
          );
        continue;
      }
      X && K.some((ae) => ae.content === "prop") && (v |= 32);
      const ie = t.directiveTransforms[N];
      if (ie) {
        const { props: ae, needRuntime: ce } = ie(H, e, t);
        !i && ae.forEach(M), z && F && !isStaticExp(F) ? x(createObjectExpression(ae, a)) : c.push(...ae), ce && (u.push(H), isSymbol(ce) && directiveImportMap.set(H, ce));
      } else isBuiltInDirective(N) || (u.push(H), d && (m = !0));
    }
  }
  let R;
  if (f.length ? (x(), f.length > 1 ? R = createCallExpression(
    t.helper(MERGE_PROPS),
    f,
    a
  ) : R = f[0]) : c.length && (R = createObjectExpression(
    dedupeProperties(c),
    a
  )), y ? v |= 16 : (I && !r && (v |= 2), A && !r && (v |= 4), b.length && (v |= 8), T && (v |= 32)), !m && (v === 0 || v === 32) && (S || _ || u.length > 0) && (v |= 512), !t.inSSR && R)
    switch (R.type) {
      case 15:
        let O = -1, H = -1, N = !1;
        for (let J = 0; J < R.properties.length; J++) {
          const K = R.properties[J].key;
          isStaticExp(K) ? K.content === "class" ? O = J : K.content === "style" && (H = J) : K.isHandlerKey || (N = !0);
        }
        const F = R.properties[O], G = R.properties[H];
        N ? R = createCallExpression(
          t.helper(NORMALIZE_PROPS),
          [R]
        ) : (F && !isStaticExp(F.value) && (F.value = createCallExpression(
          t.helper(NORMALIZE_CLASS),
          [F.value]
        )), G && // the static style is compiled into an object,
        // so use `hasStyleBinding` to ensure that it is a dynamic style binding
        (A || G.value.type === 4 && G.value.content.trim()[0] === "[" || // v-bind:style and style both exist,
        // v-bind:style with static literal object
        G.value.type === 17) && (G.value = createCallExpression(
          t.helper(NORMALIZE_STYLE),
          [G.value]
        )));
        break;
      case 14:
        break;
      default:
        R = createCallExpression(
          t.helper(NORMALIZE_PROPS),
          [
            createCallExpression(t.helper(GUARD_REACTIVE_PROPS), [
              R
            ])
          ]
        );
        break;
    }
  return {
    props: R,
    directives: u,
    patchFlag: v,
    dynamicPropNames: b,
    shouldUseBlock: m
  };
}
function dedupeProperties(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (s.key.type === 8 || !s.key.isStatic) {
      n.push(s);
      continue;
    }
    const i = s.key.content, o = t.get(i);
    o ? (i === "style" || i === "class" || isOn(i)) && mergeAsArray(o, s) : (t.set(i, s), n.push(s));
  }
  return n;
}
function mergeAsArray(e, t) {
  e.value.type === 17 ? e.value.elements.push(t.value) : e.value = createArrayExpression(
    [e.value, t.value],
    e.loc
  );
}
function buildDirectiveArgs(e, t) {
  const n = [], r = directiveImportMap.get(e);
  r ? n.push(t.helperString(r)) : (t.helper(RESOLVE_DIRECTIVE), t.directives.add(e.name), n.push(toValidAssetId(e.name, "directive")));
  const { loc: s } = e;
  if (e.exp && n.push(e.exp), e.arg && (e.exp || n.push("void 0"), n.push(e.arg)), Object.keys(e.modifiers).length) {
    e.arg || (e.exp || n.push("void 0"), n.push("void 0"));
    const i = createSimpleExpression("true", !1, s);
    n.push(
      createObjectExpression(
        e.modifiers.map(
          (o) => createObjectProperty(o, i)
        ),
        s
      )
    );
  }
  return createArrayExpression(n, e.loc);
}
function stringifyDynamicPropNames(e) {
  let t = "[";
  for (let n = 0, r = e.length; n < r; n++)
    t += JSON.stringify(e[n]), n < r - 1 && (t += ", ");
  return t + "]";
}
function isComponentTag(e) {
  return e === "component" || e === "Component";
}
const transformSlotOutlet = (e, t) => {
  if (isSlotOutlet(e)) {
    const { children: n, loc: r } = e, { slotName: s, slotProps: i } = processSlotOutlet(e, t), o = [
      t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
      s,
      "{}",
      "undefined",
      "true"
    ];
    let a = 2;
    i && (o[2] = i, a = 3), n.length && (o[3] = createFunctionExpression([], n, !1, !1, r), a = 4), t.scopeId && !t.slotted && (a = 5), o.splice(a), e.codegenNode = createCallExpression(
      t.helper(RENDER_SLOT),
      o,
      r
    );
  }
};
function processSlotOutlet(e, t) {
  let n = '"default"', r;
  const s = [];
  for (let i = 0; i < e.props.length; i++) {
    const o = e.props[i];
    if (o.type === 6)
      o.value && (o.name === "name" ? n = JSON.stringify(o.value.content) : (o.name = camelize(o.name), s.push(o)));
    else if (o.name === "bind" && isStaticArgOf(o.arg, "name")) {
      if (o.exp)
        n = o.exp;
      else if (o.arg && o.arg.type === 4) {
        const a = camelize(o.arg.content);
        n = o.exp = createSimpleExpression(a, !1, o.arg.loc);
      }
    } else
      o.name === "bind" && o.arg && isStaticExp(o.arg) && (o.arg.content = camelize(o.arg.content)), s.push(o);
  }
  if (s.length > 0) {
    const { props: i, directives: o } = buildProps(
      e,
      t,
      s,
      !1,
      !1
    );
    r = i, o.length && t.onError(
      createCompilerError(
        36,
        o[0].loc
      )
    );
  }
  return {
    slotName: n,
    slotProps: r
  };
}
const transformOn$1 = (e, t, n, r) => {
  const { loc: s, modifiers: i, arg: o } = e;
  !e.exp && !i.length && n.onError(createCompilerError(35, s));
  let a;
  if (o.type === 4)
    if (o.isStatic) {
      let u = o.content;
      u.startsWith("vue:") && (u = `vnode-${u.slice(4)}`);
      const d = t.tagType !== 0 || u.startsWith("vnode") || !/[A-Z]/.test(u) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        toHandlerKey(camelize(u))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${u}`
      );
      a = createSimpleExpression(d, !0, o.loc);
    } else
      a = createCompoundExpression([
        `${n.helperString(TO_HANDLER_KEY)}(`,
        o,
        ")"
      ]);
  else
    a = o, a.children.unshift(`${n.helperString(TO_HANDLER_KEY)}(`), a.children.push(")");
  let l = e.exp;
  l && !l.content.trim() && (l = void 0);
  let c = n.cacheHandlers && !l && !n.inVOnce;
  if (l) {
    const u = isMemberExpression(l), d = !(u || isFnExpression(l)), m = l.content.includes(";");
    (d || c && u) && (l = createCompoundExpression([
      `${d ? "$event" : "(...args)"} => ${m ? "{" : "("}`,
      l,
      m ? "}" : ")"
    ]));
  }
  let f = {
    props: [
      createObjectProperty(
        a,
        l || createSimpleExpression("() => {}", !1, s)
      )
    ]
  };
  return r && (f = r(f)), c && (f.props[0].value = n.cache(f.props[0].value)), f.props.forEach((u) => u.key.isHandlerKey = !0), f;
}, transformText = (e, t) => {
  if (e.type === 0 || e.type === 1 || e.type === 11 || e.type === 10)
    return () => {
      const n = e.children;
      let r, s = !1;
      for (let i = 0; i < n.length; i++) {
        const o = n[i];
        if (isText$1(o)) {
          s = !0;
          for (let a = i + 1; a < n.length; a++) {
            const l = n[a];
            if (isText$1(l))
              r || (r = n[i] = createCompoundExpression(
                [o],
                o.loc
              )), r.children.push(" + ", l), n.splice(a, 1), a--;
            else {
              r = void 0;
              break;
            }
          }
        }
      }
      if (!(!s || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      n.length === 1 && (e.type === 0 || e.type === 1 && e.tagType === 0 && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !e.props.find(
        (i) => i.type === 7 && !t.directiveTransforms[i.name]
      ) && e.tag !== "template")))
        for (let i = 0; i < n.length; i++) {
          const o = n[i];
          if (isText$1(o) || o.type === 8) {
            const a = [];
            (o.type !== 2 || o.content !== " ") && a.push(o), !t.ssr && getConstantType(o, t) === 0 && a.push(
              "1"
            ), n[i] = {
              type: 12,
              content: o,
              loc: o.loc,
              codegenNode: createCallExpression(
                t.helper(CREATE_TEXT),
                a
              )
            };
          }
        }
    };
}, seen$1 = /* @__PURE__ */ new WeakSet(), transformOnce = (e, t) => {
  if (e.type === 1 && findDir(e, "once", !0))
    return seen$1.has(e) || t.inVOnce || t.inSSR ? void 0 : (seen$1.add(e), t.inVOnce = !0, t.helper(SET_BLOCK_TRACKING), () => {
      t.inVOnce = !1;
      const n = t.currentNode;
      n.codegenNode && (n.codegenNode = t.cache(
        n.codegenNode,
        !0,
        !0
      ));
    });
}, transformModel$1 = (e, t, n) => {
  const { exp: r, arg: s } = e;
  if (!r)
    return n.onError(
      createCompilerError(41, e.loc)
    ), createTransformProps();
  const i = r.loc.source.trim(), o = r.type === 4 ? r.content : i, a = n.bindingMetadata[i];
  if (a === "props" || a === "props-aliased")
    return n.onError(createCompilerError(44, r.loc)), createTransformProps();
  if (!o.trim() || !isMemberExpression(r))
    return n.onError(
      createCompilerError(42, r.loc)
    ), createTransformProps();
  const l = s || createSimpleExpression("modelValue", !0), c = s ? isStaticExp(s) ? `onUpdate:${camelize(s.content)}` : createCompoundExpression(['"onUpdate:" + ', s]) : "onUpdate:modelValue";
  let f;
  const u = n.isTS ? "($event: any)" : "$event";
  f = createCompoundExpression([
    `${u} => ((`,
    r,
    ") = $event)"
  ]);
  const d = [
    // modelValue: foo
    createObjectProperty(l, e.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    createObjectProperty(c, f)
  ];
  if (e.modifiers.length && t.tagType === 1) {
    const m = e.modifiers.map((S) => S.content).map((S) => (isSimpleIdentifier(S) ? S : JSON.stringify(S)) + ": true").join(", "), v = s ? isStaticExp(s) ? `${s.content}Modifiers` : createCompoundExpression([s, ' + "Modifiers"']) : "modelModifiers";
    d.push(
      createObjectProperty(
        v,
        createSimpleExpression(
          `{ ${m} }`,
          !1,
          e.loc,
          2
        )
      )
    );
  }
  return createTransformProps(d);
};
function createTransformProps(e = []) {
  return { props: e };
}
const validDivisionCharRE = /[\w).+\-_$\]]/, transformFilter = (e, t) => {
  isCompatEnabled("COMPILER_FILTERS", t) && (e.type === 5 ? rewriteFilter(e.content, t) : e.type === 1 && e.props.forEach((n) => {
    n.type === 7 && n.name !== "for" && n.exp && rewriteFilter(n.exp, t);
  }));
};
function rewriteFilter(e, t) {
  if (e.type === 4)
    parseFilter(e, t);
  else
    for (let n = 0; n < e.children.length; n++) {
      const r = e.children[n];
      typeof r == "object" && (r.type === 4 ? parseFilter(r, t) : r.type === 8 ? rewriteFilter(e, t) : r.type === 5 && rewriteFilter(r.content, t));
    }
}
function parseFilter(e, t) {
  const n = e.content;
  let r = !1, s = !1, i = !1, o = !1, a = 0, l = 0, c = 0, f = 0, u, d, m, v, S = [];
  for (m = 0; m < n.length; m++)
    if (d = u, u = n.charCodeAt(m), r)
      u === 39 && d !== 92 && (r = !1);
    else if (s)
      u === 34 && d !== 92 && (s = !1);
    else if (i)
      u === 96 && d !== 92 && (i = !1);
    else if (o)
      u === 47 && d !== 92 && (o = !1);
    else if (u === 124 && // pipe
    n.charCodeAt(m + 1) !== 124 && n.charCodeAt(m - 1) !== 124 && !a && !l && !c)
      v === void 0 ? (f = m + 1, v = n.slice(0, m).trim()) : I();
    else {
      switch (u) {
        case 34:
          s = !0;
          break;
        // "
        case 39:
          r = !0;
          break;
        // '
        case 96:
          i = !0;
          break;
        // `
        case 40:
          c++;
          break;
        // (
        case 41:
          c--;
          break;
        // )
        case 91:
          l++;
          break;
        // [
        case 93:
          l--;
          break;
        // ]
        case 123:
          a++;
          break;
        // {
        case 125:
          a--;
          break;
      }
      if (u === 47) {
        let A = m - 1, T;
        for (; A >= 0 && (T = n.charAt(A), T === " "); A--)
          ;
        (!T || !validDivisionCharRE.test(T)) && (o = !0);
      }
    }
  v === void 0 ? v = n.slice(0, m).trim() : f !== 0 && I();
  function I() {
    S.push(n.slice(f, m).trim()), f = m + 1;
  }
  if (S.length) {
    for (m = 0; m < S.length; m++)
      v = wrapFilter(v, S[m], t);
    e.content = v, e.ast = void 0;
  }
}
function wrapFilter(e, t, n) {
  n.helper(RESOLVE_FILTER);
  const r = t.indexOf("(");
  if (r < 0)
    return n.filters.add(t), `${toValidAssetId(t, "filter")}(${e})`;
  {
    const s = t.slice(0, r), i = t.slice(r + 1);
    return n.filters.add(s), `${toValidAssetId(s, "filter")}(${e}${i !== ")" ? "," + i : i}`;
  }
}
const seen = /* @__PURE__ */ new WeakSet(), transformMemo = (e, t) => {
  if (e.type === 1) {
    const n = findDir(e, "memo");
    return !n || seen.has(e) ? void 0 : (seen.add(e), () => {
      const r = e.codegenNode || t.currentNode.codegenNode;
      r && r.type === 13 && (e.tagType !== 1 && convertToBlock(r, t), e.codegenNode = createCallExpression(t.helper(WITH_MEMO), [
        n.exp,
        createFunctionExpression(void 0, r),
        "_cache",
        String(t.cached.length)
      ]), t.cached.push(null));
    });
  }
};
function getBaseTransformPreset(e) {
  return [
    [
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      transformFilter,
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn$1,
      bind: transformBind,
      model: transformModel$1
    }
  ];
}
function baseCompile(e, t = {}) {
  const n = t.onError || defaultOnError, r = t.mode === "module";
  t.prefixIdentifiers === !0 ? n(createCompilerError(47)) : r && n(createCompilerError(48));
  const s = !1;
  t.cacheHandlers && n(createCompilerError(49)), t.scopeId && !r && n(createCompilerError(50));
  const i = extend({}, t, {
    prefixIdentifiers: s
  }), o = isString(e) ? baseParse(e, i) : e, [a, l] = getBaseTransformPreset();
  return transform(
    o,
    extend({}, i, {
      nodeTransforms: [
        ...a,
        ...t.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: extend(
        {},
        l,
        t.directiveTransforms || {}
        // user transforms
      )
    })
  ), generate(o, i);
}
const noopDirectiveTransform = () => ({ props: [] });
/**
* @vue/compiler-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const V_MODEL_RADIO = Symbol(""), V_MODEL_CHECKBOX = Symbol(
  ""
), V_MODEL_TEXT = Symbol(""), V_MODEL_SELECT = Symbol(
  ""
), V_MODEL_DYNAMIC = Symbol(
  ""
), V_ON_WITH_MODIFIERS = Symbol(
  ""
), V_ON_WITH_KEYS = Symbol(
  ""
), V_SHOW = Symbol(""), TRANSITION = Symbol(""), TRANSITION_GROUP = Symbol(
  ""
);
registerRuntimeHelpers({
  [V_MODEL_RADIO]: "vModelRadio",
  [V_MODEL_CHECKBOX]: "vModelCheckbox",
  [V_MODEL_TEXT]: "vModelText",
  [V_MODEL_SELECT]: "vModelSelect",
  [V_MODEL_DYNAMIC]: "vModelDynamic",
  [V_ON_WITH_MODIFIERS]: "withModifiers",
  [V_ON_WITH_KEYS]: "withKeys",
  [V_SHOW]: "vShow",
  [TRANSITION]: "Transition",
  [TRANSITION_GROUP]: "TransitionGroup"
});
let decoder;
function decodeHtmlBrowser(e, t = !1) {
  return decoder || (decoder = document.createElement("div")), t ? (decoder.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, decoder.children[0].getAttribute("foo")) : (decoder.innerHTML = e, decoder.textContent);
}
const parserOptions = {
  parseMode: "html",
  isVoidTag,
  isNativeTag: (e) => isHTMLTag(e) || isSVGTag(e) || isMathMLTag(e),
  isPreTag: (e) => e === "pre",
  isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
  decodeEntities: decodeHtmlBrowser,
  isBuiltInComponent: (e) => {
    if (e === "Transition" || e === "transition")
      return TRANSITION;
    if (e === "TransitionGroup" || e === "transition-group")
      return TRANSITION_GROUP;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(e, t, n) {
    let r = t ? t.ns : n;
    if (t && r === 2)
      if (t.tag === "annotation-xml") {
        if (e === "svg")
          return 1;
        t.props.some(
          (s) => s.type === 6 && s.name === "encoding" && s.value != null && (s.value.content === "text/html" || s.value.content === "application/xhtml+xml")
        ) && (r = 0);
      } else /^m(?:[ions]|text)$/.test(t.tag) && e !== "mglyph" && e !== "malignmark" && (r = 0);
    else t && r === 1 && (t.tag === "foreignObject" || t.tag === "desc" || t.tag === "title") && (r = 0);
    if (r === 0) {
      if (e === "svg")
        return 1;
      if (e === "math")
        return 2;
    }
    return r;
  }
}, transformStyle = (e) => {
  e.type === 1 && e.props.forEach((t, n) => {
    t.type === 6 && t.name === "style" && t.value && (e.props[n] = {
      type: 7,
      name: "bind",
      arg: createSimpleExpression("style", !0, t.loc),
      exp: parseInlineCSS(t.value.content, t.loc),
      modifiers: [],
      loc: t.loc
    });
  });
}, parseInlineCSS = (e, t) => {
  const n = parseStringStyle(e);
  return createSimpleExpression(
    JSON.stringify(n),
    !1,
    t,
    3
  );
};
function createDOMCompilerError(e, t) {
  return createCompilerError(
    e,
    t
  );
}
const transformVHtml = (e, t, n) => {
  const { exp: r, loc: s } = e;
  return r || n.onError(
    createDOMCompilerError(53, s)
  ), t.children.length && (n.onError(
    createDOMCompilerError(54, s)
  ), t.children.length = 0), {
    props: [
      createObjectProperty(
        createSimpleExpression("innerHTML", !0, s),
        r || createSimpleExpression("", !0)
      )
    ]
  };
}, transformVText = (e, t, n) => {
  const { exp: r, loc: s } = e;
  return r || n.onError(
    createDOMCompilerError(55, s)
  ), t.children.length && (n.onError(
    createDOMCompilerError(56, s)
  ), t.children.length = 0), {
    props: [
      createObjectProperty(
        createSimpleExpression("textContent", !0),
        r ? getConstantType(r, n) > 0 ? r : createCallExpression(
          n.helperString(TO_DISPLAY_STRING),
          [r],
          s
        ) : createSimpleExpression("", !0)
      )
    ]
  };
}, transformModel = (e, t, n) => {
  const r = transformModel$1(e, t, n);
  if (!r.props.length || t.tagType === 1)
    return r;
  e.arg && n.onError(
    createDOMCompilerError(
      58,
      e.arg.loc
    )
  );
  const { tag: s } = t, i = n.isCustomElement(s);
  if (s === "input" || s === "textarea" || s === "select" || i) {
    let o = V_MODEL_TEXT, a = !1;
    if (s === "input" || i) {
      const l = findProp(t, "type");
      if (l) {
        if (l.type === 7)
          o = V_MODEL_DYNAMIC;
        else if (l.value)
          switch (l.value.content) {
            case "radio":
              o = V_MODEL_RADIO;
              break;
            case "checkbox":
              o = V_MODEL_CHECKBOX;
              break;
            case "file":
              a = !0, n.onError(
                createDOMCompilerError(
                  59,
                  e.loc
                )
              );
              break;
          }
      } else hasDynamicKeyVBind(t) && (o = V_MODEL_DYNAMIC);
    } else s === "select" && (o = V_MODEL_SELECT);
    a || (r.needRuntime = n.helper(o));
  } else
    n.onError(
      createDOMCompilerError(
        57,
        e.loc
      )
    );
  return r.props = r.props.filter(
    (o) => !(o.key.type === 4 && o.key.content === "modelValue")
  ), r;
}, isEventOptionModifier = /* @__PURE__ */ makeMap("passive,once,capture"), isNonKeyModifier = /* @__PURE__ */ makeMap(
  // event propagation management
  "stop,prevent,self,ctrl,shift,alt,meta,exact,middle"
), maybeKeyModifier = /* @__PURE__ */ makeMap("left,right"), isKeyboardEvent = /* @__PURE__ */ makeMap("onkeyup,onkeydown,onkeypress"), resolveModifiers = (e, t, n, r) => {
  const s = [], i = [], o = [];
  for (let a = 0; a < t.length; a++) {
    const l = t[a].content;
    l === "native" && checkCompatEnabled(
      "COMPILER_V_ON_NATIVE",
      n
    ) || isEventOptionModifier(l) ? o.push(l) : maybeKeyModifier(l) ? isStaticExp(e) ? isKeyboardEvent(e.content.toLowerCase()) ? s.push(l) : i.push(l) : (s.push(l), i.push(l)) : isNonKeyModifier(l) ? i.push(l) : s.push(l);
  }
  return {
    keyModifiers: s,
    nonKeyModifiers: i,
    eventOptionModifiers: o
  };
}, transformClick = (e, t) => isStaticExp(e) && e.content.toLowerCase() === "onclick" ? createSimpleExpression(t, !0) : e.type !== 4 ? createCompoundExpression([
  "(",
  e,
  `) === "onClick" ? "${t}" : (`,
  e,
  ")"
]) : e, transformOn = (e, t, n) => transformOn$1(e, t, n, (r) => {
  const { modifiers: s } = e;
  if (!s.length) return r;
  let { key: i, value: o } = r.props[0];
  const { keyModifiers: a, nonKeyModifiers: l, eventOptionModifiers: c } = resolveModifiers(i, s, n, e.loc);
  if (l.includes("right") && (i = transformClick(i, "onContextmenu")), l.includes("middle") && (i = transformClick(i, "onMouseup")), l.length && (o = createCallExpression(n.helper(V_ON_WITH_MODIFIERS), [
    o,
    JSON.stringify(l)
  ])), a.length && // if event name is dynamic, always wrap with keys guard
  (!isStaticExp(i) || isKeyboardEvent(i.content.toLowerCase())) && (o = createCallExpression(n.helper(V_ON_WITH_KEYS), [
    o,
    JSON.stringify(a)
  ])), c.length) {
    const f = c.map(capitalize).join("");
    i = isStaticExp(i) ? createSimpleExpression(`${i.content}${f}`, !0) : createCompoundExpression(["(", i, `) + "${f}"`]);
  }
  return {
    props: [createObjectProperty(i, o)]
  };
}), transformShow = (e, t, n) => {
  const { exp: r, loc: s } = e;
  return r || n.onError(
    createDOMCompilerError(61, s)
  ), {
    props: [],
    needRuntime: n.helper(V_SHOW)
  };
}, ignoreSideEffectTags = (e, t) => {
  e.type === 1 && e.tagType === 0 && (e.tag === "script" || e.tag === "style") && t.removeNode();
}, DOMNodeTransforms = [
  transformStyle
], DOMDirectiveTransforms = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel,
  // override compiler-core
  on: transformOn,
  // override compiler-core
  show: transformShow
};
function compile(e, t = {}) {
  return baseCompile(
    e,
    extend({}, parserOptions, t, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...t.nodeTransforms || []
      ],
      directiveTransforms: extend(
        {},
        DOMDirectiveTransforms,
        t.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
/**
* vue v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const compileCache = /* @__PURE__ */ Object.create(null);
function compileToFunction(e, t) {
  if (!isString(e))
    if (e.nodeType)
      e = e.innerHTML;
    else
      return NOOP;
  const n = genCacheKey(e, t), r = compileCache[n];
  if (r)
    return r;
  if (e[0] === "#") {
    const a = document.querySelector(e);
    e = a ? a.innerHTML : "";
  }
  const s = extend(
    {
      hoistStatic: !0,
      onError: void 0,
      onWarn: NOOP
    },
    t
  );
  !s.isCustomElement && typeof customElements < "u" && (s.isCustomElement = (a) => !!customElements.get(a));
  const { code: i } = compile(e, s), o = new Function("Vue", i)(runtimeDom);
  return o._rc = !0, compileCache[n] = o;
}
registerRuntimeCompiler(compileToFunction);
const Vue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition,
  BaseTransitionPropsValidators,
  Comment,
  DeprecationTypes,
  EffectScope,
  ErrorCodes,
  ErrorTypeStrings,
  Fragment,
  KeepAlive,
  ReactiveEffect,
  Static,
  Suspense,
  Teleport,
  Text,
  TrackOpTypes,
  Transition,
  TransitionGroup,
  TriggerOpTypes,
  VueElement,
  assertNumber,
  callWithAsyncErrorHandling,
  callWithErrorHandling,
  camelize,
  capitalize,
  cloneVNode,
  compatUtils,
  compile: compileToFunction,
  computed,
  createApp,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createElementVNode: createBaseVNode,
  createHydrationRenderer,
  createPropsRestProxy,
  createRenderer,
  createSSRApp,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  customRef,
  defineAsyncComponent,
  defineComponent,
  defineCustomElement,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  defineProps,
  defineSSRCustomElement,
  defineSlots,
  devtools,
  effect,
  effectScope,
  getCurrentInstance,
  getCurrentScope,
  getCurrentWatcher,
  getTransitionRawChildren,
  guardReactiveProps,
  h,
  handleError,
  hasInjectionContext,
  hydrate,
  hydrateOnIdle,
  hydrateOnInteraction,
  hydrateOnMediaQuery,
  hydrateOnVisible,
  initCustomFormatter,
  initDirectivesForSSR,
  inject,
  isMemoSame,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  isRuntimeOnly,
  isShallow,
  isVNode,
  markRaw,
  mergeDefaults,
  mergeModels,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onScopeDispose,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  onWatcherCleanup,
  openBlock,
  popScopeId,
  provide,
  proxyRefs,
  pushScopeId,
  queuePostFlushCb,
  reactive,
  readonly,
  ref,
  registerRuntimeCompiler,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  resolveFilter,
  resolveTransitionHooks,
  setBlockTracking,
  setDevtoolsHook,
  setTransitionHooks,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  ssrContextKey,
  ssrUtils,
  stop,
  toDisplayString,
  toHandlerKey,
  toHandlers,
  toRaw,
  toRef,
  toRefs,
  toValue,
  transformVNodeArgs,
  triggerRef,
  unref,
  useAttrs,
  useCssModule,
  useCssVars,
  useHost,
  useId,
  useModel,
  useSSRContext,
  useShadowRoot,
  useSlots,
  useTemplateRef,
  useTransitionState,
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
  vShow,
  version,
  warn,
  watch,
  watchEffect,
  watchPostEffect,
  watchSyncEffect,
  withAsyncContext,
  withCtx,
  withDefaults,
  withDirectives,
  withKeys,
  withMemo,
  withModifiers,
  withScopeId
}, Symbol.toStringTag, { value: "Module" }));
class EmbeddedScript {
  constructor(e, t) {
    this.scriptEl = e, this.templateEl = t;
  }
  splitScriptIntoParts() {
    const e = this.scriptEl.innerHTML.split(`
`).map((i) => [i.trimLeft().startsWith("import "), i]);
    let t = {};
    const n = this.templateEl.getAttribute("base-url"), r = e.filter((i) => i[0]).map((i) => i[1]).map((i) => {
      let [o, a] = i.match(/["']([^'"]+)["']\s*;?\s*/);
      if (a.startsWith(".")) {
        console.log("import interpretting", a, " against ", n);
        let l = new URL(a, n).href;
        i = i.replace(a, l), console.log("import ", a, " becomes ", l), a = l;
      }
      if (a.endsWith(".vue"))
        return t[a.split("/").pop().split(".vue")[0]] = /* @__PURE__ */ defineAsyncComponent(async () => {
          const { ExternalComponent: l } = await Promise.resolve().then(() => ExternalComponent$1);
          return new l(this.templateEl.cloneNode(!0), a).GetVueDefinition();
        }), null;
      if (a == "vue")
        return i.replace(/import\s+/, "const ").replace(/\sfrom\s/, " = ").replace(o, "window.VueBlocksBundle.Vue;");
      try {
        return import.meta.resolve(a), i;
      } catch {
        return i.replace(o, `"https://esm.sh/${a}"`);
      }
    }).filter(Boolean).join(`
`);
    let s = e.filter((i) => !i[0]).map((i) => i[1]).join(`
`);
    return [r, s, t];
  }
  converClassDefinitionToVueOptionsDefinition(e) {
    let t = e ? new e() : {}, { props: n, watch: r, computed: s, components: i, directives: o, ...a } = t;
    const l = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "activated", "deactivated", "beforeUnmount", "unmounted", "errorCaptured", "renderTracked", "renderTriggered", "destroyed", "beforeDestroy"];
    let c = {}, f = {};
    for (var u of Object.getOwnPropertyNames(e.prototype))
      u != "constructor" && typeof e.prototype[u] == "function" && (~l.indexOf(u) ? f[u] = e.prototype[u] : c[u] = e.prototype[u], delete a[u]);
    return {
      data() {
        return JSON.parse(JSON.stringify(a));
      },
      props: n,
      watch: r,
      computed: s,
      components: i,
      directives: o,
      ...f,
      filters: a.filters || {},
      methods: c
    };
  }
  async recompileScriptSetup(code, preamble) {
    let props = null, propName = "$props", emits = null, emitName = "$emit", returnValues = [], replaces = {};
    const ReturnValue = () => (Object.entries(replaces).forEach(([e, t]) => {
      code = code.replace(e, t);
    }), returnValues.length && (code += `
return {` + returnValues.join(",") + `}
`), code = `function(${propName}, { emit: ${emitName} }) { ${code} 
}`, { code, props, emits }), SHOULD_RECOMPILE_PREAMBLE = preamble.includes("import"), SHOULD_RECOMPILE_CODE = code.trim() > "";
    if (!(SHOULD_RECOMPILE_CODE || SHOULD_RECOMPILE_PREAMBLE))
      return ReturnValue();
    let acorn;
    try {
      acorn = await import("./acorn-CCZf8WA0.js");
    } catch (e) {
      acorn = await import("https://esm.sh/acorn");
    }
    if (SHOULD_RECOMPILE_PREAMBLE) {
      const e = "" + preamble + `
`, t = acorn.parse(e, { ecmaVersion: "latest", sourceType: "module" });
      for (const n of t.body)
        switch (n.type) {
          case "ImportDeclaration":
            returnValues.push(...n.specifiers.map((r) => r.local.name));
            break;
        }
    }
    if (SHOULD_RECOMPILE_CODE) {
      let getVariableNames = (e) => {
        switch (e.id.type) {
          case "Identifier":
            return [e.id.name];
          case "ObjectPattern":
            return e.id.properties.map((t) => t.value.name);
        }
      };
      const referenceCode = "function program(){" + code + `
}`, ast = acorn.parse(referenceCode, { ecmaVersion: "latest", sourceType: "module" });
      for (const node of ast.body[0].body.body)
        switch (node.type) {
          case "VariableDeclaration":
            node.declarations.forEach((node) => {
              var e, t;
              returnValues.push(...getVariableNames(node));
              let callee = (t = (e = node.init) == null ? void 0 : e.callee) == null ? void 0 : t.name;
              switch (callee) {
                case "defineProps":
                  props = eval(referenceCode.substring(node.init.callee.end, node.init.end)), propName = "$setupFunctionProps", replaces[referenceCode.substring(node.init.start, node.init.end)] = "$setupFunctionProps";
                  break;
                case "defineEmits":
                  emits = eval(referenceCode.substring(node.init.callee.end, node.init.end)), replaces[referenceCode.substring(node.init.start, node.init.end)] = "$setupFunctionEmits", emitName = "$setupFunctionEmits";
                  break;
              }
            });
            break;
          case "FunctionDeclaration":
            returnValues.push(...getVariableNames(node));
            break;
          case "ReturnStatement":
            returnValues = [];
        }
    }
    return ReturnValue();
  }
  async EvaluateComponentDefinition() {
    var i;
    let e = createDeferred(), [t, n, r] = this.splitScriptIntoParts(), s;
    if (this.scriptEl.hasAttribute("setup")) {
      t.includes("window.VueBlocksBundle.Vue") || (t = `const { ref, nextTick, reactive, provide, inject, computed, watch, onMounted, onUnmounted } = window.VueBlocksBundle.Vue;
${t}`), (i = window.VueBlocksBundle) != null && i.Vue || (window.VueBlocksBundle ?? (window.VueBlocksBundle = {}), window.VueBlocksBundle.Vue = window.Vue || await Promise.resolve().then(() => Vue));
      let o = await this.recompileScriptSetup(n, t), { props: a, emits: l } = o;
      s = (c) => e.resolve({ components: r, props: a, emits: l, setup: c }), n = o.code;
    } else {
      let o = this.converClassDefinitionToVueOptionsDefinition;
      n.match("return class vue") ? n = n.replace(/return\s+class\s+vue\s*\{/, "return class {") : n.match("export default") ? (n = n.replace("export default", "return "), o = (a) => a) : n = n.replace(/return\s+class\s+\{/, "return class {"), n = n.replace(/\sconstructor\s*\(/, "mounted("), n = n.replace(/\sdestructor\s*\(/, "destroyed("), n = `(function() { ${n} 
 })()`, s = function(a) {
        let l = o(a);
        l.components ?? (l.components = {}), l.components = { ...r, ...l.components }, e.resolve(l);
      };
    }
    return this.evaluateModuleCode(t, n).then((o) => {
      s(o);
    }), await e.promise;
  }
  async evaluateModuleCode(e, t) {
    try {
      try {
        const { default: r } = await this._evaluateModuleCodeWithDynamicModule(e, t);
        return r;
      } catch (r) {
        if (!(e.includes("import") || r instanceof TypeError))
          throw r;
        var n = this.templateEl.outerHTML.split(/\n/)[0];
        return console.debug(`using fallback modulecode evaluator for:

${n}
`), await this._evaluateModuleCodeWithScriptNode(e, t);
      }
    } catch (r) {
      const s = r.codeHighlighted || `// preamble
${e}

// code
${t}`;
      console.error(`module code error in ${n}:

${r.message}

in code:

${s}`), console.error(r);
    }
  }
  async _evaluateModuleCodeWithDynamicModule(e, t) {
    const n = new Blob([`${e}
; export default ${t}
;`], { type: "application/javascript" });
    return await import(URL.createObjectURL(n));
  }
  _evaluateModuleCodeWithScriptNode(e, t) {
    return new Promise((n, r) => {
      const s = "resolveDynamicModule" + Math.random().toString(36).substring(2, 10), i = document.createElement("script"), o = (a) => {
        a.lineno && a.colno && (a.codeHighlighted = highlightErrorInSource(i.textContent, a)), a.preventDefault(), r(a);
      };
      window.addEventListener("error", o, { once: !0 }), i.onload = () => {
        window.removeEventListener("error", o);
      }, i.onerror = () => {
        window.removeEventListener("error", o);
      }, i.type = "module", i.innerHTML = `
                ${e};
                window["${s}"](${t});
            `, window[s] = (a) => {
        delete window[s], n(a);
      }, document.body.appendChild(i);
    });
  }
}
class EmbeddedStyle {
  constructor(t, n) {
    if (!t)
      throw new Error("styleEl is invalid");
    if (!n)
      throw new Error("templateEl is invalid");
    this.styleEl = t, this.templateEl = n;
  }
  Activate() {
    let t = document.createElement("style"), n = this.styleEl.innerHTML.trim();
    if (n) {
      if (this.styleEl.hasAttribute("scoped")) {
        let r = "css-" + Math.random().toString(36).substring(2, 10);
        for (let s of this.templateEl.content.children)
          s.setAttribute(r, "");
        n = n.replace(/([^\}]+?)\{/g, (s, i) => s.match(/^\s*@/) ? s : i.split(",").map((o) => `&${o}`.replace(/&&/g, "&")).join(",") + "{"), n = n.replace(/:(scope|root)/, "&"), n = `*[${r}] { ${n} }`;
      }
      t.innerHTML = n, document.head.append(t);
    }
  }
}
class EmbeddedComponent {
  constructor(t, n) {
    this.el = t, this.name = n;
  }
  RegisterWith(t) {
    t.component(this.GetName(), this.GetVueDefinition());
  }
  GetName() {
    return this.name;
  }
  // async, because it may involve lazy-loading form server in child classes.
  async GetClonedTemplate() {
    return this.el.cloneNode(!0);
  }
  FinalizeEvaluatedComponent(t, n) {
    const r = tryEvaluateProperty(this.el, "props"), s = tryEvaluateProperty(this.el, "emits"), i = { template: n, ...t };
    return r && (i.props = i.props ? i.props : r), s && (i.emits = i.emits ? i.emits : s), i;
  }
  GetVueDefinition() {
    return /* @__PURE__ */ defineAsyncComponent(async () => {
      let t = createDeferred(), n = await this.GetClonedTemplate(), r = "";
      const s = n.content.querySelector('script:not([src]):not([type^="text"])');
      if (s) {
        let a = new EmbeddedScript(s, n);
        s.parentNode.removeChild(s), a.EvaluateComponentDefinition().then((l) => {
          const c = this.FinalizeEvaluatedComponent(l, r);
          t.resolve(c);
        });
      } else
        window.setTimeout(() => {
          t.resolve({ template: r });
        });
      var i = n.content.querySelectorAll("style"), o = n.content.querySelectorAll(":not(style,script)");
      o.length == 1 && o[0].matches("template") && (n = o[0]);
      for (let a of i)
        new EmbeddedStyle(a, n).Activate(), a.parentNode.removeChild(a);
      return r = n.innerHTML, t.promise;
    });
  }
}
class EmbeddedPage extends EmbeddedComponent {
  constructor(t, n) {
    let r = EmbeddedPage.GetComponentName(n);
    super(t, r), this.url = n;
  }
  static GetComponentName(t) {
    return "page-" + (t.replace(/^\//, "").replace(/[^a-z0-9-]/g, "-") || "index");
  }
  FinalizeEvaluatedComponent(t, n) {
    let r = super.FinalizeEvaluatedComponent(t, n);
    return this.url.match(/\/:/) && (r.props = r.props || [], this.url.replace(/\/:([a-z0-9_]+)/i, function(s, i) {
      Array.isArray(r.props) ? r.props.push(i) : typeof r.props == "object" ? r.props[i] = r.props[i] || String : console.error("failed to add route prop to props", r);
    })), r;
  }
  CreateRoute() {
    let t = {
      path: this.url,
      name: this.name,
      props: !0,
      meta: { title: this.el.getAttribute("title") },
      component: this.GetVueDefinition()
    };
    return this.el.hasAttribute("redirect") && (t.redirect = this.el.getAttribute("redirect")), t;
  }
  RegisterWith(t) {
    t.routes = t.routes || [];
    const n = this.CreateRoute();
    t.routes.push(n), t.component(this.GetName(), n.component);
  }
}
class EmbeddedSubPage extends EmbeddedPage {
  RegisterWith(t) {
    console.log("Register subpage " + this.url + " with name " + this.name, t), t.routes = t.routes || [];
    let n = { path: "" };
    for (let i of t.routes)
      console.log("checking parent " + i.path), this.url.indexOf(i.path) === 0 && (n = i.path > n.path ? i : n);
    if (!n)
      throw new Error("sub-url could not find parent for url `" + this.url + "`");
    const r = this.url.substr(n.path.length + 1);
    let s = this.CreateRoute();
    s.name = this.name.replace(/^page-/, "subpage-") + (r > "" ? "" : "index"), n.children = n.children || [], n.children.push(s), console.log("Attaching " + this.url + " to " + n.name + " " + n.path);
  }
}
class ExternalComponent extends EmbeddedComponent {
  constructor(t, n) {
    const r = n.split("/").pop().split(".").shift();
    t.setAttribute("base-url", n), super(t, r), this.src = n;
  }
  async GetClonedTemplate() {
    let t = document.createElement("template");
    var n = await fetchXhr(this.src).then((r) => r.text());
    return t.innerHTML = n, t;
  }
}
const ExternalComponent$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ExternalComponent
}, Symbol.toStringTag, { value: "Module" })), fe = class fe {
  /**
   * @param DOMNode|null context 
   * @returns array<EmbeddedComponent>
   */
  static async collectComponents(t, n) {
    if (t = t || document.body, !n)
      throw new Error("VueBlocks.collectComponents must be called with an explicit baseUrl!");
    const r = {
      "template[component]": (l) => new EmbeddedComponent(l, l.getAttribute("component")),
      'template[src*=".vue"]': (l) => {
        const c = l.getAttribute("src");
        if (!(c in fe.urlsLoaded))
          return fe.urlsLoaded[c] = !0, new ExternalComponent(l, c);
      },
      "template[url]": (l) => new EmbeddedPage(l, l.getAttribute("url")),
      "template[sub-url]": (l) => new EmbeddedSubPage(l, l.getAttribute("sub-url")),
      'template[src]:not([src*=".vue"])': async (l) => {
        const c = new URL(l.getAttribute("src"), n);
        if (c.href in fe.urlsLoaded)
          return;
        fe.urlsLoaded[c.href] = !0;
        var f = await fetchXhr(c.href).then((d) => d.text());
        let u = document.createElement("template");
        return u.setAttribute("base-url", c.href), u.innerHTML = f, [...u.content.querySelectorAll("link")].forEach((d) => {
          d.href = new URL(d.getAttribute("href"), c.href).href, document.body.appendChild(d);
        }), [...u.content.querySelectorAll("script[src]")].forEach((d) => {
          d.src = new URL(d.getAttribute("src"), c.href).href, document.body.appendChild(d);
        }), [...u.content.querySelectorAll("script")].forEach((d) => {
          d.innerHTML = d.innerHTML.replace(/document\.location/g, "(new URL(" + JSON.stringify(c.href) + "))");
        }), await fe.collectComponents(u.content, c.href);
      }
    }, s = (l) => (l.setAttribute("base-url", n), l), i = Object.entries(r).map(([l, c]) => Promise.all([...t.querySelectorAll(l)].map(s).map(c)));
    var o = await Promise.all(i), a = [];
    for (const l of o)
      l instanceof Promise ? a = a.concat(await l) : a = a.concat(l);
    return a.flat().filter(Boolean);
  }
  /**
   * 
   * @param VueApp app 
   * @param DOMNode|null context 
   */
  static async load(t, n) {
    var r = await fe.collectComponents(n, window.location.href);
    for (const s of r)
      console.info("Registering vue-component " + s.GetName()), s.RegisterWith(t);
    return r;
  }
  static async mount(t, n) {
    var s;
    const r = document.querySelector(t);
    if (!r)
      throw new Error("VueBlocks.mount was called on element " + t + ", but this element was not found.");
    if (console.log("disabling automount"), fe.automount = () => {
      console.log("automount empty");
    }, n = n || createApp({ setup() {
    } }), await fe.load(n), n.routes) {
      const { createRouter: i, createWebHashHistory: o } = await Promise.resolve().then(() => VueRouter), a = i({
        history: o(),
        routes: n.routes
      });
      n.provide("routes", n.routes), n.config.globalProperties.routes = n.routes, console.log("mounting router", a), n.use(a);
    }
    return ((s = r.innerHTML) == null ? void 0 : s.trim()) == "" && (r.innerHTML = "<app></app>"), console.log("mounting to ", r.outerHTML, n), n.mount(r), console.log("app context", n._context.components), n;
  }
  static automount() {
    if (console.log("running automount"), !document.querySelector("app")) {
      document.addEventListener("DOMContentLoaded", () => {
        fe.automount();
      });
      return;
    }
    document.querySelector("app") ? fe.mount("app") : document.write("no element to mount to!");
  }
};
Te(fe, "urlsLoaded", {}), Te(fe, "didMount", !1);
let VueBlocks = fe;
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const isProxyAvailable = typeof Proxy == "function", HOOK_SETUP = "devtools-plugin:setup", HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported, perf;
function isPerformanceSupported() {
  var e;
  return supported !== void 0 || (typeof window < "u" && window.performance ? (supported = !0, perf = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (supported = !0, perf = globalThis.perf_hooks.performance) : supported = !1), supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const o in t.settings) {
        const a = t.settings[o];
        r[o] = a.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, r);
    try {
      const o = localStorage.getItem(s), a = JSON.parse(o);
      Object.assign(i, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(o) {
        try {
          localStorage.setItem(s, JSON.stringify(o));
        } catch {
        }
        i = o;
      },
      now() {
        return now();
      }
    }, n && n.on(HOOK_PLUGIN_SETTINGS_SET, (o, a) => {
      o === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (o, a) => this.target ? this.target.on[a] : (...l) => {
        this.onQueue.push({
          method: a,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (o, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...l) => (this.targetQueue.push({
        method: a,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[a](...l)) : (...l) => new Promise((c) => {
        this.targetQueue.push({
          method: a,
          args: l,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function setupDevtoolsPlugin(e, t) {
  const n = e, r = getTarget(), s = getDevtoolsGlobalHook(), i = isProxyAvailable && n.enableEarlyProxy;
  if (s && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(HOOK_SETUP, e, t);
  else {
    const o = i ? new ApiProxy(n, s) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: o
    }), o && t(o.proxiedTarget);
  }
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof document < "u";
function isRouteComponent(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function isESModule(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  e.default && isRouteComponent(e.default);
}
const assign = Object.assign;
function applyToParams(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = isArray(s) ? s.map(e) : e(s);
  }
  return n;
}
const noop = () => {
}, isArray = Array.isArray, HASH_RE = /#/g, AMPERSAND_RE = /&/g, SLASH_RE = /\//g, EQUAL_RE = /=/g, IM_RE = /\?/g, PLUS_RE = /\+/g, ENC_BRACKET_OPEN_RE = /%5B/g, ENC_BRACKET_CLOSE_RE = /%5D/g, ENC_CARET_RE = /%5E/g, ENC_BACKTICK_RE = /%60/g, ENC_CURLY_OPEN_RE = /%7B/g, ENC_PIPE_RE = /%7C/g, ENC_CURLY_CLOSE_RE = /%7D/g, ENC_SPACE_RE = /%20/g;
function commonEncode(e) {
  return encodeURI("" + e).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(e) {
  return commonEncode(e).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(e) {
  return commonEncode(e).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(e) {
  return encodeQueryValue(e).replace(EQUAL_RE, "%3D");
}
function encodePath(e) {
  return commonEncode(e).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(e) {
  return e == null ? "" : encodePath(e).replace(SLASH_RE, "%2F");
}
function decode(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const TRAILING_SLASH_RE = /\/$/, removeTrailingSlash = (e) => e.replace(TRAILING_SLASH_RE, "");
function parseURL(e, t, n = "/") {
  let r, s = {}, i = "", o = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (r = t.slice(0, l), i = t.slice(l + 1, a > -1 ? a : t.length), s = e(i)), a > -1 && (r = r || t.slice(0, a), o = t.slice(a, t.length)), r = resolveRelativePath(r ?? t, n), {
    fullPath: r + (i && "?") + i + o,
    path: r,
    query: s,
    hash: decode(o)
  };
}
function stringifyURL(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function stripBase(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function isSameRouteLocation(e, t, n) {
  const r = t.matched.length - 1, s = n.matched.length - 1;
  return r > -1 && r === s && isSameRouteRecord(t.matched[r], n.matched[s]) && isSameRouteLocationParams(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function isSameRouteRecord(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function isSameRouteLocationParams(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!isSameRouteLocationParamsValue(e[n], t[n]))
      return !1;
  return !0;
}
function isSameRouteLocationParamsValue(e, t) {
  return isArray(e) ? isEquivalentArray(e, t) : isArray(t) ? isEquivalentArray(t, e) : e === t;
}
function isEquivalentArray(e, t) {
  return isArray(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function resolveRelativePath(e, t) {
  if (e.startsWith("/"))
    return e;
  if (!e)
    return t;
  const n = t.split("/"), r = e.split("/"), s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let i = n.length - 1, o, a;
  for (o = 0; o < r.length; o++)
    if (a = r[o], a !== ".")
      if (a === "..")
        i > 1 && i--;
      else
        break;
  return n.slice(0, i).join("/") + "/" + r.slice(o).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType;
(function(e) {
  e.pop = "pop", e.push = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(NavigationDirection || (NavigationDirection = {}));
const START = "";
function normalizeBase(e) {
  if (!e)
    if (isBrowser) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), removeTrailingSlash(e);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(e, t) {
  return e.replace(BEFORE_HASH_RE, "#") + t;
}
function getElementPosition(e, t) {
  const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(e) {
  let t;
  if ("el" in e) {
    const n = e.el, r = typeof n == "string" && n.startsWith("#"), s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s)
      return;
    t = getElementPosition(s, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function getScrollKey(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(e, t) {
  scrollPositions.set(e, t);
}
function getSavedScrollPosition(e) {
  const t = scrollPositions.get(e);
  return scrollPositions.delete(e), t;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(e, t) {
  const { pathname: n, search: r, hash: s } = t, i = e.indexOf("#");
  if (i > -1) {
    let a = s.includes(e.slice(i)) ? e.slice(i).length : 1, l = s.slice(a);
    return l[0] !== "/" && (l = "/" + l), stripBase(l, "");
  }
  return stripBase(n, e) + r + s;
}
function useHistoryListeners(e, t, n, r) {
  let s = [], i = [], o = null;
  const a = ({ state: d }) => {
    const m = createCurrentLocation(e, location), v = n.value, S = t.value;
    let I = 0;
    if (d) {
      if (n.value = m, t.value = d, o && o === v) {
        o = null;
        return;
      }
      I = S ? d.position - S.position : 0;
    } else
      r(m);
    s.forEach((A) => {
      A(n.value, v, {
        delta: I,
        type: NavigationType.pop,
        direction: I ? I > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function l() {
    o = n.value;
  }
  function c(d) {
    s.push(d);
    const m = () => {
      const v = s.indexOf(d);
      v > -1 && s.splice(v, 1);
    };
    return i.push(m), m;
  }
  function f() {
    const { history: d } = window;
    d.state && d.replaceState(assign({}, d.state, { scroll: computeScrollPosition() }), "");
  }
  function u() {
    for (const d of i)
      d();
    i = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", f);
  }
  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", f, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: c,
    destroy: u
  };
}
function buildState(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(e) {
  const { history: t, location: n } = window, r = {
    value: createCurrentLocation(e, n)
  }, s = { value: t.state };
  s.value || i(r.value, {
    back: null,
    current: r.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function i(l, c, f) {
    const u = e.indexOf("#"), d = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + l : createBaseLocation() + e + l;
    try {
      t[f ? "replaceState" : "pushState"](c, "", d), s.value = c;
    } catch (m) {
      console.error(m), n[f ? "replace" : "assign"](d);
    }
  }
  function o(l, c) {
    const f = assign({}, t.state, buildState(
      s.value.back,
      // keep back and forward entries but override current position
      l,
      s.value.forward,
      !0
    ), c, { position: s.value.position });
    i(l, f, !0), r.value = l;
  }
  function a(l, c) {
    const f = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      s.value,
      t.state,
      {
        forward: l,
        scroll: computeScrollPosition()
      }
    );
    i(f.current, f, !0);
    const u = assign({}, buildState(r.value, l, null), { position: f.position + 1 }, c);
    i(l, u, !1), r.value = l;
  }
  return {
    location: r,
    state: s,
    push: a,
    replace: o
  };
}
function createWebHistory(e) {
  e = normalizeBase(e);
  const t = useHistoryStateNavigation(e), n = useHistoryListeners(e, t.state, t.location, t.replace);
  function r(i, o = !0) {
    o || n.pauseListeners(), history.go(i);
  }
  const s = assign({
    // it's overridden right after
    location: "",
    base: e,
    go: r,
    createHref: createHref.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s;
}
function createMemoryHistory(e = "") {
  let t = [], n = [[START, {}]], r = 0;
  e = normalizeBase(e);
  function s(a, l = {}) {
    r++, r !== n.length && n.splice(r), n.push([a, l]);
  }
  function i(a, l, { direction: c, delta: f }) {
    const u = {
      direction: c,
      delta: f,
      type: NavigationType.pop
    };
    for (const d of t)
      d(a, l, u);
  }
  const o = {
    // rewritten by Object.defineProperty
    location: START,
    // rewritten by Object.defineProperty
    state: {},
    base: e,
    createHref: createHref.bind(null, e),
    replace(a, l) {
      n.splice(r--, 1), s(a, l);
    },
    push(a, l) {
      s(a, l);
    },
    listen(a) {
      return t.push(a), () => {
        const l = t.indexOf(a);
        l > -1 && t.splice(l, 1);
      };
    },
    destroy() {
      t = [], n = [[START, {}]], r = 0;
    },
    go(a, l = !0) {
      const c = this.location, f = (
        // we are considering delta === 0 going forward, but in abstract mode
        // using 0 for the delta doesn't make sense like it does in html5 where
        // it reloads the page
        a < 0 ? NavigationDirection.back : NavigationDirection.forward
      );
      r = Math.max(0, Math.min(r + a, n.length - 1)), l && i(this.location, c, {
        direction: f,
        delta: a
      });
    }
  };
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => n[r][0]
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => n[r][1]
  }), o;
}
function createWebHashHistory(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), createWebHistory(e);
}
function isRouteLocation(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function isRouteName(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(e, t) {
  return assign(new Error(), {
    type: e,
    [NavigationFailureSymbol]: !0
  }, t);
}
function isNavigationFailure(e, t) {
  return e instanceof Error && NavigationFailureSymbol in e && (t == null || !!(e.type & t));
}
const BASE_PARAM_PATTERN = "[^/]+?", BASE_PATH_PARSER_OPTIONS = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(e, t) {
  const n = assign({}, BASE_PATH_PARSER_OPTIONS, t), r = [];
  let s = n.start ? "^" : "";
  const i = [];
  for (const c of e) {
    const f = c.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !c.length && (s += "/");
    for (let u = 0; u < c.length; u++) {
      const d = c[u];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        u || (s += "/"), s += d.value.replace(REGEX_CHARS_RE, "\\$&"), m += 40;
      else if (d.type === 1) {
        const { value: v, repeatable: S, optional: I, regexp: A } = d;
        i.push({
          name: v,
          repeatable: S,
          optional: I
        });
        const T = A || BASE_PARAM_PATTERN;
        if (T !== BASE_PARAM_PATTERN) {
          m += 10;
          try {
            new RegExp(`(${T})`);
          } catch (_) {
            throw new Error(`Invalid custom RegExp for param "${v}" (${T}): ` + _.message);
          }
        }
        let y = S ? `((?:${T})(?:/(?:${T}))*)` : `(${T})`;
        u || (y = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        I && c.length < 2 ? `(?:/${y})` : "/" + y), I && (y += "?"), s += y, m += 20, I && (m += -8), S && (m += -20), T === ".*" && (m += -50);
      }
      f.push(m);
    }
    r.push(f);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && !s.endsWith("/") && (s += "(?:/|$)");
  const o = new RegExp(s, n.sensitive ? "" : "i");
  function a(c) {
    const f = c.match(o), u = {};
    if (!f)
      return null;
    for (let d = 1; d < f.length; d++) {
      const m = f[d] || "", v = i[d - 1];
      u[v.name] = m && v.repeatable ? m.split("/") : m;
    }
    return u;
  }
  function l(c) {
    let f = "", u = !1;
    for (const d of e) {
      (!u || !f.endsWith("/")) && (f += "/"), u = !1;
      for (const m of d)
        if (m.type === 0)
          f += m.value;
        else if (m.type === 1) {
          const { value: v, repeatable: S, optional: I } = m, A = v in c ? c[v] : "";
          if (isArray(A) && !S)
            throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);
          const T = isArray(A) ? A.join("/") : A;
          if (!T)
            if (I)
              d.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : u = !0);
            else
              throw new Error(`Missing required param "${v}"`);
          f += T;
        }
    }
    return f || "/";
  }
  return {
    re: o,
    score: r,
    keys: i,
    parse: a,
    stringify: l
  };
}
function compareScoreArray(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r)
      return r;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function comparePathParserScore(e, t) {
  let n = 0;
  const r = e.score, s = t.score;
  for (; n < r.length && n < s.length; ) {
    const i = compareScoreArray(r[n], s[n]);
    if (i)
      return i;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (isLastScoreNegative(r))
      return 1;
    if (isLastScoreNegative(s))
      return -1;
  }
  return s.length - r.length;
}
function isLastScoreNegative(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
}, VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[ROOT_TOKEN]];
  if (!e.startsWith("/"))
    throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${c}": ${m}`);
  }
  let n = 0, r = n;
  const s = [];
  let i;
  function o() {
    i && s.push(i), i = [];
  }
  let a = 0, l, c = "", f = "";
  function u() {
    c && (n === 0 ? i.push({
      type: 0,
      value: c
    }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
      type: 1,
      value: c,
      regexp: f,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), c = "");
  }
  function d() {
    c += l;
  }
  for (; a < e.length; ) {
    if (l = e[a++], l === "\\" && n !== 2) {
      r = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (c && u(), o()) : l === ":" ? (u(), n = 1) : d();
        break;
      case 4:
        d(), n = r;
        break;
      case 1:
        l === "(" ? n = 2 : VALID_PARAM_RE.test(l) ? d() : (u(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + l : n = 3 : f += l;
        break;
      case 3:
        u(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), u(), o(), s;
}
function createRouteRecordMatcher(e, t, n) {
  const r = tokensToParser(tokenizePath(e.path), n), s = assign(r, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function createRouterMatcher(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  t = mergeOptions({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(u) {
    return r.get(u);
  }
  function i(u, d, m) {
    const v = !m, S = normalizeRouteRecord(u);
    S.aliasOf = m && m.record;
    const I = mergeOptions(t, u), A = [S];
    if ("alias" in u) {
      const _ = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const b of _)
        A.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          normalizeRouteRecord(assign({}, S, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: m ? m.record.components : S.components,
            path: b,
            // we might be the child of an alias
            aliasOf: m ? m.record : S
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
    }
    let T, y;
    for (const _ of A) {
      const { path: b } = _;
      if (d && b[0] !== "/") {
        const x = d.record.path, D = x[x.length - 1] === "/" ? "" : "/";
        _.path = d.record.path + (b && D + b);
      }
      if (T = createRouteRecordMatcher(_, d, I), m ? m.alias.push(T) : (y = y || T, y !== T && y.alias.push(T), v && u.name && !isAliasRecord(T) && o(u.name)), isMatchable(T) && l(T), S.children) {
        const x = S.children;
        for (let D = 0; D < x.length; D++)
          i(x[D], T, m && m.children[D]);
      }
      m = m || T;
    }
    return y ? () => {
      o(y);
    } : noop;
  }
  function o(u) {
    if (isRouteName(u)) {
      const d = r.get(u);
      d && (r.delete(u), n.splice(n.indexOf(d), 1), d.children.forEach(o), d.alias.forEach(o));
    } else {
      const d = n.indexOf(u);
      d > -1 && (n.splice(d, 1), u.record.name && r.delete(u.record.name), u.children.forEach(o), u.alias.forEach(o));
    }
  }
  function a() {
    return n;
  }
  function l(u) {
    const d = findInsertionIndex(u, n);
    n.splice(d, 0, u), u.record.name && !isAliasRecord(u) && r.set(u.record.name, u);
  }
  function c(u, d) {
    let m, v = {}, S, I;
    if ("name" in u && u.name) {
      if (m = r.get(u.name), !m)
        throw createRouterError(1, {
          location: u
        });
      I = m.record.name, v = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          d.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          m.keys.filter((y) => !y.optional).concat(m.parent ? m.parent.keys.filter((y) => y.optional) : []).map((y) => y.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && paramsFromLocation(u.params, m.keys.map((y) => y.name))
      ), S = m.stringify(v);
    } else if (u.path != null)
      S = u.path, m = n.find((y) => y.re.test(S)), m && (v = m.parse(S), I = m.record.name);
    else {
      if (m = d.name ? r.get(d.name) : n.find((y) => y.re.test(d.path)), !m)
        throw createRouterError(1, {
          location: u,
          currentLocation: d
        });
      I = m.record.name, v = assign({}, d.params, u.params), S = m.stringify(v);
    }
    const A = [];
    let T = m;
    for (; T; )
      A.unshift(T.record), T = T.parent;
    return {
      name: I,
      path: S,
      params: v,
      matched: A,
      meta: mergeMetaFields(A)
    };
  }
  e.forEach((u) => i(u));
  function f() {
    n.length = 0, r.clear();
  }
  return {
    addRoute: i,
    resolve: c,
    removeRoute: o,
    clearRoutes: f,
    getRoutes: a,
    getRecordMatcher: s
  };
}
function paramsFromLocation(e, t) {
  const n = {};
  for (const r of t)
    r in e && (n[r] = e[r]);
  return n;
}
function normalizeRouteRecord(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: normalizeRecordProps(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", {
    value: {}
  }), t;
}
function normalizeRecordProps(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const r in e.components)
      t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function isAliasRecord(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function mergeMetaFields(e) {
  return e.reduce((t, n) => assign(t, n.meta), {});
}
function mergeOptions(e, t) {
  const n = {};
  for (const r in e)
    n[r] = r in t ? t[r] : e[r];
  return n;
}
function findInsertionIndex(e, t) {
  let n = 0, r = t.length;
  for (; n !== r; ) {
    const i = n + r >> 1;
    comparePathParserScore(e, t[i]) < 0 ? r = i : n = i + 1;
  }
  const s = getInsertionAncestor(e);
  return s && (r = t.lastIndexOf(s, r - 1)), r;
}
function getInsertionAncestor(e) {
  let t = e;
  for (; t = t.parent; )
    if (isMatchable(t) && comparePathParserScore(e, t) === 0)
      return t;
}
function isMatchable({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function parseQuery(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const i = r[s].replace(PLUS_RE, " "), o = i.indexOf("="), a = decode(o < 0 ? i : i.slice(0, o)), l = o < 0 ? null : decode(i.slice(o + 1));
    if (a in t) {
      let c = t[a];
      isArray(c) || (c = t[a] = [c]), c.push(l);
    } else
      t[a] = l;
  }
  return t;
}
function stringifyQuery(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (n = encodeQueryKey(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (isArray(r) ? r.map((i) => i && encodeQueryValue(i)) : [r && encodeQueryValue(r)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i));
    });
  }
  return t;
}
function normalizeQuery(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = isArray(r) ? r.map((s) => s == null ? null : "" + s) : r == null ? r : "" + r);
  }
  return t;
}
const matchedRouteKey = Symbol(""), viewDepthKey = Symbol(""), routerKey = Symbol(""), routeLocationKey = Symbol(""), routerViewLocationKey = Symbol("");
function useCallbacks() {
  let e = [];
  function t(r) {
    return e.push(r), () => {
      const s = e.indexOf(r);
      s > -1 && e.splice(s, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function registerGuard(e, t, n) {
  const r = () => {
    e[t].delete(n);
  };
  onUnmounted(r), onDeactivated(r), onActivated(() => {
    e[t].add(n);
  }), e[t].add(n);
}
function onBeforeRouteLeave(e) {
  const t = inject(
    matchedRouteKey,
    // to avoid warning
    {}
  ).value;
  t && registerGuard(t, "leaveGuards", e);
}
function onBeforeRouteUpdate(e) {
  const t = inject(
    matchedRouteKey,
    // to avoid warning
    {}
  ).value;
  t && registerGuard(t, "updateGuards", e);
}
function guardToPromiseFn(e, t, n, r, s, i = (o) => o()) {
  const o = r && // name is defined if record is because of the function overload
  (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () => new Promise((a, l) => {
    const c = (d) => {
      d === !1 ? l(createRouterError(4, {
        from: n,
        to: t
      })) : d instanceof Error ? l(d) : isRouteLocation(d) ? l(createRouterError(2, {
        from: t,
        to: d
      })) : (o && // since enterCallbackArray is truthy, both record and name also are
      r.enterCallbacks[s] === o && typeof d == "function" && o.push(d), a());
    }, f = i(() => e.call(r && r.instances[s], t, n, c));
    let u = Promise.resolve(f);
    e.length < 3 && (u = u.then(c)), u.catch((d) => l(d));
  });
}
function extractComponentsGuards(e, t, n, r, s = (i) => i()) {
  const i = [];
  for (const o of e)
    for (const a in o.components) {
      let l = o.components[a];
      if (!(t !== "beforeRouteEnter" && !o.instances[a]))
        if (isRouteComponent(l)) {
          const f = (l.__vccOpts || l)[t];
          f && i.push(guardToPromiseFn(f, n, r, o, a, s));
        } else {
          let c = l();
          i.push(() => c.then((f) => {
            if (!f)
              throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);
            const u = isESModule(f) ? f.default : f;
            o.mods[a] = f, o.components[a] = u;
            const m = (u.__vccOpts || u)[t];
            return m && guardToPromiseFn(m, n, r, o, a, s)();
          }));
        }
    }
  return i;
}
function loadRouteLocation(e) {
  return e.matched.every((t) => t.redirect) ? Promise.reject(new Error("Cannot load a route that redirects.")) : Promise.all(e.matched.map((t) => t.components && Promise.all(Object.keys(t.components).reduce((n, r) => {
    const s = t.components[r];
    return typeof s == "function" && !("displayName" in s) && n.push(s().then((i) => {
      if (!i)
        return Promise.reject(new Error(`Couldn't resolve component "${r}" at "${t.path}". Ensure you passed a function that returns a promise.`));
      const o = isESModule(i) ? i.default : i;
      t.mods[r] = i, t.components[r] = o;
    })), n;
  }, [])))).then(() => e);
}
function useLink(e) {
  const t = inject(routerKey), n = inject(routeLocationKey), r = computed(() => {
    const l = unref(e.to);
    return t.resolve(l);
  }), s = computed(() => {
    const { matched: l } = r.value, { length: c } = l, f = l[c - 1], u = n.matched;
    if (!f || !u.length)
      return -1;
    const d = u.findIndex(isSameRouteRecord.bind(null, f));
    if (d > -1)
      return d;
    const m = getOriginalPath(l[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(f) === m && // avoid comparing the child with its parent
      u[u.length - 1].path !== m ? u.findIndex(isSameRouteRecord.bind(null, l[c - 2])) : d
    );
  }), i = computed(() => s.value > -1 && includesParams(n.params, r.value.params)), o = computed(() => s.value > -1 && s.value === n.matched.length - 1 && isSameRouteLocationParams(n.params, r.value.params));
  function a(l = {}) {
    if (guardEvent(l)) {
      const c = t[unref(e.replace) ? "replace" : "push"](
        unref(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => c), c;
    }
    return Promise.resolve();
  }
  if (__VUE_PROD_DEVTOOLS__ && isBrowser) {
    const l = getCurrentInstance();
    if (l) {
      const c = {
        route: r.value,
        isActive: i.value,
        isExactActive: o.value,
        error: null
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(c), watchEffect(() => {
        c.route = r.value, c.isActive = i.value, c.isExactActive = o.value, c.error = isRouteLocation(unref(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: r,
    href: computed(() => r.value.href),
    isActive: i,
    isExactActive: o,
    navigate: a
  };
}
function preferSingleVNode(e) {
  return e.length === 1 ? e[0] : e;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(e, { slots: t }) {
    const n = reactive(useLink(e)), { options: r } = inject(routerKey), s = computed(() => ({
      [getLinkClass(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const i = t.default && preferSingleVNode(t.default(n));
      return e.custom ? i : h("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: s.value
      }, i);
    };
  }
}), RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function includesParams(e, t) {
  for (const n in t) {
    const r = t[n], s = e[n];
    if (typeof r == "string") {
      if (r !== s)
        return !1;
    } else if (!isArray(s) || s.length !== r.length || r.some((i, o) => i !== s[o]))
      return !1;
  }
  return !0;
}
function getOriginalPath(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const getLinkClass = (e, t, n) => e ?? t ?? n, RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    const r = inject(routerViewLocationKey), s = computed(() => e.route || r.value), i = inject(viewDepthKey, 0), o = computed(() => {
      let c = unref(i);
      const { matched: f } = s.value;
      let u;
      for (; (u = f[c]) && !u.components; )
        c++;
      return c;
    }), a = computed(() => s.value.matched[o.value]);
    provide(viewDepthKey, computed(() => o.value + 1)), provide(matchedRouteKey, a), provide(routerViewLocationKey, s);
    const l = ref();
    return watch(() => [l.value, a.value, e.name], ([c, f, u], [d, m, v]) => {
      f && (f.instances[u] = c, m && m !== f && c && c === d && (f.leaveGuards.size || (f.leaveGuards = m.leaveGuards), f.updateGuards.size || (f.updateGuards = m.updateGuards))), c && f && // if there is no instance but to and from are the same this might be
      // the first visit
      (!m || !isSameRouteRecord(f, m) || !d) && (f.enterCallbacks[u] || []).forEach((S) => S(c));
    }, { flush: "post" }), () => {
      const c = s.value, f = e.name, u = a.value, d = u && u.components[f];
      if (!d)
        return normalizeSlot(n.default, { Component: d, route: c });
      const m = u.props[f], v = m ? m === !0 ? c.params : typeof m == "function" ? m(c) : m : null, I = h(d, assign({}, v, t, {
        onVnodeUnmounted: (A) => {
          A.component.isUnmounted && (u.instances[f] = null);
        },
        ref: l
      }));
      if (__VUE_PROD_DEVTOOLS__ && isBrowser && I.ref) {
        const A = {
          depth: o.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (isArray(I.ref) ? I.ref.map((y) => y.i) : [I.ref.i]).forEach((y) => {
          y.__vrv_devtools = A;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(n.default, { Component: I, route: c }) || I
      );
    };
  }
});
function normalizeSlot(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const RouterView = RouterViewImpl;
function formatRouteLocation(e, t) {
  const n = assign({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((r) => omit(r, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function formatDisplay(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let routerId = 0;
function addDevtools(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const r = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (r ? "." + r : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (s) => {
    typeof s.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), s.on.inspectComponent((f, u) => {
      f.instanceData && f.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: formatRouteLocation(t.currentRoute.value, "Current Route")
      });
    }), s.on.visitComponentTree(({ treeNode: f, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const d = u.__vrv_devtools;
        f.tags.push({
          label: (d.name ? `${d.name.toString()}: ` : "") + d.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      isArray(u.__vrl_devtools) && (u.__devtoolsApi = s, u.__vrl_devtools.forEach((d) => {
        let m = d.route.path, v = ORANGE_400, S = "", I = 0;
        d.error ? (m = d.error, v = RED_100, I = RED_700) : d.isExactActive ? (v = LIME_500, S = "This is exactly active") : d.isActive && (v = BLUE_600, S = "This link is active"), f.tags.push({
          label: m,
          textColor: I,
          tooltip: S,
          backgroundColor: v
        });
      }));
    }), watch(t.currentRoute, () => {
      l(), s.notifyComponentUpdate(), s.sendInspectorTree(a), s.sendInspectorState(a);
    });
    const i = "router:navigations:" + r;
    s.addTimelineLayer({
      id: i,
      label: `Router${r ? " " + r : ""} Navigations`,
      color: 4237508
    }), t.onError((f, u) => {
      s.addTimelineEvent({
        layerId: i,
        event: {
          title: "Error during Navigation",
          subtitle: u.fullPath,
          logType: "error",
          time: s.now(),
          data: { error: f },
          groupId: u.meta.__navigationId
        }
      });
    });
    let o = 0;
    t.beforeEach((f, u) => {
      const d = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(u, "Current Location during this navigation"),
        to: formatRouteLocation(f, "Target location")
      };
      Object.defineProperty(f.meta, "__navigationId", {
        value: o++
      }), s.addTimelineEvent({
        layerId: i,
        event: {
          time: s.now(),
          title: "Start of navigation",
          subtitle: f.fullPath,
          data: d,
          groupId: f.meta.__navigationId
        }
      });
    }), t.afterEach((f, u, d) => {
      const m = {
        guard: formatDisplay("afterEach")
      };
      d ? (m.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: d ? d.message : "",
          tooltip: "Navigation Failure",
          value: d
        }
      }, m.status = formatDisplay("❌")) : m.status = formatDisplay("✅"), m.from = formatRouteLocation(u, "Current Location during this navigation"), m.to = formatRouteLocation(f, "Target location"), s.addTimelineEvent({
        layerId: i,
        event: {
          title: "End of navigation",
          subtitle: f.fullPath,
          time: s.now(),
          data: m,
          logType: d ? "warning" : "default",
          groupId: f.meta.__navigationId
        }
      });
    });
    const a = "router-inspector:" + r;
    s.addInspector({
      id: a,
      label: "Routes" + (r ? " " + r : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function l() {
      if (!c)
        return;
      const f = c;
      let u = n.getRoutes().filter((d) => !d.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !d.parent.record.components);
      u.forEach(resetMatchStateOnRouteRecord), f.filter && (u = u.filter((d) => (
        // save matches state based on the payload
        isRouteMatching(d, f.filter.toLowerCase())
      ))), u.forEach((d) => markRouteRecordActive(d, t.currentRoute.value)), f.rootNodes = u.map(formatRouteRecordForInspector);
    }
    let c;
    s.on.getInspectorTree((f) => {
      c = f, f.app === e && f.inspectorId === a && l();
    }), s.on.getInspectorState((f) => {
      if (f.app === e && f.inspectorId === a) {
        const d = n.getRoutes().find((m) => m.record.__vd_id === f.nodeId);
        d && (f.state = {
          options: formatRouteRecordMatcherForStateInspector(d)
        });
      }
    }), s.sendInspectorTree(a), s.sendInspectorState(a);
  });
}
function modifierForKey(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function formatRouteRecordMatcherForStateInspector(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((r) => `${r.name}${modifierForKey(r)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((r) => r.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((r) => r.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const PINK_500 = 15485081, BLUE_600 = 2450411, LIME_500 = 8702998, CYAN_400 = 2282478, ORANGE_400 = 16486972, DARK = 6710886, RED_100 = 16704226, RED_700 = 12131356;
function formatRouteRecordForInspector(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: CYAN_400
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: ORANGE_400
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: PINK_500
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: LIME_500
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: BLUE_600
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: DARK
  });
  let r = n.__vd_id;
  return r == null && (r = String(routeRecordId++), n.__vd_id = r), {
    id: r,
    label: n.path,
    tags: t,
    children: e.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(e, t) {
  const n = t.matched.length && isSameRouteRecord(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((r) => isSameRouteRecord(r, e.record))), e.children.forEach((r) => markRouteRecordActive(r, t));
}
function resetMatchStateOnRouteRecord(e) {
  e.__vd_match = !1, e.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(e, t) {
  const n = String(e.re).match(EXTRACT_REGEXP_RE);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((o) => isRouteMatching(o, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const s = e.record.path.toLowerCase(), i = decode(s);
  return !t.startsWith("/") && (i.includes(t) || s.includes(t)) || i.startsWith(t) || s.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((o) => isRouteMatching(o, t));
}
function omit(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) || (n[r] = e[r]);
  return n;
}
function createRouter(e) {
  const t = createRouterMatcher(e.routes, e), n = e.parseQuery || parseQuery, r = e.stringifyQuery || stringifyQuery, s = e.history, i = useCallbacks(), o = useCallbacks(), a = useCallbacks(), l = shallowRef(START_LOCATION_NORMALIZED);
  let c = START_LOCATION_NORMALIZED;
  isBrowser && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = applyToParams.bind(null, (w) => "" + w), u = applyToParams.bind(null, encodeParam), d = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function m(w, q) {
    let j, Y;
    return isRouteName(w) ? (j = t.getRecordMatcher(w), Y = q) : Y = w, t.addRoute(Y, j);
  }
  function v(w) {
    const q = t.getRecordMatcher(w);
    q && t.removeRoute(q);
  }
  function S() {
    return t.getRoutes().map((w) => w.record);
  }
  function I(w) {
    return !!t.getRecordMatcher(w);
  }
  function A(w, q) {
    if (q = assign({}, q || l.value), typeof w == "string") {
      const E = parseURL(n, w, q.path), C = t.resolve({ path: E.path }, q), k = s.createHref(E.fullPath);
      return assign(E, C, {
        params: d(C.params),
        hash: decode(E.hash),
        redirectedFrom: void 0,
        href: k
      });
    }
    let j;
    if (w.path != null)
      j = assign({}, w, {
        path: parseURL(n, w.path, q.path).path
      });
    else {
      const E = assign({}, w.params);
      for (const C in E)
        E[C] == null && delete E[C];
      j = assign({}, w, {
        params: u(E)
      }), q.params = u(q.params);
    }
    const Y = t.resolve(j, q), ne = w.hash || "";
    Y.params = f(d(Y.params));
    const oe = stringifyURL(r, assign({}, w, {
      hash: encodeHash(ne),
      path: Y.path
    })), g = s.createHref(oe);
    return assign({
      fullPath: oe,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: ne,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        r === stringifyQuery ? normalizeQuery(w.query) : w.query || {}
      )
    }, Y, {
      redirectedFrom: void 0,
      href: g
    });
  }
  function T(w) {
    return typeof w == "string" ? parseURL(n, w, l.value.path) : assign({}, w);
  }
  function y(w, q) {
    if (c !== w)
      return createRouterError(8, {
        from: q,
        to: w
      });
  }
  function _(w) {
    return D(w);
  }
  function b(w) {
    return _(assign(T(w), { replace: !0 }));
  }
  function x(w) {
    const q = w.matched[w.matched.length - 1];
    if (q && q.redirect) {
      const { redirect: j } = q;
      let Y = typeof j == "function" ? j(w) : j;
      return typeof Y == "string" && (Y = Y.includes("?") || Y.includes("#") ? Y = T(Y) : (
        // force empty params
        { path: Y }
      ), Y.params = {}), assign({
        query: w.query,
        hash: w.hash,
        // avoid transferring params if the redirect has a path
        params: Y.path != null ? {} : w.params
      }, Y);
    }
  }
  function D(w, q) {
    const j = c = A(w), Y = l.value, ne = w.state, oe = w.force, g = w.replace === !0, E = x(j);
    if (E)
      return D(
        assign(T(E), {
          state: typeof E == "object" ? assign({}, ne, E.state) : ne,
          force: oe,
          replace: g
        }),
        // keep original redirectedFrom if it exists
        q || j
      );
    const C = j;
    C.redirectedFrom = q;
    let k;
    return !oe && isSameRouteLocation(r, Y, j) && (k = createRouterError(16, { to: C, from: Y }), ce(
      Y,
      Y,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (k ? Promise.resolve(k) : O(C, Y)).catch((P) => isNavigationFailure(P) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        P,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? P : ae(P)
    ) : (
      // reject any unknown error
      z(P, C, Y)
    )).then((P) => {
      if (P) {
        if (isNavigationFailure(
          P,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return D(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: g
            }, T(P.to), {
              state: typeof P.to == "object" ? assign({}, ne, P.to.state) : ne,
              force: oe
            }),
            // preserve the original redirectedFrom if any
            q || C
          );
      } else
        P = N(C, Y, !0, g, ne);
      return H(C, Y, P), P;
    });
  }
  function M(w, q) {
    const j = y(w, q);
    return j ? Promise.reject(j) : Promise.resolve();
  }
  function R(w) {
    const q = Se.values().next().value;
    return q && typeof q.runWithContext == "function" ? q.runWithContext(w) : w();
  }
  function O(w, q) {
    let j;
    const [Y, ne, oe] = extractChangingRecords(w, q);
    j = extractComponentsGuards(Y.reverse(), "beforeRouteLeave", w, q);
    for (const E of Y)
      E.leaveGuards.forEach((C) => {
        j.push(guardToPromiseFn(C, w, q));
      });
    const g = M.bind(null, w, q);
    return j.push(g), me(j).then(() => {
      j = [];
      for (const E of i.list())
        j.push(guardToPromiseFn(E, w, q));
      return j.push(g), me(j);
    }).then(() => {
      j = extractComponentsGuards(ne, "beforeRouteUpdate", w, q);
      for (const E of ne)
        E.updateGuards.forEach((C) => {
          j.push(guardToPromiseFn(C, w, q));
        });
      return j.push(g), me(j);
    }).then(() => {
      j = [];
      for (const E of oe)
        if (E.beforeEnter)
          if (isArray(E.beforeEnter))
            for (const C of E.beforeEnter)
              j.push(guardToPromiseFn(C, w, q));
          else
            j.push(guardToPromiseFn(E.beforeEnter, w, q));
      return j.push(g), me(j);
    }).then(() => (w.matched.forEach((E) => E.enterCallbacks = {}), j = extractComponentsGuards(oe, "beforeRouteEnter", w, q, R), j.push(g), me(j))).then(() => {
      j = [];
      for (const E of o.list())
        j.push(guardToPromiseFn(E, w, q));
      return j.push(g), me(j);
    }).catch((E) => isNavigationFailure(
      E,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? E : Promise.reject(E));
  }
  function H(w, q, j) {
    a.list().forEach((Y) => R(() => Y(w, q, j)));
  }
  function N(w, q, j, Y, ne) {
    const oe = y(w, q);
    if (oe)
      return oe;
    const g = q === START_LOCATION_NORMALIZED, E = isBrowser ? history.state : {};
    j && (Y || g ? s.replace(w.fullPath, assign({
      scroll: g && E && E.scroll
    }, ne)) : s.push(w.fullPath, ne)), l.value = w, ce(w, q, j, g), ae();
  }
  let F;
  function G() {
    F || (F = s.listen((w, q, j) => {
      if (!ve.listening)
        return;
      const Y = A(w), ne = x(Y);
      if (ne) {
        D(assign(ne, { replace: !0, force: !0 }), Y).catch(noop);
        return;
      }
      c = Y;
      const oe = l.value;
      isBrowser && saveScrollPosition(getScrollKey(oe.fullPath, j.delta), computeScrollPosition()), O(Y, oe).catch((g) => isNavigationFailure(
        g,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? g : isNavigationFailure(
        g,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (D(
        assign(T(g.to), {
          force: !0
        }),
        Y
        // avoid an uncaught rejection, let push call triggerError
      ).then((E) => {
        isNavigationFailure(
          E,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !j.delta && j.type === NavigationType.pop && s.go(-1, !1);
      }).catch(noop), Promise.reject()) : (j.delta && s.go(-j.delta, !1), z(g, Y, oe))).then((g) => {
        g = g || N(
          // after navigation, all matched components are resolved
          Y,
          oe,
          !1
        ), g && (j.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !isNavigationFailure(
          g,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? s.go(-j.delta, !1) : j.type === NavigationType.pop && isNavigationFailure(
          g,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && s.go(-1, !1)), H(Y, oe, g);
      }).catch(noop);
    }));
  }
  let J = useCallbacks(), K = useCallbacks(), X;
  function z(w, q, j) {
    ae(w);
    const Y = K.list();
    return Y.length ? Y.forEach((ne) => ne(w, q, j)) : console.error(w), Promise.reject(w);
  }
  function ie() {
    return X && l.value !== START_LOCATION_NORMALIZED ? Promise.resolve() : new Promise((w, q) => {
      J.add([w, q]);
    });
  }
  function ae(w) {
    return X || (X = !w, G(), J.list().forEach(([q, j]) => w ? j(w) : q()), J.reset()), w;
  }
  function ce(w, q, j, Y) {
    const { scrollBehavior: ne } = e;
    if (!isBrowser || !ne)
      return Promise.resolve();
    const oe = !j && getSavedScrollPosition(getScrollKey(w.fullPath, 0)) || (Y || !j) && history.state && history.state.scroll || null;
    return nextTick().then(() => ne(w, q, oe)).then((g) => g && scrollToPosition(g)).catch((g) => z(g, w, q));
  }
  const ue = (w) => s.go(w);
  let Ee;
  const Se = /* @__PURE__ */ new Set(), ve = {
    currentRoute: l,
    listening: !0,
    addRoute: m,
    removeRoute: v,
    clearRoutes: t.clearRoutes,
    hasRoute: I,
    getRoutes: S,
    resolve: A,
    options: e,
    push: _,
    replace: b,
    go: ue,
    back: () => ue(-1),
    forward: () => ue(1),
    beforeEach: i.add,
    beforeResolve: o.add,
    afterEach: a.add,
    onError: K.add,
    isReady: ie,
    install(w) {
      const q = this;
      w.component("RouterLink", RouterLink), w.component("RouterView", RouterView), w.config.globalProperties.$router = q, Object.defineProperty(w.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => unref(l)
      }), isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Ee && l.value === START_LOCATION_NORMALIZED && (Ee = !0, _(s.location).catch((ne) => {
      }));
      const j = {};
      for (const ne in START_LOCATION_NORMALIZED)
        Object.defineProperty(j, ne, {
          get: () => l.value[ne],
          enumerable: !0
        });
      w.provide(routerKey, q), w.provide(routeLocationKey, shallowReactive(j)), w.provide(routerViewLocationKey, l);
      const Y = w.unmount;
      Se.add(w), w.unmount = function() {
        Se.delete(w), Se.size < 1 && (c = START_LOCATION_NORMALIZED, F && F(), F = null, l.value = START_LOCATION_NORMALIZED, Ee = !1, X = !1), Y();
      }, __VUE_PROD_DEVTOOLS__ && isBrowser && addDevtools(w, q, t);
    }
  };
  function me(w) {
    return w.reduce((q, j) => q.then(() => R(j)), Promise.resolve());
  }
  return ve;
}
function extractChangingRecords(e, t) {
  const n = [], r = [], s = [], i = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < i; o++) {
    const a = t.matched[o];
    a && (e.matched.find((c) => isSameRouteRecord(c, a)) ? r.push(a) : n.push(a));
    const l = e.matched[o];
    l && (t.matched.find((c) => isSameRouteRecord(c, l)) || s.push(l));
  }
  return [n, r, s];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute(e) {
  return inject(routeLocationKey);
}
const VueRouter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get NavigationFailureType() {
    return NavigationFailureType;
  },
  RouterLink,
  RouterView,
  START_LOCATION: START_LOCATION_NORMALIZED,
  createMemoryHistory,
  createRouter,
  createRouterMatcher,
  createWebHashHistory,
  createWebHistory,
  isNavigationFailure,
  loadRouteLocation,
  matchedRouteKey,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  parseQuery,
  routeLocationKey,
  routerKey,
  routerViewLocationKey,
  stringifyQuery,
  useLink,
  useRoute,
  useRouter,
  viewDepthKey
}, Symbol.toStringTag, { value: "Module" }));
window.VueBlocksBundle = { VueBlocks, Vue, VueRouter };
window.VueBlocks = VueBlocks;
window.Vue ?? (window.Vue = Vue);
window.VueRouter ?? (window.VueRouter = VueRouter);
document.currentScript && setTimeout(() => {
  VueBlocks.automount();
}, 0);
export {
  Vue,
  VueBlocks
};
