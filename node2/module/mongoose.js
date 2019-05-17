const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/runoob';
// console.log(mongoose);

const db = mongoose.createConnection(url);
const Schema = mongoose.Schema;
// console.log(db);
db.on('error', (err)=> {
	if (err) {
		console.log(err);
		db.close();
	};
});
let mySchema = new Schema({
	id: String,
	userName: String,
	password: String,
	email: String
});

const User = db.model('User', mySchema);
// console.log(User);

//User.create({id: '1', userName: 'wulv', password: '123456', email: 'wulv@163.com'}, (err, data)=> {
//	if (err) throw err;
//	console.log(data);
//});

User.find({userName: 'wulv'}, (err, data)=> {
	if (err) throw err;
	console.log(data);
});
// db.close();

// mongoose.connect(url, function(err, db) {
	// if (err) throw err;
	// console.log(db);
	
	// 创建数据结构,规范数据类型
//	let kittySchema = mongoose.Schema({
//		name: String
//	});
	// console.log(kittySchema);
	
	// 实例方法methods
//	kittySchema.methods.speak = function() {
//		let greeting = this.name? "Meow name is " + this.name : "I don't have a name";
//		console.log(greeting);
//	};
//	
    // 创建数据模型,集合collection
//	const Kitten = mongoose.model('Kitten', kittySchema);
//	
    // 创建数据模型实例,文档document
//	let silence = new Kitten({name: 'silence'});
//	console.log(silence.name);	
//	
//	let fluffy = new Kitten({name: 'fluffy'});
//	console.log(fluffy);
//	fluffy.speak();
	
	// 保存数据save(cb)
//	fluffy.save(function(err, data) {
//		if (err) throw err;
//		console.log(data);
//	})
    
//  silence.save(function(err, data) {
//  	if (err) throw err;
//  	data.speak();
//  })

    // 查询数据find(where, cb)
//  Kitten.find(function(err, data) {
//  	if (err) throw err;
//  	console.log(data.length);
//  });
//  
//  let whereStr = {name: 'fluffy'}; // 查询条件
//  Kitten.find(whereStr, function(err, data) {
//  	if (err) throw err;
//  	console.log(data);
//  })

// let blogSchema  = new Schema({
//     title: String,
//     author: String,
//     body: String,
//     comments: [{
//     	  body: String,
//     	  date: Date
//     }],
//     date: {
//     	  type: Date,
//     	  default: Date.now()
//     },
//     hidden: Boolean,
//     meta: {
//     	  votes: Number,
//     	  favs: Number
//     },
//     age: Number
// }, {autoIndex: false});
// 
// blogSchema.methods.getAuthor = function() {
// 	  return this.author;
// };
// 
// blogSchema.methods.findTitle = function(cb) {
// 	  let whereStr = {title: this.title}; // 查询条件
// 	  return this.model('Blog').find(whereStr, cb);
// };
   
   // 创建数据模型
   // const Blog = mongoose.model('Blog', blogSchema);
   // console.log(Blog);
   
// let myBlog = new Blog({
// 	  title: "feng ying blog",
// 	  author: "feng ying",
// 	  body: "This is an new blog",
// 	  comments: [
// 	    {
// 	    	body: "This is a dog",
// 	    	date: new Date()
// 	    },
// 	    {
// 	    	body: "This is a cat",
// 	    	date: new Date()
// 	    }
// 	  ],
// 	  date: new Date(),
// 	  hidden: false,
// 	  meta: {
// 	  	votes: 10,
// 	  	favs: 10
// 	  },
// 	  age: 30
// });
   // console.log(myBlog);
   
// myBlog.save(function(err, data) {
// 	  if (err) throw err;
// 	  console.log(data.getAuthor());
// });
   
// myBlog.findTitle(function(err, blogs) {
// 	  if (err) throw err;
// 	  console.log(blogs);
// });
   
   // virtual虚拟方法
// let personSchema = new Schema({
// 	  name: {
// 	  	first: String,
// 	  	last: String
// 	  }
// });
// 
// personSchema.virtual('fullName').
//   get(function() {
// 	    return this.name.first + ' ' + this.name.last;
//   }).
//   set(function(nVal) {
//   	this.name.first = nVal.substr(0, nVal.indexOf(' '));
//   	this.name.last = nVal.substr(nVal.indexOf(' ') + 1);
//   });
// 
// const Person = mongoose.model('Person', personSchema);
//   
// let axl = new Person({
// 	  name: {
// 	  	 first: 'Axl',
// 	  	 last: 'Rose'
// 	  }
// });
   // console.log(axl.name.first + ' ' + axl.name.last);
   
// console.log(axl.fullName); // Axl Rose
// 
// axl.fullName = 'William Rose';
// console.log(axl.name.first); // William
   
   // toJSON, toObject
   // let jsonSchema = new Schema({name: String});
   
   // console.log(jsonSchema.path('name'));
   
// jsonSchema.path('name').
//   get(function(val) {
// 	     return val + ' is my name';
//   });
     
    // jsonSchema.set('toJSON', {getters: true, virtuals: false});
    // jsonSchema.set('toObject', {getters: true});
    
// const Pmodel = mongoose.model('Pmodel', jsonSchema);
// let p = new Pmodel({name: 'Max Headroom'});
// console.log(p.toObject()); // { _id: 5accc9f963f0e523f46bfa41, name: 'Max Headroom' }
// console.log(p.toJSON()); // { _id: 5accc9f963f0e523f46bfa41,name: 'Max Headroom is my name' }
// console.log(JSON.stringify(p)); // {"_id":"5accc9f963f0e523f46bfa41","name":"Max Headroom is my name"}
   
   // 通过_id查找
// Blog.findById('5acc83a50345d508a48eb10f', function(err, data) {
// 	  if (err) throw err;
// 	  console.log(data);
// });
   
   // 统计数量count
// Blog.count({title: 'feng ying blog'}, (err, count)=> {
// 	  if (err) throw err;
// 	  console.log(count);
// });

    // 删除文档deleteMany, deleteOne, remove
//  Blog.deleteMany({title: 'feng ying blog'}, function(err, result) {
//  	if (err) throw err;
//  	console.log(result);
//  });
    
    // Model.where()
//  Blog.where('age').gt(20).lt(30).exec((err, data) => {
//  	if (err) throw err;
//  	console.log(data);
//  });
    
//  Blog.find({age: {$gt: 20, $lt: 30}}, (err, data)=> {
//  	if (err) throw err;
//  	console.log(data);
//  });
    
    // Model.create（）
//  Person.create({name: { first: 'wu', last: 'lv'}}, function(err, data) {
//  	 if (err) throw err;
//  	 console.log(data);
//  });
    
//  let perArr = [{
//     name: {
//     	  first: 'feng',
//     	  last: 'ying',
//     }
//    }, {
//    	name: {
//    		first: 'xuan',
//    		last: 'wu'
//    	}
//    }
//  ];
//  
//  Person.create(perArr, (err, data)=> {
//  	if (err) throw err;
//  	console.log(data);
//  })
// });




//mongoose.connect(url);
//
//const db = mongoose.connection;
//db.on('error', (err)=> {
//	console.log(err);
//	return;
//});
//
//db.once('open', function() {
//	let kittySchema = mongoose.Schema({
//		name: String
//	});
//	
//	const Kitten = mongoose.model('Kitten', kittySchema);
//	
//	let silence = new Kitten({name: 'silence'});
//	console.log(silence.name);
//})
