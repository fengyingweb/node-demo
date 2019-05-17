$(function() {
    (function() {
        var $userName = $('#userName'),
            $psw = $('#psw'),
            $loginBtn = $('#login-btn');
        
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
                            ele.siblings('.error-tip').text('不能为空').fadeIn(500);
                        } else {
                            ele.removeClass('item-error');
                            ele.siblings('.error-tip').fadeOut(500).text('');
                        }
                    });
                },
    
                // 键盘抬起
                handleKeyUp: function(ele) {
                    ele.keyup(function() {
                        var value = ele.val().trim();
                        if (value === '') {
                            ele.addClass('item-error');
                            ele.siblings('.error-tip').text('不能为空').fadeIn(500);
                        } else {
                            ele.removeClass('item-error');
                            ele.siblings('.error-tip').fadeOut(500).text('');
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
                        ele.siblings('.error-tip').text('不能为空').fadeIn(500);
                    } else {
                        ele.removeClass('item-error');
                        ele.siblings('.error-tip').text('').fadeOut(500);
                    }
    
                    return result;
                },
    
                // 提交数据
                handleAjax: function() {
                    $.ajax({
                        type: 'POST',
                        url: '/login',
                        dataType: 'json',
                        data: {
                            userName: $userName.val().trim(),
                            password: $psw.val().trim()
                        },
                        success: function(res) {
                            // console.log(res);
                            if (res.success) {
                                $msgSuccess.find('span').text(res.msg);
                                $msgSuccess.stop().animate({top: '100px'}, 500, function() {
                                    hideMsg($msgSuccess, res.success);
                                });
                            } else {
                                $msgError.find('span').text(res.msg);
                                $msgError.stop().animate({top: '100px'}, 500, function() {
                                    hideMsg($msgError, res.success);
                                });
                            }
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    })
                }
            };
        
        // 点击登录
        $loginBtn.click(function() {
            var result = true;
            var eles = [$userName, $psw];

            for(let i = 0; i < eles.length; i++) {
                if (!util.handleValidate(eles[i])) {
                    result = false;
                }
            }

            if (result) {
                util.handleAjax();
            }
        });
        
        // 失去焦点
        util.handleBlur($userName);
        util.handleBlur($psw);

        // 键盘抬起
        util.handleKeyUp($userName);
        util.handleKeyUp($psw);
        
        // 点击关闭隐藏消息提示
        $close.click(function() {
            $(this).parent().stop().animate({top:'-40px'}, 500, function() {
                if ($(this).parent()[0].className === 'msg-success') {
                    location.href = '/';
                }
            });
        });

        hoverMsg($msgSuccess, true);
        hoverMsg($msgError, false);


        // 隐藏消息提示
        function hideMsg(ele, bool) {
            timer = setTimeout(function() {
                ele.stop().animate({top: '-40px'}, 500, function() {
                    if (bool) {
                        location.href = '/';
                    }
                })
            }, 4000);
        }

        function hoverMsg(ele, bool) {
            ele.hover(function() {
                clearTimeout(timer);
            }, function() {
                hideMsg(ele, bool);
            })
        }
    })();
})