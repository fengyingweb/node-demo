const express = require('express'),
      upload = require('../methods/multer.js'),
      markdown = require('markdown-js'),
      router = express.Router();

const dataBase = require('../model/db');
const util = require('../methods/util.js');

router.use((req, res, next)=> {
    if (req.session.admin) {
        next();
    } else {
        res.send('请用管理员账号登录!');
    }
});

router.get('/', (req, res)=> {
    res.locals.admin = req.session.admin;
    res.render('pager.ejs');
});

router.post('/', upload.single('file'), (req, res)=> {
    // console.log(req.body);
    // console.log(req.file);
      let article = {
            id: util.uuid(),
            title: req.body.title,
            tag: req.body.tag,
            author: req.body.author,
            desc: req.body.desc,
            content: markdown.makeHtml(req.body.content),
            imgUrl: `/image/${req.file.filename}`,
            time: new Date().toLocaleString()
      };
      
      let whereTitle = {title: req.body.title};
      dataBase.Article.find(whereTitle, (err, data)=> {
            if (err) throw err;
            
            if (!data.length) { // 可以发布
                dataBase.Article.create(article, (err, dataA)=> {
                      if (err) throw err;
                      res.json({
                            success: true,
                            msg: '发布成功'
                      })
                });
            } else { // 不能发布
                res.json({
                      success: false,
                      msg: '文章已存在!'
                })
            }
      });
});

module.exports = router;