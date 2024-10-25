"use client";

import React from "react";
import { ButtonProps } from "@/types/types"; // 타입 import

// 함수 선언 방식으로 컴포넌트 정의
function Button({ label, onClick, type = "start", className }: ButtonProps) {
  const buttonStyle =
    type === "start"
      ? "bg-darkGray text-grayscale-0"
      : "bg-gray-500 text-grayscale-0";

  return (
    <div className="w-full fixed bottom-[45px] left-0 right-0 flex justify-center">
      <button
        type="button" // type 속성 추가
        onClick={onClick}
        className={`${buttonStyle} ${className} w-[328px] h-[60px] py-[17px] rounded-lg`}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
