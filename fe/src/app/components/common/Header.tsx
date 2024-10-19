"use client"; // 클라이언트 컴포넌트로 명시

import { useRouter } from "next/navigation"; // next/router 대신 next/navigation 사용
import Image from "next/image"; // 이미지 컴포넌트 import
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();

  // 뒤로가기 버튼 클릭 시 호출되는 함수
  const handleBackClick = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <header className="w-full h-[56px] bg-white flex items-center relative">
      {/* 뒤로가기 버튼 */}
      <div className="absolute left-4">
        <button onClick={handleBackClick} className="p-2">
          <Image
            src="/images/ArrowBack.svg" // 화살표 아이콘 경로
            alt="뒤로가기"
            width={24} // 아이콘 너비
            height={24} // 아이콘 높이
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
