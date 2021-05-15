
/**
 * 过滤特殊字符
 */
function charFilter(data){
    if(!$.trim(data)){
        return false;
    }
    data = data.toLowerCase();
    var xssChar = ['<','>','\'','\\','&','||','script','document.','window.'];
    var len = xssChar.length;
    for(var i=0;i<len;i++){
        if(data.indexOf(xssChar[i]) > -1){
            return true;
        }
    }
    return false;
}

/**
 * 转义特殊字符为html符号
 * (-& #40;，)-& #41;，<-& lt;，>-& gt;，'-& #39;
 */
function charTranslate(data){
    if(!$.trim(data)){
        return '';
    }
    //务必保证 targetChar 与 resultChar 一一对应
    var targetChar = ['& #40;', '& #41;','& lt;','& gt;','& #39;'];
    var resultChar = ['(', ')','<','>','\''];
    var len = targetChar.length;
    for(var i=0;i<len;i++){
        if(data.indexOf(targetChar[i]) > -1){
            data = data.replace(new RegExp(targetChar[i],'g'),resultChar[i]);
        }
    }
    return data;
}

