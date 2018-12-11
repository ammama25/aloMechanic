
import customer from './customer';
import otp from './otp';
import login from './login';
import vehicle from './Vehicle';
import location from './location';
import product from './product';
import promotion  from './promotion';
import transportation from './transportation';
import productandservice  from './productandservice';
import order  from './order';
var express = require('express')

var app = express()
 
  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });
  

const router = express.Router();

// Adding first endpoint to server app
router.get('/', (req, res) => {
	res.json({
        msg: 'hello'
    });
});

/** GET /api-status - Check Service status  */
router.get('/api-status', (req, res) => {
    res.json({
        status: "ok"
    });
});
router.use('/customers', customer);
router.use('/otp', otp);
router.use('/login', login);
router.use('/vehicle',vehicle);
router.use('/location',location);
router.use('/products',product);
router.use("/transportation",transportation);
router.use("/promotion",promotion);
router.use("/productandservice",productandservice);
router.use("/order",order);



export default router;