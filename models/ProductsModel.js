import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  variants: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models?.Products || mongoose.model("Products", productSchema);

export default Product;
