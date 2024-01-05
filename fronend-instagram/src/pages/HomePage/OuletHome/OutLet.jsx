import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import OnlySidebar from "../../../components/OnlySidebar/OnlySidebar";
import axios from "axios";

function OutLet({ handleReloadPost }) {
  //data user đăng nhập
  const [login, setLogin] = useState([]);
  const [loader, setLoader] = useState(false);

  //
  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setLogin(result.data);
  };

  //
  const userLogin = login.filter((item) => item.status === true);
  // console.log("userLogin", userLogin);

  const activeAvatars = userLogin.map((user) => {
    const activeAvata = user.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });

  // console.log("Active Avatars", activeAvatars);

  const [toggleSideBar, setToggleSideBar] = useState(true);
  // search
  const [showSearch, setShowSearch] = useState(false);
  // thông báo
  const [showNoti, setShowNoti] = useState(false);
  // mess
  const [showMess, setShowMess] = useState(false);

  // toggle side bar
  const handleToggleSidebar = () => {
    setToggleSideBar(true);
  };

  // toggle search
  const handleOnSearch = () => {
    setToggleSideBar(false);
    setShowSearch(!showSearch);
  };

  const handleOffSearch = () => {
    setToggleSideBar(true);
    setShowSearch(!showSearch);
  };

  // toggle thông báo
  const handleOnNoti = () => {
    setToggleSideBar(false);
    setShowNoti(!showNoti);
  };
  const handleOffNoti = () => {
    setToggleSideBar(true);
    setShowNoti(!showNoti);
  };

  // toggle mess
  const handleOnMess = () => {
    setToggleSideBar(false);
    setShowMess(!showMess);
  };

  const handleOffMess = () => {
    setToggleSideBar(true);
    setShowMess(!showMess);
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      {/* <div className="wapper-super">
        <Header /> */}
      <div className="h-screen w-screen flex">
        <div>
          {toggleSideBar ? (
            <Sidebar
              activeAvatars={activeAvatars}
              handleOnSearch={handleOnSearch}
              handleOnNoti={handleOnNoti}
              handleOnMess={handleOnMess}
              handleReloadPost={handleReloadPost}
            />
          ) : (
            <OnlySidebar
              activeAvatars={activeAvatars}
              handleOffSearch={handleOffSearch}
              handleOffNoti={handleOffNoti}
              toggleSearch={showSearch}
              toggleNoti={showNoti}
              handleOffMess={handleOffMess}
              handleToggleSidebar={handleToggleSidebar}
            />
          )}
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default OutLet;
