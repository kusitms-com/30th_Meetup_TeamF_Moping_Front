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

  useEffect(() => {
    // 공백, 특수문자, 숫자 불가 오류가 없을 경우만 `exists` 오류를 표시
    if (errorType === "exists" && !localErrorType) {
      setLocalErrorType(null);
    }
  }, [errorType, localErrorType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 글자 수가 6자 이하이며 유효한 입력일 때만 상태 업데이트
    if (/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue) && inputValue.length <= 6) {
      setLocalErrorType(null); // Clear local error if valid input
      onChange(inputValue);
    } else if (
      inputValue.length <= 6 &&
      !/^[ㄱ-ㅎ가-힣a-zA-Z]*$/.test(inputValue)
    ) {
      setLocalErrorType("invalid"); // Set error type only if input is invalid
    }
  };

  const clearInput = () => {
    onChange("");
    setLocalErrorType(null);
  };

  const getInputBorderClass = () => {
    if (errorType === "exists" && !localErrorType) {
      return "border-2 border-danger-base focus:ring-danger-base";
    }
    return "focus:ring-grayscale-80";
  };

  // 조건에 따라 표시할 메시지 설정
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
          style={{
            border:
              errorType === "exists" && !localErrorType
                ? "1px solid #DC2626"
                : "none",
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
        {message}
        <div className="ml-auto text-gray-500">{value.length}/6</div>
      </div>
    </div>
  );
}
