"use client";

import React, { useRef } from "react";

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

  const handlePINChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    if (/^\d?$/.test(inputValue)) {
      const newPin = [...value];
      newPin[index] = inputValue;
      onChange(newPin);

      // 입력 후 다음 칸으로 이동
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

      // 현재 칸 값 지우기 또는 이전 칸으로 이동하며 값 삭제
      if (newPin[index]) {
        newPin[index] = "";
      } else if (index > 0) {
        newPin[index - 1] = "";
        pinRefs[index - 1].current?.focus();
      }
      onChange(newPin);
    }
  };

  return (
    <div className="mb-[52px]">
      <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">
        비밀번호(PIN) <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-3">
        <input
          type="password"
          maxLength={1}
          ref={pinRefs[0]}
          value={value[0]}
          onChange={(e) => handlePINChange(e, 0)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          className="w-1/4 p-3 text-center border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
        />
        <input
          type="password"
          maxLength={1}
          ref={pinRefs[1]}
          value={value[1]}
          onChange={(e) => handlePINChange(e, 1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          className="w-1/4 p-3 text-center border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
        />
        <input
          type="password"
          maxLength={1}
          ref={pinRefs[2]}
          value={value[2]}
          onChange={(e) => handlePINChange(e, 2)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          className="w-1/4 p-3 text-center border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
        />
        <input
          type="password"
          maxLength={1}
          ref={pinRefs[3]}
          value={value[3]}
          onChange={(e) => handlePINChange(e, 3)}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          className="w-1/4 p-3 text-center border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
        />
      </div>
    </div>
  );
}
