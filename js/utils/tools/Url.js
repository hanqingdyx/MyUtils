
/**
 * 扩展的jquery的取url参数方法
 * 依赖于 Guid.create()
 * eg:var param = $.getUrlVar('index');
 */
$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        //针对value中含有||&||   认为是&   ||=||   认为是=
        var identifier1 = Guid.create();
        var identifier2 = Guid.create();
        var urlHandle = window.location.href.slice(window.location.href.indexOf('?') + 1).
            replace(/\|\|&\|\|/g, identifier1).replace(/\|\|=\|\|/g, identifier2);
        var hashes = urlHandle.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if (hash.length == 2) {
                vars.push(hash[0]);
                var reg1 = new RegExp(identifier1, 'g');
                var reg2 = new RegExp(identifier2, 'g');
                vars[hash[0]] = hash[1].replace(reg1, '&').replace(reg2, '=');
            }
        }
        return vars;
    },
    
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

/**
 * 获取url中的所有参数
 */
function getUrlParamter(url){
    url = url || location.href;
    const params = {};
    let name,value;
    let num=url.indexOf("?")
    url=url.substr(num+1);
    const arr=url.split("&");
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            params[name]=value;
        }
    }
    return params;
}

function UrlRegEx(url) {
    //如果加上/g参数，那么只返回$0匹配。也就是说arr.length = 0   
    var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
    //re.exec(url);   
    var arr = url.match(re);
    return arr;
}
