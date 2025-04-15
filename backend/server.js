import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

// configuration
dotenv.config();
const app = express();

// 2. define the route
// app.get('/', (req, res) => {
//   res.send('Server is ready!');
// });

app.use(express.json()); // allows us to accept JSON data in req.body

app.use('/api/products', productRoutes); // use the product routes

// console.log(process.env.MONGO_URI);

// 1. run the server
app.listen(5000, () => {
  connectDB(); //3. connect to the database
  console.log('Server started at: http://localhost:5000');
});
