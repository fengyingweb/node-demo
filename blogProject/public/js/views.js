(function () {
	var ue = $('#views-con'),
	    $navList = $('.nav-list'),
	    $goback = $('.goback');
	    
	var getData = {
		itemClick: function (obj) {
			var child = obj.children();
			var _this = this;
			child.click(function () {
				// console.log($(this).attr('data-type'));
		    	var daType = $(this).attr('data-type'),
		    	    filename = $(this).find('a').text(),
		    	    pfile = $(this).attr('data-pfile')? $(this).attr('data-pfile') : null,
		    	    daTypeC = $(this).attr('data-typeC')? $(this).attr('data-typeC') : null;
		    	$.ajax({
		    		url: '/admin/views',
		    		type: 'post',
		    		dataType: 'json',
		    		data: {
		    			dType: daType,
		    			filename: filename,
		    			parentFile: pfile,
		    			dTypeC: daTypeC
		    		},
		    		success: function (res) {
		    			// console.log(res);
		    			if (res.type == 1 && res.success) {
		    				ue.val(res.data);
		    			} else if (res.type == 2 && res.success) {
		    				let str = '';
		    				let fileList = res.data;
		    				if (fileList.length) {
		    					for (let i=0; i<fileList.length; i++) {
		    						if (fileList[i].indexOf('.') !== -1) {
		    							str += `<li class="list-item" data-type="1" data-typeC="1-1" data-pfile="${filename}"><a href="javascript:void(0)">${fileList[i]}</a></li>`;
		    						} else {
		    							str += `<li class="list-item" data-type="2" data-typeC="1-1" data-pfile="${filename}"><a href="javascript:void(0)">${fileList[i]}</a></li>`
		    						}
		    					}
		    				  obj.html(str);
		    				  _this.itemClick(obj);
		    				}
		    			}
		    		},
		    		error: function (res) {
		    			alert(res.responseText);
		    		}
		    	});
			});
		}
	};
	getData.itemClick($navList);
	$goback.click(function () {
		location.reload();
	})
	
	    /*$listItem.click(function () {
	    	// console.log($(this).attr('data-type'));
	    	var daType = $(this).attr('data-type'),
	    	    filename = $(this).find('a').text();
	    	$.ajax({
	    		url: '/admin/views',
	    		type: 'post',
	    		dataType: 'json',
	    		data: {
	    			dType: daType,
	    			filename: filename
	    		},
	    		success: function (res) {
	    			console.log(res);
	    			if (res.type == 1 && res.success) {
	    				ue.val(res.data);
	    			} else if (res.type == 2 && res.success) {
	    				
	    			}
	    		},
	    		error: function (res) {
	    			alert(res.responseText);
	    		}
	    	})
	    });*/
})();
