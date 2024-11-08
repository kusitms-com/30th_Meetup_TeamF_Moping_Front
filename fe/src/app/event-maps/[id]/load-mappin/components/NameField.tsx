import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
  errorType?: "exists" | "invalid" | null;
}

export default function NameField({
  value,
  onChange,
  errorType,
}: NameFieldProps) {
  const [localErrorType, setLocalErrorType] = useState<"invalid" | null>(null);

  // 컴포넌트가 마운트될 때 localStorage에서 이름 불러오기
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      onChange(storedName); // 로드된 이름으로 상태 업데이트
    }
  }, [onChange]);

  // errorType 변화에 따른 localErrorType 업데이트
  useEffect(() => {
    if (errorType === "exists" && !localErrorType) {
      setLocalErrorType(null);
    }
  }, [errorType, localErrorType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 유효성 검사
    if (/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue) && inputValue.length <= 6) {
      setLocalErrorType(null);
      onChange(inputValue);
      localStorage.setItem("userName", inputValue); // localStorage에 저장
    } else if (
      inputValue.length <= 6 &&
      !/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue)
    ) {
      setLocalErrorType("invalid");
    }
  };

  const clearInput = () => {
    onChange("");
    localStorage.removeItem("userName"); // localStorage에서 삭제
    setLocalErrorType(null);
  };

  const getInputBorderClass = () => {
    if (errorType === "exists" && !localErrorType) {
      return "border-2 border-danger-base focus:ring-danger-base";
    }
    return "focus:ring-grayscale-80";
  };

  let message = null;
  if (errorType === "exists" && !localErrorType) {
    message = <div className="text-danger-base">이미 존재하는 이름이에요</div>;
  } else if (localErrorType === "invalid") {
    message = (
      <div className="text-success-base">공백, 특수문자, 숫자 불가</div>
    );
  }

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
          className={`w-full p-3 bg-gray-50 rounded-md focus:outline-none focus:ring-2 ${getInputBorderClass()}`}
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
        {message}
        <div className="ml-auto text-gray-500">{value.length}/6</div>
      </div>
    </div>
  );
}
