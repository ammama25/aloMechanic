

const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const db = require('../../config/sequelize');
var sequelize = db.sequelize ;
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
        client.updateCustomerVehicle(
            {
                customerId: req.body.customerId ,
                vehicleId:req.body.vehicleId,
                plateNo:req.body.plateNo,
                color:req.body.color,
                mileage:req.body.mileage,
            }

            , function (err , customervehicle) {
                console.log(customervehicle);
            res.json(customervehicle)
        })
    });
}

function remove(req, res ,next) {
    grpcSetup(protovehicle ,function(Package){
         const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
         const client = new Client(bindPath, grpc.credentials.createInsecure());
         client.deleteCustomerVehicle({customerId:req.body.customerId } , function (err , status) {
             res.json(status)
         })
    });
}




function getallvehicle(req,res,next)
{
    sequelize.query("SELECT mode , , " +
    " vehicle.type as type, vehicle.year as year  " +
    " FROM dbo.vehicles vehicle " +
    " JOIN dbo.models model ON model.id = vehicle.modelId " +
    " JOIN dbo.brands brand ON brand.id = vehicle.brandId " ,
    {type: sequelize.QueryTypes.SELECT })
    .then(vehicle => {
        console.log(vehicle)
        res.json(vehicle)
    })


}
function getall(req,res,next)
{
    sequelize.query("SELECT * FROM  dbo.vehicle,dbo.model,dbo.brand ",
    {type: sequelize.QueryTypes.SELECT })
    .then(vehicle => {
        console.log(vehicle)
        res.json(vehicle)
    })
    
}
function getallbrands_models(req,res,next)
{

    
}
export default{registerCustomerVehicle ,update ,remove ,getCustomerVehicle,getallbrands,getall,getallbrands_models,getallvehicle};