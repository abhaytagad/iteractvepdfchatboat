
const express = require('express');
const { dbConnect } = require('./config/databse');
const {cloudinaryConnect} = require('./config/cloudinary');
const routes = require('./routes/routeHandler');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://interactivepdfchatboat.netlify.app");
    // Add other headers as needed
    next();
});


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))


app.listen(process.env.PORT,()=>{
    console.log("server Started")
})

app.use('/api',routes)
cloudinaryConnect();
dbConnect();
