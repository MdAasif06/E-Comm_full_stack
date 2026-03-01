import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import stripe from "../services/stripe.service.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find selected size
    const selectedSize = product.sizes.find(
      (s) => s.size === Number(size)
    );

    if (!selectedSize || selectedSize.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalAmount = product.price * quantity;

    // Create Order (Pending)
    const order = await Order.create({
      user: req.user._id,
      items: [
        {
          product: product._id,
          size,
          quantity,
        },
      ],
      totalAmount,
      paymentStatus: "pending",
    });

    // Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.title,
            },
            unit_amount: totalAmount * 100, // paisa
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
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