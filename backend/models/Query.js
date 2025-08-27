
const mongoose  = require('mongoose')

const querySchema = new mongoose.Schema(
    {
        email:{
            type:String,
           
        },
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        fileid:
        {
                type : mongoose.Schema.Types.ObjectId,
                ref:"File"
        }
        ,
        userid:
            {
                type : mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        
    }
)

module.exports = mongoose.model('Query',querySchema)