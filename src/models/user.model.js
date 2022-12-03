import mongoose from 'mongoose'
import { STATUS } from '../constants/data';
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            default: STATUS.NEW,
        },
        password: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

export default mongoose.model('users', UserSchema);