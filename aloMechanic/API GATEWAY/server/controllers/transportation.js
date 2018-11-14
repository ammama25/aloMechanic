const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath =env.TRANSPORTATION_SERVER_ADDRESS;
const transportation = './server/protos/transportation.proto';
const grpc = require('grpc');

function gettransportation(req,res,next) {

    grpcSetup(transportation ,function(Package){
        const Client = Package.transportation_app_package.transportation;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.gettransportation({
            productId: req.body.productId ,
            serviceId: req.body.serviceId ,
            categoryId: req.body.categoryId  
           }, function (err ,transportation){
            if(err){
               console.log(err);
            }
            else {
                console.log(transportation);
                return res.json(transportation);
            }
        })
    });
}




export default{ gettransportation };