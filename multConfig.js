var multer  = require('multer');
var path = require('path');

var upload = multer({ 
  //  dest: 'uploads/'
  filename : function(req, file, cb){
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

//var multer = ({storage : store}.single('avatar'));


module.exports = upload;