"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useDataStore from "./stores/useDataStore";
import MapComponent from "./components/MapComponent";
import BottomDrawer from "./components/BottomDrawer";
import useDrawer from "./hooks/useDrawer";
import Image from "next/image";
import { a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function Page() {
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer();
  const { id } = useParams();
  const setData = useDataStore((state) => state.setData);
  const data = useDataStore((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://110.165.17.236:8081/api/v1/nonmembers/pings?uuid=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (!data) {
            setData(result);
            console.log("Response Data:", JSON.stringify(result, null, 2));
          }
        } else {
          console.error("데이터 가져오기에 실패했습니다.");
        }
      } catch (error) {
        console.error("서버 오류:", error);
      }
    };

    // data가 비어있을 때 fetchData 호출
    if (!data) {
      fetchData();
    }
  }, []);

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
