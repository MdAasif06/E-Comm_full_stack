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
  { _id: false },
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
      enum: ["Sneakers", "Formal", "Sports", "Casual", "Fitness"],
      required: true,
    },
    brand: {
      type: String,
      default: "StrideX",
    },
    sizes: [sizeSchema],
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);
productSchema.index({ title: 1 }, { unique: true });
// Indexing for better performance
productSchema.index({ title: "text", description: "text" }); // Text search optimized
productSchema.index({ category: 1 }); // Category filtering optimized
productSchema.index({ price: 1 }); // Sorting optimized
export default mongoose.model("Product", productSchema);
