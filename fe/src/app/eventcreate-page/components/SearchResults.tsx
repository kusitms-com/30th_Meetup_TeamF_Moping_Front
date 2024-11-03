import React from "react";
import SearchResultItem from "@/app/eventcreate-page/components/SearchResultsItem";

interface Place {
  name: string;
  address: string;
  px?: number;
  py?: number;
}

interface SearchResultsProps {
  results: Place[];
  searchTerm: string;
  onSelect: (place: Place) => void;
}

function SearchResults({ results, searchTerm, onSelect }: SearchResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <ul className="w-full max-w-[360px] max-h-[240px] overflow-y-auto bg-white mt-2">
      {results.map((place) => (
        <SearchResultItem
          key={place.name}
          place={place}
          searchTerm={searchTerm}
          onClick={() => onSelect(place)}
        />
      ))}
    </ul>
  );
}

export default SearchResults;
