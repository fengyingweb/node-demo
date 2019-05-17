const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const EventEmitter = require('events');
const util = require('util');

class CommandLine {
	constructor () {
		this.readLine = rl;
		this.readLine.setPrompt('weChat>');
		this.readLine.on('line', (data)=> {
		  this.emit('input', data);
		});
	}
	
	start () {
		this.readLine.prompt();
	}
	
}
util.inherits(CommandLine, EventEmitter);

module.exports = CommandLine;

