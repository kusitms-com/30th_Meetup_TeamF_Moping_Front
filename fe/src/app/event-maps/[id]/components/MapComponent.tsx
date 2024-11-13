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
  const { customMarkers } = useMarkerStore();
  const { center } = useLocationStore();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const previousMarkerIndexRef = useRef<number | null>(null);

  // HTML 아이콘으로 커스텀 마커 설정
  const getHtmlIconByLevel = (
    level: number,
    placeName: string,
    isSelected: boolean = false
  ) => {
    const iconSize = isSelected ? 44 : 36;
    let textColor, textShadow;

    if (level === 1) {
      textColor = "#000000"; // 검정색 글씨
      textShadow =
        "-1px 0px #FFFFFF, 0px 1px #FFFFFF, 1px 0px #FFFFFF, 0px -1px #FFFFFF"; // 흰색 텍스트 쉐도우 테두리
    } else {
      textColor = "#FA8980"; // 살구색 글씨
      textShadow =
        "-1px 0px #FFFFFF, 0px 1px #FFFFFF, 1px 0px #FFFFFF, 0px -1px #FFFFFF"; // 흰색 텍스트 쉐도우 테두리
    }

    return {
      content: `<div style="position: relative; width: ${iconSize}px; height: ${iconSize}px; background: url('/pin/level${level}.svg') no-repeat center center; background-size: contain;">
                <div style="position: absolute; top: ${iconSize / 1.2}px; left: 50%; transform: translateX(-50%); white-space: nowrap; color: ${textColor}; font-size: 12px; text-align: center; text-shadow: ${textShadow}; padding: 2px 4px; border-radius: 4px;">
                  ${placeName}
                </div>
              </div>`,
      size: new window.naver.maps.Size(iconSize, iconSize),
      anchor: new window.naver.maps.Point(iconSize / 2, iconSize + 15), // 라벨이 포함되므로 앵커 포지션 조정
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

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    customMarkers.forEach((ping, index) => {
      const markerOptions: naver.maps.MarkerOptions = {
        position: new window.naver.maps.LatLng(ping.py, ping.px),
        map: mapInstanceRef.current as naver.maps.Map,
        icon: getHtmlIconByLevel(ping.iconLevel, ping.placeName, false),
        clickable: true,
      };

      const marker = new window.naver.maps.Marker(markerOptions);
      markersRef.current.push(marker);

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (
          previousMarkerIndexRef.current !== null &&
          previousMarkerIndexRef.current !== index
        ) {
          markersRef.current[previousMarkerIndexRef.current].setIcon(
            getHtmlIconByLevel(
              customMarkers[previousMarkerIndexRef.current].iconLevel,
              customMarkers[previousMarkerIndexRef.current].placeName,
              false
            )
          );
        }

        marker.setIcon(
          getHtmlIconByLevel(ping.iconLevel, ping.placeName, true)
        );
        previousMarkerIndexRef.current = index;
        setSelectedMarker(index);

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

  useEffect(() => {
    if (mapInstanceRef.current) {
      window.naver.maps.Event.addListener(
        mapInstanceRef.current,
        "click",
        () => {
          if (previousMarkerIndexRef.current !== null) {
            markersRef.current[previousMarkerIndexRef.current].setIcon(
              getHtmlIconByLevel(
                customMarkers[previousMarkerIndexRef.current].iconLevel,
                customMarkers[previousMarkerIndexRef.current].placeName,
                false
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
