    



function random()
{
    return Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100


}



class productandServiceAppHandler{

    
     get_price(call,callback)
    {
    console.log("get_time")

    callback(null,{"status":random()});
    console.log(random());
  


}

}

export default productandServiceAppHandler;