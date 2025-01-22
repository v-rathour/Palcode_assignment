import React from "react";
import "./WatchCard.css"; // Import CSS for styling

const WatchCard = ({ episode }) => {
  const { title, description, duration, videoUrl, createdAt } = episode;

  return (
    <div className="watch-card">
      <img src={videoUrl} alt={title} className="episode-thumbnail" />
      <div className="episode-details">
        <h3 className="episode-title">{title}</h3>
        <p className="episode-description">{description}</p>
        <p className="episode-duration">
          Duration: {Math.floor(duration / 60)} mins
        </p>
        <p className="episode-date">
          Released: {new Date(createdAt).toLocaleDateString()}
        </p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-link"
        >
          Watch Now
        </a>
      </div>
    </div>
  );
};

export default WatchCard;
