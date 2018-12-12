
function generate(orderId) {
    return{
        orderId   : orderId,
        state     : "10",
        desc      : "order added to db",
        updatedBy : "customer"
    }
}

export default {generate}