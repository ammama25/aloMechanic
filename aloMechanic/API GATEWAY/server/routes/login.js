import express from 'express';
import customer from '../controllers/customer';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/')
    .post(customer.login ,auth.generateLoginToken)

export default router;
