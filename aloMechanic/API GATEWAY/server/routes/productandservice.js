import express from 'express';
import productandservice  from '../controllers/productandservice';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/getprice')
    .post(productandservice.getprice)

export default router;
