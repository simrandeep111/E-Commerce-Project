import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  demographic: string;
  type: string;
  sizes: string[];
  colors: string[];
  season: string;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  category: { type: String, required: true },
  demographic: { type: String, required: true },
  type: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  colors: [{ type: String, required: true }],
  season: { type: String, required: true },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  new: { type: Boolean, default: false },
});

export default mongoose.model<IProduct>('Product', ProductSchema);