import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    id: String,
    name: String,
    price: Number,
    image: String,
  },
  quantity: Number,
  size: String,
  color: String,
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [cartItemSchema],
});

export default mongoose.model('Cart', cartSchema);
