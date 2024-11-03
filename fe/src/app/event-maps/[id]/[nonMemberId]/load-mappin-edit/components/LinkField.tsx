"use client";

import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useUserDataStore } from "../../stores/useUserDataStore";

interface LinkFieldProps {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  showTooltip?: boolean;
  onInfoClick?: () => void;
}

export default function LinkField({
  label,
  placeholder,
  value,
  onChange,
  showTooltip = true,
  onInfoClick,
}: LinkFieldProps) {
  const userData = useUserDataStore((state) => state.userData);
  const [inputFields, setInputFields] = useState(
    value.length > 0
      ? value.map((val) => ({ id: nanoid(), text: val }))
      : [{ id: nanoid(), text: "" }]
  );

  useEffect(() => {
    const initialData =
      label === "맵핀 모음 링크" ? userData.bookmarkUrls : userData.storeUrls;
    setInputFields(
      initialData.length > 0
        ? initialData.map((val) => ({ id: nanoid(), text: val }))
        : [{ id: nanoid(), text: "" }]
    );
  }, [label, userData]);

  useEffect(() => {
    if (inputFields.length === 0) {
      setInputFields([{ id: nanoid(), text: "" }]);
    }
  }, [inputFields]);

  const handleInputChange = (id: string, inputValue: string) => {
    const newInputs = inputFields.map((field) =>
      field.id === id ? { ...field, text: inputValue } : field
    );
    setInputFields(newInputs);
    onChange(
      newInputs.map((field) => field.text).filter((text) => text.trim() !== "")
    );
  };

  const clearInput = (id: string) => {
    const newInputs = inputFields.map((field) =>
      field.id === id ? { ...field, text: "" } : field
    );
    setInputFields(newInputs);
    onChange(
      newInputs.map((field) => field.text).filter((text) => text.trim() !== "")
    );
  };

  const addInputField = () => {
    const newField = { id: nanoid(), text: "" };
    const updatedInputs = [...inputFields, newField];
    setInputFields(updatedInputs);
    onChange(
      updatedInputs
        .map((field) => field.text)
        .filter((text) => text.trim() !== "")
    );
  };

  const handleNaverMove = () => {
    window.location.href = "https://m.place.naver.com/my/place";
  };

  return (
    <div className="mb-[48px]">
      <label className="text-grayscale-80 font-300 text-lg mb-[8px] flex items-center">
        {label}
        {label === "맵핀 모음 링크" && (
          <div
            className="relative group"
            onClick={onInfoClick}
            onKeyDown={(e) => e.key === "Enter" && onInfoClick?.()}
            role="button"
            tabIndex={0}
          >
            <Image
              src="/svg/infomation.svg"
              alt="infomation"
              width={24}
              height={24}
              className="ml-[6px] cursor-pointer"
            />
            {showTooltip && (
              <div
                className="absolute left-1/2 -translate-x-[48.9%] bottom-full mb-2 bg-black text-white text-caption rounded px-[12px] py-[10px] w-[215px]"
                aria-hidden={!showTooltip}
              >
                즐겨찾기 링크 복사 방법을 확인해보세요
                <div className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          className="mr-0 ml-auto text-grayscale-50 flex items-center text-text-sm1"
          onClick={handleNaverMove}
        >
          네이버 지도
          <Image
            src="/svg/rightArrow.svg"
            alt="rightArrow"
            width={12}
            height={24}
          />
        </button>
      </label>
      <div className="flex flex-col items-center border-grayscale-10 border p-[16px] gap-[16px] rounded-medium">
        {inputFields.map((field) => (
          <div key={field.id} className="relative w-full">
            <input
              type="text"
              value={field.text}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={placeholder}
              className="w-full p-3 pr-10 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-grayscale-80"
              style={{
                border: "none",
              }}
            />
            {field.text && (
              <button
                type="button"
                onClick={() => clearInput(field.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Image
                  src="/svg/delete.svg"
                  alt="delete"
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addInputField}>
          <Image src="/svg/linkAdd.svg" alt="linkAdd" width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
