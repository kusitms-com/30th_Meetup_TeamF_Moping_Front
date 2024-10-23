"use client";

import React from "react";
import BottomDrawer from "./components/BottomDrawer";
import MapComponent from "./components/MapComponent";
import { a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import useDrawer from "./hooks/useDrawer"; // 방금 만든 useDrawer 훅을 가져옴

const Page = () => {
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer(); // useDrawer 사용

  const bind = useDrag(({ last, movement: [, my] }) => {
    if (last) {
      // 드래그 종료 시, 일정 임계치를 기준으로 드로어를 열거나 닫기
      my > 100 ? closeDrawer() : openDrawer();
    } else {
      // 드래그 중일 때만 위치 업데이트
      setPosition(my);
    }
  });

  return (
    <div>
      <MapComponent /> {/* 지도 컴포넌트 */}
      <a.div
        {...bind()} // 드래그 제스처 바인딩
        style={{ y, touchAction: "none" }} // 드래그 시 터치 액션 방지
        className="w-full h-[218px] fixed bottom-0 z-10"
      >
        <BottomDrawer />
      </a.div>
    </div>
  );
};

export default Page;
