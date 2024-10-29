import React, { useState } from "react";
import Image from "next/image";

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NameField({ value, onChange }: NameFieldProps) {
  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue) && inputValue.length <= 6) {
      onChange(inputValue);
      setShowError(false);
    } else {
      setShowError(
        inputValue.length > 7 || !/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue)
      );
    }
  };

  const clearInput = () => {
    onChange("");
    setShowError(false);
  };

  return (
    <div className="relative mb-[20px]">
      <label
        htmlFor="name"
        className="block text-gray-700 font-medium mb-[8px]"
      >
        이름 <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="name"
          value={value}
          onChange={handleChange}
          placeholder="이름"
          className="w-full p-3 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          style={{
            border: "none",
          }}
        />
        {value && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Image src="/svg/delete.svg" alt="delete" width={20} height={20} />
          </button>
        )}
      </div>
      <div className="flex justify-between text-sm mt-1">
        {showError ? (
          <div className="text-blue-500">공백, 특수문자, 숫자 불가</div>
        ) : null}
        <div className="ml-auto text-gray-500">{value.length}/6</div>
      </div>
    </div>
  );
}
