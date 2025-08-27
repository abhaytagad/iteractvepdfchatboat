const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');
const Subscription = require('../models/Subscription');

exports.paymentCon = async (req, res) => {
  const payment_capture = 1; 
  const amount = 100; 
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRETE   // ✅ fixed
  });

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: 'receipt_order_1',
    payment_capture
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      order: response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.paymentValidator = async (req, res) => {
  try {
    const { email, razorpay_order_id, razorpay_signature, razorpay_payment_id } = req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRETE);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    await Subscription.create({
      email,
      razorpay_order_id,
      razorpay_payment_id,
      amount: 200,
      currency: "INR",
      status: "active"
    });

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: "Something went wrong", error: e.message });
  }
};
