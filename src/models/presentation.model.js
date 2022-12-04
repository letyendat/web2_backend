
import mongoose from 'mongoose';
import { STATUS } from '../constants/data.js';

const PresenationSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      default: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    owner_id: {
      type: String,
    },
    slide_list: {
      type: Array
    }
  },
  { timestamps: true }
);

export default mongoose.model('presentations', PresenationSchema);
