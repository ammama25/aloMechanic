import express from 'express';
import customer from '../controllers/customer';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/')
    .get(customer.get)

    .post(auth.validateOtpToken ,customer.createcustomer)

    .put(auth.validateLoginToken ,customer.updatecustomer)

    .delete(auth.validateLoginToken ,customer.deletecustomer);

export default router;
