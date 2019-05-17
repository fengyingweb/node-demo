const randomNum = function (len = 4) {
    let nums = '0123456789'.split('');
    let arr = [];
    let n = 0, i;
    for (i = 0; i < len; i++) {
        n = Math.floor(Math.random() * nums.length);
        arr[i] = nums[n];
    }
    
    return arr.join('');
}

const userId = function() {
     let str = 'u_' + Date.now() + randomNum();
     return str;
};

const uuid = function () {
	var arrStr = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        arrStr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    arrStr[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    arrStr[19] = hexDigits.substr((arrStr[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    arrStr[8] = arrStr[13] = arrStr[18] = arrStr[23] = "-";
 
    var uuid = arrStr.join("");
    return uuid;
};

module.exports = {
    userId,
    uuid
}