import React, { useState } from "react";
import Image from "next/image";
import SearchResults from "./SearchResults";

interface LocationInputProps {
  className?: string;
  onSelect: (location: string) => void;
}

function LocationInput({ className, onSelect }: LocationInputProps) {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<{ name: string; address: string }[]>(
    []
  );

  const fetchPlaces = async (latitude: string, longitude: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/places?lat=${latitude}&lon=${longitude}`,
        {
          headers: { accept: "*/*" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.places && data.places.length > 0) {
        setResults(data.places);
      } else {
        alert("현재 위치에 대한 장소를 찾을 수 없습니다.");
      }
    } catch (error) {
      const err = error as Error;
      alert(`위치 정보를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    }
  };

  const fetchPlacesBySearch = async (query: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/search/${encodeURIComponent(query)}`,
        {
          headers: { accept: "*/*" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 200) {
        setResults(data.data);
      } else {
        setResults([]);
        alert(`장소 검색에 실패했습니다: ${data.message}`);
      }
    } catch (error) {
      const err = error as Error;
      alert(`API 요청 중 오류가 발생했습니다: ${err.message}`);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocation(value);

    if (value.length > 0) {
      fetchPlacesBySearch(value);
    } else {
      setResults([]);
    }
  };

  const handleSelectPlace = ({ name }: { name: string }) => {
    setLocation(name);
    setResults([]);
    onSelect(name);
  };

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("현재 위치를 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        await fetchPlaces(latitude.toString(), longitude.toString());
      },
      () => {
        alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
      }
    );
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
            className="bg-transparent border-none grow shrink basis-0 text-text-default text-base font-medium font-['Pretendard'] leading-normal outline-none flex-1 placeholder-mediumGray"
          />
        </div>

        <div
          role="button"
          tabIndex={0}
          className="w-[38px] h-[38px] bg-darkGray rounded flex justify-center items-center cursor-pointer"
          onClick={handleCurrentLocation}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleCurrentLocation();
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
