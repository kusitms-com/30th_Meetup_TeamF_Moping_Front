import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { EventNameInputProps } from "@/app/eventcreate-page/types/types";

function EventNameInput({
  className,
  selectedLocation,
  onChange,
  value,
}: EventNameInputProps) {
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const showWarning = hasUserEdited && value.trim().length < 1;

  useEffect(() => {
    if (!hasUserEdited) {
      const newEventName = selectedLocation ? `${selectedLocation} 모임` : "";
      onChange(newEventName);
    }
  }, [selectedLocation, onChange, hasUserEdited]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasUserEdited(true);
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setHasUserEdited(true);
    onChange("");
  }, [onChange]);

  return (
    <div className={`relative flex flex-col mt-4 ${className}`}>
      <label className="text-[#2c2c2c] text-lg font-semibold leading-relaxed mb-2">
        우리의 모임 이름은?
      </label>

      <div
        className={`relative w-[328px] h-14 p-4 bg-[#f7f7f7] rounded-lg flex justify-between items-center border-2 ${
          showWarning ? "border-danger-base" : "border-transparent"
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="모임"
          className="bg-transparent text-[#2c2c2c] text-base font-medium outline-none flex-grow"
          aria-label="이벤트 이름 입력"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="w-5 h-5 cursor-pointer"
            aria-label="이름 삭제"
          >
            <Image
              src="/images/Cancel.svg"
              alt="삭제 아이콘"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {showWarning && (
        <p className="text-danger-base text-sm font-medium mt-2">
          모임명은 1자 이상 작성 가능해요
        </p>
      )}
    </div>
  );
}

export default EventNameInput;
