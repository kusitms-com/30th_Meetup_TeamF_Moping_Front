"use client";

import React, { useEffect, useRef } from "react";
import type { Map, Marker, LatLng, MarkerImage, MapOptions } from "navermaps";

// Window 객체에 naver를 안전하게 타입 선언
interface NaverWindow extends Window {
  naver: typeof import("naver.maps");
}

function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const naverWindow = window as unknown as NaverWindow;
      const { naver } = naverWindow;
      if (!naver) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }

      // 지도 생성 옵션
      const mapOptions: MapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 서울 시청
        zoom: 15, // 줌 레벨 설정
      };

      // 지도 객체 생성
      const map: Map = new naver.maps.Map(
        mapRef.current as HTMLElement,
        mapOptions
      );

      // 마커 위치 설정
      const position: LatLng = new naver.maps.LatLng(37.5665, 126.978);

      // 커스텀 마커 이미지 설정
      const markerImage: MarkerImage = {
        url: "/favicon.ico", // public 폴더의 이미지
        size: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 50),
      };

      // 마커 생성
      const marker: Marker = new naver.maps.Marker({
        position, // 마커 위치
        map, // 마커를 표시할 지도 객체
        icon: markerImage, // 마커 이미지
        title: "서울 시청", // 마커에 표시될 툴팁
      });

      // 마커 클릭 이벤트 리스너
      naver.maps.Event.addListener(marker, "click", () => {
        const url =
          "https://map.naver.com/p/search/셀렉티드닉스/place/1776798877";
        window.location.href = url;
      });
    };

    // 네이버 지도 API 동적 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.onload = initializeMap;
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 지도 렌더링할 div 반환
  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
}

export default NaverMap;
