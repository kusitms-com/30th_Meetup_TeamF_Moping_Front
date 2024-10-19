import React from "react";
import SearchResultItem from "./SearchResultsItem";

interface SearchResultsProps {
  results: { name: string; address: string }[];
  searchTerm: string; // 검색어를 전달받음
  onSelect: (place: { name: string; address: string }) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchTerm,
  onSelect,
}) => {
  if (results.length === 0) return null; // 결과가 없으면 렌더링하지 않음

  return (
    <ul className="absolute top-full left-0 mt-2 w-full bg-[#F8F8F8] rounded-t-lg rounded-b-lg shadow-lg z-10">
      {results.map((place, index) => (
        <SearchResultItem
          key={index}
          place={place}
          searchTerm={searchTerm} // 검색어를 전달
          onClick={() => onSelect(place)}
        />
      ))}
    </ul>
  );
};

export default SearchResults;
