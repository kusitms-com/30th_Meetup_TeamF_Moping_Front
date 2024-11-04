import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import { SearchResultItemProps } from "@/app/eventcreate-page/types/types";

function SearchResultItem({
  place,
  searchTerm,
  onClick,
}: SearchResultItemProps) {
  // useMemo와 useCallback 훅을 최상위에서 호출
  const highlightText = useCallback(
    (text: string, highlight: string) => {
      if (!highlight.trim()) return text;

      const regex = new RegExp(`(${highlight})`, "gi");
      const parts = text.split(regex);

      return (
        <>
          {parts.map((part) => (
            <span
              key={`${place.id}-${part}`} // 고유한 place.id와 part 조합
              style={{
                color:
                  part.toLowerCase() === highlight.toLowerCase()
                    ? "#3a91ea"
                    : "#4a4a4a",
              }}
              className={
                part.toLowerCase() === highlight.toLowerCase()
                  ? "font-semibold"
                  : "text-gray-800"
              }
            >
              {part}
            </span>
          ))}
        </>
      );
    },
    [place.id]
  );

  const highlightedText = useMemo(
    () => highlightText(place.name, searchTerm),
    [place.name, searchTerm, highlightText]
  );

  // 훅 호출 이후에 조건부 렌더링을 수행
  if (!place.id) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-11 px-4 py-2.5 bg-white flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
      aria-label={`Select ${place.name}`}
    >
      <div className="w-6 h-6 flex-shrink-0">
        <Image
          src="/images/LocationPin.svg"
          alt="위치 핀"
          width={24}
          height={24}
        />
      </div>
      <div className="text-base font-medium font-['Pretendard'] text-gray-800 leading-none truncate pt-1">
        {highlightedText}
      </div>
    </button>
  );
}

export default SearchResultItem;
