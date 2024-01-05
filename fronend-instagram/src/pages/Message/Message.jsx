import React from "react";
import "./Message.css";

function Message({}) {
  return (
    <div>
      <div className="h-[1000px] w-[1435px] flex flex-row relative">
        {/* left */}
        <div className="w-[400px] min-h-[1000px] ">
          {/* 1 */}
          <div className="h-[100px] w-[400px] fixed top-0 left-[80px] border-r border-zinc-300 ">
            <div className="flex flex-col gap-3">
              <div className="mt-3 pl-4">
                <span className="font-bold text-2xl mr-44 ">Tên tài khoản</span>
                <span>
                  <i className="fa-regular fa-pen-to-square text-2xl "></i>
                </span>
              </div>
              <div className="pl-4">
                <span className="font-semibold text-lg mr-40 ">Tin nhắn</span>
                <span>Tin nhắn đang chờ</span>
              </div>
            </div>

            {/* items  */}
            <div className=" w-[400px] min-h-[900px]  border-r border-zinc-300  ">
              <div className="px-6 py-2 h-[75px] w-full flex flex-row ">
                <div className="w-[56px] h-[56px]">
                  <img
                    className="w-full h-full rounded-[50%] object-cover "
                    src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-xinh-che-mat-cuc-dep.jpg"
                    alt=""
                  />
                </div>
                <h6 className="ml-3">Tên tài khoản</h6>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="h-[10000px] w-[1035px] ml-[480px]">
          {/* 1 */}
          <div className="w-[1035px] h-[75px] flex items-center border-b border-zinc-300 fixed top-0 left-[480px] bg-white">
            {/* avata */}
            <div className=" w-[60px] h-[60px] ml-2 ">
              <img
                className=" w-full h-full rounded-[50%] object-cover "
                src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-xinh-che-mat-cuc-dep.jpg"
                alt=""
              />
            </div>
            {/*  */}
            <div className=" h-[60px] w-[830px] ">
              <h6 className="pl-4 pt-1">Tên tài khoản</h6>
            </div>
            {/*  */}
            <div className=" pl-3 w-[145px] h-[60px] flex flex-row items-center">
              <div className=" w-[40px] h-[40px] ">
                <i className="fa-solid fa-phone text-2xl"></i>
              </div>

              <div className=" w-[40px] h-[40px] ">
                <i className="fa-solid fa-video text-2xl"></i>
              </div>
              <div className=" w-[40px] h-[40px] ">
                <i className="fa-solid fa-circle-exclamation text-2xl"></i>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className=" w-[1035px] h-[180px] flex flex-col items-center mt-[75px]">
            <div className="mt-3 h-[90px] w-[90px] ">
              <img
                className="w-full h-full rounded-[50%] object-cover "
                src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-xinh-che-mat-cuc-dep-600x745.jpg"
                alt=""
              />
            </div>
            <h4>Tên tài khoản</h4>
            <button className="w-[200px] h-[36px] bg-zinc-300 rounded-xl font-semibold ">
              Xem trang cá nhân
            </button>
          </div>
          {/* nội dung tin nhắn */}
          <div className="message-scroll message-list">
            {/* nội dung tên nhắn bên phải  */}
            <ul className="message-right">
              {[1, 1, 1, 1].map((item) => (
                <li>Lorem ipsum dolor sit amet consectetur adipisicin</li>
              ))}
            </ul>

            <ul className="message-left">
              {[1, 1, 1, 1, 1].map((item) => (
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore, ducimus.
                </li>
              ))}
            </ul>
          </div>
          {/* 4*/}
          <div className=" fixed bottom-0 left-[480px] w-[1035px] h-[70px]">
            <div className=" w-full h-[44px] flex items-center border rounded-3xl">
              <div className="w-[44px] h-full ml-5 text-2xl pt-2 ">
                <i className="fa-regular fa-face-smile"></i>
              </div>
              <div className="w-[820px] h-full">
                <input
                  className="w-full h-full outline-none pl-4 pt-2"
                  type="text"
                  placeholder="Nhắn tin . . . "
                />
              </div>
              <div className="w-[171px] h-full flex pt-2 ">
                <div className="ml-5 w-[44px] h-full">
                  <i className="fa-solid fa-microphone text-2xl"></i>
                </div>

                <div className="w-[44px] h-full">
                  <i className="fa-regular fa-image text-2xl"></i>
                </div>

                <div className="w-[44px] h-full">
                  <i className="fa-regular fa-heart text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
