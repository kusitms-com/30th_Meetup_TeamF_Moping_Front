"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // next/image import
import { EventNameInputProps } from "@/types/types"; // 타입 import

const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${month}.${day}`;
};

// 함수 선언 방식으로 컴포넌트 작성
function EventNameInput({
  className,
  selectedLocation,
  onChange,
}: EventNameInputProps) {
  const [eventName, setEventName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasUserEdited, setHasUserEdited] = useState(false); // 사용자가 직접 수정했는지 확인
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const currentDate = getCurrentDate();

  useEffect(() => {
    if (!hasUserEdited) {
      const newEventName = selectedLocation
        ? `${currentDate} ${selectedLocation} 모임`
        : `${currentDate} 모임`;
      setEventName(newEventName);
      onChange(newEventName);
    }
    setIsLoading(false);
  }, [selectedLocation, currentDate, onChange, hasUserEdited]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEventName(newValue);
    setHasUserEdited(true); // 사용자가 수동으로 입력하면 플래그를 설정
    onChange(newValue);
  };

  const handleClear = () => {
    setEventName("");
    setHasUserEdited(true); // 수동으로 입력이 변경되었음을 알림
    onChange("");
  };

  const borderClass = isFocused ? "border-[#2C2C2C]" : "border-transparent";
  const textColorClass =
    eventName === `${currentDate} 모임` ||
    eventName === `${currentDate} ${selectedLocation} 모임`
      ? "text-mediumGray"
      : "text-text-default";

  const charCount = eventName.length;
  const showWarning = !isLoading && (charCount < 1 || charCount > 20); // 로딩 중일 때는 경고 숨김
  const isDefaultValue =
    eventName === `${currentDate} 모임` ||
    eventName === `${currentDate} ${selectedLocation} 모임`;

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="text-text-default text-xl font-semibold leading-loose mb-[12px]">
        이벤트 이름
      </div>

      <div
        className={`relative w-[328px] h-14 p-4 bg-background-light rounded-lg flex justify-between items-center border-2 ${
          showWarning ? "border-danger-base" : borderClass
        }`}
      >
        <input
          type="text"
          value={eventName}
          onChange={handleInputChange}
          className={`bg-transparent border-none grow shrink basis-0 ${textColorClass} text-base font-medium font-['Pretendard'] leading-normal outline-none flex-1`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {eventName && !isDefaultValue && (
          <div
            role="button" // 상호작용 요소로 설정
            tabIndex={0} // 키보드로 접근 가능
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClear();
            }}
            className="w-5 h-5 relative cursor-pointer"
          >
            {/* next/image를 사용하여 성능 최적화 */}
            <Image
              src="/images/Cancel.svg"
              alt="삭제 아이콘"
              layout="fill" // 이미지 크기 최적화
              objectFit="cover"
            />
          </div>
        )}
      </div>

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
