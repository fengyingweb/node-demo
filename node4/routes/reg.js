const express = require('express'),
      crypto = require('crypto'),
      router = express.Router();

const dataBase = require('../model/db.js');
const util = require('../methods/util.js');

router.get('/', (req, res)=> {
    res.locals.admin = req.session.admin;
    res.render('reg.ejs');
});

router.post('/', (req, res)=> {
    let userName = req.body.userName,
        password = req.body.password,
        email = req.body.email;

    let md5 = crypto.createHash('md5'),
        newPsw = md5.update(password).digest('hex');

    let whereUserName = {userName: userName}, // 查询条件
        user = {
            id: util.userId(),
            userName,
            password: newPsw,
            email,
            admin: 0
        };
    
    // 查询用户
    dataBase.User.find(whereUserName, (err, data)=> {
        if (err) {
            console.log(err);
            res.send('注册失败, 查询数据库出错');
            return;
        }

        // 不能注册，用户已存在
        if (data.length) {
            res.json({
                success: false,
                msg: '注册失败，用户名已存在'
            });
        } else { // 可以注册
            dataBase.User.create(user, (err, createData)=> {
                if (err) {
                    console.log(err);
                    res.send('注册失败, 新增数据失败');
                    return;
                }
                res.json({
                    success: true,
                    msg: '注册成功'
                });
            });
        }
    });
});

module.exports = router;