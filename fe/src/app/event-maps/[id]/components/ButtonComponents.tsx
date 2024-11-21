import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

export const ShareButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    type="button"
    className="w-[32px] h-[32px] mb-[12px] shadow-medium mr-[12px]"
    onClick={onClick}
  >
    <Image src="/svg/share.svg" alt="share" width={48} height={48} />
  </button>
);

export const RefreshButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button type="button" className="w-[32px] h-[32px]" onClick={onClick}>
    <Image src="/svg/refresh.svg" alt="refresh" width={32} height={32} />
  </button>
);

export const EditButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button type="button" className="w-[32px] h-[32px]" onClick={onClick}>
    <Image src="/svg/edit.svg" alt="edit" width={32} height={32} />
  </button>
);

interface MemberButtonProps {
  member: {
    nonMemberId: number;
    name: string;
    profileSvg: string;
  };
  isSelected: boolean;
  onClick: (id: number) => void;
}

export const MemberButton: React.FC<MemberButtonProps> = ({
  member,
  isSelected,
  onClick,
}) => (
  <button
    type="button"
    onClick={() => onClick(member.nonMemberId)}
    className={`w-[72px] h-[72px] p-[2px] ${isSelected ? "border-2 rounded-lg border-primary-50" : ""}`}
  >
    <Image
      src={member.profileSvg || "/profile/default.svg"}
      alt="profile"
      width={68}
      height={68}
    />
  </button>
);
