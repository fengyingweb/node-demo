$(function() {
    (function() {
        var $delBtn = $('.delete-btn'),
            $msgSuccess = $('.msg-success'),
            $msgError = $('.msg-error'),
            $close = $('.fa-times'),
            timer = null;

        // 点击删除按钮
        $delBtn.click(function() {
            var id = $(this).data('id');
            var self = this;
            $.ajax({
                type: 'POST',
                url: '/admin/delete',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function(res) {
                    // console.log(res);
                    if (res.success) {
                        $(self).parents('tr').remove();
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
});