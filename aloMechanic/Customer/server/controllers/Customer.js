const db = require('../../config/sequelize');
const customer = db.customer;
const customerAddress = db.customerAddress;

function login_load(call , callback) {
    customer.findOne({where:{mobileNo:call.request.mobileNo}}).then( customers => {
        if (!customers) {
            callback(null,{status:"wrong password"})
        }
        else if (!(customers.validPassword(call.request.password))) {
            callback(null,{status:"wrong password"})
        }
        else {
            callback(null, customers);
        }
    });
}

function load(call , callback) {
    customer.findOne({where:{mobileNo:call.request.mobileNo}}).then(customers => {
        callback(customers)
    })
}

class CustomerAppHandler {

    listCustomer(_, callback) {
        customer.findAll()
        .then(customers => {
            console.log({customers})
            callback(null , {customers});
        })
    }

    createCustomer(call ,callback) {
        customer.create({
            mobileNo: call.request.mobileNo,
            firstname: call.request.firstname,
            lastname: call.request.lastname,
            password:call.request.password,
            email:call.request.email
        }).then((savedCustomer) => {
            if(!savedCustomer) {
                callback(null,{status:"customer sabt nashod"})
            }
            else{
                callback(null, savedCustomer)
            }
        }).catch(
        function(err) {
            console.log(err)
            callback(null,{status:"customer sabt nashod"})
        });
    }

    getCustomer(call , callback) {
        login_load(call , function (err ,customer) {
            if(customer){
                callback(null, customer)
            }
            else {
                callback(null ,{status:"customer not found"})
            }
        })
    }

    deleteCustomer(call , callback) {
        load(call , function (customer) {
            if(customer){
                customer.destroy()
                    .then(() => callback(null ,{status:"removed Successfuly"}))
                }
            else {
                callback(null ,{status:"customer not found"})
            }
        })
    }

    updateCustomer(call , callback) {
        load(call , function (customer) {
            if(customer){  
                Object.assign(customer, call.request);
                customer.save().then((savedCustomer) =>  callback(null, savedCustomer));
            }
            else {
                callback(null ,{status:"customer not found"})
            }
        })
    }

    registerAddress(call ,callback) {
        customerAddress.create({
            customerId: call.request.customerId,
            districtId: call.request.districtId,
            address: call.request.address,
            location: call.request.location
        }).then((savedAddress) => {
            callback(null, savedAddress)
        }).catch(function(err) {
            callback("address sabt nashod",null)
        });
    }

    updateAddress(call , callback) {
        load(call , function (address) {
            if(address){
                Object.assign(address, call.request);
                customerAddress.save()
                    .then((savedCustomer) =>  callback(null, savedCustomer));
            }
            else {
                callback("address peida nashod",null)
            }
        })
    }

    getAllAddresses(call , callback) {
        customerAddress.findAll({include: [{
            model: customer,
            where: {
                customerId:call.request.customerId
            }
        }]}).then(addresses => {
            callback(null , {addresses})
        })
    }
    
}

export default CustomerAppHandler;


