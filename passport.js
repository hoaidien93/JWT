var passport = require('passport');
var passportJWT = require('passport-jwt');
var jwt = require('jsonwebtoken');
const secretOrKey = 'hoaidienPA';

const ExtractJWT = passportJWT.ExtractJwt;

verifyToken = function(req,res,next){
    let authorization = req.headers.authorization || "";
    authorization = authorization.split(" ");
    let jwtFromRequest = authorization[1];
    jwt.verify(jwtFromRequest,secretOrKey,function(err,data){
        if(err){
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            return res.send({
                status: "Invalid username or password"
            });
        }
        console.log(data);
        req.dataUsers = data;
        next();
    })
}
module.exports = verifyToken;