/**
 * 伪hash表
 */
function HashTable() {
    this._hash = {};
    this._count = 0;
    this.add = function (key, value) {
        if (this._hash.hasOwnProperty(key)) return false;
        else {
            this._hash[key] = value;
            this._count++;
            return true;
        }
    };
    this.remove = function (key) {
        delete this._hash[key];
        this._count--;
    };
    this.count = function () {
        return this._count;
    };
    this.items = function (key) {
        if (this.contains(key))
            return this._hash[key];
        else
            return undefined;
    };

    this.getKey = function (value) {

        for (var prop in this._hash) {
            if (prop.propertyIsEnumerable && this._hash[prop] == value) {
                return prop;
            }
        }
        return undefined;
    };

    this.contains = function (key) {
        return this._hash.hasOwnProperty(key);
    };
    this.keys = function () {
        var keys = [];
        for (var prop in this._hash) {
            if (prop.propertyIsEnumerable) {
                keys.push(prop);
            }
        }
        return keys;
    };
    this.clear = function () {
        delete this._hash;
        this._hash = {};
        this._count = 0;
    }
}
