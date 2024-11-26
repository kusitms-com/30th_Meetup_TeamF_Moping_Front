"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import NameField from "./components/NameField";
import PinField from "./components/PinField";

export default function NamePinPage() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isNameInputComplete, setIsNameInputComplete] = useState(false); 
  const router = useRouter();
  const { id } = useParams();
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPin");
    setName("");
    setPin(["", "", "", ""]);

    nameInputRef.current?.focus();
  }, []);

  const isPinComplete = pin.every((digit) => digit !== "");

  const handleNameBlur = () => {
    if (name.trim() !== "") {
      setIsNameInputComplete(true);
    }
  };

  useEffect(() => {
    if (isNameInputComplete && isPinComplete) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userPin", pin.join(""));
      router.push(`/event-maps/${id}/load-mappin/forms/links`);
    }
  }, [isNameInputComplete, isPinComplete, name, pin, id, router]);

  const handleBack = () => {
    router.push(`/event-maps/${id}`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-white">
      <Navigation onBack={handleBack} />
      <div className="w-full max-w-[360px] pt-[64px] px-4 h-full overflow-y-auto hide-scrollbar">
        <div className="mt-[16px] mb-[36px]">
          <div className="text-[#2c2c2c] text-[22px] font-semibold leading-[30px] font-['Pretendard']">
            내가 pick한 공간을 공유해 볼까요?
          </div>
          <div className="text-[#555555] text-base font-medium leading-relaxed font-['Pretendard'] mt-2">
            먼저 프로필을 만들어 주세요
          </div>
        </div>

        <NameField
          value={name}
          onChange={setName}
          inputRef={nameInputRef}
          onBlur={handleNameBlur} 
        />
        <div className="mt-[24px]">
          <PinField value={pin} onChange={setPin} />
        </div>
        <div className="h-[20px]" />
      </div>
    </div>
  );
}
