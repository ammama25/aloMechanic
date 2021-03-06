import express from 'express';
import customer from '../controllers/customer';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/')
    .post(auth.validateOtpToken ,customer.register)

router.route('/:customerId')

    .put(auth.validateLoginToken ,customer.update)

    .delete(auth.validateLoginToken ,customer.remove);

export default router;
