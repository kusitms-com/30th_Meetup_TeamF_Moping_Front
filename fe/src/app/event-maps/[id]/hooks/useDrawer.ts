import { useState, useEffect } from "react";
import { useSpring } from "@react-spring/web";

const useDrawer = () => {
  const [stopPoints, setStopPoints] = useState<number[]>([]);

  // 뷰포트 크기에 따른 스톱 포인트 계산
  const updateStopPoints = () => {
    let stopPointsPercent;
    if (window.matchMedia("(max-height: 668px)").matches) {
      // 작은 기종
      stopPointsPercent = [54, 30, 0, -20];
    } else if (window.matchMedia("(max-height: 850px)").matches) {
      // 중간 기종
      stopPointsPercent = [59, 24, 0, -15.5];
    } else {
      // 큰 기종
      stopPointsPercent = [57, 22.5, 0, -14];
    }
    const vh = window.innerHeight;
    setStopPoints(stopPointsPercent.map((p) => vh * (p / 100) * -1));
  };

  useEffect(() => {
    updateStopPoints(); // 초기 설정
    window.addEventListener("resize", updateStopPoints); // 창 크기 변경에 따라 업데이트
    return () => window.removeEventListener("resize", updateStopPoints);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [{ y }, api] = useSpring(() => ({ y: stopPoints[3] || 0 }));

  const openDrawer = () => {
    setIsOpen(true);
    api.start({ y: stopPoints[0] });
  };

  const closeDrawer = () => {
    setIsOpen(false);
    api.start({ y: stopPoints[2] });
  };

  const setPosition = (newY: number) => {
    const limitedY = Math.max(Math.min(newY, stopPoints[3]), stopPoints[0]); // y 값 제한
    api.start({ y: limitedY });
  };

  return {
    y,
    isOpen,
    openDrawer,
    closeDrawer,
    setPosition, // 함수를 반환 객체에 추가
    stopPoints,
  };
};

export default useDrawer;
