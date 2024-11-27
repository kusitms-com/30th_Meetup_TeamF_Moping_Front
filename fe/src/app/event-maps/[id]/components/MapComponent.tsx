import React, { useEffect, useRef } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";
import { useMapStore } from "../stores/useMapStore";

interface MapComponentProps {
  px: number;
  py: number;
}

interface NonMember {
  nonMemberId: number;
  name: string;
  profileSvg: string;
}

interface Ping {
  placeName: string;
  url: string;
  nonMembers: NonMember[];
  type: string;
  px: number;
  py: number;
  iconLevel: number;
}

const transformPingData = (ping: unknown): Ping => {
  if (typeof ping !== "object" || ping === null) {
    throw new Error("Invalid ping data");
  }

  const {
    placeName = "Unknown Place",
    url = "#",
    nonMembers = [],
    type = "Unknown",
    px = 0,
    py = 0,
    iconLevel = 1,
  } = ping as Partial<Ping>;

  return {
    placeName,
    url,
    nonMembers: (nonMembers as NonMember[]).map((member) => ({
      ...member,
      profileSvg: member.profileSvg || "https://default-image.svg",
    })),
    type,
    px,
    py,
    iconLevel,
  };
};

export default function MapComponent({
  px,
  py,
}: MapComponentProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const { customMarkers } = useMarkerStore();
  const { center } = useLocationStore();
  const { setSelectedMarkerName } = useMapStore();
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const previousMarkerIndexRef = useRef<number | null>(null);

  const getHtmlIconByLevel = (
    level: number,
    placeName: string,
    isSelected = false
  ) => {
    const iconWidth = isSelected ? 35 : 28;
    const iconHeight = isSelected ? 40 : 32;
    const textColor = level === 1 || level === 10 ? "#000000" : "#FA8980";
    const textShadow =
      "-1px 0px #FFFFFF, 0px 1px #FFFFFF, 1px 0px #FFFFFF, 0px -1px #FFFFFF";

    return {
      content: `<div style="position: relative; width: ${iconWidth}px; height: ${iconHeight}px; background: url('${
        level === 10 ? "/pin/recommendPing.svg" : `/pin/level${level}.svg`
      }') no-repeat center center; background-size: contain;">
        <div style="position: absolute; top: ${iconWidth}px; left: 50%; transform: translateX(-50%); white-space: nowrap; color: ${textColor}; font-size: 12px; text-align: center; text-shadow: ${textShadow}; padding: 2px 4px; border-radius: 4px;">
          ${placeName}
        </div>
      </div>`,
      size: new window.naver.maps.Size(iconWidth, iconHeight),
      anchor: new window.naver.maps.Point(iconWidth / 2, iconHeight + 15),
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

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    customMarkers.forEach((ping, index) => {
      const transformedPing = transformPingData(ping);

      const markerOptions: naver.maps.MarkerOptions = {
        position: new window.naver.maps.LatLng(
          transformedPing.py,
          transformedPing.px
        ),
        map: mapInstanceRef.current || undefined,
        icon: getHtmlIconByLevel(
          transformedPing.iconLevel,
          transformedPing.placeName,
          false
        ),
        clickable: true,
      };

      const marker = new window.naver.maps.Marker(markerOptions);
      markersRef.current.push(marker);

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (transformedPing.iconLevel === 10) {
          // 아이콘 레벨이 10인 경우 링크로 이동
          window.location.href = transformedPing.url;
          return;
        }

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
          getHtmlIconByLevel(
            transformedPing.iconLevel,
            transformedPing.placeName,
            true
          )
        );
        previousMarkerIndexRef.current = index;

        setSelectedMarkerName(transformedPing.placeName);
      });
    });
  }, [customMarkers, setSelectedMarkerName]);

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
          setSelectedMarkerName(null);
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }
        }
      );
    }
  }, [customMarkers, setSelectedMarkerName]);

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
