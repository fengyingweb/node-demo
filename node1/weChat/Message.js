class Message {
	constructor (msg) {
		this.from = msg.from;
		this.to = msg.to; // 没有指定to时为群发
		this.content = msg.content;
		this.createTime = msg.createTime;
	}
}

module.exports = Message;
