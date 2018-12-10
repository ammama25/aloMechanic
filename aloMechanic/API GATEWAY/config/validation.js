import { error } from "util";

///validation---Model 

class validation 
{


    validatephonenumber(inputtxt) {
      console.log(inputtxt);
        var phoneno = /^[0][9][0-9][0-9]{8,8}$/;
        if(inputtxt)
        {
        var tst= inputtxt.match(phoneno);
        console.log(tst)
        if(tst){
          return true;
        }
        else {
          console.log("message");
          return false;
        }
      }
      else{

       console.log("null");
       return false;
       
      }
      };



       validateEmail(email) 
      {
          var tst = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          var res= email.match(tst);
          console.log(res)
          if(res){
            return true;
          }
          else {
            console.log("message");
            return false;
          }


     
        
      }     


     

      // null_chekker(data)
      // {
      //   console.log("nullchekker");
      //   console.log(data);

      //       for (var member in data) {

      //         if (data[member] == null)
      //         {
      //             throw new Error("fill the fields")
      //         }
                  
      //             }

      // }




};



export default { validation  }