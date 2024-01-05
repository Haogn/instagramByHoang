import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Discover from "../Discover/Discover";
import Message from "../Message/Message";
import OutLet from "../HomePage/OuletHome/OutLet";
import LoginUser from "../Login/LoginUser";
import Signin from "../Signin/Signin";
import StoryPage from "../StoryPage/StoryPage";
import Friend from "../Friend/Friend";
import FriendProfile from "../Friend/FriendProfile";

function RouterPage() {
  const [reloadPost, setReloadPost] = useState(true);

  const handleReloadPost = () => {
    setReloadPost(!reloadPost);
  };

  return (
    <Routes>
      <Route path="/" element={<OutLet handleReloadPost={handleReloadPost} />}>
        <Route index element={<HomePage reloadPost={reloadPost} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/message" element={<Message />} />
        <Route path="/friend" element={<Friend />}>
          <Route path=":userId" element={<FriendProfile />} />
        </Route>
      </Route>
      <Route path="/story" element={<StoryPage />}></Route>
      <Route path="/login-user" element={<LoginUser />}></Route>
      <Route path="/signin-user" element={<Signin />}></Route>
    </Routes>
  );
}

export default RouterPage;
