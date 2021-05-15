/**
 * 
 * @param {判断对象是否相等（vue中的实现）} a 
 * @param {*} b 
 * @returns 
 */
function looseEqual(a, b) {
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
  * string2JsonObj
  * @param param
  * @returns {{}}
  */
function parseJson (a) {
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
 function jsonStringify (a) {
    let result = '';
    if (typeof v !== 'undefined' && v !== null && v !== '') {
        if (typeof a == 'string') {
            result = a;
        } else if (typeof a == 'object') {
            result = JSON.stringify(a);
        }
    }
    return result;
};