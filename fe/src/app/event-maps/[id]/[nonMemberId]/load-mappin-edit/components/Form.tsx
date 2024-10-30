"use client";

import React, { useState, useEffect, FormEvent } from "react";
import LinkField from "./LinkField";

interface FormProps {
  userName: string;
}

export default function Form({ userName }: FormProps) {
  const [mapLinks, setMapLinks] = useState([""]);
  const [storeLinks, setStoreLinks] = useState([""]);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false); // isFormComplete 추가

  // mapLinks와 storeLinks가 모두 입력되었을 때만 isFormComplete를 true로 설정
  useEffect(() => {
    setIsFormComplete(
      mapLinks.some((link) => link.trim() !== "") &&
        storeLinks.some((link) => link.trim() !== "")
    );
  }, [mapLinks, storeLinks]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      userName,
      mapLinks,
      storeLinks,
    };
    console.log("폼 데이터:", formData);
  };

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit}>
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
