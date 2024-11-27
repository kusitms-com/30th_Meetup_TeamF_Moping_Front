import React from "react";
import Image from "next/image";
import { useMapStore } from "../stores/useMapStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";
import { useLoginModalStore } from "../stores/useLoginModalStore";

export default function PingInformaion() {
  const { customMarkers } = useMarkerStore();
  const selectedMarkerName = useMapStore((state) => state.selectedMarkerName);

  const { openLoginModal } = useLoginModalStore();

  const sendPingApi = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing!");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/pings/member`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sid: selectedPing?.sid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
      alert("API 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleOpenLoginModal = () => {
    sendPingApi();
    console.log("Button clicked: Open login modal");
    openLoginModal();
  };

  const selectedPing = customMarkers.find(
    (ping) => ping.placeName === selectedMarkerName
  );

  if (!selectedPing) {
    return (
      <div className="w-[256px] bg-[#1d1d1d] rounded-[4px] p-[12px] text-white">
        선택된 마커가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full  px-[20px] pt-[12px]">
      {/* Header */}
      <div className="mx-[4px] mb-[8px]">
        <div className="text-[#8e8e8e] text-text-sm1 flex justify-between">
          <div>{selectedPing.type}</div>
        </div>
        <div className=" flex justify-between">
          <div className="text-white text-title-sm w-[200px] truncate">
            {selectedPing.placeName}
          </div>
          <button type="button" onClick={handleOpenLoginModal}>
            <Image
              src="/svg/plus.svg"
              alt="내 핀에 추가"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-[12px] bg-[#2d2d2d] flex items-center gap-[12px]">
        <div className="bg-grayscale-70 w-[41px] h-[24px] rounded-[2px] flex justify-center items-center text-text-sm1 text-white">
          <Image
            src="/svg/people.svg"
            alt="People"
            width={16}
            height={16}
            className="mr-[4px]"
          />
          {selectedPing.nonMembers.length}
        </div>
        <div className="w-[127px] text-text-sm1 text-white truncate">
          {selectedPing.nonMembers.map((member) => member.name).join(", ")}
        </div>
      </div>

      <button
        type="button"
        className="bg-danger-base rounded-small text-white w-full mt-[16px] h-[48px]"
        onClick={() => {
          window.location.href = selectedPing.url;
        }}
      >
        자세히 보러 가기
      </button>
    </div>
  );
}
