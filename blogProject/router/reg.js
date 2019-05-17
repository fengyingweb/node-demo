/**
 * Created by huangjun on 2017/7/22.
 */

  const express = require('express');
  const router = express.Router();
  const sql = require('../module/mysql.js');
  const crypto = require('crypto'); // 加密

  router.get('/', (req, res) => {
  	 res.locals.admin = req.session.admin;
     res.render('reg.ejs');
  });
  
  // 注册
  router.post('/', (req, res) => {
  	// console.log(req.body);
  	res.locals.admin = req.session.admin;
  	let username = req.body.username,
  	    password = req.body.password,
  	    email = req.body.email,
  	    md5 = crypto.createHash('md5'); // 加密
  	let sel = 'SELECT * FROM user Where username = ?';
  	let insert = 'INSERT INTO user (id, username, password, email, admin) VALUES (0, ?, ?, ?, 0)';
  	sql(sel, [username], (err, selData) => {
  		if (err) {
  			console.log(`error:${err}`);
  			return null;
  		}
  		if (selData.length === 0) {
  			// 可以注册
  			let newPassword = md5.update(password).digest('hex'); //加密
  			sql(insert, [username, newPassword, email], (err, data) => {
  				if (err) {
  					console.log(`error:${err}`);
  					return null;
  				}
  				res.locals.result = '<h2 class="title text-center">注册成功</h2>';
  				res.render('reg.ejs');
  			});
  			
  		} else {
  			// 不可以注册用户名已存在
  			res.locals.user = '<div class="user-info col-lg-2 col-md-2 col-sm-2 col-xs-2">用户名已存在,注册失败</div>';
  			res.render('reg.ejs');
  		}
  	});
  });
  module.exports = router;
