import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

// 3. create endpoint to create a product
router.post('/', createProduct); // use the createProduct function from the controller

// 4. create endpoint to delete a product
router.delete('/:id', deleteProduct); // use the deleteProduct function from the controller

// 5. create endpoint to get all products
router.get('/', getProducts); // use the getProducts function from the controller

// 6. create endpoint to update a product
router.put('/:id', updateProduct); // use the updateProduct function from the controller

export default router;
