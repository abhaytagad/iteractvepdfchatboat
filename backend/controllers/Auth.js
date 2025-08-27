const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../util/mailSender");

exports.otpGenerator = async (req, res) => {
  try {
    const { email } = req.body

    const newOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
   await OTP.deleteMany({email:email})

    await OTP.create({ email: email,otp:newOtp })

    res.status(200).json({
      success: true,
      message: "otp succesfully created",
    });

    mailSender(email, "Verification mail from Interactive PDF Chatboat", newOtp);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "otp not created",
    });
  }
};

exports.signUpCon = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword 
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mendatory",
      });
    }

    const alreadyUser = await User.findOne({ email: email });

    if (alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "User already present",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password sould Match with Confirm Password",
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcryptPassword,
    });
    
    return res.status(200).json({
      success: true,
      message: "Sign Up succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

exports.loginCon = async (req, res) => {
  try {
    
    const email = req.query.email;
    const password = req.query.password;


    if (!email || !password ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mendatory",
      });
    }

    const alreadyUser = await User.findOne({ email: email });

    if (!alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const verifyPassword = bcrypt.compare(password, alreadyUser.password);

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not Match ",
      });
    }

    const payload = {
      id: alreadyUser._id,
      expireIn: Date.now() + 60 * 60 * 100,
    };

    const token = await jwt.sign(payload, process.env.JWT_SCRETE);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Error while generating a token",
      });
    }

    alreadyUser.token = token;

    return res.status(200).json({
      success: true,
      message: "Sign in succesfully",
      token:token
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password != confirmPassword",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    userDetails.password = hashPassword;

    res.status(200).json({
      success: true,
      message: "password changed succesfully",
    });
  } catch (e) {
    res.status(400).json({
      success: flase,
      message: "somthing went wrong",
    });
  }
};
