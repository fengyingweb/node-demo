const sql = require('./mysql');
let selNavOne = 'SELECT * From nav Where level=1',
    selNavTow = 'SELECT * From nav Where navID=? and level=2',
    fn = function (item) {
    	return new Promise((resolve, reject) => {
    		sql(selNavTow, [item.navID], (err, dataTow) => {
    			if (err) {
			    	console.log(`error:${err}`);
			    	return null;
			    }
    			item.children = dataTow;
    			resolve();
    		});
    	});
    };
    
module.exports = function (callback) {
	sql(selNavOne, (err, dataOne) => {
    	if (err) {
    		console.log(`error:${err}`);
    		return null;
    	}
    	
    	if (dataOne && dataOne.length) {
    		let arr = [];
    		dataOne.forEach((item, index) => {
    			arr[index] = fn(item);
    		});
    		Promise.all(arr).then(() => {
    			callback && callback(dataOne);
    		});
    	} else {
    		return null;
    	}
    });
}
    
