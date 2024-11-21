import React from "react";
import Image from "next/image";

interface StoreItemProps {
  name: string;
  type: string;
}

const StoreItem: React.FC<StoreItemProps> = ({ name, type }) => (
  <div className="w-auto h-[56px] bg-[#2d2d2d] p-[8px] flex rounded justify-between">
    <div className="flex gap-[12px]">
      <Image src="/svg/edit.svg" alt="edit" width={40} height={40} />
      <div>
        <div className="text-divider-default text-text-md1">{name}</div>
        <div className="text-text-disabled text-caption">{type}</div>
      </div>
    </div>
    <div className="flex justify-center items-center text-text-disabled text-caption">
      상세정보
      <Image src="/svg/rightArrow.svg" alt="화살표" width={12} height={24} />
    </div>
  </div>
);

export default StoreItem;
