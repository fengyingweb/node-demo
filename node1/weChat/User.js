class User {
	constructor (user) {
		this.name = user.name;
		this.age = user.age;
		this.ip = 'localhost';
		this.port = user.port;
		this.to = user.to;
		this.id = user.id;
	}
}

module.exports = User;
