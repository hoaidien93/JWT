var express = require('express');
var router = express.Router();
let loginController = require("../Controller/LoginController");

const passport = require('passport');

/* GET home page. */
router.get('/user/login', loginController.postLogin);
router.get('/user/register', loginController.postRegister);
router.get("/me",passport.authenticate('jwt', { session: false }),loginController.getUserInfo);
module.exports = router;
