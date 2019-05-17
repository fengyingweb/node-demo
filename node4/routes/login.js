const express = require('express'),
      crypto = require('crypto'),
      router = express.Router();

const dataBase = require('../model/db');

router.get('/', (req, res)=> {
    res.render('login.ejs');
});

router.post('/', (req, res)=> {
    let userName = req.body.userName,
        password = req.body.password;
    
    let md5 = crypto.createHash('md5'),
        newPsw = md5.update(password).digest('hex');
    let whereUserName = {userName: userName}; // 查询条件
    dataBase.User.find(whereUserName, (err, data)=> {
        if (err) {
            console.log(err);
            res.send('查询用户出错');
            return;
        }
        // console.log(data);
        if (!data.length) { // 登录失败, 用户名不存在
            res.json({
                success: false,
                msg: '用户名不存在'
            });
        } else {
            if (newPsw !== data[0].password) { // 密码错误
                res.json({
                    success: false,
                    msg:'密码错误'
                });
            } else {
                // 设置cookie
                res.cookie('loginName', {name: userName}, {maxAge: 1000 * 60 * 60 *24});

                // 设置session 标记是否为管理员
                req.session.admin = data[0].admin;

                res.json({
                    success: true,
                    msg: '登录成功'
                })
            }
        }
    });
});

module.exports = router;