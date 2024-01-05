import React from "react";
import "./Story.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function Story() {
  const settingsStory = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const dataStory = [
    {
      image:
        "https://www.invert.vn/media/uploads/uploads/2022/12/03172411-3-top-anh-gai-xinh-che-mat-ngau.jpeg",
      name: "Tên tài khoản 1",
    },
    {
      image:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-xinh-che-mat-cuc-dep.jpg",
      name: "Tên tài khoản 2",
    },
    {
      image:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/gai-xinh-chup-anh-bien-chieu-600x800.jpg",
      name: "Tên tài khoản 3",
    },
    {
      image:
        "https://www.invert.vn/media/uploads/uploads/2022/12/03173006-1-anh-gai-xinh-che-mat-bang-dien-thoai.jpeg",
      name: "Tên tài khoản4",
    },
    {
      image:
        "https://inkythuatso.com/uploads/thumbnails/800/2022/04/anh-gai-xinh-che-mat-voi-mu-040406213-04-09-05-42.jpg",
      name: "Tên tài khoản 5",
    },
    {
      image:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-gai-dep-che-mat-cuc-chat.jpg",
      name: "Tên tài khoản 6",
    },
    {
      image:
        "https://gaixinhbikini.com/wp-content/uploads/2023/02/anh-co-gai-che-mat-002.jpg",
      name: "Tên tài khoản 7",
    },
    {
      image:
        "https://www.ldg.com.vn/media/uploads/uploads/27130902-gai-xinh.png",
      name: "Tên tài khoản 8",
    },
    {
      image: "https://luv.vn/wp-content/uploads/2021/10/gai-dep-che-mat-20.jpg",
      name: "Tên tài khoản 9",
    },
    {
      image:
        "https://i.pinimg.com/originals/e0/61/cc/e061cc2d8d465b7ee4c947ed6dce2dc5.jpg",
      name: "Tên tài khoản 10",
    },
  ];

  const navigate = useNavigate();

  const handleNavigateStory = () => {
    navigate("/story");
  };
  return (
    <div>
      <Slider className="slider-story" {...settingsStory}>
        {dataStory.map((e, i) => (
          <div
            key={i}
            onClick={() => handleNavigateStory(e)}
            className="story-item"
          >
            <img className="story-img" src={e.image} alt="" />

            <div className="story-name">
              <p>{e.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Story;
