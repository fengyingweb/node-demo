/**
 * Created by huangjun on 2017/7/14.
 */

  const http = require('http'),
        express = require('express'),
        app  = express(),
        bodyParser = require('body-parser');

  // 设置模板引擎ejs的目录
  app.set("views", __dirname + '/views');
  // 设置使用的模板引擎是什么
  app.set("view engine", "ejs");

  // 设置使用静态资源目录js img css
   app.use(express.static(__dirname + '/public'));
  // /abc/img/hamburger.png
  // app.use('/abc', express.static(__dirname + '/public'));

 app.use(bodyParser.json()); // 用来接收json数据
 app.use(bodyParser.urlencoded( { extended:true } ));
  // .get() 参数:1路径，2回调函数
 /* app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`Hello World!!!`);
  });*/

const index = require('./router/index');
const about = require('./router/about');

app.use('/', index);
app.use('/about', about);
  http.createServer(app).listen(50000, () => {
    console.log(`监听成功！`);
  });
