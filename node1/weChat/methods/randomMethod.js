const randMethod = {
	randomName: function (num = 5) {
		let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		let randNum = Math.floor(Math.random()*letters.length);
		let userName = '';
		
		if (num>0 && num < 20) {
			for (let i=0; i<=num; i++) {
				randNum = Math.floor(Math.random()*letters.length);
				userName += letters[randNum];
			}
		} else {
			userName = letters[randNum];
		}
		userName = 'chat_'+userName;
		return userName;
	},
	
	randomId: function (num = 15) {
		let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let id = '';
		if (num > 0) {
			for (let i=0; i<=num; i++) {
				let randL = Math.floor(Math.random()*letters.length);
				let randN = Math.floor(Math.random()*nums.length);
				id += nums[randN] + letters[randL];
			}
		} else {
			for (let i=0; i<=15; i++) {
				let randL = Math.floor(Math.random()*letters.length);
				let randN = Math.floor(Math.random()*nums.length);
				id += nums[randN] + letters[randL];
			}
		}
		
		return id;
	},
	
	randomPort: function () {
		let port = Math.floor(50000 + Math.random()*10001);
		return port;
	}
};

module.exports = randMethod;
