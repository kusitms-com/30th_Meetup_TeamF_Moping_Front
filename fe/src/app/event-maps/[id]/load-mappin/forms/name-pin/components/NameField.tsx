"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function NameField({
  value,
  onChange,
  inputRef,
  onFocus,
  onBlur,
}: NameFieldProps) {
  const [localErrorType, setLocalErrorType] = useState<"invalid" | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const charLimit = 6;
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      onChange(storedName);
    }
  }, [onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > charLimit) {
      return;
    }

    if (/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue)) {
      setLocalErrorType(null);
      onChange(inputValue);
    } else {
      setLocalErrorType("invalid");
    }
  };

  const clearInput = () => {
    onChange("");
    localStorage.removeItem("userName");
    setLocalErrorType(null);
    inputRef.current?.focus();
  };

  const getInputBorderClass = () => {
    if (localErrorType) {
      return "border-2 border-[#f73a2c] focus:ring-0";
    }
    if (isFocused) {
      return "border-2 border-[#555555] focus:ring-0";
    }
    return "border-transparent";
  };

  useEffect(() => {
    if (localErrorType === null) {
      localStorage.setItem("userName", value);
    }
  }, [value, localErrorType]);

  return (
    <div className="relative mb-[24px]">
      <label
        htmlFor="name"
        className="block text-[#8E8E8E] font-medium mb-[4px]"
      >
        내 닉네임 <span className="text-[#f73a2c]">*</span>
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id="name"
          value={value}
          onChange={handleChange}
          placeholder="김모핑"
          onFocus={() => {
            setIsFocused(true);
            if (onFocus) {
              onFocus();
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) {
              onBlur();
            }
          }}
          className={`w-[328px] h-[56px] px-4 bg-gray-50 rounded-lg focus:outline-none ${getInputBorderClass()}`}
        />
        {value && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-[16px] top-1/2 transform -translate-y-1/2"
          >
            <Image src="/svg/delete.svg" alt="delete" width={20} height={20} />
          </button>
        )}
      </div>
      {(isFocused || value) && (
        <div className="flex justify-between items-center mt-[8px]">
          <div
            className={`text-sm ${
              localErrorType ? "text-[#f73a2c]" : "text-[#3a91ea]"
            }`}
          >
            {localErrorType
              ? "공백, 특수문자, 숫자는 사용할 수 없어요"
              : "공백, 특수문자, 숫자 불가"}
          </div>
          {value && (
            <div className="text-sm text-[#8e8e8e] font-medium font-['Pretendard'] leading-tight">
              {value.length}/{charLimit}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
