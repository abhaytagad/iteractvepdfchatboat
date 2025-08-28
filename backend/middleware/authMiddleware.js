const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = async  (req, res, next) =>{
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1].replace(/^"|"$/g, ""); // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
 
  
 
  try {
    const decoded = await jwt.verify(token,process.env.JWT_SECRET);

    req.user = decoded; // user info is available to controller
   
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
