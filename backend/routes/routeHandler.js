const express = require("express");
const {
  signUpCon,
  loginCon,
  otpGenerator,
  forgotPassword,
} = require("../controllers/Auth");
const verifyOTP = require("../middleware/verifyOTP");
const {
  allFiles,
  fileDelete,
  fileUploader,
} = require("../controllers/FileHandler");
const { queryHandler, createQuery } = require("../controllers/QueryHandler");
const signupvery = require("../middleware/signupvery");
const { paymentCon, paymentValidator } = require("../controllers/Pyment");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ new

const routes = express.Router();

// Public routes
routes.post("/signup", signupvery, signUpCon);
routes.post("/generatotp", otpGenerator);
routes.post("/signin", loginCon);
routes.put("/forgotpassword", verifyOTP, forgotPassword);
  
// ✅ Private routes (need JWT)
routes.post("/uploadfile", authMiddleware, fileUploader);
routes.post("/allfiles", authMiddleware, allFiles);
routes.post("/deletefile", authMiddleware, fileDelete);
routes.post("/query", authMiddleware, queryHandler);
routes.post("/createquery", authMiddleware, createQuery);
routes.post("/payment", authMiddleware, paymentCon);
routes.post("/paymentvalidate", authMiddleware, paymentValidator);

module.exports = routes;
