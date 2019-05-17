const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// console.log(socket);

server.on('error', (err)=> {
	console.log(`服务器异常:${err.stack}`);
	socket.close();
});

server.on('message', (msg, rinfo)=> {
	console.log(msg.toString());
	console.log(`服务器收到消息,来自${rinfo.address}:${rinfo.port}`);
});

server.on('listening', ()=> {
	let address = server.address();
	console.log(address);
	console.log(`监听服务器${address.address}:${address.port}`);
});
server.bind(41234, 'localhost');

