
const OTP = require('../models/OTP');
const User = require('../models/User')

async function verifyOTP(req, res, next) {
    const email = req.query.email;
    const otp = req.query.otp;
   
    
    const user = await OTP.findOne({ email }).sort({ createdAt: -1 });
  
    if (!user || user.otp != otp  ) {
        return res.status(400).json({
            success:false,
            message :"OTP does not match"
        });
    }

    next();
}

module.exports = verifyOTP;