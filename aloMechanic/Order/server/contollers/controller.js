const address                = require('./address')
const order                  = require('./order')
const history                = require('./history')
const items                  = require('./items')
const finishCode             = require('./finishCode')
const db                     = require('../../config/sequelize');
const validation             = require("../../config/validation")
const finishCodeRecord       = db.finishCodeRecord;
const sequelize              = db.sequelize ;
const Order                  = db.order;
const OrderAddress           = db.orderAddress;
const OrderItems             = db.orderItem;
const OrderHistory           = db.orderHistory;

class orderAppHandler{

    placeOrder(call,callback) {

        items.get(call.request, function (itemsErr, pricedItems) { 
            if(!itemsErr){
                order.generate(call.request, pricedItems, function (orderErr, generatedOrder) {
                    if(!orderErr){
                        address.get(call.request, function (addressErr, dbAddress) {
                            if(!addressErr) {
                                return sequelize.transaction(function (t) {
                                    return Order.create(generatedOrder,
                                        {transaction: t}).then((function(dbOrder){
                                        return OrderAddress.create(address.generate(dbAddress, dbOrder.orderNo),
                                            {transaction: t}).then((function(dbOrderAddress){
                                            return OrderHistory.create(history.generate(dbOrder.orderNo),
                                                {transaction: t}).then((function(dbOrderHistory) {
                                                return OrderItems.bulkCreate(items.generate(pricedItems, dbOrder.orderNo),
                                                    {transaction: t}).then((function(dbOrderItem) {

                                                }))
                                            }))
                                        }))
                                    }))
                                }) .then(function (result) {
                                    callback(null, generatedOrder)
                                }).catch(function (err) {
                                    // console.log(err)
                                    callback(err , null)
                                });
                            }
                        })
                    }
                })
            }
        })
    }

    assignRepairman(call, callback){
        Order.find({ where: { id: call.request.orderId } })
            .on('success', function (order) {
            OrderHistory.find({ where: { orderId: call.request.orderId } })
                .on('success', function (orderHistory) {
                if (order && orderHistory.state == "10") {
                    return sequelize.transaction(function (t) {
                        return order.updateAttributes({
                            assignTo: call.request.repairmanId ,
                            scheduleDate: call.request.schduleData.date,
                            scheduleFrom: call.request.schduleData.from,
                            scheduleThrough: call.request.schduleData.through  
                        },{transaction: t}).then((function(dbOrder){
                            return orderHistory.updateAttributes({
                                state     : "20",
                                desc      : "waiting for repairman confirmation",
                                updatedBy : "admin"
                            },{transaction: t}).then((function(dbOrderHistory) {

                            }))
                        }))
                    }) .then(function (result) {
                        callback(null, {status:"Ok"})
                    }).catch(function (err) {
                        // console.log(err)
                        callback(err , {status:"err in assign repairman maybe id is wrong"})
                    });  
                }
            })
        })                
    }

    repairmanConfirmed(call, callback){
        OrderHistory.find({ where: { orderId: call.request.orderId } })
            .on('success', function (orderHistory) {
            if (orderHistory.state == "20") {
                orderHistory.updateAttributes({
                    state     : "30",
                    desc      : "waiting for handling",
                    updatedBy : "repairman"
                }).then(function (result) {
                    callback(null, {status:"Ok"})
                }).catch(function (err) {
                    callback(err , {status:"err in repairman Confirm maybe id is wrong"})
                });  
            }
        })
    }

    reapirmanRejected(call, callback){
        OrderHistory.find({ where: { orderId: call.request.orderId } })
            .on('success', function (orderHistory) {
            if (orderHistory.state == "20") {
                orderHistory.updateAttributes({
                    state     : "10",
                    desc      : "waiting for operator confirmation",
                    updatedBy : "repairman"
                }).then(function (result) {
                    callback(null, {status:"Ok"})
                }).catch(function (err) {
                    callback(err , {status:"err in repairman reject maybe id is wrong"})
                });  
            }
        })    
    }

    customerCanceled(call, callback){
        OrderHistory.find({ where: { orderId: call.request.orderId } })
            .on('success', function (orderHistory) {
            if (orderHistory.state == "10" || orderHistory.state == "20" || orderHistory.state == "30") {
                orderHistory.updateAttributes({
                    state     : "60",
                    desc      : "order canceled",
                    updatedBy : "customer"
                }).then(function (result) {
                    callback(null, {status:"Ok"})
                }).catch(function (err) {
                    callback(err , {status:"err in cancelling order maybe id is wrong"})
                });  
            }
        })           
    }

    orderCompliting(call, callback){
        finishCode.assign(call.request.mobileNo ,function (code) {
            finishCode.sendSMS(call.request.mobileNo ,code , function(status){
                var  main=ref_validation.validatephonenumber(call.request.mobileNo)
                if(main) {
                    if(status == 200) {
                        finishCode.addRecord(call.request.repairmanId , code , function (result , error) {
                            if(!error){
                                OrderHistory.find({ where: { orderId: call.request.orderId } })
                                    .on('success', function (orderHistory) {
                                    if (orderHistory.state == "30") {
                                        orderHistory.updateAttributes({
                                            state     : "40",
                                            desc      : "sending sms to customer",
                                            updatedBy : "customer"
                                        }).then(function (result) {
                                            callback(null, {status:"Ok"})
                                        }).catch(function (err) {
                                            callback(err , {status:"err in compliting order maybe id is wrong"})
                                        });  
                                    }
                                }) 
                                callback(null ,{status:"sent"})
                            }
                            else
                                callback(error ,{status:"sent"})
                        })
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

    orederCompleted(call, callback){
        finishCodeRecord.findAll({where: {repairmanId: call.request.repairmanId}}).then(record => {
            var second=0;
            var number=0;
            for (var i = 0; i < record.length; i++) { 
                if(second < record[i].created_at.getTime()/1000){
                    second=record[i].created_at.getTime()/1000;
                    number=i;
                }
            }
            if(record[number] && record[number].isUsed == false){
                if(record[number].code == call.request.code){
                    record[number].isUsed = true ;
                    record[number].save() ;
                     OrderHistory.find({ where: { orderId: call.request.orderId } })
                        .on('success', function (orderHistory) {
                        if (orderHistory.state == "40") {
                            orderHistory.updateAttributes({
                                state     : "50",
                                desc      : "order complited",
                                updatedBy : "repairman"
                            }).then(function (result) {
                                callback(null, {status:"Ok"})
                            }).catch(function (err) {
                                callback(err , {status:"err in order maybe id is wrong"})
                            });  
                        }
                    })
                }
                else {
                    callback(new Error ("wrong code") ,{status:"wrong code"})
                }
            }
            else  {
                callback(new Error ("wrong  repairmanId "),{status:"invalid repairmanId"})
            }
        }).catch(
            function(err){
                console.log(err);
                callback(err, null)
            }
        )
    }
}

export default orderAppHandler;