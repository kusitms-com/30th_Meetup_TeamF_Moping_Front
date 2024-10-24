"use client";

import React from "react";
import Image from "next/image";
import { a } from "@react-spring/web"; // External imports first
import { useDrag } from "@use-gesture/react"; // External imports
import BottomDrawer from "./components/BottomDrawer"; // Local imports after external ones
import MapComponent from "./components/MapComponent";
import useDrawer from "./hooks/useDrawer"; // Local hook import

export default function Page() {
  // Ensure the function component uses function declaration
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer();

  const bind = useDrag(({ last, movement: [, my] }) => {
    if (last) {
      if (my > 100) {
        closeDrawer(); // Close if dragged more than 100px
      } else {
        openDrawer(); // Open if dragged less than 100px
      }
    } else {
      setPosition(my); // Update the position during the drag
    }
  });

  return (
    <div>
      <div className="w-[100%] h-[56px] px-[16px] py-[8px] fixed z-10">
        <button type="button" className="w-[40px] h-[40px]">
          <Image src="/svg/arrow-back.svg" alt="icon" width={40} height={40} />
        </button>
      </div>
      <MapComponent />
      <a.div
        {...bind()}
        style={{ y, touchAction: "none" }}
        className="w-full h-[218px] fixed bottom-0 z-10"
      >
        <BottomDrawer />
      </a.div>
    </div>
  );
}
