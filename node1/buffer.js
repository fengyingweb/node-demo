/**
 * Created by huangjun on 2017/7/14.
 */

 let b = require('./path');
   console.log(b);
  console.log(b.name);
  b.fn();
  
  const buf = Buffer.from('wulv');
  console.log(buf);
  
  console.log(buf.toString('hex'));
  console.log(buf.toString('base64'));
  console.log(buf.toString('utf8'));
