import mongoose from 'mongoose';

const GroupUserRoleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups',
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('group_user_role', GroupUserRoleSchema);
