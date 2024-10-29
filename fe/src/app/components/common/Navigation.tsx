"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NavigationProps } from "@/types/types";

function Navigation({ showBackButton = true }: NavigationProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header className="nav-bar sticky top-[36px] z-10">
      {showBackButton && (
        <div className="absolute left-0">
          <button type="button" onClick={handleBackClick} className="p-2">
            <Image
              src="/images/ArrowBack.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </header>
  );
}

export default Navigation;
