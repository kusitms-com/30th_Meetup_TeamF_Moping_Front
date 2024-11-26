import React, { useEffect, useRef } from "react";
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

        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
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
                  <div>${transformedPing.type}</div>
                  <div style="display: flex; align-items: center;">
                    <a href="${transformedPing.url}" target="_blank" style="color: inherit; text-decoration: none; display: flex; align-items: center;">
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
                  ${transformedPing.placeName}
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
                  ${transformedPing.nonMembers.length}
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
                  ${transformedPing.nonMembers.map((member) => member.name).join(", ")}
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
                  ${transformedPing.nonMembers
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
          `,
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
