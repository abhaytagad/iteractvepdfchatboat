
const OTP = require('../models/OTP');
const User = require('../models/User')

async function signupvery(req, res, next) {
    const {email,otp} = req.body;

    const user = await OTP.findOne({ email }).sort({ createdAt: -1 });
    console.log(user)
    if (!user || user.otp != otp  ) {
        return res.status(400).json({
            success:false,
            message :"OTP does not match"
        });
    }

    next();
}

module.exports = signupvery;