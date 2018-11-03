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
            year: call.request.year,
            color:call.request.color,
            mileage:call.request.mileage
      }).then((savedCustomerVehicle) => {
            if(!savedCustomerVehicle) {
                callback(new Error("error -- not register"))
            }
            else{
                callback(null ,savedCustomerVehicle )
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
                callback(new Error("customerVehicle not removed"))
            }

        })

    }

    updateCustomerVehicle(call , callback) {
        load(call , function (customerVehicle) {
            if(customerVehicle){  
                Object.assign(customerVehicle, call.request);
                customerVehicle.save() 
                    .then((savedCustomerVehicle) =>{
                        callback(null ,savedCustomerVehicle)
                    });
            }
            else {
                callback(new Error("customerVehicle not found"))
            }

        })
    }

    getVehicle(call, callback){
        customerVehicle.findOne({where:{id:call.request.CustomerVehicleId}}).then( customerVehicle => {
            callback(null, customerVehicle)
        });
    }
    
}

export default CustomerVehicleAppHandler;


