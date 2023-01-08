
import mongoose from 'mongoose';

const SlideHeadingSchema = new mongoose.Schema(
  {
    presentation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentations',
    },
    heading: {
      type: String,
      default: "Chào xuân quý mão 2023"
    },
    slide_type: {
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model('slideHeadings', SlideHeadingSchema);
