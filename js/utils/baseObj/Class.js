
/**
 * 继承
 */
function extendClass(subClass, superClass) {
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superclass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

/**
 * 
 */
function mixinClass(c, mixins) {
    var prototype = {},
        constructors = mixins['concat'](c);
    $.each(constructors, function (index, ext) {
        if (ext) {
            var proto = ext.prototype;
            for (var p in proto) {
                if (proto.hasOwnProperty(p)) {
                    prototype[p] = proto[p];
                }
            }
        }
    });

    $.each(prototype, function (k, v) {
        c.prototype[k] = v;
    });
    return c;
}