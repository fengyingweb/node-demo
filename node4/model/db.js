const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/blog';
const db = mongoose.createConnection(url);
const Schema = mongoose.Schema;

db.on('error', (err)=> {
    if (err) throw err;
    db.close();
});

let userSchema = new Schema({
    id: String,
    userName: String,
    password: String,
    email: String,
    admin: Number
});

let articleSchema = new Schema({
	id: String,
	title: String,
	tag: String,
	author: String,
	desc: String,
	content: String,
	imgUrl: String,
	time: String
});

const User = db.model('User', userSchema);
const Article = db.model('Article', articleSchema);

module.exports = {
    db,
    User,
    Article
}

