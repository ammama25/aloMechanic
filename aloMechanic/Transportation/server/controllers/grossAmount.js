



function random()
{
    return Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100


}



class grossAmountAppHandler{

    
     getGrossAmount(call,callback) {
        console.log("get_time")

        callback(null,{"amount":random()});
    }

}

export default grossAmountAppHandler;