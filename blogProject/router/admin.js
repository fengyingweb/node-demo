const express = require('express'),
      router = express.Router(),
      path = require('path'),
      fs = require('fs'),
      sql = require('../module/mysql'),
      getData = require('../module/getData'),
      upload = require('../module/multer');
      
router.use((req, res, next) => {
	if (req.session.admin) {
		next();
	} else {
		res.send('请用管理员账号登陆!');
		return null;
	}
});

router.get('/', (req, res) => {
	res.locals.admin = req.session.admin;
	res.render('admin/admin.ejs');
});



// 用户管理
let userData = null;
router.get('/user', (req, res) => {
	res.locals.admin = req.session.admin;
	getData.userInfo().then((data) => {
		 // console.log(data);
		 userData = data;
		 res.render('admin/user.ejs', {dataList: userData});
	});
});

// 删除用户
router.post('/user', (req, res) => {
	let ids = req.body.ids;
	    arr = [];
	    ids.forEach(id => {
	    	arr.push(getData.delUser(id));
	    });
	    Promise.all(arr).then(data => {
	    	res.json(data[0]);
	    });
});

// 编辑用户
router.get('/update', (req, res) => {
	res.locals.admin = req.session.admin;
	// console.log(req.query);
	let id = req.query.id;
	getData.signInfo(id).then(data => {
		if (Number(data[0].admin)) {
			data[0].admin = '是';
		} else {
			data[0].admin = '否';
		}
		res.render('admin/update.ejs', {dataList: data});
	});
});

router.post('/update', (req, res) => {
	getData.updateInfo(req).then((data) => {
		res.json(data);
	});
});

// 发布文章
router.get('/article', (req, res) => {
	res.locals.admin = req.session.admin;
	res.render('admin/article.ejs');
});
router.post('/article', upload.single('image'), (req, res) => {
	// console.log(req.file);
	getData.insertArticle(req).then(data => {
		if (data) {
			res.locals.msg = `<h2 class="title text-center">${data.msg}</h2>`;
			res.render('admin/article.ejs');
		}
	});
});

// 模板管理
router.get('/views', (req, res) => {
	res.locals.admin = req.session.admin;
	fs.readdir(path.join(process.cwd(), '/views'), (err, files) => {
		if (err) {
			console.log(`error:${err}`);
			return null;
		}
		res.render('admin/views.ejs', {fileList: files});
	});
}).post('/views', (req, res) => {
	// console.log(req.body);
	let dataType = req.body.dType,
	    filename = req.body.filename,
	    parentFile = req.body.parentFile,
	    dataTypeC = req.body.dTypeC;
	    if (dataType == 1 && parentFile === '') {
	    	fs.readFile(path.join(process.cwd(), `/views/${filename}`), 'utf8', (err, data) => {
	    		if (err) {
	    			console.log(`error:${err}`);
	    			res.send('文件不存在');
			      return null;
	    		}
	    		// console.log(data);
	    		res.json({
	    			success: true,
	    			type: dataType,
	    			data: data
	    		})
	    	});
	    } else if (dataType == 2 && parentFile === '') {
	    	fs.readdir(path.join(process.cwd(), `/views/${filename}`), (err, files) => {
	    		if (err) {
	    			console.log(`error:${err}`);
	    			res.send('文件不存在');
			      return null;
	    		}
	    		// console.log(files);
	    		res.json({
	    			success: true,
	    			type: dataType,
	    			data: files
	    		})
	    	});
	    } else if (dataType == 1 && parentFile !== '') {
	    	  fs.readFile(path.join(process.cwd(), `/views/${parentFile}/${filename}`), 'utf8', (err, data) => {
		    		if (err) {
		    			console.log(`error:${err}`);
		    			res.send('文件不存在');
				      return null;
		    		}
		    		// console.log(data);
		    		res.json({
		    			success: true,
		    			type: dataType,
		    			data: data
		    		})
	    	});
	    }
});
module.exports = router;
