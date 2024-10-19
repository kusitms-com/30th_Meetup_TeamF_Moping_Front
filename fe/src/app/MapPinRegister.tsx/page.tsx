"use client";

import React, { useEffect } from "react";
import Script from "next/script";

function MapPinRegisterPage() {
  useEffect(() => {
    if (window.naver) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 14,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 현재 위치에 마커 표시
      const markerOptions = {
        position: new window.naver.maps.LatLng(37.5665, 126.978),
        map, // object-shorthand 적용
      };

      const marker = new window.naver.maps.Marker(markerOptions); // new 사용으로 인해 객체로 할당
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      {/* 네이버 지도 API 스크립트 */}
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="lazyOnload"
      />
      <div id="map" className="w-full h-full" />
    </div>
  );
}

export default MapPinRegisterPage;
