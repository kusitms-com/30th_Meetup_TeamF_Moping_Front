import React from "react";
import Header from "@/app/components/common/Header"; // Header 컴포넌트 import
import LocationInput from "@/app/components/event-creat/LocationInput";
import EventNameInput from "@/app/components/event-creat/EventNameInput";
import Button from "@/app/components/common/Button";

const EventCreatePage = () => {
  return (
    <div className="w-[360px] h-screen relative bg-white mx-auto flex flex-col">
      {/* 상단바 영역 */}
      <div className="sticky top-0 left-0 w-full h-[36px] bg-white z-20">
        {/* 상단 상태바 내용 (시간, 배터리, 신호 표시 등) */}
      </div>

      {/* Header를 상태바 아래에 sticky로 배치 */}
      <div className="sticky top-[36px] w-full z-10">
        <div className="flex justify-center">
          <Header />
        </div>
      </div>

      {/* Header와의 간격을 맞추기 위한 padding-top을 줄임 */}
      <div className="flex-1 pt-[36px] px-[16px] overflow-auto">
        {/* 제목: 어떤 공간을 찾고 계신가요? */}
        <div className="mt-[12px] text-[#1d1d1d] text-xl font-semibold leading-loose">
          어떤 공간을 찾고 계신가요?
        </div>

        {/* 장소 입력 컴포넌트 - 제목과 24px 간격 */}
        <LocationInput className="mt-[12px] w-full" />

        {/* 제목: 이벤트 이름 */}
        <div className="mt-[20px] text-[#1d1d1d] text-xl font-semibold leading-7">
          이벤트 이름
        </div>

        {/* 이벤트 이름 입력 컴포넌트 - 제목과 24px 간격 */}
        <EventNameInput className="mt-[12px] w-full" />
      </div>

      {/* 하단 버튼 - 로딩 페이지와 동일한 위치 및 크기 */}
      <div className="w-full flex justify-center mb-[45px]">
        <Button
          label="다음"
          type="next"
          className="w-[328px] h-[60px] py-[17px] rounded-lg bg-black text-white"
        />
      </div>
    </div>
  );
};

export default EventCreatePage;
