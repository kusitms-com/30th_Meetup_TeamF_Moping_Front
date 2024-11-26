import { useState, useEffect } from "react";
import { useSpring } from "@react-spring/web";

const useDrawer = () => {
  const [stopPoints, setStopPoints] = useState<number[]>([]);

  const updateStopPoints = () => {
    let stopPointsPercent;
    if (window.matchMedia("(max-height: 668px)").matches) {
      stopPointsPercent = [54, 30, 0, -20];
    } else if (window.matchMedia("(max-height: 850px)").matches) {
      stopPointsPercent = [59, 24, 0, -15.5];
    } else {
      stopPointsPercent = [57, 22.5, 0, -14];
    }
    const vh = window.innerHeight;
    setStopPoints(stopPointsPercent.map((p) => vh * (p / 100) * -1));
  };

  useEffect(() => {
    updateStopPoints();
    window.addEventListener("resize", updateStopPoints);
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
    const limitedY = Math.max(Math.min(newY, stopPoints[3]), stopPoints[0]);
    api.start({ y: limitedY });
  };

  return {
    y,
    isOpen,
    openDrawer,
    closeDrawer,
    setPosition,
    stopPoints,
  };
};

export default useDrawer;
