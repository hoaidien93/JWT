var model;
const jwt = require('jsonwebtoken');

class LoginController{
    constructor(){
        var Model = require("../Model/model");
        model = new Model();
    }

    async postRegister(req,res){
        
        let username = req.body.username || "username";
        let password = req.body.password || "123456";
        let name = req.body.name || "MyName"
        res.setHeader('Content-Type', 'application/json');
        if(!await model.isExistsUser(username) && await model.createNewUser(username,password,name)){
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
        let username = req.body.username || "";
        let password = req.body.password || "";
        res.setHeader('Content-Type', 'application/json');
        let user = await model.isLoginSuccess(username,password)
        if(user){
            res.statusCode = 200;
            const token = jwt.sign({
                username: username,
                name : user.name
              }, 'hoaidienPA', { expiresIn: '1h' });
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
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        return res.send(req.dataUsers);
        
    }
}

module.exports = new LoginController();