import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";

const PlaylistAdd = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const newPlaylist = {
      name,
      description,
      createdBy,
      imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/playlist/add",
        newPlaylist
      );
      console.log("Playlist added successfully:", response.data);
      // Reset form fields
      setName("");
      setDescription("");
      setCreatedBy("");
      setImageUrl("");
    } catch (err) {
      console.error("Error adding playlist:", err);
      setError("There was an error adding the playlist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography variant="h5">Create a New Playlist</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: "100%" }}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Playlist Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Created By"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />

          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            helperText="URL of the playlist image (optional)"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create Playlist"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PlaylistAdd;
