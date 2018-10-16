const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.PRODUCTANDSERVICE_SERVER_ADDRESS;
const productandservice = './server/protos/productandservice.proto';
const grpc = require('grpc');

console.log("tainja");
function getprice(req,res,next) {
    console.log("tainja-2");
    grpcSetup(productandservice ,function(Package){
        const Client = Package.productandservice_app_package.productandservice;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.get_price({
            customerId: req.body.customerId,
            productId: req.body.productId ,
            serviceId: req.body.serviceId ,
            categoryId: req.body.categoryId  
           } , function (err , price) {
            if(err){
                next(err)
            }
            else {
                return res.json(price);
            }
        })
    });
}




export default{ getprice };