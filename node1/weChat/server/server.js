const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const userList = {};
server.on('message', (msg, rinfo) => {
	let msgObj = JSON.parse(msg);
	userList[msgObj.from.name] = msgObj.from;
	if (!msgObj.to) {
		for(let user in userList) {
			 server.send(msg, 0, msg.length, userList[user].port, userList[user].ip, ()=> {
			 	console.log(`send from ${msgObj.from.name} to ${userList[user].name}`);
			 });
		}
	} else {
	  server.send(msg, 0, msg.length, msgObj.to, 'localhost', ()=> {
		console.log(`send from ${msgObj.from.port} to ${msgObj.to} `);
	  });
	}
});

server.on('listening', ()=> {
	let address = server.address();
	console.log(`监听服务器${address.address}:${address.port}`);
});
server.bind(41235, 'localhost');
