
import mongoose from 'mongoose';

const PresenationSchema = new mongoose.Schema(
  {
    presentation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentations',
    },
    question: {
        type: String,
        default: "Any question"
    },
    labels: {
        type: Array,
        default: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    datas: {
        type: Array,
        default: [0, 0, 0, 0]
    }
  },
  { timestamps: true }
);

export default mongoose.model('slides', PresenationSchema);
