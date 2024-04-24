const pc = require("../config/pinecone");
const {OpenAIEmbeddings} = require('@langchain/openai');
const { PineconeStore } = require('@langchain/pinecone');
const File = require('../models/File')
require('dotenv').config()
const openai = require('../config/openai');
const { OpenAIStream, StreamingTextResponse, streamToResponse } = require("ai");
const Query = require("../models/Query");


exports.queryHandler = async (req, res) => {
    try {
 
       const { email, query, fileid } = req.body;
       
        if (!email || !query || !fileid) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        }

        const file = await File.findById(fileid);
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File not found. Please upload a file."
            });
        }
       
        const pineconeIndex = pc.Index("interactive-pdf-chatboat");
        const embedding = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
        });

        
        const result = await PineconeStore.fromExistingIndex(embedding, {
            pineconeIndex,
            namespace: fileid
        });

        const answer = await result.similaritySearch(query, 6);

        const prevQuery = await Query.find({fileid:fileid})
        
        var response;
        try{
             response = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful assistant." }, {
                    role: 'user',
                    content:`Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
                    CONTEXT:
    
                      ${answer.map((r) => r.pageContent).join('\n\n')}

                    PREVIOUS CONVERSATION:
                        ${prevQuery.map((r) => r.answer)}
                    USER INPUT: ${query}`
                         },],
                model: "gpt-3.5-turbo",
               
                stream:true
              })
            
        }
        catch(e){
            console.log(e)
        }
        const stream =  OpenAIStream(response);
        streamToResponse(stream,res)
        
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: "Something went wrong in query handler"
        });
    }
};

exports.createQuery = async (req,res)=>{

    try {
 
        const { email, query, fileid,answer } = req.body;
        
         if (!email || !query || !fileid || !answer) {
             return res.status(400).json({
                 success: false,
                 message: "All fields are mandatory"
             });
         }

        await Query.create({email:email,question:query,fileid:fileid,answer:answer})

        } catch (e) {
            console.log(e);
            res.status(400).json({
                success: false,
                message: "Something went wrong in query handler"
            });
        } 
        

}
