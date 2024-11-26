import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface RecommendActiveProps {
  neighborhood: string;
  handleRecommendCancle: () => void;
  handleAddToMorphing: () => void;
  setIsRecommend: Dispatch<SetStateAction<boolean>>;
  setNonRecommend: Dispatch<SetStateAction<boolean>>;
  nonRecommend: boolean;
}

export function RecommendActive({
  neighborhood,
  handleRecommendCancle,
  handleAddToMorphing,
  setIsRecommend,
  setNonRecommend,
  nonRecommend,
}: RecommendActiveProps): JSX.Element {
  return (
    <div>
      {nonRecommend ? (
        <>
          <div className="text-text-lg text-white px-[20px] pt-[16px] pb-[14px] flex justify-between">
            <div>
              <div>근처에 추천할만한 공간이 없어요</div>
            </div>
            <button
              type="button"
              className="h-[32px]"
              onClick={handleRecommendCancle}
            >
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
              type="button"
              className="bg-danger-base rounded-small text-white w-full h-[48px]"
              onClick={() => {
                setIsRecommend(false);
                setNonRecommend(false);
              }}
            >
              내 모핑으로 돌아가기
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-text-lg text-white px-[20px] pt-[16px] pb-[14px] flex justify-between">
            <div>
              <div>우리끼리만 보는</div>
              <div className="flex">
                <div className="max-w-[171px] whitespace-nowrap overflow-hidden text-ellipsis mr-1">
                  {neighborhood}
                </div>
                <div>인기 공간</div>
              </div>
            </div>
            <button
              type="button"
              className="h-[32px]"
              onClick={handleRecommendCancle}
            >
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
              type="button"
              className="bg-danger-base rounded-small text-white w-full h-[48px]"
              onClick={handleAddToMorphing}
            >
              우리 모핑에 추가하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecommendActive;
