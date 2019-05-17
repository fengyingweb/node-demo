$(function(){
    (function() {
        var config = {
            toolbars: [
                ["bold","italic","fontborder","strikethrough","underline","forecolor", "fontfamily", "fontsize", "emotion"]
            ]
        };
        var ue = UE.getEditor('editor', config);
        var $loginName = $('#userName');
        var $logout = $('#logout');
        var $userBox = $('.user-box');
        var $userMsg = $('.user-msg');
        var $count = $('.count');
        var $userBoxList= $('.user-box-list');
        var $btnInto = $('.btn-into');
        var $sendBtn = $('#send-btn');
        var socket = null;
        var onOff = true;
        var name = '';
        var userId = '';
        var count = 0;

        $loginName.keyup(function() {
            name = $(this).val().trim();
            if (name !== '') {
                $btnInto.css({
                    background: '#f53d3d',
                    color: '#fff',
                    cursor: 'pointer'
                })
            } else {
                $btnInto.css({
                    background: '#f0f0f0',
                    color: '#363636',
                    cursor: 'not-allowed'
                }).text('加入聊天');
                onOff = true; 
            }
        });

        $btnInto.css({
            background: '#f0f0f0',
            color: '#363636',
            cursor: 'not-allowed'
        });

        // 加入和退出聊天
        $btnInto.click(function() {
            if (name !== '') {
                if (onOff) {
                    $(this).text('退出聊天');
                    init(name);
                } else {
                    $(this).text('加入聊天');
                    location.href="/logout";
                }
                onOff = !onOff;
                $sendBtn.css({
                    background: '#f53d3d',
                    color: '#fff',
                    cursor: 'pointer'
                });
            }
        });

        $sendBtn.css({
            background: '#f0f0f0',
            color: '#363636',
            cursor: 'not-allowed'
        });

        // 发送消息
        $sendBtn.click(function() {
            if (count) {
                var content = ue.getContent();
                socket.emit('msg', {content: content});
                socket.on('msg', (data)=> {
                    console.log(data);
                });
            }
        });

        // 初始化
        function init(userName) {
            userId = Date.now();
            name = userName; 
            socket = io.connect('/');
            socket.emit('into', {name: name, userId: userId});
            socket.on('into', (resData) => {
                var num = 0;
                var str = '';
                for (var key in resData.userList) {
                    str += `<li>${resData.userList[key]}</li>`;
                    num++;
                }
                count = num;
                $count.text(num);
                $userBoxList.html(str);
            });

            socket.on('out', (resData)=> {
                var num = 0;
                var str = '';
                for (var key in resData.userList) {
                    str += `<li>${resData.userList[key]}</li>`;
                    num++;
                }
                count = num;
                $count.text(num);
                $userBoxList.html(str);
            });
        }
    })();
});