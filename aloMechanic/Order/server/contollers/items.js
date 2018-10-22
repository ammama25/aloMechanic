const env                    = require('../../config/env/development')
const grpcSetup              = require('../../config/grpc')
const productServiceBindPath = env.PRODUCTANDSERVICE_SERVER_ADDRESS;
const productandservice      = './server/protos/productandservice.proto';
const grpc                   = require('grpc');

function get(obj , callback) {
    grpcSetup(productandservice ,function(Package){
        const Client = Package.productandservice_app_package.productandservice;
        const client = new Client(productServiceBindPath, grpc.credentials.createInsecure());
        var items = obj.orderItems;

        client.getPricedItems({items} , function (err , pricedItems) {
            if(err){
                callback(err , null)
            }
            else {
                callback(null , pricedItems.responseItems)
            }
        })
    });
}

function generate(orderItems, orderId) {
    var result = orderItems
    for(var i=0;i<result.length;i++){
        result[i].orderId = orderId
    }
    return result
}

export default {get, generate}