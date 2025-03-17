import mongoose from "mongoose";
import type { User } from "../types/index.js";

export interface UserDocument extends User, mongoose.Document {}

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
