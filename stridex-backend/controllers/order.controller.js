import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import stripe from "../services/stripe.service.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let lineItems = [];
    let orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) continue;

      const selectedSize = product.sizes.find(
        (s) => s.size === Number(item.size)
      );

      if (!selectedSize || selectedSize.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      totalAmount += product.price * item.quantity;

      lineItems.push({
        price_data: {
          currency: "INR",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      });

      orderItems.push({
        product: product._id,
        size: item.size,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      paymentStatus: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// User Order History
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "title price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};