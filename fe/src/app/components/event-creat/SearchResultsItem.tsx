import React from "react";

interface SearchResultItemProps {
  place: { name: string; address: string };
  searchTerm: string;
  onClick: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  place,
  searchTerm,
  onClick,
}) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="text-[#3a91ea]">
              {part}
            </span>
          ) : (
            <span key={index} className="text-[#555555]">
              {part}
            </span> // 기본 텍스트 색상을 #555555로 변경
          )
        )}
      </>
    );
  };

  return (
    <li
      className="cursor-pointer flex items-center gap-2 bg-[#F8F8F8] hover:bg-[#F0F0F0] rounded-lg"
      onClick={onClick}
      style={{
        padding: "10px 16px",
        margin: "16px 0",
        width: "328px",
        height: "44px",
      }}
    >
      <img
        src="/images/LocationPin.svg"
        alt="위치 핀"
        className="w-5 h-5 text-gray-600"
      />
      <div className="text-base font-pretendard">
        {highlightText(place.name, searchTerm)}
      </div>
    </li>
  );
};

export default SearchResultItem;
