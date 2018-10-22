const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath =env.TRANSPORTATION_SERVER_ADDRESS;
const transportation = './server/protos/transportation.proto';
const grpc = require('grpc');

function getgrassAmount(req,res,next) {

    console.log("tainja");
    grpcSetup(transportation ,function(Package){
        const Client = Package.grassAmount_app_package.grassAmount;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.get_grassAmount({
            productId: req.body.productId ,
            serviceId: req.body.serviceId ,
            categoryId: req.body.categoryId  
           }, function (err ,_grassAmount){
            if(err){
               coso.log("error");
            }
            else {
                console.log(_grassAmount.status);
                return res.json(_grassAmount.status);
            }
        })
    });
}




export default{ getgrassAmount };