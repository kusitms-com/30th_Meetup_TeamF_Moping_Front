"use client";

import React, { useEffect, useRef, useState } from "react";

function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const [myLocation, setMyLocation] = useState({
    latitude: 37.4979517, // 기본값: 강남역
    longitude: 127.0276188,
  });

  // 지도 초기화 함수
  const initializeMap = () => {
    const { naver } = window as any;
    if (!naver) return;

    const center = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );
    mapInstance.current = new naver.maps.Map(mapRef.current as HTMLElement, {
      center,
      zoom: 15,
    });
  };

  // 스크립트 로드 및 지도 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []); // 빈 배열로 초기화 시점에만 실행

  // 내 위치로 이동하는 함수
  const handleMoveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          mapInstance.current?.setCenter(newCenter); // 현재 위치로 지도 중심 이동
        },
        () => {
          alert("위치 정보를 가져올 수 없습니다. 기본 위치로 이동합니다.");
        }
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleMoveToCurrentLocation}
        style={{ marginBottom: "10px" }}
      >
        내 위치로 이동
      </button>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default NaverMap;
