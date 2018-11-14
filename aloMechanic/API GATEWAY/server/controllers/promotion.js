const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.PROMOTION_SERVER_ADDRESS;
const promotion = './server/protos/promotion.proto';
const grpc = require('grpc');

function getpromotion(req,res,next) {
    grpcSetup(promotion ,function(Package){
        const Client = Package.promotion_app_package.promotion;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.getDiscount({
            customerId: req.body.customerId,
            productId: req.body.productId ,
            serviceId: req.body.serviceId ,
            categoryId: req.body.categoryId
           } , function (err , promotion) {
            if(err){
                next(err)
            }
            else {
                return res.json(promotion);
            }
        })
    });
}




export default{ getpromotion };