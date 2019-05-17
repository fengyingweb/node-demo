/**
 * Created by huangjun on 2017/7/22.
 */

  const http = require('http'),
        express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        app = express();
  const server = http.createServer(app);
        
    module.exports = app;
  // 设置模板引擎目录
  app.set('views', __dirname + '/views');
  // 设置使用什么样的模板引擎
  app.set('views engine', 'ejs');

  // 设置静态文件的路径js css img
  app.use(express.static(__dirname + '/public'));

  app.use(bodyParser.json()); //使用post方式时用来接收json数据
  app.use(bodyParser.urlencoded( { extended:true } ));
  app.use(cookieParser('blog'));
  app.use(session({ secret: 'blog'}));
  require('./module/configData.js');
  
  const index = require('./router/index');
  const ue = require('./router/ue.js');
  app.use('/', index);
  app.use('/ueditor/ue', ue);
  
  let port = 5060;

  server.listen(port, () => {
     console.log(`监听成功...http://localhost:${port}`);
  });
