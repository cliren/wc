!function e(t,n,i){function a(r,s){if(!n[r]){if(!t[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(o)return o(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=n[r]={exports:{}};t[r][0].call(c.exports,function(e){var n=t[r][1][e];return a(n?n:e)},c,c.exports,e,t,n,i)}return n[r].exports}for(var o="function"==typeof require&&require,r=0;r<i.length;r++)a(i[r]);return a}({1:[function(e,t){self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var n=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var i={};for(var a in e)e.hasOwnProperty(a)&&(i[a]=t.util.clone(e[a]));return i;case"Array":return e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var i=t.util.clone(t.languages[e]);for(var a in n)i[a]=n[a];return i},insertBefore:function(e,n,i,a){a=a||t.languages;var o=a[e];if(2==arguments.length){i=arguments[1];for(var r in i)i.hasOwnProperty(r)&&(o[r]=i[r]);return o}var s={};for(var l in o)if(o.hasOwnProperty(l)){if(l==n)for(var r in i)i.hasOwnProperty(r)&&(s[r]=i[r]);s[l]=o[l]}return t.languages.DFS(t.languages,function(t,n){n===a[e]&&t!=e&&(this[t]=s)}),a[e]=s},DFS:function(e,n,i){for(var a in e)e.hasOwnProperty(a)&&(n.call(e,a,e[a],i||a),"Object"===t.util.type(e[a])?t.languages.DFS(e[a],n):"Array"===t.util.type(e[a])&&t.languages.DFS(e[a],n,a))}},highlightAll:function(e,n){for(var i,a=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),o=0;i=a[o++];)t.highlightElement(i,e===!0,n)},highlightElement:function(i,a,o){for(var r,s,l=i;l&&!e.test(l.className);)l=l.parentNode;if(l&&(r=(l.className.match(e)||[,""])[1],s=t.languages[r]),s){i.className=i.className.replace(e,"").replace(/\s+/g," ")+" language-"+r,l=i.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+r);var c=i.textContent;if(c){c=c.replace(/^(?:\r?\n|\r)/,"");var u={element:i,language:r,grammar:s,code:c};if(t.hooks.run("before-highlight",u),a&&self.Worker){var p=new Worker(t.filename);p.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),r),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,o&&o.call(u.element),t.hooks.run("after-highlight",u)},p.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,o&&o.call(i),t.hooks.run("after-highlight",u)}}},highlight:function(e,i,a){var o=t.tokenize(e,i);return n.stringify(t.util.encode(o),a)},tokenize:function(e,n){var i=t.Token,a=[e],o=n.rest;if(o){for(var r in o)n[r]=o[r];delete n.rest}e:for(var r in n)if(n.hasOwnProperty(r)&&n[r]){var s=n[r];s="Array"===t.util.type(s)?s:[s];for(var l=0;l<s.length;++l){var c=s[l],u=c.inside,p=!!c.lookbehind,d=0,f=c.alias;c=c.pattern||c;for(var g=0;g<a.length;g++){var m=a[g];if(a.length>e.length)break e;if(!(m instanceof i)){c.lastIndex=0;var b=c.exec(m);if(b){p&&(d=b[1].length);var h=b.index-1+d,b=b[0].slice(d),v=b.length,k=h+v,y=m.slice(0,h+1),w=m.slice(k+1),x=[g,1];y&&x.push(y);var E=new i(r,u?t.tokenize(b,u):b,f);x.push(E),w&&x.push(w),Array.prototype.splice.apply(a,x)}}}}}return a},hooks:{all:{},add:function(e,n){var i=t.hooks.all;i[e]=i[e]||[],i[e].push(n)},run:function(e,n){var i=t.hooks.all[e];if(i&&i.length)for(var a,o=0;a=i[o++];)a(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,i,a){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,i,e)}).join("");var o={type:e.type,content:n.stringify(e.content,i,a),tag:"span",classes:["token",e.type],attributes:{},language:i,parent:a};if("comment"==o.type&&(o.attributes.spellcheck="true"),e.alias){var r="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(o.classes,r)}t.hooks.run("wrap",o);var s="";for(var l in o.attributes)s+=l+'="'+(o.attributes[l]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+s+">"+o.content+"</"+o.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),i=n.language,a=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(a,t.languages[i])))),self.close()},!1),self.Prism):self.Prism;var i=document.getElementsByTagName("script");return i=i[i.length-1],i&&(t.filename=i.src,document.addEventListener&&!i.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof t&&t.exports&&(t.exports=n),n.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/i,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/=|>|"/}},punctuation:/\/?>/,"attr-name":{pattern:/[\w:-]+/,inside:{namespace:/^[\w-]+?:/}}}},entity:/&#?[\da-z]{1,8};/i},n.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),n.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{punctuation:/[;:]/}},url:/url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/,string:/("|')(\\\n|\\?.)*?\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,punctuation:/[\{\};:]/,"function":/[-a-z0-9]+(?=\()/i},n.languages.markup&&(n.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:n.languages.markup.tag.inside},rest:n.languages.css},alias:"language-css"}}),n.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:n.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:n.languages.css}},alias:"language-css"}},n.languages.markup.tag)),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.+/,lookbehind:!0}],string:/("|')(\\\n|\\?.)*?\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":{pattern:/[a-z0-9_]+\(/i,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,ignore:/&(lt|gt|amp);/i,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),n.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),n.languages.markup&&n.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:n.languages.markup.tag.inside},rest:n.languages.javascript},alias:"language-javascript"}}),function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){var i=t.getAttribute("data-src"),a=(i.match(/\.(\w+)$/)||[,""])[1],o=e[a]||a,r=document.createElement("code");r.className="language-"+o,t.textContent="",r.textContent="Loading…",t.appendChild(r);var s=new XMLHttpRequest;s.open("GET",i,!0),s.onreadystatechange=function(){4==s.readyState&&(s.status<400&&s.responseText?(r.textContent=s.responseText,n.highlightElement(r)):r.textContent=s.status>=400?"✖ Error "+s.status+" while fetching file: "+s.statusText:"✖ Error: File does not exist or is empty")},s.send(null)})},self.Prism.fileHighlight())}()},{}],2:[function(e,t){t.exports=function(){return function(e){function t(t){var n=t.getAttribute("data-bespoke-backdrop");if(n){var i=document.createElement("div");return i.className=n,i.classList.add("bespoke-backdrop"),e.parent.appendChild(i),i}}function n(t){if(t){var n=o.indexOf(t),r=e.slide();i(t,"active"),i(t,"inactive"),i(t,"before"),i(t,"after"),n!==r?(a(t,"inactive"),a(t,r>n?"before":"after")):a(t,"active")}}function i(e,t){e.classList.remove("bespoke-backdrop-"+t)}function a(e,t){e.classList.add("bespoke-backdrop-"+t)}var o;o=e.slides.map(t),e.on("activate",function(){o.forEach(n)})}}},{}],3:[function(e,t){t.exports=function(e){return function(t){var n,i,a=t.slides.map(function(t){return[].slice.call(t.querySelectorAll("string"==typeof e?e:"[data-bespoke-bullet]"),0)}),o=function(){var e=n+1;return l(1)?(s(n,i+1),!1):(a[e]&&s(e,0),void 0)},r=function(){var e=n-1;return l(-1)?(s(n,i-1),!1):(a[e]&&s(e,a[e].length-1),void 0)},s=function(e,t){n=e,i=t,a.forEach(function(n,i){n.forEach(function(n,a){n.classList.add("bespoke-bullet"),e>i||i===e&&t>=a?(n.classList.add("bespoke-bullet-active"),n.classList.remove("bespoke-bullet-inactive")):(n.classList.add("bespoke-bullet-inactive"),n.classList.remove("bespoke-bullet-active")),i===e&&a===t?n.classList.add("bespoke-bullet-current"):n.classList.remove("bespoke-bullet-current")})})},l=function(e){return void 0!==a[n][i+e]};t.on("next",o),t.on("prev",r),t.on("slide",function(e){s(e.index,0)}),s(0,0)}}},{}],4:[function(e,t){t.exports=function(){return function(e){e.slides.forEach(function(e){e.addEventListener("keydown",function(e){(/INPUT|TEXTAREA|SELECT/.test(e.target.nodeName)||"true"===e.target.contentEditable)&&e.stopPropagation()})})}}},{}],5:[function(e,t){t.exports=function(){return function(e){var t=function(){var t=window.location.hash.slice(1),i=parseInt(t,10);t&&(i?n(i-1):e.slides.forEach(function(e,i){e.getAttribute("data-bespoke-hash")===t&&n(i)}))},n=function(t){var n=t>-1&&t<e.slides.length?t:0;n!==e.slide()&&e.slide(n)};setTimeout(function(){t(),e.on("activate",function(e){var t=e.slide.getAttribute("data-bespoke-hash");window.location.hash=t||e.index+1}),window.addEventListener("hashchange",t)},0)}}},{}],6:[function(e,t){t.exports=function(e){return function(t){var n="vertical"!==e;document.addEventListener("keydown",function(e){(34==e.which||32==e.which||n&&39==e.which||!n&&40==e.which)&&t.next(),(33==e.which||n&&37==e.which||!n&&38==e.which)&&t.prev()})}}},{}],7:[function(e,t){t.exports=function(e){return function(t){var n=document.createElement("div"),i=document.createElement("div"),a="vertical"===e?"height":"width";n.className="bespoke-progress-parent",i.className="bespoke-progress-bar",n.appendChild(i),t.parent.appendChild(n),t.on("activate",function(e){i.style[a]=100*e.index/(t.slides.length-1)+"%"})}}},{}],8:[function(e,t){t.exports=function(e){return function(t){var n=t.parent,i=t.slides[0],a=i.offsetHeight,o=i.offsetWidth,r="zoom"===e||"zoom"in n.style&&"transform"!==e,s=function(e){var t=document.createElement("div");return t.className="bespoke-scale-parent",e.parentNode.insertBefore(t,e),t.appendChild(e),t},l=r?t.slides:t.slides.map(s),c=function(e){var t="Moz Webkit O ms".split(" ");return t.reduce(function(t,i){return i+e in n.style?i+e:t},e.toLowerCase())}("Transform"),u=r?function(e,t){t.style.zoom=e}:function(e,t){t.style[c]="scale("+e+")"},p=function(){var e=n.offsetWidth/o,t=n.offsetHeight/a;l.forEach(u.bind(null,Math.min(e,t)))};window.addEventListener("resize",p),p()}}},{}],9:[function(e,t){t.exports=function(){return function(e){var t=function(t,n){var i=n.slide.getAttribute("data-bespoke-state");i&&i.split(" ").forEach(function(n){e.parent.classList[t](n)})};e.on("activate",t.bind(null,"add")),e.on("deactivate",t.bind(null,"remove"))}}},{}],10:[function(e,t,n){(function(i){!function(e){if("object"==typeof n)t.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var a;"undefined"!=typeof window?a=window:"undefined"!=typeof i?a=i:"undefined"!=typeof self&&(a=self);var o=a;o=o.bespoke||(o.bespoke={}),o=o.themes||(o.themes={}),o.voltaire=e()}}(function(){return function t(n,i,a){function o(s,l){if(!i[s]){if(!n[s]){var c="function"==typeof e&&e;if(!l&&c)return c(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=i[s]={exports:{}};n[s][0].call(u.exports,function(e){var t=n[s][1][e];return o(t?t:e)},u,u.exports,t,n,i,a)}return i[s].exports}for(var r="function"==typeof e&&e,s=0;s<a.length;s++)o(a[s]);return o}({1:[function(e,t){var n=e("bespoke-classes"),i=e("insert-css");t.exports=function(){var e='/*! normalize.css v3.0.0 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background:0 0}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b{font-weight:700}dfn{font-style:italic}h1{font-size:2em}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-size:1em}kbd,pre,samp{font-family:monospace,monospace}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{height:auto}input[type="search"]{-webkit-appearance:textfield;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th,*{padding:0}*{margin:0}html{-webkit-text-size-adjust:auto;-ms-text-size-adjust:auto;text-size-adjust:auto}.bespoke-parent{font-size:1.5em;background:#111;color:#fff;font-family:gill sans,helvetica,arial,arial,sans-serif;overflow:hidden;text-align:center;-webkit-transition:background 1s ease;transition:background 1s ease;background-position:50% 50%}.bespoke-parent,.bespoke-scale-parent{position:absolute;top:0;left:0;right:0;bottom:0}.bespoke-scale-parent{pointer-events:none;z-index:1}.bespoke-scale-parent .bespoke-active{pointer-events:auto}.bespoke-slide{text-shadow:0 1px 0 rgba(0,0,0,.75);-webkit-transition:opacity .3s ease;transition:opacity .3s ease;width:720px;height:480px;position:absolute;top:50%;left:50%;margin-left:-360px;margin-top:-240px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;z-index:1}.bespoke-active{-webkit-transition-delay:.3s;transition-delay:.3s}.bespoke-inactive{opacity:0;pointer-events:none}.bespoke-backdrop{-webkit-transition:opacity 1s ease;transition:opacity 1s ease;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0}.bespoke-backdrop-active{opacity:1}.bespoke-progress-parent{position:absolute;top:0;left:0;right:0;height:.3vw;z-index:1}.bespoke-progress-bar{background:#fff;position:absolute;top:0;left:0;height:100%;-webkit-transition:width 1s ease;transition:width 1s ease}.bespoke-bullet{-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.bespoke-bullet-inactive{opacity:0}strong{font-weight:400}h1 strong{font-weight:600}h1,h2,h3,p,li{padding-left:20px;padding-right:20px}h1,h3,p,li,pre{font-weight:200}h1{font-family:didot,times new roman,serif;font-style:italic;margin:.17em 0}h2{font-family:gill sans,helvetica,arial,arial,sans-serif;font-weight:400;font-size:1.1em;margin:.1em 0}h2,h3{font-style:normal}h3{font-size:.6em;margin:1.1em 0}ul,ol{padding:0;margin:0;text-align:left}li{list-style:none;margin:.2em;font-style:normal;-webkit-transform:translateX(-6px);-ms-transform:translateX(-6px);transform:translateX(-6px)}li:before{content:\'\\2014\';margin-right:4px}pre{background:none!important}code{font-family:prestige elite std,consolas,courier new,monospace!important;font-style:normal;font-weight:200!important;text-align:left}a{color:currentColor;text-decoration:none;border-bottom:1px solid currentColor}.emphatic{background:#f30}';return i(e,{prepend:!0}),function(e){n()(e)}}},{"bespoke-classes":2,"insert-css":3}],2:[function(e,t){t.exports=function(){return function(e){var t=function(e,t){e.classList.add("bespoke-"+t)},n=function(e,t){e.className=e.className.replace(new RegExp("bespoke-"+t+"(\\s|$)","g")," ").trim()},i=function(i,a){var o=e.slides[e.slide()],r=a-e.slide(),s=r>0?"after":"before";["before(-\\d+)?","after(-\\d+)?","active","inactive"].map(n.bind(null,i)),i!==o&&["inactive",s,s+"-"+Math.abs(r)].map(t.bind(null,i))};t(e.parent,"parent"),e.slides.map(function(e){t(e,"slide")}),e.on("activate",function(a){e.slides.map(i),t(a.slide,"active"),n(a.slide,"inactive")})}}},{}],3:[function(e,t){var n={};t.exports=function(e,t){if(!n[e]){n[e]=!0;var i=document.createElement("style");i.setAttribute("type","text/css"),"textContent"in i?i.textContent=e:i.styleSheet.cssText=e;var a=document.getElementsByTagName("head")[0];t&&t.prepend?a.insertBefore(i,a.childNodes[0]):a.appendChild(i)}}},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],11:[function(e,t){t.exports=function(e){return function(t){var n,i,a="vertical"==e?"Y":"X";t.parent.addEventListener("touchstart",function(e){1==e.touches.length&&(n=e.touches[0]["page"+a],i=0)}),t.parent.addEventListener("touchmove",function(e){1==e.touches.length&&(e.preventDefault(),i=e.touches[0]["page"+a]-n)}),t.parent.addEventListener("touchend",function(){Math.abs(i)>50&&t[i>0?"prev":"next"]()})}}},{}],12:[function(e,t){var n=function(e,t){var n=1===e.nodeType?e:document.querySelector(e),i=[].filter.call(n.children,function(e){return"SCRIPT"!==e.nodeName}),a=i[0],o={},r=function(e,t){i[e]&&(u("deactivate",p(a,t)),a=i[e],u("activate",p(a,t)))},s=function(e,t){return arguments.length?(u("slide",p(i[e],t))&&r(e,t),void 0):i.indexOf(a)},l=function(e,t){var n=i.indexOf(a)+e;u(e>0?"next":"prev",p(a,t))&&r(n,t)},c=function(e,t){return(o[e]||(o[e]=[])).push(t),function(){o[e]=o[e].filter(function(e){return e!==t})}},u=function(e,t){return(o[e]||[]).reduce(function(e,n){return e&&n(t)!==!1},!0)},p=function(e,t){return t=t||{},t.index=i.indexOf(e),t.slide=e,t},d={on:c,fire:u,slide:s,next:l.bind(null,1),prev:l.bind(null,-1),parent:n,slides:i};return(t||[]).forEach(function(e){e(d)}),r(0),d};t.exports={from:n}},{}],13:[function(e,t){function n(){var e=document.body.requestFullScreen||document.body.mozRequestFullScreen||document.body.webkitRequestFullScreen,t=document.body.cancelFullScreen||document.mozCancelFullScreen||document.webkitCancelFullScreen,n=window.fullScreen||document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;n?t.call(document):e.call(document.body,Element.ALLOW_KEYBOARD_INPUT)}t.exports=n;var i=document.createElement("menu"),a=document.createElement("menuitem");i.setAttribute("id","fsmenu"),i.setAttribute("type","context"),a.setAttribute("label","Fullscreen"),a.addEventListener("click",n),i.appendChild(a),document.body.appendChild(i),document.body.setAttribute("contextmenu","fsmenu")},{}],14:[function(e){e("bespoke").from("article",[e("bespoke-theme-voltaire")(),e("bespoke-keys")(),e("bespoke-touch")(),e("bespoke-bullets")("li, .bullet"),e("bespoke-backdrop")(),e("bespoke-state")(),e("bespoke-scale")(),e("bespoke-hash")(),e("bespoke-progress")(),e("bespoke-forms")(),e("./fullscreenbg")()]),e("presentation-fullscreen"),e("./ga.js"),e("./../../bower_components/prism/prism.js")},{"./../../bower_components/prism/prism.js":1,"./fullscreenbg":15,"./ga.js":16,bespoke:12,"bespoke-backdrop":2,"bespoke-bullets":3,"bespoke-forms":4,"bespoke-hash":5,"bespoke-keys":6,"bespoke-progress":7,"bespoke-scale":8,"bespoke-state":9,"bespoke-theme-voltaire":10,"bespoke-touch":11,"presentation-fullscreen":13}],15:[function(e,t){t.exports=function(){return function(e){var t="data-bespoke-fullscreenbackground",n=document.createElement("div");e.slides.forEach(function(e){var i=e.getAttribute(t);if(i){var a=document.createElement("img");n.appendChild(a),a.src=i}}),e.on("activate",function(n){var i=(n.index,n.slide),a=e.parent,o=i.getAttribute(t);o?(a.classList.add("cover"),a.style.backgroundImage="url("+o+")"):(a.classList.remove("cover"),a.style.backgroundImage=null)})}}},{}],16:[function(){var e=e||[];e.push(["_setAccount","UA-384699-1"]),e.push(["_setDomainName","soledadpenades.com"]),e.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()},{}]},{},[14]);