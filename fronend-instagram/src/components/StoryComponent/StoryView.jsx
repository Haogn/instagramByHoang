import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Progressbar from "./Progressbar";

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;
function StoryView({ stories }) {
  const [curenStoryIndex, setCurenStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextStory = () => {
    if (curenStoryIndex < stories.length - 1) {
      setCurenStoryIndex(curenStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (curenStoryIndex === stories.lentgh - 1) {
      setCurenStoryIndex(0);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
    }, 5000);
    return () => clearInterval(interval);
  }, [curenStoryIndex]);

  return (
    <div className="relative w-full">
      <div className="flex justify-center items-center bg-black h-screen relative">
        <StoryImage src={stories?.[curenStoryIndex].image} />

        <div className="absolute top-0 flex w-[80%]">
          {stories.map((item, index) => (
            <Progressbar
              key={index}
              duration={4000}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryView;
