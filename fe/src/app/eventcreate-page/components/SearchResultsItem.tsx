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
        {parts.map((part, index) => {
          const isHighlighted = part.toLowerCase() === highlight.toLowerCase();
          return (
            <span
              key={
                isHighlighted
                  ? `highlight-${part}-${index}`
                  : `text-${part}-${index}`
              }
              style={
                isHighlighted ? { color: "#3a91ea" } : { color: "#4a4a4a" }
              }
              className={isHighlighted ? "font-semibold" : "text-gray-800"}
            >
              {part}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-11 px-4 py-2.5 bg-white flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="w-6 h-6 flex-shrink-0">
        <Image
          src="/images/LocationPin.svg"
          alt="위치 핀"
          width={24}
          height={24}
        />
      </div>
      <div className="text-base font-medium font-['Pretendard'] text-gray-800 leading-none truncate">
        {highlightText(place.name, searchTerm)}
      </div>
    </button>
  );
}

export default SearchResultItem;
