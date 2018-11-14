var   async             = require("async");
const db                = require('../../config/sequelize');
const productAndService = db.productService
const productVehicles   = db.productVehicle

class productandServiceAppHandler{

    getPricedItems(call, callback) {
        var responseItems = call.request.items;
        async.forEachOf(responseItems, function (responseItem, key, forCallback) {
            responseItem.categoryPrice = 0
            productVehicles.findOne({where:{productAndServiceId:responseItem.serviceId , vehicleId:call.request.vehicleId}}).then(service => {
                try {
                    responseItem.servicePrice = service.price
                    productAndService.findOne({where:{id:responseItem.productId}}).then(product => {
                        try {
                            responseItem.productPrice = product.price
                            responseItem.totalPrice =  responseItem.productPrice +  responseItem.servicePrice + responseItem.categoryPrice
                        } catch (e) {
                            throw new Error("error in calculating total price in DB")
                        }
                        if(responseItem == responseItems[responseItems.length - 1])
                            forCallback(responseItems)
                    })
                } catch (e) {
                    throw new Error("error in finding service price")
                }
            }) 
        }, function (err) {
            if (err) {
                callback(new Error("error in finding product or service in DB"), null)
            }
            console.log(responseItems)
            callback(null, {responseItems});
        })
    }

    getAllowedProductServices(call, callback){
        
    }
}

export default productandServiceAppHandler;