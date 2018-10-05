const db = require('../../config/sequelize');
const customer = db.customer;



function login_load(call , callback) {

    customer.findOne({where:{mobileNo:call.request.mobileNo} && { password:call.request.password} }).then(customers => {
        callback(customers)
     
    })

}


function load(call , callback) {

    customer.findOne({where:{mobileNo:call.request.mobileNo}}).then(users => {
        callback(users)
     
    })

}


function grpcMaker(obj , status , cb ){
    var res = {
        id : obj.id ,
        mobileNo: obj.mobileNo ,
        firstname: obj.firstname ,
        lastname: obj.lastname ,
        password: obj.password ,
        email: obj.email ,
        is_active: obj.is_active
    }
    cb(res)
}

class CustomerAppHandler {
    
    listCustomers(_, callback) {
        console.log("grpc success///");
        customer.findAll()
        .then(users => {
            callback(null , {users});
        })
    }

    createCustomer(call ,callback) {
        customer.create({
            mobileNo: call.request.mobileNo.toString(),
            firstname: call.request.firstname,
            lastname: call.request.lastname,
            password: call.request.password,
            email:call.request.email ,
            is_active : true
      }).then(
            (savedCustomer) => {
                grpcMaker(savedCustomer , "ok" , function (result) {
                    console.log(result)
                    return callback(null , result)
                })
            }
        )

    }


    getUser(call , callback) {

        login_load(call , function (user) {
            if(user){
                grpcMaker(user , "OK" , function (result) {
                    console.log(result)
                    callback(null, result)
                })
            }
            else {
                callback(null ,{status:"customer not found"})
            }

        })
    }


    deleteUser(call , callback) {
        load(call , function (user) {
            if(user){
                user.destroy()
                    .then(() => callback(null ,{status:"removed Successfuly"}))
                }
            
            else {
                callback(null ,{status:"customer not found"})
            }

        })

    }

    updateUser(call , callback) {


        console.log(call)

        load(call , function (user) {
            if(user){  
                Object.assign(user, call.request);
                user.save() 
                    .then((savedUser) =>  grpcMaker(savedUser , "OK" , function (result) {
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


