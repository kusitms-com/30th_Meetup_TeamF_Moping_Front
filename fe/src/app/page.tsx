"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/common/Button";

const LoadingPage = () => {
  const router = useRouter();

  // 시작하기 버튼 클릭 시 이벤트 생성 페이지로 이동
  const handleStartClick = () => {
    router.push("/event-create");
  };

  return (
    <div className="bg-[#f73a2c] h-screen flex flex-col justify-between items-center relative">
      {/* MMMM 로고 영역 */}
      <div className="w-full flex justify-center overflow-hidden mt-[37px]">
        {" "}
        {/* 상단에서 37px 간격 추가 */}
        <div className="w-[360px] h-[89px] overflow-hidden flex justify-center">
          <Image
            src="/images/MMMM.svg"
            alt="MMMM Logo"
            width={623}
            height={89}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* MOPING 텍스트 영역 */}
      <div className="absolute top-[338px] left-0 right-0 flex flex-col items-center">
        {/* MOPING 텍스트 */}
        <div
          className="text-black text-[62px] leading-[62px] font-black font-pretendard"
          style={{
            textShadow:
              "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
          }}
        >
          MOPING
        </div>

        {/* MIX OUR PINS, SHARE OUR PLACES 텍스트 영역 */}
        <div className="w-[198px] h-[56px] flex justify-center text-center">
          <div className="text-center">
            <span className="text-white text-xl font-black font-pretendard">
              MIX
            </span>
            <span className="text-black text-xl font-black font-pretendard">
              {" "}
              OUR PINS,
              <br />
            </span>
            <span className="text-white text-xl font-black font-pretendard">
              SHARE
            </span>
            <span className="text-black text-xl font-black font-pretendard">
              {" "}
              OUR PLACES
            </span>
          </div>
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="w-full absolute bottom-[45px] flex justify-center">
        <Button
          label="시작하기"
          onClick={handleStartClick}
          type="start"
          className="bg-black text-white w-[328px] h-[60px] py-[17px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
