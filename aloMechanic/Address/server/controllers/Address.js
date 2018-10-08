const db = require('../../config/sequelize');
const customerAddress = db.customerAddress;


function grpcMaker(obj, cb ){
    var res = {
        id : obj.id ,
        customerId: obj.customerId ,
        districtId: obj.districtId ,
        address: obj.address ,
        location: obj.location
    }
    cb(res)
}

function load(call , callback) {
    customerAddress.findOne({where:{id:call.request.id}}).then(address => {
        callback(address)
    })
}

class AddressAppHandler {

    registerAddress(call ,callback) {
        console.log(call)
        customerAddress.create({
            customerId: call.request.customerId,
            districtId: call.request.districtId,
            address: call.request.address,
            location: call.request.location
        }).then((savedAddress) => {
            grpcMaker(savedAddress, function (result) {
                callback(null , result)
            })
        }).catch(function(err) {
            callback("address sabt nashod",null)
        });
    }

    updateAddress(call , callback) {
        load(call , function (address) {
            if(address){
                Object.assign(address, call.request);
                customerAddress.save()
                    .then((savedCustomer) =>  grpcMaker(savedCustomer , "OK" , function (result) {
                        callback(null ,result)
                    }));
            }
            else {
                callback("address peida nashod",null)
            }
        })
    }

    getAllAddresses(call , callback) {
        customerAddress.findAll({where:{customerId:call.request.customerId}}).then(addresses => {
            callback(null , {addresses})

        })
    }
}

export default AddressAppHandler;


