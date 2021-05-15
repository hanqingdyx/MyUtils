
/**
  * 获取复选框选中的值
  * @param name
  * @returns {Array}
  */
 function getCheckboxValue (name) {
     let obj = document.getElementsByName(name);
     let check_val = [];
     for (let k in obj) {
         if (obj[k].checked)
             check_val.push(obj[k].value);
     }
     return check_val;
 };

 function hasDom (a) {
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
 function isDomExist (a) {
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
 }

/**
 * dom 加载完后执行回调函数
 * @param id
 * @param callback
 * @param times
 */
function initedExecute(id, callback, times) {
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
 * 滚动到指定元素的位置
 * @param id
 */
function scrollIntoView (id) {
    document.getElementById(id).scrollIntoView();
};

 /**
  * dom元素的父节点中是否有对应的className
  * @param dom
  * @param className
  * @returns {boolean}
  */
  function hasParentClass(dom, className) {
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
 function getParentByClass(key, className, keyType, parentDom) {
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
        //注意：isOutermostDom 判断是否是最外层的dom，避免内存溢出。此方法需要调用出实现
        return isOutermostDom(parent) ? null : getParentByClass(key, className, keyType, parent);
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
 function getParentByTag (key, tagName, keyType, parentDom) {
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
        //注意：isOutermostDom 判断是否是最外层的dom，避免内存溢出。此方法需要调用出实现
        return isOutermostDom(parent) ? null : getParentByTag(key, tagName, keyType, parent);
    } else {
        return parent;
    }
}