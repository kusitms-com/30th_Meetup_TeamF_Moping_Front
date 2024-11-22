import React from "react";
import Image from "next/image";

interface RecommendActiveProps {
  neighborhood: string;
  handleRecommendCancle: () => void;
  handleAddToMorphing: () => void;
}

const RecommendActive: React.FC<RecommendActiveProps> = ({
  neighborhood,
  handleRecommendCancle,
  handleAddToMorphing,
}) => {
  return (
    <div>
      <div className="text-text-lg text-white px-[20px] pt-[16px] pb-[14px] flex justify-between">
        <div>
          <div className="">우리끼리만 보는</div>
          <div>{neighborhood} 인기 공간</div>
        </div>
        <button className="h-[32px]" onClick={handleRecommendCancle}>
          <Image
            src="/svg/recommendCancle.svg"
            alt="cancle"
            width={32}
            height={32}
          />
        </button>
      </div>
      <div className="px-[20px] py-[10px]">
        <button
          className=" bg-danger-base rounded-small text-white w-full h-[48px]"
          onClick={handleAddToMorphing}
        >
          우리 모핑에 추가하기
        </button>
      </div>
    </div>
  );
};

export default RecommendActive;
