$(function() {
    // 注册
    (function() {
        var $userName = $('#userName'),
            $psw = $('#psw'),
            $checkPsw = $('#checkPsw'),
            $email = $('#email'),
            $regForm = $('#reg-form'),
            $regBtn = $('.reg-btn');
        
        var regEmail = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z]+(\.[1-9a-zA-Z]+)+$/; //邮箱正则

        var $msgSuccess = $('.msg-success'),
            $msgError = $('.msg-error'),
            $close = $('.fa-times'),
            timer = null;
        
        var util = {
            // 失去焦点
            handleBlur: function(ele) {
                ele.blur(function() {
                    var value = ele.val().trim();
                    if (value === '') {
                        ele.addClass('item-error');
                        ele.siblings().text('不能为空').fadeIn(500);
                    } else {
                        ele.removeClass('item-error');
                        ele.siblings().fadeOut(500).text('');
                    }
                });
            },

            // 键盘抬起
            handleKeyUp: function(ele) {
                ele.keyup(function() {
                    var value = ele.val().trim();
                    if (value === '') {
                        ele.addClass('item-error');
                        ele.siblings().text('不能为空').fadeIn(500);
                    } else {
                        ele.removeClass('item-error');
                        ele.siblings().fadeOut(500).text('');
                    }
                });
            },

            // 验证表单
            handleValidate: function(ele) {
                var result = true;
                var value = ele.val().trim();
                if (value === '') {
                    result = false;
                    ele.addClass('item-error');
                    ele.siblings().text('不能为空').fadeIn(500);
                } else if (ele.prop('type') === 'password') {
                    if (value.length < 6) {
                        result = false;
                        ele.addClass('item-error');
                        ele.siblings().text('密码长度不能小于6位').fadeIn(500);
                    } else {
                        ele.removeClass('item-error');
                        ele.siblings().text('').fadeOut(500);
                    }
                } else if (ele.prop('type') === 'email') {
                    if (!regEmail.test(value)) {
                        result = false;
                        ele.addClass('item-error');
                        ele.siblings().text('邮箱格式有误').fadeIn(500);
                    } else {
                        ele.removeClass('item-error');
                        ele.siblings().text('').fadeOut(500);
                    }
                } else {
                    ele.removeClass('item-error');
                    ele.siblings().text('').fadeOut(500);
                }

                return result;
            },

            // 提交数据
            handleAjax: function() {
                // var formData = new FormData();
                // formData.append('userName', $userName.val().trim());
                // formData.append('password', $psw.val().trim());
                // formData.append('email', $email.val().trim());
                
                $.ajax({
                    type: 'POST',
                    url: '/reg',
                    dataType: 'json',
                    data: {
                        userName: $userName.val().trim(),
                        password: $psw.val().trim(),
                        email: $email.val().trim()
                    },
                    // processData: false,
                    // contentType: false,
                    success: function(res) {
                        if (res.success) {
                            $msgSuccess.find('span').text(res.msg);
                            $msgSuccess.stop().animate({top: '100px'}, 500, function() {
                                hideMsg($msgSuccess);
                            });
                        } else {
                            $msgError.find('span').text(res.msg);
                            $msgError.stop().animate({top: '100px'}, 500, function() {
                                hideMsg($msgError);
                            });
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            }
        };

        // 失去焦点
        util.handleBlur($userName);
        util.handleBlur($psw);
        util.handleBlur($checkPsw);
        util.handleBlur($email);

        // 键盘抬起
        util.handleKeyUp($userName);
        util.handleKeyUp($psw);
        util.handleKeyUp($checkPsw);
        util.handleKeyUp($email);

        // 提交表单
        $regBtn.click(function() {
            var eles = [$userName, $psw, $checkPsw, $email];
            var result = true;

            for(let i = 0; i < eles.length; i++) {
                if (!util.handleValidate(eles[i])) {
                    result = false;
                }
            }

            if (result) {
                if (eles[1].val() !== eles[2].val()) {
                    eles[2].siblings().text('两次密码输入不一致').fadeIn(500);
                } else {
                    eles[2].siblings().text('').fadeOut(500);
                    util.handleAjax();
                }
            }
        });

        // 点击关闭隐藏消息提示
        $close.click(function() {
            $(this).parent().stop().animate({top:'-40px'}, 500);
        });

        hoverMsg($msgSuccess);
        hoverMsg($msgError);


        // 隐藏消息提示
        function hideMsg(ele) {
            timer = setTimeout(function() {
                ele.stop().animate({top: '-40px'}, 500)
            }, 4000);
        }

        function hoverMsg(ele) {
            ele.hover(function() {
                clearTimeout(timer);
            }, function() {
                hideMsg(ele);
            })
        }
    })();
})