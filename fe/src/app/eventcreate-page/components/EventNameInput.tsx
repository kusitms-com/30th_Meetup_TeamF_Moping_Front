// components/EventNameInput.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EventNameInputProps } from "@/app/eventcreate-page/types/types";

const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${month}.${day}`;
};

function EventNameInput({
  className,
  selectedLocation,
  onChange,
  value,
}: EventNameInputProps) {
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const currentDate = getCurrentDate();

  useEffect(() => {
    if (!hasUserEdited && selectedLocation) {
      const newEventName = `${currentDate} ${selectedLocation} 모임`;
      onChange(newEventName);
    } else if (!selectedLocation && !hasUserEdited) {
      onChange("");
    }
  }, [selectedLocation, currentDate, onChange, hasUserEdited]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHasUserEdited(true);
    onChange(newValue);
  };

  const handleClear = () => {
    setHasUserEdited(true);
    onChange("");
  };

  const borderClass = "border-transparent";
  const showWarning = hasUserEdited && value.trim().length < 1;

  return (
    <div className={`relative flex flex-col ${className} mt-4`}>
      <div className="text-[#2c2c2c] text-lg font-semibold font-['Pretendard'] leading-relaxed mb-2">
        이벤트 이름
      </div>

      <div
        className={`relative w-[328px] h-14 p-4 bg-[#f7f7f7] rounded-lg flex justify-between items-center border-2 ${
          showWarning ? "border-danger-base" : borderClass
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={`${currentDate} 모임`}
          className="bg-transparent border-none grow shrink basis-0 text-[#2c2c2c] text-base font-medium font-['Pretendard'] leading-normal outline-none flex-1"
        />

        {value && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClear();
            }}
            className="w-5 h-5 relative cursor-pointer"
          >
            <Image
              src="/images/Cancel.svg"
              alt="삭제 아이콘"
              width={24}
              height={24}
            />
          </div>
        )}
      </div>

      {showWarning && (
        <div className="text-danger-base text-sm font-medium font-['Pretendard'] leading-tight mt-2">
          모임명은 1자 이상 작성 가능해요
        </div>
      )}
    </div>
  );
}

export default EventNameInput;
