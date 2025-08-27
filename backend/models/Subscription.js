const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  razorpay_order_id: {
    type: String,
    required: true
  },
  razorpay_payment_id: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "INR"
  },
  status: {
    type: String,
    enum: ["active", "expired", "failed"],
    default: "active"
  },
  plan: {
    type: String,
    default: "basic" // optional, if you plan to handle different plans
  },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   expiresAt: {
//     type: Date // optional: if you want to track subscription end date
//   }
});

// Optional TTL index if you want auto-expiry (e.g., 30 days)
// SubscriptionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
