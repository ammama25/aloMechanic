import express from 'express';
import customer from '../controllers/customer';
import auth from '../controllers/auth'

const router = express.Router();

//auth.validateOtpToken
router.route('/')
    .post(auth.validateOtpToken,customer.register)

router.route('/update')
    .put(auth.validateLoginToken,customer.update)

router.route('/delete')
    .delete( auth.validateLoginToken,customer.remove);

router.route('/registerAddress')
    .post(auth.validateLoginToken ,customer.registerAddress)

router.route('/updateAddress')
    .put(auth.validateLoginToken ,customer.updateAddress)

router.route('/forgottPass')
    .put(auth.validateOtpToken ,customer.update)

router.route('/getAllAddresses')
    .get(customer.getAllAddresses)

router.route('/isRegisterd')
	.post(customer.isRegisterd)

export default router;