(function () {
	var $remove = $('.remove'),
	    $checkBox = $('.check-box'),
	    ids = [];
	let fn = {
		handleDisabled: function () {
			ids.length? $remove.attr('disabled', false) : $remove.attr('disabled', true);
		}
	};
	fn.handleDisabled();

	    $checkBox.click(function () {
	    	if (this.checked) {
	    		ids.push($(this).val());
	    	} else {
	    		for (let i = ids.length - 1; i>=0; i--) {
	    			if ($(this).val() === ids[i]) {
	    				// console.log(i);
	    				ids.splice(i, 1);
	    			}
	    		}
	    	}
	    	fn.handleDisabled();
	    });
	    
	    $remove.click(function () {
	    	if (ids.length) {
	    		$.ajax({
	    			url: '/admin/user',
	    			type: 'post',
	    			dataType: 'json',
	    			data: {
	    				ids: ids
	    			},
	    			success: function (res) {
	    				if (res && res.success) {
	    					alert(res.msg);
	    					location.reload();
	    				} else {
	    					alert('删除失败');
	    				}
	    			},
	    			error: function (res) {
	    				
	    			}
	    		})
	    	} else {
	    		return null;
	    	}
	    	
	    });
})();
