/**
 * Created by huangjun on 2017/7/14.
 */
//console.log(global);

// 当前文件的路径
console.log(__filename); // 返回\nodeProject\node1\path.js

// 当前文件的目录
console.log(__dirname); // 返回\nodeProject\node1

// process对象 node进程工作目录 根目录
console.log(process.cwd()); // 返回 \nodeProject\node1

// console.log(global);
// console.log(module);
// process.env.NODE_ENV = 'development';
// console.log(process.env.NODE_ENV);
/*process.on('beforeExit', (code) => {
	console.log(code);
});*/

  const path = require('path');
  const dir1 = path.join(__dirname, 'a');
  console.log(dir1); // 返回 \nodeProject\node1\a
  const dir2 = path.join(process.cwd(), 'b');
  console.log(dir2); // 返回 \nodeProject\node1\b
  
  const dir3 = path.resolve(__dirname, 'c');
  console.log(dir3); // 返回 \nodeProject\node1\c
  
  const dir4 = path.resolve('/foo', 'dir', 'bar');
  console.log(dir4); // 返回\foo\dir\bar
  
  const dir5 = path.resolve('/foo', 'dir', '/bar');
  console.log(dir5); //返回 \bar
  
  const dir6 = path.resolve('foo', 'dir');
  console.log(dir6); //返回 \nodeProject\node1\foo\dir

let a = {
    name: 'wulv',
    fn () {
        console.log(this.name);
    }
};

module.exports = a;