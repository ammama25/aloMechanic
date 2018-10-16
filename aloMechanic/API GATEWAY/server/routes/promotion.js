import express from 'express';
import promotion  from '../controllers/promotion';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/getpromotion')
    .post(promotion.getpromotion)

export default router;
