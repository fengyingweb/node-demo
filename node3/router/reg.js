/**
 * Created by huangjun on 2017/7/22.
 */

  const express = require('express');
  const router = express.Router();
  const sql = require('../module/mysql.js');
  const crypto = require('crypto'); // 加密

  router.get('/', (req, res) => {
     res.render('reg.ejs');
  });

  router.post('/', (req, res) => {
     // console.log(req.body);
     let user = req.body.username,
         password = req.body.password,
         email = req.body.email,
         md5 = crypto.createHash('md5'); // 加密
     let sel = 'SELECT * FROM user where username = ?'; // 查询语句
     let insertData = 'INSERT INTO user (id, username, password, email, admin) VALUES (0, ?, ?, ?, 0)'; //插入数据语句
     sql(sel, [user],(err, data) => {
         if (data.length === 0) {
             // 可以注册
             let newPassword = md5.update(password).digest('hex'); // 加密
             sql(insertData, [user, newPassword, email], (err, data) => {
                 if (err) {
                     res.render('error.ejs');
                     return;
                 } else {
                     res.locals.result = `<h2 class="text-center text-success title"> 注册成功</h2>`; //用表单的方式返回的结果
                     res.render('reg.ejs');
                 }
             });
         } else {
             // 不可以注册
             res.render('error.ejs');
         }
     });
  });
  module.exports = router;
