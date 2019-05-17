/**
 * Created by huangjun on 2017/7/14.
 */

const http = require('http');
// console.log(http);
  http.createServer((request, response) => {
      // request请求对象 浏览器 请求服务器所有的内容保存在这个对象里
      // response 响应对象 服务器响应浏览器 所有的方法
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(`Hello World!`);
  }).listen(3500, () => {
      console.log('监听成功!');
  });

// .listen()监听端口

// 使用json web token存储用户登录信息
const jwt = require('jsonwebtoken');
console.log(jwt);

const sercet = 'sercetabc';
const token = jwt.sign({
	name: 'fengying',
	psw: '123456'
}, sercet, {
	expiresIn: 60
});

console.log(token);

jwt.verify(token, sercet, function(err, decoded) {
	if (err) throw err;
	console.log(decoded);
})
