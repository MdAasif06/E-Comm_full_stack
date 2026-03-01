import express from "express";
import stripe from "../services/stripe.service.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Payment successful
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);

      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        await order.save();

        //  Deduct Stock
        for (const item of order.items) {
          const product = await Product.findById(item.product);

          const sizeObj = product.sizes.find(
            (s) => s.size === item.size
          );

          if (sizeObj) {
            sizeObj.stock -= item.quantity;
          }

          await product.save();
        }
      }
    }

    res.json({ received: true });
  }
);

export default router;