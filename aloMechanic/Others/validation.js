
///validation---Model 

class validation 
{

    validatephonenumber(inputtxt) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(inputtxt.value.match(phoneno)) {
          return true;
        }
        else {
          alert("message");
          return false;
        }
      };



       validateEmail(email) 
      {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
      }     



};



export default { validation   }