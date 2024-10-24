// ButtonItem.tsx
import React from "react";
import { UserProps } from "../types/types";

const User: React.FC<UserProps> = ({
  id,
  label,
  selectedButton,
  handleButtonClick,
}) => {
  return (
    <div className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between shrink-0">
      <button
        type="button"
        onClick={() => handleButtonClick(id)}
        className={`w-[68px] h-[68px] ${
          selectedButton === id ? "border-2 rounded-lg border-primary-50" : ""
        }`}
      >
        <img src="/svg/add.svg" alt="add" />
      </button>
      <div className="text-center">{label}</div>
    </div>
  );
};

export default User;
