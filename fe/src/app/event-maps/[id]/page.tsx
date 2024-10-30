"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // 외부 라이브러리
import { a } from "@react-spring/web"; // 외부 라이브러리
import { useDrag } from "@use-gesture/react"; // 외부 라이브러리

import MapComponent from "./components/MapComponent"; // 내부 모듈
import BottomDrawer from "./components/BottomDrawer"; // 내부 모듈
import useDrawer from "./hooks/useDrawer"; // 내부 모듈
import { useLocationStore } from "./stores/useLocationStore"; // 내부 모듈
import { useMarkerStore } from "./load-mappin/stores/useMarkerStore"; // 내부 모듈

interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Ping {
  iconLevel: number;
  nonMembers: NonMember[];
  url: string;
  placeName: string;
  px: number;
  py: number;
}

interface Data {
  eventName: string;
  px: number;
  py: number;
  nonMembers: NonMember[];
  pings: Ping[];
}

export default function Page() {
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer();
  const { id } = useParams();
  const parsedId = Array.isArray(id) ? id[0] : id;
  const [data, setData] = useState<Data | null>(null);
  const moveToLocation = useLocationStore((state) => state.moveToLocation);
  const setCustomMarkers = useMarkerStore((state) => state.setCustomMarkers);

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
          setData(result);
          console.log("Response Data:", JSON.stringify(result, null, 2));

          // 처음 px, py 값을 useLocationStore에 저장
          if (result.px && result.py) {
            moveToLocation(result.py, result.px);
          }

          // pings 데이터를 useMarkerStore에 저장
          if (result.pings) {
            setCustomMarkers(result.pings);
          }
        } else {
          console.error("데이터 가져오기에 실패했습니다.");
        }
      } catch (error) {
        console.error("서버 오류:", error);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [id, data, moveToLocation, setCustomMarkers]);

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
      {data && (
        <>
          <MapComponent px={data.px} py={data.py} />
          <a.div
            {...bind()}
            style={{ y, touchAction: "none" }}
            className="w-full h-[218px] fixed bottom-0 z-10"
          >
            <BottomDrawer
              nonMembers={data.nonMembers}
              eventName={data.eventName}
              id={parsedId}
            />
          </a.div>
        </>
      )}
    </div>
  );
}
