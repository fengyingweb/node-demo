const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};  //继承EventEmitter类
// console.log(myEmitter);
// console.log(EventEmitter);

const myEmitter = new MyEmitter();
let n = 0;
myEmitter.on('event', (data) => {
	console.log('触发了event事件' + data);
});
myEmitter.emit('event', 'this is some event');

myEmitter.on('eventOne', (data) => {
	console.log('触发eventOne');
	setImmediate(() => {
		console.log(data);
	});
});
myEmitter.emit('eventOne', '异步发生的事件');

myEmitter.once('eventTow', () =>{
	console.log(++n);
});
myEmitter.emit('eventTow');
myEmitter.emit('eventTow');

process.on('uncaughtException', (err) => {
	console.log(`有错误${err}`);
});

myEmitter.on('error', (err)=> {
	console.log(err);
});

myEmitter.emit('error', new Error('whoops!'));

const util = require('util');

function MineEmitter () {
	EventEmitter.call(this);
}

util.inherits(MineEmitter, EventEmitter); //继承EventEmitter类

const mine = new MineEmitter();
mine.on('newEvent', (data) => {
	console.log('触发newEvent:' + data);
});
mine.emit('newEvent', 'this is a new event');
