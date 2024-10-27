"use client";

import React, { useRef } from "react";

interface PinFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function PinField({ value, onChange }: PinFieldProps) {
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePINChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    // Only accept numeric input and ensure a single character
    if (/^\d?$/.test(inputValue)) {
      const newPin = [...value];
      newPin[index] = inputValue;
      onChange(newPin);

      // Move focus to the next input if a digit is entered
      if (inputValue && index < pinRefs.current.length - 1) {
        pinRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle "Backspace" to move focus to the previous input if empty
    if (e.key === "Backspace") {
      const newPin = [...value];
      newPin[index] = ""; // Clear the current value on Backspace
      onChange(newPin);

      if (!value[index] && index > 0) {
        pinRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="mb-[52px]">
      <label htmlFor="pin" className="block text-gray-700 font-medium mb-[8px]">
        비밀번호(PIN) <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-3">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="password"
            maxLength={1}
            ref={(el) => {
              pinRefs.current[index] = el || null;
            }}
            value={value[index]}
            onChange={(e) => handlePINChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-1/4 p-3 text-center border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          />
        ))}
      </div>
    </div>
  );
}
