const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.ADDRESS_SERVER_ADDRESS;
const protoAddress = './server/protos/Address.proto';
const grpc = require('grpc');

function register(req,res,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.address_app_package.AddressApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.registerAddress({
            customerId: req.params.customerId,
            districtId: req.body.districtId,
            address: req.body.address,
            location: req.body.location
        } , function (err , address) {
            if(err){
                next(err)
            }
            else {
                return res.json(address);
            }
        })
    });
}

function update(req, res ,next)
{
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.address_app_package.AddressApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.updateCustomer({
            customerId: req.params.customerId,
            districtId: req.body.districtId,
            address: req.body.address,
            location: req.body.location
        } , function (err , address) {
            res.json(address)
        })
    });
}

function getAll(req, res ,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.address_app_package.AddressApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.getAllAddresses({customerId: req.params.customerId } , function (err , addresses) {
            console.log(err)
            res.json(addresses)
        })
    });
}

export default{register ,update ,getAll };