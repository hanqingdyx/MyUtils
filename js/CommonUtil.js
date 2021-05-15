/**
 * 项目常用工具类
 */
 const CommonUtil = {};

 /**
  * isUndefined
  */
 CommonUtil.isUndef = function (v) {
     return typeof v === 'undefined';
 }
 
 /**
  * isDefined
  */
 CommonUtil.isDef = function (v) {
     return typeof v !== 'undefined';
 }
 
 CommonUtil.isUndefOrNull = function (a) {
     return (typeof a === "undefined") || a === null;
 }
 
 CommonUtil.isDefAndNotNull = function (a) {
     return (typeof a !== "undefined") && a !== null;
 }
 
 CommonUtil.isEmpty = function (v) {
     return typeof v === 'undefined' || v === null || v === '';
 }
 
 CommonUtil.isNotEmpty = function (v) {
     return typeof v !== 'undefined' && v !== null && v !== '';
 }
 
 CommonUtil.isArray = function (a) {
     return a instanceof Array;
 };
 
 CommonUtil.isEmptyArray = function (a) {
     return CommonUtil.isEmpty(a) || ((a instanceof Array) && a.length == 0);
 };
 
 CommonUtil.isNotEmptyArray = function (a) {
     return CommonUtil.isNotEmpty(a) && (a instanceof Array) && a.length > 0;
 };
 
 CommonUtil.isTrue = function (v) {
     return v === true
 }
 
 CommonUtil.isFalse = function (v) {
     return v === false
 }
 
 CommonUtil.isLikeTrue = function (v) {
     return v === true || v === 'true' || v === 'True';
 }
 
 CommonUtil.isLikeFalse = function (v) {
     return v === false || v === 'false' || v === 'False';
 }
 
 
 /**
  * 是否是原始类型
  */
 CommonUtil.isPrimitive = function (v) {
     return (
         typeof v === 'string' ||
         typeof v === 'number' ||
         typeof v === 'symbol' ||
         typeof v === 'boolean'
     )
 }
 
 CommonUtil.isObject = function (obj) {
     return typeof obj !== 'undefined' && obj !== null && typeof obj === 'object'
 }
 
 
 /**
  * Convert an input value to a number for persistence.
  * If the conversion fails, return original string.
  */
 CommonUtil.toNumber = function (val) {
     const n = parseFloat(val)
     return isNaN(n) ? val : n
 }
 
 CommonUtil.remove = function (arr, item) {
     if (arr.length) {
         const index = arr.indexOf(item)
         if (index > -1) {
             return arr.splice(index, 1)
         }
     }
 }
 
 /**
  * 判断对象是否相等（vue中的实现）
  */
 CommonUtil.looseEqual = function (a, b) {
     if (a === b) return true
     const isObjectA = isObject(a)
     const isObjectB = isObject(b)
     if (isObjectA && isObjectB) {
         try {
             const isArrayA = Array.isArray(a)
             const isArrayB = Array.isArray(b)
             if (isArrayA && isArrayB) {
                 return a.length === b.length && a.every((e, i) => {
                     return looseEqual(e, b[i])
                 })
             } else if (a instanceof Date && b instanceof Date) {
                 return a.getTime() === b.getTime()
             } else if (!isArrayA && !isArrayB) {
                 const keysA = Object.keys(a)
                 const keysB = Object.keys(b)
                 return keysA.length === keysB.length && keysA.every(key => {
                     return looseEqual(a[key], b[key])
                 })
             } else {
                 /* istanbul ignore next */
                 return false
             }
         } catch (e) {
             /* istanbul ignore next */
             return false
         }
     } else if (!isObjectA && !isObjectB) {
         return String(a) === String(b)
     } else {
         return false
     }
 }
 
 /**
  * 获取url中的所有参数
  */
 CommonUtil.getUrlParamter = (url) => {
     url = url || location.href;
     const params = {};
     let name, value;
     let num = url.indexOf("?")
     url = url.substr(num + 1);
     const arr = url.split("&");
     for (let i = 0; i < arr.length; i++) {
         num = arr[i].indexOf("=");
         if (num > 0) {
             name = arr[i].substring(0, num);
             value = arr[i].substr(num + 1);
             params[name] = value;
         }
     }
     return params;
 }
 
 /**
  * 生产Guid
  * @returns
  */
 CommonUtil.createGuid = () => {
     let guid = "";
     const len = 32;
     for (let i = 1; i <= len; i++) {
         let n = Math.floor(Math.random() * 16.0).toString(16);
         guid += n;
         if ((i % 4 == 0) && i < len)
             guid += "-";
     }
     return guid;
 }
 
 
 /*
 * 去除字符串中的所有空格
 */
 CommonUtil.trimAll = (s) => {
     return s.replace(/\s+/g, '');
 };
 
 /**
  * 数据的补充
  * @param total 数据长度
  * @param padChar 希望补充的字符
  */
 CommonUtil.padLeft = (s, total, padChar) => {
     while (s.length < total) {
         s = padChar + s;
     }
     return s;
 }
 
 /**
  * 将日期转成指定格式字符串
  * @param dateTime  时间毫秒数
  * @param fmt       返回的日期格式 默认 yyyy-mm-dd hh:MM:ss
  * @returns 转换后的日期字符串
  */
 CommonUtil.dateFormatStr = (dateTime, fmt) => {
     fmt = typeof fmt == "undefined" || fmt == null || fmt == "" ? "yyyy-MM-dd hh:mm:ss" : fmt;
     if (dateTime == null || dateTime == undefined) {
         return '';
     }
     let date = new Date(dateTime);
     let o = {
         "M+": date.getMonth() + 1, //月份
         "d+": date.getDate(),      //日
         "h+": date.getHours(),     //小时
         "m+": date.getMinutes(),   //分
         "s+": date.getSeconds(),   //秒
         "q+": Math.floor((date.getMonth() + 3) / 3), //季度
         "S": date.getMilliseconds()                  //毫秒
     };
     if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
     }
     for (let k in o) {
         if (new RegExp("(" + k + ")").test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         }
     }
     return fmt;
 }
 
 /** 对Date的扩展，将 Date 转化为指定格式的String
  * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
  * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  * eg:
  * (new Date()).pattern("yyyy-MM-dd HH:mm:ss")==> 2006-07-02 18:09:04
  * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
  * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
  * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
  * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
  * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
  */
 CommonUtil.dateFormtter = (date, fmt) => {
     const o = {
         "M+": this.getMonth() + 1, //月份
         "d+": this.getDate(), //日
         "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
         "H+": this.getHours(), //小时
         "m+": this.getMinutes(), //分
         "s+": this.getSeconds(), //秒
         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
         "S": this.getMilliseconds() //毫秒
     };
     const week = {
         "0": "/u65e5",
         "1": "/u4e00",
         "2": "/u4e8c",
         "3": "/u4e09",
         "4": "/u56db",
         "5": "/u4e94",
         "6": "/u516d"
     };
     if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     }
     if (/(E+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
     }
     for (var k in o) {
         if (new RegExp("(" + k + ")").test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         }
     }
     return fmt;
 }
 
 
 /**
  * 部分浏览器不支持 replaceAll 函数
  * e.g. CommonUtil.replaceAll('1,2,3', /,/g, '#') => 1#2#3
  * @param a
  * @param b 正则
  * @param c
  * @returns {*}
  */
 CommonUtil.replaceAll = function (a, b, c) {
     if (CommonUtil.isNotEmpty(a) && CommonUtil.isNotEmpty(b)) {
         return a.replace(eval('/' + b + '/g'), c || '');
     } else {
         return a;
     }
 }
 
 CommonUtil.equalsIgnoreCase = function (a, b) {
     if ((typeof a != "undefined") && typeof b != "undefined") {
         return a.toLowerCase() == b.toLowerCase();
     } else {
         return a == b;
     }
 };
 
 CommonUtil.hasDom = function (a) {
     return CommonUtil.isNotEmpty(a) && $('#' + a);
 };
 
 CommonUtil.getDom = function (a) {
     return CommonUtil.isEmpty(a) ? null : $('#' + a);
 };
 
 /**
  * 判断dom元素是否存在
  * @param a dom对象 || domId
  * @returns
  */
 CommonUtil.isDomExist = function (a) {
     const typeOf = typeof a;
     let $dom = null;
     if (typeOf == 'string') {
         $dom = $('#' + a);
     } else if (typeOf == 'object') {
         $dom = a;
     }
     if ($dom && $dom.length >= 1) {
         return true;
     } else {
         return false;
     }
 };
 
 /**
  * 获取复选框选中的值
  * @param name
  * @returns {Array}
  */
 CommonUtil.getCheckboxValue = function (name) {
     let obj = document.getElementsByName(name);
     let check_val = [];
     for (let k in obj) {
         if (obj[k].checked)
             check_val.push(obj[k].value);
     }
     return check_val;
 };
 
 /**
  * string2JsonObj
  * @param param
  * @returns {{}}
  */
 CommonUtil.parseJson = function (a) {
     let result = {};
     if (a) {
         if (typeof a == 'string') {
             try {
                 result = JSON.parse(a);
             } catch (e) {
                 console.log('CommonUtil.parseJson()数据类型转换出错:' + a);
             }
         } else if (typeof a == 'object') {
             result = a;
         }
     }
     return result;
 };
 
 /**
  * object2string
  * @param a
  * @returns {string}
  */
 CommonUtil.jsonStringify = function (a) {
     let result = '';
     if (CommonUtil.isNotEmpty(a)) {
         if (typeof a == 'string') {
             result = a;
         } else if (typeof a == 'object') {
             result = JSON.stringify(a);
         }
     }
     return result;
 };
 
 /**
  * url拼接
  * @param cxtPath
  * @param url
  * @returns {string}
  */
 CommonUtil.joinUrl = function (cxtPath, url) {
     cxtPath = cxtPath || '';
     url = url || '';
     cxtPath = cxtPath.endsWith('/') ? cxtPath : (cxtPath + '/');
     if (url.startsWith('/')) {
         url = url.substr(1);
     }
     return cxtPath + url;
 };
 
 /**
  * 滚动到指定元素的位置
  * @param id
  */
 CommonUtil.scrollIntoView = function (id) {
     document.getElementById(id).scrollIntoView();
 };
 
 /**
  * 编码XSS字符串
  * @param str
  * @returns {*}
  */
 CommonUtil.filterXSS = function (str) {
     if (CommonUtil.isNotEmpty(str)) {
         str = str.toString();
         str = str.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#39;');
     }
     return str;
 };
 
 /**
  * 还原XSS编码前的字符串
  * @param str
  * @returns {*}
  */
 CommonUtil.parseXSSStr = function (str) {
     if (CommonUtil.isNotEmpty(str)) {
         str = str.toString();
         str = str.replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, '\'');
     }
     return str;
 };
 
 /**
  * dom 加载完后执行回调函数
  * @param id
  * @param callback
  * @param times
  */
 CommonUtil.initedExecute = function (id, callback, times) {
     times = times || 200;
     let initedInterval = setInterval(function () {
         let domLen = $('#' + id).length;
         if (domLen > 0) {
             if (callback) {
                 callback();
             }
             clearInterval(initedInterval);
         }
     }, times);
 };
 
 
 /**
  * dom元素的父节点中是否有对应的className
  * @param dom
  * @param className
  * @returns {boolean}
  */
 CommonUtil.hasParentClass = function (dom, className) {
     if (dom && dom.parent() && dom.parent().length > 0) {
         if (dom.parent().hasClass(className)) {
             return true;
         } else {
             return CommonUtil.hasParentClass(dom.parent(), className);
         }
     } else {
         return false;
     }
 }
 
 /**
  * 根据class找父元素
  * @param key
  * @param className
  * @param keyType id(默认值)、name
  * @param parentDom
  * @returns {null|*}
  */
 CommonUtil.getParentByClass = function (key, className, keyType, parentDom) {
     if (CommonUtil.isEmpty(key)) {
         return null;
     }
     let parent = null;
     if (parentDom) {
         parent = parentDom.parent();
     } else {
         let idDom = null;
         if (keyType == 'name') {
             idDom = $('[name=' + key + ']');
         } else {
             idDom = $('#' + key);
         }
         parent = idDom.parent();
     }
     if (parent && !parent.hasClass(className)) {
         return FreHelper.isOutermostDom(parent) ? null : CommonUtil.getParentByClass(key, className, keyType, parent);
     } else {
         return parent;
     }
 };
 
 /**
  * 根据tag找父元素
  * @param id
  * @param tagName
  * @param keyType id(默认值)、name
  * @param parentDom
  * @returns {null|*}
  */
 CommonUtil.getParentByTag = function (key, tagName, keyType, parentDom) {
     if (CommonUtil.isEmpty(key)) {
         return null;
     }
     let parent = null;
     if (parentDom) {
         parent = parentDom.parent();
     } else {
         let idDom = null;
         if (keyType == 'name') {
             idDom = $('[name=' + key + ']');
         } else {
             idDom = $('#' + key);
         }
         parent = idDom.parent();
     }
     if (parent && parent.prop('tagName').toLowerCase() != tagName.toLowerCase()) {
         return FreHelper.isOutermostDom(parent) ? null : CommonUtil.getParentByTag(key, tagName, keyType, parent);
     } else {
         return parent;
     }
 };
 
 /**
  * 去掉html标签(此方法有副作用，会将用户自己输入的html过滤掉)
  * @param text
  * @returns {string}
  * @constructor
  */
 CommonUtil.HTMLDecode = function (text) {
     let temp = document.createElement("div");
     temp.innerHTML = text;
     const output = temp.innerText || temp.textContent;
     temp = null;
     return output;
 }