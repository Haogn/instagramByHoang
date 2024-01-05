import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FriendProfile() {
  //data user đăng nhập
  const [dataUser, setDataUser] = useState([]);
  const [listPost, setListPost] = useState([]);

  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setDataUser(result.data);
  };

  const loadPost = async () => {
    let result = await axios.get("http://localhost:6886/post");
    setListPost(result.data);
  };
  const userLogin = dataUser.filter((item) => item.status === true);
  const userNoLogin = dataUser.filter((item) => item.status === false);

  // console.log("userNoLogin", userNoLogin);

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

  let userId = useParams();
  //   console.log(typeof userId.userId);
  //   console.log("userNoLogin", typeof userNoLogin);

  useEffect(() => {
    loadUser();
    loadPost();
  }, []);

  const profileUserNoLogin = userNoLogin.find(
    (user) => user.id.toString() === userId.userId
  );

  let activeAvatarsNoLogin = null;
  for (let i = 0; i < profileUserNoLogin?.avata.length; i++) {
    if (profileUserNoLogin?.avata[i].activeAvata === true) {
      activeAvatarsNoLogin = profileUserNoLogin?.avata[i].image;
    }
  }

  const filterPost = listPost.filter(
    (item) => item.idUser === profileUserNoLogin.userName
  );
  //   console.log("activeAvatarsNoLogin", activeAvatarsNoLogin);

  //   console.log("profileUserNoLogin", profileUserNoLogin);

  // handleFollowing

  const findUserById = async (idUser) => {
    return axios
      .get(`http://localhost:6886/user/${idUser}`)
      .then((resp) => resp.data);
  };

  const updateFollowers = async (idUser, followersed) => {
    await axios.patch(`http://localhost:6886/user/${idUser}`, {
      followers: followersed,
    });
    loadUser();
  };

  const updateFollowing = async (idUser, followinges) => {
    await axios.patch(`http://localhost:6886/user/${idUser}`, {
      following: followinges,
    });
    loadUser();
  };

  // followers
  const handleFollowers = async (idUser) => {
    const followersed = await findUserById(idUser);
    let check = followersed.followers.includes(profileUserNoLogin.id);
    if (check) {
      console.log("đã follo");
      let indexFind = followersed.followers.indexOf(profileUserNoLogin.id);
      followersed.followers.splice(indexFind, 1);
    } else {
      console.log("chưa follo");
      followersed.followers.push(idUser);
    }
    updateFollowers(idUser, followersed.followers);
  };

  // following
  const handleFollowing = async (idUser) => {
    const followinges = await findUserById(idUser);
    let check = followinges.following.includes(userLogin[0]?.id);
    if (check) {
      console.log("đã follo");
      let indexFind = followinges.following.indexOf(userLogin[0]?.id);
      followinges.following.splice(indexFind, 1);
    } else {
      console.log("chưa follo");
      followinges.following.push(idUser);
    }
    updateFollowing(idUser, followinges.following);
  };

  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center ml-16">
        <div>
          <div className="h-[250px] w-[940px] flex flex-row mt-2">
            {/* avata */}
            <div className="h-[150px] w-[235px] ">
              <div className="w-[150px] h-[150px] ">
                <img
                  className="w-[150px] h-[150px] rounded-[50%] object-cover "
                  src={activeAvatarsNoLogin}
                  alt=""
                />
              </div>
            </div>
            {/* thông tin */}
            <div className="w-[645px] flex flex-col justify-around">
              {/* 1 */}
              <div className=" w-[645px] flex items-center justify-between">
                <div className=" w-[140px] h-[25px] ml-2 ">
                  <p className="text-2xl font-semibold">
                    {profileUserNoLogin?.userName}
                  </p>
                </div>

                <div
                  onClick={() => {
                    handleFollowers(profileUserNoLogin?.id);
                    handleFollowing(userLogin[0]?.id);
                  }}
                  className="px-4"
                >
                  {profileUserNoLogin?.followers?.includes(
                    profileUserNoLogin?.id
                  ) ? (
                    <div className="flex">
                      <div className="px-4">
                        <button className="bg-zinc-200 h-[32px] w-[180px] rounded-lg">
                          Đang theo dõi
                        </button>
                      </div>

                      <div className="px-4">
                        <button className="bg-zinc-200 h-[32px] w-[180px] rounded-lg">
                          Nhắn tin
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button className="bg-blue-600 text-white h-[32px] w-[150px] rounded-lg">
                      Theo dõi
                    </button>
                  )}
                </div>

                <div className="p-2">
                  <i className="fa-solid fa-ellipsis text-2xl"></i>
                </div>
              </div>
              {/* 2 */}
              <div className="  w-[645px] flex items-center justify-between text-center">
                <div className=" h-[32px] w-[140px] ">
                  <p className="ml-2">
                    <strong>{filterPost?.length}</strong> Bài viết
                  </p>
                </div>

                <div className=" h-[32px] w-[200px]">
                  <p>
                    <strong>{profileUserNoLogin?.followers.length}</strong>{" "}
                    Người theo dõi
                  </p>
                </div>

                <div className=" h-[32px] w-[305px]">
                  <p>
                    Đang theo dõi{" "}
                    <strong>{profileUserNoLogin?.following.length}</strong>{" "}
                    người dùng
                  </p>
                </div>
              </div>
              {/* 3 */}
              <div className=" w-[645px] ">
                <div className="ml-2">
                  <p className="font-semibold">Tên đây đủ tài khoản khác</p>
                  <p className="opacity-70">
                    ★ Fitness Lover ★ Big Dreamer ★ Love Travelling ★
                    Photography ❤ ★ I ❣️ Vietnames ★
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                {filterPost?.map((value) => (
                  <div className="post-personal h-[300px] w-[300px] ">
                    <img
                      className="object-cover rounded-lg h-[309px] w-[309px]  "
                      //   src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
                      src={value.image}
                      alt=""
                    />
                    <div className="overlay">
                      <div className="overlay-text flex justify-between">
                        <div>
                          <i className="fa-solid fa-comment"></i>{" "}
                          <span>{value.commentPost.length}</span>
                        </div>
                        <div>
                          <i className="fa-solid fa-heart"></i>{" "}
                          <span>{value.commentPost.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendProfile;
