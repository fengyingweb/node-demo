const sql = require('./mysql.js');
let selectNavOne = 'SELECT * FROM nav Where level = 1', // 查询一级导航
        selectNavTow = 'SELECT * FROM nav Where navId = ? and level = 2'; // 查询二级导航
	let fn = function (item) {
	  	    return new Promise( (resolve, reject) => {
	  		    sql(selectNavTow, [item.navId], (err, dataTow) => {
	  		        if (err) {
	  		           	console.log('error:' + err);
	  		           	return;
	  		        }
	  			    item.children = dataTow;
	  			    resolve();
	  		    });
	  	    });
	    };
  
    // 查询导航数据
module.exports = function (callback) {
	sql(selectNavOne, (err, dataOne) => {
        if (err) {
  		    console.log('error:' + err);
  		    return;
  		}
		let arr = [];
		dataOne.forEach((item, index) => {
			arr[index] = fn(item);
		});
		// console.log(arr);
		Promise.all(arr).then(() => {
			// console.log(dataOne);
			callback(dataOne);
		});
	});
}

