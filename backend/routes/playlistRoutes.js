const express = require("express");
const Playlist = require("../models/playlist");
const Episode = require("../models/episode");
const router = express.Router();

// Create a new playlist
router.post("/add", async (req, res) => {
  const { name, description, createdBy, imageUrl } = req.body;

  try {
    const newPlaylist = new Playlist({
      name,
      description,
      createdBy,
      imageUrl,
    });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    console.error("Error creating playlist:", err);
    res
      .status(500)
      .json({ message: "Error creating playlist", error: err.message });
  }
});

// Add an episode to a playlist
router.post("/:playlistId/episodes", async (req, res) => {
  const { playlistId } = req.params;
  const { title, description, duration, videoUrl } = req.body;
  console.log(title, description, duration, videoUrl);
  try {
    const newEpisode = new Episode({
      title,
      description,
      duration,
      videoUrl,
    });
    await newEpisode.save();

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.episodes.push(newEpisode._id);
    await playlist.save();

    res.status(201).json(newEpisode);
  } catch (err) {
    console.error("Error adding episode:", err);
    res
      .status(500)
      .json({ message: "Error adding episode", error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    // Fetch playlists and populate the 'episodes' field with episode details
    const playlists = await Playlist.find({})
      .sort({ orderIndex: 1 }) // Sort by orderIndex in ascending order
      .populate("episodes"); // Populate the episodes field

    if (playlists.length === 0) {
      return res.status(404).json({ message: "No playlists found" });
    }

    res.status(200).json(playlists);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res
      .status(500)
      .json({ message: "Error fetching playlists", error: err.message });
  }
});



// Fetch playlist with episodes
router.get("/:playlistId", async (req, res) => {
  const { playlistId } = req.params;
  const { episodeId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Add the new episode to the playlist's episodes array
    playlist.episodes.push(episodeId);
    await playlist.save();

    res.status(200).json({ message: "Episode added to playlist", playlist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update the episode order in a playlist
// Update the order of playlists
router.put("/:playlistId/order", async (req, res) => {
  const { playlistId } = req.params;
  const { order } = req.body;
  
  try {
    // Loop through the provided order and update the order in the database
    for (let i = 0; i < order.length; i++) {
      await Playlist.findByIdAndUpdate(order[i], { orderIndex: i });
    }
    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    console.error("Error updating order:", err);
    res
      .status(500)
      .json({ message: "Error updating order", error: err.message });
  }
});



module.exports = router;
