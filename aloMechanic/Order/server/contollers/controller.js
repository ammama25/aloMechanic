const address                = require('./address')
const order                  = require('./order')
const history                = require('./history')
const items                  = require('./items')
const db                     = require('../../config/sequelize');
const sequelize              = db.sequelize ;
const Order                  = db.order;
const OrderAddress           = db.orderAddress;
const OrderItems             = db.orderItem;
const OrderHistory           = db.orderHistory;

class orderAppHandler{

    placeOrder(call,callback) {
        items.get(call.request, function (itemsErr, pricedItems) {
            if(!itemsErr){
                order.generate(call.request, pricedItems, function (orderErr, generatedOrder) {
                    if(!orderErr){
                        address.get(call.request, function (addressErr, dbAddress) {
                            if(!addressErr) {
                                return sequelize.transaction(function (t) {
                                    return Order.create(generatedOrder,
                                        {transaction: t}).then((function(dbOrder){
                                        return OrderAddress.create(address.generate(dbAddress, dbOrder.orderNo),
                                            {transaction: t}).then((function(dbOrderAddress){
                                            return OrderHistory.create(history.generate(dbOrder.orderNo),
                                                {transaction: t}).then((function(dbOrderHistory) {
                                                return OrderItems.bulkCreate(items.generate(pricedItems, dbOrder.orderNo),
                                                    {transaction: t}).then((function(dbOrderItem) {

                                                }))
                                            }))
                                        }))
                                    }))
                                }) .then(function (result) {
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
        })

    }
}

export default orderAppHandler;