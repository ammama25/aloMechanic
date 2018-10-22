const env                    = require('../../config/env/development')
const grpcSetup              = require('../../config/grpc')
const address                = require('./address')
const promotionBindPath      = env.PROMOTION_SERVER_ADDRESS;
const promotion              = './server/protos/promotion.proto';
const transportationBindPath = env.TRANSPORTATION_SERVER_ADDRESS;
const transportation         = './server/protos/transportation.proto';
const productServiceBindPath = env.PRODUCTANDSERVICE_SERVER_ADDRESS;
const productandservice      = './server/protos/productandservice.proto';
const grpc                   = require('grpc');

// function getProductServicePrice(obj , callback) {
//     grpcSetup(productandservice ,function(Package){
//         const Client = Package.productandservice_app_package.productandservice;
//         const client = new Client(productServiceBindPath, grpc.credentials.createInsecure());
//         client.get_price({
//             customerId: obj.customerId,
//             productId: obj.productId ,
//             serviceId: obj.serviceId ,
//             categoryId: obj.categoryId
//         } , function (err , price) {
//             if(err){
//                 callback(err , null)
//             }
//             else {
//                 callback(null , price)
//             }
//         })
//     });
// }
//
// function orderItemGenerator(orderItems) {
//     for (var i=0 ; i<orderItems.length ;i++){
//         getProductServicePrice(orderItems[i] , function (err , price) {
//
//         })
//         console.log(orderItems[i])
//     }
// }
//
// function calcGrossAmount(orderItems) {
//     var temp = 0 ;
//     console.log(orderItems)
//     for (var i=0 ; i<orderItems.length ;i++){
//         temp = orderItems[i].totalPrice + temp
//         console.log(orderItems[i])
//     }
//     console.log(temp)
//     return temp
// }

function calcDiscount(call, callback) {
    grpcSetup(promotion ,function(Package){
        const Client = Package.promotion_app_package.promotion;
        const client = new Client(promotionBindPath, grpc.credentials.createInsecure());
        client.get_promotion({
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
        const Client = Package.grassAmount_app_package.grassAmount;
        const client = new Client(transportationBindPath, grpc.credentials.createInsecure());
        client.get_grassAmount({
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

function generate(obj, callback) {
    var grossAmount =  10000 //calcGrossAmount(obj.orderItems) ;
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
                        transportPrice  : transportPrice.status ,
                        totalPrice     : grossAmount + transportPrice.status - discount.amount ,
                        state           : "new"
                    })
                }
            })
        }
    })
}

export default {generate}
