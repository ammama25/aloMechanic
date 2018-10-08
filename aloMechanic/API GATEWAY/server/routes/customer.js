import express from 'express';
import customer from '../controllers/customer';
import address from '../controllers/address';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/')
    .post(auth.validateOtpToken ,customer.register)

router.route('/:customerId')
    .put(auth.validateLoginToken ,customer.update)
    .delete(auth.validateLoginToken ,customer.remove);

router.route('/:customerId/registerAddress')
    .post(address.register)

router.route('/:customerId/updateAddress')
    .put(auth.validateLoginToken ,address.update)

router.route('/:customerId/getAllAddresses')
    .get(address.getAll)

export default router;
