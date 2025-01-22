// import React from "react";
// import { useDrag, useDrop } from "react-dnd"; // Import react-dnd hooks
// import "./MoviePage.css"; // Import the CSS file for styling

// // Define the type for the drag-and-drop item
// const MOVIE = "MOVIE";

// const MovieCard = ({ movie, index, moveMovie }) => {
//   const [, drag] = useDrag(() => ({
//     type: MOVIE,
//     item: { index },
//   }));

//   const [, drop] = useDrop(() => ({
//     accept: MOVIE,
//     hover: (item) => {
//       if (item.index !== index) {
//         moveMovie(item.index, index); // Move movie to a new index
//         item.index = index; // Update the item's index
//       }
//     },
//   }));

//   return (
//     <div className="movie-card" ref={(node) => drag(drop(node))} key={index}>
//       <img src={movie.imageUrl} alt={movie.name} className="movie-image" />
//       <div className="movie-details">
//         <h3 className="movie-name">{movie.name}</h3>
//         <p className="movie-number">Movie Number: {movie.number}</p>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import React from "react";
import { useDrag, useDrop } from "react-dnd"; // Import react-dnd hooks
import "./MoviePage.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
// Define the type for the drag-and-drop item
const MOVIE = "MOVIE";

const MovieCard = ({ playlist, index, movePlaylist }) => {
  let navigate = useNavigate();
  const [, drag] = useDrag(() => ({
    type: MOVIE,
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: MOVIE,
    hover: (item) => {
      if (item.index !== index) {
        movePlaylist(item.index, index); // Move playlist to a new index
        item.index = index; // Update the item's index
      }
    },
  }));

  const handleAddButtonClick = () => {
    navigate("/episode/add", { state: { playlist } }); // Redirect to AddEpisode page
  };

  

  return (
    <div className="movie-card" ref={(node) => drag(drop(node))} key={index}>
      <img
        src={playlist.imageUrl}
        alt={playlist.name}
        className="movie-image"
      />
      <div className="movie-details">
        <h3 className="movie-name">{playlist.name}</h3>
        <p className="movie-description">
          {playlist.description.substring(0, 30)}
          {/* Display only first 15 characters */}
          {playlist.description.length > 15 ? "..." : ""}{" "}
          {/* Add ellipsis if the description is longer */}
        </p>
      </div>
      <div className="button-container">
        
        <button className="add-episode-btn" onClick={handleAddButtonClick}>
          Add Videos
        </button>
      </div>
      <div className="episode-number">
        <p>{playlist.episodes.length} Videos</p>
      </div>
    </div>
  );
};

export default MovieCard;
