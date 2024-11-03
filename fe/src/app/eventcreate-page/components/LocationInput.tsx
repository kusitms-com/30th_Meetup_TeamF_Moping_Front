"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocationStore } from "@/app/eventcreate-page/stores/useLocationStore";
import { LocationInputProps } from "@/app/eventcreate-page/types/types"; // Place 임포트 제거

function LocationInput({
  className,
  value = "",
  onSelect,
}: LocationInputProps) {
  const router = useRouter();
  const { selectedLocation } = useLocationStore();
  const [location, setLocationState] = useState(value);

  // selectedLocation이 변경될 때 location 상태를 업데이트
  useEffect(() => {
    if (selectedLocation && selectedLocation.name !== location) {
      setLocationState(selectedLocation.name);
      if (onSelect) {
        onSelect(selectedLocation); // selectedLocation을 상위 컴포넌트로 전달
      }
    }
  }, [selectedLocation, onSelect, location]);

  // input 필드의 value가 변경될 때 상태를 업데이트
  useEffect(() => {
    setLocationState(value);
  }, [value]);

  const handleLocationInputClick = () => {
    router.push("/eventcreate-page/location-search");
  };

  return (
    <div className={`relative flex flex-col ${className} mt-4`}>
      <div className="text-[#2c2c2c] text-xl font-semibold font-['Pretendard'] leading-loose mb-4">
        어떤 공간을 찾고 계신가요?
      </div>
      <button
        type="button"
        className="relative w-[328px] h-14 px-4 bg-[#f7f7f7] rounded-lg flex items-center mb-4 cursor-pointer"
        onClick={handleLocationInputClick}
      >
        <Image
          src="/images/Search.svg"
          alt="돋보기 아이콘"
          width={24}
          height={24}
          className="mr-3"
        />
        <input
          type="text"
          value={location}
          placeholder="장소를 입력해주세요"
          className="bg-transparent border-none flex-grow text-[#2c2c2c] text-base font-medium font-['Pretendard'] leading-normal outline-none"
          readOnly
        />
      </button>
    </div>
  );
}

export default LocationInput;
