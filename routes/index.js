var express = require('express');
var router = express.Router();
let loginController = require("../Controller/LoginController");
var multer = require('multer')
// upload file image
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/users-upload')
    },
    filename: function (req, file, cb) {
      console.log(file);
  
      cb(null, makeid(10)+ ".jpg");
    }
  })
  var upload = multer({
    storage: storage,
    limits: { 
      fileSizes: 10*1024*1024,
      fileSize: 2*1024*1024
    }
  });
  
var verifyToken = require("../passport");

/* GET home page. */
router.post('/user/login', loginController.postLogin);
router.post('/user/register', loginController.postRegister);
router.post("/me",verifyToken,loginController.getUserInfo);
router.post("/update-info",verifyToken,loginController.updateUserInfo);
router.post("/update-image",verifyToken,upload.any(),loginController.updateImage);
module.exports = router;
