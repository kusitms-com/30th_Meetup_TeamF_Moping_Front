"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NameField from "./NameField";
import PinField from "./PinField";
import LinkField from "./LinkField";

interface FormProps {
  uuid: string;
}

export default function Form({ uuid }: FormProps) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [mapLinks, setMapLinks] = useState<string[]>([]);
  const [storeLinks, setStoreLinks] = useState<string[]>([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  const [nameErrorType, setNameErrorType] = useState<
    "exists" | "invalid" | null
  >(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredMapLinks = mapLinks.filter((link) => link.trim() !== "");
    const filteredStoreLinks = storeLinks.filter((link) => link.trim() !== "");

    const requestBody = {
      uuid,
      name,
      password: pin.join(""),
      bookmarkUrls: filteredMapLinks,
      storeUrls: filteredStoreLinks,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/pings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("성공적으로 처리되었습니다.");
        // 로컬 스토리지 리셋
        localStorage.removeItem("userPin");
        localStorage.removeItem("userName"); // 추가: 이름도 리셋
        localStorage.removeItem("mapLinks"); // 추가: 맵핀 링크 리셋
        localStorage.removeItem("storeLinks"); // 추가: 가게 링크 리셋
        router.push(`/event-maps/${uuid}`);
      } else if (response.status === 409) {
        setNameErrorType("exists");
      } else {
        console.log("요청에 실패했습니다. 상태 코드:", response.status);
      }
    } catch (error) {
      console.log("서버 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    const isPinComplete = pin.every((digit) => digit !== "");
    setIsFormComplete(!!(name && isPinComplete));
  }, [name, pin]);

  useEffect(() => {
    const hideTooltip = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".group") === null) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      window.addEventListener("click", hideTooltip);
    }

    return () => {
      window.removeEventListener("click", hideTooltip);
    };
  }, [isTooltipVisible]);

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit}>
        <NameField value={name} onChange={setName} errorType={nameErrorType} />
        <PinField value={pin} onChange={setPin} />
        <LinkField
          label="맵핀 모음 링크"
          placeholder="링크 붙여넣기"
          value={mapLinks}
          onChange={setMapLinks}
          showTooltip={isTooltipVisible}
          onInfoClick={() => setIsTooltipVisible(true)}
        />
        <LinkField
          label="가게 정보 링크"
          placeholder="링크 붙여넣기"
          value={storeLinks}
          onChange={setStoreLinks}
        />
        <button
          className={`w-full flex items-center text-lg font-200 justify-center h-[60px] rounded-small ${
            isFormComplete
              ? "bg-grayscale-90 text-white"
              : "bg-grayscale-20 text-mediumGray"
          }`}
          type="submit"
          disabled={!isFormComplete}
        >
          확인
        </button>
      </form>
    </div>
  );
}
