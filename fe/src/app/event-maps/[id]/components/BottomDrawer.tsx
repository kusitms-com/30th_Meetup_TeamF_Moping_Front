import React, { useState } from "react";
import Image from "next/image";
import { useLocationStore } from "../stores/useLocationStore";
import useDataStore from "../stores/useDataStore";

export default function BottomDrawer() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const moveToLocation = useLocationStore((state) => state.moveToLocation);

  const nonMembers = useDataStore((state) => state.data?.nonMembers || []);
  console.log(nonMembers);
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

  const handleButtonClick = (id: number) => {
    setSelectedButton((prevId) => (prevId === id ? null : id));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: window.location.href,
        })
        .then()
        .catch();
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <div className="w-full h-[218px] bg-grayscale-90 z-10 rounded-t-xlarge">
      <div className="absolute mr-[16px] right-0 -top-[120px] flex flex-col">
        <button
          type="button"
          className="w-[48px] h-[48px] mb-[12px] shadow-medium"
          onClick={handleShare}
        >
          <Image src="/svg/share.svg" alt="share" width={48} height={48} />
        </button>
        <button
          type="button"
          className="w-[48px] h-[48px] shadow-medium"
          onClick={handleLocationClick}
        >
          <Image
            src="/svg/my-location.svg"
            alt="location"
            width={48}
            height={48}
          />
        </button>
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
        <div className="truncate max-w-[210px]">
          텍스트텍스트텍스트텍스트텍스트
        </div>
        <div>
          <button type="button" className="w-[32px] h-[32px]">
            <Image
              src={
                selectedButton !== null ? "/svg/edit.svg" : "/svg/refresh.svg"
              }
              alt={selectedButton !== null ? "edit" : "refresh"}
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
      <div className="h-[96px] w-full flex pt-[6px] px-[16px] text-caption font-200 text-grayscale-20 overflow-x-auto scrollbar-hide gap-[12px]">
        <div className="w-[68px] h-[90px] flex flex-col justify-between shrink-0">
          <button type="button">
            <Image src="/svg/add.svg" alt="add" width={68} height={68} />
          </button>
        </div>
        {nonMembers.map((member) => (
          <div
            key={member.nonMemberId}
            className="w-[68px] h-[90px] flex flex-col justify-between shrink-0"
          >
            <button
              type="button"
              onClick={() => handleButtonClick(member.nonMemberId)}
              className={`w-[68px] h-[68px] ${
                selectedButton === member.nonMemberId
                  ? "border-2 rounded-lg border-primary-50"
                  : ""
              }`}
            >
              <Image src="/svg/add.svg" alt="add" width={68} height={68} />
            </button>
            <div className="text-center">{member.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
