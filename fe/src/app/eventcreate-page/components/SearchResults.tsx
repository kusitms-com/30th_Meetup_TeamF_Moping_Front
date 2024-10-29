import React from "react";
import SearchResultItem from "./SearchResultsItem";

interface SearchResultsProps {
  results: { name: string; address: string }[];
  searchTerm: string;
  onSelect: (place: { name: string; address: string }) => void;
}

function SearchResults({ results, searchTerm, onSelect }: SearchResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="relative">
      <ul className="absolute top-full left-0 mt-2 w-full bg-background-light shadow-lg z-10 rounded-lg">
        {results.map((place) => (
          <SearchResultItem
            key={place.name}
            place={place}
            searchTerm={searchTerm}
            onClick={() => onSelect(place)}
          />
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
