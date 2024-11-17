import React, { useEffect, useRef, useState } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";

interface MapComponentProps {
  px: number;
  py: number;
}

interface NonMember {
  nonMemberId: number;
  name: string;
  profileSvg: string;
}

interface PingData {
  placeName: string;
  url: string;
  nonMembers: NonMember[];
  type: string;
}

const transformPingData = (ping: any): PingData => ({
  placeName: ping.placeName,
  url: ping.url,
  nonMembers: (ping.nonMembers || []).map(
    (member: { profileSvg?: string; nonMemberId: number; name: string }) => ({
      ...member,
      profileSvg: member.profileSvg || "https://default-image.svg", // 기본 이미지 URL 추가
    })
  ),
  type: ping.type,
});

const setupToggleDropdown = (): void => {
  window.toggleDropdown = (): void => {
    const dropdown: HTMLElement | null =
      document.getElementById("dropdownExtended");
    const dropdownIcon: HTMLImageElement | null = document.querySelector(
      'img[src="/svg/dropdown.svg"]'
    );
    const namesShort: HTMLElement | null =
      document.querySelector(".names-short");

    if (!dropdown || !dropdownIcon || !namesShort) return; // 요소가 없으면 함수를 실행하지 않습니다.

    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
      dropdownIcon.style.transform = "rotate(0deg)";
      namesShort.style.opacity = "0"; // CSS 속성은 문자열로 처리해야 합니다.
    } else {
      dropdown.style.display = "none";
      dropdownIcon.style.transform = "rotate(180deg)";
      namesShort.style.opacity = "1"; // CSS 속성은 문자열로 처리해야 합니다.
    }
  };
};

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
    const iconSize_w = isSelected ? 35 : 28;
    const iconSize_h = isSelected ? 40 : 32;
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
      content: `<div style="position: relative; width: ${iconSize_w}px; height: ${iconSize_h}px; background: url('/pin/level${level}.svg') no-repeat center center; background-size: contain;">
                <div style="position: absolute; top: ${iconSize_w / 1.2}px; left: 50%; transform: translateX(-50%); white-space: nowrap; color: ${textColor}; font-size: 12px; text-align: center; text-shadow: ${textShadow}; padding: 2px 4px; border-radius: 4px;">
                  ${placeName}
                </div>
              </div>`,
      size: new window.naver.maps.Size(iconSize_w, iconSize_h),
      anchor: new window.naver.maps.Point(iconSize_w / 2, iconSize_h + 15), // 라벨이 포함되므로 앵커 포지션 조정
    };
  };

  useEffect(() => {
    setupToggleDropdown();
    // 마커와 이벤트 리스너 생성 코드 이하 생략
  }, []);

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
      const transformedPing = transformPingData(ping);
      const markerOptions = {
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
        const infoWindowContent = (data: PingData) => `
  <div
    style="
      width: 256px;
      background: #1d1d1d;
      border-radius: 4px;
      padding: 12px;
    "
  >
    <div style="margin-left: 4px; margin-right: 4px; margin-bottom: 12px">
      <div
        style="
          color: #8e8e8e;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
        "
      >
        <div>${data.type}</div>
        <div style="display: flex; align-items: center;">
  <a href="${data.url}" target="_blank" style="color: inherit; text-decoration: none; display: flex; align-items: center;">
    더보기 <img src="/svg/seeMore.svg" style="margin-left: 4px;" />
  </a>
</div>
      </div>
      <div
        style="
          color: white;
          font-size: 16px;
          width: 127px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >
      ${data.placeName}
      </div>
    </div>
    <!-- 드롭다운 열리기 전 -->
    <div
      style="
        padding: 8px;
        background-color: #2d2d2d;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 12px;
      "
    >
      <div
        style="
          background-color: #f73a2c;
          width: 41px;
          height: 24px;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <img src="/svg/people.svg" />
        ${data.nonMembers.length}
      </div>
      <div
        class="names-short"
        style="
          width: 127px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: white;
          opacity: 1;
        "
      >
        ${data.nonMembers.map((member) => member.name).join(", ")}
      </div>
      <img
        src="/svg/dropdown.svg"
        style="transform: rotate(180deg); cursor: pointer"
        onclick="window.toggleDropdown()"
      />
    </div>
    <!-- 드롭다운 열린 후 -->
    <div
      id="dropdownExtended"
      style="padding: 8px; background-color: #2d2d2d; display: none"
    >
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 14px;
          width: 216px;
          margin-left: 8px;
          margin-right: 8px;
        "
      >
        ${data.nonMembers
          .map(
            (member) => `
          <div
            style="
              background-color: #1d1d1d;
              padding-left: 8px;
              padding-right: 8px;
              padding-top: 2px;
              padding-bottom: 2px;
              color: white;
              border-radius: 2px;
            "
          >
            ${member.name}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  </div>
`;

        const infoWindow = new window.naver.maps.InfoWindow({
          content: infoWindowContent(transformedPing), // API에서 받은 데이터를 infoWindowContent 함수에 전달
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
