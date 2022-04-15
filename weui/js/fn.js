/**
 *
 * @returns 返回10位时间戳
 */
export const  time=()=>{return Math.floor((new Date).getTime()/1e3)}
/**
 *
 * @param n 格式化样式Y-m-d H:i:s返回带0 Y-n-j不带0 z一年中第几天要+1才正确 w星期0是周日 N 7是周日D三个字母星期 l英语星期 W周 F月份英语 L闰年判断 c带时区日期时间 r英文形式
 * @param t 时间戳
 * @returns 格式化时间
 */
export const  date=(n,t)=>{let e,r,u=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],o=/\\?(.?)/gi,i=function(n,t){return r[n]?r[n]():t},c=function(n,t){for(n=String(n);n.length<t;)n="0"+n;return n};r={d:function(){return c(r.j(),2)},D:function(){return r.l().slice(0,3)},j:function(){return e.getDate()},l:function(){return u[r.w()]+"day"},N:function(){return r.w()||7},S:function(){let n=r.j(),t=n%10;return t<=3&&1===parseInt(n%100/10,10)&&(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return e.getDay()},z:function(){let n=new Date(r.Y(),r.n()-1,r.j()),t=new Date(r.Y(),0,1);return Math.round((n-t)/864e5)},W:function(){let n=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),t=new Date(n.getFullYear(),0,4);return c(1+Math.round((n-t)/864e5/7),2)},F:function(){return u[6+r.n()]},m:function(){return c(r.n(),2)},M:function(){return r.F().slice(0,3)},n:function(){return e.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){let n=r.Y();return n%4==0&n%100!=0|n%400==0},o:function(){let n=r.n(),t=r.W();return r.Y()+(12===n&&t<9?1:1===n&&t>9?-1:0)},Y:function(){return e.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return e.getHours()>11?"pm":"am"},A:function(){return r.a().toUpperCase()},B:function(){let n=3600*e.getUTCHours(),t=60*e.getUTCMinutes(),r=e.getUTCSeconds();return c(Math.floor((n+t+r+3600)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return e.getHours()},h:function(){return c(r.g(),2)},H:function(){return c(r.G(),2)},i:function(){return c(e.getMinutes(),2)},s:function(){return c(e.getSeconds(),2)},u:function(){return c(1e3*e.getMilliseconds(),6)},e:function(){throw new Error("Not supported (see source code of date() for timezone on how to add support)")},I:function(){return new Date(r.Y(),0)-Date.UTC(r.Y(),0)!=new Date(r.Y(),6)-Date.UTC(r.Y(),6)?1:0},O:function(){let n=e.getTimezoneOffset(),t=Math.abs(n);return(n>0?"-":"+")+c(100*Math.floor(t/60)+t%60,4)},P:function(){let n=r.O();return n.substr(0,3)+":"+n.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-e.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(o,i)},r:function(){return"D, d M Y H:i:s O".replace(o,i)},U:function(){return e/1e3|0}};return function(n,t){return e=void 0===t?new Date:t instanceof Date?new Date(t):new Date(1e3*t),n.replace(o,i)}(n,t)}
/**
 *
 * @param text 转换参数now +-1 day +- 2 days +-1 week
 * @param now 默认当前时间戳
 * @returns 字符串转换时间戳
 */
export const strtotime=(text,now)=>{let parsed,match,today,year,date,days,ranges,len,times,regex,i,fail=false;if(!text){return fail}text=text.replace(/^\s+|\s+$/g,"").replace(/\s{2,}/g," ").replace(/[\t\r\n]/g,"").toLowerCase();match=text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);if(match&&match[2]===match[4]){if(match[1]>1901){switch(match[2]){case"-":if(match[3]>12||match[5]>31){return fail}return new Date(match[1],parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case".":return fail;case"/":if(match[3]>12||match[5]>31){return fail}return new Date(match[1],parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000}}else{if(match[5]>1901){switch(match[2]){case"-":if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case".":if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case"/":if(match[1]>12||match[3]>31){return fail}return new Date(match[5],parseInt(match[1],10)-1,match[3],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000}}else{switch(match[2]){case"-":if(match[3]>12||match[5]>31||(match[1]<70&&match[1]>38)){return fail}year=match[1]>=0&&match[1]<=38?+match[1]+2000:match[1];return new Date(year,parseInt(match[3],10)-1,match[5],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case".":if(match[5]>=70){if(match[3]>12||match[1]>31){return fail}return new Date(match[5],parseInt(match[3],10)-1,match[1],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000}if(match[5]<60&&!match[6]){if(match[1]>23||match[3]>59){return fail}today=new Date();return new Date(today.getFullYear(),today.getMonth(),today.getDate(),match[1]||0,match[3]||0,match[5]||0,match[9]||0)/1000}return fail;case"/":if(match[1]>12||match[3]>31||(match[5]<70&&match[5]>38)){return fail}year=match[5]>=0&&match[5]<=38?+match[5]+2000:match[5];return new Date(year,parseInt(match[1],10)-1,match[3],match[6]||0,match[7]||0,match[8]||0,match[9]||0)/1000;case":":if(match[1]>23||match[3]>59||match[5]>59){return fail}today=new Date();return new Date(today.getFullYear(),today.getMonth(),today.getDate(),match[1]||0,match[3]||0,match[5]||0)/1000}}}}if(text==="now"){return now===null||isNaN(now)?new Date().getTime()/1000|0:now|0}if(!isNaN(parsed=Date.parse(text))){return parsed/1000|0}date=now?new Date(now*1000):new Date();days={"sun":0,"mon":1,"tue":2,"wed":3,"thu":4,"fri":5,"sat":6};ranges={"yea":"FullYear","mon":"Month","day":"Date","hou":"Hours","min":"Minutes","sec":"Seconds"};function lastNext(type,range,modifier){let diff,day=days[range];if(typeof day!=="undefined"){diff=day-date.getDay();if(diff===0){diff=7*modifier}else{if(diff>0&&type==="last"){diff-=7}else{if(diff<0&&type==="next"){diff+=7}}}date.setDate(date.getDate()+diff)}}function process(val){let splt=val.split(" "),type=splt[0],range=splt[1].substring(0,3),typeIsNumber=/\d+/.test(type),ago=splt[2]==="ago",num=(type==="last"?-1:1)*(ago?-1:1);if(typeIsNumber){num*=parseInt(type,10)}if(ranges.hasOwnProperty(range)&&!splt[1].match(/^mon(day|\.)?$/i)){return date["set"+ranges[range]](date["get"+ranges[range]]()+num)}if(range==="wee"){return date.setDate(date.getDate()+(num*7))}if(type==="next"||type==="last"){lastNext(type,range,num)}else{if(!typeIsNumber){return false}}return true}times="(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec"+"|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?"+"|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)";regex="([+-]?\\d+\\s"+times+"|"+"(last|next)\\s"+times+")(\\sago)?";match=text.match(new RegExp(regex,"gi"));if(!match){return fail}for(i=0,len=match.length;i<len;i++){if(!process(match[i])){return fail}}return(date.getTime()/1000)};
/**
 * 用字符分割microtime().split(" ")[1]
 * @returns 返回微秒
 */
export const microtime=(e)=>{let n,r;return"undefined"!=typeof performance&&performance.now?(r=(performance.now()+performance.timing.navigationStart)/1e3,e?r:(n=0|r,Math.round(1e6*(r-n))/1e6+" "+n)):(r=(Date.now?Date.now():(new Date).getTime())/1e3,e?r:(n=0|r,Math.round(1e3*(r-n))/1e3+" "+n))}

/**
 * 参数格式 时,分,秒,月,日,年
 * @returns 返回日期时间戳
 */
export function mktime(){let e=new Date,t=arguments,r=0,n=["Hours","Minutes","Seconds","Month","Date","FullYear"];for(r=0;r<n.length;r++)if(void 0===t[r])t[r]=e["get"+n[r]](),t[r]+=3===r;else if(t[r]=parseInt(t[r],10),isNaN(t[r]))return!1;t[5]+=t[5]>=0?t[5]<=69?2e3:t[5]<=100?1900:0:0,e.setFullYear(t[5],t[3]-1,t[4]),e.setHours(t[0],t[1],t[2]);let s=e.getTime();return(s/1e3>>0)-(s<0)}
/**
 *array_column(arr=[{"id":1,"name":"中国"},{"id":2,"name":"中国1"}],value="name",key="id")
 * @param r 数组
 * @param t 值
 * @param 指定key
 * @returns 返回数组中指定列
 */
export function array_column(r,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(null!==r&&("object"===(void 0===r?"undefined":_typeof(r))||Array.isArray(r))){let e=[];if("object"===(void 0===r?"undefined":_typeof(r))){let n=[],y=!0,i=!1,a=void 0;try{for(let f,l=Object.keys(r)[Symbol.iterator]();!(y=(f=l.next()).done);y=!0){let u=f.value;n.push(r[u])}}catch(r){i=!0,a=r}finally{try{!y&&l.return&&l.return()}finally{if(i)throw a}}r=n}if(Array.isArray(r)){let c=!0,v=!1,s=void 0;try{for(let b,p=r.keys()[Symbol.iterator]();!(c=(b=p.next()).done);c=!0){let d=b.value;o&&r[d][o]?e[r[d][o]]=t?r[d][t]:r[d]:t?e.push(r[d][t]):e.push(r[d])}}catch(r){v=!0,s=r}finally{try{!c&&p.return&&p.return()}finally{if(v)throw s}}}return Object.assign({},e)}}let _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r};

/**
 *array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
 * @param 数组
 * @returns 返回数组中key
 */
export function array_keys(r,n,a){let e=void 0!==n,o=[],t=!!a,i=!0,y="";for(y in r)r.hasOwnProperty(y)&&(i=!0,e&&(t&&r[y]!==n?i=!1:r[y]!==n&&(i=!1)),i&&(o[o.length]=y));return o}

/**
 * array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
 * @param 数组
 * @returns 返回数组中值
 */
export function array_values(r){let n=[],a="";for(a in r)n[n.length]=r[a];return n}

/**
 * 取一个是字符串,多个是数组,取出的是key
 * @param 数组
 * @param 取出单元个数
 * @returns 随机取出数组单元key
 */
export function array_rand(r,a){let n=Object.keys(r);if(a=void 0===a||null===a?1:+a,isNaN(a)||a<1||a>n.length)return null;for(let l=n.length-1;l>0;l--){let t=Math.floor(Math.random()*(l+1)),e=n[t];n[t]=n[l],n[l]=e}return 1===a?n[0]:n.slice(0,a)}

/**
 *array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
 * @param 数组
 * @returns 去除数组重复
 */
export function array_unique(r){let n="",t={},u="";for(n in r)r.hasOwnProperty(n)&&(u=r[n],!1===function(r,n){let t="";for(t in n)if(n.hasOwnProperty(t)&&n[t]+""==r+"")return t;return!1}(u,t)&&(t[n]=u));return t}
/**
 * array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
 * @param 数组
 * @param 开始位置
 * @param 取出个数
 * @param 是否重排
 * @returns 截取数组
 */
export function array_slice(r,i,e,t){let o="";if("[object Array]"!==Object.prototype.toString.call(r)||t&&0!==i){let a=0,c={};for(o in r)a+=1,c[o]=r[o];r=c,i=i<0?a+i:i,e=void 0===e?a:e<0?a+e-i:e;let n={},l=!1,f=-1,s=0,v=0;for(o in r){if(++f,s>=e)break;f===i&&(l=!0),l&&(++s,is_int(o)&&!t?n[v++]=r[o]:n[o]=r[o])}return n}return void 0===e?r.slice(i):e>=0?r.slice(i,i+e):r.slice(i,e)}

/**
 *array_search('e',["a", "b", "c", "d", "e"])
 * @param 要查找的值
 * @param 数组
 * @returns 数组中搜索指定值返回键
 */
export function array_search(r,e,t){let n=!!t,i="";if("object"==typeof r&&r.exec){if(!n){let o="i"+(r.global?"g":"")+(r.multiline?"m":"")+(r.sticky?"y":"");r=new RegExp(r.source,o)}for(i in e)if(e.hasOwnProperty(i)&&r.test(e[i]))return i;return!1}for(i in e)if(e.hasOwnProperty(i)&&(n&&e[i]===r||!n&&e[i]==r))return i;return!1}

/**
 *  参数是数组
 * @returns 合并多个数组
 */
export function array_merge(){let r,e=Array.prototype.slice.call(arguments),t=e.length,o={},a="",n=0,c=0,l=0,f=0,i=Object.prototype.toString,y=!0;for(l=0;l<t;l++)if("[object Array]"!==i.call(e[l])){y=!1;break}if(y){for(y=[],l=0;l<t;l++)y=y.concat(e[l]);return y}for(l=0,f=0;l<t;l++)if(r=e[l],"[object Array]"===i.call(r))for(c=0,n=r.length;c<n;c++)o[f++]=r[c];else for(a in r)r.hasOwnProperty(a)&&(parseInt(a,10)+""===a?o[f++]=r[a]:o[a]=r[a]);return o}

/**
 *
 * @param 数组
 * @param 参数1时候递归统计多维数组
 * @returns 计算数组个数
 */
export function count(r,t){let n,o=0;if(null===r||void 0===r)return 0;if(r.constructor!==Array&&r.constructor!==Object)return 1;"COUNT_RECURSIVE"===t&&(t=1),1!==t&&(t=0);for(n in r)r.hasOwnProperty(n)&&(o++,1!==t||!r[n]||r[n].constructor!==Array&&r[n].constructor!==Object||(o+=count(r[n],1)));return o}

/**
 *
 * @param 值
 * @param 数组
 * @returns 判断元素是否在数组中bool
 */
export function in_array(r,n,i){let f="";if(!i){for(f in n)if(n[f]==r)return!0}else for(f in n)if(n[f]===r)return!0;return!1}
/**
 *
 * @param 数组或数组对象
 * @returns 对象转换数组会丢掉key
 */
export function obj2arr(array) {
    if(is_object(array)) {
        let arr = []
        for (let i in array) {
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
export function range(r,a,N){let i,o,s=[],e=N||1,f=!1;if(isNaN(r)||isNaN(a)?isNaN(r)&&isNaN(a)?(f=!0,i=r.charCodeAt(0),o=a.charCodeAt(0)):(i=isNaN(r)?0:r,o=isNaN(a)?0:a):(i=r,o=a),!(i>o))for(;i<=o;)s.push(f?String.fromCharCode(i):i),i+=e;else for(;i>=o;)s.push(f?String.fromCharCode(i):i),i-=e;return s}

/**
 *@returns 删除变量或数组传入字符串
 */
export function unset(){let i=0,arg="",win="",winRef=/^(?:this)?window[.[]/,arr=[],accessor="",bracket=/\[['"]?(\d+)['"]?\]$/;for(i=0;i<arguments.length;i++){arg=arguments[i];winRef.lastIndex=0,bracket.lastIndex=0;win=winRef.test(arg)?"":"this.window.";if(bracket.test(arg)){accessor=arg.match(bracket)[1];arr=eval(win+arg.replace(bracket,""));arr.splice(accessor,1)}else{eval("delete "+win+arg)}}};
/**
 * 正数字符1大于字符2,负数小于0
 * @param 字符1
 * @param 字符2
 * @returns 字符串比较
 */
function strcmp(b,a){return((b==a)?0:((b>a)?1:-1))};
export function strnatcmp(g,f,d){let b=0;if(d==undefined){d=false}let e=function(p){let n=[];let o="";let r="";let q=0,m=0;let s=true;m=p.length;for(q=0;q<m;q++){r=p.substring(q,q+1);if(r.match(/\d/)){if(s){if(o.length>0){n[n.length]=o;o=""}s=false}o+=r}else{if((s==false)&&(r===".")&&(q<(p.length-1))&&(p.substring(q+1,q+2).match(/\d/))){n[n.length]=o;o=""}else{if(s==false){if(o.length>0){n[n.length]=parseInt(o,10);o=""}s=true}o+=r}}}if(o.length>0){if(s){n[n.length]=o}else{n[n.length]=parseInt(o,10)}}return n};let l=e(g+"");let j=e(f+"");let c=l.length;let h=true;let k=-1;let a=0;if(c>j.length){c=j.length;k=1}for(b=0;b<c;b++){if(isNaN(l[b])){if(isNaN(j[b])){h=true;if((a=strcmp(l[b],j[b]))!=0){return a}}else{if(h){return 1}else{return -1}}}else{if(isNaN(j[b])){if(h){return -1}else{return 1}}else{if(h||d){if((a=(l[b]-j[b]))!=0){return a}}else{if((a=strcmp(l[b].toString(),j[b].toString()))!=0){return a}}h=false}}}return k};
/**
 *sort(["a","b"],"SORT_STRING",true)
 * @param 数组
 * @param SORT_STRING|SORT_NUMERIC 排序类型
 * @param 默认true只排序不输出,false输出
 * @returns 数组排序
 */
export function sort(inputArr,sort_flags,strictForIn=true){let valArr=[],keyArr=[],k='',i=0,sorter=false,populateArr=[];switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(a,b);};break;case'SORT_NUMERIC':sorter=function(a,b){return(a-b);};break;default:sorter=function(a,b){let aFloat=parseFloat(a),bFloat=parseFloat(b),aNumeric=aFloat+''===a,bNumeric=bFloat+''===b;if(aNumeric&&bNumeric){return aFloat>bFloat?1:aFloat<bFloat?-1:0;}else if(aNumeric&&!bNumeric){return 1;}else if(!aNumeric&&bNumeric){return-1;}return a>b?1:a<b?-1:0;};break;}populateArr=strictForIn?inputArr:populateArr;for(k in inputArr){if(inputArr.hasOwnProperty(k)){valArr.push(inputArr[k]);if(strictForIn){delete inputArr[k];}}}valArr.sort(sorter);for(i=0;i<valArr.length;i++){populateArr[i]=valArr[i];}return strictForIn||populateArr;}

/**
 *
 * @param 数组
 * @param 类型SORT_STRING|SORT_NUMERIC
 * @returns 关联数组排序返回数组
 */
export function ksort(inputArr,sort_flags){return sort(inputArr,sort_flags,false);};
/**
 *
 * @param 字符
 * @returns 是否整数判断
 */
export function is_int(i){return i===+i&&isFinite(i)&&!(i%1)}

/**
 *
 * @param 字符
 * @returns 是否浮点数判断
 */
export function is_float(i){return!(+i!==i||isFinite(i)&&!(i%1))}

/**
 *
 * @param 变量
 * @returns 是否数组判断
 */
export function is_array(t){if(!t||"object"!=typeof t)return!1;if(function(t){if(!t||"object"!=typeof t||"number"!=typeof t.length)return!1;let e=t.length;return t[t.length]="bogus",e!==t.length?(t.length-=1,!0):(delete t[t.length],!1)}(t))return!0;let e=Object.prototype.toString.call(t),n=function(t){let e=/\W*function\s+([\w$]+)\s*\(/.exec(t);return e?e[1]:"(Anonymous)"}(t.constructor);return"[object Object]"===e&&"Object"===n}

/**
 *
 * @param 变量
 * @returns 是否对象判断
 */
export function is_object(t){return"[object Array]"!==Object.prototype.toString.call(t)&&(null!==t&&"object"==typeof t)}

/**
 *  @param 函数名字符串
 * @returns 判断函数是否存在
 */
export function function_exists(n){let o="undefined"!=typeof window?window:global;return"string"==typeof n&&(n=o[n]),"function"==typeof n}

/**
 *
 * @param 数组或对象
 * @returns 序列化
 */
export function serialize(r){let e,t,a,n="",o=0,i=function(r){let e,t,a,n,o=typeof r;if("object"===o&&!r)return"null";if("object"===o){if(!r.constructor)return"object";a=r.constructor.toString(),e=a.match(/(\w+)\(/),e&&(a=e[1].toLowerCase()),n=["boolean","number","string","array"];for(t in n)if(a==n[t]){o=n[t];break}}return o},c=i(r);switch(c){case"function":e="";break;case"boolean":e="b:"+(r?"1":"0");break;case"number":e=(Math.round(r)==r?"i":"d")+":"+r;break;case"string":e="s:"+function(r){let e=0,t=0,a=r.length,n="";for(t=0;t<a;t++)n=r.charCodeAt(t),e+=n<128?1:n<2048?2:3;return e}(r)+':"'+r+'"';break;case"array":case"object":e="a";for(t in r)if(r.hasOwnProperty(t)){if("function"===i(r[t]))continue;a=t.match(/^[0-9]+$/)?parseInt(t,10):t,n+=serialize(a)+serialize(r[t]),o++}e+=":"+o+":{"+n+"}";break;case"undefined":default:e="N"}return"object"!==c&&"array"!==c&&(e+=";"),e}
/**
 *
 * @param 字符串
 * @returns 解码序列化
 */
export function unserialize(data) {
let that = this,
        utf8Overhead = function (chr) {
            // http://phpjs.org/functions/unserialize:571#comment_95906
            let code = chr.charCodeAt(0);
            if (code < 0x0080) {
                return 0;
            }
            if (code < 0x0800) {
                return 1;
            }
            return 2;
        };
    const error = function (type, msg, filename, line) {
        throw new that.window[type](msg, filename, line);
    };
    const read_until = function (data, offset, stopchr) {
        let i = 2,
            buf = [],
            chr = data.slice(offset, offset + 1);

        while (chr != stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1), offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    const read_chrs = function (data, offset, length) {
        let i, chr, buf;

        buf = [];
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr);
        }
        return [buf.length, buf.join('')];
    };
    const _unserialize = function (data, offset) {
        let dtype, dataoffset, keyandchrs, keys, contig,
            length, array, readdata, readData, ccount,
            stringlength, i, key, kprops, kchrs, vprops,
            vchrs, value, chrs = 0,
            typeconvert = function (x) {
                return x;
            };

        if (!offset) {
            offset = 0;
        }
        dtype = (data.slice(offset, offset + 1))
            .toLowerCase();

        dataoffset = offset + 2;

        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10);
                };
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0;
                };
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x);
                };
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'n':
                readdata = null;
                break;
            case 's':
                ccount = read_until(data, dataoffset, ':');
                chrs = ccount[0];
                stringlength = ccount[1];
                dataoffset += chrs + 2;

                readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 2;
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
                    error('SyntaxError', 'String length mismatch');
                }
                break;
            case 'a':
                readdata = {};

                keyandchrs = read_until(data, dataoffset, ':');
                chrs = keyandchrs[0];
                keys = keyandchrs[1];
                dataoffset += chrs + 2;

                length = parseInt(keys, 10);
                contig = true;

                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset);
                    kchrs = kprops[1];
                    key = kprops[2];
                    dataoffset += kchrs;

                    vprops = _unserialize(data, dataoffset);
                    vchrs = vprops[1];
                    value = vprops[2];
                    dataoffset += vchrs;

                    if (key !== i)
                        contig = false;

                    readdata[key] = value;
                }

                if (contig) {
                    array = new Array(length);
                    for (i = 0; i < length; i++)
                        array[i] = readdata[i];
                    readdata = array;
                }

                dataoffset += 1;
                break;
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
                break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };

    return _unserialize((data + ''), 0)[2];
}
/**
 * uniqid('',true)长度23 默认13
 * @param 前缀
 * @param 是否增加长度
 * @returns 生成唯一id
 */
export function uniqid(n,e){void 0===n&&(n="");let t,i=function(n,e){return n=parseInt(n,10).toString(16),e<n.length?n.slice(n.length-e):e>n.length?Array(e-n.length+1).join("0")+n:n},o="undefined"!=typeof window?window:global;o.$locutus=o.$locutus||{};let d=o.$locutus;return d.php=d.php||{},d.php.uniqidSeed||(d.php.uniqidSeed=Math.floor(123456789*Math.random())),d.php.uniqidSeed++,t=n,t+=i(parseInt((new Date).getTime()/1e3,10),8),t+=i(d.php.uniqidSeed,5),e&&(t+=(10*Math.random()).toFixed(8).toString()),t}
/**
 *
 * @param 变量
 * @returns 判断变量是否为空
 */
export function empty(r){let n,t,e,f=[void 0,null,!1,0,"","0"];for(t=0,e=f.length;t<e;t++)if(r===f[t])return!0;if("object"==typeof r){for(n in r)if(r.hasOwnProperty(n))return!1;return!0}return!1}

/**
 *
 * @returns 判断变量是否存在
 */
export function isset(){let r=arguments,t=r.length,n=0;if(0===t)throw new Error("Empty isset");for(;n!==t;){if(void 0===r[n]||null===r[n])return!1;n++}return!0}

/**
 *
 * @param 变量
 * @param 进制,默认十进制
 * @returns 转换成整型
 */
export function intval(i,t){let n,a,e=typeof i;return"boolean"===e?+i:"string"===e?(0===t&&(a=i.match(/^\s*0(x?)/i),t=a?a[1]?16:8:10),n=parseInt(i,t||10),isNaN(n)||!isFinite(n)?0:n):"number"===e&&isFinite(i)?i<0?Math.ceil(i):Math.floor(i):0}

/**
 *
 * @param 变量
 * @returns 转换成浮点型
 */
export function floatval(a){return parseFloat(a)||0}

/**
 *
 * @param 字符串
 * @returns utf8编码字符串
 */
export function utf8_encode(argString) {
    if (argString === null || typeof argString === 'undefined') {
        return '';
    }

    // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    let string = (argString + '');
    let utftext = '',
        start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (let n = 0; n < stringl; n++) {
        let c1 = string.charCodeAt(n);
        let enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(
                (c1 >> 6) | 192, (c1 & 63) | 128
            );
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode(
                (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        } else {
            // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            let c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) != 0xDC00) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode(
                (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
}
/**
 *
 * @param 变量
 * @returns md5加密
 */
export function md5(str) {
    let xl;

    let rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };

    let addUnsigned = function (lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    };

    let _F = function (x, y, z) {
        return (x & y) | ((~x) & z);
    };
    let _G = function (x, y, z) {
        return (x & z) | (y & (~z));
    };
    let _H = function (x, y, z) {
        return (x ^ y ^ z);
    };
    let _I = function (x, y, z) {
        return (y ^ (x | (~z)));
    };

    let _FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    let _GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    let _HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    let _II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    let convertToWordArray = function (str) {
        let lWordCount;
        let lMessageLength = str.length;
        let lNumberOfWords_temp1 = lMessageLength + 8;
        let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        let lWordArray = new Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    let wordToHex = function (lValue) {
        let wordToHexValue = '',
            wordToHexValue_temp = '',
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = '0' + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };

    let x = [],
        k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22,
        S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20,
        S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23,
        S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

    str = utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    xl = x.length;
    for (k = 0; k < xl; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }

    let temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

    return temp.toLowerCase();
}
/**
 *
 * @param 变量
 * @returns sha1签名
 */
export function sha1(r){let c=function(w,j){let i=(w<<j)|(w>>>(32-j));return i};let s=function(y){let x="";let w;let j;for(w=7;w>=0;w--){j=(y>>>(w*4))&15;x+=j.toString(16)}return x};let f;let u,t;let b=new Array(80);let l=1732584193;let h=4023233417;let g=2562383102;let e=271733878;let d=3285377520;let q,p,o,n,m;let v;r=unescape(encodeURIComponent(r));let a=r.length;let k=[];for(u=0;u<a-3;u+=4){t=r.charCodeAt(u)<<24|r.charCodeAt(u+1)<<16|r.charCodeAt(u+2)<<8|r.charCodeAt(u+3);k.push(t)}switch(a%4){case 0:u=2147483648;break;case 1:u=r.charCodeAt(a-1)<<24|8388608;break;case 2:u=r.charCodeAt(a-2)<<24|r.charCodeAt(a-1)<<16|32768;break;case 3:u=r.charCodeAt(a-3)<<24|r.charCodeAt(a-2)<<16|r.charCodeAt(a-1)<<8|128;break}k.push(u);while((k.length%16)!=14){k.push(0)}k.push(a>>>29);k.push((a<<3)&4294967295);for(f=0;f<k.length;f+=16){for(u=0;u<16;u++){b[u]=k[f+u]}for(u=16;u<=79;u++){b[u]=c(b[u-3]^b[u-8]^b[u-14]^b[u-16],1)}q=l;p=h;o=g;n=e;m=d;for(u=0;u<=19;u++){v=(c(q,5)+((p&o)|(~p&n))+m+b[u]+1518500249)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}for(u=20;u<=39;u++){v=(c(q,5)+(p^o^n)+m+b[u]+1859775393)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}for(u=40;u<=59;u++){v=(c(q,5)+((p&o)|(p&n)|(o&n))+m+b[u]+2400959708)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}for(u=60;u<=79;u++){v=(c(q,5)+(p^o^n)+m+b[u]+3395469782)&4294967295;m=n;n=o;o=c(p,30);p=q;q=v}l=(l+q)&4294967295;h=(h+p)&4294967295;g=(g+o)&4294967295;e=(e+n)&4294967295;d=(d+m)&4294967295}v=s(l)+s(h)+s(g)+s(e)+s(d);return v.toLowerCase()};
/**
 *
 * @param 变量
 * @returns 打印数组
 */
export function dump(r,n){let  echo=function(){let o=Array.prototype.slice.call(arguments);return console.log(o.join(" "))};let t="",o=function(r,n){for(let t="",o=0;o<r;o++)t+=n;return t},e=function(r,n,t,c){n>0&&n++;let i=o(t*n,c),u=o(t*(n+1),c),a="";if("object"==typeof r&&null!==r&&r.constructor){a+="Array\n"+i+"(\n";for(let f in r)"[object Array]"===Object.prototype.toString.call(r[f])?(a+=u,a+="[",a+=f,a+="] => ",a+=e(r[f],n+1,t,c)):(a+=u,a+="[",a+=f,a+="] => ",a+=r[f],a+="\n");a+=i+")\n"}else a=null===r||void 0===r?"":r.toString();return a};return t=e(r,0,4," "),!0!==n?(echo(t),!0):t}
/**
 *
 * @param 字符串
 * @param 要去除的字符,默认为空格
 * @returns 去除两边空格
 */
export function trim(r,n){let t=[" ","\n","\r","\t","\f","\v"," "," "," "," "," "," "," "," "," "," "," "," ","​","\u2028","\u2029","　"].join(""),e=0,i=0;for(r+="",n&&(t=(n+"").replace(/([[\]().?\/*{}+$^:])/g,"$1")),e=r.length,i=0;i<e;i++)if(-1===t.indexOf(r.charAt(i))){r=r.substring(i);break}for(e=r.length,i=e-1;i>=0;i--)if(-1===t.indexOf(r.charAt(i))){r=r.substring(0,i+1);break}return-1===t.indexOf(r.charAt(0))?r:""}

/**
 *
 * @param 字符串
 * @param 要去除的字符
 * @returns 去除右边空格
 */
export function rtrim(e,r){return r=r?(r+"").replace(/([[\]().?\/*{}+$^:])/g,"\\$1"):" \\s ",(e+"").replace(new RegExp("["+r+"]+$","g"),"")}
/**
 *
 * @param 字符串
 * @param 要去除的字符
 * @returns 去除左边空格
 */
export function ltrim(e,r){return r=r?(r+"").replace(/([[\]().?\/*{}+$^:])/g,"$1"):" \\s ",(e+"").replace(new RegExp("^["+r+"]+","g"),"")}
/**
 *
 * @param 字符串
 * @returns 删除多个空格只保留一个
 */
export function strtrim(a){return a.replace(/\s+/g," ");};

/**
 *str_replace("a","我","来自于a")
 * @param 要查找的字符
 * @param 要替换的字符
 * @param 字符串
 * @returns 字符串替换
 */
export function str_replace(t,o,e,c){let r=0,l=0,n="",a="",i=0,p=0,u=[].concat(t),f=[].concat(o),g=e,y="[object Array]"===Object.prototype.toString.call(f),b="[object Array]"===Object.prototype.toString.call(g);g=[].concat(g);let j="undefined"!=typeof window?window:global;j.$locutus=j.$locutus||{};let v=j.$locutus;if(v.php=v.php||{},"object"==typeof t&&"string"==typeof o){for(n=o,o=[],r=0;r<t.length;r+=1)o[r]=n;n="",f=[].concat(o),y="[object Array]"===Object.prototype.toString.call(f)}for(void 0!==c&&(c.value=0),r=0,i=g.length;r<i;r++)if(""!==g[r])for(l=0,p=u.length;l<p;l++)n=g[r]+"",a=y?void 0!==f[l]?f[l]:"":f[0],g[r]=n.split(u[l]).join(a),void 0!==c&&(c.value+=n.split(u[l]).length-1);return b?g:g[0]}
/**
 *
 * @param 字符串
 * @param 保留的标签
 * @returns 去除html标签
 */
export function strip_tags(input,allowed){allowed=(((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");let tags=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags,"").replace(tags,function($0,$1){return allowed.indexOf("<"+$1.toLowerCase()+">")>-1?$0:""})};

/**
 *
 * @param 字符串
 * @returns 计算字符串长度
 */
export function strlen(t){let n=t+"";return n.length}
/**
 * @param 字符串
 * @returns 转换大写
 */
export function strtolower(t){return(t+"").toLowerCase()}
/**
 * @param 字符串
 * @returns 转换小写
 */
export function strtoupper(t){return(t+"").toUpperCase()}
/**
 * @param 字符串
 * @returns 转换首字母大写
 */
export function ucfirst(t){return t+="",t.charAt(0).toUpperCase()+t.substr(1)}

/**
 * let1 =1;  let2 = 'vanvs'; c=compact('let1', 'let2');必须全局变量
 * @returns 变量组成数组
 */
export function compact(){let t="undefined"!=typeof window?window:global,o={};return function n(r){let e=0,c=r.length,i="";for(e=0;e<c;e++)i=r[e],"[object Array]"===Object.prototype.toString.call(i)?n(i):void 0!==t[i]&&(o[i]=t[i]);return!0}(arguments),o}

/**
 * explode(" ","我 哎 你")
 * @param 分割符号
 * @param 字符串
 * @returns 字符串转换成数组
 */
export function explode(e,t,n){if(arguments.length<2||void 0===e||void 0===t)return null;if(""===e||!1===e||null===e)return!1;if("function"==typeof e||"object"==typeof e||"function"==typeof t||"object"==typeof t)return{0:""};!0===e&&(e="1"),e+="",t+="";let o=t.split(e);return void 0===n?o:(0===n&&(n=1),n>0?n>=o.length?o:o.slice(0,n-1).concat([o.slice(n-1).join(e)]):-n>=o.length?[]:(o.splice(o.length+n),o))}

/**
 *implode(",",[1,2,3])
 * @param 分隔符
 * @param 数组
 * @returns 数组转换字符串
 */
export function implode(t,r){let e="",o="",n="";if(1===arguments.length&&(r=t,t=""),"object"==typeof r){if("[object Array]"===Object.prototype.toString.call(r))return r.join(t);for(e in r)o+=n+r[e],n=t;return o}return r}

/**
 *str2arr('1-2-3','-') str2arr([1,2,3],'-')
 * @returns 字符串与数组相互转换
 */
export function str2arr(){let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[1,2],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",";return is_array(r)?implode(e,r):explode(e,r)}
/**
 * json2str({a:1,b:"测试"})
 * @param json对象
 * @returns json对象转换字符串
 */
export function json2str(str){return JSON.stringify(str);};

/**
 * str2json("{\"a\":1,\"b\":\"测试\"}")
 * @param str
 * @returns json字符串转换对象
 */
export function str2json(str){return JSON.parse(str);};
/**
 * @param html字符串
 * @returns html转换实体
 */
export function htmlencode(sStr){ let htmlspecialchars = function(e,E,T,_){let r=0,t=0,a=!1;("undefined"==typeof E||null===E)&&(E=2),e=e.toString(),_!==!1&&(e=e.replace(/&/g,"&amp;")),e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;");let N={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(0===E&&(a=!0),"number"!=typeof E){for(E=[].concat(E),t=0;t<E.length;t++)0===N[E[t]]?a=!0:N[E[t]]&&(r|=N[E[t]]);E=r}return E&N.ENT_HTML_QUOTE_SINGLE&&(e=e.replace(/'/g,"&#039;")),a||(e=e.replace(/"/g,"&quot;")),e};return htmlspecialchars(sStr);};
/**
 * @param html字符串
 * @returns html实体还原
 */
export function htmldecode(sStr){let htmlspecialchars_decode= function(e,E){let T=0,_=0,r=!1;"undefined"==typeof E&&(E=2),e=e.toString().replace(/&lt;/g,"<").replace(/&gt;/g,">");let t={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(0===E&&(r=!0),"number"!=typeof E){for(E=[].concat(E),_=0;_<E.length;_++)0===t[E[_]]?r=!0:t[E[_]]&&(T|=t[E[_]]);E=T}return E&t.ENT_HTML_QUOTE_SINGLE&&(e=e.replace(/&#0*39;/g,"'")),r||(e=e.replace(/&quot;/g,'"')),e=e.replace(/&amp;/g,"&")};return htmlspecialchars_decode(sStr)};
/**
 *$_GET('qq')
 * @param 变量字符
 * @returns 获取url变量值
 */
export function $_GET(name) {
  let nameEQ = name + '=',
        url = window.location.href,
        pos = url.indexOf('?'),
        url1 = url.slice(pos + 1),
        arr = url1.split('&'),
        i = 0,
        pair = '',
        arrl = arr.length;
    for (i = 0; i < arrl; i++) {
        let pair = arr[i];
        if (pair.indexOf(nameEQ) === 0) {
            return decodeURIComponent(pair.slice(nameEQ.length).replace(/\+/g, '%20'));
        }
    }
    return null;
}
/**
 * $_COOKIE('a')
 * @param 名称
 * @returns 读取cookie
 */
export function $_COOKIE(b){let d=0,g="",f=b+"=",a=document.cookie.split(";"),e=a.length;for(d=0;d<e;d++){g=a[d].replace(/^ */,"");if(g.indexOf(f)===0){return decodeURIComponent(g.slice(f.length).replace(/\+/g,"%20"))}}return null};
/**
 *foreach([1,2,3,4],function(k,v){log(v);})
 * @param 数组
 * @param 处理方法函数
 * @returns 循环输出
 */
export function foreach(arr, handler) {
 let k, it, pair;
    if (arr && typeof arr === 'object' && arr.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return arr.foreach(handler);
    }
if (handler.length === 1) {
        for (k in arr) {
            if (arr.hasOwnProperty(k)) {
                handler(arr[k]); // only pass the value
            }
        }
    }
    else {
        for (k in arr) {
            if (arr.hasOwnProperty(k)) {
                handler(k, arr[k]);
            }
        }
    }
}

/**
 * preg_match('a','abc') true
 * @param 正则
 * @param 匹配字符
 * @returns 正则匹配是否存在
 */
export function preg_match(e,t){return new RegExp(e).test(t)}
/**
 * preg_replace(/N/,"32","分数是N分")
 * @param 正则
 * @param 替换的内容
 * @param 字符串
 * @param 次数
 * @returns 正则替换
 */
export function preg_replace(pattern,replacement,subject,limit){if(typeof limit==='undefined')limit=-1;if(subject.match(eval(pattern))){if(limit==-1){return subject.replace(eval(pattern+'g'),replacement);}else{for(let x=0;x<limit;x++){subject=subject.replace(eval(pattern),replacement);}return subject;}}else{return subject;}}
/**
 * @param base64编码
 * @returns base64还原
 */
export function base64_decode(n){let r=function(n){return decodeURIComponent(n.split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""))};if("undefined"==typeof window)return new Buffer(n,"base64").toString("utf-8");if(void 0!==window.atob)return r(window.atob(n));let e,t,o,i,d,f,a,c,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",h=0,w=0,C="",g=[];if(!n)return n;n+="";do{i=u.indexOf(n.charAt(h++)),d=u.indexOf(n.charAt(h++)),f=u.indexOf(n.charAt(h++)),a=u.indexOf(n.charAt(h++)),c=i<<18|d<<12|f<<6|a,e=c>>16&255,t=c>>8&255,o=255&c,g[w++]=64===f?String.fromCharCode(e):64===a?String.fromCharCode(e,t):String.fromCharCode(e,t,o)}while(h<n.length);return C=g.join(""),r(C.replace(/\0+$/,""))}
/**
 * @param 字符串
 * @returns base64编码
 */
export function base64_encode(e){let r=function(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,r){return String.fromCharCode("0x"+r)})};if("undefined"==typeof window)return new Buffer(e).toString("base64");if(void 0!==window.btoa)return window.btoa(r(e));let n,t,o,i,a,c,d,f,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u=0,w=0,A="",l=[];if(!e)return e;e=r(e);do{n=e.charCodeAt(u++),t=e.charCodeAt(u++),o=e.charCodeAt(u++),f=n<<16|t<<8|o,i=f>>18&63,a=f>>12&63,c=f>>6&63,d=63&f,l[w++]=h.charAt(i)+h.charAt(a)+h.charAt(c)+h.charAt(d)}while(u<e.length);A=l.join("");let C=e.length%3;return(C?A.slice(0,C-3):A)+"===".slice(C||3)}
/**
 *  @param 字符串
 * @returns URL编码
 */
export function urlencode(e){return e+="",encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/~/g,"%7E").replace(/%20/g,"+")}
/**
 *
 * @param 字符串
 * @returns  URL解码
 */
export function urldecode(e){return decodeURIComponent((e+"").replace(/%(?![\da-f]{2})/gi,function(){return"%25"}).replace(/\+/g,"%20"))}
/**
 * @returns unicode解码表情中文
 */
export function unicode_decode(e){return e=e.replace(/\\/g,"%"),unescape(e)}
/**
 * @param 字符串
 * @param 是否中文也编码
 * @returns unicode编码中文表情
 */
export function unicode_encode(n){if(1==(arguments.length>1&&void 0!==arguments[1]&&arguments[1])){for(let r=[],t=0;t<n.length;t++)r[t]=("00"+n.charCodeAt(t).toString(16)).slice(-4);return"\\u"+r.join("\\u")}let e=function(n){for(let r=[],t=0;t<n.length;t++)r[t]=("00"+n.charCodeAt(t).toString(16)).slice(-4);return"\\u"+r.join("\\u")},u=/[\ud800-\udbff][\udc00-\udfff]/g;return n=n.replace(u,function(n){return 2===n.length?e(n):n})}
/**
 * @param 字符串 emoji_encode("😋😘我们")
 * @returns 编码emoji
 */
export function emoji_encode(e){let n=/[\ud800-\udbff][\udc00-\udfff]/g;return e=e.replace(n,function(e){let n,r;return 2===e.length?(n=e.charCodeAt(0),r=e.charCodeAt(1),"&#"+(1024*(n-55296)+65536+r-56320)+";"):e})}
/**
 * emoji_decode("&#128523;&#128536;我们")
 * @param 字符串
 * @returns 解码emoji仅js中需要
 */
export function emoji_decode(e){let n=/\&#.*?;/g;return e.replace(n,function(e){let n,r,t;return 9==e.length?(t=parseInt(e.match(/[0-9]+/g)),n=Math.floor((t-65536)/1024)+55296,r=(t-65536)%1024+56320,unescape("%u"+n.toString(16)+"%u"+r.toString(16))):e})}
/**
 *base_convert(1234,10,2)10进制转2进制
 * @param 数字
 * @param 原进制
 * @param 新进制
 * @returns 任意进制转换
 */
export function base_convert(n,t,r){return parseInt(n+"",0|t).toString(0|r)}
/**
 * 证书+1 负数取本身 -3.23 得-3
 * @param 数字
 * @returns 进1法取整
 */
export function ceil(c){return Math.ceil(c)}
/**
 * 正数取整 负数+1取整 -3.2得4
 * @param 数字
 * @returns 舍去取整
 */
export function floor(o){return Math.floor(o)}
/**
 *number_format('150.456', 2, '.', ',')
 * @param 数字
 * @param 保留小数位数
 * @param 小数点显示符号
 * @param 千分位符号
 * @returns 格式化数字
 */
export function number_format(e,n,t,i){e=(e+"").replace(/[^0-9+\-Ee.]/g,"");let r=isFinite(+e)?+e:0,o=isFinite(+n)?Math.abs(n):0,a=void 0===i?",":i,d=void 0===t?".":t,u="";return u=(o?function(e,n){if(-1===(""+e).indexOf("e"))return+(Math.round(e+"e+"+n)+"e-"+n);let t=(""+e).split("e"),i="";return+t[1]+n>0&&(i="+"),(+(Math.round(+t[0]+"e"+i+(+t[1]+n))+"e-"+n)).toFixed(n)}(r,o).toString():""+Math.round(r)).split("."),u[0].length>3&&(u[0]=u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,a)),(u[1]||"").length<o&&(u[1]=u[1]||"",u[1]+=new Array(o-u[1].length+1).join("0")),u.join(d)}
/**
 * 可以不要参数
 * @param 最小
 * @param 最大
 * @returns 生成更好随机数
 */
export function mt_rand(r,e){let n=arguments.length;if(0===n)r=0,e=2147483647;else{if(1===n)throw new Error("Warning: mt_rand() expects exactly 2 parameters, 1 given");r=parseInt(r,10),e=parseInt(e,10)}return Math.floor(Math.random()*(e-r+1))+r}
/**
 * 可以不要参数
 * @param 最小
 * @param 最大
 * @returns 生成随机数
 */
export function rand(r,e){let n=arguments.length;if(0===n)r=0,e=2147483647;else if(1===n)throw new Error("Warning: rand() expects exactly 2 parameters, 1 given");return Math.floor(Math.random()*(e-r+1))+r}
/**
 *
 * @param 数字
 * @param 保留位数
 * @returns 四舍五入
 */
export function round(a,r,_){let e,t,o,D;if(r|=0,e=Math.pow(10,r),a*=e,D=a>0|-(a<0),o=a%1==.5*D,t=Math.floor(a),o)switch(_){case"PHP_ROUND_HALF_DOWN":a=t+(D<0);break;case"PHP_ROUND_HALF_EVEN":a=t+t%2*D;break;case"PHP_ROUND_HALF_ODD":a=t+!(t%2);break;default:a=t+(D>0)}return(o?a:Math.round(a))/e}
/**
 *strcut("我爱中国人",4,"...")
 * @param 字符串
 * @param 长度中文汉字算两个
 * @param 显示符号
 * @returns 字符串截取
 */
export function strcut(str,iMaxBytes,sSuffix){if(isNaN(iMaxBytes)){return str}if(strlen(str)<=iMaxBytes){return str}let i=0,bytes=0;for(;i<str.length&&bytes<iMaxBytes;++i,++bytes){if(str.charCodeAt(i)>255){++bytes}}sSuffix=sSuffix||"";return(bytes-iMaxBytes==1?str.substr(0,i-1):str.substr(0,i))+sSuffix};
/**
 * @param 字符串
 * @param 子字符串
 * @returns 查找字符串
 */
export function strfind(string, find) {return !(string.indexOf(find)=== -1);};
/**
 * date_eq('2019-10-22','2019-10-21') true
 * @param 前日期
 * @param 后日期
 * @returns 判断日期是否前边大于后边
 */
export function date_eq(strDate1,strDate2){let date1=new Date(strDate1.replace(/\-/g,"\/"));let date2=new Date(strDate2.replace(/\-/g,"\/"));if((date1-date2)>=0){return true;}else{return false;}}
/**
 * @param 时间戳10位
 * @returns 格式化时间
 */
export function timeline(tt){let today=new Date();let d=new Date(tt*1000);let m=today.getTime()-d.getTime();if(m<=0){m=1000}if(m<60*1000){return Math.floor(m/1000)+"秒前"}else{if(m<60*60*1000){return Math.floor(m/(1000*60))+"分钟前"}else{if(m<60*60*1000*24){return Math.floor(m/(1000*60*60))+"小时前"}else{if(m<60*60*1000*24*7){return Math.floor(m/(1000*60*60*24))+"天前"}else{if(m<60*60*1000*24*7*56){return Math.floor(m/(1000*60*60*24*7))+"周前"}else{return Math.floor(m/(1000*60*60*24*7*52))+"年前"}}}}}};
/**
 * @param str1
 * @param str2
 * @returns 判断两个字符串是否相等
 */
export const  is_eq=function(str1,str2){if(str1==str2){return(true)}else{return(false)}};
/**
 *
 * @param num
 * @returns 判断是否数字
 */
export const  is_num=function(num){let reg=new RegExp("^[0-9]*$");return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否手机号
 */
export const  is_phone=function(num){let reg=/^1\d{10}$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否QQ
 */
export const  is_qq=function(num){let reg=/^[1-utf8_decode]{1}\d{4,11}$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否邮箱
 */
export const  is_email=function(num){let reg=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否身份证
 */
export const  is_id=function(num){let reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;return reg.test(num)};
/**
 *
 * @param num
 * @returns 判断是否中文
 */
export const  is_chinese=function(num){let reg=/[\u4e00-\u9fa5]/g;return reg.test(num)};
/**
 * @param num 数字字母组成,下划钱字母开头
 * @returns 判断是否符合注册用户名
 */
export const  is_reg=function(num){let reg=/^([a-zA-z_]{1})([\w]*)$/g;return reg.test(num)};
/**
 *
 * @param str
 * @returns 判断是否电话
 */
export const  is_tel=function(str){let reg=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;return reg.test(str)};
/**
 *
 * @param strIP
 * @returns 判断是否是IP
 */
export const  is_ip=function(strIP){if(isNull(strIP)){return false}let re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;if(re.test(strIP)){if(RegExp.$1<256&&RegExp.$2<256&&RegExp.$3<256&&RegExp.$4<256){return true}}return false};
/**
 *
 * @param str
 * @returns 判断是否邮编
 */
export const  is_zipcode=function(str){let reg=/^(\d){6}$/;return reg.test(str)};
/**
 *
 * @param str
 * @returns 判断是否英文
 */
export const  is_english=function(str){let reg=/^[A-Za-z]+$/;return reg.test(str)};
/**
 *
 * @param str
 * @returns 判断是否是URL
 */
export const  is_url=function(url){ let strRegex =/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;let re = new RegExp(strRegex);return re.test(url);};
/**
 *
 * @param 整数
 * @param 最小
 * @param 最大
 * @returns 判断是否在两个整数内
 */
export const  in_int=function(n,iMin,iMax){if(!isFinite(n)){return false}if(!/^[+-]?\d+$/.test(n)){return false}if(iMin!=undefined&&parseInt(n)<parseInt(iMin)){return false}if(iMax!=undefined&&parseInt(n)>parseInt(iMax)){return false}return true};
/**
 *
 * @param 浮点数
 * @param 最小
 * @param 最大
 * @returns 判断是否在两个浮点数之内
 */
export const  in_float=function(n,fMin,fMax){if(!isFinite(n)){return false}if(fMin!=undefined&&parseFloat(n)<parseFloat(fMin)){return false}if(fMax!=undefined&&parseFloat(n)>parseFloat(fMax)){return false}return true};
/**
 *
 * @param url
 * @returns 判断是否http
 */
export const is_http=function(url){if(url.indexOf("http://")===-1&&url.indexOf("https://")===-1){return false}return true};

/**
 *
 * @param 数字
 * @returns 判断是否金额
 */
export function is_money(n){return!!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(n)}
/**
 * 类型 info success warn 没有url close自动关闭 goto跳转弹出 gopage跳转页面
 * 提示语
 * URL
 * @returns 弹出框
 */

export function msg(type='info',info,url) {
if(type=='close'){
   let str=empty(info)?'':alert(info);
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('closeWindow');});
}else if(type=='gopage'){
    let urls=empty(url)?'':location.href=url;
    let strs=empty(info)?'正在跳转中...':info;
    document.querySelector('head').innerHTML=`<meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=0'>`;
    document.querySelector('body').innerHTML=`<div style='font-size:16px;margin:30px auto;text-align:center;'>`+strs+`</div>`;
        urls;
}else if(type=='goto'){
    let str=empty(info)?'':alert(info);
    let urls=empty(url)?'':location.href=url;
    str;urls;
}else if(type=='info' || type=='warn' || type=='success'){
    let strs=empty(info)?'正在跳转中...':info;
    document.querySelector('head').innerHTML=`<meta charset='utf-8'><title>提示</title><meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0'>`;
let html=`<link rel='stylesheet'  href='https://res.wx.qq.com/open/libs/weui/0.4.3/weui.min.css'><div class='weui_msg'><div class='weui_icon_area'><i class='weui_icon_`+type+` weui_icon_msg'></i></div><div class='weui_text_area'><h4 class='weui_msg_title'>`+strs+`</h4></div></div>`;
    document.querySelector('body').innerHTML=html;
    document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {WeixinJSBridge.call("hideOptionMenu");});
}
}
/**
 *
 * @param 获取id
 * @param json数据
 * @returns 模板解析函数
 */
export function tpl(a,d){let c=function(l){let j,h=[],g=[];for(j in l){h.push(j);g.push(l[j])}return(new Function(h,c.$)).apply(l,g)};if(!c.$){let f=a.split("<%");c.$="let $=''";for(let b=0;b<f.length;b++){let e=f[b].split("%>");if(b!=0){c.$+="="==e[0].charAt(0)?"+("+e[0].substr(1)+")":";"+e[0].replace(/\r\n/g,"")+"$=$"}c.$+="+'"+e[e.length-1].replace(/\'/g,"\\'").replace(/\r\n/g,"\\n").replace(/\n/g,"\\n").replace(/\r/g,"\\n")+"'"}c.$+=";return $;"}return d?c(d):c};
/**
 *
 * @returns 全局浏览器变量
 */
export const browser={version:function(){let u=navigator.userAgent.toLowerCase(),app=navigator.appVersion;return{ie:u.indexOf("trident")>-1,opera:u.indexOf("tresto")>-1,webKit:u.indexOf("applewebkit")>-1,firefox:u.indexOf("gecko")>-1&&u.indexOf("khtml")==-1,mobile:!!u.match(/applewebkit.*mobile.*/),ios:!!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),android:u.indexOf("android")>-1||u.indexOf("linux")>-1,iphone:u.indexOf("iphone")>-1,ipad:u.indexOf("ipad")>-1,weixin:u.match(/micromessenger/i)=="micromessenger"}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase(),wifi:!function(t){let e=!0,n=t.navigator.userAgent,i=t.navigator.connection;if(/MicroMessenger/.test(n))if(/NetType/.test(n)){let o=n.match(/NetType\/(\S)+/)[0].replace("NetType/","");o&&"WIFI"!=o&&(e=!1)}else document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.invoke("getNetworkType",{},function(t){"network_type:wifi"!=t.err_msg&&(e=!1)})});else if(i){let a=i.type;"wifi"!=a&&"2"!=a&&"unknown"!=a&&(e=!1)}t.wifi=e}(window)};

/**
 *
 * @param key 支持字符串
 * @param value 只能字符串
 * @param time 过期时间 秒
 * @return 设置cookie
 */
export function setCookie(key, value, time){
    let d = new Date();
    d.setTime(d.getTime() + time*1000);
    document.cookie = key + "=" + value + "; expires=" + d.toGMTString();
}
/**
 * ls.set("text", "this is string",3);
 * ls.get("text")
 * ls.remove("a")
 * ls.clear()
 * @returns localStorage带过期时间秒
 */
let ls = {};

// 是否支持localStorage
if (!window.localStorage) {
    ls.support = false;
} else {
    ls.support = true;
}

// time为超时时间（单位毫秒），非必填
ls.set = function(key, value, time) {

    if (this.support) {
        time=time*1000;
        if (typeof key != "string") {
            console.log("*STORAGE ERROR* key必须是字符串");
            return;
        }
        if (time) {
            if (typeof time != "number") {
                console.log("*STORAGE ERROR* time必须是数字");
                return;
            } else {
                time = parseInt(time) + (new Date()).getTime();
            }
        } else {
            time = null;
        }
        let setValue = {
            value: JSON.stringify(value),
            time: time
        }
        localStorage.setItem(key, JSON.stringify(setValue));
    } else {
        ls.setCookie(key, value, time)
    }
};

// 不存在的值会返回null
ls.get = function(key) {
    if (this.support) {
        let getValue = JSON.parse(localStorage.getItem(key));
        if (!getValue) {
            return null;
        }
        if (getValue.time && getValue.time < (new Date()).getTime()) {
            localStorage.removeItem(key);
            return null;
        } else {
            return JSON.parse(getValue.value)
        }
    } else {
        ls.getCookie(key)
    }
};

// 移除某个值
ls.remove = function(key) {
    if (this.support) {
        localStorage.removeItem(key);
    } else {
        ls.removeCookie(key)
    }
};
// 清空存储
ls.clear = function() {
    if (this.support) {
        localStorage.clear();
    } else {
        ls.clearCookie();
    }
};

/**** cookie方法 ****/
ls.setCookie = function(key, value, time) {
    if (typeof key != "string") {
        console.log("*STORAGE ERROR* key必须是字符串");
        return;
    } else {
        if (typeof time != "number") {
            // cookie默认存365天
            time = 365 * 24 * 60 * 60;
        }
        setCookie(key, value, time);

    }
};
ls.getCookie = function(key) {
   return $_COOKIE(key);
};
ls.removeCookie = function(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
ls.clearCookie = function() {
    let cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        document.cookie = cookies[i].split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};
export {ls}
/**
 *
 * @param 0未知 1男 2女
 * @returns 返回性别名称
 */
export function sex(sex=0){const arr=['未知','男','女'];return arr[sex];}
/**
 * @param 字符
 * @returns 隐藏银行号码
 */
export function hidebank(s="6217995510035399947"){return s.replace(/^(\d{8})\d+(\d{4})$/,"$1*******$2");}
/**
 * @param 字符串
 * @returns 隐藏手机号中间四位
 */
export function hidephone(s="18291447788"){return s.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2");}
/**
 *
 * @param css代码
 * @returns 添加css代码
 */
export function addcss(t){let e=document.createElement("style");e.type="text/css";try{e.appendChild(document.createTextNode(t))}catch(d){e.text=t}document.head.appendChild(e)}
/**
 * @param js代码
 * @returns 添加js代码
 */
export function addjs(t){let e=document.createElement("script");e.type="text/javascript";try{e.appendChild(document.createTextNode(t))}catch(d){e.text=t}document.head.appendChild(e)}

/**
 *
 * @param js文件路径
 * @param 回调函数
 * @returns 加载js支持回调
 */
export const loadjs =(url, callback, opt={}) =>{
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (opt.id) {
        script.id = opt.id;
    }
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.body.appendChild(script);
}

/**
 *
 * @param css路径
 * @param 回调函数
 * @returns 加载css支持回调
 */
export function loadcss(e,n){let t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.onerror=function(){n(!1)},t.onload=function(){n(!0)},t.href=e,document.head.appendChild(t)}

/**
 *
 * @returns 当前域名主机
 */
export function gethost(){return window.location.protocol+"//"+window.location.host;}

/**
 * isfollowqr(null,true,"标题","内容")
 * 图片绝对路径
 * 是否显示关闭 默认true
 * 标题
 * 描述
 * @returns 关注二维码扫
 */
export function isfollowqr(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"http://open.weixin.qq.com/qr/code?username=youbairuanjian",o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"关注公众号",d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"感谢关注",n=document.createElement("div");n.classList.add("weui-model");let t=1==o?'<span class="close" onclick="let el=document.querySelector(\'.weui-model\');el.parentNode.removeChild(el);"></span>':"",l=1==o?"onclick=\"let el=document.querySelector(\'.weui-model\');el.parentNode.removeChild(el);\"":"";n.innerHTML='<div class="model-mask"  '+l+'></div><div class="model-main">'+t+'<div class="model-head"><div class="m-title"><p>'+i+"</p><p>"+d+'</p></div></div><div class="model-body"><div class="follow">\n    <img src="'+e+'">\n    <p>长按识别图中二维码</p>\n</div></div></div>',document.body.appendChild(n),addcss(".weui-model{width:100%;height:100%;position:fixed;z-index:9999;top:0;left:0;display:block;text-align:center}\n.model-mask{width:100%;height:100%;background-color:#000;opacity:.7;cursor:pointer}\n.model-main{width:80%;min-height:2.5em;background-color:#fff;color:#333;z-index:99999;border-radius:.2em;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}\n.model-main .close{position:absolute;top:-45px;right:-10px;width:35px;height:35px;padding:5px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAC70lEQVRIS52WTajVVRTFf6usaCKCQWRNmokNFGtUmNgzyMrvED/AgZEmiOCgqIZNkiwzFNICDcHPUWCkA0mLQM1IFCRRQdRUzIImKRK2ZMn5P87z3f+997UnF+45/732x9p7HdHFbD8MvATMA54FxgFjgRvAFeAo8A3wg6Q7ba7UdmB7EfAp8AewC/ge+B34C3gCeBp4Hci9W8AaSfs6+RsGYjuR7gWSxTuSEm2r2X4AWAx8CJwGFkr6p/5gCIjtCcABYKOkdd2c339m+xFgDzAemCHpQnNnEMT2k8DxEv2OkQA0d23H3xfA1PRQ0s2c3QOx/SBwEvhE0tf/B6ACiq+fgHOSltYgy4HpkhZUl8ekuZJO9AK1nW8PVt8+HpAQQ9KPsj0KuAgMSDpTXZwDbC//p4wdzfZK4GNgsqQ4vme2VwNvSpoYkJeB9yQNdGhm0t3UBmR7GfB5qcKx+vtChNB9ICBp1FlJn3UK1XaANhZHgxnZXgJsKQEMAaiyyaCeD8gvwHJJv3YpycLiMLU/bvsNYFuhaprcVso1wNyAXAUmScpkt5rtBijz8y7wqqRWgNKXBLMuILeBRyX91weLvgTeAj6Q9FEf96cA+wNyrTAjv90yaUq0NkQBZko63OObmSFOQDIHb0vq2Lwq7a1NiWy/BuzuBWR7BbAsIF8BZyRl4w4z27OAncArdQ/6AbKdwG4FZD6wStK0DnMSgOyx2ZKy6odYNyDbDxVZWBKQ0cAl4EVJpyqOp2nZyKn9MIDqXlO60Huw5GVQN0TomgUZSkb9nm9YViY2q+JIHyx6AfhZ0r+lh9Gi88B6SRsakKSWYfxW0vu9nPY6t51BnQQ8F1mu9eSpRFP2WBbjiK3oSVZQ6D5R0vU4uV8ZnwG+Azb3M2x1FJUyJoMo42/NeZvGR0YjpyPV+LNF4/+uA+j2WsnjILOTlDN4YdjlltdKVlICyr1h1gpSsSQ6M7e8u/IUegz4s7y7svqzzg81zOoEchflLmD7O1+wYQAAAABJRU5ErkJggg==) no-repeat center center;background-size:auto;background-size:25px 25px}\n.model-main .model-head{font-size:20px;padding:.6em 0;background:-webkit-gradient(linear,left top,left bottom,from(#fd7a71),to(#e5484c));background:-webkit-linear-gradient(top,#fd7a71,#e5484c);background:linear-gradient(to bottom,#fd7a71,#e5484c);border-radius:.1em .1em 0 0;position:relative}\n.model-main .model-head p{color:#fff}.model-main .model-head p:nth-child(1){font-size:20px;line-height:1.5;font-weight:bold}\n.model-main .model-head p:nth-child(2){font-size:16px;line-height:1.5}.model-main .model-body{padding:.5em;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:5em;width:100%}\n.model-main .model-body img{margin-top:.1em;width:70%}.model-main .model-body p{color:#333;line-height:1.6;font-size:16px}")}
/**
 *
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 * @return 构造树型结构数据
 */
export function handleTree(data, id, parentId, children, rootId) {
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId = rootId || 0
    //对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
    //循环所有项
    const treeData =  cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
            //返回每一项的子级数组
            return father[id] === child[parentId]
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
    });
    return treeData != '' ? treeData : data;
}
/*友好显示数字,十万以上显示10w+,一万以上显示1.00w,一千以上显示1.00k*/
export function n(num) {
    if (num >= 100000) {
        num = round(num / 10000) + 'w+';
    } else if (num >= 10000) {
        num = round(num / 10000, 2) + 'w';
    } else if (num >= 1000) {
        num = round(num / 1000, 2) + 'k';
    }

    return num;
}