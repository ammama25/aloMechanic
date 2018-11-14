const db = require('../../config/sequelize');
const customer = db.customer;
const customerAddress = db.customerAddress;
const validation =require('../../config/validation');
 
let ref_validation = new validation.validation("mob-emial");


function login_load(call  ,callback) {
    customer.findOne({where:{mobileNo:call.request.mobileNo}}).then(customers => {
        if (!customers) {
            throw new Error("not found");
        }
        else if (!(customers.validPassword(call.request.password))) {
            throw new Error("wrong pass");
        }
        else {
            callback(null, customers);
        }
    })
    .catch(
        function(err) {
            callback(err,{err_status:"customer sabt nashod"})
        }
    );
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
            if(!customers){
                callback(new error("error"))
            }
            else{
                console.log({customers})
                callback(null , {customers});
            }   
        })
    }

    createCustomer(call ,callback) {
        var mail=ref_validation.validateEmail(call.request.email);
        var mobile=ref_validation.validatephonenumber(call.request.mobileNo);

        console.log(mail && mobile);
        if(mail && mobile )
        {

            customer.create({
                mobileNo: call.request.mobileNo,
                firstname: call.request.firstname,
                lastname: call.request.lastname,
                password:call.request.password,
                email:call.request.email
            }).then((savedCustomer) => {
                if(!savedCustomer) {

                   throw new error;
                }
                else{
                    callback(null, savedCustomer)
                }
            }).catch(
            function(err) {
                console.log(err)
                callback(err,{err_status:"customer sabt nashod"})
            });
        }
        else{
            callback(new Error("wrong  mobile or email format"));  
        }    
    }

    getCustomer(call , callback) {
        login_load(call , function (err ,customer) {
            if(customer){
                callback(err, customer)
            }
            else {
                callback(err ,{err_status:"customer not found"})
            }
        })
    }

    deleteCustomer(call , callback) {
        customer.findOne({where:{mobileNo:call.request.mobileNo}}).then(customers => {
            if(!customers){
                callback(null,{err_status:"customer not found"})
                console.log("not");
            }
            else {
                customers.destroy()
                .then(() => callback(null ,{err_status:"removed Successfuly"}))
                console.log("removed");
            }
        }).catch(
            function(err) {
                console.log(err)
                callback(err,{err_status:"customer remove nashod"})
            });
        
        }
          
    
    

    updateCustomer(call , callback) {
        load(call , function (customer) {
            if(customer){  
                console.log("update")
                Object.assign(customer, call.request);
                customer.save().then((savedCustomer) =>  callback(null, savedCustomer));
            }
            else {
                console.log("not found")
                callback(new Error("customer not found") ,{err_status:"customer not found"})
            }
        })
    }

    registerAddress(call ,callback) {
        customerAddress.create({
            customerId: call.request.customerId,
            districtId: call.request.districtId,
            address: call.request.address,
            location: call.request.location
        }).then((savedadress) => {
            if(!savedadress) {

               throw new error;
            }
            else{
                callback(null,savedadress)
            }
        }).catch(
        function(err) {
            console.log(err)
            callback(err,{err_status:"adress sabt nashod"})
        });
    }

    updateAddress(call , callback) {
        customerAddress.findOne({where:{id:call.request.id , customerId:call.request.customerId}}).then(address => {
            if(address){
                Object.assign(address, call.request);
                address.save()
                    .then((savedCustomer) =>  callback(null, savedCustomer));
            }
            else {

                callback(new Error("errornot update !"))

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

    getAddress(call , callback) {
        customerAddress.findOne({
                where: {
                    id:call.request.addressId
                }
            }).then(address => {
                if(address)
                {
                    console.log(address)
                    callback(null , address)

                }
                else{
                    callback(new Error("cant find the adress"))
                }
     
        })
    }
}

export default CustomerAppHandler;


