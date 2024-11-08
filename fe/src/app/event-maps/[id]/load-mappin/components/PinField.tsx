"use client";

import React, { useRef, useEffect } from "react";

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
        newPin[index] = ""; // 현재 입력 필드를 지웁니다.
        onChange(newPin);
      } else if (index > 0) {
        newPin[index - 1] = ""; // 이전 필드 지우고 포커스 이동
        onChange(newPin);
        pinRefs[index - 1].current?.focus();
      }
    }
  };

  // 입력 필드 렌더링
  return (
    <div className="mb-[52px]">
      <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">
        비밀번호(PIN) <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-3">
        <input
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={pinRefs[0]}
          value={value[0]}
          onChange={(e) => handlePINChange(e, 0)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          className="w-1/4 p-3 text-center rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          style={{ border: "none" }}
        />
        <input
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={pinRefs[1]}
          value={value[1]}
          onChange={(e) => handlePINChange(e, 1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          className="w-1/4 p-3 text-center rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          style={{ border: "none" }}
        />
        <input
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={pinRefs[2]}
          value={value[2]}
          onChange={(e) => handlePINChange(e, 2)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          className="w-1/4 p-3 text-center rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          style={{ border: "none" }}
        />
        <input
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={pinRefs[3]}
          value={value[3]}
          onChange={(e) => handlePINChange(e, 3)}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          className="w-1/4 p-3 text-center rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}
