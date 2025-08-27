const { Pinecone } = require('@pinecone-database/pinecone');
require("dotenv").config();
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  
});


  
module.exports = pc;  