import express from 'express';
import customer from './customer';
import otp from './otp';
import login from './login';

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



export default router;