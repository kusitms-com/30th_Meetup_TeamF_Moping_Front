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
      <div className="w-full sticky top-0 z-10 flex justify-center bg-primary-50">
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
      <div className="flex flex-col items-center absolute inset-x-0 top-[327px] text-center">
        <h1 className="text-text-default text-[62px] leading-[62px] font-black font-pretendard text-shadow-lg">
          MOPING
        </h1>
        <div className="w-full mt-2">
          <p className="text-grayscale-0 text-xl font-black font-pretendard">
            MIX
            <span className="text-text-default"> OUR PINS,</span>
            <br />
            SHARE
            <span className="text-text-default"> OUR PLACES</span>
          </p>
        </div>
      </div>

      <div className="fixed bottom-[45px] w-full flex justify-center px-4">
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
