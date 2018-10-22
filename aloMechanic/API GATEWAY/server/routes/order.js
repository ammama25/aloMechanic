import express from 'express';
import order from '../controllers/order';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/placeOrder')
    .post(auth.validateLoginToken ,order.register)

export default router;
