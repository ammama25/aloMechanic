
const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const db = require('../../config/sequelize');
var sequelize = db.sequelize ;
const bindPath = env.VEHICLE_SERVER_ADDRESSS;
const protovehicle = './server/protos/Vehicle.proto';
const grpc = require('grpc');
const auth = require("./auth");
const validation =require("../../config/validation");

// var refvalidation=new validation.validation();



function null_chekker(req) {

    var bodyItems = req.body.items;

            for(var i=0 ; i<req.body.length ; i++){

                console.log(bodyItems[i],"test");
                    if( bodyItems[i]==null)
                    {
                        
                        return false;
                        
                    }
                    
                    
             }
                
             return true;
   }


function registerCustomerVehicle(req,res,next) {




        var test = null_chekker(req);
        console.log(test,"test");
        if(test)
        {
          
            grpcSetup(protovehicle ,function(Package){
                const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
                const client = new Client(bindPath, grpc.credentials.createInsecure());
                if ( req.body.customerId  || req.body.vehicleId  ||  req.body.plateNo) { 
                        client.createCustomerVehicle({
                            vehicleId: req.body.vehicleId,
                            customerId: req.body.customerId,
                            plateNo: req.body.plateNo ,
                            year: req.body.year,
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
                        
                }
                else{
        
        
                    next (new error("fill all fields"))
                }
        
        
            });



        }
        else{
                Console.log("error");


        }
    
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

                if(err)
                {

                    next(err);
                }
                else{

                    console.log(customervehicle);
                    res.json(customervehicle)


                }
           
        })
    });
}

function remove(req, res ,next) {
    grpcSetup(protovehicle ,function(Package){
         const Client = Package.CustomerVehicle_app_package.CustomerVehicleApp;
         const client = new Client(bindPath, grpc.credentials.createInsecure());
         client.deleteCustomerVehicle({customerId:req.body.customerId } , function (err , status) {     
            if(err)
            {

                next(err);
            }
            else{

               
                res.json(status)


            }
             
         })
    });
}

function getCustomerVehicle(req, res ,next)
{
    sequelize.query("SELECT  Customer.firstname ,Customer.lastname,brand.name ," +
        " Customervehicle.plateNo,Customervehicle.color,Customervehicle.mileage,model.name " +
        " FROM CustomerVehicles Customervehicle" +
        " JOIN customers Customer "+
        " ON Customer.id = Customervehicle.customerId and Customer.id = :cid "+
        " JOIN vehicles vehicle ON vehicle.id = Customervehicle.vehicleId     " +
        " JOIN models model ON model.id = vehicle.modelId " +
        " JOIN brands brand ON brand.id = vehicle.brandId " ,
        {replacements: {cid : req.query.customerId},type: sequelize.QueryTypes.SELECT })
        .then(Customervehicle => {
            console.log(Customervehicle)
            res.json(Customervehicle)
        }).catch(

            function(err)
            {
                    console.log*(err);
                next (err)

            }


        )


}


function getallvehicle(req,res,next)
{
    sequelize.query("SELECT model.name ,brand.name , " +
    " vehicle.type as type, vehicle.year as year  " +
    " FROM dbo.vehicles vehicle " +
    " JOIN dbo.models model ON model.id = vehicle.modelId " +
    " JOIN dbo.brands brand ON brand.id = vehicle.brandId " ,
    {type: sequelize.QueryTypes.SELECT })
    .then(vehicle => {
        console.log(vehicle)
        res.json(vehicle)
    }).catch(

        function(err)
        {
                console.log*(err);
            next (err)

        }


    )


}

export default{registerCustomerVehicle ,update ,remove ,getCustomerVehicle,getallvehicle};