require("dotenv").config();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

if (!process.env.GOOGLE_GENAI_API_KEY) {

  throw new Error(
    "GOOGLE_GENAI_API_KEY missing in .env"
  );
}

const genAI =
new GoogleGenerativeAI(
  process.env.GOOGLE_GENAI_API_KEY
);

const model =
genAI.getGenerativeModel({

  model: "gemini-1.5-flash",

});

module.exports = model;