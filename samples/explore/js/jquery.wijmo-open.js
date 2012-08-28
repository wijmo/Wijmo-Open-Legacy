/*!
 * Globalize
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(z,y){var a,x,t,s,w,c,j,r,k,v,p,e,b,q,f,h,m,n,u,l,g,i,o,d;a=function(b){return new a.prototype.init(b)};if(typeof require!=="undefined"&&typeof exports!=="undefined"&&typeof module!=="undefined")module.exports=a;else z.Globalize=a;a.cultures={};a.prototype={constructor:a,init:function(b){this.cultures=a.cultures;this.cultureSelector=b;return this}};a.prototype.init.prototype=a.prototype;a.cultures["default"]={name:"en",englishName:"English",nativeName:"English",isRTL:false,language:"en",numberFormat:{pattern:["-n"],decimals:2,",":",",".":".",groupSizes:[3],"+":"+","-":"-",NaN:"NaN",negativeInfinity:"-Infinity",positiveInfinity:"Infinity",percent:{pattern:["-n %","n %"],decimals:2,groupSizes:[3],",":",",".":".",symbol:"%"},currency:{pattern:["($n)","$n"],decimals:2,groupSizes:[3],",":",",".":".",symbol:"$"}},calendars:{standard:{name:"Gregorian_USEnglish","/":"/",":":":",firstDay:0,days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December",""],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]},AM:["AM","am","AM"],PM:["PM","pm","PM"],eras:[{name:"A.D.",start:null,offset:0}],twoDigitYearMax:2029,patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",t:"h:mm tt",T:"h:mm:ss tt",f:"dddd, MMMM dd, yyyy h:mm tt",F:"dddd, MMMM dd, yyyy h:mm:ss tt",M:"MMMM dd",Y:"yyyy MMMM",S:"yyyy'-'MM'-'dd'T'HH':'mm':'ss"}}},messages:{}};a.cultures["default"].calendar=a.cultures["default"].calendars.standard;a.cultures.en=a.cultures["default"];a.cultureSelector="en";x=/^0x[a-f0-9]+$/i;t=/^[+-]?infinity$/i;s=/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/;w=/^\s+|\s+$/g;c=function(a,c){if(a.indexOf)return a.indexOf(c);for(var b=0,d=a.length;b<d;b++)if(a[b]===c)return b;return-1};j=function(b,a){return b.substr(b.length-a.length)===a};r=function(i){var g,d,c,b,f,h,a=arguments[0]||{},e=1,j=arguments.length,i=false;if(typeof a==="boolean"){i=a;a=arguments[1]||{};e=2}if(typeof a!=="object"&&!v(a))a={};for(;e<j;e++)if((g=arguments[e])!=null)for(d in g){c=a[d];b=g[d];if(a===b)continue;if(i&&b&&(p(b)||(f=k(b)))){if(f){f=false;h=c&&k(c)?c:[]}else h=c&&p(c)?c:{};a[d]=r(i,h,b)}else if(b!==y)a[d]=b}return a};k=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"};v=function(a){return Object.prototype.toString.call(a)==="[object Function]"};p=function(a){return Object.prototype.toString.call(a)==="[object Object]"};e=function(b,a){return b.indexOf(a)===0};b=function(a){return(a+"").replace(w,"")};q=function(a){return isNaN(a)?NaN:a|0};f=function(a,c,d){for(var b=a.length;b<c;b+=1)a=d?"0"+a:a+"0";return a};h=function(e,b){for(var d=0,a=false,c=0,g=e.length;c<g;c++){var f=e.charAt(c);switch(f){case"'":if(a)b.push("'");else d++;a=false;break;case"\\":a&&b.push("\\");a=!a;break;default:b.push(f);a=false}}return d};m=function(e,a){a=a||"F";var b,d=e.patterns,c=a.length;if(c===1){b=d[a];if(!b)throw"Invalid date format string '"+a+"'.";a=b}else if(c===2&&a.charAt(0)==="%")a=a.charAt(1);return a};n=function(b,f,r){var c=r.calendar,s=c.convert;if(!f||!f.length||f==="i"){var a;if(r&&r.name.length)if(s)a=n(b,c.patterns.F,r);else{var z=new Date(b.getTime()),H=g(b,c.eras);z.setFullYear(i(b,c,H));a=z.toLocaleString()}else a=b.toString();return a}var A=c.eras,y=f==="s";f=m(c,f);a=[];var j,G=["0","00","000"],p,w,B=/([^d]|^)(d|dd)([^d]|$)/g,x=0,v=l(),o;function e(d,a){var b,c=d+"";if(a>1&&c.length<a){b=G[a-2]+c;return b.substr(b.length-a,a)}else b=c;return b}function D(){if(p||w)return p;p=B.test(f);w=true;return p}function u(a,b){if(o)return o[b];switch(b){case 0:return a.getFullYear();case 1:return a.getMonth();case 2:return a.getDate()}}if(!y&&s)o=s.fromGregorian(b);for(;;){var E=v.lastIndex,q=v.exec(f),C=f.slice(E,q?q.index:f.length);x+=h(C,a);if(!q)break;if(x%2){a.push(q[0]);continue}var t=q[0],d=t.length;switch(t){case"ddd":case"dddd":var F=d===3?c.days.namesAbbr:c.days.names;a.push(F[b.getDay()]);break;case"d":case"dd":p=true;a.push(e(u(b,2),d));break;case"MMM":case"MMMM":var k=u(b,1);a.push(c.monthsGenitive&&D()?c.monthsGenitive[d===3?"namesAbbr":"names"][k]:c.months[d===3?"namesAbbr":"names"][k]);break;case"M":case"MM":a.push(e(u(b,1)+1,d));break;case"y":case"yy":case"yyyy":k=o?o[0]:i(b,c,g(b,A),y);if(d<4)k=k%100;a.push(e(k,d));break;case"h":case"hh":j=b.getHours()%12;if(j===0)j=12;a.push(e(j,d));break;case"H":case"HH":a.push(e(b.getHours(),d));break;case"m":case"mm":a.push(e(b.getMinutes(),d));break;case"s":case"ss":a.push(e(b.getSeconds(),d));break;case"t":case"tt":k=b.getHours()<12?c.AM?c.AM[0]:" ":c.PM?c.PM[0]:" ";a.push(d===1?k.charAt(0):k);break;case"f":case"ff":case"fff":a.push(e(b.getMilliseconds(),3).substr(0,d));break;case"z":case"zz":j=b.getTimezoneOffset()/60;a.push((j<=0?"+":"-")+e(Math.floor(Math.abs(j)),d));break;case"zzz":j=b.getTimezoneOffset()/60;a.push((j<=0?"+":"-")+e(Math.floor(Math.abs(j)),2)+":"+e(Math.abs(b.getTimezoneOffset()%60),2));break;case"g":case"gg":c.eras&&a.push(c.eras[g(b,A)].name);break;case"/":a.push(c["/"]);break;default:throw"Invalid date format pattern '"+t+"'.";}}return a.join("")};(function(){var a;a=function(j,h,l){var m=l.groupSizes,i=m[0],k=1,p=Math.pow(10,h),n=Math.round(j*p)/p;if(!isFinite(n))n=j;j=n;var b=j+"",a="",e=b.split(/e/i),c=e.length>1?parseInt(e[1],10):0;b=e[0];e=b.split(".");b=e[0];a=e.length>1?e[1]:"";var q;if(c>0){a=f(a,c,false);b+=a.slice(0,c);a=a.substr(c)}else if(c<0){c=-c;b=f(b,c+1);a=b.slice(-c,b.length)+a;b=b.slice(0,-c)}if(h>0)a=l["."]+(a.length>h?a.slice(0,h):f(a,h));else a="";var d=b.length-1,o=l[","],g="";while(d>=0){if(i===0||i>d)return b.slice(0,d+1)+(g.length?o+g+a:a);g=b.slice(d-i+1,d+1)+(g.length?o+g:"");d-=i;if(k<m.length){i=m[k];k++}}return b.slice(0,d+1)+o+g+a};u=function(d,e,j){if(!isFinite(d))return d===Infinity?j.numberFormat.positiveInfinity:d===-Infinity?j.numberFormat.negativeInfinity:j.numberFormat.NaN;if(!e||e==="i")return j.name.length?d.toLocaleString():d.toString();e=e||"D";var i=j.numberFormat,b=Math.abs(d),g=-1,k;if(e.length>1)g=parseInt(e.slice(1),10);var m=e.charAt(0).toUpperCase(),c;switch(m){case"D":k="n";b=q(b);if(g!==-1)b=f(""+b,g,true);if(d<0)b="-"+b;break;case"N":c=i;case"C":c=c||i.currency;case"P":c=c||i.percent;k=d<0?c.pattern[0]:c.pattern[1]||"n";if(g===-1)g=c.decimals;b=a(b*(m==="P"?100:1),g,c);break;default:throw"Bad number format specifier: "+m;}for(var n=/n|\$|-|%/g,h="";;){var o=n.lastIndex,l=n.exec(k);h+=k.slice(o,l?l.index:k.length);if(!l)break;switch(l[0]){case"n":h+=b;break;case"$":h+=i.currency.symbol;break;case"-":if(/[1-9]/.test(b))h+=i["-"];break;case"%":h+=i.percent.symbol}}return h}})();l=function(){return/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g};g=function(e,c){if(!c)return 0;for(var b,d=e.getTime(),a=0,f=c.length;a<f;a++){b=c[a].start;if(b===null||d>=b)return a}return 0};i=function(d,b,e,c){var a=d.getFullYear();if(!c&&b.eras)a-=b.eras[e].offset;return a};(function(){var p,n,k,j,a,f,d;p=function(d,b){if(b<100){var e=new Date,f=g(e),c=i(e,d,f),a=d.twoDigitYearMax;a=typeof a==="string"?(new Date).getFullYear()%100+parseInt(a,10):a;b+=c-c%100;if(b>a)b-=100}return b};n=function(h,b,i){var e,g=h.days,a=h._upperDays;if(!a)h._upperDays=a=[d(g.names),d(g.namesAbbr),d(g.namesShort)];b=f(b);if(i){e=c(a[1],b);if(e===-1)e=c(a[2],b)}else e=c(a[0],b);return e};k=function(a,e,k){var j=a.months,i=a.monthsGenitive||a.months,b=a._upperMonths,g=a._upperMonthsGen;if(!b){a._upperMonths=b=[d(j.names),d(j.namesAbbr)];a._upperMonthsGen=g=[d(i.names),d(i.namesAbbr)]}e=f(e);var h=c(k?b[1]:b[0],e);if(h<0)h=c(k?g[1]:g[0],e);return h};j=function(d,g){var e=d._parseRegExp;if(!e)d._parseRegExp=e={};else{var o=e[g];if(o)return o}var f=m(d,g).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"\\\\$1"),b=["^"],p=[],i=0,n=0,k=l(),c;while((c=k.exec(f))!==null){var s=f.slice(i,c.index);i=k.lastIndex;n+=h(s,b);if(n%2){b.push(c[0]);continue}var j=c[0],t=j.length,a;switch(j){case"dddd":case"ddd":case"MMMM":case"MMM":case"gg":case"g":a="(\\D+)";break;case"tt":case"t":a="(\\D*)";break;case"yyyy":case"fff":case"ff":case"f":a="(\\d{"+t+"})";break;case"dd":case"d":case"MM":case"M":case"yy":case"y":case"HH":case"H":case"hh":case"h":case"mm":case"m":case"ss":case"s":a="(\\d\\d?)";break;case"zzz":a="([+-]?\\d\\d?:\\d{2})";break;case"zz":case"z":a="([+-]?\\d\\d?)";break;case"/":a="(\\"+d["/"]+")";break;default:throw"Invalid date format pattern '"+j+"'.";}a&&b.push(a);p.push(c[0])}h(f.slice(i),b);b.push("$");var r=b.join("").replace(/\s+/g,"\\s+"),q={regExp:r,groups:p};return e[g]=q};a=function(a,c,b){return a<c||a>b};f=function(a){return a.split("\u00a0").join(" ").toUpperCase()};d=function(c){for(var b=[],a=0,d=c.length;a<d;a++)b[a]=f(c[a]);return b};o=function(A,M,L){A=b(A);var c=L.calendar,H=j(c,M),K=new RegExp(H.regExp).exec(A);if(K===null)return null;for(var J=H.groups,C=null,m=null,i=null,l=null,u=null,h=0,o,D=0,E=0,B=0,q=null,z=false,w=0,N=J.length;w<N;w++){var d=K[w+1];if(d){var I=J[w],r=I.length,g=parseInt(d,10);switch(I){case"dd":case"d":l=g;if(a(l,1,31))return null;break;case"MMM":case"MMMM":i=k(c,d,r===3);if(a(i,0,11))return null;break;case"M":case"MM":i=g-1;if(a(i,0,11))return null;break;case"y":case"yy":case"yyyy":m=r<4?p(c,g):g;if(a(m,0,9999))return null;break;case"h":case"hh":h=g;if(h===12)h=0;if(a(h,0,11))return null;break;case"H":case"HH":h=g;if(a(h,0,23))return null;break;case"m":case"mm":D=g;if(a(D,0,59))return null;break;case"s":case"ss":E=g;if(a(E,0,59))return null;break;case"tt":case"t":z=c.PM&&(d===c.PM[0]||d===c.PM[1]||d===c.PM[2]);if(!z&&(!c.AM||d!==c.AM[0]&&d!==c.AM[1]&&d!==c.AM[2]))return null;break;case"f":case"ff":case"fff":B=g*Math.pow(10,3-r);if(a(B,0,999))return null;break;case"ddd":case"dddd":u=n(c,d,r===3);if(a(u,0,6))return null;break;case"zzz":var y=d.split(/:/);if(y.length!==2)return null;o=parseInt(y[0],10);if(a(o,-12,13))return null;var x=parseInt(y[1],10);if(a(x,0,59))return null;q=o*60+(e(d,"-")?-x:x);break;case"z":case"zz":o=g;if(a(o,-12,13))return null;q=o*60;break;case"g":case"gg":var t=d;if(!t||!c.eras)return null;t=b(t.toLowerCase());for(var v=0,O=c.eras.length;v<O;v++)if(t===c.eras[v].name.toLowerCase()){C=v;break}if(C===null)return null}}}var f=new Date,G,s=c.convert;G=s?s.fromGregorian(f)[0]:f.getFullYear();if(m===null)m=G;else if(c.eras)m+=c.eras[C||0].offset;if(i===null)i=0;if(l===null)l=1;if(s){f=s.toGregorian(m,i,l);if(f===null)return null}else{f.setFullYear(m,i,l);if(f.getDate()!==l)return null;if(u!==null&&f.getDay()!==u)return null}if(z&&h<12)h+=12;f.setHours(h,D,E,B);if(q!==null){var F=f.getMinutes()-(q+f.getTimezoneOffset());f.setHours(f.getHours()+parseInt(F/60,10),F%60)}return f}})();d=function(a,f,g){var b=f["-"],c=f["+"],d;switch(g){case"n -":b=" "+b;c=" "+c;case"n-":if(j(a,b))d=["-",a.substr(0,a.length-b.length)];else if(j(a,c))d=["+",a.substr(0,a.length-c.length)];break;case"- n":b+=" ";c+=" ";case"-n":if(e(a,b))d=["-",a.substr(b.length)];else if(e(a,c))d=["+",a.substr(c.length)];break;case"(n)":if(e(a,"(")&&j(a,")"))d=["-",a.substr(1,a.length-2)]}return d||["",a]};a.prototype.findClosestCulture=function(b){return a.findClosestCulture.call(this,b)};a.prototype.format=function(d,c,b){return a.format.call(this,d,c,b)};a.prototype.localize=function(c,b){return a.localize.call(this,c,b)};a.prototype.parseInt=function(d,c,b){return a.parseInt.call(this,d,c,b)};a.prototype.parseFloat=function(d,c,b){return a.parseFloat.call(this,d,c,b)};a.prototype.culture=function(b){return a.culture.call(this,b)};a.addCultureInfo=function(a,c,e){var b={},d=false;if(typeof a!=="string"){e=a;a=this.culture().name;b=this.cultures[a]}else if(typeof c!=="string"){e=c;d=this.cultures[a]==null;b=this.cultures[a]||this.cultures["default"]}else{d=true;b=this.cultures[c]}this.cultures[a]=r(true,{},b,e);if(d)this.cultures[a].calendar=this.cultures[a].calendars.standard};a.findClosestCulture=function(a){var e;if(!a)return this.cultures[this.cultureSelector]||this.cultures["default"];if(typeof a==="string")a=a.split(",");if(k(a)){for(var d,h=this.cultures,n=a,i=n.length,g=[],c=0;c<i;c++){a=b(n[c]);var f,j=a.split(";");d=b(j[0]);if(j.length===1)f=1;else{a=b(j[1]);if(a.indexOf("q=")===0){a=a.substr(2);f=parseFloat(a);f=isNaN(f)?0:f}else f=1}g.push({lang:d,pri:f})}g.sort(function(a,b){return a.pri<b.pri?1:-1});for(c=0;c<i;c++){d=g[c].lang;e=h[d];if(e)return e}for(c=0;c<i;c++){d=g[c].lang;do{var m=d.lastIndexOf("-");if(m===-1)break;d=d.substr(0,m);e=h[d];if(e)return e}while(1)}for(c=0;c<i;c++){d=g[c].lang;for(var o in h){var l=h[o];if(l.language==d)return l}}}else if(typeof a==="object")return a;return e||null};a.format=function(a,b,c){culture=this.findClosestCulture(c);if(a instanceof Date)a=n(a,b,culture);else if(typeof a==="number")a=u(a,b,culture);return a};a.localize=function(a,b){return this.findClosestCulture(b).messages[a]||this.cultures["default"].messages[a]};a.parseDate=function(g,a,b){b=this.findClosestCulture(b);var c,h,d;if(a){if(typeof a==="string")a=[a];if(a.length)for(var e=0,i=a.length;e<i;e++){var f=a[e];if(f){c=o(g,f,b);if(c)break}}}else{d=b.calendar.patterns;for(h in d){c=o(g,d[h],b);if(c)break}}return c||null};a.parseInt=function(d,c,b){return q(a.parseFloat(d,c,b))};a.parseFloat=function(a,n,u){if(typeof n!=="number"){u=n;n=10}var k=this.findClosestCulture(u),o=NaN,c=k.numberFormat;if(a.indexOf(k.numberFormat.currency.symbol)>-1){a=a.replace(k.numberFormat.currency.symbol,"");a=a.replace(k.numberFormat.currency["."],k.numberFormat["."])}a=b(a);if(t.test(a))o=parseFloat(a);else if(!n&&x.test(a))o=parseInt(a,16);else{var e=d(a,c,c.pattern[0]),g=e[0],h=e[1];if(g===""&&c.pattern[0]!=="(n)"){e=d(a,c,"(n)");g=e[0];h=e[1]}if(g===""&&c.pattern[0]!=="-n"){e=d(a,c,"-n");g=e[0];h=e[1]}g=g||"+";var l,i,j=h.indexOf("e");if(j<0)j=h.indexOf("E");if(j<0){i=h;l=null}else{i=h.substr(0,j);l=h.substr(j+1)}var f,m,y=c["."],q=i.indexOf(y);if(q<0){f=i;m=null}else{f=i.substr(0,q);m=i.substr(q+y.length)}var r=c[","];f=f.split(r).join("");var v=r.replace(/\u00A0/g," ");if(r!==v)f=f.split(v).join("");var p=g+f;if(m!==null)p+="."+m;if(l!==null){var w=d(l,c,"-n");p+="e"+(w[0]||"+")+w[1]}if(s.test(p))o=parseFloat(p)}return o};a.culture=function(a){if(typeof a!=="undefined")this.cultureSelector=a;return this.findClosestCulture(a)||this.culture["default"]}})(this);
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.3-pre
 */

(function($){

$.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
    s = $.extend({
        top     : 'auto', // auto == .currentStyle.borderTopWidth
        left    : 'auto', // auto == .currentStyle.borderLeftWidth
        width   : 'auto', // auto == offsetWidth
        height  : 'auto', // auto == offsetHeight
        opacity : true,
        src     : 'javascript:false;'
    }, s);
    var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                   'style="display:block;position:absolute;z-index:-1;'+
                       (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
                       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
                       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
                       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
                       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
                '"/>';
    return this.each(function() {
        if ( $(this).children('iframe.bgiframe').length === 0 )
            this.insertBefore( document.createElement(html), this.firstChild );
    });
} : function() { return this; });

// old alias
$.fn.bgIframe = $.fn.bgiframe;

function prop(n) {
    return n && n.constructor === Number ? n + 'px' : n;
}

})(jQuery);
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery)
;
/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Common utility.
 *
 * Depends:
 *  jquery.ui.core.js
 *
 */
/*Replace inner content by iframe and load content using given url*/
(function ($) {
	$.fn.extend({
		wijContent: function (url) {
			return this.each(function () {
				this.innerHTML = '<iframe frameborder="0" style="width: 100%; height: 100%;" src="' + url + '">"';
			});
		}

		/*,
		wijAddVisibilityObserver: function (h, namespace) {
		return this.each(function () {
		$(this).addClass("wijmo-wijobserver-visibility");
		$(this).bind("wijmovisibilitychanged"
		+ (namespace ? ("." + namespace) : ""), h);
		});
		},
		wijRemoveVisibilityObserver: function (h) {
		return this.each(function () {
		$(this).removeClass("wijmo-wijobserver-visibility");
		if (!h) {
		$(this).unbind("wijmovisibilitychanged");
		}
		else if (jQuery.isFunction(h)) {
		$(this).unbind("wijmovisibilitychanged", h);
		} else {
		$(this).unbind("wijmovisibilitychanged." + h);
		}
		});
		},
		wijTriggerVisibility: function () {
		return this.each(function () {
		var $el = $(this);
		if ($el.hasClass("wijmo-wijobserver-visibility")) {
		$el.trigger("wijmovisibilitychanged");
		}
		$el.find(".wijmo-wijobserver-visibility").trigger("wijmovisibilitychanged");
		});
		}
		*/
	});

	var naNTest = function (num) {
		return isNaN(num) ? 0 : num;
	};

	$.fn.leftBorderWidth = function () {
		var blw = parseFloat($(this).css("borderLeftWidth"));
		var pl = parseFloat($(this).css("padding-left"));
		var ml = 0;
		if ($(this).css("margin-left") != "auto") {
			ml = parseFloat($(this).css("margin-left"));
		}

		return naNTest(blw) + naNTest(pl) + naNTest(ml);
	};

	$.fn.rightBorderWidth = function () {
		var brw = parseFloat($(this).css("borderRightWidth"));
		var pr = parseFloat($(this).css("padding-right"));
		var mr = 0;
		if ($(this).css("margin-right") != "auto") {
			mr = parseFloat($(this).css("margin-right"));
		}
		return naNTest(brw) + naNTest(pr) + naNTest(mr);
	};

	$.fn.topBorderWidth = function () {
		var blw = parseFloat($(this).css("borderTopWidth"));
		var pl = parseFloat($(this).css("padding-top"));
		var ml = 0;
		if ($(this).css("margin-top") != "auto") {
			ml = parseFloat($(this).css("margin-top"));
		}
		return naNTest(blw) + naNTest(pl) + naNTest(ml);
	};

	$.fn.bottomBorderWidth = function () {
		var brw = parseFloat($(this).css("borderBottomWidth"));
		var pr = parseFloat($(this).css("padding-bottom"));
		var mr = 0;
		if ($(this).css("margin-bottom") != "auto") {
			mr = parseFloat($(this).css("margin-bottom"));
		}
		return naNTest(brw) + naNTest(pr) + naNTest(mr);
	};

	$.fn.borderSize = function () {
		var bw = $(this).leftBorderWidth() + $(this).rightBorderWidth();
		var bh = $(this).topBorderWidth() + $(this).bottomBorderWidth();
		var b = { width: bw, height: bh };
		return b;
	};

	$.fn.setOutWidth = function (width) {
		var bw = $(this).leftBorderWidth() + $(this).rightBorderWidth();
		$(this).width(width - bw);
		return this;
	};

	$.fn.setOutHeight = function (height) {
		var bh = $(this).topBorderWidth() + $(this).bottomBorderWidth();
		$(this).height(height - bh);
		return this;
	};

	$.fn.getWidget = function () {
		var widgetName = this.data("widgetName");

		if (widgetName && widgetName != "") {
			return this.data(widgetName);
		}

		return null;
	};

	$.fn.wijshow = function (animation, customAnimations, customAnimationOptions, showing, shown) {
		var animated = animation.animated || false,
			duration = animation.duration || 400,
			easing = animation.easing,
			option = animation.option || {};

		if (showing && $.isFunction(showing)) {
			showing.call(this);
		}

		if (animated) {
			if ($.effects && $.effects[animated]) {
				this.show(animated, $.extend(option, { easing: easing }), duration, shown);
				return;
			}

			if (customAnimations && customAnimations[animated]) {
				customAnimations[animated](animation, $.extend(customAnimationOptions, { complete: shown }));
				return;
			}
		}

		this.show();
		if (shown && $.isFunction(shown)) {
			shown.call(this);
		}
	};

	$.fn.wijhide = function (animation, customAnimations, customAnimationOptions, hiding, hidden) {
		var animated = animation.animated || false,
			duration = animation.duration || 400,
			easing = animation.easing,
			option = animation.option || {};

		if (hiding && $.isFunction(hiding)) {
			hiding.call(this);
		}

		if (animated) {
			if ($.effects && $.effects[animated]) {
				this.hide(animated, $.extend(option,
				{ easing: easing }), duration, hidden);
				return;
			}
			if (customAnimations && customAnimations[animated]) {
				customAnimations[animated](newAnimations,
					$.extend(customAnimationOptions, { complete: hidden }));
				return;
			}
		}

		this.hide();
		if (hidden && $.isFunction(hidden)) {
			hidden.call(this);
		}
	};

	var wijCharValidator = function () { };
	$.extend(wijCharValidator.prototype, {
		_UTFPunctuationsString: ' ! \" # % & \' ( ) * , - . / : ; ? @ [ \\ ] { } \u00a1 \u00ab \u00ad \u00b7 \u00bb \u00bf \u037e \u0387 \u055a \u055b \u055c \u055d \u055e \u055f \u0589 \u058a \u05be \u05c0 \u05c3 \u05f3 \u05f4 \u060c \u061b \u061f \u066a \u066b \u066c \u066d \u06d4 \u0700 \u0701 \u0702 \u0703 \u0704 \u0705 \u0706 \u0707 \u0708 \u0709 \u070a \u070b \u070c \u070d \u0964 \u0965 \u0970 \u0df4 \u0e4f \u0e5a \u0e5b \u0f04 \u0f05 \u0f06 \u0f07 \u0f08 \u0f09 \u0f0a \u0f0b \u0f0c \u0f0d \u0f0e \u0f0f \u0f10 \u0f11 \u0f12 \u0f3a \u0f3b \u0f3c \u0f3d \u0f85 \u104a \u104b \u104c \u104d \u104e \u104f \u10fb \u1361 \u1362 \u1363 \u1364 \u1365 \u1366 \u1367 \u1368 \u166d \u166e \u169b \u169c \u16eb \u16ec \u16ed \u17d4 \u17d5 \u17d6 \u17d7 \u17d8 \u17d9 \u17da \u17dc \u1800 \u1801 \u1802 \u1803 \u1804 \u1805 \u1806 \u1807 \u1808 \u1809 \u180a \u2010 \u2011 \u2012 \u2013 \u2014 \u2015 \u2016 \u2017 \u2018 \u2019 \u201a \u201b \u201c \u201d \u201e \u201f \u2020 \u2021 \u2022 \u2023 \u2024 \u2025 \u2026 \u2027 \u2030 \u2031 \u2032 \u2033 \u2034 \u2035 \u2036 \u2037 \u2038 \u2039 \u203a \u203b \u203c \u203d \u203e \u2041 \u2042 \u2043 \u2045 \u2046 \u2048 \u2049 \u204a \u204b \u204c \u204d \u207d \u207e \u208d \u208e \u2329 \u232a \u3001 \u3002 \u3003 \u3008 \u3009 \u300a \u300b \u300c \u300d \u300e \u300f \u3010 \u3011 \u3014 \u3015 \u3016 \u3017 \u3018 \u3019 \u301a \u301b \u301c \u301d \u301e \u301f \u3030 \ufd3e \ufd3f \ufe30 \ufe31 \ufe32 \ufe35 \ufe36 \ufe37 \ufe38 \ufe39 \ufe3a \ufe3b \ufe3c \ufe3d \ufe3e \ufe3f \ufe40 \ufe41 \ufe42 \ufe43 \ufe44 \ufe49 \ufe4a \ufe4b \ufe4c \ufe50 \ufe51 \ufe52 \ufe54 \ufe55 \ufe56 \ufe57 \ufe58 \ufe59 \ufe5a \ufe5b \ufe5c \ufe5d \ufe5e \ufe5f \ufe60 \ufe61 \ufe63 \ufe68 \ufe6a \ufe6b \uff01 \uff02 \uff03 \uff05 \uff06 \uff07 \uff08 \uff09 \uff0a \uff0c \uff0d \uff0e \uff0f \uff1a \uff1b \uff1f \uff20 \uff3b \uff3c \uff3d \uff5b \uff5d \uff61 \uff62 \uff63 \uff64\';this.UTFWhitespacesString_=\'\t \u000b \u000c \u001f   \u00a0 \u1680 \u2000 \u2001 \u2002 \u2003 \u2004 \u2005 \u2006 \u2007 \u2008 \u2009 \u200a \u200b \u2028 \u202f \u3000',

		isDigit: function (c) {
			return (c >= '0' && c <= '9');
		},

		isLetter: function (c) {
			return !!((c + '').match(new RegExp('[A-Za-z\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u021f\u0222-\u0233\u0250-\u02ad\u02b0-\u02b8\u02bb-\u02c1\u02d0\u02d1\u02e0-\u02e4\u02ee\u037a\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d7\u03da-\u03f3\u0400-\u0481\u048c-\u04c4\u04c7\u04c8\u04cb\u04cc\u04d0-\u04f5\u04f8\u04f9\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0640-\u064a\u0671-\u06d3\u06d5\u06e5\u06e6\u06fa-\u06fc\u0710\u0712-\u072c\u0780-\u07a5\u0905-\u0939\u093d\u0950\u0958-\u0961\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b36-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60\u0d61\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6a\u0f88-\u0f8b\u1000-\u1021\u1023-\u1027\u1029\u102a\u1050-\u1055\u10a0-\u10c5\u10d0-\u10f6\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1206\u1208-\u1246\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1286\u1288\u128a-\u128d\u1290-\u12ae\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12ce\u12d0-\u12d6\u12d8-\u12ee\u12f0-\u130e\u1310\u1312-\u1315\u1318-\u131e\u1320-\u1346\u1348-\u135a\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1780-\u17b3\u1820-\u1877\u1880-\u18a8\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u207f\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2131\u2133-\u2139\u3005\u3006\u3031-\u3035\u3041-\u3094\u309d\u309e\u30a1-\u30fa\u30fc-\u30fe\u3105-\u312c\u3131-\u318e\u31a0-\u31b7\u3400-\u4db5\u4e00-\u9fa5\ua000-\ua48c\uac00-\ud7a3\uf900-\ufa2d\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe72\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')));
		},

		isLetterOrDigit: function (c) {
			return this.isLetter(c) || this.isDigit(c);
		},

		isSymbol: function (c) {
			var re = new RegExp('[$+<->^`|~\u00a2-\u00a9\u00ac\u00ae-\u00b1\u00b4\u00b6\u00b8\u00d7\u00f7\u02b9\u02ba\u02c2-\u02cf\u02d2-\u02df\u02e5-\u02ed\u0374\u0375\u0384\u0385\u0482\u06e9\u06fd\u06fe\u09f2\u09f3\u09fa\u0b70\u0e3f\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fcf\u17db\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u2044\u207a-\u207c\u208a-\u208c\u20a0-\u20af\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u2132\u213a\u2190-\u21f3\u2200-\u22f1\u2300-\u2328\u232b-\u237b\u237d-\u239a\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u2595\u25a0-\u25f7\u2600-\u2613\u2619-\u2671\u2701-\u2704\u2706-\u2709\u270c-\u2727\u2729-\u274b\u274d\u274f-\u2752\u2756\u2758-\u275e\u2761-\u2767\u2794\u2798-\u27af\u27b1-\u27be\u2800-\u28ff\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u309b\u309c\u3190\u3191\u3196-\u319f\u3200-\u321c\u322a-\u3243\u3260-\u327b\u327f\u328a-\u32b0\u32c0-\u32cb\u32d0-\u32fe\u3300-\u3376\u337b-\u33dd\u33e0-\u33fe\ua490-\ua4a1\ua4a4-\ua4b3\ua4b5-\ua4c0\ua4c2-\ua4c4\ua4c6\ufb29\ufe62\ufe64-\ufe66\ufe69\uff04\uff0b\uff1c-\uff1e\uff3e\uff40\uff5c\uff5e\uffe0-\uffe6\uffe8-\uffee\ufffc\ufffd]');
			return re.test(c + '');
		},

		isPunctuation: function (c) {
			return this._UTFPunctuationsString.indexOf(c) >= 0;
		},

		isPrintableChar: function (c) {
			if ((!this.isLetterOrDigit(c) && !this.isPunctuation(c)) && !this.isSymbol(c)) {
				return (c === ' ');
			}
			return true;
		},

		isAscii: function (c) {
			return (c >= '!') && (c <= '~');
		},

		isAsciiLetter: function (c) {
			return ((c >= 'A') && (c <= 'Z')) || ((c >= 'a') && (c <= 'z'));
		},

		isUpper: function (c) {
			return c.toUpperCase() === c;
		},

		isLower: function (c) {
			return c.toLowerCase() === c;
		},

		isAlphanumeric: function (c) {
			return !this.isLetter(c) ? this.isDigit(c) : true;
		},

		isAciiAlphanumeric: function (c) {
			if (((c < '0') || (c > '9')) && ((c < 'A') || (c > 'Z'))) {
				if (c >= 'a') {
					return (c <= 'z');
				}
				return false;
			}
			return true;
		},

		setChar: function (input, ch, pos) {
			if (pos >= input.length || pos < 0) {
				return input;
			}
			return '' || input.substr(0, pos) + ch + input.substr(pos + 1);
		}
	});

	var c__escapeArr1 = ['\n', '\r', '"', '@', '+', '\'', '<', '>', '%', '{', '}'],
		c__escapeArr2 = ["!ESC!NN!", "!ESC!RR!", "!ESC!01!", "!ESC!02!", "!ESC!03!", "!ESC!04!", "!ESC!05!", "!ESC!06!", "!ESC!07!", "!ESC!08!", "!ESC!09!"],
		c__escapeArr3 = ["(\n)", "(\r)", "(\")", "(@)", "(\\+)", "(')", "(\\<)", "(\\>)", "(%)", "(\\{)", "(\\})"];

	if (!$.wij) {
		$.extend({ wij: {
			charValidator: new wijCharValidator(),
			encodeString: function (s) {
				for (var i = 0; i < c__escapeArr1.lemgth; i++) {
					var r = /c__escapeArr3[i]/g;
					s = s.replace(r, c__escapeArr2[i]);
				}
				return s;
			},
			decodeString: function (s) {
				if (s === "") {
					return;
				}
				for (var i = 0; i < c__escapeArr2.length; i++) {
					var r = /c__escapeArr2[i]/g;
					s = s.replace(r, c__escapeArr1[i]);
				}
				return s;
			}
		}
		});
	};

})(jQuery);

__wijReadOptionEvents = function (eventsArr, widgetInstance) {
	// handle option events
	for (var k = 0; k < eventsArr.length; k++) {
		if (widgetInstance.options[eventsArr[k]] != null)
			widgetInstance.element.bind(eventsArr[k], widgetInstance.options[eventsArr[k]]);
	}
	//handle option event names separated by space, like: "afterexpand aftercollapse"
	for (k in widgetInstance.options) {
		if (k.indexOf(" ") != -1) {
			// possible multiple events separated by space:
			var arr = k.split(" ");
			for (var j = 0; j < arr.length; j++) {
				if (arr[j].length > 0)
					widgetInstance.element.bind(arr[j], widgetInstance.options[k]);
			}
		}
	}
};

function wijmoASPNetParseOptionsReviewer(o, k) {
    var a, v = o[k], d;
    if (v) {
        switch (typeof v) {
            case "string":
                a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?):(\d{3})Z$/.exec(v);
                if (a) {
                    d = new Date(+a[1], +a[2] - 1, +a[3], +a[4],
					+a[5], +a[6], +a[7]);
                    d.setFullYear(+a[1]);
                    o[k] = d;
                }
                break;
               case "object":
               	if (v.needQuotes !== undefined && v.valueString !== undefined) {
               		if (!v.needQuotes) {
               			o[k] = eval(v.valueString);
               		}
               		else {
               			o[k] = v.valueString;
               		}
               	}
               	else {
               		for (k in v) {
               			wijmoASPNetParseOptionsReviewer(v, k);
               		}
               	}
               	break;
        }
    }
}

function wijmoASPNetParseOptions(o) {
    var k;
    if (!o) {
        return o;
    }
    for (k in o) {
        wijmoASPNetParseOptionsReviewer(o, k);
    }
    return o;
}




/*globals window document clearTimeout setTimeout jQuery */
/*
*
* Wijmo Library 1.1.5
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
*
* Wijmo Tooltip widget.
* 
* Depends:
*	jQuery.1.7.1.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jQuery.ui.position.js
*	jquery.bgiframe-2.1.3-pre.js
*/
(function ($) {
	"use strict";
	var defaultTooltipKey = "@wijtp@",
		tipCss = "wijmo-wijtooltip",
		calloutCssPrefix = tipCss + "-arrow-",
		parseF = parseFloat,
		win = window,
		doc = document,
		math = Math,
		max = math.max,
		oldTipPos = {};

	$.widget("wijmo.wijtooltip", {
		options: {
			/// <summary>
			/// Sets the tooltip's content..
			/// Type: String or Function.
			/// Default: "".
			/// Remarks: The value can be a string, html code, or a function. 
			/// If it is a function, then the content will be 
			/// the function's return value.
			/// Code example: $(".selector").wijtooltip("option", "content", "content").
			/// </summary>
			content: '',
			/// <summary>
			/// Specifies a value that sets the tooltip��s title.
			/// Type: String or Function.
			/// Default: "".
			/// Code example: $(".selector").wijtooltip("option", "title", "title");
			/// Remark: The value can be a string, html code, or a function. 
			/// If it is a function, then the title will be 
			/// the function's return value.
			/// </summary>
			title: "",
			/// <summary>
			/// Determines how to close the tooltip. Behaviors include auto or sticky.
			/// Type: String.
			/// Default: "auto".
			/// Options: "auto", "none" and "sticky".
			/// Code example: $(".selector")
			///				.wijtooltip("option", "closeBehavior", "auto").
			/// </summary>
			closeBehavior: 'auto',
			/// <summary>
			/// If true, then the tooltip moves with the mouse. 
			/// Type: Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijtooltip("option", "mouseTrailing", false).
			/// </summary>
			mouseTrailing: false,
			/// <summary>
			/// Sets the event that will cause the tooltip to appear.
			/// Type: String
			/// Default: "hover".
			/// Options: "hover", "click", "focus", "rightClick", "custom".
			/// Code example: $(".selector").wijtooltip("option", "triggers", "hover").
			/// </summary>
			triggers: 'hover',
			/// <summary>
			/// Sets the tooltip's position mode in relation to the 'relativeTo', 
			/// 'offsetX', and 'offsetY' properties. For example, 
			/// here is the jQuery ui position's position:
			/// {my:'top left',at:'right bottom',offset:}.
			/// Type: Object.
			/// Default: { my: "left bottom", at: "right top", offset: null}
			/// Code expamle: $(".selector").wijtooltip("option", "position",
			///				{my: 'left bottom', at: 'right top', offset: '0 0'}).
			/// </summary>
			position: {
				my: 'left bottom',
				at: 'right top',
				offset: null
			},
			/// <summary>
			/// Determines whether to show the callout element.
			/// Type: Boolean.
			/// Default: true.
			/// Code example: $(".selector").wijtooltip("option", "showCallout", true).
			/// </summary>
			showCallout: true,
			/// <summary>
			/// Sets showAnimation and hideAnimation if they are not specified individually.
			/// Default: { animated: "fade", duration: 500, easing: null }.
			/// Type: Object.
			/// Remark: User's standard animation setting syntax from other widgets.
			/// Code example:
			/// $(".selector").wijtooltip("option", "animation", 
			/// {animated: "fade", duration: 400, easing: null})
			/// </summary>
			animation: { animated: "fade", duration: 500, easing: null },
			/// <summary>
			/// Determines the animation effect that will be shown. 
			/// Type: Object.
			/// Default: {}.
			/// Remarks: This should be an object value. Possible values include:
			/// 'animated', 'duration', and 'easing'. 
			/// This property works with jQuery animation..
			/// Code example: $(".selector").wijtooltip("option", "showAnimation",
			///				{animated: "fade", duration: 500, easing: "linear"}).
			/// </summary>
			showAnimation: {},
			/// <summary>
			/// Determines whether the animation effect can be seen.
			/// Type: Object.
			/// Default: {animated: 'fade', duration:500, easing: null}.
			/// Remarks: This should be an object value, 
			/// like the showAnimation property. 
			/// Code example: $(".selector").wijtooltip("option", "hideAnimation",
			///				{animated: "fade", duration: 500, easing: null}).
			/// </summary>
			hideAnimation: {},
			/// <summary>
			/// Determines the length of the delay before the tooltip appears. 
			/// Type: Number
			/// Default: 150.
			/// Code example: $(".selector").wijtooltip("option", "showDelay", 200).
			/// </summary>
			showDelay: 150,
			/// <summary>
			/// Determines the length of the delay before the tooltip disappears.
			/// Type: Number.
			/// Default: 150.
			/// Code example: $(".selector").wijtooltip("option", "hideDelay", 200).
			/// </summary>
			hideDelay: 150,
			/// <summary>
			/// Sets the callout's offset changing animation..
			/// Type: Object.
			/// Default: {duration: 1000, disabled: false, easing: null}.
			/// Code example: $(".selector").wijtooltip("option",
			///				"calloutAnimation", {easing: "swing", duration: 200}).
			/// </summary>
			calloutAnimation: { duration: 1000, disabled: false, easing: null },
			/// <summary>
			/// Determines the callout's class style. 
			/// If true, then the callout triangle will be filled..
			/// Type: Boolean.
			/// Default: true.
			/// Code example: $(".selector").wijtooltip("option", "calloutFilled", true).
			/// </summary>
			calloutFilled: true,
			/// <summary>
			/// A value that indicates whether to show the modal tooltip.
			/// Type: Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijtooltip("option", "modal", true).
			/// </summary>
			modal: false,
			/// <summary>
			/// A value that indicates which group the tooltip belongs to.
			/// Type: String.
			/// Default: null.
			/// Code example: $(".selector").wijtooltip("option", "group", "A").
			/// </summary>
			group: null,
			/// <summary>
			/// A function that defines a callback when user use ajax to set 
			/// content property.
			/// Default: false.
			/// Type: Function.
			/// Code example: $(".selector").wijtooltip("option", 
			/// "ajaxCallback", function () {}).
			/// Remark: In ajax's complete callback method, user set callback 
			/// data to the content option.
			/// </summary>
			ajaxCallback: null,
			/// <summary>
			/// Trigegred before showing the tooltip
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("showing",function(e, ui){})
			/// Bind to the event by type: wijtooltipshowing
			/// $(".selector").bind("wijtooltipshowing", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget.
			/// </param>
			/// <returns type="Boolean">
			/// Return false to cancel the showing event.
			/// </returns>
			showing: null,
			/// <summary>
			/// Triggered once the tooltip has shown.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("shown",function(e, ui){})
			/// Bind to the event by type: wijtooltipshown
			/// $(".selector").bind("wijtooltipshown", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object. 
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget object.
			/// </param>
			shown: null,
			/// <summary>
			/// Triggered before hiding the tooltip.If data.cancel is 
			/// set to true, then the tooltip is no longer hidden
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("hiding", function(e, ui){})
			/// Bind to the event by type: wijtooltiphiding
			/// $(".selector").bind("wijtooltiphiding", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object. 
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget object.
			/// </param>
			/// <returns type="Boolean">
			/// Return false to cancel the hiding event.
			/// </returns>
			hiding: null,
			/// <summary>
			/// Triggered once the tooltip has hidden.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("hidden",function(e, ui){})
			/// Bind to the event by type: wijtooltiphidden
			/// $(".selector").bind("wijtooltiphidden", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object. 
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget object.
			/// </param>
			hidden: null
		},

		_setOption: function (key, value) {
			var self = this,
				funName = "_set_" + key,
				oldValue = self.options[key];

			$.Widget.prototype._setOption.apply(self, arguments);

			if ($.isPlainObject(value)) {
				self.options[key] = $.extend({}, oldValue, value);
			}

			if (self[funName]) {
				self[funName](oldValue);
			}
		},

		_set_content: function (value) {
			var self = this;
			if (self._isAjaxCallback) {
				self._callbacked = true;
				//self.options.content = value;
				//self._setText();
				self.show();
				self._callbacked = false;
			}
			else {
				self._setText();
			}
		},

		_create: function () {
			var self = this,
				o = self.options,
				element = self.element,
				id = element && element.attr("id"),
				describedBy = "",
				key = o.group || defaultTooltipKey,
				tooltip = $.wijmo.wijtooltip._getTooltip(key);

			if (tooltip) {
				tooltip.count++;
			} else {
				tooltip = self._createTooltip();
				tooltip.count = 0;
				$.wijmo.wijtooltip._tooltips[key] = tooltip;
			}

			o.position.of = self.element;
			self._bindLiveEvents();
			self._tooltip = tooltip;

			if (id !== "") {
				describedBy = tooltip.attr("aria-describedby");
				describedBy = describedBy === undefined ? "" : describedBy + " ";

				tooltip.attr("aria-describedby", describedBy + id);
			}
		},

		destroy: function () {
			/// <summary>
			///	Removes the wijtooltip functionality completely.
			///	This returns the element back to its pre-init state.
			/// </summary>
			var self = this,
				element = self.element,
				key = self.options.group || defaultTooltipKey;

			element.unbind(".tooltip");
			element.attr("title", self._content);
			$.wijmo.wijtooltip._removeTooltip(key);

			$.Widget.prototype.destroy.apply(self);
		},

		widget: function () {
			/// <summary>
			/// Returns the wijtooltip element.
			/// Code example:
			/// $(��#tooltip��).wijtooltip(��widget��);
			/// </summary>
			return this._tooltip;
		},

		//public methods
		show: function () {
			/// <summary>
			///	Shows the tooltip
			/// Code example:
			/// $("#tooltip").wijtooltip("show");
			/// </summary>
			var self = this,
				tooltip = self._tooltip,
				o = self.options;

			if (!tooltip) {
				return;
			}

			if (tooltip._hideAnimationTimer) {
				clearTimeout(tooltip._hideAnimationTimer);
				tooltip._hideAnimationTimer = null;
			}

			tooltip.stop(true, true);

			if (o.ajaxCallback && $.isFunction(o.ajaxCallback) && !self._callbacked) {
				self._isAjaxCallback = true;
				o.ajaxCallback.call(self.element);
				return;
			}

			tooltip._showAnimationTimer =
				setTimeout(function () {
					self._setText();
					oldTipPos = tooltip.offset();
					if (o.mouseTrailing) {
						self._setCalloutCss();
						return;
					}
					self._setPosition();

					self._showTooltip();
				}, self.options.showDelay);
		},

		showAt: function (point) {
			/// <summary>
			///	Show the tooltip at the specified position
			///	</summary>
			/// <param name="point" type="Object">
			///	A point value that indicates the position that tooltip will be shown.
			/// Code example:
			/// $("#tooltip").wijtooltip("showAt", {x:100, y:120});
			/// </param>
			var self = this,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout,
				calloutPos = {},
				offsetX = 0,
				offsetY = 0,
				offset = {},
				calloutShape, border, hBorder, vBorder,
				width, height;

			if (!tooltip || !callout) {
				return;
			}

			tooltip.stop(true, true);

			tooltip._showAnimataionTimer =
				setTimeout(function () {
					self._setText();
					oldTipPos = tooltip.offset();

					tooltip.offset({ left: 0, top: 0 })
						.show();
					calloutPos = callout.position();
					offsetX = calloutPos.left;
					offsetY = calloutPos.top;

					border = self._getBorder(callout);
					hBorder = border.left || border.right;
					vBorder = border.top || border.bottom;

					width = tooltip.width();
					height = tooltip.height();

					calloutShape = self._getCalloutShape();

					offset = {
						"rt": {
							left: point.x - width - hBorder,
							top: point.y - offsetY
						},
						"rc": {
							left: point.x - width - hBorder,
							top: point.y - height / 2
						},
						"rb": {
							left: point.x - width - hBorder,
							top: point.y - offsetY - vBorder
						},
						"lt": {
							left: point.x + hBorder,
							top: point.y - offsetY
						},
						"lc": {
							left: point.x + hBorder,
							top: point.y - height / 2
						},
						"lb": {
							left: point.x + hBorder,
							top: point.y - offsetY - vBorder
						},
						"tl": {
							left: point.x - offsetX,
							top: point.y + vBorder
						},
						"tc": {
							left: point.x - width / 2,
							top: point.y + vBorder
						},
						"tr": {
							left: point.x - offsetX - hBorder,
							top: point.y + vBorder
						},
						"bl": {
							left: point.x - offsetX,
							top: point.y - height - vBorder
						},
						"bc": {
							left: point.x - width / 2,
							top: point.y - height - vBorder
						},
						"br": {
							left: point.x - offsetX - hBorder,
							top: point.y - height - vBorder
						}
					}[calloutShape];

					calloutShape = self._flipTooltip(offset, calloutShape, border);
					self._setUnfilledCallout(calloutShape);
					tooltip.offset(offset).hide();
					self._calloutShape = calloutShape;
					self._showTooltip();
				}, self.options.showDelay);
		},

		hide: function () {
			/// <summary>
			///	Hides the tooltip
			/// Code example:
			/// $("#tooltip").wijtooltip("hide");
			/// </summary>
			var self = this,
				tooltip = self._tooltip;

			if (!tooltip) {
				return;
			}

			clearTimeout(tooltip._showAnimationTimer);
			tooltip._hideAnimationTimer =
				setTimeout($.proxy(self._hideTooltip, self), self.options.hideDelay);
		},

		//begin private methods
		_createTooltip: function () {
			var self = this,
				cornerAllCss = "ui-corner-all",
				widgetContentCss = "ui-widget-content",
				stateDefaultCss = "ui-state-default",
				widgetHeaderCss = "ui-widget-header",
				tooltip = $("<div class = '" + tipCss + " ui-widget " +
							widgetContentCss + " " + cornerAllCss + "'></div>"),
				container = $("<div class='" + tipCss + "-container'></div>"),
				callout = $("<div class='" + widgetContentCss + " " +
							tipCss + "-pointer '>" + "<div class='" +
							tipCss + "-pointer-inner'></div></div>"),
				title = $("<div class = '" + tipCss + "-title " +
							widgetHeaderCss + " " + cornerAllCss + "'></title>"),
				closeBtn = $("<a href='#' class = '" + tipCss + "-close " +
							stateDefaultCss + " " + cornerAllCss + "'></a>");

			closeBtn.append($("<span class = 'ui-icon ui-icon-close'></span>"))
					.bind("click", $.proxy(self._onClickCloseBtn, self));

			tooltip.append(title)
				.append(closeBtn)
				.append(container)
				.append(callout)
				.css("position", "absolute")
				.attr("role", "tooltip")
				.appendTo("body")
				.hide();

			tooltip._container = container;
			tooltip._callout = callout;
			tooltip._closeBtn = closeBtn;
			tooltip._title = title;

			return tooltip;
		},

		_bindLiveEvents: function () {
			var self = this,
				o = self.options,
				element = self.element;

			if (self._content === undefined) {
				self._content = element.attr("title");
				element.attr("title", "");
			}

			element.unbind('.tooltip');

			if (o.mouseTrailing) {
				element.bind("mousemove.tooltip", function (e) {
					var offset = o.position.offset || "",
					offsets = offset.split(" ");
					if (offsets.length === 2) {
						self.showAt({ x: e.pageX + parseInt(offsets[0], 10), 
							y: e.pageY + parseInt(offsets[1], 10) });
					}
					else {
						self.showAt({ x: e.pageX, y: e.pageY });
					}
				});
			}

			switch (o.triggers) {
			case "hover":
				element.bind("mouseover.tooltip", $.proxy(self.show, self))
			.bind("mouseout.tooltip", $.proxy(self._hideIfNeeded, self));
				break;
			case "click":
				element.bind("click.tooltip", $.proxy(self.show, self));
				break;
			case "focus":
				element.bind("focus.tooltip", $.proxy(self.show, self))
			.bind("blur.tooltip", $.proxy(self._hideIfNeeded, self));
				break;
			case "rightClick":
				element.bind("contextmenu.tooltip", function (e) {
					self.show();
					e.preventDefault();
				});
				break;
			}
		},

		_hideIfNeeded: function () {
			var self = this,
				o = self.options,
				closeBehavior = o.closeBehavior;

			if (closeBehavior === "sticky" || o.modal ||
				closeBehavior === "none") {
				return;
			}

			self.hide();
		},

		_flipTooltip: function (pos, calloutShape, calloutBorder) {
			var self = this,
				tooltip = self._tooltip,
				bound = { width: tooltip.width(), height: tooltip.height() },
				flipCallout = self._flipCallout(pos, bound, calloutShape),
				flip = flipCallout && flipCallout.flip,
				width, height;

			if (!tooltip || !flipCallout || (!flip.h && !flip.v)) {
				return flipCallout.calloutShape;
			}

			width = tooltip.width();
			height = tooltip.height();

			if (flip.h === "l") {
				pos.left -= (width + calloutBorder.right * 2) + 1;
			} else if (flip.h === "r") {
				pos.left += (width + calloutBorder.left * 2) + 1;
			} else if (flip.v === "t") {
				pos.top -= (height + calloutBorder.bottom * 2) + 1;
			} else if (flip.v === "b") {
				pos.top += (height + calloutBorder.top * 2) + 1;
			}

			return flipCallout.calloutShape;
		},

		_flipCallout: function (pos, bound, calloutShape) {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				flip = { h: false, v: false },
				jqWin = $(win),
				collision = (o.position.collision || "flip").split(" ");

			if (collision.length === 1) {
				collision[1] = collision[0];
			}

			if (!tooltip || (collision[0] !== "flip" && collision[1] !== "flip")) {
				return { flip: flip };
			}

			if (collision[0] === "flip") {
				if (pos.left < 0 || pos.left + bound.width >
					jqWin.width() + jqWin.scrollLeft()) {
					flip.h = true;
				}
			}

			if (collision[0] === "flip") {
				if (pos.top < 0 || pos.top + bound.height >
					jqWin.height() + jqWin.scrollTop()) {
					flip.v = true;
				}
			}

			if (flip.h) {
				if (calloutShape.indexOf('l') > -1) {
					calloutShape = calloutShape.replace(/l/, 'r');
					flip.h = "l";
				} else if (calloutShape.indexOf('r') > -1) {
					calloutShape = calloutShape.replace(/r/, 'l');
					flip.h = "r";
				}
			}

			if (flip.v) {
				if (calloutShape.indexOf('t') > -1) {
					calloutShape = calloutShape.replace(/t/, 'b');
					flip.v = "t";
				} else if (calloutShape.indexOf('b') > -1) {
					calloutShape = calloutShape.replace(/b/, 't');
					flip.v = "b";
				}
			}

			if (flip.h || flip.v) {
				self._removeCalloutCss();
				tooltip.addClass(calloutCssPrefix + calloutShape);
			}

			return { flip: flip, calloutShape: calloutShape };
		},

		//methods for options setters
		_set_position: function (oldValue) {
			var self = this,
				o = self.options,
				val = o.position;

			if (o.showCallout) {
				if (oldValue.my !== val.my || oldValue.at !== val.at) {
					self._setPosition();
				}

				self._setCalloutOffset(true);
			}
		},

		_set_showCallOut: function (value) {
			var self = this,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout;

			if (!tooltip || !callout) {
				return;
			}

			if (value) {
				self._setCalloutCss();
				callout.show();
			} else {
				callout.hide();
			}
		},

		_set_closeBehavior: function () {
			var self = this,
				tooltip = self._tooltip,
				closeBtn = tooltip && tooltip._closeBtn;

			if (closeBtn) {
				closeBtn[self.options.closeBehavior === "sticky" ? "show" : "hide"]();
			}
		},

		_set_triggers: function () {
			this._bindLiveEvents();
		},

		_set_mouseTrailing: function () {
			this._bindLiveEvents();
		},
		//end of methods for options setters.

		_getCalloutShape: function () {
			var self = this,
				position = self.options.position,
				makeArr = function (items) {
					return $.map(items, function (item) {
						return item.substr(0, 1);
					});
				},
				myItems = makeArr(position.my.split(" ")),
				atItems = makeArr(position.at.split(" ")),
				shape = [];

			if (myItems.length === 2) {
				shape = myItems;
			}

			if (myItems[0] === atItems[0]) {
				if ((myItems[1] === 't' && atItems[1] === 'b') ||
					(myItems[1] === 'b' && atItems[1] === 't')) {
					shape.reverse();
				}
			} else if (atItems[0] === 'c') {
				shape.reverse();
			}

			if (shape[0] === 'c') {
				shape.reverse();
			}

			return shape.join("");
		},

		_setCalloutCss: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				cssName = "",
				calloutShape = "";

			if (!o.showCallout) {
				return;
			}

			self._removeCalloutCss();
			calloutShape = self._getCalloutShape();
			cssName = calloutCssPrefix + calloutShape;

			if (tooltip) {
				tooltip.addClass(cssName);
			}

			return calloutShape;
		},

		_removeCalloutCss: function () {
			var tooltip = this._tooltip;

			if (tooltip) {
				$.each(["tl", "tc", "tr",
					"bl", "bc", "br",
					"rt", "rc", "rb",
					"lt", "lc", "lb"], function (idx, compass) {
						var cssName = calloutCssPrefix + compass;

						if (tooltip.hasClass(cssName)) {
							tooltip.removeClass(cssName);
							return false;
						}
					});
			}
		},

		_getBorder: function (element) {
			var obj = {};

			$.each(["top", "right", "left", "bottom"], function (idx, compass) {
				obj[compass] = parseF(element.css("border-" + compass + "-width"));
			});

			return obj;
		},

		_setPosition: function () {
			var self = this,
				o = self.options,
				position = o.position,
				tooltip = self._tooltip,
				isHidden = tooltip.is(":hidden"),
				calloutShape = self._setCalloutCss(),
				arrCalloutShape = calloutShape ? calloutShape.split('') : null,
				offset = [0, 0],
				sOffset = "",
				callout = tooltip._callout,
				border, top, left, right, bottom,
				bound = { width: tooltip.width(), height: tooltip.height() },
				flipCallout, flip;

			if (isHidden) {
				tooltip.show();
			}

			tooltip.css({ left: 0, top: 0 });

			if (o.showCallout) {
				border = self._getBorder(callout);
				left = parseF(callout.css("left"));
				top = parseF(callout.css("top"));
				right = parseF(callout.css("right"));
				bottom = parseF(callout.css("bottom"));

				switch (arrCalloutShape[0]) {
				case "l":
					offset[0] = border.right;
					break;
				case "r":
					offset[0] = -border.left;
					break;
				case "b":
					offset[1] = bottom;
					break;
				case "t":
					offset[1] = -top;
					break;
				}

				switch (arrCalloutShape[1]) {
				case "t":
					offset[1] = -top;
					break;
				case "b":
					offset[1] = bottom;
					break;
				case "r":
					offset[0] = right;
					break;
				case "l":
					offset[0] = -left;
					break;
				}

				sOffset = offset.join(" ");
			}

			tooltip.position({ my: position.my, at: position.at, of: position.of,
				offset: sOffset, collision: "none none"
			});

			flipCallout = self._flipCallout(tooltip.offset(), bound, calloutShape);
			flip = flipCallout.flip;

			if (flip.h || flip.v) {
				tooltip.css({ left: 0, top: 0 });
				tooltip.position({ my: position.my, at: position.at, of: position.of,
					offset: sOffset, collision: position.collision
				});
			}

			if (o.showCallout) {
				self._setUnfilledCallout(calloutShape);
			}

			self._calloutShape = calloutShape;

			if (isHidden) {
				tooltip.hide();
			}
		},

		_setCalloutOffset: function (showCalloutAnimation) {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout,
				calloutShape = self._calloutShape,
				horizontal = false,
				offset = o.position.offset,
				value = "",
				offsetItems = [],
				calloutAnimation = o.calloutAnimation;

			if (!callout) {
				return;
			}

			if (!offset || offset.length === 0) {
				return;
			}

			callout.stop(true, true);

			$.each(["tr", "tc", "tl", "bl", "bc", "br"], function (idx, compass) {
				if (calloutShape === compass) {
					horizontal = true;
					return false;
				}
			});

			if (offset) {
				offsetItems = offset.split(" ");

				if (offsetItems.length === 2) {
					value = horizontal ? offsetItems[0] : offsetItems[1];
				} else if (offsetItems.length === 1) {
					value = offsetItems[0];
				}
			}

			if (value !== "") {
				if (showCalloutAnimation && !showCalloutAnimation.disabled) {
					callout.animate(horizontal ? { left: value} : { top: value },
						calloutAnimation.duration, calloutAnimation.easing);
				} else {
					callout.css(horizontal ? "left" : "top", value);
				}
			}
		},

		_setUnfilledCallout: function (calloutShape) {
			var self = this,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout,
				innerCallout = callout && callout.children(),
				arrCalloutSharp = calloutShape.split(''),
				borderColor = tooltip && tooltip.css("background-color");

			if (!innerCallout) {
				return;
			}

			innerCallout.css({
				"border-left-color": "",
				"border-top-color": "",
				"border-bottom-color": "",
				"border-right-color": ""
			});

			if (self.options.calloutFilled) {
				switch (arrCalloutSharp[0]) {
				case "l":
					innerCallout.css("border-right-color", borderColor);
					break;
				case "t":
					innerCallout.css("border-bottom-color", borderColor);
					break;
				case "r":
					innerCallout.css("border-left-color", borderColor);
					break;
				case "b":
					innerCallout.css("border-top-color", borderColor);
					break;
				}
			}
		},

		_showTooltip: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				showAnimation,
				animations, curPos,
				closeBtn = tooltip && tooltip._closeBtn,
				callout = tooltip && tooltip._callout;

			if (!tooltip) {
				return;
			}


			if (self._trigger("showing", null, self) === false) {
				return;
			}


			if (closeBtn) {
				closeBtn[o.closeBehavior === "sticky" ? "show" : "hide"]();
			}

			if (callout) {
				callout[o.showCallout ? "show" : "hide"]();
			}

			self._showModalLayer();
			tooltip.css("z-index", 99999);

			if (!o.mouseTrailing && $.fn.wijshow) {
				animations = {
					show: true,
					context: tooltip
				};

				showAnimation = $.extend({}, o.animation, o.showAnimation);

				if (tooltip.is(":visible")) {
					curPos = tooltip.offset();
					tooltip.offset(oldTipPos);
					$.extend(animations, { pos: curPos });
					showAnimation.animated = "tooltipSlide";
				}
				tooltip.wijshow(showAnimation, $.wijmo.wijtooltip.animations,
					animations, null, function () {
						self._trigger("shown");
					});
			} else {
				tooltip.show();
				self._trigger("shown");
			}
			self._setCalloutOffset(false);
		},

		_hideTooltip: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				hideAnimation = $.extend({}, o.animation, o.hideAnimation),
				animations;

			if (!tooltip) {
				return;
			}

			if (self._trigger("hiding", null, self) === false) {
				return;
			}

			self._hideModalLayer();

			if (!o.mouseTrailing && $.fn.wijhide) {
				animations = {
					show: true,
					context: tooltip
				};
				tooltip.wijhide(hideAnimation, $.wijmo.wijtooltip.animations,
				animations, null, function () {
					self._trigger("hidden");
					tooltip.css("z-index", "");
				});
			} else {
				tooltip.hide();
				self._trigger("hidden");
				tooltip.css("z-index", "");
			}
		},

		_getContent: function (content) {
			var obj = { data: "" }, retValue;
			if ($.isFunction(content)) {
				retValue = content.call(this.element, obj);
				if (obj.data !== "") {
					return obj.data;
				}
				else {
					return retValue;
				}
			} else if (window[content] && 
					$.isFunction(window[content])) {
				// if window[content/title] is a function, then get the
				// function value.
				retValue = window[content].call(this.element, obj);
				if (obj.data !== "") {
					return obj.data;
				}
				else {
					return retValue;
				}
			}
			return content;
		},

		_setText: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				content = "",
				title = "",
				jqTitle = tooltip && tooltip._title;

			if (!tooltip) {
				return;
			}

			content = self._getContent(o.content);
			content = content === "" ? self._content : content;
			tooltip._container.html(content);

			title = self._getContent(o.title);

			if (title !== "") {
				jqTitle.html(title).show();
			} else {
				jqTitle.hide();
			}
		},

		_showModalLayer: function () {
			var self = this,
				modalLayer = null;

			if (self.options.modal) {
				modalLayer = $("<div>")
					.addClass("ui-widget-overlay")
					.css("z-index", 99000)
					.width(self._getDocSize("Width"))
					.height(self._getDocSize("Height"))
					.appendTo("body");

				self._tooltip._modalLayer = modalLayer;
			}
		},

		_hideModalLayer: function () {
			var self = this,
				modalLayer = self._tooltip._modalLayer;

			if (modalLayer) {
				modalLayer.css("z-index", "")
					.remove();
			}
		},

		_getDocSize: function (name) {
			var scrollValue,
				offsetValue,
				de = "documentElement",
				body = "body";

			// handle IE 6
			if ($.browser.msie && $.browser.version < 9) {
				scrollValue = max(
					doc[de]["scroll" + name],
					doc[body]["scroll" + name]
				);

				offsetValue = max(
					doc[de]["offset" + name],
					doc[body]["offset" + name]
				);

				return (scrollValue < offsetValue ?
					($(win)[name.toLowerCase()]() + 'px') :
					scrollValue + 'px');
			} else {
				return $(doc)[name.toLowerCase()]() + 'px';
			}
		},

		//begin event handler methods
		_onClickCloseBtn: function (e) {
			this.hide();
			e.preventDefault();
		}
		//end event handler methods	
	});

	$.extend($.wijmo.wijtooltip, {
		animations: {
			fade: function (options, additions) {
				options = $.extend({
					duration: 300,
					easing: "swing"
				}, options, additions);
				options.context.stop(true, true).animate(options.show ?
				{ opacity: 'show'} : { opacity: 'hide' }, options);
			},
			tooltipSlide: function (options, additions) {
				options = $.extend({
					duration: 300,
					easing: "swing"
				}, options, additions);
				options.context.stop(true, true).animate({
					left: options.pos.left,
					top: options.pos.top
				}, options);
			}
		},

		_tooltips: {},

		_getTooltip: function (key) {
			return $.wijmo.wijtooltip._tooltips[key];
		},

		_removeTooltip: function (key) {
			var tooltip = $.wijmo.wijtooltip._tooltips[key];

			if (tooltip) {
				tooltip.count--;

				if (tooltip.count <= 0) {
					tooltip.remove();
					$.wijmo.wijtooltip._tooltips[key] = null;
				}

				
				//tooltip = null;
			}
		}
	});
} (jQuery));
/*globals window,document,jQuery*/
/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Slider widget.
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.mouse.js
*  jquery.ui.widget.js
*  jquery.ui.slider.js
*  jquery.ui.wijutil.js
*  
*/

(function ($) {
	"use strict";
	$.widget("wijmo.wijslider", $.ui.slider, {
		options: {
			/// <summary>
			/// Raised when the mouse is over the decrement button or increment button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseOver event:
			/// $("#element").wijslider({ buttonMouseOver: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseOver", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseOver: null,
			/// <summary>
			/// Raised when the mouse leaves the decrement button or increment button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseOut event:
			/// $("#element").wijslider({ buttonMouseOut: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseOut", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseOut: null,
			/// <summary>
			/// Raised when the mouse is down on the decrement button or decrement button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseDown event:
			/// $("#element").wijslider({ buttonMouseDown: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseDown", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseDown: null,
			/// <summary>
			/// Raised when the mouse is up on the decrement button or increment button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseUp event:
			/// $("#element").wijslider({ buttonMouseUp: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseUp", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseUp: null,
			/// <summary>
			/// Raised when the decrement or increment button is clicked.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonClick event:
			/// $("#element").wijslider({ buttonClick: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonClick", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button.
			/// </param>
			buttonClick: null,
			/// <summary>
			/// Determines whether the user is able to 
			/// drag the fill between the buttons. 
			/// Default: true.
			/// Type: Boolean.
			/// Code example:
			///  $("#selector").wijslider({
			///      dragFill: false
			///  });
			/// </summary>
			dragFill: true,
			/// <summary>
			/// A value prevent the two range handles from being placed on top of 
			/// one another.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#selector").wijslider({
			///      minRange: 25
			///  });
			/// </summary>
			minRange: 0
		},

		_setOption: function (key, value) {
			///	<summary>
			///		Sets Slider options.
			///	</summary>

			var self = this;

			$.ui.slider.prototype._setOption.apply(self, arguments);
			this.options[key] = value;

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element.parent());
			}
			//end for disabled option
			return this;
		},

		_create: function () {
			///	<summary>
			///		Creates Slider DOM elements and binds interactive events.
			///	</summary>
			var self = this,
				element = self.element,
				o = self.options,
				jqElement, val, vals, idx, len,
				ctrlWidth, ctrlHeight, container, decreBtn, increBtn,
				decreBtnWidth, decreBtnHeight, increBtnWidth,
				increBtnHeight, thumb, thumbWidth, thumbHeight,
				dbtop, ibtop, dbleft, ibleft;

			self._oriStyle = element.attr("style");
			
			if (element.is(":input")) {
				if (o.orientation === "horizontal") {
					jqElement = $("<div></div>")
					.width(element.width()).appendTo(document.body);
				} else {
					jqElement = $("<div></div>")
					.height(element.height()).appendTo(document.body);
				}

				val = element.val();
				if (val !== "") {
					try {
						vals = val.split(";");
						len = vals.length;

						if (len > 0) {
							for (idx = 0; idx < len; idx++) {
								vals[idx] = parseInt(vals[idx], 10);
							}

							if (len === 1) {
								o.value = vals[0];
							} else {
								o.values = vals;
							}
						}
					} catch (e) {
					}
				}

				element.data(self.widgetName, jqElement.wijslider(o))
					.after($(document.body).children("div:last")).hide();

				//Add for support disabled option at 2011/7/8
				if (o.disabled) {
					self.disable();
				}
				//end for disabled option

				return;
			}

			$.ui.slider.prototype._create.apply(self, arguments);

			element.data("originalStyle", element.attr("style"));
			element.data("originalContent", element.html());

			ctrlWidth = element.width();
			ctrlHeight = element.height();
			container = $("<div></div>");

			if (o.orientation === "horizontal") {
				container.addClass("wijmo-wijslider-horizontal");
			} else {
				container.addClass("wijmo-wijslider-vertical");
			}
			container.width(ctrlWidth).height(ctrlHeight);

			decreBtn = $("<a class=\"wijmo-wijslider-decbutton\"><span></span></a>");
			increBtn = $("<a class=\"wijmo-wijslider-incbutton\"><span></span></a>");
			element.wrap(container).before(decreBtn).after(increBtn);

			self._attachClass();

			decreBtnWidth = decreBtn.outerWidth();
			decreBtnHeight = decreBtn.outerHeight();
			increBtnWidth = increBtn.outerWidth();
			increBtnHeight = increBtn.outerHeight();
			thumb = element.find(".ui-slider-handle");
			thumbWidth = thumb.outerWidth();
			thumbHeight = thumb.outerHeight();
			//update code for height and width calculation at 2011/7/12
			//element.removeAttr("style");
			//end for height and width calculation

			if (o.orientation === "horizontal") {
				dbtop = ctrlHeight / 2 - decreBtnHeight / 2;
				decreBtn.css("top", dbtop).css("left", 0);
				ibtop = ctrlHeight / 2 - increBtnHeight / 2;
				increBtn.css("top", ibtop).css("right", 0);

				element.css("left", decreBtnWidth + thumbWidth / 2 - 1)
				.css("top", ctrlHeight / 2 - element.outerHeight() / 2)
				.width(ctrlWidth - decreBtnWidth - increBtnWidth - thumbWidth - 2);
			} else {
				dbleft = ctrlWidth / 2 - decreBtnWidth / 2;
				decreBtn.css("left", dbleft).css("top", 0);
				ibleft = ctrlWidth / 2 - increBtnWidth / 2;
				increBtn.css("left", ibleft).css("bottom", 0);

				element
				.css("left", ctrlWidth / 2 - element.outerWidth() / 2)
				.css("top", decreBtnHeight + thumbHeight / 2 + 1)
				.height(ctrlHeight - decreBtnHeight - increBtnHeight - thumbHeight - 2);
			}

			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option

			self._bindEvents();
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			//Change your outerelement here
				ele = outerEle ? outerEle : self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
						.addClass("ui-disabled")
				.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},

		destroy: function () {
			///	<summary>
			///	Remove the slider functionality completely. 
			/// This will return the element back to its pre-init state.
			///	</summary>
			var self = this, decreBtn, increBtn;
			decreBtn = this._getDecreBtn();
			increBtn = this._getIncreBtn();
			decreBtn.unbind('.' + self.widgetName);
			increBtn.unbind('.' + self.widgetName);
			$.ui.slider.prototype.destroy.apply(this, arguments);
			
			//update for destroy by wh at 2011/11/11
			//this.element.parent().removeAttr("class");
			//this.element.parent().html("");
			$("a", self.element.parent()).remove();
			self.element.unbind('.' + self.widgetName);
			self.element.unwrap();
			if (self._oriStyle === undefined) {
				self.element.removeAttr("style");
			} else {
				self.element.attr("style", self._oriStyle);
			}
			self.element.removeData(self.widgetName)
			.removeData("originalStyle")
			.removeData("originalContent");
			//end
			
			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option
		},

		_slide: function (event, index, newVal) {
			var self = this,
				o = self.options,
				minRange = o.minRange,
				newValue = newVal,
				values;

			if (o.range) {
				values = self.values();
				if (index === 0 && values[1] - minRange < newVal) {
					newValue = values[1] - minRange;
				} else if (index === 1 && values[0] + minRange > newVal) {
					newValue = values[0] + minRange;
				}
			}

			$.ui.slider.prototype._slide.call(self, event, index, newValue);
		},

		_getDecreBtn: function () {
			var decreBtn = this.element.parent().find(".wijmo-wijslider-decbutton");
			return decreBtn;
		},

		_getIncreBtn: function () {
			var increBtn = this.element.parent().find(".wijmo-wijslider-incbutton");
			return increBtn;
		},

		_attachClass: function () {
			this._getDecreBtn().addClass("ui-corner-all ui-state-default")
			.attr("role", "button");
			this._getIncreBtn().addClass("ui-corner-all ui-state-default")
			.attr("role", "button");

			this.element.parent().attr("role", "slider")
			.attr("aria-valuemin", this.options.min)
			.attr("aria-valuenow", "0")
			.attr("aria-valuemax", this.options.max);

			if (this.options.orientation === "horizontal") {
				this.element.parent().addClass("wijmo-wijslider-horizontal");
				this._getDecreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-w");
				this._getIncreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-e");
			} else {
				this.element.parent().addClass("wijmo-wijslider-vertical");
				this._getDecreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-n");
				this._getIncreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-s");
			}
		},

		_bindEvents: function () {
			var self = this, decreBtn, increBtn;
			decreBtn = this._getDecreBtn();
			increBtn = this._getIncreBtn();
			//
			decreBtn.bind('click.' + self.widgetName, self, self._decreBtnClick);
			increBtn.bind('click.' + self.widgetName, self, self._increBtnClick);
			//
			decreBtn.bind('mouseover.' + self.widgetName, self, self._decreBtnMouseOver);
			decreBtn.bind('mouseout.' + self.widgetName, self, self._decreBtnMouseOut);
			decreBtn.bind('mousedown.' + self.widgetName, self, self._decreBtnMouseDown);
			decreBtn.bind('mouseup.' + self.widgetName, self, self._decreBtnMouseUp);

			increBtn.bind('mouseover.' + self.widgetName, self, self._increBtnMouseOver);
			increBtn.bind('mouseout.' + self.widgetName, self, self._increBtnMouseOut);
			increBtn.bind('mousedown.' + self.widgetName, self, self._increBtnMouseDown);
			increBtn.bind('mouseup.' + self.widgetName, self, self._increBtnMouseUp);
		},

		_decreBtnMouseOver: function (e) {
			var self = e.data, data, decreBtn;
			
			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseOver', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.addClass("ui-state-hover");
		},

		_increBtnMouseOver: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseOver', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.addClass("ui-state-hover");
		},

		_decreBtnMouseOut: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseOut', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.removeClass("ui-state-hover ui-state-active");
		},

		_increBtnMouseOut: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseOut', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.removeClass("ui-state-hover ui-state-active");
		},

		_decreBtnMouseDown: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseDown', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.addClass("ui-state-active");

			//if the mouse release util the mouse out, the track still take effect.
			//added by wuhao 2011/7/16
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: decreBtn
			}, self._documentMouseUp);

			if (self._intervalID !== null) {
				window.clearInterval(self._intervalID);
				self._intervalID = null;
			}
			//end for mouse release

			self._intervalID = window.setInterval(function () {
				self._decreBtnHandle(self);
			}, 200);

		},

		_documentMouseUp: function (e) {
			var self = e.data.self, ele = e.data.ele;
			if (self.options.disabled) {
				return;
			}

			ele.removeClass("ui-state-active");

			if (self._intervalID !== null) {
				window.clearInterval(self._intervalID);
				self._intervalID = null;
			}

			$(document).unbind("mouseup." + self.widgetName, self._documentMouseUp);
		},

		_intervalID: null,
		_increBtnMouseDown: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseDown', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.addClass("ui-state-active");

			//if the mouse release util the mouse out, the track still take effect.
			//added by wuhao 2011/7/16
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: increBtn
			}, self._documentMouseUp);

			if (self._intervalID !== null) {
				window.clearInterval(self._intervalID);
				self._intervalID = null;
			}
			//end for mouse release

			self._intervalID = window.setInterval(function () {
				self._increBtnHandle(self);
			}, 200);
		},

		_decreBtnMouseUp: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseUp', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.removeClass("ui-state-active");

			window.clearInterval(self._intervalID);
		},

		_increBtnMouseUp: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabled) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseUp', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.removeClass("ui-state-active");

			window.clearInterval(self._intervalID);
		},

		_decreBtnHandle: function (sender) {
			if (sender.options.orientation === "horizontal") {
				sender._decre();
			} else {
				sender._incre();
			}
		},

		_decreBtnClick: function (e) {
			var self = e.data, data;

			if (self.options.disabled) {
				return;
			}
			
			//note: step1: slide the slider btn, the change event has fired;
			//step2: then click the decre button, the change event don't fired.
			self._mouseSliding = false;
			//end
			self._decreBtnHandle(self);
			data = { buttonType: "decreButton", value: self.value() };
			self._trigger('buttonClick', e, data);
		},

		_increBtnHandle: function (sender) {
			if (sender.options.orientation === "horizontal") {
				sender._incre();
			} else {
				sender._decre();
			}
		},

		_increBtnClick: function (e) {
			var self = e.data, data;

			if (self.options.disabled) {
				return;
			}
			//note: step1: slide the slider btn, the change event has fired;
			//step2: then click the decre button, the change event don't fired.
			self._mouseSliding = false;
			//end
			self._increBtnHandle(self);
			data = { buttonType: "increButton", value: self.value() };
			self._trigger('buttonClick', e, data);
		},

		_decre: function () {
			var curVal = this.value();
			//
			if (!this.options.range && !this.options.values) {
				curVal = this.value();
				if (curVal <= this.options.min) {
					this.value(this.options.min);
				} else {
					this.value(curVal - this.options.step);
				}
			} else {
				curVal = this.values(0);
				if (curVal <= this.options.min) {
					this.values(0, this.options.min);
				} else {
					this.values(0, curVal - this.options.step);
				}
			}
			//
			this.element.parent()
			.attr("aria-valuenow", this.value());
		},

		_incre: function () {
			var curVal = this.value();
			//
			if (!this.options.range && !this.options.values) {
				curVal = this.value();
				if (curVal >= this.options.max) {
					this.value(this.options.max);
				} else {
					this.value(curVal + this.options.step);
				}
			} else {
				curVal = this.values(1);
				if (curVal >= this.options.max) {
					this.values(1, this.options.max);
				} else {
					this.values(1, curVal + this.options.step);
				}
			}
			//
			this.element.parent()
			.attr("aria-valuenow", this.value());

		},

		_mouseInit: function () {
			var self = this;
			if (this.options.dragFill) {
				this._preventClickEvent = false;
				//update for unbind by wh at 2011/11/11
				//this.element.bind('click', function (event) {
				this.element.bind('click.' + self.widgetName, function (event) {
				//end for unbind
					if (self._dragFillStart > 0) {
						self._dragFillStart = 0;
					} else {
						$.ui.slider.prototype._mouseCapture.apply(self, arguments);
					}
				});
			}
			$.ui.mouse.prototype._mouseInit.apply(this, arguments);
		},

		_mouseCapture: function (event) {
			this.element.parent()
			.attr("aria-valuenow", this.value());
			//
			if (this.options.dragFill) {
				if (event.target.className === "ui-slider-range ui-widget-header") {
					this.elementSize = {
						width: this.element.outerWidth(),
						height: this.element.outerHeight()
					};
					this.elementOffset = this.element.offset();
					return true;
				} else {
					return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
				}
			} else {
				return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
			}
		},

		_dragFillTarget: false,
		_dragFillStart: 0,
		_rangeValue: 0,
		_oldValue1: 0,
		_oldValue2: 0,
		_oldX: 0,
		_oldY: 0,

		_mouseStart: function (event) {
			if (this.options.dragFill) {
				if (event.target) {
					if (event.target.className === "ui-slider-range ui-widget-header") {
						this._dragFillTarget = true;
						this._rangeValue = this.values(1) - this.values(0);
						this._oldValue1 = this.values(0);
						this._oldValue2 = this.values(1);
						this._oldX = event.pageX;
						this._oldY = event.pageY;

						return true;
					}
				}
				this._dragFillTarget = false;
			}
			return true;
		},

		_mouseDrag: function (event) {
			var distance, eleLength, movValue, v, v0, v1;
			if (this.options.dragFill) {
				distance = event.pageX - this._oldX;
				//var position = { x: event.pageX, y: event.pageY };
				//var movValue = this._normValueFromMouse(position);
				eleLength = this.element.outerWidth();
				if (this.options.orientation === "vertical") {
					eleLength = this.element.outerHeight();
					distance = -(event.pageY - this._oldY);
				}
				movValue = (this.options.max - this.options.min) / eleLength * distance;
				//document.title = distanceX + "|" + movValue;

				if (this._dragFillTarget) {
					if (this.options.orientation === "vertical") {
						$(document.documentElement).css("cursor", "s-resize");
					} else {
						$(document.documentElement).css("cursor", "w-resize");
					}
					if (this._dragFillStart > 0) {
						v = this._rangeValue;
						/* if (normValue + v >= this.options.max) {
						this.values(0, this.options.max - v);
						this.values(1, this.options.max);
						}
						else {
						}*/
						this.values(0, this._oldValue1 + movValue);
						this.values(1, this._oldValue1 + movValue + v);
						v0 = this.values(0);
						v1 = this.values(1);
						if (v0 + v > this.options.max) {
							this.values(0, this.options.max - v);
						}
						if (v1 - v < this.options.min) {
							this.values(1, this.options.min + v);
						}
					}
					this._dragFillStart++;
					return false;
				} else {
					return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
				}
			} else {
				return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
			}
		},

		_mouseStop: function (event) {
			var returnVal = $.ui.slider.prototype._mouseStop.apply(this, arguments);
			if (this.options.dragFill) {
				$(document.documentElement).css("cursor", "default");
				window.setTimeout(function () {
					this._dragFillTarget = false;
					this._dragFillStart = 0;
				}, 500);
			}
			return returnVal;
		}
	});
} (jQuery));

/*globals window,document,jQuery*/
/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Splitter widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.resizable.js
*	jquery.ui.mouse.js
*	jquery.wijmo.wijutil.js
*
*/
(function ($) {
	"use strict";
	var splitterCssPrefix = "wijmo-wijsplitter-",
		wrapperCss = splitterCssPrefix + "wrapper",
		hSplitterCss = splitterCssPrefix + "horizontal",
		vSplitterCss = splitterCssPrefix + "vertical",
		hSplitterCssPrefix = splitterCssPrefix + "h-",
		vSplitterCssPrefix = splitterCssPrefix + "v-",
		contentCssSuffix = "-content",
		pnl1Css = "panel1",
		pnl2Css = "panel2",
		pnl1ContentCss = pnl1Css + contentCssSuffix,
		pnl2ContentCss = pnl2Css + contentCssSuffix,
		barCss = "bar",
		expanderCss = "expander",
		widgetHeaderCss = "ui-widget-header",
		widgetContentCss = "ui-widget-content",
		stateDefaultCss = "ui-state-default",
		stateHoverCss = "ui-state-hover",
		stateActiveCss = "ui-state-active",
		cornerCssPrefix = "ui-corner-",
		iconCss = "ui-icon",
		arrowCssPrefix = "ui-icon-triangle-1-",
		collapsedCss = "collapsed",
		expandedCss = "expanded",
		resizeHelperCss = "resize-helper";

	$.widget("wijmo.wijsplitter", {
		options: {
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called at client side when dragging the splitter.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the sizing event:
			/// $("#element").wijsplitter({ sizing: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittersizing", function () { });
			/// </summary>
			sizing: null,
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called at client side when finish dragging the splitter.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the sized event:
			/// $("#element").wijsplitter({ sized: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittersized", function () { });
			/// </summary>
			sized: null,
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called before panel1 is expanded out.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the expand event:
			/// $("#element").wijsplitter({ expand: function () { return false; } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplitterexpand", function () { return false; });
			/// </summary>
			expand: null,
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called before panel1 is collapsed.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the collapse event:
			/// $("#element").wijsplitter({ collapse: function () { return false; } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittercollapse", function () { return false; });
			/// </summary>
			collapse: null,
			/// <summary>
			/// Gets or sets the javascript function name that would be called 
			/// when panel1 is expanded out by clicking the collapse/expand image.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the expanded event:
			/// $("#element").wijsplitter({ expanded: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplitterexpanded", function () { });
			/// </summary>
			expanded: null,
			/// <summary>
			/// Gets or sets the javascript function name that would be called 
			/// when panel1 is collapsed by clicking the collapse/expand image.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the collapsed event:
			/// $("#element").wijsplitter({ collapsed: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittercollapsed", function () { });
			/// </summary>
			collapsed: null,
			/// <summary>
			/// A value indicates the z-index of Splitter bar.
			/// Default: -1.
			/// Type: Number.
			/// </summary>
			barZIndex: -1,
			/// <summary>
			/// A value determines whether the expander of Splitter
			/// is allowed to be shown.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showExpander: true,
			///	<summary>
			///	A value indicates the location of the splitter, in pixels,
			/// from the left or top edge of the splitter.
			/// Default: 100.
			/// Type: Number.
			///	</summary>
			splitterDistance: 100,
			///	<summary>
			///	A value indicating the horizontal or vertical orientation
			/// of the splitter panels.
			/// Default: 'vertical'.
			/// Type: String.
			///	</summary>
			orientation: 'vertical',
			///	<summary>
			///	A value that indicates whether or not the control is full of document. 
			/// Default: false.
			/// Type: Boolean.
			///	</summary>
			fullSplit: false,
			///	<summary>
			///	A value defines the animation while the bar of splitter 
			/// is beeing dragged.
			/// Default: {}.
			/// Type: Object.
			///	</summary>
			resizeSettings: {
				animationOptions: {
					///	<summary>
					///	Define how long (in milliseconds) the animation of 
					/// the sliding will run.
					/// Default: 100.
					/// Type: Number.
					///	</summary>
					duration: 100,
					///	<summary>
					///	The easing that is applied to the animation.
					/// Default: 'swing'.
					/// Type: String.
					///	</summary>
					easing: "swing",
					///	<summary>
					///	A value that determines whether use the animation. 
					/// Default: false.
					/// Type: Boolean.
					///	</summary>
					disabled: false
				},
				///	<summary>
				///	A value that determines whether an outline of 
				/// the element is sized.
				/// Default: false.
				/// Type: Boolean.
				///	</summary>
				ghost: false
			},
			///	<summary>
			///	Defines the information for top or left panel of splitter.
			/// Default: {}.
			/// Type: Object.
			///	</summary>
			panel1: {
				///	<summary>
				///	Gets or sets the minimum distance in pixels when 
				/// resizing the splitter. 
				/// Default: 1.
				/// Type: Number.
				///	</summary>
				minSize: 1,
				///	<summary>
				///	A value determining whether splitter panel is 
				/// collapsed or expanded. 
				/// Default: false.
				/// Type: Boolean.
				///	</summary>
				collapsed: false,
				///	<summary>
				///	Gets or sets the type of scroll bars to display 
				/// for splitter panel.
				/// Default: 'auto'.
				/// Type: String.
				///	</summary>
				scrollBars: "auto"
			},
			///	<summary>
			///	Defines the information for bottom or right panel of splitter.
			/// Default: {}.
			/// Type: Object.
			///	</summary>
			panel2: {
				///	<summary>
				///	Gets or sets the minimum distance in pixels when 
				/// resizing the splitter.
				/// Default: 1.
				/// Type: Number.
				///	</summary>
				minSize: 1,
				///	<summary>
				///	Gets or sets a value determining whether splitter 
				/// panel is collapsed or expanded. 
				/// Default: false.
				/// Type: Boolean.
				///	</summary>
				collapsed: false,
				///	<summary>
				///	Gets or sets the type of scroll bars to display for splitter panel.
				/// Default: 'auto'.
				/// Type: String.
				///	</summary>
				scrollBars: "auto"
			}
		},

		_setOption: function (key, value) {
			var self = this,
				o = self.options,
				oldValue = $.extend({}, o[key]);

			if (key === "fullSplit") {
				self._setFullSplit(value);
			} else if ($.isPlainObject(o[key])) {
				if (key === "panel1" &&
					value.collapsed !== undefined) {
					//if(value.collapsed�� { o.panel2.collapsed = false; }
					self._setPanel1Collapsed(value.collapsed);
				} else if (key === "panel2" &&
					value.collapsed !== undefined) {
					//if(value.collapsed�� { o.panel1.collapsed = false; }
					self._setPanel2Collapsed(value.collapsed);
				}
				o[key] = $.extend(true, o[key], value);

				return;
			}

			$.Widget.prototype._setOption.apply(self, arguments);

			if (oldValue !== value) {
				if (key === "orientation") {
					self.refresh();
				} else if (key === "fullSplit") {
					self.refresh(true, false);
				} else if (key === "splitterDistance") {
					self.refresh(false, false);
					self._trigger("sized");
				}
			}

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
		},

		_create: function () {
			var self = this,
				element = self.element,
				o = self.options;

			self._fields = {
				width: element.width(),
				height: element.height()
			};

			if (o.fullSplit) {
				self._setFullSplit(true);
			}

			self._splitterify();
			self._updateElementsCss();
			self._updateElements();
			self._bindEvents();
			self._initResizer();

			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option

			self._trigger("load", null, self);
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			//Change your outerelement here
				ele = outerEle ? outerEle : self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
				.addClass("ui-disabled")
				.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},

		destroy: function () {
			var self = this,
				element = self.element,
				fields = self._fields,
				wrapper = fields.wrapper,
				expander = fields.expander,
				bar = fields.bar,
				panel1 = fields.panel1,
				originalStyle = fields.originalStyle,
				widgetName = self.widgetName,
				oriPnl1Content = fields.oriPnl1Content,
				oriPnl2Content = fields.oriPnl2Content,
				oriPnl1ContentStyle = fields.oriPnl1ContentStyle,
				oriPnl2ContentStyle = fields.oriPnl2ContentStyle;

			if (panel1 && panel1.is(":ui-resizable")) {
				panel1.resizable('destroy');
			}

			if (oriPnl1Content) {
				oriPnl1Content.removeClass(vSplitterCssPrefix + pnl1ContentCss +
				" " + hSplitterCssPrefix + pnl1ContentCss +
				" " + widgetContentCss);

				if (oriPnl1ContentStyle === undefined) {
					oriPnl1Content.removeAttr("style");
				} else {
					oriPnl1Content.attr("style", oriPnl1ContentStyle);
				}

				oriPnl1Content.appendTo(element);
			}

			if (oriPnl2Content) {
				oriPnl2Content.removeClass(vSplitterCssPrefix + pnl2ContentCss +
				" " + hSplitterCssPrefix + pnl2ContentCss +
				" " + widgetContentCss);

				if (oriPnl2ContentStyle === undefined) {
					oriPnl2Content.removeAttr("style");
				} else {
					oriPnl2Content.attr("style", oriPnl2ContentStyle);
				}

				oriPnl2Content.appendTo(element);
			}

			panel1.unbind('.' + widgetName);
			expander.unbind('.' + widgetName);
			bar.unbind('.' + widgetName);
			$(window).unbind('.' + widgetName);

			wrapper.remove();
			element.removeClass(vSplitterCss + " " + hSplitterCss);

			if (originalStyle === undefined) {
				element.removeAttr("style");
			} else {
				element.attr("style", originalStyle);
			}

			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}

			self._fields = null;
		},

		refresh: function (size, state) {
			/// <summary>
			/// Forces the widget to recreate the splitter.
			/// </summary>
			/// <param name="size" type="Boolean">
			/// A boolean value to indicate whether the refresh is triggered
			/// because the size of widget is changed.
			/// </param>
			/// <param name="state" type="Boolean">
			/// A boolean value to indicate whether the refresh is triggered 
			/// because the state of expander is changed(expanded/collapsed).
			/// </param>
			var self = this,
				fields = self._fields,
				panel1 = fields.panel1;

			if (fields._isResizing) {
				return;
			}

			if (state || state === undefined) {
				self._updateElementsCss();
			}

			self._updateElements();

			if (size || size === undefined) {
				if (panel1 && panel1.is(":ui-resizable")) {
					panel1.resizable('destroy');
				}

				self._initResizer();
			}
		},

		_splitterify: function () {
			var self = this,
				element = self.element,
				o = self.options,
				fields = self._fields,
				wrapper, pnl1, pnl2, pnl1Content, pnl2Content,
				bar, expander, icon;

			pnl1Content = element.find(">div:eq(0)");
			pnl2Content = element.find(">div:eq(1)");
			fields.originalStyle = element.attr("style");

			//create wrapper
			wrapper = $("<div></div>").appendTo(element);

			//create panel1
			pnl1 = $("<div></div>").appendTo(wrapper);

			//create panel1 content if needed.
			if (pnl1Content.length === 0) {
				pnl1Content = $("<div></div>");
			} else {
				fields.oriPnl1Content = pnl1Content;
				fields.oriPnl1ContentStyle = pnl1Content.attr("style");
			}

			pnl1Content.appendTo(pnl1);

			//create bar.
			bar = $("<div></div>").appendTo(wrapper);

			if (o.barZIndex !== -1) {
				bar.css("z-index", o.barZIndex);
			}

			//create expander.
			expander = $("<div></div>").appendTo(bar)
					.attr("role", "button");

			//create icon.
			icon = $("<span></span>").appendTo(expander);

			//create panel2
			pnl2 = $("<div></div>").appendTo(wrapper);

			//create panel2 content if needed.
			if (pnl2Content.length === 0) {
				pnl2Content = $("<div></div>");
			} else {
				fields.oriPnl2Content = pnl2Content;
				fields.oriPnl2ContentStyle = pnl2Content.attr("style");
			}

			pnl2Content.appendTo(pnl2);

			fields.wrapper = wrapper;
			fields.panel1 = pnl1;
			fields.pnl1Content = pnl1Content;
			fields.panel2 = pnl2;
			fields.pnl2Content = pnl2Content;
			fields.bar = bar;
			fields.expander = expander;
			fields.icon = icon;
		},

		_updateElementsCss: function () {
			var self = this,
				element = self.element,
				o = self.options,
				isVertical = o.orientation === "vertical",
				fields = self._fields,
				wrapper = fields.wrapper,
				pnl1 = fields.panel1,
				pnl2 = fields.panel2,
				pnl1Content = fields.pnl1Content,
				pnl2Content = fields.pnl2Content,
				bar = fields.bar,
				expander = fields.expander,
				icon = fields.icon;

			//add class to the outmost markup.
			//add comments by RyanWu@20110817.
			//For fixing the issue#16391.
			//			element.removeClass(vSplitterCss + " " + hSplitterCss +
			//				" " + vSplitterCssPrefix + expandedCss +
			//				" " + vSplitterCssPrefix + collapsedCss +
			//				" " + hSplitterCssPrefix + expandedCss +
			//				" " + hSplitterCssPrefix + collapsedCss)
			//				.addClass(isVertical ? vSplitterCss : hSplitterCss);
			element.removeClass(vSplitterCss + " " + hSplitterCss)
				.addClass(isVertical ? vSplitterCss : hSplitterCss);
			//end by RyanWu@20110817.

			//add class to wrapper
			wrapper.attr("class", wrapperCss);

			//add class to panel1
			pnl1.removeClass(vSplitterCssPrefix + pnl1Css + " " +
					hSplitterCssPrefix + pnl1Css)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + pnl1Css);

			//add class to panel1 content.
			pnl1Content.removeClass(vSplitterCssPrefix + pnl1ContentCss +
				" " + hSplitterCssPrefix + pnl1ContentCss +
				" " + widgetContentCss)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + pnl1ContentCss + " " + widgetContentCss);

			//add class to bar.
			bar.attr("class", (isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + barCss + " " + widgetHeaderCss)
				.css("width", "").css("height", "");

			//add class to expander.
			expander.attr("class", cornerCssPrefix + (isVertical ?
					"bl " + vSplitterCssPrefix : "tr " + hSplitterCssPrefix) +
					expanderCss + " " + stateDefaultCss)
				.css("left", "").css("top", "");

			//add class to icon.
			icon.attr("class", iconCss + " " + arrowCssPrefix +
					(isVertical ? "w" : "n"));

			//add class to panel2
			pnl2.removeClass(vSplitterCssPrefix + pnl2Css + " " +
					hSplitterCssPrefix + pnl2Css)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + pnl2Css);

			//add class to panel2 content.
			pnl2Content.removeClass(vSplitterCssPrefix + pnl1ContentCss +
				" " + hSplitterCssPrefix + pnl1ContentCss +
				" " + widgetContentCss)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + pnl2ContentCss + " " + widgetContentCss);

			// if panel1.collapsed = true, then we need update 
			// the expander icon's css.
			self._updateExpanderCss();
		},

		_updateExpanderCss: function () {
			var self = this,
				o = self.options,
			//element = self.element,
				fields = self._fields,
				expander = fields.expander,
				icon = fields.icon,
				isVertical = o.orientation === "vertical",
				cssPrefix = isVertical ? vSplitterCssPrefix : hSplitterCssPrefix,
				collapsedExpCorner1Css = isVertical ? "tr" : "bl",
				collapsedExpCorner2Css = "br",
				collapsedIconCss = isVertical ? "e" : "s",
				expandedExpCorner1Css = isVertical ? "bl" : "tr",
				expandedExpCorner2Css = "tl",
				expandedIconCss = isVertical ? "w" : "n";

			//			element.removeClass(cssPrefix + expandedCss +
			//				" " + cssPrefix + collapsedCss);

			expander.removeClass(cssPrefix + expandedCss +
				" " + cssPrefix + collapsedCss +
				" " + cornerCssPrefix + collapsedExpCorner1Css +
				" " + cornerCssPrefix + collapsedExpCorner2Css +
				" " + cornerCssPrefix + expandedExpCorner1Css +
				" " + cornerCssPrefix + expandedExpCorner2Css);

			icon.removeClass(arrowCssPrefix + collapsedIconCss +
				" " + arrowCssPrefix + expandedIconCss);

			if (o.panel1.collapsed) {
				//element.addClass(cssPrefix + collapsedCss);
				expander.addClass(cornerCssPrefix + collapsedExpCorner1Css +
					" " + cornerCssPrefix + collapsedExpCorner2Css +
					" " + cssPrefix + collapsedCss);
				icon.addClass(arrowCssPrefix + collapsedIconCss);
			} else {
				//element.addClass(cssPrefix + expandedCss);
				expander.addClass(cornerCssPrefix + expandedExpCorner1Css +
					" " + cornerCssPrefix + expandedExpCorner2Css +
					" " + cssPrefix + expandedCss);
				icon.addClass(arrowCssPrefix + expandedIconCss);
			}
		},

		_updateElements: function () {
			var self = this,
				element = self.element,
				o = self.options,
				distance = o.splitterDistance,
				fields = self._fields,
				wrapper = fields.wrapper,
				pnl1 = fields.panel1,
				pnl1Content = fields.pnl1Content,
				pnl2 = fields.panel2,
				pnl2Content = fields.pnl2Content,
				bar = fields.bar,
				expander = fields.expander,
				width = element.width(),
				height = element.height(),
				barW, barH;

			wrapper.height(height);
			self._setPanelsScrollMode();

			if (o.orientation === "vertical") {
				barW = bar.outerWidth(true);

				if (distance > width - barW) {
					distance = width - barW;
				}

				wrapper.width(width * 2);

				if (o.panel2.collapsed && !o.panel1.collapsed) {
					distance = width - barW;
				}

				//todo: missing logic of both collapse equals "true".
				if (o.panel1.collapsed) {
					//element.addClass(vSplitterCssPrefix + collapsedCss);
					expander.addClass(vSplitterCssPrefix + collapsedCss);
					pnl1.css("display", "none");
					pnl2.css("display", "");				
					distance = 0;
				} else {
					//element.addClass(vSplitterCssPrefix + expandedCss);
					expander.addClass(vSplitterCssPrefix + expandedCss);
					pnl1.css("display", "");
					pnl2.css("display", o.panel2.collapsed ? "none" : "");
				}

				pnl1.height(height).width(distance);
				pnl1Content.outerHeight(height, true);
				bar.outerHeight(height, true);
				pnl2.height(height).width(width - distance - barW);
				pnl2Content.outerHeight(height, true);

				expander.css("cursor", "pointer")
					.css("top", height / 2 - expander.outerHeight(true) / 2);
			} else {
				barH = bar.outerHeight(true);

				if (distance > height - barH) {
					distance = height - barH;
				}

				if (o.panel2.collapsed && !o.panel1.collapsed) {
					distance = height - barH;
				}

				pnl1Content.outerHeight(distance, true);

				if (o.panel1.collapsed) {
					//element.addClass(hSplitterCssPrefix + collapsedCss);
					expander.addClass(hSplitterCssPrefix + collapsedCss);
					pnl1.css("display", "none");
					pnl2.css("display", "");
					distance = 0;
				} else {
					//element.addClass(hSplitterCssPrefix + expandedCss);
					expander.addClass(hSplitterCssPrefix + expandedCss);
					pnl1.css("display", "");
					pnl2.css("display", o.panel2.collapsed ? "none" : "");
				}

				pnl2Content.outerHeight(height - distance - barH, true);

				pnl1.width(width).height(distance);
				pnl2.width(width).height(height - distance - barH);

				expander.css("cursor", "pointer")
					.css("left", width / 2 - expander.outerWidth(true) / 2);
			}

			expander.css("display", o.showExpander ? "" : "none");
		},

		_setFullSplit: function (value) {
			var self = this,
				fields = self._fields,
				width = value ? "100%" : fields.width,
				height = value ? "100%" : fields.height;

			self.element.css("width", width).css("height", height);
		},

		_setPanel1Collapsed: function (collapsed, e) {
			var self = this,
				o = self.options,
				oldCollapsed = o.panel1.collapsed;

			if (oldCollapsed === collapsed) {
				return;
			}

			if (!self._trigger(oldCollapsed ? "expand" : "collapse", e, null)) {
				return;
			}

			o.panel1.collapsed = collapsed;

			if (collapsed) {
				o.panel2.collapsed = false;
			} else {
				$(".ui-resizable-handle", self.element).show();
			}

			self._updateElements();
			self._updateExpanderCss();
			self._trigger(collapsed ? "collapsed" : "expanded", e, null);
		},

		_setPanel2Collapsed: function (collapsed) {
			var self = this,
				o = self.options,
				oldCollapsed = o.panel2.collapsed,
				resizableHandle = $(".ui-resizable-handle", self.element);

			if (oldCollapsed === collapsed) {
				return;
			}

			o.panel2.collapsed = collapsed;

			if (collapsed) {
				o.panel1.collapsed = false;
				resizableHandle.hide();
			} else {
				resizableHandle.show();
			}

			self._updateElements();
		},

		_bindEvents: function () {
			var self = this,
				o = self.options,
				fields = self._fields,
				bar = fields.bar,
				expander = fields.expander,
				panel1 = fields.panel1,
				widgetName = self.widgetName;

			expander.bind("mouseover." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				expander.addClass(stateHoverCss);
			})
			.bind("mouseout." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				expander.removeClass(stateHoverCss).removeClass(stateActiveCss);
			})
			.bind("mousedown." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				expander.addClass(stateActiveCss);
			})
			.bind("mouseup." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}

				expander.removeClass(stateActiveCss);

				if (o.panel2.collapsed) {
					self._setPanel2Collapsed(!o.panel2.collapsed);
					return;
				}

				self._setPanel1Collapsed(!o.panel1.collapsed, e);
			});

			bar.bind("mouseover." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.addClass(stateHoverCss);
			})
			.bind("mouseout." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.removeClass(stateHoverCss);
			});

			panel1.bind("animating." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				self._adjustLayout(self);
				self._trigger("sizing", e, null);
			})
			.bind("animated." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				self._adjustLayout(self);
				self._trigger("sized", e, null);
			});

			$(".ui-resizable-handle", self.element)
			.live("mouseover." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.addClass(stateHoverCss);
			})
			.live("mouseout." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.removeClass(stateHoverCss);
			});

			$(window).bind("resize." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				if (o.fullSplit) {
					//self.refresh();
					self._updateElements();
					self._initResizer();
				}
			});
		},

		_initResizer: function () {
			var self = this,
				element = self.element,
				o = self.options,
				fields = self._fields,
				bar = fields.bar,
				panel1 = fields.panel1,
				resizeSettings = o.resizeSettings,
				animation = resizeSettings.animationOptions,
				duration = animation.disabled ? 0 : animation.duration,
				width = element.width(),
				height = element.height(),
				barW, maxW, minW, barH, maxH, minH,
				resizableHandle;

			if (o.orientation === "vertical") {
				barW = bar.outerWidth(true);
				maxW = width - barW - o.panel2.minSize;
				minW = o.panel1.minSize;

				if (minW < 2) {
					minW = 2;
				}

				panel1.resizable({
					wijanimate: true,
					minWidth: minW,
					maxWidth: maxW,
					handles: 'e',
					helper: vSplitterCssPrefix + resizeHelperCss,
					animateDuration: duration,
					animateEasing: animation.easing,
					ghost: resizeSettings.ghost,
					start: function () {
						fields._isResizing = true;
					},
					stop: function () {
						fields._isResizing = false;
					}
				});
			} else {
				barH = bar.outerHeight(true);
				maxH = height - barH - o.panel2.minSize;
				minH = o.panel1.minSize;

				if (minH < 2) {
					minH = 2;
				}

				panel1.resizable({
					wijanimate: true,
					minHeight: minH,
					maxHeight: maxH,
					handles: 's',
					helper: hSplitterCssPrefix + resizeHelperCss,
					animateDuration: duration,
					animateEasing: animation.easing,
					ghost: resizeSettings.ghost,
					start: function () {
						fields._isResizing = true;
					},
					stop: function () {
						fields._isResizing = false;
					}
				});
			}

			resizableHandle = $(".ui-resizable-handle", element);
			if (o.panel2.collapsed) {
				resizableHandle.hide();
			} else {
				resizableHandle.show();
			}

			if ($.browser.msie && ($.browser.version < 7)) {
				if (o.orientation === "vertical") {
					resizableHandle.height(element.height());
				}
			}
		},

		_adjustLayout: function (self) {
			var o = self.options,
				fields = self._fields,
				panel1 = fields.panel1,
				distance = o.orientation === "vertical" ?
					panel1.width() : panel1.height();

			if (o.splitterDistance === distance) {
				return;
			}

			o.splitterDistance = distance;
			self._updateElements();
		},

		_setPanelsScrollMode: function () {
			var self = this,
				fields = self._fields,
				o = self.options,
				pnlScrollBars = [o.panel1.scrollBars, o.panel2.scrollBars];

			$.each([fields.pnl1Content, fields.pnl2Content], function (idx, pnlContent) {
				if (pnlScrollBars[idx] === "auto") {
					pnlContent.css("overflow", "auto");
				} else if (pnlScrollBars[idx] === "both") {
					pnlContent.css("overflow", "scroll");
				} else if (pnlScrollBars[idx] === "none") {
					pnlContent.css("overflow", "hidden");
				} else if (pnlScrollBars[idx] === "horizontal") {
					pnlContent.css("overflow-x", "scroll").css("overflow-y", "hidden");
				} else if (pnlScrollBars[idx] === "vertical") {
					pnlContent.css("overflow-x", "hidden").css("overflow-y", "scroll");
				}
			});
		}
		//end of Splitter implementations.
	});
} (jQuery));

(function ($) {
	"use strict";
	$.ui.plugin.add("resizable", "wijanimate", {
		stop: function (event, ui) {
			var self = $(this).data("resizable"), 
				o = self.options, 
				element = self.element, 
				pr = self._proportionallyResizeElements, 
				ista = pr.length && (/textarea/i).test(pr[0].nodeName), 
				soffseth = ista && $.ui.hasScroll(pr[0], 'left') ?
							 0 : self.sizeDiff.height,
				soffsetw = ista ? 0 : self.sizeDiff.width, 
				style, left, top;

			element.css("width", self.originalSize.width)
				.css("height", self.originalSize.height);

			style = { width: (self.size.width - soffsetw), 
					height: (self.size.height - soffseth) };
			left = (parseInt(element.css('left'), 10) + 
					(self.position.left - self.originalPosition.left)) || null;
			top = (parseInt(element.css('top'), 10) + 
					(self.position.top - self.originalPosition.top)) || null;

			element.animate($.extend(style, top && left ? { 
				top: top,
				left: left 
			} : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function () {
					var data = {
						width: parseInt(element.css('width'), 10),
						height: parseInt(element.css('height'), 10),
						top: parseInt(element.css('top'), 10),
						left: parseInt(element.css('left'), 10)
					};

					if (pr && pr.length) {
						$(pr[0]).css({ width: data.width, height: data.height });
					}

					// propagating resize, and updating values for each animation step
					self._updateCache(data);
					self._propagate("resize", event);
					element.trigger("animating");
				},
				complete: function () {
					element.trigger("animated");
				}
			});
		}
	});
}(jQuery));
/*globals setTimeout jQuery*/

/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
** wijprogressbar Widget. V1.0
*
* Copyright (c) Componentone Inc.
*
* Depends:
*	Jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*Optional dependence for effect settings:
*	jquery.effects.core.js
*	jquery.effects.blind.js
*	jquery.effects.bounce.js
*	jquery.effects.clip.js
*	jquery.effects.drop.js
*	jquery.effects.explode.js
*	jquery.effects.fold.js
*	jquery.effects.hightlight.js
*	jquery.effects.pulsate.js
*	jquery.effects.scale.js
*	jquery.effects.shake.js
*	jquery.effects.slide.js
*	jquery.effects.transfer.js
* HTML:
*  <div id="progressbar" style="width:***;height:***"></div>
*/
(function ($) {
	"use strict";
	var wijpbCss = "wijmo-wijprogressbar",
		pbCss = "ui-progressbar",
		pbLabelCss = pbCss + "-label",
		lblAlignPrefixCss = wijpbCss + "-lb-",
		cornerPrefixCss = "ui-corner-",
		cornerLeftCss = cornerPrefixCss + "left",
		cornerRightCss = cornerPrefixCss + "right",
		cornerTopCss = cornerPrefixCss + "top",
		cornerBottomCss = cornerPrefixCss + "bottom";
	$.widget("wijmo.wijprogressbar", $.ui.progressbar, {
		options: {
			/// <summary>
			///The label's alignment on the progress bar. The value should be "east",
			/// "west", "center", "north", "south" or "running".
			///Default:"center".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','labelAlign','center').
			///</summary>
			labelAlign: "center",
			/// <summary>
			///The value of the progress bar,the type should be numeric.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','value',60).
			///</summary>
			maxValue: 100,
			/// <summary>
			///The minimum value of the progress bar,the type should be numeric.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','minValue',0).
			///</summary>
			minValue: 0,
			/// <summary>
			///The fill direction of the progress bar.the value should be "east", 
			///"west", "north" or "south".
			///Default:"east".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','fillDirection','east').
			///</summary>
			fillDirection: "east",
			/// <summary>
			///The progressbar's orientation.the value should be 'horizontal'
			/// or 'vertical'.
			///Default:"horizontal".
			///Type:String.
			///Code sample:$('selector').wijprogressbar('option','orientation',
			///'horizontal').
			///</summary>
			///orientation: "horizontal",
			/// <summary>
			///Sets the format of the label text.The available formats are as follows:
			///{0} or {ProgressValue} express the current progress Value.
			///{1} or {PercentProgress} express the current percent of the progress bar.
			///{2} or {RemainingProgress} express the remaining progress of the 
			///progress bar.
			///{3} or {PercentageRemaining} express the remaining percent of 
			///the progress bar.
			///{4} or {Min} express the min Vlaue of the progress bar.
			///{5} or {Max} express the max Value of the progress bar.
			///Default:"{1}%".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','labelFormatString'
			///,'{0}%').
			///</summary>
			labelFormatString: "{1}%",
			/// <summary>
			///Set the format of the ToolTip of the progress bar,the expression of the 
			///format like the labelFormatString.
			///Default:"{1}%".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','toolTipFormatString'
			///,'{1}%').
			///</summary>
			toolTipFormatString: "{1}%",
			/// <summary>
			///The increment of the progress bar's indicator.
			///Default:1.
			///Type:Number.
			///</summary>
			///Code sample:$('.selector').wijprogressbar('option',
			///'indicatorIncrement',10).
			indicatorIncrement: 1,
			/// <summary>
			///The Image's url of the indicator.
			///Default:"".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','indicatorImage',
			///'images/abc.png').
			///</summary>
			indicatorImage: "",
			/// <summary>
			///The delay of the progressbar's animation.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option',
			///</summary>
			animationDelay: 0,
			/// <summary>
			///The options parameter of the jQuery's animation.
			///Default:"{animated:'progress', duration:500, disabled:false}".
			///Type:Options.
			///Code sample:$('.selector').wijprogressbar('option','animationOptions',
			///{animated:'progress',duration:600}).
			///</summary>
			animationOptions: {
				disabled: false,
				easing: null,
				duration: 500
			},
			/// <summary>
			/// Fire upon running the progress.
			/// Default: null.
			/// Type: Function
			/// Code example: $(".selector").wijprogressbar("progressChanging", 
			/// function(e, data){})
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object
			/// </param>
			/// <param name="data" type="Object">
			/// data.oldValue: The old value of the progressbar.
			/// data.newValue: The new value of the progressbar.
			///</param>
			/// <returns type="Boolean" >
			/// return false to cancel the event.
			/// </returns>
			progressChanging: null,
			/// <summary>
			/// Fires before running the progress.
			/// Default: null.
			/// Type: Function
			/// Code example: $(".selector").wijprogressbar("beforeProgressChanging",
			/// function(e, data){})
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// data.oldValue: The old value of the progressbar.
			/// data.newValue: The new value of the progressbar.
			/// </param>
			/// <returns type="Boolean">
			/// Return false to cancel the event.
			/// </returns>
			beforeProgressChanging: null,
			/// <summary>
			/// Fires when the progress changes.
			/// Default: null.
			/// Type: Function
			/// Code example: $(".selector").wijprogressbar("progressChanged", 
			/// function(e, data){})
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// data.oldValue: The old value of the progressbar.
			/// data.newValue: The new value of the progressbar.
			/// </param>
			progressChanged: null
		},

		_setOption: function (key, value) {
			var self = this,
				o = self.options,
				val;

			switch (key) {
			case "value":
				o[key] = parseInt(value, 10);
				self._refreshValue();
				return;
			case "maxValue":
				o.max = value;
			case "minValue":
				val = parseInt(value, 10);
				o[key] = val;
				self[key === "maxValue" ? "max" : "min"] = val;
				self._refreshValue(true);
				return;
			case "labelFormatString":
			case "toolTipFormatString":
				o[key] = value;
				self._refreshValue(true);
				return;
			case "fillDirection":
			case "labelAlign":
			case "indicatorImage":
				o[key] = value;
				self._updateElementsCss();
				return;
			default:
				break;
			}

			$.Widget.prototype._setOption.apply(self, arguments);

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
		},

		_create: function () {
			var self = this,
				o = self.options,
				element = self.element;

			self.directions = { east: "left", west: "right",
				north: "bottom", south: "top"
			};
			self.min = o.minValue;
			self.max = o.maxValue;
			element.addClass(wijpbCss);
			$.ui.progressbar.prototype._create.apply(self, arguments);
			self.label = $("<span>")
				.addClass(pbLabelCss).appendTo(element);
			self._updateElementsCss();
			self._isInit = true;
			//Add for support disabled option
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option
			self._refreshValue();
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			//Change your outerelement here
				ele = outerEle ? outerEle : self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>").addClass("ui-disabled")
			.css({
				"z-index": "99999",
				position: "absolute",
				width: disabledWidth,
				height: disabledHeight,
				left: eleOffset.left,
				top: eleOffset.top
			});
		},

		_triggerEvent: function (eventName, oldValue, newValue) {
			return this._trigger(eventName, null, {
				oldValue: oldValue,
				newValue: newValue
			}) === false;
		},

		_refreshValue: function (forced) {
			var self = this,
				o = self.options,
				animationOptions = o.animationOptions,
				element = self.element,
				value, percent, oldValue;

			if (!self._isInit) {
				return;
			}

			oldValue = element.attr("aria-valuenow");
			value = self.value();
			percent = (value - self.min) / (self.max - self.min) * 100;

			if (self._triggerEvent("beforeProgressChanging",
				oldValue, value)) {
				return;
			}

			if (!animationOptions.disabled && animationOptions.duration > 0) {
				setTimeout(function () {
					$.wijmo.wijprogressbar.animations.progress({
						content: self.valueDiv,
						complete: function () {
							self._triggerEvent("progressChanged",
								oldValue, value);
							self._lastStep = percent;
						},
						step: function (ovalue) {
							self._performAnimating(ovalue, forced);
						},
						progressValue: value * 100
					}, animationOptions);
				}, o.animationDelay);
			} else {
				self._refreshProgress(Math.round(percent));
				self._lastStep = percent;
				self._triggerEvent("progressChanged", oldValue, value);
			}
		},

		_refreshProgress: function (percent, curValue) {
			var self = this,
				o = self.options,
				fillDirection = o.fillDirection,
				element = self.element;

			if (curValue === undefined) {
				curValue = $.wijmo.wijprogressbar
				.mul(percent, (self.max - self.min)) / 100 + self.min;
			}

			if (self._triggerEvent("progressChanging",
				element.attr("aria-valuenow"), curValue)) {
				return;
			}

			if (self._isHorizontal()) {
				self.valueDiv.toggleClass(fillDirection === "east" ?
					cornerRightCss : cornerLeftCss, curValue === self.max)
				.width(percent + "%");
			} else {
				self.valueDiv.toggleClass(fillDirection === "south" ?
					cornerBottomCss : cornerTopCss, curValue === self.max)
				.height(percent + "%");
			}

			self.label.html(self._getFormatString(
				o.labelFormatString, percent, curValue));

			element.attr("aria-valuenow", curValue)
				.attr("title", self._getFormatString(
				o.toolTipFormatString, percent, curValue));
		},

		_isHorizontal: function () {
			var fillDirection = this.options.fillDirection;

			return fillDirection === "west" ||
				fillDirection === "east";
		},

		_getRotateTextOffset: function (label) {
			var width, height;

			label.css("width", "auto");

			width = label.outerWidth();
			height = label.outerHeight();

			label.css("width", "");

			return Math.max(width - height - 4, 0);
		},

		_updateElementsCss: function () {
			var self = this,
				o = self.options,
				element = self.element,
				fillDirection = o.fillDirection;

			element.removeClass(wijpbCss + "-west " +
				wijpbCss + "-east " + wijpbCss + "-north " +
				wijpbCss + "-south")
			.addClass(wijpbCss + "-" + fillDirection);

			//pb progress
			self._updateProgressCss();

			//pb label
			self._updateLabelCss();
		},

		_updateLabelCss: function () {
			var self = this,
				o = self.options,
				element = self.element,
				labelAlign = o.labelAlign,
				label = self.label,
				lastStep = self._lastStep,
				height = element.height();

			label.removeClass(lblAlignPrefixCss + "west " +
				lblAlignPrefixCss + "east " +
				lblAlignPrefixCss + "south " +
				lblAlignPrefixCss + "north " +
				lblAlignPrefixCss + "center " +
				lblAlignPrefixCss + "running")
			.addClass(lblAlignPrefixCss + labelAlign)
			.css({
				left: "",
				right: "",
				top: "",
				bottom: "",
				width: "",
				"text-align": "",
				"line-height": ""
			});

			if (labelAlign !== "north" && labelAlign !== "south" &&
				!(labelAlign === "running" && !self._isHorizontal())) {
				label.css("line-height", height + "px");
			}

			if (labelAlign === "running") {
				self._updateRunningLabelCss(lastStep);
			} else if (!self._isHorizontal() && !$.browser.msie) {
				//Add comments by RyanWu@20110325.
				//Because nonIE brownser will rotate the text,
				//I use a hack to set the text-align:right and 
				//width:100%, then rotate it to the north.
				if (labelAlign === "north") {
					label.css("width", "100%")
						.css("text-align", "right");
				} else if (labelAlign === "south") {
					label.css("width", "100%")
						.css("text-align", "left");
				}
				//end by RyanWu@20110325.
			}
		},

		_updateRunningLabelCss: function (step) {
			var self = this,
				o = self.options,
				fillDirection = o.fillDirection,
				element = self.element,
				label = self.label,
				valueDiv = self.valueDiv,
				isHorizontal = self._isHorizontal(),
				pbLen, lblLen, pgLen, pos;

			pbLen = element[isHorizontal ? "width" : "height"]();
			lblLen = label[isHorizontal ? "outerWidth" : "outerHeight"]();
			pgLen = valueDiv[isHorizontal ? "outerWidth" : "outerHeight"]();

			//TODO:
			//Because the text will be rotated, we need calculate 
			//the correct lengh of the rotated text.
			if (!isHorizontal && !$.browser.msie) {
				lblLen += self._getRotateTextOffset(label);
			}

			pos = pbLen === pgLen ? pbLen - lblLen :
						step * pbLen / 100 - lblLen + lblLen *
						(pbLen - pgLen) / pbLen;

			label.css(self.directions[fillDirection], pos);
		},

		_updateProgressCss: function () {
			var self = this,
				o = self.options,
				fillDirection = o.fillDirection,
				indicatorImage = o.indicatorImage,
				valueDiv = self.valueDiv,
				lastStep = self._lastStep;

			if (indicatorImage !== "") {
				valueDiv.css("background", "transparent url(" +
					indicatorImage + ") repeat fixed");
			}

			valueDiv.removeClass(cornerLeftCss + " " +
				cornerRightCss + " " + cornerTopCss + " " +
				cornerBottomCss)
			.addClass(cornerPrefixCss + self.directions[fillDirection]);

			if (lastStep) {
				if (self._isHorizontal()) {
					valueDiv.css("width", lastStep + "%")
					.css("height", "");
				} else {
					valueDiv.css("height", lastStep + "%")
					.css("width", "");
				}
			} else {
				valueDiv.css({
					width: "",
					height: ""
				});
			}
		},

		_performAnimating: function (step, forced) {
			var self = this,
				o = self.options,
				indicatorIncrement = o.indicatorIncrement,
				curValue = step / 100,
				percent = $.wijmo.wijprogressbar.div((curValue - self.min),
					(self.max - self.min)) * 100,
				ln = 0, arrP, base,
				resultPrecision = 2;

			if (indicatorIncrement) {
				arrP = percent.toString().split(".");
				if (arrP.length === 2) {
					ln = arrP[1].length;
					resultPrecision = ln;
				}
				base = Math.pow(10, ln);


				if (indicatorIncrement !== 1) {
					percent = Math.floor(percent * base / indicatorIncrement) *
						indicatorIncrement / base;
				}
				else {
					percent = Math.round(percent);
					resultPrecision = 0;
				}

				self.pointNumber = ln;

				if (self._lastStep === percent && !forced) {
					return;
				}
			}
			//self._lastStep = percent;
			self._refreshProgress(Number(percent.toFixed(resultPrecision)),
				Number(curValue.toFixed(resultPrecision)));

			if (o.labelAlign === "running") {
				self._updateRunningLabelCss(percent);
			}
		},

		_getFormatString: function (format, percent, value) {
			var self = this,
			remainingProgress = self.max - value,
			percentageRemaining = 100 - percent,
			r = /\{0\}/g;

			format = format.replace(r, value.toString());

			r = /\{ProgressValue\}/g;
			format = format.replace(r, value.toString());

			r = /\{1\}/g;
			format = format.replace(r, percent.toString());

			r = /\{PercentProgress\}/g;
			format = format.replace(r, percent.toString());

			r = /\{2\}/g;
			format = format.replace(r, remainingProgress.toString());

			r = /\{RemainingProgress\}/g;
			format = format.replace(r, remainingProgress.toString());

			r = /\{3\}/g;
			format = format.replace(r, percentageRemaining.toString());

			r = /\{PercentageRemaining\}/g;
			format = format.replace(r, percentageRemaining.toString());

			r = /\{4\}/g;
			format = format.replace(r, self.min);

			r = /\{Min\}/g;
			format = format.replace(r, self.min);

			r = /\{5\}/g;
			format = format.replace(r, self.max);

			r = /\{Max\}/g;
			format = format.replace(r, self.max);

			return format;
		},

		destroy: function () {
			var self = this,
				element = self.element;

			element.attr("title", "")
				.removeClass(wijpbCss + " " +
					wijpbCss + "-east " + wijpbCss + "-west " +
					wijpbCss + "-north " + wijpbCss + "-south");

			if (self.label) {
				self.label.remove();
			}

			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option
			$.ui.progressbar.prototype.destroy.apply(this, arguments);
		}
	});

	$.extend($.wijmo.wijprogressbar, {
		animations: {
			progress: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 1000
				}, options, additions);
				options.content.stop(true, true).animate({
					//Because jquery's animation needs an
					//attribute or css style to do the animation,
					//here we use a temporary attribute to
					//do the animation on the value div element.
					pgvalue: options.progressValue
				}, options);
			}
		},
		add: function (arg1, arg2) {
			var r1 = 0,
				r2 = 0, m;
			try {
				r1 = arg1.toString().split(".")[1].length;
			}
			catch (e) { }
			try {
				r2 = arg2.toString().split(".")[1].length;
			}
			catch (e1) { }
			m = Math.pow(10, Math.max(r1, r2));
			return (arg1 * m + arg2 * m) / m;
		},
		mul: function (arg1, arg2) {
			var m = 0,
					s1 = arg1.toString(),
					s2 = arg2.toString();

			try {
				m += s1.split(".")[1].length;
			}
			catch (e) {
			}
			try {
				m += s2.split(".")[1].length;
			}
			catch (e1) {
			}
			return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) /
				Math.pow(10, m);
		},
		div: function (arg1, arg2) {
			var t1 = 0,
					t2 = 0,
					r1, r2;

			try {
				t1 = arg1.toString().split(".")[1].length;
			} catch (e) {
			}
			try {
				t2 = arg2.toString().split(".")[1].length;
			} catch (e1) { }

			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return (r1 / r2) * Math.pow(10, t2 - t1);

		}
	});
} (jQuery));
/*globals window,document,jQuery,setTimeout*/
/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Dialog widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.dialog.js
*	jquery.wijmo.wijutil.js
*
*/
(function ($) {
	"use strict";
	var uiStateHover = "ui-state-hover", zonCSS = "wijmo-wijdialog-defaultdockingzone";

	$.widget("wijmo.wijdialog", $.ui.dialog, {
		options: {
			/// <summary>
			/// An object determines the caption buttons to show on wijdialog title bar. 
			/// Type: Object.
			/// Default: {}
			/// </summary>
			/// <remarks>
			/// The default value for this option is: 
			/// {
			/// pin: {visible: true, click: self.pin, 
			/// iconClassOn: "ui-icon-pin-w", iconClassOff:"ui-icon-pin-s"},
			/// refresh: {visible: true, click: self.refresh, 
			/// iconClassOn: "ui-icon-refresh"},
			/// toggle: {visible: true, click: self.toggle},
			/// minimize: {visible: true, click: self.minimize, 
			/// iconClassOn: "ui-icon-minus"},
			/// maximize: {visible: true, click: self.maximize, 
			/// iconClassOn: "ui-icon-extlink"},
			/// close: {visible: true, click: self.close, 
			/// iconClassOn: "ui-icon-close"}
			/// };
			/// Each button is represented by an object in this object. 
			/// property name: The name of the button.
			/// visible: A value specifies whether this button is visible.
			/// click: The event handler to handle the click event of this button.
			/// iconClassOn: Icon for normal state.
			/// iconClassOff: Icon after clicking.
			/// </remarks>
			captionButtons: {},
			/// <summary>
			/// A value determines the settings of the animation effect 
			/// to be used when the wijdialog is collapsed.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			collapsingAnimation: null,
			/// <summary>
			/// A value determines the settings of the animation effect 
			/// to be used when the wijdialog is expanded.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			expandingAnimation: null,
			/// <summary>
			/// A URL string specifies the URL for the iframe element inside wijdialog.
			/// Type: String.
			/// Default: "".
			/// </summary>
			contentUrl: "",
			/// <summary>
			/// A string specifies the ID of the DOM element to 
			/// dock to when wijdialog is minimized.
			/// Type: String.
			/// Default: "".
			/// </summary>
			minimizeZoneElementId: "",
			/// <summary>
			/// Buttoncreating event handler. 
			/// A function gets called before the caption buttons are created. 
			/// A user could use this event to change the array of the buttons to 
			/// change, add, or remove buttons from title bar. 
			/// The buttoncreating event handler is a function that gets called 
			/// before the caption buttons are created. 
			/// Type: Function 
			/// Default: null 
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijdialog({ buttonCreating: function (e, data) { } });
			/// Bind to the event by type: wijdialogbuttoncreating
			/// $(".selector").bind("wijdialogbuttoncreating", function(e, data) { } );
			/// </summary>
			/// Parameters:
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// Buttons array that will be created. 
			buttonCreating: null,
			/// <summary>
			/// The stateChanged event handler.
			/// A function called when the state ("minimized", "maximized", "normal") 
			/// of this dialog is changed.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijdialog({ stateChanged: function (e, data) { } });
			/// Bind to the event by type: wijdialogstatechanged
			/// $(".selector").bind("wijdialogstatechanged", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data relates to this event.
			/// data.originalState:The original state of the dialog
			/// data.state:The current state of the dialog
			/// </param>
			stateChanged: null,
			/// <summary>
			/// The stateChanged event handler.
			/// A function called when the dialog lose focus.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijdialog({ blur: function (e, data) { } });
			/// Bind to the event by type: wijdialogstatechanged
			/// $(".selector").bind("wijdialogblur", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data relates to this event.
			/// data.el: The DOM element of this dialog.
			/// </param>
			blur: null
		},

		_create: function () {
			var self = this,
				o = self.options;

			//Add support for jUICE!
			if ($.isArray(o.buttons)) {
				$.each(o.buttons, function (idx, value) {
					var c = value.click;
					if (c && (typeof c === "string") && window[c]) {
						value.click = window[c];
					}
				});
			}
			//end


			$.ui.dialog.prototype._create.apply(self, arguments);
			self.uiDialog.addClass("wijmo-wijdialog");
			self._initWijWindow();
			self._bindWindowResize();
			self._attachDraggableResizableEvent();
			self.originalPosition = o.position;
			self.isPin = false;
		},

		_makeDraggable: function () {
			$.ui.dialog.prototype._makeDraggable.apply(this, arguments);
			this.uiDialog.draggable("option", "cancel", ".wijmo-wijdialog-captionbutton");
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv();
				}
				self.disabledDiv.appendTo("body");
			}
			else if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
		},

		_createDisabledDiv: function () {
			var self = this,
			//Change your outerelement here
				ele = self.uiDialog,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
			.addClass("ui-disabled")
			.css({
				"z-index": "99999",
				position: "absolute",
				width: disabledWidth,
				height: disabledHeight,
				left: eleOffset.left,
				top: eleOffset.top
			});
		},

		destroy: function () {
			var self = this;

			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option

			$.ui.dialog.prototype.destroy.apply(self, arguments);
			self.element.unbind(".wijdialog")
			.removeData('wijdialog');
		},

		_attachDraggableResizableEvent: function () {
			var self = this, uiDialog = self.uiDialog, o = self.options;
			if (o.draggable && uiDialog.draggable) {
				uiDialog.bind("dragstop", function (event, ui) {
					self._saveNormalState();
					self._destoryIframeMask();
				}).bind("dragstart", function (event, ui) {
					self._createIframeMask();
				});
			}
			if (o.resizable && uiDialog.resizable) {
				uiDialog.bind("resizestop", function (event, ui) {
					self._saveNormalState();
					self._destoryIframeMask();
				}).bind("resizestart", function (event, ui) {
					self._createIframeMask();
				});
			}
		},

		//fixed iframe bug.
		_createIframeMask: function () {
			var self = this;
			if (self.innerFrame) {
				self.mask = $("<div style='width:100%;height:100%;position:absolute;" +
                "top:0px;left:0px;z-index:" + ($.ui.dialog.maxZ + 1) + "'></div>")
                .appendTo(self.uiDialog);
			}
		},

		_destoryIframeMask: function () {
			var self = this;
			if (self.innerFrame && self.mask) {
				self.mask.remove();
				self.mask = undefined;
			}
		},

		_initWijWindow: function () {
			var self = this, isIn = true;
			self._createCaptionButtons();
			self._checkUrl();
			self.uiDialogButtonPane = $(".ui-dialog-buttonpane", self.uiDialog);

			self.uiDialog.bind("mousedown", function (event) {
				var el = event.target;
				if (!$.contains(self.element[0], el)) {
					self.uiDialog.focus();
				}
			})
			.bind("mouseenter", function (event) {
				isIn = true;
			})
			.bind("mouseleave", function (event) {
				isIn = false;
			})
			.bind("focusout", function (event) {
				if (!isIn) {
					self._trigger("blur", event, {
						el: self.element
					});
				}
			});
		},

		//		_setMinWidth:function(){
		//			var textWidth = $("#ui-dialog-title-dialog").width(),
		//			iconWidth = $(".wijmo-wijdialog-captionbutton:eq(0)")
		//			.width(),
		//			minWidth = textWidth + 
		//			$(".wijmo-wijdialog-captionbutton").length * iconWidth;
		//			self._setOption("minWidth",minWidth);
		//		},

		_checkUrl: function () {
			var self = this, o = self.options, url = o.contentUrl,
			innerFrame =
			$('<iframe style="width:100%;height:99%;" frameborder="0"></iframe>');
			if (typeof url === "string" && url.length > 0) {
				self.element.addClass("wijmo-wijdialog-hasframe");
				//innerFrame.attr("src", url);
				self.element.append(innerFrame);
				self.innerFrame = innerFrame;
			}
			self.contentWrapper = self.element;
		},

		_setOption: function (key, value) {
			var self = this;
			$.ui.dialog.prototype._setOption.apply(self, arguments);
			//			if (key === "captionButtons") {
			//				// self._createCaptionButtons();
			//				// todo: reset captionButtons
			//			}
			//			//Add for support disabled option at 2011/7/8
			//			else 
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
			else if (key === "contentUrl") {
				if (self.innerFrame) {
					self.innerFrame.attr("src", value);
				}
				else {
					self._checkUrl();
				}
			}
		},

		_createCaptionButtons: function () {
			var captionButtons = [], self = this, o = self.options, i,
			buttons = {
				pin: {
					visible: true,
					click: self.pin,
					iconClassOn: "ui-icon-pin-w",
					iconClassOff: "ui-icon-pin-s"
				},
				refresh: {
					visible: true,
					click: self.refresh,
					iconClassOn: "ui-icon-refresh"
				},
				toggle: {
					visible: true,
					click: self.toggle,
					iconClassOn: "ui-icon-carat-1-n",
					iconClassOff: "ui-icon-carat-1-s"
				},
				minimize: {
					visible: true,
					click: self.minimize,
					iconClassOn: "ui-icon-minus"
				},
				maximize: {
					visible: true,
					click: self.maximize,
					iconClassOn: "ui-icon-extlink"
				},
				close: {
					visible: true,
					click: self.close,
					iconClassOn: "ui-icon-close"
				}
			},
			oCaptionButtons = o.captionButtons, uiDialogTitlebar = self.uiDialogTitlebar;
			uiDialogTitlebar
			.children(".ui-dialog-titlebar-close, .wijmo-wijdialog-captionbutton")
			.remove();

			$.each(buttons, function (name, value) {
				if (oCaptionButtons && oCaptionButtons[name]) {
					$.extend(value, oCaptionButtons[name]);
				}
				captionButtons.push({ button: name, info: value });
			});
			self._trigger("buttonCreating", null, captionButtons);
			for (i = 0; i < captionButtons.length; i++) {
				self._createCaptionButton(captionButtons[i], uiDialogTitlebar);
			}
		},

		_createCaptionButton: function (buttonHash, uiDialogTitlebar, notAppendToHeader) {
			var self = this, buttonObject,
			buttonCSS = "wijmo-wijdialog-titlebar-" + buttonHash.button,
			button = uiDialogTitlebar.children("." + buttonCSS),
			info = buttonHash.info, buttonIcon = $("<span></span>");
			if (info.visible) {
				if (button.size() === 0) {
					buttonIcon.addClass(
						"ui-icon " +
						info.iconClassOn
					)
					.text(info.text || buttonHash.button);
					buttonObject = $('<a href="#"></a>')
					.append(buttonIcon)
					.addClass(buttonCSS + " ui-corner-all wijmo-wijdialog-captionbutton")
					.attr("role", "button")
					.hover(
						function () {
							buttonObject.addClass(uiStateHover);
						},
						function () {
							buttonObject.removeClass(uiStateHover);
						}
					)
					.click(function (event) {
						if (buttonIcon.hasClass(info.iconClassOff)) {
							buttonIcon.removeClass(info.iconClassOff);
						}
						else {
							buttonIcon.addClass(info.iconClassOff);
						}
						if ($.isFunction(info.click)) {
							info.click.apply(self, arguments);
						}
						return false;
					});
					if (notAppendToHeader) {
						return buttonObject;
					}
					else {
						buttonObject.appendTo(uiDialogTitlebar);
					}
				}
				self[buttonHash.button + "Button"] = buttonObject;
			}
			else {
				button.remove();
			}
		},

		pin: function () {
			///	<summary>
			///		Pins the wijdialog instance so that it could not be moved.
			///	</summary>
			var drag = this.isPin;
			this._enableDisableDragger(!drag);
			this.isPin = !drag;
		},

		refresh: function () {
			///	<summary>
			///		Refreshes the iframe content in wijdialog.
			///	</summary>

			var fr = this.innerFrame;
			if (fr !== undefined) {
				fr.attr("src", fr.attr("src"));
			}
		},

		toggle: function () {
			var self = this, buttonIcon = self.toggleButton.children("span");

			// TODO : toggle animation and event invoking.
			if (!self.minimized) {
				if (self.collapsed === undefined || !self.collapsed) {
					self.collapsed = true;
					if (!buttonIcon.hasClass("ui-icon-carat-1-s")) {
						buttonIcon.addClass("ui-icon-carat-1-s");
					}
					self._collapseDialogContent(true);
				}
				else {
					self.collapsed = false;
					if (buttonIcon.hasClass("ui-icon-carat-1-s")) {
						buttonIcon.removeClass("ui-icon-carat-1-s");
					}
					self._expandDialogContent(true);
				}
			}
		},

		_expandDialogContent: function (fireEvent) {
			var self = this, o = self.options, animationSetting = o.expandingAnimation;
			self.uiDialog.height("auto");
			if (fireEvent && animationSetting !== null) {
				self.contentWrapper.show(
				animationSetting.animated,
				animationSetting.options,
				animationSetting.duration,
				function (e) {
					self.uiDialog.css("height", self._toggleHeight);
					if ($.isFunction(animationSetting.callback)) {
						animationSetting.callback(e);
					}
					if (o.resizable) {
						self._enableDisableResizer(false);
					}
				});
			}
			else {
				self.contentWrapper.show();
				if (o.resizable) {
					self._enableDisableResizer(false);
				}
				self.uiDialog.css("height", self.toggleHeight);
			}
		},

		_collapseDialogContent: function (fireEvent) {
			var self = this, o = self.options, animationSetting = o.collapsingAnimation;
			if (o.resizable) {
				self._enableDisableResizer(true);
			}
			self._toggleHeight = self.uiDialog[0].style.height;
			self.uiDialog.height("auto");
			if (fireEvent && animationSetting !== null) {
				self.contentWrapper.hide(
				animationSetting.animated,
				animationSetting.options,
				animationSetting.duration);
			}
			else {
				self.contentWrapper.hide();
			}

			self._enableDisableDragger(self.isPin);
		},

		_enableDisableResizer: function (disabled) {
			var dlg = this.uiDialog;
			dlg.resizable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		_enableDisableDragger: function (disabled) {
			var dlg = this.uiDialog;
			dlg.draggable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		minimize: function () {
			///	<summary>
			///		Minimizes wijdialog.
			///	</summary>

			var self = this, dlg = self.uiDialog, o = self.options, miniZone = null,
			$from = $("<div></div>"), $to = $("<div></div>"), defaultZone, scrollTop, top,
			originalPosition, originalSize = {}, position, size = {},
			content = "uiDialog", originalState;
			//content has 2 value 'uiDialog' for normal content,'copy' for iframe
			//to resolve the issue that iframe reload when minimize.  

			//Only minimize from normal,maximized state
			if (!self.minimized) {

				originalPosition = self.uiDialog.position();
				originalSize.width = self.uiDialog.width();
				originalSize.height = self.uiDialog.height();
				originalState = self.getState();
				if (self.maximized) {
					self.maximized = false;
					self.restoreButton.remove();
					//fixed bug can't minimize window when it's maximized
					$(window).unbind(".onWinResize");
				}
				else { // minimize from normal state
					if (self.collapsed) {
						self._expandDialogContent(false);
					}
					self._saveNormalState();
				}
				// disable resizer
				self._enableDisableResizer(true);
				//hide content

				if (self.collapsed) {
					self._collapseDialogContent(false);
				}

				$from.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.contentWrapper.hide();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.hide();
				}
				// remove size restriction
				dlg.height("auto");
				dlg.width("auto");

				self._doButtonAction(self.minimizeButton, "hide");
				self._restoreButton(true, self.minimizeButton, "After");
				self._doButtonAction(self.pinButton, "hide");
				self._doButtonAction(self.refreshButton, "hide");
				self._doButtonAction(self.toggleButton, "hide");
				self._doButtonAction(self.maximizeButton, "show");

				if ($.browser.webkit) {
					$(".wijmo-wijdialog-captionbutton", self.uiDialog)
					.css("float", "left");
				}

				if (self.innerFrame) {
					content = "copy";
					self[content] = self.uiDialog.clone();
					self[content].empty();
					self.uiDialogTitlebar.appendTo(self[content]);
				}

				if (o.minimizeZoneElementId.length > 0) {
					miniZone = $("#" + o.minimizeZoneElementId);
				}
				if (miniZone !== null && miniZone.size() > 0) {
					miniZone.append(self[content]);
				}
				else {
					defaultZone = $("." + zonCSS);
					if (defaultZone.size() === 0) {
						defaultZone = $('<div class="' + zonCSS + '"></div>');
						$(document.body).append(defaultZone);
					}
					defaultZone.append(self[content])
					    .css("z-index", dlg.css("z-index"));
				}
				self[content].css("position", "static");
				self[content].css("float", "left");

				if ($.browser.msie && $.browser.version === '6.0') {
					scrollTop = $(document).scrollTop();
					top = document.documentElement.clientHeight -
					defaultZone.height() + scrollTop;
					defaultZone.css({ position: 'absolute', left: "0px", top: top });
				}

				$to.appendTo(document.body)
				.css({
					top: self[content].offset().top,
					left: self[content].offset().left,
					height: self[content].innerHeight(),
					width: self[content].innerWidth(),
					position: "absolute"
				});
				self.uiDialog.hide();
				if (self.innerFrame) {
					self[content].hide();
				}
				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 100, function () {
					$from.remove();
					$to.remove();
					self[content].show();
					self.minimized = true;
					position = self.uiDialog.position();
					size.width = self.uiDialog.width();
					size.height = self.uiDialog.height();
					self._enableDisableDragger(true);
					self._trigger('resize', null, {
						originalPosition: originalPosition,
						originalSize: originalSize,
						position: position,
						size: size
					});
					self._trigger("stateChanged", null, {
						originalState: originalState,
						state: "minimized"
					});
				});
			}
		},

		_doButtonAction: function (button, action) {
			if (button !== undefined) {
				button.removeClass(uiStateHover);
				button[action]();
			}
		},

		maximize: function () {
			var self = this, w = $(window), originalPosition,
			originalSize = {}, position, size = {}, state;

			if (!self.maximized) {
				self._enableDisableDragger(false);
				originalPosition = self.uiDialog.position();
				originalSize.width = self.uiDialog.width();
				originalSize.height = self.uiDialog.height();
				// maximized from minimized state
				if (self.minimized) {
					self.restore(); //bug in IE when minimize -> maximize -> restore
				}
				else {
					if (self.collapsed) {
						self._expandDialogContent(false);
					}
					self._saveNormalState();
					state = "normal";
				}
				self.maximized = true;
				if (self.maximizeButton !== undefined) {
					self.maximizeButton.hide();
					self._restoreButton(true, self.maximizeButton, "Before");
				}

				if ($.browser.webkit) {
					$(".wijmo-wijdialog-captionbutton").css("float", "");
				}

				self._onWinResize(self, w);
				if (self.collapsed) {
					self._collapseDialogContent(false);
				}

				/// TODO : bind resize event.
				if (!self.collapsed) {
					self._enableDisableDragger(true);
				}
				self.uiDialog.resizable({ disabled: true });
				self.uiDialog.removeClass("ui-state-disabled");

				position = self.uiDialog.position();
				size.width = self.uiDialog.width();
				size.height = self.uiDialog.height();
				self._trigger('resize', null, {
					originalPosition: originalPosition,
					originalSize: originalSize,
					position: position,
					size: size
				});

				if (state === "normal") {
					self._trigger("stateChanged", null, {
						originalState: "normal",
						state: "maximized"
					});
				}
			}
		},

		_bindWindowResize: function () {
			var self = this, w = $(window), top, scrollTop, defaultZone;
			w.resize(function () {
				if (self.maximized) {
					self._onWinResize(self, w);
				}
			});

			//fixed ie 6 position:fixed
			if ($.browser.msie && $.browser.version === '6.0') {
				w.bind("scroll.wijdialog resize.wijdialog", function () {
					if (self.minimized) {
						scrollTop = $(document).scrollTop();
						defaultZone = self.uiDialog.parent();
						top = document.documentElement.clientHeight -
						defaultZone.height() + scrollTop;
						defaultZone.css({ top: top });
					}
				});
			}
		},

		_saveNormalState: function () {
			var self = this, dialog = self.uiDialog, ele = self.element;
			if (!self.maximized) {
				self.normalWidth = dialog.css("width");
				self.normalLeft = dialog.css("left");
				self.normalTop = dialog.css("top");
				self.normalHeight = dialog.css("height");

				self.normalInnerHeight = ele.css("height");
				self.normalInnerWidth = ele.css("width");
				self.normalInnerMinWidth = ele.css("min-width");
				self.normalInnerMinHeight = ele.css("min-height");
			}
		},

		_onWinResize: function (self, w) {
			self.uiDialog.css("top", w.scrollTop());
			self.uiDialog.css("left", w.scrollLeft());
			self.uiDialog.setOutWidth(w.width());
			self.uiDialog.setOutHeight(w.height());
			self.options.width = self.uiDialog.width();
			self.options.height = self.uiDialog.height();
			self._size();
			if (self.collapsed) {//fixed bug when resize on maxmize and collapse state.
				self.uiDialog.height("auto");
				self.contentWrapper.hide();
			}
		},

		_restoreButton: function (show, button, position) {
			var self = this,
			buttonHash = { button: "restore", info: {
				visible: show,
				click: self.restore,
				iconClassOn: "ui-icon-newwin"
			}
			},
			restore = self._createCaptionButton(buttonHash, self.uiDialogTitlebar, true);
			if (show) {
				restore["insert" + position](button);
				self.restoreButton = restore;
			}
		},

		restore: function () {
			/// <summary>
			///		Restores wijdialog to normal size.
			/// </summary>

			var self = this, dlg = self.uiDialog, originalPosition, originalSize = {},
			position, size = {}, $from = $("<div></div>"), $to = $("<div></div>"),
			content = "uiDialog", state;
			//content has 2 value 'uiDialog' for normal content,'copy' for iframe
			//to resolve the issue that iframe reload when minimize on ff & webkit.  

			// restore form minimized state.
			if (self.minimized) {
				self.minimized = false;
				self._enableDisableDragger(false);
				if (self.innerFrame) {
					content = "copy";
					if (!self[content]) {
						content = "uiDialog";
					}
				}

				originalPosition = self[content].position();
				originalSize.width = self[content].width();
				originalSize.height = self[content].height();
				$from.appendTo(document.body)
				.css({
					top: self[content].offset().top,
					left: self[content].offset().left,
					height: self[content].innerHeight(),
					width: self[content].innerWidth(),
					position: "absolute"
				});

				dlg.css("position", "absolute");
				dlg.css("float", "");
				if (!self.innerFrame) {
					dlg.appendTo(document.body);
				}
				else {
					self.uiDialogTitlebar.prependTo(dlg);
					dlg.show();
				}

				self._enableDisableResizer(false);
				if (!self.isPin) {
					self._enableDisableDragger(false);
				}
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.show();
				}
				$to.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.uiDialog.hide();
				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 150, function () {
					self.uiDialog.show();
					position = self.uiDialog.position();
					size.width = self.uiDialog.width();
					size.height = self.uiDialog.height();
					$from.remove();
					$to.remove();
					if (self.copy) {
						self.copy.remove();
					}
					self._trigger('resize', null, {
						originalPosition: originalPosition,
						originalSize: originalSize,
						position: position,
						size: size
					});

					state = self.getState();

					self._trigger("stateChanged", null, {
						originalState: "minimized",
						state: state
					});
				});

				if (self.collapsed) {
					self._collapseDialogContent();
				}
				self._doButtonAction(self.minimizeButton, "show");
				self._doButtonAction(self.restoreButton, "remove");
				self._doButtonAction(self.pinButton, "show");
				self._doButtonAction(self.refreshButton, "show");
				self._doButtonAction(self.toggleButton, "show");

				if ($.browser.webkit) {
					$(".wijmo-wijdialog-captionbutton").css("float", "");
				}
			}
			else if (self.maximized) {
				self.maximized = false;
				originalPosition = self.uiDialog.position();
				originalSize.width = self.uiDialog.width();
				originalSize.height = self.uiDialog.height();
				$(window).unbind(".onWinResize");
				if (self.collapsed) {
					self._expandDialogContent();
				}
				self._enableDisableResizer(false);
				if (!self.isPin) {
					self._enableDisableDragger(false);
				}
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.collapsed) {
					self._collapseDialogContent();
				}
				if (self.maximizeButton !== undefined) {
					self.maximizeButton.show();
					self._restoreButton(false, self.maximizeButton, "before");
				}
				position = self.uiDialog.position();
				size.width = self.uiDialog.width();
				size.height = self.uiDialog.height();
				self._trigger('resize', null, {
					originalPosition: originalPosition,
					originalSize: originalSize,
					position: position,
					size: size
				});
				state = self.getState();

				self._trigger("stateChanged", null, {
					originalState: "maximized",
					state: state
				});
			}
		},

		getState: function () {
			/// <summary>
			///		Gets the state of this dialog, the possible values are: 
			//		"minimized", "maximized", "normal".
			/// </summary>
			var self = this;
			return self.minimized ? "minimized" :
			(self.maximized ? "maximized" : "normal");
		},

		reset: function () {
			/// <summary>
			///		Resets the properties ("width" ,"height", "position") 
			///     to their default values.
			/// </summary>
			var self = this;
			self.normalWidth = self.normalLeft =
			self.normalTop = self.normalHeight =
			self.normalInnerHeight = self.normalInnerWidth =
			self.normalInnerMinWidth = self.normalInnerMinHeight = undefined;
			self._setOption("position", self.originalPosition);
		},

		open: function () {
			var self = this, o = self.options;
			if (!self.innerFrame) {
				if (!self.minimized) {
					$.ui.dialog.prototype.open.apply(self, arguments);
					//					if (!self.maximized) {
					//						self._restoreToNormal();
					//					}
				}
				else {
					self.uiDialog.show();
				}
			}
			else {
				self.innerFrame.attr("src", o.contentUrl);
				if (!self.minimized) {
					$.ui.dialog.prototype.open.apply(self, arguments);
				}
				else {
					self.uiDialogTitlebar.show();
				}
			}
			if (self.collapsed) {
				self._collapseDialogContent();
			}

			if (o.disabled) {
				if (self.disabledDiv) {
					self.disabledDiv.show();
				}
				else {
					self.disable();
				}
			}
		},

		close: function () {
			var self = this, o = self.options;
			if ($.ui.dialog.prototype.close.apply(self, arguments)) {
				if (self.innerFrame) {
					self.innerFrame.attr("src", "");
					if (self.minimized) {
						self.uiDialogTitlebar.hide();
					}
				}
				if (self.disabledDiv && o.disabled) {
					self.disabledDiv.hide();
				}
			}
		},

		_restoreToNormal: function () {
			var self = this, dialog = self.uiDialog, ele = self.element;
			dialog.css("width", self.normalWidth);
			dialog.css("left", self.normalLeft);
			dialog.css("top", self.normalTop);
			dialog.css("height", self.normalHeight);

			ele.css("height", self.normalInnerHeight);
			ele.css("width", self.normalInnerWidth);
			ele.css("min-width", self.normalInnerMinWidth);
			ele.css("min-height", self.normalInnerMinHeight);

			self.options.width = self.uiDialog.width();
			self.options.height = self.uiDialog.height();
		}
	});

	$.extend($.ui.dialog.overlay, {
		create: function (dialog) {
			if (this.instances.length === 0) {
				// prevent use of anchors and inputs
				// we use a setTimeout in case the overlay is created from an
				// event that we're going to be cancelling (see #2804)
				setTimeout(function () {
					// handle $(el).dialog().dialog('close') (see #4065)
					if ($.ui.dialog.overlay.instances.length) {
						$(document).bind($.ui.dialog.overlay.events, function (event) {
							// stop events if the z-index of the target is < the z-index of the overlay
							// we cannot return true when we don't want to cancel the event (#3523)
							if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ &&
							!$.contains(dialog.element[0], event.target)) {
								return false;
							}
						});
					}
				}, 1);

				// allow closing by pressing the escape key
				$(document).bind('keydown.dialog-overlay', function (event) {
					if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

						dialog.close(event);
						event.preventDefault();
					}
				});

				// handle window resize
				$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
			}

			var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

			if ($.fn.bgiframe) {
				$el.bgiframe();
			}

			this.instances.push($el);
			return $el;
		},

		height: function () {
			var scrollHeight,
				offsetHeight;
			// handle IE 6
			if ($.browser.msie) {
				scrollHeight = Math.max(
					document.documentElement.scrollHeight,
					document.body.scrollHeight
				);
				offsetHeight = Math.max(
					document.documentElement.offsetHeight,
					document.body.offsetHeight
				);

				if (scrollHeight < offsetHeight) {
					return $(window).height() + 'px';
				} else {
					return scrollHeight + 'px';
				}
				// handle "good" browsers
			} else {
				return $(document).height() + 'px';
			}
		},

		width: function () {
			var scrollWidth,
				offsetWidth;
			// handle IE 6
			if ($.browser.msie) {
				scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);

				if (scrollWidth < offsetWidth) {
					return $(window).width() + 'px';
				} else {
					return scrollWidth + 'px';
				}
				// handle "good" browsers
			} else {
				return $(document).width() + 'px';
			}
		}
	});

} (jQuery));
/*globals jQuery,$,window,alert,document,confirm,location,setTimeout, Globalize,
amplify*/
/*jslint white: false */
/*jslint nomen: false*/
/*jslint browser: true*/
/*jslint continue: true*/
/*jslint devel: true*/
/*jslint forin: true*/
/*jslint maxlen: 110*/

/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 ** Wijmo Accordion Widget.
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  jquery.wijmo.wijutil.js
*  jquery.wijmo.wijaccordion.js
*
*/

(function ($) {
	"use strict";
	$.widget("wijmo.wijaccordion", {
		// widget options
		options: {
			/// <summary>
			/// Sets the animation easing effect. Set this option to false in order to 
			///	disable animation. Easing effects require UI Effects Core.
			/// Options available for the animation function include:
			///  down – If true, indicates that the index of the pane should be expanded 
			///			higher than the index of the pane that must be collapsed.
			///  horizontal – If true, indicates that the accordion have a horizontal 
			///			orientation (when the expandDirection is left or right).
			///  rightToLeft – If true, indicates that the content element is located 
			///			before the header element (top and left expand direction).
			///  toShow – jQuery object that contains the content element(s) should be 
			///			shown.
			///  toHide –jQuery object that contains the content element(s) should be 
			///			hidden.
			/// Type: String
			/// Default: "slide"
			/// Code example:
			/// Create your own animation:
			/// jQuery.wijmo.wijaccordion.animations.custom1 = function (options) {
			///     this.slide(options, {
			///     easing: options.down ? "easeOutBounce" : "swing",
			///     duration: options.down ? 1000 : 200
			///   });
			/// }
			///  $("#accordion3").wijaccordion({
			///      expandDirection: "right",
			///      animated: "custom1"
			///  });
			/// </summary>
			animated: 'slide',

			/// <summary>
			/// The animation duration in milliseconds. By default animation duration 
			///	value depends on an animation effect specified by the animation option.
			/// Type: Number
			/// Default: null
			/// Code example:
			///  $("#accordion3").wijaccordion({
			///      duration: 1000
			///  });
			/// </summary>
			duration: null,

			/// <summary>
			/// Determines the event that triggers the accordion.
			/// Type: String
			/// Default: "click"       
			/// Code example:
			///  $("#accordion3").wijaccordion({
			///      event: "mouseover"
			///  });
			/// </summary>
			event: "click",
			/// <summary>
			/// Determines whether the widget behavior is disabled.
			/// Type: Boolean
			/// Default: false
			/// Code example:
			///   $(".selector").wijaccordion({ disabled: true });
			/// </summary>
			disabled: false,
			/// <summary>
			/// Determines the direction in which the content area expands. Available 
			///	values include: top, right, bottom, and left. 
			/// Type: String
			/// Default: "bottom"
			/// Code example: 
			///    $("#element").wijaccordion({ expandDirection: "right" });
			/// </summary>
			expandDirection: "bottom",
			/// <summary>
			/// Selector for the header element. By using this option you can put 
			///	header/content elements inside LI tags or into any other more complex 
			///	html markup.
			/// Type: String
			/// Default: "> li > :first-child,> :not(li):even"
			/// Code example: $("#element").wijaccordion({ header: "h3" });
			/// </summary>
			header: "> li > :first-child,> :not(li):even",
			/// <summary>
			/// Determines whether clicking the header will close the currently opened 
			///	pane (leaving all the accordion's panes closed).
			/// Type: Boolean
			/// Default: true
			/// Code example:
			///    $("#element").wijaccordion({ requireOpenedPane: false });
			/// </summary>
			requireOpenedPane: true,
			/// <summary>
			/// Gets or sets the index of the currently expanded accordion pane.
			/// Type: Number
			/// Default: 0
			/// Code example:
			///   $("#element").wijaccordion({ selectedIndex: 5 });
			/// </summary>
			selectedIndex: 0
		},

		/*
		Available Events:
		/// <summary>
		/// Occurs before an active accordion pane change.
		/// Return false or call event.preventDefault() in order to cancel event and
		///	prevent the selectedIndex change.
		/// Type: Function
		/// Event type: wijaccordionbeforeselectedindexchanged
		/// Code example:
		/// Supply a callback function to handle the beforeSelectedIndexChanged 
		///	event as an option.
		/// $("#accordion").wijaccordion({
		///		beforeSelectedIndexChanged: function (e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///         ...
		/// }});
		/// Bind to the event by type: wijaccordionbeforeselectedindexchanged.
		/// $( "#accordion" ).bind( "wijaccordionbeforeselectedindexchanged", function(e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		/// <param name="args" type="Object">
		/// Event arguments:
		///	args.newIndex - Index of a pane that will be expanded.
		///	args.prevIndex - Index of a pane that will be collapsed.
		///	</param>
		beforeSelectedIndexChanged(e, args)

		/// <summary>
		/// Occurs when an active accordion pane changed.
		/// Type: Function
		/// Event type: wijaccordionselectedindexchanged
		/// Code example:
		/// Supply a callback function to handle the selectedIndexChanged 
		///	event as an option.
		/// $("#accordion").wijaccordion({
		///		selectedIndexChanged: function (e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///         ...
		/// }});
		/// Bind to the event by type: wijaccordionselectedindexchanged.
		/// $( "#accordion" ).bind( "wijaccordionselectedindexchanged", function(e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		/// <param name="args" type="Object">
		/// Event arguments:
		///	args.newIndex - Index of the activated pane.
		/// args.prevIndex - Index of the collapsed pane.
		///	</param>
		selectedIndexChanged(e, args)

		*/

		// handle option changes:
		_setOption: function (key, value) {
			var o = this.options;
			if (o[key] !== value) {
				switch (key) {
					case "selectedIndex":
						this.activate(value);
						break;
					case "disabled":
						if (value) {
							this.element.addClass("ui-state-disabled");
						} else {
							this.element.removeClass("ui-state-disabled");
						}
						break;
					case "event":
						this._unbindLiveEvents();
						this.options.event = value;
						this._bindLiveEvents();
						break;
					case "header":
						this._handleHeaderChange(value, o.header);
						break;
					case "animated":
						break;
					case "expandDirection":
						this._onDirectionChange(value, true, o.expandDirection);
						break;
					default:
						break;
				}
			}
			$.Widget.prototype._setOption.apply(this, arguments);
		},

		_handleHeaderChange: function (newHeaderSelector, prevHeaderSelector) {
			var prevHeaders = this.element.find(prevHeaderSelector);
			prevHeaders
				.removeClass("ui-accordion-header ui-helper-reset ui-state-active " +
							this._triangleIconOpened).siblings(".ui-accordion-content")
				.removeClass(
"ui-accordion-content ui-helper-reset ui-widget-content ui-accordion-content-active");
			this._initHeaders(newHeaderSelector);
		},
		_initHeaders: function (selector) {
			var o = this.options;
			selector = selector ? selector : o.header;
			this.headers = this.element.find(selector);
			this.headers.each(jQuery.proxy(this._initHeader, this));
		},
		_initHeader: function (index, elem) {
			var o = this.options, rightToLeft = this.element.data("rightToLeft"),
					header = $(elem),
					content = $(header.next()[0]);
			if (rightToLeft) {
				header.remove();
				header.insertAfter(content);
			}
			header.addClass("ui-accordion-header ui-helper-reset")
			  .attr("role", "tab");
			content.attr("role", "tabpanel");
			if (header.find("> a").length === 0) {
				header.wrapInner('<a href="#"></a>');
			}
			if (header.find("> .ui-icon").length === 0) {
				$('<span class="ui-icon"></span>').insertBefore($("> a", header)[0]);
			}
			if (index === o.selectedIndex) {
				header.addClass("ui-state-active").addClass(this._headerCornerOpened)
				.attr({
					"aria-expanded": "true",
					tabIndex: 0
				})
				.find("> .ui-icon").addClass(this._triangleIconOpened);
				content.addClass("ui-accordion-content-active")
					.addClass(this._contentCornerOpened);
			} else {
				header.addClass("ui-state-default ui-corner-all")
				.attr({
					"aria-expanded": "false",
					tabIndex: -1
				})
				.find("> .ui-icon").addClass(this._triangleIconClosed);
				content.hide();
			}
			content.addClass("ui-accordion-content ui-helper-reset ui-widget-content");

		},
		_create: function () {
			this.element.addClass(
			"wijmo-wijaccordion ui-accordion ui-widget ui-accordion-icons " +
			"ui-helper-reset ui-helper-clearfix");
			var o = this.options;
			if (o.disabled) {
				this.element.addClass("ui-state-disabled");
			}
			this._onDirectionChange(o.expandDirection, false);
			this._initHeaders();
			this.element.attr("role", "tablist");
		},
		_init: function () {
			this._bindLiveEvents();
		},

		destroy: function () {
			this._unbindLiveEvents();
			this.element.removeClass(
			"wijmo-wijaccordion ui-accordion ui-widget ui-helper-reset ui-accordion-icons")
			.removeAttr("role");
			$.Widget.prototype.destroy.apply(this, arguments);

		},

		/// <summary>
		/// Activates the accordion content pane by its index.
		/// </summary>
		/// <param name="index" type="Number">
		///	Index of the accordion pane to be activated.
		///	</param>
		activate: function (index) {
			var nextHeader, o = this.options,
				headers = this.element.children(".ui-accordion-header"),
				prevHeader = this.element.find(".ui-accordion-header.ui-state-active"),
				rightToLeft = this.element.data("rightToLeft"),
				newIndex, prevIndex, nextContent, prevContent,
				animOptions, proxied, proxiedDuration, animations, duration, easing;
			if (typeof index === "number") {
				nextHeader = $(headers[index]);
			} else if (typeof index === "string") {
				index = parseInt(index, 0);
				nextHeader = $(headers[index]);
			} else {
				nextHeader = $(index);
				index = headers.index(index);
			}
			if (nextHeader.hasClass("ui-state-active")) {
				if (o.requireOpenedPane) {
					// fix for
					// [17869] Unable to select the desire panel 
					// after all the panels are open in certain scenarios
					if (prevHeader.length === nextHeader.length &&
						prevHeader.index() === nextHeader.index()) {
						return false;
					}
				} else {
					prevHeader = nextHeader;
					nextHeader = $(null);
				}
			}
			else if (!o.requireOpenedPane) {
				prevHeader = $(null);
			}
			newIndex = $(".ui-accordion-header", this.element).index(nextHeader);
			prevIndex = $(".ui-accordion-header", this.element).index(prevHeader);

			nextContent = rightToLeft ?
							nextHeader.prev(".ui-accordion-content") :
							nextHeader.next(".ui-accordion-content");
			prevContent = rightToLeft ?
							prevHeader.prev(".ui-accordion-content") :
							prevHeader.next(".ui-accordion-content");
			if (prevHeader.length === 0 && nextHeader.length === 0) {
				return false;
			}
			if (!this._trigger("beforeSelectedIndexChanged", null,
					{ newIndex: newIndex, prevIndex: prevIndex })) {
				return false;
			}

			prevHeader.removeClass("ui-state-active")
			.removeClass(this._headerCornerOpened)
			.addClass("ui-state-default ui-corner-all")
			.attr({
				"aria-expanded": "false",
				tabIndex: -1
			})
			.find("> .ui-icon").removeClass(this._triangleIconOpened)
			.addClass(this._triangleIconClosed);
			nextHeader.removeClass("ui-state-default ui-corner-all")
			.addClass("ui-state-active")
			.addClass(this._headerCornerOpened)
			.attr({
				"aria-expanded": "true",
				tabIndex: 0
			})
			.find("> .ui-icon").removeClass(this._triangleIconClosed)
			.addClass(this._triangleIconOpened);

			if (o.animated) {
				animOptions = {
					toShow: nextContent,
					toHide: prevContent,
					complete: jQuery.proxy(function () {
						prevContent.removeClass("ui-accordion-content-active");
						nextContent.addClass("ui-accordion-content-active");
						prevContent.css('display', '');
						nextContent.css('display', '');
						if ($.fn.wijlinechart) {
							prevContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
							nextContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
						}
						//prevContent.wijTriggerVisibility();
						//nextContent.wijTriggerVisibility();
						this._trigger("selectedIndexChanged", null,
								{ newIndex: newIndex, prevIndex: prevIndex });
					}, this),
					horizontal: this.element.hasClass("ui-helper-horizontal"),
					rightToLeft: this.element.data("rightToLeft"),
					down: (newIndex > prevIndex),
					autoHeight: o.autoHeight || o.fillSpace
				};
				proxied = o.animated;
				proxiedDuration = o.duration;
				if ($.isFunction(proxied)) {
					o.animated = proxied(animOptions);
				}
				if ($.isFunction(proxiedDuration)) {
					o.duration = proxiedDuration(animOptions);
				}

				animations = $.wijmo.wijaccordion.animations;
				duration = o.duration;
				easing = o.animated;

				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'slide';
				}

				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](animOptions);
			} else {
				if (prevHeader.length > 0) {
					prevContent.hide().removeClass("ui-accordion-content-active");
				}
				if (nextHeader.length > 0) {
					nextContent.show().addClass("ui-accordion-content-active")
									.addClass(this._contentCornerOpened);
				}
				if ($.fn.wijlinechart) {
					prevContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
					nextContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
				}
				//prevContent.wijTriggerVisibility();
				//nextContent.wijTriggerVisibility();
				this._trigger("selectedIndexChanged", null, { newIndex: newIndex, prevIndex: prevIndex });
			}
			this.options.selectedIndex = newIndex;
		},

		/** Private methods */
		_bindLiveEvents: function () {
			this.element.find('.ui-accordion-header')
			.live(this.options.event + ".wijaccordion",
									jQuery.proxy(this._onHeaderClick, this))
			.live("keydown.wijaccordion",
									jQuery.proxy(this._onHeaderKeyDown, this))
			.live("mouseenter.wijaccordion",
							function () { $(this).addClass('ui-state-hover'); })
			.live("mouseleave.wijaccordion",
							function () { $(this).removeClass('ui-state-hover'); })
			.live("focus.wijaccordion",
							function () { $(this).addClass('ui-state-focus'); })
			.live("blur.wijaccordion",
							function () { $(this).removeClass('ui-state-focus'); });
		},
		_unbindLiveEvents: function () {
			this.element.find('.ui-accordion-header').die(".wijaccordion");
		},
		_onHeaderClick: function (e) {
			if (!this.options.disabled) {
				this.activate(e.currentTarget);
			}
			return false;
		},
		_onHeaderKeyDown: function (e) {
			if (this.options.disabled || e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = $.ui.keyCode,
				focusedHeader = this.element.find(".ui-accordion-header.ui-state-focus"),
				focusedInd, headers = this.element.find(".ui-accordion-header");
			if (focusedHeader.length > 0) {

				focusedInd = $(".ui-accordion-header",
									this.element).index(focusedHeader);

				switch (e.keyCode) {
					case keyCode.RIGHT:
					case keyCode.DOWN:
						if (headers[focusedInd + 1]) {
							headers[focusedInd + 1].focus();
							return false;
						}
						break;
					case keyCode.LEFT:
					case keyCode.UP:
						if (headers[focusedInd - 1]) {
							headers[focusedInd - 1].focus();
							return false;
						}
						break;
					case keyCode.SPACE:
					case keyCode.ENTER:
						this.activate(e.currentTarget);
						e.preventDefault();
						break;
				}

			}
			return true;
		},
		_onDirectionChange: function (newDirection, allowDOMChange, prevDirection) {
			var rightToLeft, openedHeaders, openedContents, openedTriangles,
			closedTriangles, prevIsRightToLeft;
			if (allowDOMChange) {
				openedHeaders = this.element.find(".ui-accordion-header." +
													this._headerCornerOpened);
				openedHeaders.removeClass(this._headerCornerOpened);
				openedContents = this.element.find(".ui-accordion-content." +
													this._contentCornerOpened);
				openedContents.removeClass(this._contentCornerOpened);
				openedTriangles = this.element.find("." + this._triangleIconOpened);
				closedTriangles = this.element.find("." + this._triangleIconClosed);
				openedTriangles.removeClass(this._triangleIconOpened);
				closedTriangles.removeClass(this._triangleIconClosed);
			}
			if (prevDirection !== null) {
				this.element.removeClass("ui-accordion-" + prevDirection);
			}
			switch (newDirection) {
				case "top":
					this._headerCornerOpened = "ui-corner-bottom";
					this._contentCornerOpened = "ui-corner-top";
					this._triangleIconOpened = "ui-icon-triangle-1-n";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = true;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-top");
					break;
				case "right":
					this._headerCornerOpened = "ui-corner-left";
					this._contentCornerOpened = "ui-corner-right";
					this._triangleIconOpened = "ui-icon-triangle-1-e";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = false;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-right");
					break;
				case "left":
					this._headerCornerOpened = "ui-corner-right";
					this._contentCornerOpened = "ui-corner-left";
					this._triangleIconOpened = "ui-icon-triangle-1-w";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = true;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-left");
					break;
				default: //bottom
					this._headerCornerOpened = "ui-corner-top";
					this._contentCornerOpened = "ui-corner-bottom";
					this._triangleIconOpened = "ui-icon-triangle-1-s";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = false;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-bottom");
					break;
			}
			prevIsRightToLeft = this.element.data("rightToLeft");
			this.element.data("rightToLeft", rightToLeft);

			if (allowDOMChange) {
				openedTriangles.addClass(this._triangleIconOpened);
				closedTriangles.addClass(this._triangleIconClosed);
				openedHeaders.addClass(this._headerCornerOpened);
				openedContents.addClass(this._contentCornerOpened);
			}

			if (allowDOMChange && rightToLeft !== prevIsRightToLeft) {
				this.element.children(".ui-accordion-header").each(function () {
					var header = $(this), content;
					if (rightToLeft) {
						content = header.next(".ui-accordion-content");
						header.remove();
						header.insertAfter(content);
					} else {
						content = header.prev(".ui-accordion-content");
						header.remove();
						header.insertBefore(content);
					}
				});
			}

		}
	});


	$.extend($.wijmo.wijaccordion, {
		animations: {
			slide: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 300
				}, options, additions);
				if (!options.toHide.size()) {
					options.toShow.stop(true, true).animate(options.horizontal ?
									{ width: "show"} : { height: "show" }, options);
					return;
				}
				if (!options.toShow.size()) {
					options.toHide.stop(true, true).animate(options.horizontal ?
									{ width: "hide"} : { height: "hide" }, options);
					return;
				}
				var overflow = options.toShow.css('overflow'),
				percentDone = 0,
				showProps = {},
				hideProps = {},
				fxAttrs = options.horizontal ?
							["width", "paddingLeft", "paddingRight"] :
							["height", "paddingTop", "paddingBottom"],
				originalWidth, s = options.toShow;
				// fix width/height before calculating height/width of hidden element
				if (options.horizontal) {
					originalWidth = s[0].style.height;
					s.height(parseInt(s.parent().height(), 10) -
							parseInt(s.css("paddingTop"), 10) -
							parseInt(s.css("paddingBottom"), 10) -
							(parseInt(s.css("borderTopWidth"), 10) || 0) -
							(parseInt(s.css("borderBottomWidth"), 10) || 0));
				} else {
					originalWidth = s[0].style.width;
					s.width(parseInt(s.parent().width(), 10) -
							parseInt(s.css("paddingLeft"), 10) -
							parseInt(s.css("paddingRight"), 10) -
							(parseInt(s.css("borderLeftWidth"), 10) || 0) -
							(parseInt(s.css("borderRightWidth"), 10) || 0));
				}

				$.each(fxAttrs, function (i, prop) {
					hideProps[prop] = "hide";

					var parts = ('' + $.css(options.toShow[0], prop))
													.match(/^([\d+-.]+)(.*)$/);
					showProps[prop] = {
						value: parts ? parts[1] : 0,
						unit: parts ? (parts[2] || "px") : "px"
					};
				});
				options.toShow.css(options.horizontal ?
							{ width: 0, overflow: "hidden"} :
							{ height: 0, overflow: "hidden" }).stop(true, true).show();
				options.toHide.filter(":hidden").each(options.complete).end()
					.filter(":visible").stop(true, true).animate(hideProps, {
						step: function (now, settings) {
							var val;
							if (settings.prop === options.horizontal ?
													"width" : "height") {
								percentDone = (settings.end - settings.start === 0) ? 0 :
							(settings.now - settings.start) /
							(settings.end - settings.start);
							}

							val = (percentDone * showProps[settings.prop].value);
							if (val < 0) {
								//fix for 16943:
								val = 0;
							}
							options.toShow[0].style[settings.prop] =
											val + showProps[settings.prop].unit;

						},
						duration: options.duration,
						easing: options.easing,
						complete: function () {
							if (!options.autoHeight) {
								options.toShow.css(options.horizontal ?
															"width" : "height", "");
							}
							options.toShow.css(options.horizontal ?
											"height" : "width", originalWidth);
							options.toShow.css({ overflow: overflow });
							options.complete();
						}
					});
			},
			bounceslide: function (options) {
				this.slide(options, {
					easing: options.down ? "easeOutBounce" : "swing",
					duration: options.down ? 1000 : 200
				});
			}
		}
	});
} (jQuery));/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Popup widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.position.js
 *  
 */

(function ($) {
    "use strict";
    $.fn.extend({
        getBounds: function () {
            return $.extend({}, $(this).offset(), { width: $(this).outerWidth(true), height: $(this).outerHeight(true) });
        },

        setBounds: function (bounds) {
            $(this).css({ 'left': bounds.left, 'top': bounds.top })
				.width(bounds.width)
				.height(bounds.height);
            return this;
        },

        getMaxZIndex: function () {
            var max = (($(this).css('z-index') == 'auto') ? 0 : $(this).css('z-index')) * 1;
            $(this).siblings().each(function (i, e) {
                max = Math.max(max, (($(e).css('z-index') == 'auto') ? 0 : $(e).css('z-index')) * 1);
            });
            return max;
        }
    });


    $.widget("wijmo.wijpopup", {
        options: {
            ///	<summary>
            ///     Determines if the element's parent element is the outermost element. 
            ///		If true, the element's parent element will be changed to the body or outermost form element.
            ///	</summary>
            ensureOutermost: false,
            ///	<summary>
            ///     Specifies the effect to be used when the popup is shown.
            ///		Possible values: 'blind', 'clip', 'drop', 'fade', 'fold', 'slide', 'pulsate'.
            ///	</summary>
            showEffect: 'show',
            ///	<summary>
            ///     Specified the object/hash including specific options for the show effect.
            ///	</summary>
            showOptions: {},
            ///	<summary>
            ///     Defines how long (in milliseconds) the animation duration for showing the popup will last.
            ///	</summary>
            showDuration: 300,
            ///	<summary>
            ///     Specifies the effect to be used when the popup is hidden.
            ///		Possible values: 'blind', 'clip', 'drop', 'fade', 'fold', 'slide', 'pulsate'.
            ///	</summary>
            hideEffect: 'hide',
            ///	<summary>
            ///     Specified the object/hash including specific options for the hide effect.
            ///	</summary>
            hideOptions: {},
            ///	<summary>
            ///     Defines how long (in milliseconds) the animation duration for hiding the popup will last.
            ///	</summary>
            hideDuration: 100,
            ///	<summary>
            ///     Determines whether to automatically hide the popup when clicking outside the element.
            ///	</summary>
            autoHide: false,
            ///	<summary>
            ///     Options for positioning the element, please see jquery.ui.position for possible options.
            ///	</summary>
            position: {
                at: 'left bottom',
                my: 'left top'
            },
            /// <summary>
            /// The showing event handler. A function called before the element is shown. Cancellable.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijpopup({ showing: function (e, args) { } });
            /// </summary>
            showing: null,
            /// <summary>
            /// The shown event handler. A function called after the element is shown.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijpopup({ shown: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            shown: null,
            /// <summary>
            /// The hiding event handler. A function called before the element is hidden. Cancellable.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijpopup({ hiding: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            hiding: null,
            /// <summary>
            /// The hidden event handler. A function called after the element is hidden.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijpopup({ hidden: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            hidden: null,
            /// <summary>
            /// The posChanged event handler. A function called when the position of the element is changed.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijpopup({ posChanged: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            posChanged: null
        },

        _create: function () {
        },

        _init: function () {
            if (!!this.options.ensureOutermost) {
                var root = $('form');
                if (root.length === 0) { root = $(document.body); }
                this.element.appendTo(root);
            }

            this.element.data('visible.wijpopup', false);
            this.element.css('position', "absolute");
            this.element.position({
                of: $(document.body)
            });
            this.element.hide();
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);

            if (key === 'autoHide') {
                var visible = this.isVisible();
                this.hide();
                if (visible) { this.show(); }
            }
        },

        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
            if (this.isVisible()) { this.hide(); }

            if ($.browser.msie && ($.browser.version < 7)) {
                jFrame = this.element.data('backframe.wijpopup');
                if (!jFrame) { jFrame.remove(); }
            }

            var self = this;
            this.element.unbind('.wijpopup');
            $.each(["visible", "backframe", "animating", "width"], function (i, prefix) {
                self.element.removeData(prefix + ".wijpopup");
            });
        },

        isVisible: function () {
            /// <summary>Determines whether the element is visible.</summary>
            return (!!this.element.data('visible.wijpopup') && this.element.is(':visible'));
        },

        isAnimating: function () {
            return !!this.element.data("animating.wijpopup");
        },
		
		_pushQueue: function(){
			var $win = $(window), arr = $win.data('wijPopupQueue'), len;
			if (!arr){
				arr = new Array();
				$win.data('wijPopupQueue', arr);
			}
			
			return arr.push(this);
		},

        show: function (position) {
            /// <summary>Popups the element.  Position is an optional argument, it is the options object used in jquery.ui.position.</summary>
            this._setPosition(position);
            if (this.isVisible()) { return; }

            if (this._trigger('showing') === false) { return; }

			var self = this;
            if (this.options.autoHide) {
				if (this._pushQueue() === 1){
					$(document).bind('mouseup.wijpopup', function(e){
						self._onDocMouseUp(e);
					});
				}
            }

            var effect = this.options.showEffect || "show";
            var duration = this.options.showDuration || 300;
            var ops = this.options.showOptions || {};

            this.element.data("animating.wijpopup", true);

            if ($.effects && $.effects[effect]) {
                this.element.show(effect, ops, duration, $.proxy(this._showCompleted, this));
            } else {
                this.element[effect]((effect === 'show' ? null : duration), $.proxy(this._showCompleted, this));
            }

            if (!effect || !duration || effect === 'show' || duration <= 0) {
                this._showCompleted();
            }
        },
		
        _showCompleted: function () {
            this.element.removeData("animating.wijpopup");
            this.element.data('visible.wijpopup', true);
            this._trigger('shown');
        },

        showAt: function (x, y) {
            /// <summary>Popups the element at specified absolute position related to document.</summary>
            this.show({
                my: 'left top',
                at: 'left top',
                of: document.body,
                offset: '' + x + ' ' + y
            });
        },

        hide: function () {
            /// <summary>Hides the element.</summary>
            if (!this.isVisible()) { return; }

            if (this._trigger('hiding') === false) { return; }

            //$(document).unbind('mouseup.wijpopup');

            var effect = this.options.hideEffect || "hide";
            var duration = this.options.hideDuration || 300;
            var ops = this.options.hideOptions || {};

            this.element.data("animating.wijpopup", true);
            if ($.effects && $.effects[effect]) {
                this.element.hide(effect, ops, duration, $.proxy(this._hideCompleted, this));
            } else {
                this.element[effect]((effect === 'hide' ? null : duration), $.proxy(this._hideCompleted, this));
            }

            if (!effect || !duration || effect === 'hide' || duration <= 0) {
                this._hideCompleted();
            }
        },

        _hideCompleted: function () {
            if (this.element.data('width.wijpopup') !== undefined) {
                this.element.width(this.element.data('width.wijpopup'));
                this.element.removeData('width.wijpopup');
            }

            this.element.removeData("animating.wijpopup")
				.unbind('move.wijpopup');

            if ($.browser.msie && ($.browser.version < 7)) {
                var jFrame = this.element.data('backframe.wijpopup');
                if (jFrame) { jFrame.hide(); }
            }

            this._trigger('hidden');
        },

        _onDocMouseUp: function (e) {
			var $win = $(window), 
				$srcElement = $(e.target ? e.target : e.srcElement),
				arr = $win.data('wijPopupQueue'), 
				wijPop;
				
			if ($srcElement.parents().hasClass('wijmo-wijcombobox-list') || $srcElement.parents().hasClass('wijmo-wijcalendar')){
				return;
			}
			
			if (!!arr){
				while( wijPop = arr.pop()) {
					if (wijPop.isVisible()) {
						if (!!wijPop.options.autoHide){
							if ($srcElement.get(0) != wijPop.element.get(0) && $srcElement.parents().index(wijPop.element) < 0) { 
								wijPop.hide(); 
							}else{
								arr.push(wijPop);
							}
							
							break;
						}
					} else {
						break;
					}
				}
				
				if (arr.length === 0){
					$(document).unbind('mouseup.wijpopup');
				}
			}
        },

        _onMove: function (e) {
            var jFrame = this.element.data('backframe.wijpopup');
            if (jFrame) {
                this.element.before(jFrame);
                jFrame.css({ 'top': this.element.css('top'),
                    'left': this.element.css('left')
                });
            }
        },

        _addBackgroundIFrame: function () {
            if ($.browser.msie && ($.browser.version < 7)) {
                var jFrame = this.element.data('backframe.wijpopup');
                if (!jFrame) {
                    jFrame = jQuery('<iframe/>')
						.css({ 'position': 'absolute',
						    'display': 'none',
						    'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
						}).attr({ 'src': 'javascript:\'<html></html>\';',
						    'scrolling': 'no',
						    'frameborder': '0',
						    'tabIndex ': -1
						});

                    this.element.before(jFrame);
                    this.element.data('backframe.wijpopup', jFrame);
                    this.element.bind('move.wijpopup', $.proxy(this._onMove, this));
                }
                jFrame.setBounds(this.element.getBounds());
                jFrame.css({ 'display': 'block',
                    'left': this.element.css('left'),
                    'top': this.element.css('top'),
                    'z-index': this.element.css('z-index') - 1
                });
            }
        },

        _setZIndex: function (index) {
            this.element.css('z-index', index);
            var jFrame = this.element.data('backframe.wijpopup');
            if (jFrame) {
                jFrame.css('z-index', (this.element.css('z-index')) - 1);
            }
        },

        _setPosition: function (position) {
            var visible = this.element.is(':visible');
            this.element.show();
            this.element.position($.extend({}, this.options.position, position ? position : {}));
            if (!visible) { this.element.hide(); }

            this._addBackgroundIFrame();
            var zIndex = 1000;
            if (this.options.position.of) {
                zIndex = Math.max(zIndex, $(this.options.position.of).getMaxZIndex());
            }

            this._setZIndex(zIndex + 10);
            this._trigger('posChanged');
        }
    });

})(jQuery);
/*globals window document jQuery */
/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo SuperPanel widget.
* 
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.resizable.js
*	jquery.ui.draggable.js
*	jquery.effects.core.js
*	jquery.mousewheel.js
*
*/
(function ($) {
	"use strict";
	var uiSuperPanelClasses = "wijmo-wijsuperpanel " + "ui-widget " + "ui-widget-content",
		rounderClass = "ui-corner-all",
		uiStateDisabled = "ui-state-disabled",
		uiStateHover = "ui-state-hover",
		uiStateActive = "ui-state-active",
		uiStateDefault = "ui-state-default",
		scrollerHandle = "wijmo-wijsuperpanel-handle",
		hbarContainerCSS = "wijmo-wijsuperpanel-hbarcontainer",
		vbarContainerCSS = "wijmo-wijsuperpanel-vbarcontainer",
		innerElementHtml =
				"<div class='wijmo-wijsuperpanel-statecontainer'>" +
				"<div class='wijmo-wijsuperpanel-contentwrapper'>" +
				"<div class='wijmo-wijsuperpanel-templateouterwrapper'></div>" +
				"</div>" +
				"</div>",
		hbarHtml = "<div class='wijmo-wijsuperpanel-hbarcontainer ui-widget-header'>" +
				"<div class='wijmo-wijsuperpanel-handle ui-state-default ui-corner-" +
				"all'><span class='ui-icon ui-icon-grip-solid-vertical'></span></div>" +
				"<div class='wijmo-wijsuperpanel-hbar-buttonleft ui-state-default " +
				"ui-corner-bl'><span class='ui-icon ui-icon-triangle-1-w'></span></div>" +
				"<div class='wijmo-wijsuperpanel-hbar-buttonright ui-state-default " +
				"ui-corner-br'><span class='ui-icon ui-icon-triangle-1-e'></span></div>" +
				"</div>",
		vbarHtml = "<div class='wijmo-wijsuperpanel-vbarcontainer ui-widget-header'>" +
				"<div class='wijmo-wijsuperpanel-handle ui-state-default ui-corner-all'" +
				"><span class='ui-icon ui-icon-grip-solid-horizontal'></span></div>" +
				"<div class='wijmo-wijsuperpanel-vbar-buttontop ui-state-default " +
				"ui-corner-tr'><span class='ui-icon ui-icon-triangle-1-n'></span></div>" +
				"<div class='wijmo-wijsuperpanel-vbar-buttonbottom ui-state-default " +
				"ui-corner-br'><span class='ui-icon ui-icon-triangle-1-s'></span></div>" +
				"</div>",
		hButtons = "<div class='ui-state-default wijmo-wijsuperpanel-button " +
				"wijmo-wijsuperpanel-buttonleft'><span class='ui-icon " +
				"ui-icon-carat-1-w'></span></div><div class='ui-state-default" +
				" wijmo-wijsuperpanel-button wijmo-wijsuperpanel-buttonright'>" +
				"<span class='ui-icon ui-icon-carat-1-e'></span></div>",
		vButtons = "<div class='ui-state-default wijmo-wijsuperpanel-button" +
		" wijmo-wijsuperpanel-buttontop'><span class='ui-icon ui-icon-carat-1-n'>" +
				"</span></div><div class='ui-state-default wijmo-wijsuperpanel-button" +
				" wijmo-wijsuperpanel-buttonbottom'><span class='ui-icon" +
				" ui-icon-carat-1-s'></span></div>";

	$.widget("wijmo.wijsuperpanel", {
		options: {
			/// <summary>
			/// This value determines whether the wijsuperpanel can be resized. 
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			allowResize: false,
			/// <summary>
			/// This value determines whether wijsuperpanel to automatically refresh 
			/// when content size or wijsuperpanel size are changed.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			autoRefresh: false,
			/// <summary>
			/// The animation properties of wijsuperpanel scrolling.
			/// Type: Object.
			/// </summary>
			/// <remarks>
			/// Set this options to null to disable animation.
			/// </remarks>
			animationOptions: {
				/// <summary>
				/// This value determines whether to queue animation operations.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				queue: false,
				/// <summary>
				/// This value determines whether to disable animation operations.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				disabled: false,
				/// <summary>
				/// This value sets the animation duration of the scrolling animation.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				duration: 250,
				/// <summary>
				/// This value sets the animation easing of the scrolling animation.
				/// Default: undefined.
				/// Type: string.
				/// </summary>
				easing: undefined
			},
			/// <summary>
			/// The hScrollerActivating event handler. 
			/// A function called when horizontal scrollbar is activating.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $("#selector").wijsuperpanel({ hScrollerActivating: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeClick
			/// $("#selector").bind("wijsuperpanelhScrollerActivating", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data that relates to this event.
			/// data.direction: the direction of the scrollbar("horizontal" or "vertical").
			/// data.targetBarLen: the height of the horizontal scrollbar.
			/// data.contentLength: the height of the content.
			/// </param>
			hScrollerActivating: null,
			/// <summary>
			/// This option contains horizontal scroller settings.
			/// </summary>
			hScroller: {
				/// <summary>
				/// This value determines the position of the horizontal scroll bar. 
				/// Default: "bottom".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "bottom" and "top".
				/// "bottom" - The horizontal scroll bar is placed at the bottom of 
				/// the content area.
				/// "top" - The horizontal scroll bar is placed at the top of the 
				///content area.
				/// </remarks>
				scrollBarPosition: "bottom",
				/// <summary>
				/// This value determines the visibility of the horizontal scroll bar.
				/// Default: "auto".
				/// Type: String
				/// </summary>
				/// <remarks>
				/// Possible options are "auto", "visible" and "hidden".
				/// "auto" - Shows the scroll when needed.
				/// "visible" - Scroll bar will always be visible. It"s disabled 
				/// when not needed.
				/// "hidden" - Scroll bar will be hidden.
				/// </remarks>
				scrollBarVisibility: "auto",
				/// <summary>
				/// This value determines the scroll mode of horizontal scrolling. 
				/// Default: "scrollbar".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "scrollBar", "buttons", "buttonsHover" 
				/// and "edge".
				/// "scrollBar" - Scroll bars are used for scrolling.
				/// "buttons" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are clicked.
				/// "buttonsHover" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are hovered.
				/// "edge" - Scrolling occurs when the mouse is moving to the edge
				/// of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, scrollMode: "scrollbar,scrollbuttons" will enable 
				/// both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: "scrollBar",
				/// <summary>
				/// This value determines the horizontal scrolling position of
				/// wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// This value sets the maximum value of horizontal scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// This value sets the minimum value of horizontal scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// This value sets the large change value of horizontal scroller.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks on the 
				/// tracks of scroll bars or presses left or right arrow keys on the 
				/// keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel will scroll 
				/// the width of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// This value sets the small change value of horizontal scroller.
				/// Default: null. 
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on 
				/// the arrows of scroll bars, clicks or hovers scroll buttons, 
				/// presses left or right arrow keys on keyboard, 
				/// and hovers on the edge of wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of 
				/// the width of content.
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// This value sets the minimum length, in pixel, of the horizontal 
				/// scroll bar thumb button.
				/// Default: 6.
				/// Type: Number.
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// This object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// This object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				decreaseButtonPosition: null,
				/// <summary>
				/// This value sets the width of horizontal hovering edge 
				/// which will trigger the horizontal scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The number specifies the value to add to smallchange or largechange
				/// when scrolling the first step(scrolling from scrollMin).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0

			},
			/// <summary>
			/// A value determins whether wijsuperpanel provides 
			/// keyboard scrolling support.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			keyboardSupport: false,
			/// <summary>
			/// This value determines the time interval to call the scrolling
			/// function when doing continuous scrolling.
			/// Default: 100.
			/// Type: Number.
			/// </summary>
			keyDownInterval: 100,
			/// <summary>
			/// This value determines whether wijsuperpanel has mouse wheel support.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			/// <remarks>
			/// Mouse wheel plugin is needed to support this feature.
			/// </remarks>
			mouseWheelSupport: true,
			/// <summary>
			/// This value determines whether to fire the mouse wheel event 
			/// when wijsuperpanel is scrolled to the end.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			bubbleScrollingEvent: true,
			/// <summary>
			/// This option determines the behavior of resizable widget. 
			/// See JQuery UI resizable options document.
			/// Type: Object.
			/// </summary>
			resizableOptions: {
				handles: "all",
				helper: "ui-widget-content wijmo-wijsuperpanel-helper"
			},
			/// <summary>
			/// Resized event handler. A function gets called when resized event is fired.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the resized event:
			/// $("#element").wijsuperpanel({ resized: funtion() { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelresized", funtion() { dosometing });
			/// </summary>
			resized: null,
			/// <summary>
			/// This function gets called when thumb buttons of scrollbars dragging stops.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the dragstop event:
			/// $("#element").wijsuperpanel({ dragStop: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpaneldragstop", funtion(e, data) { dosometing });
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.dir: data.draghandle is the direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).	
			/// </param>
			/// </summary>
			dragStop: null,
			/// <summary>
			/// This function gets called after panel is painted.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the painted event:
			/// $("#element").wijsuperpanel({ painted: funtion() { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelpainted", funtion() { dosometing });
			/// </summary>
			painted: null,
			/// <summary>
			/// Scrolling event handler. A function called before scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the scrolling event:
			/// $("#element").wijsuperpanel({ scrolling: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelscrolling", funtion(e, data) { dosometing });
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.oldValue: The scrollValue before scrolling occurs.
			/// data.newValue: The scrollValue after scrolling occurs.
			/// data.dir: The direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// </param>
			scrolling: null,
			/// <summary>
			/// Scroll event handler. A function called immediately after scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the scroll event:
			/// $("#element").wijsuperpanel({ scroll: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelscroll", funtion(e, data) { dosometing });
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.animationOptions: The options of the animation which scrolling uses
			/// data.dir: The direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).
			/// data.position: The position of content after scrolling occurs.
			/// </param>
			scroll: null,
			/// <summary>
			/// Scrolled event handler.  A function called after scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// code example:
			/// Supply a callback function to handle the scrolled event:
			/// $("#element").wijsuperpanel({ scrolled: funtion(e, data) { dosometing } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsuperpanelscrolled", funtion(e, data) { dosometing });
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.dir: The direction of the scrolling action. 
			/// Possible values: "v"(vertical) and "h"(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// data.afterPosition: The position of content after scrolling occurs.
			/// </param>
			scrolled: null,
			/// <summary>
			/// This value determines whether to show the rounded corner of wijsuperpanel.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showRounder: true,
			/// <summary>
			/// The vScrollerActivating event handler. 
			/// A function called when vertical scrollbar is activating.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $("#selector").wijsuperpanel({ vScrollerActivating: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeClick
			/// $("#selector").bind("wijsuperpanelvScrollerActivating", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data that relates to this event.
			/// data.direction: the direction of the scrollbar("horizontal" or "vertical").
			/// data.targetBarLen: the width of the vertical scrollbar.
			/// data.contentLength: the width of the content.
			/// </param>
			vScrollerActivating: null,
			/// <summary>
			/// This option contains vertical scroller settings.
			/// </summary>			
			vScroller: {
				/// <summary>
				/// This value determines the position of vertical scroll bar. 
				/// Default: "right".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: "left", "right".
				/// "left" - The vertical scroll bar is placed at the 
				/// left side of the content area.
				/// "right" - The vertical scroll bar is placed at the 
				/// right side of the content area.
				/// </remarks>
				scrollBarPosition: "right",
				/// <summary>
				/// This value determines the visibility of the vertical scroll bar.
				/// Default.: "auto". 
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "auto", "visible" and "hidden".
				/// "auto" - Shows the scroll bar when needed.
				/// "visible" - Scroll bar will always be visible. 
				/// It"s disabled when not needed.
				/// "hidden" - Scroll bar will be shown.
				/// </remarks>
				scrollBarVisibility: "auto",
				/// <summary>
				/// This value determines the scroll mode of vertical scrolling. 
				/// Default: "scrollbar".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: "scrollBar", "buttons", 
				/// "buttonsHover" and "edge".
				/// "scrollBar" - Scroll bars are used for scrolling.
				/// "buttons" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are clicked.
				/// "buttonsHover" - Scroll buttons are used for scrolling. 
				/// Scrolling occurs only when scroll buttons are hovered.
				/// "edge" - Scrolling occurs when the mouse is moving to 
				/// the edge of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, vScrollMode: "scrollbar,scrollbuttons" will enable 
				/// both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: "scrollBar",
				/// <summary>
				/// This value determines the vertical scrolling position of
				/// wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// This value sets the maximum value of vertical scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// This value sets the minimum value of vertical scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// This value sets the large change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks 
				/// on the tracks of scroll bars or presses left or right arrow keys 
				/// on the keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel 
				/// will scroll the height of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// This value sets the small change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on the 
				/// arrows of scroll bars, clicks or hovers scroll buttons, presses left
				/// or right arrow keys on keyboard, and hovers on the edge of 
				/// wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of 
				/// the height of content.
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// This value sets the minimum length, in pixel, of the vertical 
				/// scroll bar thumb button.
				/// Default: 6.
				/// Type: Number
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// This object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// This object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				decreaseButtonPosition: null,
				/// <summary>
				/// This value sets the width of horizontal hovering edge 
				/// which will trigger the vertical scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The value to add to small change or largechange when scrolling 
				/// the first step(scrolling from value 0).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0
			}
		},

		_setOption: function (key, value) {

			var self = this,
			o = self.options,
			f = self._fields(),
			hd = f.hbarDrag,
			vd = f.vbarDrag,
			r = f.resizer;
			// override existing 
			if (key === "animationOptions") {
				value = $.extend(o.animationOptions, value);
			}
			else if (key === "hScroller") {
				if (value.scrollLargeChange !== undefined &&
				value.scrollLargeChange !== null) {
					self._autoHLarge = false;
				}
				value = $.extend(o.hScroller, value);
			}
			else if (key === "vScroller") {
				if (value.scrollLargeChange !== undefined &&
				value.scrollLargeChange !== null) {
					self._autoVLarge = false;
				}
				value = $.extend(o.vScroller, value);
			}
			else if (key === "resizableOptions") {
				value = $.extend(self.resizableOptions, value);
			}
			$.Widget.prototype._setOption.apply(self, arguments);
			if ($.isPlainObject(value)) {
				self.options[key] = value;
			}
			switch (key) {
			case "allowResize":
				self._initResizer();
				break;
			case "disabled":
				if (value) {
					if (hd !== undefined) {
						hd.draggable("disable");
					}
					if (vd !== undefined) {
						vd.draggable("disable");
					}
					if (r !== undefined) {
						r.resizable("disable");
					}
				}
				else {
					if (hd !== undefined) {
						hd.draggable("enable");
					}
					if (vd !== undefined) {
						vd.draggable("enable");
					}
					if (r !== undefined) {
						r.resizable("enable");
					}
				}
				break;
			case "mouseWheelSupport":
			case "keyboardSupport":
				self._bindElementEvents(self, f, self.element, o);
				break;
			}
			return self;
		},

		_create: function () {
			var self = this, o = self.options;
			o.vScroller.dir = "v";
			o.hScroller.dir = "h";
			self.paintPanel();
			self._initResizer();
			if (self.options.disabled) {
				self.disable();
			}
			self._detectAutoRefresh();
		},

		_detectAutoRefresh: function () {
			// register with auto fresh.
			var self = this, panels = $.wijmo.wijsuperpanel.panels;
			if (panels === undefined) {
				panels = [];
				$.wijmo.wijsuperpanel.panels = panels;
			}
			panels.push(self);
			// start timer to monitor content.
			if (self.options.autoRefresh) {
				if (!$.wijmo.wijsuperpanel.setAutoRefreshInterval) {
					$.wijmo.wijsuperpanel.setAutoRefreshInterval =
					self._setAutoRefreshInterval;
					$.wijmo.wijsuperpanel.setAutoRefreshInterval();
				}
			}
		},

		_setAutoRefreshInterval: function () {
			var interval = $.wijmo.wijsuperpanel.autoRereshInterval,
			panels = $.wijmo.wijsuperpanel.panels,
			intervalID = window.setInterval(function () {
				window.clearInterval(intervalID);
				var count = panels.length, toContinue = false, i, panel,
				mainElement, autoRefresh, ele, mark;
				for (i = 0; i < count; i++) {
					panel = panels[i];
					mainElement = panel.element[0];
					autoRefresh = panel.options.autoRefresh;
					if (autoRefresh) {
						toContinue = true;
					}
					ele = panel.getContentElement();
					mark = panel._paintedMark;
					if (panel.options.autoRefresh && ele.is(":visible") &&
					(mark === undefined ||
					mark.width !== ele[0].offsetWidth ||
					mark.height !== ele[0].offsetHeight ||
					mark.mainWidth !== mainElement.offsetWidth ||
					mark.mainHeight !== mainElement.offsetHeight)) {
						panel.paintPanel();
					}
				}
				if (toContinue) {
					window.setTimeout($.wijmo.wijsuperpanel.setAutoRefreshInterval, 0);
				}
			}, interval === undefined ? 500 : interval);
		},

		destroy: function () {
			/// <summary>
			/// Destroys wijsuperpanel widget and reset the DOM element.
			/// </summary>

			var self = this, f = self._fields(), ele = self.element,
			buttons, templateWrapper;
			// remove this widget from panels array.
			$.wijmo.wijsuperpanel.panels =
			$.grep($.wijmo.wijsuperpanel.panels, function (value) {
				return value !== self;
			});
			if (!f.initialized) {
				return;
			}
			if (self._radiusKey) {
				self.element.css(self._radiusKey, "");
			}
			if (f.intervalID !== undefined) {
				window.clearInterval(f.intervalID);
				f.intervalID = undefined;
			}
			// destory widgets
			if (f.resizer !== undefined) {
				f.resizer.resizable("destroy");
			}
			if (f.hbarContainer !== undefined) {
				f.hbarDrag.remove();
				f.hbarContainer.unbind("." + self.widgetName);
			}
			if (f.vbarContainer !== undefined) {
				f.vbarDrag.remove();
				f.vbarContainer.unbind("." + self.widgetName);
			}
			ele.unbind("." + self.widgetName);
			f.contentWrapper.unbind("." + self.widgetName);
			buttons = f.stateContainer.find(">.wijmo-wijsuperpanel-button");
			buttons.unbind("." + self.widgetName);
			templateWrapper = f.templateWrapper;
			templateWrapper.contents().each(function (index, e) {
				ele.append(e);
			});
			f.stateContainer.remove();
			if (f.tabindex) {
				ele.removeAttr("tabindex");
			}
			ele.removeClass(uiSuperPanelClasses + " " + rounderClass);
			$.Widget.prototype.destroy.apply(self, arguments);
		},

		_fields: function () {
			var self = this, ele = self.element, key = self.widgetName + "-fields",
			d = self._fieldsStore;
			if (d === undefined) {
				d = {};
				ele.data(key, d);
				self._fieldsStore = d;
			}
			return d;
		},

		_hasMode: function (scroller, mode) {
			var modes = scroller.scrollMode.split(",");
			modes = $.map(modes, function (n) {
				return $.trim(n).toLowerCase();
			});

			return $.inArray(mode.toLowerCase(), modes) > -1;
		},

		_bindElementEvents: function (self, f, ele, o) {
			// mouse move only edge mode is used.
			var hEdge = self._hasMode(o.hScroller, "edge"),
			vEdge = self._hasMode(o.vScroller, "edge"),
			wn = self.widgetName;

			if (hEdge || vEdge) {
				if (self._mousemoveBind === undefined) {
					self._mousemoveBind = true;
					ele.bind("mousemove." + wn, self, self._contentMouseMove);
					ele.bind("mouseleave." + wn, null, function () {
						self._clearInterval();
					});
				}
			}
			else {
				ele.unbind("mousemove", self._contentMouseMove);
				self._mousemoveBind = undefined;
			}
			if (o.mouseWheelSupport) {
				if (self._mouseWheelBind === undefined) {
					self._mouseWheelBind = true;
					ele.bind("mousewheel." + wn, self, self._panelMouseWheel);
				}
			}
			else {
				self.element.unbind("mousewheel", self._panelMouseWheel);
				self._mouseWheelBind = undefined;
			}
			if (o.keyboardSupport) {
				if (self._keyboardBind === undefined) {
					self._keyboardBind = true;
					ele.bind("keydown." + wn, self, self._panelKeyDown);
				}
			}
			else {
				ele.unbind("keydown", self._panelKeyDown);
				self._keyboardBind = undefined;
			}
		},

		_dragStop: function (e, self, dir) {
			// Handles mouse drag stop event of thumb button.

			var data = {
				dragHandle: dir
			};
			self._trigger("dragStop", e, data);
		},

		_contentMouseMove: function (e) {
			// Handles mouse move event of content area.
			// Edge hover scrolling is handled in this method.

			var self = e.data, o = self.options, hScroller, vScroller,
			contentWrapper, f, hMode, vMode, mousePagePosition, off, left, top,
			hEdge, vEdge, innerHeight, innerWidth, dir;
			if (o.disabled) {
				return;
			}
			hScroller = o.hScroller;
			vScroller = o.vScroller;
			contentWrapper = $(e.currentTarget);
			f = self._fields();
			hMode = self._hasMode(hScroller, "edge");
			vMode = self._hasMode(vScroller, "edge");
			self._clearInterval();
			mousePagePosition = {
				X: e.pageX,
				Y: e.pageY
			};
			off = contentWrapper.offset();
			left = off.left;
			top = off.top;
			left = mousePagePosition.X - left;
			top = mousePagePosition.Y - top;
			hEdge = hScroller.hoverEdgeSpan;
			vEdge = vScroller.hoverEdgeSpan;
			innerHeight = contentWrapper.innerHeight();
			innerWidth = contentWrapper.innerWidth();
			dir = "";
			if (hMode) {
				if (left < hEdge) {
					dir = "left";
				}
				if (left > (innerWidth - hEdge)) {
					dir = "right";
				}
			}
			if (vMode) {
				if (top < vEdge) {
					dir = "top";
				}
				if (top > (innerHeight - vEdge)) {
					dir = "bottom";
				}
			}
			self._setScrollingInterval(f, dir, self, false);
		},

		_setScrollingInterval: function (f, dir, self, large) {
			var o = self.options;
			if (dir.length > 0) {
				f.internalFuncID = window.setInterval(function () {
					self._doScrolling(dir, self, large);
				}, o.keyDownInterval);
			}
		},

		_scrollButtonMouseOver: function (e) {
			// Scroll buttons mouse over event handler.

			var self = e.data, button;
			if (self.options.disabled) {
				return;
			}
			button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.bind("mouseout." + self.widgetName, self, self._buttonMouseOut)
				.bind("mousedown." + self.widgetName, self, self._buttonMouseDown)
				.bind("mouseup." + self.widgetName, self, self._buttonMouseUp)
				.addClass(uiStateHover);
				self._buttonScroll(button, self, "buttonshover");
			}
		},

		_buttonScroll: function (button, self, mode) {
			// Do button scroll.

			var dir = "", o = self.options,
			f = self._fields(),
			hMode = self._hasMode(o.hScroller, mode),
			vMode = self._hasMode(o.vScroller, mode);

			if (button.hasClass("wijmo-wijsuperpanel-buttonleft") && hMode) {
				dir = "left";
			}
			else if (button.hasClass("wijmo-wijsuperpanel-buttonright") && hMode) {
				dir = "right";
			}
			else if (button.hasClass("wijmo-wijsuperpanel-buttontop") && vMode) {
				dir = "top";
			}
			else if (button.hasClass("wijmo-wijsuperpanel-buttonbottom") && vMode) {
				dir = "bottom";
			}
			if (dir.length > 0) {
				self._clearInterval();
				self._doScrolling(dir, self, true);
				self._setScrollingInterval(f, dir, self, true);
			}
		},

		_buttonMouseDown: function (e) {
			var self = e.data, button;
			if (self.options.disabled) {
				return;
			}
			button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.addClass(uiStateActive);
				self._buttonScroll(button, self, "buttons");
			}
		},

		_buttonMouseUp: function (e) {
			var self = e.data, button = $(e.currentTarget);
			button.removeClass("ui-state-active");
			self._clearInterval();
		},

		_buttonMouseOut: function (e) {
			var self = e.data, button = $(e.currentTarget);
			button.unbind("mouseout", self._buttonMouseOut)
			.unbind("mousedown", self._buttonMouseDown)
			.unbind("mouseup", self._buttonMouseUp)
			.removeClass(uiStateHover)
			.removeClass(uiStateActive);
			self._clearInterval();
		},

		_panelKeyDown: function (e) {
			// Key down handler.

			var self = e.data, o = self.options, shift, keycode;
			if (!o.keyboardSupport || o.disabled) {
				return;
			}
			shift = e.shiftKey;
			keycode = e.keyCode;
			if (keycode === $.ui.keyCode.LEFT) {
				self._doScrolling("left", self, shift);
			}
			else if (keycode === $.ui.keyCode.RIGHT) {
				self._doScrolling("right", self, shift);
			}
			else if (keycode === $.ui.keyCode.UP) {
				self._doScrolling("top", self, shift);
			}
			else if (keycode === $.ui.keyCode.DOWN) {
				self._doScrolling("bottom", self, shift);
			}
			e.stopPropagation();
			e.preventDefault();
		},

		_draggingInternal: function (data, self, scroller, originalElement) {
			var dir = scroller.dir, h = dir === "h",
			key = h ? "left" : "top",
			//the parameter from draggable widget is supposed to 
			//be used instead of the style property of html element
			//left = parseFloat(originalElement[0].style[key].replace("px", "")) -
			left = data.position[key] -
			self._getScrollContainerPadding(key),
			track = self._getTrackLen(dir) -
			//originalElement[h ? "outerWidth" : "outerHeight"](),
			originalElement[h ? "outerWidth" : "outerHeight"](true),
			proportion = left / track,
			topValue = (scroller.scrollMax - scroller.scrollLargeChange + 1),
			v = proportion * topValue, arg;
			if (v < scroller.scrollMin) {
				v = scroller.scrollMin;
			}
			if (v > topValue) {
				v = topValue;
			}
			arg = {
				oldValue: scroller.scrollValue,
				newValue: v,
				dir: dir
			};
			if (!self._scrolling(true, self, arg)) {
				// event is canceled in scrolling.
				return;
			}
			scroller.scrollValue = v;
			self._setDragAndContentPosition(true, false, dir, "dragging");
		},

		_dragging: function (e, data, self) {
			var o = self.options, originalElement = $(e.target),
			p = originalElement.parent();
			if (p.hasClass(hbarContainerCSS)) {
				self._draggingInternal(data, self, o.hScroller, originalElement);
			}
			else {
				self._draggingInternal(data, self, o.vScroller, originalElement);
			}
		},

		_panelMouseWheel: function (e, delta) {
			var self = e.data, o = self.options, originalElement, dir, onHbar,
			hScroller, vScroller, scrollEnd;
			if (!o.mouseWheelSupport || o.disabled) {
				return;
			}
			//var f = self._fields();
			//var scrollerWrapper = f.stateContainer;
			//var hbarContainer = f.hbarContainer;
			originalElement = $(e.srcElement || e.originalEvent.target);
			dir = "";
			onHbar = originalElement.closest("." + hbarContainerCSS, self.element)
			.size() > 0;
			hScroller = o.hScroller;
			vScroller = o.vScroller;
			if (delta > 0) {
				dir = onHbar ? "left" : "top";
			}
			else {
				dir = onHbar ? "right" : "bottom";
			}

			if (dir.length > 0) {
				self._doScrolling(dir, self);
			}
			scrollEnd = false;
			if (dir === "left") {
				scrollEnd = !self.hNeedScrollBar ||
				Math.abs(hScroller.scrollValue - hScroller.scrollMin) < 0.001;
			}
			if (dir === "right") {
				scrollEnd = !self.hNeedScrollBar || Math.abs(hScroller.scrollValue -
				(hScroller.scrollMax - self._getHScrollBarLargeChange() + 1)) < 0.001;
			}
			if (dir === "top") {
				scrollEnd = !self.vNeedScrollBar ||
				Math.abs(vScroller.scrollValue - vScroller.scrollMin) < 0.001;
			}
			if (dir === "bottom") {
				scrollEnd = !self.vNeedScrollBar || Math.abs(vScroller.scrollValue -
				(vScroller.scrollMax - self._getVScrollBarLargeChange() + 1)) < 0.001;
			}
			if (!scrollEnd || !o.bubbleScrollingEvent || dir === "left" ||
			 dir === "right") {
				e.stopPropagation();
				e.preventDefault();
			}
		},

		_documentMouseUp: function (e) {
			var self = e.data.self, ele = e.data.ele;
			ele.removeClass(uiStateActive);
			self._clearInterval();
			$(document).unbind("mouseup", self._documentMouseUp);
		},

		_scrollerMouseOver: function (e) {
			var self = e.data, originalElement, ele, addhover;
			if (self.options.disabled) {
				return;
			}
			originalElement = $(e.srcElement || e.originalEvent.target);
			ele = null;
			addhover = false;

			if (originalElement.hasClass(uiStateDefault)) {
				ele = originalElement;
				addhover = true;
			}
			else if (originalElement.parent().hasClass(uiStateDefault)) {
				ele = originalElement.parent();
				addhover = true;
			}
			else if (originalElement.hasClass(vbarContainerCSS) ||
			originalElement.hasClass(hbarContainerCSS)) {
				ele = originalElement;
			}

			if (ele !== undefined) {
				if (addhover) {
					ele.addClass(uiStateHover);
				}
				ele.bind("mouseout." + self.widgetName, self, self._elementMouseOut);
				ele.bind("mousedown." + self.widgetName, self, self._elementMouseDown);
				ele.bind("mouseup." + self.widgetName, self, self._elementMouseUp);
			}
		},

		_elementMouseUp: function (e) {
			var ele = $(e.currentTarget);
			//var self = e.data;
			ele.removeClass("ui-state-active");
		},

		_elementMouseDown: function (e) {
			var ele = $(e.currentTarget), self = e.data,
			scrollDirection, large, active, hbarDrag, pos, vbarDrag, pos2, f;
			if (self.options.disabled || e.which !== 1) {
				return;
			}
			scrollDirection = "";
			large = false;
			active = false;
			if (ele.hasClass("wijmo-wijsuperpanel-vbar-buttontop")) {
				scrollDirection = "top";
				active = true;
			}
			else if (ele.hasClass("wijmo-wijsuperpanel-vbar-buttonbottom")) {
				scrollDirection = "bottom";
				active = true;
			}
			else if (ele.hasClass("wijmo-wijsuperpanel-hbar-buttonleft")) {
				scrollDirection = "left";
				active = true;
			}
			else if (ele.hasClass("wijmo-wijsuperpanel-hbar-buttonright")) {
				scrollDirection = "right";
				active = true;
			}
			else if (ele.hasClass(scrollerHandle)) {
				ele.addClass("ui-state-active");
				return;
			}
			else if (ele.hasClass(hbarContainerCSS)) {
				hbarDrag = ele.find("." + scrollerHandle);
				pos = hbarDrag.offset();
				if (e.pageX < pos.left) {
					scrollDirection = "left";
				}
				else {
					scrollDirection = "right";
				}
				large = true;
			}
			else if (ele.hasClass(vbarContainerCSS)) {
				vbarDrag = ele.find("." + scrollerHandle);
				pos2 = vbarDrag.offset();
				if (e.pageY < pos2.top) {
					scrollDirection = "top";
				}
				else {
					scrollDirection = "bottom";
				}
				large = true;
			}
			self._clearInterval();
			self._doScrolling(scrollDirection, self, large);
			f = self._fields();
			self._setScrollingInterval(f, scrollDirection, self, large);
			if (active) {
				ele.addClass("ui-state-active");
			}
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: ele
			}, self._documentMouseUp);
		},

		doScrolling: function (dir, large) {
			/// <summary>
			/// Do scrolling.
			/// </summary>
			/// <param name="dir" type="string">
			///   Scrolling direction. Options are: "left", "right", "top" and "bottom".
			/// </param>
			/// <param name="large" type="Boolean">
			/// Whether to scroll a large change.
			/// </param>

			this._doScrolling(dir, this, large);
		},

		_setScrollerValue: function (dir, scroller, smallChange, largeChange,
		isAdd, isLarge, self) {
			//var o = self.options;
			var vMin = scroller.scrollMin,
			change = isLarge ? largeChange : smallChange,
			value = scroller.scrollValue, t, vTopValue, firstStepChangeFix, data;
			if (!value) {
				value = vMin;
			}
			t = 0;
			if (isAdd) {
				vTopValue = scroller.scrollMax - largeChange + 1;
				if (Math.abs(value - vTopValue) < 0.001) {
					self._clearInterval();
					return false;
				}
				firstStepChangeFix = scroller.firstStepChangeFix;
				t = value + change;
				if (!isLarge && Math.abs(value - vMin) < 0.0001 &&
				!isNaN(firstStepChangeFix)) {
					t += firstStepChangeFix;
				}
				if (t > vTopValue) {
					t = vTopValue;
				}
			}
			else {
				if (Math.abs(value - vMin) < 0.001) {
					self._clearInterval();
					return false;
				}
				t = value - change;
				if (t < 0) {
					t = vMin;
				}
			}
			data = {
				oldValue: scroller.scrollValue,
				newValue: t,
				direction: dir,
				dir: scroller.dir
			};
			if (!self._scrolling(true, self, data)) {
				return false;
			}
			scroller.scrollValue = t;
			return true;
		},

		_doScrolling: function (dir, self, large) {
			// Does wijsuperpanel scrolling.
			// <param name="dir" type="String">
			// Scroll direction. 
			// Options are: "left", "right", "top" and "bottom".
			// </param>
			// <param name="self" type="jQuery">
			// Pointer to the wijsuperpanel widget instance.
			// </param>
			// <param name="large" type="Boolean">
			// Whether to scroll a large change.
			// </param>

			var o = self.options,
			vScroller = o.vScroller,
			hScroller = o.hScroller,
			vSmall = self._getVScrollBarSmallChange(),
			vLarge = self._getVScrollBarLargeChange(),
			hLarge = self._getHScrollBarLargeChange(),
			hSmall = self._getHScrollBarSmallChange();

			if (dir === "top" || dir === "bottom") {
				if (!self._setScrollerValue(dir, vScroller, vSmall, vLarge,
				dir === "bottom", large, self)) {
					return;
				}
				dir = "v";
			}
			else if (dir === "left" || dir === "right") {
				if (!self._setScrollerValue(dir, hScroller, hSmall, hLarge,
				dir === "right", large, self)) {
					return;
				}
				dir = "h";
			}
			self._setDragAndContentPosition(true, true, dir);
		},

		_disableButtonIfNeeded: function (self) {
			// Disables scrolling buttons.

			var f = self._fields(), o, buttonLeft, buttonRight, buttonTop, buttonBottom,
			hLargeChange, hMax, hValue, hScrollMin, vLargeChange, vMax, vValue,
			vScrollMin;
			if (f.intervalID > 0) {
				window.clearInterval(f.intervalID);
			}
			o = self.options;
			buttonLeft = f.buttonLeft;
			buttonRight = f.buttonRight;
			buttonTop = f.buttonTop;
			buttonBottom = f.buttonBottom;

			if (buttonLeft !== undefined) {
				hLargeChange = self._getHScrollBarLargeChange();

				hMax = o.hScroller.scrollMax - hLargeChange + 1;
				hValue = o.hScroller.scrollValue;
				hScrollMin = o.hScroller.scrollMin;

				if (hValue === undefined) {
					hValue = hScrollMin;
				}
				if (Math.abs(hValue - hScrollMin) < 0.001 || !f.hScrolling) {
					buttonLeft.addClass(uiStateDisabled);
				}
				else {
					buttonLeft.removeClass(uiStateDisabled);
				}
				if (Math.abs(hValue - hMax) < 0.001 || !f.hScrolling) {
					buttonRight.addClass(uiStateDisabled);
				}
				else {
					buttonRight.removeClass(uiStateDisabled);
				}
			}
			if (buttonTop !== undefined) {
				vLargeChange = self._getVScrollBarLargeChange();
				vMax = o.vScroller.scrollMax - vLargeChange + 1;
				vValue = o.vScroller.scrollValue;
				vScrollMin = o.vScroller.scrollMin;
				if (vValue === undefined) {
					vValue = vScrollMin;
				}
				if (Math.abs(vValue - vScrollMin) < 0.001 || !f.vScrolling) {
					buttonTop.addClass(uiStateDisabled);
				}
				else {
					buttonTop.removeClass(uiStateDisabled);
				}
				if (Math.abs(vValue - vMax) < 0.001 || !f.vScrolling) {
					buttonBottom.addClass(uiStateDisabled);
				}
				else {
					buttonBottom.removeClass(uiStateDisabled);
				}
			}
		},

		_clearInterval: function () {
			var f = this._fields(), intervalID = f.internalFuncID;
			if (intervalID > 0) {
				window.clearInterval(intervalID);
				f.internalFuncID = -1;
			}
		},

		_elementMouseOut: function (event) {
			var ele = $(event.currentTarget), self = event.data;

			ele.unbind("mouseout", self._elementMouseOut);
			ele.unbind("mousedown", self._elementMouseDown);
			ele.unbind("mouseup", self._elementMouseUp);

			ele.removeClass(uiStateHover);
		},

		scrollChildIntoView: function (child1) {
			/// <summary>
			/// Scroll children DOM element to view. 
			/// </summary>
			/// <param name="child" type="DOMElement/JQueryObj">
			/// The child to scroll to.
			/// </param>

			var child = $(child1), f, cWrapper, tempWrapper, left, top,
			childOffset, templateOffset, cWrapperOffset,
			tDistance, bDistance, lDistance, rDistance;

			if (child.size() === 0) {
				return;
			}
			f = this._fields();
			cWrapper = f.contentWrapper;
			tempWrapper = f.templateWrapper;
			childOffset = child.offset();
			templateOffset = tempWrapper.offset();

			childOffset.leftWidth = childOffset.left + child.outerWidth();
			childOffset.topHeight = childOffset.top + child.outerHeight();
			cWrapperOffset = cWrapper.offset();
			cWrapperOffset.leftWidth = cWrapperOffset.left + cWrapper.outerWidth();
			cWrapperOffset.topHeight = cWrapperOffset.top + cWrapper.outerHeight();

			lDistance = childOffset.left - templateOffset.left;
			if (childOffset.left < cWrapperOffset.left) {
				left = lDistance;
			}
			else if (childOffset.leftWidth > cWrapperOffset.leftWidth) {
				rDistance = childOffset.leftWidth - templateOffset.left -
				cWrapper.innerWidth();
				if (lDistance < rDistance) {
					left = lDistance;
				}
				else {
					left = rDistance;
				}
			}

			tDistance = childOffset.top - templateOffset.top;
			if (childOffset.top < cWrapperOffset.top) {
				top = tDistance;
			}
			else if (childOffset.topHeight > cWrapperOffset.topHeight) {
				bDistance = childOffset.topHeight - templateOffset.top -
				cWrapper.innerHeight();
				if (tDistance < bDistance) {
					top = tDistance;
				}
				else {
					top = bDistance;
				}
			}
			if (left !== undefined) {
				this.hScrollTo(left);
			}
			if (top !== undefined) {
				this.vScrollTo(top);
			}
		},

		hScrollTo: function (x) {
			/// <summary>
			/// Scroll to horizontal position.
			/// </summary>
			/// <param name="x" type="Number">
			/// The position to scroll to.
			/// </param>
			var o = this.options;
			//var f = this._fields();
			o.hScroller.scrollValue = this.scrollPxToValue(x, "h");
			//this._setDragAndContentPosition(false, true, "h", "nonestop");
			this._setDragAndContentPosition(true, true, "h", "nonestop");
		},

		vScrollTo: function (y) {
			/// <summary>
			/// Scroll to vertical position.
			/// </summary>
			/// <param name="y" type="Number">
			/// The position to scroll to.
			/// </param>

			var o = this.options;
			o.vScroller.scrollValue = this.scrollPxToValue(y, "v");
			//this._setDragAndContentPosition(false, true, "v", "nonestop");
			this._setDragAndContentPosition(true, true, "v", "nonestop");
		},

		scrollPxToValue: function (px, dir) {
			/// <summary>
			/// Convert pixel to scroll value.
			/// For example, wijsuperpanel scrolled 50px 
			///which is value 1 after conversion.
			/// </summary>
			/// <param name="px" type="Number">
			/// Length of scrolling.
			/// </param>
			/// <param name="dir" type="String">
			/// Scrolling direction. Options are: "h" and "v".
			/// </param>

			var o = this.options,
			m = (dir === "h" ? "outerWidth" : "outerHeight"),
			m1 = (dir === "h" ? "contentWidth" : "contentHeight"),
			scroller = (dir === "h" ? "hScroller" : "vScroller"),
			f = this._fields(),
			cWrapper = f.contentWrapper,
			//var tempWrapper = f.templateWrapper;
			size = f[m1],
			contentHeight = cWrapper[m](),

			vMin = o[scroller].scrollMin,
			vMax = o[scroller].scrollMax,
			vRange = vMax - vMin,
			vLargeChange = (dir === "h" ?
			this._getHScrollBarLargeChange() : this._getVScrollBarLargeChange()),
			maxv = vRange - vLargeChange + 1,
			ret = maxv * (px / (size - contentHeight));
			if (ret < vMin) {
				ret = vMin;
			}
			if (ret > maxv) {
				ret = maxv;
			}
			return ret;
		},

		scrollTo: function (x, y) {
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <param name="x" type="Number">
			/// Horizontal position to scroll to.	
			/// </param>
			/// <param name="y" type="Number">
			/// Vertical position to scroll to.
			/// </param>

			this.hScrollTo(x);
			this.vScrollTo(y);
		},

		refresh: function () {
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <returns type="Boolean">
			/// Returns true if it is successful, else returns false. 
			/// </returns>
			this.paintPanel();
		},

		paintPanel: function (unfocus) {
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <returns type="Boolean">
			/// Returns true if painting is successful, else returns false. 
			/// </returns>
			var self = this, ele = self.element, focused, o, f, templateWrapper;
			if (ele.is(":visible")) {
				focused = document.activeElement;
				o = self.options;
				f = self._fields();
				if (!f.initialized) {
					self._initialize(f, ele, self);
				}
				self._resetLargeChange(self, f, o);
				self._bindElementEvents(self, f, ele, o);
				templateWrapper = f.templateWrapper;
				templateWrapper.css({ "float": "left", left: "0px", top: "0px",
					width: "auto", height: "auto"
				});
				// hide and show wrapper div to force the width to change
				// for some browser.
				templateWrapper.hide();
				templateWrapper.show();
				f.contentWidth = templateWrapper.width();
				f.contentHeight = templateWrapper.height();
				templateWrapper.css("float", "");
				self._setRounder(self, ele);
				self._setInnerElementsSize(f, ele);
				if (self._testScroll(self, f, o) === false) {
					return false;
				}
				self._initScrollBars(self, f, o);
				self._initScrollButtons(self, f, o);
				self._trigger("painted");

				self._paintedMark = { date: new Date(), mainWidth: ele[0].offsetWidth,
					mainHeight: ele[0].offsetHeight, width: f.contentWidth,
					height: f.contentWidth
				};
				if (focused !== undefined && !unfocus) {
					$(focused).focus();
				}
				return true;
			}
			return false;
		},

		_resetLargeChange: function (self, f, o) {
			var handle;
			if (self._autoVLarge) {
				o.vScroller.scrollLargeChange = null;
			}
			if (self._autoHLarge) {
				o.hScroller.scrollLargeChange = null;
			}
			f.vTrackLen = undefined;
			f.hTrackLen = undefined;
			if (f.vbarContainer) {
				// fixed bug when the original draggable element removed when it's being dragged.
				// use detach to keep the events to be fired(IE).
				handle = f.vbarContainer.children("." +
				scrollerHandle + ":eq(0)");
				handle.detach();

				f.vbarContainer.remove();
				f.vbarContainer = undefined;
			}
			if (f.hbarContainer) {
				handle = f.hbarContainer.children("." +
				scrollerHandle + ":eq(0)");
				handle.detach();

				f.hbarContainer.remove();
				f.hbarContainer = undefined;
			}
		},

		_initialize: function (f, ele, self) {
			f.initialized = true;
			// ensure width and height
			ele.addClass(uiSuperPanelClasses);
			f.oldHeight = ele.css("height");
			var old = ele.css("overflow");
			ele.css("overflow", "");
			// set height to element
			ele.height(ele.height());
			ele.css("overflow", old);

			self._createAdditionalDom(self, f, ele);
		},

		getContentElement: function () {
			/// <summary>
			/// Gets the content element of wijsuperpanel.
			/// </summary>
			/// <returns type="JQueryObj" />

			return this._fields().templateWrapper;
		},

		_setButtonPosition: function (self, o, scroller, dir, target, f, state) {
			var h = dir === "h", mouseoverkey = "mouseover." + self.widgetName,
			decKey = h ? "buttonLeft" : "buttonTop",
			incKey = h ? "buttonRight" : "buttonBottom",
			decButton = f[decKey],
			incButton = f[incKey], html, buttons, defaultPosition;
			if (self._hasMode(scroller, "buttons") ||
			self._hasMode(scroller, "buttonshover")) {

				html = h ? hButtons : vButtons;
				if (decButton === undefined) {
					buttons = $(html).appendTo(state);
					buttons.bind(mouseoverkey, self, self._scrollButtonMouseOver);
					f[decKey] = decButton = state.children(h ?
					".wijmo-wijsuperpanel-buttonleft" : ".wijmo-wijsuperpanel-buttontop");
					f[incKey] = incButton = state.children(h ?
					".wijmo-wijsuperpanel-buttonright" :
					".wijmo-wijsuperpanel-buttonbottom");
				}
				defaultPosition = {
					my: h ? "left" : "top",
					of: target,
					at: h ? "left" : "top",
					collision: "none"
				};
				$.extend(defaultPosition, scroller.decreaseButtonPosition);
				decButton.position(defaultPosition);
				defaultPosition = {
					my: h ? "right" : "bottom",
					of: target,
					at: h ? "right" : "bottom",
					collision: "none"
				};
				$.extend(defaultPosition, scroller.increaseButtonPosition);
				incButton.position(defaultPosition);
			}
			else if (decButton !== undefined) {
				decButton.remove();
				incButton.remove();
				f[decKey] = f[incKey] = undefined;
			}
		},

		_initScrollButtons: function (self, f, o) {
			var a = f.contentWrapper,
			state = f.stateContainer;
			self._setButtonPosition(self, o, o.hScroller, "h", a, f, state);
			self._setButtonPosition(self, o, o.vScroller, "v", a, f, state);
		},

		_getVScrollBarSmallChange: function () {
			var o = this.options, va;
			if (!o.vScroller.scrollSmallChange) {
				va = this._getVScrollBarLargeChange();
				o.vScroller.scrollSmallChange = va / 2;
			}
			return o.vScroller.scrollSmallChange;
		},

		_getVScrollBarLargeChange: function () {
			return this._getLargeChange("v");
		},

		_getLargeChange: function (dir) {
			var self = this,
			o = self.options,
			f = self._fields(),
			v = dir === "v",
			scroller = v ? o.vScroller : o.hScroller,
			//clientKey = v ? "clientHeight" : "clientWidth",
			clientKey = v ? "innerHeight" : "innerWidth",
			offsetKey = v ? "contentHeight" : "contentWidth",
			autoKey = v ? "_autoVLarge" : "_autoHLarge",
			hMax, hMin, hRange, content, contentWidth, wrapperWidth, percent, large;

			if (scroller.scrollLargeChange) {
				return scroller.scrollLargeChange;
			}

			// calculate large change if empty
			hMax = scroller.scrollMax;
			hMin = scroller.scrollMin;
			hRange = hMax - hMin;

			content = f.contentWrapper;
			//contentWidth = content[0][clientKey];
			contentWidth = content[clientKey]();
			wrapperWidth = f[offsetKey];

			percent = contentWidth / (wrapperWidth - contentWidth);
			large = ((hRange + 1) * percent) / (1 + percent);
			if (isNaN(large)) {
				large = 0;
			}
			scroller.scrollLargeChange = large;

			self[autoKey] = true;
			return scroller.scrollLargeChange;
		},

		_getHScrollBarSmallChange: function () {
			var o = this.options, va;
			if (!o.hScroller.scrollSmallChange) {
				va = this._getHScrollBarLargeChange();
				o.hScroller.scrollSmallChange = va / 2;
			}
			return o.hScroller.scrollSmallChange;
		},

		_getHScrollBarLargeChange: function () {
			return this._getLargeChange("h");
		},

		_initScrollBars: function (self, f, o) {
			// Set scroll bar initial position.
			var hScroller = o.hScroller,
			hMax = hScroller.scrollMax,
			hMin = hScroller.scrollMin,
			hRange = hMax - hMin,

			vScroller = o.vScroller,
			vMax = vScroller.scrollMax,
			vMin = vScroller.scrollMin,
			vRange = vMax - vMin,

			hbarDrag = f.hbarDrag,
			vbarDrag = f.vbarDrag,
			hLargeChange, track, dragLen, difference, icon, vLargeChange,
			track1, dragLen1, difference1, icon1;
			if (self.hNeedScrollBar && hbarDrag.is(":visible")) {
				hLargeChange = self._getHScrollBarLargeChange();
				track = self._getTrackLen("h");
				dragLen = self._getDragLength(hRange, hLargeChange,
				track, o.hScroller.scrollMinDragLength);
				hbarDrag.width(dragLen);
				//difference = hbarDrag.outerWidth() - hbarDrag.width();
				difference = hbarDrag.outerWidth(true) - hbarDrag.width();
				hbarDrag.width(dragLen - difference);
				icon = hbarDrag.children("span");
				icon.css("margin-left", (hbarDrag.width() - icon[0].offsetWidth) / 2);
				//if (track <= hbarDrag.outerWidth()) {
				if (track <= hbarDrag.outerWidth(true)) {
					hbarDrag.hide();
				}
				else {
					hbarDrag.show();
				}
			}
			if (self.vNeedScrollBar && vbarDrag.is(":visible")) {
				vLargeChange = self._getVScrollBarLargeChange();
				track1 = self._getTrackLen("v");
				dragLen1 = self._getDragLength(vRange, vLargeChange, track1,
				o.vScroller.scrollMinDragLength);
				vbarDrag.height(dragLen1);
				//difference1 = vbarDrag.outerHeight() - vbarDrag.height();
				difference1 = vbarDrag.outerHeight(true) - vbarDrag.height();
				vbarDrag.height(dragLen1 - difference1);
				icon1 = vbarDrag.children("span");
				icon1.css("margin-top", (vbarDrag.height() - icon1[0].offsetHeight) / 2);
				//if (track1 <= vbarDrag.outerHeight()) {
				if (track1 <= vbarDrag.outerHeight(true)) {
					vbarDrag.hide();
				}
				else {
					vbarDrag.show();
				}
			}
			self._setDragAndContentPosition(false, false, "both");
		},

		_getTrackLen: function (dir) {
			// Get the length of the track.
			// <param name="dir" type="String">
			// Options are: "v" and "h".
			// "v" - Vertical scroll track.
			// "h" - Horizontal scroll track.
			// </param>

			var self = this,
			f = self._fields(),
			//var o = self.options;
			key = dir + "TrackLen",
			hbarContainer, vbarContainer, track, padding;
			if (f[key] !== undefined) {
				return f[key];
			}

			hbarContainer = f.hbarContainer;
			vbarContainer = f.vbarContainer;
			track = 0;
			padding = 0;
			if (dir === "h") {
				padding = self._getScrollContainerPadding("h");
				track = hbarContainer.innerWidth();
			}
			if (dir === "v") {
				padding = self._getScrollContainerPadding("v");
				track = vbarContainer.innerHeight();
			}
			f[key] = (track - padding);
			return f[key];
		},

		_getScrollContainerPadding: function (paddingType) {
			// Get the padding of the scroll bar container.
			var self = this,
			f = self._fields(),
			padding = 0, container, key;
			if (paddingType === "h") {
				padding = self._getScrollContainerPadding("left") +
				self._getScrollContainerPadding("right");
			}
			else if (paddingType === "v") {
				padding = self._getScrollContainerPadding("top") +
				self._getScrollContainerPadding("bottom");
			}
			else {
				if (paddingType === "left" || paddingType === "right") {
					container = f.hbarContainer;
				}
				else {
					container = f.vbarContainer;
				}
				key = paddingType + "Padding";
				if (f[key] !== undefined) {
					padding = f[key];
					return padding;
				}
				padding = parseFloat(container.css("padding-" +
				paddingType).replace("px", ""));
				f[key] = padding;
			}
			return padding;
		},

		_triggerScroll: function (contentLeft, dir, contentAnimationOptions) {
			var data = {
				position: contentLeft,
				dir: dir,
				animationOptions: contentAnimationOptions
			};
			this._trigger("scroll", null, data);
		},

		_contentDragAnimate: function (dir, animated, hbarContainer, hbarDrag,
		stop, fireScrollEvent, dragging) {
			var self = this,
			o = self.options,
			v = dir === "v",
			scroller = v ? o.vScroller : o.hScroller,
			tempKey = v ? "outerHeight" : "outerWidth",
			wrapKey = v ? "innerHeight" : "innerWidth",
			contentKey = v ? "contentHeight" : "contentWidth",
			paddingKey = v ? "top" : "left",
			hMin = scroller.scrollMin,
			hMax = scroller.scrollMax,
			hRange = hMax - hMin,
			hValue = scroller.scrollValue === undefined ?
			hMin : (scroller.scrollValue - hMin),
			hLargeChange = self._getLargeChange(dir),
			max = hRange - hLargeChange + 1,
			f = self._fields(),
			cWrapper = f.contentWrapper,
			tempWrapper = f.templateWrapper,
			contentLeft, dragleft, track, drag, r, padding, dragAnimationOptions,
			properties, contentAnimationOptions, userComplete, properties1, key;

			if (hValue > max) {
				hValue = max;
			}
			contentLeft = (f[contentKey] - cWrapper[wrapKey]()) * (hValue / max);
			if (Math.abs(contentLeft) < 0.001) {
				contentLeft = 0;
			}
			contentLeft = Math.round(contentLeft);
			dragleft = -1;
			if (hbarContainer !== undefined) {
				if (animated && hbarDrag.is(":animated") && stop !== "nonestop") {
					hbarDrag.stop(true, false);
				}
				track = self._getTrackLen(dir);
				//drag = hbarDrag[tempKey]();
				drag = hbarDrag[tempKey](true);
				r = track - drag;
				padding = self._getScrollContainerPadding(paddingKey);
				dragleft = (hValue / max) * r + padding;
			}
			if (animated && o.animationOptions && !o.animationOptions.disabled) {
				if (dragleft >= 0 && dragging !== "dragging") {
					dragAnimationOptions = $.extend({}, o.animationOptions);
					// not trigger scrolled when stop
					dragAnimationOptions.complete = undefined;
					properties = v ? { top: dragleft} : { left: dragleft };
					hbarDrag.animate(properties, dragAnimationOptions);
				}
				contentAnimationOptions = $.extend({}, o.animationOptions);
				userComplete = o.animationOptions.complete;
				contentAnimationOptions.complete = function () {
					self._scrollEnd(fireScrollEvent, self, dir);
					if ($.isFunction(userComplete)) {
						userComplete(arguments);
					}

				};
				if (animated && tempWrapper.is(":animated") && stop !== "nonestop") {
					tempWrapper.stop(true, false);
				}
				properties1 = v ? { top: -contentLeft} : { left: -contentLeft };
				tempWrapper.animate(properties1, contentAnimationOptions);
				self._triggerScroll(contentLeft, dir, contentAnimationOptions);
			}
			else {
				key = v ? "top" : "left";
				if (dragleft >= 0 && dragging !== "dragging") {

					hbarDrag[0].style[key] = dragleft + "px";
				}
				tempWrapper[0].style[key] = -contentLeft + "px";
				self._triggerScroll(contentLeft, dir);
				self._scrollEnd(fireScrollEvent, self, dir);
			}
		},

		_setDragAndContentPosition: function (fireScrollEvent, animated, dir,
		stop, dragging) {
			var self = this,
			f = self._fields(),
			hbarContainer = f.hbarContainer,
			hbarDrag = f.hbarDrag,
			vbarContainer = f.vbarContainer,
			vbarDrag = f.vbarDrag;
			if ((dir === "both" || dir === "h") && f.hScrolling) {
				self._contentDragAnimate("h", animated, hbarContainer, hbarDrag,
				stop, fireScrollEvent, dragging);
			}
			if ((dir === "both" || dir === "v") && f.vScrolling) {
				self._contentDragAnimate("v", animated, vbarContainer, vbarDrag,
				stop, fireScrollEvent, dragging);
			}
			if (f.intervalID > 0) {
				window.clearInterval(f.intervalID);
			}
			f.intervalID = window.setInterval(function () {
				self._disableButtonIfNeeded(self);
			}, 500);
		},

		_scrolling: function (fireEvent, self, d) {
			var r = true;

			if (fireEvent) {
				d.beforePosition = self.getContentElement().position();
				self._beforePosition = d.beforePosition;
				r = self._trigger("scrolling", null, d);
			}
			return r;
		},

		_scrollEnd: function (fireEvent, self, dir) {
			if (fireEvent) {
				// use settimeout to return to caller immediately.
				window.setTimeout(function () {
					var content = self.getContentElement(), after, d;
					if (!content.is(":visible")) {
						return;
					}
					after = self.getContentElement().position();
					d = {
						dir: dir,
						beforePosition: self._beforePosition,
						afterPosition: after
					};
					self._trigger("scrolled", null, d);
				}, 0);
			}
		},

		_getDragLength: function (range, largeChange, track, min) {
			var divide = range / largeChange,
			dragLength = track / divide,
			minidrag = min;
			if (dragLength < minidrag) {
				dragLength = minidrag;
			}
			else if ((dragLength + 1) >= track) {
				dragLength = track - 1;
			}
			return Math.round(dragLength);
		},

		_needScrollbar: function (scroller, needscroll) {
			var scrollbarMode = this._hasMode(scroller, "scrollbar"),
			barVisibility = scroller.scrollBarVisibility,
			needScrollBar = scrollbarMode && (barVisibility === "visible" ||
			(barVisibility === "auto" && needscroll));
			return needScrollBar;
		},

		_bindBarEvent: function (barContainer, barDrag, dir) {
			var self = this;
			barContainer.bind("mouseover." + self.widgetName, self,
			self._scrollerMouseOver);
			barDrag.draggable({
				axis: dir === "h" ? "x" : "y",
				drag: function (e, data) {
					self._dragging(e, data, self);
				},
				containment: "parent",
				stop: function (e) {
					self._dragStop(e, self, dir);
					$(e.target).removeClass("ui-state-active");
				}
			});
		},

		_createBarIfNeeded: function (hNeedScrollBar, scrollerWrapper,
		dir, html, content) {
			if (hNeedScrollBar) {
				var self = this, data,
				f = self._fields(),
				strBarContainer = dir + "barContainer",
				strBarDrag = dir + "barDrag",
				hbar = dir === "h",
				//contentLength = content[0][hbar ? "clientHeight" : "clientWidth"],
				contentLength = content[hbar ? "innerHeight" : "innerWidth"](),
				c = f[strBarContainer] = $(html), targetBarLen, d;

				scrollerWrapper.append(c);
				targetBarLen = c[0][hbar ? "offsetHeight" : "offsetWidth"];
				contentLength = contentLength - targetBarLen;

				data = {
					direction: hbar ? "horizontal" : "vertical",
					targetBarLen: targetBarLen,
					contentLength: contentLength
				};

				if (self._trigger(hbar ? "hScrollerActivating" : "vScrollerActivating",
				null, data) === false) {
					return false;
				}

				d = f[strBarDrag] = c.find("." + scrollerHandle);
				self._bindBarEvent(c, d, dir);

				content[hbar ? "height" : "width"](contentLength);

				// fixed bug on forum when set contentlength ,the width or height is changed.
//				f[hbar ? "contentWidth" : "contentHeight"] = 
//                f.templateWrapper[hbar ? "width" : "height"]();
	
			}
		},

		_setScrollbarPosition: function (wrapper, self, content,
					targetBarContainer, referBarContainer,
					targetNeedScrollBar, referNeedScrollBar,
					targetScrollBarPosition, referScrollBarPosition, dir, scrollingNeed) {
			var hbar = dir === "h", targetBarLen, targetPadding, targetBarPosition,
			barPosition1, contentPosition1, barPosition2, contentPosition2,
			contentLength2, referBarWidth;
			if (targetNeedScrollBar) {
				targetBarLen = targetBarContainer[0][hbar ?
				"offsetHeight" : "offsetWidth"];
				targetPadding = self._getScrollContainerPadding(dir);
				targetBarPosition = hbar ? "top" : "left";
				barPosition1 = hbar ? { top: "0px", bottom: "auto", left: "auto",
					right: "auto"
				} : { left: "0px", right: "auto", top: "auto",
					bottom: "auto"
				};
				contentPosition1 = hbar ? { top: targetBarLen + "px"} :
				{ left: targetBarLen + "px" };

				barPosition2 = hbar ? { top: "auto", right: "auto", left: "auto",
					bottom: "0px"
				} : { left: "auto", right: "0px", top: "auto",
					bottom: "auto"
				};
				contentPosition2 = hbar ? { top: ""} : { left: "" };
				//var contentLength = content[0][hbar? "clientHeight":"clientWidth"];
				//contentLength2 = content[0][hbar? "clientWidth":"clientHeight"];
				contentLength2 = content[hbar ? "innerWidth" : "innerHeight"]();
				if (targetScrollBarPosition === targetBarPosition) {
					targetBarContainer.css(barPosition1);
					content.css(contentPosition1);
					if (hbar) {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonleft")
						.removeClass("ui-corner-bl").addClass("ui-corner-tl");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonright")
						.removeClass("ui-corner-br").addClass("ui-corner-tr");
						targetBarContainer.removeClass("ui-corner-bottom")
						.addClass("ui-corner-top");
					}
					else {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttontop")
						.removeClass("ui-corner-tr").addClass("ui-corner-tl");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttonbottom")
						.removeClass("ui-corner-br").addClass("ui-corner-bl");
						targetBarContainer.removeClass("ui-corner-right")
						.addClass("ui-corner-left");
					}
				}
				else {
					targetBarContainer.css(barPosition2);
					content.css(contentPosition2);
					if (hbar) {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonleft")
						.removeClass("ui-corner-tl").addClass("ui-corner-bl");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-hbar-buttonright")
						.removeClass("ui-corner-bl").addClass("ui-corner-br");
						targetBarContainer.removeClass("ui-corner-top")
						.addClass("ui-corner-bottom");
					}
					else {
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttontop")
						.removeClass("ui-corner-tl").addClass("ui-corner-tr");
						targetBarContainer
						.children(".wijmo-wijsuperpanel-vbar-buttonbottom")
						.removeClass("ui-corner-bl").addClass("ui-corner-br");
						targetBarContainer.removeClass("ui-corner-left")
						.addClass("ui-corner-right");
					}
				}
				//content[hbar?"height":"width"](contentLength - targetBarLen);
				referBarWidth = 0;
				if (referNeedScrollBar) {
					referBarWidth = referBarContainer[0][hbar ?
					"offsetWidth" : "offsetHeight"];
					if (referScrollBarPosition === "left") {
						targetBarContainer.css("right", "0px");
					}
					else if (referScrollBarPosition === "right") {
						targetBarContainer.css("left", "0px");
					}
					else if (referScrollBarPosition === "top") {
						targetBarContainer.css("bottom", "0px");
					}
					else if (referScrollBarPosition === "bottom") {
						targetBarContainer.css("top", "0px");
					}
				}
				if (!hbar/*vbar*/ && referNeedScrollBar) {
					referBarWidth = 0;
				}

				targetBarContainer[hbar ? "width" : "height"](contentLength2 -
				targetPadding);
				self._enableDisableScrollBar(dir, targetBarContainer, !scrollingNeed);
			}
			else {
				wrapper.css(hbar ? "left" : "top", "");
			}
		},

		_testScroll: function (self, f, o) {
			var wrapper = f.templateWrapper,
			content = f.contentWrapper,
			scrollerWrapper = f.stateContainer,
			contentWidth = content.innerWidth(),
			contentHeight = content.innerHeight(),
			wrapperWidth = f.contentWidth,
			wrapperHeight = f.contentHeight,
			hNeedScrollBar, vNeedScrollBar, hbarContainer, vbarContainer,
			hbarPosition, vbarPosition;
			f.hScrolling = wrapperWidth > contentWidth;
			f.vScrolling = wrapperHeight > contentHeight;

			hNeedScrollBar = self.hNeedScrollBar =
			self._needScrollbar(o.hScroller, f.hScrolling);
			if (self._createBarIfNeeded(hNeedScrollBar, scrollerWrapper,
			"h", hbarHtml, content) === false) {
				return false;
			}
			// having h scroll bar, but no vscroll bar, we need to test vscrolling again.
			if (hNeedScrollBar && !f.vScrolling) {
				wrapper.css("float", "left");
				f.contentHeight = wrapper.height();
				f.vScrolling = f.contentHeight > (contentHeight -
				f.hbarContainer[0].offsetHeight);

				wrapper.css("float", "");
			}

			vNeedScrollBar = self.vNeedScrollBar =
			self._needScrollbar(o.vScroller, f.vScrolling);
			if (self._createBarIfNeeded(vNeedScrollBar, scrollerWrapper, "v",
			vbarHtml, content) === false) {
				return false;
			}

			if (vNeedScrollBar && !f.hScrolling) {
				wrapper.css("float", "left");
				f.contentWidth = wrapper.width();

				//contentWidth = 
				f.hScrolling = f.contentWidth > (contentWidth -
				f.vbarContainer[0].offsetWidth);
				wrapper.css("float", "");
				if (f.hScrolling && !hNeedScrollBar) {
					hNeedScrollBar = self.hNeedScrollBar =
					self._needScrollbar(o.hScroller, f.hScrolling);
					if (self._createBarIfNeeded(hNeedScrollBar, scrollerWrapper, "h",
					 hbarHtml, content) === false) {
						return false;
					}
				}
			}

			hbarContainer = f.hbarContainer;
			vbarContainer = f.vbarContainer;
			hbarPosition = o.hScroller.scrollBarPosition;
			vbarPosition = o.vScroller.scrollBarPosition;

			self._setScrollbarPosition(wrapper, self, content, hbarContainer,
			vbarContainer, hNeedScrollBar, vNeedScrollBar, hbarPosition,
			vbarPosition, "h", f.hScrolling);
			self._setScrollbarPosition(wrapper, self, content, vbarContainer,
			hbarContainer, vNeedScrollBar, hNeedScrollBar, vbarPosition,
			hbarPosition, "v", f.vScrolling);
		},

		_enableDisableScrollBar: function (bar, barContainer, disable) {
			// Disables scroll bar.
			// <param name="bar" type="String">
			// Scrollbar to disable. 
			// Options are: "h" and "v"
			// </param>
			// <param name="barContainer" type="jQuery">
			// The scroll bar container jQuery object.
			// </param>
			// <param name="disable" type="Boolean">
			// Whether to disable scroll bar.
			// </param>

			if (bar === "v") {
				barContainer[disable ? "addClass" :
				"removeClass"]("wijmo-wijsuperpanel-vbarcontainer-disabled");
				barContainer.find("." + uiStateDefault)[disable ? "addClass" :
				"removeClass"](uiStateDisabled);
			}
			else if (bar === "h") {
				barContainer[disable ? "addClass" :
				"removeClass"]("wijmo-wijsuperpanel-hbarcontainer-disabled");
				barContainer.find("." + uiStateDefault)[disable ? "addClass" :
				"removeClass"](uiStateDisabled);
			}
			barContainer.children("." + scrollerHandle)[disable ? "hide" : "show"]();
		},

		_initResizer: function () {
			// Initialize reseizer of wijsuperpanel.

			var self = this, o = self.options,
			f = self._fields(),
			resizer = f.resizer,
			resizableOptions, oldstop;

			if (!resizer && o.allowResize) {
				resizableOptions = o.resizableOptions;
				oldstop = resizableOptions.stop;
				resizableOptions.stop = function (e) {
					self._resizeStop(e, self);
					if ($.isFunction(oldstop)) {
						oldstop(e);
					}
				};
				f.resizer = resizer = self.element.resizable(resizableOptions);
			}
			if (!o.allowResize && f.resizer) {
				resizer.resizable("destroy");
				f.resizer = null;
			}
		},

		_resizeStop: function (e, self) {
			// give the chance to autoRefresh polling to repaint.
			if (!this.options.autoRefresh) {
				self.paintPanel(true);
			}
			self._trigger("resized");
		},

		_createAdditionalDom: function (self, f, ele) {

			// make sure the key pressing event work in FireFox.
			if (!ele.attr("tabindex")) {
				ele.attr("tabindex", "-1");
				f.tabindex = true;
			}
			var stateContainer = f.stateContainer = $(innerElementHtml),
			templateW;
			// move child element to content wrapper div of wijsuperpanel.
			f.contentWrapper = stateContainer.children();
			templateW = f.templateWrapper = f.contentWrapper.children();
			ele.contents().each(function (index, el) {
				var jel = $(el);
				if (jel.hasClass("wijmo-wijsuperpanel-header")) {
					f.header = jel;
					return;
				}
				if (jel.hasClass("wijmo-wijsuperpanel-footer")) {
					f.footer = jel;
					return;
				}
				templateW[0].appendChild(el);
			});

			// apeend header to first element.
			if (f.header !== undefined) {
				ele.prepend(f.header);
			}
			ele[0].appendChild(stateContainer[0]);
			// apeend footer to first element.
			if (f.footer !== undefined) {
				f.footer.insertAfter(stateContainer);
			}
		},

		_setRounder: function (self, ele) {
			if (this.options.showRounder) {
				ele.addClass(rounderClass);
				if (self._rounderAdded) {
					return;
				}
				if ($.browser.msie) {
					return;
				}
				var key1, key, value, border;
				key1 = key = "";

				if ($.browser.webkit) {
					key = "WebkitBorderTopLeftRadius";
					key1 = "WebkitBorderRadius";
				}
				else if ($.browser.mozilla) {
					key = "MozBorderRadiusBottomleft";
					key1 = "MozBorderRadius";
				}
				else {
					key = "border-top-left-radius";
					key1 = "border-radius";
				}
				value = ele.css(key);
				border = parseInt(value, 10);
				// adding 1 extra to out-most radius.

				ele.css(key1, border + 1);
				self._rounderAdded = true;
				self._radiusKey = key1;
			}
			else {
				ele.removeClass(rounderClass);
			}
		},

		_setInnerElementsSize: function (f, ele) {
			var state = f.stateContainer,
			content = f.contentWrapper,
			height = 0, style, clientHeight, clientWidth, style2;
			if (f.header !== undefined) {
				height += f.header.outerHeight();
			}
			if (f.footer !== undefined) {
				height += f.footer.outerHeight();
			}

			style = state[0].style;
			//clientHeight = ele[0].clientHeight - height;
			//clientWidth = ele[0].clientWidth;
			clientHeight = ele.innerHeight() - height;
			clientWidth = ele.innerWidth();
			// hide element before setting width and height to improve 
			//javascript performance in FF3.
			style.display = "none";
			style.height = clientHeight + "px";
			style.width = clientWidth + "px";
			style2 = content[0].style;
			style2.height = clientHeight + "px";
			style2.width = clientWidth + "px";
			style.display = "";
		}
	});
} (jQuery));
/*globals jQuery */
/*
*
* Wijmo Library 1.1.6
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo TextBoxDecorator widget.
* 
* Depends:
*  jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*/
(function ($) {
	"use strict";
	$.widget("wijmo.wijtextbox", {
		options: {
		},
		_create: function () {
			var self = this, e = self.element,
				allowedNodes = { 'input': true, 'textarea': true },
				allowedInputTypes = { 'text': true, 'password': true, 
					'email': true, 'url': true },
				nodeName = e.get(0).nodeName.toLowerCase();

			if (!allowedNodes.hasOwnProperty(nodeName)) {
				return;
			}
			if ((nodeName === 'input') &&
				!allowedInputTypes.hasOwnProperty(self.element.attr("type")
				.toLowerCase())) {
				return;
			}

			e.addClass("wijmo-wijtextbox ui-widget ui-state-default ui-corner-all");
			self.element.bind("mouseover." + self.widgetName, function () {
				e.addClass("ui-state-hover");
			}).bind("mouseout." + self.widgetName, function () {
				e.removeClass("ui-state-hover");
			}).bind("mousedown." + self.widgetName, function () {
				e.addClass("ui-state-active");
			}).bind("mouseup." + self.widgetName, function () {
				e.removeClass("ui-state-active");
			}).bind("focus." + self.widgetName, function () {
				e.addClass("ui-state-focus");
			}).bind("blur." + self.widgetName, function () {
				e.removeClass("ui-state-focus");
			});
			
			//for case 20899
			if (e.is(":disabled")) {
				self._setOption("disabled", true);
				e.addClass("ui-state-disabled");
			} else {
				self._setOption("disabled", false);
				e.removeClass("ui-state-disabled");
			}
		},
		destroy: function () {
			/// Remove the functionality completely. 
			/// This will return the element back to its pre-init state.
			var self = this;
			self.element.removeClass("ui-widget ui-state-default ui-corner-all " +
			"ui-state-hover ui-state-active wijmo-wijtextbox")
			.unbind("." + self.widgetName);
			$.Widget.prototype.destroy.apply(self);
		}
	});
} (jQuery));
/*globals jQuery,document,window*/
/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Dropdown widget.
* 
* Depends:
*	jquery.js
*	jquery.ui.js
*	jquery.mousewheel.js
*	jquery.bgiframe.js
*	jquery.wijmo.wijsuperpanel.js

*
*/
(function ($) {
	"use strict";
	$.widget("wijmo.wijdropdown", {
		options: {
			zIndex: 1000,
			showingAnimation: { effect: "blind" },
			hidingAnimation: { effect: "blind" }
		},
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		focusClass: "ui-state-focus",

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);
			if (key === "disabled") {
				this._labelWrap.toggleClass("ui-state-disabled", value);
				this.element.attr("disabled", value ? "disabled" : "");
			}
		},

		_create: function () {
			var self = this,
				ele = self.element;
			if (ele.get(0).tagName.toLowerCase() !== "select") {
				return;
			}

			if (ele.is(":visible")) {
				self._activeItem = null;
				self._createSelect();
				self._bindEvents();
				self.needInit = false;
			}
			else {
				self.needInit = true;
			}
		},

		_createSelect: function () {
			var self = this,
				ele = self.element,
				width = ele.width(),
				eleWidth = width,
			//height = ele.height(),
				selectWrap = ele.wrap("<div></div>").parent()
					.addClass("ui-helper-hidden"),
				container = selectWrap.wrap("<div></div>")
					.parent().attr("role", "select")
					.addClass("wijmo-wijdropdown ui-widget ui-widwijmo-wijdropdownt" +
					"-content ui-state-default ui-corner-all ui-helper-clearfix"),
				label = $("<label class=\"wijmo-dropdown-label ui-corner-all\"></label>")
					.attr("id", ele.get(0).id + "_select")
					.attr("name", ele.attr("name") || ""),
				rightTrigger = $("<div></div>")
					.addClass("wijmo-dropdown-trigger ui-state-default ui-corner-right"),
				labelWrap = $("<a href=\"#\"></a>"),
				listContainer = $("<div>").addClass("wijmo-dropdown"),
				list = $("<ul></ul>")
					.addClass("wijmo-dropdown-list ui-widget-content " +
					"ui-widget ui-corner-all ui-helper-reset").appendTo(listContainer);

			$("<span></span>")
					.addClass("ui-icon ui-icon-triangle-1-s")
					.appendTo(rightTrigger);


			width = Math.max(width, container.width());
			if (ele.get(0).tabIndex !== "") {
				labelWrap.attr("tabindex", ele.attr("tabindex"));
			}

			if (ele.get(0).disabled !== false) {
				self.options.disabled = true;
				labelWrap.addClass("ui-state-disabled");
			}

			labelWrap.append(label);
			container.append(selectWrap)
				.append(labelWrap)
				.append(rightTrigger)
				.append(listContainer);
			eleWidth += parseInt(label.css("padding-left").replace(/px/, ""), 10);
			eleWidth += parseInt(label.css("padding-right").replace(/px/, ""), 10);
			eleWidth -= 16;
			container.width(eleWidth);

			self._buildList(list, listContainer, eleWidth);

			self._rightTrigger = rightTrigger;
			self._label = label;
			self._listContainer = listContainer;
			self._list = list;
			self._value = ele.val();
			self._selectWrap = selectWrap;
			self._labelWrap = labelWrap;
			self._container = container;
		},

		_buildList: function (list, listContainer, eleWidth) {
			var self = this,
				ele = self.element, height;
			
			listContainer.show();

			ele.children().each(function (i, n) {
				var item = $(n),
					group, groupText, goupItems;
				if (item.is("option")) {
					list.append(self._buildItem(item));
				}
				else {
					group = $("<li class=\"wijmo-dropdown-optgroup\"></li>");
					groupText = $("<span>" + item.attr("label") + "</span>")
					.addClass("wijmo-optgroup-header ui-priority-primary");
					goupItems = $("<ul></ul>")
					.addClass("ui-helper-reset wijmo-dropdown-items");

					item.children("option").each(function () {
						goupItems.append(self._buildItem($(this)));
					});
					group.append(groupText)
						.append(goupItems);
					list.append(group);
				}
			});
			
			//update for fixing height setting is incorrect when 
			//execute refresh at 2011/11/30
			listContainer.height("");
			//end for height setting
			
			height = listContainer.height();
			height = list.outerHeight() < height ? list.outerHeight() : height;

			listContainer.css({
				height: height,
				width: eleWidth
			});
			
			//update for fixing can't show all dropdown items by wuhao at 2012/2/24
			list.setOutWidth(list.parent().parent().innerWidth() - 18);
			//end for issue
			
			if (listContainer.data("wijsuperpanel")) {
				listContainer.wijsuperpanel("paintPanel");
				self.superpanel = listContainer.data("wijsuperpanel");
			}
			else {
				self.superpanel = listContainer.wijsuperpanel().data("wijsuperpanel");
			}
			if ($.fn.bgiframe) {
				self.superpanel.element.bgiframe();
			}
			
			//update for fixing can't show all dropdown items by wuhao at 2012/2/24
			//list.setOutWidth(list.parent().parent().innerWidth());
			if (!self.superpanel.vNeedScrollBar) {
				list.setOutWidth(list.parent().parent().innerWidth());
				self.superpanel.refresh();
			}
			//end for issue
			
			listContainer.hide();
		},

		_handelEvents: function (ele) {
			var self = this,
				namespace = "." + self.widgetName,
				element = self.element;

			ele.bind("click" + namespace, function (e) {
				if (self.options.disabled) {
					return;
				}
				if (self._listContainer.is(":hidden")) {
					self._show();
				}
				else {
					self._hide();
				}
				element.click();
				if (ele.get(0) === self._label.get(0)) {
					e.preventDefault();
				}
				else {
					self._labelWrap.focus();
				}
			}).bind("mouseover" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.addClass(self.hoverClass);
				self._rightTrigger.addClass(self.hoverClass);
				element.trigger('mouseover');
			}).bind("mouseout" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.removeClass(self.hoverClass);
				self._rightTrigger.removeClass(self.hoverClass);
				element.trigger('mouseout');
			}).bind("mousedown" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.addClass(self.activeClass);
				self._rightTrigger.addClass(self.activeClass);
				element.trigger('mousedown');
			}).bind("mouseup" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.removeClass(self.activeClass);
				self._rightTrigger.removeClass(self.activeClass);
				element.trigger('mouseup');
			});
		},

		_bindEvents: function () {
			var self = this,
				namespace = "." + self.widgetName,
				label = self._label,
				rightTrigger = self._rightTrigger,
				labelWrap = self._labelWrap,
				listContainer = self._listContainer,
				ele = self.element,
				offset;
			self._handelEvents(self._label);
			self._handelEvents(self._rightTrigger);

			$(document.body).bind("click" + namespace, function (e) {
				if (listContainer.is(":hidden")) {
					return;
				}
				offset = listContainer.offset();
				if (e.target === label.get(0) ||
				e.target === rightTrigger.get(0) ||
				e.target === rightTrigger.children().get(0)) {
					return;
				}
				if (e.pageX < offset.left ||
					e.pageX > offset.left + listContainer.width() ||
					e.pageY < offset.top ||
					e.pageY > offset.top + listContainer.height()) {
					self._hide();
				}
			});

			listContainer.bind("click" + namespace, function (e) {
				var target = $(e.target);
				if (target.closest("li.wijmo-dropdown-item", $(this)).length > 0) {
					self._setValue();
					listContainer.css("z-index", "");
					if ($.browser.msie && /^[6,7].[0-9]+/.test($.browser.version)) {
						listContainer.parent().css("z-index", "");
					}
					listContainer.hide();
					self.oldVal = ele.val();
					ele.val(self._value);
					if (self.oldVal !== self._value) {
						ele.trigger("change");
					}
				}
				ele.click();
			});

			labelWrap.bind("keydown" + namespace, function (e) {
				if (self.options.disabled) {
					return;
				}
				var keyCode = $.ui.keyCode;
				switch (e.which) {
				case keyCode.UP:
				case keyCode.LEFT:
					self._previous();
					self._setValue();
					//update for issue that can't get value with keydown
					//by wh at 2012/1/19
					self._setValueToEle();
					//end for issue about keydown
					break;
				case keyCode.DOWN:
				case keyCode.RIGHT:
					self._next();
					self._setValue();
					//update for issue that can't get value with keydown
					//by wh at 2012/1/19
					self._setValueToEle();
					//end for issue about keydown
					break;
				case keyCode.PAGE_DOWN:
					self._nextPage();
					self._setValue();
					//update for issue that can't get value with keydown
					//by wh at 2012/1/19
					self._setValueToEle();
					//end for issue about keydown
					break;
				case keyCode.PAGE_UP:
					self._previousPage();
					self._setValue();
					//update for issue that can't get value with keydown
					//by wh at 2012/1/19
					self._setValueToEle();
					//end for issue about keydown
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					self._setValue();
					self._listContainer.hide();
					//update for issue that can't get value with keydown
					//by wh at 2012/1/19
					self._setValueToEle();
					//end for issue about keydown
					break;
				}
				if (e.which !== keyCode.TAB) {
					e.preventDefault();
				}
				ele.trigger('keydown');
			}).bind("focus" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				label.addClass(self.focusClass);
				rightTrigger.addClass(self.focusClass);
				ele.focus();
			}).bind("blur" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				label.removeClass(self.focusClass);
				rightTrigger.removeClass(self.focusClass);
				ele.trigger('blur');
			}).bind("keypress" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				ele.trigger('keypress');
			}).bind("keyup" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				ele.trigger('keyup');
			});
		},

		_init: function () {
			var self = this;
			self._initActiveItem();
			if (self._activeItem) {
				self._label.text(self._activeItem.text());
			}
		},

		_buildItem: function ($item) {
			var val = $item.val(), text = $item.text(), self = this, $li;
			if (text === "") {
				text = "&nbsp;";
			}
			$li = $("<li class=\"wijmo-dropdown-item ui-corner-all\"><span>" +
				text + "</span></li>")
				.mousemove(function (event) {
					var current = $(event.target).closest(".wijmo-dropdown-item");
					if (current !== this.last) {
						self._activate($(this));
					}
					this.last = $(event.target).closest(".wijmo-dropdown-item");
				}).attr("role", "option");
			$li.data("value", val);
			return $li;
		},

		_show: function () {
			var self = this, listContainer = self._listContainer,
				showingAnimation = self.options.showingAnimation;
			listContainer.css("z-index", "100000");
			if ($.browser.msie && /^[6,7]\.[0-9]+/.test($.browser.version)) {
				listContainer.parent().css("z-index", "99999");
			}
			if (showingAnimation) {
				//update for fixing 20652 issue by wh at 2012/3/19
				//listContainer.stop().show(
				listContainer.show(
				//end for fixing issue 20652
				showingAnimation.effect,
				showingAnimation.options,
				showingAnimation.speed,
				function () {
					self._initActiveItem();
				});
			}
			else {
				listContainer.show();
			}
		},

		_hide: function () {
			var self = this, listContainer = self._listContainer,
				hidingAnimation = self.options.hidingAnimation;

			if (listContainer.is(":hidden")) {
				return;
			}
			if (hidingAnimation) {
				//update for fixing 20652 issue by wh at 2012/3/19
				//listContainer.stop(false, true).hide(
				listContainer.hide(
				//end for fixing issue 20652
				hidingAnimation.effect,
				hidingAnimation.options,
				hidingAnimation.speed,
				function () {
					if ($.isFunction(hidingAnimation.callback)) {
						hidingAnimation.callback.apply(self, arguments);
					}
					if ($.browser.msie && /^[6,7]\.[0-9]+/.test($.browser.version)) {
						listContainer.parent().css("z-index", "");
					}
					listContainer.css("z-index", "");
				});
			}
			else {
				if ($.browser.msie && $.browser.version === "6.0") {
					listContainer.parent().css("z-index", "");
				}
				listContainer.css("z-index", "");
				listContainer.hide();
			}
		},

		_setValue: function () {
			var self = this, listContainer = self._listContainer, top, height;
			if (self._activeItem) {
				self._label.text(self._activeItem.text());
				self._value = self._activeItem.data("value");

				if (self.superpanel.vNeedScrollBar) {
					top = self._activeItem.offset().top;
					height = self._activeItem.outerHeight();
					if (listContainer.offset().top > top) {
						listContainer.wijsuperpanel("scrollTo", 0,
						top - self._list.offset().top);
					}
					else if (listContainer.offset().top < top + height -
						listContainer.innerHeight()) {
						listContainer.wijsuperpanel("scrollTo", 0,
						top + height - listContainer.height() - self._list.offset().top);
					}
				}
			}
		},
		
		_setValueToEle: function () {
			var self = this, ele = self.element;
			
			self.oldVal = ele.val();
			ele.val(self._value);
			if (self.oldVal !== self._value) {
				ele.trigger("change");
			}
		},

		_initActiveItem: function () {
			var self = this;
			if (self._value !== undefined) {
				self._list.find("li.wijmo-dropdown-item").each(function () {
					if ($(this).data("value") === self._value) {
						self._activate($(this));
					}
				});
			}
		},

		_activate: function (item) {
			var self = this;
			self._deactivate();
			self._activeItem = item;
			self._activeItem.addClass(self.hoverClass).attr("aria-selected", true);
		},

		_deactivate: function () {
			var self = this;
			if (self._activeItem) {
				self._activeItem.removeClass(self.hoverClass)
				.attr("aria-selected", false);
			}
		},

		_next: function () {
			this._move("next", "first");
		},

		_previous: function () {
			this._move("prev", "last");
		},

		_nextPage: function () {
			this._movePage("first");
		},

		_previousPage: function () {
			this._movePage("last");
		},

		refresh: function () {
			/// Use the refresh method to set the drop-down element's style.
			var self = this, containerWidth;

			if (self.needInit) {
				if (self.element.is(":visible")) {
					self._activeItem = null;
					self._createSelect();
					self._bindEvents();
					self._init();
					self.needInit = false;
				}
			}
			else {
				if (!self._list) {
					return;
				}
				
				self._listContainer.show();
				//update for fixing width settings is wrong when
				//execute refresh method at 2011/11/30
				//containerWidth = self._listContainer.width();
				self._selectWrap.removeClass("ui-helper-hidden");
				containerWidth = self.element.width();
				containerWidth += parseInt(self._label.css("padding-left")
				.replace(/px/, ""), 10);
				containerWidth += parseInt(self._label.css("padding-right")
				.replace(/px/, ""), 10);
				containerWidth -= 16;
				self._container.width(containerWidth);
				self._selectWrap.addClass("ui-helper-hidden");
				//end for fixing width settings at 2011/11/30
				
				self._list.empty();
				self._buildList(self._list, self._listContainer, containerWidth);
				self._value = self.element.val();
				self._initActiveItem();
				if (self._activeItem) {
					self._label.text(self._activeItem.text());
				}
			}
		},

		_move: function (direction, edge) {
			var self = this, $nextLi, next;
			if (!self._activeItem) {
				self._activate(self._list.find(".wijmo-dropdown-item:" + edge));
				return;
			}
			$nextLi = self._activeItem[direction]().eq(0);
			if ($nextLi.length) {
				next = self._getNextItem($nextLi, direction, edge);
			}
			else if (self._activeItem.closest(".wijmo-dropdown-optgroup").length) {
				next = self._getNextItem(self._activeItem
				.closest(".wijmo-dropdown-optgroup")[direction](),
				direction, edge);
			}
			if (next && next.length) {
				self._activate(next);
			} else {
				self._activate(self._list.find(".wijmo-dropdown-item:" + edge));
			}
		},

		_movePage: function (direction) {//argu: "first","last"
			var self = this, base, height, result,
			antiDirection = direction === "first" ? "last" : "first";
			if (self.superpanel.vNeedScrollBar) {
				base = self._activeItem.offset().top;
				height = self.options.height;
				result = self._list.find(".wijmo-dropdown-item")
				.filter(function () {
					var close = $(this).offset().top - base +
					(direction === "first" ? -height : height) + $(this).height(),
					lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});
				if (!result.length) {
					result = self._list.find(".wijmo-dropdown-item:" +
					antiDirection);
				}
				self._activate(result);
			} else {
				self._activate(self._list.find(".wijmo-dropdown-item:" +
				(!self._activeItem ? direction : antiDirection)));
			}
		},

		_getNextItem: function (next, direction, edge) {
			if (next.length) {
				if (next.is(".wijmo-dropdown-optgroup")) {
					if (!!next.find(">ul>li.wijmo-dropdown-item").length) {
						return next.find(">ul>li.wijmo-dropdown-item:" + edge).eq(0);
					} else {
						this._getNextItem(next[direction]().eq(0));
					}
				} else {
					return next;
				}
			}
		},

		destroy: function () {
			/// Remove the functionality completely. 
			/// This will return the element back to its pre-init state.
			this.element.closest(".wijmo-wijdropdown")
			.find(">div.wijmo-dropdown-trigger,>div.wijmo-dropdown," +
			">a").remove();
			this.element.unwrap().unwrap().removeData("maxZIndex");
			$.Widget.prototype.destroy.apply(this);
		}
	});
} (jQuery));
/*globals jQuery*/
/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo CheckBoxDecorator widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 *
 */
(function ($) {
	"use strict";
	var checkboxId = 0;
	$.widget("wijmo.wijcheckbox", {
		_csspre: "wijmo-checkbox",
		_init: function () {
			var self = this,
				ele = self.element,
				o = self.options,
				checkboxElement, label, targetLabel, boxElement, iconElement;
			if (ele.is(":checkbox")) {
				if (!ele.attr("id")) {
					ele.attr("id", self._csspre + checkboxId);
					checkboxId += 1;
				}
				if (ele.parent().is("label")) {
					checkboxElement = ele.parent()
					.wrap("<div class='" + self._csspre + "-inputwrapper'></div>")
					.parent()
					.wrap("<div></div>").parent().addClass(self._csspre + " ui-widget");
					label = ele.parent();
					label.attr("for", ele.attr("id"));
					checkboxElement.find("." + self._csspre + "-inputwrapper")
					.append(ele);
					checkboxElement.append(label);
				}
				else {
					checkboxElement = ele
					.wrap("<div class='" + self._csspre + "-inputwrapper'></div>")
					.parent().wrap("<div></div>").parent()
					.addClass(self._csspre + " ui-widget");
				}
				targetLabel = $("label[for='" + ele.attr("id") + "']");
				if (targetLabel.length > 0) {
					checkboxElement.append(targetLabel);
					targetLabel.attr("labelsign", "C1");
				}
				if (ele.is(":disabled")) {
					self._setOption("disabled", true);
				}
				boxElement = $("<div class='" + self._csspre +
				"-box ui-widget ui-state-" +
				(o.disabled ? "disabled" : "default") +
				" ui-corner-all'><span class='" +
				self._csspre + "-icon'></span></div>");
				iconElement = boxElement.children("." + self._csspre + "-icon");
				checkboxElement.append(boxElement);
				ele.data("iconElement", iconElement);
				ele.data("boxElement", boxElement);

				boxElement.removeClass(self._csspre + "-relative")
				.attr("role", "checkbox")
				.bind("mouseover", function () {
					ele.mouseover();
				}).bind("mouseout", function () {
					ele.mouseout();
				});
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(self._csspre + "-relative");
				}
				ele.bind("click.checkbox", function (e) {
					self.refresh(e);
				}).bind("focus.checkbox", function () {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover")
					.addClass("ui-state-default");
				}).bind("keydown.checkbox", function (e) {
					if (e.keyCode === 32) {
						if (o.disabled) {
							return;
						}
						self.refresh();
					}
				});

				boxElement.bind("click.checkbox", function (e) {
					ele.get(0).checked = !ele.get(0).checked;
					ele.change();
					ele.focus();
					self.refresh(e);
				});

				self.refresh();
				checkboxElement.bind("mouseover.checkbox", function (e) {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");

				}).bind("mouseout.checkbox", function (e) {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus")
					.addClass("ui-state-default");
				});
			}
		},

		refresh: function (e) {
			/// Use the refresh method to set the checkbox element's style.
			var self = this;
			self.element.data("iconElement")
			.toggleClass("ui-icon ui-icon-check", self.element.get(0).checked);
			self.element.data("boxElement")
			.toggleClass("ui-state-active", self.element.get(0).checked)
			.attr("aria-checked", self.element.get(0).checked);
			if (e) {
				e.stopPropagation();
			}
		},

		destroy: function () {
			/// Remove the functionality completely. 
			/// This will return the element back to its pre-init state.
			var self = this, boxelement = self.element.parent().parent();
			boxelement.children("div." + self._csspre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
} (jQuery));
/*globals jQuery*/
/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo RadioButtonDecorator widget.
 * 
 * Depends:
 *   jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
	"use strict";
	var radiobuttonId = 0;
	$.widget("wijmo.wijradio", {
		_radiobuttonPre: "wijmo-wijradio",
		_create: function () {
			var self = this,
				ele = self.element,
				radiobuttonElement, label, targetLabel, boxElement, iconElement;

			if (ele.is(":radio")) {
				if (!ele.attr("id")) {
					ele.attr("id", "wijmo-radio-" + radiobuttonId);
					radiobuttonId += 1;
				}
				if (ele.parent().is("label")) {
					radiobuttonElement = ele.parent().wrap("<div class='" +
					self._radiobuttonPre + "-inputwrapper'></div>").parent()
					.wrap("<div></div>").parent()
					.addClass(self._radiobuttonPre + " ui-widget");
					label = ele.parent();
					label.attr("for", ele.attr("id"));
					radiobuttonElement.find("." + self._radiobuttonPre + "-inputwrapper")
					.append(ele);
					radiobuttonElement.append(label);

				}
				else {
					radiobuttonElement = ele
					.wrap("<div class='" + self._radiobuttonPre + "-inputwrapper'></div>")
					.parent().wrap("<div></div>").parent()
					.addClass(self._radiobuttonPre + " ui-widget");
				}
				targetLabel = $("label[for='" + ele.attr("id") + "']");
				if (targetLabel.length > 0) {
					radiobuttonElement.append(targetLabel);
					targetLabel.attr("labelsign", "wij");
					//targetLabel.attr("tabindex", 0);
				}

				if (ele.is(":disabled")) {
					self._setOption("disabled", true);
				}

				boxElement = $("<div class='" + self._radiobuttonPre +
				"-box ui-widget " + 
				(self.options.disabled ? "ui-state-disabled" : "ui-state-default") + 
				" ui-corner-all'><span class='" +
				self._radiobuttonPre + "-icon'></span></div>");
				iconElement = boxElement.children("." + self._radiobuttonPre + "-icon");
				radiobuttonElement.append(boxElement);
				iconElement.addClass("ui-icon ui-icon-radio-on");
				ele.data("iconElement", iconElement);
				ele.data("boxElement", boxElement);
				

				boxElement.removeClass(self._radiobuttonPre + "-relative")
				.attr("role", "radio")
				.bind("mouseover", function () {
					ele.mouseover();
				}).bind("mouseout", function () {
					ele.mouseout();
				});
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(self._radiobuttonPre + "-relative");
				}
				self._setDefaul();
				//			boxElement.css("margin-top","9px");

				ele.bind("click.checkbox", function () {
					ele.focus();
					self._refresh();
				}).bind("focus.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover")
					.addClass("ui-state-default");
				});

				radiobuttonElement.click(function () {
					if (targetLabel.length === 0 || targetLabel.html() === "") {
						ele.attr("checked", true).focus();
						self._refresh();
						ele.change();
					}

				});

				radiobuttonElement.bind("mouseover.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus")
					.addClass("ui-state-default");
				});

			}
		},

		_setDefaul: function () {
			if (this.element.attr("checked")) {
				this.element.parents(".wijmo-wijradio")
				.find("." + this._radiobuttonPre + "-box").children()
				.removeClass("ui-icon-radio-on ui-icon-radio-off")
				.addClass("ui-icon-radio-off");
				this.element.data("boxElement").removeClass("ui-state-default")
				.addClass("ui-state-active").attr("aria-checked", true);
			}
		},

		_refresh: function () {
			var name = this.element.attr("name") || "", self = this;
			if (name === "") {
				return;
			}
			$("[name='" + name + "']").each(function (i, n) {
				$(n).parents(".wijmo-wijradio")
				.find("." + self._radiobuttonPre + "-box").children()
				.removeClass("ui-icon-radio-on ui-icon-radio-off")
				.addClass("ui-icon-radio-on");
				$(n).parents(".wijmo-wijradio")
				.find("." + self._radiobuttonPre + "-box")
				.removeClass("ui-state-active").addClass("ui-state-default")
				.attr("aria-checked", false);
			});

			if (self.element.is(":checked")) {
				self.element.data("iconElement")
				.removeClass("ui-icon-radio-on").addClass("ui-icon-radio-off");
				self.element.data("boxElement").removeClass("ui-state-default")
				.addClass("ui-state-active").attr("aria-checked", true);
			}

		},

		refresh: function () {
			/// Use the refresh method to set the radio button's style.
			this._refresh();
		},

		destroy: function () {
			/// Remove the functionality completely. 
			/// This will return the element back to its pre-init state.
			var self = this, boxelement = self.element.parent().parent();
			boxelement.children("div." + self._radiobuttonPre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
} (jQuery));
/*globals jQuery*/
/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo List widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.wijmo.wijutil.js
 *  jquery.ui.wijsuperpanel.js
 *  
 */
(function ($) {
	"use strict";
	var listCSS = "ui-widget ui-widget-content ui-corner-all wijmo-wijlist",
		listItemCSS = "wijmo-wijlist-item",
		listItemCSSAlternate = listItemCSS + "-alternate",
		listItemCSSSelected = listItemCSS + "-selected",
		listItemCSSFirst = listItemCSS + "-first",
		listItemCSSLast = listItemCSS + "-last",
		stateHover = "ui-state-hover",
		uiStateActive = "ui-state-active",
		activeItem = "wijmo-wijlistitem-active",
		selectedActive = listItemCSSSelected + " " + uiStateActive,
		itemKey = "item.wijlist";
	$.widget("wijmo.wijlist", {
		options: {
			/// <summary>
			/// An array that specifies the listItem collections of wijlist.
			/// Example: listItems: [{label: "label1", value: "value1"},
			///                  {label: "label2", value: "value2"},
			///                  {label: "label3", value: "value3"}]
			/// Default: [].
			/// Type: Array.
			/// Code example:$("#element").wijlist("option","listItems",listItems); 
			/// </summary>
			listItems: [],
			/// <summary>
			/// Select event handler of wijlist. A function will be called 
			/// when any item in the list is selected.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the selected event:
			/// $("#element").wijlist({ selected: function (e, data) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistselected", function(e, data) { });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			///	</param>
			/// <param name="data" type="Object">
			/// By data.item to obtain the item selected. 
			/// By data.item.element to obtain the li DOM element selected.
			///	</param>
			selected: null,
			/// <summary>
			/// A value indicates the selection mode of wijlist.
			/// Default: "single".
			/// Type: String.
			/// Code example:$("#element").wijlist("option","selectionMode",'single');
			/// </summary>
			/// <remarks>
			/// Options are "single" and "multiple". This option should not be set 
			/// again after initialization.
			/// </remarks>
			selectionMode: "single",
			/// <summary>
			/// A value determines whether to auto-size wijlist.
			/// Default: false.
			/// Type: String.
			/// Code example:$("#element").wijlist("option","autoSize",true);
			/// </summary>
			autoSize: false,
			/// <summary>
			/// A value specifies the max items count to display if 
			///autoSize is set to true.
			/// Default: 5.
			/// Type: Number.
			/// Code example:$("#element").wijlist("option","maxItemsCount",6);
			/// </summary>
			maxItemsCount: 5,
			/// <summary>
			/// A value determines whether to add ui-state-hover class to list
			/// item when mouse enters.
			/// Default: true.
			/// Type: Boolean.
			/// Code example:$("#element").wijlist("option","addHoverItemClass",false);
			/// </summary>
			addHoverItemClass: true,
			/// <summary>
			/// A hash value sets to supepanel options when superpanel is created.
			/// Default: null.
			/// Type: Object.
			/// Code example:$("#element").wijlist("option","superPanelOptions",null);
			/// </summary>
			superPanelOptions: null,
			/// <summary>
			/// A value indicates whether wijlist is disabled.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:$("#element").wijlist("option","disabled",true);
			/// </summary>
			disabled: false,
			/// <summary>
			/// A function called when the mouse enters the item and before any 
			/// logic in the hover event is processed.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the focusing event:
			/// $("#element").wijlist({ focusing: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistfocusing", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object, event object passed in to activate method.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: could be set in handler to override rendered label of item.
			/// </param>
			/// <returns>
			/// returns false to cancel item focusing.
			/// </returns>
			focusing: null,
			/// <summary>
			/// A function called when the mouse enters the item and after 
			/// logic in the hover event is processed.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the focus event:
			/// $("#element").wijlist({ focus: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistfocus", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object, event object passed in to activate method.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			focus: null,
			/// <summary>
			/// A function called when the mouse leaves the item.
			/// Type: Function.
			/// Default: null.
			/// Supply a callback function to handle the blur event:
			/// $("#element").wijlist({ blur: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistblur", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object, event object passed in to activate method.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			blur: null,
			/// <summary>
			/// A function called before an item is rendered.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the itemRendering event:
			/// $("#element").wijlist({ itemRendering: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistitemRendering", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			itemRendering: null,
			/// <summary>
			/// A function called after a list item is rendered.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the itemRendered event:
			/// $("#element").wijlist({ itemRendered: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistitemRendered", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			itemRendered: null,
			/// <summary>
			/// A function called after list is rendered.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the listRendered event:
			/// $("#element").wijlist({ listRendered: function (e, list) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistlistRendered", function(e, list) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object.
			/// </param>
			/// <param name="list" type="Object">
			/// The list to be rendered.
			/// </param>
			listRendered: null,
			/// <summary>
			/// A value determines whether to keep item highlight when mouse 
			/// is leaving list. 
			/// Default: Boolean.
			/// Type: false.
			/// Code example:$("#element")
			///		.wijlist("option","keepHightlightOnMouseLeave",true);
			/// </summary>
			keepHightlightOnMouseLeave: false
		},

		removeAll: function () {
			///	<summary>
			///	Remove all wijlist items. 
			/// Code example: $("#element").wijlist("removeAll");
			///	</summary>

			var self = this;
			self.items = [];
			self._refresh();
		},

		addItem: function (item, index) {
			///	<summary>
			///	Add the specified item into the list by index.
			/// Code example: $("#element")
			///				.wijlist("addItem", {label: "label1", value: "value1"});
			///	</summary>
			/// <param name="item" type="Object">
			/// The item that need to be inserted.
			/// </param>
			/// <param name="index" type="Number">
			/// The position of the inserted item.
			/// </param>

			var self = this;
			self._checkData();
			if (index === null || index === undefined) {
				self.items.push(item);
			}
			else {
				//update for fixing bug 17873 by wuhao at 2011/10/20
				//self.items.splice(index, 0, item);
				if (self.items) {
					self.items.splice(index, 0, item);
				}
				//end for 17873
			}
			self._refresh();
		},

		removeItem: function (item) {
			///	<summary>
			///	Remove the specified item from the wijlist.
			/// Code example: $("#element")
			///		.wijlist("removeItem", {label: "label1", value: "value1"});
			///	</summary>
			/// <param name="item" type="Object">
			/// Indicates the item to be removed.
			/// </param>

			var self = this, index;
			self._checkData();
			index = self.indexOf(item);
			if (index >= 0) {
				self.removeItemAt(index);
			}
		},

		indexOf: function (item) {
			///	<summary>
			///	Return the index of the specified item. 
			/// Code example: $("#element")
			///			.wijlist("indexOf", {label: "label1", value: "value1"});
			///	</summary>
			/// <param name="item" type="Object">
			/// Indicates the specified item.
			/// </param>

			var self = this, index = -1, i = 0, oItem;
			self._checkData();
			for (i = 0; i < self.items.length; i++) {
				oItem = self.items[i];
				if (oItem.label === item.label && oItem.value === item.value) {
					index = i;
					break;
				}
			}
			return index;
		},

		removeItemAt: function (index) {
			///	<summary>
			///	Remove the specified item by index from the wijlist.
			/// Code example: $("#element").wijlist("removeItemAt", 3);
			///	</summary>
			/// <param name="item" type="Object">
			/// Index of the item to be removed.
			/// </param>

			var self = this;
			self._checkData();
			self.items.splice(index, 1);
			self._refresh();
		},

		_checkData: function () {
			var self = this;
			if (!self.items) {
				self.items = [];
			}
		},

		_refresh: function () {
			var self = this;
			self.renderList();
			self.refreshSuperPanel();
		},

		_setOption: function (key, value) {
			var self = this;

			$.Widget.prototype._setOption.apply(self, arguments);

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
		},

		_create: function () {
			var self = this, ele = this.element, o = this.options;
			ele.addClass(listCSS).attr({
				role: "listbox",
				"aria-activedescendant": activeItem,
				"aria-multiselectable": o.selectionMode === "multiple"
			}).bind("click." + self.widgetName, self, self._onListClick);

			if (ele.is("div") && ele.children().is("ul")) {
				self._isInnerData = true;
				self._templates = [];
				$.each($("ul > li", ele), function (idx, liNode) {
					self._templates.push({ templateHtml: liNode.innerHTML });
				});

				self._oriChildren = ele.children().hide();
			}

			self.ul = $("<ul class='wijmo-wijlist-ul'></ul>").appendTo(ele);

			if (o.listItems !== null) {
				if (o.listItems.length > 0) {
					self.setItems(o.listItems);
					self.renderList();
					self.refreshSuperPanel();
				}
			}

			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			//Change your outerelement here
				ele = outerEle || self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
						.addClass("ui-disabled")
						.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},

		setTemplateItems: function (data) {
			this._setItemsByExtend(data, true);
		},

		setItems: function (items) {
			///	<summary>
			///	Sets Items to be rendered by the wijlist. 
			/// This will return the element back to its pre-init state.
			/// Code example: $("#element")
			///		.wijlist("setItems",{label: "label1", value: "value1"});
			///	</summary>
			/// <param name="items" type="Array">
			/// Items to be rendered by the wijlist. 
			/// </param>

			this._setItemsByExtend(items, false);
		},

		_setItemsByExtend: function (items, isExtend) {
			/// <summary>
			/// Sets Items to be rendered by the wijlist.
			/// </summary>
			/// <param name="items" type="Array">
			/// Items array to be rendered.  The array contains object like 
			///{label: "label", value: "value"}.
			/// </param>
			var self = this, selectedItems;

			if (isExtend) {
				if (self._templates && items && items.length !== self._templates.length) {
					return;
				}
				self.items = items;
				if (!self.items) {
					self.items = [];
				}
				$.each(self._templates, function (idx) {
					if (self.items[idx]) {
						self.items[idx].templateHtml = self._templates[idx].templateHtml;
					} else {
						self.items.push({ templateHtml:
							self._templates[idx].templateHtml
						});
					}
				});
			} else {
				self.items = items;
			}

			if (!items) {
				return null;
			}

			selectedItems = $.grep(items, function (a) {
				return a.selected;
			});
			if (self.options.selectionMode === "single") {
				self.selectedItems = [];
				self.selectedItem = selectedItems.length > 0 ?
									selectedItems[0] : undefined;
			}
			else {
				self.selectedItems = selectedItems;
			}
		},

		popItem: function () {
			///	<summary>
			///	Remove the last item in the wijlist. 
			/// Code example: $("#element").wijlist("popItem");
			///	</summary>

			var self = this;
			self._checkData();
			self.items.pop();
			self._refresh();
		},

		getList: function () {
			/// <summary>
			/// Gets the JQuery object reference of the ul element of wijlist.
			/// Code example: $("#element").wijlist("getList");
			/// </summary>
			/// <returns type="JQueryObj">
			/// ul JQuery reference.
			/// </returns>

			return this.ul;
		},

		_onListClick: function (e) {
			if (!$(e.target).closest(".wijmo-wijlist-item").length) {
				return;
			}
			var self = e.data;
			self.select(e);
		},

		destroy: function () {
			///	<summary>
			///	Remove the wijlist functionality completely. 
			/// This will return the element back to its pre-init state.
			/// Code example: $("#element").wijlist("destroy");
			///	</summary>

			var self = this, ele = this.element;
			if (self.superPanel !== undefined) {
				self.superPanel.destroy();
			}

			ele.removeClass(listCSS).removeAttr("role")
			.removeAttr("aria-activedescendant").unbind("." + self.widgetName);
			self.ul.remove();

			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option

			if (self._isInnerData) {
				self._oriChildren.show();
			}

			$.Widget.prototype.destroy.apply(self, arguments);
		},

		activate: function (event, item, scrollTo) {
			///	<summary>
			///		Activates a wijlist item.
			/// Code example: 
			/// var item = {element:$(".wijmo-wijlist-item:first"),list:$("#list")
			///			.wijlist()};
			/// $("#element").wijlist("activate", null, item, false); 
			///	</summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>
			/// <param name="item" type="wijlistItem">
			/// wijlistItem to activate.
			///	</param>
			/// <param name="scrollTo" type="Boolean">
			/// Whether to scroll activated item to view.
			///	</param>

			var self = this, active, activeElement;
			self.deactivate();
			if (item === null || item === undefined) {
				return;
			}
			if (self._trigger("focusing", event, item) === false) {
				return;
			}
			active = self.active = item;
			activeElement = item.element;
			if (activeElement) {
				if (self.options.addHoverItemClass) {
					activeElement.addClass(stateHover);
				}
				activeElement.attr("id", activeItem);
			}
			if (scrollTo && self.superPanel !== undefined) {
				self.superPanel.scrollChildIntoView(activeElement);
			}
			self._trigger("focus", event, item);
		},

		deactivate: function () {
			/// <summary>
			/// Deactivates activated items.
			/// Code example: $("#element").wijlist("deactivate");
			/// </summary>

			var self = this,
				a = self.active, ele;
			if (!a) {
				return;
			}
			ele = a.element;
			self._trigger("blur", null, a);
			//for fix bug 15423
			if (ele) {
				ele.removeClass(stateHover).removeAttr("id");
			}
			self.active = undefined;
		},

		next: function (event) {
			/// <summary>
			/// Moves focus to the next item.
			/// Code example: $("#element").wijlist("next");
			/// </summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>

			this.move("next", "." + listItemCSS + ":first", event);
		},

		nextPage: function () {
			/// <summary>
			/// Turns to the next page of the list.
			/// Code example: $("#element").wijlist("nextPage");
			/// </summary>

			this.superPanel.doScrolling("bottom", true);
		},

		previous: function (event) {
			/// <summary>
			/// Moves focus to the previous item. 
			/// Code example: $("#element").wijlist("previous");
			/// </summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>

			this.move("prev", "." + listItemCSS + ":last", event);
		},

		previousPage: function () {
			/// <summary>
			/// Turns to the previous page of the wijlist.
			/// Code example: $("#element").wijlist("previousPage");
			/// </summary>

			this.superPanel.doScrolling("top", true);
		},

		first: function () {
			/// <summary>
			/// Tests that the focus is at the first item.
			/// Code example: $("#element").wijlist("first");
			/// </summary>

			return this.active && !this.active.element.prev().length;
		},

		last: function () {
			/// <summary>
			/// Tests that the focus is at the last item.
			/// Code example: $("#element").wijlist("last");
			/// </summary>

			return this.active && !this.active.element.next().length;
		},

		move: function (direction, edge, event) {
			/// <summary>
			/// Move focus between items.
			/// </summary>

			var self = this, item, next;
			if (!self.active) {
				item = self.ul.children(edge).data(itemKey);
				self.activate(event, item, true);
				return;
			}
			next = self.active.element[direction + "All"]("." + listItemCSS).eq(0);
			if (next.length) {
				self.activate(event, next.data(itemKey), true);
			}
			else {
				self.activate(event, self.element.children(edge).data(itemKey), true);
			}
		},

		select: function (event, data) {
			/// <summary>
			/// Selects active list item.
			/// </summary>
			///

			var self = this,
				ele, selectedIndex,
				item, singleMode, previous;
			
			if (self.active === undefined) {
				return;
			} 
			
			ele = self.active.element;
			if (ele === undefined) {
				return;
			}
			item = ele.data(itemKey);
			singleMode = self.options.selectionMode === "single";
			if (singleMode) {
				previous = self.selectedItem;
				ele.addClass(selectedActive).attr("aria-selected", "true");
				item.selected = true;
				if (previous !== undefined && item !== previous) {
					previous.selected = false;
					previous.element.removeClass(selectedActive)
					.removeAttr("aria-selected");
				}
				self.selectedItem = item;
				selectedIndex = $.inArray(item, self.items);

				self._trigger("selected", event, {
					item: item,
					previousItem: previous,
					selectedIndex: selectedIndex,
					data: data
				});
			}
			else {
				item.selected = !item.selected;
				if (item.selected) {
					ele.addClass(selectedActive).attr("aria-selected", "true");
				}
				else {
					ele.removeClass(selectedActive).removeAttr("aria-selected", "true");
				}
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});

				self._trigger("selected", event, {
					item: item,
					selectedItems: self.selectedItems
				});
			}
		},

		_findItemsByValues: function (values) {
			var itemFound, found = [];

			found = $.grep(this.items, function (itm, i) {
				itemFound = false;
				for (var j = 0; j < values.length; j++) {
					if (itm.value === values[j]) {
						itemFound = true;
					}
				}
				return itemFound;
			});

			return found;
		},

		_findItemsByIndices: function (indices) {
			var self = this, len = this.items.length, found = [];

			$.each(indices, function (index, value) {
				if (value >= 0 && value < len) {
					found.push(self.items[value]);
				}
			});

			return found;
		},

		getItems: function (indices) {
			/// <summary>
			/// Find list items by indices or values.
			/// Code Example:$("#element").wijlist("getItems",5);
			/// </summary>
			/// <param name="indices" type="Array/Number">
			/// This parameter could be a string, number, array of string,
			/// array of number.
			/// If parameter is a number or an array of number,
			/// it's used as the index/indices of the item(s) to get.
			/// If parameter is a string or an array of string,
			/// it's used as the value/values of the item(s) to get.
			/// </param>

			var self = this, isNumber, byArray, searchTerms, foundItems;

			byArray = $.isArray(indices);
			isNumber = (!byArray) && !isNaN(indices) || (byArray && !isNaN(indices[0]));
			searchTerms = byArray ? indices : [indices];
			foundItems = isNumber ?
			self._findItemsByIndices(searchTerms) : self._findItemsByValues(searchTerms);
			return foundItems;
		},

		selectItems: function (indices, triggerSelected) {
			/// <summary>
			/// Selects item(s) in the list by item index/indices or value(s).
			/// Code Example:$("#element").wijlist("selectItems",5, false);
			/// </summary>
			/// <param name="indices" type="Array/Number">
			/// This parameter could be a string, number, array of string,
			/// array of number.
			/// If parameter is a number or an array of number,
			/// it's used as the index/indices of the item(s) to get.
			/// If parameter is a string or an array of string,
			/// it's used as the value/values of the item(s) to get.
			/// </param>
			/// <param name="triggerSelected" type="Boolean">
			/// Whether to trigger selected event of list.
			/// </param>

			var self = this, singleMode = this.options.selectionMode === "single",
			item, previous, foundItems;

			foundItems = self.getItems(indices);
			if (singleMode) {
				if (foundItems.length > 0) {
					item = foundItems[0];
					item.selected = true;
					item.element.addClass(selectedActive);
				}
				previous = self.selectedItem;
				if (previous) {
					previous.selected = false;
					previous.element.removeClass(selectedActive);
				}
				self.selectedItem = item;
				if (triggerSelected) {
					self._trigger("selected", null, {
						item: item,
						previousItem: previous
					});
				}
			}
			else {
				$.each(foundItems, function (index, itm) {
					itm.selected = true;
					itm.element.addClass(selectedActive);
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
				if (triggerSelected) {
					self._trigger("selected", null, {
						selectedItems: self.selectedItems
					});
				}
			}
		},

		unselectItems: function (indices) {
			/// <summary>
			/// Unselects items by items' indices.
			/// Code Example:$("#element").wijlist("unselectItems",5);
			/// </summary>
			/// <param name="indices" type="Array">
			/// Indices of items to unselect.
			/// </param>

			var self = this, mode = this.options.selectionMode, selectedItem, foundItems;

			if (mode === "single") {
				selectedItem = self.selectedItem;
				if (selectedItem) {
					selectedItem.selected = false;
					selectedItem.element.removeClass(selectedActive);
					self.selectedItem = undefined;
				}
			}
			else {
				foundItems = self.getItems(indices);
				$.each(foundItems, function (index, i) {
					i.selected = false;
					i.element.removeClass(selectedActive);
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
			}
		},

		renderList: function () {
			/// <summary>
			/// Render items of wijlist.
			/// Code Example:$("#element").wijlist("renderList");
			/// </summary>
			var self = this, ul = this.ul, o = this.options, items,
			count, singleMode, i, item;
			ul.empty();
			// returns if no items to render.
			items = self.items;
			if (items === undefined) {
				return;
			}
			count = items.length;
			if (items === undefined || items === null && count === 0) {
				return;
			}
			singleMode = o.selectionMode === "single";
			for (i = 0; i < count; i++) {
				item = items[i];
				self._renderItem(ul, item, i, singleMode);
			}
			if (count > 0) {
				if (items[0].element) {
					items[0].element.addClass(listItemCSSFirst);
				}
				if (items[count - 1].element) {
					items[count - 1].element.addClass(listItemCSSLast);
				}
			}
			self._trigger("listRendered", null, self);

		},


		_renderItem: function (ul, item, index, singleMode) {
			var self = this,
			li = $("<li role='option' class='wijmo-wijlist-item " +
			"ui-corner-all'></li>"), label, url;
			item.element = li;
			item.list = self;
			if (self._trigger("itemRendering", null, item) === false) {
				return;
			}
			label = item.label;
			// if text is set, text will override label value.
			if (item.templateHtml) {
				label = item.templateHtml;
			} else if (item.text !== undefined) {
				label = item.text;
			}
			// binds list item event
			li.bind("mouseover", function (event) {
				self.activate(event, item, false);
			}).bind("mouseout", function () {
				if (!self.options.keepHightlightOnMouseLeave) {
					self.deactivate();
				}
			}).data(itemKey, item).append(label).appendTo(ul);
			// render image
			if (!self._isInnerData) {
				// render image
				url = item.imageUrl;
				if (url !== undefined && url.length > 0) {
					li.prepend("<img src='" + item.imageUrl + "'>");
				}
			}
			// add selected items
			if (item.selected) {
				self.activate(null, item, false);
				li.addClass(selectedActive);
			}
			if (index % 2 === 1) {
				li.addClass(listItemCSSAlternate);
			}
			self._trigger("itemRendered", null, item);
		},

		refreshSuperPanel: function () {
			/// <summary>
			/// Reset the layout of superpanel to reflect the change in content.
			/// Code Example:$("#element").wijlist("refreshSuperPanel");
			/// </summary>

			var self = this, ele = this.element, o = this.options, ul = this.ul,
			singleItem = ul.children(".wijmo-wijlist-item:first"),
			adjustHeight = null, h, percent, small, vScroller, large, spOptions, pt;
			if (!ele.is(":visible")) {
				return false;
			}
			if (o.autoSize) {
				adjustHeight = singleItem.outerHeight(true) * o.maxItemsCount;
			}

			if (adjustHeight !== null) {
				ele.height(Math.min(adjustHeight, ul.outerHeight()));
			}
			h = ele.innerHeight();
			percent = h / (ul.outerHeight() - h);
			large = (101 * percent) / (1 + percent);
			small = (singleItem.outerHeight() / (ul.outerHeight() - h)) * (101 - large);
			if (self.superPanel === undefined) {
				spOptions = {
					allowResize: false,
					keyboardSupport: false,
					bubbleScrollingEvent: true,
					hScroller: {
						scrollBarVisibility: "hidden"
					},
					vScroller: {
						scrollSmallChange: small,
						scrollLargeChange: large
					}
				};

				$.extend(spOptions, o.superPanelOptions);
				self.superPanel = ele.wijsuperpanel(spOptions).data("wijsuperpanel");
			}
			else {
				vScroller = self.superPanel.options.vScroller;
				vScroller.scrollLargeChange = large;
				vScroller.scrollSmallChange = small;
				self.superPanel.paintPanel();
			}
			pt = ul.css("padding-top");
			if (pt.length > 0) {
				vScroller = self.superPanel.options.vScroller;
				vScroller.firstStepChangeFix = self.superPanel
				.scrollPxToValue(parseFloat(pt), "v");
			}
			else {
				vScroller.firstStepChangeFix = 0;
			}
			ul.setOutWidth(ul.parent().parent().innerWidth());
		}
	});
} (jQuery));/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 ** Wijmo Calendar widget.
*
* Depends:
*	jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.wijpopup.js
*	jquery.effects.core.js	
*	jquery.effects.blind.js
*	jquery.effects.slide.js
*	jquery.effects.scale.js
*	globalize.js
*
*/



(function ($) {
	"use strict";

	var wijDayType = {
		///	<summary>
		///	A general day cell, denotes nothing.
		///	</summary>
		general: 0,
		///	<summary>
		///	A weekend day cell.
		///	</summary>
		weekEnd: 1,
		///	<summary>
		///	A day cell with a date blongs to other month.
		///	</summary>
		otherMonth: 2,
		///	<summary>
		///	A day cell with a date out of the minDate/maxDate range.
		///	</summary>
		outOfRange: 4,
		///	<summary>
		///	A day cell represents today.
		///	</summary>
		today: 8,
		///	<summary>
		///	A custom day cell, which has CSS class 'wijmo-wijcalendar-customday' associated.
		///	</summary>
		custom: 16,
		///	<summary>
		///	A day cell in disabled state.
		///	</summary>
		disabled: 32,
		///	<summary>
		///	A day cell in selected state.
		///	</summary>
		selected: 64,
		///	<summary>
		///	A blank day cell.
		///	</summary>
		gap: 128
	};



	$.widget("wijmo.wijcalendar", {
		options: {
			///	<summary>
			///	Gets or sets culture ID.
			/// Default: ''
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({culture: "zh-CN"}); 
			///	</summary>
			culture: '',
			///	<summary>
			///	Gets or sets the number of calendar months in horizontal direction. 
			/// Default: 1
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({monthCols: 2}); 
			///	</summary>
			monthCols: 1,
			///	<summary>
			///	Gets or sets the number of calendar months in vertical direction. 
			/// Default: 1
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({monthRows: 2}); 
			///	</summary>
			monthRows: 1,
			///	<summary>
			///	Gets or sets the format for the title text. 
			/// Default: "MMMM yyyy"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({titleFormat: "MMMM yyyy"}); 
			///	</summary>
			titleFormat: "MMMM yyyy",
			///	<summary>
			///	A Boolean property that determines whether to display calendar title.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showTitle: false}); 
			///	</summary>
			showTitle: true,
			///	<summary>
			///	Gets or sets the display date for the first month view.  
			/// Default: undefined
			/// Type: Date
			/// Code example:
			///		$(".selector").wijcalendar({displayDate: new Date(1900,1,1)}); 
			///	</summary>
			displayDate: undefined,
			///	<summary>
			///	Gets or sets the number of day rows. 
			/// Default: 6
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({dayRows: 6}); 
			///	</summary>
			dayRows: 6,
			///	<summary>
			///	Gets or sets the number of day columns. 
			/// Default: 7
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({dayCols: 7}); 
			///	</summary>
			dayCols: 7,
			///	<summary>
			///	Gets or sets the format for the week day. 
			///	Possible values are: "short", "full", "firstLetter" or "abbreviated".
			/// Default: "short"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({weekDayFormat: "abbreviated"}); 
			///	</summary>
			weekDayFormat: "short",
			///	<summary>
			///	A Boolean property that determines whether to display week days.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showWeekDays: false}); 
			///	</summary>
			showWeekDays: true,
			///	<summary>
			///	Determines whether to display week numbers. 
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showWeekNumbers: true}); 
			///	</summary>
			showWeekNumbers: false,
			///	<summary>
			///	Defines different rules for determining the first week of the year. 
			///	Possible values are: "firstDay", "firstFullWeek" or "firstFourDayWeek"
			/// Default: "firstDay"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({calendarWeekRule: "firstDay"}); 
			///	</summary>
			calendarWeekRule: "firstDay",
			///	<summary>
			///	Determines the minimum date to display.
			/// Default: new Date(1900, 0, 1)
			/// Type: Date
			/// Code example:
			///		$(".selector").wijcalendar({minDate: new Date(2012, 2, 1)}); 
			///	</summary>
			minDate: new Date(1900, 0, 1),
			///	<summary>
			///	Determines the maximum date to display. 
			/// Default: new Date(2099, 11, 31)
			/// Type: Date
			/// Code example:
			///		$(".selector").wijcalendar({maxDate: new Date(2012, 5, 31)}); 
			///	</summary>
			maxDate: new Date(2099, 11, 31),
			///	<summary>
			///	Determines whether to display the days of the next and/or previous month.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showOtherMonthDays: false}); 
			///	</summary>
			showOtherMonthDays: true,
			///	<summary>
			///	Determines whether to add zeroes to days with only one digit (for example, "1" would become "01" if this property were set to "true").
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showDayPadding: true}); 
			///	</summary>
			showDayPadding: false,
			///	<summary>
			///	Gets or sets the date selection mode on the calendar control that specifies whether the user can select a single day, a week, or an entire month. 
			/// Default: { day: true, days: true }
			/// Type: Hash Object
			///	Possible fields in hash are: day, days, weekDay, weekNumber, month.
			/// Code example:
			///		$(".selector").wijcalendar({selectionMode: { day: true, days: true, weekDay: true}}); 
			///	</summary>
			selectionMode: { day: true, days: true },
			///	<summary>
			///	Determines whether the preview buttons are displayed.
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({allowPreview: true}); 
			///	</summary>
			allowPreview: false,
			///	<summary>
			///	Determines whether users can change the view to month/year/decade while clicking on the calendar title.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({allowQuickPick: false}); 
			///	</summary>
			allowQuickPick: true,
			///	<summary>
			///	Gets or sets the format for the ToolTip. 
			/// Default: "dddd, MMMM dd, yyyy"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({toolTipFormat: "dddd, MMMM dd, yyyy"}); 
			///	</summary>
			toolTipFormat: "dddd, MMMM dd, yyyy",
			///	<summary>
			///	Gets or sets the text for the 'previous' button's ToolTip. 
			/// Default: "Previous"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({prevTooltip: "Previous"}); 
			///	</summary>
			prevTooltip: "Previous",
			///	<summary>
			///	Gets or sets the text for the 'next' button's ToolTip. 
			/// Default: "Next"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({nextTooltip: "Next"}); 
			///	</summary>
			nextTooltip: "Next",
			///	<summary>
			///	Gets or sets the  "quick previous" button's ToolTip.
			/// Default: "Quick Previous"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({quickPrevTooltip: "Quick Previous"}); 
			///	</summary>
			quickPrevTooltip: "Quick Previous",
			///	<summary>
			///	Gets or sets the "quick next" button's ToolTip.
			/// Default: "Quick Next"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({quickNextTooltip: "Quick Next"}); 
			///	</summary>
			quickNextTooltip: "Quick Next",
			///	<summary>
			///	Gets or sets the "previous preview" button's ToolTip. 
			/// Default: ""
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({prevPreviewTooltip: "Preview previous month"}); 
			///	</summary>
			prevPreviewTooltip: "",
			///	<summary>
			///	Gets or sets the "next preview" button's ToolTip. 
			/// Default: ""
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({nextPreviewTooltip: "Preview next month"}); 
			///	</summary>
			nextPreviewTooltip: "",
			///	<summary>
			///	Determines the display type of navigation buttons.
			///	Possible values are: "default", "quick" or "none"
			/// Default: 'default'
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({navButtons: "quick"}); 
			///	</summary>
			navButtons: 'default',
			///	<summary>
			///	Detemines the inc/dec steps when clicking the quick navigation button.
			/// Default: 12
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({quickNavStep: 3}); 
			///	</summary>
			quickNavStep: 12,
			///	<summary>
			///	Determines the month slide direction.
			///	Possible values are: horizontal or vertical
			/// Default: 'horizontal'
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({direction: "vertical"}); 
			///	</summary>
			direction: 'horizontal',
			///	<summary>
			///	Gets or sets the animation duration in milliseconds. 
			/// Default: 250
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({duration: 500}); 
			///	</summary>
			duration: 250,
			///	<summary>
			///	Determines the animations easing effect.
			/// Default: 'easeInQuad'
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({easing: "easeInQuad"}); 
			///	</summary>
			easing: 'easeInQuad',
			///	<summary>
			///	A Boolean property that determines whether the wijcalendar widget is a pop-up calendar.
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({popupMode: true}); 
			///	</summary>
			popupMode: false,
			///	<summary>
			///	A Boolean property that determines whether to autohide the calendar in pop-up mode when clicking outside of the calendar.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({autoHide: false}); 
			///	</summary>
			autoHide: true,
			/// <summary>
			/// A callback function used for customizing the content, style and attributes of a day cell.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ customizeDate: function($daycell, date, dayType, hover, preview){ } });
			/// </summary>
			/// <param name="$daycell" type="jQuery">jQuery object that represents table cell of the date to be customized.</param>
			/// <param name="date" type="Date">Date of the cell.</param>
			/// <param name="dayType" type="Number">Type of the day. Please see the definition of wijDayType.
			///	</param>
			/// <param name="hover" type="Boolean">Whether mouse is over the day cell.</param>
			/// <param name="preview" type="Object">Whether rendering in preview container.</param>
			/// <returns type="Boolean">True if day cell content has been changed and default cell content will not be applied.</returns>
			customizeDate: null,
			/// <summary>
			/// A callback function used to customizing the title text on month view.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ title: function (date, format) { } });
			/// </summary>
			///
			/// <param name="date" type="Date">The display date of the month.</param>
			/// <param name="format" type="String">The title format. Determined by the options.titleFormat.</param>
			/// <returns type="String">The customized title text.</returns>
			title: null,
			/// <summary>
			/// The beforeSlide event handler. A function called before the calendar view slides to another month. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ beforeSlide: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			beforeSlide: null,
			/// <summary>
			/// The afterSlide event handler. A function called after the calendar view slided to another month.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ afterSlide: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			afterSlide: null,
			/// <summary>
			/// The beforeSelect event handler. A function called before user selects a day by mouse. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ beforeSelect: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.date: The date to be selected.
			///</param>
			beforeSelect: null,
			/// <summary>
			/// The afterSelect event handler. A function called after user selects a day by mouse.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ afterSelect: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.date: The selected date.
			///</param>
			afterSelect: null,
			/// <summary>
			/// The selectedDatesChanged event handler. A function called after the selectedDates collection changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: $(".selector").wijcalendar({ selectedDatesChanged: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.dates: The array with all selected date object.
			///</param>
			selectedDatesChanged: null
		},

		_create: function () {
			// Add for parse date options for jUICE. D.H
			if ($.isFunction(window["wijmoASPNetParseOptions"])) {
				wijmoASPNetParseOptions(this.options);
			}

			this.element.addClass("wijmo-wijcalendar ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all").attr('role', 'grid');
			this._previewWrapper(this.options.allowPreview);
			this.element.data('preview.wijcalendar', false);
		},

		_init: function () {
			if (this.options.popupMode) {
				var po = { autoHide: !!this.options.autoHide };
				if (this.options.beforePopup) { po.showing = this.options.beforePopup; }
				if (this.options.afterPopup) { po.shown = this.options.afterPopup; }
				if (this.options.beforeClose) { po.hiding = this.options.beforeClose; }

				var self = this;
				po.hidden = function (data) {
					self.element.removeData("lastdate.wijcalendar");
					if (self.options.afterClose) { self.options.afterClose.call(data); }
				};

				this.element.wijpopup(po);
			}

			this._getSelectedDates();
			this._getDisabledDates();
			this._resetWidth();
			this.refresh();
			this.element.width(this.element.width() + 2);
		},

		destroy: function () {
			$.Widget.prototype.destroy.apply(this, arguments);
			this.close();
			this.element.html("");
			this.element.removeClass("wijmo-wijcalendar ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-datepicker-multi").removeAttr('role');

			var self = this;
			$.each(["preview", "disableddates", "selecteddates", "dragging", "lastdate", "animating"], function (i, prefix) {
				self.element.removeData(prefix + ".wijcalendar");
			});

			this._previewWrapper(false);
		},

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);

			var self = this;
			switch (key) {
				case "showWeekDays":
				case "showWeekNumbers":
				case "showTitle":
				case "showOtherMonthDays":
				case "selectionMode":
					this.unSelectAll();
					this._resetWidth();
					this.refresh();
					break;

				case "culture":
					this.refresh();
					break;

				case "allowPreview":
					this._previewWrapper(value);
					this.refresh();
					break;

				case "monthCols":
					this._resetWidth();
					this.refresh();
					break;

				case "autoHide":
					this.element.wijpopup({ autoHide: this.options.autoHide });
					break;

				case "selectedDates":
					this._getSelectedDates().setDates(value);
					this.refresh();
					break;

				case "disabledDates":
					this._getDisabledDates().setDates(value);
					this.refresh();
					break;
			}
		},

		_previewWrapper: function (add) {
			if (add) {
				if (!this.element.parent().hasClass('wijmo-wijcalendar-preview-wrapper')) {
					this.element.wrap("<div class='wijmo-wijcalendar-preview-wrapper ui-helper-clearfix'></div>");
				}
			} else {
				if (this.element.parent().hasClass('wijmo-wijcalendar-preview-wrapper')) {
					this.element.unwrap();
				}
			}
		},

		_isRTL: function () {
			return !!this._getCulture().isRTL;
		},

		refresh: function () {
			/// <summary>Refreshes the calendar.</summary>
			this.element.empty().append(this._createCalendar());
			this.element[(this._isRTL() ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
			this._bindEvents();
		},

		refreshDate: function (date) {
			/// <summary>
			///  Refreshes a single date.
			/// </summary>
			/// <param name="date" type="Date">The date to be refreshed.</param>
			if (!this._monthViews) { return; }
			if (date < this._groupStartDate || date > this._groupEndDate) { return; }
			$.each(this._monthViews, function () {
				this._refreshDate(date);
			});
		},

		getDisplayDate: function () {
			/// <summary>Gets the valid display date.</summary>
			var d = this.options.displayDate ? this.options.displayDate : new Date();
			if (wijDateOps.isSameDate(d, new Date(1900, 0, 1))) { d = new Date(); }

			return d;
		},

		getSelectedDate: function () {
			/// <summary>Gets the current selected date.</summary>
			var dates = this.options.selectedDates;
			return (!dates || dates.length === 0) ? null : dates[0];
		},

		selectDate: function (date) {
			/// <summary>
			///  Select a date by code.
			/// </summary>
			/// <param name="date" type="Date">The date to be selected.</param>
			date = new Date(date);
			if (this._getDisabledDates().contains(date)) { return false; }
			if (date < this.options.minDate || date > this.options.maxDate) { return false; }

			this._getSelectedDates().add(date);
			this.refreshDate(date);
			return true;
		},

		unSelectDate: function (date) {
			/// <summary>
			///  Unselect a date by code.
			/// </summary>
			/// <param name="date" type="Date">The date to be removed from the selectedDates collection.</param>
			date = new Date(date);
			if (this._getDisabledDates().contains(date)) { return false; }
			if (date < this.options.minDate || date > this.options.maxDate) { return false; }

			this._getSelectedDates().remove(date);
			this.refreshDate(date);
			return true;
		},

		unSelectAll: function () {
			/// <summary>Unselect all by code.</summary>
			var dates = this.options.selectedDates, i;
			if (dates && dates.length > 0) {
				this._getSelectedDates().clear();
				for (i = 0; i < dates.length; i++) {
					this.refreshDate(dates[i]);
				}
			}
		},

		_slideToDate: function (date) {
			if (wijDateOps.isSameMonth(this.getDisplayDate(), date)) { return; }

			var visible = this.element.is(":visible");
			if (!visible) {
				this.options.displayDate = date;
			}
			else {
				if (this._trigger('beforeSlide') === false) { return; }

				if (this._isSingleMonth()) {
					this._playSlideAnimation(date);
				} else {
					this._playMmSlideAnimation(date);
				}
			}
		},

		isPopupShowing: function () {
			/// <summary>Determines whether the calendar is in popup state.</summary>
			return !!this.options.popupMode ? this.element.wijpopup('isVisible') : false;
		},

		popup: function (position) {
			/// <summary>Pops up the calendar at specifies position.</summary>
			/// <param name="position" type="Object">The position object accepts by the jQuery Position plugin. Please see "http://jqueryui.com/demos/position/" for details of the parameter.</param>
			this._myGrid = undefined;
			this.refresh();
			this.element.data('dragging.wijcalendar', false);
			this.element.wijpopup('show', position);
		},

		popupAt: function (x, y) {
			/// <summary>Pops up the calendar at the X/Y position to the document.</summary>
			/// <param name="x" type="Number">X offset.</param>
			/// <param name="y" type="Number">Y offset.</param>
			this._myGrid = undefined;
			this.refresh();
			this.element.data('dragging.wijcalendar', false);
			this.element.wijpopup('showAt', x, y);
		},

		close: function () {
			/// <summary>Close the calendar if is it in popup state.</summary>
			if (this.isPopupShowing()) {
				this.element.wijpopup('hide');
			}
		},

		_getCulture: function (name) {
			return Globalize.findClosestCulture(name || this.options.culture);
		},

		_getDates: function (token) {
			var name = token.toLowerCase() + ".wijcalendar";
			var dates = this.element.data(name);
			if (dates === undefined) {
				dates = new wijDateCollection(this, token);
				this.element.data(name, dates);
			}
			return dates;
		},

		_getDisabledDates: function () {
			return this._getDates('disabledDates');
		},

		_getSelectedDates: function () {
			return this._getDates('selectedDates');
		},

		_onDayDragStart: function (e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		},

		_onDayMouseDown: function (e) {
			e.preventDefault();
			e.stopPropagation();

			var o = this.options, self = this;
			if (e.which !== 1) { return false; }
			var date = this._getCellDate(e.currentTarget);
			if (date === undefined) { return false; }
			if (!o.selectionMode.day) { return false; }

			var args = { date: date };
			if (this._trigger("beforeSelect", null, args) === false) { return false; }

			if (!o.selectionMode.days || (!e.metaKey && !e.shiftKey && !e.ctrlKey)) { this.unSelectAll(); }

			var selected = false;
			if (!!o.selectionMode.days) {
				if (e.shiftKey && this.element.data("lastdate.wijcalendar")) {
					this._selectRange(this.element.data("lastdate.wijcalendar"), date);
					selected = true;
				} else {
					if (e.ctrlKey) {
						this.element.data("lastdate.wijcalendar", date);
						
						var selDates = o.selectedDates, exist = false, dates = new Array();
						$.each(selDates, function (i, d) {
							if (date.getFullYear() === d.getFullYear() &&
								date.getMonth() === d.getMonth() &&
								date.getDate() === d.getDate()) {
								exist = true;
								return false;
							}
						});
						
						if (exist) {
							this.unSelectDate(date);
						} else {
							this.selectDate(date);
						}
						
						selDates = o.selectedDates;
						$.each(selDates, function (i, d) {
							dates.push(new Date(d));
						});
							
						this._trigger('selectedDatesChanged', null, { dates: dates });
						selected = true;
					} 
				}
			}
			
			if (!selected) {
				this.element.data("lastdate.wijcalendar", date);
				selected = this.selectDate(date);
				this._trigger('selectedDatesChanged', null, { dates: [date] });
			}

			if (selected) {
				this._trigger('afterSelect', null, args);

				if (!!o.selectionMode.days) {
					this.element.data('dragging.wijcalendar', true);
					$(document.body).bind("mouseup." + this.widgetName, function () {
						$(document.body).unbind("mouseup." + self.widgetName);
						self.element.data('dragging.wijcalendar', false);
					});
				}
			}

			return false;
		},

		_onDayClicked: function (e) {
			var date = this._getCellDate(e.currentTarget);
			if (date === undefined) { return false; }
			if (!this.options.selectionMode.day) { return false; }

			if (this.isPopupShowing()) {
				this.close();
			} else {
				if ($(e.currentTarget).hasClass('ui-datepicker-other-month')) {
					this._slideToDate(date);
				}
			}

			return false;
		},

		_onDayMouseEnter: function (e) {
			$(e.currentTarget).attr('state', 'hover');
			this._refreshDayCell(e.currentTarget);

			if (!!this.element.data('dragging.wijcalendar')) {
				var date = this._getCellDate(e.currentTarget);
				if (date === undefined) { return; }

				this.unSelectAll();
				this._selectRange(this.element.data("lastdate.wijcalendar"), date, true);
			}
		},

		_onDayMouseLeave: function (e) {
			$(e.currentTarget).attr('state', 'normal');
			this._refreshDayCell(e.currentTarget);
		},

		_selectRange: function (start, end, bymouse) {
			if (start !== undefined && start !== new Date(1900, 1, 1)) {
				var minDate = start;
				var maxDate = end;
				if (start > end) {
					maxDate = start;
					minDate = end;
				}

				var selDates = [];
				while (true) {
					if (minDate > maxDate) {
						break;
					}
					this.selectDate(minDate);
					selDates[selDates.length] = minDate;
					minDate = wijDateOps.addDays(minDate, 1);
				}
				if (!bymouse) {
					this.element.removeData("lastdate.wijcalendar");
				}

				this._trigger('selectedDatesChanged', null, { dates: selDates });
			}
			else {
				this.selectDate(start);
				this._trigger('selectedDatesChanged', null, { dates: [start] });
			}

			return true;
		},

		_getCellDate: function (c) {
			var d = $(c).attr('date');
			return (d === undefined) ? d : new Date(d);
		},

		_getParentTable: function (c) {
			var parents = $(c).parents('table');
			return (parents.length === 0) ? undefined : parents.get(0);
		},

		_initMonthSelector: function (ms) {
			if ($(ms).data('cells') !== undefined) { return; }

			var tokens = ms.id.split('_');
			if (tokens[tokens.length - 1] !== 'ms') {
				throw Error.create('not a monthview');
			}
			var monthID = (tokens.slice(0, tokens.length - 1)).join('_');
			var monthTable = this._getParentTable(ms);
			var cells = [], i, j, td, dt;
			if (monthTable) {
				if (monthTable.id !== monthID) {
					throw Error.create('not a monthview');
				}
				for (i = 0; i < monthTable.rows.length; i++) {
					var row = monthTable.rows[i];
					for (j = 0; j < row.cells.length; j++) {
						td = row.cells[j];
						if (td) {
							dt = $(td).attr('daytype');
							if (dt !== undefined) {
								if ($(td).find('a').hasClass('ui-priority-secondary') === false) {
									if (this._isSelectable(parseInt(dt, 10))) {
										cells[cells.length] = td;
									}
								}
							}
						}
					}
				}
			}

			$(ms).data('cells', cells);
		},

		_onMonthSelectorClicked: function (e) {
			this._initMonthSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			this.element.removeData("lastdate.wijcalendar");
			this.unSelectAll();
			var selDates = [];
			for (i = 0; i < cells.length; i++) {
				var c = cells[i];
				var d = $(c).attr('date');
				if (d !== undefined) {
					var date = new Date(d);
					this.selectDate(date);
					selDates[selDates.length] = date;
				}
			}

			this._trigger('selectedDatesChanged', null, { dates: selDates });
			if (this.isPopupShowing()) {
				this.close();
			}

			return false;
		},

		_onMonthSelectorMouseEnter: function (e) {
			this._initMonthSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseEnter(e);
			}
		},

		_onMonthSelectorMouseLeave: function (e) {
			this._initMonthSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseLeave(e);
			}
		},

		_initWeekDaySelector: function (wd) {
			if ($(wd).data('cells') !== undefined) { return; }

			var tokens = wd.id.split('_');
			if (tokens[tokens.length - 2] !== 'cs') {
				throw Error.create('not a column');
			}
			var colIndex = parseInt(tokens[tokens.length - 1], 10);
			var monthID = (tokens.slice(0, tokens.length - 2)).join('_');
			var monthTable = this._getParentTable(wd);
			var cells = [];
			if (monthTable) {
				if (monthTable.id !== monthID) {
					throw Error.create('not a column');
				}
				var i = 0;
				if (!this._isSingleMonth()) { i++; }
				if (this.options.showWeekDays) { i++; }
				for (; i < monthTable.rows.length; i++) {
					var tr = monthTable.rows[i];
					if (colIndex < tr.cells.length) {
						var td = tr.cells[colIndex];
						if (td) {
							var dt = $(td).attr('daytype');
							if (dt !== undefined) {
								if ($(td).find('a').hasClass('ui-priority-secondary') === false) {
									if (this._isSelectable(parseInt(dt, 10))) {
										cells[cells.length] = td;
									}
								}
							}
						}
					}
				}
			}

			$(wd).data('cells', cells);
		},

		_onWeekDayClicked: function (e) {
			this._initWeekDaySelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			this.unSelectAll();
			var selDates = [];
			for (i = 0; i < cells.length; i++) {
				var c = $(cells[i]);
				var d = c.attr('date');
				if (d !== undefined) {
					var date = new Date(d);
					this.selectDate(date);
					selDates[selDates.length] = date;
				}
			}

			this._trigger('selectedDatesChanged', null, { dates: selDates });
			if (this.isPopupShowing()) {
				this.close();
			}

			return false;
		},

		_onWeekDayMouseEnter: function (e) {
			this._initWeekDaySelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseEnter(e);
			}
		},

		_onWeekDayMouseLeave: function (e) {
			this._initWeekDaySelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseLeave(e);
			}
		},

		_initWeekNumberSelector: function (wn) {
			if ($(wn).data('cells') !== undefined) { return; }

			var tokens = wn.id.split('_');
			if (tokens[tokens.length - 2] !== 'rs') {
				throw Error.create('not a row');
			}
			var rowIndex = parseInt(tokens[tokens.length - 1], 10);
			var monthID = (tokens.slice(0, tokens.length - 2)).join('_');
			var monthTable = this._getParentTable(wn);
			var cells = [];
			if (monthTable) {
				if (monthTable.id !== monthID) {
					throw Error.create('not a row');
				}
				var tr = monthTable.rows[rowIndex];
				if (tr) {
					var i = 0;
					if (this.options.showWeekNumbers) { i++; }
					for (; i < tr.cells.length; i++) {
						var td = tr.cells[i];
						if (td) {
							var dt = $(td).attr('daytype');
							if (dt !== undefined) {
								if ($(td).find('a').hasClass('ui-priority-secondary') === false) {
									if (this._isSelectable(parseInt(dt, 10))) {
										cells[cells.length] = td;
									}
								}
							}
						}
					}
				}
			}

			$(wn).data('cells', cells);
		},

		_onWeekNumberClicked: function (e) {
			this._initWeekNumberSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells');
			this.unSelectAll();
			var selDates = [], i;
			for (i = 0; i < cells.length; i++) {
				var c = $(cells[i]);
				var d = c.attr('date');
				if (d !== undefined) {
					var date = new Date(d);
					this.selectDate(date);
					selDates[selDates.length] = date;
				}
			}

			this._trigger('selectedDatesChanged', null, { dates: selDates });
			if (this.isPopupShowing()) {
				this.close();
			}

			return false;
		},

		_onWeekNumberMouseEnter: function (e) {
			this._initWeekNumberSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;
			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseEnter(e);
			}
		},

		_onWeekNumberMouseLeave: function (e) {
			this._initWeekNumberSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;
			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseLeave(e);
			}
		},

		_isAnimating: function () {
			return !!this.element.data('animating.wijcalendar');
		},

		_onPreviewMouseEnter: function (e) {
			if (!!this.element.data('previewContainer')) { return; }
			if (this._isAnimating()) { return; }

			var btn = $(e.currentTarget);
			var btnId = btn.attr('id');
			if (btnId === undefined) { return; }

			var mainDate = this.getDisplayDate();
			var months = this.options.monthCols * this.options.monthRows;
			if (btnId === "prevPreview") { months = -months; }

			this.options.displayDate = wijDateOps.addMonths(mainDate, months);
			this.element.data('preview.wijcalendar', true);

			var previewContainer = $('<div/>');
			previewContainer.appendTo(document.body);
			previewContainer.hide();
			previewContainer.addClass('wijmo-wijcalendar ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all');
			previewContainer.append(this._createCalendar());

			this.options.displayDate = mainDate;
			this.element.data('preview.wijcalendar', false);
			this._createMonthViews();

			previewContainer.wijpopup({
				showEffect: 'slide',
				showOptions: { direction: (btnId === 'prevPreview' ? 'right' : 'left') },
				hideEffect: 'slide',
				hideOptions: { direction: (btnId === 'prevPreview' ? 'right' : 'left') }
			});
			previewContainer.wijpopup('show', {
				my: (btnId === 'prevPreview' ? 'right top' : 'left top'),
				at: (btnId === 'prevPreview' ? 'left top' : 'right top'),
				of: btn
			});

			this.element.data('previewContainer', previewContainer);
		},

		_onPreviewMouseLeave: function (e) {
			var btn = $(e.currentTarget),
				btnId = btn.attr('id');
			if (btnId === undefined) { return; }

			var previewContainer = this.element.data('previewContainer');
			if (previewContainer) {
				if (previewContainer.wijpopup('isAnimating')) {
					var self = this;
					window.setTimeout(function () { self._onPreviewMouseLeave(e); }, 200);
				} else {
					previewContainer.wijpopup('hide');
					this.element.removeData('previewContainer');
				}
			}
		},

		_resetWidth: function () {
			if (!this._myGrid) {
				this.element.css('height', '');
				if (this.options.monthCols > 1) {
					this.element.css('width', 17 * this.options.monthCols + 'em');
					this.element.addClass('ui-datepicker-multi');
				}
				else {
					this.element.css('width', '');
					this.element.removeClass('ui-datepicker-multi');
				}
			}
		},

		_playMmSlideAnimation: function (toDate) {
			var w = this.element.width(),
				h = this.element.height();
			this.element.height(h);

			var date = this.getDisplayDate();
			this.element.wrapInner("<div class='wijmo-wijcalendar-multi-aniwrapper'></div>");
			var curContent = this.element.find('>:first-child').width(w).height(h);

			var newContent = curContent.clone(false);
			newContent.hide();

			this.options.displayDate = toDate;
			this._createMonthViews();
			newContent.empty().append(this._createMonthGroup());
			newContent.appendTo(this.element);

			var direction = this.options.direction || 'horizontal';
			var goNext = toDate > date;

			var calendar = this;
			this.element.data('animating.wijcalendar', true);
			curContent.effect('slide',
			{
				mode: 'hide',
				direction: direction === 'horizontal' ? (goNext ? 'left' : 'right') : (goNext ? 'up' : 'down'),
				easing: this.options.easing || 'easeOutBack',
				duration: this.options.duration
			},

			function () {
				curContent.remove();
			});

			newContent.effect('slide',
			{
				direction: direction === 'horizontal' ? (goNext ? 'right' : 'left') : (goNext ? 'down' : 'up'),
				easing: this.options.easing || 'easeOutBack',
				duration: this.options.duration
			},

			function () {
				while (newContent.parent().is('.wijmo-wijcalendar-multi-aniwrapper')) {
					newContent.parent().replaceWith(newContent);
				}

				newContent.replaceWith(newContent.contents());
				calendar.element.height('');
				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
				calendar._trigger('afterSlide');
			});
		},

		_playSlideAnimation: function (toDate) {
			if (!this._isSingleMonth()) { return; }

			var self = this,
				date = this.getDisplayDate(),
				curTable = this.element.find('.ui-datepicker-calendar'), wrapper, slideContainer;

			if (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				wrapper = curTable.parent();
			} else {
				wrapper = $.effects.createWrapper(curTable).css({ overflow: 'hidden' });
				wrapper.removeClass('ui-effects-wrapper');
				wrapper.addClass('wijmo-wijcalendar-aniwrapper');
			}

			if (wrapper.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				slideContainer = wrapper.parent();
			} else {
				slideContainer = $.effects.createWrapper(wrapper).css({ overflow: 'hidden' });
				slideContainer.removeClass('ui-effects-wrapper');
				slideContainer.addClass('wijmo-wijcalendar-aniwrapper');
			}

			var yearStep = 1;
			if (this._myGrid) {
				switch (this._myGrid.gridType) {
					case "month":
						yearStep = 1;
						break;
					case "year":
						yearStep = 10;
						break;
					case "decade":
						yearStep = 100;
						break;
				}
			}

			var direction = this.options.direction || 'horizontal',
				goNext = toDate > date,
				months = [];
			months[months.length] = toDate;
			var w = curTable.outerWidth(),
				h = curTable.outerHeight();

			if (direction === 'horizontal') {
				curTable.width(w).css('float', goNext ? 'left' : 'right');
				wrapper.width((months.length + 1) * w);
				wrapper.css('left', goNext ? 0 : -months.length * w).css('position', 'absolute');
			} else {
				wrapper.width(w);
				wrapper.css('top', goNext ? 0 : -months.length * h).css('position', 'absolute');
				wrapper.height((months.length + 1) * h);
			}

			$.each(months, function (index, date) {
				if (self._myGrid === undefined) {
					var mv = new wijMonthView(self, date),
						$view = self._customize(mv.getHtml(true));
					if (direction === 'horizontal') {
						$view.width(w).css('float', goNext ? 'left' : 'right').appendTo(wrapper);
					} else {
						$view.appendTo(wrapper);
					}
				} else {
					if (direction === 'horizontal') {
						$(self._myGrid.getHtml(date, true)).width(w).height(h).css('float', goNext ? 'left' : 'right').appendTo(wrapper);
					} else {
						$(self._myGrid.getHtml(date, true)).height(h).appendTo(wrapper);
					}
				}
			});

			this.options.displayDate = toDate;
			if (this._myGrid === undefined) {
				this._createMonthViews();
			}
			this._refreshTitle();

			this.element.data('animating.wijcalendar', true);
			wrapper.effect('slide',
			{
				mode: 'hide',
				direction: direction === 'horizontal' ? (goNext ? 'left' : 'right') : (goNext ? 'up' : 'down'),
				easing: this.options.easing || 'easeOutBack',
				distance: (direction === 'horizontal' ? w : h) * months.length,
				duration: this.options.duration
			},

			function () {
				curTable = wrapper.children(':last');
				while (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
					curTable.parent().replaceWith(curTable);
				}
				curTable.css({ 'float': '', 'width': '' });
				self._bindEvents();
				self.element.data('animating.wijcalendar', false);
				self._trigger('afterSlide');
			});
		},

		_onTitleClicked: function () {
			if (!this.options.allowQuickPick || !this._isSingleMonth()) { return; }
			if (this._isAnimating()) { return; }

			if (this._myGrid === undefined) {
				this._myGrid = new wijMyGrid(this);
			}
			else {
				switch (this._myGrid.gridType) {
					case "month":
						this._myGrid.gridType = "year";
						break;

					case "year":
						this._myGrid.gridType = "decade";
						break;

					case "decade":
						return;
				}
			}

			this._refreshTitle();
			this.element.width(this.element.width()).height(this.element.height());

			var curTable = this.element.find('.ui-datepicker-calendar'), wrapper, container;
			var w = curTable.outerWidth(), h = curTable.outerHeight();

			if (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				wrapper = curTable.parent();
			} else {
				wrapper = $.effects.createWrapper(curTable).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper');
			}

			if (wrapper.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				container = wrapper.parent();
			} else {
				container = $.effects.createWrapper(wrapper).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper')
				.width(w)
				.height(h);
			}

			var nextTable = $(this._myGrid.getHtml(true))
			.css({ position: 'absolute', top: 0, left: 0, opacity: 0 })
			.appendTo(container)
			.height(h);

			var selIndex = this._myGrid.getSelectedIndex();
			var row = Math.floor(selIndex / 4);
			var col = selIndex - (row * 4);

			var toWidth = w / 4;
			var toHeight = h / 3;

			var toBounds = {
				left: toWidth * col,
				top: toHeight * row,
				width: toWidth,
				height: toHeight
			};

			curTable.width("100%").height("100%");
			wrapper.css({ border: 'solid 1px #cccccc' });

			this.element.data('animating.wijcalendar', true);

			var calendar = this;
			wrapper.effect('size',
			{
				to: toBounds,
				duration: this.options.duration || 500
			},
			function () {
				wrapper.remove();
			}
		);

			nextTable.animate(
			{
				opacity: 1
			},
			this.options.duration || 500,
			function () {
				nextTable.css({ position: '', top: '', left: '', filter: '' });
				while (nextTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
					nextTable.parent().replaceWith(nextTable);
				}

				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
			}
		);
		},

		_onMyGridClicked: function (e) {
			if (this._myGrid === undefined) { return false; }
			if (this._isAnimating()) { return false; }

			var cell = $(e.currentTarget),
				index = parseInt(cell.attr('index'), 10),
				value = parseInt(cell.attr('value'), 10);
			if (this._myGrid.gridType !== "month") {
				if (!index || index === 11) { return false; }
			}

			if (!cell.hasClass('ui-state-active')) { this._myGrid.select(index, value); }

			if (this._myGrid.gridType === "decade") {
				this._myGrid.gridType = "year";
			}
			else {
				if (this._myGrid.gridType === "year") {
					this._myGrid.gridType = "month";
				}
				else {
					this._myGrid = undefined;
				}
			}

			this._refreshTitle();

			var curTable = this.element.find('.ui-datepicker-calendar'),
				wrapper,
				container;

			var w = curTable.outerWidth(), h = curTable.outerHeight();

			if (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				container = curTable.parent();
			} else {
				container = $.effects.createWrapper(curTable).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper')
				.width(w)
				.height(h);
			}

			var bounds = $.extend({}, cell.position(), { width: cell.width(), height: cell.height() });
			var $content;
			if (this._myGrid === undefined) {
				this._createMonthViews();
				var date = this.getDisplayDate();
				var mv = this._getMonthView(date);
				$content = this._customize(mv.getHtml(true));
			} else {
				$content = $(this._myGrid.getHtml(true));
			}

			var nextTable = $content.height(h).appendTo(container);
			wrapper = $.effects.createWrapper(nextTable).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper')
				.css($.extend(bounds, { border: 'solid 1px #cccccc', position: 'absolute' }));

			var calendar = this;
			this.element.data('animating.wijcalendar', true);
			wrapper.animate(
			{
				left: 0,
				top: 0,
				width: w,
				height: h
			},
			this.options.duration || 500,
			function () {
			}
		);

			curTable.animate(
			{
				opacity: 0
			},
			this.options.duration || 500,
			function () {
				curTable.remove();

				while (nextTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
					nextTable.parent().replaceWith(nextTable);
				}

				if (calendar._myGrid === undefined) {
					calendar.element.width('').height('');
				}

				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
			}
		);

			return false;
		},

		_onMyGridMouseEnter: function (e) {
			if (this._myGrid === undefined) { return; }

			var cell = $(e.currentTarget);
			var index = parseInt(cell.attr('index'), 10);
			if (this._myGrid.gridType !== "month" && (index < 0 || index > 11)) { return; }
			cell.addClass("ui-state-hover");
		},

		_onMyGridMouseLeave: function (e) {
			if (this._myGrid === undefined) { return; }

			var cell = $(e.currentTarget);
			var index = parseInt(cell.attr('index'), 10);
			if (this._myGrid.gridType !== "month" && (index < 0 || index > 11)) { return; }
			cell.removeClass("ui-state-hover");
		},

		_bindEvents: function () {
			if (!this.element.data('preview.wijcalendar') && !this.options.disabled) {
				this.element.find('div .wijmo-wijcalendar-navbutton').unbind().bind('mouseout.wijcalendar', function () {
					var el = $(this);
					el.removeClass('ui-state-hover');
					if (el.hasClass('ui-datepicker-next-hover')) {
						el.removeClass('ui-datepicker-next-hover');
					} else if (el.hasClass('ui-datepicker-prev-hover')) {
						el.removeClass('ui-datepicker-prev-hover');
					}
				}).bind('mouseover.wijcalendar', function () {
					var el = $(this);
					el.addClass('ui-state-hover');
					if (el.hasClass('ui-datepicker-next')) {
						el.addClass('ui-datepicker-next-hover');
					} else if (el.hasClass('ui-datepicker-prev')) {
						el.addClass('ui-datepicker-prev-hover');
					}
				}).bind('click.wijcalendar', $.proxy(this._onNavButtonClicked, this));

				this.element.find(".ui-datepicker-title").unbind().bind('mouseout.wijcalendar', function () {
					$(this).removeClass('ui-state-hover');
				}).bind('mouseover.wijcalendar', function () {
					$(this).addClass('ui-state-hover');
				}).bind('click.wijcalendar', $.proxy(this._onTitleClicked, this));

				this.element.find(".wijmo-wijcalendar-prevpreview-button, .wijmo-wijcalendar-nextpreview-button").unbind('mouseenter.wijcalendar').unbind('mouseleave.wijcalendar').bind({
					"mouseenter.wijcalendar": $.proxy(this._onPreviewMouseEnter, this),
					"mouseleave.wijcalendar": $.proxy(this._onPreviewMouseLeave, this)
				});

				if (this._myGrid === undefined) {
					this.element.find(".wijmo-wijcalendar-day-selectable").unbind().bind({
						"click.wijcalendar": $.proxy(this._onDayClicked, this),
						"mouseenter.wijcalendar": $.proxy(this._onDayMouseEnter, this),
						"mouseleave.wijcalendar": $.proxy(this._onDayMouseLeave, this),
						"mousedown.wijcalendar": $.proxy(this._onDayMouseDown, this),
						"dragstart.wijcalendar": $.proxy(this._onDayDragStart, this)
					});
					if (!!this.options.selectionMode.month) {
						this.element.find(".wijmo-wijcalendar-monthselector").unbind().bind({
							"click.wijcalendar": $.proxy(this._onMonthSelectorClicked, this),
							"mouseenter.wijcalendar": $.proxy(this._onMonthSelectorMouseEnter, this),
							"mouseleave.wijcalendar": $.proxy(this._onMonthSelectorMouseLeave, this)
						});
					}
					if (!!this.options.selectionMode.weekDay) {
						this.element.find(".ui-datepicker-week-day").unbind().bind({
							"click.wijcalendar": $.proxy(this._onWeekDayClicked, this),
							"mouseenter.wijcalendar": $.proxy(this._onWeekDayMouseEnter, this),
							"mouseleave.wijcalendar": $.proxy(this._onWeekDayMouseLeave, this)
						});
					}
					if (!!this.options.selectionMode.weekNumber) {
						this.element.find(".wijmo-wijcalendar-week-num").unbind().bind({
							"click.wijcalendar": $.proxy(this._onWeekNumberClicked, this),
							"mouseenter.wijcalendar": $.proxy(this._onWeekNumberMouseEnter, this),
							"mouseleave.wijcalendar": $.proxy(this._onWeekNumberMouseLeave, this)
						});
					}
				} else {
					this.element.find(".wijmo-wijcalendar-day-selectable").unbind().bind({
						"click.wijcalendar": $.proxy(this._onMyGridClicked, this),
						"mouseenter.wijcalendar": $.proxy(this._onMyGridMouseEnter, this),
						"mouseleave.wijcalendar": $.proxy(this._onMyGridMouseLeave, this)
					});
				}
			}
		},

		_isSelectable: function (dayType) {
			var o = this.options;
			return (o.showOtherMonthDays && (dayType & wijDayType.otherMonth)) || !(dayType & (wijDayType.outOfRange | wijDayType.disabled | wijDayType.otherMonth));
		},

		_getCellClassName: function (dayType, date, previewMode) {
			var o = this.options,
				cssCell = '',
				cssText = 'ui-state-default',
				allowSelDay = (!!o.selectionMode.day || !!o.selectionMode.days);

			previewMode = previewMode || false;
			if (!previewMode && !o.disabled && allowSelDay && this._isSelectable(dayType)) {
				cssCell += " wijmo-wijcalendar-day-selectable";
			}

			if ((dayType & wijDayType.weekEnd)) {
				cssCell += ' ui-datepicker-week-end';
			}
			if ((dayType & wijDayType.otherMonth)) {
				cssCell += ' ui-datepicker-other-month';
				cssText += ' ui-priority-secondary';
			}
			if ((dayType & wijDayType.outOfRange)) {
				cssCell += ' wijmo-wijcalendar-outofrangeday';
				cssText += ' ui-priority-secondary';
			}
			if ((dayType & wijDayType.gap)) {
				cssCell += ' wijmo-wijcalendar-gap';
			} else {
				if ((dayType & wijDayType.disabled)) {
					cssCell += ' ui-datepicker-unselectable';
					cssText += ' ui-state-disabled';
				}
				if ((dayType & wijDayType.today)) {
					cssCell += ' ui-datepicker-days-cell-over ui-datepicker-today';
					cssText += ' ui-state-highlight';
				}
				if ((dayType & wijDayType.selected) &&
				((dayType & (wijDayType.outOfRange | wijDayType.disabled)) === 0)) {
					cssCell += ' ui-datepicker-current-day';
					cssText += ' ui-state-active';
				}
				if ((dayType & wijDayType.gap)) {
					cssCell += ' wijmo-wijcalendar-gap';
				}
				if ((dayType & wijDayType.custom)) {
					cssCell += ' wijmo-wijcalendar-customday';
				}
			}

			return { cssCell: cssCell, cssText: cssText };
		},

		_onNavButtonClicked: function (e) {
			if (this._isAnimating()) { return false; }

			var step = 1,
				btnId = $(e.currentTarget).attr('id'),
				date = this.getDisplayDate(),
				nextDate = date;
			if (this._myGrid === undefined) {
				step = btnId.indexOf('quick') >= 0 ? this.options.quickNavStep : 1;
				step = btnId.indexOf('next') >= 0 ? step : -step;
				step = step * this.options.monthRows * this.options.monthCols;
				nextDate = wijDateOps.addMonths(date, step);
			}
			else {
				step = btnId.indexOf('next') >= 0 ? 1 : -1;
				switch (this._myGrid.gridType) {
					case "month":
						nextDate = wijDateOps.addYears(date, step);
						break;
					case "year":
						nextDate = wijDateOps.addYears(date, step * 10);
						break;
					case "decade":
						nextDate = wijDateOps.addYears(date, step * 100);
						break;
				}
			}

			this._slideToDate(nextDate);
			return false;
		},

		_getMonthGroupHtml: function () {
			var date = this.getDisplayDate(), mv;
			if (this._isSingleMonth()) {
				mv = this._getMonthView(date);
				mv.showPreview = this.options.allowPreview && !this.element.data('preview.wijcalendar');
				return mv.getHtml();
			}

			var width = 100 / this.options.monthCols + '%';
			var hw = new htmlTextWriter(), r, c;
			for (r = 0; r < this.options.monthRows; r++) {
				for (c = 0; c < this.options.monthCols; c++) {
					hw.writeBeginTag('div');
					hw.writeAttribute('class', 'ui-datepicker-group' + (c === 0 ? ' ui-datepicker-group-first' : '') + (c === this.options.monthCols - 1 ? ' ui-datepicker-group-last' : ''));
					hw.writeAttribute('style', 'width:' + width);
					hw.writeTagRightChar();
					mv = this._getMonthView(date);
					mv.showPreview = false;
					hw.write(mv.getHtml());
					hw.writeEndTag('div');
					date = wijDateOps.addMonths(date, 1);
				}

				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-datepicker-row-break');
				hw.writeTagRightChar();
				hw.writeEndTag('div');
			}

			return hw.toString();
		},

		_getCalendarHtml: function () {
			this._createMonthViews();
			var hw = new htmlTextWriter();
			hw.write(this._getMonthGroupHtml());
			return hw.toString();
		},

		_customizeDayCell: function ($dayCell) {
			if ($dayCell.attr("state") === undefined) { $dayCell.attr("state", 'normal'); }
			if ($dayCell.attr("daytype") === undefined) { return; }
			if ($dayCell.attr("date") === undefined) { return; }

			var dayType = parseInt($dayCell.attr("daytype"), 10),
				date = new Date($dayCell.attr("date")),
				hover = $dayCell.attr("state") === 'hover';

			this.options.customizeDate($dayCell, date, dayType, hover);
		},

		_customize: function (html) {
			var o = this.options, self = this, $h = $(html);
			if (!$.isFunction(o.customizeDate)) { return $h; }

			$.each($h.find('.wijmo-wijcalendar-day-selectable'), function (index, dayCell) {
				self._customizeDayCell($(dayCell));
			});

			return $h;
		},

		_createCalendar: function () {
			return this._customize($(this._getCalendarHtml()));
		},

		_createMonthGroup: function () {
			return this._customize($(this._getMonthGroupHtml()));
		},

		_getMonthID: function (date) {
			return date.getFullYear() + '_' + (date.getMonth() + 1);
		},

		_createMonthViews: function () {
			this._monthViews = {};
			var monthID = '';
			var date = this.getDisplayDate(), row, col;
			for (row = 0; row < this.options.monthRows; row++) {
				for (col = 0; col < this.options.monthCols; col++) {
					monthID = this._getMonthID(date);
					this._monthViews[monthID] = new wijMonthView(this, date);

					if (row === 0) {
						if (col === 0) {
							this._monthViews[monthID].isFirst = true;
						}

						if (col === this.options.monthCols - 1) {
							this._monthViews[monthID].isLast = true;
						}
					}
					date = wijDateOps.addMonths(date, 1);
				}
			}
			date = this.getDisplayDate();
			monthID = this._getMonthID(date);
			var mv = this._monthViews[monthID];
			if (mv) {
				this._groupStartDate = mv.getStartDate();
			}
			var count = this.options.monthRows * this.options.monthCols;
			if (count > 1) {
				date = wijDateOps.addMonths(date, count - 1);
				monthID = this._getMonthID(date);
				mv = this._monthViews[monthID];
			}
			if (mv) {
				this._groupEndDate = mv.getEndDate();
			}
		},

		_getMonthView: function (date) {
			var monthID = this._getMonthID(date);
			return this._monthViews[monthID];
		},

		_getId: function () {
			return this.element.attr("id");
		},

		_getChildElement: function (id) {
			var child = this.element.find('[id*=\'' + id + '\']');
			return child.length === 0 ? undefined : child;
		},

		_refreshDayCell: function (dayCell) {
			var $dc = $(dayCell), o = this.options;
			if ($dc.attr("state") === undefined) { $dc.attr("state", 'normal'); }
			if ($dc.attr("daytype") === undefined) { return; }
			if ($dc.attr("date") === undefined) { return; }

			var dayType = parseInt($dc.attr("daytype"), 10),
				date = new Date($dc.attr("date")),
				hover = $dc.attr("state") === 'hover';

			$dc.attr('class', this._getCellClassName(dayType, date).cssCell);
			$dc.removeAttr('aria-selected');
			if (dayType & wijDayType.selected) {
				$dc.attr('aria-selected', true);
			}

			if ($.isFunction(o.customizeDate)) {
				if (this._customizeDayCell($dc)) {
					return;
				}
			}

			var txt = $dc.find('a');
			if (txt.length > 0) {
				txt.toggleClass("ui-state-hover", hover);
				txt.toggleClass("ui-state-active", ((dayType & wijDayType.selected) !== 0));
			}
		},

		_isSingleMonth: function () {
			return this.options.monthCols * this.options.monthRows === 1;
		},

		_splitString: function (s, sep, count) {
			if (count === undefined) {
				return s.split(sep);
			}
			var ret = [];
			var arr = s.split(sep), i;
			for (i = 0; i < arr.length; i++) {
				if (i >= count) {
					ret[count - 1] = ret[count - 1] + sep + arr[i];
				}
				else {
					ret.push(arr[i]);
				}
			}
			return ret;
		},

		_getNavButtonHtml: function (id, cls, imgClass, tooltip) {
			var hw = new htmlTextWriter();
			hw.writeBeginTag('a');
			hw.writeAttribute('id', id);
			hw.writeAttribute('class', cls);
			hw.writeAttribute('role', 'button');
			hw.writeAttribute('href', '#');
			if (tooltip) {
				hw.writeAttribute('title', tooltip);
				hw.writeAttribute('aria-label', tooltip);
			}
			hw.writeTagRightChar();
			hw.writeBeginTag('span');
			hw.writeAttribute('class', imgClass);
			hw.writeTagRightChar();
			if (tooltip) { hw.write(tooltip); }
			hw.writeEndTag('span');
			hw.writeEndTag('a');
			return hw.toString();
		},

		_getTitleText: function (monthDate) {
			if (this._myGrid !== undefined) {
				return this._myGrid.getTitle();
			} else {
				var d = monthDate || this.getDisplayDate(),
					f = this.options.titleFormat || 'MMMM yyyy';

				if ($.isFunction(this.options.title)) {
					return this.options.title(d, f) || this._formatDate(f, d);
				}

				return this._formatDate(f, d);
			}
		},

		_refreshTitle: function () {
			this.element.find('.ui-datepicker-title').html(this._getTitleText());
		},

		_fillTitle: function (hw, date) {
			hw.writeBeginTag('div');
			hw.writeAttribute('class', 'ui-datepicker-title wijmo-wijcalendar-title ui-state-default ui-corner-all');
			hw.writeTagRightChar();
			hw.write(this._getTitleText(date));
			hw.writeEndTag('div');
		},

		_getHeaderHtml: function (monthDate, prevButtons, nextButtons) {
			var previewMode = !!this.element.data('preview.wijcalendar');
			var buttons = previewMode ? 'none' : (this._isSingleMonth() ? this.options.navButtons : 'default');
			var isRTL = this.element.is('.ui-datepicker-rtl');
			var hw = new htmlTextWriter();
			if (buttons === 'quick') {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-widget-header wijmo-wijcalendar-header ui-helper-clearfix ui-corner-all');
				hw.writeAttribute('role', 'heading');
				hw.writeTagRightChar();
				if (!!prevButtons) { hw.write(this._getNavButtonHtml('quickprev', 'wijmo-wijcalendar-navbutton ui-datepicker-prev ui-corner-all', 'ui-icon ui-icon-seek-' + (isRTL ? 'next' : 'prev'), this.options.quickPrevTooltip.replace('#', this.options.quickNavStep))); }
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-datepicker-header wijmo-wijcalendar-header-inner');
				hw.writeTagRightChar();
				if (!!prevButtons) { hw.write(this._getNavButtonHtml('prev', 'wijmo-wijcalendar-navbutton ui-datepicker-prev ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w'), this.options.prevTooltip)); }
				this._fillTitle(hw, monthDate);
				if (!!nextButtons) { hw.write(this._getNavButtonHtml('next', 'wijmo-wijcalendar-navbutton ui-datepicker-next ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e'), this.options.nextTooltip)); }
				hw.writeEndTag('div');
				if (!!nextButtons) { hw.write(this._getNavButtonHtml('quicknext', 'wijmo-wijcalendar-navbutton ui-datepicker-next ui-corner-all', 'ui-icon ui-icon-seek-' + (isRTL ? 'prev' : 'next'), this.options.quickNextTooltip.replace('#', this.options.quickNavStep))); }
				hw.writeEndTag('div');
			} else {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-datepicker-header ui-widget-header ui-datepicker-header ui-helper-clearfix ui-corner-all');
				hw.writeAttribute('role', 'heading');
				hw.writeTagRightChar();

				if (buttons !== 'none' && !!prevButtons) {
					hw.write(this._getNavButtonHtml('prev', 'wijmo-wijcalendar-navbutton ui-datepicker-prev ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w'), this.options.prevTooltip));
				}
				this._fillTitle(hw, monthDate);

				if (buttons !== 'none' && !!nextButtons) {
					hw.write(this._getNavButtonHtml('next', 'wijmo-wijcalendar-navbutton ui-datepicker-next ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e'), this.options.nextTooltip));
				}
				hw.writeEndTag('div');
			}

			return hw.toString();
		},

		_formatDate: function (format, date) {
			if (!wijDateOps.getTicks(date)) {
				return '&nbsp;';
			}

			return Globalize.format(date, format, this._getCulture());
		}
	});



	var htmlTextWriter = function () { this._html = []; };
	htmlTextWriter.prototype = {
		_html: null,
		writeTagLeftChar: function () { this._html[this._html.length] = '<'; },
		writeTagRightChar: function () { this._html[this._html.length] = '>'; },
		write: function (text) { this._html[this._html.length] = ' ' + text + ' '; },
		writeBeginTag: function (tagName) { this._html[this._html.length] = '<' + tagName; },
		writeEndTag: function (tagName) { this._html[this._html.length] = '</' + tagName + '>'; },
		writeFullBeginTag: function (tagName) { this._html[this._html.length] = '<' + tagName + '>'; },
		writeSelfClosingTagEnd: function () { this._html[this._html.length] = '/>'; },
		writeAttribute: function (name, value) {
			if (value === undefined || value === null) { return; }
			this._html[this._html.length] = ' ' + name + '=\"';
			this._html[this._html.length] = value;
			this._html[this._html.length] = '\"';
		},
		clean: function () { this._html = []; },
		toString: function () { return this._html.join(''); }
	};


	var wijDateOps = {
		addDays: function (date, days) {
			var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
			if (days) {
				if (dt.getDate() === date.getDate()) {
					dt = new Date(date.getFullYear(), date.getMonth(), date.getDate());
					dt.setTime(dt.getTime() + (days * 24 * 3600 * 1000));
				}
			}
			return dt;
		},

		addMonths: function (date, months) {
			return new Date(date.getFullYear(), date.getMonth() + months, 1);
		},

		addYears: function (date, years) {
			return this.addMonths(date, years * 12);
		},

		getDate: function (date) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate());
		},

		getTicks: function (date) {
			return date.valueOf();
		},

		isSameDate: function (date1, date2) {
			return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
		},

		isSameMonth: function (date1, date2) {
			return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
		},

		getDaysInMonth: function (date) {
			return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		},

		getWeekStartDate: function (date, firstDayOfWeek) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() - firstDayOfWeek + 7) % 7));
		},

		getDayOfYear: function (date) {
			var start = new Date(date.getFullYear(), 0, 1);
			var distance = this.getTicks(date) - this.getTicks(start);
			var days = distance / (24 * 60 * 60 * 1000);
			return Math.floor(days) + 1;
		},

		getFirstDayWeekOfYear: function (date, firstDayOfWeek) {
			var days = this.getDayOfYear(date) - 1;
			var offset = date.getDay() - (days % 7);
			offset = ((offset - firstDayOfWeek) + 14) % 7;
			var weeks = ((days + offset) / 7);
			return Math.floor(weeks) + 1;
		},

		getDayOfWeek: function (date, firstDayOfWeek) {
			return ((date.getDay() - firstDayOfWeek + 7) % 7);
		},

		getWeekOfYearFullDays: function (time, rule, firstDayOfWeek, fullDays) {
			var days = this.getDayOfYear(time) - 1;
			var offset = (this.getDayOfWeek(time, firstDayOfWeek)) - (days % 7);
			offset = ((firstDayOfWeek - offset) + 14) % 7;
			if ((offset) && (offset >= fullDays)) {
				offset -= 7;
			}
			offset = days - offset;
			if (offset >= 0) {
				return (Math.floor(offset / 7) + 1);
			}
			return this.getWeekOfYearFullDays(this.addDays(time, -(days + 1)), rule, firstDayOfWeek, fullDays);
		},

		getWeekOfYear: function (date, rule, firstDayOfWeek) {
			switch (rule) {
				case "firstDay":
					return this.getFirstDayWeekOfYear(date, firstDayOfWeek);
				case "firstFullWeek":
					return this.getWeekOfYearFullDays(date, rule, firstDayOfWeek, 7);
				case "firstFourDayWeek":
					return this.getWeekOfYearFullDays(date, rule, firstDayOfWeek, 4);
			}
			return this.getFirstDayWeekOfYear(date, firstDayOfWeek);
		},

		getDateToken: function (date) {
			return date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate();
		}
	};


	var wijMonthView = function (calendar, displayDate) {
		this.calendar = calendar;

		if (displayDate === undefined || wijDateOps.isSameDate(displayDate, new Date(1900, 0, 1))) { displayDate = new Date(); }

		this.displayDate = displayDate;
		this.id = this.calendar._getId() + '_' + this.calendar._getMonthID(displayDate);
		this.isFirst = false;
		this.isLast = false;
		this.showPreview = false;
		this.culture = this.calendar._getCulture();
		this._calcDates(this.displayDate);
	};


	wijMonthView.prototype = {
		_calcDates: function (date) {
			var daysInMonth = wijDateOps.getDaysInMonth(date);
			this._startDateInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
			this._endDateInMonth = wijDateOps.addDays(this._startDateInMonth, daysInMonth - 1);
			this._startDate = wijDateOps.getWeekStartDate(this._startDateInMonth, this.culture.calendar.firstDay);
			this._endDate = wijDateOps.addDays(this._startDate, this.calendar.options.dayRows * this.calendar.options.dayCols - 1);
		},

		_isFirstMonth: function () {
			var date = this.calendar.getDisplayDate();
			return wijDateOps.isSameMonth(this._startDateInMonth, date);
		},

		_isLastMonth: function () {
			var date = this.calendar.getDisplayDate();
			date = new Date(date.getFullYear(), date.getMonth(), 1);
			date = wijDateOps.addMonths(date, this.calendar.options.monthCols * this.calendar.options.monthRows - 1);
			return wijDateOps.isSameMonth(this._startDateInMonth, date);
		},

		getStartDate: function () {
			return this._startDate;
		},

		getEndDate: function () {
			return this._endDate;
		},

		_getMonthDate: function () {
			if (this._startDateInMonth === undefined) { this._calcDates(this.getDisplayDate()); }
			return this._startDateInMonth;
		},

		_setMonthDate: function (date) {
			this._calcDates(date);
		},

		_getWeekDayText: function (day, format) {
			format = format || "short";
			var days = this.culture.calendar.days;
			var text = '';
			switch (format) {
				case "full":
					text = days.names[day];
					break;
				case "firstLetter":
					text = days.names[day].substring(0, 1);
					break;
				case "abbreviated":
					text = days.namesAbbr[day];
					break;
				default:
					text = days.namesShort[day];
					break;
			}
			return text;
		},

		_getRowCount: function () {
			var o = this.calendar.options;
			return o.showWeekDays ? o.dayRows + 1 : o.dayRows;
		},

		_getColCount: function () {
			var o = this.calendar.options;
			return o.showWeekNumbers ? o.dayCols + 1 : o.dayCols;
		},

		_getDayType: function (date) {
			var o = this.calendar.options;
			var dayType = wijDayType.general;
			var dow = date.getDay();
			var weekEnd = dow === 6 || dow === 0; // Saturday or Sunday
			var outOfRange = date < o.minDate || date > o.maxDate;
			var otherMonth = date < this._startDateInMonth || date > this._endDateInMonth;
			var isDisabled = outOfRange || this.calendar._getDisabledDates().contains(date);
			var isSelected = this.calendar._getSelectedDates().contains(date);
			var today = new Date();
			var isToday = wijDateOps.isSameDate(date, today);
			var isCustom = false;
			if (weekEnd) {
				dayType |= wijDayType.weekEnd;
			}
			if (isToday) {
				dayType |= wijDayType.today;
			}
			if (isDisabled) {
				dayType |= wijDayType.disabled;
			}
			if (otherMonth) {
				dayType |= wijDayType.otherMonth;
			}
			if (outOfRange) {
				dayType |= wijDayType.outOfRange;
			}
			if (isSelected) {
				dayType |= wijDayType.selected;
			}
			if (isCustom) {
				dayType |= wijDayType.custom;
			}
			if (otherMonth && !o.showOtherMonthDays) {
				dayType |= wijDayType.gap;
			}
			return dayType;
		},

		_refreshDate: function (date) {
			if (date < this._startDate || date > this._endDate) { return; }
			var o = this.calendar.options;
			var offset = (Math.round(Math.abs(date - this._startDate) / (24 * 60 * 60 * 1000)));
			var row = Math.floor(offset / this.calendar.options.dayCols),
							col = Math.floor(offset % this.calendar.options.dayCols);
			if (o.showWeekNumbers) { col++; }
			if (o.showWeekDays) { row++; }

			var tbl = $("#" + this.id, this.calendar.element).get(0);
			if (tbl) {
				if (row < tbl.rows.length) {
					var r = tbl.rows[row];
					if (col < r.cells.length) {
						var dayCell = r.cells[col];
						var dayType = this._getDayType(date);
						$(dayCell).attr('daytype', dayType.toString());
						this.calendar._refreshDayCell(dayCell);
					}
				}
			}
		},

		_fillDayCell: function (hw, date, previewMode) {
			var o = this.calendar.options,
							custom = null,
							text = date.getDate().toString(),
							tooltip = this.calendar._formatDate(o.toolTipFormat || "dddd, MMMM dd, yyyy", date),
							dayType = this._getDayType(date),
							selectable = this.calendar._isSelectable(dayType),
							css = this.calendar._getCellClassName(dayType, date, previewMode);

			text = (o.showDayPadding && text.length === 1) ? '0' + text : text;

			hw.writeBeginTag('td');
			hw.writeAttribute('daytype', (dayType).toString());
			if (selectable) {
				hw.writeAttribute('title', tooltip);
				hw.writeAttribute('aria-label', tooltip);
			}
			hw.writeAttribute('date', date.toDateString());
			hw.writeAttribute('class', css.cssCell);
			hw.writeAttribute('role', 'gridcell');
			if (!selectable) {
				hw.writeAttribute('aria-disabled', 'true');
			}
			hw.writeTagRightChar();

			if ((dayType & wijDayType.gap)) {
				hw.write('&#160;');
			} else {
				if (custom && custom.content) {
					hw.write(custom.content);
				} else {
					hw.writeBeginTag('a');
					hw.writeAttribute('class', css.cssText);
					hw.writeAttribute('href', '#');
					hw.writeAttribute('onclick', 'return false;');
					hw.writeTagRightChar();
					hw.write(text);
					hw.writeEndTag('a');
				}
			}

			hw.writeEndTag('td');
		},

		getHtml: function (tableOnly) {
			tableOnly = !!tableOnly;
			var o = this.calendar.options;
			var previewMode = !!this.calendar.element.data('preview.wijcalendar');
			var hw = new htmlTextWriter(), i, j;
			if (!tableOnly && o.showTitle) {
				hw.write(this.calendar._getHeaderHtml(this._startDateInMonth, this.isFirst, this.isLast));
			}

			if (!tableOnly && !previewMode && this.showPreview) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'wijmo-wijcalendar-prevpreview-button');
				hw.writeAttribute('role', 'button');
				hw.writeAttribute('aria-haspopup', 'true');
				hw.writeAttribute('id', 'prevPreview');
				hw.writeTagRightChar();
				hw.writeBeginTag('a');
				hw.writeAttribute('class', 'ui-icon ui-icon-grip-dotted-vertical');
				hw.writeAttribute('href', '#');
				hw.writeAttribute('title', o.prevPreviewTooltip);
				hw.writeAttribute('aria-label', o.prevPreviewTooltip);
				hw.writeAttribute('onclick', 'return false;');
				hw.writeTagRightChar();
				hw.write('&#160;');
				hw.writeEndTag('a');
				hw.writeEndTag('div');
			}

			hw.writeBeginTag('table');
			hw.writeAttribute('id', this.id);
			hw.writeAttribute('class', 'ui-datepicker-calendar wijmo-wijcalendar-table');
			hw.writeAttribute('role', 'grid');
			hw.writeAttribute('summary', this.calendar._getTitleText(this._startDateInMonth));
			hw.writeAttribute('onselectstart', 'return false;');
			hw.writeTagRightChar();
			if (o.showWeekDays) {
				hw.writeFullBeginTag('thead');
				hw.writeBeginTag('tr');
				hw.writeTagRightChar();
				if (o.showWeekNumbers) {
					hw.writeBeginTag('th');
					hw.writeAttribute('id', this.id + '_ms');
					hw.writeAttribute('class', 'ui-datepicker-week-col wijmo-wijcalendar-monthselector' + (!!o.selectionMode.month ? ' wijmo-wijcalendar-selectable' : ''));
					hw.writeAttribute('role', 'columnheader');
					hw.writeTagRightChar();

					if (!!o.selectionMode.month && !previewMode && !o.disabled) {
						hw.writeBeginTag('a');
						hw.writeAttribute('class', 'ui-icon ui-icon-triangle-1-se');
						hw.writeSelfClosingTagEnd();
					} else {
						hw.write('Wk');
					}

					hw.writeEndTag('th');
				}

				var dayOfWeek = this._startDate.getDay(), weekStartDate = this._startDate;
				for (i = 0; i < o.dayCols; i++) {
					var weekEnd = dayOfWeek === 6 || dayOfWeek === 0;
					var colIndex = i + ((o.showWeekNumbers) ? 1 : 0);
					var txt = this._getWeekDayText(dayOfWeek, o.weekDayFormat);
					var fullTxt = this._getWeekDayText(dayOfWeek, "full");
					hw.writeBeginTag('th');
					hw.writeAttribute('id', this.id + '_cs_' + colIndex);
					hw.writeAttribute('class', 'ui-datepicker-week-day' + (weekEnd ? ' ui-datepicker-week-end' : '') + (!!o.selectionMode.weekDay ? ' wijmo-wijcalendar-selectable' : ''));
					hw.writeAttribute('role', 'columnheader');
					hw.writeTagRightChar();

					hw.writeBeginTag('span');
					hw.writeAttribute('title', fullTxt);
					hw.writeAttribute('aria-label', fullTxt);
					hw.writeTagRightChar();
					hw.write(txt);
					hw.writeEndTag('span');

					hw.writeEndTag('th');
					dayOfWeek = ((dayOfWeek + 1) % 7);
					weekStartDate = wijDateOps.addDays(weekStartDate, 1);
				}
				hw.writeEndTag('tr');
				hw.writeEndTag('thead');
			}

			hw.writeFullBeginTag('tbody');
			var date = this._startDate, wnDate = this._startDateInMonth;
			for (i = 0; i < o.dayRows; i++) {
				hw.writeBeginTag('tr');
				hw.writeTagRightChar();
				if (o.showWeekNumbers) {
					var rowIndex = i + ((o.showWeekDays) ? 1 : 0);
					hw.writeBeginTag('td');
					hw.writeAttribute('id', this.id + '_rs_' + rowIndex);
					hw.writeAttribute('class', 'ui-datepicker-week-col wijmo-wijcalendar-week-num' + (!!o.selectionMode.weekNumber ? ' wijmo-wijcalendar-selectable' : ''));
					hw.writeAttribute('role', 'rowheader');
					hw.writeTagRightChar();
					var weekNumber = wijDateOps.getWeekOfYear(wnDate, o.calendarWeekRule, this.culture.calendar.firstDay);
					hw.write(weekNumber);
					hw.writeEndTag('td');
					wnDate = wijDateOps.addDays(wnDate, o.dayCols);
				}
				for (j = 0; j < o.dayCols; j++) {
					this._fillDayCell(hw, date, previewMode);
					date = wijDateOps.addDays(date, 1);
				}
				hw.writeEndTag('tr');
			}
			hw.writeEndTag('tbody');
			hw.writeEndTag('table');

			if (!tableOnly && !previewMode && this.showPreview) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'wijmo-wijcalendar-nextpreview-button');
				hw.writeAttribute('role', 'button');
				hw.writeAttribute('aria-haspopup', 'true');
				hw.writeAttribute('id', 'nextPreview');
				hw.writeTagRightChar();
				hw.writeBeginTag('a');
				hw.writeAttribute('class', 'ui-icon ui-icon-grip-dotted-vertical');
				hw.writeAttribute('href', '#');
				hw.writeAttribute('title', o.nextPreviewTooltip);
				hw.writeAttribute('aria-label', o.nextPreviewTooltip);
				hw.writeAttribute('onclick', 'return false;');
				hw.writeTagRightChar();
				hw.write('&#160;');
				hw.writeEndTag('a');
				hw.writeEndTag('div');
			}

			return hw.toString();
		}
	};


	var wijDateCollection = function (calendar, optionName) {
		this._calendar = calendar;
		this._optionName = optionName;
		this._normalize();
	};

	wijDateCollection.prototype = {
		_calendar: null,
		_optionName: 'selectedDates',

		getDates: function () {
			if (this._calendar.options[this._optionName] === undefined) {
				this._calendar.options[this._optionName] = [];
			}

			return this._calendar.options[this._optionName];
		},

		setDates: function (dates) {
			this._calendar.options[this._optionName] = dates;
			this._normalize();
		},

		getCount: function () {
			return this.getDates().length;
		},

		clear: function () {
			this.setDates([]);
		},

		add: function (date) {
			this.addRange(date, date);
		},

		remove: function (date) {
			this.removeRange(date, date);
		},

		indexOf: function (date) {
			if (!this.getCount()) { return -1; }
			return this._findRangeBound(date, true, false);
		},

		contains: function (date) {
			return this.indexOf(date) !== -1;
		},

		removeRange: function (start, end) {
			if (!this.getCount()) { return; }
			var startIndex = this._findRangeBound(start, false, true);
			var endIndex = this._findRangeBound(end, false, false);
			if (startIndex < 0 || endIndex < 0) { return; }
			if (startIndex > endIndex) { return; }
			var dates = this.getDates();
			if (dates[endIndex] > end) { return; }
			var startSlice = (!startIndex) ? [] : dates.slice(0, startIndex);
			var endSlice = endIndex >= (dates.length - 1) ? [] : dates.slice(endIndex + 1);
			this.setDates(startSlice.concat(endSlice));
		},

		addRange: function (start, end) {
			this.removeRange(start, end);
			var dates = this.getDates(),
							insertIndex = this._findRangeBound(start, false, true),
							startSlice = (!insertIndex) ? [] : dates.slice(0, insertIndex),
							endSlice = dates.slice(insertIndex),
							midSlice = [],
							curDate;
			start = wijDateOps.getDate(start);
			end = wijDateOps.getDate(end);
			for (curDate = start; curDate <= end; curDate = wijDateOps.addDays(curDate, 1)) {
				midSlice[midSlice.length] = curDate;
			}
			this.setDates(startSlice.concat(midSlice.concat(endSlice)));
		},

		_findRangeBound: function (date, exact, isStart) {
			var dates = this.getDates(),
							low = 0,
							hi = dates.length,
							index;
			while (low < hi) {
				index = (low + hi) >> 1;
				if (wijDateOps.isSameDate(date, dates[index])) {
					return index;
				}
				if (date < dates[index]) {
					hi = index;
				}
				else {
					low = index + 1;
				}
			}
			if (exact) {
				return -1;
			}
			return (isStart) ? low : hi;
		},

		_parseDate: function (date) {
			var strDate;
			if (!date) {
				date = new Date();
			} else {
				if (typeof date === 'string') {
					strDate = date;
				}
			}

			if (strDate) {
				strDate = strDate.replace(/-/g, '/');

				try {
					date = new Date(strDate);
					if (isNaN(date)) {
						date = new Date();
					}
				}
				catch (e) {
					date = new Date();
				}
			}

			return date;
		},

		_normalize: function () {
			//Normalize the array
			var dates = this._calendar.options[this._optionName];
			var self = this;
			if ($.isArray(dates)) {
				var newDates = $.map(dates, function (d, i) {
					return self._parseDate(d);
				});

				this._calendar.options[this._optionName] = newDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
			}
		}
	};

	var wijMyGrid = function (calendar) {
		this.gridType = "month";
		this.calendar = calendar;
		this.culture = calendar._getCulture();
	};

	wijMyGrid.prototype = {
		gridType: "month",
		calendar: null,
		culture: undefined,

		select: function (index, value) {
			var date = this.calendar.getDisplayDate();
			switch (this.gridType) {
				case "month":
					date.setMonth(value);
					break;
				case "year":
					date.setFullYear(value);
					break;
				case "decade":
					date.setFullYear(value);
					break;
			}

			this.calendar.options.displayDate = date;
		},

		getSelectedIndex: function () {
			var date = this.calendar.getDisplayDate();
			var year = date.getFullYear();
			var startYear = Math.floor(year / 10) * 10 - 1;
			var startDecade = Math.floor(year / 100) * 100 - 10;
			switch (this.gridType) {
				case "month":
					return date.getMonth();
				case "year":
					return year - startYear;
				case "decade":
					return Math.floor((year - startDecade) / 10);
			}
			return 0;
		},

		getTitle: function () {
			var date = this.calendar.getDisplayDate(),
					year = date.getFullYear(),
					startYear = Math.floor(year / 10) * 10 - 1,
					startDecade = Math.floor(year / 100) * 100 - 10;
			switch (this.gridType) {
				case "month":
					return year.toString();
				case "year":
					return (startYear + 1) + " - " + (startYear + 10);
				case "decade":
					return (startDecade + 10) + " - " + (startDecade + 109);
			}
			return '';
		},

		getHtml: function (date, tableOnly) {
			if (date === undefined) {
				date = this.calendar.getDisplayDate();
			} else {
				if (typeof (date) === 'boolean') {
					tableOnly = date;
					date = this.calendar.getDisplayDate();
				}
			}

			tableOnly = !!tableOnly;
			var o = this.calendar.options;
			var hw = new htmlTextWriter();
			if (o.showTitle && !tableOnly) {
				hw.write(this.calendar._getHeaderHtml(null, true, true));
			}

			var rows = 3, cols = 4;
			var height = 100 / rows + '%';
			height = '30%';
			hw.writeBeginTag('table');
			hw.writeAttribute('class', 'ui-datepicker-calendar wijmo-wijcalendar-mygrid');
			hw.writeAttribute('role', 'grid');
			hw.writeAttribute('onselectstart', 'return false;');
			hw.writeTagRightChar();
			var year = date.getFullYear(),
				startMonth = date.getFullYear() * 12,
				startYear = Math.floor(year / 10) * 10 - 1,
				startDecade = Math.floor(year / 100) * 100 - 10,
				ms = this.culture.calendar.months,
				i, j;


			for (i = 0; i < rows; i++) {
				hw.writeBeginTag('tr');
				hw.writeAttribute('height', height);
				hw.writeTagRightChar();
				for (j = 0; j < cols; j++) {
					var index = i * 4 + j;
					var selected = false;
					var outofRange = false;
					var cellText = '';
					var v;
					switch (this.gridType) {
						case "month":
							if (date.getMonth() === index) {
								selected = true;
							}
							v = index;
							cellText = ms.namesAbbr[index];
							outofRange = ((startMonth + index) < (o.minDate.getFullYear() * 12 + o.minDate.getMonth())) || ((startMonth + index) > (o.maxDate.getFullYear() * 12 + o.maxDate.getMonth()));
							break;
						case "year":
							if (index === 0 || index === 11) { outofRange = true; }
							v = startYear + index;
							if (v < o.minDate.getFullYear() || v > o.maxDate.getFullYear()) {
								outofRange = true;
							} else {
								selected = (year === v);
							}
							cellText = v.toString();
							break;
						case "decade":
							if (index === 0 || index === 11) { outofRange = true; }
							v = startDecade + index * 10;
							if (v + 10 < o.minDate.getFullYear() || v > o.maxDate.getFullYear()) {
								outofRange = true;
							} else {
								selected = (year >= v && year < (v + 10));
							}
							cellText = v.toString() + '-<br/>' + (v + 9).toString();
							break;
					}

					var cls = 'ui-datepicker-week-day';
					if (outofRange) {
						cls = cls + ' ui-datepicker-other-month  ui-priority-secondary ui-datepicker-unselectable';
					} else {
						if (!o.disabled) {
							cls += " wijmo-wijcalendar-day-selectable";
						}
					}

					cls += " " + 'ui-state-default' + (outofRange ? ' ui-state-disabled' : '') + (selected ? ' ui-state-active ui-state-highlight' : '');

					hw.writeBeginTag('td');
					hw.writeAttribute('class', cls);
					hw.writeAttribute('role', 'gridcell');
					//hw.writeAttribute('width', width);
					hw.writeAttribute('index', index.toString());
					hw.writeAttribute('value', v.toString());
					hw.writeAttribute('other', outofRange.toString());
					hw.writeTagRightChar();

					hw.writeBeginTag('a');
					hw.writeAttribute('href', '#');
					hw.writeTagRightChar();
					hw.write(cellText);
					hw.writeEndTag('a');
					hw.writeEndTag('td');
				}
				hw.writeEndTag('tr');
			}
			hw.writeEndTag('table');
			return hw.toString();
		}
	};


} (jQuery));
/*globals jQuery,$*/
/*jslint white: false */
/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Expander widget.
* 
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  jquery.wijmo.wijutil.js
*  jquery.wijmo.wijexpander.js
*  Non-default animations requires UI Effects Core
*
*/
(function ($) {
	"use strict";
	$.widget("wijmo.wijexpander", {
		// widget options
		options: {
			/// <summary>
			/// Determines if the widget can expand. Set this option to false if
			/// you want to disable collapse/expand ability.
			/// Default: true
			/// Type: Boolean.
			/// Code example: $("#element").wijexpander({ allowExpand: false });
			/// </summary>
			allowExpand: true,
			/// <summary>
			/// Determines the animation easing effect; set this option to false in 
			/// order to disable animation.
			/// Custom easing effects require the UI Effects Core. Additional options 
			/// that are available for the animation function include:
			/// expand - value of true indicates that content element must be expanded.
			/// horizontal - value of true indicates that expander is horizontally 
			///	orientated (when expandDirection is left or right).
			/// content - jQuery object that contains content element to be expanded or 
			///				collapsed.
			/// Default: "slide"
			/// Type: string.
			/// Code example: 
			///        $("#expander2").wijexpander({
			///            animated: "custom1"
			///        });
			///        jQuery.wijmo.wijexpander.animations.custom1 = function (options) {
			///            this.slide(options, {
			///                easing: "easeInBounce",
			///                duration: 900
			///            });
			///        }
			/// </summary>
			animated: 'slide',
			/// <summary>
			/// Determines the URL to the external content. For example, 
			/// http://componentone.com/ for the ComponentOne Web site.
			/// Default: ""
			/// Type: string.
			/// Code example:
			///	$("#element").wijexpander({ contentUrl: "http://componentone.com/" });
			/// </summary>
			contentUrl: "",
			/// <summary>
			/// Determines the visibility state of the content panel. If true, the 
			///	content element is visible.
			/// Default: true
			/// Type: Boolean
			/// Code example: $("#element").wijexpander({ expanded: false });
			/// </summary>
			expanded: true,
			/// <summary>
			/// Determines the content expand direction. Available values are top, right,
			///	bottom, and left. 
			/// Default: "bottom"
			/// Type: string
			/// Code example: $("#element").wijexpander({ expandDirection: "right" });
			/// </summary>
			expandDirection: "bottom"
		},

		/*Available Events:
		/// <summary>
		/// Occurs before the content area collapses. 
		/// Return false or call event.preventDefault() in order to cancel event and 
		/// prevent the content area from collapsing.
		/// Type: Function
		/// Event type: wijexpanderbeforecollapse
		/// Code example:
		/// Supply a callback function to handle the beforeCollapse event as an option.
		/// $("#expander").wijexpander({ beforeCollapse: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderbeforecollapse.
		/// $( "#expander" ).bind( "wijexpanderbeforecollapse", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>			
		beforeCollapse(e)

		/// <summary>
		/// Occurs before the content area expands. 
		/// Return false or call event.preventDefault() in order to cancel event and 
		/// prevent the content area from expanding.
		/// Type: Function
		/// Event type: wijexpanderbeforeexpand
		/// Code example:
		/// Supply a callback function to handle the beforeExpand event as an option.
		/// $("#expander").wijexpander({ beforeExpand: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderbeforeexpand.
		/// $( "#expander" ).bind( "wijexpanderbeforeexpand", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		beforeExpand(e)

		/// <summary>
		/// Occurs after the content area collapses.
		/// Event type: wijexpanderaftercollapse
		/// Code example:
		/// Supply a callback function to handle the afterCollapse event as an option.
		/// $("#expander").wijexpander({ afterCollapse: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderaftercollapse.
		/// $( "#expander" ).bind( "wijexpanderaftercollapse", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		afterCollapse(e)

		/// <summary>
		/// Occurs after the content area expands.
		/// Event type: wijexpanderafterexpand
		/// Code example:
		/// Supply a callback function to handle the afterExpand event as an option.
		/// $("#expander").wijexpander({ afterExpand: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderafterexpand.
		/// $( "#expander" ).bind( "wijexpanderafterexpand", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		afterExpand(e)
		*/


		// handle option changes:
		_setOption: function (key, value) {
			switch (key) {
				case "contentUrl":
					if (value) {
						this.element.find("> .ui-widget-content").wijContent(value);
					} else {
						this.element.find("> .ui-widget-content").html("");
					}
					break;
				case "disabled":
					if (value) {
						this.element.addClass("ui-state-disabled");
					} else {
						this.element.removeClass("ui-state-disabled");
					}
					break;
				case "expandDirection":
					this._onDirectionChange(value, true, this.options.expandDirection);
					break;
				case "expanded":
					if (value) {
						this.expand();
					} else {
						this.collapse();
					}
					// option value already stored inside expand/collapse method 
					// if action is not cancelled, so we need return here.
					return;
				default:
					break;
			}
			$.Widget.prototype._setOption.apply(this, arguments);

		},
		// widget creation:    
		_create: function () {
			var elems = this.element.children(), header, content;

			// do not call base c1headercontentcontrol _create method here since we don't 
			// want to place c1headercontentcontrol classes on the widget element
			this.element.addClass(
		"wijmo-wijexpander ui-expander ui-widget ui-helper-reset ui-expander-icons");
			header = $(elems[0]);
			content = $(elems[1]);
			if (this.options.expandDirection === "left" ||
			this.options.expandDirection === "top") {
				header.remove();
				header.insertAfter(content);
			}
			header.addClass("ui-expander-header ui-helper-reset");
			// ARIA
			header.attr("role", "tab");
			content.attr("role", "tabpanel");

			if (header.find("> a").length === 0) {
				header.wrapInner('<a href="#"></a>');
			}
			if (header.find("> .ui-icon").length === 0) {
				$('<span class="ui-icon"></span>').insertBefore($("> a", header)[0]);
			}
			content.addClass("ui-expander-content ui-helper-reset ui-widget-content");
		},
		// widget initialization:
		_init: function () {
			var o = this.options;
			this._onDirectionChange(o.expandDirection, false);
			if (o.contentUrl) {
				$(".ui-widget-content", this.element).wijContent(this.options.contentUrl);
			}
			if (!o.expanded) {
				this.element.find("> .ui-widget-content").hide();
				this.element.find("> .ui-expander-header")
				.addClass("ui-state-default ui-corner-all")
				.attr({
					"aria-expanded": "false",
					tabIndex: -1
				})
				.find("> .ui-icon").addClass(this._triangleIconClosed);
			} else {
				this.element.find("> .ui-expander-header")
				.addClass("ui-state-active")
				.attr({
					"aria-expanded": "true",
					tabIndex: 0
				})
				.addClass(this._headerCornerOpened)
				.find("> .ui-icon")
				.addClass(this._triangleIconOpened);
				this.element.find("> .ui-widget-content")
				.addClass("ui-expander-content-active")
				.addClass(this._contentCornerOpened);
			}
			if (o.disabled) {
				this.element.addClass("ui-state-disabled");
			}
			this._bindLiveEvents();
		},

		destroy: function () {
			this._unbindLiveEvents();
			this.element.removeClass(
		"wijmo-wijexpander ui-expander ui-widget ui-helper-reset ui-expander-icons");
			//.removeData('wijexpander');
			$.Widget.prototype.destroy.apply(this, arguments);

		},

		_bindLiveEvents: function () {
			$(".ui-expander-header", this.element[0]).live("click.wijexpander",
												jQuery.proxy(this._onHeaderClick, this))
		.live("mouseenter.wijexpander", function () {
			$(this).addClass('ui-state-hover');
		})
		.live("mouseleave.wijexpander", function () {
			$(this).removeClass('ui-state-hover');
		})
		.live("focus.wijexpander", function () {
			$(this).addClass('ui-state-focus');
		})
		.live("blur.wijexpander", function () {
			$(this).removeClass('ui-state-focus');
		});
		},
		_unbindLiveEvents: function () {
			$('.ui-expander-header', this.element[0]).die(".wijexpander");
		},

		_onDirectionChange: function (newDirection, allowDOMChange, prevDirection) {
			var rightToLeft, openedHeaders, openedContents, openedTriangles,
			closedTriangles, prevIsRightToLeft, content, header;
			if (prevDirection && prevDirection !== newDirection) {
				this.element.removeClass("ui-expander-" + prevDirection);
			}
			if (allowDOMChange) {
				openedHeaders = this.element.find(".ui-expander-header." +
												this._headerCornerOpened);
				openedHeaders.removeClass(this._headerCornerOpened);
				openedContents = this.element.find(".ui-widget-content." +
												this._contentCornerOpened);
				openedContents.removeClass(this._contentCornerOpened);
				openedTriangles = this.element.find("." + this._triangleIconOpened);
				closedTriangles = this.element.find("." + this._triangleIconClosed);
				openedTriangles.removeClass(this._triangleIconOpened);
				closedTriangles.removeClass(this._triangleIconClosed);
			}
			switch (newDirection) {
				case "top":
					this._headerCornerOpened = "ui-corner-bottom";
					this._contentCornerOpened = "ui-corner-top";
					this._triangleIconOpened = "ui-icon-triangle-1-n";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = true;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-top");
					break;
				case "right":
					this._headerCornerOpened = "ui-corner-left";
					this._contentCornerOpened = "ui-corner-right";
					this._triangleIconOpened = "ui-icon-triangle-1-e";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = false;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-right");
					break;
				case "left":
					this._headerCornerOpened = "ui-corner-right";
					this._contentCornerOpened = "ui-corner-left";
					this._triangleIconOpened = "ui-icon-triangle-1-w";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = true;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-left");
					break;
				default: //case "bottom":
					this._headerCornerOpened = "ui-corner-top";
					this._contentCornerOpened = "ui-corner-bottom";
					this._triangleIconOpened = "ui-icon-triangle-1-s";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = false;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-bottom");
					break;
			}
			prevIsRightToLeft = this.element.data("rightToLeft");
			this.element.data("rightToLeft", rightToLeft);

			if (allowDOMChange) {
				openedTriangles.addClass(this._triangleIconOpened);
				closedTriangles.addClass(this._triangleIconClosed);
				openedHeaders.addClass(this._headerCornerOpened);
				openedContents.addClass(this._contentCornerOpened);
			}

			if (allowDOMChange && rightToLeft !== prevIsRightToLeft) {
				this.element.children(".ui-expander-header").each(function () {
					header = $(this);
					if (rightToLeft) {
						content = header.next(".ui-expander-content");
						header.remove();
						header.insertAfter(content);
					} else {
						content = header.prev(".ui-expander-content");
						header.remove();
						header.insertBefore(content);
					}
				});
			}

		},

		/** public methods */

		/// <summary>
		/// Collapse content panel.
		/// Code Example: $("#element").wijexpander("collapse");
		///</summary>
		collapse: function () {
			var o = this.options, animOptions, animations, duration, easing;
			if (!o.allowExpand) {
				return;
			}
			if (this.element.hasClass("ui-state-disabled")) {
				return false;
			}

			if (!this._trigger("beforeCollapse")) {
				return false;
			}
			/*
			newEv = jQuery.Event("beforecollapse");
			this.element.trigger(newEv);
			if (newEv.isDefaultPrevented()) {
			return false;
			}*/
			if (o.animated) {
				animOptions = {
					expand: false,
					content: this.element.find("> .ui-widget-content"),
					complete: jQuery.proxy(function () {
						this.element.find("> .ui-widget-content")
						.removeClass("ui-expander-content-active");
						this._trigger("afterCollapse");
						this.element.find("> .ui-widget-content").css('display', '');

					}, this),
					horizontal: this.element.hasClass("ui-helper-horizontal")
				};

				animations = $.wijmo.wijexpander.animations;
				duration = o.duration;
				easing = o.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'slide';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](animOptions);
			} else {
				this.element.find("> .ui-widget-content").hide();
				this._trigger("afterCollapse");
			}
			this.element.find("> .ui-expander-header")
			.removeClass("ui-state-active")
			.removeClass(this._headerCornerOpened)
			.attr({
				"aria-expanded": "false",
				tabIndex: -1
			})
			.addClass("ui-state-default ui-corner-all")
			.find("> .ui-icon").removeClass(this._triangleIconOpened)
			.addClass(this._triangleIconClosed);
			this.options.expanded = false;
			return true;
		},
		/// <summary>
		/// Expand content panel.
		/// Code Example: $("#element").wijexpander("expand");
		///</summary>
		expand: function () {
			var o = this.options, animOptions, animations, duration, easing;
			if (!o.allowExpand) {
				return;
			}
			if (this.element.hasClass("ui-state-disabled")) {
				return false;
			}
			if (!this._trigger("beforeExpand")) {
				return false;
			}

			//this.element.addClass("ui-state-expanded");
			if (o.animated) {

				animOptions = {
					expand: true,
					content: this.element.find("> .ui-widget-content"),
					complete: jQuery.proxy(function () {
						this.element.find("> .ui-widget-content")
						.addClass("ui-expander-content-active")
						.addClass(this._contentCornerOpened);
						this._trigger("afterExpand");
						this.element.find("> .ui-widget-content").css('display', '');
					}, this),
					horizontal: this.element.hasClass("ui-helper-horizontal")
				};
				animations = $.wijmo.wijexpander.animations;
				duration = o.duration;
				easing = o.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'slide';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](animOptions);
			} else {
				this.element.find("> .ui-widget-content").show();
				this._trigger("afterExpand");
			}
			this.element.find("> .ui-expander-header")
			.removeClass("ui-state-default ui-corner-all")
			.addClass("ui-state-active").addClass(this._headerCornerOpened)
			.attr({
				"aria-expanded": "true",
				tabIndex: 0
			})
			.find("> .ui-icon").removeClass(this._triangleIconClosed)
			.addClass(this._triangleIconOpened);
			this.options.expanded = true;
			return true;

		},

		/** Private methods */
		_onHeaderClick: function () {
			this.option('expanded', !this.options.expanded);
			return false;
		}

	});


	$.extend($.wijmo.wijexpander, {
		animations: {
			slide: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 300
				}, options, additions);
				if (options.expand) {
					options.content.stop(true, true).animate(options.horizontal ?
						{ width: 'show', opacity: 'show'} :
						{ height: 'show', opacity: 'show' }, options);
				} else {
					options.content.stop(true, true).animate(options.horizontal ?
						{ width: 'hide', opacity: 'hide'} :
						{ height: 'hide', opacity: 'hide' }, options);
				}
			}
		}
	});
} (jQuery));
/*globals window,document,jQuery,clearTimeout,setTimeout*/

/*
*
* Wijmo Library 1.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
*
* Wijmo Menu widget.
*
* Depends:
*	jquery.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.wijmo.wijutil.js
*	jquery.ui.position.js
*	jquery.ui.effects.core.js
*	jquery.mousewheel.js
*	jquery.bgiframe.js
*	jquery.wijmo.wijsuperpanel.js
*
*/
(function ($) {
	"use strict";
	var menuitemCss = "wijmo-wijmenu-item";
	$.widget("wijmo.wijmenu", {
		options: {
			/// <summary>
			/// A jQuery selector which handles to open the menu or submenu.
			/// Default: "".
			/// Type: String.
			/// Remark:  If the trigger is set to a menu item(the <li> element),
			/// then the submenu appears when the item is clicked if the triggerEvent 
			/// is set to click. If the trigger is set to an element outside of the menu, 
			/// then the menu opens when the element is clicked if the triggerEvent is 
			/// set to click as a contextmenu.
			/// Code example: $(".selector").wijmenu("option", "trigger", "#selector")
			/// </summary>
			trigger: '',
			/// <summary>
			/// Specifies the event to show the menu.
			/// Default: "click".
			/// Type: String.
			/// Remark: The value can be seted to 'click', 'mouseenter', 'dbclick', 
			/// 'rtclick'
			/// Code example: $(".selector").wijmenu("option", "triggerEvent", "click")
			/// </summary>
			triggerEvent: 'click',
			/// <summary>
			/// Specifies the location and Orientation of the menu relative to the button
			/// or link used to open it. Configuration for the Position Utility,Of option
			/// is excluded, it is always configured by the widget.
			/// Collision also controls collision detection automatically too.
			/// Default: {}.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "position", 
			///		{my: "top right", at: "bottom left"});
			/// </summary>
			position: {},
			/// <summary>
			/// Sets the showAnimation and hideAnimation options 
			/// if they are not specified individually.
			/// Default: { animated: "slide", option: null, 
			///		duration: 400, easing: null }.
			/// Type: Object.
			/// Remark: This option uses the standard animation setting syntax 
			/// from jQuery.UI.
			/// Code example: $(".selector").wijmenu("option", "animation", {
			///		animated: "slide", 
			///		option: { direction: "right" }, 
			///		duration: 400, 
			///		easing: null})
			/// </summary>
			animation: { animated: "slide", duration: 400, easing: null },
			/// <summary>
			/// Determine the animation used to show submenus.
			/// Default: {}.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "showAnimation", {
			///		animated: "slide", 
			///		option: { direction: "right" }, 
			///		duration: 400, 
			///		easing: null})
			/// </summary>
			showAnimation: {},
			/// <summary>
			/// Determine the animation used to hide submenus.
			/// Default: { animated: "fade", duration: 400, easing: null }.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "hideAnimation", {
			///		animated: "slide", 
			///		option: { direction: "right" }, 
			///		duration: 400, 
			///		easing: null})
			/// </summary>
			hideAnimation: { animated: "fade", duration: 400, easing: null },
			/// <summary>
			/// This option determines how many milliseconds to delay 
			/// before showing the submenu in a fly-out menu.
			/// Default: 400
			/// Type: Number
			/// Code example: $(".selector").wijmenu("option", "showDelay", 1000);
			/// </summary>
			showDelay: 400,
			/// <summary>
			/// This option determines how many milliseconds to delay 
			/// before hiding the submenu in a fly-out menu.
			/// Default: 400
			/// Type: Number
			/// Code exapmle: $(".selector").wijmenu("option", "hideDelay", 1000).
			/// </summary>
			hideDelay: 400,
			/// <summary>
			/// Determine the animation used to slide submenu in sliding mode.
			/// Default: { duration: 400, easing: null }.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "slidingAnimation", {
			///		duration: 1000
			///	})
			/// </summary>
			slidingAnimation: { duration: 400, easing: null },
			/// <summary>
			/// Defines the behavior of the submenu whether it is a popup menu or 
			/// an iPod-style navigation list.
			/// Default:"flyout".
			/// Type:String.
			/// Remarks: Possible values are "flyout" or "sliding".
			/// Code example: $(".selector").wijmenu("option", "mode", "sliding")
			/// </summary>
			mode: 'flyout',
			/// <summary>
			/// This option specifies a hash value that sets to superpanel options 
			/// when a superpanel is created.
			/// Default: null.
			/// Type: Object.
			/// Code example: $(".selector").wijmenu("option", "superPanelOptions", {})
			/// </summary>
			superPanelOptions: null,
			/// <summary>
			/// Defines whether the item can be checked.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $(".selector").wijmenu("option","chackable", true).
			/// </summary>
			checkable: false,
			/// <summary>
			/// Controls the root menu's orientation. All submenus are vertical 
			/// regardless of the orientation of the root menu.
			/// Default: "horizontal".
			/// Type: String.
			/// Remark: The value should be "horizontal" or "vertical".
			/// Code example: $(".selector").wijmenu("option", "orientation", "vertical")
			/// </summary>
			orientation: 'horizontal',
			/// <summary>
			/// Determines the iPod-style menu's maximum height.
			/// Default: 200.
			/// Type: Number.
			/// Remark: This option can only be used in an iPod style menu.
			/// When the menu's heiget is largger than this value,
			/// the menu shows a scroll bar.
			/// Code example: $(".selector").wijmenu("option", "maxHeight", 300)
			/// </summary>
			maxHeight: 200,
			/// <summary>
			/// Determines whether the iPod menu shows a back link or a breadcrumb header
			/// in the menu.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $(".selector").wijmenu("option", "backLink", false)
			/// </summary>
			backLink: true,
			/// <summary>
			/// Sets the text of the back link.
			/// Default: "Back".
			/// Type: String.
			/// Code example: $(".selector").wijmenu("option", "backLinkText", "Previous")
			/// </summary>
			backLinkText: 'Back',
			/// <summary>
			/// Sets the text of the top link.
			/// Default: "All".
			/// Type: String.
			/// Code example: $(".selector").wijmenu("option", "topLinkText", "Root")
			/// </summary>
			topLinkText: 'All',
			/// <summary>
			/// Sets the top breadcrumb's default text.
			/// Default: "Choose an option".
			/// Type: String.
			/// Code example: $(".selector").wijmenu("option", "crumbDefaultText", 
			/// "Choose")
			/// </summary>
			crumbDefaultText: 'Choose an option',
			/// <summary>
			/// Triggered when a menu item is selected.
			/// Default: null
			/// Type: Function
			/// code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("select", function(e, data){})
			/// Bind to the event by type: wijmenuselect
			/// $(".selector").bind("wijmenuselect", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="EventObj">jQuery.Event object.</param>
			/// <param name="data" type="Object">data.item is the avtive 
			/// item of the menu.</param>
			select: null,
			/// <summary>
			/// Triggered when a menu item gets the foucs, either when the mouse is
			/// used to hover over it (on hover) or when the cursor keys are used
			/// on the keyboard(navigation width cursor key) focus.
			/// Default: null.
			/// Type: Function
			/// Code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("focus", function(e, data) {})
			/// Bind to the event by type: wijmenufocus
			/// $(".selector").bind("wijmenufocus", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">jQuery.Event object</param>
			/// <param name="data" type="Object">data.item is the item 
			/// which is focused.</param>
			focus: null,
			/// <summary>
			/// Triggered when a menu item loses focus.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("blur", function(e, data){})
			/// Bind to the event by type: wijmenublur
			/// $(".selector").bind("wijmenublur", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="data" type="Object">data.item is the a menu item
			/// which loses focus.</param>
			blur: null,
			/// <summary>
			/// Triggered before showing the submenu.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $("#selector").wijmenu("showing", function(e, sublist){})
			/// Bind to the event by type: wijmenushowing
			/// $(".selector").bind("wijmenushowing", function(e, sublist) { } );
			/// </summary>
			/// <param name="e" type="Object">the event object relates to the 
			/// submenu's parent item.</param>
			/// <param name="sublist" type="Element">the submenu element.</param>
			showing: null
		},

		_preventEvent: function (event) {
			event.preventDefault();
			event.stopImmediatePropagation();
		},

		_create: function () {
			// Before crete menu items,hide the menu. To avoid show wild uls
			// in the page before init the menu.
			var self = this,
				o = self.options,
				orientation = o.orientation,
				mode = o.mode,
				ul, li, ele = self.element, sublist, breadcrumb,
				keycode = $.ui.keyCode;

			//fix for issus 2051 by Chandler.Zheng on 2012/03/19
			self.clickNameSpace = "click.wijmenudoc" + self._newId();
			//end comment

			ele.hide();
			self.cssPre = "wijmo-wijmenu";
			self.nowIndex = 9999;
			self.activeItem = null;
			self.refresh();
			ele.attr("tabIndex", 0);
			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option
			ele.bind("keydown.wijmenu", function (event) {
				if (o.disabled) {
					return;
				}
				var activeItem = self.activeItem, isRoot, link;
				if (activeItem) {
					isRoot = self._isRoot(activeItem.parent());
				}
				else {
					isRoot = true;
				}
				switch (event.keyCode) {
				case keycode.PAGE_UP:
					self.previousPage(event);
					self._preventEvent(event);
					break;
				case keycode.PAGE_DOWN:
					self.nextPage(event);
					self._preventEvent(event);
					break;
				case keycode.UP:
					if (orientation === "vertical" || mode === "sliding" || !isRoot) {
						self.previous(event);
						self._preventEvent(event);
					}
					break;
				case keycode.DOWN:
					if (orientation === "vertical" || mode === "sliding" || !isRoot) {
						self.next(event);
						self._preventEvent(event);
					}
					else {
						if (activeItem) {
							if (mode === "flyout" && activeItem.has("ul").length > 0) {
								sublist = activeItem.find("ul:first");
								if (sublist.is(":hidden")) {
									self._showFlyoutSubmenu(event, activeItem, sublist);
									self.activate(event, sublist
					.children(".wijmo-wijmenu-item:first"));
								}
							}
						}
					}
					break;
				case keycode.RIGHT:
					if (orientation === "horizontal" && isRoot && mode === "flyout") {
						self.next(event);
						self._preventEvent(event);
					}
					else {
						if (activeItem) {
							if (mode === "flyout" && activeItem.has("ul").length > 0) {
								sublist = activeItem.find("ul:first");
								if (sublist.is(":hidden")) {
									self._showFlyoutSubmenu(event, activeItem, sublist);
									self.activate(event, sublist
					.children(".wijmo-wijmenu-item:first"));
								}
							}
							else if (mode === "sliding") {
								sublist = activeItem.find("ul:first");
								if (sublist.length > 0) {
									activeItem.children(":first").trigger("click");
									self.activate(event, sublist
					.children(".wijmo-wijmenu-item:first"));
								}
							}
						}
					}
					break;
				case keycode.LEFT:
					if (orientation === "horizontal" && isRoot && mode === "flyout") {
						self.previous(event);
						self._preventEvent(event);
					}
					else {
						ul = activeItem.parent();
						li = ul.parent();
						if (mode === "flyout") {
							if (li.is("li")) {
								self._hideCurrentSubmenu(li);
								self.activate(event, li);
							}
						}
						else {
							if (o.backLink && self._backLink &&
				self._backLink.is(":visible")) {
								self._backLink.trigger("click");
								self.activate(event, li);
							}
							breadcrumb = $(".wijmo-wijmenu-breadcrumb",
				self.domObject.menucontainer).find("li a");
							if (breadcrumb.length > 0) {
								breadcrumb.eq(breadcrumb.length - 2).trigger("click");
								self.activate(event, li);
								ele.focus();
							}
						}
					}
					break;
				case keycode.ENTER:
					if (!activeItem) {
						return;
					}
					if (mode === "flyout") {
						link = activeItem.children(":first");
						link.focus();
						link.trigger("click");
					}
					else {
						self.select();
						self._preventEvent(event);
					}
					break;
				}
			});
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			ele = outerEle ? outerEle : self.element,
			eleOffset = ele.offset(),
			disabledWidth = ele.outerWidth(),
			disabledHeight = ele.outerHeight();

			return $("<div></div>")
				.addClass("ui-disabled")
				.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},

		_isRoot: function (obj) {
			return this.rootMenu.get(0) === obj.get(0);
		},

		_destroy: function () {
			var self = this,
				o = self.options;

			self[o.mode === "flyout" ? "_killFlyout" : "_killDrilldown"]();
			self._killmenuItems();
			self._killtrigger();
			if (self.element.is("ul")) {
				self.element.unwrap().unwrap();
			}
			else {
				self.element.unwrap();
			}
			self.element.removeData("domObject").removeData("topmenu")
			.removeData("firstLeftValue");
		},

		destroy: function () {
			/// <summary>
			/// Removes the wijmenu functionality completely.
			/// This returns the element back to its pre-init state.
			/// </summary>
			var self = this;
			this._destroy();
			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option
			$.Widget.prototype.destroy.apply(this);
		},

		activate: function (event, item) {
			/// <summary>Actives an menu item by deactivating the current item,
			/// scrolling the new one into view, if necessary,making it the active item,
			/// and triggering a focus event.
			/// </summary>
			/// <param name="event" type="Event">The javascript event.</param>
			/// <param name="item" type="jQuery object">a menu item to active</param>
			var self = this,
				scrollContainer = self.domObject.scrollcontainer,
				active = item.eq(0);

			if (self.activeItem && self.activeItem.get(0) === active.get(0)) {
				return;
			}

			self.deactivate(event);
			self._trigger("focus", event, { item: item });
			if (self.options.mode === "sliding") {
				scrollContainer.wijsuperpanel("scrollChildIntoView", item);
			}
			active.children(":first")
			.addClass("ui-state-focus")
			//.attr("id", "ui-active-menuitem")
			.end();

			self.element.removeAttr("aria-activedescendant");
			self.element.attr("aria-activedescendant", active.attr("id"));
			self.activeItem = active;

		},

		deactivate: function (event) {
			/// <summary>Clears the current selection.This method is useful when reopening
			/// a menu which previously had an item selected.
			/// </summary>
			/// <param name="event" type="Event">The javascript event.  </param>
			var self = this,
				active = self.activeItem;

			if (!active) {
				return;
			}
			active.children(":first")
			.removeClass("ui-state-focus")
			.removeAttr("id");
			self._trigger("blur");
			self.activeItem = null;
		},

		next: function (event) {
			/// <summary>Selects the next item based on the active one. Selects the first
			/// item if none is active or if the last one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("next", "." + menuitemCss + ":first", event);
		},

		previous: function (event) {
			/// <summary>Selects the previous item based on the active one. Selects the 
			///last item if none is active or if the first one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("prev", "." + menuitemCss + ":last", event);
		},

		first: function () {
			/// <summary>Determines whether the active item is the first
			/// menu item</summary>
			/// <returns type="Boolean" />
			var active = this.activeItem;
			return active && !active.prevAll("." + menuitemCss).length;
		},

		last: function () {
			/// <summary>Determines whether the active item is the 
			///last menu item</summary>
			/// <returns type="Boolean" />
			var active = this.activeItem;
			return active && !active.nextAll("." + menuitemCss).length;
		},

		nextPage: function (event) {
			/// <summary>This method is similar to the "next" method,
			///but it jumps a whole page to the next page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this,
				activeItem = self.activeItem,
				parent, base, height, result;

			if (activeItem) {
				parent = activeItem.parent();
			}
			else {
				parent = self.rootMenu;
				activeItem = self.rootMenu.children(":first");
			}

			if (self.options.mode === "sliding" && self._hasScroll()) {
				if (!activeItem || self.last()) {
					self.activate(event, parent.children(":first"));
					return;
				}
				base = activeItem.offset().top;
				height = self.options.maxHeight;
				result = parent.children("li").filter(function () {
					var node = $(this),
					close = height - (node.offset().top - base + node.height()),
					lineheight = node.height();
					return close < lineheight && close > -lineheight;
				});

				if (!result.length) {
					result = parent.children(":last");
				}
				self.activate(event, result.last());
			} else {
				self.activate(event, parent
				.children(!activeItem || self.last() ? ":first" : ":last"));
			}
		},

		previousPage: function (event) {
			/// <summary>This method is silimlar to the "previous" method,
			///but it jumps a whole page to the previous page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this,
				activeItem = self.activeItem,
				parent, base, height, result;

			if (activeItem) {
				parent = activeItem.parent();
			}
			else {
				parent = self.rootMenu;
				activeItem = self.rootMenu.children(":first");
			}

			if (self.options.mode === "sliding" && self._hasScroll()) {
				if (!activeItem || self.first()) {
					self.activate(event, parent.children(":last"));
					return;
				}
				base = activeItem.offset().top;
				height = self.options.maxHeight;
				result = parent.children("li").filter(function () {
					var node = $(this),
					close = node.offset().top - base + height - node.height(),
					lineheight = node.height();
					return close < lineheight && close > -lineheight;
				});
				if (!result.length) {
					result = parent.children(":first");
				}
				self.activate(event, result.first());
			} else {
				self.activate(event, parent
				.children(!activeItem || self.first() ? ":last" : ":first"));
			}
		},

		select: function (event) {
			/// <summary>Selects the active item,triggering the select event for that
			///item. This event is useful for custom keyboard handling.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this;
			self._trigger("select", event, { item: self.activeItem });
			self._setCheckable();
		},

		setItemDisabled: function (selector, disabled) {
			/// <summary>Disables a menu item. </summary>
			/// <param name="selector" type="jQuery selector">
			///		Indicates the item to be disabled.</param>
			/// <param name="disabled" type="Boolean">
			///		If the value is true, the item is disabled; 
			///		Otherwise, the item is enabled.
			/// </param>
			var items = $(selector, this.element);
			items.find(".wijmo-wijmenu-item>a").attr("disabled", disabled);
			items.find(">a").toggleClass("ui-state-disabled", disabled);
		},

		_setCheckable: function () {
			if (this.options.checkable) {
				this.activeItem.children(":first").toggleClass("ui-state-active");
			}
		},

		///set options
		_setOption: function (key, value) {
			var self = this;

			//$.Widget.prototype._setOption.apply(self, arguments);

			if (this["_set_" + key]) {
				this["_set_" + key](value);
			}
			this.options[key] = value;

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.domObject.menucontainer);
			}
			//end for disabled option
		},

		_set_mode: function (value) {
			this._destroy();
			this.options.mode = value;
			this.refresh();
		},

		_set_orientation: function (value) {
			var self = this,
				menuContainer = self.domObject.menucontainer;

			menuContainer
			.removeClass(self.cssPre + "-vertical " + self.cssPre + "-horizontal");
			if (self.options.mode === "flyout") {
				menuContainer.addClass(self.cssPre + "-" + value);
				$(">li:has(ul)", self.rootMenu).each(function () {
					var cssPre = "ui-icon-triangle-1-",
					oldCss = value === "horizontal" ? "e" : "s",
					newCss = value === "horizontal" ? "s" : "e";
					$(">.wijmo-wijmenu-link", this).find("." + cssPre + oldCss)
					.removeClass(cssPre + oldCss + " " + cssPre + newCss)
					.addClass(cssPre + newCss);
				});
			}
			else {
				menuContainer
				.addClass(self.cssPre + "-vertical");
			}
		},

		_getTriggerEle: function () {
			return $(this.options.trigger).filter(function () {
				return $(this).closest(".wijmo-wijmenu").length === 0;
			});
		},

		_set_triggerEvent: function (value) {
			var self = this,
				o = self.options,
				triggerEle = self._getTriggerEle();

			self._killtrigger();
			o.triggerEvent = value;
			if (triggerEle.length > 0) {
				self._initTrigger(triggerEle);
			}
			if (o.mode === "flyout") {
				self._killFlyout();
				self._flyout();
			}
		},

		_set_trigger: function (value) {
			var self = this,
				o = self.options,
				triggerEle = self._getTriggerEle();

			self._killtrigger();
			o.trigger = value;
			if (triggerEle.length > 0) {
				self._initTrigger(triggerEle);
			}
			if (o.mode === "flyout") {
				self._killFlyout();
				self._flyout();
			}
		},

		_initTrigger: function (triggerEle) {
			var o = this.options,
				event = o.triggerEvent,
				self = this,
				menuContainer = self.domObject.menucontainer,
				namespace = ".wijmenu";

			if (triggerEle.is("iframe")) {
				triggerEle = $(triggerEle.get(0).contentWindow.document);
			}
			switch (event) {
			case "click":
				triggerEle.bind(event + namespace, function (e) {
					if (o.mode !== "popup") {
						self._displaySubmenu(e, triggerEle, menuContainer);
					}
				});
				break;
			case "mouseenter":
				triggerEle.bind(event + namespace, function (e) {
					self._displaySubmenu(e, triggerEle, menuContainer);
				});
				break;
			case "dblclick":
				triggerEle.bind(event + namespace, function (e) {
					self._displaySubmenu(e, triggerEle, menuContainer);
				});
				break;
			case "rtclick":
				triggerEle.bind("contextmenu" + namespace, function (e) {
					menuContainer.hide();
					self._displaySubmenu(e, triggerEle, menuContainer);
					e.preventDefault();
				});
				break;
			}

		},

		_killtrigger: function () {
			var o = this.options, triggerEle;

			if (o.trigger !== "") {
				triggerEle = $(o.trigger);
				if (triggerEle.is("iframe")) {
					triggerEle = $(triggerEle.get(0).contentWindow.document);
				}
				if (triggerEle && triggerEle.length > 0) {
					triggerEle.unbind(".wijmenu");
					//$(document).unbind(self.clickNameSpace);
				}
			}
		},

		_move: function (direction, edge, event) {
			var active = this.activeItem, next, parent;

			if (!active) {
				this.activate(event, this.rootMenu.children(edge));
				return;
			}
			next = $(active)[direction + "All"]("." + menuitemCss).eq(0);
			parent = active.parent();
			if (next.length) {
				this.activate(event, next);
			} else {
				this.activate(event, parent.children(edge));
			}
		},

		refresh: function () {
			/// <summary>Renders all non-menu-items as menuitems,called once by _create.
			/// Call this method whenever adding or replaceing items in the menu via DOM
			/// operations,for example,via menu.append
			/// ("<li><a href='#'>new item</a></li>").wijmenu("refresh")</summary>
			var self = this,
				ele = self.element,
				menuCss = "wijmo-wijmenu",
				o = self.options,
				scrollcontainer, menucontainer, domObject, triggerEle, breadcrumb,
				seperatorCss = menuCss + "-separator ui-state-default ui-corner-all",
				headerCss = "ui-widget-header ui-corner-all",
				menuItemCss = "ui-widget " + menuitemCss +
							" ui-state-default ui-corner-all",
				menuLinkCss = menuCss + "-link ui-corner-all";

			if (self.domObject) {
				self._destroy();
			}
			if (ele.is("ul")) {
				self.rootMenu = ele;
				scrollcontainer = ele.wrap("<div></div>").parent();
				menucontainer = scrollcontainer.wrap("<div></div>").parent();
			}
			else if (ele.is("div")) {
				self.rootMenu = $("ul:first", ele);
				scrollcontainer = ele;
				menucontainer = ele.wrap("<div></div>").parent();
			}


			scrollcontainer.addClass("scrollcontainer checkablesupport");
			menucontainer.addClass("ui-widget ui-widget-header " + menuCss +
				" ui-corner-all ui-helper-clearfix")
			.attr("aria-activedescendant", "ui-active-menuitem");
			if (o.orientation === "horizontal" && o.mode === "flyout") {
				menucontainer.addClass(menuCss + "-" + o.orientation);
			}
			domObject = { scrollcontainer: scrollcontainer,
				menucontainer: menucontainer
			};
			self.domObject = domObject;
			self.rootMenu.data("topmenu", true);
			if (!self.rootMenu.hasClass(menuCss + "-list ui-helper-reset")) {
				self.rootMenu.addClass(menuCss + "-list ui-helper-reset");
			}
			$("li", self.rootMenu).each(function (i, n) {
				//var isFirstLevel = $(n).parent().parent().parent().is(".wijmo-wijmenu");
				var hasSubmenu = $(">ul:first", n).length > 0,
					li = $(n),
					icon, link = $(">:first", li);

				if (link.length === 0) {
					li.addClass(seperatorCss);
				}
				else {
					li.attr("role", "menuitem");					
					if (link.is("a")) {
						link.bind("mouseenter.wijmenuitem", function () {
							var itemDisabled = link.hasClass("ui-state-disabled");
							if (o.disabled || itemDisabled) {
								return;
							}
							$(this).addClass("ui-state-hover");
						}).bind("mouseleave.wijmenuitem", function () {
							var itemDisabled = link.hasClass("ui-state-disabled");
							if (o.disabled || itemDisabled) {
								return;
							}
							$(this).removeClass("ui-state-hover");
							if ($(this).data("subMenuOpened")) {
								$(this).addClass("ui-state-active");
							}
						});
						if (!li.hasClass(menuitemCss)) {
							li.addClass(menuItemCss);
							link.addClass(menuLinkCss);
							link.wrapInner("<span>").children("span")
							.addClass(menuCss + "-text");
							if (hasSubmenu) {
								icon = $("<span>")
								.addClass("ui-icon ui-icon-triangle-1-e");
								link.append(icon);
							}
						}
					}
					else if (link.is("h1,h2,h3,h4,h5")) {
						li.addClass(headerCss);
					}
					else {
						li.addClass(menuItemCss);
//						link.addClass(menuLinkCss);
						if (hasSubmenu) {
							if (!link.is(":input")) {
								icon = $("<span>")
									.addClass("ui-icon ui-icon-triangle-1-e");
								link.append(icon);
							}
						}
					}
				}
			});
			ele.show();
			$("ul", self.rootMenu).each(function () {
				$(this).addClass(menuCss + "-list ui-widget-content ui-corner-all " +
					"ui-helper-clearfix " + menuCss + "-child ui-helper-reset");
				$(this).hide();
			});
			this[o.mode === "flyout" ? "_flyout" : "_drilldown"]();
			if (o.trigger !== "") {
				triggerEle = self._getTriggerEle();
				if (triggerEle.length > 0) {
					menucontainer.hide();
					self._initTrigger(triggerEle);
				}
			}
			$(document).bind(self.clickNameSpace, function (e) {
				///fixed when click the breadcrumb choose item link to show
				/// the root menu in sliding menu.
				if ($(e.target).parent().is(".wijmo-wijmenu-all-lists")) {
					return;
				}

				// fix tfs issue 20650  by Chandler.Zheng on 2012-03-19
				if ($(e.target).closest(o.trigger).is(o.trigger)) {
					return;
				}
				//end comments

				var obj = $(e.target).closest(".wijmo-wijmenu");
				if (obj.length === 0) {
					if (o.mode === "sliding") {
						breadcrumb = $(".wijmo-wijmenu-breadcrumb", menucontainer);
						// fixed a bug, when the trigger is not seted. 
						// when click the document, trigger this method!
						if (o.trigger === "") {
							return;
						}
						self._resetDrilldownMenu(breadcrumb);
					}
					else if (o.mode === "flyout" && o.triggerEvent !== "mouseenter") {
						self._hideAllMenus();
						return;
					}

					if (triggerEle && triggerEle.length > 0) {
						self._hideSubmenu(menucontainer);
					}
				}
			});
		},

		_showFlyoutSubmenu: function (e, li, subList) {
			var self = this,
				curList = self.currentMenuList, i;

			if (curList !== undefined) {
				for (i = curList.length; i > 0; i--) {
					if (curList[i - 1].get(0) === li.parent().get(0)) {
						break;
					}
					else {
						self._hideSubmenu(curList[i - 1]);
					}
				}
			}
			self._displaySubmenu(e, li.find('.wijmo-wijmenu-link:eq(0)'), subList);
		},

		_getItemTriggerEvent: function (item) {
			var self = this,
				o = self.options,
				triggerEvent = "default", triggerEle;

			if (o.trigger !== "") {
				if (item.is(o.trigger) || self.element.is(o.trigger)) {
					triggerEvent = o.triggerEvent;
				}
				else {
					item.parents(".wijmo-wijmenu-parent").each(function (i, n) {
						if ($(n).is(o.trigger)) {
							triggerEvent = o.triggerEvent;
							return false;
						}
					});
					if (triggerEvent === "default") {
						triggerEle = self._getTriggerEle();
						if (triggerEle.length > 0) {
							triggerEvent = o.triggerEvent;
						}
					}
				}
			}
			item.data("triggerEvent", triggerEvent);
			return triggerEvent;
		},

		_flyout: function () {
			var self = this,
				container = self.domObject.menucontainer,
				o = self.options,
				linkCss = "wijmo-wijmenu-link",
				eastIconCss = "ui-icon-triangle-1-e",
				southIconCss = "ui-icon-triangle-1-s",
				parentItemCss = "wijmo-wijmenu-parent", itemDisabled;

			container.attr("role", "menu");
			if (o.orientation === "horizontal") {
				container.attr("role", "menubar");
				self.rootMenu.children("li:has(ul)").each(function () {
					$(this).children("." + linkCss).find("." + eastIconCss)
					.removeClass(eastIconCss).addClass(southIconCss);
				});
			}
			container.find('li:has(ul)').each(function () {
				var nameSpace = ".wijmenu",
					li = $(this).attr("aria-haspopup", true), showTimer, hideTimer,
					triggerEvent = self._getItemTriggerEvent(li), link, subList;

				li.children("ul")
				//.attr("role", "menu")
				//.attr("aria-activedescendant", "ui-active-menuitem")
				.bind("mouseleave." + nameSpace, function () {
					if (o.disabled) {
						return;
					}
					var subel = $(this).parent();
					hideTimer = setTimeout(function () {
						self._hideCurrentSubmenu(subel);
					}, o.hideDelay);
				});
				if (triggerEvent !== "default" &&
				o.triggerEvent !== "mouseenter") {
					li.removeClass(parentItemCss)
					.addClass(parentItemCss);
					link = $(this).find("." + linkCss + ":eq(0)");
					subList = link.next();

					switch (o.triggerEvent) {
					case "click":
						link.bind("click" + nameSpace, function (e) {
							if (o.disabled || $(this).hasClass("ui-state-disabled")) {
								return;
							}
							self._showFlyoutSubmenu(e, li, subList);
						});
						break;
					case "dblclick":
						link.bind("dblclick" + nameSpace, function (e) {
							if (o.disabled || $(this).hasClass("ui-state-disabled")) {
								return;
							}
							self._showFlyoutSubmenu(e, li, subList);
						});
						break;
					case "rtclick":
						link.bind("contextmenu" + nameSpace, function (e) {
							if (o.disabled || $(this).hasClass("ui-state-disabled")) {
								return;
							}
							self._showFlyoutSubmenu(e, li, subList);
							e.preventDefault();
						});
						break;
					}
					subList.data("notClose", true);
				}
				else {
					li.removeClass(parentItemCss)
					.addClass(parentItemCss);
					link = $(this).find("." + linkCss + ":eq(0)");
					link.bind("mouseenter.wijmenu",
					function (e) {
						if (o.disabled || $(this).hasClass("ui-state-disabled")) {
							return;
						}
						clearTimeout(hideTimer);
						var subList = $(this).next(),
							link = $(this);

						showTimer = setTimeout(function () {
							self._displaySubmenu(e, link, subList);
						}, o.showDelay);
					}).bind("mouseleave" + nameSpace,
					function () {
						if (o.disabled || $(this).hasClass("ui-state-disabled")) {
							return;
						}
						clearTimeout(showTimer);
						var subList = $(this).next();
						//In slide effects, before animation, 
						//it wraped a div to the ul element.
						if (!subList.is("ul")) {
							subList = subList.children("ul:first");
						}
						hideTimer = setTimeout(function () {
							self._hideSubmenu(subList);
						}, o.hideDelay);
					});


					$(this).find("ul ." + linkCss + ",ul >.ui-widget-header,ul " +
						'>.wijmo-wijmenu-separator').bind("mouseenter" + nameSpace,
					function (e) {
						if (o.disabled) {
							return;
						}
						clearTimeout(hideTimer);
					});
				}
			});


			///when click the menu item hide the submenus.
			container.find("." + linkCss).bind("click.wijmenu", function (e) {
				itemDisabled = $(this).hasClass("ui-state-disabled");
				if (o.disabled || itemDisabled) {
					return;
				}
				if ($(this).is("a")) {
					if ($(this).parent().find("ul").length === 0) {
						self._hideAllMenus();
					}
					else if (!(o.trigger !== "" &&
					$(this).parent().data("triggerEvent") !== "default" &&
					 o.triggerEvent !== "mouseenter")) {
						self._hideAllMenus();
					}
					else {
						var curList = self.currentMenuList, item, j;
						if (curList !== undefined) {
							item = $(this).parent();
							if (item.has("ul").length === 0) {
								for (j = curList.length; j > 0; j--) {
									if (curList[j - 1].get(0) === item.parent().get(0)) {
										break;
									}
									else {
										self._hideSubmenu(curList[j - 1]);
									}
								}
							}
						}
					}
					self.activate(e, $(this).parent());
				}
				self.select(e);
				//self.focus();
				if ($(this).attr("href") === "#") {
					e.preventDefault();
				}
			})
			.bind("focusin", function (e) {
				console.log('aa');
				itemDisabled = $(this).hasClass("ui-state-disabled");
				if (o.disabled || itemDisabled) {
					return;
				}
				if ($(this).is("a")) {
					self.activate(e, $(this).parent());
				}
			});
		},

		_hideAllMenus: function () {
			var self = this, container, outerTrigger, i, ul,
				ele = self.rootMenu;

			ul = ele.find("ul");
			for (i = ul.length - 1; i >= 0; i--) {
				self._hideSubmenu($(ul[i]));
			}
			if (self.options.trigger !== "") {
				container = self.domObject.menucontainer;
				if (container.is(":animated")) {
					return;
				}
				// if the trigger is outer of the menu, 
				//when hide all menus hide the root menu.
				outerTrigger = self._getTriggerEle();
				if (outerTrigger.length === 0) {
					return;
				}
				self._hideSubmenu(self.domObject.menucontainer);
			}
		},

		hideAllMenus: function () {
			this._hideAllMenus();
		},

		_killFlyout: function () {
			var container = this.domObject.menucontainer.attr("role", "");

			container.find("li").each(function () {
				$(this).removeClass("wijmo-wijmenu-parent").unbind(".wijmenu")
				.children(":first").unbind(".wijmenu").attr("aria-haspopup", "");
			});
		},

		_killmenuItems: function () {
			var self = this,
                ele = self.rootMenu;
			ele.removeClass("wijmo-wijmenu-list ui-helper-reset " +
				"wijmo-wijmenu-content ui-helper-clearfix");
			ele.find("li").each(function () {
				var item = $(this), link;
				item.removeClass("ui-widget " + menuitemCss + " ui-state-default " +
				"ui-corner-all wijmo-wijmenu-parent ui-widget-header " +
				"wijmo-wijmenu-separator");
				link = item.children(".wijmo-wijmenu-link");
				link.removeClass("wijmo-wijmenu-link ui-corner-all ui-state-focus " +
				"ui-state-hover ui-state-active")
				.html(link.children(".wijmo-wijmenu-text").html())
				.unbind(".wijmenu .wijmenuitem");
				item.children("ul").removeClass("wijmo-wijmenu-list ui-widget-content" +
				" ui-corner-all ui-helper-clearfix wijmo-wijmenu-child ui-helper-reset")
				.attr("role", "").attr("aria-activedescendant", "")
				.show().css({ left: "", top: "", position: "" }).attr("hidden", "");
			});
			this.domObject.menucontainer.removeClass("");
			$(document).unbind(self.clickNameSpace);
		},

		_sroll: function () {
			var scroll = this.domObject.scrollcontainer,
				options = this.options.superPanelOptions || {};

			scroll.height(this.options.maxHeight);
			scroll.wijsuperpanel(options);
		},

		_hasScroll: function () {
			var scroll = this.domObject.scrollcontainer;
			return scroll.data("wijsuperpanel").vNeedScrollBar;
		},


		_resetDrillChildMenu: function (el) {
			el.removeClass("wijmo-wijmenu-scroll wijmo-wijmenu-current").height("auto");
		},

		_checkDrillMenuHeight: function (el, mycontainer, scrollcontainer) {
			var self = this,
				fixPadding = 5;

			mycontainer.height(el.height());
			scrollcontainer.wijsuperpanel("option", "hScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("option", "vScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("paintPanel");
			if (self._hasScroll()) {
				if (el.prev().length > 0) {
					fixPadding = el.prev().css("padding-left").replace(/px/g, "");
				}
				el.width(scrollcontainer.find(".wijmo-wijsuperpanel-contentwrapper" +
					":first").width() - fixPadding);
			}
		},

		_resetDrilldownMenu: function (breadcrumb) {
			var self = this,
				o = self.options,
				ele = self.rootMenu,
				container = self.domObject.menucontainer,
				crumbDefaultHeader = $('<li class="wijmo-wijmenu-breadcrumb-text">' +
					o.crumbDefaultText + '</li>'),
				mycontainer = ele.parent();

			$('.wijmo-wijmenu-current', container).removeClass('wijmo-wijmenu-current');
			ele.animate({ left: 0 }, o.showDuration, function () {
				$(this).find('ul').each(function () {
					$(this).hide();
					self._resetDrillChildMenu($(this));
				});
				ele.addClass('wijmo-wijmenu-current');
			});
			$('.wijmo-wijmenu-all-lists', container).find('span').remove();
			breadcrumb.empty().append(crumbDefaultHeader);
			$('.wijmo-wijmenu-footer', container).empty().hide();
			self._checkDrillMenuHeight(ele, mycontainer, self.domObject.scrollcontainer);
		},

		_drilldown: function () {
			var self = this,
				ele = self.rootMenu,
				mycontainer = ele.wrap("<div>").parent().css("position", "relative"),
				container = self.domObject.menucontainer.attr("role", "menu"),
				scrollcontainer = self.domObject.scrollcontainer,
				o = self.options, fixPadding, itemDisabled,
				breadcrumb = $('<ul class="wijmo-wijmenu-breadcrumb ui-state-default' +
					' ui-corner-all ui-helper-clearfix"></ul>'),
				crumbDefaultHeader = $('<li class="wijmo-wijmenu-breadcrumb-text">' +
				o.crumbDefaultText + '</li>'),
				firstCrumbText = (o.backLink) ? o.backLinkText : o.topLinkText,
				firstCrumbClass = (o.backLink) ? 'wijmo-wijmenu-prev-list' :
					'wijmo-wijmenu-all-lists',
				firstCrumbLinkClass = (o.backLink) ?
					'ui-state-default ui-corner-all' : '',
				firstCrumbIcon = (o.backLink) ?
					'<span class="ui-icon ui-icon-triangle-1-w"></span>' : '',
				firstCrumb = $('<li class="' + firstCrumbClass +
					'"><a href="#" class="' + firstCrumbLinkClass + '">' +
					firstCrumbIcon + firstCrumbText + '</a></li>');

			container.addClass('wijmo-wijmenu-ipod wijmo-wijmenu-container');
			if (o.backLink) {
				breadcrumb.addClass('wijmo-wijmenu-footer').appendTo(container).hide();
			}
			else {
				breadcrumb.addClass('wijmo-wijmenu-header').prependTo(container);
			}
			if (!o.backLink) {
				breadcrumb.append(crumbDefaultHeader);
			}
			ele.addClass('wijmo-wijmenu-content wijmo-wijmenu-current ui-widget-content' +
				' ui-helper-clearfix').css({ width: container.width() })
			.find('ul').css({
				width: container.width(),
				left: container.width()
			})
			//.attr("role", "menu").attr("aria-activedescendant", "ui-active-menuitem")
			.addClass('ui-widget-content');
			//.hide();
			mycontainer.height(self.rootMenu.height());
			self._sroll();
			if (self._hasScroll()) {
				fixPadding = 5;
				if (ele.children(":first").children(":first").length > 0) {
					fixPadding = ele.children(":first").children(":first")
					.css("padding-left").replace(/px/g, "");
				}
				ele.width(scrollcontainer
				.find(".wijmo-wijsuperpanel-contentwrapper:first").width() - fixPadding);
			}

			self.element.data("firstLeftValue", parseFloat(ele.css('left')));
			$('li>.wijmo-wijmenu-link', ele).each(function () {
				// if the link opens a child menu:
				if ($(this).next().is('ul')) {
					itemDisabled = $(this).parent().attr("disabled");
					$(this).click(function (e) { // ----- show the next menu
						if (o.disabled || itemDisabled) {
							return;
						}
						var nextList = $(this).next(),
							parentUl = $(this).parents('ul:eq(0)'),
							parentLeft = (parentUl.data("topmenu")) ?
							0 : parseFloat(ele.css('left')),
							crumbText, newCrumb,
							nextLeftVal = Math.round(parentLeft -
							parseFloat(container.width())),
							footer = $('.wijmo-wijmenu-footer', container),
							setPrevMenu = function (backlink) {
								var b = backlink,
								c = $('.wijmo-wijmenu-current', container), prevList;
								if (c.get(0) === self.rootMenu.get(0)) {
									return;
								}
								prevList = c.parents('ul:eq(0)');
								c.hide().attr('aria-expanded', 'false');
								self._resetDrillChildMenu(c);
								self._checkDrillMenuHeight(prevList, mycontainer,
								 scrollcontainer);
								prevList.addClass('wijmo-wijmenu-current')
								.attr('aria-expanded', 'true');
								if (prevList.hasClass('wijmo-wijmenu-content')) {
									b.remove();
									footer.hide();
								}
							};

						// show next menu	
						self._resetDrillChildMenu(parentUl);
						self._checkDrillMenuHeight(nextList, mycontainer,
						scrollcontainer);
						self._slidingAnimation(ele, nextLeftVal, null);
						nextList.show().addClass('wijmo-wijmenu-current')
						.attr('aria-expanded', 'true');

						self.activate(e, $(this).parent());
						//add comments for tfs issue 18483
						self.select(e);
						//end comments.

						// initialize "back" link
						if (o.backLink) {
							if (footer.find('a').size() === 0) {
								footer.show();
								self._backLink = $('<a href="#"><span class="ui-icon ' +
								'ui-icon-triangle-1-w"></span> <span>' + o.backLinkText +
								'</span></a>')
									.appendTo(footer)
									.click(function (e) { // ----- show the previous menu
										if (o.disabled) {
											return;
										}
										var b = $(this), prevLeftVal;
										ele.stop(true, true);
										prevLeftVal = parseInt(ele.css('left'), 10) +
										parseInt(container.width(), 10);
										///to fix click the back button too quickly.
										///The menu display wrong.
										if (prevLeftVal > parentLeft) {
											return;
										}
										self._slidingAnimation(ele, prevLeftVal,
										function () {
											setPrevMenu(b);
										});
										e.preventDefault();
									});
							}
						}
						// or initialize top breadcrumb
						else {
							if (breadcrumb.find('li').size() === 1) {
								breadcrumb.empty().append(firstCrumb);
								firstCrumb.find('a').click(function (e) {
									self._resetDrilldownMenu(breadcrumb);
									e.preventDefault();
								});
							}
							$('.wijmo-wijmenu-current-crumb', container)
							.removeClass('wijmo-wijmenu-current-crumb');
							crumbText = $(this).find('span:eq(0)').text();
							newCrumb = $('<li class="wijmo-wijmenu-current-crumb">' +
							'<a href="#" class="wijmo-wijmenu-crumb">' + crumbText +
							'</a></li>');
							newCrumb.appendTo(breadcrumb).find('a').click(function (e) {
								if (o.disabled) {
									return;
								}
								if (!$(this).parent()
									.is('.wijmo-wijmenu-current-crumb')) {
									var newLeftVal = -($('.wijmo-wijmenu-current')
										.parents('ul').size() - 1) * 180;

									self._slidingAnimation(ele, newLeftVal, function () {
										setPrevMenu();
									});
									//make this the current crumb, delete all  
									//breadcrumbs, and navigate to the relevant menu
									$(this).parent()
									.addClass('wijmo-wijmenu-current-crumb')
									.find('span').remove();
									$(this).parent().nextAll().remove();
									e.preventDefault();
								}
							});
							newCrumb.prev()
							.append(' <span class="ui-icon ui-icon-carat-1-e"></span>');
						}
						if ($(this).attr("href") === "#") {
							e.preventDefault();
						}
					});
				}
				// if the link is a leaf node (doesn't open a child menu)
				else {
					$(this).click(function (e) {
						itemDisabled = $(this).parent().attr("disabled");
						if (o.disabled || itemDisabled) {
							return;
						}
						self.activate(e, $(this).parent());
						self.select(e);
						if (o.trigger) {
							var triggers = self._getTriggerEle();

							if (triggers.length) {
								self._hideSubmenu(container);
								self._resetDrilldownMenu(breadcrumb);
							}
						}
						if ($(this).attr("href") === "#") {
							e.preventDefault();
						}
					});
				}
			});
		},

		_slidingAnimation: function (ele, left, callback) {
			var o = this.options.slidingAnimation;
			if (o && !o.disabled) {
				ele.stop(true, true)
				.animate({ left: left }, o.duration, o.easing, callback);
			} else {
				ele.css("left", left);
				callback.call(this);
			}
		},

		_killDrilldown: function () {
			var ele = this.rootMenu,
				domObject = this.domObject,
				style = { width: "", height: "" };

			ele.css(style).removeClass("ui-widget-content");
			domObject.scrollcontainer.css(style);
			domObject.scrollcontainer.wijsuperpanel("destroy");
			domObject.scrollcontainer.removeClass("wijmo-wijsuperpanel").append(ele);
			ele.prevAll().remove();
			domObject.menucontainer
			.removeClass("wijmo-wijmenu-ipod wijmo-wijmenu-container");
			$('.wijmo-wijmenu-current', domObject.menucontainer)
			.removeClass('wijmo-wijmenu-current');
			$(".wijmo-wijmenu-breadcrumb", domObject.menucontainer).remove();
			ele.find("li").each(function () {
				var obj = $(this).children(":first");
				obj.unbind("click");
			});
			$("ul", ele).css({ left: "", width: "" });
			ele.css("left", "");
			domObject.scrollcontainer = domObject.menucontainer.children(":first");
		},

		///popup menu
		//		_popup: function () {
		//			var self = this;
		//			var o = self.options;
		//			var triggerElement = o.trigger;
		//			if (triggerElement && triggerElement !==
		// "" && $(triggerElement).length > 0) {
		//				triggerElement = $(triggerElement);
		//				self.element.data("domObject").menucontainer
		//.css("position", "relative");
		//				triggerElement.bind("click.wijmenu", function (e) {
		//					self._displaySubmenu(triggerElement, 
		//self.element.data("domObject").menucontainer, e);
		//				});
		//				self.element.find("a.wijmo-wijmenu-link")
		//.bind("click.wijmenu", function () {
		//					var value = $(this).text();
		//					triggerElement.val(value);
		//					self._hideAllMenus();
		//				});
		//			}
		//		},

		_getItemByValue: function (val) {
			var items = this.rootMenu.find("a.wijmo-wijmenu-link").filter(function () {
				return $(this).text() === val;
			});
			if (items.length > 0) {
				return items.eq(0).parent();
			}
			return null;
		},
		//now do not support the popup menu
		/*
		_setPopupPosition: function (e) {
		var self = this;
		var triggerElement = $(self.options.trigger);
		var val = triggerElement.val() || triggerElement.attr("value");
		if (val !== "") {
		var item = self._getItemByValue(val);
		if (item) {
		var offset = triggerElement.offset();
		var height = triggerElement.outerHeight(true);
		var position = item.position();
		var newOffset = {
		left: offset.left,
		top: offset.top - position.top
		};
		self.element.data("domObject").menucontainer.css({
		left: 0,
		top: 0
		}).offset(newOffset);
		self.activate(e, item);
		}
		else {
		self._setPosition(triggerElement, self.element
		//.data("domObject").menucontainer, false);
		}
		}
		else {
		self._setPosition(triggerElement, self.element
		//.data("domObject").menucontainer, false);
		}
		},
		*/
		_displaySubmenu: function (e, item, sublist) {
			var self = this,
				o = self.options,
				animationOptions, direction, showAnimation,
				animations = $.wijmo.wijmenu.animations;

			//now do not support the popup menu and equal-height menu.
			/*
			var parentUl = null;
			if (item.is(".wijmo-wijmenu-link")) {
			parentUl = item.parent().parent();
			}
			var parentHeight = 0;
			if (parentUl) {
			parentHeight = parentUl.innerHeight();
			if (parentHeight === 0) {
			parentHeight = this.element.data("domObject").menucontainer.innerHeight();
			}
			}
			var tag = false;
			if (parentHeight > 0 && parentHeight === sublist.innerHeight()) {
			tag = true;
			}
			
			sublist.show();
			if (o.mode === "popup") {
			this._setPopupPosition(e);
			}
			else {
			//this._setPosition(item, sublist, tag);

			}
			*/
			if (item.is("a.wijmo-wijmenu-link")) {
				item.data("subMenuOpened", true);
			}
			if (sublist.is(":visible")) {
				return;
			}
			sublist.show();
			self._setPosition(item, sublist);
			self.nowIndex++;
			self._setZindex(sublist, self.nowIndex);
			sublist.hide();
			self._trigger("showing", e, sublist);

			if ($.fn.wijshow) {
				animationOptions = {
					context: sublist,
					show: true
				};

				direction = "left";
				if (o.orientation === "horizontal") {
					if (sublist.parent().closest("ul").get(0) === this.rootMenu.get(0)) {
						direction = "up";
					}
				}
				showAnimation = $.extend({}, { option: { direction: direction} },
					o.animation, o.showAnimation);
				sublist.wijshow(showAnimation, animations,
					animationOptions, null, function () {
						var browser = $.browser;
						if (browser.msie && browser.version === "9.0") {
							sublist.wrap("<div></div>");
							sublist.unwrap();
						}
						else if (browser.msie && browser.version === "6.0") {
							sublist.css("overflow", "");
						}
						sublist.attr("aria-hidden", false);
					});
			}
			else {
				sublist.show().attr("aria-hidden", false);
			}

			self._isClickToOpen = o.triggerEvent === "click";

			if (!sublist.is(".wijmo-wijmenu")) {
				if (self.currentMenuList === undefined) {
					self.currentMenuList = [];
				}
				self.currentMenuList.push(sublist);
			}
		},

		_hideCurrentSubmenu: function (aItem) {
			var self = this;
			aItem.find("ul").each(function () {
				if (!$(this).data("notClose")) {
					self._hideSubmenu($(this));
				}
			});
		},
		_hideSubmenu: function (sublist) {
			var self = this,
				o = self.options,
				animations = $.wijmo.wijmenu.animations,
				animationOptions, list, hideAnimation;

			if (sublist.prev().is(".wijmo-wijmenu-link")) {
				sublist.prev().data("subMenuOpened", false);
				sublist.prev().removeClass("ui-state-active");
			}

			if ($.fn.wijhide) {
				animationOptions = {
					context: sublist,
					show: false
				};
				hideAnimation = $.extend({}, o.animation, o.hideAnimation);
				sublist.wijhide(hideAnimation, animations,
				animationOptions, null, function () {
					self._setZindex(sublist);
					sublist.attr("aria-hidden", true);
				});
			}
			else {
				sublist.hide().attr("aria-hidden", true);
				self._setZindex(sublist);
			}
			this.element.data("shown", false);
			list = this.currentMenuList;
			if (list) {
				list = $.map(list, function (n) {
					return n && (n.get(0) === sublist.get(0)) ? null : n;
				});
				this.currentMenuList = $.makeArray(list);
			}
		},

		_setZindex: function (ele, value) {
			var element = this.rootMenu,
				domObject = this.domObject, menucontainer;

			if (!domObject) {
				return;
			}
			menucontainer = domObject.menucontainer;
			if (ele.get(0) === menucontainer.get(0)) {
				return;
			}
			if (value) {
				ele.parent().css("z-index", 999);
				ele.css("z-index", value);
				if (menucontainer.css("z-index") === 0) {
					menucontainer.css("z-index", 9950);
				}
			}
			else {
				ele.css("z-index", "");
				ele.parent().css("z-index", "");
				if ($.browser.msie && $.browser.version < 8 &&
				 $("ul:visible", element).length === 0) {
					menucontainer.css("z-index", "");
				}
			}
		},

		_setPosition: function (item, sublist) {
			sublist.css({ left: '0', top: '0', position: 'absolute' });
			var pOption = this._getPosition(item),
				obj = { of: item };
			//now do not support the equal-height menu.
			/*
			if (tag) {
			var parentUl = item.parent().parent();
			if (!parentUl.is(".wijmo-wijmenu-child")) {
			parentUl = this.element.data("domObject").menucontainer;
			}
			obj = { of: parentUl };
			}
			*/
			sublist.position($.extend(obj, pOption));
		},

		_getPosition: function (item) {
			var o = this.options,
				pOption = { my: 'left top',
					at: 'right top'
				};

			//If the menu's orientation is horizontal, 
			//set the first level submenu's position to horizontal. 
			if (o.orientation === "horizontal") {
				if (item.closest("ul").get(0) === this.rootMenu.get(0)) {
					pOption = { my: 'left top',
						at: 'left bottom'
					};
				}
			}
			//If the item is a element outer of the menu.
			if (!item.is(".wijmo-wijmenu-link")) {
				pOption = { my: 'left top',
					at: 'left bottom'
				};
			}
			pOption = $.extend(pOption, o.position);
			return pOption;
		},

		_newId: function () {
			var charArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
			'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
			's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                             id = "", i;
			for (i = 0; i < 16; i++) {
				id += charArray[Math.round(Math.random() * 25)];
			}
			return id;
		}
	});

	$.extend($.wijmo.wijmenu, {
		animations: {
			slide: function (options, addtions) {
				options = $.extend({
					duration: 400,
					easing: "swing"
				}, options, addtions);
				if (options.show) {
					options.context.stop(true, true).animate({
						height: 'show'
					}, options).attr("aria-hidden", false);
				}
				else {
					options.context.stop(true, true).animate({
						height: 'hide'
					}, options).attr("aria-hidden", true);
				}
			}
		}
	});
} (jQuery));


/*
 *
 * Wijmo Library 1.1.2
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Tabs widget.
 *
 * Depends:
 *	jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.effects.core.js	
 *	jquery.cookie.js
 *  jquery.wijmo.wijsuperpanel.js
 *	jquery.wijmo.wijutil.js
 */




 (function ($) {
	 "use strict";

	 var tabId = 0,
	listId = 0;

	 function getNextTabId() {
		 return ++tabId;
	 }

	 function getNextListId() {
		 return ++listId;
	 }

	 $.widget("wijmo.wijtabs", {
		 options: {
			 ///	<summary>
			 ///	 Determines the tabs' alignment in respect to the content.
			 ///     Possible values are: 'top', 'bottom', 'left' and 'right'.
             ///     Type: String
             ///     Default: 'top'
             ///     Code Example:  
		     ///     $('.selector').wijtabs({alignment: 'top'});
		     ///	</summary>
			 alignment: 'top',
			 ///	<summary>
			 ///	Determines whether the tab can be dragged to a new position.
			 ///	Type: Boolean
			 ///	Default: false
			 ///	Code Example:  
			 ///	$('.selector').wijtabs({sortable: false});
			 ///	</summary>
			 sortable: false,
			 ///	<summary>
			 ///	Determines whether to wrap to the next line or scrolling is enabled when the tabs exceed the specified width
			 ///	Type: Boolean
			 ///	Default: false
			 ///	Code Example:  
			 ///	$('.selector').wijtabs({scrollable: false});
			 ///	</summary>
			 scrollable: false,
			 ///	<summary>
			 ///	Additional Ajax options to consider when loading tab content (see $.ajax).
			 ///	Type: object 
			 ///	Default: null 
			 ///	Code Example:  
			 ///	$( ".selector" ).wijtabs({ ajaxOptions: { async: false } });
			 ///	</summary>
			 ajaxOptions: null,
			 ///	<summary>
			 ///	Whether or not to cache remote tabs content, e.g. load only once or with every click. 
			 ///	Cached content is being lazy loaded, e.g once and only once for the first click. 
			 ///	Note that to prevent the actual Ajax requests from being cached by the browser you need to provide an extra cache: 
			 ///	false flag to ajaxOptions.
			 ///	Type: Boolean
			 /// 	Default: false
			 /// 	Code Example:  
			 /// 	$('.selector').wijtabs({cache: false});
			 ///	</summary>
			 cache: false,
			 ///	<summary>
			 ///	Store the latest selected tab in a cookie. 
			 ///	The cookie is then used to determine the initially selected tab if the selected option is not defined. 
			 ///	Requires cookie plugin. The object needs to have key/value pairs of the form the cookie plugin expects as options. 
			 /// 	Type: object
			 /// 	Default: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
			 /// 	Code Example: 
			 /// 	$('.selector').wijtabs({cookie: { expires: 7, path: '/', domain: 'jquery.com', secure: true }});
			 ///	</summary>
			 cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
			 ///	<summary>
			 ///	Determines whether a tab can be collapsed by a user. When this is set to true, an already selected tab will be collapsed upon reselection. 
			 /// 	Type: Boolean
			 /// 	Default: false
			 /// 	Code Example: 
			 /// 	$('.selector').wijtabs({collapsible: false});
			 ///	</summary>
			 collapsible: false,
			 ///	<summary>
			 ///	This is an animation option for hiding the tabs panel content. 
			 ///	Type: object
			 ///	Default: null 
			 ///	Code Example: 
			 ///	$('.selector').wijtabs({hideOption: { blind: true, fade: true, duration: 200}});
			 ///	</summary>
			 hideOption: null, // e.g. { blind: true, fade: true, duration: 200}
			 ///	<summary>
			 ///	This is an animation option for showing the tabs panel content. 
			 ///	Type: object
			 ///	Default: null 
			 ///	Code Example: 
			 ///	$('.selector').wijtabs({showOption: { blind: true, fade: true, duration: 200}});
			 ///	</summary>
			 showOption: null, // e.g. { blind: true, fade: true, duration: 200}
			 ///	<summary>
			 ///	An array containing the position of the tabs (zero-based index) that should be disabled on initialization.
			 ///	Type: Array
			 ///	Default: []
			 ///	Code Example: 
			 ///	$( ".selector" ).wijtabs({ disabledIndexes: [1, 2] });
			 ///	</summary>
			 disabledIndexes: [],
			 ///	<summary>
			 ///		The type of event to be used for selecting a tab.
			 ///	</summary>
			 event: 'click',
			 ///	<summary>
			 ///	If the remote tab, its anchor element that is, has no title attribute to generate an id from, 
			 ///	an id/fragment identifier is created from this prefix and a unique id returned by $.data(el), for example "ui-tabs-54".
			 ///	Type: String
			 ///	Default: 'ui-tabs-'
			 ///	</summary>
			 idPrefix: 'ui-tabs-',
			 ///	<summary>
			 ///	HTML template from which a new tab panel is created in case of adding a tab with the add method or 
			 ///	when creating a panel for a remote tab on the fly.
			 ///	Type: String
			 ///	Default: ''
			 ///	Code Example: 
			 ///	$('.selector').wijtabs({panelTemplate: '<div></div>'});
			 ///	</summary>
			 panelTemplate: '',
			 ///	<summary>
			 ///	The HTML content of this string is shown in a tab title while remote content is loading. 
			 ///	Pass in empty string to deactivate that behavior. 
			 ///	An span element must be present in the A tag of the title, for the spinner content to be visible.
			 ///	Type: String
			 ///	Default: ''
			 /// 	Code Example: 
			 ///	$('.selector').wijtabs({spinner: 'Connecting…'});
			 ///	</summary>
			 spinner: '',
			 ///	<summary>
			 ///	HTML template from which a new tab is created and added. 
			 ///	The placeholders #{href} and #{label} are replaced with the url and tab label that are passed as 
			 ///	arguments to the add method.
			 ///	Type: String
			 ///	Default: ''
			 ///	Code Example:   
			 ///	$('.selector').wijtabs({tabTemplate: '<div><a href="#{href}"><span>#{label}</span></a></div>'});
			 ///	</summary>
			 tabTemplate: '',
			 /// <summary>
			 /// The add event handler. A function called when a tab is added.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ add: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 add: null,
			 /// <summary>
			 /// The remove event handler. A function called when a tab is removed.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ remove: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 remove: null,
			 /// <summary>
			 /// The select event handler. A function called when clicking a tab.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ select: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 select: null,
			 /// <summary>
			 /// The beforeShow event handler. A function called before a tab is shown.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ beforeShow: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 /// <returns type="Boolean">False if want to cancel the following operations.</returns>
			 beforeShow: null,
			 /// <summary>
			 /// The show event handler. A function called when a tab is shown.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ show: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 show: null,
			 /// <summary>
			 /// The load event handler. A function called after the content of a remote tab has been loaded.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ load: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 load: null,
			 /// <summary>
			 /// The disable event handler. A function called when a tab is disabled.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ disable: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 disable: null,
			 /// <summary>
			 /// The enable event handler. A function called when a tab is enabled.
			 /// Default: null.
			 /// Type: Function.
			 /// Code example: $("#element").wijtabs({ enable: function (e, ui) { } });
			 /// </summary>
			 ///
			 /// <param name="e" type="Object">jQuery.Event object.</param>
			 /// <param name="ui" type="Object">
			 /// The data that contains the related ui elements.
			 /// ui.tab: The tab element.
			 /// ui.panel: The panel element.
			 /// ui.index: The index of the tab.
			 ///</param>
			 enable: null
		 },

		 _defaults: {
			 panelTemplate: '<div></div>',
			 spinner: '<em>Loading&#8230;</em>',
			 tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
		 },

		 _create: function () {
			 this._tabify(true);
		 },

		 _setOption: function (key, value) {
			 $.Widget.prototype._setOption.apply(this, arguments);

			 switch (key) {
				 case 'selected':
					 if (this.options.collapsible && value == this.options.selected) {
						 return;
					 }
					 this.select(value);
					 break;

				 case 'alignment':
					 this.destroy();
					 this._tabify(true);
					 break;

				 default:
					 this._tabify();
					 break;
			 }
		 },

		 _initScroller: function () {
			 var horz = $.inArray(this._getAlignment(), ['top', 'bottom']) != -1;
			 if (!horz) { return; }

			 var width = 0;
			 this.lis.each(function () {
				 width += $(this).outerWidth(true);
			 });

			 if (!!this.options.scrollable && this.element.innerWidth() < width) {
				 if (this.scrollWrap === undefined) {
					 this.list.wrap("<div class='scrollWrap'></div>");
					 this.scrollWrap = this.list.parent();
					 $.effects.save(this.list, ['width', 'height', 'overflow']);
				 }

				 this.list.width(width + 2);
				 this.scrollWrap.height(this.list.outerHeight(true));
				 this.scrollWrap.wijsuperpanel({
					 allowResize: false,
					 hScroller: {
						 scrollMode: 'edge'
					 },
					 vScroller: {
						 scrollBarVisibility: 'hidden'
					 }
				 });
			 } else {
				 this._removeScroller();
			 }
		 },

		 _removeScroller: function () {
			 if (this.scrollWrap) {
				 this.scrollWrap.wijsuperpanel('destroy').replaceWith(this.scrollWrap.contents());
				 this.scrollWrap = undefined;
				 $.effects.restore(this.list, ['width', 'height', 'overflow']);
			 }
		 },

		 _tabId: function (a) {
			 return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '') ||
			this.options.idPrefix + getNextTabId();
		 },

		 _sanitizeSelector: function (hash) {
			 return hash.replace(/:/g, '\\:'); // we need this because an id may contain a ":"
		 },

		 _cookie: function () {
			 var cookie = this.cookie || (this.cookie = this.options.cookie.name || 'ui-tabs-' + getNextListId());
			 return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
		 },

		 _ui: function (tab, panel) {
			 return {
				 tab: tab,
				 panel: panel,
				 index: this.anchors.index(tab)
			 };
		 },

		 _cleanup: function () {
			 // restore all former loading tabs labels
			 this.lis.filter('.ui-state-processing').removeClass('ui-state-processing')
				.find('span:data(label.tabs)')
				.each(function () {
					var el = $(this);
					el.html(el.data('label.tabs')).removeData('label.tabs');
				});
		 },

		 _getAlignment: function (tabs) {
			 tabs = tabs === undefined ? true : tabs;
			 var align = this.options.alignment || 'top';
			 if (tabs) { return align; }

			 switch (align) {
				 case 'top':
					 align = 'bottom';
					 break;

				 case 'bottom':
					 align = 'top';
					 break;

				 case 'left':
					 align = 'right';
					 break;

				 case 'right':
					 align = 'left';
					 break;
			 }

			 return align;
		 },

		 _saveLayout: function () {
			 var props = ['width', 'height', 'overflow'];
			 $.effects.save(this.element, props);
			 $.effects.save(this.list, props);
			 $.effects.save(this.element.find('.wijmo-wijtabs-content'), props);
			 this.list.width(this.list.width());

			 var $hide = this.panels.filter(':not(.ui-tabs-hide)');
			 this.element.data('panel.width', $hide.width());
			 this.element.data('panel.outerWidth', $hide.outerWidth(true));
		 },

		 _restoreLayout: function () {
			 var props = ['width', 'height', 'overflow'];
			 $.effects.restore(this.element, props);
			 $.effects.restore(this.list, props);
			 $.effects.restore(this.element.find('.wijmo-wijtabs-content'), props);
		 },

		 _hideContent: function () {
			 var content = this.element.find('.wijmo-wijtabs-content');
			 if (content.length) {
				 this._saveLayout();
				 content.addClass('ui-tabs-hide').attr('aria-hidden', true);
				 this.element.width(this.list.outerWidth(true));
			 }
		 },

		 _showContent: function () {
			 var content = this.element.find('.wijmo-wijtabs-content');
			 if (content.length) {
				 this._restoreLayout();
				 content.removeClass('ui-tabs-hide').attr('aria-hidden', false);
			 }
		 },

		 _blindPanel: function (panel, mode) {
			 var o = this.options;
			 var content = panel.parent('.wijmo-wijtabs-content');
			 if (!content.length) { return; }

			 this.list.width(this.list.width());
			 var props = ['position', 'top', 'left', 'width'];
			 $.effects.save(panel, props); panel.show(); // Save & Show

			 if (mode == 'show') {
				 panel.removeClass('ui-tabs-hide').attr('aria-hidden', false); // Show
				 panel.width(this.element.data('panel.width'));
			 } else {
				 panel.width(panel.width());
			 }

			 var blindOption = mode == 'show' ? o.showOption : o.hideOption;
			 var wrapper = $.effects.createWrapper(panel).css({ overflow: 'hidden' }); // Create Wrapper
			 if (mode == 'show') {
				 wrapper.css($.extend({ width: 0 }, blindOption.fade ? { opacity: 0} : {})); // Shift
			 }

			 // Animation
			 var a = $.extend({ width: mode == 'show' ? this.element.data('panel.outerWidth') : 0 }, blindOption.fade ? { opacity: mode == 'show' ? 1 : 0} : {});
			 var self = this;

			 var listWidth = this.list.outerWidth(true);
			 // Animate
			 wrapper.animate(a, {
				 duration: blindOption.duration,
				 step: function () {
					 var ww = wrapper.outerWidth(true);
					 self.element.width(listWidth + ww);
					 content.width(Math.max(0, self.element.innerWidth() - listWidth - 6));
				 },
				 complete: function () {
					 if (mode == 'hide') {
						 self.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
						 panel.addClass('ui-tabs-hide').attr('aria-hidden', true); // Hide
					 } else {
						 panel.css('width', '');
					 }
					 //$.effects.restore(panel, props); 
					 $.effects.removeWrapper(panel); // Restore

					 if (mode == 'show') { self._restoreLayout(); }

					 self._resetStyle(panel);
					 panel.dequeue();
					 self.element.dequeue("tabs");
				 }
			 });
		 },

		 // Reset certain styles left over from animation
		 // and prevent IE's ClearType bug...
		 _resetStyle: function ($el) {
			 $el.css({ display: '' });
			 if (!$.support.opacity) {
				 $el[0].style.removeAttribute('filter');
			 }
		 },

		 _normalizeBlindOption: function (o) {
			 if (o.blind === undefined) { o.blind = false; }
			 if (o.fade === undefined) { o.fade = false; }
			 if (o.duration === undefined) { o.duration = 200; }
			 if (typeof o.duration == 'string') {
				 try {
					 o.duration = parseInt(o.duration, 10);
				 }
				 catch (e) {
					 o.duration = 200;
				 }
			 }
		 },

		 _tabify: function (init) {
			 this.list = this.element.children('ol,ul').eq(0);
			 this.lis = $('li:has(a)', this.list);
			 this.anchors = this.lis.map(function () { return $('a', this)[0]; });
			 this.panels = $([]);

			 var self = this, o = this.options;
			 var fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash
			 this.anchors.each(function (i, a) {
				 var href = $(a).attr('href') || "";

				 // For dynamically created HTML that contains a hash as href IE < 8 expands
				 // such href to the full page url with hash and then misinterprets tab as ajax.
				 // Same consideration applies for an added tab with a fragment identifier
				 // since a[href=#fragment-identifier] does unexpectedly not match.
				 // Thus normalize href attribute...
				 var hrefBase = href.split('#')[0], baseEl;
				 if (hrefBase && (hrefBase === location.toString().split('#')[0] ||
					(baseEl = $('base')[0]) && hrefBase === baseEl.href)) {
					 href = a.hash;
					 a.href = href;
				 }

				 // inline tab
				 if (fragmentId.test(href)) {
					 self.panels = self.panels.add(self._sanitizeSelector(href));
				 }

				 // remote tab
				 else if (href != '#') { // prevent loading the page itself if href is just "#"
					 $.data(a, 'href.tabs', href); // required for restore on destroy
					 $.data(a, 'load.tabs', href.replace(/#.*$/, '')); // mutable data

					 var id = self._tabId(a);
					 a.href = '#' + id;
					 var $panel = $('#' + id);
					 if (!$panel.length) {
						 $panel = $(o.panelTemplate || self._defaults.panelTemplate).attr('id', id).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
						.insertAfter(self.panels[i - 1] || self.list);
						 $panel.data('destroy.tabs', true);
					 }
					 self.panels = self.panels.add($panel);
				 }

				 // invalid tab href
				 else {
					 o.disabledIndexes.push(i);
				 }
			 });

			 var tabsAlign = this._getAlignment(),
				panelCorner = this._getAlignment(false);

			 // initialization from scratch
			 if (init) {
				 // ARIA
				 this.list.attr("role", "tablist");
				 this.lis.attr("role", "tab");
				 this.panels.attr("role", "tabpanel");

				 this.element.addClass('ui-tabs wijmo-wijtabs' + ' ui-tabs-' + tabsAlign + ' ui-widget ui-widget-content ui-corner-all ui-helper-clearfix');
				 this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
				 this.lis.addClass('ui-state-default' + ' ui-corner-' + tabsAlign);
				 this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-' + panelCorner);

				 var content;
				 // attach necessary classes for styling
				 switch (tabsAlign) {
					 case 'bottom':
						 this.list.appendTo(this.element);
						 break;

					 case 'left':
						 content = $('<div/>').addClass('wijmo-wijtabs-content').appendTo(this.element);
						 this.panels.appendTo(content);
						 break;

					 case 'right':
						 content = $('<div/>').addClass('wijmo-wijtabs-content').insertBefore(this.list);
						 this.panels.appendTo(content);
						 break;

					 case 'top':
						 this.list.prependTo(this.element);
						 break;
				 }

				 if (o.sortable) {
					 this.list.sortable({ axis: (tabsAlign == 'top' || tabsAlign == 'bottom') ? "x" : "y" });
				 }

				 // Selected tab
				 // use "selected" option or try to retrieve:
				 // 1. from fragment identifier in url
				 // 2. from cookie
				 // 3. from selected class attribute on <li>
				 if (o.selected === undefined) {
					 if (location.hash) {
						 this.anchors.each(function (i, a) {
							 if (a.hash == location.hash) {
								 o.selected = i;
								 return false; // break
							 }
						 });
					 }
					 if (typeof o.selected != 'number' && o.cookie) {
						 o.selected = parseInt(self._cookie(), 10);
					 }
					 if (typeof o.selected != 'number' && this.lis.filter('.ui-tabs-selected').length) {
						 o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
					 }
					 o.selected = o.selected || (this.lis.length ? 0 : -1);
				 }
				 else if (o.selected === null) { // usage of null is deprecated, TODO remove in next release
					 o.selected = -1;
				 }

				 // sanity check - default to first tab...
				 o.selected = ((o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0) ? o.selected : 0;

				 // Take disabling tabs via class attribute from HTML
				 // into account and update option properly.
				 // A selected tab cannot become disabled.
				 o.disabledIndexes = $.unique(o.disabledIndexes.concat(
				$.map(this.lis.filter('.ui-state-disabled'),
					function (n, i) { return self.lis.index(n); })
			)).sort();

				 if ($.inArray(o.selected, o.disabledIndexes) != -1) {
					 o.disabledIndexes.splice($.inArray(o.selected, o.disabledIndexes), 1);
				 }

				 // highlight selected tab
				 this.panels.addClass('ui-tabs-hide').attr('aria-hidden', true);
				 this.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
				 if (o.selected >= 0 && this.anchors.length) { // check for length avoids error when initializing empty list
					 this.panels.eq(o.selected).removeClass('ui-tabs-hide').attr('aria-hidden', false);
					 this.lis.eq(o.selected).addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);

					 // seems to be expected behavior that the show callback is fired
					 self.element.queue("tabs", function () {
						 self._trigger('show', null, self._ui(self.anchors[o.selected], self.panels[o.selected]));
					 });

					 this.load(o.selected);
				 }

				 // clean up to avoid memory leaks in certain versions of IE 6
				 $(window).bind('unload', function () {
					 if (self.lis) {
						 self.lis.add(self.anchors).unbind('.tabs');
					 }
					 self.lis = self.anchors = self.panels = null;
				 });
			 } else { // update selected after add/remove
				 o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
			 }

			 // update collapsible
			 this.element[o.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible');

			 // set or update cookie after init and add/remove respectively
			 if (o.cookie) {
				 this._cookie(o.selected, o.cookie);
			 }

			 // disable tabs
			 for (var i = 0, li; (li = this.lis[i]); i++) {
				 $(li)[$.inArray(i, o.disabledIndexes) != -1 &&
				!$(li).hasClass('ui-tabs-selected') ? 'addClass' : 'removeClass']('ui-state-disabled');
				 if ($(li).hasClass('ui-state-disabled')) {
					 $(li).attr('aria-disabled', true);
				 }
			 }

			 // reset cache if switching from cached to not cached
			 if (o.cache === false) {
				 this.anchors.removeData('cache.tabs');
			 }

			 // remove all handlers before, tabify may run on existing tabs after add or option change
			 this.lis.add(this.anchors).unbind('.tabs');

			 if (!o.disabled && o.event != 'mouseover') {
				 var addState = function (state, el) {
					 if (el.is(':not(.ui-state-disabled)')) {
						 el.addClass('ui-state-' + state);
					 }
				 };
				 var removeState = function (state, el) {
					 el.removeClass('ui-state-' + state);
				 };
				 this.lis.bind('mouseover.tabs', function () {
					 addState('hover', $(this));
				 });
				 this.lis.bind('mouseout.tabs', function () {
					 removeState('hover', $(this));
				 });
				 this.anchors.bind('focus.tabs', function () {
					 addState('focus', $(this).closest('li'));
				 });
				 this.anchors.bind('blur.tabs', function () {
					 removeState('focus', $(this).closest('li'));
				 });
			 }

			 if (o.showOption === undefined || o.showOption === null) { o.showOption = {}; }
			 this._normalizeBlindOption(o.showOption);

			 if (o.hideOption === undefined || o.hideOption === null) { o.hideOption = {}; }
			 this._normalizeBlindOption(o.hideOption);

			 // Show a tab...
			 var showTab = ((o.showOption.blind || o.showOption.fade) && o.showOption.duration > 0) ?
			function (clicked, $show) {
				$(clicked).closest('li').addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);
				self._showContent();
				$show.removeClass('ui-tabs-hide').attr('aria-hidden', false);

				if (tabsAlign == 'top' || tabsAlign == 'bottom') {
					var props = { duration: o.showOption.duration };
					if (o.showOption.blind) { props.height = 'toggle'; }
					if (o.showOption.fade) { props.opacity = 'toggle'; }
					$show.hide().removeClass('ui-tabs-hide').attr('aria-hidden', false) // avoid flicker that way
					.animate(props, o.showOption.duration || 'normal', function () {
						self._resetStyle($show);
						self._trigger('show', null, self._ui(clicked, $show[0]));
					});
				} else {
					self._showContent();
					self._blindPanel($show, 'show');
				}
			} :
			function (clicked, $show) {
				$(clicked).closest('li').addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);
				self._showContent();
				$show.removeClass('ui-tabs-hide').attr('aria-hidden', false);
				self._trigger('show', null, self._ui(clicked, $show[0]));
			};

			 // Hide a tab, $show is optional...
			 var hideTab = ((o.hideOption.blind || o.hideOption.fade) && o.hideOption.duration > 0) ?
			function (clicked, $hide) {
				if (tabsAlign == 'top' || tabsAlign == 'bottom') {
					var props = { duration: o.hideOption.duration };
					if (o.hideOption.blind) { props.height = 'toggle'; }
					if (o.hideOption.fade) { props.opacity = 'toggle'; }
					$hide.animate(props, o.hideOption.duration || 'normal', function () {
						self.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
						$hide.addClass('ui-tabs-hide').attr('aria-hidden', true);
						self._resetStyle($hide);
						self.element.dequeue("tabs");
					});
				} else {
					self._saveLayout();
					self._blindPanel($hide, 'hide');
				}
			} :
			function (clicked, $hide, $show) {
				self.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
				self._hideContent();
				$hide.addClass('ui-tabs-hide').attr('aria-hidden', true);
				self.element.dequeue("tabs");
			};

			 // attach tab event handler, unbind to avoid duplicates from former tabifying...
			 if (!o.disabled) {
				 this.anchors.bind(o.event + '.tabs', function () {
					 var el = this,
				$li = $(this).closest('li'),
				$hide = self.panels.filter(':not(.ui-tabs-hide)'),
				$show = $(self._sanitizeSelector(this.hash));

					 // If tab is already selected and not collapsible or tab disabled or
					 // or is already loading or click callback returns false stop here.
					 // Check if click handler returns false last so that it is not executed
					 // for a disabled or loading tab!
					 if (($li.hasClass('ui-tabs-selected') && !o.collapsible) ||
					$li.hasClass('ui-state-disabled') ||
					$li.hasClass('ui-state-processing') ||
					self._trigger('select', null, self._ui(this, $show[0])) === false) {
						 this.blur();
						 return false;
					 }

					 o.selected = self.anchors.index(this);

					 self.abort();

					 // if tab may be closed
					 if (o.collapsible) {
						 if ($li.hasClass('ui-tabs-selected')) {
							 o.selected = -1;

							 if (o.cookie) {
								 self._cookie(o.selected, o.cookie);
							 }

							 self.element.queue("tabs", function () {
								 hideTab(el, $hide);
							 }).dequeue("tabs");

							 this.blur();
							 return false;
						 }
						 else if (!$hide.length) {
							 if (o.cookie) {
								 self._cookie(o.selected, o.cookie);
							 }

							 self.element.queue("tabs", function () {
								 showTab(el, $show);
							 });

							 self.load(self.anchors.index(this)); // TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171

							 this.blur();
							 return false;
						 }
					 }

					 if (o.cookie) {
						 self._cookie(o.selected, o.cookie);
					 }

					 // show new tab
					 if ($show.length) {
						 if ($hide.length) {
							 self.element.queue("tabs", function () {
								 hideTab(el, $hide);
							 });
						 }
						 self.element.queue("tabs", function () {
							 showTab(el, $show);
						 });

						 self.load(self.anchors.index(this));
					 }
					 else {
						 throw 'jQuery UI Tabs: Mismatching fragment identifier.';
					 }

					 // Prevent IE from keeping other link focussed when using the back button
					 // and remove dotted border from clicked link. This is controlled via CSS
					 // in modern browsers; blur() removes focus from address bar in Firefox
					 // which can become a usability and annoying problem with tabs('rotate').
					 if ($.browser.msie) {
						 this.blur();
					 }
				 });
			 }

			 this._initScroller();

			 // disable click in any case
			 this.anchors.bind('click.tabs', function () { return false; });

		 },

		 destroy: function () {
			 var o = this.options;
			 this.abort();
			 this._removeScroller();
			 this.element.unbind('.tabs')
			.removeClass([
				'wijmo-wijtabs',
				'ui-tabs-top',
				'ui-tabs-bottom',
				'ui-tabs-left',
				'ui-tabs-right',
				'ui-tabs',
				'ui-widget',
				'ui-widget-content',
				'ui-corner-all',
				'ui-tabs-collapsible',
				'ui-helper-clearfix'
				].join(' '))
			.removeData('tabs')
			.removeAttr('role');

			 this.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
			.removeAttr('role');

			 this.anchors.each(function () {
				 var href = $.data(this, 'href.tabs');
				 if (href) {
					 this.href = href;
				 }
				 var $this = $(this).unbind('.tabs');
				 $.each(['href', 'load', 'cache'], function (i, prefix) {
					 $this.removeData(prefix + '.tabs');
				 });
			 });

			 this.lis.unbind('.tabs').add(this.panels).each(function () {
				 if ($.data(this, 'destroy.tabs')) {
					 $(this).remove();
				 } else {
					 $(this).removeClass([
					'ui-state-default',
					'ui-corner-top',
					'ui-corner-bottom',
					'ui-corner-left',
					'ui-corner-right',
					'ui-tabs-selected',
					'ui-state-active',
					'ui-state-hover',
					'ui-state-focus',
					'ui-state-disabled',
					'ui-tabs-panel',
					'ui-widget-content',
					'ui-tabs-hide'
				].join(' ')).css({ position: '', left: '', top: '' })
				.removeAttr('role')
				.removeAttr('aria-hidden')
				.removeAttr('aria-selected')
				.removeAttr('aria-disabled');
				 }
			 });

			 var content = $('.wijmo-wijtabs-content');
			 if (content.length) {
				 content.replaceWith(content.contents());
			 }

			 if (o.cookie) {
				 this._cookie(null, o.cookie);
			 }

			 return this;
		 },

		 add: function (url, label, index) {
			 /// 	<summary>
			 ///	Add a new tab.
			 ///	Code example: $("#element").wijtabs('add', url, label, [index]); 
			 ///	</summary>
			 /// 	<param name="url" type="String">A URL consisting of a fragment identifier only to create an in-page tab or a full url (relative or absolute, no cross-domain support) to turn the new tab into an Ajax (remote) tab.</param>
			 /// 	<param name="label" type="String">The tab label.</param>
			 /// 	<param name="index" type="Number">Zero-based position where to insert the new tab.</param>
			 if (index === undefined) {
				 index = this.anchors.length; // append by default
			 }

			 var self = this, o = this.options,
			$li = $((o.tabTemplate || self._defaults.tabTemplate).replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)),
			id = !url.indexOf('#') ? url.replace('#', '') : this._tabId($('a', $li)[0]);

			 var tabsAlign = this._getAlignment(),
				panelCorner = this._getAlignment(false);
			 $li.addClass('ui-state-default' + ' ui-corner-' + tabsAlign)
			.data('destroy.tabs', true)
			.attr('role', 'tab')
			.attr('aria-selected', false);

			 // try to find an existing element before creating a new one
			 var $panel = $('#' + id);
			 if (!$panel.length) {
				 $panel = $(o.panelTemplate || self._defaults.panelTemplate).attr('id', id)
					.data('destroy.tabs', true)
					.attr('role', 'tabpanel');
			 }
			 $panel.addClass('ui-tabs-panel ui-widget-content ui-corner-' + panelCorner + ' ui-tabs-hide').attr('aria-hidden', true);

			 if (index >= this.lis.length) {
				 $li.appendTo(this.list);
				 if (this.panels.length > 0) {
					 $panel.insertAfter(this.panels[this.panels.length - 1]);
				 } else {
					 var $content = this.element.find('.wijmo-wijtabs-content');
					 if ($content.length === 0)
						 $content = this.element;

					 //$panel.appendTo(this.list[0].parentNode);
					 $panel.appendTo($content);
				 }
			 }
			 else {
				 $li.insertBefore(this.lis[index]);
				 $panel.insertBefore(this.panels[index]);
			 }

			 o.disabledIndexes = $.map(o.disabledIndexes,
				function (n, i) { return n >= index ? ++n : n; });

			 this._removeScroller();
			 this._tabify();

			 if (this.anchors.length == 1) { // after tabify
				 o.selected = 0;
				 $li.addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);
				 $panel.removeClass('ui-tabs-hide').attr('aria-hidden', false);
				 this.element.queue("tabs", function () {
					 self._trigger('show', null, self._ui(self.anchors[0], self.panels[0]));
				 });

				 this.load(0);
			 }

			 // callback
			 this._trigger('add', null, this._ui(this.anchors[index], this.panels[index]));
			 return this;
		 },

		 remove: function (index) {
			 /// 	<summary>
			 ///	Remove a tab.
			 ///	Code example: $("#element").wijtabs('remove', 1); 
			 /// 	</summary>
			 /// 	<param name="index" type="Number">The zero-based index of the tab to be removed.</param>
			 var o = this.options, $li = this.lis.eq(index).remove(),
				$panel = this.panels.eq(index).remove();

			 // If selected tab was removed focus tab to the right or
			 // in case the last tab was removed the tab to the left.
			 if ($li.hasClass('ui-tabs-selected') && this.anchors.length > 1) {
				 this.select(index + (index + 1 < this.anchors.length ? 1 : -1));
			 }

			 o.disabledIndexes = $.map($.grep(o.disabledIndexes, function (n, i) { return n != index; }),
			function (n, i) { return n >= index ? --n : n; });

			 this._removeScroller();
			 this._tabify();

			 // callback
			 this._trigger('remove', null, this._ui($li.find('a')[0], $panel[0]));
			 return this;
		 },

		 enableTab: function (index) {
			 /// 	<summary>
			 ///	Enable a disabled tab.
			 ///	Code example: $("#element").wijtabs('enableTab', 1); 
			 ///	</summary>
			 /// 	<param name="index" type="Number">The zero-based index of the tab to be enabled.</param>
			 var o = this.options;
			 if ($.inArray(index, o.disabledIndexes) == -1) {
				 return;
			 }

			 this.lis.eq(index).removeClass('ui-state-disabled').removeAttr('aria-disabled');
			 o.disabledIndexes = $.grep(o.disabledIndexes, function (n, i) { return n != index; });

			 // callback
			 this._trigger('enable', null, this._ui(this.anchors[index], this.panels[index]));
			 return this;
		 },

		 disableTab: function (index) {
			 /// 	<summary>
			 ///	Disabled a tab.
			 ///	Code example: $("#element").wijtabs('disableTab', 1); 
			 ///	</summary>
			 /// 	<param name="index" type="Number">The zero-based index of the tab to be disabled.</param>
			 var self = this, o = this.options;
			 if (index != o.selected) { // cannot disable already selected tab
				 this.lis.eq(index).addClass('ui-state-disabled').attr('aria-disabled', true);

				 o.disabledIndexes.push(index);
				 o.disabledIndexes.sort();

				 // callback
				 this._trigger('disable', null, this._ui(this.anchors[index], this.panels[index]));
			 }

			 return this;
		 },

		 select: function (index) {
			 /// 	<summary>
			 ///	Select a tab, as if it were clicked.
			 ///	Code example: $("#element").wijtabs('select', 1); 
			 ///	</summary>
			 /// 	<param name="index" type="Number">The zero-based index of the tab to be selected or the id selector of the panel the tab is associated with.</param>
			 if (typeof index == 'string') {
				 index = this.anchors.index(this.anchors.filter('[href$=' + index + ']'));
			 }
			 else if (index === null) { // usage of null is deprecated, TODO remove in next release
				 index = -1;
			 }
			 if (index == -1 && this.options.collapsible) {
				 index = this.options.selected;
			 }

			 this.anchors.eq(index).trigger(this.options.event + '.tabs');
			 return this;
		 },

		 load: function (index) {
			 /// 	<summary>
			 ///	Reload the content of an Ajax tab programmatically. 
			 ///	This method always loads the tab content from the remote location, even if cache is set to true. 
			 ///	The second argument is the zero-based index of the tab to be reloaded.
			 ///	Code example: $("#element").wijtabs('load', 1); 
			 ///	</summary>
			 /// 	<param name="index" type="Number">The zero-based index of the tab to be loaded</param>
			 var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, 'load.tabs');

			 this.abort();

			 // not remote or from cache
			 if (!url || this.element.queue("tabs").length !== 0 && $.data(a, 'cache.tabs')) {
				 this.element.dequeue("tabs");
				 return;
			 }

			 // load remote from here on
			 this.lis.eq(index).addClass('ui-state-processing');

			 if (o.spinner || self._defaults.spinner) {
				 var span = $('span', a);
				 span.data('label.tabs', span.html()).html(o.spinner || self._defaults.spinner);
			 }

			 this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
				 url: url,
				 success: function (r, s) {
					 $(self._sanitizeSelector(a.hash)).html(r);

					 // take care of tab labels
					 self._cleanup();

					 if (o.cache) {
						 $.data(a, 'cache.tabs', true); // if loaded once do not load them again
					 }

					 // callbacks
					 self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
					 try {
						 o.ajaxOptions.success(r, s);
					 }
					 catch (e1) { }
				 },
				 error: function (xhr, s, e) {
					 // take care of tab labels
					 self._cleanup();

					 // callbacks
					 self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
					 try {
						 // Passing index avoid a race condition when this method is
						 // called after the user has selected another tab.
						 // Pass the anchor that initiated this request allows
						 // loadError to manipulate the tab content panel via $(a.hash)
						 o.ajaxOptions.error(xhr, s, index, a);
					 }
					 catch (e2) { }
				 }
			 }));

			 // last, so that load event is fired before show...
			 self.element.dequeue("tabs");

			 return this;
		 },

		 abort: function () {
			 /// 	<summary>
			 ///	Terminate all running tab ajax requests and animations.
			 ///	Code example: $("#element").wijtabs('abort'); 
			 ///	</summary>	    
			 this.element.queue([]);
			 this.panels.stop(false, true);

			 // "tabs" queue must not contain more than two elements,
			 // which are the callbacks for the latest clicked tab...
			 this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));

			 // terminate pending requests from other tabs
			 if (this.xhr) {
				 this.xhr.abort();
				 delete this.xhr;
			 }

			 // take care of tab labels
			 this._cleanup();
			 return this;
		 },

		 url: function (index, url) {
			 /// 	<summary>
			 ///	Change the url from which an Ajax (remote) tab will be loaded. 
			 ///	The specified URL will be used for subsequent loads. 
			 ///	Note that you can not only change the URL for an existing remote tab with this method, but also turn an in-page tab into a remote tab. 
			 ///	The second argument is the zero-based index of the tab of which its URL is to be updated. 
			 ///	The third is a URL the content of the tab is loaded from.
			 ///	Code example: $("#element").wijtabs('url', 1, url); 
			 ///	</summary>
			 /// 	<param name="index" type="Number">The zero-based index of the tab of which its URL is to be updated.</param>
			 /// 	<param name="url" type="String">A URL the content of the tab is loaded from.</param>
			 this.anchors.eq(index).removeData('cache.tabs').data('load.tabs', url);
			 return this;
		 },

		 length: function () {
			 /// 	<summary>
			 ///	Retrieve the number of tabs of the first matched tab pane.
			 ///	Code example: $("#element").wijtabs('length'); 
			 ///	</summary>
			 return this.anchors.length;
		 }

	 });

 })(jQuery);
/*globals jQuery,window,document*/
/*
 * 
 * Wijmo Library 1.1.5
 * http://wijmo.com/
 * 
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 * 
 * 
 * Wijmo Video widget.
 * 
 * Depends:
 *     jquery.ui.core.js
 *     jquery.ui.widget.js
 *     jquery.wijmo.wijtooltip.js
 */
(function ($) {
	"use strict";
	var $video, $vidParent, $seekSlider, seek = false, fullScreen = false,
		currentVolumn, $volumeSlider, $volumeBtn, $fullScreenBtn;
	$.widget("wijmo.wijvideo", {
		options: {
			/// <summary>
			/// A value that indicates whether to show the full screen button.
			/// Type: Boolean.
			/// Default: true.
			/// Code example: $(".video").wijvideo("option", 
			/// "fullScreenButtonVisible", false).
			/// </summary>
			fullScreenButtonVisible: true,            ///	<summary>
            ///	Determines whether to display the controls only when hovering the mouse to the video.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $(".video").wijvideo({
            ///      showControlsOnHover: false
            ///  });
            ///	</summary>
            showControlsOnHover: true
		},
		
		_create: function () {
			var self = this, pos, $playbtn, videoIsSupport,
				o = self.options, interval; 

			if ($(this.element).is("video")) {
				$video = $(this.element);
			} else {
				$video = $(this.element).find("video");
			}
			//update for fixing bug 18129 by wh at 2011/11/2
			if (!$video || $video.length === 0 ||
					($.browser.msie && $.browser.version < 9)) {
				return;
			}
			//end for fixing
			
			//Add for fixing bug 18204 by wh at 2011/11/7
			videoIsSupport = $video[0].canPlayType;
			if (!videoIsSupport) {
				return;
			}
			//end for fixing bug 18204

			$video.wrap('<div class="wijmo-wijvideo ui-widget-content ui-widget" />')
				.after('<div class="wijmo-wijvideo-wrapper">' +
							'<ul class="wijmo-wijvideo-controls ui-widget-header ui-helper-clearfix ui-helper-reset">' +
								'<li class="wijmo-wijvideo-play ui-state-default ui-corner-all">' +
									'<span class="ui-icon ui-icon-play"></span>' +
								'</li>' +
								'<li class="wijmo-wijvideo-index"><div class="wijmo-wijvideo-index-slider"></div></li>' +
								'<li class="wijmo-wijvideo-timer">00:00</li>' +
								'<li class="wijmo-wijvideo-volume ui-state-default ui-corner-all">' +
									'<div class="wijmo-wijvideo-volume-container">' +
									'<div class="wijmo-wijvideo-volumeslider ui-state-default ui-corner-top"></div>' +
									 '</div>' +
									'<span class="ui-icon ui-icon-volume-on"></span>' +
								'</li>' +
								'<li class="wijmo-wijvideo-fullscreen ui-state-default ui-corner-all">' +
									'<span class="ui-icon ui-icon-arrow-4-diag"></span>' +
								'</li>' +
							'</ul>' +
						'</div>');

			$vidParent = $video.parent('.wijmo-wijvideo');
			// size the div wrapper to the height and width of the controls
			$vidParent.width($video.outerWidth())
				.height($video.outerHeight());

			$seekSlider = $vidParent.find('.wijmo-wijvideo-index-slider');
			
			//Volumn
			self._volumnOn = true;
			$volumeBtn = $vidParent.find('.wijmo-wijvideo-volume');
			
			// create the video seek slider
			interval = window.setInterval(function () {
				//replace the attr to prop
				//if ($video.attr('readyState')) {
				if (self._getVideoAttribute("readyState")) {
					window.clearInterval(interval);
					
					//note: we need to adjust the size of the video in
					//this time
					$vidParent.width($video.outerWidth())
					.height($video.outerHeight());

					//note: if the controls is invisible, it will not 
					//get the position
					$video.parent().find('.wijmo-wijvideo-controls').show();
					
					//$seekSlider = $vidParent.find('.wijmo-wijvideo-index-slider');
					pos = $vidParent.find('.wijmo-wijvideo-timer').position().left;
					$seekSlider.width(pos - $seekSlider.position().left - 15);

					$seekSlider.slider({
						value: 0,
						step: 0.01,
						max: self._getVideoAttribute("duration"),
						range: 'min',
						stop: function (e, ui) {
							seek = false;
							self._setVideoAttribute("currentTime", ui.value);
						},
						slide: function () {
							seek = true;
						}
					});
				
					self._updateTime();

					// wire up the volume
					$volumeSlider = $vidParent.find('.wijmo-wijvideo-volumeslider');
					$volumeSlider.slider({
						min: 0,
						max: 1,
						value: self._getVideoAttribute("volume"),
						step: 0.1,
						orientation: 'vertical',
						range: 'min',
						slide: function (e, ui) {
							self._setVideoAttribute("volume", ui.value);
							if (ui.value === 0) {
								self._volumnOn = false;
								$volumeBtn.find("span").removeClass("ui-icon-volume-on")
									.addClass("ui-icon-volume-off");	
							} else {
								self._volumnOn = true;
								$volumeBtn.find("span").removeClass("ui-icon-volume-off")
									.addClass("ui-icon-volume-on");	
							}
						}
					});
					
					$video.parent().find('.wijmo-wijvideo-controls')
						.css('display', 'none');
					
					self._initialToolTip();
					
					if (!o.showControlsOnHover) {
						$('.wijmo-wijvideo-controls').show();
						$vidParent.height($video.outerHeight() + 
								$('.wijmo-wijvideo-controls').height());
					}
				}
			}, 200);
			
			$video.bind("click." + self.widgetName, function () {
				self._togglePlay();
			});

			// display the bar on hover
			if (o.showControlsOnHover) {
				$('.wijmo-wijvideo').hover(function () {
					$('.wijmo-wijvideo-controls').stop(true, true).fadeIn();
				},
					function () {
						$('.wijmo-wijvideo-controls').delay(300).fadeOut();
					});
			}

			$playbtn = $vidParent.find('.wijmo-wijvideo-play > span');
			$playbtn.click(function () {
				self._togglePlay();
			}).parent().hover(function () {
				$(this).addClass("ui-state-hover");
			}, function () {
				$(this).removeClass("ui-state-hover");
			});
			
			$vidParent.find('.wijmo-wijvideo-volume').hover(function () {
				$('.wijmo-wijvideo-volume-container')
					.stop(true, true).slideToggle();
			});
			
			$fullScreenBtn = $vidParent.find('.wijmo-wijvideo-fullscreen > span');
			
			$fullScreenBtn.click(function () {
				self._toggleFullScreen();
			}).parent().hover(function () {
				$(this).addClass("ui-state-hover");
			}, function () {
				$(this).removeClass("ui-state-hover");
			});
			
			if (!self.options.fullScreenButtonVisible) {
				$vidParent.find('.wijmo-wijvideo-fullscreen').hide();
			}
			
			$volumeBtn.hover(function () {
				$(this).addClass("ui-state-hover");
			}, function () {
				$(this).removeClass("ui-state-hover");
			}).click(function () {
				if (self._getVideoAttribute("readyState")) {
					self._volumnOn = !self._volumnOn;
					if (!self._volumnOn) {
						currentVolumn = $volumeSlider.slider('value');
						$volumeSlider.slider('value', 0);
						$video.attr('volume', 0);
						$volumeBtn.find("span").removeClass("ui-icon-volume-on")
							.addClass("ui-icon-volume-off");
					} else {
						$volumeSlider.slider('value', currentVolumn);
						$video.attr('volume', currentVolumn);
						$volumeBtn.find("span").removeClass("ui-icon-volume-off")
							.addClass("ui-icon-volume-on");
					}
				}
			});
			
			//move the init tooltip to interval, when the video's state
			//is ready, then init the tooltip
			//self._initialToolTip();
			
			$video.bind('play.' + self.widgetName, function () {
				$playbtn.removeClass('ui-icon ui-icon-play')
					.addClass('ui-icon ui-icon-pause');
			});

			$video.bind('pause.' + self.widgetName, function () {
				$playbtn.removeClass('ui-icon ui-icon-pause')
					.addClass('ui-icon ui-icon-play');
			});

			$video.bind('ended.' + self.widgetName, function () {
				self.pause();
			});

			$video.bind('timeupdate.' + self.widgetName, function () {
				self._updateTime();
			});

			self._videoIsControls = false;
			if (self._getVideoAttribute("controls")) {
				self._videoIsControls = true;
			}
			$video.removeAttr('controls');
		},		
		
		_setOption: function (key, value) {
			var self = this, o = self.options;

			$.Widget.prototype._setOption.apply(self, arguments);

			if (key === "fullScreenButtonVisible") {
				o.fullScreenButtonVisible = value;
				if (value) {
					$vidParent.find('.wijmo-wijvideo-fullscreen').show();
				} else {
					$vidParent.find('.wijmo-wijvideo-fullscreen').hide();
				}
			} else if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			} else if (key === "showControlsOnHover") {
				if (!value) {
					$('.wijmo-wijvideo').unbind('mouseenter mouseleave');
					window.setTimeout(function () {
						$('.wijmo-wijvideo-controls').show();
						$vidParent.height($video.outerHeight() + 
								$('.wijmo-wijvideo-controls').height());
					}, 200);
				} else {
					$vidParent.height($video.outerHeight());
					$('.wijmo-wijvideo-controls').hide();
					$('.wijmo-wijvideo').hover(function () {
						$('.wijmo-wijvideo-controls').stop(true, true).fadeIn();
					},
						function () {
							$('.wijmo-wijvideo-controls').delay(300).fadeOut();
						});
				}
			}
			//end for disabled option
		},
		
		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
				if ($.browser.msie) {
					$('.wijmo-wijvideo').unbind('mouseenter mouseleave');
				}
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
					if ($.browser.msie) {
						$('.wijmo-wijvideo').hover(function () {
							$('.wijmo-wijvideo-controls').stop(true, true).fadeIn();
						},
							function () {
								$('.wijmo-wijvideo-controls').delay(300).fadeOut();
						});
					}
				}
			}
		},		
		
		_createDisabledDiv: function (outerEle) {
			var self = this,
				ele = $vidParent,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
						.addClass("ui-disabled")
						.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},
		
		_getVideoAttribute: function (name) {
			if (name === "") {
				return;
			}
			if ($video.attr(name) !== undefined) {
				return $video.attr(name);
			} else {
				return $video.prop(name);
			}
		},
		
		_setVideoAttribute: function (name, value) {
			if (name === "") {
				return;
			}
			if ($video.attr(name) !== undefined) {
				return $video.attr(name, value);
			} else {
				return $video.prop(name, value);
			}
		},
		
		_initialToolTip: function () {
			var self = this;
			//ToolTip-slider
			$seekSlider.wijtooltip({ mouseTrailing: true, showCallout: false, 
			position: {offset: '-60 -60'}});
			$seekSlider.bind("mousemove", function (e, ui) {
				self._changeToolTipContent(e);
			});

			//ToolTip-button
			$volumeBtn.wijtooltip({content: "Volume", showCallout: false});
			$fullScreenBtn.wijtooltip({content: "Full Screen", showCallout: false});
			
			//add class to prevent from overriding the origin css of tooltip.
			$seekSlider.wijtooltip("widget").addClass("wijmo-wijvideo");
			$volumeBtn.wijtooltip("widget").addClass("wijmo-wijvideo");
			$volumeBtn.wijtooltip("widget").addClass("wijmo-wijvideo");
		},

		_updateTime: function () {
			var self = this, dur = self._getVideoAttribute("duration"), 
			cur = self._getVideoAttribute("currentTime"),
				mm, ss, mfmt = '', sfmt = '';

			mm = this._truncate((dur - cur) / 60);
			ss = this._truncate((dur - cur) - (mm * 60));
			if (mm < 10) {
				mfmt = '0';
			}
			if (ss < 10) {
				sfmt = '0';
			}
			$vidParent.find('.wijmo-wijvideo-timer').html(mfmt + mm + ':' + sfmt + ss);
			if (!seek) {
				$seekSlider.slider('value', cur);
			}
		},

		_truncate: function (n) {
			return Math[n > 0 ? "floor" : "ceil"](n);
		},

		_togglePlay: function () {
			var self = this;
			
			if (!self._getVideoAttribute("readyState")) {
				return;
			}
			
			if (self._getVideoAttribute("paused")) {
				this.play();
			} else {
				this.pause();
			}
		},
		
		_toggleFullScreen: function () {
			var self = this,
				isPaused = self._getVideoAttribute("paused"),
				offsetWidth = 0,
				fWidth = $(window).width(), 
				fHeight = $(window).height();
			
			fullScreen = !fullScreen;
			
			if (fullScreen) {
				self._oriVidParentStyle = $vidParent.attr("style");
				self._oriWidth = $video.outerWidth();
				self._oriHeight = $video.outerHeight();
				self._oriDocOverFlow = $(document.documentElement).css("overflow");
				
				$(document.documentElement).css({
					overflow: "hidden"
				});
				
				if (!self._replacedDiv) {
					self._replacedDiv = $("<div />");
				}
				
				$vidParent.after(self._replacedDiv);
				$vidParent.addClass("wijmo-wijvideo-container-fullscreen")
					.css({
						width: fWidth,
						height: fHeight
					}).appendTo($("body"));
				
				$video.attr("width", fWidth).attr("height", fHeight);
				
				$(window).bind("resize.wijvideo", function () {
					self._fullscreenOnWindowResize();
				});
				
				//for reposition the video control
				offsetWidth = fWidth - self._oriWidth;
			} else {
				$(document.documentElement).css({
					overflow: self._oriDocOverFlow
				});
				
				//for reposition the video control
				offsetWidth = self._oriWidth - $video.width();
				
				self._replacedDiv.after($vidParent)
					.remove();
				$vidParent.removeClass("wijmo-wijvideo-container-fullscreen")
					.attr("style", "")
					.attr("style", self._oriVidParentStyle);
				
				$video.attr("width", self._oriWidth)
					.attr("height", self._oriHeight);
				
				$(window).unbind("resize.wijvideo");
			}	
			
			self._positionControls(offsetWidth);
			self._hideToolTips();
			
			if (!isPaused) {
				self.play();
			} else {
				self.pause();
			}
		},

		_fullscreenOnWindowResize: function () {
			var self = this,
				fWidth = $(window).width(), 
				fHeight = $(window).height(),
				offsetWidth = fWidth - $vidParent.width();

			$vidParent.css({
				width: fWidth,
				height: fHeight
			});
			$video.attr("width", fWidth).attr("height", fHeight);
			
			self._positionControls(offsetWidth);
		},
		
		_positionControls: function (offsetWidth) {
			var seekSlider = $vidParent
					.find('.wijmo-wijvideo-index-slider');
			
			seekSlider.width(seekSlider.width() + offsetWidth);
		},
		
		_showToolTip: function (e) {
			var self = this,
				mousePositionX = e.pageX, 
				mousePositionY = e.pageY,
				sliderOffset = $seekSlider.offset().left,
				sliderWidth = $seekSlider.width(),
				curWidth = mousePositionX - sliderOffset,
				dur = self._getVideoAttribute("duration"), 
				currentTime;
			
			currentTime = dur * (curWidth / sliderWidth);

			$seekSlider.wijtooltip("option", "content", 
				self._getToolTipContent(currentTime));
			$seekSlider.wijtooltip("showAt", 
					{ x: mousePositionX, y: mousePositionY - 10 });
		},
		
		_changeToolTipContent: function (e) {
			var self = this,
				mousePositionX = e.pageX, 
				sliderOffset = $seekSlider.offset().left,
				sliderWidth = $seekSlider.width(),
				curWidth = mousePositionX - sliderOffset,
				dur = self._getVideoAttribute("duration"),
				currentTime;
			
			currentTime = dur * (curWidth / sliderWidth);

			$seekSlider.wijtooltip("option", "content", 
				self._getToolTipContent(currentTime));
		},
		
		_hideToolTips: function () {
			$seekSlider.wijtooltip("hide");
			$volumeBtn.wijtooltip("hide");
			$fullScreenBtn.wijtooltip("hide");
		},
		
		_getToolTipContent: function (currentTime) {
			var mm, ss, mfmt = '', sfmt = '';

			mm = parseInt(currentTime / 60, 10);
			ss = parseInt(currentTime - (mm * 60), 10);
			if (mm < 10) {
				mfmt = '0';
			}
			if (ss < 10) {
				sfmt = '0';
			}
			
			return mfmt + mm + ':' + sfmt + ss;
		},
		
		destroy: function () {
			///	<summary>
			///	Removes the wijvideo functionality completely. 
			/// This returns the element back to its pre-init state. 
			/// Code example: $("#element").wijvideo("destroy");
			///	</summary>
			
			var self = this;
			$.Widget.prototype.destroy.apply(this, arguments);
			
			//remove the controls
			$vidParent.after($video).remove();
			$video.unbind('.' + self.widgetName);
			if (self._videoIsControls) {
				self._setVideoAttribute("controls", true);
			}
		},

		play: function () {
			///	<summary>
			///	Play the video. 
			/// Code example: $("#element").wijvideo("play");
			///	</summary>
			
			$video[0].play();
		},
		
		pause: function () {
			///	<summary>
			///	Pause the video.
			/// Code example: $("#element").wijvideo("pause");
			///	</summary>
			
			$video[0].pause();
		},
		
		getWidth: function () {
			///	<summary>
			///	Gets the video width in pixel.
			/// Code example: $("#element").wijvideo("getWidth");
			///	</summary>
			
			return $video.outerWidth();
		},
		
		setWidth: function (width) {
			///	<summary>
			///	Sets the video width in pixel.
			/// Code example: $("#element").wijvideo("setWidth", 600);
			///	</summary>
			/// <param name="width" type="Number">Width value in pixel.</param>
			
			width = width || 600;
			var origWidth = this.getWidth();
			$video.attr('width', width);
			$vidParent.width($video.outerWidth());
			this._positionControls(this.getWidth() - origWidth);
		},
		
		getHeight: function () {
			///	<summary>
			///	Gets the video height in pixel.
			/// Code example: $("#element").wijvideo("getHeight");
			///	</summary>
			
			return $video.outerHeight();
		},
		
		setHeight: function (height) {
			///	<summary>
			///	Sets the video height in pixel.
			/// Code example: $("#element").wijvideo("setHeight", 400);
			///	</summary>
			/// <param name="height" type="Number">Height value in pixel.</param>
			
			height = height || 400;
			$video.attr('height', height);
			if (o.showControlsOnHover) {
				$vidParent.height($video.outerHeight());
			} else {
				$vidParent.height($video.outerHeight() + 
						$('.wijmo-wijvideo-controls').height());
			}
			
		}
	});
}(jQuery));
