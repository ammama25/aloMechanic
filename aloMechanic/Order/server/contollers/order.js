const env                    = require('../../config/env/development')
const grpcSetup              = require('../../config/grpc')
const promotionBindPath      = env.PROMOTION_SERVER_ADDRESS;
const promotion              = './server/protos/promotion.proto';
const transportationBindPath = env.TRANSPORTATION_SERVER_ADDRESS;
const transportation         = './server/protos/transportation.proto';
const grpc                   = require('grpc');

function calcGrossAmount(orderItems) {
    var temp = 0 ;
    for (var i=0 ; i<orderItems.length ;i++){
        temp = parseInt(orderItems[i].totalPrice) + temp
    }
    return temp
}

function calcDiscount(call, callback) {
    grpcSetup(promotion ,function(Package){
        const Client = Package.promotion_app_package.promotion;
        const client = new Client(promotionBindPath, grpc.credentials.createInsecure());
        client.getDiscount({
            customerId: call.customerId,
            productId: call.productId ,
            serviceId: call.serviceId ,
            categoryId: call.categoryId
        } , function (err , discount) {
            if(err){
                callback(err, null)
            }
            else {
                callback(null, discount)
            }
        })
    });
}

function calcTransportPrice(call, callback) {
    grpcSetup(transportation ,function(Package){
        const Client = Package.transportation_app_package.transportation;
        const client = new Client(transportationBindPath, grpc.credentials.createInsecure());
        client.gettransportation({
            productId: call.productId ,
            serviceId: call.serviceId ,
            categoryId: call.categoryId
        }, function (err ,transportation){
            if(err){
                callback(err, null)
            }
            else {
                callback(null,transportation)
            }
        })
    });
}

function generate(obj, orderItems, callback) {
    var grossAmount =  calcGrossAmount(orderItems) ;
    calcTransportPrice(obj, function (err, transportPrice) {
        if(!err){
            calcDiscount(obj, function (err, discount) {
                if(!err){
                    callback(null, {
                        customerId      : obj.customerId ,
                        customerVehicle : obj.customerVehicle ,
                        paidAmount      : 0 ,
                        grossAmount     : grossAmount ,
                        discount        : discount.amount ,
                        transportPrice  : transportPrice.amount ,
                        totalPrice      : parseInt(grossAmount) + parseInt(transportPrice.amount) - parseInt(discount.amount) ,
                        state           : "10",
                        scheduleDate    : obj.scheduling.date ,
                        scheduleFrom    : obj.scheduling.from,
                        scheduleThrough : obj.scheduling.through
                    })
                }
            })
        }
    })
}

function update(){

}

export default {generate, update}