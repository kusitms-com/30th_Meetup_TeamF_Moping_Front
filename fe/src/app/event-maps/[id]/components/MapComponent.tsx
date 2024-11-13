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
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const previousMarkerIndexRef = useRef<number | null>(null); // 이전 선택된 마커 인덱스 저장

  // 레벨에 따라 커스텀 마커 아이콘 설정
  const getIconByLevel = (level: number, isSelected: boolean = false) => {
    const size = isSelected ? 44 : 36; // 선택된 마커는 44px, 기본 마커는 36px
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
  }, []);

  // customMarkers가 변경될 때마다 마커를 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // 이전 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새로운 마커 추가
    customMarkers.forEach((ping, index) => {
      const markerOptions: naver.maps.MarkerOptions = {
        position: new window.naver.maps.LatLng(ping.py, ping.px),
        map: mapInstanceRef.current!,
        icon: getIconByLevel(ping.iconLevel),
        clickable: true,
      };

      const marker = new window.naver.maps.Marker(markerOptions);
      markersRef.current.push(marker);

      // 마커 클릭 이벤트 추가
      window.naver.maps.Event.addListener(marker, "click", () => {
        // 이전에 선택된 마커가 존재하면 크기 복원
        if (
          previousMarkerIndexRef.current !== null &&
          previousMarkerIndexRef.current !== index
        ) {
          markersRef.current[previousMarkerIndexRef.current]?.setIcon(
            getIconByLevel(
              customMarkers[previousMarkerIndexRef.current].iconLevel,
              false
            )
          );
        }

        // 현재 클릭된 마커를 확대하고, 이전 마커 인덱스를 업데이트
        marker.setIcon(getIconByLevel(ping.iconLevel, true));
        previousMarkerIndexRef.current = index;
        setSelectedMarker(index);

        // InfoWindow 생성 및 설정
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding: 8px; background: white; border-radius: 4px;">
                      <strong>${ping.placeName}</strong><br/>
                    </div>`,
          borderWidth: 0,
          backgroundColor: "transparent",
          disableAnchor: true,
        });
        if (mapInstanceRef.current) {
          infoWindow.open(mapInstanceRef.current, marker);
        }

        infoWindowRef.current = infoWindow;
      });
    });
  }, [customMarkers]);

  // 맵 클릭 시 모든 마커 초기화 및 InfoWindow 닫기
  useEffect(() => {
    if (mapInstanceRef.current) {
      window.naver.maps.Event.addListener(
        mapInstanceRef.current,
        "click",
        () => {
          if (previousMarkerIndexRef.current !== null) {
            markersRef.current[previousMarkerIndexRef.current].setIcon(
              getIconByLevel(
                customMarkers[previousMarkerIndexRef.current].iconLevel
              )
            );
            previousMarkerIndexRef.current = null;
          }
          setSelectedMarker(null);

          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }
        }
      );
    }
  }, [customMarkers]);

  // `center` 위치가 변경될 때마다 지도의 중심 업데이트
  useEffect(() => {
    if (mapInstanceRef.current) {
      const currentCenter = mapInstanceRef.current.getCenter();
      const targetCenter = new window.naver.maps.LatLng(
        center.latitude,
        center.longitude
      );

      if (!currentCenter.equals(targetCenter)) {
        mapInstanceRef.current.setCenter(targetCenter);
      }
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
}
