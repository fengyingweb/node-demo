/**
 * Created by huangjun on 2017/7/22.
 */

  const mysql = require('mysql');

  module.exports = function (sql, value, callback) {
    let config = mysql.createConnection({
        // 联接主机名
        host: "localhost",
        // 用户名
        user: "root",
        // 密码:
        password: "",
        // 数据库端口
        port: "3306",
        // 数据库名
        database: "blog"
    });
    // 开始连接数据库
      config.connect();
    // 执行数据库操作
      config.query(sql, value, (err, data) => {
          callback && callback(err, data);
      });
    // 连接结束
      config.end();
  };