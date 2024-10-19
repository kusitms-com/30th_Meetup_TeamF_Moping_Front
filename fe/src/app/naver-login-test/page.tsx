"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/common/Button";

const LoadingPage = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/event-create");
  };

  return (
    <div className="bg-[#f73a2c] h-screen flex flex-col justify-between items-center relative">
      {/* 상단 로고 영역 */}
      <div className="absolute top-0 left-0 right-0 w-full flex justify-center overflow-hidden">
        <div className="w-[500px] h-[89px] overflow-hidden">
          <Image
            src="/images/MMMM.svg"
            alt="MMMM Logo"
            width={623}
            height={89}
            priority={true}
          />
        </div>
      </div>

      {/* MOPING 텍스트 영역 */}
      <div className="absolute top-[338px] left-[72px] right-[72px] flex flex-col items-center">
        <div className="text-black text-[52px] font-black font-['Pretendard Variable']">
          MOPING
        </div>

        {/* MIX OUR PINS, SHARE OUR PLACES 문구 */}
        <div className="text-center mt-4">
          <span className="text-white text-xl font-black font-['Pretendard Variable'] leading-7">
            MIX
          </span>
          <span className="text-black text-xl font-black font-['Pretendard Variable'] leading-7">
            {" "}
            OUR PINS,
            <br />
          </span>
          <span className="text-white text-xl font-black font-['Pretendard Variable'] leading-7">
            SHARE
          </span>
          <span className="text-black text-xl font-black font-['Pretendard Variable'] leading-7">
            {" "}
            OUR PLACES
          </span>
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="w-full absolute bottom-[50px] left-0 right-0 flex justify-center">
        <Button
          label="시작하기"
          onClick={handleStartClick}
          className="bg-black text-white w-[328px] h-[60px] py-[17px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
