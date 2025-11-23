const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
require('dotenv').config()
console.log(process.env.GOOGLE_API_KEY)
// Gemini Embeddings Wrapper
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",   // official Gemini embeddings model
  apiKey: process.env.GOOGLE_API_KEY,
});

module.exports = embeddings;
