
const express = require('express');
const { dbConnect } = require('./config/databse');
const {cloudinaryConnect} = require('./config/cloudinary');
const routes = require('./routes/routeHandler');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://pdfchatboat.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
