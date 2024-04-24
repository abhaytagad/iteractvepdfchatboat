const mongoose = require('mongoose')

exports.dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("DB conected")})
    .catch((e)=>{console.log("could not conect Succesfully")})
}