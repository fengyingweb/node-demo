const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const message = Buffer.from('some msg');

client.send(message, 41234, 'localhost', (err)=> {
	if (err) {
		console.log(`error: ${err}`);
		client.close();
	} else {
		console.log(`发送消息成功`);
	}
});
