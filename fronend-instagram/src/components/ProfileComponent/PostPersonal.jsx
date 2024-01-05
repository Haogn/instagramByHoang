import React from "react";
import "./PostPersonal.css";

function PostPersonal() {
  return (
    <div>
      {/* item */}
      <div className="post-personal h-[300px] w-[300px] ">
        <img
          className="object-cover rounded-lg h-[309px] w-[309px]  "
          src="https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg"
          alt=""
        />
        <div className="overlay">
          <div className="overlay-text flex justify-between">
            <div>
              <i className="fa-solid fa-comment"></i> <span>2</span>
            </div>
            <div>
              <i className="fa-solid fa-heart"></i> <span>10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPersonal;
