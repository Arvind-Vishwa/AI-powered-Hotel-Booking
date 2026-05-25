const path=require('path');

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const express = require("express");
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

console.log(process.env.GOOGLE_GENAI_API_KEY);

const genAI =
new GoogleGenerativeAI(
  process.env.GOOGLE_GENAI_API_KEY
);

const model =
genAI.getGenerativeModel({

  model: "gemini-1.5-flash-latest",
  generationConfig: {
    responseMimeType: "application/json",
  },

});

module.exports = model;