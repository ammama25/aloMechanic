
const db = require('../../config/sequelize');

const customerVehicle=db.customerVehicle;



function load(call , callback) {
    customerVehicle.findOne({where:{customerId:call.request.customerId}}).then( customerVehicles => {
        console.log(customerVehicles);
        if (!customerVehicles) {
            console.log("a");
            callback(null,err)
         
        }   
        else {
            console.log("c");
            callback(customerVehicles);
          
        }
    });
}





function grpcMaker(obj , cb ){
    var res = {
        id : obj.id ,
        vehicleId: obj.vehicleId ,
        customerId: obj.customerId ,
        plateNo: obj.plateNo ,
        color: obj.color ,
        mileage: obj.mileage 
    }
    cb(res)
}

class CustomerVehicleAppHandler {
    
 

    createCustomerVehicle(call ,callback) {
        console.log("ta inja");
        customerVehicle.create({
            vehicleId: call.request.vehicleId,
            customerId: call.request.customerId,
            plateNo: call.request.plateNo,
            color:call.request.color,
            mileage:call.request.mileage
      }).then((savedCustomerVehicle) => {
                console.log("wlcto the register177")
                if(!savedCustomerVehicle)
                {
                    callback(null,{status:"customerVehicle sabt nashod"})
                }
                else{
                    
                    grpcMaker(savedCustomerVehicle , "OK" , function (result) {
                        callback(null , result)
                })
            }
            })
    .catch(
        function(err) {
        // print the error details
        console.log("omid shams /////////////////////");
     
        callback(null,{status:"customerVehicle sabt nashod"})

    });

}


    getCustomerVehicle(call , callback) {
            console.log("login-time");
        load(call , function (customerVehicle) {
            if(customerVehicle){
                grpcMaker(customerVehicle , "OK" , function (result) {
                    console.log(result)
                    callback(null, result)
                })
            }
            else {
                callback(null ,{status:"customerVehicle not found"})
            }

        })
    }



    deleteCustomerVehicle(call , callback) {
        load(call , function (customerVehicle) {
            if(customerVehicle){
                customerVehicle.destroy()
                    .then(() => callback(null ,{status:"removed Successfuly"}))
                }
            
            else {
                callback(null ,{status:"customerVehicle not found"})
            }

        })

    }

    updateCustomerVehicle(call , callback) {


        console.log(call)

        load(call , function (customerVehicle) {
            if(customerVehicle){  
                Object.assign(customerVehicle, call.request);
                customerVehicle.save() 
                    .then((savedCustomerVehicle) =>  grpcMaker(savedCustomerVehicle , "OK" , function (result) {
                        callback(null ,result)
                    }));
            }
            else {
                callback(null ,{status:"customerVehicle not found"})
            }

        })
    }
    
}

export default CustomerVehicleAppHandler;


