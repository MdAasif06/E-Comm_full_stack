import Order from "../models/order.model.js";

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

    res.json({
      totalOrders,
      totalRevenue,
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