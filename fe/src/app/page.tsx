"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Button from "@/app/components/common/Button";

function LoadingPage() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/eventcreate-page");
  };

  return (
    <div className="bg-primary-50 h-screen w-full flex flex-col items-center relative">
      {/* 로고 영역 */}
      <div className="w-full sticky top-0 z-10 flex justify-center overflow-hidden bg-primary-50">
        <div className="w-full h-[89px] flex justify-center">
          <Image
            src="/images/loadinglogo.svg"
            alt="MMMM Logo"
            width={623}
            height={89}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      <div
        className="flex flex-col items-center absolute left-0 right-0"
        style={{ top: "327px" }}
      >
        <div
          className="text-text-default text-[62px] leading-[62px] font-black font-pretendard text-center"
          style={{
            textShadow:
              "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
            color: "#000",
          }}
        >
          MOPING
        </div>

        <div className="w-full flex justify-center text-center mt-2">
          <div className="text-center">
            <span className="text-grayscale-0 text-xl font-black font-pretendard">
              MIX
            </span>
            <span className="text-text-default text-xl font-black font-pretendard">
              {" "}
              OUR PINS,
              <br />
            </span>
            <span className="text-grayscale-0 text-xl font-black font-pretendard">
              SHARE
            </span>
            <span className="text-text-default text-xl font-black font-pretendard">
              {" "}
              OUR PLACES
            </span>
          </div>
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="w-full fixed bottom-[45px] left-0 right-0 flex justify-center px-4">
        <Button
          label="시작하기"
          onClick={handleStartClick}
          type="start"
          className="w-full max-w-[328px] h-[60px] py-[17px] rounded-lg bg-darkGray text-grayscale-0"
        />
      </div>
    </div>
  );
}

export default LoadingPage;
