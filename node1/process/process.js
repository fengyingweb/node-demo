
const fs = require('fs');
console.log(process.cwd());
console.log(process.argv);
// console.log(process.env);

process.on('uncaughtException', (err) => {
	fs.writeSync(1, `caught exception: ${err}\n`);
});

setTimeout(() => {
	console.log('This will still run...');
}, 500);

fn();
process.on('exit', (code) => {
	console.log(`进程退出了:${code}`);
})
