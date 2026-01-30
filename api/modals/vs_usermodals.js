import { Schema } from "mongoose";

const usersignupSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

  },
  { timestamps: true }
);

const UserSignupModel = mongoose.model("UserSignup", usersignupSchema);

export default UserSignupModel;