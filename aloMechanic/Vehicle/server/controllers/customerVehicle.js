
const db = require('../../config/sequelize');

const customerVehicle=db.customerVehicle;



function load(call , callback) {
    customerVehicle.findOne({where:{customerId:call.request.customerId}}).then( customerVehicles => {
        callback(customerVehicles)
    });
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
                console.log("wlc to the register")
                if(!savedCustomerVehicle)
                {
                    callback(null,{status:"customerVehicle sabt nashod"})
                }
                else{
                    
                  
                        callback(null ,savedCustomerVehicle )
                }
            })
    // .catch(
    //     function(err) {
    //     // print the error details
    //     console.log("omid shams /////////////////////");
     
    //     callback(null,{status:"customerVehicle sabt nashod"})

    // });

}


    getCustomerVehicle(call , callback) {
            console.log("login-time");
        load(call , function (customerVehicle) {
            if(customerVehicle){
               
                    callback(null, customerVehicle)
            }
                
            
            else {
                callback(null ,{status:"customerVehicle not found"})
            }

        })
    }



    deleteCustomerVehicle(call , callback) {
        console.log("remove-time");
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


        console.log("update-time")

        load(call , function (customerVehicle) {
            if(customerVehicle){  
                Object.assign(customerVehicle, call.request);
                customerVehicle.save() 
                    .then((savedCustomerVehicle) =>{
                        callback(null ,savedCustomerVehicle)
                    });
            }
            else {
                callback(null ,{status:"customer not found"})
            }

        })
    }
    
}

export default CustomerVehicleAppHandler;


