import { error } from "util";




function random()
{
    return Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100


}



class transportationAppHandler{

    
     gettransportation(call,callback) {


      callback(null,{"amount":random() , status: "ok "});

    }

    
}

export default transportationAppHandler;