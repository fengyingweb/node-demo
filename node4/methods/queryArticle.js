const dataBase = require('../model/db.js');
const queryArt = {
	// 查询最新的4条文章
	findPartArt: function() {
		return new Promise((resolve, reject)=> {
			dataBase.Article.find({})
			.limit(4)
			.sort({time: 'desc'})
			.exec((err, data)=> {
				if (err) {
					reject(err);
					return null;
				}
				resolve(data);
			})
		});
	},
	
	// 查询文章详情
	findArtDetail: function(id) {
		return new Promise((resolve, reject)=> {
			dataBase.Article.find({id: id}, (err, data)=> {
				if (err) {
					reject(err);
					return null;
				}
				resolve(data);
			});
		});
	},
	
	// 查询所有文章, 返回文章数量
	findArtCount: function() {
		return new Promise((resolve, reject)=> {
			dataBase.Article.find({})
			.count((err, count)=> {
				if (err) {
					reject(err);
					return null;
				}
				resolve({count: count});
			});
		});
	},
	
	// 分页查询文章
	queryPage: function(page, pageSize) {
		return new Promise((resolve, reject)=> {
			dataBase.Article.find({})
			.skip(pageSize*page - pageSize)
			.limit(pageSize)
			.sort({time: 'desc'})
			.exec((err, data)=> {
				if (err) {
					reject(err);
					return null;
				}
				resolve({data: data});
			});
		});
	}
};

module.exports = queryArt;
