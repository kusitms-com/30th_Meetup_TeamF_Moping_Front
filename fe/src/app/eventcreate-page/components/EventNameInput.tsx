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
  const [isFocused, setIsFocused] = useState(false);
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = getCurrentDate();

  useEffect(() => {
    if (!hasUserEdited) {
      const newEventName = selectedLocation
        ? `${currentDate} ${selectedLocation} 모임`
        : `${currentDate} 모임`;
      onChange(newEventName);
    }
    setIsLoading(false);
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

  const borderClass = isFocused ? "border-[#2C2C2C]" : "border-transparent";
  const textColorClass =
    value === `${currentDate} 모임` ||
    value === `${currentDate} ${selectedLocation} 모임`
      ? "text-mediumGray"
      : "text-[#8e8e8e]";

  const charCount = value.length;
  const showWarning = charCount < 1 || charCount > 20;
  const isDefaultValue =
    value === `${currentDate} 모임` ||
    value === `${currentDate} ${selectedLocation} 모임`;

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="text-black text-xl font-semibold leading-loose mb-[12px]">
        이벤트 이름
      </div>

      <div
        className={`relative w-[328px] h-14 p-4 bg-background-light rounded-lg flex justify-between items-center border-2 ${
          showWarning && !isLoading ? "border-danger-base" : borderClass
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className={`bg-transparent border-none grow shrink basis-0 ${textColorClass} text-base font-medium font-['Pretendard'] leading-normal outline-none flex-1`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {value && !isDefaultValue && (
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

      {/* 로딩 중이 아닐 때 글자 수 검사 결과 표시 */}
      {!isLoading && (
        <>
          {showWarning ? (
            <div className="text-danger-base text-sm font-medium font-['Pretendard'] leading-tight mt-2">
              글자 수는 1 - 20자 사이로 입력해주세요
            </div>
          ) : (
            !isDefaultValue && (
              <div className="text-right text-mediumGray text-sm font-medium font-['Pretendard'] leading-tight mt-2">
                {charCount}/20
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default EventNameInput;
