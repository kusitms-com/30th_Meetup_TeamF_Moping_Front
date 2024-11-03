"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Directly define NavigationProps in this file
interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
}

function Navigation({
  showBackButton = true,
  title = "",
  onBack,
}: NavigationProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBack) {
      onBack(); // Use the provided onBack function if available
    } else {
      router.back(); // Otherwise, use router.back()
    }
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[360px] h-[56px] bg-white flex items-center justify-between px-4 z-10">
      {showBackButton && (
        <button type="button" onClick={handleBackClick} className="p-2">
          <Image
            src="/images/ArrowBack.svg"
            alt="뒤로가기"
            width={24}
            height={24}
          />
        </button>
      )}
      <h1
        className="text-lg font-semibold text-[#2c2c2c] mx-auto"
        style={{ width: "320px", textAlign: "center" }}
      >
        {title}
      </h1>
    </header>
  );
}

export default Navigation;
