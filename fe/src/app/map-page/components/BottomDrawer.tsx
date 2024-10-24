import React, { useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import { useLocationStore } from "../stores/useLocationStore";

export default function BottomDrawer() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null); // Allows deselection
  const moveToLocation = useLocationStore((state) => state.moveToLocation); // 상태에서 함수 가져오기

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          moveToLocation(latitude, longitude); // 현재 위치로 이동
        },
        () => alert("현재 위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  const handleButtonClick = (id: number) => {
    setSelectedButton((prevId) => (prevId === id ? null : id)); // Toggle selection and deselection
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "공유할 제목",
          text: "공유할 내용",
          url: window.location.href, // 현재 페이지의 URL을 공유
        })
        .then()
        .catch();
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  const buttons = [
    { label: "메롱메롱", id: 1 },
    { label: "메롱메롱", id: 2 },
    { label: "메롱메롱", id: 3 },
    { label: "메윤소민", id: 4 },
    { label: "메롱윤소민", id: 5 },
    { label: "메롱윤소민", id: 6 },
  ];

  return (
    <div className="w-[100%] h-[218px] bg-grayscale-90 z-10 rounded-t-xlarge">
      <div className="absolute mr-[16px] right-0 -top-[120px] flex flex-col">
        <button
          type="button"
          className="w-[48px] h-[48px] mb-[12px]"
          onClick={handleShare}
        >
          <Image src="/svg/share.svg" alt="share" width={48} height={48} />
        </button>
        <button
          type="button"
          className="w-[48px] h-[48px]"
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
              src="/svg/refresh.svg"
              alt="refresh"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
      <div className="h-[96px] w-full flex pt-[6px] px-[16px] text-caption font-200 text-grayscale-20 overflow-x-auto scrollbar-hide">
        <div className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between shrink-0">
          <button type="button">
            <Image src="/svg/add.svg" alt="add" width={68} height={68} />
          </button>
        </div>
        {buttons.map((button) => (
          <div
            key={button.id}
            className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between shrink-0"
          >
            <button
              type="button"
              onClick={() => handleButtonClick(button.id)}
              className={`w-[68px] h-[68px] ${
                selectedButton === button.id
                  ? "border-2 rounded-lg border-primary-50"
                  : ""
              }`}
            >
              <Image src="/svg/add.svg" alt="add" width={68} height={68} />
            </button>
            <div className="text-center">{button.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
