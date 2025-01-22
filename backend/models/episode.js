const mongoose = require("mongoose");

// Episode Schema
const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in seconds
    videoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Episode = mongoose.model("Episode", EpisodeSchema);

module.exports = Episode;
