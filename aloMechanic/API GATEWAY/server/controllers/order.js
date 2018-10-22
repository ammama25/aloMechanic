const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.ORDER_SERVER_ADDRESS;
const protoAddress = './server/protos/order.proto';
const grpc = require('grpc');

function register(req, res, next) {
    var message = {
        'customerId'      : req.body.customerId ,
        'customerVehicle' : req.body.customerVehicle ,
        'promotion'       : req.body.promotion ,
        'scheduling'      : req.body.scheduling ,
        'address'         : req.body.address ,
        'orderItems'      : req.body.orderItems
    }
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.order_app_package.orderApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.placeOrder(message , function(err , result){
            if(err){
                res.json(err)
            }
            else{
                res.json(result)
            }
        })
    })
}


export default { register };