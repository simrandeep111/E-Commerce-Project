import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
const mongoURI = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(mongoURI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));