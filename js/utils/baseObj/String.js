
/**
 * 字符串格式化方法
 * @param arguments[0] 格式化字符串,arguments[1...n]
 * eg: var test = String.format('{0}今年{1}岁','js',18); ==> js今年18岁
 */
String.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

/**
 * 利用占位符格式化字符串
 * 例如："你好，{0}, {1}".format('Jack', '欢迎!') = "你好，Jack, 欢迎!";
 */
String.prototype.format = function () {
    var s = this, i = arguments.length;

    while (i-- >= 0) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

/**
 * 获取参数中在字符串中最大的索引值
 * 依赖于 Array.prototype.max
 */
String.prototype.lastIndexOfMulti = function () {
    if (arguments == null || arguments.length <= 0)
        return -1;

    var that = this;
    var indexArray = [];
    for (var argsIndex = 0; argsIndex < arguments.length; argsIndex++) {
        indexArray.push(that.lastIndexOf(arguments[argsIndex]));
    }
    return indexArray.max();
};

/*
* 去除字符串中的空格
*/
String.prototype.trimAll = function () {
    var s = this;
    return s.replace(/\s+/g, '');
};

/**
 * 去除字符串左边的空格
 */
String.prototype.leftTrim = function () {
    if (this.length == 0)
        return '';

    return this.replace(/(^\s*)/g, '');
};

/**
 * 数据的补充
 * @param total 数据长度
 * @param padChar 希望补充的字符
 */
String.prototype.padLeft = function (total, padChar) {
    var d = this;
    while (d.length < total) {
        d = padChar + d;
    }
    return d;
}

/**
 * 截获指定长度的字符串，多出的部分由...显示
 */
String.prototype.cutShot = function (maxLength) {
    var str = this;
    str = str.toString();
    if (str == null || str == "")
        return;
    var nameAvgTotalLength = str.replace(/[^\x00-\xff]/g, "**").length;
    maxLength = nameAvgTotalLength - maxLength + 3;
    if (maxLength > 0) {
        if (nameAvgTotalLength > maxLength) {
            var newstr = "";
            var newStrBackName = "";
            var nameLength = str.length;
            var totalLength = 0;
            var avgLength = nameAvgTotalLength - maxLength;
            nameAvgTotalLength -= avgLength;
            var strList = str.split("");
            for (var i = 0; i < nameLength; i++) {
                var cName = strList[i];
                if (/^[\u4e00-\u9fa5]$/.test(cName)) {
                    totalLength += 2;
                }
                else {
                    totalLength += 1;
                }
                if (totalLength <= avgLength || totalLength > nameAvgTotalLength) {
                    if (totalLength <= avgLength)
                        newstr += cName;
                    else
                        newStrBackName += cName;
                }
            }
            str = newstr + "...";
        }
    }
    return str;
}

/**
 * 替换字符串中指定位置的指定长度的字符串替换为新字符串
 * @param start
 * @param length
 * @param replaceString
 */
String.prototype.replaceWith = function (start, length, replaceString) {
    var cutStr = this.substr(start, length);
    var prefixStr = '', afterStr = '';
    if (start > 0) {
        prefixStr = this.substring(0, start);
    }
    if (start + length < this.length) {
        afterStr = this.substring(start + length, this.length);
    }
    return [prefixStr, replaceString, afterStr].join('');
};

/**
  * 部分浏览器不支持 replaceAll 函数
  * e.g. CommonUtil.replaceAll('1,2,3', /,/g, '#') => 1#2#3
  * @param a
  * @param b 正则
  * @param c
  * @returns {*}
  */
function replaceAll (a, b, c) {
    if (CommonUtil.isNotEmpty(a) && CommonUtil.isNotEmpty(b)) {
        return a.replace(eval('/' + b + '/g'), c || '');
    } else {
        return a;
    }
}

function equalsIgnoreCase (a, b) {
    if ((typeof a != "undefined") && typeof b != "undefined") {
        return a.toLowerCase() == b.toLowerCase();
    } else {
        return a == b;
    }
};