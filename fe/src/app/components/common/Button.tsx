"use client";

import React from "react";
import { ButtonProps } from "@/types/types";

function Button({
  label,
  onClick,
  type = "start",
  className,
  disabled = false,
}: ButtonProps) {
  let buttonStyle = "bg-gray-200 text-gray-500 cursor-not-allowed";

  if (!disabled) {
    buttonStyle =
      type === "start"
        ? "bg-darkGray text-white"
        : "bg-gray-500 text-grayscale-0";
  }

  return (
    <div className="w-full fixed bottom-[45px] left-0 right-0 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className={`${buttonStyle} ${className} w-[328px] h-[60px] py-[17px] rounded-lg`}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
