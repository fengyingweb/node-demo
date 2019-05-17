// 注册
(function () {
	/*
	 *  514812902@qq.com
	 * hwt-ict-cft@email.fonncon.com
	 * huangjun_web@163.com
	 */
	var regEmail = /^[1-9a-zA-Z][\w-]+@[1-9a-z]+(\.[a-z]+){1,2}$/;
	var $userForm = $('.user-form'),
	    $user = $('#user'),
	    $psw = $("#psw"),
	    $confirmPsw = $('#confirmPsw'),
	    $email = $("#email"),
	    $submit = $(".submit"),
	    $reset = $(".reset"),
	    $userTip = $('.user-tip'),
	    $pswTip = $('.psw-tip'),
	    $confirmTip = $('.confirm-tip'),
	    $emailTip = $('.email-tip'),
	    $input = $('input');
	 
	
	var valide = {
		valideFn: function () {
			var userVal = $user.val(),
			    pswVal = $psw.val(),
			    confirmVal = $confirmPsw.val(),
			    emailVal = $email.val();
			    if (userVal === '' || pswVal === '' || confirmVal === '' || emailVal === '') {
			    	alert('不能为空')
			    	return false;
			    } else if (pswVal !== confirmVal) {
			    	$confirmTip.text('两次输入的密码不一致').fadeIn(500);
			    	return false;
			    } else if (!regEmail.test(emailVal)) {
			    	$emailTip.text('邮箱不符合规则').fadeIn(500);
			    	return false;
			    } else {
			    	return true;
			    }
		},
		
		// 失去焦点
		handleBlur: function (inputObj, tipObj) {
			inputObj.blur(function () {
				var value = $(this).val();
				if (value === '') {
					tipObj.text('不能为空').fadeIn(500);
				} else {
					if ($(this).attr('id') === 'psw' && value.length < 6) {
						tipObj.text('密码长度必须大于6').fadeIn(500);
					} else {
						tipObj.fadeOut(500, function () {
							$(this).text('');
						});
					}
				}
			});
		}
	};
	
	$input.keyup(function () {
		var value = $(this).val();
	    if (value === ' ') {
	    	$(this).val('');
	    }
	});
	
	valide.handleBlur($user, $userTip);
	valide.handleBlur($psw, $pswTip);
	valide.handleBlur($confirmPsw, $confirmTip);
	valide.handleBlur($email, $emailTip);
	
	$submit.click(function () {
		if (valide.valideFn()) {
			$userForm.submit();
		}
	});
	
	$reset.click(function() {
		$user.val(''),
		$psw.val(''),
		$confirmPsw.val(''),
		$email.val('');
	});
})();
