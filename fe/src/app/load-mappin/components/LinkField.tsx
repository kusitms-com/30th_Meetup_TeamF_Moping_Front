"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LinkFieldProps {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  showTooltip?: boolean;
  onInfoClick?: () => void;
}

export default function LinkField({
  label,
  placeholder,
  value,
  onChange,
}: LinkFieldProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (index: number, inputValue: string) => {
    const newInputs = [...value];
    newInputs[index] = inputValue;
    onChange(newInputs);
  };

  const addInputField = () => {
    onChange([...value, ""]);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mb-[48px]">
      <label className="text-grayscale-80 font-300 text-lg mb-[8px] flex items-center">
        {label}
        {label === "맵핀 모음 링크" && (
          <div
            className="relative group"
            onClick={() => setShowTooltip(true)}
            ref={tooltipRef}
          >
            <Image
              src="/svg/infomation.svg"
              alt="infomation"
              width={24}
              height={24}
              className="ml-[6px] cursor-pointer"
            />
            {showTooltip && (
              <div className="absolute left-1/2 -translate-x-[48.5%] bottom-full mb-2 bg-black text-white text-caption rounded px-[12px] py-[10px] w-[215px]">
                즐겨찾기 링크 복사 방법을 확인해보세요
                <div className="absolute left-1/2 bottom-[-6px] -translate-x-[48.5%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>
              </div>
            )}
          </div>
        )}
      </label>
      <div className="flex flex-col items-center border-grayscale-10 border p-[16px] gap-[16px] rounded-medium">
        {value.map((inputValue, index) => (
          <input
            key={index}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 mt-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          />
        ))}
        <button type="button" onClick={addInputField}>
          <Image src="/svg/linkAdd.svg" alt="linkAdd" width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
