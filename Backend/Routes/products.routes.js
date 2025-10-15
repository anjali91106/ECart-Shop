import express from 'express';
import { findById, searchByQuery, showProducts } from '../Controller/products.controller.js';

const router = express.Router();

router.get('/products', showProducts);
router.get('/products/:id', findById);
router.get('/search', searchByQuery);

export default router;
