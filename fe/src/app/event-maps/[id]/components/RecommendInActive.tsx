import React from "react";
import Image from "next/image";
import {
  ShareButton,
  RefreshButton,
  EditButton,
  MemberButton,
} from "./ButtonComponents";
import StoreItem from "./StoreItem";

interface NonMember {
  nonMemberId: number;
  name: string;
  profileSvg: string;
}

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
  type: string;
}

interface RecommendInActiveProps {
  nonMembers: NonMember[];
  handleButtonClick: (nonMemberId: number) => void;
  handleAddButtonClick: () => void;
  allPings: Ping[];
  lastPingElementRef: React.RefObject<HTMLDivElement>;
  selectedButton: number | null;
  handleRefresh: () => void;
  eventName: string;
  id: string;
  router: any; // Type based on your routing library
}

const RecommendInActive: React.FC<RecommendInActiveProps> = ({
  nonMembers,
  handleButtonClick,
  handleAddButtonClick,
  allPings,
  lastPingElementRef,
  selectedButton,
  handleRefresh,
  eventName,
  id,
  router,
}) => (
  <>
    <div className="h-[62px] w-full pt-[16px] pb-[14px] pl-[20px] pr-[16px] flex justify-between text-lg text-grayscale-0 font-300">
      <div className="truncate max-w-[169px]">{eventName}</div>
      <div>
        <ShareButton
          onClick={() => navigator.share({ url: window.location.href })}
        />
        {selectedButton !== null ? (
          <EditButton
            onClick={() => router.push(`/event-maps/${id}/${selectedButton}`)}
          />
        ) : (
          <RefreshButton onClick={handleRefresh} />
        )}
      </div>
    </div>
    <div className="h-[96px] w-full flex pt-[6px] px-[16px] text-caption font-200 text-grayscale-20 overflow-x-auto scrollbar-hide gap-[12px]">
      <div className="w-[68px] h-[90px] flex flex-col justify-between shrink-0">
        <button
          type="button"
          onClick={handleAddButtonClick}
          className="w-[68px] h-[68px] rounded-lg"
        >
          <Image src="/svg/add.svg" alt="add" width={68} height={68} />
        </button>
      </div>
      {nonMembers.map((member) => (
        <div
          key={member.nonMemberId}
          className="w-[68px] h-[90px] flex flex-col justify-between shrink-0"
        >
          <MemberButton
            member={member}
            isSelected={selectedButton === member.nonMemberId}
            onClick={() => handleButtonClick(member.nonMemberId)}
          />
          <div className="text-center">{member.name}</div>
        </div>
      ))}
    </div>
    <div className="h-[484px] flex flex-col gap-[12px] p-[20px] overflow-auto mt-[20px]">
      {allPings.map((ping, index) => (
        <StoreItem
          key={ping.url}
          url={ping.url}
          name={ping.placeName}
          type={ping.type}
          iconLevel={ping.iconLevel}
          ref={index === allPings.length - 1 ? lastPingElementRef : undefined}
        />
      ))}
    </div>
  </>
);

export default RecommendInActive;
