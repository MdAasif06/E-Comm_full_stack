import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Sneakers", "Formal", "Sports","Casual","Fitness"],
      required: true,
      index: true,
    },
    brand: {
      type: String,
      default: "StrideX",
    },
    sizes: [sizeSchema],
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
productSchema.index({ title: 1 }, { unique: true });
export default mongoose.model("Product", productSchema);