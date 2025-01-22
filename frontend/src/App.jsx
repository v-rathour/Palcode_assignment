import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "./components/auth/Signup";
import LoginPage from "./components/auth/Login";
import Navbar from "./components/partials/Navbar";
import Home from "./components/Home/Home";
import UserProfile from "./components/partials/UserProfile";
import ProfilePage from "./components/Profile/ProfilePage";
import EditPassword from "./components/Profile/EditPassword";
import PlaylistAdd from "./components/PlayList/PlayListAdd";
import AddEpisode from "./components/Episode/AddEpisode";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/">
          {/* <Route path="signup" element={<SignUpPage/>} /> */}
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="password" element={<EditPassword />} />
        </Route>
        
        <Route path="/playlist/">
            <Route path="add" element={<PlaylistAdd/> } />
        </Route>

        <Route path="/episode/">
          <Route path="add" element={<AddEpisode />} />
        </Route>

        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
