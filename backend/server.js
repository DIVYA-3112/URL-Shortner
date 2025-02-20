require("dotenv").config({ path: "./backend/.env" });

const shortId = require("shortid");

const mongoose = require("mongoose");

const express = require("express");
const shortid = require("shortid");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const CONNECT_STRING = process.env.CONNECT_STRING;

app.listen(PORT, () => {
  console.log(`Server running on Port - ${PORT}`);
});

// database connection

mongoose
  .connect(CONNECT_STRING)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err, "Failed"));

// making routes

// making model for url

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    originalUrl: {
      type: String,
      required: true,
    },

    Visited: [{ Timestamp: { type: Number } }],
  },
  { timestamps: true }
);

// using mongoose schema

const URL = mongoose.model("url", urlSchema);

// inserting in database

async function generateShortUrl(req, res) {}

app.post("/api", async (req, res) => {
  const url = req.body.url;
  const shortId = shortid();
  console.log(shortId);
  console.log(url);

  if (!url) {
    return res.status(400).json({ msg: "Invalid URL" });
  }

  await URL.create({
    shortId: shortId,
    originalUrl: url,
    Visited: [{ Timestamp: Date.now() }],
  });

  res.status(200).json({ msg: `Successful, URL - ${url}` });
});

app.get("/api/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const url = await URL.findOne({
    shortId: shortId,
  });
  console.log(url);
  if (url) res.redirect(url.originalUrl);
  else res.status(404).send("Not Found");
});
