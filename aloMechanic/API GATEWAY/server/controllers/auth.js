import jwt from 'jsonwebtoken';
import config from '../../config/env';
const secret = config.jwtSecret;

function generateOtpToken(req, res, next) {
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

function generateLoginToken(req, res, next) {
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
                if(decoded.id == req.query.customerId) {
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
