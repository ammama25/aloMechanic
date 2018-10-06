const Customer = require('../models/customer');
const db = require('../../config/sequelize');
const env = require('../../config/env/development')
const customer=db.customer;


function login_load(call , callback) {

    customer.findOne({where:{mobileNo:call.request.mobileNo}}).then( customers => {
        console.log(customers);
        if (!customers) {
            console.log("a");
            callback(null,err)
         
        } else if (!(customers.validPassword(call.request.password))) {
            console.log("b");
            callback(null,{status:"wrong password"})

            
        } else {
            console.log("c");
            callback(customers);
          
        }
    });

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
        customer.get

        console.log("ta inja");
        customer.create({
            mobileNo: call.request.mobileNo,
          firstname: call.request.firstname,
          lastname: call.request.lastname,
          password:call.request.password,
          email:call.request.email
      })
        .then(

            (savedCustomer) => {
        
                if(!savedCustomer)
                {
                    callback(null,{status:"customer sabt nashod"})
                }
                else{
                    grpcMaker(savedCustomer , "OK" , function (result) {
                        callback(null , result)
                })
            }
            })
    .catch(
        function(err) {
        // print the error details
        console.log("omid shams /////////////////////");
     
        callback(null,{status:"customer sabt nashod"})

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


