import mongoose from 'mongoose';
const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
    },
});
export default mongoose.model('refreshTokenSchema', refreshTokenSchema); 