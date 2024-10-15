"use client";

import React, { useEffect, useRef, useState } from "react";

// 현재 위치 타입 정의
interface Location {
  latitude: number;
  longitude: number;
}

// 네이버 지도 타입 선언
declare global {
  interface Window {
    naver: typeof naver;
  }
}

function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<Location>({
    latitude: 37.4979517,
    longitude: 127.0276188,
  });
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const initializeMap = () => {
      if (mapInstance.current || !window.naver) return;

      const { naver } = window;
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
        if (mapInstance.current) {
          mapInstance.current.destroy();
          mapInstance.current = null;
        }
        document.head.removeChild(script);
      };
    }
    return undefined;
  }, [myLocation.latitude, myLocation.longitude]);

  const handleMoveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMyLocation({ latitude, longitude });

          const { naver } = window;
          const newCenter = new naver.maps.LatLng(latitude, longitude);
          mapInstance.current?.setCenter(newCenter);

          // 현재 위치의 주소를 가져와 표시
          naver.maps.Service.reverseGeocode(
            {
              coords: new naver.maps.LatLng(latitude, longitude),
            },
            (
              status: naver.maps.Service.Status,
              response: naver.maps.Service.ReverseGeocodeResponse
            ) => {
              if (
                status === naver.maps.Service.Status.OK &&
                response.v2.address.jibunAddress
              ) {
                const userAddress =
                  response.v2.address.jibunAddress ||
                  "주소 정보를 가져올 수 없습니다.";
                setAddress(userAddress);
              } else {
                setAddress("주소 정보를 가져오는 데 실패했습니다.");
              }
            }
          );
        },
        () => alert("위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleMoveToCurrentLocation}
        style={{ marginBottom: "10px" }}
      >
        내 위치로 이동
      </button>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
      {address && <p>현재 주소: {address}</p>}
    </div>
  );
}

export default NaverMap;
