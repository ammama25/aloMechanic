import express from 'express';
import grassAmount from '../controllers/transportation';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/getgrassAmount')
    .post(grassAmount.getgrassAmount)

export default router;
