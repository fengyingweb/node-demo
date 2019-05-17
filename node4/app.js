const express = require('express'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      path = require('path'),
      http = require('http'),
      logger = require('morgan');
      app = express();

const server = http.createServer(app);
const ws = require('socket.io');
const io = ws(server);

module.exports = io;

const dataBase = require('./model/db');

// 设置端口
app.set('port', process.env.port || 5080);

// 设置模板引擎目录
app.set('views', __dirname + '/views');

// 设置使用什么样的模板引擎
app.set('view engine', 'ejs');

// 打印路由路径
app.use(logger('dev'));

// 设置静态资源路径
app.use(express.static(path.join(__dirname, 'public')));

// 设置使用post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 设置使用cookie
app.use(cookieParser('blog'));
app.use(session({secret: 'blog'}));

app.use((req, res, next)=> {
    if (req.cookies.loginName) {
        res.locals.loginName = req.cookies.loginName.name;
    }

    if (res.locals.loginName && typeof req.session.admin === 'undefined') {
        let whereUserName = {userName: res.locals.loginName};
        dataBase.User.find(whereUserName, (err, data)=> {
            if (err) throw err;
            if (data.length) {
                req.session.admin = data[0].admin;
            }
            next();
        })
    } else {
        next();
    }
});

// 引入路由文件
const index = require('./routes/index');
const ue = require('./routes/ue');
app.use('/', index);
app.use('/ueditor/ue', ue);

let port  = app.get('port');
// 监听端口
server.listen(port, (err)=> {
    if (err) throw err;
    console.log(`监听端口${port}成功...`);
})