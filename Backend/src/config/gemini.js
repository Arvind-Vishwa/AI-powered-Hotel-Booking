require("dotenv").config();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

if (!process.env.Gemini_API_Key) {

  throw new Error(
    "GOOGLE_GENAI_API_KEY missing in .env"
  );
}

const genAI =
new GoogleGenerativeAI(
  process.env.Gemini_API_Key
);

const model =
genAI.getGenerativeModel({

  model: "gemini-1.5-flash",

});

module.exports = model;