const env = require('../../config/env/development')
const grpcSetup = require('../../config/grpc')
const db = require('../../config/sequelize');
var   sequelize = db.sequelize ;
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
                console.log(err);
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
        client.getCustomer({mobileNo: req.body.mobileNo , password: req.body.password
         }, function (err , customer) {
            console.log(customer);
            console.log(err);
            if(err){
                console.log(err);
                next(err)
            }
            else {
                req.body.id = customer.id
                console.log(customer);
                next()
            }
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
            },
            function (err , customer) {
                if(err){
                    next(err)
                }
                else{
                    return res.json(customer)
                }  
            }
        )
    });
}

function remove(req, res ,next) {
    grpcSetup(protoAddress ,function(Package){
         const Client = Package.customer_app_package.CustomerApp;
         const client = new Client(bindPath, grpc.credentials.createInsecure());
         client.deleteCustomer({mobileNo: req.body.mobileNo } , function (err , err_status) {
             console.log(err);
             res.json(err_status)
         })
    });
}

function registerAddress(req,res,next) {
    grpcSetup(protoAddress ,function(Package){
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.registerAddress({
            customerId: req.body.customerId,
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
        client.updateAddress({
            id: req.body.id ,
            customerId: req.body.customerId,
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

function getAllAddresses(req, res ,next) {
    sequelize.query("SELECT Customer.firstname , Customer.lastname , " +
        " City.name as city, Dist.name as district, Address.address" +
        " FROM dbo.customers Customer " +
        " JOIN dbo.customerAddresses Address" +
        " ON Customer.id = Address.customerId and Customer.id = :cid "+
        " JOIN dbo.districts Dist ON Dist.id = Address.districtId " +
        " JOIN dbo.cities City ON City.id = Dist.cityId " ,
        { replacements: {cid : req.query.customerId}, type: sequelize.QueryTypes.SELECT })
        .then(customerAddress => {
            console.log(customerAddress)
            res.json(customerAddress)
        })
        .catch(

            function(err) {
                console.log(err)
                next(err);
            }
        )
}

function isRegisterd(req, res, next){
     sequelize.query("SELECT * FROM customers " +
        " WHERE mobileNo = :mobileNo and is_active = 1 " ,
        { replacements: {mobileNo : req.body.mobileNo}, type: sequelize.QueryTypes.SELECT })
        .then(customer => {
            if(customer[0])
                res.json(true)
            else
                res.json(false)
        })
        .catch(
            function(err) {
                console.log(err)
                next(err);
            }
        )    
}

export default{register ,update ,remove ,login ,registerAddress ,updateAddress ,getAllAddresses ,isRegisterd};