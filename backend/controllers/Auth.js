const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../util/mailSender");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT helper
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, // payload
    JWT_SECRET,
    { expiresIn: "1h" } // expires in 1 hour
  );
}

exports.otpGenerator = async (req, res) => {
  try {
    const { email } = req.body;

    const newOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.deleteMany({ email: email });
    await OTP.create({ email: email, otp: newOtp });

    res.status(200).json({
      success: true,
      message: "OTP successfully created",
    });

    mailSender(email, "Verification mail from Interactive PDF Chatbot", newOtp);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "OTP not created",
    });
  }
};

exports.signUpCon = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password must match",
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcryptPassword,
    });

    // Generate JWT token
    const token = generateToken(newUser);

    return res.status(200).json({
      success: true,
      message: "Sign Up successful",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

exports.loginCon = async (req, res) => {
  try {
    const { email, password } = req.body; // use body instead of query
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const alreadyUser = await User.findOne({ email });

    if (!alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    
    const verifyPassword = await bcrypt.compare(password, alreadyUser.password);
    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    // Generate JWT token
    const token = generateToken(alreadyUser);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: alreadyUser._id,
        email: alreadyUser.email,
        firstName: alreadyUser.firstName,
        lastName: alreadyUser.lastName,
      },
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
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
        message: "User not found",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password must match",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    userDetails.password = hashPassword;
    await userDetails.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
