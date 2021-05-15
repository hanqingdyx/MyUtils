//Storage工具类
const StorageCommon = {};

/**
 * 设置cookie到根路径
 */
StorageCommon.setCookie = function(key, v){
    //设置cookie到根路径
    document.cookie = key + '=' + v + ';path=/';
};

/**
 * 获取cookie
 * @param name
 * @returns {null}
 */
StorageCommon.getCookie = function(key) {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return arr[2];
    } else {
        return null;
    }
};

/**
 * 删除根路径cookie
 * @param key
 */
StorageCommon.deleteCookie = function(key) {
    var date = new Date();
    //将date设置为过去的时间
    date.setTime(date.getTime() - 1000);
    //将userId这个cookie删除
    document.cookie = key + '=; expires=' + date.toGMTString() + ';path=/';
};