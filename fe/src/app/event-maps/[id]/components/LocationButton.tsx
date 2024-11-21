import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

const LocationButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    type="button"
    className="w-[179px] h-[48px] shadow-medium bg-[#2d2d2d] flex justify-center items-center gap-[4px] text-white rounded-[6px]"
    onClick={onClick}
  >
    <Image src="/svg/bulb.svg" alt="bulb" width={30} height={30} />
  </button>
);

export default LocationButton;
