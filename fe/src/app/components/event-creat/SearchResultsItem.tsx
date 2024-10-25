import React from "react";
import Image from "next/image";

interface SearchResultItemProps {
  place: { name: string; address: string };
  searchTerm: string;
  onClick: () => void;
}

function SearchResultItem({
  place,
  searchTerm,
  onClick,
}: SearchResultItemProps) {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={part + text} // 고유한 값을 사용해 key 설정
              className="text-blue hover:text-gray-600 transition-colors duration-200"
            >
              {part}
            </span>
          ) : (
            <span key={part + text} className="text-gray-600">
              {part}
            </span>
          )
        )}
      </>
    );
  };

  return (
    <button
      type="button"
      className="cursor-pointer flex items-center gap-2 bg-gray-50 hover:bg-gray-30 transition-colors duration-200"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{
        padding: "10px 16px",
        margin: "16px 0",
        width: "328px",
        height: "44px",
      }}
    >
      <Image
        src="/images/LocationPin.svg"
        alt="위치 핀"
        width={24}
        height={24}
        className="text-gray-600"
      />
      <div className="text-base font-pretendard">
        {highlightText(place.name, searchTerm)}
      </div>
    </button>
  );
}

export default SearchResultItem;
