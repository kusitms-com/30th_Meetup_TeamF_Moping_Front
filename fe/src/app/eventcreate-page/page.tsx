"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import LocationInput from "@/app/eventcreate-page/components/LocationInput";
import EventNameInput from "@/app/eventcreate-page/components/EventNameInput";
import Button from "@/app/components/common/Button";

function EventCreatePage() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [px, setPx] = useState<number | null>(null);
  const [py, setPy] = useState<number | null>(null);
  const [eventName, setEventName] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const router = useRouter();

  const adjustedPx = px ? px / 1e7 : null;
  const adjustedPy = py ? py / 1e7 : null;

  useEffect(() => {
    setIsFormComplete(
      selectedLocation.trim() !== "" &&
        eventName.trim() !== "" &&
        eventName.length >= 1 &&
        eventName.length <= 20 &&
        adjustedPx !== null &&
        adjustedPy !== null
    );
  }, [selectedLocation, eventName, adjustedPx, adjustedPy]);

  const handleLocationSelect = (place: {
    name: string;
    address: string;
    px?: number;
    py?: number;
  }) => {
    setSelectedLocation(place.name);
    if (place.px) setPx(place.px);
    if (place.py) setPy(place.py);
  };

  const handleEventNameChange = (name: string) => {
    setEventName(name);
  };

  const createEvent = async () => {
    if (!isFormComplete || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          neighborhood: selectedLocation,
          px: adjustedPx,
          py: adjustedPy,
          eventName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 200 && data.data?.shareUrl) {
        const extractedUuid = data.data.shareUrl.split("/").pop();
        setUuid(extractedUuid);
      } else {
        alert("이벤트 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      alert("이벤트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (uuid && !isRedirecting) {
      setIsRedirecting(true);
      router.push(`/event-maps/${uuid}`);
    }
  }, [uuid, isRedirecting, router]);

  return (
    <div className="w-[360px] h-screen relative bg-white mx-auto flex flex-col">
      <Navigation title="이벤트 생성" showBackButton />
      <div className="flex-1 pt-[36px] px-[16px] overflow-auto">
        <LocationInput
          onSelect={handleLocationSelect}
          className="mt-[12px] w-full"
        />
        <EventNameInput
          value={eventName}
          selectedLocation={selectedLocation}
          onChange={handleEventNameChange}
          className="mt-[20px] w-full"
        />
      </div>
      <Button
        label={isSubmitting ? "처리 중..." : "다음"}
        type="start"
        onClick={createEvent}
        className="w-[328px] h-[60px] py-[17px] rounded-lg text-base font-medium font-['Pretendard']"
        disabled={!isFormComplete || isSubmitting}
      />
    </div>
  );
}

export default EventCreatePage;
