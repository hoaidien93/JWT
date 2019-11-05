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
            let userInfo = {
                username: user.username,
                name: user.name,
                avatar: user.avatar || "default.png",
                gender: user.gender || "",
                dateOfBirth : user.dateOfBirth
            }
            res.statusCode = 200;
            const token = jwt.sign({
                username: username,
                name : user.name
              }, 'hoaidienPA', { expiresIn: '1h' });
            return res.send({
                status: "Login Success",
                username: username,
                userInfo: userInfo,
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

    async updateUserInfo(req,res){
        let username = req.dataUsers.username; 
        let result = await model.updateUserInfo(username,req.body);
        res.setHeader('Content-Type', 'application/json');
        if(result){
            res.statusCode = 200;
            return res.send({
                status: "Update user info succesfully!"
            });
        }
        res.statusCode = 500;
        return res.send({
            status: "Update user info failed!"
        });
    }

    async updateImage(req,res){
        res.setHeader('Content-Type', 'application/json');
        if(req.files.length > 0){
            let username = req.dataUsers.username;
            let path = "users-upload/"+req.files[0].filename;
            console.log(path);
            let result = await model.changeAvatar(username,path);
            if(result){
                res.statusCode = 200;
                return res.send({
                    status: "Update avatar succesfully!",
                    pathAvatar: path 
                });
            }
        }
        res.statusCode = 500;
        return res.send({
            status: "Change avatar failed"
        });
    }
}

module.exports = new LoginController();