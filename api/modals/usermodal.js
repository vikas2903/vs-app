import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    userid: { type: Number, required: true, unique: true },
    name: { type: String, required: true },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    address: {
      type: addressSchema,
      required: true
    },

    phone: { type: String, required: true },

    website: { type: String, required: true },

    company: {
      type: companySchema,
      required: true
    }
  },
  { timestamps: true },
  { upsert: true }
);

const UserModel = mongoose.model("Usermigrate", userSchema);

export default UserModel;
