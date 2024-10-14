"use client";

import React, { useEffect, useRef, useState } from "react";

// 타입 정의
interface Location {
  latitude: number;
  longitude: number;
}

function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<Location>({
    latitude: 37.4979517,
    longitude: 127.0276188,
  });

  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window as typeof window & { naver: naver.maps.Map };
      if (!naver || mapInstance.current) return; // 값 반환으로 오류 해결

      const center = new naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude
      );

      mapInstance.current = new naver.maps.Map(mapRef.current as HTMLElement, {
        center,
        zoom: 15,
      });

      const markerPosition = new naver.maps.LatLng(37.4979517, 127.0276188);

      const marker = new naver.maps.Marker({
        position: markerPosition,
        map: mapInstance.current,
        icon: {
          url: "/favicon.ico",
          size: new naver.maps.Size(50, 50),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 50),
        },
        title: "서울 시청",
      });

      naver.maps.Event.addListener(marker, "click", () => {
        window.location.href =
          "https://map.naver.com/p/search/셀렉티드닉스/place/1776798877";
      });
    };

    if (window.naver?.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.onload = initializeMap;
      document.head.appendChild(script);

      return () => {
        mapInstance.current?.destroy();
        mapInstance.current = null;
        document.head.removeChild(script);
      };
    }

    return undefined;
  }, [myLocation.latitude, myLocation.longitude]); // 종속성 배열 수정

  const handleMoveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          const newCenter = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          mapInstance.current?.setCenter(newCenter);
        },
        () => alert("위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  return (
    <div>
      <button
        type="button" // 버튼 타입 명시
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
