import React, { useEffect, useRef } from "react";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Naver Maps API가 로드되었는지 확인하고, 로드 후에만 접근
    const initializeMap = () => {
      if (window.naver && mapRef.current) {
        const map = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 15,
          scaleControl: false, // 축척 바 숨김
          logoControl: false,
          mapDataControl: false,
          mapTypeControl: false,
        });
      }
    };

    if (window.naver) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = initializeMap; // API 로드가 끝나면 initializeMap 실행
      document.head.appendChild(script);
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100vw", height: "110vh" }} />;
};

export default MapComponent;
