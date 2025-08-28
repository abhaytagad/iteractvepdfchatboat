const express = require("express");
const { dbConnect } = require("./config/databse");
const { cloudinaryConnect } = require("./config/cloudinary");
const routes = require("./routes/routeHandler");
const fileUpload = require("express-fileupload");
 
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000",'https://iteractvepdfchatboat-t2ki.vercel.app');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(process.env.PORT, () => {
  console.log("server Started");
});

app.use("/api", routes);
cloudinaryConnect();
dbConnect();
