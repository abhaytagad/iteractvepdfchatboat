
const mongoose = require('mongoose');


const useSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        subscription:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subscription"
        },
        files:[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref:"File"
            }
        ]
        
    }
)



module.exports = mongoose.model("User",useSchema)