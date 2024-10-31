"use client";

import React, { useState } from "react";
import Image from "next/image";
import SearchResults from "./SearchResults";

interface Place {
  name: string;
  address: string;
  px?: number;
  py?: number;
}

interface LocationInputProps {
  className?: string;
  onSelect: (place: Place) => void;
}

function LocationInput({ className, onSelect }: LocationInputProps) {
  const [location, setLocation] = useState<string>("");
  const [results, setResults] = useState<
    { name: string; address: string; px?: number; py?: number }[]
  >([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPlacesBySearch = async (query: string) => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/search?keyword=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl, { headers: { accept: "*/*" } });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.code === 200) {
        const formattedResults = data.data.map((place: Place) => ({
          ...place,
          px: place.px ? parseFloat((place.px / 1e7).toFixed(7)) : undefined,
          py: place.py ? parseFloat((place.py / 1e7).toFixed(7)) : undefined,
        }));
        setResults(formattedResults);
      } else {
        setResults([]);
        alert(`장소 검색에 실패했습니다: ${data.message}`);
      }
    } catch (error) {
      alert("서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocation(inputValue);

    if (inputValue.length > 0) {
      fetchPlacesBySearch(inputValue);
    } else {
      // 입력이 비워질 경우 onSelect에 빈 객체 전달
      setResults([]);
      onSelect({ name: "", address: "", px: undefined, py: undefined });
    }
  };

  const handleSelectPlace = (place: {
    name: string;
    address: string;
    px?: number;
    py?: number;
  }) => {
    setLocation(place.name);
    setResults([]);
    onSelect(place);
  };

  const handleCurrentLocation = async () => {
    if (isFetching) return;
    setIsFetching(true);

    if (!navigator.geolocation) {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
      setIsFetching(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: py, longitude: px } = coords;
        const coordinatesString = `위도: ${py}, 경도: ${px}`;
        setLocation(coordinatesString);

        onSelect({
          name: coordinatesString,
          address: coordinatesString,
          px,
          py,
        });

        setIsFetching(false);
      },
      () => {
        alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
        setIsFetching(false);
      }
    );
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="text-black text-xl font-semibold leading-loose mb-[12px]">
        어떤 공간을 찾고 계신가요?
      </div>
      <div className="relative w-[328px] h-14 p-4 bg-background-light rounded-lg flex items-center">
        <Image
          src="/images/Search.svg"
          alt="돋보기 아이콘"
          width={24}
          height={24}
          className="mr-3"
        />
        <input
          type="text"
          value={location}
          onChange={handleSearch}
          placeholder="장소를 입력해주세요"
          className="bg-transparent border-none flex-grow text-base font-medium font-['Pretendard'] text-[#2c2c2c] placeholder-[#8e8e8e] outline-none"
        />
        <div
          role="button"
          tabIndex={0}
          className="w-[38px] h-[38px] bg-darkGray rounded flex items-center justify-center cursor-pointer ml-3"
          onClick={handleCurrentLocation}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCurrentLocation();
          }}
        >
          <Image
            src="/images/Location.svg"
            alt="위치 아이콘"
            width={34}
            height={34}
          />
        </div>
      </div>
      {results.length > 0 && (
        <SearchResults
          results={results}
          searchTerm={location}
          onSelect={handleSelectPlace}
        />
      )}
    </div>
  );
}

export default LocationInput;
