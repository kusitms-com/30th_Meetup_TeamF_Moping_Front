// LinkField Component
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";

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
  const [inputFields, setInputFields] = useState(
    value.map((val) => ({ id: nanoid(), text: val }))
  );

  const handleInputChange = (id: string, inputValue: string) => {
    const newInputs = inputFields.map((field) =>
      field.id === id ? { ...field, text: inputValue } : field
    );
    setInputFields(newInputs);
    onChange(newInputs.map((field) => field.text)); // Update parent state
  };

  const addInputField = () => {
    const newField = { id: nanoid(), text: "" };
    const updatedInputs = [...inputFields, newField];
    setInputFields(updatedInputs);
    onChange(updatedInputs.map((field) => field.text));
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
                className="absolute left-1/2 -translate-x-[51%] bottom-full mb-2 bg-black text-white text-caption rounded px-[12px] py-[10px] w-[215px]"
                aria-hidden={!showTooltip}
              >
                즐겨찾기 링크 복사 방법을 확인해보세요
                <div className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
              </div>
            )}
          </div>
        )}
      </label>
      <div className="flex flex-col items-center border-grayscale-10 border p-[16px] gap-[16px] rounded-medium">
        {inputFields.map((field) => (
          <input
            key={field.id}
            type="text"
            value={field.text}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 mt-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grayscale-80"
          />
        ))}
        <button type="button" onClick={addInputField}>
          <Image src="/svg/linkAdd.svg" alt="linkAdd" width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
