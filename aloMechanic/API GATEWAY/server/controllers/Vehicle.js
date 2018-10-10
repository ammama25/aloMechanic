const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.VEHICLE_SERVER_ADRESSS;
const protovehicle = './server/protos/Vehicle.proto';
const grpc = require('grpc');
const auth= require("./auth");


function registerCustomerVehicle(req,res,next) {
    grpcSetup(protovehicle ,function(Package){
        const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.createCustomerVehicle({
            vehicleId: req.body.vehicleId,
            customerId: req.body.customerId,
            plateNo: req.body.plateNo ,
            color: req.body.color ,
            mileage: req.body.mileage ,
           } , function (err , customervehicle) {
            if(err){
            console.log("ta inja");
               next(err)
            }
            else {
                console.log(customervehicle);
                return res.json(customervehicle);
            }
        })
    });
}


function getCustomerVehicle(req, res ,next)
{
    console.log("ta inja");
   
    grpcSetup(protovehicle ,function(Package){
        console.log("tainja");
        const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.getCustomerVehicle({customerId:req.customerId }, function (err , customervehicle) {
            console.log(customervehicle);
            return res.json(customervehicle)
        })
    });
}



function update(req, res ,next)
{
    grpcSetup(protovehicle ,function(Package){
        const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;  
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.updateCustomerVehicle({customerId: req.customerId ,request:req.body} , function (err , customervehicle) {
            res.json(customervehicle)
        })
    });
}

function remove(req, res ,next) {
    grpcSetup(protovehicle ,function(Package){
         const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
         const client = new Client(bindPath, grpc.credentials.createInsecure());
         client.deleteCustomerVehicle({customerId:req.customerId } , function (err , status) {
             res.json(status)
         })
    });
}

export default{registerCustomerVehicle ,update ,remove ,getCustomerVehicle};