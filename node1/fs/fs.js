const fs = require('fs');
const path = require('path');
const http = require('http');

// 创建目录
/*fs.mkdir(path.join(process.cwd(), 'file'), (err) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
})*/

// 读取目录
fs.readdir(process.cwd(), (err, files) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
	console.log(files);
});

// 删除目录
/*fs.rmdir(path.join(process.cwd(), 'file'), (err) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
})*/

// 重命名文件
/*fs.rename(path.join(process.cwd(), 'b.txt'), path.join(process.cwd(), 'c.txt'), (err) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
});*/

// 读取文件
fs.readFile('a.txt', (err, data) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
	console.log(data);
	let str = data.toString('utf8');
	console.log(str);
});
fs.readFile('c.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
	console.log(data);
});

// 文件状态文件信息,检测文件是否存在
fs.stat(path.join(process.cwd(), 'a.txt'), (err, stats) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
	console.log(stats);
});

// 追加内容到文件
fs.appendFile('./a.txt', '新增加的内容', (err) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
});

// 写入内容到文件,替换
fs.writeFile('./c.txt', '替换了之前的内容新内容', (err) => {
	if (err) {
		console.log(`error:${err}`);
		return null;
	}
});

// 监听文件
/*fs.watchFile('./c.txt', (curr, prev) => {
	console.log(curr);
	console.log(prev);
	process.exit();
});*/

http.get('http://mongoosejs.com/docs/guide.html', (res) => {
	// console.log(res);
	let statusCode = res.statusCode;
	let error = null;
	if (statusCode !== 200 || statusCode !== '200') {
		error = new Error('请求失败\n' + `状态码:${statusCode}`);
	}
	let resData = '';
	res.on('data', (chunk) => {
		resData += chunk;
	}).on('end', () => {
		//console.log(resData);
		fs.stat('./b.html', (err, stats) => {
			if (err) {
				console.log(`error:${err}`);
				return null;
			}
			/*fs.writeFile('./b.html', resData, (err) => {
				if (err) {
					console.log(`error:${err}`);
					return null;
				} else {
					console.log('写入文件成功');
				}
			})*/
		});
	}).on('error', (err) => {
		console.log(`${err.message}`);
	});
})

