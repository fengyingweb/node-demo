const sql = require('./mysql');
const crypto = require('crypto');
const getData = {
	    // 所有用户信息
		userInfo: function () {
			 return new Promise((resolve, reject) => {
			 	  let sel = 'SELECT * FROM user';
					sql(sel, (err, data) => {
						if (err) {
							console.log(`error${err}`);
							reject(err);
							return null;
						}
						
						if (data && data.length) {
							data.forEach(item => {
								if (Number(item.admin)) {
									item.admin = '是';
								} else {
									item.admin = '否';
								}
							});
							resolve(data);
						} else {
							reject(err);
							return null;
						}
					});
			 });
		},
		// 删除用户
	    delUser: function (id) {
	    	return new Promise((resolve, reject) => {
	    		let del = 'DELETE FROM user Where id = ?';
	    		sql(del, [id], (err, data) => {
		    		if (err) {
		    			console.log(`error:${err}`);
		    			resolve({success: false, msg: '删除失败'});
		    			return null;
		    		}
		    		if (data.affectedRows) {
		    			resolve({success: true, msg: '删除成功'});
		    		}
		    	});
	    	});
	    },
	    // 单条用户信息
	    signInfo: function (id) {
	    	return new Promise((resolve, reject) => {
	    		let sel = 'SELECT * FROM user Where id = ?';
	    		sql(sel, [id], (err, data) => {
	    			if (err) {
	    				console.log(`error:${err}`);
	    				reject(err);
	    				return null;
	    			}
	    			if (data.length) {
	    				resolve(data);
	    			}
	    		})
	    	});
	    },
	    // 修改数据
	    updateInfo: function (req) {
	    	return new Promise((resolve, reject) => {
	    		// console.log(req.body);
	    		let id = req.body.id,
	    		    username = req.body.username,
	    		    password = req.body.password,
	    		    email = req.body.email,
	    		    admin = req.body.admin,
	    		    md5 = crypto.createHash('md5'),
	    		    sel = 'SELECT * FROM user Where id = ?',
	    		    update = 'UPDATE user set username=?, password=?, email=?, admin=? Where id=?';
	    		    sql(sel, [id], (err, data) => {
	    		    	if (err) {
	    		    		console.log(`error:${err}`);
	    		    	    resolve({success: false, msg: '修改失败'});
	    		    		return null;
	    		    	}
	    		    	
	    		    	let newPassword = data[0].password === password? password : md5.update(password).digest('hex');
	    		        sql(update,[username,newPassword,email,admin, id], (err, dataB)=> {
	    		        	if (err) {
	    		        		console.log(`error:${err}`);
	    		        		resolve({success: false, msg: '修改失败'});
	    		        		return null;
	    		        	}
	    		
	    		        	resolve({success: true, msg: '修改成功'});
	    		        })
	    		    });
	    	})
	    },
	    // 添加文章数据
	    insertArticle: function (req) {
	    	return new Promise((resolve, reject) => {
	    		// console.log(req.body);
	    		// console.log(req.file);
	    		let title = req.body.title,
				    tag = req.body.tag,
				    author = req.body.author,
				    content = req.body.content,
				    img = `/img/${req.file.filename}`,
				    time = new Date().toLocaleString();
				let insert = 'INSERT INTO article (id, title, tag, author, content, img, time) VALUES (0, ?, ?, ?, ?, ?, ?)';
			
					sql(insert, [title, tag, author, content, img, time], (err, data) => {
						  if (err) {
						  	console.log(`error:${err}`);
						  	resolve({success: false, msg: '发布失败'});
						  	return null;
						  }
						  // console.log(data);
						  resolve({success: true, msg: '发布成功'});
					});
	    	});
	    }, 
	    // 获取全部文章数量
	    findAllArt: function () {
	    	return new Promise((resolve, reject) => {
	    		let sel = 'SELECT * FROM article';
	    		sql(sel, (err, data) => {
	    			if (err) {
	    				console.log(`error:${err}`);
	    				return null;
	    			}
	    			resolve({total: data.length});
	    		});
	    	})
	    },
	    // 获取部分文章信息, 分页查询
	    findArticle: function (n) {
	    	return new Promise((resolve, reject) => {
	    		// console.log(n);
	    		let limitSel = 'SELECT * FROM article order by id desc limit ?, 4';
	    		let num = n? (n-1)*4 : 0;
	    		
	    			// console.log(num);
	    			sql(limitSel, [num], (err, dataB) => {
		    			if (err) {
		    				console.log(`error:${err}`);
		    				return null;
		    			}
		    			resolve({datas: dataB});
		    		});
	    	});
	    },
	    // 文章详情和评论内容
	    findDetail: function (id) {
	    	return new Promise((resolve, reject) => {
	    		let sel = 'SELECT * FROM article Where id = ?';
	    		let selCom = 'SELECT * FROM comment Where commentID = ?';
	    		sql(sel, [id], (err, data) => {
	    			if (err) {
		    		  console.log(`error:${err}`);
		    		  return null;
		    		}
	    			
	    				sql(selCom, [id], (err, comData) => {
	    					if (err) {
				    		  console.log(`error:${err}`);
				    		  return null;
				    		}
	    					resolve({detail: data, comment: comData});
	    				});
	    		});
	    	});
	    },
	    
	    // 添加评论内容
	    addComment: function (req) {
	    	return new Promise((resolve, reject) => {
	    		let commentID = req.body.id,
	    		    content = req.body.content,
	    		    time = new Date().toLocaleString(),
	    		    insert = 'INSERT INTO comment (id, userID, commentID, content, time) VALUES (0, 0, ?, ?, ?)';
	    		    sql(insert, [commentID, content, time], (err, data) => {
	    		    	if (err) {
			    		  console.log(`error:${err}`);
			    		  resolve({success: false, msg: '发表评论失败'});
			    		  return null;
			    		}
	    		    	resolve({success: true, msg: '发表评论成功'});
	    		    });
	    	});
	    }
	};
	
module.exports = getData;
