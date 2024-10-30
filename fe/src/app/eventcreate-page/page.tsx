"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import LocationInput from "@/app/eventcreate-page/components/LocationInput";
import EventNameInput from "@/app/eventcreate-page/components/EventNameInput";
import Button from "@/app/components/common/Button";

function EventCreatePage() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [eventName, setEventName] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 요청 방지 상태
  const [isRedirecting, setIsRedirecting] = useState(false); // 중복 라우팅 방지 상태
  const [uuid, setUuid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsFormComplete(
      selectedLocation.trim() !== "" && eventName.trim() !== ""
    );
  }, [selectedLocation, eventName]);

  const handleLocationSelect = (place: { name: string; address: string }) => {
    setSelectedLocation(place.name);
  };

  const handleEventNameChange = (name: string) => {
    setEventName(name);
  };

  const createEvent = async () => {
    if (!isFormComplete || isSubmitting) return; // 이미 요청 중이면 실행 방지

    try {
      setIsSubmitting(true); // 요청 시작 시 상태 설정
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          neighborhood: selectedLocation,
          px: 126.978,
          py: 37.5665,
          eventName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 200 && data.data?.shareUrl) {
        const extractedUuid = data.data.shareUrl.split("/").pop();
        setUuid(extractedUuid); // UUID를 상태로 저장
      } else {
        alert("이벤트 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      alert("이벤트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false); // 요청 완료 후 상태 초기화
    }
  };

  // UUID가 설정되면 페이지 이동 (중복 이동 방지를 위해 isRedirecting 사용)
  useEffect(() => {
    if (uuid && !isRedirecting) {
      setIsRedirecting(true); // 이동 시작 시 상태 설정
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
        label="다음"
        type="start"
        onClick={createEvent}
        className="w-[328px] h-[60px] py-[17px] rounded-lg"
        disabled={!isFormComplete || isSubmitting}
      />
    </div>
  );
}

export default EventCreatePage;
