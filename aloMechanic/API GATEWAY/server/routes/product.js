import express from 'express';
import product from '../controllers/product';

const router = express.Router();

router.route('/getAllCategoties')
    .get(product.getAllCategories)

router.route('/getAllServices')
    .get(product.getAllServices );

router.route('/getAllProducts')
    .get(product.getAllProducts );

export default router;
