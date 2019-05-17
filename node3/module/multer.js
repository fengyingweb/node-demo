/**
 * Created by huangjun on 2017/8/1.
 */

const path = require('path');
const multer = require('multer');
let storage = multer.diskStorage({
    // 设置上传文件的目录
    destination: path.join(process.cwd(), 'public/img'),
    // 重命名文件
    filename: function (req, file, cb) {
         // console.log(file);
        let filename = file.originalname.split('.');
        cb(null, `${Date.now()}.${filename[filename.length -1 ]}`);
    }
});

let fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
