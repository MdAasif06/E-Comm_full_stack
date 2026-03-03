import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
export const getSalesAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({
      paymentStatus: "paid",
    });

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.find({
    "sizes.stock": { $lt: 5 },
  });

    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      lowStockCount: lowStockProducts.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: "paid" })
      .populate("user", "name email")
      .populate("items.product", "title price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $match: { paymentStatus: "paid" },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};