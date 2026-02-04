import mongoose from "mongoose";
const { Schema } = mongoose;

 

const usersignupSchema = new Schema(
  {
    name: { type: String, required: true,},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, 

  },
  { timestamps: true }
); 

const UserSignupModel = mongoose.model("vsuser", usersignupSchema);
 
export default UserSignupModel;