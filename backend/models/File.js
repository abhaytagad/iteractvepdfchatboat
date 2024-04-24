
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
       name:{
               type:String
          },
       email:{
               type:String,
               require:true
               
          },
       url:{
               type:String,
               require:true
          },
       query:[
          {
               type:mongoose.Schema.Types.ObjectId,
               ref:'Query'
          }
       ],
       uploadedAt:{
             type:Date,
             default:Date.now()
      },
      userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
      }
    }
)

module.exports = mongoose.model("File",fileSchema)