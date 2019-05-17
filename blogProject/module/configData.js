const app = require('../app.js');
const nav = require('./nav');
const sql = require('./mysql');

app.use(function (req, res, next){
      /*if (typeof req.session.navList === 'undefined') {
          nav(data => {
          	req.session.navList = data;
          	res.locals.navData = req.session.navList
          	// console.log(res.locals.navData);
          	next();
          });
      } else {
      	next();
      }*/
     
     nav(data => {
      res.locals.navData = data;
      // console.log(res.locals.navData);
      next();
    });
  });
  
app.use((req, res, next) => {
	if(req.cookies.login) {
		res.locals.login = req.cookies.login.name;
		// console.log(res.locals.login);
	}
	
	if (res.locals.login && typeof req.session.admin === 'undefined') {
		let sel = 'SELECT * FROM user Where username = ?';
		sql(sel, [res.locals.login], (err, data) => {
			if (err) {
				console.log(`error:${err}`);
				return null;
			}
			if (data.length) {
				req.session.admin = Number(data[0].admin);
			}
			next();
		})
	} else {
		next();
	}
	
});
