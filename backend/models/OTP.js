const mongoose = require('mongoose')
const mailSender = require('../util/mailSender')

const otpShema = new mongoose.Schema({
 
   email:
    {
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
   },
    createAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
   },       
}
)

module.exports = mongoose.model("OTP",otpShema)