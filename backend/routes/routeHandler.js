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

const routes = express.Router();

routes.post("/signup", signupvery, signUpCon);
routes.post("/generatotp", otpGenerator);
routes.get("/signin", loginCon);
routes.put("/forgotpassword", verifyOTP, forgotPassword);
routes.post("/uploadfile",fileUploader);
routes.post("/query", queryHandler);
routes.post("/allfiles", allFiles);
routes.post("/deletefile", fileDelete);
routes.post("/payment", paymentCon);
routes.post("/paymentvalidate", paymentValidator);
routes.post("/createquery", createQuery);
module.exports = routes;
