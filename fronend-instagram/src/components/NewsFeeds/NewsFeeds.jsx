import React, { useEffect, useState } from "react";
import "./NewsFeeds.css";
import Modal from "react-bootstrap/Modal";
// import CommentModal from "../Comment/CommentModal";
import axios from "axios";

function NewsFeeds({ userLogin, activeAvatars, dataUser, reloadPost }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("dataLogin"))
  );
  const [showDots, setShowDots] = useState(false); // show dấu 3 chấm
  const [showDotsUser, setShowDotsUser] = useState(false); // show dấu 3 chấm của user khác
  const [showComment, setShowComment] = useState(false); // show comment
  const [contentComment, setContentComment] = useState("");
  const [listPost, setListPost] = useState([]); // state chứa các bài post
  const [selectedPost, setSelectedPost] = useState(null); // ấn vào cmt từng bài
  const [reload, setReload] = useState(true);
  const [editCaption, setEditCaption] = useState("");
  const [showPost, setShowPost] = useState(false);

  const loadPosst = async () => {
    let result = await axios.get(
      "http://localhost:6886/post/?_sort=id&_order=desc"
    );
    setListPost(result.data);
  };
  // console.log("selectedPost", selectedPost);

  // show Comment
  const handleShowComment = (post) => {
    setSelectedPost(post);
    setShowComment(true);
    // setDataComment(post?.commentPost);
  };
  const handleClose = () => {
    setShowComment(false);
    setContentComment("");
  };

  const idCom = Date.now().toString();
  // sự kiện onChang Ô comment
  const handleChangeComment = (e) => {
    setContentComment(e.target.value);
  };

  // thêm mới bình luôn
  const handleAddComment = async (item) => {
    const comment = await findPostById(item.id);

    const addComment = comment.commentPost;
    addComment.push({
      // state comment bài viết
      idComment: idCom,
      textComment: contentComment,
      userCommnet: userLogin[0]?.userName,
      imageComment: activeAvatars,
    });

    await axios.patch(`http://localhost:6886/post/${item.id}`, {
      commentPost: addComment,
    });

    // loadPosst();
    handleShowComment(comment);
    setContentComment("");
  };
  // console.log("comments", comments);'

  const findPostById = async (idPost) => {
    return axios
      .get(`http://localhost:6886/post/${idPost}`)
      .then((resp) => resp.data);
  };

  // edit post
  const handleEditPost = (val) => {
    if (val.idUser === userLogin[0]?.userName) {
      setShowDots(false);
      setShowPost(true);
      setSelectedPost(val);
    }
    console.log("selectedPost", selectedPost);
  };

  // eidt caption
  const handleEditCaption = (e) => {
    setSelectedPost((rep) => ({
      ...rep,
      caption: e.target.value,
    }));
  };

  // update Caption
  const handleUpdateCation = async (idPost) => {
    await axios.patch(`http://localhost:6886/post/${idPost}`, {
      caption: selectedPost.caption,
    });
    loadPosst();
    setShowPost(false);
  };

  //xoá bài post
  const handleShowDots = (post) => {
    if (post?.idUser === userLogin[0]?.userName) {
      setShowDots(true);
      setSelectedPost(post);
    } else {
      setShowDotsUser(true);
    }
  };
  const handleDeletePost = async (idPost) => {
    await axios.delete(`http://localhost:6886/post/${idPost}`);
    setShowDots(false);
    loadPosst();
  };

  // chức năng like bài post
  const handleLikePost = async (idPost) => {
    const likes = await findPostById(idPost);
    let check = likes.likePost.includes(userLogin[0]?.id);
    if (check) {
      // da like roi
      let indexFind = likes.likePost.indexOf(userLogin[0]?.id);
      likes.likePost.splice(indexFind, 1);
    } else {
      // chua like
      likes.likePost.push(userLogin[0]?.id);
    }
    updateLikePost(idPost, likes.likePost);
    setReload(!reload);
  };

  const updateLikePost = async (idPost, likes) => {
    await axios.patch(`http://localhost:6886/post/${idPost}`, {
      likePost: likes,
    });
    loadPosst();
  };

  useEffect(() => {
    loadPosst();
  }, [reload, reloadPost, showPost]);

  return (
    <div>
      {listPost.map((item) => (
        <div key={item.id} className="item-post mt-4">
          <div className="post">
            <div className="top-post">
              <div className="avata">
                <img className="avata-img" src={item.avataUser} alt="" />
              </div>
              <div className="name-time">
                <h6>{item.idUser}</h6>
              </div>
              <div className="more">
                <ion-icon
                  onClick={() => handleShowDots(item)}
                  name="ellipsis-horizontal"
                ></ion-icon>

                {/* modal 3 chấm */}
              </div>
            </div>
            {/* ảnh bài post */}
            <div className="post-img">
              <img src={item.image} alt="" />
            </div>
            {/* like , coment, share bài post */}
            <div className="post-reaction">
              <div className="reaction-left">
                <div onClick={() => handleLikePost(item.id)}>
                  {/* like post */}
                  {item?.likePost?.includes(userLogin[0]?.id) ? (
                    <i className="fa-solid fa-heart text-2xl text-red-600"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl hover:opacity-50"></i>
                  )}
                </div>
                <div>
                  <i
                    onClick={() => handleShowComment(item)}
                    className="fa-regular fa-comment hover:opacity-50"
                  ></i>
                  {/* Comment */}
                </div>
                <div className="">
                  <i className="fa-regular fa-share-from-square hover:opacity-50"></i>
                </div>
              </div>
              <div className="reaction-right ">
                <i className="fa-regular fa-bookmark hover:opacity-50"></i>
              </div>
            </div>
            <div className="post-like">
              <h6>
                {" "}
                <span>{item.likePost.length}</span> lượt thích
              </h6>
            </div>
            {/* cap post */}
            <div className="post-cap">
              <p>
                <strong>{item.idUser}</strong>
              </p>
              <p className="ml-2">{item.caption}</p>
            </div>
            <div onClick={() => setShowComment(true)} className="opacity-50">
              <p>
                Xem tất cả <span>{item.commentPost?.length}</span> bình luận
              </p>
            </div>
            {/* coment post */}
            <div className="post-comment">
              <div className="comment">
                <input
                  value={contentComment}
                  onChange={handleChangeComment}
                  className="comment"
                  type="text"
                  placeholder="New Comment . . . . . ."
                />
              </div>
              <div className="like-comment">
                {contentComment && (
                  <button
                    onClick={() => handleAddComment(item)}
                    className="w-[50px] text-blue-600 font-normal"
                  >
                    Đăng
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}

      {/* model comment */}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showComment}
        onHide={handleClose}
      >
        <Modal.Body>
          {selectedPost && (
            <div className="flex relative">
              <div className=" w-[50%] h-[600px]">
                <img
                  className="w-full h-full object-cover"
                  src={selectedPost.image}
                  alt=""
                />
              </div>
              {/* right */}
              <div className="w-[50%] h-[600px] pl-8">
                {/* 1 */}
                <div className="w-full h-[60px] flex border-b">
                  <div className="w-[42px] h-[42px]">
                    <img
                      className="w-[32px] h-[32px] rounded-[50%] object-cover "
                      src={selectedPost?.avataUser}
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h6>{selectedPost?.idUser}</h6>
                  </div>
                  <div className="w-[24px] h-[24px]">
                    <ion-icon
                      onClick={() => setShowDots(true)}
                      name="ellipsis-horizontal"
                    ></ion-icon>

                    {/* modal 3 chấm */}
                    <Modal
                      closeButton
                      className="mt-[150px] rounded-3xl"
                      show={showDots}
                      onHide={() => setShowDots(false)}
                      dialogClassName="modal-40w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Body>
                        <div className="h-[280px] text-center cursor-pointer">
                          <p className="w-full h-[28px] text-red-700 font-medium text-base border-b">
                            Xoá
                          </p>
                          <p className="w-full h-[28px] text-blue-600 font-medium text-base border-b">
                            Chỉnh sửa
                          </p>
                          <p className="w-full h-[28px]  text-base border-b">
                            Ẩn lượt thích
                          </p>
                          <p className="w-full h-[28px] text-base border-b">
                            Tắt tính năng bình luận
                          </p>
                          <p className="w-full h-[28px] text-base border-b">
                            Đi tới bài viết
                          </p>
                          <p className="w-full h-[28px] text-base border-b">
                            Giới thiệu về tài khoản
                          </p>
                          <p className="w-full h-[28px] text-red-700 font-medium  text-base">
                            Huỷ
                          </p>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div>
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </div>
                </div>
                {/* 2 cap và comment */}
                <ul className="w-full h-[430px] pl-0 border-b border-zinc-300 pt-2 comment-scroll">
                  {/* cap */}
                  <li className="flex justify-between w-full">
                    <div className="w-full h-[70px] flex space-x-2">
                      <div className="w-[32px] h-[full]">
                        <img
                          className="w-full h-[32px] rounded-[50%] object-cover"
                          src={selectedPost.avataUser}
                          alt=""
                        />
                      </div>

                      <p className="font-semibold w-[120px] h-full">
                        {selectedPost?.idUser}
                      </p>
                      <p className="ml-2 w-[300px] h-full">
                        {selectedPost.caption}
                      </p>
                    </div>
                  </li>
                  {/* item comment */}
                  {selectedPost.commentPost?.map((val) => (
                    <li
                      key={val.idComment}
                      className="flex justify-between w-full"
                    >
                      <div className="w-full h-[50px] flex space-x-2">
                        <div className="w-[32px] h-[full]">
                          <img
                            className="w-full h-[32px] rounded-[50%] object-cover"
                            src={val.imageComment}
                            alt=""
                          />
                        </div>

                        <p className="font-semibold w-[120px] h-full">
                          {val.userCommnet}
                        </p>
                        <p className="ml-2 w-[300px] h-full">
                          {val.textComment}
                        </p>
                      </div>
                      <div className="">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* icon like comment share */}
                <div className="w-full h-[30px] flex justify-between">
                  <div>
                    <span onClick={() => handleLikePost(selectedPost.id)}>
                      {selectedPost?.likePost?.includes(userLogin[0]?.id) ? (
                        <i className="fa-solid fa-heart mr-2 text-2xl text-red-600"></i>
                      ) : (
                        <i className="fa-regular fa-heart mr-2 text-2xl hover:opacity-50"></i>
                      )}
                    </span>

                    <span className="">
                      <i className="fa-regular fa-comment text-2xl mr-2 hover:opacity-50"></i>
                    </span>
                    <span className="">
                      <i className="fa-regular fa-share-from-square text-2xl mr-2 hover:opacity-50  "></i>
                    </span>
                  </div>

                  <div className="">
                    <i className="fa-regular fa-bookmark text-2xl"></i>
                  </div>
                </div>
                {/* số like */}
                <div>
                  <strong>{selectedPost.likePost.length}</strong> lượt thích
                </div>
                {/* ô input để comment */}
                <div className="w-full h-[30px] mt-2 flex justify-between">
                  <div>
                    <span className="w-[30px]">
                      <i className="fa-regular fa-face-smile text-[30px]"></i>
                    </span>
                    <input
                      className="w-[450px] h-full outline-none px-2"
                      type="text"
                      placeholder="Thêm bình luận ...."
                      value={contentComment}
                      onChange={handleChangeComment}
                    />
                  </div>
                  {contentComment && (
                    <div>
                      <button
                        onClick={() => handleAddComment(selectedPost)}
                        className=" text-blue-600 font-normal"
                      >
                        Đăng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* model more */}
      <Modal
        closeButton
        className="mt-[150px] rounded-3xl"
        show={showDots}
        onHide={() => setShowDots(false)}
        dialogClassName="modal-40w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="h-[280px] text-center cursor-pointer">
            <p
              onClick={() => handleDeletePost(selectedPost?.id)}
              className="w-full h-[28px] text-red-700 font-medium text-base border-b"
            >
              Xoá
            </p>
            <p
              onClick={() => handleEditPost(selectedPost)}
              className="w-full h-[28px] text-blue-600 font-medium text-base border-b"
            >
              Chỉnh sửa
            </p>
            <p className="w-full h-[28px]  text-base border-b">Ẩn lượt thích</p>
            <p className="w-full h-[28px] text-base border-b">
              Tắt tính năng bình luận
            </p>
            <p className="w-full h-[28px] text-base border-b">
              Đi tới bài viết
            </p>
            <p className="w-full h-[28px] text-base border-b">
              Giới thiệu về tài khoản
            </p>
            <p className="w-full h-[28px] text-red-700 font-medium  text-base">
              Huỷ
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal của user khác */}
      <Modal
        closeButton
        className="mt-[150px] rounded-3xl"
        show={showDotsUser}
        onHide={() => setShowDotsUser(false)}
        dialogClassName="modal-40w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="h-[280px] text-center cursor-pointer">
            <p className="w-full h-[28px] text-red-700 font-medium text-base border-b">
              Báo cáo
            </p>
            <p className="w-full h-[28px] text-red-700 font-medium text-base border-b">
              Bỏ theo dõi
            </p>
            <p className="w-full h-[28px]  text-base border-b">Ẩn lượt thích</p>
            <p className="w-full h-[28px] text-base border-b">
              Đi tới bài viết
            </p>
            <p className="w-full h-[28px] text-base border-b">
              Sao chép liên kết ...
            </p>
            <p className="w-full h-[28px] text-base border-b">
              Thêm vào mục yêu thích
            </p>
            <p className="w-full h-[28px] text-red-700 font-medium  text-base">
              Huỷ
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal edit post */}
      <Modal
        show={showPost}
        onHide={() => setShowPost(false)}
        size={"lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="flex justify-between">
            <h5>Tạo Bài Viết Mới</h5>
            <div>
              <button
                onClick={() => handleUpdateCation(selectedPost?.id)}
                className="font-medium text-blue-500"
              >
                Chia sẻ
              </button>
            </div>
          </div>
          <hr />
          {/* body */}
          <div>
            <div className="flex justify-between">
              <div className="w-[60%]">
                <img
                  className="h-[448px] w-[448px] object-cover"
                  src={selectedPost?.image}
                  alt=""
                />
              </div>

              <div className="w-[40%] border-l border-zinc-300">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full object-cover"
                    src={activeAvatars}
                    alt=""
                  />
                  <p className="font-semibold ml-4">{userLogin[0]?.userName}</p>
                </div>
                <div>
                  <textarea
                    className="caption-input"
                    name="caption"
                    placeholder="Viết chú thích . . . ."
                    rows="8"
                    value={selectedPost?.caption}
                    onChange={handleEditCaption}
                  ></textarea>
                </div>

                <div className="flex justify-between pl-3 opacity-70">
                  <p>
                    <ion-icon name="happy-outline"></ion-icon>
                  </p>
                  <p>{selectedPost?.caption.length} / 2.200</p>
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

export default NewsFeeds;
