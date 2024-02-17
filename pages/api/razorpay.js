import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import shortid from "shortid";
const Razorpay = require("razorpay");

shortid.characters("01234567890");

export default async function handle(req, res) {
  const {
    amount,
    name,
    email,
    mobile,
    streetAddress,
    city,
    postalCode,
    country,
    cartProducts,
  } = req.body;

  // Connect to MongoDB
  await mongooseConnect();

  // Fetch product information
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  // Prepare line items for Razorpay
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "INR",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  // Create Razorpay order
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: (amount * 100).toString(),
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    const orderId = response.id;

    // Create order in MongoDB
    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      mobile,
      streetAddress,
      city,
      postalCode,
      country,
      userEmail: email,
      orderId: orderId,
    });

    res.status(200).json({
      id: orderId,
      amount: response.amount,
      status: response.status,
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(400).json({ error: "Failed to create Razorpay order" });
  }
}
