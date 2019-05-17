(function () {
    var $headerRight = $('.header-right');
    var $itemL = $('#responseNav .item-l');
    
    // console.log(location.href);
//  $itemL.click(function(){
//  	console.log($(this).data('link'));
//  });
    
    $headerRight.hover(function(){
        $(this).find('.user-footer').slideDown(500);
    }, function(){
        $(this).find('.user-footer').slideUp(500);
    })
})();