$(function() {
    (function() {
        var $updateForm = $('#reg-form'),
            $userName = $('#userName'),
            $password = $('#psw'),
            $confirmPsw = $('#checkPsw'),
            $email = $('#email'),
            $BtnSubmit = $('#btn-submit'),
            $adminRadio1 = $('#yes'),
            $adminRadio2 = $('#no');
        
        var $msgSuccess = $('.msg-success');
        var $msgError = $('.msg-error');
        var $close = $('.fa-times');
        var timer = null;
        
        var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/;
        
        var util = {
            handleBlur: function(ele) {
                ele.blur(function() {
                    var value = $.trim(ele.val());
                    if (value === '') {
                        ele.addClass('item-error').siblings().text('不能为空').fadeIn(500);
                    } else {
                        ele.removeClass('item-error').siblings().text('').fadeOut(500);
                    }
                });
            },
            
            handleKeyUp: function(ele) {
                ele.keyup(function() {
                    var value = $.trim(ele.val());
                    if (value === '') {
                        ele.addClass('item-error').siblings().text('不能为空').fadeIn(500);
                    } else {
                        ele.removeClass('item-error').siblings().text('').fadeOut(500);
                    }
                });
            },
            
            handleValidate: function(ele) {
                var result = true;
                var value = $.trim(ele.val());
                var type = ele.attr('type');
                if (value === '') {
                    result = false;
                    ele.addClass('item-error').siblings().text('不能为空').fadeIn(500);
                } else {
                    ele.removeClass('item-error').siblings().text('').fadeOut(500);
                    if (type === 'password') {
                        if (value.length < 6) {
                            result = false;
                            ele.siblings().text('密码长度不能小于6个字符').fadeIn(500);
                        } else {
                            result = true;
                            ele.siblings().text('').fadeOut(500);
                        }
                    } else if (type === 'email') {
                        if (!regEmail.test(value)) {
                            result = false;
                            ele.siblings().text('邮箱格式不正确').fadeIn(500);
                        } else {
                            result = true;
                            ele.siblings().text('').fadeOut(500);
                        }
                    }
                }
                
                return result;
            },
            
            handleAjax: function() {
                clearTimeout($updateForm[0].timer);
                $.ajax({
                    type: 'POST',
                    url: '/admin/update',
                    dataType: 'json',
                    data: {
                        id: $updateForm.data('id'),
                        userName: $.trim($userName.val()),
                        password: $.trim($password.val()),
                        email: $.trim($email.val()),
                        admin: $(':radio:checked').val()
                    },
                    
                    success: function(res) {
                        if (res.success) {
                            $msgSuccess.find('span').text(res.msg);
                            $msgSuccess.stop().animate({top: '100px'}, 500, function(){
                                moveFade($msgSuccess);
                            });
                            if (typeof res.admin !== 'undefined') {
                                $updateForm[0].timer = setTimeout(function() {
                                    location.href = '/';
                                }, 5000);
                            }
                        } else {
                            $msgError.find('span').text(res.msg);
                            $msgError.stop().animate({top: '100px'}, 500, function(){
                                moveFade($msgError);
                            });
                        }
                    },
                    
                    error: function(err) {}
                });
            }
        };
        
        // 失去焦点
        util.handleBlur($userName);
        util.handleBlur($password);
        util.handleBlur($confirmPsw);
        util.handleBlur($email);
        
        // 键盘抬起
        util.handleKeyUp($userName);
        util.handleKeyUp($password);
        util.handleKeyUp($confirmPsw);
        util.handleKeyUp($email);
        
        if ($adminRadio1.data('admin')) {
            $adminRadio1.prop('checked', true);
        } else {
            $adminRadio2.prop('checked', true);
        }
        // 点击提交
        $BtnSubmit.click(function() {
            var eles = [$userName, $password, $confirmPsw, $email];
            var result = true;
            clearTimeout(timer);
            
            for(let i = 0; i < eles.length; i++) {
                if (!util.handleValidate(eles[i])) {
                    result = false;
                }
            }
            console.log(result);
            if (result) {
                if (eles[1].val() === eles[2].val()) {
                    eles[2].siblings().text('').fadeOut(500);
                    util.handleAjax();
                } else {
                    eles[2].siblings().text('密码输入不一致').fadeIn(500);
                }
            }
        });
        
        $close.click(function() {
            $(this).parent().stop().animate({top: '-36px'}, 500);
        });
        
        hoverTimer($msgSuccess);
        hoverTimer($msgError);
        
        function moveFade(obj) {
            timer = setTimeout(function() {
                obj.stop().animate({top: '-36px'}, 500);
            }, 4000);
        }
        
        function hoverTimer(obj) {
            obj.hover(function(){
                clearTimeout(timer);
            }, function(){
                moveFade(obj);
            })
        }
    })();
})