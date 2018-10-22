const address                = require('./address')
const order                  = require('./order')
const history                = require('./history')
const db                     = require('../../config/sequelize');
const sequelize              = db.sequelize ;
const Order                  = db.order;
const OrderAddress           = db.orderAddress;
const OrderItem             = db.orderItem;
const OrderHistory           = db.orderHistory;

class orderAppHandler{

    placeOrder(call,callback) {
        order.generate(call.request, function (orderErr, generatedOrder) {
            if(!orderErr){
                console.log(generatedOrder)
                address.get(call.request, function (addressErr, dbAddress) {
                    if(!addressErr) {
                        return sequelize.transaction(function (t) {
                            return Order.create(generatedOrder,
                                {transaction: t}).then((function(dbOrder){
                                return OrderAddress.create(address.generate(dbAddress, dbOrder.id),
                                    {transaction: t}).then((function(dbOrderAddress){
                                    return OrderHistory.create(history.generate(dbOrder.id),
                                        {transaction: t}).then((function(dbOrderHistory) {

                                    }))
                                }))
                            }))
                        }) .then(function (result) {
                            console.log(generatedOrder)
                            callback(null, generatedOrder)
                        }).catch(function (err) {
                            // console.log(err)
                            callback(err , null)
                        });
                    }
                })
            }
        })
    }
}

export default orderAppHandler;