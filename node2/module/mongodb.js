const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/runoob';

// 链接并创建数据库
MongoClient.connect(url, (err, db)=> {
	if (err) throw err;
	console.log(`数据库以创建`);
	// console.log(db);
	let dbase = db.db('runoob');
	
	// 创建集合
//	dbase.createCollection('sit', function(err, res){
//		if (err) throw err;
//		console.log('创建集合成功');
//		console.log(res);
//		db.close();
//	});

   // 插入数据
   let myobj = { name: "菜鸟教程", url: "www.runoob" };
   
   // 插入一条数据
// dbase.collection('site').insertOne(myobj, function(err, res){
// 	  if (err) throw err;
// 	  console.log(`插入数据成功`);
// 	  console.log(res);
// 	  db.close();
// });
   
   // 插入多条数据
   let myObj2 = [
     { name: "菜鸟教程", url: "www.runoob", type: 'cn' },
     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
     { name: 'Google', url: 'https://www.google.com', type: 'en'},
     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
   ];
   
// dbase.collection('site').insertMany(myObj2, function(err, res){
// 	  if (err) throw err;
// 	  console.log('插入${res.result.n}条数据成功');
// 	  // console.log(res);
// 	  db.close();
// });

  // 查询数据
//let whereStr = {name: '菜鸟工具'}; // 查询条件
//dbase.collection('site').find(whereStr).toArray(function(err, res){
//	 if (err) throw err;
//	 console.log(res);
//	 db.close();
//});
  
  // 更新数据
  let whereStr1 = {name: '菜鸟教程'};
  let updateStr = {$set: {"url" : "https://www.runoob.com"}};
  
  // 更新一条数据
//dbase.collection('site').updateOne(whereStr1, updateStr, function(err, res) {
//	  if (err) throw err;
//	  console.log('更新数据成功');
//	  console.log(res);
//	  db.close();
//});
  
  // 更新多条数据
  let whereStr2 = {type: 'en'};
//dbase.collection('site').updateMany(whereStr2, updateStr, function (err, res) {
//	 if (err) throw err;
//	 console.log(`${res.result.nModified}条数据更新成功`);
//	 db.close();
//});
  
  // 删除数据
  // 删除一条
//dbase.collection('site').deleteOne(whereStr1, function(err, res){
//	 if (err) throw err;
//	 console.log(`删除数据成功`);
//	 console.log(res);
//	 db.close();
//});
  
  // 删除多条数据
//dbase.collection('site').deleteMany(whereStr2, (err, res)=> {
//	  if (err) throw err;
//	  console.log(`成功删除${res.result.n}条数据`);
//	  db.close();
//});

  // 排序 { type: 1 }  // 按 type 字段升序 { type: -1 } // 按 type 字段降序
//let mySort = {type: 1}; //升序
//dbase.collection('site').find({}).sort(mySort).toArray(function (err, res){
//	if (err) throw err;
//	console.log(res);
//	db.close();
//});
	
	
	// 分页查询limit() skip()
	dbase.collection('site').find({}).limit(2).toArray((err, res)=> {
		if (err) throw err;
		console.log(res);
		// db.close();
	});
	
	dbase.collection('site').find({}).skip(2).limit(2).toArray((err, res)=> {
		if (err) throw err;
		console.log(res);
		db.close();
	});
});
