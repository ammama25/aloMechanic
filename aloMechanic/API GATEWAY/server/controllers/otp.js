const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.OTP_SERVER_ADDRESS;
const protoAddress = './server/protos/Otp.proto';
const grpc = require('grpc');

function request(req, res, next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.otp_app_package.OtpApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.sendRequest({mobileNo: req.body.mobileNo} , function(err , result){
            if(err){
                res.json(err)
            }
            else{
                res.json(result)
            }
        })
    })
}

function validate(req, res, next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.otp_app_package.OtpApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.validateCode({mobileNo: req.body.mobileNo , code: req.body.code} , function(err , result){
            if(err){
                req.validate = err ;
            }
            else{
                if(result.status == "ok"){
                    req.validate = result.status ;
                    next()
                }
                else {
                    res.json(result.status)
                }
            }
        })
    })
}

export default { request , validate};