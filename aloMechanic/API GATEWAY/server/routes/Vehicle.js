import express from 'express';
import otpCtrl from '../controllers/otp';
import auth from '../controllers/auth';
import Vehicle from '../controllers/Vehicle';

const router = express.Router();

router.route('/getCustomerVehicle')
     .get(auth.validateLoginToken ,Vehicle.getCustomerVehicle)

router.route('/registerCustomerVehicle')
    .post(Vehicle.registerCustomerVehicle)

router.route('/updateCustomerVehicle')
    .put( Vehicle.update)
    
router.route('/removeCustomerVehicle')
    .delete(Vehicle.remove)


    router.route('/getallvehicle')
    .get(Vehicle.getallvehicle)

    router.route('/getallbrands')

    router.route('/getallmodels')



export default router;
