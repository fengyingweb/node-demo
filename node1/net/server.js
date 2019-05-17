const net = require('net');
// console.log(net);

//const server1 = new net.Server((socket)=> {
//	socket.end('goodbye\n');
//});
//
//server1.on('error', err => {
//	throw err;
//});
//
//server1.listen({
//	host: 'localhost',
//	port: 63456
//},()=> {
//	console.log(`opened server on and listening port: ${server1.address().port}`);
//});

// console.log(server1);

const server = net.createServer((client) => {
	console.log('client connected');
	
	client.on('end', () => {
		console.log('client disconnected');
	});
	
	client.write('hello\r\n');
	client.pipe(client);
	
});

server.on('error', (err)=> {
	throw err;
});


server.listen({
	host: 'localhost',
	port: 63456
}, ()=> {
	console.log(`listening port: ${server.address().port} success`);
})
