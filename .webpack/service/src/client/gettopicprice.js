(()=>{var Z={358:O=>{var C=Object.prototype.toString,E=typeof Buffer<"u"&&typeof Buffer.alloc=="function"&&typeof Buffer.allocUnsafe=="function"&&typeof Buffer.from=="function";function b(_){return C.call(_).slice(8,-1)==="ArrayBuffer"}function s(_,c,o){c>>>=0;var l=_.byteLength-c;if(l<0)throw new RangeError("'offset' is out of bounds");if(o===void 0)o=l;else if(o>>>=0,o>l)throw new RangeError("'length' is out of bounds");return E?Buffer.from(_.slice(c,c+o)):new Buffer(new Uint8Array(_.slice(c,c+o)))}function p(_,c){if((typeof c!="string"||c==="")&&(c="utf8"),!Buffer.isEncoding(c))throw new TypeError('"encoding" must be a valid string encoding');return E?Buffer.from(_,c):new Buffer(_,c)}function w(_,c,o){if(typeof _=="number")throw new TypeError('"value" argument must not be a number');return b(_)?s(_,c,o):typeof _=="string"?p(_,c):E?Buffer.from(_):new Buffer(_)}O.exports=w},49:(O,C,E)=>{E(685).install()},685:(O,C,E)=>{O=E.nmd(O);var b=E(461).SourceMapConsumer,s=E(17),p;try{p=E(147),(!p.existsSync||!p.readFileSync)&&(p=null)}catch{}var w=E(358);function _(d,g){return d.require(g)}var c=!1,o=!1,l=!1,a="auto",n={},i={},t=/^data:application\/json[^,]+base64,/,f=[],u=[];function h(){return a==="browser"?!0:a==="node"?!1:typeof window<"u"&&typeof XMLHttpRequest=="function"&&!(window.require&&window.module&&window.process&&window.process.type==="renderer")}function S(){return typeof process=="object"&&process!==null&&typeof process.on=="function"}function m(){return typeof process=="object"&&process!==null?process.version:""}function L(){if(typeof process=="object"&&process!==null)return process.stderr}function r(d){if(typeof process=="object"&&process!==null&&typeof process.exit=="function")return process.exit(d)}function e(d){return function(g){for(var M=0;M<d.length;M++){var R=d[M](g);if(R)return R}return null}}var v=e(f);f.push(function(d){if(d=d.trim(),/^file:/.test(d)&&(d=d.replace(/file:\/\/\/(\w:)?/,function(R,N){return N?"":"/"})),d in n)return n[d];var g="";try{if(p)p.existsSync(d)&&(g=p.readFileSync(d,"utf8"));else{var M=new XMLHttpRequest;M.open("GET",d,!1),M.send(null),M.readyState===4&&M.status===200&&(g=M.responseText)}}catch{}return n[d]=g});function y(d,g){if(!d)return g;var M=s.dirname(d),R=/^\w+:\/\/[^\/]*/.exec(M),N=R?R[0]:"",A=M.slice(N.length);return N&&/^\/\w\:/.test(A)?(N+="/",N+s.resolve(M.slice(N.length),g).replace(/\\/g,"/")):N+s.resolve(M.slice(N.length),g)}function I(d){var g;if(h())try{var M=new XMLHttpRequest;M.open("GET",d,!1),M.send(null),g=M.readyState===4?M.responseText:null;var R=M.getResponseHeader("SourceMap")||M.getResponseHeader("X-SourceMap");if(R)return R}catch{}g=v(d);for(var N=/(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg,A,P;P=N.exec(g);)A=P;return A?A[1]:null}var B=e(u);u.push(function(d){var g=I(d);if(!g)return null;var M;if(t.test(g)){var R=g.slice(g.indexOf(",")+1);M=w(R,"base64").toString(),g=d}else g=y(d,g),M=v(g);return M?{url:g,map:M}:null});function F(d){var g=i[d.source];if(!g){var M=B(d.source);M?(g=i[d.source]={url:M.url,map:new b(M.map)},g.map.sourcesContent&&g.map.sources.forEach(function(N,A){var P=g.map.sourcesContent[A];if(P){var x=y(g.url,N);n[x]=P}})):g=i[d.source]={url:null,map:null}}if(g&&g.map&&typeof g.map.originalPositionFor=="function"){var R=g.map.originalPositionFor(d);if(R.source!==null)return R.source=y(g.url,R.source),R}return d}function T(d){var g=/^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(d);if(g){var M=F({source:g[2],line:+g[3],column:g[4]-1});return"eval at "+g[1]+" ("+M.source+":"+M.line+":"+(M.column+1)+")"}return g=/^eval at ([^(]+) \((.+)\)$/.exec(d),g?"eval at "+g[1]+" ("+T(g[2])+")":d}function k(){var d,g="";if(this.isNative())g="native";else{d=this.getScriptNameOrSourceURL(),!d&&this.isEval()&&(g=this.getEvalOrigin(),g+=", "),d?g+=d:g+="<anonymous>";var M=this.getLineNumber();if(M!=null){g+=":"+M;var R=this.getColumnNumber();R&&(g+=":"+R)}}var N="",A=this.getFunctionName(),P=!0,x=this.isConstructor(),Q=!(this.isToplevel()||x);if(Q){var D=this.getTypeName();D==="[object Object]"&&(D="null");var V=this.getMethodName();A?(D&&A.indexOf(D)!=0&&(N+=D+"."),N+=A,V&&A.indexOf("."+V)!=A.length-V.length-1&&(N+=" [as "+V+"]")):N+=D+"."+(V||"<anonymous>")}else x?N+="new "+(A||"<anonymous>"):A?N+=A:(N+=g,P=!1);return P&&(N+=" ("+g+")"),N}function G(d){var g={};return Object.getOwnPropertyNames(Object.getPrototypeOf(d)).forEach(function(M){g[M]=/^(?:is|get)/.test(M)?function(){return d[M].call(d)}:d[M]}),g.toString=k,g}function U(d,g){if(g===void 0&&(g={nextPosition:null,curPosition:null}),d.isNative())return g.curPosition=null,d;var M=d.getFileName()||d.getScriptNameOrSourceURL();if(M){var R=d.getLineNumber(),N=d.getColumnNumber()-1,A=/^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/,P=A.test(m())?0:62;R===1&&N>P&&!h()&&!d.isEval()&&(N-=P);var x=F({source:M,line:R,column:N});g.curPosition=x,d=G(d);var Q=d.getFunctionName;return d.getFunctionName=function(){return g.nextPosition==null?Q():g.nextPosition.name||Q()},d.getFileName=function(){return x.source},d.getLineNumber=function(){return x.line},d.getColumnNumber=function(){return x.column+1},d.getScriptNameOrSourceURL=function(){return x.source},d}var D=d.isEval()&&d.getEvalOrigin();return D&&(D=T(D),d=G(d),d.getEvalOrigin=function(){return D}),d}function z(d,g){l&&(n={},i={});for(var M=d.name||"Error",R=d.message||"",N=M+": "+R,A={nextPosition:null,curPosition:null},P=[],x=g.length-1;x>=0;x--)P.push(`
    at `+U(g[x],A)),A.nextPosition=A.curPosition;return A.curPosition=A.nextPosition=null,N+P.reverse().join("")}function q(d){var g=/\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(d.stack);if(g){var M=g[1],R=+g[2],N=+g[3],A=n[M];if(!A&&p&&p.existsSync(M))try{A=p.readFileSync(M,"utf8")}catch{A=""}if(A){var P=A.split(/(?:\r\n|\r|\n)/)[R-1];if(P)return M+":"+R+`
`+P+`
`+new Array(N).join(" ")+"^"}}return null}function K(d){var g=q(d),M=L();M&&M._handle&&M._handle.setBlocking&&M._handle.setBlocking(!0),g&&(console.error(),console.error(g)),console.error(d.stack),r(1)}function H(){var d=process.emit;process.emit=function(g){if(g==="uncaughtException"){var M=arguments[1]&&arguments[1].stack,R=this.listeners(g).length>0;if(M&&!R)return K(arguments[1])}return d.apply(this,arguments)}}var Y=f.slice(0),ee=u.slice(0);C.wrapCallSite=U,C.getErrorSource=q,C.mapSourcePosition=F,C.retrieveSourceMap=B,C.install=function(d){if(d=d||{},d.environment&&(a=d.environment,["node","browser","auto"].indexOf(a)===-1))throw new Error("environment "+a+" was unknown. Available options are {auto, browser, node}");if(d.retrieveFile&&(d.overrideRetrieveFile&&(f.length=0),f.unshift(d.retrieveFile)),d.retrieveSourceMap&&(d.overrideRetrieveSourceMap&&(u.length=0),u.unshift(d.retrieveSourceMap)),d.hookRequire&&!h()){var g=_(O,"module"),M=g.prototype._compile;M.__sourceMapSupport||(g.prototype._compile=function(A,P){return n[P]=A,i[P]=void 0,M.call(this,A,P)},g.prototype._compile.__sourceMapSupport=!0)}if(l||(l="emptyCacheBetweenOperations"in d?d.emptyCacheBetweenOperations:!1),c||(c=!0,Error.prepareStackTrace=z),!o){var R="handleUncaughtExceptions"in d?d.handleUncaughtExceptions:!0;try{var N=_(O,"worker_threads");N.isMainThread===!1&&(R=!1)}catch{}R&&S()&&(o=!0,H())}},C.resetRetrieveHandlers=function(){f.length=0,u.length=0,f=Y.slice(0),u=ee.slice(0),B=e(u),v=e(f)}},668:(O,C,E)=>{var b=E(930),s=Object.prototype.hasOwnProperty,p=typeof Map<"u";function w(){this._array=[],this._set=p?new Map:Object.create(null)}w.fromArray=function(c,o){for(var l=new w,a=0,n=c.length;a<n;a++)l.add(c[a],o);return l},w.prototype.size=function(){return p?this._set.size:Object.getOwnPropertyNames(this._set).length},w.prototype.add=function(c,o){var l=p?c:b.toSetString(c),a=p?this.has(c):s.call(this._set,l),n=this._array.length;(!a||o)&&this._array.push(c),a||(p?this._set.set(c,n):this._set[l]=n)},w.prototype.has=function(c){if(p)return this._set.has(c);var o=b.toSetString(c);return s.call(this._set,o)},w.prototype.indexOf=function(c){if(p){var o=this._set.get(c);if(o>=0)return o}else{var l=b.toSetString(c);if(s.call(this._set,l))return this._set[l]}throw new Error('"'+c+'" is not in the set.')},w.prototype.at=function(c){if(c>=0&&c<this._array.length)return this._array[c];throw new Error("No element indexed by "+c)},w.prototype.toArray=function(){return this._array.slice()},C.I=w},158:(O,C,E)=>{var b=E(977),s=5,p=1<<s,w=p-1,_=p;function c(l){return l<0?(-l<<1)+1:(l<<1)+0}function o(l){var a=(l&1)===1,n=l>>1;return a?-n:n}C.encode=function(a){var n="",i,t=c(a);do i=t&w,t>>>=s,t>0&&(i|=_),n+=b.encode(i);while(t>0);return n},C.decode=function(a,n,i){var t=a.length,f=0,u=0,h,S;do{if(n>=t)throw new Error("Expected more digits in base 64 VLQ value.");if(S=b.decode(a.charCodeAt(n++)),S===-1)throw new Error("Invalid base64 digit: "+a.charAt(n-1));h=!!(S&_),S&=w,f=f+(S<<u),u+=s}while(h);i.value=o(f),i.rest=n}},977:(O,C)=>{var E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");C.encode=function(b){if(0<=b&&b<E.length)return E[b];throw new TypeError("Must be between 0 and 63: "+b)},C.decode=function(b){var s=65,p=90,w=97,_=122,c=48,o=57,l=43,a=47,n=26,i=52;return s<=b&&b<=p?b-s:w<=b&&b<=_?b-w+n:c<=b&&b<=o?b-c+i:b==l?62:b==a?63:-1}},63:(O,C)=>{C.GREATEST_LOWER_BOUND=1,C.LEAST_UPPER_BOUND=2;function E(b,s,p,w,_,c){var o=Math.floor((s-b)/2)+b,l=_(p,w[o],!0);return l===0?o:l>0?s-o>1?E(o,s,p,w,_,c):c==C.LEAST_UPPER_BOUND?s<w.length?s:-1:o:o-b>1?E(b,o,p,w,_,c):c==C.LEAST_UPPER_BOUND?o:b<0?-1:b}C.search=function(s,p,w,_){if(p.length===0)return-1;var c=E(-1,p.length,s,p,w,_||C.GREATEST_LOWER_BOUND);if(c<0)return-1;for(;c-1>=0&&w(p[c],p[c-1],!0)===0;)--c;return c}},923:(O,C,E)=>{var b=E(930);function s(w,_){var c=w.generatedLine,o=_.generatedLine,l=w.generatedColumn,a=_.generatedColumn;return o>c||o==c&&a>=l||b.compareByGeneratedPositionsInflated(w,_)<=0}function p(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}p.prototype.unsortedForEach=function(_,c){this._array.forEach(_,c)},p.prototype.add=function(_){s(this._last,_)?(this._last=_,this._array.push(_)):(this._sorted=!1,this._array.push(_))},p.prototype.toArray=function(){return this._sorted||(this._array.sort(b.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},C.H=p},645:(O,C)=>{function E(p,w,_){var c=p[w];p[w]=p[_],p[_]=c}function b(p,w){return Math.round(p+Math.random()*(w-p))}function s(p,w,_,c){if(_<c){var o=b(_,c),l=_-1;E(p,o,c);for(var a=p[c],n=_;n<c;n++)w(p[n],a)<=0&&(l+=1,E(p,l,n));E(p,l+1,n);var i=l+1;s(p,w,_,i-1),s(p,w,i+1,c)}}C.U=function(p,w){s(p,w,0,p.length-1)}},94:(O,C,E)=>{var b,s=E(930),p=E(63),w=E(668).I,_=E(158),c=E(645).U;function o(i,t){var f=i;return typeof i=="string"&&(f=s.parseSourceMapInput(i)),f.sections!=null?new n(f,t):new l(f,t)}o.fromSourceMap=function(i,t){return l.fromSourceMap(i,t)},o.prototype._version=3,o.prototype.__generatedMappings=null,Object.defineProperty(o.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),o.prototype.__originalMappings=null,Object.defineProperty(o.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),o.prototype._charIsMappingSeparator=function(t,f){var u=t.charAt(f);return u===";"||u===","},o.prototype._parseMappings=function(t,f){throw new Error("Subclasses must implement _parseMappings")},o.GENERATED_ORDER=1,o.ORIGINAL_ORDER=2,o.GREATEST_LOWER_BOUND=1,o.LEAST_UPPER_BOUND=2,o.prototype.eachMapping=function(t,f,u){var h=f||null,S=u||o.GENERATED_ORDER,m;switch(S){case o.GENERATED_ORDER:m=this._generatedMappings;break;case o.ORIGINAL_ORDER:m=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var L=this.sourceRoot;m.map(function(r){var e=r.source===null?null:this._sources.at(r.source);return e=s.computeSourceURL(L,e,this._sourceMapURL),{source:e,generatedLine:r.generatedLine,generatedColumn:r.generatedColumn,originalLine:r.originalLine,originalColumn:r.originalColumn,name:r.name===null?null:this._names.at(r.name)}},this).forEach(t,h)},o.prototype.allGeneratedPositionsFor=function(t){var f=s.getArg(t,"line"),u={source:s.getArg(t,"source"),originalLine:f,originalColumn:s.getArg(t,"column",0)};if(u.source=this._findSourceIndex(u.source),u.source<0)return[];var h=[],S=this._findMapping(u,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,p.LEAST_UPPER_BOUND);if(S>=0){var m=this._originalMappings[S];if(t.column===void 0)for(var L=m.originalLine;m&&m.originalLine===L;)h.push({line:s.getArg(m,"generatedLine",null),column:s.getArg(m,"generatedColumn",null),lastColumn:s.getArg(m,"lastGeneratedColumn",null)}),m=this._originalMappings[++S];else for(var r=m.originalColumn;m&&m.originalLine===f&&m.originalColumn==r;)h.push({line:s.getArg(m,"generatedLine",null),column:s.getArg(m,"generatedColumn",null),lastColumn:s.getArg(m,"lastGeneratedColumn",null)}),m=this._originalMappings[++S]}return h},C.SourceMapConsumer=o;function l(i,t){var f=i;typeof i=="string"&&(f=s.parseSourceMapInput(i));var u=s.getArg(f,"version"),h=s.getArg(f,"sources"),S=s.getArg(f,"names",[]),m=s.getArg(f,"sourceRoot",null),L=s.getArg(f,"sourcesContent",null),r=s.getArg(f,"mappings"),e=s.getArg(f,"file",null);if(u!=this._version)throw new Error("Unsupported version: "+u);m&&(m=s.normalize(m)),h=h.map(String).map(s.normalize).map(function(v){return m&&s.isAbsolute(m)&&s.isAbsolute(v)?s.relative(m,v):v}),this._names=w.fromArray(S.map(String),!0),this._sources=w.fromArray(h,!0),this._absoluteSources=this._sources.toArray().map(function(v){return s.computeSourceURL(m,v,t)}),this.sourceRoot=m,this.sourcesContent=L,this._mappings=r,this._sourceMapURL=t,this.file=e}l.prototype=Object.create(o.prototype),l.prototype.consumer=o,l.prototype._findSourceIndex=function(i){var t=i;if(this.sourceRoot!=null&&(t=s.relative(this.sourceRoot,t)),this._sources.has(t))return this._sources.indexOf(t);var f;for(f=0;f<this._absoluteSources.length;++f)if(this._absoluteSources[f]==i)return f;return-1},l.fromSourceMap=function(t,f){var u=Object.create(l.prototype),h=u._names=w.fromArray(t._names.toArray(),!0),S=u._sources=w.fromArray(t._sources.toArray(),!0);u.sourceRoot=t._sourceRoot,u.sourcesContent=t._generateSourcesContent(u._sources.toArray(),u.sourceRoot),u.file=t._file,u._sourceMapURL=f,u._absoluteSources=u._sources.toArray().map(function(B){return s.computeSourceURL(u.sourceRoot,B,f)});for(var m=t._mappings.toArray().slice(),L=u.__generatedMappings=[],r=u.__originalMappings=[],e=0,v=m.length;e<v;e++){var y=m[e],I=new a;I.generatedLine=y.generatedLine,I.generatedColumn=y.generatedColumn,y.source&&(I.source=S.indexOf(y.source),I.originalLine=y.originalLine,I.originalColumn=y.originalColumn,y.name&&(I.name=h.indexOf(y.name)),r.push(I)),L.push(I)}return c(u.__originalMappings,s.compareByOriginalPositions),u},l.prototype._version=3,Object.defineProperty(l.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function a(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}l.prototype._parseMappings=function(t,f){for(var u=1,h=0,S=0,m=0,L=0,r=0,e=t.length,v=0,y={},I={},B=[],F=[],T,k,G,U,z;v<e;)if(t.charAt(v)===";")u++,v++,h=0;else if(t.charAt(v)===",")v++;else{for(T=new a,T.generatedLine=u,U=v;U<e&&!this._charIsMappingSeparator(t,U);U++);if(k=t.slice(v,U),G=y[k],G)v+=k.length;else{for(G=[];v<U;)_.decode(t,v,I),z=I.value,v=I.rest,G.push(z);if(G.length===2)throw new Error("Found a source, but no line and column");if(G.length===3)throw new Error("Found a source and line, but no column");y[k]=G}T.generatedColumn=h+G[0],h=T.generatedColumn,G.length>1&&(T.source=L+G[1],L+=G[1],T.originalLine=S+G[2],S=T.originalLine,T.originalLine+=1,T.originalColumn=m+G[3],m=T.originalColumn,G.length>4&&(T.name=r+G[4],r+=G[4])),F.push(T),typeof T.originalLine=="number"&&B.push(T)}c(F,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=F,c(B,s.compareByOriginalPositions),this.__originalMappings=B},l.prototype._findMapping=function(t,f,u,h,S,m){if(t[u]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+t[u]);if(t[h]<0)throw new TypeError("Column must be greater than or equal to 0, got "+t[h]);return p.search(t,f,S,m)},l.prototype.computeColumnSpans=function(){for(var t=0;t<this._generatedMappings.length;++t){var f=this._generatedMappings[t];if(t+1<this._generatedMappings.length){var u=this._generatedMappings[t+1];if(f.generatedLine===u.generatedLine){f.lastGeneratedColumn=u.generatedColumn-1;continue}}f.lastGeneratedColumn=1/0}},l.prototype.originalPositionFor=function(t){var f={generatedLine:s.getArg(t,"line"),generatedColumn:s.getArg(t,"column")},u=this._findMapping(f,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(t,"bias",o.GREATEST_LOWER_BOUND));if(u>=0){var h=this._generatedMappings[u];if(h.generatedLine===f.generatedLine){var S=s.getArg(h,"source",null);S!==null&&(S=this._sources.at(S),S=s.computeSourceURL(this.sourceRoot,S,this._sourceMapURL));var m=s.getArg(h,"name",null);return m!==null&&(m=this._names.at(m)),{source:S,line:s.getArg(h,"originalLine",null),column:s.getArg(h,"originalColumn",null),name:m}}}return{source:null,line:null,column:null,name:null}},l.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(t){return t==null}):!1},l.prototype.sourceContentFor=function(t,f){if(!this.sourcesContent)return null;var u=this._findSourceIndex(t);if(u>=0)return this.sourcesContent[u];var h=t;this.sourceRoot!=null&&(h=s.relative(this.sourceRoot,h));var S;if(this.sourceRoot!=null&&(S=s.urlParse(this.sourceRoot))){var m=h.replace(/^file:\/\//,"");if(S.scheme=="file"&&this._sources.has(m))return this.sourcesContent[this._sources.indexOf(m)];if((!S.path||S.path=="/")&&this._sources.has("/"+h))return this.sourcesContent[this._sources.indexOf("/"+h)]}if(f)return null;throw new Error('"'+h+'" is not in the SourceMap.')},l.prototype.generatedPositionFor=function(t){var f=s.getArg(t,"source");if(f=this._findSourceIndex(f),f<0)return{line:null,column:null,lastColumn:null};var u={source:f,originalLine:s.getArg(t,"line"),originalColumn:s.getArg(t,"column")},h=this._findMapping(u,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(t,"bias",o.GREATEST_LOWER_BOUND));if(h>=0){var S=this._originalMappings[h];if(S.source===u.source)return{line:s.getArg(S,"generatedLine",null),column:s.getArg(S,"generatedColumn",null),lastColumn:s.getArg(S,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},b=l;function n(i,t){var f=i;typeof i=="string"&&(f=s.parseSourceMapInput(i));var u=s.getArg(f,"version"),h=s.getArg(f,"sections");if(u!=this._version)throw new Error("Unsupported version: "+u);this._sources=new w,this._names=new w;var S={line:-1,column:0};this._sections=h.map(function(m){if(m.url)throw new Error("Support for url field in sections not implemented.");var L=s.getArg(m,"offset"),r=s.getArg(L,"line"),e=s.getArg(L,"column");if(r<S.line||r===S.line&&e<S.column)throw new Error("Section offsets must be ordered and non-overlapping.");return S=L,{generatedOffset:{generatedLine:r+1,generatedColumn:e+1},consumer:new o(s.getArg(m,"map"),t)}})}n.prototype=Object.create(o.prototype),n.prototype.constructor=o,n.prototype._version=3,Object.defineProperty(n.prototype,"sources",{get:function(){for(var i=[],t=0;t<this._sections.length;t++)for(var f=0;f<this._sections[t].consumer.sources.length;f++)i.push(this._sections[t].consumer.sources[f]);return i}}),n.prototype.originalPositionFor=function(t){var f={generatedLine:s.getArg(t,"line"),generatedColumn:s.getArg(t,"column")},u=p.search(f,this._sections,function(S,m){var L=S.generatedLine-m.generatedOffset.generatedLine;return L||S.generatedColumn-m.generatedOffset.generatedColumn}),h=this._sections[u];return h?h.consumer.originalPositionFor({line:f.generatedLine-(h.generatedOffset.generatedLine-1),column:f.generatedColumn-(h.generatedOffset.generatedLine===f.generatedLine?h.generatedOffset.generatedColumn-1:0),bias:t.bias}):{source:null,line:null,column:null,name:null}},n.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(t){return t.consumer.hasContentsOfAllSources()})},n.prototype.sourceContentFor=function(t,f){for(var u=0;u<this._sections.length;u++){var h=this._sections[u],S=h.consumer.sourceContentFor(t,!0);if(S)return S}if(f)return null;throw new Error('"'+t+'" is not in the SourceMap.')},n.prototype.generatedPositionFor=function(t){for(var f=0;f<this._sections.length;f++){var u=this._sections[f];if(u.consumer._findSourceIndex(s.getArg(t,"source"))!==-1){var h=u.consumer.generatedPositionFor(t);if(h){var S={line:h.line+(u.generatedOffset.generatedLine-1),column:h.column+(u.generatedOffset.generatedLine===h.line?u.generatedOffset.generatedColumn-1:0)};return S}}}return{line:null,column:null}},n.prototype._parseMappings=function(t,f){this.__generatedMappings=[],this.__originalMappings=[];for(var u=0;u<this._sections.length;u++)for(var h=this._sections[u],S=h.consumer._generatedMappings,m=0;m<S.length;m++){var L=S[m],r=h.consumer._sources.at(L.source);r=s.computeSourceURL(h.consumer.sourceRoot,r,this._sourceMapURL),this._sources.add(r),r=this._sources.indexOf(r);var e=null;L.name&&(e=h.consumer._names.at(L.name),this._names.add(e),e=this._names.indexOf(e));var v={source:r,generatedLine:L.generatedLine+(h.generatedOffset.generatedLine-1),generatedColumn:L.generatedColumn+(h.generatedOffset.generatedLine===L.generatedLine?h.generatedOffset.generatedColumn-1:0),originalLine:L.originalLine,originalColumn:L.originalColumn,name:e};this.__generatedMappings.push(v),typeof v.originalLine=="number"&&this.__originalMappings.push(v)}c(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),c(this.__originalMappings,s.compareByOriginalPositions)},b=n},458:(O,C,E)=>{var b=E(158),s=E(930),p=E(668).I,w=E(923).H;function _(c){c||(c={}),this._file=s.getArg(c,"file",null),this._sourceRoot=s.getArg(c,"sourceRoot",null),this._skipValidation=s.getArg(c,"skipValidation",!1),this._sources=new p,this._names=new p,this._mappings=new w,this._sourcesContents=null}_.prototype._version=3,_.fromSourceMap=function(o){var l=o.sourceRoot,a=new _({file:o.file,sourceRoot:l});return o.eachMapping(function(n){var i={generated:{line:n.generatedLine,column:n.generatedColumn}};n.source!=null&&(i.source=n.source,l!=null&&(i.source=s.relative(l,i.source)),i.original={line:n.originalLine,column:n.originalColumn},n.name!=null&&(i.name=n.name)),a.addMapping(i)}),o.sources.forEach(function(n){var i=n;l!==null&&(i=s.relative(l,n)),a._sources.has(i)||a._sources.add(i);var t=o.sourceContentFor(n);t!=null&&a.setSourceContent(n,t)}),a},_.prototype.addMapping=function(o){var l=s.getArg(o,"generated"),a=s.getArg(o,"original",null),n=s.getArg(o,"source",null),i=s.getArg(o,"name",null);this._skipValidation||this._validateMapping(l,a,n,i),n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),i!=null&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:l.line,generatedColumn:l.column,originalLine:a!=null&&a.line,originalColumn:a!=null&&a.column,source:n,name:i})},_.prototype.setSourceContent=function(o,l){var a=o;this._sourceRoot!=null&&(a=s.relative(this._sourceRoot,a)),l!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[s.toSetString(a)]=l):this._sourcesContents&&(delete this._sourcesContents[s.toSetString(a)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))},_.prototype.applySourceMap=function(o,l,a){var n=l;if(l==null){if(o.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=o.file}var i=this._sourceRoot;i!=null&&(n=s.relative(i,n));var t=new p,f=new p;this._mappings.unsortedForEach(function(u){if(u.source===n&&u.originalLine!=null){var h=o.originalPositionFor({line:u.originalLine,column:u.originalColumn});h.source!=null&&(u.source=h.source,a!=null&&(u.source=s.join(a,u.source)),i!=null&&(u.source=s.relative(i,u.source)),u.originalLine=h.line,u.originalColumn=h.column,h.name!=null&&(u.name=h.name))}var S=u.source;S!=null&&!t.has(S)&&t.add(S);var m=u.name;m!=null&&!f.has(m)&&f.add(m)},this),this._sources=t,this._names=f,o.sources.forEach(function(u){var h=o.sourceContentFor(u);h!=null&&(a!=null&&(u=s.join(a,u)),i!=null&&(u=s.relative(i,u)),this.setSourceContent(u,h))},this)},_.prototype._validateMapping=function(o,l,a,n){if(l&&typeof l.line!="number"&&typeof l.column!="number")throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(!(o&&"line"in o&&"column"in o&&o.line>0&&o.column>=0&&!l&&!a&&!n)){if(o&&"line"in o&&"column"in o&&l&&"line"in l&&"column"in l&&o.line>0&&o.column>=0&&l.line>0&&l.column>=0&&a)return;throw new Error("Invalid mapping: "+JSON.stringify({generated:o,source:a,original:l,name:n}))}},_.prototype._serializeMappings=function(){for(var o=0,l=1,a=0,n=0,i=0,t=0,f="",u,h,S,m,L=this._mappings.toArray(),r=0,e=L.length;r<e;r++){if(h=L[r],u="",h.generatedLine!==l)for(o=0;h.generatedLine!==l;)u+=";",l++;else if(r>0){if(!s.compareByGeneratedPositionsInflated(h,L[r-1]))continue;u+=","}u+=b.encode(h.generatedColumn-o),o=h.generatedColumn,h.source!=null&&(m=this._sources.indexOf(h.source),u+=b.encode(m-t),t=m,u+=b.encode(h.originalLine-1-n),n=h.originalLine-1,u+=b.encode(h.originalColumn-a),a=h.originalColumn,h.name!=null&&(S=this._names.indexOf(h.name),u+=b.encode(S-i),i=S)),f+=u}return f},_.prototype._generateSourcesContent=function(o,l){return o.map(function(a){if(!this._sourcesContents)return null;l!=null&&(a=s.relative(l,a));var n=s.toSetString(a);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},_.prototype.toJSON=function(){var o={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(o.file=this._file),this._sourceRoot!=null&&(o.sourceRoot=this._sourceRoot),this._sourcesContents&&(o.sourcesContent=this._generateSourcesContent(o.sources,o.sourceRoot)),o},_.prototype.toString=function(){return JSON.stringify(this.toJSON())},C.h=_},771:(O,C,E)=>{var b,s=E(458).h,p=E(930),w=/(\r?\n)/,_=10,c="$$$isSourceNode$$$";function o(l,a,n,i,t){this.children=[],this.sourceContents={},this.line=l??null,this.column=a??null,this.source=n??null,this.name=t??null,this[c]=!0,i!=null&&this.add(i)}o.fromStringWithSourceMap=function(a,n,i){var t=new o,f=a.split(w),u=0,h=function(){var e=y(),v=y()||"";return e+v;function y(){return u<f.length?f[u++]:void 0}},S=1,m=0,L=null;return n.eachMapping(function(e){if(L!==null)if(S<e.generatedLine)r(L,h()),S++,m=0;else{var v=f[u]||"",y=v.substr(0,e.generatedColumn-m);f[u]=v.substr(e.generatedColumn-m),m=e.generatedColumn,r(L,y),L=e;return}for(;S<e.generatedLine;)t.add(h()),S++;if(m<e.generatedColumn){var v=f[u]||"";t.add(v.substr(0,e.generatedColumn)),f[u]=v.substr(e.generatedColumn),m=e.generatedColumn}L=e},this),u<f.length&&(L&&r(L,h()),t.add(f.splice(u).join(""))),n.sources.forEach(function(e){var v=n.sourceContentFor(e);v!=null&&(i!=null&&(e=p.join(i,e)),t.setSourceContent(e,v))}),t;function r(e,v){if(e===null||e.source===void 0)t.add(v);else{var y=i?p.join(i,e.source):e.source;t.add(new o(e.originalLine,e.originalColumn,y,v,e.name))}}},o.prototype.add=function(a){if(Array.isArray(a))a.forEach(function(n){this.add(n)},this);else if(a[c]||typeof a=="string")a&&this.children.push(a);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+a);return this},o.prototype.prepend=function(a){if(Array.isArray(a))for(var n=a.length-1;n>=0;n--)this.prepend(a[n]);else if(a[c]||typeof a=="string")this.children.unshift(a);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+a);return this},o.prototype.walk=function(a){for(var n,i=0,t=this.children.length;i<t;i++)n=this.children[i],n[c]?n.walk(a):n!==""&&a(n,{source:this.source,line:this.line,column:this.column,name:this.name})},o.prototype.join=function(a){var n,i,t=this.children.length;if(t>0){for(n=[],i=0;i<t-1;i++)n.push(this.children[i]),n.push(a);n.push(this.children[i]),this.children=n}return this},o.prototype.replaceRight=function(a,n){var i=this.children[this.children.length-1];return i[c]?i.replaceRight(a,n):typeof i=="string"?this.children[this.children.length-1]=i.replace(a,n):this.children.push("".replace(a,n)),this},o.prototype.setSourceContent=function(a,n){this.sourceContents[p.toSetString(a)]=n},o.prototype.walkSourceContents=function(a){for(var n=0,i=this.children.length;n<i;n++)this.children[n][c]&&this.children[n].walkSourceContents(a);for(var t=Object.keys(this.sourceContents),n=0,i=t.length;n<i;n++)a(p.fromSetString(t[n]),this.sourceContents[t[n]])},o.prototype.toString=function(){var a="";return this.walk(function(n){a+=n}),a},o.prototype.toStringWithSourceMap=function(a){var n={code:"",line:1,column:0},i=new s(a),t=!1,f=null,u=null,h=null,S=null;return this.walk(function(m,L){n.code+=m,L.source!==null&&L.line!==null&&L.column!==null?((f!==L.source||u!==L.line||h!==L.column||S!==L.name)&&i.addMapping({source:L.source,original:{line:L.line,column:L.column},generated:{line:n.line,column:n.column},name:L.name}),f=L.source,u=L.line,h=L.column,S=L.name,t=!0):t&&(i.addMapping({generated:{line:n.line,column:n.column}}),f=null,t=!1);for(var r=0,e=m.length;r<e;r++)m.charCodeAt(r)===_?(n.line++,n.column=0,r+1===e?(f=null,t=!1):t&&i.addMapping({source:L.source,original:{line:L.line,column:L.column},generated:{line:n.line,column:n.column},name:L.name})):n.column++}),this.walkSourceContents(function(m,L){i.setSourceContent(m,L)}),{code:n.code,map:i}},b=o},930:(O,C)=>{function E(r,e,v){if(e in r)return r[e];if(arguments.length===3)return v;throw new Error('"'+e+'" is a required argument.')}C.getArg=E;var b=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,s=/^data:.+\,.+$/;function p(r){var e=r.match(b);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}C.urlParse=p;function w(r){var e="";return r.scheme&&(e+=r.scheme+":"),e+="//",r.auth&&(e+=r.auth+"@"),r.host&&(e+=r.host),r.port&&(e+=":"+r.port),r.path&&(e+=r.path),e}C.urlGenerate=w;function _(r){var e=r,v=p(r);if(v){if(!v.path)return r;e=v.path}for(var y=C.isAbsolute(e),I=e.split(/\/+/),B,F=0,T=I.length-1;T>=0;T--)B=I[T],B==="."?I.splice(T,1):B===".."?F++:F>0&&(B===""?(I.splice(T+1,F),F=0):(I.splice(T,2),F--));return e=I.join("/"),e===""&&(e=y?"/":"."),v?(v.path=e,w(v)):e}C.normalize=_;function c(r,e){r===""&&(r="."),e===""&&(e=".");var v=p(e),y=p(r);if(y&&(r=y.path||"/"),v&&!v.scheme)return y&&(v.scheme=y.scheme),w(v);if(v||e.match(s))return e;if(y&&!y.host&&!y.path)return y.host=e,w(y);var I=e.charAt(0)==="/"?e:_(r.replace(/\/+$/,"")+"/"+e);return y?(y.path=I,w(y)):I}C.join=c,C.isAbsolute=function(r){return r.charAt(0)==="/"||b.test(r)};function o(r,e){r===""&&(r="."),r=r.replace(/\/$/,"");for(var v=0;e.indexOf(r+"/")!==0;){var y=r.lastIndexOf("/");if(y<0||(r=r.slice(0,y),r.match(/^([^\/]+:\/)?\/*$/)))return e;++v}return Array(v+1).join("../")+e.substr(r.length+1)}C.relative=o;var l=function(){var r=Object.create(null);return!("__proto__"in r)}();function a(r){return r}function n(r){return t(r)?"$"+r:r}C.toSetString=l?a:n;function i(r){return t(r)?r.slice(1):r}C.fromSetString=l?a:i;function t(r){if(!r)return!1;var e=r.length;if(e<9||r.charCodeAt(e-1)!==95||r.charCodeAt(e-2)!==95||r.charCodeAt(e-3)!==111||r.charCodeAt(e-4)!==116||r.charCodeAt(e-5)!==111||r.charCodeAt(e-6)!==114||r.charCodeAt(e-7)!==112||r.charCodeAt(e-8)!==95||r.charCodeAt(e-9)!==95)return!1;for(var v=e-10;v>=0;v--)if(r.charCodeAt(v)!==36)return!1;return!0}function f(r,e,v){var y=h(r.source,e.source);return y!==0||(y=r.originalLine-e.originalLine,y!==0)||(y=r.originalColumn-e.originalColumn,y!==0||v)||(y=r.generatedColumn-e.generatedColumn,y!==0)||(y=r.generatedLine-e.generatedLine,y!==0)?y:h(r.name,e.name)}C.compareByOriginalPositions=f;function u(r,e,v){var y=r.generatedLine-e.generatedLine;return y!==0||(y=r.generatedColumn-e.generatedColumn,y!==0||v)||(y=h(r.source,e.source),y!==0)||(y=r.originalLine-e.originalLine,y!==0)||(y=r.originalColumn-e.originalColumn,y!==0)?y:h(r.name,e.name)}C.compareByGeneratedPositionsDeflated=u;function h(r,e){return r===e?0:r===null?1:e===null?-1:r>e?1:-1}function S(r,e){var v=r.generatedLine-e.generatedLine;return v!==0||(v=r.generatedColumn-e.generatedColumn,v!==0)||(v=h(r.source,e.source),v!==0)||(v=r.originalLine-e.originalLine,v!==0)||(v=r.originalColumn-e.originalColumn,v!==0)?v:h(r.name,e.name)}C.compareByGeneratedPositionsInflated=S;function m(r){return JSON.parse(r.replace(/^\)]}'[^\n]*\n/,""))}C.parseSourceMapInput=m;function L(r,e,v){if(e=e||"",r&&(r[r.length-1]!=="/"&&e[0]!=="/"&&(r+="/"),e=r+e),v){var y=p(v);if(!y)throw new Error("sourceMapURL could not be parsed");if(y.path){var I=y.path.lastIndexOf("/");I>=0&&(y.path=y.path.substring(0,I+1))}e=c(w(y),e)}return _(e)}C.computeSourceURL=L},461:(O,C,E)=>{E(458).h,C.SourceMapConsumer=E(94).SourceMapConsumer,E(771)},147:O=>{"use strict";O.exports=require("fs")},17:O=>{"use strict";O.exports=require("path")}},W={};function j(O){var C=W[O];if(C!==void 0)return C.exports;var E=W[O]={id:O,loaded:!1,exports:{}};return Z[O](E,E.exports,j),E.loaded=!0,E.exports}j.n=O=>{var C=O&&O.__esModule?()=>O.default:()=>O;return j.d(C,{a:C}),C},j.d=(O,C)=>{for(var E in C)j.o(C,E)&&!j.o(O,E)&&Object.defineProperty(O,E,{enumerable:!0,get:C[E]})},j.o=(O,C)=>Object.prototype.hasOwnProperty.call(O,C),j.r=O=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(O,"__esModule",{value:!0})},j.nmd=O=>(O.paths=[],O.children||(O.children=[]),O);var $={};(()=>{"use strict";j.r($),j.d($,{handler:()=>_});var O=j(49);const C=require("aws-sdk");var E=j.n(C);function b(c,o){return{statusCode:c,body:JSON.stringify(o)}}const s=b,p=new(E()).DynamoDB.DocumentClient;async function w(c,o){const{topic:l}=JSON.parse(c.body),a=l.toLowerCase(),n={TableName:process.env.TOPICS_TABLE,FilterExpression:"topic = :t",ExpressionAttributeValues:{":t":a}};try{const i=await p.scan(n).promise();if(i.Items.length===0)return s(404,{message:"Topic not found"});const t={unit:i.Items[0].unit,type:i.Items[0].type};return s(200,{message:t})}catch(i){return console.log(i),s(501,{message:i.message})}}const _=w})();var J=exports;for(var X in $)J[X]=$[X];$.__esModule&&Object.defineProperty(J,"__esModule",{value:!0})})();

//# sourceMappingURL=gettopicprice.js.map