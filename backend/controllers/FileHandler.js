
const cloudinary = require('cloudinary').v2;
const File = require('../models/File')
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const pc = require('../config/pinecone')
const { PineconeStore } = require('@langchain/pinecone');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// ✅ Import Gemini embeddings
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");

exports.fileUploader = async (req, res) => {
    try {
        const { email } = req.body;
        const details = await User.findOne({ email: email })
        const userid = details._id; 
        const PDF = req.files.file;

        if (!PDF) {
            return res.status(400).json({
                success: false,
                message: "please choose the file"
            });
        }  
        console.log(email)
        const subcription = await Subscription.findOne({email:email})
        console.log(subcription) 
        if (PDF.size > 4194304 && !subcription) {
            return res.status(400).json({
                success: false,
                message: "Please take subscription"
            });
        }

        const response = await cloudinary.uploader.upload(
            PDF.tempFilePath,
            { folder: "PDF document", resource_type: "auto", allowed_formats: "pdf" }
        );

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "error while uploading file"
            });
        }

        const fileResponse = await File.create({
            email: email,
            name: PDF.name,
            url: response.secure_url,
            userid: userid
        });

        try {
            // Load PDF
            const file = await fetch(fileResponse.url);
            const blob = await file.blob();
            const loader = new PDFLoader(blob);
            const pageLevel = await loader.load();

            // ✅ Use Gemini embeddings
            const embeddings = new GoogleGenerativeAIEmbeddings({
                apiKey: process.env.GOOGLE_API_KEY,
                model: "text-embedding-004" // latest Gemini embedding model
            });
 
            const pineconeIndex = await pc.index("pdfchatbot");

            await PineconeStore.fromDocuments(
                pageLevel,
                embeddings,
                {
                    pineconeIndex,
                    namespace: fileResponse._id.toString()
                }
            );

        } catch (e) {
            console.error("Pinecone/Gemini Error:", e);
            return res.status(400).json({
                success: false,
                message: "Error while processing embeddings/Pinecone"
            });
        }

        res.status(200).json({
            success: true,
            response,
            fileResponse,
            message: "File uploaded and embedded successfully with Gemini"
        });

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: "something went wrong"
        });
    }
};


exports.allFiles = async (req,res)=>{
    try{
       
        const {email} = req.body;
        const response = await File.find({email:email})

         if (!response){
            res.status(400).json({
                success:false,
                message:"the files are not present"
            })
        } 
        const array = [];

        response.map((obj)=>{
            const data = {
                fileUrl : obj.url,
                fileid : obj._id
            }
            array.push(data)
        })

        res.status(200).json({
            success:true,
            array,
            message:"retrived succesfully"
        }
        )

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            success:false,
            message:"could not retrived"
        })
    }
}

exports.fileDelete = async (req,res)=>{
    try{
 
        const{fileid} = req.body;
        const response = await File.findByIdAndDelete(fileid);
       
        res.status(200).json(
            {
                success:true,
                message:"deleted succesfully"
            }
        )
    }
    catch(e){
        
        console.log(e)
        res.status(200).json(
            {
                success:true,
                message:"deleted succesfully"
            }
        )
    }
}