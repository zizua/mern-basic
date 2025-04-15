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
app.use(express.json()); // allows us to accept JSON data in req.body

app.post('/api/products', async (req, res) => {
  const product = req.body; //user will send this data
  if (!product.name || !product.price || !product.image) {
    return res.status(500).json({ success: false, message: 'Please fill all the fields' });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    console.log('Product created successfully!');
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 4. create endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params; // get the id from the url

  try {
    await Product.findByIdAndDelete(id); // delete the product from the database
    console.log(`Product id: ${id} successfully deleted!`);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log('Error deleting product:', error.message);
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// 5. create endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}); // get all products from the database
    console.log('Products fetched successfully!');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 6. create endpoint to update a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params; // get the id from the url
  const product = req.body; // get the product data from the request body

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // update the product in the database
    console.log(`Product id: ${id} successfully updated!`);
    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.log('Error updating product:', error.message);
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// console.log(process.env.MONGO_URI);

// 1. run the server
app.listen(5000, () => {
  connectDB(); //3. connect to the database
  console.log('Server started at http://localhost:5000');
});
