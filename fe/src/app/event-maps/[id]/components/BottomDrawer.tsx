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
}

interface BottomDrawerProps {
  nonMembers: NonMember[];
  eventName: string;
  id: string;
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
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [recommendPings, setRecommendPings] = useState([]);

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
          console.log(data);
          setEventName(data.eventName || "");
          setNonMembers(data.nonMembers || []);
          setAllPings(data.pings || []);
          setCustomMarkers(data.pings || []);
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

  const handleRecommendClick = async () => {
    let Km = 1.0;
    let found = false;

    while (Km <= 5.0) {
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

          if (data.recommendPings && data.recommendPings.length >= 5) {
            console.log(
              "Found more than or equal to 5 pings at radius:",
              Km,
              "km"
            );
            setRecommendPings(data.recommendPings); // 데이터를 상태에 저장
            found = true;
            break;
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

      Km += 1.0;
    }

    setIsRecommend(found); // 상태 업데이트는 검색 결과에 따라 결정
  };

  const handleAddToMorphing = () => {
    console.log("앙");
    if (recommendPings.length > 0) {
      console.log("Adding selected pings to morphing...", recommendPings);
      console.log("버튼눌림");
      setCustomMarkers(recommendPings);
      setIsRecommend(false);
    } else {
      console.log("No pings available to add to morphing.");
    }
  };

  const handleRecommendCancle = () => {
    setIsRecommend(false);
  };
  const handleButtonClick = (nonMemberId: number) => {
    const isSelected = selectedButton === nonMemberId;
    setSelectedButton(isSelected ? null : nonMemberId);
    const pingsToShow = isSelected
      ? allPings
      : allPings.filter((ping) => ping.iconLevel === 1);
    setCustomMarkers(pingsToShow);
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
      {!isRecommend && (
        <div className="absolute ml-[16px] left-0 -top-[60px] flex">
          <RecommendButton onClick={handleRecommendClick} />
        </div>
      )}
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
