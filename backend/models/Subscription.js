
const mongoose = require('mongoose')

const Subscription = new mongoose.Schema(
    {

        email:{
            type: String,
            required : true
        },
        razorpay_order_id:{
            type: String,
            required : true
        },
        razorpay_payment_id:{
            type: String,
            required : true
        },
        createdAt :{
            type:Date,
            default:Date.now(),
            expires:1
        }
    }
)


module.exports = mongoose.model('Subscription',Subscription);