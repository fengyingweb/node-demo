const uuid = function (len=16) {
	let charArr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	let uuids = [], 
	    charLen = charArr.length,
	    num = 0,
	    i;
	
	for (i= 0; i < len; i++) {
		num = Math.floor(Math.random() * charLen);
		uuids[i] = charArr[num];
	}
	return uuids.join(',');
};

module.exports = {
	uuid,
}
