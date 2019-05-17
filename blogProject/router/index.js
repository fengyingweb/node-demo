
/**
 * Created by huangjun on 2017/7/22.
 */

  const express = require('express'),
        router = express.Router(),
        sql = require('../module/mysql'),
        getData = require('../module/getData'),
        crypto = require('crypto');
  
  const reg = require('./reg');
  const admin = require('./admin');
  const chat = require('./chat');
  router.use('/reg', reg);
  router.use('/admin', admin);
  router.use('/chat', chat);
  
  
  router.get('/', (req, res) => {
      // console.log(req.cookies);
      // console.log(req.session.admin);
      res.locals.admin = req.session.admin;
      // console.log(req.query);
      getData.findAllArt().then((data) => {
      	let articleCount = data.total;
      	res.render('index.ejs', {total: articleCount});
      });
  }).post('/', (req, res) => {
  	// console.log(req.body);
  	let n = req.body.pageNum;
  	getData.findArticle(n).then(data => {
  		if (data.datas.length === 0) {
  			res.send('出错了,没有更多内容了');
  			return null;
  		}
  		res.json({
  			success: true,
  			dataList: data.datas
  		})
  	});
  });
  
  // 文章详情页
  router.get('/details/list-:id.html', (req, res)=> {
  	// console.log(req.params);
  	res.locals.admin = req.session.admin;
  	let id = req.params.id;
  	getData.findDetail(id).then(data => {
  		// console.log(data);
  		if (data.detail.length === 0) {
  			res.status(404).render('404.ejs');
  			return null;
  		}
  		res.render('details.ejs', {datas: data.detail, comData: data.comment});
  	});
  });
  
  // 发表评论
  router.post('/details/list', (req, res) => {
  	// console.log(req.body);
  	getData.addComment(req).then(data => {
  		res.json(data);
  	});
  })
  /*router.get('/list-:page.html', (req, res) => {
  	// console.log(req.params);
  	res.locals.admin = req.session.admin;
  	let n = req.params.page;
  	getData.findArticle(n).then((data) => {
      	let articleCount = data.total;
      	if (data.datas.length === 0) {
      		res.status(404).render('404.ejs');
      		return null;
      	}
      	res.render('index.ejs', {total: articleCount, dataList: data.datas});
      });
  });*/
  
  // 登陆验证
  router.post('/login', (req, res) => {
  	// console.log(req.body);
  	let username = req.body.username,
  	    password = req.body.password,
  	    md5 = crypto.createHash('md5'),
  	    sel = 'SELECT * FROM user Where username = ?';
  	    sql(sel, [username], (err, data) => {
  	    	// console.log(data);
  	    	let newPsw = md5.update(password).digest('hex');
  	    	if (err) {
  	    		console.log(`error:${err}`);
  	    		return null;
  	    	}
  	    	if (data.length === 0) {
  	    		res.send('用户名不存在!');
  	    		return null;
  	    	} else if (data[0].password !== newPsw) {
  	    		res.send('密码错误!');
  	    		return null;
  	    	} else {
  	    		
  	    		// 设置cookie
  	    		res.cookie("login", {name: username }, {maxAge: 1000*60*60*24});
  	    		
  	    		// 是否为管理员用户
  	    		req.session.admin = Number(data[0].admin);
  	    		// 登陆成功
  	    		res.json({
  	    			success: true,
  	    			result: '登陆成功!'
  	    		})
  	    	}
  	    })
  });
  
  // 退出登陆
  router.get('/outLogin', (req, res) => {
  	res.clearCookie('login');
  	req.session.admin = '';
  	res.redirect('/');
  });
  
  module.exports = router;