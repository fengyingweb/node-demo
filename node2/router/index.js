/**
 * Created by huangjun on 2017/7/14.
 */

  const express = require('express');
  const router = express.Router();
  const sql = require('../module/mysql.js');

  /*router.get('/', (req, res) => {
       // res.send(`Hello,World!!!!`);
      // res.sendFile()方法 参数url必须是绝对路径
      res.sendFile(process.cwd() + '/views/index.html');
  });*/

  router.get('/', (req, res) => {
      // res.render用来响应模板引擎文件 index代表响应的是index.ejs模板引擎
      let obj = {
          name: "风影",
          age: 30,
          kecheng: "node"
      };
      let datas = [];
      sql('SELECT * FROM nodeuser' , (err, data) => {
          if (err) {
              console.log('error:' + err);
          } else {
              datas = data;
              // console.log(datas);
              res.render('index', {data: obj, name: '<h1>无虑</h1>', dataList: datas});
          }
      });
  });

  router.get('/qingrenjie', (req, res) => {
     res.render('post.ejs');
  });

  // get方式提交内容
  router.get('/reg', (req, res) => {
       // console.log(req.query); // get方式提交的内容
       let dataL = req.query;
      let insertData = 'INSERT INTO `nodeuser` (`id`, `userName`, `password`, `email`) VALUES (0, ?, ?, ?)'; // ?动态的值
      /*sql(insertData, [dataL.userName, dataL.password, dataL.email], (req, res) => {

      });*/
      sql(insertData,[dataL.userName, dataL.password, dataL.email], (err, data) => {
          res.json({
              success: '成功',
              dataList: data
          });
      })
  });

  // post方式提交内容
  router.post('/reg', (req, res) => {
      console.log( req.body);
  });

 /* router.get('/a+b+/', (req, res) => {
      res.send(`我是子页面`);
  });*/
  module.exports = router;