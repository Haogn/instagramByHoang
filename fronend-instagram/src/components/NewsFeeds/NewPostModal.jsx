import React, { useEffect, useState } from "react";
import "./NewPostModal.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function NewPostModal({ showPost, setShowPost, handleReloadPost }) {
  const [caption, setCaption] = useState(""); // caption
  const [dataUser, setDataUser] = useState([]); //data user đăng nhập
  const [listPost, setListPost] = useState([]); // state chứa các bài post
  const [file, setFile] = useState("");

  const loadUser = async () => {
    let result = await axios.get("http://localhost:6886/user");
    setDataUser(result.data);
  };

  const loadPosst = async () => {
    let result = await axios.get("http://localhost:6886/post");
    setListPost(result.data);
  };

  // lọc user đang đăng nhập
  const userLogin = dataUser.filter((item) => item.status === true);
  // lọc ra avata đang true
  const activeAvatars = userLogin.map((item) => {
    const activeAvata = item.avata.find((avata) => avata.activeAvata === true);
    return activeAvata ? activeAvata.image : null;
  });
  // handleUploadUrl
  const handleUploadUrl = (e) => {
    setFile(e.target.value);
  };

  // caption
  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  // up bài post
  const handleUpPost = async () => {
    // Send the updated user data to the server
    await axios.post(`http://localhost:6886/post`, {
      idUser: userLogin[0]?.userName,
      avataUser: activeAvatars,
      image: file,
      caption: caption,
      likePost: [],
      commentPost: [],
    });
    toast.success("😎 Bạn đã đăng ký tài khoản thành công 🤞🏻 !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Reset the state
    setTimeout(() => {
      setFile("");
      setCaption("");
      setShowPost(false);
      handleReloadPost();
    }, 1000);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <Modal
        show={showPost}
        onHide={() => setShowPost(false)}
        size={file ? "lg" : "md"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ToastContainer />
        <Modal.Body>
          <div className={`${file ? "flex justify-between" : "text-center"} `}>
            <h5>Tạo Bài Viết Mới</h5>
            <div>
              {" "}
              {file ? (
                <button
                  onClick={handleUpPost}
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
          {/* body */}
          <div>
            <div className="flex justify-between">
              <div className="w-[60%]">
                {!file && (
                  <div className="drag-drop">
                    <div className="text-5xl opacity-70">
                      <ion-icon name="images-outline"></ion-icon>
                    </div>
                    <div className="h-[36px]  ">
                      <input
                        className="w-full h-full outline-none"
                        type="text"
                        placeholder="Hình ảnh Hoặc Video bạn muốn đăng tải"
                        onChange={handleUploadUrl}
                      />
                    </div>
                    <button className="custom-file-upload">
                      Sự lựa chọn của bạn
                    </button>
                  </div>
                )}

                {file && (
                  <img
                    className="h-[448px] w-[448px] object-cover"
                    src={file}
                    alt=""
                  />
                )}
              </div>

              {file && (
                <div className="w-[40%] border-l border-zinc-300">
                  <div className="flex items-center px-2">
                    <img
                      className="w-7 h-7 rounded-full"
                      src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
                      alt=""
                    />
                    <p className="font-semibold ml-4">Tên tài khoản </p>
                  </div>
                  <div>
                    <textarea
                      className="caption-input"
                      name="caption"
                      placeholder="Viết chú thích . . . ."
                      rows="8"
                      onChange={handleCaption}
                    ></textarea>
                  </div>

                  <div className="flex justify-between pl-3 opacity-70">
                    <p>
                      <ion-icon name="happy-outline"></ion-icon>
                    </p>
                    <p>{caption?.length} / 2.200</p>
                  </div>
                  <hr />

                  <div className="flex justify-between pl-3">
                    <input
                      type="text"
                      placeholder="Thêm vị trí"
                      className="outline-none"
                    />
                    <p>
                      <ion-icon name="location-outline"></ion-icon>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewPostModal;
