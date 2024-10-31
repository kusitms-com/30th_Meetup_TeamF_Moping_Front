"use client";

import React, { useState } from "react";
import { LocationInputProps, Place } from "@/app/eventcreate-page/types/types"; // 최상단으로 이동
import Image from "next/image";
import SearchResults from "./SearchResults";

function LocationInput({ className, onSelect }: LocationInputProps) {
  const [location, setLocation] = useState<string>("");
  const [results, setResults] = useState<Place[]>([]);
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
        setResults(data.data);
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
      setResults([]);
    }
  };

  const handleSelectPlace = (place: Place) => {
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
      async ({ coords }) => {
        const { latitude: py, longitude: px } = coords;
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/geocode?py=${py}&px=${px}`;

        try {
          const response = await fetch(apiUrl, { headers: { accept: "*/*" } });
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();
          if (data.data && data.data.length > 0) {
            const selectedPlace: Place = { ...data.data[0], px, py };
            setResults(data.data);
            setLocation(selectedPlace.name);
            handleSelectPlace(selectedPlace);
          } else {
            alert("현재 위치에 대한 장소를 찾을 수 없습니다.");
          }
        } catch (error) {
          alert("서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
          setIsFetching(false);
        }
      },
      () => {
        alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
        setIsFetching(false);
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleCurrentLocation();
    }
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="text-text-default text-xl font-semibold leading-loose mb-[12px]">
        어떤 공간을 찾고 계신가요?
      </div>
      <div className="relative w-[328px] h-14 p-4 bg-background-light rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Search.svg"
            alt="돋보기 아이콘"
            width={24}
            height={24}
          />
          <input
            type="text"
            value={location}
            onChange={handleSearch}
            placeholder="장소를 입력해주세요"
            className="bg-transparent border-none grow text-base placeholder-mediumGray outline-none"
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          className="w-[38px] h-[38px] bg-darkGray rounded flex items-center justify-center cursor-pointer"
          onClick={handleCurrentLocation}
          onKeyDown={handleKeyDown}
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
