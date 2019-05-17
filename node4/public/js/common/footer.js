$(function() {
    // 返回顶部
    (function() {
        var $returnTop = $('.return-top'),
            $win = $(window);

        // 窗口滚动
        $win.scroll(function() {
            var top = $(this).scrollTop();
            top > 600? $returnTop.fadeIn(500) : $returnTop.fadeOut(500);
        });

        $returnTop.click(function() {
            $('html, body').stop().animate({scrollTop: 0}, 500);
        })
    })();
});