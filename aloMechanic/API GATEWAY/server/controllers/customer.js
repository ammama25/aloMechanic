const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const bindPath = '127.0.0.1:8083';



function get(req,res,next) {
  console.log("get");
  loader.load('./server/protos/Customer.proto')
      .then((packageDefinition) => {
          const Package = grpc.loadPackageDefinition(packageDefinition);
          const Client = Package.customer_app_package.CustomerApp;
          const client = new Client(bindPath, grpc.credentials.createInsecure());
          client.listCustomers({}, function (err, customers) {
            if (err) {
                return console.log(err);
            }
            console.log('users:');
            console.log(customers);
            return res.json(customers);
          });
      });
}

function createcustomer(req,res,next) {
    loader.load('./Customer.proto')
    .then((packageDefinition) => {
        const Package = grpc.loadPackageDefinition(packageDefinition);
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());
        client.createCustomer({
            mobileNo: req.body.mobileNo,
            firstname: req.body.firstname ,
            lastname: req.body.lastname ,
            password: req.body.password ,
            email: req.body.email , 
           } , function (err , resp) {
            if(err){
                next()
            }
            else {
                return res.json(resp);
            }
        })
    });
}

////////////////////////////////////////////////////////////////////////////////////////////
//login
function customerfinder(req, res ,next)
{


 loader.load('./Customer.proto')
    .then((packageDefinition) => {
   
        const Package = grpc.loadPackageDefinition(packageDefinition);
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());

 client.getCustomer({mobileNo: req.body.mobileNo , password: req.body }, function (err , res) {
           
            console.log(res);
        })


    });
    return res.json(req.dbuser); //??


}

////////////////////////////////////////////////////////////////////////////////////////////



function updatecustomer(req, res ,next)
{

    loader.load('./Customer.proto')
    .then((packageDefinition) => {
   
        const Package = grpc.loadPackageDefinition(packageDefinition);
        const Client = Package.customer_app_package.CustomerApp;
        const client = new Client(bindPath, grpc.credentials.createInsecure());


           client.updateCustomer({mobileNo:  req.body.mobileNo ,firstname:req.body.firstname} , function (err , res) {
            console.log(res)
        })
    });
   

}
////////////////////////////////////////////////////////////////////////////////////////
function deletecustomer(req, res ,next)
{
    
 loader.load('./Customer.proto')
 .then((packageDefinition) => {

     const Package = grpc.loadPackageDefinition(packageDefinition);
     const Client = Package.customer_app_package.CustomerApp;
     const client = new Client(bindPath, grpc.credentials.createInsecure());
     client.deleteCustomer({mobileNo: req.body.mobileNo } , function (err , res) {
            console.log(res)
        })

 });

}

export default{get , createcustomer, updatecustomer ,deletecustomer,customerfinder };