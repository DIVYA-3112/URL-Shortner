const mongoose = require('mongoose');

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

module.exports = mongoose.model('Url', urlSchema);