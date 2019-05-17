const express = require('express'),
      router = express.Router();

const queryArt = require('../methods/queryArticle.js');
const reg = require('./reg.js');
const login = require('./login.js');
const admin = require('./admin.js');
const pager = require('./pager.js');
const about = require('./about.js');
const wecha = require('./wecha.js');

router.use('/reg', reg);
router.use('/login', login);
router.use('/admin', admin);
router.use('/pager-plus', pager);
router.use('/about', about);
router.use('/wecha.html', wecha);

router.get('/', (req, res)=> {
     if (res.locals.loginName) {
        res.locals.admin = req.session.admin;
        queryArt.findPartArt().then(data=> {
        	res.render('index.ejs', {dataList: data});
        }).catch(err=> {
        	console.log(err);
        });
     } else {
        res.redirect('/login');
     }
}).post('/', (req, res)=> {
	let arr = [];
	let page = Number(req.body.page) || 1;
	let pageSize = Number(req.body.pageSize) || 10;
	let queryCount = queryArt.findArtCount();
	let queryPage = queryArt.queryPage(page, pageSize);
	arr[0] = queryCount;
	arr[1] = queryPage;
	Promise.all(arr).then(resData=> {
		if (resData.length) {
			res.json({
				success: true,
				data: {
					list: resData[1].data,
					total: resData[0].count
				},
				msg: '查询成功'
			});
		} else {
			res.json({
				success: false,
				data: null,
				msg: '暂无数据'
			});
		}
	}).catch(err=> {
		res.json({
			success: false,
			data: null,
			msg: '查询失败'
		})
	});
});

router.get('/detail/:id.html', (req, res)=> {
	let id = req.params.id;
	queryArt.findArtDetail(id).then(data=> {
		if (data.length === 0) {
			res.status(404).render('404.ejs');
			return null;
		}
		res.render('detail.ejs', {data: data});
	}).catch(err=> {
		console.log(err);
	});
});

router.get('/logout', (req, res)=> {
    res.clearCookie('loginName');
    req.session.admin = '';
    res.redirect('/login');
})

module.exports = router;