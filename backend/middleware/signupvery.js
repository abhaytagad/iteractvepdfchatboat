
const OTP = require('../models/OTP');
const User = require('../models/User')

async function signupvery(req, res, next) {
    const {email,otp} = req.body;

    console.log(email,otp)
    const user = await OTP.findOne({ email }).sort({ createdAt: -1 });
    
    if (!user || user.otp != otp  ) {
        await OTP.findOneAndDelete({email:email});
        return res.status(400).json({
            success:false,
            message :"OTP does not match"
        });
    }

    next();
}

module.exports = signupvery;