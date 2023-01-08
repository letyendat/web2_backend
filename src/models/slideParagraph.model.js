
import mongoose from 'mongoose';

const SlideParagraphSchema = new mongoose.Schema(
  {
    presentation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentations',
    },
    heading: {
      type: String,
      default: "Chào xuân quý mão 2023"
    },
    paragraph: {
      type: String,
      default: "Sau chu kì 60 năm này, tên gọi của mọi ngày, mọi tháng, mọi năm tiếp theo được lặp lại nguyên xi trước đó. Khoa học chưa phát hiện thấy chu kì này có liên quan đến một chu kì nào của tự nhiên (như chu kì của các tiết khí trong năm, tiết khí chính là 24 điểm đặc biệt trên quỹ đạo của Trái Đất xung quanh Mặt Trời, mỗi điểm cách nhau 15°). Lịch can chi được sử dụng trong “Tí Ngọ lưu trú” - một môn thời sinh học của Đông y cổ truyền. Hệ đếm can chi (ở Việt Nam) ngoài việc dùng đặt tên năm Âm lịch, vẫn còn được một số người sử dụng theo các tín điều hay tín ngưỡng dân gian (chẳng hạn như xem phong thuỷ, xem chiêm tinh, tướng, số, v.v.)."
    },
    slide_type: {
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model('slideParagraphs', SlideParagraphSchema);
