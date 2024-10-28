"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocationStore } from "@/app/eventcreate-page/stores/useLocationStore";
import Navigation from "@/app/components/common/Navigation";
import LocationInput from "@/app/eventcreate-page/components/LocationInput";
import EventNameInput from "@/app/eventcreate-page/components/EventNameInput";
import Button from "@/app/components/common/Button";

function EventCreatePage() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [eventName, setEventName] = useState("");
  const { moveToLocation } = useLocationStore();
  const router = useRouter();

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleEventNameChange = (name: string) => {
    setEventName(name);
  };

  const handleNextClick = () => {
    const latitude = 37.5665;
    const longitude = 126.978;

    if (!eventName) {
      alert("이벤트 이름을 입력해주세요.");
      return;
    }

    if (!selectedLocation) {
      alert("장소를 선택해주세요.");
      return;
    }

    moveToLocation(latitude, longitude);

    router.push("/map-page");
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
          value={eventName}
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
