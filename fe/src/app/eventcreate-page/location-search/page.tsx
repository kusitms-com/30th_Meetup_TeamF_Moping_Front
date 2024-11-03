// src/app/eventcreate-page/location-search/page.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import Image from "next/image";
import SearchResults from "@/app/eventcreate-page/components/SearchResults";
import { useRouter } from "next/navigation";
import { useLocationStore } from "@/app/eventcreate-page/stores/useLocationStore";

interface Place {
  name: string;
  address: string;
  px?: number;
  py?: number;
}

function LocationSearch() {
  // 화살표 함수 대신 일반 함수 선언
  const [location, setLocation] = useState<string>("");
  const [results, setResults] = useState<Place[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const { setLocation: setStoreLocation } = useLocationStore();

  const fetchPlacesBySearch = useCallback(
    async (query: string) => {
      if (isFetching) return;
      setIsFetching(true);

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/search?keyword=${encodeURIComponent(
          query
        )}`;
        const response = await fetch(apiUrl, { headers: { accept: "*/*" } });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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
    },
    [isFetching]
  );

  useEffect(() => {
    const debouncedFetch = debounce((query: string) => {
      fetchPlacesBySearch(query);
    }, 300);

    if (location.length > 0) {
      debouncedFetch(location);
    } else {
      setResults([]);
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [location, fetchPlacesBySearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSelectPlace = (place: Place) => {
    setStoreLocation(place); // 선택된 위치를 저장
    router.push("/eventcreate-page"); // EventCreatePage로 이동
  };

  const handleClearLocation = () => {
    setLocation("");
    setResults([]);
  };

  const handleBackClick = () => {
    router.push("/eventcreate-page");
  };

  return (
    <div className="flex flex-col items-center mt-[4px]">
      <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[360px] h-[56px] bg-white flex items-center justify-between px-4 z-10">
        <button type="button" onClick={handleBackClick} className="p-2">
          <Image
            src="/images/ArrowBack.svg"
            alt="뒤로가기"
            width={24}
            height={24}
          />
        </button>
        <div className="flex items-center w-full h-12 px-4 bg-[#f7f7f7] rounded-lg ml-2">
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
            className="bg-transparent border-none flex-grow text-[#2c2c2c] text-base font-medium font-['Pretendard'] leading-normal outline-none"
          />
          {location && (
            <div
              role="button"
              tabIndex={0}
              className="w-5 h-5 relative cursor-pointer ml-3"
              onClick={handleClearLocation}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClearLocation();
              }}
            >
              <Image
                src="/images/Cancel.svg"
                alt="삭제 아이콘"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>
      </header>

      <div className="mt-[72px] w-[360px] flex justify-center px-4">
        {results.length > 0 && (
          <SearchResults
            results={results}
            searchTerm={location}
            onSelect={handleSelectPlace}
          />
        )}
      </div>
    </div>
  );
}

export default LocationSearch;
