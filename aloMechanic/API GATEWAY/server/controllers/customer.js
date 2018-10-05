const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const bindPath = env.CUSTOMER_SERVER_ADDRESS;
const protoAddress = './server/protos/Customer.proto';
const grpc = require('grpc');

function register(req,res,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.createCustomer({
            mobileNo: req.body.mobileNo,
            firstname: req.body.firstname ,
            lastname: req.body.lastname ,
            password: req.body.password ,
            email: req.body.email  
           } , function (err , customer) {
            if(err){
                next(err)
            }
            else {
                return res.json(customer);
            }
        })
    });
}

function login(req, res ,next)
{
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.getCustomer({mobileNo: req.body.mobileNo , password: req.body.password }, function (err , customer) {
            console.log(customer);
            return res.json(customer)
        })
    });
}

function update(req, res ,next)
{
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.updateCustomer({mobileNo:  req.body.mobileNo ,firstname:req.body.firstname} , function (err , customer) {
            res.json(customer)
        })
    });
}

function remove(req, res ,next) {
    grpcSetup(protoAddress ,function(Package){
         const Client = Package.customer_app_package.CustomerApp;
         const client = new Client(bindPath, grpc.credentials.createInsecure());
         client.deleteCustomer({mobileNo: req.body.mobileNo } , function (err , status) {
             res.json(status)
         })
    });
}

export default{register ,update ,remove ,login };