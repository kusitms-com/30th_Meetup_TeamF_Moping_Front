import React from "react";

interface ExitModalProps {
  onCancel: () => void;
  onExit: () => void;
}

function ExitModal({ onCancel, onExit }: ExitModalProps) {
  return (
    <div className="w-[272px] h-[202px] flex flex-col items-center inline-flex bg-gray-500 bg-opacity-50 rounded-lg">
      <div className="w-full h-[148px] px-[39px] pt-9 pb-7 bg-white rounded-tl-xl rounded-tr-xl flex flex-col items-center gap-2.5">
        <div className="w-full h-[84px] flex flex-col items-center gap-2">
          <div className="w-full text-center text-[#1d1d1d] text-xl font-semibold font-['Pretendard'] leading-7">
            저장하지 않고 나갈까요?
          </div>
          <div className="text-center text-[#8e8e8e] text-base font-medium font-['Pretendard'] leading-normal">
            이대로 나가면
            <br /> 작성하던 내용이 사라져요
          </div>
        </div>
      </div>

      <div className="w-full flex">
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 h-[54px] bg-[#f0f0f0] rounded-bl-xl flex items-center justify-center"
        >
          <span className="text-center text-[#2c2c2c] text-lg font-medium font-['Pretendard'] leading-relaxed">
            취소
          </span>
        </button>

        <button
          type="button"
          onClick={onExit}
          className="w-1/2 h-[54px] bg-[#1d1d1d] rounded-br-xl flex items-center justify-center"
        >
          <span className="text-center text-white text-lg font-medium font-['Pretendard'] leading-relaxed">
            나가기
          </span>
        </button>
      </div>
    </div>
  );
}
export default ExitModal;
