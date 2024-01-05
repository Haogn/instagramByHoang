import React from "react";
import "./Header.css";

function Header() {
  return (
    <div>
      <div className="hidden h-[30px] w-full">
        <button className="bg-slate-50 rounded-2xl fixed top-0 left-[50%] mt-1   ">
          <ion-icon name="notifications"></ion-icon> Bài Viết Mới
        </button>
      </div>
    </div>
  );
}

export default Header;
