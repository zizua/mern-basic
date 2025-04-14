import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './model/product.model.js';

// config
dotenv.config();
const app = express();

// 2. define the route
// app.get('/', (req, res) => {
//   res.send('Server is ready!');
// });

// 3. create endpoint to create a product
app.post('/products', async (req, res) => {
  const product = req.body; //user will this data

  if (!product.name || product.price || product.image) {
    return res.send(400).json({ success: false, message: 'Please fill all the fields' });
  }

  const newProduct = new Product(product); // create a new product object

  try {
    await newProduct.save(); // save the product to the database
    res.send(201).json({ success: true, message: 'Product created successfully' });
  } catch (error) {
    console.log('Error creating product:', error);
    res.send(500).json({ success: false, message: 'Server error' });
  }
});
// console.log(process.env.MONGO_URI);

// 1. run the server
app.listen(5000, () => {
  connectDB(); //3. connect to the database
  console.log('Server started at http://localhost:5000');
});
