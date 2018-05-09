// 时间戳转时间
export const timestampToDate = function(format, timestamp = null) {
    let date = null;
    date = new Date();
    if (timestamp !== null) {
        date.setTime(timestamp * 1000);
    }
    var _date = {
           "M+": (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
           "d+": date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate(),
           "h+": date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours(),
           "m+": date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes(),
           "s+": date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds(),
           "q+": Math.floor((date.getMonth() + 3) / 3),
           "S+": date.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in _date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? _date[k] : ("00" + _date[k]).substr(("" + _date[k]).length));
           }
    }
    return format;
}
// 根据给定的开始和结束时间戳按照格式生成日期数组
export const buildDateArrayFromTimestampStep = function(starttime, endtime, formart) {
    starttime = starttime - (starttime % 3600 * 24); // 校准为当天的0时
    endtime = endtime - (endtime % 3600 * 24);
    let dateArray = [];
    for (let time = starttime; time <= endtime; time += 3600 * 24)
    {
        dateArray.push(timestampToDate('yyyy-MM-dd', time))
    }
    return dateArray;
}
// 时间转时间戳
export const DateToTimestamp = function(date) {
    return Date.parse(date) / 1000;
}
// 截取字符串
export const setString = function(str, len) {  
    var strlen = 0;  
    var s = "";  
    for (var i = 0; i < str.length; i++) {  
        if (str.charCodeAt(i) > 128) {  
            strlen += 2;  
        } else {  
            strlen++;  
        }  
        s += str.charAt(i);  
        if (strlen >= len) {  
            return s+"...";  
        }  
    }  
    return s;  
}  
// 生成随机字符串
export const random_string = function(len) {
    　　len = len || 32;
    　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
    　　var maxPos = chars.length;
    　　var pwd = '';
    　　for (let i = 0; i < len; i++) {
      　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}