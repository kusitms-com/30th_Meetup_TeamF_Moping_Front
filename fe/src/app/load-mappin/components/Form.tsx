"use client";

import React, { useState, useEffect } from "react";
import NameField from "./NameField";
import PinField from "./PinField";
import LinkField from "./LinkField";

export default function Form() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [mapLinks, setMapLinks] = useState([""]);
  const [storeLinks, setStoreLinks] = useState([""]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  useEffect(() => {
    const isPinComplete = pin.every((digit) => digit !== "");
    const hasMapLink = mapLinks.some((link) => link !== "");
    const hasStoreLink = storeLinks.some((link) => link !== "");
    setIsFormComplete(!!(name && isPinComplete && hasMapLink && hasStoreLink));
  }, [name, pin, mapLinks, storeLinks]);

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
      <form>
        <NameField value={name} onChange={setName} />
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
