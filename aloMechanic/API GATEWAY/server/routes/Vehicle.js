import express from 'express';
import otpCtrl from '../controllers/otp';
import auth from '../controllers/auth';
import vehicle from '../controllers/Vehicle';

const router = express.Router();

router.route('/getCustomerVehicle')
     .get(vehicle.getCustomerVehicle)

router.route('/registerCustomerVehicle')
    .post(vehicle.registerCustomerVehicle)

router.route('/updateCustomerVehicle')
    .put( auth.validateLoginToken ,vehicle.update)
    
router.route('/removeCustomerVehicle')
    .delete(auth.validateLoginToken ,vehicle.remove)

router.route('/getAllVehicles')
    .get(vehicle.getallvehicle)

router.route('/getAllBrands')
	.get(vehicle.getAllBrands)

router.route('/getModels')
	.get(vehicle.getModels)

router.route('/getYears')
	.get(vehicle.getYears)



export default router;
