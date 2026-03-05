import Product from "../models/product.model.js";
import mongoose from "mongoose";
import uploadImage from "../services/cloudinary.service.js";
import fs from "fs";

//  Create Product (Admin Only)
// export const createProduct = async (req, res) => {
//   try {
//     const { title, description, price, category, stock } = req.body;

//     //  First check image
//     if (!req.file) {
//       return res.status(400).json({ message: "Image required" });
//     }

//     // Upload to Cloudinary
//     const result = await uploadImage(req.file.path);

//     console.log("Cloudinary Result:", result);

//     //  Create product AFTER upload
//     const product = await Product.create({
//       title,
//       description,
//       price,
//       category,
//       stock,
//       image: {
//         url: result.secure_url,
//         public_id: result.public_id,
//       },
//     });
//     console.log(product);
//     //  Delete temp file
//     fs.unlinkSync(req.file.path);

//     res.status(201).json(product);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const result = await uploadImage(req.file.path);

    const parsedSizes = req.body.sizes
      ? JSON.parse(req.body.sizes)
      : [];

    const product = await Product.create({
      title,
      description,
      price,
      category,
      sizes: parsedSizes,  // IMPORTANT
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    fs.unlinkSync(req.file.path);

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Get All Products (Pagination + Search + Filter + Sort)
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8, search, category, sort } = req.query;

    const query = {};

    // if (search) {
    //   query.title = { $regex: search, $options: "i" };
    // }
    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get low stock products
// @route   GET /api/products/low-stock
// @access  Private/Admin
export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      "sizes.stock": { $lt: 5 },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Low stock fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get Single Product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (Admin)
// Delete Product (Bonus – Also delete image from cloudinary)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await cloudinary.uploader.destroy(product.image.public_id);

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
