// import React from "react";
// import "./MoviePage.css"

// const MovieList = ({ movieData }) => {
//     console.log(movieData)
//   return (
//     <div className="movie-list">
//       {movieData.map((movie) => (
//         <div className="movie-item" key={movie.number}>
//           <img src={movie.image} alt={movie.name} />
//           <h3>{movie.name}</h3>
//           <p>Movie #{movie.number}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieList;


// import React from "react";
// import "./MoviePage.css"; // Import the CSS file for styling

// const MovieList = ({ movieData }) => {
//   return (
//     <div className="movie-list">
//       {movieData.map((movie, index) => (
//         <div className="movie-card" key={index}>
//           <img src={movie.imageUrl} alt={movie.name} className="movie-image" />
//           <div className="movie-details">
//             <h3 className="movie-name">{movie.name}</h3>
//             <p className="movie-number">Movie Number: {movie.number}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieList;


// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import axios
// import MovieCard from "./MovieCard"; // Import MovieCard component
// import "./MoviePage.css"; // Import the CSS file for styling

// const MovieList = ({ movieData }) => {
//   const [movies, setMovies] = useState([]); // Initial state as empty array

//   // Log the movieData prop to check if it's received properly
//   useEffect(() => {
//     console.log("Received movieData:", movieData);
//     if (movieData && movieData.length > 0) {
//       setMovies(movieData); // Set the movies state with movieData
//     }
//   }, [movieData]); // Run this effect only when movieData changes

//   const moveMovie = (fromIndex, toIndex) => {
//     const updatedMovies = [...movies];
//     const [movedMovie] = updatedMovies.splice(fromIndex, 1); // Remove the movie from its original position
//     updatedMovies.splice(toIndex, 0, movedMovie); // Insert it at the new position
//     setMovies(updatedMovies); // Update the state with the new movie order

//     // Prepare the updated order (array of movie IDs)
//     const updatedOrder = updatedMovies.map((movie) => movie._id); // Assuming each movie has a unique _id
//     console.log("Updated Order:", updatedOrder);

//     // Send the updated order to the backend
//     axios
//       .put(
//         `http://localhost:8000/playlist/order`,
//         {
//           order: updatedOrder,
//         }
//       ) // Update the order on the server
//       .then((response) => {
//         console.log("Order updated successfully", response);
//       })
//       .catch((error) => {
//         console.error("Error updating order:", error);
//       });
//   };

//   return (
//     <div className="movie-list">
//       {movies.map((movie, index) => (
//         <MovieCard
//           key={movie._id} // Use movie._id as the unique key
//           movie={movie}
//           index={index}
//           moveMovie={moveMovie}
//         />
//       ))}
//     </div>
//   );
// };

// export default MovieList;


import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard"; // Import MovieCard component
import "./MoviePage.css"; // Import the CSS file for styling

const MovieList = ({ movieData, movePlaylist }) => {
  const [playlists, setPlaylists] = useState(movieData);

  // Update playlists if the prop changes
  useEffect(() => {
    setPlaylists(movieData);
  }, [movieData]);

  const handleMove = (fromIndex, toIndex) => {
    movePlaylist(fromIndex, toIndex); // Move playlist
  };

  return (
    <div className="movie-list">
      {playlists.map((playlist, index) => (
        <MovieCard
          key={playlist._id}
          playlist={playlist}
          index={index}
          movePlaylist={handleMove}
        />
      ))}
    </div>
  );
};

export default MovieList;



