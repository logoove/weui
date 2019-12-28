/**
 *
 * @returns 返回10位时间戳
 */
function time(){return Math.floor((new Date).getTime()/1e3)}
/**
 *
 * @param n 格式化样式Y-m-d H:i:s返回带0 Y-n-j不带0 z一年中第几天要+1才正确 w星期0是周日 N 7是周日D三个字母星期 l英语星期 W周 F月份英语 L闰年判断 c带时区日期时间 r英文形式
 * @param t 时间戳
 * @returns 格式化时间
 */
function date(n,t){var e,r,u=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],o=/\\?(.?)/gi,i=function(n,t){return r[n]?r[n]():t},c=function(n,t){for(n=String(n);n.length<t;)n="0"+n;return n};r={d:function(){return c(r.j(),2)},D:function(){return r.l().slice(0,3)},j:function(){return e.getDate()},l:function(){return u[r.w()]+"day"},N:function(){return r.w()||7},S:function(){var n=r.j(),t=n%10;return t<=3&&1===parseInt(n%100/10,10)&&(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return e.getDay()},z:function(){var n=new Date(r.Y(),r.n()-1,r.j()),t=new Date(r.Y(),0,1);return Math.round((n-t)/864e5)},W:function(){var n=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),t=new Date(n.getFullYear(),0,4);return c(1+Math.round((n-t)/864e5/7),2)},F:function(){return u[6+r.n()]},m:function(){return c(r.n(),2)},M:function(){return r.F().slice(0,3)},n:function(){return e.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){var n=r.Y();return n%4==0&n%100!=0|n%400==0},o:function(){var n=r.n(),t=r.W();return r.Y()+(12===n&&t<9?1:1===n&&t>9?-1:0)},Y:function(){return e.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return e.getHours()>11?"pm":"am"},A:function(){return r.a().toUpperCase()},B:function(){var n=3600*e.getUTCHours(),t=60*e.getUTCMinutes(),r=e.getUTCSeconds();return c(Math.floor((n+t+r+3600)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return e.getHours()},h:function(){return c(r.g(),2)},H:function(){return c(r.G(),2)},i:function(){return c(e.getMinutes(),2)},s:function(){return c(e.getSeconds(),2)},u:function(){return c(1e3*e.getMilliseconds(),6)},e:function(){throw new Error("Not supported (see source code of date() for timezone on how to add support)")},I:function(){return new Date(r.Y(),0)-Date.UTC(r.Y(),0)!=new Date(r.Y(),6)-Date.UTC(r.Y(),6)?1:0},O:function(){var n=e.getTimezoneOffset(),t=Math.abs(n);return(n>0?"-":"+")+c(100*Math.floor(t/60)+t%60,4)},P:function(){var n=r.O();return n.substr(0,3)+":"+n.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-e.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(o,i)},r:function(){return"D, d M Y H:i:s O".replace(o,i)},U:function(){return e/1e3|0}};return function(n,t){return e=void 0===t?new Date:t instanceof Date?new Date(t):new Date(1e3*t),n.replace(o,i)}(n,t)}

/**
 *
 * @param text 转换参数now +-1 day +- 2 days +-1 week
 * @param now 默认当前时间戳
 * @returns 字符串转换时间戳
 */
function strtotime(text,now){var parsed,match,today,year,date,days,ranges,len,times,regex,i,fail=false;if(!text){return fail}text=text.replace(/^\s+|\s+$/g,"").replace(/\s{2,}/g," ").replace(/[\t\r\n]/g,"").toLowerCase();match=text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);if(match&&match[2]===match[4]){if(match[1]>1901){switch(match[2]){case"-":if(match[3]>12||match[5]>31){return fail}return new Date(match[1],parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case".":return fail;case"/":if(match[3]>12||match[5]>31){return fail}return new Date(match[1],parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000}}else{if(match[5]>1901){switch(match[2]){case"-":if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case".":if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case"/":if(match[1]>12||match[3]>31){return fail}return new Date(match[5],parseInt(match[1],10)-1,match[3],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000}}else{switch(match[2]){case"-":if(match[3]>12||match[5]>31||(match[1]<70&&match[1]>38)){return fail}year=match[1]>=0&&match[1]<=38?+match[1]+2000:match[1];return new Date(year,parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case".":if(match[5]>=70){if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000}if(match[5]<60&&!match[6]){if(match[1]>23||match[3]>59){return fail}today=new Date();return new Date(today.getFullYear(),today.getMonth(),today.getDate(),match[1]||0,match[3]||0,match[5]||0,match[9]||0)/1000}return fail;case"/":if(match[1]>12||match[3]>31||(match[5]<70&&match[5]>38)){return fail}year=match[5]>=0&&match[5]<=38?+match[5]+2000:match[5];return new Date(year,parseInt(match[1],10)-1,match[3],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case":":if(match[1]>23||match[3]>59||match[5]>59){return fail}today=new Date();return new Date(today.getFullYear(),today.getMonth(),today.getDate(),match[1]||0,match[3]||0,match[5]||0)/1000}}}}if(text==="now"){return now===null||isNaN(now)?new Date().getTime()/1000|0:now|0}if(!isNaN(parsed=Date.parse(text))){return parsed/1000|0}date=now?new Date(now*1000):new Date();days={"sun":0,"mon":1,"tue":2,"wed":3,"thu":4,"fri":5,"sat":6};ranges={"yea":"FullYear","mon":"Month","day":"Date","hou":"Hours","min":"Minutes","sec":"Seconds"};function lastNext(type,range,modifier){var diff,day=days[range];if(typeof day!=="undefined"){diff=day-date.getDay();if(diff===0){diff=7*modifier}else{if(diff>0&&type==="last"){diff-=7}else{if(diff<0&&type==="next"){diff+=7}}}date.setDate(date.getDate()+diff)}}function process(val){var splt=val.split(" "),type=splt[0],range=splt[1].substring(0,3),typeIsNumber=/\d+/.test(type),ago=splt[2]==="ago",num=(type==="last"?-1:1)*(ago?-1:1);if(typeIsNumber){num*=parseInt(type,10)}if(ranges.hasOwnProperty(range)&&!splt[1].match(/^mon(day|\.)?$/i)){return date["set"+ranges[range]](date["get"+ranges[range]]()+num)}if(range==="wee"){return date.setDate(date.getDate()+(num*7))}if(type==="next"||type==="last"){lastNext(type,range,num)}else{if(!typeIsNumber){return false}}return true}times="(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec"+"|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?"+"|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)";regex="([+-]?\\d+\\s"+times+"|"+"(last|next)\\s"+times+")(\\sago)?";match=text.match(new RegExp(regex,"gi"));if(!match){return fail}for(i=0,len=match.length;i<len;i++){if(!process(match[i])){return fail}}return(date.getTime()/1000)};

/**
 * 用字符分割microtime().split(" ")[1]
 * @returns 返回微秒
 */
function microtime(e){var n,r;return"undefined"!=typeof performance&&performance.now?(r=(performance.now()+performance.timing.navigationStart)/1e3,e?r:(n=0|r,Math.round(1e6*(r-n))/1e6+" "+n)):(r=(Date.now?Date.now():(new Date).getTime())/1e3,e?r:(n=0|r,Math.round(1e3*(r-n))/1e3+" "+n))}

/**
 * 参数格式 时,分,秒,月,日,年
 * @returns 返回日期时间戳
 */
function mktime(){var e=new Date,t=arguments,r=0,n=["Hours","Minutes","Seconds","Month","Date","FullYear"];for(r=0;r<n.length;r++)if(void 0===t[r])t[r]=e["get"+n[r]](),t[r]+=3===r;else if(t[r]=parseInt(t[r],10),isNaN(t[r]))return!1;t[5]+=t[5]>=0?t[5]<=69?2e3:t[5]<=100?1900:0:0,e.setFullYear(t[5],t[3]-1,t[4]),e.setHours(t[0],t[1],t[2]);var s=e.getTime();return(s/1e3>>0)-(s<0)}

/**
 *array_column(arr=[{"id":1,"name":"中国"},{"id":2,"name":"中国1"}],value="name",key="id")
 * @param r 数组
 * @param t 值
 * @param 指定key
 * @returns 返回数组中指定列
 */
function array_column(r,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(null!==r&&("object"===(void 0===r?"undefined":_typeof(r))||Array.isArray(r))){var e=[];if("object"===(void 0===r?"undefined":_typeof(r))){var n=[],y=!0,i=!1,a=void 0;try{for(var f,l=Object.keys(r)[Symbol.iterator]();!(y=(f=l.next()).done);y=!0){var u=f.value;n.push(r[u])}}catch(r){i=!0,a=r}finally{try{!y&&l.return&&l.return()}finally{if(i)throw a}}r=n}if(Array.isArray(r)){var c=!0,v=!1,s=void 0;try{for(var b,p=r.keys()[Symbol.iterator]();!(c=(b=p.next()).done);c=!0){var d=b.value;o&&r[d][o]?e[r[d][o]]=t?r[d][t]:r[d]:t?e.push(r[d][t]):e.push(r[d])}}catch(r){v=!0,s=r}finally{try{!c&&p.return&&p.return()}finally{if(v)throw s}}}return Object.assign({},e)}}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r};

/**
 *array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
 * @param 数组
 * @returns 返回数组中key
 */
function array_keys(r,n,a){var e=void 0!==n,o=[],t=!!a,i=!0,y="";for(y in r)r.hasOwnProperty(y)&&(i=!0,e&&(t&&r[y]!==n?i=!1:r[y]!==n&&(i=!1)),i&&(o[o.length]=y));return o}

/**
 * array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
 * @param 数组
 * @returns 返回数组中值
 */
function array_values(r){var n=[],a="";for(a in r)n[n.length]=r[a];return n}

/**
 * 取一个是字符串,多个是数组,取出的是key
 * @param 数组
 * @param 取出单元个数
 * @returns 随机取出数组单元key
 */
function array_rand(r,a){var n=Object.keys(r);if(a=void 0===a||null===a?1:+a,isNaN(a)||a<1||a>n.length)return null;for(var l=n.length-1;l>0;l--){var t=Math.floor(Math.random()*(l+1)),e=n[t];n[t]=n[l],n[l]=e}return 1===a?n[0]:n.slice(0,a)}

/**
 *array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
 * @param 数组
 * @returns 去除数组重复
 */
function array_unique(r){var n="",t={},u="";for(n in r)r.hasOwnProperty(n)&&(u=r[n],!1===function(r,n){var t="";for(t in n)if(n.hasOwnProperty(t)&&n[t]+""==r+"")return t;return!1}(u,t)&&(t[n]=u));return t}
/**
 * array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
 * @param 数组
 * @param 开始位置
 * @param 取出个数
 * @param 是否重排
 * @returns 截取数组
 */
function array_slice(r,i,e,t){var o="";if("[object Array]"!==Object.prototype.toString.call(r)||t&&0!==i){var a=0,c={};for(o in r)a+=1,c[o]=r[o];r=c,i=i<0?a+i:i,e=void 0===e?a:e<0?a+e-i:e;var n={},l=!1,f=-1,s=0,v=0;for(o in r){if(++f,s>=e)break;f===i&&(l=!0),l&&(++s,is_int(o)&&!t?n[v++]=r[o]:n[o]=r[o])}return n}return void 0===e?r.slice(i):e>=0?r.slice(i,i+e):r.slice(i,e)}

/**
 *array_search('e',["a", "b", "c", "d", "e"])
 * @param 要查找的值
 * @param 数组
 * @returns 数组中搜索指定值返回键
 */
function array_search(r,e,t){var n=!!t,i="";if("object"==typeof r&&r.exec){if(!n){var o="i"+(r.global?"g":"")+(r.multiline?"m":"")+(r.sticky?"y":"");r=new RegExp(r.source,o)}for(i in e)if(e.hasOwnProperty(i)&&r.test(e[i]))return i;return!1}for(i in e)if(e.hasOwnProperty(i)&&(n&&e[i]===r||!n&&e[i]==r))return i;return!1}

/**
 *  参数是数组
 * @returns 合并多个数组
 */
function array_merge(){var r,e=Array.prototype.slice.call(arguments),t=e.length,o={},a="",n=0,c=0,l=0,f=0,i=Object.prototype.toString,y=!0;for(l=0;l<t;l++)if("[object Array]"!==i.call(e[l])){y=!1;break}if(y){for(y=[],l=0;l<t;l++)y=y.concat(e[l]);return y}for(l=0,f=0;l<t;l++)if(r=e[l],"[object Array]"===i.call(r))for(c=0,n=r.length;c<n;c++)o[f++]=r[c];else for(a in r)r.hasOwnProperty(a)&&(parseInt(a,10)+""===a?o[f++]=r[a]:o[a]=r[a]);return o}

/**
 *
 * @param 数组
 * @param 参数1时候递归统计多维数组
 * @returns 计算数组个数
 */
function count(r,t){var n,o=0;if(null===r||void 0===r)return 0;if(r.constructor!==Array&&r.constructor!==Object)return 1;"COUNT_RECURSIVE"===t&&(t=1),1!==t&&(t=0);for(n in r)r.hasOwnProperty(n)&&(o++,1!==t||!r[n]||r[n].constructor!==Array&&r[n].constructor!==Object||(o+=count(r[n],1)));return o}

/**
 *
 * @param 值
 * @param 数组
 * @returns 判断元素是否在数组中bool
 */
function in_array(r,n,i){var f="";if(!i){for(f in n)if(n[f]==r)return!0}else for(f in n)if(n[f]===r)return!0;return!1}

/**
 *
 * @param 数组或数组对象
 * @returns 对象转换数组会丢掉key
 */
function obj2arr(array) {
    if(is_object(array)) {
        var arr = []
        for (var i in array) {
            arr.push(array[i]);
        }
        array=arr;
    } if(is_array(array)) {
        foreach(array,function(key,value){
         array[key] = obj2arr(value);
        })
    }
    return array;
}
/**
 * range('a','z') range(1,10) range('A','Z')
 * @param 开始
 * @param 结束
 * @param 步长
 * @returns 生成数组
 */
function range(r,a,N){var i,o,s=[],e=N||1,f=!1;if(isNaN(r)||isNaN(a)?isNaN(r)&&isNaN(a)?(f=!0,i=r.charCodeAt(0),o=a.charCodeAt(0)):(i=isNaN(r)?0:r,o=isNaN(a)?0:a):(i=r,o=a),!(i>o))for(;i<=o;)s.push(f?String.fromCharCode(i):i),i+=e;else for(;i>=o;)s.push(f?String.fromCharCode(i):i),i-=e;return s}

/**
 *@returns 删除变量或数组传入字符串
 */
function unset(){var i=0,arg="",win="",winRef=/^(?:this)?window[.[]/,arr=[],accessor="",bracket=/\[['"]?(\d+)['"]?\]$/;for(i=0;i<arguments.length;i++){arg=arguments[i];winRef.lastIndex=0,bracket.lastIndex=0;win=winRef.test(arg)?"":"this.window.";if(bracket.test(arg)){accessor=arg.match(bracket)[1];arr=eval(win+arg.replace(bracket,""));arr.splice(accessor,1)}else{eval("delete "+win+arg)}}};

/**
 * 正数字符1大于字符2,负数小于0
 * @param 字符1
 * @param 字符2
 * @returns 字符串比较
 */
function strcmp(b,a){return((b==a)?0:((b>a)?1:-1))};
function strnatcmp(g,f,d){var b=0;if(d==undefined){d=false}var e=function(p){var n=[];var o="";var r="";var q=0,m=0;var s=true;m=p.length;for(q=0;q<m;q++){r=p.substring(q,q+1);if(r.match(/\d/)){if(s){if(o.length>0){n[n.length]=o;o=""}s=false}o+=r}else{if((s==false)&&(r===".")&&(q<(p.length-1))&&(p.substring(q+1,q+2).match(/\d/))){n[n.length]=o;o=""}else{if(s==false){if(o.length>0){n[n.length]=parseInt(o,10);o=""}s=true}o+=r}}}if(o.length>0){if(s){n[n.length]=o}else{n[n.length]=parseInt(o,10)}}return n};var l=e(g+"");var j=e(f+"");var c=l.length;var h=true;var k=-1;var a=0;if(c>j.length){c=j.length;k=1}for(b=0;b<c;b++){if(isNaN(l[b])){if(isNaN(j[b])){h=true;if((a=strcmp(l[b],j[b]))!=0){return a}}else{if(h){return 1}else{return -1}}}else{if(isNaN(j[b])){if(h){return -1}else{return 1}}else{if(h||d){if((a=(l[b]-j[b]))!=0){return a}}else{if((a=strcmp(l[b].toString(),j[b].toString()))!=0){return a}}h=false}}}return k};

/**
 *sort(["a","b"],"SORT_STRING",true)
 * @param 数组
 * @param SORT_STRING|SORT_NUMERIC 排序类型
 * @param 默认true只排序不输出,false输出
 * @returns 数组排序
 */
function sort(inputArr,sort_flags,strictForIn=true){var valArr=[],keyArr=[],k='',i=0,sorter=false,populateArr=[];switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(a,b);};break;case'SORT_NUMERIC':sorter=function(a,b){return(a-b);};break;default:sorter=function(a,b){var aFloat=parseFloat(a),bFloat=parseFloat(b),aNumeric=aFloat+''===a,bNumeric=bFloat+''===b;if(aNumeric&&bNumeric){return aFloat>bFloat?1:aFloat<bFloat?-1:0;}else if(aNumeric&&!bNumeric){return 1;}else if(!aNumeric&&bNumeric){return-1;}return a>b?1:a<b?-1:0;};break;}populateArr=strictForIn?inputArr:populateArr;for(k in inputArr){if(inputArr.hasOwnProperty(k)){valArr.push(inputArr[k]);if(strictForIn){delete inputArr[k];}}}valArr.sort(sorter);for(i=0;i<valArr.length;i++){populateArr[i]=valArr[i];}return strictForIn||populateArr;}

/**
 *
 * @param 数组
 * @param 类型SORT_STRING|SORT_NUMERIC
 * @returns 关联数组排序返回数组
 */
function ksort(inputArr,sort_flags){return sort(inputArr,sort_flags,false);};

/**
 *
 * @param 字符
 * @returns 是否整数判断
 */
function is_int(i){return i===+i&&isFinite(i)&&!(i%1)}

/**
 *
 * @param 字符
 * @returns 是否浮点数判断
 */
function is_float(i){return!(+i!==i||isFinite(i)&&!(i%1))}

/**
 *
 * @param 变量
 * @returns 是否数组判断
 */
function is_array(t){if(!t||"object"!=typeof t)return!1;if(function(t){if(!t||"object"!=typeof t||"number"!=typeof t.length)return!1;var e=t.length;return t[t.length]="bogus",e!==t.length?(t.length-=1,!0):(delete t[t.length],!1)}(t))return!0;var e=Object.prototype.toString.call(t),n=function(t){var e=/\W*function\s+([\w$]+)\s*\(/.exec(t);return e?e[1]:"(Anonymous)"}(t.constructor);return"[object Object]"===e&&"Object"===n}

/**
 *
 * @param 变量
 * @returns 是否对象判断
 */
function is_object(t){return"[object Array]"!==Object.prototype.toString.call(t)&&(null!==t&&"object"==typeof t)}

/**
 *  @param 函数名字符串
 * @returns 判断函数是否存在
 */
function function_exists(n){var o="undefined"!=typeof window?window:global;return"string"==typeof n&&(n=o[n]),"function"==typeof n}

/**
 *
 * @param 数组或对象
 * @returns 序列化
 */
function serialize(r){var e,t,a,n="",o=0,i=function(r){var e,t,a,n,o=typeof r;if("object"===o&&!r)return"null";if("object"===o){if(!r.constructor)return"object";a=r.constructor.toString(),e=a.match(/(\w+)\(/),e&&(a=e[1].toLowerCase()),n=["boolean","number","string","array"];for(t in n)if(a==n[t]){o=n[t];break}}return o},c=i(r);switch(c){case"function":e="";break;case"boolean":e="b:"+(r?"1":"0");break;case"number":e=(Math.round(r)==r?"i":"d")+":"+r;break;case"string":e="s:"+function(r){var e=0,t=0,a=r.length,n="";for(t=0;t<a;t++)n=r.charCodeAt(t),e+=n<128?1:n<2048?2:3;return e}(r)+':"'+r+'"';break;case"array":case"object":e="a";for(t in r)if(r.hasOwnProperty(t)){if("function"===i(r[t]))continue;a=t.match(/^[0-9]+$/)?parseInt(t,10):t,n+=this.serialize(a)+this.serialize(r[t]),o++}e+=":"+o+":{"+n+"}";break;case"undefined":default:e="N"}return"object"!==c&&"array"!==c&&(e+=";"),e}
/**
 *
 * @param 字符串
 * @returns 解码序列化
 */
function unserialize(r){var e=this,n=function(r){var e=r.charCodeAt(0);return e<128?0:e<2048?1:2};return error=function(r,n,a,t){throw new e.window[r](n,a,t)},read_until=function(r,e,n){for(var a=2,t=[],i=r.slice(e,e+1);i!=n;)a+e>r.length&&error("Error","Invalid"),t.push(i),i=r.slice(e+(a-1),e+a),a+=1;return[t.length,t.join("")]},read_chrs=function(r,e,a){var t,i,u;for(u=[],t=0;t<a;t++)i=r.slice(e+(t-1),e+t),u.push(i),a-=n(i);return[u.length,u.join("")]},_unserialize=function(r,e){var n,a,t,i,u,s,o,l,c,d,f,h,_,p,w,b,k,g,v=0,I=function(r){return r};switch(e||(e=0),n=r.slice(e,e+1).toLowerCase(),a=e+2,n){case"i":I=function(r){return parseInt(r,10)},c=read_until(r,a,";"),v=c[0],l=c[1],a+=v+1;break;case"b":I=function(r){return 0!==parseInt(r,10)},c=read_until(r,a,";"),v=c[0],l=c[1],a+=v+1;break;case"d":I=function(r){return parseFloat(r)},c=read_until(r,a,";"),v=c[0],l=c[1],a+=v+1;break;case"n":l=null;break;case"s":d=read_until(r,a,":"),v=d[0],f=d[1],a+=v+2,c=read_chrs(r,a+1,parseInt(f,10)),v=c[0],l=c[1],a+=v+2,v!=parseInt(f,10)&&v!=l.length&&error("SyntaxError","String length mismatch");break;case"a":for(l={},t=read_until(r,a,":"),v=t[0],i=t[1],a+=v+2,s=parseInt(i,10),u=!0,h=0;h<s;h++)p=_unserialize(r,a),w=p[1],_=p[2],a+=w,b=_unserialize(r,a),k=b[1],g=b[2],a+=k,_!==h&&(u=!1),l[_]=g;if(u){for(o=new Array(s),h=0;h<s;h++)o[h]=l[h];l=o}a+=1;break;default:error("SyntaxError","Unknown / Unhandled data type(s): "+n)}return[n,a-e,I(l)]},_unserialize(r+"",0)[2]}
/**
 * uniqid('',true)长度23 默认13
 * @param 前缀
 * @param 是否增加长度
 * @returns 生成唯一id
 */
function uniqid(n,e){void 0===n&&(n="");var t,i=function(n,e){return n=parseInt(n,10).toString(16),e<n.length?n.slice(n.length-e):e>n.length?Array(e-n.length+1).join("0")+n:n},o="undefined"!=typeof window?window:global;o.$locutus=o.$locutus||{};var d=o.$locutus;return d.php=d.php||{},d.php.uniqidSeed||(d.php.uniqidSeed=Math.floor(123456789*Math.random())),d.php.uniqidSeed++,t=n,t+=i(parseInt((new Date).getTime()/1e3,10),8),t+=i(d.php.uniqidSeed,5),e&&(t+=(10*Math.random()).toFixed(8).toString()),t}

/**
 *
 * @param 设置变量
 * @param 变量值,数组会被转换成字符串
 * @param 过期时间戳
 * @returns 设置cookie
 */
function setcookie(name, value, expires, path, domain, secure) { if (typeof expires === 'string' && (/^\d+$/) .test(expires)) { expires = parseInt(expires, 10); }  if (expires instanceof Date) { expires = expires.toGMTString(); } else if (typeof expires === 'number') { expires = (new Date(expires * 1e3)) .toGMTString(); }  var r = [name + '=' + value], s = {}, i = ''; s = { expires: expires, path: path, domain: domain }; for (i in s) { if (s.hasOwnProperty(i)) { s[i] && r.push(i + '=' + s[i]); } }  return secure && r.push('secure'), this.window.document.cookie = r.join(';'), true; }

/**
 *
 * @param 变量
 * @returns 判断变量是否为空
 */
function empty(r){var n,t,e,f=[void 0,null,!1,0,"","0"];for(t=0,e=f.length;t<e;t++)if(r===f[t])return!0;if("object"==typeof r){for(n in r)if(r.hasOwnProperty(n))return!1;return!0}return!1}

/**
 *
 * @returns 判断变量是否存在
 */
function isset(){var r=arguments,t=r.length,n=0;if(0===t)throw new Error("Empty isset");for(;n!==t;){if(void 0===r[n]||null===r[n])return!1;n++}return!0}

/**
 *
 * @param 变量
 * @param 进制,默认十进制
 * @returns 转换成整型
 */
function intval(i,t){var n,a,e=typeof i;return"boolean"===e?+i:"string"===e?(0===t&&(a=i.match(/^\s*0(x?)/i),t=a?a[1]?16:8:10),n=parseInt(i,t||10),isNaN(n)||!isFinite(n)?0:n):"number"===e&&isFinite(i)?i<0?Math.ceil(i):Math.floor(i):0}

/**
 *
 * @param 变量
 * @returns 转换成浮点型
 */
function floatval(a){return parseFloat(a)||0}

/**
 *
 * @param 变量
 * @returns md5加密
 */
function md5(C){var D;var w=function(b,a){return(b<<a)|(b>>>(32-a))};var H=function(k,b){var V,a,d,x,c;d=(k&2147483648);x=(b&2147483648);V=(k&1073741824);a=(b&1073741824);c=(k&1073741823)+(b&1073741823);if(V&a){return(c^2147483648^d^x)}if(V|a){if(c&1073741824){return(c^3221225472^d^x)}else{return(c^1073741824^d^x)}}else{return(c^d^x)}};var r=function(a,c,b){return(a&c)|((~a)&b)};var q=function(a,c,b){return(a&b)|(c&(~b))};var p=function(a,c,b){return(a^c^b)};var n=function(a,c,b){return(c^(a|(~b)))};var u=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(r(V,aa,Z),k),Y));return H(w(W,X),V)};var f=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(q(V,aa,Z),k),Y));return H(w(W,X),V)};var F=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(p(V,aa,Z),k),Y));return H(w(W,X),V)};var t=function(W,V,aa,Z,k,X,Y){W=H(W,H(H(n(V,aa,Z),k),Y));return H(w(W,X),V)};var e=function(V){var W;var d=V.length;var c=d+8;var b=(c-(c%64))/64;var x=(b+1)*16;var X=new Array(x-1);var a=0;var k=0;while(k<d){W=(k-(k%4))/4;a=(k%4)*8;X[W]=(X[W]|(V.charCodeAt(k)<<a));k++}W=(k-(k%4))/4;a=(k%4)*8;X[W]=X[W]|(128<<a);X[x-2]=d<<3;X[x-1]=d>>>29;return X};var s=function(d){var a="",b="",k,c;for(c=0;c<=3;c++){k=(d>>>(c*8))&255;b="0"+k.toString(16);a=a+b.substr(b.length-2,2)}return a};var E=[],L,h,G,v,g,U,T,S,R,O=7,M=12,J=17,I=22,B=5,A=9,z=14,y=20,o=4,m=11,l=16,j=23,Q=6,P=10,N=15,K=21;C=this.utf8_encode(C);E=e(C);U=1732584193;T=4023233417;S=2562383102;R=271733878;D=E.length;for(L=0;L<D;L+=16){h=U;G=T;v=S;g=R;U=u(U,T,S,R,E[L+0],O,3614090360);R=u(R,U,T,S,E[L+1],M,3905402710);S=u(S,R,U,T,E[L+2],J,606105819);T=u(T,S,R,U,E[L+3],I,3250441966);U=u(U,T,S,R,E[L+4],O,4118548399);R=u(R,U,T,S,E[L+5],M,1200080426);S=u(S,R,U,T,E[L+6],J,2821735955);T=u(T,S,R,U,E[L+7],I,4249261313);U=u(U,T,S,R,E[L+8],O,1770035416);R=u(R,U,T,S,E[L+9],M,2336552879);S=u(S,R,U,T,E[L+10],J,4294925233);T=u(T,S,R,U,E[L+11],I,2304563134);U=u(U,T,S,R,E[L+12],O,1804603682);R=u(R,U,T,S,E[L+13],M,4254626195);S=u(S,R,U,T,E[L+14],J,2792965006);T=u(T,S,R,U,E[L+15],I,1236535329);U=f(U,T,S,R,E[L+1],B,4129170786);R=f(R,U,T,S,E[L+6],A,3225465664);S=f(S,R,U,T,E[L+11],z,643717713);T=f(T,S,R,U,E[L+0],y,3921069994);U=f(U,T,S,R,E[L+5],B,3593408605);R=f(R,U,T,S,E[L+10],A,38016083);S=f(S,R,U,T,E[L+15],z,3634488961);T=f(T,S,R,U,E[L+4],y,3889429448);U=f(U,T,S,R,E[L+9],B,568446438);R=f(R,U,T,S,E[L+14],A,3275163606);S=f(S,R,U,T,E[L+3],z,4107603335);T=f(T,S,R,U,E[L+8],y,1163531501);U=f(U,T,S,R,E[L+13],B,2850285829);R=f(R,U,T,S,E[L+2],A,4243563512);S=f(S,R,U,T,E[L+7],z,1735328473);T=f(T,S,R,U,E[L+12],y,2368359562);U=F(U,T,S,R,E[L+5],o,4294588738);R=F(R,U,T,S,E[L+8],m,2272392833);S=F(S,R,U,T,E[L+11],l,1839030562);T=F(T,S,R,U,E[L+14],j,4259657740);U=F(U,T,S,R,E[L+1],o,2763975236);R=F(R,U,T,S,E[L+4],m,1272893353);S=F(S,R,U,T,E[L+7],l,4139469664);T=F(T,S,R,U,E[L+10],j,3200236656);U=F(U,T,S,R,E[L+13],o,681279174);R=F(R,U,T,S,E[L+0],m,3936430074);S=F(S,R,U,T,E[L+3],l,3572445317);T=F(T,S,R,U,E[L+6],j,76029189);U=F(U,T,S,R,E[L+9],o,3654602809);R=F(R,U,T,S,E[L+12],m,3873151461);S=F(S,R,U,T,E[L+15],l,530742520);T=F(T,S,R,U,E[L+2],j,3299628645);U=t(U,T,S,R,E[L+0],Q,4096336452);R=t(R,U,T,S,E[L+7],P,1126891415);S=t(S,R,U,T,E[L+14],N,2878612391);T=t(T,S,R,U,E[L+5],K,4237533241);U=t(U,T,S,R,E[L+12],Q,1700485571);R=t(R,U,T,S,E[L+3],P,2399980690);S=t(S,R,U,T,E[L+10],N,4293915773);T=t(T,S,R,U,E[L+1],K,2240044497);U=t(U,T,S,R,E[L+8],Q,1873313359);R=t(R,U,T,S,E[L+15],P,4264355552);S=t(S,R,U,T,E[L+6],N,2734768916);T=t(T,S,R,U,E[L+13],K,1309151649);U=t(U,T,S,R,E[L+4],Q,4149444226);R=t(R,U,T,S,E[L+11],P,3174756917);S=t(S,R,U,T,E[L+2],N,718787259);T=t(T,S,R,U,E[L+9],K,3951481745);U=H(U,h);T=H(T,G);S=H(S,v);R=H(R,g)}var i=s(U)+s(T)+s(S)+s(R);return i.toLowerCase()};

/**
 *
 * @param 变量
 * @returns sha1签名
 */
function sha1(r){var c=function(w,j){var i=(w<<j)|(w>>>(32-j));return i};var s=function(y){var x="";var w;var j;for(w=7;w>=0;w--){j=(y>>>(w*4))&15;x+=j.toString(16)}return x};var f;var u,t;var b=new Array(80);var l=1732584193;var h=4023233417;var g=2562383102;var e=271733878;var d=3285377520;var q,p,o,n,m;var v;r=unescape(encodeURIComponent(r));var a=r.length;var k=[];for(u=0;u<a-3;u+=4){t=r.charCodeAt(u)<<24|r.charCodeAt(u+1)<<16|r.charCodeAt(u+2)<<8|r.charCodeAt(u+3);k.push(t)}switch(a%4){case 0:u=2147483648;break;case 1:u=r.charCodeAt(a-1)<<24|8388608;break;case 2:u=r.charCodeAt(a-2)<<24|r.charCodeAt(a-1)<<16|32768;break;case 3:u=r.charCodeAt(a-3)<<24|r.charCodeAt(a-2)<<16|r.charCodeAt(a-1)<<8|128;break}k.push(u);while((k.length%16)!=14){k.push(0)}k.push(a>>>29);k.push((a<<3)&4294967295);for(f=0;f<k.length;f+=16){for(u=0;u<16;u++){b[u]=k[f+u]}for(u=16;u<=79;u++){b[u]=c(b[u-3]^b[u-8]^b[u-14]^b[u-16],1)}q=l;p=h;o=g;n=e;m=d;for(u=0;u<=19;u++){v=(c(q,5)+((p&o)|(~p&n))+m+b[u]+1518500249)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}for(u=20;u<=39;u++){v=(c(q,5)+(p^o^n)+m+b[u]+1859775393)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}for(u=40;u<=59;u++){v=(c(q,5)+((p&o)|(p&n)|(o&n))+m+b[u]+2400959708)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}for(u=60;u<=79;u++){v=(c(q,5)+(p^o^n)+m+b[u]+3395469782)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}l=(l+q)&4294967295;h=(h+p)&4294967295;g=(g+o)&4294967295;e=(e+n)&4294967295;d=(d+m)&4294967295}v=s(l)+s(h)+s(g)+s(e)+s(d);return v.toLowerCase()};
/**
 * @returns 打印变量
 */
function log(arr){console.log(arr);}
/**
 *
 * @param 变量
 * @returns 打印数组
 */
function dump(r,n){var  echo=function(){var o=Array.prototype.slice.call(arguments);return console.log(o.join(" "))};var t="",o=function(r,n){for(var t="",o=0;o<r;o++)t+=n;return t},e=function(r,n,t,c){n>0&&n++;var i=o(t*n,c),u=o(t*(n+1),c),a="";if("object"==typeof r&&null!==r&&r.constructor){a+="Array\n"+i+"(\n";for(var f in r)"[object Array]"===Object.prototype.toString.call(r[f])?(a+=u,a+="[",a+=f,a+="] => ",a+=e(r[f],n+1,t,c)):(a+=u,a+="[",a+=f,a+="] => ",a+=r[f],a+="\n");a+=i+")\n"}else a=null===r||void 0===r?"":r.toString();return a};return t=e(r,0,4," "),!0!==n?(echo(t),!0):t}

/**
 *
 * @param 字符串
 * @param 要去除的字符,默认为空格
 * @returns 去除两边空格
 */
function trim(r,n){var t=[" ","\n","\r","\t","\f","\v"," "," "," "," "," "," "," "," "," "," "," "," ","​","\u2028","\u2029","　"].join(""),e=0,i=0;for(r+="",n&&(t=(n+"").replace(/([[\]().?\/*{}+$^:])/g,"$1")),e=r.length,i=0;i<e;i++)if(-1===t.indexOf(r.charAt(i))){r=r.substring(i);break}for(e=r.length,i=e-1;i>=0;i--)if(-1===t.indexOf(r.charAt(i))){r=r.substring(0,i+1);break}return-1===t.indexOf(r.charAt(0))?r:""}

/**
 *
 * @param 字符串
 * @param 要去除的字符
 * @returns 去除右边空格
 */
function rtrim(e,r){return r=r?(r+"").replace(/([[\]().?\/*{}+$^:])/g,"\\$1"):" \\s ",(e+"").replace(new RegExp("["+r+"]+$","g"),"")}
/**
 *
 * @param 字符串
 * @param 要去除的字符
 * @returns 去除左边空格
 */
function ltrim(e,r){return r=r?(r+"").replace(/([[\]().?\/*{}+$^:])/g,"$1"):" \\s ",(e+"").replace(new RegExp("^["+r+"]+","g"),"")}
/**
 *
 * @param 字符串
 * @returns 删除多个空格只保留一个
 */
function strtrim(a){return a.replace(/\s+/g," ");};

/**
 *str_replace("a","我","来自于a")
 * @param 要查找的字符
 * @param 要替换的字符
 * @param 字符串
 * @returns 字符串替换
 */
function str_replace(t,o,e,c){var r=0,l=0,n="",a="",i=0,p=0,u=[].concat(t),f=[].concat(o),g=e,y="[object Array]"===Object.prototype.toString.call(f),b="[object Array]"===Object.prototype.toString.call(g);g=[].concat(g);var j="undefined"!=typeof window?window:global;j.$locutus=j.$locutus||{};var v=j.$locutus;if(v.php=v.php||{},"object"==typeof t&&"string"==typeof o){for(n=o,o=[],r=0;r<t.length;r+=1)o[r]=n;n="",f=[].concat(o),y="[object Array]"===Object.prototype.toString.call(f)}for(void 0!==c&&(c.value=0),r=0,i=g.length;r<i;r++)if(""!==g[r])for(l=0,p=u.length;l<p;l++)n=g[r]+"",a=y?void 0!==f[l]?f[l]:"":f[0],g[r]=n.split(u[l]).join(a),void 0!==c&&(c.value+=n.split(u[l]).length-1);return b?g:g[0]}

/**
 *
 * @param 字符串
 * @param 保留的标签
 * @returns 去除html标签
 */
function strip_tags(input,allowed){allowed=(((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");var tags=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags,"").replace(tags,function($0,$1){return allowed.indexOf("<"+$1.toLowerCase()+">")>-1?$0:""})};

/**
 *
 * @param 字符串
 * @returns 计算字符串长度
 */
function strlen(t){var n=t+"";return n.length}
/**
 * @param 字符串
 * @returns 转换大写
 */
function strtolower(t){return(t+"").toLowerCase()}
/**
 * @param 字符串
 * @returns 转换小写
 */
function strtoupper(t){return(t+"").toUpperCase()}
/**
 * @param 字符串
 * @returns 转换首字母大写
 */
function ucfirst(t){return t+="",t.charAt(0).toUpperCase()+t.substr(1)}

/**
 * var1 =1;  var2 = 'vanvs'; c=compact('var1', 'var2');必须全局变量
 * @returns 变量组成数组
 */
function compact(){var t="undefined"!=typeof window?window:global,o={};return function n(r){var e=0,c=r.length,i="";for(e=0;e<c;e++)i=r[e],"[object Array]"===Object.prototype.toString.call(i)?n(i):void 0!==t[i]&&(o[i]=t[i]);return!0}(arguments),o}

/**
 * explode(" ","我 哎 你")
 * @param 分割符号
 * @param 字符串
 * @returns 字符串转换成数组
 */
function explode(e,t,n){if(arguments.length<2||void 0===e||void 0===t)return null;if(""===e||!1===e||null===e)return!1;if("function"==typeof e||"object"==typeof e||"function"==typeof t||"object"==typeof t)return{0:""};!0===e&&(e="1"),e+="",t+="";var o=t.split(e);return void 0===n?o:(0===n&&(n=1),n>0?n>=o.length?o:o.slice(0,n-1).concat([o.slice(n-1).join(e)]):-n>=o.length?[]:(o.splice(o.length+n),o))}

/**
 *implode(",",[1,2,3])
 * @param 分隔符
 * @param 数组
 * @returns 数组转换字符串
 */
function implode(t,r){var e="",o="",n="";if(1===arguments.length&&(r=t,t=""),"object"==typeof r){if("[object Array]"===Object.prototype.toString.call(r))return r.join(t);for(e in r)o+=n+r[e],n=t;return o}return r}

/**
 *str2arr('1-2-3','-') str2arr([1,2,3],'-')
 * @returns 字符串与数组相互转换
 */
function str2arr(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[1,2],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",";return is_array(r)?implode(e,r):explode(e,r)}

/**
 * json2str({a:1,b:"测试"})
 * @param json对象
 * @returns json对象转换字符串
 */
function json2str(str){return JSON.stringify(str);};

/**
 * str2json("{\"a\":1,\"b\":\"测试\"}")
 * @param str
 * @returns json字符串转换对象
 */
function str2json(str){return JSON.parse(str);};
/**
 * @param html字符串
 * @returns html转换实体
 */
function htmlencode(sStr){ var htmlspecialchars = function(e,E,T,_){var r=0,t=0,a=!1;("undefined"==typeof E||null===E)&&(E=2),e=e.toString(),_!==!1&&(e=e.replace(/&/g,"&amp;")),e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;");var N={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(0===E&&(a=!0),"number"!=typeof E){for(E=[].concat(E),t=0;t<E.length;t++)0===N[E[t]]?a=!0:N[E[t]]&&(r|=N[E[t]]);E=r}return E&N.ENT_HTML_QUOTE_SINGLE&&(e=e.replace(/'/g,"&#039;")),a||(e=e.replace(/"/g,"&quot;")),e};return htmlspecialchars(sStr);};
/**
 * @param html字符串
 * @returns html实体还原
 */
function htmldecode(sStr){var htmlspecialchars_decode= function(e,E){var T=0,_=0,r=!1;"undefined"==typeof E&&(E=2),e=e.toString().replace(/&lt;/g,"<").replace(/&gt;/g,">");var t={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(0===E&&(r=!0),"number"!=typeof E){for(E=[].concat(E),_=0;_<E.length;_++)0===t[E[_]]?r=!0:t[E[_]]&&(T|=t[E[_]]);E=T}return E&t.ENT_HTML_QUOTE_SINGLE&&(e=e.replace(/&#0*39;/g,"'")),r||(e=e.replace(/&quot;/g,'"')),e=e.replace(/&amp;/g,"&")};return htmlspecialchars_decode(sStr)};
/**
 *$_GET('qq')
 * @param 变量字符
 * @returns 获取url变量值
 */
function $_GET(c){var e=c+"=",b=window.location.href,h=b.indexOf("?"),b=b.slice(h+1),a=b.split("&"),d=0,f="",g=a.length;for(d=0;d<g;d++){var f=a[d];if(f.indexOf(e)===0){return decodeURIComponent(f.slice(e.length).replace(/\+/g,"%20"))}}return null};
/**
 * $_COOKIE('a')
 * @param 名称
 * @returns 读取cookie
 */
function $_COOKIE(b){var d=0,g="",f=b+"=",a=document.cookie.split(";"),e=a.length;for(d=0;d<e;d++){g=a[d].replace(/^ */,"");if(g.indexOf(f)===0){return decodeURIComponent(g.slice(f.length).replace(/\+/g,"%20"))}}return null};
/**
 *foreach([1,2,3,4],function(k,v){log(v);})
 * @param 数组
 * @param 处理方法函数
 * @returns 循环输出
 */
function foreach(a,d){var b,c,e;if(a&&typeof a==="object"&&a.change_key_case){return a.foreach(d)}if(typeof this.Iterator!=="undefined"){var c=this.Iterator(a);if(d.length===1){for(e in c){d(e[1])}}else{for(e in c){d(e[0],e[1])}}}else{if(d.length===1){for(b in a){if(a.hasOwnProperty(b)){d(a[b])}}}else{for(b in a){if(a.hasOwnProperty(b)){d(b,a[b])}}}}};

/**
 * preg_match('a','abc') true
 * @param 正则
 * @param 匹配字符
 * @returns 正则匹配是否存在
 */
function preg_match(e,t){return new RegExp(e).test(t)}
/**
 * preg_replace(/N/,"32","分数是N分")
 * @param 正则
 * @param 替换的内容
 * @param 字符串
 * @param 次数
 * @returns 正则替换
 */
function preg_replace(pattern,replacement,subject,limit){if(typeof limit==='undefined')limit=-1;if(subject.match(eval(pattern))){if(limit==-1){return subject.replace(eval(pattern+'g'),replacement);}else{for(x=0;x<limit;x++){subject=subject.replace(eval(pattern),replacement);}return subject;}}else{return subject;}}
/**
 * @param base64编码
 * @returns base64还原
 */
function base64_decode(n){var r=function(n){return decodeURIComponent(n.split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""))};if("undefined"==typeof window)return new Buffer(n,"base64").toString("utf-8");if(void 0!==window.atob)return r(window.atob(n));var e,t,o,i,d,f,a,c,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",h=0,w=0,C="",g=[];if(!n)return n;n+="";do{i=u.indexOf(n.charAt(h++)),d=u.indexOf(n.charAt(h++)),f=u.indexOf(n.charAt(h++)),a=u.indexOf(n.charAt(h++)),c=i<<18|d<<12|f<<6|a,e=c>>16&255,t=c>>8&255,o=255&c,g[w++]=64===f?String.fromCharCode(e):64===a?String.fromCharCode(e,t):String.fromCharCode(e,t,o)}while(h<n.length);return C=g.join(""),r(C.replace(/\0+$/,""))}
/**
 * @param 字符串
 * @returns base64编码
 */
function base64_encode(e){var r=function(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,r){return String.fromCharCode("0x"+r)})};if("undefined"==typeof window)return new Buffer(e).toString("base64");if(void 0!==window.btoa)return window.btoa(r(e));var n,t,o,i,a,c,d,f,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u=0,w=0,A="",l=[];if(!e)return e;e=r(e);do{n=e.charCodeAt(u++),t=e.charCodeAt(u++),o=e.charCodeAt(u++),f=n<<16|t<<8|o,i=f>>18&63,a=f>>12&63,c=f>>6&63,d=63&f,l[w++]=h.charAt(i)+h.charAt(a)+h.charAt(c)+h.charAt(d)}while(u<e.length);A=l.join("");var C=e.length%3;return(C?A.slice(0,C-3):A)+"===".slice(C||3)}
/**
*  @param 字符串
 * @returns URL编码
 */
function urlencode(e){return e+="",encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/~/g,"%7E").replace(/%20/g,"+")}
/**
 *
 * @param 字符串
 * @returns  URL解码
 */
function urldecode(e){return decodeURIComponent((e+"").replace(/%(?![\da-f]{2})/gi,function(){return"%25"}).replace(/\+/g,"%20"))}
/**
 * @returns unicode解码表情中文
 */
function unicode_decode(e){return e=e.replace(/\\/g,"%"),unescape(e)}
/**
 * @param 字符串
 * @param 是否中文也编码
 * @returns unicode编码中文表情
 */
function unicode_encode(n){if(1==(arguments.length>1&&void 0!==arguments[1]&&arguments[1])){for(var r=[],t=0;t<n.length;t++)r[t]=("00"+n.charCodeAt(t).toString(16)).slice(-4);return"\\u"+r.join("\\u")}var e=function(n){for(var r=[],t=0;t<n.length;t++)r[t]=("00"+n.charCodeAt(t).toString(16)).slice(-4);return"\\u"+r.join("\\u")},u=/[\ud800-\udbff][\udc00-\udfff]/g;return n=n.replace(u,function(n){return 2===n.length?e(n):n})}
/**
 * @param 字符串 emoji_encode("😋😘我们")
 * @returns 编码emoji
 */
function emoji_encode(e){var n=/[\ud800-\udbff][\udc00-\udfff]/g;return e=e.replace(n,function(e){var n,r;return 2===e.length?(n=e.charCodeAt(0),r=e.charCodeAt(1),"&#"+(1024*(n-55296)+65536+r-56320)+";"):e})}
/**
 * emoji_decode("&#128523;&#128536;我们")
 * @param 字符串
 * @returns 解码emoji仅js中需要
 */
function emoji_decode(e){var n=/\&#.*?;/g;return e.replace(n,function(e){var n,r,t;return 9==e.length?(t=parseInt(e.match(/[0-9]+/g)),n=Math.floor((t-65536)/1024)+55296,r=(t-65536)%1024+56320,unescape("%u"+n.toString(16)+"%u"+r.toString(16))):e})}
/**
 *base_convert(1234,10,2)10进制转2进制
 * @param 数字
 * @param 原进制
 * @param 新进制
 * @returns 任意进制转换
 */
function base_convert(n,t,r){return parseInt(n+"",0|t).toString(0|r)}
/**
 * 证书+1 负数取本身 -3.23 得-3
 * @param 数字
 * @returns 进1法取整
 */
function ceil(c){return Math.ceil(c)}
/**
 * 正数取整 负数+1取整 -3.2得4
 * @param 数字
 * @returns 舍去取整
 */
function floor(o){return Math.floor(o)}
/**
 *number_format('150.456', 2, '.', ',')
 * @param 数字
 * @param 保留小数位数
 * @param 小数点显示符号
 * @param 千分位符号
 * @returns 格式化数字
 */
function number_format(e,n,t,i){e=(e+"").replace(/[^0-9+\-Ee.]/g,"");var r=isFinite(+e)?+e:0,o=isFinite(+n)?Math.abs(n):0,a=void 0===i?",":i,d=void 0===t?".":t,u="";return u=(o?function(e,n){if(-1===(""+e).indexOf("e"))return+(Math.round(e+"e+"+n)+"e-"+n);var t=(""+e).split("e"),i="";return+t[1]+n>0&&(i="+"),(+(Math.round(+t[0]+"e"+i+(+t[1]+n))+"e-"+n)).toFixed(n)}(r,o).toString():""+Math.round(r)).split("."),u[0].length>3&&(u[0]=u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,a)),(u[1]||"").length<o&&(u[1]=u[1]||"",u[1]+=new Array(o-u[1].length+1).join("0")),u.join(d)}
/**
 * 可以不要参数
 * @param 最小
 * @param 最大
 * @returns 生成更好随机数
 */
function mt_rand(r,e){var n=arguments.length;if(0===n)r=0,e=2147483647;else{if(1===n)throw new Error("Warning: mt_rand() expects exactly 2 parameters, 1 given");r=parseInt(r,10),e=parseInt(e,10)}return Math.floor(Math.random()*(e-r+1))+r}
/**
 * 可以不要参数
 * @param 最小
 * @param 最大
 * @returns 生成随机数
 */
function rand(r,e){var n=arguments.length;if(0===n)r=0,e=2147483647;else if(1===n)throw new Error("Warning: rand() expects exactly 2 parameters, 1 given");return Math.floor(Math.random()*(e-r+1))+r}
/**
 *
 * @param 数字
 * @param 保留位数
 * @returns 四舍五入
 */
function round(a,r,_){var e,t,o,D;if(r|=0,e=Math.pow(10,r),a*=e,D=a>0|-(a<0),o=a%1==.5*D,t=Math.floor(a),o)switch(_){case"PHP_ROUND_HALF_DOWN":a=t+(D<0);break;case"PHP_ROUND_HALF_EVEN":a=t+t%2*D;break;case"PHP_ROUND_HALF_ODD":a=t+!(t%2);break;default:a=t+(D>0)}return(o?a:Math.round(a))/e}
/**
 *strcut("我爱中国人",4,"...")
 * @param 字符串
 * @param 长度中文汉字算两个
 * @param 显示符号
 * @returns 字符串截取
 */
function strcut(str,iMaxBytes,sSuffix){if(isNaN(iMaxBytes)){return str}if(strlen(str)<=iMaxBytes){return str}var i=0,bytes=0;for(;i<str.length&&bytes<iMaxBytes;++i,++bytes){if(str.charCodeAt(i)>255){++bytes}}sSuffix=sSuffix||"";return(bytes-iMaxBytes==1?str.substr(0,i-1):str.substr(0,i))+sSuffix};
/**
 * @param 字符串
 * @param 子字符串
 * @returns 查找字符串
 */
function strfind(string, find) {return !(string.indexOf(find)=== -1);};
/**
 * date_eq('2019-10-22','2019-10-21') true
 * @param 前日期
 * @param 后日期
 * @returns 判断日期是否前边大于后边
 */
function date_eq(strDate1,strDate2){var date1=new Date(strDate1.replace(/\-/g,"\/"));var date2=new Date(strDate2.replace(/\-/g,"\/"));if((date1-date2)>=0){return true;}else{return false;}}
/**
 * @param 时间戳10位
 * @returns 格式化时间
 */
function timeline(tt){var today=new Date();var d=new Date(tt*1000);var m=today.getTime()-d.getTime();if(m<=0){m=1000}if(m<60*1000){return Math.floor(m/1000)+"秒前"}else{if(m<60*60*1000){return Math.floor(m/(1000*60))+"分钟前"}else{if(m<60*60*1000*24){return Math.floor(m/(1000*60*60))+"小时前"}else{if(m<60*60*1000*24*7){return Math.floor(m/(1000*60*60*24))+"天前"}else{if(m<60*60*1000*24*7*56){return Math.floor(m/(1000*60*60*24*7))+"周前"}else{return Math.floor(m/(1000*60*60*24*7*52))+"年前"}}}}}};
/**
 * @param str1
 * @param str2
 * @returns 判断两个字符串是否相等
 */
var is_eq=function(str1,str2){if(str1==str2){return(true)}else{return(false)}};
/**
 *
 * @param num
 * @returns 判断是否数字
 */
var is_num=function(num){var reg=new RegExp("^[0-9]*$");return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否手机号
 */
var is_phone=function(num){var reg=/^1\d{10}$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否QQ
 */
var is_qq=function(num){var reg=/^[1-utf8_decode]{1}\d{4,11}$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否邮箱
 */
var is_email=function(num){var reg=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否身份证
 */
var is_id=function(num){var reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否中文
 */
var is_chinese=function(num){var reg=/[\u4e00-\u9fa5]/g;return reg.test(num)};
/**
 * @param num 数字字母组成,下划钱字母开头
 * @returns 判断是否符合注册用户名
 */
var is_reg=function(num){var reg=/^([a-zA-z_]{1})([\w]*)$/g;return reg.test(num)};
/**
 *
 * @param str
 * @returns 判断是否电话
 */
var is_tel=function(str){var reg=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;return reg.test(str)};
/**
 *
 * @param strIP
 * @returns 判断是否是IP
 */
var is_ip=function(strIP){if(isNull(strIP)){return false}var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;if(re.test(strIP)){if(RegExp.$1<256&&RegExp.$2<256&&RegExp.$3<256&&RegExp.$4<256){return true}}return false};
/**
 *
 * @param str
 * @returns 判断是否邮编
 */
var is_zipcode=function(str){var reg=/^(\d){6}$/;return reg.test(str)};
/**
 *
 * @param str
 * @returns 判断是否英文
 */
var is_english=function(str){var reg=/^[A-Za-z]+$/;return reg.test(str)};
/**
 *
 * @param str
 * @returns 判断是否是URL
 */
var is_url=function(url){ var strRegex =/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;var re = new RegExp(strRegex);return re.test(url);};
/**
 *
 * @param 整数
 * @param 最小
 * @param 最大
 * @returns 判断是否在两个整数内
 */
var in_int=function(n,iMin,iMax){if(!isFinite(n)){return false}if(!/^[+-]?\d+$/.test(n)){return false}if(iMin!=undefined&&parseInt(n)<parseInt(iMin)){return false}if(iMax!=undefined&&parseInt(n)>parseInt(iMax)){return false}return true};
/**
 *
 * @param 浮点数
 * @param 最小
 * @param 最大
 * @returns 判断是否在两个浮点数之内
 */
var in_float=function(n,fMin,fMax){if(!isFinite(n)){return false}if(fMin!=undefined&&parseFloat(n)<parseFloat(fMin)){return false}if(fMax!=undefined&&parseFloat(n)>parseFloat(fMax)){return false}return true};
/**
 *
 * @param url
 * @returns 判断是否http
 */
var is_http=function(url){if(url.indexOf("http://")===-1&&url.indexOf("https://")===-1){return false}return true};

/**
 *
 * @param 数字
 * @returns 判断是否金额
 */
function is_money(n){return!!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(n)}

/**
 * 类型 info success warn 没有url close自动关闭 goto跳转弹出 gopage跳转页面
 * 提示语
 * URL
 * @returns 弹出框
 */
function msg(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"info",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";"close"==e?(""!=i&&alert(i),document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.call("closeWindow")})):"gopage"==e?(i=""==i?"":i,document.write("<meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=0'><div style='font-size:16px;margin:30px auto;text-align:center;'>"+i+"</div>"),""!=t&&(location.href=t)):"goto"==e?(""==i||alert(i),""==t||(location.href=t)):"info"!=e&&"success"!=e&&"warn"!=e||(document.write("<meta charset='utf-8'><title>提示</title><meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0'><link rel='stylesheet'  href='https://res.wx.qq.com/open/libs/weui/0.4.3/weui.min.css'><div class='weui_msg'><div class='weui_icon_area'><i class='weui_icon_"+e+" weui_icon_msg'></i></div><div class='weui_text_area'><h4 class='weui_msg_title'>"+i+"</h4></div></div>"),document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.call("hideOptionMenu")}))}
/**
 *
 * @param 获取id
 * @param json数据
 * @returns 模板解析函数
 */
function tpl(a,d){var c=function(l){var j,h=[],g=[];for(j in l){h.push(j);g.push(l[j])}return(new Function(h,c.$)).apply(l,g)};if(!c.$){var f=a.split("<%");c.$="var $=''";for(var b=0;b<f.length;b++){var e=f[b].split("%>");if(b!=0){c.$+="="==e[0].charAt(0)?"+("+e[0].substr(1)+")":";"+e[0].replace(/\r\n/g,"")+"$=$"}c.$+="+'"+e[e.length-1].replace(/\'/g,"\\'").replace(/\r\n/g,"\\n").replace(/\n/g,"\\n").replace(/\r/g,"\\n")+"'"}c.$+=";return $;"}return d?c(d):c};
/**
 *
 * @returns 全局浏览器变量
 */
var browser={version:function(){var u=navigator.userAgent.toLowerCase(),app=navigator.appVersion;return{ie:u.indexOf("trident")>-1,opera:u.indexOf("tresto")>-1,webKit:u.indexOf("applewebkit")>-1,firefox:u.indexOf("gecko")>-1&&u.indexOf("khtml")==-1,mobile:!!u.match(/applewebkit.*mobile.*/),ios:!!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),android:u.indexOf("android")>-1||u.indexOf("linux")>-1,iphone:u.indexOf("iphone")>-1,ipad:u.indexOf("ipad")>-1,weixin:u.match(/micromessenger/i)=="micromessenger"}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase(),wifi:!function(t){var e=!0,n=t.navigator.userAgent,i=t.navigator.connection;if(/MicroMessenger/.test(n))if(/NetType/.test(n)){var o=n.match(/NetType\/(\S)+/)[0].replace("NetType/","");o&&"WIFI"!=o&&(e=!1)}else document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.invoke("getNetworkType",{},function(t){"network_type:wifi"!=t.err_msg&&(e=!1)})});else if(i){var a=i.type;"wifi"!=a&&"2"!=a&&"unknown"!=a&&(e=!1)}t.wifi=e}(window)};

/**
 *
 * @returns 显示全部函数
 */
function fn(){var o="",t=[],n={};for(o in this.window)try{if("function"==typeof this.window[o])n[o]||(n[o]=1,t.push(o));else if("object"===_typeof(this.window[o]))for(var i in this.window[o])"function"==typeof this.window[i]&&this.window[i]&&!n[i]&&(n[i]=1,t.push(i))}catch(o){}return t}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};
/**
 * ls.set("text", "this is string",3*1000);
 * ls.get("text")
 * ls.remove("a")
 * ls.clear()
 * @returns localStorage带过期
 */
!function(e){var t={};e.localStorage?t.support=!0:t.support=!1,t.set=function(e,o,i){if(this.support){if("string"!=typeof e)return;if(i){if("number"!=typeof i)return;i=parseInt(i)+(new Date).getTime()}else i=null;var r={value:JSON.stringify(o),time:i};localStorage.setItem(e,JSON.stringify(r))}else t.setCookie(e,o,i)},t.get=function(e){if(this.support){var o=JSON.parse(localStorage.getItem(e));return o?o.time&&o.time<(new Date).getTime()?(localStorage.removeItem(e),null):JSON.parse(o.value):null}t.getCookie(e)},t.remove=function(e){this.support?localStorage.removeItem(e):t.removeCookie(e)},t.clear=function(){this.support?localStorage.clear():t.clearCookie()},t.setCookie=function(e,t,o){if("string"==typeof e){"number"!=typeof o&&(o=31536e6);var i=new Date;i.setTime(i.getTime()+o),document.cookie=e+"="+t+"; expires="+i.toGMTString()}},t.getCookie=function(e){for(var t,o=document.cookie.split(";"),i=0;i<o.length;i++)if(e==o[i].split("=")[0]){t=o[i].split("=")[1];break}return t},t.removeCookie=function(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"},t.clearCookie=function(){for(var e=document.cookie.split(";"),t=0;t<e.length;t++)document.cookie=e[t].split("=")[0]+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"},e.ls=t}(window);
/**
 *
 * @param 0未知 1男 2女
 * @returns 返回性别名称
 */
function sex(sex=0){const arr=['未知','男','女'];return arr[sex];}
/**
 * @param 字符
 * @returns 隐藏银行号码
 */
function hidebank(s="6217995510035399947"){return s.replace(/^(\d{8})\d+(\d{4})$/,"$1*******$2");}
/**
 * @param 字符串
 * @returns 隐藏手机号中间四位
 */
function hidephone(s="18291447788"){return s.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2");}
/**
 *
 * @param css代码
 * @returns 添加css代码
 */
function addcss(e){var t=document.createElement("style"),d=document.head||document.getElementsByTagName("head")[0];if(t.type="text/css",t.styleSheet){var a=function(){try{t.styleSheet.cssText=e}catch(e){}};t.styleSheet.disabled?setTimeout(a,10):a()}else{var s=document.createTextNode(e);t.appendChild(s)}d.appendChild(t)}
/**
 * @param js代码
 * @returns 添加js代码
 */
function addjs(t){var e=document.createElement("script");e.type="text/javascript";try{e.appendChild(document.createTextNode(t))}catch(d){e.text=t}document.head.appendChild(e)}

/**
 *
 * @param js文件路径
 * @param 回调函数
 * @returns 加载js支持回调
 */
function loadjs(e,a){var t=document.createElement("script");t.src=e,t.onload=function(){var e=t.readyState&&"complete"!=t.readyState&&"loaded"!=t.readyState;a&&a(!e)},document.head.appendChild(t)}

/**
 *
 * @param css路径
 * @param 回调函数
 * @returns 加载css支持回调
 */
function loadcss(e,n){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.onerror=function(){n(!1)},t.onload=function(){n(!0)},t.href=e,document.head.appendChild(t)}

/**
 *
 * @returns 当前域名主机
 */
function gethost(){return window.location.protocol+"//"+window.location.host;}

/**
 * isfollowqr(null,true,"标题","内容")
 * 图片绝对路径
 * 是否显示关闭 默认true
 * 标题
 * 描述
 * @returns 关注二维码扫
 */
function isfollowqr(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"http://open.weixin.qq.com/qr/code?username=blyd99",o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"关注公众号",d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"感谢关注",n=document.createElement("div");n.classList.add("weui-model");var t=1==o?'<span class="close" onclick="$(\'.weui-model\').remove();"></span>':"",l=1==o?"onclick=\"$('.weui-model').remove();\"":"";n.innerHTML='<div class="model-mask"  '+l+'></div><div class="model-main">'+t+'<div class="model-head"><div class="m-title"><p>'+i+"</p><p>"+d+'</p></div></div><div class="model-body"><div class="follow">\n    <img src="'+e+'">\n    <p>长按识别图中二维码</p>\n</div></div></div>',document.body.appendChild(n),addcss(".weui-model{width:100%;height:100%;position:fixed;z-index:9999;top:0;left:0;display:block;text-align:center}\n.model-mask{width:100%;height:100%;background-color:#000;opacity:.7;cursor:pointer}\n.model-main{width:80%;min-height:2.5em;background-color:#fff;color:#333;z-index:99999;border-radius:.2em;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}\n.model-main .close{position:absolute;top:-45px;right:-10px;width:35px;height:35px;padding:5px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAC70lEQVRIS52WTajVVRTFf6usaCKCQWRNmokNFGtUmNgzyMrvED/AgZEmiOCgqIZNkiwzFNICDcHPUWCkA0mLQM1IFCRRQdRUzIImKRK2ZMn5P87z3f+997UnF+45/732x9p7HdHFbD8MvATMA54FxgFjgRvAFeAo8A3wg6Q7ba7UdmB7EfAp8AewC/ge+B34C3gCeBp4Hci9W8AaSfs6+RsGYjuR7gWSxTuSEm2r2X4AWAx8CJwGFkr6p/5gCIjtCcABYKOkdd2c339m+xFgDzAemCHpQnNnEMT2k8DxEv2OkQA0d23H3xfA1PRQ0s2c3QOx/SBwEvhE0tf/B6ACiq+fgHOSltYgy4HpkhZUl8ekuZJO9AK1nW8PVt8+HpAQQ9KPsj0KuAgMSDpTXZwDbC//p4wdzfZK4GNgsqQ4vme2VwNvSpoYkJeB9yQNdGhm0t3UBmR7GfB5qcKx+vtChNB9ICBp1FlJn3UK1XaANhZHgxnZXgJsKQEMAaiyyaCeD8gvwHJJv3YpycLiMLU/bvsNYFuhaprcVso1wNyAXAUmScpkt5rtBijz8y7wqqRWgNKXBLMuILeBRyX91weLvgTeAj6Q9FEf96cA+wNyrTAjv90yaUq0NkQBZko63OObmSFOQDIHb0vq2Lwq7a1NiWy/BuzuBWR7BbAsIF8BZyRl4w4z27OAncArdQ/6AbKdwG4FZD6wStK0DnMSgOyx2ZKy6odYNyDbDxVZWBKQ0cAl4EVJpyqOp2nZyKn9MIDqXlO60Huw5GVQN0TomgUZSkb9nm9YViY2q+JIHyx6AfhZ0r+lh9Gi88B6SRsakKSWYfxW0vu9nPY6t51BnQQ8F1mu9eSpRFP2WBbjiK3oSVZQ6D5R0vU4uV8ZnwG+Azb3M2x1FJUyJoMo42/NeZvGR0YjpyPV+LNF4/+uA+j2WsnjILOTlDN4YdjlltdKVlICyr1h1gpSsSQ6M7e8u/IUegz4s7y7svqzzg81zOoEchflLmD7O1+wYQAAAABJRU5ErkJggg==) no-repeat center center;background-size:auto;background-size:25px 25px}\n.model-main .model-head{font-size:20px;padding:.6em 0;background:-webkit-gradient(linear,left top,left bottom,from(#fd7a71),to(#e5484c));background:-webkit-linear-gradient(top,#fd7a71,#e5484c);background:linear-gradient(to bottom,#fd7a71,#e5484c);border-radius:.1em .1em 0 0;position:relative}\n.model-main .model-head p{color:#fff}.model-main .model-head p:nth-child(1){font-size:20px;line-height:1.5;font-weight:bold}\n.model-main .model-head p:nth-child(2){font-size:16px;line-height:1.5}.model-main .model-body{padding:.5em;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:5em;width:100%}\n.model-main .model-body img{margin-top:.1em;width:70%}.model-main .model-body p{color:#333;line-height:1.6;font-size:16px}")}

















