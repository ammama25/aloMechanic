    



function random()
{
    return Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100


}



class productandServiceAppHandler{

    getPricedItems(call,callback) {
        console.log(call.request)
        var responseItems = call.request.items;
        for(var i=0 ; i<call.request.items.length ; i++){
            var categoryPrice = random();
            var servicePrice = random();
            var productPrice = random();
            var totalPrice = categoryPrice + servicePrice + productPrice;
            responseItems[i].categoryPrice = categoryPrice
            responseItems[i].servicePrice = servicePrice
            responseItems[i].productPrice = productPrice
            responseItems[i].totalPrice = totalPrice
        }
        console.log(responseItems)
        callback(null, {responseItems});


    }

}

export default productandServiceAppHandler;