"use client";

import React, { useState } from "react";
import SearchResults from "./SearchResults";

interface LocationInputProps {
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ className }) => {
  const [location, setLocation] = useState(""); // 입력된 장소
  const [results, setResults] = useState<{ name: string; address: string }[]>(
    []
  ); // 검색 결과

  // 검색 API 요청 함수
  const fetchPlaces = async (query: string) => {
    const response = await fetch(`/api/places?search=${query}`);
    const data = await response.json();
    setResults(data.places);
  };

  // 입력이 변경될 때마다 검색 API 호출
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      // 1글자 이상일 때 검색
      fetchPlaces(value);
    } else {
      setResults([]); // 입력이 없으면 결과 초기화
    }
  };

  // 장소 선택
  const handleSelectPlace = (place: { name: string; address: string }) => {
    setLocation(place.name);
    setResults([]); // 장소를 선택하면 리스트 초기화
  };

  return (
    <div
      className={`relative w-[328px] h-14 p-4 bg-[#f7f7f7] rounded-lg flex justify-between items-center ${className}`}
    >
      <div className="flex items-center gap-3">
        <img src="/images/Search.svg" alt="돋보기 아이콘" className="w-5 h-5" />
        <input
          type="text"
          value={location}
          onChange={handleSearch}
          placeholder="장소를 입력해주세요"
          className="bg-transparent border-none grow shrink basis-0 text-[#2c2c2c] text-base font-medium font-['Pretendard'] leading-normal outline-none flex-1"
        />
      </div>
      <div className="w-[38px] h-[38px] bg-[#1d1d1d] rounded flex justify-center items-center">
        <img src="/images/Location.svg" alt="위치 아이콘" />
      </div>

      {/* 검색 결과 표시 */}
      {results.length > 0 && (
        <SearchResults
          results={results}
          searchTerm={location}
          onSelect={handleSelectPlace}
        />
      )}
    </div>
  );
};

export default LocationInput;
