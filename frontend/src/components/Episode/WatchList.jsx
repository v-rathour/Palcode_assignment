import React from "react";
import WatchCard from "./WatchCard";
import "./WatchList.css"; // Import CSS for styling

const WatchList = ({ episodes }) => {
  return (
    <div className="watch-list">
      {episodes && episodes.length >= 1 ? (
        <div className="episodes-grid">
          {episodes.map((episode) => (
            <WatchCard key={episode._id} episode={episode} />
          ))}
        </div>
      ) : (
        <div className="no-episodes-container">
          <p className="no-episodes-text">No episode added in this playlist</p>
        </div>
      )}
    </div>
  );
};

export default WatchList;
