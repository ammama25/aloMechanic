import jwt from 'jsonwebtoken';
import config from '../../config/env';
import { isNull } from 'util';
const secret = config.jwtSecret;

function generateOtpToken(req, res, next) {


if(req.body.mobileNo){
    if (req.validate == "ok") {
        const jwtPayload = {

            mobileNo : req.body.mobileNo,
            recieveFrom : 'otp'
        };
        const jwtData = {
            expiresIn: config.jwtDuration,
        };
        const secret = config.jwtSecret;
        var token = jwt.sign(jwtPayload, secret, jwtData);
        res.json(token);
    }
    else {
        res.send(404)
    }

}
else{
        throw new error("validation error");

}
 
}

function generateLoginToken(req, res, next) {
    if(req.body.id)
    {

        const jwtPayload = {
            id : req.body.id ,
            mobileNo : req.body.mobileNo,
            email : req.body.email,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            recieveFrom : 'login'
        };
        const jwtData = {
            expiresIn: config.jwtDuration,
        };
    
        var token = jwt.sign(jwtPayload, secret, jwtData);
        res.json(token);

    }
    else{
        err= new Error("error");
        next(err) 
    }
   
}

function validateOtpToken(req , res , next) {
    jwt.verify(req.headers.token, secret, function(err, decoded) {
        if(!err){
            if (decoded.recieveFrom == 'otp') {
                if(decoded.mobileNo == req.body.mobileNo) {
                    req.valiadte = "ok"
                    return next()
                }
                else
                    res.send(401)
            }
            else
                res.send(401)
        }
        else {
            res.send(401)
        }
    });
}

function validateLoginToken(req , res , next) {
    jwt.verify(req.headers.token, secret, function(err, decoded) {
        if(!err){
            
            if (decoded.recieveFrom == 'login') {
                console.log("tainja");
                if(decoded.id == req.query.customerId || decoded.id == req.body.customerId) {
                    console.log("tainja");
                    req.valiadte = "ok"
                    return next()
                }
                else
                    res.send(401)
            }
            else {
                res.send(401)
            }
        }
        else {
            res.send(401)
        }
    });
}


export default {generateOtpToken , generateLoginToken , validateOtpToken , validateLoginToken};
