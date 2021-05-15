/**
 * Guid类
 */
const Guid = {
    //创建guid
    create: function () {
        let guid = "";
        const len = 32;
        for (let i = 1; i <= len; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i % 4 == 0) && i < len)
                guid += "-";
        }
        return guid;
    }
};