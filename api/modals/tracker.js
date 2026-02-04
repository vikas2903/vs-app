import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  variantId: String,
  quantity: Number
}, { _id: false });

const EventSchema = new mongoose.Schema({

  shop: { type: String, required: true, index: true },

  type: {
    type: String,
    required: true,
    enum: ["product_view", "add_to_cart", "begin_checkout"]
  },

  productHandle: { type: String, default: null, index: true },

  variantId: { type: String, default: null, index: true },

  cartItems: [CartItemSchema],

  ts: { type: String, required: true },

  day: { type: String, required: true, index: true }

});

EventSchema.index({ shop: 1, day: 1 });
EventSchema.index({ shop: 1, type: 1, day: 1 });
EventSchema.index({ shop: 1, productHandle: 1, day: 1 });

export default mongoose.model("event", EventSchema);
