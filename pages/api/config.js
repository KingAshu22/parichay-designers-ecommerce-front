export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
