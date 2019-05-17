const readline = require('readline');
// console.log(process.stdout);
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let inputData = {
  menuTip: function () {
  	console.log('0:退出');
  	console.log('1:你好?');
  	console.log('2:你真?');
  },
  showMenu1: function () {
  	let list = ['美', '漂亮', '可爱', '贱', '纯真', '有才', '幽默'];
  	let num = Math.floor(Math.random()*list.length);
  	console.log(`你好${list[num]}`);
  },
  showMenu2: function () {
  	let list = ['帅', '高大', '麻烦', '愚蠢', '啰嗦', '磨叽', '的很烦'];
  	let num = Math.floor(Math.random()*list.length);
  	console.log(`你真${list[num]}`);
  }
};

inputData.menuTip();
rl.setPrompt("请输入>"); //设置提示符
rl.prompt();
/*rl.question('你认为 Node.js 中文网怎么样？', (answer) => {
	console.log(`多谢你的反馈：${answer}`);
	rl.close();
});*/

 // line事件
 rl.on('line', (line) => {
 	switch(line.trim()) {
 		case '0':
 		   rl.close();
 		   break;
 		case '1':
 		   inputData.showMenu1();
 		   break;
 		case '2':
 		   inputData.showMenu2();
 		   break;
 		default:
 		   console.log(`你输入的是:${line.trim()}`);
 		   break;
 	}
 	rl.prompt();
 }).on('close', () => {
 	console.log('再见');
 	process.exit(0);
 });

  //pause 暂停事件
  /*rl.on('pause', () => {
  	console.log('readline被暂停');
  })*/
