const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const User = require('../User.js');
const CommandLine = require('./CommandLine.js');
const Message = require('../Message.js');
const randMethod = require('../methods/randomMethod.js');

const curUser = new User({
	name: process.argv[2]?process.argv[2]:randMethod.randomName(),
	age: process.argv[3]?process.argv[3]:18,
	port: process.argv[4]?process.argv[4]:randMethod.randomPort(),
	id: randMethod.randomId(),
	to: process.argv[5]?process.argv[5]:null
});

const cmd = new CommandLine();

cmd.on('input', (msg)=> {
	let message = new Message({
		from: curUser,
		to: curUser.to,
		content: msg,
		createTime: Date.now()
	});
	let msgStr = JSON.stringify(message);
	client.send(msgStr, 0, msgStr.length, 41235, 'localhost', ()=> {
		console.log(`send message to port 41235 success`);
		cmd.start();
	});
});

client.on('message', (msg1, rinfo)=> {
	msg1 = JSON.parse(msg1);
	console.log(msg1.content);
	cmd.start();
});

cmd.start();

client.on('listening', ()=> {
	cmd.start();
});
client.bind(curUser.port, curUser.ip);
