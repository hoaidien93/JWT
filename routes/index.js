var express = require('express');
var router = express.Router();
let loginController = require("../Controller/LoginController");

var verifyToken = require("../passport");

/* GET home page. */
router.post('/user/login', loginController.postLogin);
router.post('/user/register', loginController.postRegister);
router.post("/me",verifyToken,loginController.getUserInfo);
module.exports = router;
