
/**
 * Created by huangjun on 2017/7/22.
 */

  const express = require('express'),
        router = express.Router(),
        sql = require('../module/mysql.js'),
        crypto = require('crypto'); // 加密

  const reg = require('./reg.js');
  const admin = require('./admin');
  // const login = require('./login.js');
  router.use('/reg', reg);
  router.use('/admin',admin);
  // router.use('/login', login);
  
  
  router.get('/', (req, res) => {
      // console.log(req.cookies);
      res.locals.admin = req.session.admin;
      let select = 'SELECT * FROM article order by id desc limit 0,4 '; // 查询文章
            
      sql(select, (err, data) => {
          if (err) {
              console.log('error:' + err);
              res.send('查询错误!');
              return;
          }
          res.render('index.ejs', {data: data, navData: req.session.navData});
      });
  });
  
  // 文章列表页 分页
  router.get('/article/list-:page.html', (req, res) => {
  	// console.log(req.params);
  	let page = req.params.page,
  	    selectA = 'SELECT * FROM article',
  	    selectB = 'SELECT * FROM article order by id desc limit ?,2';
  	    // 1 0,2
  	    // 2 2,2
  	    // 3 4,2
  	    sql(selectA, (err, dataA) => {
  	    	if (err) {
  	    		console.log('error:' + err);
  	    		res.send('出错了');
  	    		return;
  	    	}
  	    	sql(selectB, [(page - 1)*2], (err, dataB) => {
  	    		if (err) {
	  	    		console.log('error:' + err);
	  	    		res.send('出错了');
	  	    		return;
  	    	    }
  	    		if (dataB.length === 0) {
  	    			res.status(404).render('404.ejs');
  	    			return;
  	    		}
  	    		res.render('articleList.ejs', {dataAllLength: dataA.length/2, dataListB: dataB});
  	    	});
  	    });
  });

  // 发表评论
router.post('/detail/:id.html', (req, res) => {
   let commentId = req.params.id,
       content = req.body.content,
       time = new Date().toLocaleString(),
       insert = 'INSERT INTO userComment (id, userId, commentId, content, time) VALUES (0, 0, ?, ?, ?)';
   sql(insert, [commentId, content, time], (err, data) => {
       if (err) {
           res.send('发布出错了');
           return null;
       }
       res.json({
           success: true,
           result: '发布成功'
       });
   })
});

  // 文章详情页
router.get('/detail/:id.html', (req, res) => {
    let id = req.params.id,
        select = 'SELECT * FROM article WHERE id = ?',
        selectComment = 'SELECT * FROM userComment WHERE commentId = ?';
    sql(select, [id], (err, data) => {
        if (data.length === 0) {
            res.status(404).render('404.ejs');
            return;
        }
        sql(selectComment, [id], (err, data1) => {
            if (err) {
                console.log('error:'+ err);
                return null;
            }
            res.render('detail.ejs', {data: data, comment: data1});
        });
    });
});

  // 登陆验证
  router.post('/', (req, res) => {
    // console.log(req.body);
      let user = req.body.username,
          psw = req.body.password,
          md5 = crypto.createHash('md5'); // 加密
      let sel = 'SELECT * FROM user WHERE username=?';
      sql(sel, [user], (err, data) => {
           // console.log(data);
          let newPassword = md5.update(psw).digest('hex'); // 加密
          if (data.length === 0) {
            res.send("用户名不存在!"); //用ajax方式返回的结果
            return;
          } else if (data[0].password !== newPassword) {
            res.send("密码错误!"); //用ajax方式返回的结果
              return;
          } else {
            // 设置cookie
              res.cookie('login',{ name: user }, { maxAge: 1000*60*60*24});
            // 区分管理员与非管理员， 在后台存储session
               req.session.admin = Number(data[0].admin);
            // 登陆成功 用ajax方式返回的结果
              res.json({
                success: true,
                result: '登陆成功!'
              });
          }
      });
  });

  // 退出登陆
  router.get('/outLogin', (req, res) => {
    res.clearCookie('login');
      req.session.admin = '';
    res.redirect('/');
  });

  module.exports = router;