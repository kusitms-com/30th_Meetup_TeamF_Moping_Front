"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "start" | "next"; // 'start'는 시작하기 버튼, 'next'는 다음 버튼
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "start",
  className,
}) => {
  const buttonStyle =
    type === "start"
      ? "bg-darkGray text-white"
      : "bg-lightGray text-mediumGray";

  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} ${className} w-[328px] h-[60px] py-[17px] rounded-lg`}
    >
      {label}
    </button>
  );
};

export default Button;
