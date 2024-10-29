"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import BottomDrawer from "./components/BottomDrawer";
import MapComponent from "./components/MapComponent";
import useDrawer from "./hooks/useDrawer";

export default function Page() {
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/nonmembers/pings?uuid=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result); // 데이터를 상태에 저장
          console.log(data);
        } else {
          console.error("데이터 가져오기에 실패했습니다.");
        }
      } catch (error) {
        console.error("서버 오류:", error);
      }
    };

    fetchData();
  }, [id]);

  const bind = useDrag(
    ({ last, movement: [, my], memo = y.get() }) => {
      // 드래그가 일정 거리 이상 발생해야 드로워를 이동시킴
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
      filterTaps: true, // 클릭과 드래그 구분
      threshold: 10, // 드래그 최소 거리 지정 (10px 이상 이동 시 드래그로 인식)
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
