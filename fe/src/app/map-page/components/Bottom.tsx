import React from "react";

const BottomDrawer = () => {
  return (
    <div className="w-[100%] h-[218px] bg-grayscale-90 fixed left-0 bottom-0 z-10 rounded-t-xlarge">
      <div className="absolute mr-[16px] right-0 -top-[120px] flex flex-col">
        <button className="w-[48px] h-[48px] mb-[12px]">
          <img src="/svg/share.svg" alt="share" />
        </button>
        <button className="w-[48px] h-[48px] mb-[12px]">
          <img src="/svg/my-location.svg" alt="location" />
        </button>
      </div>
      <div className="w-full h-[20px] flex justify-center">
        <img
          src="/svg/Grabber.svg"
          alt="Grabber"
          className="h-[4px] w-[36px] mt-[12px]"
        />
      </div>
      <div className="h-[62px] w-full pt-[16px] pb-[14px] pl-[20px] pr-[16px] flex justify-between text-lg text-grayscale-0 font-300">
        <div className="truncate max-w-[210px]">
          텍스트텍스트텍스트텍스트텍스트
        </div>
        <div>
          <button type="button" className="w-[32px] h-[32px]">
            <img src="/svg/refresh.svg" />
          </button>
        </div>
      </div>
      <div className="h-[96px] w-[100%] flex pt-[6px] ml-[16px] text-caption font-200 text-grayscale-20">
        <div className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between">
          <img src="/svg/add.svg" alt="add" />
        </div>
        <div className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between">
          <img src="/svg/add.svg" alt="add" />
          <div className="text-center">메롱메롱</div>
        </div>
        <div className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between">
          <img src="/svg/add.svg" alt="add" />
          <div className="text-center">메롱윤소민</div>
        </div>
      </div>
    </div>
  );
};

export default BottomDrawer;
