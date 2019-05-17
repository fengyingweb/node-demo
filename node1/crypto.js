const crypto = require('crypto'); //加密
const md5 = crypto.createHash('md5');
let  psw = 'wulvafei';
let newPsw = md5.update(psw).digest('hex');
console.log(newPsw);

