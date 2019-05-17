/**
 * Created by huangjun on 2017/7/23.
 */
  const express = require('express'),
        router = express.Router(),
        path = require('path'),
        fs = require('fs'),
        sql = require('../module/mysql');
  const upload = require('../module/multer.js');

  // get post 任何形式的访问都会走这条路由
  router.use((req, res, next) => {
     if (req.session.admin) { // 是否为管理员
         next();
     } else {
         res.send('请用管理员账号登陆');
     }
  });

  router.get('/', (req, res) => {
      res.locals.admin = req.session.admin;
     res.render('admin/admin.ejs') ;
  });

  // 用户管理页面
  router.get('/user', (req, res) => {
      res.locals.admin = req.session.admin;
      let sel = 'SELECT * FROM user';
      sql(sel, (err, data) => {
          let dataList = data;
          // console.log(dataList);
          res.render('admin/user.ejs', { datas: dataList});
      });
  });

  // 删除数据
  router.post('/user', (req, res) => {
     let id = req.body.id,
         del = 'DELETE FROM user WHERE id = ?';
     sql(del, [id], (err, data) => {
         if (err) {
             console.log("error:" + err);
             res.send('删除失败');
         } else {
             res.json({
                 success: true,
                 result: '删除成功'
             });
         }
     });
  });

  // 修改用户
  router.get('/user/update', (req, res) => {
      res.locals.admin = req.session.admin;
          let id = req.query.id,
          sel = 'SELECT * FROM user where id= ?';
      sql(sel, [id], (err, data) => {
          if (err) {
              console.log('error:'+ err);
          } else {
              res.render('admin/update.ejs', { data: data});
          }
      });
  });

  router.post('/user/update', (req, res) => {
      let username = req.body.username,
          email = req.body.email,
          admin = req.body.admin,
          id = req.body.id,
          update = 'UPDATE user set username = ?, email = ?, admin = ? Where id= ?';
      sql(update, [username, email, admin, id], (err, data) => {
          if (err) {
              console.log('error:' + err);
              res.send('修改失败!');
          } else {
              res.json({
                  success: true,
                  result: '修改成功!'
              });
          }
      });
  });

  // 文章发布页面
router.get('/article' ,(req, res) => {
    res.locals.admin = req.session.admin;
    res.render('admin/article.ejs');
});

// 添加文章信息数据
router.post('/article', upload.single('img'), (req, res) => {
   let title = req.body.title,
       tag = req.body.tag,
       author = req.body.author,
       content = req.body.content,
       img = `/img/${req.file.filename}`,
       time = new Date().toLocaleString();
   let insert = 'INSERT INTO article (id, title, tag, author, content, time, img) VALUES (0, ?, ?, ?, ?, ?, ?)';
   sql(insert, [title, tag, author, content, time, img], (err, data) => {
       if (err) {
           console.log('error:' + err);
           res.send('发布失败!');
           return null;
       } else {
           res.locals.result = '<h3>发布成功</h3>';
           res.render('admin/article.ejs');
       }
   });
});

// 模板管理页面
router.get('/views', (req, res) => {
	res.locals.admin = req.session.admin;
	fs.readdir(path.join(process.cwd(), 'views'), (err, data) => {
		if (err) {
			console.log(`error:${err}`);
			res.send('读取文件夹失败');
			return;
		}
		res.render('admin/views.ejs', {viewData: data});
	});
});

/*router.get('/views/update', (req, res) => {
	res.locals.admin = req.session.admin;
	res.render('admin/viewsUpdate.ejs');
});*/

router.post('/views', (req, res) => {
	// console.log(req.body);
	let dirType = req.body.dirType,
	    dirName = req.body.dirName,
	    dirChild = req.body.dirChild;
	    
	    if (dirType === '1' && dirChild === '') {
	    	fs.readFile(path.join(process.cwd(), `views/${dirName}`), 'utf-8', (err, dataA) => {
	    		if (err) {
	    			console.log(`error:${err}`);
	    			res.send('获取文件内容出错了');
	    			return;
	    		}
	    		// console.log(data);
	    		res.json({
	    			success: true,
	    			result: '获取内容成功!',
	    			content: dataA
	    		});
	    	});
	    	return;
	    }
	    
	    if (dirType === '1' && dirChild === '1-2') {
	    	fs.readFile(path.join(process.cwd(), `views/admin/${dirName}`), 'utf-8', (err, dataC) => {
	    		if (err) {
	    			console.log(`error:${err}`);
	    			res.send('获取文件内容出错了');
	    			return;
	    		}
	    		// console.log(data);
	    		res.json({
	    			success: true,
	    			result: '获取内容成功!',
	    			content: dataC
	    		});
	    	});
	    	return;
	    }
	    if (dirType === '2') {
	    	fs.readdir(path.join(process.cwd(), `views/${dirName}`), (err, dataB) => {
	    		if (err) {
	    			console.log(`error:${err}`);
	    			res.send('读取文件失败');
	    			return;
	    		}
	    		// console.log(dataB);
	    		res.json({
	    			success: true,
	    			result: '获取成功',
	    			fileName: dataB
	    		})
	    	});
	    	return;
	    }
})

  module.exports = router;