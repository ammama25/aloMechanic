import express from 'express';
import customer from '../controllers/customer';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/')
    .post(auth.validateOtpToken ,customer.register)

router.route('/update')
    .put(auth.validateLoginToken ,customer.update)

router.route('/delete')
    .delete(auth.validateLoginToken ,customer.remove);

router.route('/registerAddress')
    .post(auth.validateLoginToken ,customer.registerAddress)

router.route('/updateAddress')
    .put(auth.validateLoginToken ,customer.updateAddress)

router.route('/getAllAddresses')
    .get(auth.validateLoginToken ,customer.getAllAddresses)

export default router;
