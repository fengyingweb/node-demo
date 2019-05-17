/**
 * Created by huangjun on 2017/7/22.
 */

  const http = require('http'),
        express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        app = express();
        
  module.exports = app;
  

  // 设置模板引擎目录
  app.set('views', __dirname + '/views');
  // 设置使用什么样的模板引擎
  app.set('views engine', 'ejs');

  // 设置静态文件的路径js css img
  app.use(express.static(__dirname + '/public'));

  app.use(bodyParser.json()); //使用post方式时用来接收json数据
  app.use(bodyParser.urlencoded( { extended:true } ));
  app.use(cookieParser('wulv')); //密钥
  app.use(session( { secret:'node'} )); //密钥
  require('./module/configData.js');
  
  const index = require('./router/index');
  app.use('/', index);


  const server = http.createServer(app);
  server.listen(5050, () => {
     console.log("监听成功...");
  });
