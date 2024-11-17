import { useState } from "react";
import { useSpring } from "@react-spring/web";

const useDrawer = () => {
  const stopPoints = [-540, 0, 130]; // Top, middle, and bottom positions
  const [isOpen, setIsOpen] = useState(false);
  const [{ y }, api] = useSpring(() => ({ y: stopPoints[2] })); // Initialize at closed position

  const openDrawer = () => {
    setIsOpen(true);
    api.start({ y: stopPoints[0] }); // Move to the top
  };

  const closeDrawer = () => {
    setIsOpen(false);
    api.start({ y: stopPoints[2] }); // Move to the bottom
  };

  const setPosition = (newY: number) => {
    const limitedY = Math.max(Math.min(newY, stopPoints[2]), stopPoints[0]); // Clamp y value
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
