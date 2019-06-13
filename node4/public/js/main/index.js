$(function() {
    // 轮播
    (function() {
        var $bannerWraper = $('.banner-wraper'), 
            $banner = $('.banner'),
            $bannerList = $('.banner-list'),
            $btnItem = $('.btn-item'),
            $arrowLeft = $('.arrow-left'),
            $arrowRight = $('.arrow-right'),
            $arrow = $('.arrow'),
            index = 0;
        
        var mWidth = $banner.outerWidth();
        var len = $bannerList.children().length;
        var timer = null;
		var t = null;
        init();

        $(window).resize(function() {
            mWidth = $banner.outerWidth();
        });

        // 点击右箭头
        $arrowRight.click(function() {
            clearInterval(timer);
            index++;
			console.log((new Date() - t))
            if ((new Date() - t) > 500) {
                t = new Date();
                $btnItem.eq(index).addClass('active').siblings().removeClass('active');
                $bannerList.stop().animate({marginLeft: -(index+1)*mWidth + 'px'}, 500, function() {
                    if (index >= len-2) {
                        $bannerList.css({marginLeft: -mWidth + 'px'});
                        index = 0;
                        $btnItem.eq(index).addClass('active').siblings().removeClass('active');
                    }
                });
            }
        });

        // 点击左箭头
        $arrowLeft.click(function() {
            clearInterval(timer);
            index--;
            if ((new Date() - t) > 800) {
                t = new Date();
                $btnItem.eq(index).addClass('active').siblings().removeClass('active');
                $bannerList.stop().animate({marginLeft: -(index+1)*mWidth + 'px'}, 500, function() {
                    if (index <= -1) {
                        $bannerList.css({marginLeft: -(len - 2)*mWidth + 'px'});
                        index = len - 3;
                        $btnItem.eq(index).addClass('active').siblings().removeClass('active');
                    }
                });
            }
        });

        // 点击数字
        $btnItem.click(function() {
            clearInterval(timer);
            var num = $(this).index();
            index = num;
            if ((new Date() - t) > 800) {
                t = new Date();
                $(this).addClass('active').siblings().removeClass('active');
                $bannerList.stop().animate({marginLeft: -(index+1)*mWidth + 'px'}, 500);
            }
        });

        autoPlay();

        $bannerWraper.hover(function() {
            clearInterval(timer);
            $arrow.fadeIn(500);
        }, function() {
            $arrow.fadeOut(500);
            autoPlay();
        });

        // 自动轮播
        function autoPlay() {
            timer = setInterval(function() {
                index++;
                $btnItem.eq(index).addClass('active').siblings().removeClass('active');
                $bannerList.stop().animate({marginLeft: -(index+1)*mWidth + 'px'}, 500, function() {
                    if (index >= len-2) {
                        $bannerList.css({marginLeft: -mWidth + 'px'});
                        index = 0;
                        $btnItem.eq(index).addClass('active').siblings().removeClass('active');
                    }
                });
            }, 4000)
        }
        function init () {
            $btnItem.eq(index).addClass('active');
            $bannerList.css({marginLeft: -(index + 1) * mWidth + 'px'});
        }
    })();

    // 遮罩层
    (function() {
        var $thumbnail = $('.thumbnail');

        $thumbnail.hover(function(ev) {
            ev = ev || window.evnet;
            var _this = this;
            moveCover(ev, _this, true);
        }, function(ev) {
            ev = ev || window.evnet;
            var _this = this;
            moveCover(ev, _this, false);
        });

        function moveCover(ev, obj, bool) {
            var x = ev.pageX;
            var y = ev.pageY;
            var top = $(obj).offset().top;
            var left = $(obj).offset().left;
            var bottom = top + $(obj).outerHeight();
            var right = left + $(obj).outerWidth();

            var disL = Math.abs(x - left),
                disR = Math.abs(x - right),
                disT = Math.abs(y - top),
                disB = Math.abs(y - bottom);
            
            var num = Math.min(disL, disR, disT, disB); // 找到差值最小的
           
            switch(num) {
                case disL:
                    if (bool) {
                        $(obj).find('.thumbnail-cover').css({left: '-100%', top: 0})
                        .stop().animate({left: 0}, 500);
                    } else {
                        $(obj).find('.thumbnail-cover').stop()
                        .animate({left: '-100%'}, 500);
                    }
                    break;
                case disR:
                    if (bool) {
                        $(obj).find('.thumbnail-cover').css({left: '100%', top: 0})
                        .stop().animate({left: 0}, 500);
                    } else {
                        $(obj).find('.thumbnail-cover').stop()
                        .animate({left: '100%'}, 500)
                    }
                    break;
                case disT:
                    if (bool) {
                        $(obj).find('.thumbnail-cover').css({top: '-100%', left: 0})
                        .stop().animate({top: 0}, 500);
                    } else {
                        $(obj).find('.thumbnail-cover').stop()
                        .animate({top: '-100%'}, 500);
                    }
                    break;
                case disB:
                    if (bool) {
                        $(obj).find('.thumbnail-cover').css({top: '100%', left: 0})
                        .stop().animate({top: 0}, 500);
                    } else {
                        $(obj).find('.thumbnail-cover').stop()
                        .animate({top: '100%'}, 500);
                    }
                    break;
            }
        }
    })();
    
    // 分页查询
    (function(){
    	var pageObj = {
    		page: 1,
    		pageSize: 8
    	};
    	var $newBlogUl = $('.new-blog');
    	var $paginationUl = $('.pagination');
    	
    	var getArticle = function(pageObj) {
    		$.ajax({
    			type: 'POST',
    			url: '/',
    			dataType: 'json',
    			data: {
    				page: pageObj.page,
    				pageSize: pageObj.pageSize
    			},
    			success: function(res) {
    				// console.log(res);
    				if (res.success && res.data) {
    					init(res.data, pageObj);
    				}
    			},
    			error: function(err) {
    				console.log(err);
    			}
    		})
    	};
    	
    	var init = function(data, pageObj) {
    		$newBlogUl.html('');
    		$paginationUl.html('');
    		var dataList = data.list;
    		var total = data.total;
    		var pageSize = total / pageObj.pageSize;
    		var newBlogStr = '';
    		var pageStr = '<li class="prev-page disabled"><a href="javascript:void(0)">&laquo;</a></li>'
    		for (var i=0; i<dataList.length; i++) {
    			newBlogStr += `<li>
                                  <h3 class="blog-title">
                                      <span>个人文章</span>
                                      <a href="/detail/${dataList[i].id}.html">${dataList[i].title}</a>
                                  </h3>
                                  <div class="blog-info row">
                                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 blog-pic">
                                          <a href="/detail/${dataList[i].id}.html"><img class="img-responsive" src="${dataList[i].imgUrl}" alt="图片不存在"></a>
                                      </div>
                                      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                          <p class="blog-desc">${dataList[i].desc}</p>
                                      </div>
                                  </div>

                                  <div class="author-info clearfix">
                                      <div class="fl author-lf">
                                          <span class="fl-time">${dataList[i].time}</span>
                                          <span class="fl-preview">
                                             <a href="/detail/${dataList[i].id}.html">浏览<i>(1926)</i></a>
                                          </span>
                                      </div>
                                      <div class="fr author-ri">
                                          <a href="/detail/${dataList[i].id}.html">阅读原文&gt;&gt;</a>
                                      </div>
                                  </div>

                                  <div class="line"></div>
                              </li>`;
    		}
    					
    		for (var j=0; j<pageSize; j++) {
    			if (j === pageObj.page - 1) {
    				pageStr += `<li class="page-item active"><a href="javascript:void(0)">${j+1}</a></li>`;
    			} else {
    				pageStr += `<li class="page-item"><a href="javascript:void(0)">${j+1}</a></li>`;
    			}
    		}
    		
    		pageStr += `<li class="next-page"><a href="javascript:void(0)">&raquo;</a></li>`;
    		
    		$newBlogUl.append(newBlogStr).css({opacity: 1});
    		$paginationUl.append(pageStr);
    		
    		var $newBlogLi = $('.new-blog li');
	        $newBlogLi.hover(function() {
	            $(this).find('.line').css({width: '100%'});
	        }, function() {
	            $(this).find('.line').css({width: 0});
	        });
	        
	        var $pageItem = $('.page-item');
	        $pageItem.click(function() {
	        	pageObj.page = $(this).text()*1;
	        	$newBlogUl.css({opacity: 0});
	        	getArticle(pageObj);
	        });
	        
	        var $prevPage = $('.prev-page');
	        var $nextPage = $('.next-page');
	        if (pageObj.page === 1) {
	        	$prevPage.addClass('disabled');
	        } else {
	        	$prevPage.removeClass('disabled');
	        }
	        
	        if (pageObj.page === j) {
	        	$nextPage.addClass('disabled');
	        } else {
	        	$nextPage.removeClass('disabled');
	        }
	        
	        $prevPage.click(function() {
	        	if ($(this).hasClass('disabled')) {
	        		return null;
	        	}
	        	pageObj.page--;
	        	$newBlogUl.css({opacity: 0});
	        	getArticle(pageObj);
	        });
	        
	        $nextPage.click(function() {
	        	if ($(this).hasClass('disabled')) {
	        		return null;
	        	}
	        	pageObj.page++;
	        	$newBlogUl.css({opacity: 0});
	        	getArticle(pageObj);
	        });
    	};
    	
    	getArticle(pageObj);
    })();

    // 主内容
//  (function() {
//      var $newBlogLi = $('.new-blog li');
//      $newBlogLi.hover(function() {
//          $(this).find('.line').css({width: '100%'});
//      }, function() {
//          $(this).find('.line').css({width: 0});
//      })
//  })();
})
