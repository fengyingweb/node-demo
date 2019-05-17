(function () {
	var html = document.querySelector('html');
	var $loginBox = $('.login-box');
	var screenWidth = html.getBoundingClientRect().width;
	var $login = $('.login');
	var $modalLogin = $(".modal-login");
	var $userName = $(".user-name");
	var $psw = $(".password");
	var $userTip = $(".user-tip");
	var $pswTip = $(".psw-tip");
	var $outLogin = $(".out-login");
	
	var valide = {
		valideFn: function () {
			var userVal = $userName.val(),
			    pswVal = $psw.val();
			    if (userVal === '' || pswVal === '') {
			    	$userTip.fadeIn(500).children().text('用户名，密码不能为空');
			    	return false;
			    } else {
			    	$userTip.fadeOut(500).children().text('');
			    	return true;
			    }
		},
		handleBlur: function (inputObj, tipObj) {
			inputObj.blur(function () {
				var value = $(this).val();
				if (value === '') {
					tipObj.fadeIn(500).children().text('不能为空');
				} else {
					tipObj.fadeOut(500).children().text('');
				}
			});
		},
		handleKeyUp: function (inputObj) {
			   inputObj.keyup(function () {
			   	  var value = $(this).val();
			   	  if (value === ' ') {
			   	  	$(this).val('');
			   	  }
			   })
		}
	};
	  valide.handleBlur($userName, $userTip);
	  valide.handleBlur($psw, $pswTip);
	  valide.handleKeyUp($userName);
	  valide.handleKeyUp($psw);
	  
	  
	    $loginBox.css({
		    "marginLeft": -$loginBox.outerWidth()/2 + 'px',
		    "marginTop": -$loginBox.outerHeight()/2 + 'px'
		});
	
	    
	    $(window).resize(function() {
	    	var innerWidth = this.innerWidth;
	    	loginBoxWidth(innerWidth);
	    });
	    
	    // 点击登陆弹窗的登陆
	    $login.click(function(){
	    	if (valide.valideFn()) {
	    		$.ajax({
	    			url: '/login',
	    			type: 'post',
	    			dataType: 'json',
	    			data: {
	    				username: $userName.val(),
	    				password: $psw.val()
	    			},
	    			success: function (data) {
	    				// console.log(data);
	    				if (data && data.success) {
	    					zoomFadeOut();
	    				}
	    			},
	    			error: function (data) {
	    				// console.log(data.responseText);
	    				if (data && data.responseText) {
	    					$userTip.fadeIn(500).children().text(data.responseText);
	    				} else {
	    					$userTip.fadeOut(500).children().text('');
	    				}
	    			}
	    		});
	    	} else {
	    		return null;
	    	}
	    });
	    
	  
	    // 退出登陆
	    $outLogin.click(function() {
	    	location.href = '/outLogin';
	    });
	    
	    function loginBoxWidth(value) {
	    	if (value > 375 && value <=768) {
		    	$loginBox.css({
		    		"width": '50%'
		    	});
		    } else if (value <= 375) {
		    	$loginBox.css({
		    		"width": '85%'
		    	});
		    } else {
		    	$loginBox.css({
		    		"width": '35%'
		    	});
		    }
		    $loginBox.css({
		    	"marginLeft": -$loginBox.outerWidth()/2 + 'px',
		    	"marginTop": -$loginBox.outerHeight()/2 + 'px'
		    });
	    }
	    
	    // 缩小淡出
	    function zoomFadeOut () {
	    	$loginBox.fadeOut(1000, function(){
	    		$modalLogin.fadeOut(800,function(){
	    			$loginBox.removeClass('tranfor-zoom-in');
	    			location.reload();
	    		})
	    	}).addClass('tranfor-zoom-in');
	    }
	    
	    //缩小淡入
	    function zoomFadeIn () {
	    	$modalLogin.fadeIn(800, function(){
	    		$loginBox.fadeIn(1000).removeClass('tranfor-zoom-out');
		    });
	    }
})();
