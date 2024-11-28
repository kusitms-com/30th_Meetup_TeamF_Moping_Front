"use client";

import React from "react";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "start" | "next" | "submit" | "default";
  className?: string;
  disabled?: boolean;
}

function Button({
  label,
  onClick,
  type = "default",
  className = "",
  disabled = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    if (disabled) {
      return "bg-[#E4E4E4] text-[#8E8E8E] cursor-not-allowed";
    }
    switch (type) {
      case "start":
        return "bg-[#F73A2C] text-white";
      case "next":
      case "submit":
        return "bg-[#1D1D1D] text-white";
      default:
        return "bg-[#1D1D1D] text-white";
    }
  };

  return (
    <div className="w-full fixed bottom-[20px] left-0 right-0 flex justify-center">
      <button
        type={type === "submit" ? "submit" : "button"}
        onClick={onClick}
        className={`${getButtonStyle()} ${className} w-[328px] h-[60px] py-[17px] rounded-lg justify-center items-center inline-flex`}
        disabled={disabled}
      >
        <div className="text-center text-lg font-medium font-['Pretendard'] leading-relaxed">
          {label}
        </div>
      </button>
    </div>
  );
}

export default Button;
