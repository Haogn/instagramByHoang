import axios from "axios";
import React, { useEffect, useState } from "react";

function Discover() {
  const [listPost, setListPost] = useState([]);
  const loadPost = async () => {
    let result = await axios.get("http://localhost:6886/post");
    setListPost(result.data);
  };

  useEffect(() => {
    loadPost();
  }, []);
  return (
    <div>
      <div className=" ml-[220px] h-[1800px] w-[1290px] flex items-center justify-center">
        <div className=" w-[940px] h-full flex flex-row flex-wrap gap-1 ">
          {listPost.map((val) => (
            <div className=" w-[305px] h-[305px] ">
              <img
                className="object-cover rounded-lg"
                src={val?.image}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
