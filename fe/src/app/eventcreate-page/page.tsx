"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import LocationInput from "@/app/eventcreate-page/components/LocationInput";
import EventNameInput from "@/app/eventcreate-page/components/EventNameInput";
import Button from "@/app/components/common/Button";
import { useLocationStore } from "@/app/eventcreate-page/stores/useLocationStore";

function EventCreatePage() {
  const router = useRouter();
  const { selectedLocation, setLocation } = useLocationStore();
  const [eventName, setEventName] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLocation) {
      const today = new Date();
      const formattedDate = `${today.getMonth() + 1}.${today.getDate()}`;
      setEventName(`${formattedDate} ${selectedLocation.name} 모임`);
    }
  }, [selectedLocation]);

  const handleEventNameChange = (name: string) => {
    setEventName(name);
  };

  const handleLocationSelect = (place: {
    name: string;
    address: string;
    px?: number;
    py?: number;
  }) => {
    setLocation(place);
  };

useEffect(() => {
  setIsFormComplete(
    selectedLocation?.name?.trim() !== "" &&
    eventName.trim() !== ""
  );
}, [selectedLocation, eventName]);

  const handleNextClick = async () => {
    if (!isFormComplete || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          neighborhood: selectedLocation?.name ?? "",
          px: selectedLocation?.px ?? 0,
          py: selectedLocation?.py ?? 0,
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
      alert("이벤트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (uuid) {
      router.push(`/event-maps/${uuid}`);
    }
  }, [uuid, router]);

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="w-[360px] h-screen bg-white mx-auto flex flex-col">
      <Navigation showBackButton onBack={handleBackClick} />
      <div className="flex-1 mt-4 px-4 overflow-auto pt-[56px]">
        <LocationInput
          onSelect={handleLocationSelect}
          className="mt-[12px] w-full"
          value={selectedLocation?.name || ""}
        />
        <EventNameInput
          className="mt-[20px] w-full"
          value={eventName}
          selectedLocation={selectedLocation?.name || ""}
          onChange={handleEventNameChange}
        />
      </div>
      <div className="w-full fixed bottom-[45px] left-0 flex justify-center">
        <Button
          label={isSubmitting ? "처리 중..." : "다음"}
          type="start"
          onClick={handleNextClick}
          className="w-[328px] h-[60px] py-[17px] rounded-lg text-base font-medium font-['Pretendard']"
          disabled={!isFormComplete || isSubmitting}
        />
      </div>
    </div>
  );
}

export default EventCreatePage;
