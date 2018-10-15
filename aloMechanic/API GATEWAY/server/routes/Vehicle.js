import express from 'express';
import otpCtrl from '../controllers/otp';
import auth from '../controllers/auth';
import Vehicle from '../controllers/Vehicle';

const router = express.Router();

router.route('/getCustomerVehicle')
     .get(Vehicle.getCustomerVehicle)

router.route('/registerCustomerVehicle')
    .post(Vehicle.registerCustomerVehicle)

router.route('/updateCustomerVehicle')
    .put( auth.validateLoginToken ,Vehicle.update)
    
router.route('/removeCustomerVehicle')
    .delete(auth.validateLoginToken ,Vehicle.remove)


    router.route('/getallvehicle')
    .get(Vehicle.getallvehicle)

    router.route('/getall')

    router.route('/getallbrands_models')



export default router;
