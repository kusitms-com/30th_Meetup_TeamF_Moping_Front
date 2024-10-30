// LocationInput.tsx

import React, { useState } from "react";
import Image from "next/image";
import SearchResults from "./SearchResults";

interface LocationInputProps {
  className?: string;
  onSelect: (place: { name: string; address: string }) => void; // 타입 수정
}

function LocationInput({ className, onSelect }: LocationInputProps) {
  const [location, setLocation] = useState<string>("");
  const [results, setResults] = useState<{ name: string; address: string }[]>(
    []
  );
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지 상태

  const fetchPlacesBySearch = async (query: string) => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/search?keyword=${encodeURIComponent(query)}`,
        {
          headers: { accept: "*/*" },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching search results:", errorText);
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
      if (error instanceof Error) {
        alert(`API 요청 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("API 요청 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsFetching(false);
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

  const handleSelectPlace = (place: { name: string; address: string }) => {
    // 매개변수 타입 수정
    setLocation(place.name); // 입력 필드를 선택된 장소의 이름으로 업데이트
    setResults([]);
    onSelect(place); // place 객체 전달
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

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/geocode?py=${py}&px=${px}`,
            {
              headers: { accept: "*/*" },
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error fetching places:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.data && data.data.length > 0) {
            const selectedPlace = data.data[0];
            setResults(data.data);
            setLocation(selectedPlace.name);
            handleSelectPlace(selectedPlace); // 선택된 장소를 전달
          } else {
            alert("현재 위치에 대한 장소를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("Error fetching places:", error);
          alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
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
          onSelect={handleSelectPlace} // 수정된 handleSelectPlace 함수 전달
        />
      )}
    </div>
  );
}

export default LocationInput;
