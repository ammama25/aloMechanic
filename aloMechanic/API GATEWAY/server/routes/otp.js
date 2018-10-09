import express from 'express';
import otpCtrl from '../controllers/otp';
import authCtrl from '../controllers/auth'

const router = express.Router();

router.route('/request')
    .post(otpCtrl.request)

router.route('/validate')
    .put(otpCtrl.validate ,authCtrl.generateOtpToken);

export default router;
