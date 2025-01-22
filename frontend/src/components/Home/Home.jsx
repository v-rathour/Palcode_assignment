import React from "react";
import "./HomePage.css"
import Movies from "./Movies";
import PlayList from "../PlayList/PlayList";
import WatchEpisode from "../Episode/WatchEpisode";



const Home = () => {
  return (
    <React.Fragment>
      <div className="grid-container">
        <div className="grid-item"><PlayList/></div>
        <div className="grid-item">
          <Movies />
        </div>
        <div className="grid-item">
          <WatchEpisode/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
