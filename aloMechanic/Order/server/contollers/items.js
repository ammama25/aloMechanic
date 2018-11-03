const env                    = require('../../config/env/development')
const grpcSetup              = require('../../config/grpc')
const productServiceBindPath = env.PRODUCTANDSERVICE_SERVER_ADDRESS;
const vehicleBindPath        = env.VEHICLE_SERVER_ADDRESSS;
const productandservice      = './server/protos/productandservice.proto';
const vehicle                = './server/protos/Vehicle.proto';
const grpc                   = require('grpc');

function get(obj , callback) {
    grpcSetup(productandservice ,function(Package){
        const Client = Package.productandservice_app_package.productandservice;
        const productServiceClinet = new Client(productServiceBindPath, grpc.credentials.createInsecure());
        var items = obj.orderItems;
        
        grpcSetup(vehicle ,function(Package){
            const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
            const vehicleClient = new Client(vehicleBindPath, grpc.credentials.createInsecure());

            vehicleClient.getVehicle({CustomerVehicleId:obj.customerVehicle} , function (err , vehicle) {
                if(err){
                    callback(err , null)
                }
                else {
                    var vehicleId = vehicle.vehicleId
                    console.log(vehicle.id)
                    productServiceClinet.getPricedItems({items:items, vehicleId:vehicleId} , function (err , pricedItems) {
                        if(err){
                            callback(err , null)
                        }
                        else {
                            callback(null , pricedItems.responseItems)
                        }
                    })
                }
            })
        });
        
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