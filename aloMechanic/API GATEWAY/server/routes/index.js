import express from 'express';
import customer from './customer';
import otp from './otp';
import login from './login';
import vehicle from './Vehicle';
import location from './location';
import product from './product';

const router = express.Router();

// Adding first endpoint to server app
router.get('/', (req, res) => {
	res.json({
        msg: 'hello'
    });
});

/** GET /api-status - Check Service status  */
router.get('/api-status', (req, res) => {
    res.json({
        status: "ok"
    });
});

router.use('/customers', customer);
router.use('/otp', otp);
router.use('/login', login);
router.use('/Vehicle',vehicle);
router.use('/location',location);
router.use('/products',product);

export default router;