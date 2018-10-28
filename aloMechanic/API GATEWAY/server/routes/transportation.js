import express from 'express';
import transportation from '../controllers/transportation';
import auth from '../controllers/auth'

const router = express.Router();

router.route('/gettransportation')
    .post(transportation.gettransportation)

export default router;
