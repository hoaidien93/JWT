var model;
const jwt = require('jsonwebtoken');

class LoginController{
    constructor(){
        var Model = require("../Model/model");
        model = new Model();
    }

    async postRegister(req,res){
        
        let username = "Hoaidien1";
        let password = "123456";
        res.setHeader('Content-Type', 'application/json');
        if(!await model.isExistsUser(username) && await model.createNewUser(username,password)){
            res.statusCode = 200;
            return res.send({
                status: "Create User Successful",
                username: username
            });
        }
        res.statusCode = 500;
        return res.send({
            status: "Create User Fail",
            Info: "Username is exists"
        });
    }

    async postLogin(req,res){
        let username = "Hoaidien1";
        let password = "123456";
        res.setHeader('Content-Type', 'application/json');
        let user = !await model.isLoginSuccess(username)
        if(user){
            res.statusCode = 200;
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.send({
                status: "Login Success",
                username: username,
                token: token
            });
        }
        res.statusCode = 500;
        return res.send({
            status: "Login fail",
            Info: "Username or password is incorrect"
        });
    }

    async getUserInfo(req,res){
        
        
    }
}

module.exports = new LoginController();