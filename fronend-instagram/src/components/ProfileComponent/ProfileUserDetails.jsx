import React, { useEffect, useState } from "react";
import "./ProfileUserDetails.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfileUserDetails() {
  const navigate = useNavigate();
  //data user đăng nhập
  const [login, setLogin] = useState([]);
  const [listPost, setListPost] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataLogin"))
  );

  //
  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setLogin(result.data);
  };

  const loadPost = async () => {
    let result = await axios.get("http://localhost:6886/post");
    setListPost(result.data);
  };

  const userLogin = login.filter((item) => item.status === true);

  const filterPost = listPost.filter(
    (item) => item.idUser === userLogin[0]?.userName
  );

  //
  // console.log("userLogin", userLogin);

  const activeAvatars = userLogin.map((user) => {
    const activeAvata = user.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });

  // console.log("Active Avatars", activeAvatars);

  const [fileAvata, setFileAvata] = useState({
    imageAva: "",
    activeAva: false,
  });
  const { imageAva, activeAva } = fileAvata;
  const [showModalAvata, setShowModalAvata] = useState(false);
  const handleClose = () => setShowModalAvata(false);

  const handleChangeAvata = (e) => {
    setFileAvata((per) => ({
      ...per,
      imageAva: e.target.value,
      activeAva: true,
    }));
  };

  const handleUpAvata = async (avus) => {
    const response = await axios.get(`http://localhost:6886/user/${avus.id}`);
    const upAvata = response.data;
    // Lọc ra avata có activeAvata là true và đổi thành false (nếu có)
    upAvata.avata = upAvata.avata.map((avataItem) => {
      if (avataItem.activeAvata === true) {
        avataItem.activeAvata = false;
      }
      return avataItem;
    });

    upAvata.avata.push({ image: imageAva, activeAvata: activeAva });
    // console.log("upAvata", upAvata);
    await axios.patch(`http://localhost:6886/user/${avus.id}`, upAvata);

    toast.success("😎 Bạn đã cập nhập xong ảnh đại diện mới 🤞🏻 !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      setFileAvata("");
      setShowModalAvata(false);
    }, 1000);
  };

  // handleLogOut
  const handleLogOut = async (idUser) => {
    await axios.patch(`http://localhost:6886/user/${idUser}`, {
      status: false,
    });
    toast.success("🖐🏻🖐🏻🖐🏻 Bạn đã đăng xuất thành công !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/login-user");
    }, 1000);
  };

  // chỉnh sửa trang cá nhân
  const [showProfile, setShowProfile] = useState(false);
  const [selectProfile, setSelectProfile] = useState(null);
  const [valueEditProfile, setValueEditProfile] = useState("");

  const handleEditProfile = (edit) => {
    setShowProfile(true);
    setSelectProfile(edit);
  };

  const handleChangEditProfile = (e) => {
    setSelectProfile((rep) => ({
      ...rep,
      [e.target.name]: e.target.value,
    }));
  };
  console.log("selectProfile", selectProfile);

  const handleSubmitProfile = async (e, idUser) => {
    // e.preventDefault();
    await axios.patch(`http://localhost:6886/user/${idUser}`, {
      userName: selectProfile.userName,
      fullName: selectProfile.fullName,
      email: selectProfile.email,
      password: selectProfile.password,
    });
  };

  const handleCloseProfile = () => setShowProfile(false);
  useEffect(() => {
    loadUser();
    loadPost();
  }, [imageAva]);

  // console.log("imageAva", imageAva);
  return (
    <div>
      {/* khối trên */}
      <div className="h-[250px] w-[940px] flex flex-row mt-2">
        {/* avata */}
        <div className="h-[150px] w-[235px] ">
          <div className="w-[150px] h-[150px] avata-personal">
            <img
              className="w-[150px] h-[150px] rounded-[50%] object-cover "
              // src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
              src={activeAvatars}
              alt=""
            />
            <div
              className="avata-overlay"
              onClick={() => setShowModalAvata(true)}
            >
              <div className="avata-overtex">
                <div>
                  <i className="fa-regular fa-square-plus absolute top-[39%] left-[41%] text-3xl text-white"></i>
                  <p className="absolute top-[60%] left-[10%] text-base font-semibold text-white w-full">
                    Đổi ảnh đại diện
                  </p>
                </div>
              </div>
              {/* modal avata */}
              <div>
                <Modal
                  size={"md"}
                  show={showModalAvata}
                  onHide={handleClose}
                  animation={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <ToastContainer />
                  <Modal.Body>
                    <div
                      className={`${
                        imageAva ? "flex justify-between" : "text-center"
                      } `}
                    >
                      <h5>Thay đổi ảnh đại diện</h5>
                      <div>
                        {" "}
                        {imageAva ? (
                          <button
                            onClick={() => handleUpAvata(userLogin[0])}
                            className="font-medium text-blue-500"
                          >
                            Chia sẻ
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <hr />
                    {!imageAva && (
                      <div className="modal-avata">
                        <div className="text-5xl opacity-70">
                          <ion-icon name="images-outline"></ion-icon>
                        </div>
                        <div className="h-[36px]  ">
                          <input
                            className="w-full h-full outline-none"
                            type="text"
                            placeholder="Thay đổi ảnh đại diện"
                            onChange={handleChangeAvata}
                          />
                        </div>
                        <button className="custom-file-upload">
                          Sự lựa chọn của bạn
                        </button>
                      </div>
                    )}

                    {imageAva && (
                      <img
                        className="h-[448px] w-[448px] object-cover rounded-full"
                        src={imageAva}
                        alt=""
                      />
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        {/* thông tin */}
        <div className="w-[645px] flex flex-col justify-around">
          {/* 1 */}
          <div className=" w-[645px] flex items-center justify-between">
            <div className=" w-[140px] h-[25px] ml-2 ">
              <p className="text-2xl font-semibold">{userLogin[0]?.userName}</p>
            </div>

            <div className="px-4">
              <button
                onClick={() => handleEditProfile(userLogin[0])}
                className="bg-zinc-200 h-[32px] w-[200px] rounded-lg"
              >
                Chỉnh sửa trang cá nhân
              </button>
            </div>
            {/* modal chỉnh sửa trang cá nhân  */}
            <Modal
              show={showProfile}
              onHide={handleCloseProfile}
              animation={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body>
                <div className="w-[470px] h-[300px]">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        Chỉnh sửa thông tin cá nhân
                      </h5>
                      <form
                        onSubmit={(e) =>
                          handleSubmitProfile(e, selectProfile?.id)
                        }
                        className="form-sample"
                      >
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Tên người dùng
                          </label>
                          <div className="col-sm-8">
                            <input
                              name="userName"
                              value={selectProfile?.userName}
                              type="text"
                              className="form-control"
                              onChange={handleChangEditProfile}
                            />
                          </div>
                        </div>

                        <div className="form-group row  mt-2">
                          <label className="col-sm-4 col-form-label">
                            Tên đầy đủ
                          </label>
                          <div className="col-sm-8">
                            <input
                              name="fullName"
                              value={selectProfile?.fullName}
                              type="text"
                              className="form-control"
                              onChange={handleChangEditProfile}
                            />
                          </div>
                        </div>

                        <div className="form-group row  mt-2">
                          <label className="col-sm-4 col-form-label">
                            Eamil
                          </label>
                          <div className="col-sm-8">
                            <input
                              name="email"
                              value={selectProfile?.email}
                              type="text"
                              className="form-control"
                              onChange={handleChangEditProfile}
                            />
                          </div>
                        </div>

                        <div className="form-group row  mt-2">
                          <label className="col-sm-4 col-form-label">
                            Password
                          </label>
                          <div className="col-sm-8">
                            <input
                              name="password"
                              value={selectProfile?.password}
                              type="text"
                              className="form-control"
                              onChange={handleChangEditProfile}
                            />
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Chỉnh sửa
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <div className="px-4">
              <button className="bg-zinc-200 h-[32px] w-[180px] rounded-lg">
                Xem kho lưu trữ
              </button>
            </div>

            <div onClick={() => handleLogOut(userLogin[0]?.id)} className="p-2">
              <i className="fa-solid fa-right-from-bracket text-2xl"></i>
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
                <strong>{userLogin[0]?.followers.length}</strong> Người theo dõi
              </p>
            </div>

            <div className=" h-[32px] w-[305px]">
              <p>
                Đang theo dõi <strong>{userLogin[0]?.following.length}</strong>{" "}
                người dùng
              </p>
            </div>
          </div>
          {/* 3 */}
          <div className=" w-[645px] ">
            <div className="ml-2">
              <p className="font-semibold">{userLogin[0]?.fullName}</p>
              <p className="opacity-70">
                ★ Fitness Lover ★ Big Dreamer ★ Love Travelling ★ Photography ❤
                ★ I ❣️ Vietnames ★
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserDetails;
