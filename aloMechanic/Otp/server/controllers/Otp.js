import { sequelize } from '../../config/sequelize';

const db = require('../../config/sequelize');
const env = require('../../config/env/development')
const validation =require("../../config/validation")
const otpRecord = db.otpRecord;
var Kavenegar = require('kavenegar');
var kavenegar = Kavenegar.KavenegarApi({apikey: env.KaveNegarAPI});

let ref_validation = new validation.validation();

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
                var  main=ref_validation.validatephonenumber(call.request.mobileNo)
                if(main)
                {
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

                }
                else{

                    callback(new Error ("unvalid mobile number"))
        
        
                        
                    }
         
            });
        })
    }


    validateCode(call , callback) {
        var  main=ref_validation.validatephonenumber(call.request.mobileNo)

        if(main)
        {
        otpRecord.findAll({where: {mobileNo: call.request.mobileNo}}).then(record => {

            var second=0;
            var number=0;
            for (var i = 0; i < record.length; i++) { 

                        if(second < record[i].created_at.getTime()/1000)
                        {
                            second=record[i].created_at.getTime()/1000;
                            number=i;
                        }

                console.log("omid",second,"    //",number);   
              
            }
                console.log(number,record[number]);

            if(record[number] && record[number].isUsed == false){
                        console.log("tainja");
                        console.log(record[number].code);
                if(record[number].code == call.request.code && record[number].expirationDate >= new Date()){
                    record[number].isUsed = true ;
                    record[number].save() ;
                    console.log('/////////////////////////',number);
                    console.log('omiddddddddddddddddd',record[number].code );
                    console.log(record[number].isUsed);
                    callback(null ,{status:"ok"})
                }
                else {

                    callback(new Error ("wrong code") ,{status:"wrong code"})
                }
            }
            else  {
                callback(new Error ("wrong  mobile number  // or used number"),{status:"invalid mobile"})
            }
        }).catch(


            function(err)
            {
                console.log(err);
                callback(err)

            }
        )
    }else{
        
        callback(new Error ("unvalid mobile number"))
        

    }
}
}

export default OtpAppHandler;


