"use client";

import React from "react";
import Image from "next/image";
import { a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import BottomDrawer from "./components/BottomDrawer";
import MapComponent from "./components/MapComponent";
import useDrawer from "./hooks/useDrawer";

export default function Page() {
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer();

  const bind = useDrag(
    ({ last, movement: [, my], memo = y.get() }) => {
      if (last) {
        if (my + memo > 100) {
          closeDrawer();
        } else {
          openDrawer();
        }
      } else {
        setPosition(my + memo);
      }
      return memo;
    },
    {
      filterTaps: true,
      threshold: 10,
    }
  );

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
