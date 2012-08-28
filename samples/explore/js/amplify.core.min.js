/*!
 * Amplify Core 1.0.0
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function(a,b){var c=[].slice,d={},e=a.amplify={publish:function(a){var b=c.call(arguments,1),e,f,g=0,h;if(!d[a])return!0;for(f=d[a].length;g<f;g++){e=d[a][g],h=e.callback.apply(e.context,b);if(h===!1)break}return h!==!1},subscribe:function(a,b,c,e){arguments.length===3&&typeof c=="number"&&(e=c,c=b,b=null),arguments.length===2&&(c=b,b=null),e=e||10;var f=0,g=a.split(/\s/),h=g.length;for(;f<h;f++){a=g[f],d[a]||(d[a]=[]);var i=d[a].length-1,j={callback:c,context:b,priority:e};for(;i>=0;i--)if(d[a][i].priority<=e){d[a].splice(i+1,0,j);return c}d[a].unshift(j)}return c},unsubscribe:function(a,b){if(!!d[a]){var c=d[a].length,e=0;for(;e<c;e++)if(d[a][e].callback===b){d[a].splice(e,1);break}}}}})(this)