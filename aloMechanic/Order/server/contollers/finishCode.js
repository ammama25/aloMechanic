const db = require('../../config/sequelize');
const env = require('../../config/env/development')
const finishCodeRecord = db.finishCodeRecord;
var Kavenegar = require('kavenegar');
var kavenegar = Kavenegar.KavenegarApi({apikey: env.KaveNegarAPI});

function createCode() {
    return Math.floor(Math.random() * (99999 - 10000) + 10000);
}

function sendSMS(phoneNumber, code,callback) {

    var sms  = "finish code is : " + code ;
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

function addRecord(repairmanId , code , callback) {
    
    finishCodeRecord.create({
        repairmanId: repairmanId ,
        code: code ,
        isUsed: false
    })
        .then((saved) => {
            console.log(saved);
            callback(200 , null) ;
        }, (e) => callback(500 , (e)))
}

function assign(phoneNumber , callback) {
    callback(createCode() , null)
}