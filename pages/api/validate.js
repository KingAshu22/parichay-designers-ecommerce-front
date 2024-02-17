import crypto from "crypto";

export default function handle(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(razorpay_order_id + "|" + razorpay_payment_id);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  res.json({
    msg: "Success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
}
