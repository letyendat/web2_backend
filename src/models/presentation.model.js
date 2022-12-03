
import mongoose from 'mongoose';
import { STATUS } from '../constants/data';

const PresenationSchema = new mongoose.Schema(
  {
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

export default mongoose.model('presenations', PresenationSchema);
