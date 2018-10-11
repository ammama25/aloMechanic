import express from 'express';
import location from '../controllers/location';

const router = express.Router();

router.route('/getAllCities')
    .get(location.getAllCities)

router.route('/getAllDistricts')
    .get(location.getAllDistricts );

export default router;
