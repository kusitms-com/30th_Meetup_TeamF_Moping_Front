import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";
import { RecommendButton } from "./RecommendButton";
import { RecommendInActive } from "./RecommendInActive";
import LocationButton from "./LocationButton";
import { RecommendActive } from "./RecommendActive";
import useUpdateTimeStore from "../stores/useUpdateTime";

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
  sid: string;
}

interface BottomDrawerProps {
  nonMembers: NonMember[];
  eventName: string;
  id: string;
}

interface RecommendPing {
  placeName: string;
  sid: string;
  px: number;
  py: number;
  url: string;
  type: string;
}

interface CustomRecommendPing {
  iconLevel: number;
  placeName: string;
  sid: string;
  px: number;
  py: number;
  url: string;
  type: string;
}

export function BottomDrawer({
  nonMembers: initialNonMembers,
  eventName: initialEventName,
  id,
}: BottomDrawerProps): JSX.Element {
  const [eventName, setEventName] = useState<string>(initialEventName);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [nonMembers, setNonMembers] = useState<NonMember[]>(initialNonMembers);
  const [allPings, setAllPings] = useState<Ping[]>([]);
  const [recommendPings, setrecommendPings] = useState<RecommendPing[]>([]);
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [nonRecommend, setNonRecommend] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { setUpdateTime } = useUpdateTimeStore();

  const { setCustomMarkers } = useMarkerStore();
  const moveToLocation = useLocationStore((state) => state.moveToLocation);

  const router = useRouter();
  const lastPingElementRef = useRef(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllPings = async () => {
      try {
        const response = await fetch(`${apiUrl}/pings?uuid=${id}`);
        if (response.ok) {
          const data = await response.json();
          let recommendProfile = [];
          if (data.recommendPings && data.recommendPings.length > 0) {
            setIsRecommended(true);
            recommendProfile = data.recommendPings.map(
              (ping: CustomRecommendPing) => ({
                iconLevel: 10,
                nonMembers: [
                  {
                    nonMemberId: -1,
                    name: "추천 모핑",
                    profileSvg: "/profile/level10.svg",
                  },
                ],
                url: ping.url,
                placeName: ping.placeName,
                px: ping.px,
                py: ping.py,
                type: ping.type,
              })
            );
          }
          setEventName(data.eventName || "");
          setNonMembers([
            ...(recommendProfile[0]?.nonMembers || []),
            ...(data.nonMembers || []),
          ]);
          setAllPings([...(data.pings || []), ...(recommendProfile || [])]);
          setCustomMarkers([
            ...(data.pings || []),
            ...(recommendProfile || []),
          ]);
          setNeighborhood(data.neighborhood);
          console.log(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAllPings();
  }, [apiUrl, id, setCustomMarkers, trigger]);

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

  const handleAddToMorphing = async () => {
    const uuid = id;
    const sids = recommendPings.map((item) => item.sid);

    const requestBody = {
      uuid,
      sids,
    };

    try {
      const response = await fetch(`${apiUrl}/pings/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Recommended Data Response:", result);
      setTrigger((prev) => !prev);
      setIsRecommend(false);
    } catch (error) {
      console.error("Error fetching recommended data:", error);
    }
  };

  const handleRecommendShowClick = async () => {
    const Km = 1.0;
    let found = false;
    try {
      const response = await fetch(
        `${apiUrl}/pings/recommend?uuid=${id}&radiusInKm=${Km}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.recommendPings.length === 0) {
          setNonRecommend(true);
          found = true;
          setIsRecommend(found);
        } else if (data.recommendPings.length >= 1) {
          setCustomMarkers(data.recommendPings);
          found = true;
          setrecommendPings(data.recommendPings);
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
  };

  const handleRecommendCancle = () => {
    setTrigger((prev) => !prev);
    setIsRecommend(false);
  };

  const handleButtonClick = (nonMemberId: number) => {
    const isSelected = selectedButton === nonMemberId;
    setSelectedButton(isSelected ? null : nonMemberId);

    const pingsToShow = isSelected
      ? [...allPings]
      : allPings.filter((ping) =>
          ping.nonMembers.some((member) => member.nonMemberId === nonMemberId)
        );

    setCustomMarkers(pingsToShow);
  };

  const handleAddButtonClick = () => {
    router.push(`/event-maps/${id}/load-mappin/forms/name-pin`);
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch(`${apiUrl}/pings/refresh-all?uuid=${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        let recommendProfile = [];
        if (data.recommendPings && data.recommendPings.length > 0) {
          setIsRecommended(true);

          recommendProfile = data.recommendPings.map(
            (ping: CustomRecommendPing) => ({
              iconLevel: 10,
              nonMembers: [
                {
                  nonMemberId: -1,
                  name: "추천 모핑",
                  profileSvg: "/profile/level10.svg",
                },
              ],
              url: ping.url,
              placeName: ping.placeName,
              px: ping.px,
              py: ping.py,
              type: ping.type,
            })
          );
        }
        setEventName(data.eventName || "");
        setNonMembers([
          ...(recommendProfile[0]?.nonMembers || []),
          ...(data.nonMembers || []),
        ]);
        setAllPings([...(data.pings || []), ...(recommendProfile || [])]);
        setCustomMarkers([...(data.pings || []), ...(recommendProfile || [])]);
        setNeighborhood(data.neighborhood);
        setUpdateTime(data.pingLastUpdateTime);
      } else {
        console.error("Failed to fetch refreshed data:", response.status);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="bottom-drawer w-full h-[760px] bg-grayscale-90 z-10 rounded-t-xlarge border-none"
    >
      {!isRecommend && !isRecommended && (
        <div className="absolute ml-[16px] left-0 -top-[60px] flex">
          <RecommendButton onClick={handleRecommendShowClick} />
        </div>
      )}
      <div className="absolute mr-[16px] right-0 -top-[60px] flex">
        <LocationButton onClick={handleLocationClick} />
      </div>
      <div className="w-full h-[20px] flex justify-center">
        <div className="w-[36px] h-[4px] rounded-[2.5px] bg-grayscale-70 mt-[12px]" />
      </div>

      {isRecommend ? (
        <RecommendActive
          neighborhood={neighborhood}
          handleRecommendCancle={handleRecommendCancle}
          handleAddToMorphing={handleAddToMorphing}
          setIsRecommend={setIsRecommend}
          nonRecommend={nonRecommend}
          setNonRecommend={setNonRecommend}
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
        />
      )}
    </div>
  );
}

export default BottomDrawer;
