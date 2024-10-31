"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import ExitModal from "@/app/event-maps/[id]/[nonMemberId]/components/PinExitModal";
import Form from "./components/Form";
import { useUserDataStore } from "../stores/useUserDataStore";

export default function Page() {
  const userName = useUserDataStore((state) => state.userData.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleExit = () => {
    router.push(`/event-maps/${id}`);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[360px] w-full h-screen overflow-y-auto hide-scrollbar">
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
        <Form />
        <div className="h-[20px]" />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <ExitModal onCancel={handleCancel} onExit={handleExit} />
          </div>
        )}
      </div>
    </div>
  );
}
