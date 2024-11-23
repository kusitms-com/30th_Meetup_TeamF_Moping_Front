import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";
import RecommendButton from "./RecommendButton";
import RecommendInActive from "./RecommendInActive";
import LocationButton from "./LocationButton";
import RecommendActive from "./RecommendActive";

interface NonMember {
  nonMemberId: number;
  name: string;
  profileSvg: string;
}

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
  type: string;
  nonMembers: NonMember[];
}

interface BottomDrawerProps {
  nonMembers: NonMember[];
  eventName: string;
  id: string;
}

interface RecommendPing {
  iconLevel: number;
  placeName: string;
  sid: string;
  px: number;
  py: number;
  url: string;
  type: string;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  nonMembers: initialNonMembers,
  eventName: initialEventName,
  id,
}) => {
  const [eventName, setEventName] = useState<string>(initialEventName);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [nonMembers, setNonMembers] = useState<NonMember[]>(initialNonMembers);
  const [allPings, setAllPings] = useState<Ping[]>([]);
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [nonRecommend, setNonRecommend] = useState<boolean>(false);

  const { setCustomMarkers } = useMarkerStore();
  const moveToLocation = useLocationStore((state) => state.moveToLocation);

  const router = useRouter();
  const observer = useRef<IntersectionObserver>();
  const lastPingElementRef = useRef(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllPings = async () => {
      try {
        const response = await fetch(`${apiUrl}/nonmembers/pings?uuid=${id}`);
        if (response.ok) {
          const data = await response.json();
          let recommendProfile;
          if (data.recommendPings && data.recommendPings.length > 0) {
            setIsRecommended(true);
            console.log(isRecommended);
            recommendProfile = (data.recommendPings || []).map(
              (ping: RecommendPing) => ({
                iconLevel: 10, // Fixed icon level
                nonMembers: [
                  {
                    nonMemberId: -1,
                    name: "추천 모핑", // Fixed name
                    profileSvg: "/profile/recommendProfile.svg", // Fixed profileSvg
                  },
                ],
                url: ping.url,
                placeName: ping.placeName,
                px: ping.px,
                py: ping.py,
                type: ping.type,
              })
            );
            console.log("리코멘트 프로필" + JSON.stringify(recommendProfile));
          } else {
            recommendProfile = []; // Default value when no recommendPings
          }
          setEventName(data.eventName || "");
          setNonMembers([
            ...(recommendProfile[0].nonMembers || []),
            ...(data.nonMembers || []),
          ]);
          console.log("논멤버스" + JSON.stringify(nonMembers));
          setAllPings([
            ...(data.pings || []), // 기존 pings
            ...(recommendProfile || []), // recommendProfile 추가
          ]);

          setCustomMarkers([
            ...(data.pings || []), // 기존 pings
            ...(recommendProfile || []), // recommendProfile 추가
          ]);

          setNeighborhood(data.neighborhood);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchAllPings();
  }, [apiUrl, id, setCustomMarkers]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          moveToLocation(latitude, longitude);
        },
        () => alert("현재 위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  const handleRecommendAllowClick = () => {
    setIsRecommend(true);
  };

  const handleAddToMorphing = async () => {
    let Km = 1.0;
    let found = false;

    try {
      const response = await fetch(
        `${apiUrl}/nonmembers/pings/recommend?uuid=${id}&radiusInKm=${Km}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(
          `Recommended data fetched successfully for ${Km} km:`,
          data
        );
        if (data.recommendPings.length == 0) {
          setNonRecommend(true);
          console.log("없음");
        }
        if (data.recommendPings && data.recommendPings.length >= 5) {
          console.log(
            "Found more than or equal to 5 pings at radius:",
            Km,
            "km"
          );
          setCustomMarkers(data.recommendPings);
          found = true;
          // break;
          setIsRecommend(found);
        }
      } else {
        console.error(
          "Failed to fetch recommended data, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching recommended data:", error);
    }

    // 상태 업데이트는 검색 결과에 따라 결정
  };

  // const handleAddToMorphing = async () => {
  //   if (recommendPings.length > 0) {
  //     console.log("Adding selected pings to morphing...", recommendPings);

  //     // Prepare payload
  //     const payload = {
  //       uuid: id, // UUID는 필요에 따라 동적으로 설정하세요
  //       sids: recommendPings.map((ping) => ping.sid), // recommendPings에서 sid 추출
  //     };

  //     console.log(payload);

  //     try {
  //       // Send POST request
  //       const response = await fetch(`${apiUrl}/nonmembers/pings/recommend`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json;charset=UTF-8",
  //         },
  //         body: JSON.stringify(payload), // Convert payload to JSON
  //       });
  //       // Handle response
  //       if (response.ok) {
  //         const result = await response.json();
  //         console.log("추가:" + JSON.stringify(result));

  //         setIsRecommend(false);
  //       } else {
  //         const errorText = await response.text(); // 서버에서 제공하는 오류 메시지 확인
  //         console.error(
  //           "Failed to add to morphing:",
  //           response.status,
  //           response.statusText,
  //           errorText
  //         );
  //         console.error("Failed to add to morphing:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error adding to morphing:", error);
  //     }
  //   } else {
  //     console.log("No pings available to add to morphing.");
  //   }
  // };

  const handleRecommendCancle = () => {
    setIsRecommend(false);
  };

  const handleButtonClick = (nonMemberId: number) => {
    // 1. 현재 선택 상태를 확인합니다.
    const isSelected = selectedButton === nonMemberId;

    // 2. 선택 상태를 토글합니다.
    setSelectedButton(isSelected ? null : nonMemberId);

    // 3. 선택 상태에 따라 pingsToShow를 설정합니다.
    const pingsToShow = isSelected
      ? [...allPings] // 선택 해제 시 모든 핑을 표시
      : allPings.filter((ping) =>
          ping.nonMembers.some((member) => member.nonMemberId === nonMemberId)
        ); // nonMemberId와 일치하는 항목만 필터링

    // 4. Zustand의 customMarkers를 업데이트합니다.
    setCustomMarkers(pingsToShow);

    // 5. 현재 상태를 로그로 확인합니다.
    console.log("선택된 버튼:", isSelected ? null : nonMemberId);
    console.log("업데이트된 마커:", pingsToShow);
  };

  const handleAddButtonClick = () => {
    router.push(`/event-maps/${id}/load-mappin`);
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/nonmembers/pings/refresh?uuid=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEventName(data.eventName);
        setNonMembers(data.nonMembers);
        setAllPings(data.pings || []);
        setCustomMarkers(data.pings || []);
      } else {
        console.log("Failed to fetch refreshed data:", response.status);
      }
    } catch (error) {
      console.log("Error refreshing data:", error);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="bottom-drawer w-full h-[760px] bg-grayscale-90 z-10 rounded-t-xlarge"
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {}}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {}}
    >
      {isRecommend === false && isRecommended === false ? (
        <div className="absolute ml-[16px] left-0 -top-[60px] flex">
          <RecommendButton onClick={handleRecommendAllowClick} />
        </div>
      ) : null}
      <div className="absolute mr-[16px] right-0 -top-[60px] flex">
        <LocationButton onClick={handleLocationClick} />
      </div>
      <div className="w-full h-[20px] flex justify-center">
        <Image
          src="/svg/Grabber.svg"
          alt="Grabber"
          width={36}
          height={4}
          className="mt-[12px]"
        />
      </div>

      {isRecommend ? (
        <RecommendActive
          neighborhood={neighborhood}
          handleRecommendCancle={handleRecommendCancle}
          handleAddToMorphing={handleAddToMorphing}
          setIsRecommend={setIsRecommend}
          setNonRecommend={setNonRecommend}
          nonRecommend={nonRecommend}
        />
      ) : (
        <RecommendInActive
          nonMembers={nonMembers}
          handleButtonClick={handleButtonClick}
          handleAddButtonClick={handleAddButtonClick}
          allPings={allPings}
          lastPingElementRef={lastPingElementRef}
          selectedButton={selectedButton}
          handleRefresh={handleRefresh}
          eventName={eventName}
          id={id}
          router={router}
        />
      )}
    </div>
  );
};

export default BottomDrawer;
