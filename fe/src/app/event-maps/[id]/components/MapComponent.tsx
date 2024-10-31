import React, { useEffect, useRef, useState } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";

interface MapComponentProps {
  px: number;
  py: number;
}

export default function MapComponent({ px, py }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const { customMarkers } = useMarkerStore(); // MarkerStore에서 customMarkers 가져오기
  const { center } = useLocationStore();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);

  // 레벨에 따라 커스텀 마커 아이콘 설정
  const getIconByLevel = (level: number, isSelected: boolean = false) => {
    const size = isSelected ? 44 : 36; // 선택된 마커는 44px, 기본 마커는 24px
    return {
      url: `/pin/level${level}.svg`, // 레벨에 따라 다른 아이콘 파일 사용
      size: new window.naver.maps.Size(size, size),
      scaledSize: new window.naver.maps.Size(size, size),
      origin: new window.naver.maps.Point(0, 0),
      anchor: new window.naver.maps.Point(size / 2, size),
    };
  };

  useEffect(() => {
    const initializeMap = () => {
      if (!mapInstanceRef.current && window.naver && mapRef.current) {
        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(py, px),
          zoom: 15,
          scaleControl: false,
          logoControl: true,
          logoControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
          mapDataControl: false,
          mapTypeControl: false,
        });
      }
    };

    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    }
  }, [px, py]);

  // customMarkers가 변경될 때마다 마커를 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // 이전 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새로운 마커 추가
    customMarkers.forEach((ping, index) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(ping.py, ping.px),
        map: mapInstanceRef.current!,
        icon: getIconByLevel(ping.iconLevel),
      });
      markersRef.current.push(marker);

      // `nonMembers` 이름을 콤마로 연결된 문자열로 변환
      const nonMemberNames = (ping.nonMembers || [])
        .map((member) => member.name)
        .join(", ");

      // Custom tooltip style with triangle arrow for infoWindow
      const infoWindowContent = `
        <div style="position: relative; padding: 8px; background: black; color: white; border-radius: 8px; font-size: 14px; max-width: 200px;">
          <strong>${nonMemberNames}</strong><br/>
          <a href="${ping.url}" target="_self" style="color: white; text-decoration: none; font-size: 12px;">
            가게 정보 바로 보기 &rsaquo;
          </a>
          <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid black;"></div>
        </div>
      `;

      const infoWindow = new window.naver.maps.InfoWindow({
        content: infoWindowContent,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "transparent",
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, "click", () => {
        // 이전 선택된 마커의 크기를 원래대로 초기화
        if (selectedMarker !== null && selectedMarker !== index) {
          markersRef.current[selectedMarker].setIcon(
            getIconByLevel(customMarkers[selectedMarker].iconLevel)
          );
        }

        // 현재 클릭된 마커를 선택하고 크기 변경
        setSelectedMarker(index);
        marker.setIcon(getIconByLevel(ping.iconLevel, true));
        infoWindow.open(mapInstanceRef.current!, marker);
      });

      // 지도 클릭 시 모든 마커 초기화
      window.naver.maps.Event.addListener(
        mapInstanceRef.current!,
        "click",
        () => {
          if (selectedMarker !== null) {
            markersRef.current[selectedMarker].setIcon(
              getIconByLevel(customMarkers[selectedMarker].iconLevel)
            );
            setSelectedMarker(null); // 선택된 마커 상태 초기화
            infoWindow.close();
          }
        }
      );
    });
  }, [customMarkers, selectedMarker]);

  // `center` 위치가 변경될 때마다 지도의 중심 업데이트
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(
        new window.naver.maps.LatLng(center.latitude, center.longitude)
      );
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
}
