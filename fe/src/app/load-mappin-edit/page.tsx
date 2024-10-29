"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ExitModal from "@/app/components/common/ExitModal";
import Form from "./components/Form";

export default function Page() {
  const [userName] = useState("규리");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleExit = () => {
    router.push("/map-page");
  };

  return (
    <div className="w-full h-screen overflow-y-auto hide-scrollbar">
      <div className="w-full h-[56px] p-[16px]">
        <button
          type="button"
          className="w-[24px] h-[24px]"
          onClick={handleBackClick}
        >
          <Image
            src="/images/ArrowBack.svg"
            alt="뒤로가기"
            width={24}
            height={24}
          />
        </button>
      </div>
      {userName && (
        <div className="mt-[24px] mb-[44px] ml-[16px] text-darkGray text-title-md">
          {userName}님의 맵핀 모음이에요
        </div>
      )}
      <Form userName={userName} />
      <div className="h-[20px]" />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <ExitModal onCancel={handleCancel} onExit={handleExit} />
        </div>
      )}
    </div>
  );
}