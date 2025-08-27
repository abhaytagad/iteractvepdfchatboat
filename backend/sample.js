const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result));