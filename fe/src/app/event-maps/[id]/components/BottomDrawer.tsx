import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";
import RecommendButton from "./RecommendButton";
import {
  ShareButton,
  RefreshButton,
  EditButton,
  MemberButton,
} from "./ButtonComponents";
import StoreItem from "./StoreItem";

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
  const { setCustomMarkers } = useMarkerStore();
  const moveToLocation = useLocationStore((state) => state.moveToLocation);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAllPings = async () => {
      try {
        const response = await fetch(`${apiUrl}/nonmembers/pings?uuid=${id}`);
        if (response.ok) {
          const data = await response.json();
          setEventName(data.eventName || "");
          setNonMembers(data.nonMembers || []);
          setAllPings(data.pings || []);
          setCustomMarkers(data.pings || []);
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
      <div className="absolute ml-[16px] left-0 -top-[60px] flex">
        <RecommendButton onClick={handleLocationClick} />
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
      <div className="h-[62px] w-full pt-[16px] pb-[14px] pl-[20px] pr-[16px] flex justify-between text-lg text-grayscale-0 font-300">
        <div className="truncate max-w-[169px]">{eventName}</div>
        <div>
          <ShareButton
            onClick={() => navigator.share({ url: window.location.href })}
          />
          {selectedButton !== null ? (
            <EditButton
              onClick={() => router.push(`/edit-event/${id}/${selectedButton}`)}
            />
          ) : (
            <RefreshButton onClick={handleRefresh} />
          )}
        </div>
      </div>
      <div className="h-[96px] w-full flex pt-[6px] px-[16px] text-caption font-200 text-grayscale-20 overflow-x-auto scrollbar-hide gap-[12px]">
        <div className="w-[68px] h-[90px] flex flex-col justify-between shrink-0">
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="w-[68px] h-[68px] rounded-lg"
          >
            <Image src="/svg/add.svg" alt="add" width={68} height={68} />
          </button>
        </div>
        {nonMembers.map((member) => (
          <div
            key={member.nonMemberId}
            className="w-[68px] h-[90px] flex flex-col justify-between shrink-0"
          >
            <MemberButton
              member={member}
              isSelected={selectedButton === member.nonMemberId}
              onClick={handleButtonClick}
            />
            <div className="text-center">{member.name}</div>
          </div>
        ))}
      </div>
      {/* Infinite scroll area */}
      <div className="h-[484px] flex flex-col gap-[12px] p-[20px]">
        {allPings.map((ping, index) => (
          <StoreItem key={index} name={ping.placeName} type="Store Type Here" />
        ))}
      </div>
    </div>
  );
};

export default BottomDrawer;
