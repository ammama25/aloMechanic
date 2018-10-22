const env                    = require('../../config/env/development')
const grpcSetup              = require('../../config/grpc')
const promotionBindPath      = env.PROMOTION_SERVER_ADDRESS;
const promotion              = './server/protos/promotion.proto';
const transportationBindPath = env.TRANSPORTATION_SERVER_ADDRESS;
const transportation         = './server/protos/transportation.proto';
const grpc                   = require('grpc');

function calcGrossAmount(orderItems) {
    var temp = 0 ;
    console.log(orderItems)
    for (var i=0 ; i<orderItems.length ;i++){
        temp = parseInt(orderItems[i].totalPrice) + temp
        console.log(orderItems[i])
    }
    console.log(temp)
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
        const Client = Package.grossAmount_app_package.grossAmount;
        const client = new Client(transportationBindPath, grpc.credentials.createInsecure());
        client.getGrossAmount({
            productId: call.productId ,
            serviceId: call.serviceId ,
            categoryId: call.categoryId
        }, function (err ,_grassAmount){
            if(err){
                callback(err, null)
            }
            else {
                console.log(_grassAmount.status);
                callback(null, _grassAmount)
            }
        })
    });
}

function generate(obj, orderItems, callback) {
    var grossAmount =  calcGrossAmount(orderItems) ;
    console.log(obj)
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
                        state           : "new",
                        scheduleDate    : obj.scheduling.date ,
                        scheduleFrom    : obj.scheduling.from,
                        scheduleThrough : obj.scheduling.through
                    })
                }
            })
        }
    })
}

export default {generate}
