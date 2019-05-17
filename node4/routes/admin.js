const express = require('express'),
      router = express.Router();

const crypto = require('crypto');

const dataBase = require('../model/db');

router.use((req, res, next)=> {
    if (req.session.admin) {
        next();
    } else {
        res.send('请用管理员账号登录!');
    }
});

router.get('/', (req, res)=> {
    res.locals.admin = req.session.admin;
    dataBase.User.find({}, (err, data)=> {
        if (err) throw err;
        // console.log(data);
        let dataList = data;
        res.render('admin.ejs', {dataList: dataList});
    });
});

// 删除用户
router.post('/delete', (req, res)=> {
    let id = req.body.id;
    let whereId = {id: id}; // 查询条件
    dataBase.User.find(whereId, (err, data)=> {
        if (err) throw err;
        if (data.length) {
            if (data[0].userName === res.locals.loginName) {
                res.json({
                    success: false,
                    msg: '不能删除自己'
                });
                return null;
            }

            dataBase.User.deleteOne(whereId, (err, delRes)=> {
                if (err) {
                    console.log(err);
                    res.send('查询数据库错误')
                }
                // console.log(delRes);
                if (delRes.ok === 1) {
                    if (delRes.n) {
                        res.json({
                            success: true,
                            msg: '删除成功'
                        });
                    } else {
                        res.json({
                            success: false,
                            msg: '删除失败'
                        })
                    }
                }
            });
        }
    });
});

// 修改用户
router.get('/update', (req, res)=> {
    res.locals.admin = req.session.admin;
    let id = req.query.id;
    // console.log(id);
    let whereId = {id: id};
   	  dataBase.User.find(whereId, (err, data)=> {
   	  	  if (err) throw err;
   	  	  
   	  	  res.render('update_user.ejs', {data: data});
   	  });
});

router.post('/update', (req, res)=> {
    let md5 = crypto.createHash('md5');
    let id = req.body.id;
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let admin = Number(req.body.admin);
    let whereId = {id: id};
    dataBase.User.find(whereId, (err, data)=> {
          if (err) throw err;
          
          let newPasswrd = data[0].password === password? data[0].password : md5.update(password).digest('hex');
          let setting = {
              $set: {
                  userName: userName,
                  password: newPasswrd,
                  email: email,
                  admin: admin
              }
          };
          
          dataBase.User.updateOne(whereId, setting, (err, result)=> {
                if (err) throw err;
                
                if (result.ok) {
                    if (res.locals.loginName === data[0].userName) {
                        // 设置cookie
                           res.cookie('loginName', {name: userName}, {maxAge: 1000*60*60*24});
                           res.locals.loginName = userName;
                           // 是否为管理员
                           req.session.admin = admin;
                           res.locals.admin = admin;
                    }
                    
                    res.json({
                          success: true,
                          msg: '更新成功',
                          admin: res.locals.admin
                    });
                } else {
                    res.json({
                            success: false,
                            msg: '更新失败'
                    })
                }
          });
    });
});

module.exports = router;