(function (){
	var ue = UE.getEditor('editor');
	var $release = $('.release'),
	    $artId = $('.art-id');
	    
	    $release.click(function () {
	    	// console.log(ue.hasContents());
	    	// console.log(ue.getContentTxt());
	    	// console.log($artId.text());
	    	if (ue.hasContents()) {
	    		$.ajax({
	    			url: '/details/list',
	    			type: 'post',
	    			dataType: 'json',
	    			data: {
	    				id: $artId.text(),
	    				content: ue.getContentTxt()
	    			},
	    			success: function (data) {
	    				// console.log(data);
	    				if (data.success) {
	    					ue.setContent('');
	    					location.reload();
	    				} else {
	    					alert(data.msg);
	    				}
	    			},
	    			error: function () {
	    				
	    			}
	    		})
	    	}
	    });
	
})();
