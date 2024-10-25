"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Button from "@/app/components/common/Button";

// Convert the component to a function declaration
function LoadingPage() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/event-create");
  };

  return (
    <div className="bg-primary-50 h-screen flex flex-col items-center relative">
      <div className="w-full sticky top-0 z-10 flex justify-center overflow-hidden bg-primary-50">
        <div className="w-[360px] h-[89px] flex justify-center">
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

      <div className="absolute top-[338px] left-0 right-0 flex flex-col items-center">
        <div
          className="text-text-default text-[62px] leading-[62px] font-black font-pretendard"
          style={{
            textShadow:
              "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
          }}
        >
          MOPING
        </div>

        <div className="w-[198px] h-[56px] flex justify-center text-center">
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

      <div className="w-full fixed bottom-[45px] left-0 right-0 flex justify-center">
        <Button
          label="시작하기"
          onClick={handleStartClick}
          type="start"
          className="w-[328px] h-[60px] py-[17px] rounded-lg bg-darkGray text-grayscale-0"
        />
      </div>
    </div>
  );
}

export default LoadingPage;
