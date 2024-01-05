import React, { useEffect, useState } from "react";
import "./PostPersonal.css";
import axios from "axios";

function RepUserPostPart() {
  const [activeTab, setActiveTab] = useState();
  const tabs = [
    {
      tab: "BÀI VIẾT",
      ativeTab: "",
      icon: <i className="fa-solid fa-table-cells"></i>,
    },
    { tab: "ĐÃ LƯU", icon: <i className="fa-regular fa-bookmark"></i> },
    {
      tab: "ĐƯỢC GẮN THẺ",
      icon: <i className="fa-regular fa-address-card"></i>,
    },
  ];

  const [listPost, setListPost] = useState([]);
  const [login, setLogin] = useState([]);

  const loadPost = async () => {
    let result = await axios.get("http://localhost:6886/post");
    setListPost(result.data);
  };

  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setLogin(result.data);
  };

  const userLogin = login.filter((item) => item.status === true);

  const filterPost = listPost.filter(
    (item) => item.idUser === userLogin[0]?.userName
  );

  useEffect(() => {
    loadPost();
    loadUser();
  }, []);
  return (
    <div>
      <div className="h-screen w-[940px]">
        {/* chuyển tab */}
        <div className="flex justify-center space-x-14 border-t relative">
          {tabs.map((item, i) => (
            <div
              onClick={() => setActiveTab(item.tab)}
              key={i}
              className={`${
                activeTab === item.tab
                  ? "border-t border-black font-medium"
                  : "opacity-60"
              } flex items-center cursor-pointer py-2 text-sm`}
            >
              <p className="mr-2">{item.tab}</p>
              <p>{item.icon}</p>
            </div>
          ))}
        </div>

        {/* các tap */}
        <div>
          <div className="w-[940px] flex flex-wrap gap-3">
            {filterPost?.map((item) => (
              <div className="post-personal h-[300px] w-[300px] ">
                <img
                  className="object-cover rounded-lg h-[309px] w-[309px]  "
                  src={item.image}
                  alt=""
                />
                <div className="overlay">
                  <div className="overlay-text flex justify-between">
                    <div>
                      <i className="fa-solid fa-comment"></i>{" "}
                      <span>{item.commentPost.length}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-heart"></i>{" "}
                      <span>{item.likePost.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <PostPersonal /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepUserPostPart;
