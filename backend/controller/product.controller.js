import mongoose from 'mongoose';
import Product from '../model/product.model.js';

export const createProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // get the id from the url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' }); // check if the id is valid
  }

  try {
    await Product.findByIdAndDelete(id); // delete the product from the database
    console.log(`Product id: ${id} successfully deleted!`);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // get all products from the database
    console.log('Products fetched successfully!');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; // get the id from the url
  const product = req.body; //user will send this data

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' }); // check if the id is valid
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // update the product in the database
    console.log('Product updated successfully!');
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log('Error updating product:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
