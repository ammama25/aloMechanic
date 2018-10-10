import express from 'express';
import otpCtrl from '../controllers/otp';
import vehicle from '../controllers/Vehicle';
import authctrl from '../controllers/auth';

const router = express.Router();

router.route('/')

    .get(vehicle.getCustomerVehicle)

    .post(vehicle.registerCustomerVehicle)

    .put(vehicle.update)

    .delete(vehicle.remove)


export default router;
