import mongoose from 'mongoose';
import { STATUS } from '../constants/data.js';

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: STATUS.NEW
    },
    description: {
      type: String,
    },
    owner_id: {
      type: String,
    },
    owner_name: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model('groups', GroupSchema);
