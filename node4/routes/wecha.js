const express = require('express');
const router = express.Router();
const io = require('../app');
let userList = {};

router.get('/', (req, res)=> {
    if (res.locals.loginName) {
        res.locals.admin = req.session.admin;
        res.render('wecha.ejs');
        io.on('connection', (socket)=> {       
            socket.on('into', (data)=> {
                userList[data.userId] = data.name;
                socket.name = data.name;
                socket.userId = data.userId;
                socket.join('chat');
                io.sockets.in('chat').emit('into', {data: data, userList: userList});
            });

            // socket.on('logout', (data)=> {
            //     socket.leave('chat');
            //     delete userList[data.userId];
            //     io.sockets.in('chat').emit('getout', {name: data.name, userList: userList});
            // });

            // 退出聊天
            socket.on('disconnect', ()=> {
                delete userList[socket.userId];
                socket.leave('chat');
                io.sockets.in('chat').emit('out', {name: socket.name, userList: userList});
            });

            // 接收并转发消息
            socket.on('msg', (data)=> {
                io.emit('msg', data);
            });
        });
     } else {
        res.redirect('/login');
     }
});

module.exports = router;