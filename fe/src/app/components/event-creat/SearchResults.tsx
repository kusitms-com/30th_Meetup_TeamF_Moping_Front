import React from "react";
import SearchResultItem from "./SearchResultsItem";

interface SearchResultsProps {
  results: { name: string; address: string }[];
  searchTerm: string;
  onSelect: (place: { name: string; address: string }) => void;
}

// 함수 선언 방식으로 컴포넌트 정의
function SearchResults({ results, searchTerm, onSelect }: SearchResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="relative">
      <ul className="absolute top-full left-0 mt-2 w-full bg-background-light shadow-lg z-10 rounded-lg">
        <div className="h-4 bg-[#f7f7f7] rounded-tl-lg rounded-tr-lg" />{" "}
        {/* 상단 둥근 모서리 */}
        {results.map((place) => (
          <SearchResultItem
            key={place.name} // 고유한 값으로 key 설정
            place={place}
            searchTerm={searchTerm}
            onClick={() => onSelect(place)}
          />
        ))}
        <div className="h-4 bg-[#f7f7f7] rounded-bl-lg rounded-br-lg" />{" "}
        {/* 하단 둥근 모서리 */}
      </ul>
    </div>
  );
}

export default SearchResults;
