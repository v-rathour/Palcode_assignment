import { useState, useEffect } from "react";
import axios from "axios";
import "./Playlist.css";

const PlayListSelect = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get("http://localhost:8000/playlist/all");
        setPlaylists(response.data);
      } catch (err) {
        setError("Error fetching playlists!");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlist-container">
      {/* Playlist Dropdown */}
      <div className="playlist-select">
        <select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
          className="dropdown"
          disabled={loading}
        >
          <option value="">Playlist</option>
          {loading ? (
            <option>Loading...</option>
          ) : error ? (
            <option>{error}</option>
          ) : playlists.length > 0 ? (
            playlists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.name}
              </option>
            ))
          ) : (
            <option>No playlists available</option>
          )}
        </select>
      </div>

      {/* Section Dropdowns */}
      <div className="section-dropdowns">
        <div>
          <select className="dropdown">
            <option value="">Story</option>
            <option value="share">Share Your Story</option>
            <option value="create">Create a New Story</option>
          </select>
        </div>

        <div>
          <select className="dropdown">
            <option value="">Live Commerce</option>
            <option value="explore">Explore Features</option>
            <option value="boost">Boost Your Sales</option>
          </select>
        </div>

        <div>
          <select className="dropdown">
            <option value="">One Click Post </option>
            <option value="publish">Publish a Post</option>
            <option value="manage">Manage Posts</option>
          </select>
        </div>

        <div>
          <select className="dropdown">
            <option value="">Calendar</option>
            <option value="plan">Plan Posts</option>
            <option value="schedule">Schedule Tasks</option>
          </select>
        </div>

        <div>
          <select className="dropdown">
            <option value="">Revenue</option>
            <option value="analyze">Analyze Revenue</option>
            <option value="track">Track Performance</option>
          </select>
        </div>

        <div>
          <select className="dropdown">
            <option value="">Hire Influencer</option>
            <option value="connect">Connect with Influencers</option>
            <option value="expand">Expand Your Reach</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlayListSelect;
