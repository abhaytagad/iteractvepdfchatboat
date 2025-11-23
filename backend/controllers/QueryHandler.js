const pc = require("../config/pinecone");
const { PineconeStore } = require('@langchain/pinecone');
const File = require('../models/File');
const Query = require("../models/Query");
const { AsyncCaller } = require('@langchain/core/utils/async_caller');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const embeddings = require("../config/embeddings"); // ✅ your Gemini embedding wrapper

const caller = new AsyncCaller({ maxConcurrency: 2 });

// ---------- Query Handler with Gemini ----------
exports.queryHandler = async (req, res) => {
  try {
    const { email, query, fileid } = req.body;
    console.log("User query:", query);

    if (!email || !query || !fileid) {
      return res.status(400).json({ success: false, message: "All fields are mandatory" });
    }

    const file = await File.findById(fileid);
    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
 
    // Pinecone setup
    const pineconeIndex = pc.Index("pdfchatbot");
    const vectorStore = await caller.call(() =>
      PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        namespace: fileid.toString()
      })
    );

    // Get context from Pinecone
    const context = await caller.call(() => vectorStore.similaritySearch(query, 6));
    const contextText = context.map(({ pageContent }) => pageContent).join('\n\n');

    // Get previous conversation
    const previousQueries = await Query.find({ fileid }).limit(3).sort({ createdAt: -1 });
    const previousConversation = previousQueries
      .map(q => `Q: ${q.question}\nA: ${q.answer}`)
      .join('\n\n');

    // Setup Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chatPrompt = `
You are a chatbot that ONLY answers based on the given context.
If the answer is not in the provided context, reply with:
"I don't know. My knowledge is limited to the uploaded document."

Context: 
${contextText}

Previous conversation:
${previousConversation || "None"}

User question: ${query}
`;

    // Setup streaming headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    let fullResponse = '';

    // Gemini streaming
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: chatPrompt }]}],
    });

    for await (const chunk of result.stream) {
      const token = chunk.text();
      if (token) {
        fullResponse += token;
        res.write(token);
      }
    }

    // Save query in DB
    const newQuery = new Query({
      email,
      question: query,
      fileid,
      answer: fullResponse
    });
    await newQuery.save();

    res.end();

  } catch (error) {
    console.error('Gemini Query Error:', error);
    res.write(`data: [ERROR] ${error.message}\n\n`);
    res.end();
  }
};



exports.createQuery = async (req, res) => {
  try {
    // const { email, query, fileid, answer } = req.body;
    
    // if (!email || !query || !fileid || !answer) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are mandatory"
    //   });
    // }

    // await Query.create({
    //   email,
    //   question:query,
    //   answer:answer, // Changed from 'question' to match model
    //   fileid,
    
    // });

    return res.status(200).json({
      success: true,
      message: "Query recorded successfully"
    });

  } catch (e) {
    console.error('Create query error:', e);
    return res.status(500).json({
      success: false,
      message: "Error saving query history"
    });
  }
}; 
