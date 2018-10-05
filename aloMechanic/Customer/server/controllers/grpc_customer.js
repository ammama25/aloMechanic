const db = require('../../config/sequelize');
const customer=db.customer;

function login_load(call , callback) {
    customer.findOne({where:{mobile:call.request.mobile}}).then(
        customer.findOne({where:{password:call.request.password}}).then(
            customers => {
                callback(customers)
            })
    )
}

function load(call , callback) {
    customer.findOne({where:{mobileNo:call.request.mobileNo}}).then(customers => {
        callback(customers)
     
    })
}

function grpcMaker(obj , status , cb ){
    var res = {
        id : obj.id ,
        mobileNo: obj.mobileNo ,
        firstname: obj.firstname ,
        lastname: obj.lastname ,
        password: obj.password ,
        email: obj.email 
    }
    cb(res)
}

class CustomerAppHandler {
    listCustomer(_, callback) {
        console.log("grpc success///");
        customer.findAll()
        .then(customers => {
            console.log({customers})
            callback(null , {customers});
        })
    }

    createCustomer(call ,callback) {
        console.log(call.request);
        customer.create({
            mobileNo: call.request.mobileNo.toString(),
            firstname: call.request.firstname,
            lastname: call.request.lastname,
            password: call.request.password,
            email:call.request.email
      })
        .then(
            (savedCustomer) => {
                grpcMaker(savedCustomer , "OK" , function (result) {
                callback(null , result)
                })
        })
        .catch(function(err) {
            console.log(err);
        });

    }


    getCustomer(call , callback) {
        console.log("login-time");
        login_load(call , function (customer) {
            if(customer){
                grpcMaker(customer , "OK" , function (result) {
                    console.log(result)
                    callback(null, result)
                })
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


        console.log(call)

        load(call , function (customer) {
            if(customer){  
                Object.assign(customer, call.request);
                customer.save() 
                    .then((savedCustomer) =>  grpcMaker(savedCustomer , "OK" , function (result) {
                        callback(null ,result)
                    }));
            }
            else {
                callback(null ,{status:"customer not found"})
            }

        })
    }
    
}

export default CustomerAppHandler;


