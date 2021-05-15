//Path类
var Path = {
    //文件名称相同
    equalsFile: function (file1, file2) {
        return file1.replace('/', '\\') == file2.replace('/', '\\')
    },

    //获取文件名部分
    getFileName: function (filePath) {
        var char1 = '/',
            char2 = '\\',
            lastIndexChar1 = filePath.lastIndexOf(char1),
            lastIndexChar2 = filePath.lastIndexOf(char2),
            lastIndex = [lastIndexChar1, lastIndexChar2].max();

        return filePath.substr(lastIndex + 1);
    },

    //获取文件夹最后一级目录
    getLastDirecroty: function (dirPath) {
        var char1 = '/',
            char2 = '\\',
            lastIndexChar1 = dirPath.lastIndexOf(char1),
            lastIndexChar2 = dirPath.lastIndexOf(char2),
            lastIndex = [lastIndexChar1, lastIndexChar2].max();

        return dirPath.substr(lastIndex + 1);
    },

    //获取文件名不带后缀
    getFileNameWithoutExtension: function (filePath) {
        var fileName = this.getFileName(filePath);
        var lastIndex = fileName.lastIndexOf('.');
        return fileName.substring(0, lastIndex);
    },

    //获取文件扩展名
    getExtension: function (filePath) {
        var fileName = this.getFileName(filePath);
        var lastIndex = fileName.lastIndexOf('.');
        return fileName.substr(lastIndex);
    },

    //获取目录路径
    getDirectory: function (filePath) {
        var char1 = '/',
            char2 = '\\',
            lastIndexChar1 = filePath.lastIndexOf(char1),
            lastIndexChar2 = filePath.lastIndexOf(char2),
            lastIndex = [lastIndexChar1, lastIndexChar2].max();
        return filePath.substring(0, lastIndex);
    },

    //拼接路径
    combine: function (path1, path2, path3, path4/*,PathN*/) {
        var pathArray = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            pathArray.push(arguments[i]);
        }

        return pathArray.join('/');

    },
    
    //拼接路径，并且判断每个path都不是null或者undefined，否则返回空
    combineAllWithoutNull: function (path1, path2, path3/*,pathN*/) {
        var pathArray = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            if (!arguments[i] || arguments[i] == "") {
                return "";
            }
            pathArray.push(arguments[i]);
        }
        return pathArray.join('/');
    }
};
