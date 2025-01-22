import React, { useEffect, useState } from "react";
import axios from "axios";
import WatchList from "./WatchList"; // Import the WatchList component
import "./WatchEpisode.css"; // Import CSS for styling

const WatchEpisode = () => {
  const [playlists, setPlaylists] = useState([]); // State to store playlists

  // Fetch playlists with episodes from the backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get("http://localhost:8000/playlist/all");
        setPlaylists(response.data); // Store playlists in the state
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="watch-episode-container">
      <h1 className="page-title">Watch Episodes</h1>
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <div className="playlist-container" key={playlist._id}>
            <h2 className="playlist-title">{playlist.name}</h2>
            <WatchList episodes={playlist.episodes} />
          </div>
        ))
      ) : (
        <div className="loading-container">
          <p className="loading-text">Loading playlists...</p>
        </div>
      )}
    </div>
  );
};

export default WatchEpisode;
