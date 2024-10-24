import React, { useEffect, useRef } from "react";
import { useLocationStore } from "../stores/useLocationStore";

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null); // Allow null

  const { center } = useLocationStore();

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      if (window.naver && mapRef.current) {
        // Assign the map instance safely
        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(
            center.latitude,
            center.longitude
          ),
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

    if (window.naver) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
}
