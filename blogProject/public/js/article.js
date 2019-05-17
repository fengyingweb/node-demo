(function () {
	//实例化编辑器
	var ue = UE.getEditor('editor');
	var $fileForm = $('#fileForm'),
	    $title = $('#title'),
	    $tag = $('#tag'),
	    $author = $('#author'),
	    $image = $('#image'),
	    $content = $('#content'),
	    $release = $('.release');
	
	var valide = {
		isNull: function () {
			var titVal = $title.val(),
			    tagVal = $tag.val(),
			    authorVal = $author.val(),
			    imageVal = $image.val(),
			    content = $content.val();
			    if (titVal === '' || tagVal === '' || authorVal === '' || imageVal ==='' || content === ''){
			    	return true;
			    } else {
			    	return false;
			    }
		}
	}
	    $release.on('click', function () {
	    	// console.log(valide.isNull());
	    	if (!valide.isNull()) {
	    		$fileForm.submit();
	    	}
	    })
	// var btn = $('#btn1');
	/*btn.on('click', function () {
		console.log(ue.hasContents()); // 判断是否有内容
		console.log(ue.getContent()); // 获取内容
		console.log(ue.getContentTxt()); //获取纯文本
	});*/
})();
