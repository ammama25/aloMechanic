const db = require('../../config/sequelize');
const env = require('../../config/env/development')
const otpRecord = db.otpRecord;
var Kavenegar = require('kavenegar');
var kavenegar = Kavenegar.KavenegarApi({apikey: env.KaveNegarAPI});


function setExpireTime(minute) {
    var currentTime = new Date();
    return new Date(currentTime.getTime() + minute*60000);
}

function createCode() {
    return Math.floor(Math.random() * (99999 - 10000) + 10000);
}

function assignCode(phoneNumber , callback) {
    callback(createCode() , null)
    // otpRecord.findOne({where: {mobileNo: phoneNumber}}).then(record => {
    //     if(record){
    //         if (record.isUsed == true){
    //             callback(null,null, "error: customer is activated");
    //         }
    //         else{
    //             callback(createCode() , null);
    //         }
    //     }
    //     else  {
    //         callback(createCode() , null)
    //     }
    // } , (e) => {callback(null, e)})
}

function sendSMS(phoneNumber, code,callback) {

    var sms  = "your code is : " + code ;
    console.log("-----------------------------------------------")
    console.log(code)
    console.log("-----------------------------------------------")
    if(code==null){
        callback("code is used");
    }
    else{
        kavenegar.Send({
            message: sms,
            sender: "100065995",
            receptor: phoneNumber.toString()
        } , function(response, status) {
            console.log(response);
            console.log(status);
            callback(status);
        });
    }
}

function addRecord(phoneNumber , code , callback) {
    otpRecord.create({
        mobileNo: phoneNumber ,
        code: code ,
        expirationDate: setExpireTime(10) ,
        isUsed: false
    })
        .then((savedUser) => {
            console.log(savedUser);
            callback(200 , null) ;
        }, (e) => callback(500 , (e)))
}


class OtpAppHandler {

    sendRequest(call ,callback) {
        assignCode(call.request.mobileNo ,function (code) {
            sendSMS(call.request.mobileNo ,code , function(status){
                if(status==200) {
                    addRecord(call.request.mobileNo , code , function (result , error) {
                        if(!error){
                            callback(null ,{status:"sent"})
                        }
                        else
                            callback(error ,{status:"sent"})
                    })
                    callback(null ,{status:"sent"})
                }
                else {
                    callback(null ,{status:"sms not sent"})
                }
            });
        })
    }

    validateCode(call , callback) {
        otpRecord.findOne({where: {mobileNo: call.request.mobileNo , isUsed:false} }).then(record => {
            if(record){
                if(record.code == call.request.code && record.expirationDate >= new Date()){
                    record.isUsed = true ;
                    record.save() ;
                    console.log(record.code );
                    console.log(record.isUsed);
                    callback(null ,{status:"ok"})
                }
                else {
                    callback(null ,{status:"bad"})
                }
            }
            else  {
                callback(null ,{status:"bad"})
            }
        })
    }
}

export default OtpAppHandler;


