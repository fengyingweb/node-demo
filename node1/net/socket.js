const net = require('net');
// console.log(net);

const socket = net.createConnection({port: 63456}, ()=> {
	console.log('connect server success');
});

socket.on('data', (data)=> {
	console.log(data.toString());
});

socket.on('end', ()=> {
	console.log('disconnected from server');
});
