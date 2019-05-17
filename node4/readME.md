## 欢迎来到风鹰博客

### 项目初始化

> npm init

### package.json内容:

``` javascript
    {
        "name": "blog",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "start": "node app.js",
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
            "body-parser": "^1.18.2",
            "cookie-parser": "^1.4.3",
            "ejs": "^2.5.8",
            "express": "^4.16.3",
            "express-session": "^1.15.6",
            "lodash": "^4.17.5",
            "markdown-js": "^0.0.4",
            "mongoose": "^5.0.15",
            "multer": "^1.3.0",
            "socket.io": "^2.1.0"
        }
    }
```

### 安装依赖

> npm install 或者 cnpm install 

### 运行项目

> npm start

### 项目结构

```
    |--node_modules                           #已安装好的模块
    |--methods                                #工具方法文件夹
       |--multer.js                           #文件上传方法
       |--util.js                             #工具方法
    |--model                                  #数据模型文件夹
       |--db.js                               #创建链接mongodb数据库方法
    |--public                                 #存放静态资源文件
       |--css                                 #静态样式style
       |--image                               #静态图片
       |--js                                  #前段静态js
       |--ueditor                             #富文本
    |--routes                                 #路由文件夹
    |--ueditor                                #富文本
    |--views                                  #视图模板
    |--app.js                                 #入口文件
    |--package.json                           #添加依赖文件
    |--README.md                              #说明文件
```

### 入口文件app.js

``` javascript
    const express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        path = require('path'),
        http = require('http'),
        app = express();

    const server = http.createServer(app);

    const dataBase = require('./model/db');

    // 设置端口
    app.set('port', process.env.port || 5060);

    // 设置模板引擎目录
    app.set('views', __dirname + '/views');

    // 设置使用什么样的模板引擎
    app.set('view engine', 'ejs');

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
```

### 路由入口index.js

``` javascript
    const express = require('express'),
        router = express.Router();

    const reg = require('./reg.js');
    const login = require('./login.js');
    const admin = require('./admin.js');
    const pager = require('./pager.js');
    const about = require('./about.js');

    router.use('/reg', reg);
    router.use('/login', login);
    router.use('/admin', admin);
    router.use('/pager-plus', pager);
    router.use('/about', about);

    router.get('', (req, res)=> {
        if (res.locals.loginName) {
            res.locals.admin = req.session.admin;
            res.render('index.ejs');
        } else {
            res.redirect('/login');
        }
    });

    router.get('/logout', (req, res)=> {
        res.clearCookie('loginName');
        req.session.admin = '';
        res.redirect('/login');
    })

    module.exports = router;
```