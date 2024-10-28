import React, { useEffect, useRef } from "react";
import { useLocationStore } from "../stores/useLocationStore";

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const { center } = useLocationStore();

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      if (window.naver && window.naver.maps && mapRef.current) {
        // Safely assign the map instance
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

    if (window.naver && window.naver.maps) {
      // If Naver Maps is already loaded
      initializeMap();
    } else {
      // Load Naver Maps script
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        // Ensure the script is loaded before initializing the map
        if (window.naver && window.naver.maps) {
          initializeMap();
        }
      };
      document.head.appendChild(script);
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
}
