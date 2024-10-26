"use client";

import React, { useState } from "react";
import Navigation from "@/app/components/common/Navigation";
import LocationInput from "@/app/components/event-creat/LocationInput";
import EventNameInput from "@/app/components/event-creat/EventNameInput";
import Button from "@/app/components/common/Button";

function EventCreatePage() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [eventName, setEventName] = useState("");

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleEventNameChange = (name: string) => {
    setEventName(name);
  };

  const handleNextClick = async () => {
    const eventData = {
      eventName,
      selectedLocation,
    };

    try {
      const response = await fetch("/api/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("이벤트 생성에 실패했습니다.");
      }

      // Removed unused result variable
      await response.json();

      // Optionally handle success or navigate to a different page here
    } catch (error) {
      // Remove console statement and handle the error with UI feedback instead
      alert("이벤트 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-[360px] h-screen relative bg-white mx-auto flex flex-col">
      <div className="sticky top-0 w-full z-10">
        <Navigation title="이벤트 생성" showBackButton />
      </div>

      <div className="flex-1 pt-[36px] px-[16px] overflow-auto">
        <LocationInput
          onSelect={handleLocationSelect}
          className="mt-[12px] w-full"
        />

        <EventNameInput
          selectedLocation={selectedLocation}
          onChange={handleEventNameChange}
          className="mt-[20px] w-full"
        />
      </div>

      <div className="w-full flex justify-center mb-[45px]">
        <Button
          label="다음"
          type="next"
          onClick={handleNextClick}
          className="w-[328px] h-[60px] py-[17px] rounded-lg bg-black text-white"
        />
      </div>
    </div>
  );
}

export default EventCreatePage;
