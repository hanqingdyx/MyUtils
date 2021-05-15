
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
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 时间对象的格式化
 * @param format 格式化
 * @return 格式化后的字符串
 */
Date.prototype.format2 = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
 * 日期格式化输出
 * @param format  yyyy-MM-dd
 */
Date.prototype.toFormatString = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

/**
 * 在日期上添加天数
 * @param days 数字
 * @return 新日期
 */
Date.prototype.addDays = function (days) {
    var nd = new Date(this);
    nd.setDate(nd.getDate() + days);
    return nd;
};

/**
 * 在日期上添加小时
 * @param days 数字
 * @return 新日期
 */
Date.prototype.addHours = function (hours) {
    var nd = new Date(this);
    nd.setHours(nd.getHours() + parseInt(hours));
    return nd;
};

/**
 * 时间格式化的工具函数
 */
 const DateConvert = {
	/**
	 * 将14位数字字符串转成19位标准日期格式的字符串
	 * 20160101100000 ==> 2016-01-01 10:00:00
	 * @param str 14位字符串
	 * @return 19位标准日期格式
	 */
	date14to19: function(str){
		if (str != undefined && str != "") {
			var st = str.substring(0, 4) + "-" + str.substring(4, 6) + "-"
					+ str.substring(6, 8) + " " + str.substring(8, 10) + ":"
					+ str.substring(10, 12) + ":" + str.substring(12, 14);
			return st;
		}
		return "";
	},

	/**
	 * 将19位标准日期格式的字符串转成14位数字字符串
	 * 2016-01-01 10:00:00 ==> 20160101100000
	 * @param str 19位标准日期格式的字符串
	 * @return 14位数字字符串
	 */
	date19to14: function(str){
		var st = '';
		if (str != undefined && str != "") {
			st = str.replace(/\-/g,"").replace(/\:/g,"").replace(/\ /g,"");
		}
		return st;
	},

	/**
	 * 将14位数字字符串转日期格式
	 * 20160101100000 ==> 2016/01/01 10:00:00
	 * @param str 14位字符串
	 * @return 日期
	 */
	dateFormat: function(str){
		if (str != undefined && str != "") {
			var st = str.substring(0, 4) + "/" + str.substring(4, 6) + "/"
					+ str.substring(6, 8) + " " + str.substring(8, 10) + ":"
					+ str.substring(10, 12) + ":" + str.substring(12, 14);
			return new Date(st);
		}
	},

	/**
	 * 日期14位数到16
	 * 20160101100000 ==> 2016-01-01 10:00
	 * @param  str 14位日期字符串
	 * @return 日期字符串
	 */
	date14to16: function(str){
		if (str != undefined && str != "") {
			var st = str.substring(0, 4) + "-" + str.substring(4, 6) + "-"
					+ str.substring(6, 8) + " " + str.substring(8, 10) + ":"
					+ str.substring(10, 12);
			return st;
		}
		return "";
	},

	/**
	 * 日期8位数到10
	 * 20160101 ==> 2016-01-01
	 * @param  str 8位日期字符串
	 * @return 日期字符串
	 */
	date8to10: function(str){
		if (str != undefined && str != "") {
			var st = str.substring(0, 4) + "-" + str.substring(4, 6) + "-"
					+ str.substring(6, 8);
			return st;
		}
		return "";
	},

	//
	/**
	 * 日期14位数到8
	 * 20160101100000 ==> 20160101
	 * @param  str 8位日期字符串
	 * @return 日期字符串
	 */
	date14to8: function(str){
		if (str != undefined && str != "") {
			var st = str.substring(0, 8);
			return st;
		}
		return "";
	},

	/**
	 * 将14位字符串转为时间对象 [!]
	 * @param str 14位日期字符串
	 * @return 日期对象
	 */
	StringToDate: function(str){
		return new Date(Str.replace(/-/, "/"));
	},
	
	/**
	 * 计算两个时间的天数差
	 * @param  d1 时间对象1
	 * @param  d2 时间对象2
	 * @return 天数
	 */
	dateDiff: function(d1, d2){
		var time = d2.getTime() - d1.getTime();
	    var days = parseInt(time / (1000 * 60 * 60 * 24));
	    return days;
	}
};

