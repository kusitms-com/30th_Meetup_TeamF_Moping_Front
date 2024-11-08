"use client";

import React, { useRef, useEffect } from "react";
import { nanoid } from "nanoid"; // Import nanoid for generating unique IDs

interface PinFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function PinField({ value, onChange }: PinFieldProps) {
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // 컴포넌트가 마운트될 때 localStorage에서 PIN 로드
  useEffect(() => {
    const storedPin = localStorage.getItem("userPin");
    if (storedPin) {
      const pinArray = storedPin.split("") as string[];
      onChange(pinArray);
    }
  }, [onChange]);

  // PIN 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("userPin", value.join(""));
  }, [value]);

  const handlePINChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    if (/^\d?$/.test(inputValue)) {
      const newPin = [...value];
      newPin[index] = inputValue;
      onChange(newPin);

      // 다음 입력 필드로 포커스 이동
      if (inputValue && index < pinRefs.length - 1) {
        pinRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newPin = [...value];

      if (newPin[index]) {
        newPin[index] = ""; // 현재 입력 필드 지우기
      } else if (index > 0) {
        newPin[index - 1] = ""; // 이전 필드 지우고 포커스 이동
        pinRefs[index - 1].current?.focus();
      }
      onChange(newPin);
    }
  };

  // Create an array of unique IDs for the input fields
  const inputFieldIds = Array.from({ length: 4 }, () => nanoid());

  return (
    <div className="mb-[52px]">
      <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">
        비밀번호(PIN) <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-3">
        {inputFieldIds.map((id, index) => (
          <input
            key={id} // Use unique ID as key
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={pinRefs[index]}
            value={value[index]}
            onChange={(e) => handlePINChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-1/4 p-3 text-center rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
            style={{ border: "none" }}
          />
        ))}
      </div>
    </div>
  );
}
