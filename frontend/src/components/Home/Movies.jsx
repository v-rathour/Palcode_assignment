import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Movies = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch the playlists on initial load
    axios
      .get("http://localhost:8000/playlist/all") // Replace with your API URL
      .then((response) => {
        setPlaylists(response.data); // Assuming the response contains an array of playlists
        toast.success("Playlists fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
        toast.error("Failed to fetch playlists. Please try again.");
      });
  }, []); // Use an empty dependency array to fetch playlists only once

  // Function to update the playlist order both in the state and on the backend
  const movePlaylist = (fromIndex, toIndex) => {
    const updatedPlaylists = [...playlists];
    const [movedPlaylist] = updatedPlaylists.splice(fromIndex, 1); // Remove the playlist from its original position
    updatedPlaylists.splice(toIndex, 0, movedPlaylist); // Insert it at the new position
    setPlaylists(updatedPlaylists); // Update the state with the new playlist order

    // Prepare the new order (array of playlist IDs)
    const updatedOrder = updatedPlaylists.map((playlist) => playlist._id); // Assuming each playlist has a unique _id
    console.log("Updated Order: ", updatedOrder);

    // Send the updated order to the backend
    axios
      .put(`http://localhost:8000/playlist/${playlists[0]._id}/order`, {
        order: updatedOrder,
      }) // Update the order on the server
      .then((response) => {
        console.log("Order updated successfully", response);
        toast.success("Playlist order updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        toast.error("Failed to update playlist order. Please try again.");
      });
  };

  return (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
        <MovieList movieData={playlists} movePlaylist={movePlaylist} />
      </DndProvider>
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

export default Movies;
