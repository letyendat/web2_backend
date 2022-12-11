
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    presentation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentations',
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    message: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('messages', MessageSchema);
