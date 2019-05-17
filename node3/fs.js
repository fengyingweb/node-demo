// 文件系统 操作文件
const fs = require('fs');

// 打开文件，如果这个文件不存在则创建  可以用来检测文件是否存在
/*fs.open('./b.txt', 'wx', (err, data) => {
	if (err) {
		console.log('error:' + err);
		return;
	}
	console.log(data);
})*/

// 创建文件夹
// fs.mkdir('./feng');

// 删除文件夹
// fs.rmdir('./feng');

//  删除文件
// fs.unlink('./b.txt');

// 读取文件信息
/*fs.stat('./views', (err, data) => {
	if (err) {
		console.log(`error:${err}`);
		return;
	}
	console.log(data);
})*/

// 检测文件是否   可读/写
/*fs.access('./a.txt', fs.constants.R_OK | fs.constants.W_OK, (err, data) => {
	if (err) {
		console.log(`error:${err}`);
		return;
	}
	console.log(data);
})*/

// 把数据追加到文件里
/*fs.appendFile('./a.txt', '新加内容', (err, data) => {
	console.log(err? err : data);
})*/

// 把数据写入到文件里，替换
/*fs.writeFile('./a.txt', '替换的内容', (err, data) => {
	console.log(err? err : data);
})*/

// 读取文件
/*fs.readFile('./a.txt', 'utf-8', (err, data) => {
	console.log(err? err : data);
})*/
/*fs.readFile('./a.txt', (err, data) => {
	if (err) {
		console.log(`error:${err}`);
		return;
	}
	// let str = Buffer.from(data, 'utf8');
	let str;
	str += data;
	console.log(str);
})*/

// 读取文件夹
/*fs.readdir(`${__dirname}/views`, (err, data) => {
	console.log(err? err : data);
})*/

// 重命名
fs.rename('./a.txt', 'b.txt', (err, data) => {
	console.log(err? err : data);
})
