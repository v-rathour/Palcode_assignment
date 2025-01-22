const mongoose = require("mongoose");

// Playlist Schema
const PlaylistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
    orderIndex: { type: Number, default: 0 }, // This will store the order
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
