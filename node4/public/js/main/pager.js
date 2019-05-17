$(function(){
    (function() {
        // var ue = UE.getEditor('editor');
        var $btnSubmit = $('#btn-submit'),
            $uploadFile = $('#upload-file'),
            $title = $('#title'),
            $tag = $('#tag'),
            $author = $('#author'),
            $desc = $('#desc'),
            $content= $('#content');
         
        var $msgSuccess = $('.msg-success'),
            $msgError = $('.msg-error'),
            $close = $('.fa-times'),
            timer = null;
        
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
                }
                
                return result;
            },
            
            handleAjax: function() {
                var formData = new FormData();
                formData.append('title', $.trim($title.val()));
                formData.append('tag', $.trim($tag.val()));
                formData.append('author', $.trim($author.val()));
                formData.append('desc', $.trim($desc.val()));
                formData.append('content', $.trim($content.val()));
                formData.append('file', $uploadFile[0].files[0]);
                $.ajax({
                    type: 'POST',
                    url: '/pager-plus',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        // console.log(res);
                        if (res.success) {
                            $msgSuccess.find('span').text(res.msg);
                            $msgSuccess.stop().animate({top: '100px'}, 500, function() {
                                moveFade($msgSuccess);
                            });
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
//      ue.addListener("ready", function() {
//          $editor = $(ue.container);
//          ue.addListener('blur', function() {
//              var ueVal = ue.getContent();
//              if (!ueVal) {
//                  $editor.addClass('item-error').parent().siblings().text('不能为空').fadeIn(500);
//              } else {
//                  $editor.removeClass('item-error').parent().siblings().text('').fadeOut(500);
//              }
//          });
//  
//             ue.addListener('contentChange', function() {
//                 var value = ue.getContent();
//                 console.log(value);
//             })
//      });
        
        
        // 失去焦点
        util.handleBlur($title);
        util.handleBlur($tag);
        util.handleBlur($author);
        util.handleBlur($uploadFile);
        util.handleBlur($desc);
        util.handleBlur($content);
        
        // 键盘抬起
        util.handleKeyUp($title);
        util.handleKeyUp($tag);
        util.handleKeyUp($author);
        util.handleKeyUp($desc);
        util.handleBlur($content);
        
        // 提交数据
            $btnSubmit.click(function() {
               var eles = [$title, $tag, $author, $uploadFile, $desc, $content];
               var result = true;
               
               for (var i=0; i < eles.length; i++) {
                   if (!util.handleValidate(eles[i])) {
                       result = false;
                   }
               }
               
               if (result) {
               	   util.handleAjax();
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
            }, 5000);
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