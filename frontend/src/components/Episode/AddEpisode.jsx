import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const AddEpisode = () => {
  const location = useLocation(); // Retrieve the location (state)
  const playlist = location.state?.playlist; // Get playlist from state
  const [episodeData, setEpisodeData] = useState({
    title: "",
    description: "",
    duration: "",
    videoUrl: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpisodeData({ ...episodeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log(playlist._id);
    try {
      const response = await axios.post(
        `http://localhost:8000/playlist/${playlist._id}/episodes`,
        episodeData
      );
      // const newEpisode = response.data;

      // await axios.put(`http://localhost:8000/playlists/${playlist._id}`, {
      //   episodeId: newEpisode._id,
      // });

      setSuccess("Episode added successfully!");
      setEpisodeData({
        title: "",
        description: "",
        duration: "",
        videoUrl: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add episode.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Episode
        </Typography>

        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="primary" align="center" gutterBottom>
            {success}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={episodeData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={episodeData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration (seconds)"
                name="duration"
                value={episodeData.duration}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video URL"
                name="videoUrl"
                value={episodeData.videoUrl}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Episode
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEpisode;
