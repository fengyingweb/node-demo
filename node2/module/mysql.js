/**
 * Created by huangjun on 2017/7/16.
 */

  const mysql = require('mysql');

  module.exports = function (sql, value, callback) {
      let config = mysql.createConnection({
          // 数据库访问地址
          host: "localhost",
          // 数据库用户名
          user: "root",
          // 密码
          password: "",
          // 数据库端口
          port: "3306",
          // 使用哪个数据库
          database: "node"
      });

      // 开始连接数据库
      config.connect();
      // 执行数据库操作
      // 插入数据格式：数据库代码， 插入的值， 回调函数
      config.query(sql, value, (err, data) => {
         callback && callback(err, data);
      });

      // 结束连接
      config.end();
  };
