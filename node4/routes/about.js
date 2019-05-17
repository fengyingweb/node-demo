const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      markdown = require('markdown-js'),
      router = express.Router();

router.get('/', (req, res)=> {
    res.locals.admin = req.session.admin;
    fs.readFile(path.join(process.cwd(), 'README.md'), 'utf8', (err, data)=> {
        if (err) {
            data = '';
            console.log(err);
        }
        // console.log(data);
        let contentHtml = markdown.makeHtml(data);
        // console.log(contentHtml);
        res.render('about.ejs', {contentHtml});
    });
});


module.exports = router;