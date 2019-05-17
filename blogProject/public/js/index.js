// 导航
(function () {
	var $navLeftLi  = $(".nav-item-l"),
	    $navList = $(".nav-list"),
	    $navUser = $(".nav-user");
	    
	$navLeftLi.eq(0).addClass('active');
	$navLeftLi.hover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(this).find(".nav-l-hide").fadeIn(500).addClass('scale');
	}, function(){
		$(this).find(".nav-l-hide").fadeOut(500).removeClass('scale');
	});
	
	$navList.mouseleave(function () {
		$navLeftLi.eq(0).addClass('active').siblings().removeClass("active");
	});
	
	$navUser.hover(function(){
		$(this).find(".nav-l-hide").fadeIn(500).addClass('scale');
	}, function() {
		$(this).find(".nav-l-hide").fadeOut(500).removeClass('scale');
	})
})();

// 文章分页
(function () {
	var $listItem = $('.list-item'),
	    $artCon = $('.art-con'),
	    $prev = $('.prev'),
	    $next = $('.next'),
	    time = 0,
	    num = 1;
	    
        getArtList();
	    $listItem.eq(0).addClass('active');
	    $prev.addClass('disabled');
	    
	    $listItem.click(function () {
	    	 clearTimeout($artCon[0].timer);
	    	 if ((new Date()) - time > 1600) {
	    	 	time = new Date();
	    	 	num = $(this).attr('data-num');
		    	 num == 1? $prev.addClass('disabled') : $prev.removeClass('disabled');
		    	 num == $listItem.length? $next.addClass('disabled') : $next.removeClass('disabled');
		    	 showArt();
	    	 }
	    });
	    
	// 上一页
	$prev.click(function () {
		clearTimeout($artCon[0].timer);
		if ((new Date()) - time > 1600) {
			time = new Date();
			num--;
			if (num <1 ) {
				num = 1;
			} else {
				showArt();
			}
			num == 1? $(this).addClass('disabled') : $(this).removeClass('disabled');
			num == $listItem.length? $next.addClass('disabled') : $next.removeClass('disabled');
		}
	});
	
	// 下一页
	$next.click(function () {
		clearTimeout($artCon[0].timer);
		if ((new Date()) - time > 1600) {
			time = new Date();
			num++;
			if (num >3) {
				num = 3;
			} else {
				showArt();
			}
			num == 1? $prev.addClass('disabled') : $prev.removeClass('disabled');
			num == $listItem.length? $(this).addClass('disabled') : $(this).removeClass('disabled');
		}
	})
	
	function getArtList(num) {
		$.ajax({
			url: '/',
			type: 'post',
			dataType: 'json',
			data: {
				pageNum: num
			},
			success: function (data) {
				// console.log(data.dataList);
				if (data.dataList.length && data.success) {
					let dataList = data.dataList;
					let str = '';
					for (let i=0; i<dataList.length; i++) {
						str += `<div class="col-lg-6 col-md-6 col-sm-6">
							        <a class="thumbnail clearfix" href="/details/list-${dataList[i].id}.html">
							          <div class="img-box">
							            <img src="${dataList[i].img}" width="100%" height="100%" alt="图片不存在" />
							          </div>
							          <div class="caption art-info">
							            <h3 class="title">${dataList[i].title}</h3>
							            <p class="tag-info">标签:&nbsp;${dataList[i].tag}</p>
							            <p class="author-info">发布者:&nbsp;${dataList[i].author}</p>
							            <p class="time-info">发布时间:&nbsp;${dataList[i].time}</p>
							            <div class="more clearfix">
							              <span class="more-span">more&raquo;</span>
							            </div>
							          </div>
							        </a>
							   </div>`;
					}
					$artCon.html(str).css('opacity', 1);
				}
			},
			error: function (data) {
				alert(data.responseText);
			}
		})
	}
	
	function showArt () {
		$listItem.eq(num-1).addClass('active').siblings().removeClass('active');
		$artCon.css('opacity', 0);
	    $artCon[0].timer = setTimeout(function () {
	    	getArtList(num);
	    }, 800);
	}
	
	/*
	 * <div class="col-lg-6 col-md-6 col-sm-6">
	        <a class="thumbnail" href="">
	            <h2 class="title text-center"></h2>
	        </a>
	   </div>
	 */
})();
