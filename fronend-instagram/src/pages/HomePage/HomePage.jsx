import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Story from "../../components/Story/Story";
import NewsFeeds from "../../components/NewsFeeds/NewsFeeds";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage({ reloadPost }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataLogin"))
  );

  //data user đăng nhập
  const [dataUser, setDataUser] = useState([]);

  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setDataUser(result.data);
  };

  // lọc user đang đăng nhập
  const userLogin = dataUser.filter((item) => item.status === true);
  // console.log("userLogin", userLogin);

  // lọc user có status = false
  const userNoLogin = dataUser.filter((item) => item.status === false);
  // console.log("userNoLogin", userNoLogin);

  // lọc ra avataactive true của các user không đăng nhập
  const activeAvatarsNoLogin = userNoLogin.map((item) => {
    const activeAvata = item.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });
  // console.log("activeAvatarsNoLogin", activeAvatarsNoLogin);

  // lọc ra avata có active là true
  const activeAvatars = userLogin.map((item) => {
    const activeAvata = item.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });

  // console.log("Active Avatars", activeAvatars);

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className="wapper-homepage mt-3">
      <div className="body">
        {/* center */}
        <div className="body-center">
          {/* story */}

          <Story />

          {/* các bài post */}

          <div className="list-post">
            {/* bai post moi */}
            <NewsFeeds
              dataUser={dataUser}
              userLogin={userLogin}
              activeAvatars={activeAvatars}
              reloadPost={reloadPost}
            />
          </div>
        </div>

        {/* right */}
        <div className="body-right">
          <div className="account">
            <div className="account-main">
              <div className="account-left">
                <img
                  className="account-img"
                  // src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
                  src={activeAvatars}
                  alt=""
                />
              </div>
              <div className="account-center">
                <h6>{userLogin[0]?.userName}</h6>
                <p style={{ opacity: "0.5" }}>{userLogin[0]?.fullName}</p>
              </div>
              <div className="account-right">
                <button className="follow">
                  <h6>Chuyển</h6>
                </button>
              </div>
            </div>
            <div className="account-second">
              <div className="suggest">
                <div>
                  <h6 style={{ opacity: "0.5" }}>Gợi ý cho bạn</h6>
                </div>
                {/* item */}
                {userNoLogin?.map((val, index) => (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/friend/${val.id}`}
                  >
                    <div className="account-suggest">
                      <div className="account-left">
                        <img
                          className="account-img"
                          src={activeAvatarsNoLogin[index]}
                          alt=""
                        />
                      </div>
                      <div className="account-center">
                        <h6>{val.userName}</h6>
                        <p style={{ opacity: "0.5" }}>{val.fullName}</p>
                      </div>
                      <div className="account-right">
                        <button className="follow">
                          <h6>Theo dõi</h6>
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
