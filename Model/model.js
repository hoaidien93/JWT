var dbo;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hoaidien:hoaidien0510@ds135068.mlab.com:35068/jwt_token";

class Model {
    constructor() {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err;
            console.log('ok');
            dbo = db.db("jwt_token");
        });
    }

    async createNewUser(username, password, name) {
        var user = { username: username, password: password, name: name, createdAt: Date.now() };
        let res = await dbo.collection("users").insertOne(user);
        if (res) {
            return true;
        }
        return false;

    }

    async isExistsUser(username) {
        let query = { username: username };
        let res = await dbo.collection("users").findOne(query);
        return res;
    }

    async isLoginSuccess(username, password) {
        var query = { username: username, password: password };
        let res = await dbo.collection("users").findOne(query);

        return res;
    }

    async updateUserInfo(username, userInfo) {
        let newValues = {
            $set: {
                name: userInfo.name || "",
                gender: userInfo.gender || "",
                dateOfBirth: userInfo.dateOfBirth || ""
            }
        };
        console.log(newValues);
        console.log(username);
        let result = await dbo.collection("users").updateOne({ username: username }, newValues);

        return result;
    }

    async changeAvatar(username,pathImg){
        let newValues = {
            $set: {
                avatar: pathImg
            }
        };
        let result = await dbo.collection("users").updateOne({ username: username }, newValues);

        return result
    }
}

module.exports = Model;