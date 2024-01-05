import React, { useEffect, useState } from "react";
import ProfileUserDetails from "../../components/ProfileComponent/ProfileUserDetails";
import RepUserPostPart from "../../components/ProfileComponent/RepUserPostPart";
import axios from "axios";

function Profile() {
  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center ml-16">
        <div>
          <ProfileUserDetails />
        </div>
        <div>
          <RepUserPostPart />
        </div>
      </div>
    </div>
  );
}

export default Profile;
