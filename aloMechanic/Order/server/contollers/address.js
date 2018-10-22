const env                    = require('../../config/env/development')
const grpcSetup              = require('../../config/grpc')
const customerBindPath       = env.CUSTOMER_SERVER_ADDRESS;
const customerAddr           = './server/protos/Customer.proto';
const grpc                   = require('grpc');


function get(obj, callback) {
    grpcSetup(customerAddr ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(customerBindPath, grpc.credentials.createInsecure());
        client.getAddress({
            addressId: obj.address
        } , function (err , address) {
            if(!err){
                callback(null , {
                    districtId : address.districtId ,
                    address    : address.address ,
                    location   : address.location
                } )
            }
            else
                callback(err , null)
        })
    });
}

function generate(address , orderId) {
    return{
        orderId    : orderId ,
        districtId : address.districtId ,
        address    : address.address ,
        location   : address.location
    }
}

export default {get , generate}