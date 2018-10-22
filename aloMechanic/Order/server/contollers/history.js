
function generate(orderId) {
    return{
        orderId   : orderId,
        state     : "new",
        desc      : "order added to db",
        updatedBy : "customer"
    }
}

export default {generate}