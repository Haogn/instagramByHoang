import React from "react";

function Test() {
  return (
    <div>
      <Modal
        show={showComment}
        onHide={() => setShowComment(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body closeButton>
          <div className="flex relative">
            <div className=" w-[45%] h-[600px]">
              <img
                className="w-full h-full object-cover"
                // src="https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/358657354_1023235052013172_4960677849479795064_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=gxt5V5ftvJ8AX96Tes0&_nc_ht=scontent.fhan3-5.fna&oh=00_AfCfl__-RY5NlB54I0oRP76gQhWzW6g2w8Yz3hImzF08Aw&oe=64EA069A"
                src={item.image}
                alt=""
              />
            </div>
            {/* right */}
            <div className="w-[55%] h-[600px] pl-8">
              {/* 1 */}
              <div className="w-full h-[60px] flex border-b">
                <div className="w-[42px] h-[42px]">
                  <img
                    className="w-[32px] h-[32px] rounded-[50%] object-cover "
                    // src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
                    src={activeAvatars}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h6>{userLogin[0]?.userName}</h6>
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
                <div onClick={() => handleClosComment(item.id)}>
                  <i className="fa-solid fa-xmark text-xl"></i>
                </div>
              </div>
              {/* 2 cap và comment */}
              <ul className="w-full h-[430px] pl-0 border-b border-zinc-300 pt-2 comment-scroll">
                {/* cap */}
                <li className="flex justify-between w-full">
                  <div className="w-full h-[80px] flex space-x-2">
                    <div className="w-[32px] h-[full]">
                      <img
                        className="w-full h-[32px] rounded-[50%] object-cover"
                        // src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
                        src={activeAvatars}
                        alt=""
                      />
                    </div>

                    <p className="font-semibold w-[120px] h-full">
                      {userLogin[0]?.userName}
                    </p>
                    <p className="ml-2 w-[300px] h-full">{item.caption}</p>
                  </div>
                </li>
                {/* item comment */}

                <li className="flex justify-between w-full mt-3">
                  <div className="w-full h-[80px] flex space-x-2">
                    <div className="w-[32px] h-[full]">
                      <img
                        className="w-full h-[32px] rounded-[50%] object-cover"
                        src="https://mega.com.vn/media/news/0406_anh-gai-xinh-116.jpg"
                        alt=""
                      />
                    </div>

                    <p className="font-semibold w-[120px] h-full">
                      Tên tài khoản khác
                    </p>
                    <p className="ml-2 w-[300px] h-full">
                      bình luận Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Eum, neque.
                    </p>
                  </div>
                  <div className="">
                    <i className="fa-regular fa-heart"></i>
                  </div>
                </li>
              </ul>
              {/* icon like comment share */}
              <div className="w-full h-[30px] flex justify-between">
                <div>
                  <span>
                    <i className="fa-regular fa-heart text-2xl mr-2 hover:opacity-50"></i>
                  </span>
                  <span className="">
                    <i className="fa-regular fa-comment text-2xl mr-2 hover:opacity-50"></i>
                  </span>
                  <span className="">
                    <i className="fa-regular fa-share-from-square text-2xl mr-2 hover:opacity-50  "></i>
                  </span>
                </div>

                <div className="">
                  <i className="fa-solid fa-bookmark text-2xl"></i>
                </div>
              </div>
              {/* số like */}
              <div>
                <strong>{item.like}</strong> lượt thích
              </div>
              {/* ô input để comment */}
              <div className="w-full h-[30px] mt-2 ">
                <span className="w-[30px]">
                  <i className="fa-regular fa-face-smile text-[30px]"></i>
                </span>
                <input
                  // onChange={() => handleChangeComment}
                  className="w-[300px] h-full outline-none px-2"
                  type="text"
                  placeholder="Thêm bình luận ...."
                />
                {contentComment && (
                  <button className="text-blue-600 font-medium">Đăng</button>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* css
.comment-scroll {
    max-height: 400px;
    overflow-y: scroll;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)) repeat-y;
}

.comment-scroll::-webkit-scrollbar {
    width: 0.5em; 
}

.comment-scroll::-webkit-scrollbar-thumb {
    background-color: transparent; 
} */}
    </div>
  );
}

export default Test;
