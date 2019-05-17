/**
 * Created by huangjun on 2017/7/15.
 */

  const express = require('express');
  const router = express.Router();

  // console.log(process.cwd());
  router.get('/', (req, res) => {
      res.sendFile(process.cwd() + '/views/about.html');
  });

  module.exports = router;