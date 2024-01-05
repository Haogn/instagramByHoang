import React, { useEffect, useState } from "react";
import "./OnlySidebar.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import axios from "axios";

function OnlySidebar({
  handleOffSearch,
  toggleSearch,
  handleOffNoti,
  toggleNoti,
  handleOffMess,
  handleToggleSidebar,
}) {
  const [login, setLogin] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  const [listPost, setListPost] = useState([]);

  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setLogin(result.data);
  };

  const loadPost = async () => {
    let result = await axios.get(`http://localhost:6886/post`);
    setListPost(result.data);
  };

  const loadUserSearch = async () => {
    let result = await axios.get(`http://localhost:6886/user?q=${valueSearch}`);
    setUserSearch(result.data);
  };
  console.log(listPost);

  const userLogin = login.filter((item) => item.status === true);
  // console.log("userLogin", userLogin);

  const activeAvatars = userLogin.map((user) => {
    const activeAvata = user.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });

  // console.log(userSearch);
  const activiveAvaUserSe = userSearch?.map((user) => {
    const activeAvata = user.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });
  // console.log(activiveAvaUserSe);
  // console.log(userSearch);

  useEffect(() => {
    loadUser();
    loadUserSearch();
    loadPost();
  }, [valueSearch]);
  return (
    <div>
      <div className=" w-[400px] h-screen  fixed top-0 left-0 flex">
        {/* trái */}
        <div className="w-[80px] border-r border-zinc-300 px-2 text-center">
          <div className="h-screen pt-[8px] pb-[20px] flex flex-col items-center">
            {/* logo */}
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <div
                onClick={handleToggleSidebar}
                className="hover:bg-slate-100 rounded-xl w-[48px] h-[73px] pb-[23px] mt-[12px]  "
              >
                <div className="w-[48px] h-[48px] py-3  ">
                  <span className="text-3xl ">
                    <i className="fa-brands fa-instagram "></i>
                  </span>
                </div>
              </div>
            </Link>

            {/* home */}
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <div
                onClick={handleToggleSidebar}
                className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] "
              >
                <div className="w-12 h-12 py-3 mb-5">
                  <span className="hover:text-[26px] text-2xl">
                    <i className="fa-solid fa-house"></i>
                  </span>
                </div>
              </div>
            </Link>

            {/* search */}
            <div className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px]">
              <div className="w-12 h-12 py-3 mb-5">
                <span className="hover:text-[26px] text-2xl">
                  <i
                    onClick={handleOffSearch}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </span>
              </div>
            </div>
            {/* khám phá */}
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/discover"
            >
              <div
                onClick={handleToggleSidebar}
                className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] "
              >
                <div className="w-12 h-12 py-3 mb-5">
                  <span className="hover:text-[26px] text-2xl">
                    <i className="fa-regular fa-compass"></i>
                  </span>
                </div>
              </div>
            </Link>

            {/* Reels */}
            <Link style={{ textDecoration: "none", color: "black" }} to="">
              <div
                onClick={handleToggleSidebar}
                className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] "
              >
                <div className="w-12 h-12 py-3 mb-5">
                  <span className="hover:text-[26px] text-2xl">
                    <i className="fa-solid fa-film"></i>
                  </span>
                </div>
              </div>
            </Link>

            {/* tin nhắn */}
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/message"
            >
              <div
                onClick={handleOffMess}
                className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] "
              >
                <div className="w-12 h-12 py-3 mb-5">
                  <span className="hover:text-[26px] text-2xl">
                    <i
                      // onClick={handleOffMess}
                      className="fa-brands fa-facebook-messenger"
                    ></i>
                  </span>
                </div>
              </div>
            </Link>

            {/* Thông báo */}
            <div
              onClick={handleToggleSidebar}
              className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] "
            >
              <div className="w-12 h-12 py-3 mb-5">
                <span className="hover:text-[26px] text-2xl">
                  <i
                    onClick={handleOffNoti}
                    className="fa-regular fa-heart"
                  ></i>
                </span>
              </div>
            </div>

            {/* new post */}
            <div className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] ">
              <div className="w-12 h-12 py-3 mb-5">
                <span className="hover:text-[26px] text-2xl">
                  <i className="fa-regular fa-square-plus"></i>
                </span>
              </div>
            </div>

            {/* profile */}
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/profile"
            >
              <div className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] ml-[10px]">
                <div className="w-10 h-10 text-center my-3 ">
                  <img
                    className="w-full h-full rounded-[50%] object-cover "
                    src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </Link>

            {/* Chuyển chế độ tối màu */}
            <div className="hover:bg-slate-100 rounded-xl h-[48px] w-[48px] mt-40">
              <div className="w-12 h-12 p-3 mb-5">
                <span className="hover:text-[26px] text-2xl">
                  <i className="fa-solid fa-moon"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* phải */}

        {/* bật tìm kiếm */}
        {toggleSearch && (
          <div className="sidebar-serch">
            <div className="bg-white w-[310px] shadow-[7px_5px_15px_0_#d5d5d5] h-[715px] rounded-r-3xl  ">
              {/* o input */}
              <div className=" h-[145px] border-b border-zinc-300  ">
                <h4 className="pt-4 pl-4">Tìm Kiếm</h4>
                <div className="ml-2 mt-4">
                  <input
                    className="w-[290px] h-[40px] py-1 px-4  rounded-2xl relative bg-slate-200 outline-none  "
                    type="text"
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                    placeholder="Tìm kiếm"
                  />
                  {valueSearch && (
                    <span className="absolute top-[85px] right-[40px]">
                      <i
                        onClick={() => setValueSearch("")}
                        className="fa-solid fa-circle-xmark opacity-50"
                      ></i>
                    </span>
                  )}
                </div>
              </div>
              {/* ket qua tim kiem */}
              <div className="px-3 py-3 h-full">
                {/* item */}
                {userSearch.map((item, index) => (
                  <div className="h-11 w-[290px] flex flex-row items-center mt-2 ">
                    <div className=" w-[56px] h-[44px]">
                      <img
                        className="w-[44px] h-[44px] object-cover rounded-[50%] "
                        // src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-dep-che-mat-cuc-chat.jpg"
                        src={activiveAvaUserSe[index]}
                        alt=""
                      />
                    </div>
                    <div className=" w-[220px] h-[36px] ">
                      <h6>{item?.userName}</h6>
                      <p className="opacity-60">{item?.fullName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* bật thông báo */}
        {toggleNoti && (
          <div className="sidebar-noti">
            <div className="bg-white w-[310px] shadow-[7px_5px_15px_0_#d5d5d5] h-[715px] rounded-r-3xl  ">
              {/* o input */}
              <div className=" h-[80px] border-b border-zinc-300  ">
                <h4 className="pt-4 pl-4">Thông báo</h4>
              </div>
              {/* ket qua tim kiem */}
              <div className="px-3 py-3 h-full">
                {/* item like*/}
                <div className="h-15 w-[290px] flex flex-row items-center">
                  <div className=" w-[56px] h-[44px]">
                    <img
                      className="w-[44px] h-[44px] object-cover rounded-[50%] "
                      src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-dep-che-mat-cuc-chat.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-[220px] h-[45px] ">
                    <p className="h-full w-full">
                      <strong>Tên người dùng</strong> đã thích bài đăng của bạn{" "}
                      <i className="fa-solid fa-heart text-red-600"></i>
                    </p>
                  </div>
                </div>

                {/* item coment*/}
                <div className="h-15 w-[290px] flex flex-row items-center mt-3">
                  <div className=" w-[56px] h-[44px]">
                    <img
                      className="w-[44px] h-[44px] object-cover rounded-[50%] "
                      src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-xinh-che-mat-cuc-dep.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-[220px] h-[45px] ">
                    <p className="h-full w-full">
                      <strong>Tên người dùng</strong> đã thêm bình luận vào bài
                      đăng của bạn{" "}
                      <i className="fa-solid fa-comments text-green-700"></i>
                    </p>
                  </div>
                </div>

                {/* item share*/}
                <div className="h-15 w-[290px] flex flex-row items-center mt-3">
                  <div className=" w-[56px] h-[44px]">
                    <img
                      className="w-[44px] h-[44px] object-cover rounded-[50%] "
                      src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/gai-xinh-chup-anh-bien-chieu-600x800.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-[220px] h-[45px] ">
                    <p className="h-full w-full">
                      <strong>Tên người dùng</strong> đã chia sẻ bài đăng của
                      bạn{" "}
                      <i className="fa-solid fa-share-from-square  text-pink-800"></i>
                      {/* <i className="fa-regular fa-share-from-square"></i> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// npx tailwindcss -i src/tailwind.css -o public/css/style.css --watch

export default OnlySidebar;
