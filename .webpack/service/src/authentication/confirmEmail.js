(()=>{var K={358:O=>{var C=Object.prototype.toString,E=typeof Buffer<"u"&&typeof Buffer.alloc=="function"&&typeof Buffer.allocUnsafe=="function"&&typeof Buffer.from=="function";function b(_){return C.call(_).slice(8,-1)==="ArrayBuffer"}function u(_,f,o){f>>>=0;var a=_.byteLength-f;if(a<0)throw new RangeError("'offset' is out of bounds");if(o===void 0)o=a;else if(o>>>=0,o>a)throw new RangeError("'length' is out of bounds");return E?Buffer.from(_.slice(f,f+o)):new Buffer(new Uint8Array(_.slice(f,f+o)))}function p(_,f){if((typeof f!="string"||f==="")&&(f="utf8"),!Buffer.isEncoding(f))throw new TypeError('"encoding" must be a valid string encoding');return E?Buffer.from(_,f):new Buffer(_,f)}function w(_,f,o){if(typeof _=="number")throw new TypeError('"value" argument must not be a number');return b(_)?u(_,f,o):typeof _=="string"?p(_,f):E?Buffer.from(_):new Buffer(_)}O.exports=w},49:(O,C,E)=>{E(685).install()},685:(O,C,E)=>{O=E.nmd(O);var b=E(461).SourceMapConsumer,u=E(17),p;try{p=E(147),(!p.existsSync||!p.readFileSync)&&(p=null)}catch{}var w=E(358);function _(h,g){return h.require(g)}var f=!1,o=!1,a=!1,l="auto",n={},i={},t=/^data:application\/json[^,]+base64,/,c=[],s=[];function d(){return l==="browser"?!0:l==="node"?!1:typeof window<"u"&&typeof XMLHttpRequest=="function"&&!(window.require&&window.module&&window.process&&window.process.type==="renderer")}function S(){return typeof process=="object"&&process!==null&&typeof process.on=="function"}function m(){return typeof process=="object"&&process!==null?process.version:""}function L(){if(typeof process=="object"&&process!==null)return process.stderr}function r(h){if(typeof process=="object"&&process!==null&&typeof process.exit=="function")return process.exit(h)}function e(h){return function(g){for(var M=0;M<h.length;M++){var R=h[M](g);if(R)return R}return null}}var v=e(c);c.push(function(h){if(h=h.trim(),/^file:/.test(h)&&(h=h.replace(/file:\/\/\/(\w:)?/,function(R,N){return N?"":"/"})),h in n)return n[h];var g="";try{if(p)p.existsSync(h)&&(g=p.readFileSync(h,"utf8"));else{var M=new XMLHttpRequest;M.open("GET",h,!1),M.send(null),M.readyState===4&&M.status===200&&(g=M.responseText)}}catch{}return n[h]=g});function y(h,g){if(!h)return g;var M=u.dirname(h),R=/^\w+:\/\/[^\/]*/.exec(M),N=R?R[0]:"",A=M.slice(N.length);return N&&/^\/\w\:/.test(A)?(N+="/",N+u.resolve(M.slice(N.length),g).replace(/\\/g,"/")):N+u.resolve(M.slice(N.length),g)}function I(h){var g;if(d())try{var M=new XMLHttpRequest;M.open("GET",h,!1),M.send(null),g=M.readyState===4?M.responseText:null;var R=M.getResponseHeader("SourceMap")||M.getResponseHeader("X-SourceMap");if(R)return R}catch{}g=v(h);for(var N=/(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg,A,T;T=N.exec(g);)A=T;return A?A[1]:null}var U=e(s);s.push(function(h){var g=I(h);if(!g)return null;var M;if(t.test(g)){var R=g.slice(g.indexOf(",")+1);M=w(R,"base64").toString(),g=h}else g=y(h,g),M=v(g);return M?{url:g,map:M}:null});function j(h){var g=i[h.source];if(!g){var M=U(h.source);M?(g=i[h.source]={url:M.url,map:new b(M.map)},g.map.sourcesContent&&g.map.sources.forEach(function(N,A){var T=g.map.sourcesContent[A];if(T){var x=y(g.url,N);n[x]=T}})):g=i[h.source]={url:null,map:null}}if(g&&g.map&&typeof g.map.originalPositionFor=="function"){var R=g.map.originalPositionFor(h);if(R.source!==null)return R.source=y(g.url,R.source),R}return h}function P(h){var g=/^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(h);if(g){var M=j({source:g[2],line:+g[3],column:g[4]-1});return"eval at "+g[1]+" ("+M.source+":"+M.line+":"+(M.column+1)+")"}return g=/^eval at ([^(]+) \((.+)\)$/.exec(h),g?"eval at "+g[1]+" ("+P(g[2])+")":h}function k(){var h,g="";if(this.isNative())g="native";else{h=this.getScriptNameOrSourceURL(),!h&&this.isEval()&&(g=this.getEvalOrigin(),g+=", "),h?g+=h:g+="<anonymous>";var M=this.getLineNumber();if(M!=null){g+=":"+M;var R=this.getColumnNumber();R&&(g+=":"+R)}}var N="",A=this.getFunctionName(),T=!0,x=this.isConstructor(),Q=!(this.isToplevel()||x);if(Q){var D=this.getTypeName();D==="[object Object]"&&(D="null");var V=this.getMethodName();A?(D&&A.indexOf(D)!=0&&(N+=D+"."),N+=A,V&&A.indexOf("."+V)!=A.length-V.length-1&&(N+=" [as "+V+"]")):N+=D+"."+(V||"<anonymous>")}else x?N+="new "+(A||"<anonymous>"):A?N+=A:(N+=g,T=!1);return T&&(N+=" ("+g+")"),N}function G(h){var g={};return Object.getOwnPropertyNames(Object.getPrototypeOf(h)).forEach(function(M){g[M]=/^(?:is|get)/.test(M)?function(){return h[M].call(h)}:h[M]}),g.toString=k,g}function F(h,g){if(g===void 0&&(g={nextPosition:null,curPosition:null}),h.isNative())return g.curPosition=null,h;var M=h.getFileName()||h.getScriptNameOrSourceURL();if(M){var R=h.getLineNumber(),N=h.getColumnNumber()-1,A=/^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/,T=A.test(m())?0:62;R===1&&N>T&&!d()&&!h.isEval()&&(N-=T);var x=j({source:M,line:R,column:N});g.curPosition=x,h=G(h);var Q=h.getFunctionName;return h.getFunctionName=function(){return g.nextPosition==null?Q():g.nextPosition.name||Q()},h.getFileName=function(){return x.source},h.getLineNumber=function(){return x.line},h.getColumnNumber=function(){return x.column+1},h.getScriptNameOrSourceURL=function(){return x.source},h}var D=h.isEval()&&h.getEvalOrigin();return D&&(D=P(D),h=G(h),h.getEvalOrigin=function(){return D}),h}function z(h,g){a&&(n={},i={});for(var M=h.name||"Error",R=h.message||"",N=M+": "+R,A={nextPosition:null,curPosition:null},T=[],x=g.length-1;x>=0;x--)T.push(`
    at `+F(g[x],A)),A.nextPosition=A.curPosition;return A.curPosition=A.nextPosition=null,N+T.reverse().join("")}function q(h){var g=/\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(h.stack);if(g){var M=g[1],R=+g[2],N=+g[3],A=n[M];if(!A&&p&&p.existsSync(M))try{A=p.readFileSync(M,"utf8")}catch{A=""}if(A){var T=A.split(/(?:\r\n|\r|\n)/)[R-1];if(T)return M+":"+R+`
`+T+`
`+new Array(N).join(" ")+"^"}}return null}function Z(h){var g=q(h),M=L();M&&M._handle&&M._handle.setBlocking&&M._handle.setBlocking(!0),g&&(console.error(),console.error(g)),console.error(h.stack),r(1)}function H(){var h=process.emit;process.emit=function(g){if(g==="uncaughtException"){var M=arguments[1]&&arguments[1].stack,R=this.listeners(g).length>0;if(M&&!R)return Z(arguments[1])}return h.apply(this,arguments)}}var Y=c.slice(0),ee=s.slice(0);C.wrapCallSite=F,C.getErrorSource=q,C.mapSourcePosition=j,C.retrieveSourceMap=U,C.install=function(h){if(h=h||{},h.environment&&(l=h.environment,["node","browser","auto"].indexOf(l)===-1))throw new Error("environment "+l+" was unknown. Available options are {auto, browser, node}");if(h.retrieveFile&&(h.overrideRetrieveFile&&(c.length=0),c.unshift(h.retrieveFile)),h.retrieveSourceMap&&(h.overrideRetrieveSourceMap&&(s.length=0),s.unshift(h.retrieveSourceMap)),h.hookRequire&&!d()){var g=_(O,"module"),M=g.prototype._compile;M.__sourceMapSupport||(g.prototype._compile=function(A,T){return n[T]=A,i[T]=void 0,M.call(this,A,T)},g.prototype._compile.__sourceMapSupport=!0)}if(a||(a="emptyCacheBetweenOperations"in h?h.emptyCacheBetweenOperations:!1),f||(f=!0,Error.prepareStackTrace=z),!o){var R="handleUncaughtExceptions"in h?h.handleUncaughtExceptions:!0;try{var N=_(O,"worker_threads");N.isMainThread===!1&&(R=!1)}catch{}R&&S()&&(o=!0,H())}},C.resetRetrieveHandlers=function(){c.length=0,s.length=0,c=Y.slice(0),s=ee.slice(0),U=e(s),v=e(c)}},668:(O,C,E)=>{var b=E(930),u=Object.prototype.hasOwnProperty,p=typeof Map<"u";function w(){this._array=[],this._set=p?new Map:Object.create(null)}w.fromArray=function(f,o){for(var a=new w,l=0,n=f.length;l<n;l++)a.add(f[l],o);return a},w.prototype.size=function(){return p?this._set.size:Object.getOwnPropertyNames(this._set).length},w.prototype.add=function(f,o){var a=p?f:b.toSetString(f),l=p?this.has(f):u.call(this._set,a),n=this._array.length;(!l||o)&&this._array.push(f),l||(p?this._set.set(f,n):this._set[a]=n)},w.prototype.has=function(f){if(p)return this._set.has(f);var o=b.toSetString(f);return u.call(this._set,o)},w.prototype.indexOf=function(f){if(p){var o=this._set.get(f);if(o>=0)return o}else{var a=b.toSetString(f);if(u.call(this._set,a))return this._set[a]}throw new Error('"'+f+'" is not in the set.')},w.prototype.at=function(f){if(f>=0&&f<this._array.length)return this._array[f];throw new Error("No element indexed by "+f)},w.prototype.toArray=function(){return this._array.slice()},C.I=w},158:(O,C,E)=>{var b=E(977),u=5,p=1<<u,w=p-1,_=p;function f(a){return a<0?(-a<<1)+1:(a<<1)+0}function o(a){var l=(a&1)===1,n=a>>1;return l?-n:n}C.encode=function(l){var n="",i,t=f(l);do i=t&w,t>>>=u,t>0&&(i|=_),n+=b.encode(i);while(t>0);return n},C.decode=function(l,n,i){var t=l.length,c=0,s=0,d,S;do{if(n>=t)throw new Error("Expected more digits in base 64 VLQ value.");if(S=b.decode(l.charCodeAt(n++)),S===-1)throw new Error("Invalid base64 digit: "+l.charAt(n-1));d=!!(S&_),S&=w,c=c+(S<<s),s+=u}while(d);i.value=o(c),i.rest=n}},977:(O,C)=>{var E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");C.encode=function(b){if(0<=b&&b<E.length)return E[b];throw new TypeError("Must be between 0 and 63: "+b)},C.decode=function(b){var u=65,p=90,w=97,_=122,f=48,o=57,a=43,l=47,n=26,i=52;return u<=b&&b<=p?b-u:w<=b&&b<=_?b-w+n:f<=b&&b<=o?b-f+i:b==a?62:b==l?63:-1}},63:(O,C)=>{C.GREATEST_LOWER_BOUND=1,C.LEAST_UPPER_BOUND=2;function E(b,u,p,w,_,f){var o=Math.floor((u-b)/2)+b,a=_(p,w[o],!0);return a===0?o:a>0?u-o>1?E(o,u,p,w,_,f):f==C.LEAST_UPPER_BOUND?u<w.length?u:-1:o:o-b>1?E(b,o,p,w,_,f):f==C.LEAST_UPPER_BOUND?o:b<0?-1:b}C.search=function(u,p,w,_){if(p.length===0)return-1;var f=E(-1,p.length,u,p,w,_||C.GREATEST_LOWER_BOUND);if(f<0)return-1;for(;f-1>=0&&w(p[f],p[f-1],!0)===0;)--f;return f}},923:(O,C,E)=>{var b=E(930);function u(w,_){var f=w.generatedLine,o=_.generatedLine,a=w.generatedColumn,l=_.generatedColumn;return o>f||o==f&&l>=a||b.compareByGeneratedPositionsInflated(w,_)<=0}function p(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}p.prototype.unsortedForEach=function(_,f){this._array.forEach(_,f)},p.prototype.add=function(_){u(this._last,_)?(this._last=_,this._array.push(_)):(this._sorted=!1,this._array.push(_))},p.prototype.toArray=function(){return this._sorted||(this._array.sort(b.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},C.H=p},645:(O,C)=>{function E(p,w,_){var f=p[w];p[w]=p[_],p[_]=f}function b(p,w){return Math.round(p+Math.random()*(w-p))}function u(p,w,_,f){if(_<f){var o=b(_,f),a=_-1;E(p,o,f);for(var l=p[f],n=_;n<f;n++)w(p[n],l)<=0&&(a+=1,E(p,a,n));E(p,a+1,n);var i=a+1;u(p,w,_,i-1),u(p,w,i+1,f)}}C.U=function(p,w){u(p,w,0,p.length-1)}},94:(O,C,E)=>{var b,u=E(930),p=E(63),w=E(668).I,_=E(158),f=E(645).U;function o(i,t){var c=i;return typeof i=="string"&&(c=u.parseSourceMapInput(i)),c.sections!=null?new n(c,t):new a(c,t)}o.fromSourceMap=function(i,t){return a.fromSourceMap(i,t)},o.prototype._version=3,o.prototype.__generatedMappings=null,Object.defineProperty(o.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),o.prototype.__originalMappings=null,Object.defineProperty(o.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),o.prototype._charIsMappingSeparator=function(t,c){var s=t.charAt(c);return s===";"||s===","},o.prototype._parseMappings=function(t,c){throw new Error("Subclasses must implement _parseMappings")},o.GENERATED_ORDER=1,o.ORIGINAL_ORDER=2,o.GREATEST_LOWER_BOUND=1,o.LEAST_UPPER_BOUND=2,o.prototype.eachMapping=function(t,c,s){var d=c||null,S=s||o.GENERATED_ORDER,m;switch(S){case o.GENERATED_ORDER:m=this._generatedMappings;break;case o.ORIGINAL_ORDER:m=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var L=this.sourceRoot;m.map(function(r){var e=r.source===null?null:this._sources.at(r.source);return e=u.computeSourceURL(L,e,this._sourceMapURL),{source:e,generatedLine:r.generatedLine,generatedColumn:r.generatedColumn,originalLine:r.originalLine,originalColumn:r.originalColumn,name:r.name===null?null:this._names.at(r.name)}},this).forEach(t,d)},o.prototype.allGeneratedPositionsFor=function(t){var c=u.getArg(t,"line"),s={source:u.getArg(t,"source"),originalLine:c,originalColumn:u.getArg(t,"column",0)};if(s.source=this._findSourceIndex(s.source),s.source<0)return[];var d=[],S=this._findMapping(s,this._originalMappings,"originalLine","originalColumn",u.compareByOriginalPositions,p.LEAST_UPPER_BOUND);if(S>=0){var m=this._originalMappings[S];if(t.column===void 0)for(var L=m.originalLine;m&&m.originalLine===L;)d.push({line:u.getArg(m,"generatedLine",null),column:u.getArg(m,"generatedColumn",null),lastColumn:u.getArg(m,"lastGeneratedColumn",null)}),m=this._originalMappings[++S];else for(var r=m.originalColumn;m&&m.originalLine===c&&m.originalColumn==r;)d.push({line:u.getArg(m,"generatedLine",null),column:u.getArg(m,"generatedColumn",null),lastColumn:u.getArg(m,"lastGeneratedColumn",null)}),m=this._originalMappings[++S]}return d},C.SourceMapConsumer=o;function a(i,t){var c=i;typeof i=="string"&&(c=u.parseSourceMapInput(i));var s=u.getArg(c,"version"),d=u.getArg(c,"sources"),S=u.getArg(c,"names",[]),m=u.getArg(c,"sourceRoot",null),L=u.getArg(c,"sourcesContent",null),r=u.getArg(c,"mappings"),e=u.getArg(c,"file",null);if(s!=this._version)throw new Error("Unsupported version: "+s);m&&(m=u.normalize(m)),d=d.map(String).map(u.normalize).map(function(v){return m&&u.isAbsolute(m)&&u.isAbsolute(v)?u.relative(m,v):v}),this._names=w.fromArray(S.map(String),!0),this._sources=w.fromArray(d,!0),this._absoluteSources=this._sources.toArray().map(function(v){return u.computeSourceURL(m,v,t)}),this.sourceRoot=m,this.sourcesContent=L,this._mappings=r,this._sourceMapURL=t,this.file=e}a.prototype=Object.create(o.prototype),a.prototype.consumer=o,a.prototype._findSourceIndex=function(i){var t=i;if(this.sourceRoot!=null&&(t=u.relative(this.sourceRoot,t)),this._sources.has(t))return this._sources.indexOf(t);var c;for(c=0;c<this._absoluteSources.length;++c)if(this._absoluteSources[c]==i)return c;return-1},a.fromSourceMap=function(t,c){var s=Object.create(a.prototype),d=s._names=w.fromArray(t._names.toArray(),!0),S=s._sources=w.fromArray(t._sources.toArray(),!0);s.sourceRoot=t._sourceRoot,s.sourcesContent=t._generateSourcesContent(s._sources.toArray(),s.sourceRoot),s.file=t._file,s._sourceMapURL=c,s._absoluteSources=s._sources.toArray().map(function(U){return u.computeSourceURL(s.sourceRoot,U,c)});for(var m=t._mappings.toArray().slice(),L=s.__generatedMappings=[],r=s.__originalMappings=[],e=0,v=m.length;e<v;e++){var y=m[e],I=new l;I.generatedLine=y.generatedLine,I.generatedColumn=y.generatedColumn,y.source&&(I.source=S.indexOf(y.source),I.originalLine=y.originalLine,I.originalColumn=y.originalColumn,y.name&&(I.name=d.indexOf(y.name)),r.push(I)),L.push(I)}return f(s.__originalMappings,u.compareByOriginalPositions),s},a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function l(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}a.prototype._parseMappings=function(t,c){for(var s=1,d=0,S=0,m=0,L=0,r=0,e=t.length,v=0,y={},I={},U=[],j=[],P,k,G,F,z;v<e;)if(t.charAt(v)===";")s++,v++,d=0;else if(t.charAt(v)===",")v++;else{for(P=new l,P.generatedLine=s,F=v;F<e&&!this._charIsMappingSeparator(t,F);F++);if(k=t.slice(v,F),G=y[k],G)v+=k.length;else{for(G=[];v<F;)_.decode(t,v,I),z=I.value,v=I.rest,G.push(z);if(G.length===2)throw new Error("Found a source, but no line and column");if(G.length===3)throw new Error("Found a source and line, but no column");y[k]=G}P.generatedColumn=d+G[0],d=P.generatedColumn,G.length>1&&(P.source=L+G[1],L+=G[1],P.originalLine=S+G[2],S=P.originalLine,P.originalLine+=1,P.originalColumn=m+G[3],m=P.originalColumn,G.length>4&&(P.name=r+G[4],r+=G[4])),j.push(P),typeof P.originalLine=="number"&&U.push(P)}f(j,u.compareByGeneratedPositionsDeflated),this.__generatedMappings=j,f(U,u.compareByOriginalPositions),this.__originalMappings=U},a.prototype._findMapping=function(t,c,s,d,S,m){if(t[s]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+t[s]);if(t[d]<0)throw new TypeError("Column must be greater than or equal to 0, got "+t[d]);return p.search(t,c,S,m)},a.prototype.computeColumnSpans=function(){for(var t=0;t<this._generatedMappings.length;++t){var c=this._generatedMappings[t];if(t+1<this._generatedMappings.length){var s=this._generatedMappings[t+1];if(c.generatedLine===s.generatedLine){c.lastGeneratedColumn=s.generatedColumn-1;continue}}c.lastGeneratedColumn=1/0}},a.prototype.originalPositionFor=function(t){var c={generatedLine:u.getArg(t,"line"),generatedColumn:u.getArg(t,"column")},s=this._findMapping(c,this._generatedMappings,"generatedLine","generatedColumn",u.compareByGeneratedPositionsDeflated,u.getArg(t,"bias",o.GREATEST_LOWER_BOUND));if(s>=0){var d=this._generatedMappings[s];if(d.generatedLine===c.generatedLine){var S=u.getArg(d,"source",null);S!==null&&(S=this._sources.at(S),S=u.computeSourceURL(this.sourceRoot,S,this._sourceMapURL));var m=u.getArg(d,"name",null);return m!==null&&(m=this._names.at(m)),{source:S,line:u.getArg(d,"originalLine",null),column:u.getArg(d,"originalColumn",null),name:m}}}return{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(t){return t==null}):!1},a.prototype.sourceContentFor=function(t,c){if(!this.sourcesContent)return null;var s=this._findSourceIndex(t);if(s>=0)return this.sourcesContent[s];var d=t;this.sourceRoot!=null&&(d=u.relative(this.sourceRoot,d));var S;if(this.sourceRoot!=null&&(S=u.urlParse(this.sourceRoot))){var m=d.replace(/^file:\/\//,"");if(S.scheme=="file"&&this._sources.has(m))return this.sourcesContent[this._sources.indexOf(m)];if((!S.path||S.path=="/")&&this._sources.has("/"+d))return this.sourcesContent[this._sources.indexOf("/"+d)]}if(c)return null;throw new Error('"'+d+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(t){var c=u.getArg(t,"source");if(c=this._findSourceIndex(c),c<0)return{line:null,column:null,lastColumn:null};var s={source:c,originalLine:u.getArg(t,"line"),originalColumn:u.getArg(t,"column")},d=this._findMapping(s,this._originalMappings,"originalLine","originalColumn",u.compareByOriginalPositions,u.getArg(t,"bias",o.GREATEST_LOWER_BOUND));if(d>=0){var S=this._originalMappings[d];if(S.source===s.source)return{line:u.getArg(S,"generatedLine",null),column:u.getArg(S,"generatedColumn",null),lastColumn:u.getArg(S,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},b=a;function n(i,t){var c=i;typeof i=="string"&&(c=u.parseSourceMapInput(i));var s=u.getArg(c,"version"),d=u.getArg(c,"sections");if(s!=this._version)throw new Error("Unsupported version: "+s);this._sources=new w,this._names=new w;var S={line:-1,column:0};this._sections=d.map(function(m){if(m.url)throw new Error("Support for url field in sections not implemented.");var L=u.getArg(m,"offset"),r=u.getArg(L,"line"),e=u.getArg(L,"column");if(r<S.line||r===S.line&&e<S.column)throw new Error("Section offsets must be ordered and non-overlapping.");return S=L,{generatedOffset:{generatedLine:r+1,generatedColumn:e+1},consumer:new o(u.getArg(m,"map"),t)}})}n.prototype=Object.create(o.prototype),n.prototype.constructor=o,n.prototype._version=3,Object.defineProperty(n.prototype,"sources",{get:function(){for(var i=[],t=0;t<this._sections.length;t++)for(var c=0;c<this._sections[t].consumer.sources.length;c++)i.push(this._sections[t].consumer.sources[c]);return i}}),n.prototype.originalPositionFor=function(t){var c={generatedLine:u.getArg(t,"line"),generatedColumn:u.getArg(t,"column")},s=p.search(c,this._sections,function(S,m){var L=S.generatedLine-m.generatedOffset.generatedLine;return L||S.generatedColumn-m.generatedOffset.generatedColumn}),d=this._sections[s];return d?d.consumer.originalPositionFor({line:c.generatedLine-(d.generatedOffset.generatedLine-1),column:c.generatedColumn-(d.generatedOffset.generatedLine===c.generatedLine?d.generatedOffset.generatedColumn-1:0),bias:t.bias}):{source:null,line:null,column:null,name:null}},n.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(t){return t.consumer.hasContentsOfAllSources()})},n.prototype.sourceContentFor=function(t,c){for(var s=0;s<this._sections.length;s++){var d=this._sections[s],S=d.consumer.sourceContentFor(t,!0);if(S)return S}if(c)return null;throw new Error('"'+t+'" is not in the SourceMap.')},n.prototype.generatedPositionFor=function(t){for(var c=0;c<this._sections.length;c++){var s=this._sections[c];if(s.consumer._findSourceIndex(u.getArg(t,"source"))!==-1){var d=s.consumer.generatedPositionFor(t);if(d){var S={line:d.line+(s.generatedOffset.generatedLine-1),column:d.column+(s.generatedOffset.generatedLine===d.line?s.generatedOffset.generatedColumn-1:0)};return S}}}return{line:null,column:null}},n.prototype._parseMappings=function(t,c){this.__generatedMappings=[],this.__originalMappings=[];for(var s=0;s<this._sections.length;s++)for(var d=this._sections[s],S=d.consumer._generatedMappings,m=0;m<S.length;m++){var L=S[m],r=d.consumer._sources.at(L.source);r=u.computeSourceURL(d.consumer.sourceRoot,r,this._sourceMapURL),this._sources.add(r),r=this._sources.indexOf(r);var e=null;L.name&&(e=d.consumer._names.at(L.name),this._names.add(e),e=this._names.indexOf(e));var v={source:r,generatedLine:L.generatedLine+(d.generatedOffset.generatedLine-1),generatedColumn:L.generatedColumn+(d.generatedOffset.generatedLine===L.generatedLine?d.generatedOffset.generatedColumn-1:0),originalLine:L.originalLine,originalColumn:L.originalColumn,name:e};this.__generatedMappings.push(v),typeof v.originalLine=="number"&&this.__originalMappings.push(v)}f(this.__generatedMappings,u.compareByGeneratedPositionsDeflated),f(this.__originalMappings,u.compareByOriginalPositions)},b=n},458:(O,C,E)=>{var b=E(158),u=E(930),p=E(668).I,w=E(923).H;function _(f){f||(f={}),this._file=u.getArg(f,"file",null),this._sourceRoot=u.getArg(f,"sourceRoot",null),this._skipValidation=u.getArg(f,"skipValidation",!1),this._sources=new p,this._names=new p,this._mappings=new w,this._sourcesContents=null}_.prototype._version=3,_.fromSourceMap=function(o){var a=o.sourceRoot,l=new _({file:o.file,sourceRoot:a});return o.eachMapping(function(n){var i={generated:{line:n.generatedLine,column:n.generatedColumn}};n.source!=null&&(i.source=n.source,a!=null&&(i.source=u.relative(a,i.source)),i.original={line:n.originalLine,column:n.originalColumn},n.name!=null&&(i.name=n.name)),l.addMapping(i)}),o.sources.forEach(function(n){var i=n;a!==null&&(i=u.relative(a,n)),l._sources.has(i)||l._sources.add(i);var t=o.sourceContentFor(n);t!=null&&l.setSourceContent(n,t)}),l},_.prototype.addMapping=function(o){var a=u.getArg(o,"generated"),l=u.getArg(o,"original",null),n=u.getArg(o,"source",null),i=u.getArg(o,"name",null);this._skipValidation||this._validateMapping(a,l,n,i),n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),i!=null&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:a.line,generatedColumn:a.column,originalLine:l!=null&&l.line,originalColumn:l!=null&&l.column,source:n,name:i})},_.prototype.setSourceContent=function(o,a){var l=o;this._sourceRoot!=null&&(l=u.relative(this._sourceRoot,l)),a!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[u.toSetString(l)]=a):this._sourcesContents&&(delete this._sourcesContents[u.toSetString(l)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))},_.prototype.applySourceMap=function(o,a,l){var n=a;if(a==null){if(o.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=o.file}var i=this._sourceRoot;i!=null&&(n=u.relative(i,n));var t=new p,c=new p;this._mappings.unsortedForEach(function(s){if(s.source===n&&s.originalLine!=null){var d=o.originalPositionFor({line:s.originalLine,column:s.originalColumn});d.source!=null&&(s.source=d.source,l!=null&&(s.source=u.join(l,s.source)),i!=null&&(s.source=u.relative(i,s.source)),s.originalLine=d.line,s.originalColumn=d.column,d.name!=null&&(s.name=d.name))}var S=s.source;S!=null&&!t.has(S)&&t.add(S);var m=s.name;m!=null&&!c.has(m)&&c.add(m)},this),this._sources=t,this._names=c,o.sources.forEach(function(s){var d=o.sourceContentFor(s);d!=null&&(l!=null&&(s=u.join(l,s)),i!=null&&(s=u.relative(i,s)),this.setSourceContent(s,d))},this)},_.prototype._validateMapping=function(o,a,l,n){if(a&&typeof a.line!="number"&&typeof a.column!="number")throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(!(o&&"line"in o&&"column"in o&&o.line>0&&o.column>=0&&!a&&!l&&!n)){if(o&&"line"in o&&"column"in o&&a&&"line"in a&&"column"in a&&o.line>0&&o.column>=0&&a.line>0&&a.column>=0&&l)return;throw new Error("Invalid mapping: "+JSON.stringify({generated:o,source:l,original:a,name:n}))}},_.prototype._serializeMappings=function(){for(var o=0,a=1,l=0,n=0,i=0,t=0,c="",s,d,S,m,L=this._mappings.toArray(),r=0,e=L.length;r<e;r++){if(d=L[r],s="",d.generatedLine!==a)for(o=0;d.generatedLine!==a;)s+=";",a++;else if(r>0){if(!u.compareByGeneratedPositionsInflated(d,L[r-1]))continue;s+=","}s+=b.encode(d.generatedColumn-o),o=d.generatedColumn,d.source!=null&&(m=this._sources.indexOf(d.source),s+=b.encode(m-t),t=m,s+=b.encode(d.originalLine-1-n),n=d.originalLine-1,s+=b.encode(d.originalColumn-l),l=d.originalColumn,d.name!=null&&(S=this._names.indexOf(d.name),s+=b.encode(S-i),i=S)),c+=s}return c},_.prototype._generateSourcesContent=function(o,a){return o.map(function(l){if(!this._sourcesContents)return null;a!=null&&(l=u.relative(a,l));var n=u.toSetString(l);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},_.prototype.toJSON=function(){var o={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(o.file=this._file),this._sourceRoot!=null&&(o.sourceRoot=this._sourceRoot),this._sourcesContents&&(o.sourcesContent=this._generateSourcesContent(o.sources,o.sourceRoot)),o},_.prototype.toString=function(){return JSON.stringify(this.toJSON())},C.h=_},771:(O,C,E)=>{var b,u=E(458).h,p=E(930),w=/(\r?\n)/,_=10,f="$$$isSourceNode$$$";function o(a,l,n,i,t){this.children=[],this.sourceContents={},this.line=a??null,this.column=l??null,this.source=n??null,this.name=t??null,this[f]=!0,i!=null&&this.add(i)}o.fromStringWithSourceMap=function(l,n,i){var t=new o,c=l.split(w),s=0,d=function(){var e=y(),v=y()||"";return e+v;function y(){return s<c.length?c[s++]:void 0}},S=1,m=0,L=null;return n.eachMapping(function(e){if(L!==null)if(S<e.generatedLine)r(L,d()),S++,m=0;else{var v=c[s]||"",y=v.substr(0,e.generatedColumn-m);c[s]=v.substr(e.generatedColumn-m),m=e.generatedColumn,r(L,y),L=e;return}for(;S<e.generatedLine;)t.add(d()),S++;if(m<e.generatedColumn){var v=c[s]||"";t.add(v.substr(0,e.generatedColumn)),c[s]=v.substr(e.generatedColumn),m=e.generatedColumn}L=e},this),s<c.length&&(L&&r(L,d()),t.add(c.splice(s).join(""))),n.sources.forEach(function(e){var v=n.sourceContentFor(e);v!=null&&(i!=null&&(e=p.join(i,e)),t.setSourceContent(e,v))}),t;function r(e,v){if(e===null||e.source===void 0)t.add(v);else{var y=i?p.join(i,e.source):e.source;t.add(new o(e.originalLine,e.originalColumn,y,v,e.name))}}},o.prototype.add=function(l){if(Array.isArray(l))l.forEach(function(n){this.add(n)},this);else if(l[f]||typeof l=="string")l&&this.children.push(l);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+l);return this},o.prototype.prepend=function(l){if(Array.isArray(l))for(var n=l.length-1;n>=0;n--)this.prepend(l[n]);else if(l[f]||typeof l=="string")this.children.unshift(l);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+l);return this},o.prototype.walk=function(l){for(var n,i=0,t=this.children.length;i<t;i++)n=this.children[i],n[f]?n.walk(l):n!==""&&l(n,{source:this.source,line:this.line,column:this.column,name:this.name})},o.prototype.join=function(l){var n,i,t=this.children.length;if(t>0){for(n=[],i=0;i<t-1;i++)n.push(this.children[i]),n.push(l);n.push(this.children[i]),this.children=n}return this},o.prototype.replaceRight=function(l,n){var i=this.children[this.children.length-1];return i[f]?i.replaceRight(l,n):typeof i=="string"?this.children[this.children.length-1]=i.replace(l,n):this.children.push("".replace(l,n)),this},o.prototype.setSourceContent=function(l,n){this.sourceContents[p.toSetString(l)]=n},o.prototype.walkSourceContents=function(l){for(var n=0,i=this.children.length;n<i;n++)this.children[n][f]&&this.children[n].walkSourceContents(l);for(var t=Object.keys(this.sourceContents),n=0,i=t.length;n<i;n++)l(p.fromSetString(t[n]),this.sourceContents[t[n]])},o.prototype.toString=function(){var l="";return this.walk(function(n){l+=n}),l},o.prototype.toStringWithSourceMap=function(l){var n={code:"",line:1,column:0},i=new u(l),t=!1,c=null,s=null,d=null,S=null;return this.walk(function(m,L){n.code+=m,L.source!==null&&L.line!==null&&L.column!==null?((c!==L.source||s!==L.line||d!==L.column||S!==L.name)&&i.addMapping({source:L.source,original:{line:L.line,column:L.column},generated:{line:n.line,column:n.column},name:L.name}),c=L.source,s=L.line,d=L.column,S=L.name,t=!0):t&&(i.addMapping({generated:{line:n.line,column:n.column}}),c=null,t=!1);for(var r=0,e=m.length;r<e;r++)m.charCodeAt(r)===_?(n.line++,n.column=0,r+1===e?(c=null,t=!1):t&&i.addMapping({source:L.source,original:{line:L.line,column:L.column},generated:{line:n.line,column:n.column},name:L.name})):n.column++}),this.walkSourceContents(function(m,L){i.setSourceContent(m,L)}),{code:n.code,map:i}},b=o},930:(O,C)=>{function E(r,e,v){if(e in r)return r[e];if(arguments.length===3)return v;throw new Error('"'+e+'" is a required argument.')}C.getArg=E;var b=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,u=/^data:.+\,.+$/;function p(r){var e=r.match(b);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}C.urlParse=p;function w(r){var e="";return r.scheme&&(e+=r.scheme+":"),e+="//",r.auth&&(e+=r.auth+"@"),r.host&&(e+=r.host),r.port&&(e+=":"+r.port),r.path&&(e+=r.path),e}C.urlGenerate=w;function _(r){var e=r,v=p(r);if(v){if(!v.path)return r;e=v.path}for(var y=C.isAbsolute(e),I=e.split(/\/+/),U,j=0,P=I.length-1;P>=0;P--)U=I[P],U==="."?I.splice(P,1):U===".."?j++:j>0&&(U===""?(I.splice(P+1,j),j=0):(I.splice(P,2),j--));return e=I.join("/"),e===""&&(e=y?"/":"."),v?(v.path=e,w(v)):e}C.normalize=_;function f(r,e){r===""&&(r="."),e===""&&(e=".");var v=p(e),y=p(r);if(y&&(r=y.path||"/"),v&&!v.scheme)return y&&(v.scheme=y.scheme),w(v);if(v||e.match(u))return e;if(y&&!y.host&&!y.path)return y.host=e,w(y);var I=e.charAt(0)==="/"?e:_(r.replace(/\/+$/,"")+"/"+e);return y?(y.path=I,w(y)):I}C.join=f,C.isAbsolute=function(r){return r.charAt(0)==="/"||b.test(r)};function o(r,e){r===""&&(r="."),r=r.replace(/\/$/,"");for(var v=0;e.indexOf(r+"/")!==0;){var y=r.lastIndexOf("/");if(y<0||(r=r.slice(0,y),r.match(/^([^\/]+:\/)?\/*$/)))return e;++v}return Array(v+1).join("../")+e.substr(r.length+1)}C.relative=o;var a=function(){var r=Object.create(null);return!("__proto__"in r)}();function l(r){return r}function n(r){return t(r)?"$"+r:r}C.toSetString=a?l:n;function i(r){return t(r)?r.slice(1):r}C.fromSetString=a?l:i;function t(r){if(!r)return!1;var e=r.length;if(e<9||r.charCodeAt(e-1)!==95||r.charCodeAt(e-2)!==95||r.charCodeAt(e-3)!==111||r.charCodeAt(e-4)!==116||r.charCodeAt(e-5)!==111||r.charCodeAt(e-6)!==114||r.charCodeAt(e-7)!==112||r.charCodeAt(e-8)!==95||r.charCodeAt(e-9)!==95)return!1;for(var v=e-10;v>=0;v--)if(r.charCodeAt(v)!==36)return!1;return!0}function c(r,e,v){var y=d(r.source,e.source);return y!==0||(y=r.originalLine-e.originalLine,y!==0)||(y=r.originalColumn-e.originalColumn,y!==0||v)||(y=r.generatedColumn-e.generatedColumn,y!==0)||(y=r.generatedLine-e.generatedLine,y!==0)?y:d(r.name,e.name)}C.compareByOriginalPositions=c;function s(r,e,v){var y=r.generatedLine-e.generatedLine;return y!==0||(y=r.generatedColumn-e.generatedColumn,y!==0||v)||(y=d(r.source,e.source),y!==0)||(y=r.originalLine-e.originalLine,y!==0)||(y=r.originalColumn-e.originalColumn,y!==0)?y:d(r.name,e.name)}C.compareByGeneratedPositionsDeflated=s;function d(r,e){return r===e?0:r===null?1:e===null?-1:r>e?1:-1}function S(r,e){var v=r.generatedLine-e.generatedLine;return v!==0||(v=r.generatedColumn-e.generatedColumn,v!==0)||(v=d(r.source,e.source),v!==0)||(v=r.originalLine-e.originalLine,v!==0)||(v=r.originalColumn-e.originalColumn,v!==0)?v:d(r.name,e.name)}C.compareByGeneratedPositionsInflated=S;function m(r){return JSON.parse(r.replace(/^\)]}'[^\n]*\n/,""))}C.parseSourceMapInput=m;function L(r,e,v){if(e=e||"",r&&(r[r.length-1]!=="/"&&e[0]!=="/"&&(r+="/"),e=r+e),v){var y=p(v);if(!y)throw new Error("sourceMapURL could not be parsed");if(y.path){var I=y.path.lastIndexOf("/");I>=0&&(y.path=y.path.substring(0,I+1))}e=f(w(y),e)}return _(e)}C.computeSourceURL=L},461:(O,C,E)=>{E(458).h,C.SourceMapConsumer=E(94).SourceMapConsumer,E(771)},147:O=>{"use strict";O.exports=require("fs")},17:O=>{"use strict";O.exports=require("path")}},W={};function B(O){var C=W[O];if(C!==void 0)return C.exports;var E=W[O]={id:O,loaded:!1,exports:{}};return K[O](E,E.exports,B),E.loaded=!0,E.exports}B.n=O=>{var C=O&&O.__esModule?()=>O.default:()=>O;return B.d(C,{a:C}),C},B.d=(O,C)=>{for(var E in C)B.o(C,E)&&!B.o(O,E)&&Object.defineProperty(O,E,{enumerable:!0,get:C[E]})},B.o=(O,C)=>Object.prototype.hasOwnProperty.call(O,C),B.r=O=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(O,"__esModule",{value:!0})},B.nmd=O=>(O.paths=[],O.children||(O.children=[]),O);var $={};(()=>{"use strict";B.r($),B.d($,{handler:()=>w});var O=B(49);const C=require("aws-sdk");var E=B.n(C);const b=new(E()).DynamoDB.DocumentClient,u=new(E()).CognitoIdentityServiceProvider;async function p(_,f){let o;const{token:a,email:l,password:n}=JSON.parse(_.body);try{o=(await b.get({TableName:process.env.CLIENT_TABLE,Key:{email:l}}).promise()).Item}catch(i){return console.error(i),{statusCode:501,body:JSON.stringify({message:i.message})}}if(o.authToken==a){const i={UserPoolId:process.env.USER_POOL_ID,Username:l,UserAttributes:[{Name:"email_verified",Value:"true"}]},t={Password:n,UserPoolId:process.env.USER_POOL_ID,Username:l,Permanent:!0};try{return await u.adminUpdateUserAttributes(i).promise(),await u.adminSetUserPassword(t).promise(),{statusCode:200,body:JSON.stringify({message:"Email verified successfully"})}}catch(c){return console.error(c.stack),{statusCode:501,body:JSON.stringify({message:c.stack})}}}else return{statusCode:404,body:JSON.stringify({message:"Incorrect authentication code"})}}const w=p})();var J=exports;for(var X in $)J[X]=$[X];$.__esModule&&Object.defineProperty(J,"__esModule",{value:!0})})();

//# sourceMappingURL=confirmEmail.js.map