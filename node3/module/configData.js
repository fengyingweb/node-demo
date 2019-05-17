const app = require('../app.js');
const sql = require('./mysql.js');
const nav = require('./nav.js');

app.use(function (req, res, next){
      let sel = 'SELECT * FROM user WHERE username=?';
      if (req.cookies.login) {
          res.locals.login = req.cookies.login.name;
      }
      // 关闭页面后，再重新打开页面时检测已登录的用户是否是管理员
      if (res.locals.login && typeof req.session.admin === 'undefined') {
          sql(sel,[res.locals.login], (err, data) => {
              if (data.length) {
                  req.session.admin = Number(data[0].admin);
              }
              next();
          });
      } else {
              next();
      }
  });
  
  app.use((req, res, next) => {
  	if (typeof req.session.navData === 'undefined') {
  		nav((dataOne) => {
  			req.session.navData = dataOne;
  			// console.log(req.session.navData);
  			next();
  		})
  	} else {
  		next();
  	}
  });
