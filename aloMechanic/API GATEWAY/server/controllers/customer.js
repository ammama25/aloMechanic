const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const db = require('../../config/sequelize');
var sequelize = db.sequelize ;
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

function login(req, res ,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.getCustomer({mobileNo: req.body.mobileNo , password: req.body.password }, function (err , customer) {
            if(customer){
                req.body.id = customer.id
                next()
            }
            else
                res.send("error in login")
        })
    });
}

function update(req, res ,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.updateCustomer({
            mobileNo: req.body.mobileNo,
            firstname: req.body.firstname ,
            lastname: req.body.lastname ,
            password: req.body.password ,
            email: req.body.email
            } ,
            function (err , customer) {
                res.json(customer)
            }
        )
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

function registerAddress(req,res,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.registerAddress({
            customerId: req.query.customerId,
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

function updateAddress(req, res ,next)
{
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.updateCustomer({
            customerId: req.query.customerId,
            districtId: req.body.districtId,
            address: req.body.address,
            location: req.body.location
        } , function (err , address) {
            res.json(address)
        })
    });
}

function getAllAddresses(req, res ,next) {
    // grpcSetup(protoAddress ,function(Package){
    //     const Client = Package.customer_app_package.CustomerApp;
    //     const client = new Client(bindPath, grpc.credentials.createInsecure());
    //     client.getAllAddresses({customerId: req.query.customerId } , function (err , addresses) {
    //         console.log(err)
    //         res.json(addresses)
    //     })
    // });
    sequelize.query("SELECT Customer.firstname , Customer.lastname , " +
        " City.name as city, Dist.name as district, Address.address" +
        " FROM dbo.customers Customer " +
        " JOIN dbo.customerAddresses Address" +
        " ON Customer.id = Address.customerId and Customer.id = :cid "+
        " JOIN dbo.districts Dist ON Dist.id = Address.districtId " +
        " JOIN dbo.cities City ON City.id = Dist.cityId " ,
        { replacements: {cid : req.query.customerId}, type: sequelize.QueryTypes.SELECT })
        .then(users => {
            console.log(users)
            res.json(users)
        })

}

export default{register ,update ,remove ,login ,registerAddress ,updateAddress ,getAllAddresses };