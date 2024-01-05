import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ccc; /* Màu nền của thanh thời gian khi chưa hoạt động */
  border-radius: 4px;
  overflow: hidden;
  opacity: 0.5;
  transition: opacity 0.5s linear;
  margin: 1rem;
  &.active {
    opacity: 1;
  }
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #007bff; /* Màu thanh thời gian khi hoạt động */
  border-radius: 4px;
  width: ${(props) =>
    props.progress}%; /* Độ rộng của thanh thời gian được cập nhật */
  transition: width 0.5s linear; /* Hiệu ứng chạy dọc theo chiều ngang */
`;

function Progressbar({ index, activeIndex, duration }) {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef();

  const startAnimation = () => {
    let startTime;
    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const newProgress = (elapsedTime / duration) * 100;

      if (newProgress <= 100) {
        setProgress(newProgress);
        animationRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    if (activeIndex === index) {
      startAnimation();
    } else {
      // Reset progress when the story is not active
      setProgress(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [activeIndex, index, duration]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  return (
    <ProgressBarContainer className={activeIndex === index ? "active" : ""}>
      <ProgressBarFill progress={progress}></ProgressBarFill>
    </ProgressBarContainer>
  );
}

export default Progressbar;
